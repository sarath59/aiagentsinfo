import { NextResponse } from "next/server";
import { authorizeCronOrAnalytics } from "@/lib/analytics/citations/auth";
import { runCitationSweep } from "@/lib/analytics/citations/run";
import type { CitationEngine } from "@/lib/analytics/citations/engines";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * Run one citation sweep against configured engines.
 * Auth: BOT_TRACKING_API_KEY.
 *
 * Optional JSON body: { "limitPrompts": 10, "engines": ["perplexity","chatgpt"] }
 */
export async function POST(request: Request) {
  const auth = authorizeCronOrAnalytics(request);
  if (!auth.ok) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }

  let limitPrompts = 15;
  let engines: CitationEngine[] | undefined;
  try {
    const body = (await request.json()) as { limitPrompts?: number; engines?: CitationEngine[] };
    if (typeof body.limitPrompts === "number") limitPrompts = body.limitPrompts;
    if (Array.isArray(body.engines)) engines = body.engines;
  } catch {
    // empty body is fine
  }

  try {
    const summary = await runCitationSweep({ limitPrompts, engines });
    return NextResponse.json({ ok: true, ...summary });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Citation run failed.";
    return NextResponse.json({ ok: false, message }, { status: 502 });
  }
}
