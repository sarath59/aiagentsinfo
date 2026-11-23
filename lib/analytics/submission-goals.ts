/** Goal names for the /submit funnel. No emails or free-text PII in metadata. */

export const SUBMIT_CTA = "submit_cta";
export const FORM_STARTED = "form_started";
export const SUBMIT_ATTEMPT = "submit_attempt";
export const SUBMIT_VALIDATION_ERROR = "submit_validation_error";
export const SUBMIT_REJECTED = "submit_rejected";
export const SUBMIT_FALLBACK = "submit_fallback";
export const SUBMIT_SUCCESS = "submit_success";
export const LISTING_SUBMITTED = "listing_submitted";
export const SUBMIT_SPAM_BLOCKED = "submit_spam_blocked";
export const SUBMIT_SHARE_COPY = "submit_share_copy";
export const SUBMIT_SHARE_DOWNLOAD = "submit_share_download";
export const SUBMIT_OPEN_LISTING = "submit_open_listing";
export const SUBMIT_ANOTHER = "submit_another";

export type SubmitRejectReason =
  | "validation"
  | "altcha"
  | "duplicate"
  | "unreachable"
  | "rate_limited"
  | "unconfigured"
  | "store_failed"
  | "network";

/** Comma-separated field keys only (no values). */
export function errorFieldKeys(errors: Record<string, string | undefined>) {
  return Object.keys(errors)
    .filter((key) => Boolean(errors[key]))
    .sort()
    .slice(0, 12)
    .join(",");
}

export function safeListingMeta(input: {
  listing_slug?: string;
  category?: string;
  pricing?: string;
  type?: string;
  maker_type?: string;
  reject_reason?: SubmitRejectReason | string;
  error_fields?: string;
  share_target?: string;
  code?: string;
}) {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(input)) {
    if (!value || typeof value !== "string") continue;
    const clean = value.replace(/[<>'"&]/g, "").trim().slice(0, 64);
    if (!clean || clean.includes("@")) continue;
    out[key] = clean;
  }
  return out;
}
