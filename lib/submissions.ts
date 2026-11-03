import { site } from "@/lib/site";
import {
  categoryTitle,
  directoryCategories,
  pricingModels,
  pricingTitle,
  type DirectoryCategory,
  type PricingModel,
} from "@/lib/directory-meta";

export const toolTypes = [
  { slug: "ai-tool", title: "AI tool" },
  { slug: "saas", title: "SaaS" },
  { slug: "app", title: "App" },
  { slug: "agent-framework", title: "Agent framework" },
  { slug: "other", title: "Other" },
] as const;

export const makerTypes = [
  { slug: "indie-hacker", title: "Indie hacker" },
  { slug: "startup", title: "Startup" },
  { slug: "yc", title: "YC company" },
] as const;

export type ToolType = (typeof toolTypes)[number]["slug"];
export type MakerType = (typeof makerTypes)[number]["slug"];
export type SubmissionStatus = "pending" | "approved";

export const HONEYPOT_FIELD = "hp_field";

export const SUBMISSION_SUCCESS_MESSAGE =
  "Thanks. This submission will be reviewed and listed only after a fact-check. Nothing is published automatically.";

export const SUBMISSION_FIELDS = [
  "name",
  "website",
  "tagline",
  "description",
  "category",
  "type",
  "pricing",
  "startingPrice",
  "logoUrl",
  "makerName",
  "makerX",
  "makerType",
  "ycBatch",
  "launchYear",
  "revenueSourceUrl",
  "githubUrl",
  "email",
  "consent",
] as const;

export type SubmissionField = (typeof SUBMISSION_FIELDS)[number];
export type FieldErrors = Partial<
  Record<SubmissionField | "status" | "slug" | "submittedAt", string>
>;

/** Slugs that already belong to directory collections or the submit redirect. */
export const RESERVED_DIRECTORY_SLUGS = new Set([
  "new",
  "trending",
  "editors-picks",
  "submit",
  "category",
  "tag",
]);

export type ToolSubmission = {
  name: string;
  website: string;
  tagline: string;
  description: string;
  category: DirectoryCategory;
  type: ToolType | null;
  pricing: PricingModel;
  startingPrice: string;
  logoUrl: string;
  makerName: string;
  makerX: string;
  makerType: MakerType | null;
  ycBatch: string;
  launchYear: number | null;
  revenueSourceUrl: string;
  githubUrl: string;
  email: string;
  consent: boolean;
  status: SubmissionStatus;
  submittedAt: string;
  slug: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HANDLE_RE = /^[A-Za-z0-9_]{1,15}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type ValidateOptions = {
  mode?: "form" | "file";
  now?: Date;
  takenSlugs?: Iterable<string>;
  /** Filename slug when reading `data/submissions/<slug>.json`. */
  slug?: string;
};

export function slugifyToolName(name: string) {
  const slug = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
  return slug || "tool";
}

export function suggestSlug(name: string, taken: Iterable<string> = []) {
  const used = new Set(taken);
  let base = slugifyToolName(name);
  if (RESERVED_DIRECTORY_SLUGS.has(base) || !SLUG_RE.test(base)) base = `${base}-tool`;
  let slug = base;
  let n = 2;
  while (used.has(slug) || RESERVED_DIRECTORY_SLUGS.has(slug)) {
    slug = `${base}-${n}`;
    n += 1;
    if (n > 50) break;
  }
  return slug;
}

export function validateSubmission(
  input: unknown,
  options: ValidateOptions = {},
): { ok: true; value: ToolSubmission } | { ok: false; errors: FieldErrors } {
  if (!isRecord(input)) {
    return { ok: false, errors: { name: "This form could not be read." } };
  }

  const mode = options.mode ?? "form";
  const now = options.now ?? new Date();
  const errors: FieldErrors = {};

  const name = asString(input.name);
  const websiteRaw = asString(input.website);
  const tagline = asString(input.tagline);
  const description = asString(input.description);
  const category = asString(input.category);
  const type = asString(input.type);
  const pricing = asString(input.pricing);
  const startingPrice = asString(input.startingPrice);
  const logoUrlRaw = asString(input.logoUrl);
  const makerName = asString(input.makerName);
  const makerXRaw = asString(input.makerX);
  const makerType = asString(input.makerType);
  const ycBatch = asString(input.ycBatch);
  const launchYearRaw = asString(input.launchYear);
  const revenueRaw = asString(input.revenueSourceUrl);
  const githubRaw = asString(input.githubUrl);
  const email = asString(input.email).toLowerCase();

  if (name.length < 2 || name.length > 80) {
    errors.name = "Enter the tool name (2–80 characters).";
  }
  const website = websiteRaw ? parsePublicUrl(websiteRaw, 300) : { ok: false as const, error: "" };
  if (!websiteRaw || !website.ok) {
    errors.website = "Enter a public website URL starting with http:// or https://.";
  }
  if (!tagline || tagline.length < 8 || tagline.length > 140) {
    errors.tagline = "Enter a one-line tagline (8–140 characters).";
  } else if (/[\r\n]/.test(tagline)) {
    errors.tagline = "Use a single line for the tagline.";
  }
  if (description.length < 20 || description.length > 5000) {
    errors.description = "Enter a full description (20–5000 characters).";
  }
  if (!isCategory(category)) {
    errors.category = "Choose a category.";
  }
  if (type && !isToolType(type)) {
    errors.type = "Choose a type from the list.";
  }
  if (!isPricing(pricing)) {
    errors.pricing = "Choose a pricing model.";
  }
  if (startingPrice.length > 60 || /[\r\n]/.test(startingPrice)) {
    errors.startingPrice = "Keep the starting price to a short line.";
  }
  const logoUrl = logoUrlRaw ? parsePublicUrl(logoUrlRaw, 500) : { ok: true as const, url: "" };
  if (!logoUrl.ok) {
    errors.logoUrl = "Enter a public logo URL starting with http:// or https://, or leave it blank.";
  }
  if (makerName.length > 80) {
    errors.makerName = "Keep the maker name under 80 characters.";
  }
  const makerX = normalizeHandle(makerXRaw);
  if (makerXRaw && !HANDLE_RE.test(makerX)) {
    errors.makerX = "Enter an X handle (letters, numbers, underscore), or leave it blank.";
  }
  if (makerType && !isMakerType(makerType)) {
    errors.makerType = "Choose a maker type from the list.";
  }
  if (makerType === "yc") {
    if (!ycBatch || ycBatch.length > 20 || !/^[A-Za-z0-9][A-Za-z0-9 ._-]{0,19}$/.test(ycBatch)) {
      errors.ycBatch = "Enter the YC batch, for example W26.";
    }
  } else if (ycBatch.length > 20) {
    errors.ycBatch = "Keep the YC batch short.";
  }
  let launchYear: number | null = null;
  if (launchYearRaw) {
    if (!/^\d{4}$/.test(launchYearRaw)) {
      errors.launchYear = `Enter a launch year between 1990 and ${now.getUTCFullYear() + 1}.`;
    } else {
      launchYear = Number(launchYearRaw);
      const maxYear = now.getUTCFullYear() + 1;
      if (launchYear < 1990 || launchYear > maxYear) {
        errors.launchYear = `Enter a launch year between 1990 and ${maxYear}.`;
      }
    }
  }
  const revenue = revenueRaw ? parsePublicUrl(revenueRaw, 500) : { ok: true as const, url: "" };
  if (!revenue.ok) {
    errors.revenueSourceUrl = "Enter a public revenue-source URL, or leave it blank.";
  }
  const github = githubRaw ? parseGithubUrl(githubRaw) : { ok: true as const, url: "" };
  if (!github.ok) {
    errors.githubUrl = "Enter a github.com URL, or leave it blank.";
  }
  if (mode === "form") {
    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      errors.email = "Enter a valid email so we can follow up.";
    }
    if (!isConsent(input.consent)) {
      errors.consent = "Confirm the information is accurate.";
    }
  } else if (email && (email.length > 254 || !EMAIL_RE.test(email))) {
    errors.email = "Email must be valid, or remove it before approving.";
  } else if (input.consent === false || input.consent === "false") {
    errors.consent = "Consent has to stay true for a stored submission.";
  }

  let status: SubmissionStatus = "pending";
  let submittedAt = now.toISOString();
  let slug = "";
  if (mode === "file") {
    if (input.status !== "pending" && input.status !== "approved") {
      errors.status = 'Status must be "pending" or "approved".';
    } else {
      status = input.status;
    }
    const rawDate = asString(input.submittedAt);
    const parsedDate = Date.parse(rawDate);
    if (!rawDate || Number.isNaN(parsedDate)) {
      errors.submittedAt = "submittedAt must be an ISO date.";
    } else {
      submittedAt = new Date(parsedDate).toISOString();
    }
    slug = options.slug ?? "";
    if (!slug || !SLUG_RE.test(slug) || RESERVED_DIRECTORY_SLUGS.has(slug)) {
      errors.slug = "The filename must be a lowercase slug.";
    }
    const declared = asString(input.slug);
    if (declared && declared !== slug) {
      errors.slug = `Slug must match the filename (${slug}).`;
    }
  }

  if (Object.keys(errors).length) return { ok: false, errors };

  if (mode === "form") {
    slug = suggestSlug(name, options.takenSlugs ?? []);
  }

  return {
    ok: true,
    value: {
      name,
      website: website.ok ? website.url : "",
      tagline,
      description,
      category: category as DirectoryCategory,
      type: type ? (type as ToolType) : null,
      pricing: pricing as PricingModel,
      startingPrice,
      logoUrl: logoUrl.ok ? logoUrl.url : "",
      makerName,
      makerX,
      makerType: makerType ? (makerType as MakerType) : null,
      ycBatch: makerType === "yc" ? ycBatch : "",
      launchYear,
      revenueSourceUrl: revenue.ok ? revenue.url : "",
      githubUrl: github.ok ? github.url : "",
      email,
      consent: true,
      status,
      submittedAt,
      slug,
    },
  };
}

export function parseStoredSubmission(data: unknown, slugFromFile: string) {
  const result = validateSubmission(data, { mode: "file", slug: slugFromFile });
  if (!result.ok) {
    const detail = Object.entries(result.errors)
      .map(([field, message]) => `${field}: ${message}`)
      .join("; ");
    throw new Error(`data/submissions/${slugFromFile}.json is invalid (${detail}).`);
  }
  return result.value;
}

export function plainTextToHtml(value: string) {
  const escaped = value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  return escaped
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br />")}</p>`)
    .join("");
}

export function submissionToListing(submission: ToolSubmission) {
  const typeTitle = submission.type
    ? (toolTypes.find((item) => item.slug === submission.type)?.title ?? "")
    : "";
  const makerKind = submission.makerType
    ? (makerTypes.find((item) => item.slug === submission.makerType)?.title ?? "")
    : "";
  const features: string[] = [];
  if (typeTitle) features.push(`Type: ${typeTitle}`);
  if (submission.makerName) {
    const handle = submission.makerX ? ` (@${submission.makerX})` : "";
    const kind = makerKind
      ? `, ${makerKind}${submission.makerType === "yc" && submission.ycBatch ? ` ${submission.ycBatch}` : ""}`
      : "";
    features.push(`Maker: ${submission.makerName}${handle}${kind}`);
  } else if (submission.makerType === "yc" && submission.ycBatch) {
    features.push(`YC batch: ${submission.ycBatch}`);
  }
  if (submission.launchYear) features.push(`Launch year: ${submission.launchYear}`);
  if (submission.githubUrl) features.push(`Source: ${submission.githubUrl}`);
  if (submission.revenueSourceUrl) {
    features.push(`Public revenue source: ${submission.revenueSourceUrl}`);
  }

  const priceLabel = pricingTitle(submission.pricing);
  const pricingSummary = submission.startingPrice
    ? `${priceLabel}. Starting price: ${submission.startingPrice}.`
    : priceLabel;
  const tags = submission.type ? [submission.type] : [];

  return {
    slug: submission.slug,
    html: plainTextToHtml(submission.description),
    name: submission.name,
    vendor: submission.makerName || "Independent",
    website: submission.website,
    logo: submission.logoUrl,
    summary: submission.tagline,
    category: submission.category,
    tags,
    pricing: [submission.pricing],
    useCases: [] as string[],
    audiences: [] as string[],
    features,
    pricingSummary,
    lastVerified: submission.submittedAt.slice(0, 10),
  };
}

export function submissionIssueBody(submission: ToolSubmission) {
  const json = JSON.stringify(submission, null, 2);
  let fence = "```";
  while (json.includes(fence)) fence += "`";
  return [
    `Tool: ${neutralizeMentions(submission.name)}`,
    `Website: ${neutralizeMentions(submission.website)}`,
    "Status: pending",
    "",
    "This is a directory submission waiting for a fact-check. It is not listed on the site.",
    "",
    "To approve:",
    '1. Set `"status"` to `"approved"`.',
    "2. Remove `email` if it should not be stored in a public git history.",
    `3. Save the JSON as \`data/submissions/${submission.slug}.json\`.`,
    "4. Commit that file to `main`. The directory renders this folder only when status is approved.",
    "",
    `Category: ${categoryTitle(submission.category)}`,
    "",
    `${fence}json`,
    json,
    fence,
    "",
  ].join("\n");
}

export function submissionMailto(input: Partial<Record<SubmissionField, string>>) {
  const lines = [
    "Tool submission for the AI Agents Info directory.",
    "",
    `Tool name: ${input.name ?? ""}`,
    `Website: ${input.website ?? ""}`,
    `Tagline: ${input.tagline ?? ""}`,
    `Category: ${input.category ?? ""}`,
    `Type: ${input.type ?? ""}`,
    `Pricing: ${input.pricing ?? ""}`,
    `Starting price: ${input.startingPrice ?? ""}`,
    `Logo URL: ${input.logoUrl ?? ""}`,
    `Maker: ${input.makerName ?? ""}`,
    `X handle: ${input.makerX ?? ""}`,
    `Maker type: ${input.makerType ?? ""}`,
    `YC batch: ${input.ycBatch ?? ""}`,
    `Launch year: ${input.launchYear ?? ""}`,
    `Revenue source: ${input.revenueSourceUrl ?? ""}`,
    `GitHub: ${input.githubUrl ?? ""}`,
    `Email: ${input.email ?? ""}`,
    "",
    "Description:",
    input.description ?? "",
    "",
    "I confirm this information is accurate.",
  ];
  const subject = `Tool submission: ${(input.name || "New tool").slice(0, 80)}`;
  const body = lines.join("\n").slice(0, 1500);
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Stops GitHub from notifying a user when a submission name contains @. */
export function neutralizeMentions(value: string) {
  return value.replace(/@/g, "@\u200b");
}

export function honeypotTripped(input: unknown) {
  if (!isRecord(input)) return false;
  const value = input[HONEYPOT_FIELD];
  return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim();
}

function isConsent(value: unknown) {
  return value === true || value === "true" || value === "on" || value === "yes";
}

function isCategory(value: string): value is DirectoryCategory {
  return directoryCategories.some((item) => item.slug === value);
}

function isPricing(value: string): value is PricingModel {
  return pricingModels.some((item) => item.slug === value);
}

function isToolType(value: string): value is ToolType {
  return toolTypes.some((item) => item.slug === value);
}

function isMakerType(value: string): value is MakerType {
  return makerTypes.some((item) => item.slug === value);
}

function normalizeHandle(value: string) {
  let handle = value.trim();
  if (!handle) return "";
  if (handle.startsWith("http://") || handle.startsWith("https://")) {
    try {
      const url = new URL(handle);
      const host = url.hostname.replace(/^www\./, "").toLowerCase();
      if (host === "x.com" || host === "twitter.com") {
        handle = url.pathname.split("/").filter(Boolean)[0] ?? "";
      }
    } catch {
      // Fall through and validate the raw value.
    }
  }
  return handle.replace(/^@+/, "");
}

function parsePublicUrl(value: string, maxLength: number): { ok: true; url: string } | { ok: false } {
  if (value.length > maxLength || /\s/.test(value)) return { ok: false };
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return { ok: false };
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return { ok: false };
  if (url.username || url.password) return { ok: false };
  if (isBlockedHost(url.hostname)) return { ok: false };
  return { ok: true, url: url.href };
}

function parseGithubUrl(value: string): { ok: true; url: string } | { ok: false } {
  const parsed = parsePublicUrl(value, 500);
  if (!parsed.ok) return parsed;
  const url = new URL(parsed.url);
  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  if (host !== "github.com") return { ok: false };
  const parts = url.pathname.split("/").filter(Boolean);
  if (parts.length < 2) return { ok: false };
  if (!parts.every((part) => /^[A-Za-z0-9_.-]+$/.test(part))) return { ok: false };
  return { ok: true, url: `https://github.com/${parts.join("/")}` };
}

function isBlockedHost(hostname: string) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "").replace(/\.$/, "");
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host === "0.0.0.0" ||
    host === "::1"
  ) {
    return true;
  }
  const match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  if (!match) return false;
  const parts = match.slice(1).map(Number);
  if (parts.some((part) => part > 255)) return true;
  const [a, b] = parts;
  if (a === 10 || a === 127 || a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  return false;
}
