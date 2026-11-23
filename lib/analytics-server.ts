import { after } from "next/server";
import { insertVisitorEvent, normalizeVisitorEvent } from "@/lib/analytics/collect";
import { SESSION_COOKIE, VISITOR_COOKIE, readCookieFromHeader } from "@/lib/analytics/ids";
import { aiReferrerFrom, referrerHostFromUrl } from "@/lib/analytics/ai-referrer";

const GOAL_NAME = /^[a-z0-9_:-]{1,64}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Server-side goals (e.g. listing_submitted).
 * Uses aai_vid / aai_sid cookies set by the browser tracker.
 * If cookies are missing, the goal is dropped rather than inventing an ID.
 */
export function trackServerGoal(request: Request, name: string, metadata?: Record<string, string>) {
  if (!GOAL_NAME.test(name)) return;

  const visitor_id = readCookieFromHeader(request.headers.get("cookie"), VISITOR_COOKIE);
  const session_id = readCookieFromHeader(request.headers.get("cookie"), SESSION_COOKIE);
  if (!visitor_id || !session_id || !UUID.test(visitor_id) || !UUID.test(session_id)) return;

  let path = "/";
  try {
    path = new URL(request.url).pathname;
  } catch {
    path = "/";
  }

  const referrer = request.headers.get("referer");
  const referrer_host = referrerHostFromUrl(referrer);
  const row = normalizeVisitorEvent({
    event_type: "goal",
    name,
    path,
    visitor_id,
    session_id,
    referrer_host,
    ai_referrer: aiReferrerFrom({ referrerHost: referrer_host }),
    metadata,
    ua: request.headers.get("user-agent") || "",
  });
  if (!row) return;

  const send = async () => {
    await insertVisitorEvent(row);
  };

  try {
    after(send);
  } catch {
    void send();
  }
}
