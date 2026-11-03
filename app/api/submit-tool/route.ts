import { NextResponse } from "next/server";
import { publishSubmission, submissionsToken } from "@/lib/github-submissions";
import { takeRateLimit } from "@/lib/rate-limit";
import { collectTakenSlugs, localListingDomains } from "@/lib/submission-files";
import {
  honeypotTripped,
  submissionMailto,
  SUBMISSION_FIELDS,
  SUBMISSION_SUCCESS_MESSAGE,
  summarizeFieldErrors,
  validateSubmission,
  websiteDomain,
  type FieldErrors,
  type SubmissionField,
} from "@/lib/submissions";
import { assertPublicUrlReachable } from "@/lib/url-check";

export const runtime = "nodejs";

const MAX_BODY = 40_000;

const MAILOUT_MESSAGE =
  "We can't save this submission right now. Email it to the desk and we'll review it the same way.";

const DUPLICATE_MESSAGE = "A tool on this domain is already in the directory.";

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return json({ message: "Submissions have to come from this site." }, 403);
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY) {
    return json({ message: "That submission is too large." }, 413);
  }

  const type = request.headers.get("content-type") || "";
  if (!type.includes("application/json")) {
    return json({ message: "Send the form as JSON." }, 415);
  }

  const text = await request.text();
  if (text.length > MAX_BODY) {
    return json({ message: "That submission is too large." }, 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    return fieldError({ name: "The form could not be read." });
  }

  const limit = takeRateLimit(`submit:${clientIp(request)}`);
  if (!limit.ok) {
    return json(
      {
        message: "Too many submissions from this network. Wait a bit, or email the desk.",
        mailto: mailtoFrom(payload),
      },
      429,
      { "Retry-After": String(limit.retryAfterSec) },
    );
  }

  if (honeypotTripped(payload)) {
    return json({ ok: true, message: SUBMISSION_SUCCESS_MESSAGE }, 200);
  }

  const validated = validateSubmission(payload, { takenSlugs: collectTakenSlugs() });
  if (!validated.ok) {
    return fieldError(validated.errors);
  }

  const mailto = submissionMailto(stringsFrom(validated.value));
  const domain = websiteDomain(validated.value.website);
  if (domain && localListingDomains().has(domain)) {
    return fieldError({ website: DUPLICATE_MESSAGE }, 409);
  }

  const reachable = await assertPublicUrlReachable(validated.value.website);
  if (!reachable.ok) {
    return fieldError({ website: reachable.message });
  }

  if (!submissionsToken()) {
    return json({ ok: false, code: "unconfigured", message: MAILOUT_MESSAGE, mailto }, 503);
  }

  try {
    const filed = await publishSubmission(validated.value);
    if (filed.ok) {
      return json({ ok: true, message: SUBMISSION_SUCCESS_MESSAGE }, 200);
    }
    if (filed.reason === "duplicate") {
      return fieldError({ website: DUPLICATE_MESSAGE }, 409);
    }
    return json({ ok: false, code: "store_failed", message: MAILOUT_MESSAGE, mailto }, 502);
  } catch (error) {
    console.error("[submit-tool] failed", error instanceof Error ? error.message : "error");
    return json({ ok: false, code: "store_failed", message: MAILOUT_MESSAGE, mailto }, 502);
  }
}

function fieldError(errors: FieldErrors, status = 400) {
  return json({ message: summarizeFieldErrors(errors), errors }, status);
}

function json(body: Record<string, unknown>, status: number, extra?: Record<string, string>) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extra },
  });
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function sameOrigin(request: Request) {
  const source = request.headers.get("origin") || request.headers.get("referer");
  if (!source) return true;
  let host: string;
  try {
    host = new URL(source).host.toLowerCase();
  } catch {
    return false;
  }
  const requestHost = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  const allowed = new Set([
    requestHost,
    "www.aiagentsinfo.com",
    "aiagentsinfo.com",
    "localhost:3000",
    "127.0.0.1:3000",
  ]);
  return allowed.has(host);
}

function mailtoFrom(payload: unknown) {
  if (!payload || typeof payload !== "object") return submissionMailto({});
  const record = payload as Record<string, unknown>;
  const fields: Partial<Record<SubmissionField, string>> = {};
  for (const key of SUBMISSION_FIELDS) {
    if (key === "consent") continue;
    const value = record[key];
    if (typeof value === "string") fields[key] = value;
  }
  return submissionMailto(fields);
}

function stringsFrom(value: {
  name: string;
  website: string;
  tagline: string;
  description: string;
  category: string;
  type: string | null;
  pricing: string;
  startingPrice: string;
  billingPeriod: string;
  pricingPageUrl: string;
  logoUrl: string;
  makerName: string;
  makerX: string;
  makerType: string | null;
  ycBatch: string;
  launchYear: number | null;
  revenueSourceUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  youtubeUrl: string;
  discordUrl: string;
  instagramUrl: string;
  productHuntUrl: string;
  email: string;
}): Partial<Record<SubmissionField, string>> {
  return {
    name: value.name,
    website: value.website,
    tagline: value.tagline,
    description: value.description,
    category: value.category,
    type: value.type ?? "",
    pricing: value.pricing,
    startingPrice: value.startingPrice,
    billingPeriod: value.billingPeriod,
    pricingPageUrl: value.pricingPageUrl,
    logoUrl: value.logoUrl,
    makerName: value.makerName,
    makerX: value.makerX,
    makerType: value.makerType ?? "",
    ycBatch: value.ycBatch,
    launchYear: value.launchYear ? String(value.launchYear) : "",
    revenueSourceUrl: value.revenueSourceUrl,
    linkedinUrl: value.linkedinUrl,
    githubUrl: value.githubUrl,
    youtubeUrl: value.youtubeUrl,
    discordUrl: value.discordUrl,
    instagramUrl: value.instagramUrl,
    productHuntUrl: value.productHuntUrl,
    email: value.email,
  };
}
