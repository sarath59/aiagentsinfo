import type { SupabaseConfig } from "@/lib/supabase";
import { redactSupabase, supabaseConfig, supabaseHeaders } from "@/lib/supabase";
import { parseAccept } from "@/lib/bot-tracking/accept";
import { deliverNewAgentAlert } from "@/lib/bot-tracking/alert";
import { detectBot } from "@/lib/bot-tracking/detect";
import { clientIp, hashIp, verifyIp } from "@/lib/bot-tracking/ip";
import { hitKind, normalizePath, shouldIgnorePath } from "@/lib/bot-tracking/kind";
import { sessionId } from "@/lib/bot-tracking/session";

type WaitUntilHost = {
  waitUntil?: (promise: Promise<unknown>) => void;
};

export type BotHitRow = {
  bot_token: string;
  operator: string;
  purpose: string;
  path: string;
  kind: string;
  method: string;
  accept: string;
  referer_host: string;
  query_keys: string;
  ua: string;
  session_id: string;
  status: number;
  ip_hash: string;
  ip_verified: string;
  accept_html: boolean;
  accept_markdown: boolean;
  accept_json: boolean;
  known: boolean;
  ua_hash: string;
};

const TIMEOUT_MS = 2000;

/**
 * Detect an AI/crawler from the request and schedule a Supabase record_bot_hit RPC.
 * Call without await. Uses waitUntil when the host provides it (Vercel proxy).
 * Humans and ignored paths never touch the network.
 */
export function trackBotRequest(
  request: Request,
  host?: WaitUntilHost | null,
  options?: { status?: number },
) {
  const config = supabaseConfig();
  if (!config) return { tracked: false as const, reason: "no_supabase" as const };

  const send = (async () => {
    const row = await buildHit(request, options?.status ?? 0);
    if (!row) return { tracked: false as const };
    await persistHit(config, row);
    return { tracked: true as const, row };
  })();

  if (typeof host?.waitUntil === "function") {
    host.waitUntil(send);
    return { tracked: true as const, scheduled: true as const };
  }

  void send;
  return { tracked: true as const, scheduled: false as const };
}

/** Persist an already-built hit (API ingest / tests). */
export function scheduleHit(row: BotHitRow, host?: WaitUntilHost | null) {
  const config = supabaseConfig();
  if (!config) return { tracked: false as const, reason: "no_supabase" as const };
  const send = persistHit(config, row);
  if (typeof host?.waitUntil === "function") {
    host.waitUntil(send);
    return { tracked: true as const, scheduled: true as const };
  }
  void send;
  return { tracked: true as const, scheduled: false as const };
}

export async function buildHit(request: Request, status = 0): Promise<BotHitRow | null> {
  const method = (request.method || "GET").toUpperCase();
  if (method === "OPTIONS") return null;

  let url: URL;
  try {
    url = new URL(request.url);
  } catch {
    return null;
  }

  if (shouldIgnorePath(url.pathname)) return null;

  const ua = request.headers.get("user-agent");
  const bot = detectBot(ua);
  if (!bot) return null;

  const ip = clientIp(request);
  const ipHash = await hashIp(ip);
  const accept = parseAccept(request.headers.get("accept"));
  const uaText = (ua ?? "").trim().slice(0, 180);
  const uaHash = bot.known ? "" : await hashIp(`ua:${uaText}`);

  return {
    bot_token: bot.token.slice(0, 80),
    operator: bot.operator.slice(0, 80),
    purpose: bot.purpose,
    path: normalizePath(url.pathname),
    kind: hitKind(method, url.pathname),
    method: method.slice(0, 16),
    accept: accept.accept,
    referer_host: refererHost(request.headers.get("referer")),
    query_keys: queryKeyList(url),
    ua: uaText,
    session_id: await sessionId(bot.token, ipHash),
    status: Number.isFinite(status) ? Math.max(0, Math.min(599, Math.trunc(status))) : 0,
    ip_hash: ipHash,
    ip_verified: verifyIp(ip, bot.operator, bot.token),
    accept_html: accept.accept_html,
    accept_markdown: accept.accept_markdown,
    accept_json: accept.accept_json,
    known: bot.known,
    ua_hash: uaHash,
  };
}

export async function persistHit(config: SupabaseConfig, row: BotHitRow) {
  try {
    const response = await fetch(`${config.restUrl}/rpc/record_bot_hit`, {
      method: "POST",
      headers: supabaseHeaders(config, {
        "Content-Type": "application/json",
        Prefer: "return=representation",
      }),
      body: JSON.stringify({ p_hit: row }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const body = await response.text().catch(() => "");
    if (!response.ok) {
      console.warn(`[bot-tracking] rpc ${response.status}: ${redactSupabase(body, config)}`);
      return null;
    }
    let parsed: { ok?: boolean; is_new?: boolean } | null = null;
    try {
      parsed = body ? (JSON.parse(body) as { ok?: boolean; is_new?: boolean }) : null;
    } catch {
      parsed = null;
    }
    if (parsed?.is_new) {
      await deliverNewAgentAlert({
        bot_token: row.bot_token,
        operator: row.operator,
        purpose: row.purpose,
        sample_path: row.path,
        sample_ua: row.ua,
      });
    }
    return parsed;
  } catch {
    return null;
  }
}

function refererHost(referer: string | null) {
  if (!referer) return "";
  try {
    return new URL(referer).hostname.slice(0, 120);
  } catch {
    return "";
  }
}

/** Param names only, never values (no tokens, emails, or search strings). */
function queryKeyList(url: URL) {
  const keys = [...new Set([...url.searchParams.keys()])].sort();
  return keys.slice(0, 20).join(",").slice(0, 200);
}
