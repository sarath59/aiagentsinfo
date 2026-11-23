import { NextResponse } from "next/server";
import { authorizeBotTracking } from "@/lib/bot-tracking/auth";
import { daysAgoIso, supabaseSelect } from "@/lib/bot-tracking/queries";

export const runtime = "nodejs";

type Report =
  | "overview"
  | "pages"
  | "goals"
  | "referrers"
  | "ai-referrals"
  | "answer-to-visit"
  | "funnel-submit"
  | "submissions"
  | "submission-rejects"
  | "submission-categories"
  | "funnel-report-read"
  | "citations"
  | "citation-prompts"
  | "citation-summary"
  | "citation-by-prompt"
  | "meta";

/**
 * Human analytics reports (first-party, replaces DataFast dashboards).
 * Auth: Authorization: Bearer $BOT_TRACKING_API_KEY
 */
export async function GET(request: Request) {
  const auth = authorizeBotTracking(request);
  if (!auth.ok) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }

  const url = new URL(request.url);
  const report = (url.searchParams.get("report") || "overview") as Report;
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
    case "overview":
      return supabaseSelect(
        `visitor_daily?day=gte.${encodeURIComponent(since.slice(0, 10))}&order=day.desc&limit=${limit}`,
      );
    case "pages":
      return supabaseSelect(`visitor_page_counts?order=pageviews.desc&limit=${limit}`);
    case "goals":
      return supabaseSelect(`visitor_goal_counts?order=hits.desc&limit=${limit}`);
    case "referrers":
      return supabaseSelect(`visitor_referrer_counts?order=pageviews.desc&limit=${limit}`);
    case "ai-referrals":
      return supabaseSelect(`visitor_ai_referrals?order=pageviews.desc&limit=${limit}`);
    case "answer-to-visit":
      return supabaseSelect(
        `ai_answer_to_visit?day=gte.${encodeURIComponent(since.slice(0, 10))}&order=day.desc&limit=${limit}`,
      );
    case "funnel-submit":
      return supabaseSelect(`visitor_funnel_submit?order=step_index.asc`);
    case "submissions":
      return supabaseSelect(`submission_goal_counts?order=hits.desc&limit=${limit}`);
    case "submission-rejects":
      return supabaseSelect(`submission_reject_reasons?order=hits.desc&limit=${limit}`);
    case "submission-categories":
      return supabaseSelect(`submission_by_category?order=attempts.desc&limit=${limit}`);
    case "funnel-report-read":
      return supabaseSelect(`visitor_funnel_report_read?order=step_index.asc`);
    case "citations":
      return supabaseSelect(
        `ai_citation_checks?checked_at=gte.${encodeURIComponent(since)}&order=checked_at.desc&limit=${limit}`,
      );
    case "citation-prompts":
      return supabaseSelect(`ai_citation_prompts?active=eq.true&order=id.asc&limit=${limit}`);
    case "citation-summary":
      return supabaseSelect(
        `ai_citation_summary?day=gte.${encodeURIComponent(since.slice(0, 10))}&order=day.desc&limit=${limit}`,
      );
    case "citation-by-prompt":
      return supabaseSelect(`ai_citation_by_prompt?order=cited.desc&limit=${limit}`);
    case "meta":
      return {
        reports: [
          "overview",
          "pages",
          "goals",
          "referrers",
          "ai-referrals",
          "answer-to-visit",
          "funnel-submit",
          "submissions",
          "submission-rejects",
          "submission-categories",
          "funnel-report-read",
          "citations",
          "citation-prompts",
          "citation-summary",
          "citation-by-prompt",
          "meta",
        ],
        auth: "Authorization: Bearer $BOT_TRACKING_API_KEY",
        citations_run: "POST /api/analytics/citations/run (manual; no Vercel cron)",
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
