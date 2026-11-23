const VISITOR_KEY = "aai_vid";
const SESSION_KEY = "aai_sid";
const SESSION_AT_KEY = "aai_sid_at";
const SESSION_MS = 30 * 60 * 1000;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function readVisitorIds(): { visitorId: string; sessionId: string } {
  if (typeof window === "undefined") return { visitorId: "", sessionId: "" };
  const visitorId = stableId(VISITOR_KEY, 400 * 24 * 60 * 60); // ~400 days
  const sessionId = sessionIdFresh();
  return { visitorId, sessionId };
}

function sessionIdFresh() {
  const now = Date.now();
  try {
    const existing = localStorage.getItem(SESSION_KEY) ?? "";
    const at = Number(localStorage.getItem(SESSION_AT_KEY) || 0);
    if (UUID.test(existing) && now - at < SESSION_MS) {
      localStorage.setItem(SESSION_AT_KEY, String(now));
      writeCookie(SESSION_KEY, existing, 60 * 60);
      return existing;
    }
  } catch {
    // private mode
  }
  const next = crypto.randomUUID();
  try {
    localStorage.setItem(SESSION_KEY, next);
    localStorage.setItem(SESSION_AT_KEY, String(now));
  } catch {
    // ignore
  }
  writeCookie(SESSION_KEY, next, 60 * 60);
  return next;
}

function stableId(key: string, maxAgeSec: number) {
  try {
    const existing = localStorage.getItem(key) ?? readCookie(key);
    if (existing && UUID.test(existing)) {
      writeCookie(key, existing, maxAgeSec);
      localStorage.setItem(key, existing);
      return existing;
    }
  } catch {
    // ignore
  }
  const next = crypto.randomUUID();
  try {
    localStorage.setItem(key, next);
  } catch {
    // ignore
  }
  writeCookie(key, next, maxAgeSec);
  return next;
}

function writeCookie(name: string, value: string, maxAgeSec: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSec}; SameSite=Lax`;
}

function readCookie(name: string) {
  const parts = document.cookie.split(";");
  for (const part of parts) {
    const trimmed = part.trim();
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    if (trimmed.slice(0, eq) !== name) continue;
    try {
      return decodeURIComponent(trimmed.slice(eq + 1));
    } catch {
      return "";
    }
  }
  return "";
}

export function readCookieFromHeader(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
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

export const VISITOR_COOKIE = VISITOR_KEY;
export const SESSION_COOKIE = SESSION_KEY;
