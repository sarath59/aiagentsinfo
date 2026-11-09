import { NextResponse } from "next/server";
import { takeRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

/** Public Kit form used by the existing embed. Email only. This route does not store the address. */
const KIT_SUBSCRIBE = "https://app.kit.com/forms/10145773/subscriptions";

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ message: "Subscriptions have to come from this site." }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as
    | { email?: string; audience?: string; company?: string }
    | null;
  if (body?.company) {
    return NextResponse.json({
      ok: true,
      message: "Check your email to confirm the weekly note.",
    });
  }

  const email = body?.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "A valid email is required." }, { status: 400 });
  }

  const limit = takeRateLimit(`newsletter:${clientIp(request)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { message: "Too many tries from this network. Wait a bit and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  let response: Response;
  try {
    response = await fetch(KIT_SUBSCRIBE, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({ email_address: email }),
      redirect: "manual",
    });
  } catch {
    return NextResponse.json(
      { message: "The newsletter form could not be reached. The address was not stored." },
      { status: 502 },
    );
  }

  if (response.status >= 400) {
    return NextResponse.json(
      { message: "The newsletter form did not accept that address. Nothing was stored on this site." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Check your email to confirm. Kit sends the weekly note. This site does not keep the address.",
  });
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function sameOrigin(request: Request) {
  const source = request.headers.get("origin") || request.headers.get("referer");
  if (!source) return true;
  let host: string;
  try {
    host = new URL(source).host.toLowerCase();
  } catch {
    return false;
  }
  const requestHost = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  const allowed = new Set([
    requestHost,
    "www.aiagentsinfo.com",
    "aiagentsinfo.com",
    "localhost:3000",
    "127.0.0.1:3000",
  ]);
  return allowed.has(host);
}
