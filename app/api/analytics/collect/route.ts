import { NextResponse } from "next/server";
import { insertVisitorEvent, normalizeVisitorEvent, type VisitorEventInput } from "@/lib/analytics/collect";
import { takeAnalyticsLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY = 8_000;

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const limit = takeAnalyticsLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  const text = await request.text();
  if (text.length > MAX_BODY) {
    return NextResponse.json({ ok: false }, { status: 413 });
  }

  let raw: VisitorEventInput;
  try {
    raw = JSON.parse(text) as VisitorEventInput;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const row = normalizeVisitorEvent({
    ...raw,
    ua: raw.ua || request.headers.get("user-agent") || "",
  });
  if (!row) return NextResponse.json({ ok: false }, { status: 400 });

  const result = await insertVisitorEvent(row);
  if (!result.ok) return NextResponse.json({ ok: false }, { status: 502 });
  return new NextResponse(null, { status: 204 });
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) {
    // sendBeacon sometimes omits Origin; require a site referer instead.
    const referer = request.headers.get("referer") || "";
    return /https?:\/\/(www\.)?aiagentsinfo\.com\//.test(referer) || /localhost:\d+/.test(referer);
  }
  try {
    const host = new URL(origin).hostname;
    return (
      host === "www.aiagentsinfo.com" ||
      host === "aiagentsinfo.com" ||
      host === "localhost" ||
      host.endsWith(".vercel.app")
    );
  } catch {
    return false;
  }
}
