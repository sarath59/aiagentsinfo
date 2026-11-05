const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export type Geo = {
  country: string;
  region: string;
  city: string;
};

export function utcDay(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

export function recentDays(count: number, now = new Date()) {
  const start = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const days: string[] = [];
  for (let i = 0; i < count; i++) days.push(new Date(start - i * 86400000).toISOString().slice(0, 10));
  return days;
}

export function plain(value: string, max: number) {
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function privacyOptOut(headers: Headers) {
  const dnt = (headers.get("dnt") || "").toLowerCase();
  const gpc = (headers.get("sec-gpc") || "").toLowerCase();
  return dnt === "1" || dnt === "yes" || gpc === "1";
}

/** First forwarded address. Callers may hash it. Nothing here is stored. */
export function clientIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim() || headers.get("x-real-ip")?.trim() || "";
  if (!first || first.length > 64 || /\s/.test(first)) return "";
  return first;
}

/**
 * Daily-salted hash used only as a HyperLogLog member so unique networks can be
 * counted. The hash is not written to a key we can list back.
 */
export async function dailyIpHash(ip: string, now = new Date()) {
  const salt = process.env.ANALYTICS_IP_SALT?.trim();
  if (!salt || !ip) return null;
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${salt}|${now.toISOString().slice(0, 10)}|${ip}`),
  );
  const bytes = new Uint8Array(digest);
  let hex = "";
  for (let i = 0; i < 8; i++) hex += bytes[i]!.toString(16).padStart(2, "0");
  return hex;
}

export function readGeo(headers: Headers): Geo {
  const countryRaw = (headers.get("x-vercel-ip-country") || "").trim().toUpperCase();
  const country = /^[A-Z]{2}$/.test(countryRaw) ? countryRaw : "";
  const regionRaw = (headers.get("x-vercel-ip-country-region") || "").trim();
  const region = /^[A-Za-z0-9-]{1,12}$/.test(regionRaw) ? regionRaw : "";
  let city = "";
  const cityHeader = headers.get("x-vercel-ip-city");
  if (cityHeader) {
    try {
      city = plain(decodeURIComponent(cityHeader), 60);
    } catch {
      city = plain(cityHeader, 60);
    }
    if (city.includes("@")) city = "";
  }
  return { country, region, city };
}

export function cityLabel(geo: Geo) {
  return [geo.city, geo.region, geo.country].filter(Boolean).join(", ");
}

export function cleanId(input: unknown) {
  if (typeof input !== "string") return null;
  return /^[A-Za-z0-9-]{8,80}$/.test(input) ? input : null;
}

export function cleanPath(input: unknown) {
  if (typeof input !== "string") return null;
  let path = input.trim();
  if (!path || path.length > 400) return null;
  try {
    if (path.startsWith("http://") || path.startsWith("https://")) path = new URL(path).pathname;
  } catch {
    return null;
  }
  path = path.split("?")[0]?.split("#")[0] || "";
  if (!path.startsWith("/") || path.includes("..") || path.includes("\\")) return null;
  path = path.replace(/\/{2,}/g, "/");
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (path.length > 180) return null;
  if (path.startsWith("/admin") || path.startsWith("/api")) return null;
  return path;
}

export function cleanSection(input: unknown) {
  if (typeof input !== "string") return "";
  const value = plain(input, 80);
  if (!value || value.includes("@")) return "";
  return value;
}

export function cleanMs(input: unknown) {
  const n = typeof input === "number" ? input : Number(input);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(120_000, Math.round(n));
}

export function cleanDepth(input: unknown) {
  const n = Number(input);
  if (n === 0 || n === 25 || n === 50 || n === 75 || n === 100) return n;
  return null;
}

export function cleanScreen(width: unknown, height: unknown) {
  const w = positiveInt(width, 200, 8000);
  const h = positiveInt(height, 200, 8000);
  if (!w || !h) return "";
  return `${w}x${h}`;
}

export function cleanLanguage(input: unknown) {
  if (typeof input !== "string") return "";
  const value = input.trim().slice(0, 16);
  return /^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})?$/.test(value) ? value : "";
}

export function cleanUtm(input: unknown): UtmParams | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const source = input as Record<string, unknown>;
  const out: UtmParams = {};
  for (const key of UTM_KEYS) {
    const raw = source[key];
    if (typeof raw !== "string") continue;
    const value = plain(raw, 80);
    if (!value || value.includes("@")) continue;
    out[key] = value;
  }
  return Object.keys(out).length ? out : null;
}

export function utmMember(utm: UtmParams) {
  return UTM_KEYS.map((key) => utm[key] || "-").join("\t");
}

export function referrerHost(input: unknown) {
  if (typeof input !== "string" || !input.trim()) return "";
  try {
    const host = new URL(input).hostname.toLowerCase().replace(/^www\./, "");
    if (!host || host === "aiagentsinfo.com" || host.endsWith(".aiagentsinfo.com")) return "";
    return host.slice(0, 120);
  } catch {
    return "";
  }
}

/** Host plus path, query stripped so tokens and emails are not stored. */
export function cleanPublicUrl(input: unknown) {
  if (typeof input !== "string" || !input.trim() || input.length > 500) return null;
  try {
    const url = new URL(input, "https://www.aiagentsinfo.com");
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    const path = url.pathname.slice(0, 140);
    if (!host || path.includes("@") || host.includes("@")) return null;
    return `${host}${path}`.slice(0, 180);
  } catch {
    return null;
  }
}

function positiveInt(input: unknown, min: number, max: number) {
  const n = typeof input === "number" ? input : Number(input);
  if (!Number.isFinite(n)) return 0;
  const rounded = Math.round(n);
  if (rounded < min || rounded > max) return 0;
  return rounded;
}
