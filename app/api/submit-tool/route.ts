import { after, NextResponse } from "next/server";
import { altchaPayloadFrom, HUMAN_CHECK_MESSAGE, verifyAltchaPayload } from "@/lib/altcha";
import { trackServerGoal } from "@/lib/analytics-server";
import {
  LISTING_SUBMITTED,
  SUBMIT_REJECTED,
  SUBMIT_SPAM_BLOCKED,
  errorFieldKeys,
  safeListingMeta,
} from "@/lib/analytics/submission-goals";
import { communityListingIsIndexable } from "@/lib/indexing";
import { pingIndexNow } from "@/lib/indexnow";
import { takeRateLimit } from "@/lib/rate-limit";
import { collectTakenSlugs, localListingDomains } from "@/lib/submission-files";
import { insertSubmission, refreshAfterInsert } from "@/lib/submission-store";
import { supabaseConfig } from "@/lib/supabase";
import {
  honeypotTripped,
  submissionMailto,
  submissionToListing,
  SUBMISSION_FIELDS,
  SUBMISSION_SUCCESS_MESSAGE,
  SUBMISSION_UNAVAILABLE_MESSAGE,
  summarizeFieldErrors,
  validateSubmission,
  websiteDomain,
  type FieldErrors,
  type SubmissionField,
} from "@/lib/submissions";
import { absoluteUrl } from "@/lib/site";
import { assertPublicUrlReachable } from "@/lib/url-check";

export const runtime = "nodejs";

const MAX_BODY = 40_000;

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
    return fieldError(request, { name: "The form could not be read." }, 400, "validation");
  }

  const limit = takeRateLimit(`submit:${clientIp(request)}`);
  if (!limit.ok) {
    trackServerGoal(request, SUBMIT_REJECTED, safeListingMeta({ reject_reason: "rate_limited", code: "429" }));
    return json(
      {
        message: "Too many submissions from this network. Wait a bit, or email the desk.",
        mailto: mailtoFrom(payload),
        code: "rate_limited",
      },
      429,
      { "Retry-After": String(limit.retryAfterSec) },
    );
  }

  if (honeypotTripped(payload)) {
    trackServerGoal(request, SUBMIT_SPAM_BLOCKED, safeListingMeta({ reject_reason: "validation", code: "honeypot" }));
    return json({ ok: true, message: SUBMISSION_SUCCESS_MESSAGE }, 200);
  }

  const human = await verifyAltchaPayload(altchaPayloadFrom(payload));
  if (!human.ok) {
    if (human.reason === "unconfigured") {
      trackServerGoal(request, SUBMIT_REJECTED, safeListingMeta({ reject_reason: "unconfigured", code: "altcha" }));
      return json(
        {
          ok: false,
          code: "unconfigured",
          message: SUBMISSION_UNAVAILABLE_MESSAGE,
          mailto: mailtoFrom(payload),
        },
        503,
      );
    }
    return fieldError(request, { altcha: HUMAN_CHECK_MESSAGE }, 400, "altcha");
  }

  const takenSlugs = collectTakenSlugs();
  const validated = validateSubmission(payload, { takenSlugs });
  if (!validated.ok) {
    return fieldError(request, validated.errors, 400, "validation");
  }

  const mailto = submissionMailto(stringsFrom(validated.value));
  const domain = websiteDomain(validated.value.website);
  if (domain && localListingDomains().has(domain)) {
    return fieldError(request, { website: DUPLICATE_MESSAGE }, 409, "duplicate");
  }

  const reachable = await assertPublicUrlReachable(validated.value.website);
  if (!reachable.ok) {
    return fieldError(request, { website: reachable.message }, 400, "unreachable");
  }

  if (!supabaseConfig()) {
    trackServerGoal(request, SUBMIT_REJECTED, safeListingMeta({ reject_reason: "unconfigured", code: "supabase" }));
    return json({ ok: false, code: "unconfigured", message: SUBMISSION_UNAVAILABLE_MESSAGE, mailto }, 503);
  }

  try {
    const filed = await insertSubmission(validated.value, takenSlugs);
    if (filed.ok) {
      refreshAfterInsert(filed.slug);
      if (communityListingIsIndexable(submissionToListing({ ...validated.value, slug: filed.slug }))) {
        after(() => pingIndexNow([`/directory/${filed.slug}`, "/directory"]));
      }
      // Saved and accepted. The only publisher in this repo is this visitor form.
      // MCP is read-only, so there is no internal path to mark listing_source "agent".
      if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(filed.slug)) {
        trackServerGoal(
          request,
          LISTING_SUBMITTED,
          safeListingMeta({
            listing_slug: filed.slug,
            category: validated.value.category,
            pricing: validated.value.pricing,
            type: validated.value.type ?? "",
            maker_type: validated.value.makerType ?? "",
            code: "user",
          }),
        );
      }
      return json(
        {
          ok: true,
          message: SUBMISSION_SUCCESS_MESSAGE,
          slug: filed.slug,
          url: absoluteUrl(`/directory/${filed.slug}`),
        },
        200,
      );
    }
    if (filed.reason === "duplicate") {
      return fieldError(request, { website: DUPLICATE_MESSAGE }, 409, "duplicate");
    }
    trackServerGoal(request, SUBMIT_REJECTED, safeListingMeta({ reject_reason: "store_failed", code: "insert" }));
    return json({ ok: false, code: "store_failed", message: SUBMISSION_UNAVAILABLE_MESSAGE, mailto }, 502);
  } catch (error) {
    console.error("[submit-tool] failed", error instanceof Error ? error.message : "error");
    trackServerGoal(request, SUBMIT_REJECTED, safeListingMeta({ reject_reason: "store_failed", code: "exception" }));
    return json({ ok: false, code: "store_failed", message: SUBMISSION_UNAVAILABLE_MESSAGE, mailto }, 502);
  }
}

function fieldError(
  request: Request,
  errors: FieldErrors,
  status = 400,
  reject_reason: "validation" | "altcha" | "duplicate" | "unreachable" = "validation",
) {
  trackServerGoal(
    request,
    SUBMIT_REJECTED,
    safeListingMeta({
      reject_reason,
      error_fields: errorFieldKeys(errors),
      code: String(status),
    }),
  );
  return json({ message: summarizeFieldErrors(errors), errors, code: reject_reason }, status);
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
