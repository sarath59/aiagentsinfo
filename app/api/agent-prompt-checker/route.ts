import { checkPrompt } from "@/lib/prompt-check";
import { modelPrices } from "@/lib/model-prices";
import { takePromptCheckLimit } from "@/lib/rate-limit";
import type { ToolTarget } from "@/lib/tool-definitions";

export const runtime = "nodejs";

const MAX_BODY = 200_000;
const MAX_PROMPT = 80_000;
const MAX_TOOLS = 80_000;
const MAX_OUTPUT_TOKENS = 10_000_000;
const MAX_TASKS = 100_000;
const TARGETS = new Set<ToolTarget>(["auto", "openai", "anthropic", "mcp"]);

function json(body: unknown, status = 200, extra?: Record<string, string>) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extra },
  });
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function sameOrigin(request: Request) {
  const source = request.headers.get("origin") || request.headers.get("referer");
  if (!source) return true;
  let host: string;
  try {
    host = new URL(source).host.toLowerCase();
  } catch {
    return false;
  }
  const requestHost = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  return host === requestHost || host === "www.aiagentsinfo.com" || host === "aiagentsinfo.com";
}

function readNumber(value: unknown, label: string, max: number, whole: boolean) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return { error: `Enter zero or a positive number for ${label}.` };
  }
  if (whole && !Number.isInteger(value)) return { error: `Enter a whole number for ${label}.` };
  if (value > max) return { error: `${label} must be ${max.toLocaleString("en-US")} or fewer.` };
  return { value };
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Open this page on the site and try again." }, 403);
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return json({ error: "Send the form as JSON." }, 415);

  const limit = takePromptCheckLimit(`prompt-check:${clientIp(request)}`);
  if (!limit.ok) {
    return json(
      { error: "Too many checks from this network. Wait a few minutes and try again." },
      429,
      { "Retry-After": String(limit.retryAfterSec) },
    );
  }

  let raw = "";
  try {
    raw = await request.text();
  } catch {
    return json({ error: "The request could not be read." }, 400);
  }
  if (raw.length > MAX_BODY) return json({ error: "That paste is too long to check." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "The request was not valid JSON." }, 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return json({ error: "The request was not a JSON object." }, 400);
  const record = body as Record<string, unknown>;

  if (typeof record.prompt !== "string" || !record.prompt.trim()) {
    return json({ error: "Paste a system prompt." }, 400);
  }
  if (record.prompt.length > MAX_PROMPT) return json({ error: "The prompt is too long to check." }, 413);
  const toolsText = record.tools == null ? "" : record.tools;
  if (typeof toolsText !== "string") return json({ error: "Tool definitions must be text." }, 400);
  if (toolsText.length > MAX_TOOLS) return json({ error: "The tool JSON is too long to check." }, 413);

  const target = record.format == null ? "auto" : record.format;
  if (typeof target !== "string" || !TARGETS.has(target as ToolTarget)) {
    return json({ error: "Choose Auto-detect, OpenAI, Anthropic, or MCP." }, 400);
  }

  if (typeof record.modelId !== "string") return json({ error: "Choose a model." }, 400);
  const model = modelPrices.find((item) => item.id === record.modelId);
  if (!model) return json({ error: "That model is not in the price table." }, 400);

  const output = readNumber(record.outputTokens, "output tokens", MAX_OUTPUT_TOKENS, true);
  if ("error" in output) return json({ error: output.error }, 400);
  const tasks = readNumber(record.tasksPerDay, "tasks per day", MAX_TASKS, false);
  if ("error" in tasks) return json({ error: tasks.error }, 400);

  try {
    const result = checkPrompt({
      prompt: record.prompt,
      toolsText,
      target: target as ToolTarget,
      model,
      outputTokens: output.value,
      tasksPerDay: tasks.value,
    });
    return json(result);
  } catch {
    return json({ error: "The checker could not finish that request." }, 500);
  }
}
