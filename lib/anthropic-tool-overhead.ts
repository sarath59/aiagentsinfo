import { ANTHROPIC_TOOL_USE_URL } from "@/lib/tool-definitions";

export const ANTHROPIC_TOOL_PROMPT_READ_ON = "2026-11-09";
export { ANTHROPIC_TOOL_USE_URL };

/**
 * Tool-use system prompt tokens from Anthropic's tool-use overview, read 2026-11-09.
 * autoOrNone is the published count for tool_choice auto or none when at least one tool is sent.
 * anyOrTool is omitted when that cell on the page was blank.
 */
const rows: Record<string, { autoOrNone: number; anyOrTool?: number }> = {
  "claude-opus-5-5": { autoOrNone: 286 },
  "claude-opus-5": { autoOrNone: 286, anyOrTool: 406 },
  "claude-sonnet-5-5": { autoOrNone: 286 },
  "claude-sonnet-5": { autoOrNone: 354, anyOrTool: 474 },
  "claude-haiku-5-5": { autoOrNone: 286, anyOrTool: 406 },
};

export function anthropicToolPromptTokens(modelId: string) {
  return rows[modelId] ?? null;
}
