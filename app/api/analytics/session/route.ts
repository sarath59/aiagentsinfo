import { ADMIN_COOKIE, adminAuthorized, adminKey } from "@/lib/analytics/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key") ?? "";
  const fail = dashboardUrl(request);
  if (!adminKey()) {
    fail.searchParams.set("error", "config");
    return redirect(fail);
  }
  if (!adminAuthorized(key)) {
    fail.searchParams.set("error", "1");
    return redirect(fail);
  }
  const destination = dashboardUrl(request);
  const ok = NextResponse.redirect(destination);
  ok.cookies.set(ADMIN_COOKIE, key, {
    httpOnly: true,
    sameSite: "lax",
    secure: destination.protocol === "https:",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  ok.headers.set("X-Robots-Tag", "noindex, nofollow");
  ok.headers.set("Cache-Control", "private, no-store");
  return ok;
}

function dashboardUrl(request: Request) {
  const url = new URL(request.url);
  const forwardedHost = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "").split(",")[0]?.trim();
  if (forwardedHost) url.host = forwardedHost;
  const proto = request.headers.get("x-forwarded-proto");
  if (proto) url.protocol = proto.endsWith(":") ? proto : `${proto}:`;
  url.pathname = "/admin/analytics";
  url.search = "";
  return url;
}

function redirect(url: URL) {
  const response = NextResponse.redirect(url);
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
