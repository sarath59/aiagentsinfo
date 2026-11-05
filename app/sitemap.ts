import type { MetadataRoute } from "next";
import { authors, trustDates } from "@/lib/authors";
import { getBlogPosts } from "@/lib/blog";
import {
  directoryCollections,
  getDirectoryListings,
  listingsForCollection,
} from "@/lib/directory";
import { directoryCategories } from "@/lib/directory-meta";
import { getGlossaryTerms } from "@/lib/glossary";
import { communityListingIsIndexable, topicIsIndexable } from "@/lib/indexing";
import { getResearchDocs } from "@/lib/research";
import { absoluteUrl, audiences, topics } from "@/lib/site";
import { verifiedRevenueChecked } from "@/lib/verified-revenue";

function maxDate(values: (string | undefined)[]) {
  let max = Number.NEGATIVE_INFINITY;
  for (const value of values) {
    if (!value) continue;
    const time = Date.parse(value);
    if (!Number.isNaN(time) && time > max) max = time;
  }
  return max === Number.NEGATIVE_INFINITY ? undefined : new Date(max);
}

function entry(path: string, lastModified?: Date, priority = 0.7): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    ...(lastModified ? { lastModified } : {}),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, research, listings, glossary] = await Promise.all([
    getBlogPosts(),
    getResearchDocs(),
    getDirectoryListings(),
    getGlossaryTerms(),
  ]);

  const contentDates = [
    ...posts.map((post) => post.updated ?? post.date),
    ...research.map((doc) => doc.updated ?? doc.date),
    ...listings.map((listing) => listing.lastVerified),
  ];
  const trustUpdated = new Date(`${trustDates.updated}T00:00:00.000Z`);

  const indexableTopics = topics.filter((topic) =>
    topicIsIndexable(topic.slug, { posts, research, glossary, listings }),
  );
  const indexableCategories = directoryCategories.filter((category) =>
    listings.some((listing) => listing.category === category.slug),
  );
  const indexableCollections = directoryCollections.filter(
    (collection) => listingsForCollection(listings, collection.slug).length > 0,
  );
  const indexableListings = listings.filter((listing) => communityListingIsIndexable(listing));

  const staticPaths = [
    { path: "/glossary", priority: 0.7 },
    { path: "/search", priority: 0.4 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/advertise", priority: 0.3 },
    { path: "/trackers/breakthroughs", priority: 0.5 },
    { path: "/trackers/harnesses", priority: 0.5 },
    { path: "/trackers/benchmarks", priority: 0.5 },
    { path: "/reports", priority: 0.6 },
    { path: "/reports/agent-harness-benchmark-november-2026", priority: 0.7 },
    { path: "/directory/stats", priority: 0.6 },
    { path: "/agent-cost-calculator", priority: 0.6 },
    ...audiences.map((item) => ({ path: item.href, priority: 0.6 })),
  ];

  return [
    entry("/", maxDate(contentDates), 1),
    entry("/blog", maxDate(posts.map((post) => post.updated ?? post.date)), 0.8),
    entry("/research", maxDate(research.map((doc) => doc.updated ?? doc.date)), 0.8),
    entry("/directory", maxDate(listings.map((listing) => listing.lastVerified)), 0.8),
    entry("/topics", maxDate(contentDates), 0.6),
    entry("/about", trustUpdated, 0.5),
    entry("/contact", trustUpdated, 0.5),
    entry("/editorial-policy", trustUpdated, 0.5),
    entry("/submit", trustUpdated, 0.6),
    entry("/verified-revenue", new Date(`${verifiedRevenueChecked}T00:00:00.000Z`), 0.6),
    ...authors.map((author) => entry(`/authors/${author.slug}`, trustUpdated, 0.5)),
    ...staticPaths.map((item) => entry(item.path, undefined, item.priority)),
    ...indexableTopics.map((topic) => entry(topic.href, maxDate(contentDates), 0.6)),
    ...indexableCategories.map((category) =>
      entry(
        `/directory/category/${category.slug}`,
        maxDate(
          listings.filter((listing) => listing.category === category.slug).map((listing) => listing.lastVerified),
        ),
        0.6,
      ),
    ),
    ...indexableCollections.map((collection) =>
      entry(
        `/directory/${collection.slug}`,
        maxDate(listingsForCollection(listings, collection.slug).map((listing) => listing.lastVerified)),
        0.5,
      ),
    ),
    ...posts.map((post) => entry(`/blog/${post.slug}`, new Date(post.updated ?? post.date), 0.8)),
    ...research.map((doc) => entry(`/research/${doc.slug}`, new Date(doc.updated ?? doc.date), 0.8)),
    ...glossary.map((term) => entry(`/glossary/${term.slug}`, undefined, 0.6)),
    ...indexableListings.map((listing) =>
      entry(`/directory/${listing.slug}`, new Date(listing.lastVerified), 0.7),
    ),
  ];
}
