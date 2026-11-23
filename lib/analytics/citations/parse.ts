const OUR_HOSTS = new Set(["aiagentsinfo.com", "www.aiagentsinfo.com"]);

const HOST_RE =
  /\b(?:https?:\/\/)?(?:www\.)?([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+)\b/gi;

export type CitationParse = {
  cited: boolean;
  position: number | null;
  snippet: string;
  competitors: string;
  hosts: string[];
};

/** Score an assistant answer for whether aiagentsinfo.com appears, and who else does. */
export function parseCitationAnswer(text: string, extraUrls: string[] = []): CitationParse {
  const hosts: string[] = [];
  const seen = new Set<string>();

  function add(raw: string) {
    const host = normalizeHost(raw);
    if (!host || seen.has(host)) return;
    if (isNoiseHost(host)) return;
    seen.add(host);
    hosts.push(host);
  }

  for (const url of extraUrls) add(url);
  for (const match of text.matchAll(HOST_RE)) add(match[1] || match[0]);

  // Bare brand without a URL still counts as a cite.
  if (/\baiagentsinfo(?:\.com)?\b/i.test(text)) add("aiagentsinfo.com");

  const ourIndex = hosts.findIndex((host) => OUR_HOSTS.has(host) || host.endsWith(".aiagentsinfo.com"));
  const cited = ourIndex >= 0;
  const competitors = hosts
    .filter((host) => !OUR_HOSTS.has(host) && !host.endsWith(".aiagentsinfo.com"))
    .slice(0, 12)
    .join(",");

  return {
    cited,
    position: cited ? ourIndex + 1 : null,
    snippet: text.replace(/\s+/g, " ").trim().slice(0, 400),
    competitors,
    hosts,
  };
}

function normalizeHost(value: string) {
  let raw = value.trim().toLowerCase();
  if (!raw) return "";
  if (!raw.includes("://")) raw = `https://${raw}`;
  try {
    return new URL(raw).hostname.replace(/\.$/, "");
  } catch {
    return "";
  }
}

function isNoiseHost(host: string) {
  if (host === "localhost" || host.endsWith(".local")) return true;
  if (
    /^(openai|anthropic|google|googleapis|gstatic|microsoft|bing|perplexity|x|twitter|github|wikipedia|wikimedia|youtube|youtu\.be|cloudflare|vercel)\./.test(
      host,
    )
  ) {
    return true;
  }
  if (
    [
      "openai.com",
      "chatgpt.com",
      "anthropic.com",
      "claude.ai",
      "google.com",
      "gemini.google.com",
      "perplexity.ai",
      "bing.com",
      "microsoft.com",
      "copilot.microsoft.com",
      "github.com",
      "wikipedia.org",
    ].includes(host)
  ) {
    return true;
  }
  return false;
}
