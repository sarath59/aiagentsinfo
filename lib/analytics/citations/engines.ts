import { parseCitationAnswer, type CitationParse } from "@/lib/analytics/citations/parse";

export type CitationEngine = "chatgpt" | "perplexity" | "gemini" | "claude";

export type EngineResult = CitationParse & {
  engine: CitationEngine;
  ok: boolean;
  error?: string;
  raw_ref: string;
};

const PROMPT_PREFIX =
  "Answer with concrete product or site names and URLs when you recommend something. Keep it under 250 words.\n\nQuestion: ";

export function configuredEngines(): CitationEngine[] {
  const out: CitationEngine[] = [];
  if (process.env.OPENAI_API_KEY?.trim()) out.push("chatgpt");
  if (process.env.PERPLEXITY_API_KEY?.trim()) out.push("perplexity");
  if (process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim()) {
    out.push("gemini");
  }
  if (process.env.ANTHROPIC_API_KEY?.trim()) out.push("claude");
  return out;
}

export async function askEngine(engine: CitationEngine, prompt: string): Promise<EngineResult> {
  try {
    if (engine === "chatgpt") return await askOpenAI(prompt);
    if (engine === "perplexity") return await askPerplexity(prompt);
    if (engine === "gemini") return await askGemini(prompt);
    return await askClaude(prompt);
  } catch (error) {
    return {
      engine,
      ok: false,
      error: error instanceof Error ? error.message.slice(0, 200) : "request failed",
      cited: false,
      position: null,
      snippet: "",
      competitors: "",
      raw_ref: "",
      hosts: [],
    };
  }
}

async function askOpenAI(prompt: string): Promise<EngineResult> {
  const key = process.env.OPENAI_API_KEY!.trim();
  const model = process.env.CITATION_OPENAI_MODEL?.trim() || "gpt-4.1-mini";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      tools: [{ type: "web_search_preview" }],
      input: `${PROMPT_PREFIX}${prompt}`,
    }),
    signal: AbortSignal.timeout(60_000),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(typeof body?.error?.message === "string" ? body.error.message : `openai ${response.status}`);
  }
  const text = extractOpenAIText(body);
  const urls = extractOpenAIUrls(body);
  const parsed = parseCitationAnswer(text, urls);
  return { engine: "chatgpt", ok: true, raw_ref: urls.slice(0, 8).join(" "), ...parsed };
}

async function askPerplexity(prompt: string): Promise<EngineResult> {
  const key = process.env.PERPLEXITY_API_KEY!.trim();
  const model = process.env.CITATION_PERPLEXITY_MODEL?.trim() || "sonar";
  const response = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: "Cite sources with URLs. Prefer specific product and directory sites." },
        { role: "user", content: prompt },
      ],
    }),
    signal: AbortSignal.timeout(60_000),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(typeof body?.error?.message === "string" ? body.error.message : `perplexity ${response.status}`);
  }
  const text = String(body?.choices?.[0]?.message?.content ?? "");
  const urls = Array.isArray(body?.citations) ? body.citations.map(String) : [];
  const parsed = parseCitationAnswer(text, urls);
  return { engine: "perplexity", ok: true, raw_ref: urls.slice(0, 8).join(" "), ...parsed };
}

async function askGemini(prompt: string): Promise<EngineResult> {
  const key = (process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY)!.trim();
  const model = process.env.CITATION_GEMINI_MODEL?.trim() || "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: `${PROMPT_PREFIX}${prompt}` }] }],
      tools: [{ google_search: {} }],
    }),
    signal: AbortSignal.timeout(60_000),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(typeof body?.error?.message === "string" ? body.error.message : `gemini ${response.status}`);
  }
  const text = extractGeminiText(body);
  const urls = extractGeminiUrls(body);
  const parsed = parseCitationAnswer(text, urls);
  return { engine: "gemini", ok: true, raw_ref: urls.slice(0, 8).join(" "), ...parsed };
}

async function askClaude(prompt: string): Promise<EngineResult> {
  const key = process.env.ANTHROPIC_API_KEY!.trim();
  const model = process.env.CITATION_CLAUDE_MODEL?.trim() || "claude-sonnet-4-5";
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
          max_uses: 3,
        },
      ],
      messages: [{ role: "user", content: `${PROMPT_PREFIX}${prompt}` }],
    }),
    signal: AbortSignal.timeout(60_000),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(typeof body?.error?.message === "string" ? body.error.message : `claude ${response.status}`);
  }
  const { text, urls } = extractClaude(body);
  const parsed = parseCitationAnswer(text, urls);
  return { engine: "claude", ok: true, raw_ref: urls.slice(0, 8).join(" "), ...parsed };
}

function extractOpenAIText(body: any) {
  if (typeof body?.output_text === "string") return body.output_text;
  const parts: string[] = [];
  for (const item of body?.output ?? []) {
    for (const content of item?.content ?? []) {
      if (typeof content?.text === "string") parts.push(content.text);
    }
  }
  return parts.join("\n");
}

function extractOpenAIUrls(body: any) {
  const urls: string[] = [];
  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      for (const item of node) walk(item);
      return;
    }
    const record = node as Record<string, unknown>;
    if (typeof record.url === "string") urls.push(record.url);
    if (typeof record.href === "string") urls.push(record.href);
    for (const value of Object.values(record)) walk(value);
  };
  walk(body);
  return [...new Set(urls)];
}

function extractGeminiText(body: any) {
  const parts = body?.candidates?.[0]?.content?.parts ?? [];
  return parts.map((part: { text?: string }) => part.text || "").join("\n");
}

function extractGeminiUrls(body: any) {
  const urls: string[] = [];
  const chunks = body?.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
  for (const chunk of chunks) {
    const uri = chunk?.web?.uri;
    if (typeof uri === "string") urls.push(uri);
  }
  return [...new Set(urls)];
}

function extractClaude(body: any) {
  const parts: string[] = [];
  const urls: string[] = [];
  for (const block of body?.content ?? []) {
    if (block?.type === "text" && typeof block.text === "string") parts.push(block.text);
    if (block?.type === "web_search_tool_result") {
      for (const item of block.content ?? []) {
        if (typeof item?.url === "string") urls.push(item.url);
      }
    }
  }
  return { text: parts.join("\n"), urls: [...new Set(urls)] };
}
