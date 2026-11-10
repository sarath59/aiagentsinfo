import { createHmac, timingSafeEqual } from "node:crypto";

export const REPORT_DOWNLOAD_TTL_MS = 30 * 60 * 1000;

export function reportDownloadSecret() {
  const secret = process.env.REPORT_DOWNLOAD_SECRET?.trim() ?? "";
  return secret.length >= 16 ? secret : null;
}

export function signReportDownload(slug: string, leadId: string, now = Date.now()) {
  const secret = reportDownloadSecret();
  if (!secret) return null;
  const payload = Buffer.from(
    JSON.stringify({ slug, leadId, exp: now + REPORT_DOWNLOAD_TTL_MS }),
    "utf8",
  ).toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyReportDownload(token: string, slug: string, now = Date.now()) {
  const secret = reportDownloadSecret();
  if (!secret || !token || token.length > 2000) return false;
  const dot = token.indexOf(".");
  if (dot <= 0 || dot !== token.lastIndexOf(".")) return false;
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      slug?: unknown;
      exp?: unknown;
    };
    if (data.slug !== slug || typeof data.exp !== "number" || !Number.isFinite(data.exp)) return false;
    if (data.exp < now || data.exp > now + REPORT_DOWNLOAD_TTL_MS + 60_000) return false;
    return true;
  } catch {
    return false;
  }
}
