import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { trackBotRequest } from "@/lib/bot-tracking";

export function proxy(request: NextRequest, event: NextFetchEvent) {
  // Own AI/bot tracker → Supabase. Do not await; waitUntil keeps the page fast.
  // Normal DataFast page analytics stay in app/layout.tsx (browser script).
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
