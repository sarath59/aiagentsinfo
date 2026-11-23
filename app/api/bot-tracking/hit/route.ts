import { NextResponse } from "next/server";
import { authorizeBotTracking } from "@/lib/bot-tracking/auth";
import { buildHit, persistHit, type BotHitRow } from "@/lib/bot-tracking/record";
import { supabaseConfig } from "@/lib/supabase";

export const runtime = "nodejs";

/**
 * Authenticated ingest / status attach.
 *
 * POST JSON:
 * - `{ "hit": { ...BotHitRow fields } }` — record an explicit hit (backfill, status-aware).
 * - `{ "status": 200 }` with a bot User-Agent on this request — build + record from headers.
 *
 * Auth: Authorization: Bearer $BOT_TRACKING_API_KEY
 */
export async function POST(request: Request) {
  const auth = authorizeBotTracking(request);
  if (!auth.ok) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }

  const config = supabaseConfig();
  if (!config) {
    return NextResponse.json({ message: "Supabase is not configured." }, { status: 503 });
  }

  let body: { status?: number; hit?: Partial<BotHitRow> } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    body = {};
  }

  if (body.hit && typeof body.hit === "object") {
    const row = normalizePostedHit(body.hit);
    if (!row) {
      return NextResponse.json({ message: "hit.bot_token and hit.path are required." }, { status: 400 });
    }
    const result = await persistHit(config, row);
    return NextResponse.json({ tracked: true, result, row });
  }

  const status = typeof body.status === "number" ? body.status : 0;
  const row = await buildHit(request, status);
  if (!row) {
    return NextResponse.json({ tracked: false, reason: "not_a_bot_or_ignored" });
  }
  const result = await persistHit(config, row);
  return NextResponse.json({ tracked: true, result, row });
}

function normalizePostedHit(input: Partial<BotHitRow>): BotHitRow | null {
  const bot_token = String(input.bot_token ?? "").trim().slice(0, 80);
  const path = String(input.path ?? "").trim().slice(0, 500);
  if (!bot_token || !path) return null;
  return {
    bot_token,
    operator: String(input.operator ?? "").slice(0, 80),
    purpose: String(input.purpose ?? "other").slice(0, 20),
    path,
    kind: String(input.kind ?? "view").slice(0, 16),
    method: String(input.method ?? "GET").slice(0, 16),
    accept: String(input.accept ?? "").slice(0, 120),
    referer_host: String(input.referer_host ?? "").slice(0, 120),
    query_keys: String(input.query_keys ?? "").slice(0, 200),
    ua: String(input.ua ?? "").slice(0, 180),
    session_id: String(input.session_id ?? "").slice(0, 64),
    status: Number.isFinite(input.status) ? Math.max(0, Math.min(599, Math.trunc(Number(input.status)))) : 0,
    ip_hash: String(input.ip_hash ?? "").slice(0, 64),
    ip_verified: String(input.ip_verified ?? "unknown").slice(0, 16),
    accept_html: Boolean(input.accept_html),
    accept_markdown: Boolean(input.accept_markdown),
    accept_json: Boolean(input.accept_json),
    known: input.known !== false,
    ua_hash: String(input.ua_hash ?? "").slice(0, 64),
  };
}
