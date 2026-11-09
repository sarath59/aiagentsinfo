import { absoluteUrl, site } from "@/lib/site";

export const CHECKLIST_KEYS = [
  "screenshots",
  "demo-video",
  "pricing",
  "use-cases",
  "links",
] as const;

export type ChecklistKey = (typeof CHECKLIST_KEYS)[number];

export type ChecklistSocials = {
  x?: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
  discord?: string;
  instagram?: string;
  productHunt?: string;
};

/** Fields the completeness card can read. Safe to build from a listing or from the submit form. */
export type ChecklistSource = {
  slug: string;
  html?: string;
  startingPrice?: string;
  pricingPageUrl?: string;
  pricing?: readonly string[];
  useCases?: readonly string[];
  socials?: ChecklistSocials;
};

export type ChecklistItem = {
  key: ChecklistKey;
  label: string;
  done: boolean;
  detail: string;
  href: string;
};

const ITEM_COPY: Record<
  ChecklistKey,
  { label: string; done: string; missing: string; mail: string }
> = {
  screenshots: {
    label: "Screenshots",
    done: "A product image is already in the listing body.",
    missing: "No product screenshot is in the listing yet. A logo is not a screenshot.",
    mail: "Screenshots: public image URLs that show the product in use. A logo file is not enough.",
  },
  "demo-video": {
    label: "Demo video",
    done: "A YouTube or other video link is on file.",
    missing: "No demo video link is on this listing yet.",
    mail: "Demo video: a public YouTube (or similar) URL that shows the product.",
  },
  pricing: {
    label: "Pricing",
    done: "A starting price, a pricing page, or a free/open-source model is on file.",
    missing: "The pricing model is listed, but there is no starting price or pricing-page URL.",
    mail: "Pricing: a starting price (for example $19/mo) and/or the public pricing-page URL.",
  },
  "use-cases": {
    label: "Use cases",
    done: "At least one use case is on the listing.",
    missing: "No use cases are on this listing yet. Directory filters use that field.",
    mail: "Use cases: short labels for the jobs this product does, such as coding, writing, or customer-support.",
  },
  links: {
    label: "Links",
    done: "At least one social or profile link is on file besides the website.",
    missing: "The website is listed. X, LinkedIn, GitHub, YouTube, or Product Hunt is not.",
    mail: "Links: public X, LinkedIn, GitHub, YouTube, Discord, Instagram, or Product Hunt URLs.",
  },
};

const SOCIAL_KEYS = [
  "x",
  "linkedin",
  "github",
  "youtube",
  "discord",
  "instagram",
  "productHunt",
] as const;

export function parseChecklistNeeds(raw?: string | string[]) {
  const value = Array.isArray(raw) ? raw.join(",") : raw ?? "";
  const wanted = new Set(
    value
      .split(",")
      .map((part) => part.trim())
      .filter((part): part is ChecklistKey => CHECKLIST_KEYS.includes(part as ChecklistKey)),
  );
  return CHECKLIST_KEYS.filter((key) => wanted.has(key));
}

export function listingUpdateHref(slug: string, need?: ChecklistKey | ChecklistKey[]) {
  const params = new URLSearchParams({ claim: slug });
  const needs = (Array.isArray(need) ? need : need ? [need] : []).filter(Boolean);
  if (needs.length) params.set("need", needs.join(","));
  return `/submit?${params.toString()}`;
}

export function listingUpdateMailto(
  listing: { name: string; slug: string },
  needs: ChecklistKey[] = [],
) {
  const labels = needs.map((key) => ITEM_COPY[key].label);
  const subject = `Claim / update listing: ${listing.name}`;
  const lines = [
    `Listing: ${absoluteUrl(`/directory/${listing.slug}`)}`,
    "",
    labels.length ? `Please add or update: ${labels.join(", ")}.` : "What should change:",
    "",
    ...needs.map((key) => ITEM_COPY[key].mail),
  ];
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export function listingChecklist(source: ChecklistSource): ChecklistItem[] {
  const states: Record<ChecklistKey, boolean> = {
    screenshots: hasScreenshots(source.html),
    "demo-video": hasDemoVideo(source),
    pricing: hasPricing(source),
    "use-cases": (source.useCases ?? []).some((item) => item.trim()),
    links: hasProfileLinks(source.socials),
  };
  return CHECKLIST_KEYS.map((key) => {
    const done = states[key];
    const copy = ITEM_COPY[key];
    return {
      key,
      label: copy.label,
      done,
      detail: done ? copy.done : copy.missing,
      href: listingUpdateHref(source.slug, key),
    };
  });
}

export function checklistFromDraft(input: {
  slug: string;
  description?: string;
  startingPrice?: string;
  pricingPageUrl?: string;
  pricing?: string;
  youtubeUrl?: string;
  makerX?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  discordUrl?: string;
  instagramUrl?: string;
  productHuntUrl?: string;
}): ChecklistItem[] {
  return listingChecklist({
    slug: input.slug,
    html: input.description ?? "",
    startingPrice: input.startingPrice,
    pricingPageUrl: input.pricingPageUrl,
    pricing: input.pricing ? [input.pricing] : [],
    useCases: [],
    socials: {
      x: input.makerX,
      linkedin: input.linkedinUrl,
      github: input.githubUrl,
      youtube: input.youtubeUrl,
      discord: input.discordUrl,
      instagram: input.instagramUrl,
      productHunt: input.productHuntUrl,
    },
  });
}

function hasScreenshots(html?: string) {
  return Boolean(html && /<img\b/i.test(html));
}

function hasDemoVideo(source: ChecklistSource) {
  if (source.socials?.youtube?.trim()) return true;
  const html = source.html ?? "";
  return /youtube\.com|youtu\.be|vimeo\.com/i.test(html);
}

function hasPricing(source: ChecklistSource) {
  if (source.startingPrice?.trim()) return true;
  if (source.pricingPageUrl?.trim()) return true;
  const models = source.pricing ?? [];
  return models.length > 0 && models.every((model) => model === "free" || model === "open-source");
}

function hasProfileLinks(socials?: ChecklistSocials) {
  if (!socials) return false;
  return SOCIAL_KEYS.some((key) => Boolean(socials[key]?.trim()));
}
