import {
  COMPARISON_VERIFIED_LABEL,
  comparisonPages,
  type ComparisonPage,
} from "@/lib/comparisons";
import { categoryPageTitle, type DirectoryListing } from "@/lib/directory";
import { directoryCategories } from "@/lib/directory-meta";

export type RankLink = {
  title: string;
  href: string;
};

export type RankPeer = {
  name: string;
  href: string;
  isSelf?: boolean;
};

export type ListingRankView = {
  categoryTitle: string;
  categoryHref: string;
  comparisons: RankLink[];
  inComparison: boolean;
  top3: RankPeer[];
  top3Heading: string;
  top3Note: string;
  compareHref: string;
  compareLabel: string;
};

export function listingRankView(
  listing: { slug: string; name: string; category: string },
  listings: DirectoryListing[],
): ListingRankView {
  const categoryTitle = categoryPageTitle(listing.category);
  const categoryHref = `/directory/category/${listing.category}`;
  const forListing = comparisonPages.filter((page) =>
    page.rows.some((row) => row.listingSlug === listing.slug),
  );
  const forCategory = comparisonPages.filter((page) => page.categories.includes(listing.category));
  const comparisons = uniquePages([...forListing, ...forCategory]).map((page) => ({
    title: page.title,
    href: page.path,
  }));
  const table = forListing[0] ?? forCategory[0];
  if (table) {
    const top3 = peersFromTable(table, listing.slug);
    return {
      categoryTitle,
      categoryHref,
      comparisons,
      inComparison: forListing.length > 0,
      top3,
      top3Heading: `Compare yourself with the top 3 in ${categoryTitle}`,
      top3Note: forListing.length
        ? `${listing.name} is a row on ${table.title}. The first rows of that sourced table are below. Order is not a quality score. Last verified ${COMPARISON_VERIFIED_LABEL}.`
        : `${listing.name} is not a row on ${table.title} yet. The first rows of that sourced table are below. Order is not a quality score. Last verified ${COMPARISON_VERIFIED_LABEL}.`,
      compareHref: table.path,
      compareLabel: `Open ${table.title}`,
    };
  }

  const peers = listings
    .filter((other) => other.category === listing.category && other.slug !== listing.slug)
    .slice(0, 3)
    .map((other) => ({
      name: other.name,
      href: `/directory/${other.slug}`,
    }));

  return {
    categoryTitle,
    categoryHref,
    comparisons,
    inComparison: false,
    top3: peers,
    top3Heading: `Compare yourself with the top 3 in ${categoryTitle}`,
    top3Note: peers.length
      ? `This desk has not published a comparison table for ${categoryTitle}. The names below are other listings in that category. The category page is alphabetical, not a scored rank.`
      : `This desk has not published a comparison table for ${categoryTitle}, and no other listing is in that category yet.`,
    compareHref: categoryHref,
    compareLabel: `Open ${categoryTitle}`,
  };
}

export function rankByCategory(listings: DirectoryListing[]) {
  const views: Record<string, ListingRankView> = {};
  for (const category of directoryCategories) {
    views[category.slug] = listingRankView(
      { slug: "", name: "Your listing", category: category.slug },
      listings,
    );
  }
  return views;
}

function peersFromTable(page: ComparisonPage, slug: string): RankPeer[] {
  return page.rows
    .filter((row) => row.listingSlug)
    .slice(0, 3)
    .map((row) => ({
      name: row.name,
      href: `/directory/${row.listingSlug}`,
      isSelf: row.listingSlug === slug,
    }));
}

function uniquePages(pages: ComparisonPage[]) {
  const seen = new Set<string>();
  return pages.filter((page) => {
    if (seen.has(page.path)) return false;
    seen.add(page.path);
    return true;
  });
}
