import { after } from "next/server";

/**
 * Server-side DataFast goals.
 * POST https://datafa.st/api/v1/goals with the visitor's datafast_visitor_id cookie.
 * If DATAFAST_API_KEY is unset, this is a silent no-op.
 * Metadata is slugs only. Do not pass an email or any other personal data.
 */

const ENDPOINT = "https://datafa.st/api/v1/goals";
const GOAL_NAME = /^[a-z0-9_:-]{1,64}$/;
const META_KEY = /^[a-z0-9_-]{1,64}$/;
const VISITOR_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function trackServerGoal(request: Request, name: string, metadata?: Record<string, string>) {
  const key = process.env.DATAFAST_API_KEY?.trim();
  if (!key || !GOAL_NAME.test(name)) return;

  const visitorId = readCookie(request, "datafast_visitor_id");
  if (!visitorId || !VISITOR_ID.test(visitorId)) return;

  const params = goalMetadata(metadata);
  const body = JSON.stringify({
    datafast_visitor_id: visitorId,
    name,
    ...(params ? { metadata: params } : {}),
  });

  const send = async () => {
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body,
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok && response.status !== 404) {
        console.warn(`[datafast] ${name} ${response.status}`);
      }
      await response.body?.cancel().catch(() => undefined);
    } catch {
      // The visitor action already succeeded. A missed goal must stay invisible.
    }
  };

  try {
    after(send);
  } catch {
    // after() is only available during a request. Drop the goal rather than fail the request.
  }
}

function goalMetadata(metadata?: Record<string, string>) {
  if (!metadata) return undefined;
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (!META_KEY.test(key) || typeof value !== "string") continue;
    const clean = value.trim().slice(0, 255);
    if (!clean || clean.includes("@")) continue;
    params[key] = clean;
    if (Object.keys(params).length >= 10) break;
  }
  return Object.keys(params).length ? params : undefined;
}

function readCookie(request: Request, name: string) {
  const header = request.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const trimmed = part.trim();
    const eq = trimmed.indexOf("=");
    if (eq <= 0 || trimmed.slice(0, eq) !== name) continue;
    try {
      return decodeURIComponent(trimmed.slice(eq + 1));
    } catch {
      return null;
    }
  }
  return null;
}
