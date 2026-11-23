/**
 * BOT_TRACKING_API_KEY protects read/write report APIs.
 * Accept Authorization: Bearer <key> or x-bot-tracking-key: <key>.
 */
export function botTrackingApiKey() {
  return process.env.BOT_TRACKING_API_KEY?.trim() || "";
}

export function authorizeBotTracking(request: Request): { ok: true } | { ok: false; status: number; message: string } {
  const expected = botTrackingApiKey();
  if (!expected) {
    return { ok: false, status: 503, message: "BOT_TRACKING_API_KEY is not configured." };
  }
  const provided = readKey(request);
  if (!provided || !keysMatch(provided, expected)) {
    return { ok: false, status: 401, message: "Unauthorized." };
  }
  return { ok: true };
}

function readKey(request: Request) {
  const header = request.headers.get("x-bot-tracking-key")?.trim();
  if (header) return header;
  const auth = request.headers.get("authorization");
  if (!auth) return null;
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
}

/** Timing-safe string compare without node:crypto (edge + node). */
function keysMatch(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
