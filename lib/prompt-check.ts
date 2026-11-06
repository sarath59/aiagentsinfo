import { anthropicToolPromptTokens, ANTHROPIC_TOOL_PROMPT_READ_ON } from "@/lib/anthropic-tool-overhead";
import { thirtyDayCost, type ModelPrice } from "@/lib/model-prices";
import { countTextTokens } from "@/lib/prompt-tokens";
import { checkToolDefinitions, type ToolIssue, type ToolTarget } from "@/lib/tool-definitions";

export type PromptCheckResult = {
  ok: boolean;
  toolCount: number;
  formats: string[];
  issues: ToolIssue[];
  tokens: {
    prompt: number;
    tools: number;
    toolsInCost: boolean;
    anthropicToolPrompt: number | null;
    anthropicAnyOrTool: number | null;
    encoding: string;
    exact: boolean;
    label: string;
  };
  cost: null | {
    modelId: string;
    modelLabel: string;
    provider: ModelPrice["provider"];
    sourceUrl: string;
    bandLabel: string;
    inputPerMillion: number;
    outputPerMillion: number;
    inputTokens: number;
    outputTokens: number;
    tasksPerDay: number;
    perTurn: number;
    thirtyDay: number;
    notes: string[];
  };
  notes: string[];
  omitted: string[];
};

export const omittedFees = [
  "No per-call tool fee is added. The OpenAI, Anthropic, Google, and xAI rows in the price table do not publish one.",
  "No computer-use fee is added. Where a provider prices that separately, the rate is not in this price table.",
  "No search-grounding fee is added. The Gemini notes say grounding is a separate fee, and they do not include the rate.",
  "No code-execution fee is added. Anthropic's tool-use overview says some server tools charge on top of tokens, and those rates are not in this price table.",
];

export function checkPrompt(input: {
  prompt: string;
  toolsText: string;
  target: ToolTarget;
  model: ModelPrice;
  outputTokens: number;
  tasksPerDay: number;
}): PromptCheckResult {
  const toolCheck = checkToolDefinitions(input.toolsText, input.target);
  const counted = countTextTokens(input.prompt, input.model.id);
  const toolTokens = input.toolsText.trim() ? countTextTokens(input.toolsText, input.model.id).tokens : 0;
  const toolsInCost = toolCheck.accepted && toolCheck.toolCount > 0;
  const anthropicShape =
    toolCheck.formats.length > 0 &&
    toolCheck.formats.every((item) => item === "Anthropic tool" || item === "Anthropic server tool");
  const anthropicReady = input.model.provider === "Anthropic" && toolsInCost && anthropicShape && !toolCheck.issues.some((item) => item.severity === "error");
  const anthropicRow = anthropicReady ? anthropicToolPromptTokens(input.model.id) : null;
  const anthropicToolPrompt = anthropicRow?.autoOrNone ?? null;
  const inputTokens = counted.tokens + (toolsInCost ? toolTokens : 0) + (anthropicToolPrompt ?? 0);
  const priced = thirtyDayCost(input.model, inputTokens, input.outputTokens, input.tasksPerDay);
  const notes = buildNotes({
    model: input.model,
    toolsText: input.toolsText,
    toolCount: toolCheck.toolCount,
    accepted: toolCheck.accepted,
    hasErrors: toolCheck.issues.some((item) => item.severity === "error"),
    anthropicShape,
    anthropicToolPrompt,
    anthropicAnyOrTool: anthropicRow?.anyOrTool ?? null,
    outputTokens: input.outputTokens,
  });

  return {
    ok: toolCheck.issues.every((item) => item.severity !== "error"),
    toolCount: toolCheck.toolCount,
    formats: toolCheck.formats,
    issues: toolCheck.issues,
    tokens: {
      prompt: counted.tokens,
      tools: toolTokens,
      toolsInCost,
      anthropicToolPrompt,
      anthropicAnyOrTool: anthropicRow && anthropicRow.anyOrTool != null ? anthropicRow.anyOrTool : null,
      encoding: counted.encoding,
      exact: counted.exact && input.model.provider === "OpenAI",
      label: tokenLabel(input.model, counted.encoding, counted.exact),
    },
    cost: priced
      ? {
          modelId: input.model.id,
          modelLabel: input.model.label,
          provider: input.model.provider,
          sourceUrl: input.model.sourceUrl,
          bandLabel: priced.band.label,
          inputPerMillion: priced.band.inputPerMillion,
          outputPerMillion: priced.band.outputPerMillion,
          inputTokens,
          outputTokens: input.outputTokens,
          tasksPerDay: input.tasksPerDay,
          perTurn: priced.perTask,
          thirtyDay: priced.thirtyDay,
          notes: input.model.notes,
        }
      : null,
    notes,
    omitted: omittedFees,
  };
}

function tokenLabel(model: ModelPrice, encoding: string, exact: boolean) {
  if (exact && model.provider === "OpenAI") {
    return `Counted with tiktoken ${encoding}, the encoding that library assigns to ${model.label}. The count is the pasted text. It does not add the few tokens of message framing an API request adds.`;
  }
  if (model.provider === "OpenAI") {
    return `Estimate. tiktoken's encoding_for_model does not list ${model.label}, so the pasted text was counted with ${encoding}. That is the encoding tiktoken assigns to gpt-5, not a tokenizer OpenAI publishes for ${model.label}. Message framing is not included.`;
  }
  return `Estimate. This server does not run ${model.provider}'s tokenizer. The pasted text was counted with tiktoken ${encoding} so you can see the size. ${model.provider} does not bill with that encoding, so the billed count can differ.`;
}

function buildNotes(input: {
  model: ModelPrice;
  toolsText: string;
  toolCount: number;
  accepted: boolean;
  hasErrors: boolean;
  anthropicShape: boolean;
  anthropicToolPrompt: number | null;
  anthropicAnyOrTool: number | null;
  outputTokens: number;
}) {
  const notes: string[] = [];
  if (!input.toolsText.trim()) {
    notes.push("No tool JSON was pasted, so the cost is the prompt plus the output tokens you entered.");
  } else if (!input.accepted) {
    notes.push("The tool text was counted for size and left out of the cost, because it is not a tool list.");
  } else if (input.toolCount === 0) {
    notes.push("The tool list is empty, so its text was left out of the cost.");
  } else if (input.hasErrors) {
    notes.push("The cost includes this tool text. A provider can reject the request before it bills the turn.");
  } else {
    notes.push("The cost includes the pasted tool text as input tokens.");
  }

  if (input.model.provider === "Anthropic" && input.accepted && input.toolCount > 0) {
    if (!input.anthropicShape) {
      notes.push(
        "The published Claude tool-use system prompt was not added. That count applies when the tools are Anthropic's shape, and this JSON is not.",
      );
    } else if (input.hasErrors) {
      notes.push("The published Claude tool-use system prompt was not added, because this tool JSON still has problems.");
    } else if (input.anthropicToolPrompt == null) {
      notes.push(
        `Anthropic's tool-use overview, read ${ANTHROPIC_TOOL_PROMPT_READ_ON}, does not list a tool-use system prompt count for ${input.model.label}. None was added.`,
      );
    } else {
      notes.push(
        `Added ${input.anthropicToolPrompt} input tokens from Anthropic's tool-use overview, read ${ANTHROPIC_TOOL_PROMPT_READ_ON}. That figure is the tool-use system prompt for tool_choice auto or none when at least one tool is sent. It is a published count, not a tiktoken count.`,
      );
      notes.push(
        input.anthropicAnyOrTool == null
          ? "The any/tool cell on that row was blank, so this estimate does not add a second figure."
          : `The same row lists ${input.anthropicAnyOrTool} tokens when tool_choice is any or a named tool. This estimate uses the auto/none count, which is the default.`,
      );
    }
  }

  notes.push(
    input.outputTokens === 0
      ? "Output tokens are 0 because that is what was entered. This check does not invent a reply."
      : "Output tokens are the number entered here. This check does not count a reply, because no reply was pasted.",
  );
  return notes;
}
