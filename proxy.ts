import { trackAICrawlerRequest } from "@datafast/ai-crawl";
import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

/** Same public ID as the DataFast browser script in app/layout.tsx. */
const DATAFAST_WEBSITE_ID = "dfid_0z04dGwxdEtL6cLScbJkR";

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const authToken = process.env.DATAFAST_BOT_TOKEN?.trim();

  // Do not await. The package schedules the DataFast call with event.waitUntil.
  trackAICrawlerRequest(request, event, {
    websiteId: DATAFAST_WEBSITE_ID,
    ...(authToken ? { authToken } : {}),
  });

  return NextResponse.next();
}

export const config = {
  // Keep crawler-facing files and the IndexNow key file on this proxy.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
