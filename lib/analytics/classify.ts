export type AgentKind = "search" | "ai_training" | "ai_search" | "ai_user" | "bot" | "human";

export type AgentMatch = {
  kind: AgentKind;
  /** Stable bot name. Empty for humans. */
  name: string;
};

type Rule = {
  kind: Exclude<AgentKind, "human">;
  name: string;
  pattern: RegExp;
};

/**
 * Ordered on purpose. More specific AI agents are matched before the generic
 * "bot" fallback, and extended crawlers are matched before their search cousins
 * (Applebot-Extended before Applebot, Claude-SearchBot before ClaudeBot).
 */
const RULES: Rule[] = [
  { kind: "ai_user", name: "ChatGPT-User", pattern: /ChatGPT-User/i },
  { kind: "ai_user", name: "Claude-User", pattern: /Claude-User/i },
  { kind: "ai_user", name: "Perplexity-User", pattern: /Perplexity-User/i },
  { kind: "ai_user", name: "Gemini-User", pattern: /Gemini-User|Google-Agent|GoogleAgent/i },
  { kind: "ai_user", name: "Mistral-User", pattern: /MistralAI-User|Mistral-User/i },
  { kind: "ai_user", name: "Copilot-User", pattern: /Copilot-User/i },

  { kind: "ai_search", name: "OAI-SearchBot", pattern: /OAI-SearchBot/i },
  { kind: "ai_search", name: "PerplexityBot", pattern: /PerplexityBot/i },
  { kind: "ai_search", name: "Claude-SearchBot", pattern: /Claude-SearchBot/i },
  { kind: "ai_search", name: "YouBot", pattern: /YouBot/i },
  { kind: "ai_search", name: "PhindBot", pattern: /PhindBot/i },
  { kind: "ai_search", name: "DuckAssistBot", pattern: /DuckAssistBot/i },
  { kind: "ai_search", name: "AndiBot", pattern: /AndiBot/i },
  { kind: "ai_search", name: "Kagi", pattern: /KagiBot/i },

  { kind: "ai_training", name: "GPTBot", pattern: /GPTBot/i },
  { kind: "ai_training", name: "ClaudeBot", pattern: /ClaudeBot|anthropic-ai/i },
  { kind: "ai_training", name: "Google-Extended", pattern: /Google-Extended/i },
  { kind: "ai_training", name: "CCBot", pattern: /CCBot/i },
  { kind: "ai_training", name: "Bytespider", pattern: /Bytespider/i },
  { kind: "ai_training", name: "Applebot-Extended", pattern: /Applebot-Extended/i },
  { kind: "ai_training", name: "Amazonbot", pattern: /Amazonbot/i },
  { kind: "ai_training", name: "Meta-ExternalAgent", pattern: /Meta-ExternalAgent|Meta-ExternalFetcher|FacebookBot/i },
  { kind: "ai_training", name: "Diffbot", pattern: /Diffbot/i },
  { kind: "ai_training", name: "Cohere", pattern: /cohere-ai|CohereBot/i },
  { kind: "ai_training", name: "AI2Bot", pattern: /AI2Bot/i },
  { kind: "ai_training", name: "ImagesiftBot", pattern: /ImagesiftBot/i },
  { kind: "ai_training", name: "Omgili", pattern: /Omgili|omgili/i },
  { kind: "ai_training", name: "Timpi", pattern: /Timpibot/i },
  { kind: "ai_training", name: "Kangaroo", pattern: /Kangaroo Bot/i },
  { kind: "ai_training", name: "ICC-Crawler", pattern: /ICC-Crawler/i },
  { kind: "ai_training", name: "PanguBot", pattern: /PanguBot/i },

  { kind: "search", name: "Googlebot", pattern: /Googlebot|Google-InspectionTool|Storebot-Google|AdsBot-Google|Mediapartners-Google|GoogleOther|APIs-Google/i },
  { kind: "search", name: "Bingbot", pattern: /bingbot|BingPreview|msnbot|AdIdxBot/i },
  { kind: "search", name: "DuckDuckBot", pattern: /DuckDuckBot/i },
  { kind: "search", name: "Applebot", pattern: /Applebot/i },
  { kind: "search", name: "Baiduspider", pattern: /Baiduspider/i },
  { kind: "search", name: "YandexBot", pattern: /YandexBot|YandexImages/i },
  { kind: "search", name: "Yahoo", pattern: /Slurp/i },
  { kind: "search", name: "Sogou", pattern: /Sogou/i },
  { kind: "search", name: "Naver", pattern: /Yeti|NaverBot/i },
  { kind: "search", name: "Seznam", pattern: /SeznamBot/i },
  { kind: "search", name: "Qwant", pattern: /Qwantify/i },
  { kind: "search", name: "PetalBot", pattern: /PetalBot/i },
  { kind: "search", name: "Mojeek", pattern: /MojeekBot/i },

  { kind: "bot", name: "AhrefsBot", pattern: /AhrefsBot/i },
  { kind: "bot", name: "SemrushBot", pattern: /SemrushBot/i },
  { kind: "bot", name: "MJ12bot", pattern: /MJ12bot/i },
  { kind: "bot", name: "DotBot", pattern: /DotBot/i },
  { kind: "bot", name: "DataForSeoBot", pattern: /DataForSeoBot/i },
  { kind: "bot", name: "Headless Chrome", pattern: /HeadlessChrome|PhantomJS|Puppeteer/i },
  { kind: "bot", name: "Lighthouse", pattern: /Chrome-Lighthouse|PTST\/|PageSpeed/i },
  { kind: "bot", name: "Facebook preview", pattern: /facebookexternalhit/i },
  { kind: "bot", name: "Twitterbot", pattern: /Twitterbot/i },
  { kind: "bot", name: "LinkedInBot", pattern: /LinkedInBot/i },
  { kind: "bot", name: "Slackbot", pattern: /Slackbot/i },
  { kind: "bot", name: "Discordbot", pattern: /Discordbot/i },
  { kind: "bot", name: "TelegramBot", pattern: /TelegramBot/i },
  { kind: "bot", name: "WhatsApp", pattern: /WhatsApp/i },
  { kind: "bot", name: "Script", pattern: /python-requests|python-urllib|aiohttp|httpx|Scrapy|curl\/|Wget\/|Go-http-client|libwww-perl|okhttp|Java\//i },
];

const GENERIC_BOT = /bot|crawler|spider|crawling|slurp|archiver|headless/i;

export function classifyAgent(userAgent: string | null | undefined): AgentMatch {
  const ua = userAgent?.trim() || "";
  if (!ua) return { kind: "bot", name: "Empty UA" };
  for (const rule of RULES) {
    if (rule.pattern.test(ua)) return { kind: rule.kind, name: rule.name };
  }
  if (GENERIC_BOT.test(ua)) {
    const named = ua.match(/[A-Za-z][A-Za-z0-9._+-]{1,40}(?:bot|crawler|spider)/i);
    return { kind: "bot", name: named?.[0] || "Other bot" };
  }
  return { kind: "human", name: "" };
}

export function isAiKind(kind: AgentKind) {
  return kind === "ai_training" || kind === "ai_search" || kind === "ai_user";
}

/** Referral from an AI assistant. Matched on the hostname, not the path. */
export function aiReferralSource(referrer: string | null | undefined): string | null {
  if (!referrer) return null;
  let host = "";
  try {
    host = new URL(referrer).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
  if (!host) return null;
  const labels = host.split(".");
  const has = (token: string) => host === token || host.endsWith(`.${token}`) || labels.includes(token);
  if (has("chatgpt.com") || host === "chat.openai.com" || host.endsWith(".chat.openai.com")) return "ChatGPT";
  if (has("perplexity.ai")) return "Perplexity";
  if (has("claude.ai")) return "Claude";
  if (has("gemini") || host === "bard.google.com") return "Gemini";
  if (has("copilot")) return "Copilot";
  return null;
}

export type ParsedUa = {
  device: "mobile" | "tablet" | "desktop";
  os: string;
  browser: string;
};

export function parseUserAgent(userAgent: string | null | undefined): ParsedUa {
  const ua = userAgent || "";
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\/|Opera/.test(ua)
      ? "Opera"
      : /SamsungBrowser/.test(ua)
        ? "Samsung Internet"
        : /Firefox\/|FxiOS\//.test(ua)
          ? "Firefox"
          : /CriOS\/|Chrome\//.test(ua)
            ? "Chrome"
            : /Safari\//.test(ua)
              ? "Safari"
              : "Other";

  const os = /Windows/.test(ua)
    ? "Windows"
    : /iPhone|iPad|iPod/.test(ua)
      ? "iOS"
      : /Android/.test(ua)
        ? "Android"
        : /Mac OS X/.test(ua)
          ? "macOS"
          : /CrOS/.test(ua)
            ? "ChromeOS"
            : /Linux/.test(ua)
              ? "Linux"
              : "Other";

  let device: ParsedUa["device"] = "desktop";
  if (/iPad|Tablet|PlayBook|Silk/.test(ua) || (/Android/.test(ua) && !/Mobile/.test(ua))) device = "tablet";
  else if (/Mobi|iPhone|iPod|Android/.test(ua)) device = "mobile";

  return { device, os, browser };
}
