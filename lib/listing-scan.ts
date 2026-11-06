import { audiences } from "@/lib/site";
import { communityListingIsIndexable, visibleText, wordCount } from "@/lib/indexing";
import { toolTypes } from "@/lib/submissions";
import {
  categorySummaries,
  categoryTitle,
  type DirectoryCategory,
} from "@/lib/directory-meta";
import type { DirectoryListing } from "@/lib/directory";

export type ListingAlternative = {
  listing: DirectoryListing;
  reason: string;
};

export type ProfileSection = {
  id: string;
  label: string;
};

/** Submission "type" values are not a reason to call two products alternatives. */
const GENERIC_TAGS = new Set<string>(toolTypes.map((item) => item.slug));

export function firstSentence(value: string) {
  const text = value.replace(/\s+/g, " ").trim();
  const match = text.match(/^[\s\S]*?[.!?](?=\s|$)/);
  return (match ? match[0] : text).trim();
}

export function textAfterSentence(value: string, sentence: string) {
  return value.replace(/\s+/g, " ").trim().slice(sentence.length).trim();
}

/** Keep a sourced note short enough for the intro without cutting mid-word when a sentence fits. */
export function conciseText(value: string, max = 280) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)/g);
  if (!sentences?.length) return `${text.slice(0, max - 1).trim()}…`;
  let out = "";
  for (const sentence of sentences) {
    const piece = sentence.trim();
    const next = out ? `${out} ${piece}` : piece;
    if (next.length > max) {
      if (!out) return `${piece.slice(0, max - 1).trim()}…`;
      break;
    }
    out = next;
  }
  return out;
}

export function listingIsSubstantial(listing: DirectoryListing) {
  if (!communityListingIsIndexable(listing)) return false;
  if (listing.communitySubmitted) return true;
  const words = wordCount(visibleText(listing.html));
  return words >= 40 || listing.features.length >= 2 || listing.pricingSummary.trim().length > 80;
}

export function bestFitSummary(listing: DirectoryListing) {
  const category =
    categorySummaries[listing.category as DirectoryCategory] ?? categoryTitle(listing.category);
  const uses = listing.useCases.length ? ` Listed use: ${listing.useCases.join(", ")}.` : "";
  const audience = listing.audiences.flatMap((slug) => {
    const title = audiences.find((item) => item.slug === slug)?.title;
    return title ? [title] : [];
  });
  const audienceLine = audience.length ? ` Listed audience: ${audience.join(", ")}.` : "";
  return `${category}${uses}${audienceLine}`;
}

export function listingAlternatives(
  listing: DirectoryListing,
  all: DirectoryListing[],
  limit = 3,
): ListingAlternative[] {
  return all
    .filter((other) => other.slug !== listing.slug)
    .map((other) => {
      const sameCategory = other.category === listing.category;
      const uses = other.useCases.filter((useCase) => listing.useCases.includes(useCase));
      const tags = other.tags.filter((tag) => listing.tags.includes(tag) && !GENERIC_TAGS.has(tag));
      const score = (sameCategory ? 3 : 0) + uses.length + tags.length;
      return { other, score, sameCategory, uses, tags };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.other.name.localeCompare(b.other.name))
    .slice(0, limit)
    .map((entry) => ({
      listing: entry.other,
      reason: alternativeReason(entry),
    }));
}

function alternativeReason(entry: {
  other: DirectoryListing;
  sameCategory: boolean;
  uses: string[];
  tags: string[];
}) {
  const parts: string[] = [];
  if (entry.sameCategory) parts.push(`Same category, ${categoryTitle(entry.other.category)}`);
  if (entry.uses.length) parts.push(`also listed for ${entry.uses.join(", ")}`);
  else if (entry.tags.length) parts.push(`shared tags: ${entry.tags.slice(0, 3).join(", ")}`);
  if (!parts.length) return "Listed here because the directory records overlap with this product.";
  const sentence = parts.join("; ");
  return sentence.endsWith(".") ? sentence : `${sentence}.`;
}

export function profileSections(input: {
  substantial: boolean;
  hasFeatures: boolean;
  hasPricing: boolean;
  hasAlternatives: boolean;
  hasResearch: boolean;
}): ProfileSection[] {
  if (!input.substantial) return [];
  const sections: ProfileSection[] = [{ id: "overview", label: "Overview" }];
  if (input.hasFeatures) sections.push({ id: "features", label: "Features" });
  if (input.hasPricing) sections.push({ id: "pricing", label: "Pricing" });
  if (input.hasAlternatives) sections.push({ id: "alternatives", label: "Alternatives" });
  if (input.hasResearch) sections.push({ id: "reports", label: "Research" });
  return sections.length > 1 ? sections : [];
}
