import { NextResponse } from "next/server";
import { authorizeBotTracking } from "@/lib/bot-tracking/auth";
import { daysAgoIso, supabaseSelect } from "@/lib/bot-tracking/queries";
import { operatorsWithIpRanges } from "@/lib/bot-tracking/ip";

export const runtime = "nodejs";

type Report =
  | "stats"
  | "sessions"
  | "funnel"
  | "accept"
  | "unknown"
  | "answer-vs-training"
  | "alerts"
  | "registry"
  | "meta";

/**
 * Authenticated reports.
 * GET /api/bot-tracking?report=stats|sessions|funnel|accept|unknown|answer-vs-training|alerts|registry|meta
 * Optional: days=7 (default 30), limit=100
 * Auth: Authorization: Bearer <BOT_TRACKING_API_KEY> or x-bot-tracking-key
 */
export async function GET(request: Request) {
  const auth = authorizeBotTracking(request);
  if (!auth.ok) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }

  const url = new URL(request.url);
  const report = (url.searchParams.get("report") || "stats") as Report;
  const days = clampInt(url.searchParams.get("days"), 1, 365, 30);
  const limit = clampInt(url.searchParams.get("limit"), 1, 500, 100);
  const since = daysAgoIso(days);

  try {
    const data = await runReport(report, since, limit);
    return NextResponse.json(
      { report, days, generated_at: new Date().toISOString(), data },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Query failed.";
    return NextResponse.json({ message }, { status: 502 });
  }
}

async function runReport(report: Report, since: string, limit: number) {
  switch (report) {
    case "stats":
      return supabaseSelect(`bot_counts?order=hits.desc&limit=${limit}`);
    case "sessions":
      return supabaseSelect(
        `bot_session_summary?started_at=gte.${encodeURIComponent(since)}&order=started_at.desc&limit=${limit}`,
      );
    case "funnel":
      return supabaseSelect(`bot_discovery_funnel?order=sessions.desc&limit=${limit}`);
    case "accept":
      return supabaseSelect(`bot_accept_stats?order=hits.desc&limit=${limit}`);
    case "unknown":
      return supabaseSelect(
        `bot_unknown_samples?reviewed=eq.false&order=last_seen_at.desc&limit=${limit}`,
      );
    case "answer-vs-training":
      return supabaseSelect(
        `bot_answer_vs_training?or=(answer_hits.gt.0,training_hits.gt.0)&order=answer_hits.desc&limit=${limit}`,
      );
    case "alerts":
      return supabaseSelect(
        `bot_alerts?created_at=gte.${encodeURIComponent(since)}&order=created_at.desc&limit=${limit}`,
      );
    case "registry":
      return supabaseSelect(`bot_registry?order=last_seen_at.desc&limit=${limit}`);
    case "meta":
      return {
        ip_range_operators: operatorsWithIpRanges(),
        reports: [
          "stats",
          "sessions",
          "funnel",
          "accept",
          "unknown",
          "answer-vs-training",
          "alerts",
          "registry",
          "meta",
        ],
        auth: "Authorization: Bearer $BOT_TRACKING_API_KEY",
      };
    default:
      throw new Error(`Unknown report: ${report}`);
  }
}

function clampInt(raw: string | null, min: number, max: number, fallback: number) {
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.trunc(n)));
}
