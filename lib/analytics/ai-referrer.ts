/** Map human referrers / UTM to an AI chat product. */

const HOST_TO_AI: { host: string; id: string }[] = [
  { host: "chatgpt.com", id: "chatgpt" },
  { host: "chat.openai.com", id: "chatgpt" },
  { host: "claude.ai", id: "claude" },
  { host: "perplexity.ai", id: "perplexity" },
  { host: "www.perplexity.ai", id: "perplexity" },
  { host: "gemini.google.com", id: "gemini" },
  { host: "copilot.microsoft.com", id: "copilot" },
  { host: "bing.com", id: "copilot" },
  { host: "www.bing.com", id: "copilot" },
  { host: "grok.x.ai", id: "grok" },
  { host: "x.com", id: "grok" },
  { host: "meta.ai", id: "meta" },
  { host: "www.meta.ai", id: "meta" },
];

const UTM_TO_AI: Record<string, string> = {
  "chatgpt.com": "chatgpt",
  chatgpt: "chatgpt",
  openai: "chatgpt",
  "claude.ai": "claude",
  claude: "claude",
  anthropic: "claude",
  "perplexity.ai": "perplexity",
  perplexity: "perplexity",
  "gemini.google.com": "gemini",
  gemini: "gemini",
  "copilot.microsoft.com": "copilot",
  copilot: "copilot",
  grok: "grok",
  "meta.ai": "meta",
};

export function aiReferrerFrom(input: {
  referrerHost?: string | null;
  utmSource?: string | null;
}): string {
  const utm = (input.utmSource ?? "").trim().toLowerCase();
  if (utm && UTM_TO_AI[utm]) return UTM_TO_AI[utm];

  const host = (input.referrerHost ?? "").trim().toLowerCase().replace(/^www\./, "");
  if (!host) return "";
  for (const row of HOST_TO_AI) {
    const needle = row.host.replace(/^www\./, "");
    if (host === needle || host.endsWith(`.${needle}`)) return row.id;
  }
  return "";
}

export function referrerHostFromUrl(referrer: string | null | undefined) {
  if (!referrer) return "";
  try {
    return new URL(referrer).hostname.slice(0, 120);
  } catch {
    return "";
  }
}
