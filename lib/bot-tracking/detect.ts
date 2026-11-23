import { matchOrder, type BotPurpose, type TrackedBot } from "@/lib/bot-tracking/catalog";

export type DetectedBot = {
  token: string;
  operator: string;
  purpose: BotPurpose;
  /** true when matched a named catalog token; false for generic bot/crawler UA catch-all */
  known: boolean;
};

const GENERIC_BOT =
  /(?:^|[^\w])(?:bot|crawler|spider|slurp|fetch(?:er)?|scrap(?:e|er)|httpclient|python-requests|aiohttp|go-http-client|java\/|okhttp|libwww|wget|curl|httpx|node-fetch|undici)(?:[^\w]|$)/i;

/** Browser-like UAs that contain "bot" as a product name or false friend. */
const NOT_A_BOT =
  /(?:google chrome|chromium|safari\/|firefox\/|edg\/|opr\/|samsungbrowser|mobile safari)/i;

/** This site's own outbound fetchers (IndexNow, robots checker, etc.). */
const OWN_FETCHER = /aiagentsinfo-/i;

export function detectBot(userAgent: string | null | undefined): DetectedBot | null {
  if (!userAgent) return null;
  const ua = userAgent.trim();
  if (!ua || ua.length > 512) return null;
  const lower = ua.toLowerCase();

  for (const { bot, needle } of matchOrder) {
    if (lower.includes(needle)) return fromCatalog(bot);
  }

  if (OWN_FETCHER.test(ua) || NOT_A_BOT.test(ua)) return null;
  if (!GENERIC_BOT.test(ua)) return null;

  return {
    token: "unknown-bot",
    operator: "unknown",
    purpose: "other",
    known: false,
  };
}

function fromCatalog(bot: TrackedBot): DetectedBot {
  return {
    token: bot.token,
    operator: bot.operator,
    purpose: bot.purpose,
    known: true,
  };
}
