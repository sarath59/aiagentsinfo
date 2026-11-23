const SESSION_WINDOW_MS = 30 * 60 * 1000;

/** Stable session id for ~30 minutes: bot + hashed IP + time bucket. No DB read. */
export async function sessionId(botToken: string, ipHash: string, at = Date.now()) {
  const bucket = Math.floor(at / SESSION_WINDOW_MS);
  const material = `${botToken}|${ipHash || "noip"}|${bucket}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(material));
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 24);
}

export function sessionWindowMs() {
  return SESSION_WINDOW_MS;
}
