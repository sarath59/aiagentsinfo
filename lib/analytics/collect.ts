import { redactSupabase, supabaseConfig, supabaseHeaders } from "@/lib/supabase";
import { aiReferrerFrom, referrerHostFromUrl } from "@/lib/analytics/ai-referrer";

export type VisitorEventInput = {
  event_type: "pageview" | "goal" | "click";
  name?: string;
  path?: string;
  visitor_id: string;
  session_id: string;
  referrer?: string;
  referrer_host?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  ai_referrer?: string;
  metadata?: Record<string, string>;
  ua?: string;
};

const GOAL_NAME = /^[a-z0-9_:-]{1,64}$/;
const PATH_OK = /^\/[\w\-./]*$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function normalizeVisitorEvent(raw: VisitorEventInput) {
  if (raw.event_type !== "pageview" && raw.event_type !== "goal" && raw.event_type !== "click") {
    return null;
  }
  if (!UUID.test(raw.visitor_id) || !UUID.test(raw.session_id)) return null;

  const path = cleanPath(raw.path);
  const name =
    raw.event_type === "pageview"
      ? path
      : cleanName(raw.name) || (raw.event_type === "click" ? "click" : "");
  if (raw.event_type === "goal" && !name) return null;
  if (raw.event_type === "pageview" && !path) return null;

  const referrer_host = (raw.referrer_host || referrerHostFromUrl(raw.referrer || null)).slice(0, 120);
  const utm_source = cleanUtm(raw.utm_source);
  const utm_medium = cleanUtm(raw.utm_medium);
  const utm_campaign = cleanUtm(raw.utm_campaign);
  const ai_referrer =
    (raw.ai_referrer || "").slice(0, 32) ||
    aiReferrerFrom({ referrerHost: referrer_host, utmSource: utm_source });

  return {
    event_type: raw.event_type,
    name: name.slice(0, 200),
    path: path.slice(0, 500),
    visitor_id: raw.visitor_id,
    session_id: raw.session_id,
    referrer_host,
    utm_source,
    utm_medium,
    utm_campaign,
    ai_referrer,
    meta: cleanMeta(raw.metadata),
    ua: (raw.ua || "").trim().slice(0, 180),
  };
}

export async function insertVisitorEvent(row: ReturnType<typeof normalizeVisitorEvent>) {
  if (!row) return { ok: false as const, reason: "invalid" as const };
  const config = supabaseConfig();
  if (!config) return { ok: false as const, reason: "no_supabase" as const };

  try {
    const response = await fetch(`${config.restUrl}/visitor_events`, {
      method: "POST",
      headers: supabaseHeaders(config, {
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      }),
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(2000),
    });
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.warn(`[analytics] insert ${response.status}: ${redactSupabase(body, config)}`);
      return { ok: false as const, reason: "supabase" as const };
    }
    await response.body?.cancel().catch(() => undefined);
    return { ok: true as const };
  } catch {
    return { ok: false as const, reason: "network" as const };
  }
}

function cleanPath(path?: string) {
  if (!path) return "";
  let value = path.split("?")[0] ?? "";
  if (!value.startsWith("/")) value = `/${value}`;
  if (value.length > 1 && value.endsWith("/")) value = value.slice(0, -1);
  if (!PATH_OK.test(value) && value !== "/") return "";
  return value.slice(0, 500);
}

function cleanName(name?: string) {
  if (!name || !GOAL_NAME.test(name)) return "";
  return name;
}

function cleanUtm(value?: string) {
  if (!value || typeof value !== "string") return "";
  return value.replace(/[<>'"&]/g, "").trim().slice(0, 64);
}

function cleanMeta(metadata?: Record<string, string>) {
  if (!metadata) return {};
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (!/^[a-z0-9_-]{1,32}$/.test(key) || typeof value !== "string") continue;
    const clean = value.replace(/[<>'"&]/g, "").trim().slice(0, 255);
    if (!clean || clean.includes("@")) continue;
    out[key] = clean;
    if (Object.keys(out).length >= 10) break;
  }
  return out;
}
