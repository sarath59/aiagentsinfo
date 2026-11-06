import assert from "node:assert/strict";
import { modelById } from "../lib/model-prices";
import { checkPrompt } from "../lib/prompt-check";
import { countTextTokens } from "../lib/prompt-tokens";
import { checkToolDefinitions } from "../lib/tool-definitions";

const prompt = "You are a weather assistant. Use get_weather when the user asks about the weather.";

const openai = `[
  {
    "type": "function",
    "name": "get_weather",
    "description": "Get the current weather for a city.",
    "parameters": {
      "type": "object",
      "properties": {
        "city": { "type": "string", "description": "City name" }
      },
      "required": ["city"],
      "additionalProperties": false
    },
    "strict": true
  }
]`;

const anthropic = JSON.stringify([
  {
    name: "get_weather",
    description: "Get the current weather in a given location",
    input_schema: {
      type: "object",
      properties: {
        location: { type: "string", description: "The city and state, e.g. San Francisco, CA" },
        unit: { type: "string", enum: ["celsius", "fahrenheit"] },
      },
      required: ["location"],
    },
  },
]);

const mcp = JSON.stringify({
  tools: [
    {
      name: "get_weather",
      title: "Weather Information Provider",
      description: "Get current weather information for a location",
      inputSchema: {
        type: "object",
        properties: { location: { type: "string", description: "City name or zip code" } },
        required: ["location"],
      },
    },
  ],
});

const invalid = `[
  {
    "type": "function",
    "function": {
      "name": "bad name",
      "parameters": { "type": "string" }
    }
  }
]`;

function errorsOf(text: string, target: "auto" | "openai" | "anthropic" | "mcp" = "auto") {
  const check = checkToolDefinitions(text, target);
  return {
    errors: check.issues.filter((item) => item.severity === "error").map((item) => item.message),
    warnings: check.issues.filter((item) => item.severity === "warning").map((item) => item.message),
    formats: check.formats,
    accepted: check.accepted,
    toolCount: check.toolCount,
  };
}

const openaiCheck = errorsOf(openai);
assert.deepEqual(openaiCheck.errors, [], openaiCheck.errors.join("\n"));
assert.deepEqual(openaiCheck.warnings, [], openaiCheck.warnings.join("\n"));
assert.equal(openaiCheck.formats[0], "OpenAI Responses function");

const anthropicCheck = errorsOf(anthropic);
assert.deepEqual(anthropicCheck.errors, [], anthropicCheck.errors.join("\n"));
assert.equal(anthropicCheck.formats[0], "Anthropic tool");

const mcpCheck = errorsOf(mcp);
assert.deepEqual(mcpCheck.errors, [], mcpCheck.errors.join("\n"));
assert.equal(mcpCheck.formats[0], "MCP tool");

const invalidCheck = errorsOf(invalid);
assert.ok(invalidCheck.errors.some((item) => item.includes("bad name")));
assert.ok(invalidCheck.errors.some((item) => item.includes("type is")));
assert.ok(invalidCheck.warnings.some((item) => item.includes("Chat Completions")));
assert.equal(invalidCheck.formats[0], "OpenAI Chat Completions function");

const mismatch = errorsOf(anthropic, "openai");
assert.ok(mismatch.errors.some((item) => item.includes("Anthropic")));

const broken = errorsOf("{");
assert.equal(broken.accepted, false);
assert.ok(broken.errors[0]?.includes("not valid JSON"));

const strictGap = errorsOf(
  JSON.stringify([
    {
      type: "function",
      name: "get_weather",
      description: "Look up the weather.",
      strict: true,
      parameters: {
        type: "object",
        properties: { city: { type: "string" }, unit: { type: "string" } },
        required: ["city"],
      },
    },
  ]),
);
assert.ok(strictGap.errors.some((item) => item.includes("additionalProperties")));
assert.ok(strictGap.errors.some((item) => item.includes("unit")));

const missingRequired = errorsOf(
  JSON.stringify([
    {
      name: "get_weather",
      description: "Look up the weather for a city.",
      input_schema: { type: "object", properties: { city: { type: "string" } }, required: ["location"] },
    },
  ]),
);
assert.ok(missingRequired.errors.some((item) => item.includes("location")));

const duplicates = errorsOf(
  JSON.stringify([
    { name: "get_weather", description: "One.", input_schema: { type: "object", properties: {} } },
    { name: "get_weather", description: "Two.", input_schema: { type: "object", properties: {} } },
  ]),
);
assert.ok(duplicates.errors.some((item) => item.includes("also used")));

const direct = countTextTokens(prompt, "gpt-5");
const priced = checkPrompt({
  prompt,
  toolsText: openai,
  target: "auto",
  model: modelById("gpt-5"),
  outputTokens: 800,
  tasksPerDay: 10,
});
assert.equal(priced.tokens.exact, true);
assert.equal(priced.tokens.encoding, direct.encoding);
assert.equal(priced.tokens.prompt, direct.tokens);
assert.equal(priced.tokens.tools, countTextTokens(openai, "gpt-5").tokens);
assert.equal(priced.tokens.toolsInCost, true);
assert.equal(priced.ok, true);
assert.ok(priced.cost);
const inputTokens = priced.tokens.prompt + priced.tokens.tools;
assert.equal(priced.cost.inputTokens, inputTokens);
const perTurn = (inputTokens * 1.25 + 800 * 10) / 1_000_000;
assert.equal(priced.cost.perTurn, perTurn);
assert.equal(priced.cost.thirtyDay, perTurn * 10 * 30);
assert.equal(JSON.stringify(priced).includes(prompt), false);

const claudeWithOpenAiTools = checkPrompt({
  prompt,
  toolsText: openai,
  target: "auto",
  model: modelById("claude-sonnet-5"),
  outputTokens: 100,
  tasksPerDay: 1,
});
assert.equal(claudeWithOpenAiTools.tokens.anthropicToolPrompt, null);
assert.ok(claudeWithOpenAiTools.notes.some((note) => note.includes("JSON is not")));

const claude = checkPrompt({
  prompt,
  toolsText: anthropic,
  target: "auto",
  model: modelById("claude-opus-5-5"),
  outputTokens: 100,
  tasksPerDay: 2,
});
assert.equal(claude.tokens.exact, false);
assert.equal(claude.tokens.anthropicToolPrompt, 286);
assert.equal(claude.tokens.anthropicAnyOrTool, null);
assert.equal(claude.cost?.inputTokens, claude.tokens.prompt + claude.tokens.tools + 286);
assert.ok(claude.tokens.label.startsWith("Estimate"));

const fable = checkPrompt({
  prompt,
  toolsText: anthropic,
  target: "anthropic",
  model: modelById("claude-fable-5-1"),
  outputTokens: 10,
  tasksPerDay: 1,
});
assert.equal(fable.tokens.anthropicToolPrompt, null);
assert.ok(fable.notes.some((note) => note.includes("does not list")));

const newer = checkPrompt({
  prompt,
  toolsText: "",
  target: "auto",
  model: modelById("gpt-6-astra"),
  outputTokens: 0,
  tasksPerDay: 1,
});
assert.equal(newer.tokens.exact, false);
assert.ok(newer.tokens.label.includes("does not list"));
assert.equal(newer.tokens.toolsInCost, false);
assert.equal(newer.cost?.inputTokens, newer.tokens.prompt);

const badJson = checkPrompt({
  prompt,
  toolsText: "{",
  target: "auto",
  model: modelById("gpt-5"),
  outputTokens: 1,
  tasksPerDay: 1,
});
assert.equal(badJson.ok, false);
assert.equal(badJson.tokens.toolsInCost, false);
assert.equal(badJson.cost?.inputTokens, badJson.tokens.prompt);
assert.ok(badJson.tokens.tools > 0);

const special = countTextTokens("hello <|endoftext|>", "gpt-5");
assert.ok(special.tokens > 1);

console.log("prompt checker self-test passed");
console.log({
  promptTokens: priced.tokens.prompt,
  toolTokens: priced.tokens.tools,
  encoding: priced.tokens.encoding,
  perTurn: priced.cost?.perTurn,
  thirtyDay: priced.cost?.thirtyDay,
});
