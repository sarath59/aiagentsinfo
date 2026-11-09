import { categoryTitle, pricingTitle, type PricingModel } from "@/lib/directory-meta";

export type PickerUse =
  | "coding"
  | "frameworks"
  | "writing"
  | "image-video"
  | "research"
  | "marketing"
  | "support"
  | "shopping"
  | "voice"
  | "any";

export type PickerAnswers = {
  useCase: PickerUse;
  budget: "free-path" | "paid-ok";
  openSource: "required" | "either";
  build: "code" | "nocode" | "either";
};

export type PickerListing = {
  slug: string;
  name: string;
  summary: string;
  category: string;
  categoryLabel: string;
  pricing: PricingModel[];
  pricingLabel: string;
  useCases: string[];
  tags: string[];
  audiences: string[];
};

export type PickerMatch = {
  slug: string;
  name: string;
  summary: string;
  href: string;
  why: string;
  missed: string[];
};

export const PICKER_USES: { id: PickerUse; label: string }[] = [
  { id: "coding", label: "Coding" },
  { id: "frameworks", label: "Building an agent (framework or harness)" },
  { id: "writing", label: "Writing" },
  { id: "image-video", label: "Images or video" },
  { id: "research", label: "Research" },
  { id: "marketing", label: "Marketing, SEO, or sales" },
  { id: "support", label: "Customer support" },
  { id: "shopping", label: "Shopping" },
  { id: "voice", label: "Voice or audio" },
  { id: "any", label: "Not sure" },
];

const CODE_CATEGORIES = new Set(["coding-agents", "coding", "agent-frameworks", "developer-tools"]);

export function toPickerListings(
  listings: {
    slug: string;
    name: string;
    summary: string;
    category: string;
    pricing: PricingModel[];
    useCases: string[];
    tags: string[];
    audiences: string[];
  }[],
): PickerListing[] {
  return listings.map((listing) => ({
    slug: listing.slug,
    name: listing.name,
    summary: listing.summary,
    category: listing.category,
    categoryLabel: categoryTitle(listing.category),
    pricing: listing.pricing,
    pricingLabel: listing.pricing.map((item) => pricingTitle(item)).join(", "),
    useCases: listing.useCases,
    tags: listing.tags,
    audiences: listing.audiences,
  }));
}

export function availableUses(listings: PickerListing[]) {
  return PICKER_USES.filter((item) => item.id === "any" || listings.some((listing) => matchesUse(listing, item.id)));
}

export function recommendAgents(listings: PickerListing[], answers: PickerAnswers): {
  matches: PickerMatch[];
  note: string;
} {
  const ranked = listings
    .map((listing) => scoreListing(listing, answers))
    .sort((a, b) => b.score - a.score || a.listing.name.localeCompare(b.listing.name));

  const strict = ranked.filter((item) => item.missed.length === 0);
  const chosen = (strict.length >= 3 ? strict : ranked).slice(0, 3);
  const note =
    strict.length >= 3
      ? "These three listings match every answer. Ties are alphabetical. This is not a rating."
      : strict.length > 0
        ? `${strict.length} listing${strict.length === 1 ? "" : "s"} matched every answer. The rest are the closest listings in the directory, and the note says which answer they miss. Alphabetical among ties. Not a rating.`
        : "No listing matched every answer. These are the closest three in the directory. The note under each one says which answer it misses. Not a rating.";

  return {
    note,
    matches: chosen.map((item) => ({
      slug: item.listing.slug,
      name: item.listing.name,
      summary: item.listing.summary,
      href: `/directory/${item.listing.slug}`,
      why: whyText(item.listing),
      missed: item.missed,
    })),
  };
}

function scoreListing(listing: PickerListing, answers: PickerAnswers) {
  const missed: string[] = [];
  let score = 0;
  if (answers.useCase === "any" || matchesUse(listing, answers.useCase)) score += 8;
  else missed.push("Different use case");
  if (answers.budget === "paid-ok" || hasFreePath(listing)) score += 4;
  else missed.push("No free, freemium, free-trial, or open-source pricing tag");
  if (answers.openSource === "either" || isOpenSource(listing)) score += 4;
  else missed.push("Not tagged open source");
  if (answers.build === "either" || (answers.build === "code" ? isCode(listing) : isNoCode(listing))) score += 3;
  else missed.push(answers.build === "code" ? "Not a coding or framework listing" : "This listing is for people who write code");
  return { listing, score, missed };
}

function matchesUse(listing: PickerListing, useCase: PickerUse) {
  const { category, useCases, tags } = listing;
  switch (useCase) {
    case "coding":
      return useCases.includes("coding") || category === "coding-agents" || category === "coding" || category === "developer-tools";
    case "frameworks":
      return category === "agent-frameworks" || useCases.includes("agents") || tags.includes("framework") || tags.includes("harnesses");
    case "writing":
      return category === "writing" || useCases.includes("writing");
    case "image-video":
      return category === "image" || category === "video" || category === "image-video" || useCases.includes("image") || useCases.includes("video");
    case "research":
      return category === "research" || useCases.includes("research");
    case "marketing":
      return category === "marketing" || category === "seo" || category === "sales" || category === "social-media";
    case "support":
      return category === "customer-support";
    case "shopping":
      return category === "shopping-agents" || category === "ecommerce";
    case "voice":
      return category === "voice";
    default:
      return true;
  }
}

function hasFreePath(listing: PickerListing) {
  return listing.pricing.some((item) => item === "free" || item === "freemium" || item === "free-trial" || item === "open-source");
}

function isOpenSource(listing: PickerListing) {
  return listing.pricing.includes("open-source") || listing.tags.includes("open-source");
}

function isCode(listing: PickerListing) {
  return (
    CODE_CATEGORIES.has(listing.category) ||
    listing.useCases.includes("coding") ||
    listing.tags.includes("coding") ||
    listing.tags.includes("framework")
  );
}

function isNoCode(listing: PickerListing) {
  if (listing.category === "no-code" || listing.tags.includes("no-code")) return true;
  return !isCode(listing);
}

function whyText(listing: PickerListing) {
  const bits = [`Category: ${listing.categoryLabel}.`, `Pricing tags: ${listing.pricingLabel || "not set"}.`];
  if (listing.useCases.length) bits.push(`Use: ${listing.useCases.join(", ")}.`);
  if (isOpenSource(listing)) bits.push("Tagged open source.");
  return bits.join(" ");
}
