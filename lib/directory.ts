import { contentDir, loadMarkdownCollection } from "@/lib/markdown";

export const directoryCategories = [
  { slug: "coding-agents", title: "Coding agents" },
  { slug: "shopping-agents", title: "Shopping agents" },
  { slug: "education", title: "Education" },
  { slug: "productivity", title: "Productivity" },
  { slug: "research", title: "Research" },
  { slug: "voice", title: "Voice" },
  { slug: "image-video", title: "Image & video" },
  { slug: "agent-frameworks", title: "Agent frameworks & harnesses" },
] as const;

export const pricingModels = [
  { slug: "free", title: "Free" },
  { slug: "freemium", title: "Freemium" },
  { slug: "paid", title: "Paid" },
  { slug: "open-source", title: "Open source" },
] as const;

export const directoryCollections = [
  { slug: "new", title: "New this week", field: "newThisWeek" },
  { slug: "trending", title: "Trending", field: "trending" },
  { slug: "editors-picks", title: "Editor's picks", field: "editorsPick" },
] as const;

export type DirectoryCategory = (typeof directoryCategories)[number]["slug"];
export type PricingModel = (typeof pricingModels)[number]["slug"];

export type DirectoryFrontmatter = {
  name: string;
  vendor: string;
  website: string;
  /** Public path such as /logos/claude.png. Empty when no official logo was found. */
  logo?: string;
  summary: string;
  category: DirectoryCategory;
  tags: string[];
  pricing: PricingModel[];
  useCases: string[];
  audiences: string[];
  features: string[];
  pricingSummary: string;
  lastVerified: string;
  sample?: boolean;
  newThisWeek?: boolean;
  trending?: boolean;
  editorsPick?: boolean;
  sponsored?: boolean;
};

export type DirectoryListing = {
  slug: string;
  html: string;
} & DirectoryFrontmatter;

export type DirectoryFilters = {
  q?: string;
  category?: string;
  pricing?: string;
  useCase?: string;
  audience?: string;
  tag?: string;
};

export async function getDirectoryListings(): Promise<DirectoryListing[]> {
  const docs = await loadMarkdownCollection<DirectoryFrontmatter>(
    contentDir("directory"),
  );
  return docs
    .map((doc) => ({
      slug: doc.slug,
      html: doc.html,
      ...doc.data,
    }))
    .filter((listing) => listing.sample !== true)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getDirectoryListing(slug: string) {
  const listings = await getDirectoryListings();
  return listings.find((listing) => listing.slug === slug);
}

export function filterDirectory(
  listings: DirectoryListing[],
  filters: DirectoryFilters,
) {
  const q = filters.q?.trim().toLowerCase();
  return listings.filter((listing) => {
    if (filters.category && listing.category !== filters.category) return false;
    if (filters.pricing && !listing.pricing.includes(filters.pricing as PricingModel)) {
      return false;
    }
    if (filters.useCase && !listing.useCases.includes(filters.useCase)) return false;
    if (filters.audience && !listing.audiences.includes(filters.audience)) return false;
    if (filters.tag && !listing.tags.includes(filters.tag)) return false;
    if (q) {
      const haystack = [
        listing.name,
        listing.vendor,
        listing.summary,
        listing.tags.join(" "),
        listing.useCases.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function relatedListings(
  listing: DirectoryListing,
  all: DirectoryListing[],
  limit = 3,
) {
  return all
    .filter((other) => other.slug !== listing.slug)
    .map((other) => {
      let score = 0;
      if (other.category === listing.category) score += 3;
      score += other.tags.filter((tag) => listing.tags.includes(tag)).length;
      score += other.useCases.filter((useCase) =>
        listing.useCases.includes(useCase),
      ).length;
      return { other, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.other);
}

export function categoryTitle(slug: string) {
  return (
    directoryCategories.find((category) => category.slug === slug)?.title ?? slug
  );
}

export function collectionBySlug(slug: string) {
  return directoryCollections.find((collection) => collection.slug === slug);
}

export function listingsForCollection(
  listings: DirectoryListing[],
  slug: string,
) {
  const collection = collectionBySlug(slug);
  if (!collection) return [];
  return listings.filter((listing) => listing[collection.field]);
}

export function allTags(listings: DirectoryListing[]) {
  return Array.from(new Set(listings.flatMap((listing) => listing.tags))).sort();
}

export function allUseCases(listings: DirectoryListing[]) {
  return Array.from(
    new Set(listings.flatMap((listing) => listing.useCases)),
  ).sort();
}
