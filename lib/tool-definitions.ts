export const SCHEMA_READ_ON = "2026-11-06";

export const OPENAI_FUNCTION_CALLING_URL = "https://developers.openai.com/api/docs/guides/function-calling";
export const ANTHROPIC_DEFINE_TOOLS_URL = "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools";
export const ANTHROPIC_TOOL_USE_URL = "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview";
export const ANTHROPIC_STRICT_TOOLS_URL = "https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use";
export const MCP_TOOLS_URL = "https://modelcontextprotocol.io/specification/2025-06-18/server/tools";

export type ToolTarget = "auto" | "openai" | "anthropic" | "mcp";

export type ToolIssue = {
  severity: "error" | "warning";
  path: string;
  message: string;
};

export type ToolCheck = {
  issues: ToolIssue[];
  toolCount: number;
  formats: string[];
  /** The text parsed as a tool list or one tool object. Schema errors can still be present. */
  accepted: boolean;
};

type Kind =
  | "openai-responses"
  | "openai-chat"
  | "anthropic"
  | "mcp"
  | "openai-namespace"
  | "openai-builtin"
  | "anthropic-server"
  | "tool-call"
  | "unknown";

const NAME_PATTERN = /^[a-zA-Z0-9_-]{1,128}$/;
const JSON_TYPES = new Set(["string", "number", "integer", "boolean", "object", "array", "null"]);
const OPENAI_BUILTINS = new Set([
  "file_search",
  "web_search",
  "web_search_preview",
  "computer",
  "computer_use",
  "computer_use_preview",
  "code_interpreter",
  "image_generation",
  "local_shell",
  "shell",
  "mcp",
  "custom",
]);

const FORMAT_LABEL: Record<Kind, string> = {
  "openai-responses": "OpenAI Responses function",
  "openai-chat": "OpenAI Chat Completions function",
  anthropic: "Anthropic tool",
  mcp: "MCP tool",
  "openai-namespace": "OpenAI namespace",
  "openai-builtin": "OpenAI built-in tool",
  "anthropic-server": "Anthropic server tool",
  "tool-call": "Tool call",
  unknown: "Unrecognized object",
};

const MAX_TOOLS = 200;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function clip(value: string) {
  const flat = value.replace(/\s+/g, " ").trim();
  return flat.length <= 80 ? flat : `${flat.slice(0, 77)}...`;
}

function issue(severity: ToolIssue["severity"], path: string, message: string): ToolIssue {
  return { severity, path, message: message.length > 500 ? `${message.slice(0, 497)}...` : message };
}

export function checkToolDefinitions(text: string, target: ToolTarget): ToolCheck {
  if (!text.trim()) return { issues: [], toolCount: 0, formats: [], accepted: false };

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    const detail = error instanceof SyntaxError ? error.message : "The text is not valid JSON.";
    return {
      issues: [issue("error", "tools", `The tool text is not valid JSON. ${detail}`)],
      toolCount: 0,
      formats: [],
      accepted: false,
    };
  }

  const issues: ToolIssue[] = [];
  const tools = extractTools(parsed, issues);
  if (!tools) return { issues, toolCount: 0, formats: [], accepted: false };

  if (tools.length > MAX_TOOLS) {
    issues.push(
      issue(
        "warning",
        "tools",
        `This list has ${tools.length} tools. The checker looked at the first ${MAX_TOOLS}.`,
      ),
    );
  }

  const formats = new Set<string>();
  const names: { name: string; path: string }[] = [];
  let omittedStrict = false;
  const slice = tools.slice(0, MAX_TOOLS);
  slice.forEach((tool, index) => {
    const path = `tools[${index}]`;
    if (!isRecord(tool)) {
      issues.push(issue("error", path, "Each tool must be a JSON object."));
      formats.add(FORMAT_LABEL.unknown);
      return;
    }
    const kind = detect(tool);
    formats.add(FORMAT_LABEL[kind]);
    const mismatch = targetMismatch(kind, target);
    if (mismatch) issues.push(issue("error", path, mismatch));
    const found = validate(tool, kind, path, issues);
    if (found.name) names.push({ name: found.name, path });
    omittedStrict = omittedStrict || found.omittedStrict;
  });

  if (omittedStrict) {
    issues.push(
      issue(
        "warning",
        "tools",
        "At least one OpenAI function omits strict. The function-calling guide says a Responses request tries to rewrite the schema into strict mode, and a Chat Completions request stays non-strict unless strict is set. Set strict to true or false so the request does the thing you expect.",
      ),
    );
  }

  const seen = new Map<string, string>();
  for (const entry of names) {
    const previous = seen.get(entry.name);
    if (previous) {
      issues.push(
        issue(
          "error",
          entry.path,
          `"${clip(entry.name)}" is also used at ${previous}. Anthropic's troubleshooting notes treat a repeated tool name as a collision, and the MCP tools page says each tool name identifies that tool.`,
        ),
      );
    } else {
      seen.set(entry.name, entry.path);
    }
  }

  const realFormats = [...formats].filter((item) => item !== FORMAT_LABEL.unknown);
  if (realFormats.length > 1) {
    issues.push(
      issue(
        "warning",
        "tools",
        `These tools are not one shape: ${realFormats.join(", ")}. One request to OpenAI, Anthropic, or MCP expects a single shape.`,
      ),
    );
  }

  if (!slice.length) {
    issues.push(issue("warning", "tools", "The tool list is empty."));
  }

  return { issues, toolCount: slice.length, formats: [...formats], accepted: true };
}

function extractTools(value: unknown, issues: ToolIssue[]): unknown[] | null {
  if (Array.isArray(value)) return value;
  if (!isRecord(value)) {
    issues.push(
      issue(
        "error",
        "tools",
        "Tool JSON must be an array of tools, one tool object, or an object with a tools array.",
      ),
    );
    return null;
  }
  if (Array.isArray(value.tools)) return value.tools;
  if (isRecord(value.result) && Array.isArray(value.result.tools)) return value.result.tools;
  if ("tools" in value && !Array.isArray(value.tools)) {
    issues.push(issue("error", "tools", "The tools field must be an array."));
    return null;
  }
  if (typeof value.name === "string" || typeof value.type === "string" || "function" in value) return [value];
  const fields = Object.keys(value).slice(0, 8).join(", ") || "(none)";
  issues.push(
    issue(
      "error",
      "tools",
      `This JSON is not a tool list. Fields seen: ${fields}. OpenAI function tools use type "function" and parameters. Anthropic tools use name and input_schema. MCP tools use name and inputSchema.`,
    ),
  );
  return null;
}

function detect(tool: Record<string, unknown>): Kind {
  if (tool.type === "function_call" || tool.type === "tool_use") return "tool-call";
  if (tool.type === "namespace" && Array.isArray(tool.tools)) return "openai-namespace";
  if (tool.type === "function" && isRecord(tool.function)) return "openai-chat";
  if (tool.type === "function") return "openai-responses";
  if (typeof tool.name === "string" && isRecord(tool.inputSchema) && isRecord(tool.input_schema)) return "unknown";
  if (typeof tool.name === "string" && isRecord(tool.input_schema)) return "anthropic";
  if (typeof tool.name === "string" && isRecord(tool.inputSchema)) return "mcp";
  if (typeof tool.type === "string" && OPENAI_BUILTINS.has(tool.type)) return "openai-builtin";
  if (typeof tool.type === "string" && /_\d{8}$/.test(tool.type)) return "anthropic-server";
  if (typeof tool.name === "string" && "input_schema" in tool) return "anthropic";
  if (typeof tool.name === "string" && "inputSchema" in tool) return "mcp";
  return "unknown";
}

function targetMismatch(kind: Kind, target: ToolTarget) {
  if (target === "auto") return null;
  if (target === "openai" && (kind === "openai-responses" || kind === "openai-chat" || kind === "openai-namespace" || kind === "openai-builtin")) {
    return null;
  }
  if (target === "anthropic" && (kind === "anthropic" || kind === "anthropic-server")) return null;
  if (target === "mcp" && kind === "mcp") return null;
  if (target === "openai") {
    return `This matches ${FORMAT_LABEL[kind]}. An OpenAI function tool uses type "function" and a parameters schema. The Responses API puts name and parameters on the tool. Chat Completions nests them under function.`;
  }
  if (target === "anthropic") {
    return `This matches ${FORMAT_LABEL[kind]}. An Anthropic user-defined tool puts name, description, and input_schema on the tool, with no type "function" wrapper.`;
  }
  return `This matches ${FORMAT_LABEL[kind]}. An MCP tool puts name and inputSchema on the tool. The schema field is inputSchema, not input_schema or parameters.`;
}

function validate(tool: Record<string, unknown>, kind: Kind, path: string, issues: ToolIssue[]) {
  if (kind === "openai-chat") return validateOpenAiChat(tool, path, issues);
  if (kind === "openai-responses") return validateOpenAiFunction(tool, path, issues, "responses");
  if (kind === "anthropic") return validateAnthropic(tool, path, issues);
  if (kind === "mcp") return validateMcp(tool, path, issues);
  if (kind === "openai-namespace") return validateNamespace(tool, path, issues);
  if (kind === "openai-builtin") {
    issues.push(
      issue(
        "warning",
        path,
        `type is "${String(tool.type)}". That is a built-in OpenAI tool, not a function schema. This checker does not validate built-in tools. Their separate fees are not in the price table, so the cost below does not add one.`,
      ),
    );
    return { name: typeof tool.name === "string" ? tool.name : null, omittedStrict: false };
  }
  if (kind === "anthropic-server") {
    issues.push(
      issue(
        "warning",
        path,
        `type is "${String(tool.type)}". Dated Anthropic types are server tools, not a user-defined input_schema. This checker does not validate those, and their extra usage fees are not in the price table.`,
      ),
    );
    return { name: typeof tool.name === "string" ? tool.name : null, omittedStrict: false };
  }
  if (kind === "tool-call") {
    issues.push(
      issue(
        "error",
        path,
        "This is a tool call the model already produced, not a tool definition to send with the prompt. A definition describes the function. A call is one use of it.",
      ),
    );
    return { name: typeof tool.name === "string" ? tool.name : null, omittedStrict: false };
  }
  if (isRecord(tool.input_schema) && isRecord(tool.inputSchema)) {
    issues.push(
      issue(
        "error",
        path,
        "This object has both input_schema and inputSchema. Anthropic's field is input_schema. MCP's field is inputSchema. Keep the one your API reads.",
      ),
    );
  }
  const fields = Object.keys(tool).slice(0, 8).join(", ") || "(none)";
  issues.push(
    issue(
      "error",
      path,
      `This object does not match an OpenAI function tool, an Anthropic tool, or an MCP tool. Fields seen: ${fields}.`,
    ),
  );
  return { name: null, omittedStrict: false };
}

function validateNamespace(tool: Record<string, unknown>, path: string, issues: ToolIssue[]) {
  const name = readName(tool.name, `${path}.name`, issues, "openai");
  if (typeof tool.description !== "string" || !tool.description.trim()) {
    issues.push(
      issue("warning", `${path}.description`, "The namespace example in the function-calling guide includes a description."),
    );
  }
  const inner = Array.isArray(tool.tools) ? tool.tools : [];
  let omittedStrict = false;
  inner.forEach((item, index) => {
    const child = `${path}.tools[${index}]`;
    if (!isRecord(item)) {
      issues.push(issue("error", child, "Each tool inside a namespace must be a JSON object."));
      return;
    }
    const found =
      item.type === "function" && isRecord(item.function)
        ? validateOpenAiChat(item, child, issues)
        : item.type === "function" || typeof item.name === "string"
          ? validateOpenAiFunction(item, child, issues, "responses")
          : null;
    if (!found) issues.push(issue("error", child, "A namespace tool should be a function with type \"function\"."));
    omittedStrict = omittedStrict || Boolean(found?.omittedStrict);
  });
  return { name, omittedStrict };
}

function validateOpenAiChat(tool: Record<string, unknown>, path: string, issues: ToolIssue[]) {
  issues.push(
    issue(
      "warning",
      path,
      "This is the Chat Completions shape: the function sits under function. The current function-calling guide puts name, description, and parameters on the tool itself for the Responses API.",
    ),
  );
  if (typeof tool.name === "string") {
    issues.push(
      issue(
        "warning",
        `${path}.name`,
        "This tool has a top-level name and a nested function. Chat Completions reads function.name. The Responses API reads the top-level name. One request should use one of those shapes.",
      ),
    );
  }
  const fn = isRecord(tool.function) ? tool.function : null;
  if (!fn) {
    issues.push(issue("error", `${path}.function`, "Chat Completions function tools put the name and parameters under function."));
    return { name: null, omittedStrict: false };
  }
  rejectForeignSchema(fn, path, issues, "openai");
  const name = readName(fn.name, `${path}.function.name`, issues, "openai");
  readDescription(fn.description, `${path}.function.description`, issues, "openai");
  const strict = resolveStrict(tool.strict, fn.strict, path, issues);
  readParameters(fn.parameters, `${path}.function.parameters`, issues, strict === "true", "OpenAI");
  return { name, omittedStrict: strict === "absent" };
}

function validateOpenAiFunction(
  tool: Record<string, unknown>,
  path: string,
  issues: ToolIssue[],
  shape: "responses",
) {
  if (shape === "responses" && tool.type !== "function") {
    issues.push(issue("error", `${path}.type`, "An OpenAI function tool sets type to \"function\"."));
  }
  rejectForeignSchema(tool, path, issues, "openai");
  const name = readName(tool.name, `${path}.name`, issues, "openai");
  readDescription(tool.description, `${path}.description`, issues, "openai");
  const strict = resolveStrict(tool.strict, undefined, path, issues);
  readParameters(tool.parameters, `${path}.parameters`, issues, strict === "true", "OpenAI");
  return { name, omittedStrict: strict === "absent" };
}

function validateAnthropic(tool: Record<string, unknown>, path: string, issues: ToolIssue[]) {
  if (typeof tool.type === "string") {
    issues.push(
      issue(
        "warning",
        `${path}.type`,
        "The user-defined tool example on Anthropic's define-tools page has no type field. Dated type values are reserved for Anthropic's own tools.",
      ),
    );
  }
  rejectForeignSchema(tool, path, issues, "anthropic");
  const name = readName(tool.name, `${path}.name`, issues, "anthropic");
  readDescription(tool.description, `${path}.description`, issues, "anthropic");
  if (!("input_schema" in tool)) {
    issues.push(
      issue(
        "error",
        `${path}.input_schema`,
        "Anthropic's define-tools page requires input_schema, a JSON Schema for the tool's arguments.",
      ),
    );
  } else {
    readParameters(tool.input_schema, `${path}.input_schema`, issues, false, "Anthropic");
  }
  const strict = readFlag(tool.strict);
  if (strict === "invalid") issues.push(issue("error", `${path}.strict`, "strict must be true or false."));
  if (strict === "true") {
    issues.push(
      issue(
        "warning",
        `${path}.strict`,
        "strict is true. Anthropic's strict tool use page only accepts part of JSON Schema. This checker confirms the object shape and that required names exist. It does not re-test that whole subset.",
      ),
    );
  }
  return { name, omittedStrict: false };
}

function validateMcp(tool: Record<string, unknown>, path: string, issues: ToolIssue[]) {
  rejectForeignSchema(tool, path, issues, "mcp");
  const name = readName(tool.name, `${path}.name`, issues, "mcp");
  readDescription(tool.description, `${path}.description`, issues, "mcp");
  if (!("inputSchema" in tool)) {
    issues.push(
      issue(
        "error",
        `${path}.inputSchema`,
        "The MCP tools page defines inputSchema as the JSON Schema for the tool's arguments.",
      ),
    );
  } else {
    readParameters(tool.inputSchema, `${path}.inputSchema`, issues, false, "MCP");
  }
  return { name, omittedStrict: false };
}

function rejectForeignSchema(tool: Record<string, unknown>, path: string, issues: ToolIssue[], owner: "openai" | "anthropic" | "mcp") {
  if (owner !== "anthropic" && "input_schema" in tool) {
    issues.push(
      issue(
        "error",
        `${path}.input_schema`,
        owner === "openai"
          ? "input_schema is Anthropic's name for the argument schema. OpenAI calls it parameters."
          : "input_schema is Anthropic's name. MCP calls the argument schema inputSchema.",
      ),
    );
  }
  if (owner !== "mcp" && "inputSchema" in tool) {
    issues.push(
      issue(
        "error",
        `${path}.inputSchema`,
        owner === "openai"
          ? "inputSchema is the MCP name for the argument schema. OpenAI calls it parameters."
          : "inputSchema is the MCP name. Anthropic calls the argument schema input_schema.",
      ),
    );
  }
  if (owner !== "openai" && "parameters" in tool) {
    issues.push(
      issue(
        "error",
        `${path}.parameters`,
        owner === "anthropic"
          ? "parameters is OpenAI's name for the argument schema. Anthropic calls it input_schema."
          : "parameters is OpenAI's name for the argument schema. MCP calls it inputSchema.",
      ),
    );
  }
}

function readName(value: unknown, path: string, issues: ToolIssue[], owner: "openai" | "anthropic" | "mcp") {
  if (typeof value !== "string" || !value.trim()) {
    issues.push(issue("error", path, "The tool needs a name."));
    return null;
  }
  if (NAME_PATTERN.test(value)) return value;
  const shown = clip(value);
  if (owner === "mcp") {
    issues.push(
      issue(
        "warning",
        path,
        `"${shown}" does not match ^[a-zA-Z0-9_-]{1,128}$. The MCP tools page does not publish that pattern. Anthropic's define-tools page requires it, and OpenAI's Responses reference publishes it for function names inside a namespace, with a maximum of 128 characters. A name outside the pattern will not copy to those APIs.`,
      ),
    );
    return value;
  }
  issues.push(
    issue(
      "error",
      path,
      `"${shown}" does not match ^[a-zA-Z0-9_-]{1,128}$. Anthropic's define-tools page requires that pattern. OpenAI's Responses reference publishes the same pattern for function names inside a namespace, up to 128 characters.`,
    ),
  );
  return value;
}

function readDescription(value: unknown, path: string, issues: ToolIssue[], owner: "openai" | "anthropic" | "mcp") {
  if (value === undefined || value === "") {
    if (owner === "anthropic") {
      issues.push(
        issue(
          "error",
          path,
          "Anthropic's define-tools page includes description on a user-defined tool: what it does, when to use it, and how it behaves.",
        ),
      );
    } else if (owner === "openai") {
      issues.push(
        issue(
          "warning",
          path,
          "description is missing. The function-calling guide uses it to say when and how to call the function. The Responses API reference marks the field optional.",
        ),
      );
    } else {
      issues.push(
        issue(
          "warning",
          path,
          "description is missing. The MCP tools page includes a human-readable description on its examples.",
        ),
      );
    }
    return false;
  }
  if (typeof value !== "string") {
    issues.push(issue("error", path, "description must be text."));
    return false;
  }
  return true;
}

function readFlag(value: unknown) {
  if (value === undefined) return "absent" as const;
  if (value === true) return "true" as const;
  if (value === false) return "false" as const;
  return "invalid" as const;
}

function resolveStrict(outer: unknown, inner: unknown, path: string, issues: ToolIssue[]) {
  const a = readFlag(outer);
  const b = readFlag(inner);
  if (a === "invalid" || b === "invalid") {
    issues.push(issue("error", `${path}.strict`, "strict must be true or false."));
    return "invalid" as const;
  }
  if (a !== "absent" && b !== "absent" && a !== b) {
    issues.push(issue("warning", `${path}.strict`, "strict is set in two places and the values disagree. Keep one."));
  }
  if (a !== "absent") return a;
  return b;
}

function readParameters(
  value: unknown,
  path: string,
  issues: ToolIssue[],
  strict: boolean,
  owner: "OpenAI" | "Anthropic" | "MCP",
) {
  if (value === undefined || value === null) {
    const severity = owner === "OpenAI" ? "warning" : "error";
    issues.push(
      issue(
        severity,
        path,
        value === null
          ? `${owner} examples give this field a JSON Schema object. Null does not describe the arguments.`
          : `${owner} examples include a JSON Schema object here.`,
      ),
    );
    return;
  }
  checkSchema(value, path, issues, { strict, root: true, depth: 0 });
}

function checkSchema(
  value: unknown,
  path: string,
  issues: ToolIssue[],
  options: { strict: boolean; root: boolean; depth: number },
) {
  if (!isRecord(value)) {
    issues.push(issue("error", path, "Expected a JSON Schema object."));
    return;
  }
  if (options.depth > 6) {
    issues.push(issue("warning", path, "This checker stops following a schema after six levels."));
    return;
  }
  if ("$ref" in value) {
    issues.push(
      issue(
        "warning",
        `${path}.$ref`,
        "This schema uses $ref. The OpenAI, Anthropic, and MCP examples inline the schema, and this checker does not resolve references.",
      ),
    );
  }
  for (const key of ["anyOf", "oneOf", "allOf"] as const) {
    if (key in value && options.root) {
      issues.push(
        issue(
          "warning",
          `${path}.${key}`,
          `${key} is present. The published tool examples use one object schema. This checker does not test those branches. OpenAI's strict mode accepts only part of JSON Schema.`,
        ),
      );
    }
  }

  const types = typeList(value.type, path, issues);
  if (options.root && !types?.includes("object")) {
    const printed = value.type === undefined ? "missing" : JSON.stringify(value.type);
    issues.push(
      issue(
        "error",
        `${path}.type`,
        `type is ${printed}. The OpenAI, Anthropic, and MCP examples set the argument schema to type "object".`,
      ),
    );
  }

  const objectLike = Boolean(types?.includes("object") || (options.root && value.type === undefined) || "properties" in value);
  if (objectLike) checkObjectKeywords(value, path, issues, options);

  if (types?.includes("array")) {
    if (!("items" in value)) {
      issues.push(issue("warning", `${path}.items`, "This array schema has no items schema. The tool examples describe the items."));
    } else if (Array.isArray(value.items)) {
      issues.push(issue("warning", `${path}.items`, "items is an array. The tool examples use one schema for the items."));
    } else {
      checkSchema(value.items, `${path}.items`, issues, { strict: options.strict, root: false, depth: options.depth + 1 });
    }
  }

  if ("enum" in value && !Array.isArray(value.enum)) {
    issues.push(issue("error", `${path}.enum`, "enum must be an array."));
  }
}

function checkObjectKeywords(
  schema: Record<string, unknown>,
  path: string,
  issues: ToolIssue[],
  options: { strict: boolean; root: boolean; depth: number },
) {
  const properties = schema.properties;
  if (properties !== undefined && !isRecord(properties)) {
    issues.push(issue("error", `${path}.properties`, "properties must be an object mapping field names to schemas."));
  }
  const fields = isRecord(properties) ? properties : null;
  if (fields) {
    for (const [key, child] of Object.entries(fields)) {
      checkSchema(child, `${path}.properties.${key}`, issues, {
        strict: options.strict,
        root: false,
        depth: options.depth + 1,
      });
    }
  }

  const requiredNames = readRequired(schema.required, path, issues);
  if (requiredNames && fields) {
    for (const name of requiredNames) {
      if (!(name in fields)) {
        issues.push(issue("error", `${path}.required`, `"${clip(name)}" is required, and properties has no such field.`));
      }
    }
  } else if (requiredNames && requiredNames.length && !fields) {
    issues.push(issue("error", `${path}.required`, "required lists fields, and properties is missing."));
  }

  if ("additionalProperties" in schema) {
    const extra = schema.additionalProperties;
    if (typeof extra !== "boolean" && !isRecord(extra)) {
      issues.push(issue("error", `${path}.additionalProperties`, "additionalProperties must be true, false, or a schema object."));
    } else if (isRecord(extra)) {
      checkSchema(extra, `${path}.additionalProperties`, issues, {
        strict: options.strict,
        root: false,
        depth: options.depth + 1,
      });
    }
  }

  if (options.strict) {
    if (schema.additionalProperties !== false) {
      issues.push(
        issue(
          "error",
          `${path}.additionalProperties`,
          "OpenAI strict mode requires additionalProperties: false on each object in the parameters.",
        ),
      );
    }
    if (fields) {
      const required = new Set(requiredNames ?? []);
      for (const key of Object.keys(fields)) {
        if (!required.has(key)) {
          issues.push(
            issue(
              "error",
              `${path}.required`,
              `OpenAI strict mode requires every property to be listed in required. "${clip(key)}" is missing. The guide says an optional field can use "null" as one of its types and still be required.`,
            ),
          );
        }
      }
    }
  }
}

function readRequired(value: unknown, path: string, issues: ToolIssue[]) {
  if (value === undefined) return null;
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    issues.push(issue("error", `${path}.required`, "required must be an array of field names."));
    return null;
  }
  return value;
}

function typeList(value: unknown, path: string, issues: ToolIssue[]) {
  if (value === undefined) return null;
  const list = typeof value === "string" ? [value] : Array.isArray(value) ? value : null;
  if (!list || list.some((item) => typeof item !== "string" || !JSON_TYPES.has(item))) {
    issues.push(
      issue(
        "error",
        `${path}.type`,
        "type must be a JSON type, or a list of JSON types: string, number, integer, boolean, object, array, or null.",
      ),
    );
    return null;
  }
  return list;
}
