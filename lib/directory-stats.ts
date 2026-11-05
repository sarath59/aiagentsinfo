import { getDirectoryListings, type DirectoryListing } from "@/lib/directory";
import { categoryTitle, pricingModels } from "@/lib/directory-meta";
import { readSubmissionRecords } from "@/lib/submission-files";
import { makerTypes, type MakerType, type ToolSubmission } from "@/lib/submissions";

export type OriginKey = MakerType | "not-recorded";

const originOrder: { key: OriginKey; title: string }[] = [
  ...makerTypes.map((item) => ({ key: item.slug, title: item.title })),
  { key: "not-recorded", title: "Not recorded" },
];

export async function getDirectoryStats() {
  const listings = await getDirectoryListings();
  const submissions = readSubmissionRecords();
  const listingBySlug = new Map(listings.map((listing) => [listing.slug, listing]));

  const byCategory = countCategories(listings);
  const byPricing = pricingModels.map((model) => ({
    slug: model.slug,
    title: model.title,
    count: listings.filter((listing) => listing.pricing.includes(model.slug)).length,
  }));

  const origin = Object.fromEntries(originOrder.map((item) => [item.key, 0])) as Record<OriginKey, number>;
  for (const listing of listings) {
    const submission = submissions.find((item) => item.slug === listing.slug && item.status === "approved");
    const key = submission?.makerType;
    if (key === "indie-hacker" || key === "startup" || key === "yc") origin[key] += 1;
    else origin["not-recorded"] += 1;
  }

  const additions = groupAdditions(submissions, listingBySlug);
  const verifiedByMonth = groupVerified(listings);
  const dates = [
    ...listings.map((listing) => listing.lastVerified),
    ...submissions.map((submission) => submission.submittedAt.slice(0, 10)),
  ];

  return {
    total: listings.length,
    byCategory,
    byPricing,
    origin: originOrder.map((item) => ({ ...item, count: origin[item.key] })),
    additions,
    verifiedByMonth,
    submissions: submissions.map((submission) => ({
      slug: submission.slug,
      name: submission.name,
      status: submission.status,
      makerType: submission.makerType,
      makerTitle: makerTypes.find((item) => item.slug === submission.makerType)?.title ?? "Not recorded",
      ycBatch: submission.ycBatch,
      submittedOn: submission.submittedAt.slice(0, 10),
      live: listingBySlug.has(submission.slug) && submission.status === "approved",
    })),
    approved: submissions.filter((submission) => submission.status === "approved").length,
    pending: submissions.filter((submission) => submission.status === "pending").length,
    updated: dates.reduce((max, value) => (value > max ? value : max), ""),
  };
}

function countCategories(listings: DirectoryListing[]) {
  const counts = new Map<string, number>();
  for (const listing of listings) counts.set(listing.category, (counts.get(listing.category) ?? 0) + 1);
  return [...counts.entries()]
    .map(([slug, count]) => ({ slug, title: categoryTitle(slug), count }))
    .sort((a, b) => b.count - a.count || a.title.localeCompare(b.title));
}

function groupAdditions(submissions: ToolSubmission[], listingBySlug: Map<string, DirectoryListing>) {
  const groups = new Map<string, { slug: string; name: string; live: boolean }[]>();
  for (const submission of submissions) {
    const day = submission.submittedAt.slice(0, 10);
    const list = groups.get(day) ?? [];
    list.push({
      slug: submission.slug,
      name: submission.name,
      live: listingBySlug.has(submission.slug) && submission.status === "approved",
    });
    groups.set(day, list);
  }
  return [...groups.entries()]
    .map(([date, items]) => ({
      date,
      count: items.length,
      items: items.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function groupVerified(listings: DirectoryListing[]) {
  const counts = new Map<string, number>();
  for (const listing of listings) {
    const month = listing.lastVerified.slice(0, 7);
    counts.set(month, (counts.get(month) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export function pricingOverlapNote() {
  return "A listing can have more than one pricing label, so the pricing counts can add up to more than the number of listings.";
}
