import { createHash } from "node:crypto";
import { createChallenge, extractParams, verifySolution } from "altcha-lib/v1";
import { submissionsToken } from "@/lib/github-submissions";

export const ALTCHA_MAX_NUMBER = 150_000;
export const ALTCHA_TTL_MS = 10 * 60 * 1000;
export const ALTCHA_MIN_FILL_MS = 3_000;
export const HUMAN_CHECK_MESSAGE = "Please complete the human check.";

const REPLAY_LIMIT = 5_000;
const usedSignatures = new Map<string, number>();

/** Server-only. ALTCHA_HMAC_KEY, or sha256("altcha-v1:" + the submissions token). */
export function altchaHmacKey() {
  const configured = process.env.ALTCHA_HMAC_KEY?.trim();
  if (configured) return configured;
  const token = submissionsToken();
  if (!token) return null;
  return createHash("sha256").update(`altcha-v1:${token}`, "utf8").digest("hex");
}

export async function createAltchaChallenge(now = Date.now()) {
  const hmacKey = altchaHmacKey();
  if (!hmacKey) return null;
  const issued = Math.floor(now / 1000);
  const challenge = await createChallenge({
    hmacKey,
    maxNumber: ALTCHA_MAX_NUMBER,
    expires: new Date(now + ALTCHA_TTL_MS),
    params: { issued: String(issued) },
  });
  return {
    algorithm: challenge.algorithm,
    challenge: challenge.challenge,
    maxnumber: challenge.maxnumber,
    salt: challenge.salt,
    signature: challenge.signature,
  };
}

export type AltchaCheck =
  | { ok: true }
  | { ok: false; reason: "missing" | "invalid" | "unconfigured" };

export async function verifyAltchaPayload(payload: unknown, now = Date.now()): Promise<AltchaCheck> {
  const hmacKey = altchaHmacKey();
  if (!hmacKey) return { ok: false, reason: "unconfigured" };
  if (typeof payload !== "string" || !payload.trim()) return { ok: false, reason: "missing" };

  let valid = false;
  try {
    valid = await verifySolution(payload, hmacKey, true);
  } catch {
    return { ok: false, reason: "invalid" };
  }
  if (!valid) return { ok: false, reason: "invalid" };

  const decoded = decodePayload(payload);
  const params = extractParams(payload);
  const signature = decoded?.signature;
  const expiresSec = Number(params.expires || params.expire);
  const issuedSec = Number(params.issued);
  if (!signature || !Number.isFinite(expiresSec) || !Number.isFinite(issuedSec)) {
    return { ok: false, reason: "invalid" };
  }

  const expiresAt = expiresSec * 1000;
  const issuedAt = issuedSec * 1000;
  if (seenRecently(signature, now)) return { ok: false, reason: "invalid" };
  remember(signature, expiresAt, now);
  if (issuedAt > now + 60_000) return { ok: false, reason: "invalid" };
  if (now - issuedAt < ALTCHA_MIN_FILL_MS) return { ok: false, reason: "invalid" };
  return { ok: true };
}

export function altchaPayloadFrom(input: unknown) {
  if (!input || typeof input !== "object") return "";
  const value = (input as Record<string, unknown>).altcha;
  return typeof value === "string" ? value.trim() : "";
}

export function clearAltchaReplay() {
  usedSignatures.clear();
}

function decodePayload(payload: string) {
  try {
    const parsed = JSON.parse(atob(payload)) as { signature?: unknown };
    if (!parsed || typeof parsed !== "object") return null;
    return {
      signature: typeof parsed.signature === "string" && parsed.signature ? parsed.signature : "",
    };
  } catch {
    return null;
  }
}

function seenRecently(signature: string, now: number) {
  const expiresAt = usedSignatures.get(signature);
  if (expiresAt === undefined) return false;
  if (expiresAt <= now) {
    usedSignatures.delete(signature);
    return false;
  }
  return true;
}

function remember(signature: string, expiresAt: number, now: number) {
  if (usedSignatures.size >= REPLAY_LIMIT) {
    for (const [key, expiry] of usedSignatures) {
      if (expiry <= now) usedSignatures.delete(key);
    }
  }
  if (usedSignatures.size >= REPLAY_LIMIT) {
    const oldest = usedSignatures.keys().next().value;
    if (oldest) usedSignatures.delete(oldest);
  }
  usedSignatures.set(signature, expiresAt);
}
