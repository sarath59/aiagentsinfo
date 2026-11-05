import { isGibberish } from "@/lib/indexing";
import { site } from "@/lib/site";
import {
  billingPeriodTitle,
  canonicalBillingPeriod,
  canonicalCategory,
  canonicalPricing,
  categoryTitle,
  pricingTitle,
  type BillingPeriod,
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

export const SUBMISSION_SUCCESS_MESSAGE = "Your tool will be live in about 2 minutes.";

export const BLOCKED_TEXT_MESSAGE = "Remove language or spam that can't be published.";

export const SUBMISSION_FIELDS = [
  "name",
  "website",
  "tagline",
  "description",
  "category",
  "type",
  "pricing",
  "startingPrice",
  "billingPeriod",
  "pricingPageUrl",
  "logoUrl",
  "makerName",
  "makerX",
  "makerType",
  "ycBatch",
  "launchYear",
  "revenueSourceUrl",
  "linkedinUrl",
  "githubUrl",
  "youtubeUrl",
  "discordUrl",
  "instagramUrl",
  "productHuntUrl",
  "email",
  "consent",
] as const;

export type SubmissionField = (typeof SUBMISSION_FIELDS)[number];
export type FieldErrors = Partial<
  Record<SubmissionField | "status" | "slug" | "submittedAt", string>
>;

const FIELD_LABELS: Record<string, string> = {
  name: "Tool name",
  website: "Website URL",
  tagline: "Tagline",
  description: "Description",
  category: "Category",
  type: "Type",
  pricing: "Pricing model",
  startingPrice: "Starting price",
  billingPeriod: "Billing period",
  pricingPageUrl: "Pricing page",
  logoUrl: "Logo URL",
  makerName: "Maker name",
  makerX: "X handle",
  makerType: "Maker type",
  ycBatch: "YC batch",
  launchYear: "Launch year",
  revenueSourceUrl: "Revenue source",
  linkedinUrl: "LinkedIn",
  githubUrl: "GitHub",
  youtubeUrl: "YouTube",
  discordUrl: "Discord",
  instagramUrl: "Instagram",
  productHuntUrl: "Product Hunt",
  email: "Email",
  consent: "Consent",
};

/** One sentence per failing field, used in the form banner and the API message. */
export function summarizeFieldErrors(errors: FieldErrors) {
  const parts = Object.entries(errors).flatMap(([field, message]) => {
    if (!message) return [];
    const label = FIELD_LABELS[field];
    return [label ? `${label}: ${message}` : message];
  });
  return parts.join(" ");
}

/** Slugs that already belong to directory collections or the submit redirect. */
export const RESERVED_DIRECTORY_SLUGS = new Set([
  "new",
  "trending",
  "editors-picks",
  "submit",
  "category",
  "tag",
  "stats",
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
  billingPeriod: BillingPeriod | "";
  pricingPageUrl: string;
  logoUrl: string;
  makerName: string;
  makerX: string;
  makerType: MakerType | null;
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

  const name = oneLine(input.name);
  const websiteRaw = oneLine(input.website);
  const tagline = oneLine(input.tagline);
  const description = sanitizePlainText(typeof input.description === "string" ? input.description : "");
  const category = canonicalCategory(oneLine(input.category));
  const type = oneLine(input.type);
  const pricing = canonicalPricing(oneLine(input.pricing));
  const startingPrice = oneLine(input.startingPrice);
  const billingRaw = oneLine(input.billingPeriod);
  const makerName = oneLine(input.makerName);
  const makerXRaw = oneLine(input.makerX);
  const makerType = oneLine(input.makerType);
  const ycBatch = makerType === "yc" ? oneLine(input.ycBatch) : "";
  const launchYearRaw = oneLine(input.launchYear);
  const email = oneLine(input.email).toLowerCase();
  const logoUrl = optionalPublicUrl(input.logoUrl);
  const pricingPageUrl = optionalPublicUrl(input.pricingPageUrl);
  const revenue = optionalPublicUrl(input.revenueSourceUrl);
  const linkedinUrl = optionalPublicUrl(input.linkedinUrl);
  const youtubeUrl = optionalPublicUrl(input.youtubeUrl);
  const discordUrl = optionalPublicUrl(input.discordUrl);
  const instagramUrl = optionalPublicUrl(input.instagramUrl);
  const productHuntUrl = optionalPublicUrl(input.productHuntUrl);
  const github = normalizeGithubUrl(oneLine(input.githubUrl));

  if (name.length < 2 || name.length > 80) {
    errors.name = "Enter the tool name (2–80 characters).";
  }
  const website = normalizePublicUrl(websiteRaw, 300);
  if (!website.ok || !website.url) {
    errors.website = "Enter a public website, such as example.com.";
  }
  if (!tagline || tagline.length < 8 || tagline.length > 140) {
    errors.tagline = "Enter a one-line tagline (8–140 characters).";
  }
  if (description.length < 20 || description.length > 5000) {
    errors.description = "Enter a full description (20–5000 characters).";
  }
  if (!category) {
    errors.category = "Choose a category.";
  }
  if (type && !isToolType(type)) {
    errors.type = "Choose a type from the list.";
  }
  if (!pricing) {
    errors.pricing = "Choose a pricing model.";
  }
  if (startingPrice.length > 60) {
    errors.startingPrice = "Keep the starting price to a short line.";
  }
  let billingPeriod: BillingPeriod | "" = "";
  if (billingRaw) {
    const match = canonicalBillingPeriod(billingRaw);
    if (!match) errors.billingPeriod = "Choose a billing period, or leave it blank.";
    else billingPeriod = match;
  }
  if (!logoUrl.ok) {
    errors.logoUrl = "Enter a public logo URL, or leave it blank.";
  }
  if (makerName.length > 80) {
    errors.makerName = "Keep the maker name under 80 characters.";
  }
  const makerX = normalizeHandle(makerXRaw);
  if (!blankHandle(makerXRaw) && !HANDLE_RE.test(makerX)) {
    errors.makerX = "Enter an X handle (with or without @), or leave it blank.";
  }
  if (makerType && !isMakerType(makerType)) {
    errors.makerType = "Choose a maker type from the list.";
  }
  if (makerType === "yc") {
    if (!ycBatch || ycBatch.length > 20 || !/^[A-Za-z0-9][A-Za-z0-9 ._-]{0,19}$/.test(ycBatch)) {
      errors.ycBatch = "Enter the YC batch, for example W26.";
    }
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
  if (!pricingPageUrl.ok) {
    errors.pricingPageUrl = "Enter a public pricing-page URL, or leave it blank.";
  }
  if (!revenue.ok) {
    errors.revenueSourceUrl = "Enter a public revenue-source URL, or leave it blank.";
  }
  if (!linkedinUrl.ok) errors.linkedinUrl = "Enter a public LinkedIn URL, or leave it blank.";
  if (!youtubeUrl.ok) errors.youtubeUrl = "Enter a public YouTube URL, or leave it blank.";
  if (!discordUrl.ok) errors.discordUrl = "Enter a public Discord URL, or leave it blank.";
  if (!instagramUrl.ok) errors.instagramUrl = "Enter a public Instagram URL, or leave it blank.";
  if (!productHuntUrl.ok) errors.productHuntUrl = "Enter a public Product Hunt URL, or leave it blank.";
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

  if (!errors.name && textBlocked(name)) errors.name = BLOCKED_TEXT_MESSAGE;
  if (!errors.tagline && textBlocked(tagline)) errors.tagline = BLOCKED_TEXT_MESSAGE;
  if (!errors.description && textBlocked(description)) errors.description = BLOCKED_TEXT_MESSAGE;
  if (!errors.startingPrice && textBlocked(startingPrice)) errors.startingPrice = BLOCKED_TEXT_MESSAGE;
  if (!errors.makerName && textBlocked(makerName)) errors.makerName = BLOCKED_TEXT_MESSAGE;
  if (!errors.ycBatch && textBlocked(ycBatch)) errors.ycBatch = BLOCKED_TEXT_MESSAGE;
  if (mode === "form") {
    if (!errors.tagline && isGibberish(tagline)) errors.tagline = BLOCKED_TEXT_MESSAGE;
    if (!errors.description && isGibberish(description)) errors.description = BLOCKED_TEXT_MESSAGE;
  }

  if (Object.keys(errors).length || !website.ok || !website.url || !category || !pricing) {
    return { ok: false, errors };
  }

  if (mode === "form") {
    slug = suggestSlug(name, options.takenSlugs ?? []);
  }

  return {
    ok: true,
    value: {
      name,
      website: website.url,
      tagline,
      description,
      category,
      type: type ? (type as ToolType) : null,
      pricing,
      startingPrice,
      billingPeriod,
      pricingPageUrl: pricingPageUrl.ok ? pricingPageUrl.url : "",
      logoUrl: logoUrl.ok ? logoUrl.url : "",
      makerName,
      makerX,
      makerType: makerType ? (makerType as MakerType) : null,
      ycBatch: makerType === "yc" ? ycBatch : "",
      launchYear,
      revenueSourceUrl: revenue.ok ? revenue.url : "",
      linkedinUrl: linkedinUrl.ok ? linkedinUrl.url : "",
      githubUrl: github.ok ? github.url : "",
      youtubeUrl: youtubeUrl.ok ? youtubeUrl.url : "",
      discordUrl: discordUrl.ok ? discordUrl.url : "",
      instagramUrl: instagramUrl.ok ? instagramUrl.url : "",
      productHuntUrl: productHuntUrl.ok ? productHuntUrl.url : "",
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

  const pricingBits = [pricingTitle(submission.pricing)];
  if (submission.startingPrice) pricingBits.push(`starting at ${submission.startingPrice}`);
  if (submission.billingPeriod) pricingBits.push(billingPeriodTitle(submission.billingPeriod));
  const pricingSummary = pricingBits.join(" · ");
  const socials = compactSocials({
    x: submission.makerX ? `https://x.com/${submission.makerX}` : "",
    linkedin: submission.linkedinUrl,
    github: submission.githubUrl,
    youtube: submission.youtubeUrl,
    discord: submission.discordUrl,
    instagram: submission.instagramUrl,
    productHunt: submission.productHuntUrl,
  });
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
    startingPrice: submission.startingPrice,
    billingPeriod: submission.billingPeriod,
    pricingPageUrl: submission.pricingPageUrl,
    revenueSourceUrl: submission.revenueSourceUrl,
    socials,
    lastVerified: submission.submittedAt.slice(0, 10),
    communitySubmitted: true,
  };
}

/** Public directory file. The submitter email is intentionally omitted. */
export function publicSubmissionRecord(submission: ToolSubmission) {
  return {
    name: submission.name,
    website: submission.website,
    tagline: submission.tagline,
    description: submission.description,
    category: submission.category,
    type: submission.type,
    pricing: submission.pricing,
    startingPrice: submission.startingPrice,
    billingPeriod: submission.billingPeriod,
    pricingPageUrl: submission.pricingPageUrl,
    logoUrl: submission.logoUrl,
    makerName: submission.makerName,
    makerX: submission.makerX,
    makerType: submission.makerType,
    ycBatch: submission.ycBatch,
    launchYear: submission.launchYear,
    revenueSourceUrl: submission.revenueSourceUrl,
    linkedinUrl: submission.linkedinUrl,
    githubUrl: submission.githubUrl,
    youtubeUrl: submission.youtubeUrl,
    discordUrl: submission.discordUrl,
    instagramUrl: submission.instagramUrl,
    productHuntUrl: submission.productHuntUrl,
    consent: true as const,
    status: "approved" as const,
    submittedAt: submission.submittedAt,
    slug: submission.slug,
  };
}

export function websiteDomain(value: string) {
  try {
    return new URL(value).hostname.toLowerCase().replace(/\.$/, "").replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function submissionIssueBody(submission: ToolSubmission) {
  const json = JSON.stringify(publicSubmissionRecord(submission), null, 2);
  let fence = "```";
  while (json.includes(fence)) fence += "`";
  return [
    `Tool: ${neutralizeMentions(submission.name)}`,
    `Website: ${neutralizeMentions(submission.website)}`,
    `Email: ${submission.email}`,
    "",
    "The email is only in this private issue. It is not in the public directory file.",
    `Public file: \`data/submissions/${submission.slug}.json\` on main, with \`"status": "approved"\`.`,
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
    `Billing period: ${input.billingPeriod ?? ""}`,
    `Pricing page: ${input.pricingPageUrl ?? ""}`,
    `Logo URL: ${input.logoUrl ?? ""}`,
    `Maker: ${input.makerName ?? ""}`,
    `X handle: ${input.makerX ?? ""}`,
    `Maker type: ${input.makerType ?? ""}`,
    `YC batch: ${input.ycBatch ?? ""}`,
    `Launch year: ${input.launchYear ?? ""}`,
    `Revenue source: ${input.revenueSourceUrl ?? ""}`,
    `LinkedIn: ${input.linkedinUrl ?? ""}`,
    `GitHub: ${input.githubUrl ?? ""}`,
    `YouTube: ${input.youtubeUrl ?? ""}`,
    `Discord: ${input.discordUrl ?? ""}`,
    `Instagram: ${input.instagramUrl ?? ""}`,
    `Product Hunt: ${input.productHuntUrl ?? ""}`,
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
  return value.trim();
}

function sanitizePlainText(value: string) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/<\/?[a-z][^>\n]*>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function oneLine(value: unknown) {
  return sanitizePlainText(asString(value)).replace(/\s+/g, " ").trim();
}

const PROFANITY =
  /\b(fuck(?:ing|ed|er)?|shit(?:ty)?|bitch(?:es)?|asshole|cunt|nigger|nigga|faggot|retard(?:ed)?)\b/i;

const SPAM_PHRASES = [
  "buy followers",
  "crypto airdrop",
  "free btc",
  "work from home",
  "seo backlinks",
  "viagra",
  "cialis",
  "casino bonus",
];

export function textBlocked(value: string) {
  if (!value) return false;
  if (PROFANITY.test(value)) return true;
  const lower = value.toLowerCase();
  if (SPAM_PHRASES.some((phrase) => lower.includes(phrase))) return true;
  if (/(.)\1{11,}/.test(value)) return true;
  const links = value.match(/https?:\/\//gi);
  return Boolean(links && links.length > 5);
}

function isConsent(value: unknown) {
  return value === true || value === "true" || value === "on" || value === "yes";
}

function isToolType(value: string): value is ToolType {
  return toolTypes.some((item) => item.slug === value);
}

function isMakerType(value: string): value is MakerType {
  return makerTypes.some((item) => item.slug === value);
}

function blankHandle(value: string) {
  const handle = value.trim();
  return !handle || handle === "@" || schemeOnly(handle);
}

function normalizeHandle(value: string) {
  let handle = value.trim();
  if (blankHandle(handle)) return "";
  if (!/^https?:\/\//i.test(handle) && /^(?:www\.)?(?:x|twitter)\.com\//i.test(handle)) {
    handle = `https://${handle}`;
  }
  if (handle.startsWith("http://") || handle.startsWith("https://")) {
    try {
      const url = new URL(handle);
      const host = url.hostname.replace(/^www\./, "").toLowerCase();
      if (host === "x.com" || host === "twitter.com") {
        handle = url.pathname.split("/").filter(Boolean)[0] ?? "";
      }
    } catch {
      return "";
    }
  }
  return handle.replace(/^@+/, "").split(/[/?#]/)[0] ?? "";
}

function optionalPublicUrl(value: unknown): { ok: true; url: string } | { ok: false } {
  return normalizePublicUrl(oneLine(value), 500);
}

export function normalizePublicUrl(value: string, maxLength: number): { ok: true; url: string } | { ok: false } {
  const trimmed = value.trim();
  if (!trimmed || schemeOnly(trimmed)) return { ok: true, url: "" };
  let next = trimmed;
  if (!/^https?:\/\//i.test(next)) next = `https://${next.replace(/^\/+/, "")}`;
  return parsePublicUrl(next, maxLength);
}

function schemeOnly(value: string) {
  return /^(?:https?:\/\/)?(?:www\.)?$/i.test(value.trim());
}

function normalizeGithubUrl(value: string): { ok: true; url: string } | { ok: false } {
  const parsed = normalizePublicUrl(value, 500);
  if (!parsed.ok || !parsed.url) return parsed.ok ? { ok: true, url: "" } : parsed;
  const url = new URL(parsed.url);
  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  if (host !== "github.com") return { ok: false };
  const parts = url.pathname.split("/").filter(Boolean);
  if (parts.length < 1 || !parts.every((part) => /^[A-Za-z0-9_.-]+$/.test(part))) return { ok: false };
  return { ok: true, url: `https://github.com/${parts.join("/")}` };
}

function compactSocials(socials: Record<string, string>) {
  const entries = Object.entries(socials).filter(([, href]) => href);
  if (!entries.length) return undefined;
  return Object.fromEntries(entries);
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
  if (isBlockedHostname(url.hostname)) return { ok: false };
  return { ok: true, url: url.href };
}

export function isBlockedHostname(hostname: string) {
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
