import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { trackBotRequest } from "@/lib/bot-tracking";

export function proxy(request: NextRequest, event: NextFetchEvent) {
  // AI/bot tracker → Supabase. Do not await; waitUntil keeps the page fast.
  // Human pageviews/goals go through SiteTracker → /api/analytics/collect.
  trackBotRequest(request, event);

  if (
    request.nextUrl.pathname === "/directory" &&
    request.nextUrl.searchParams.get("audience") === "kids"
  ) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("audience");
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Include /api so agent POSTs to tools/MCP are counted as interacts.
  // Static Next assets stay out. Local filters skip humans and binary files.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
