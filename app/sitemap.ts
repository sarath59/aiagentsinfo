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
import { path as frameworkGithubPath, retrievedDay as frameworkGithubDay } from "@/lib/framework-github-stats";
import { getResearchDocs } from "@/lib/research";
import { COMPARISON_VERIFIED_ON, comparisonPages } from "@/lib/comparisons";
import { absoluteUrl, audiences, topics } from "@/lib/site";
import { verifiedRevenueChecked } from "@/lib/verified-revenue";
import { downloadPagePath, releasePagePath, starPagePath } from "@/lib/trackers/entities";
import { indexableDownloadPackages } from "@/lib/trackers/download-pages";
import { releasesSnapshotDay, releaseStaticParams } from "@/lib/trackers/releases";
import { storedStarPoints } from "@/lib/trackers/star-history";
import { indexableStarPages } from "@/lib/trackers/star-pages";

function maxDate(values: (string | undefined)[]) {
  let max = Number.NEGATIVE_INFINITY;
  for (const value of values) {
    if (!value) continue;
    const time = Date.parse(value);
    if (!Number.isNaN(time) && time > max) max = time;
  }
  return max === Number.NEGATIVE_INFINITY ? undefined : new Date(max);
}

function entry(
  path: string,
  lastModified?: Date,
  priority = 0.7,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = path === "/" ? "weekly" : "monthly",
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    ...(lastModified ? { lastModified } : {}),
    changeFrequency,
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
    { path: "/trackers", priority: 0.7, changeFrequency: "daily" as const },
    { path: "/trackers/downloads", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/trackers/agents-md", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/trackers/stars", priority: 0.7, changeFrequency: "daily" as const },
    { path: "/trackers/breakthroughs", priority: 0.5 },
    { path: "/trackers/harnesses", priority: 0.5 },
    { path: "/trackers/benchmarks", priority: 0.5 },
    { path: "/reports", priority: 0.6 },
    { path: "/reports/ai-agents-next-6-months", priority: 0.7 },
    { path: "/reports/agent-harness-benchmark-november-2026", priority: 0.7 },
    { path: "/directory/stats", priority: 0.6 },
    { path: "/agent-cost-calculator", priority: 0.6 },
    { path: "/agent-prompt-checker", priority: 0.6 },
    { path: "/mcp", priority: 0.7 },
    ...audiences.map((item) => ({ path: item.href, priority: 0.6 })),
  ];
  const comparisonUpdated = new Date(`${COMPARISON_VERIFIED_ON}T00:00:00.000Z`);
  const releaseUpdated = new Date(`${releasesSnapshotDay}T00:00:00.000Z`);
  const starDays = indexableStarPages().flatMap((item) => storedStarPoints(item.id).map((point) => point.date));
  const starUpdated = starDays.length ? new Date(`${starDays.sort().at(-1)}T00:00:00.000Z`) : releaseUpdated;
  const downloadUpdated = releaseUpdated;

  return [
    entry("/", maxDate(contentDates), 1),
    entry("/blog", maxDate(posts.map((post) => post.updated ?? post.date)), 0.8),
    entry("/research", maxDate(research.map((doc) => doc.updated ?? doc.date)), 0.8),
    entry(
      "/papers",
      maxDate(research.filter((doc) => doc.type === "paper-breakdown").map((doc) => doc.updated ?? doc.date)),
      0.8,
    ),
    entry("/directory", maxDate(listings.map((listing) => listing.lastVerified)), 0.8),
    entry("/topics", maxDate(contentDates), 0.6),
    entry("/llms.txt", maxDate(contentDates), 0.4),
    entry("/llms-full.txt", maxDate(contentDates), 0.4),
    entry("/about", trustUpdated, 0.5),
    entry("/contact", trustUpdated, 0.5),
    entry("/editorial-policy", trustUpdated, 0.5),
    entry("/submit", trustUpdated, 0.6),
    entry("/verified-revenue", new Date(`${verifiedRevenueChecked}T00:00:00.000Z`), 0.6),
    entry(frameworkGithubPath, new Date(`${frameworkGithubDay}T00:00:00.000Z`), 0.7),
    entry("/tools", new Date("2026-11-13T00:00:00.000Z"), 0.7),
    entry("/tools/mcp-config-generator", new Date("2026-11-13T00:00:00.000Z"), 0.8),
    entry("/tools/ai-crawler-robots-txt-checker", new Date("2026-11-12T00:00:00.000Z"), 0.8),
    entry("/tools/ai-agent-roi-calculator", new Date("2026-11-11T00:00:00.000Z"), 0.8),
    entry("/tools/web-search-api-cost-per-agent-task", new Date("2026-11-13T00:00:00.000Z"), 0.8),
    entry("/tools/agents-md-generator", new Date("2026-11-10T00:00:00.000Z"), 0.8),
    entry("/tools/agent-picker", new Date("2026-11-09T00:00:00.000Z"), 0.7),
    entry("/tools/ai-agent-harness-evaluation-checklist", new Date("2026-11-10T00:00:00.000Z"), 0.8),
    entry("/tools/shopping-agent-readiness-checker", new Date("2026-11-12T00:00:00.000Z"), 0.8),
    entry("/tools/cursor-vs-claude-code-vs-codex-pricing", new Date("2026-11-09T00:00:00.000Z"), 0.7),
    entry("/reports/ai-agents-next-12-months", new Date("2026-11-12T00:00:00.000Z"), 0.8),
    entry("/reports/ai-shopping-agents-next-6-months", new Date("2026-11-13T00:00:00.000Z"), 0.7),
    entry("/reports/enterprise-agent-platforms-next-6-months", new Date("2026-11-12T00:00:00.000Z"), 0.8),
    entry("/reports/ai-shopping-agents-next-30-days", new Date("2026-11-12T00:00:00.000Z"), 0.8),
    entry("/reports/ai-agent-frameworks-next-6-months", new Date("2026-11-12T00:00:00.000Z"), 0.8),
    entry("/reports/ai-agent-vendor-robots-txt-november-2026", new Date("2026-11-13T00:00:00.000Z"), 0.7),
    entry("/reports/web-search-tools-for-ai-agents-november-2026", new Date("2026-11-12T00:00:00.000Z"), 0.7),
    entry("/reports/ai-answer-crawlers-november-2026", new Date("2026-11-11T00:00:00.000Z"), 0.7),
    entry("/reports/voice-agents-next-6-months", new Date("2026-11-11T00:00:00.000Z"), 0.8),
    entry("/reports/ai-agents-in-production-2026", new Date("2026-11-10T00:00:00.000Z"), 0.8),
    entry("/reports/ai-agents-in-2027", new Date("2026-11-10T00:00:00.000Z"), 0.8),
    entry("/reports/mcp-next-6-months", new Date("2026-11-10T00:00:00.000Z"), 0.8),
    entry("/reports/ai-coding-agents-next-30-days", new Date("2026-11-08T00:00:00.000Z"), 0.7),
    entry("/reports/browser-and-computer-use-agents-next-6-months", new Date("2026-11-09T00:00:00.000Z"), 0.7),
    ...authors.map((author) => entry(`/authors/${author.slug}`, trustUpdated, 0.5)),
    entry("/best", comparisonUpdated, 0.7),
    ...comparisonPages.map((item) =>
      entry(item.path, new Date(`${item.verifiedOn ?? COMPARISON_VERIFIED_ON}T00:00:00.000Z`), 0.8),
    ),
    ...staticPaths.map((item) =>
      entry(item.path, undefined, item.priority, "changeFrequency" in item ? item.changeFrequency : undefined),
    ),
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
    ...indexableStarPages().map((item) => entry(starPagePath(item.id), starUpdated, 0.6, "daily")),
    ...indexableDownloadPackages().map((item) => entry(downloadPagePath(item.id), downloadUpdated, 0.6, "daily")),
    ...releaseStaticParams().map((item) => entry(releasePagePath(item.slug, item.month), releaseUpdated, 0.5, "weekly")),
  ];
}
