import { path as outlookPath, title as outlookTitle, description as outlookDescription } from "@/lib/agents-outlook";
import { path as yearPath, title as yearTitle, description as yearDescription } from "@/lib/agents-12-month-outlook";
import { path as benchmarkPath, title as benchmarkTitle, description as benchmarkDescription } from "@/lib/benchmark-report";
import { getBlogPosts } from "@/lib/blog";
import type { DirectoryListing } from "@/lib/directory";
import { directoryMatches, path as frameworkPath, retrievedLabel, title as frameworkTitle } from "@/lib/framework-github-stats";
import { conciseText } from "@/lib/listing-scan";
import { getResearchDocs } from "@/lib/research";
import { path as shoppingPath, title as shoppingTitle, description as shoppingDescription } from "@/lib/shopping-report";
import { websiteDomain } from "@/lib/submissions";
import { verifiedRevenueEntries } from "@/lib/verified-revenue";

export type ListingReading = {
  href: string;
  title: string;
  kind: "Report" | "Benchmark" | "Research" | "Guide" | "Data";
  reason: string;
};

const FRAMEWORK_SLUGS = new Set(directoryMatches().map((match) => match.slug));

const SHOPPING_SLUGS = new Set(["gemini", "chatgpt", "amazon-rufus", "perplexity"]);

const BENCHMARK_NAMED: Record<string, string> = {
  "claude-code":
    "Terminal-Bench rows on this page use Claude Code as the agent. The figures are copied from the official board, with the date on each row.",
  codex:
    "Terminal-Bench rows on this page use Codex as the agent. The figures are copied from the official board, with the date on each row.",
};

type Candidate = ListingReading & { score: number };

let blogCache: ReturnType<typeof getBlogPosts> | null = null;
let researchCache: ReturnType<typeof getResearchDocs> | null = null;

export async function listingReading(listing: DirectoryListing): Promise<ListingReading[]> {
  const [posts, docs] = await Promise.all([
    (blogCache ??= getBlogPosts()),
    (researchCache ??= getResearchDocs()),
  ]);
  const candidates: Candidate[] = [];

  for (const post of posts) {
    if (post.category === "news") continue;
    const score = mentionScore(post.companies, post.html, listing.slug, post.category === "guide" ? 2 : 1);
    if (score < 5) continue;
    candidates.push({
      href: `/blog/${post.slug}`,
      title: post.title,
      kind: "Guide",
      reason: conciseText(post.description, 220),
      score,
    });
  }

  for (const doc of docs) {
    const score = mentionScore(doc.companies, doc.html, listing.slug, 2);
    if (score < 5) continue;
    candidates.push({
      href: `/research/${doc.slug}`,
      title: doc.title,
      kind: "Research",
      reason: conciseText(doc.description, 220),
      score,
    });
  }

  pushReport(candidates, {
    href: benchmarkPath,
    title: benchmarkTitle,
    kind: "Benchmark",
    reason: BENCHMARK_NAMED[listing.slug] ?? benchmarkDescription,
    score: BENCHMARK_NAMED[listing.slug] ? 9 : listing.category === "coding-agents" || listing.category === "agent-frameworks" ? 4 : 0,
  });

  pushReport(candidates, {
    href: yearPath,
    title: yearTitle,
    kind: "Report",
    reason: yearDescription,
    score: listing.category === "coding-agents" || listing.category === "agent-frameworks" ? 5 : 0,
  });

  pushReport(candidates, {
    href: outlookPath,
    title: outlookTitle,
    kind: "Report",
    reason: outlookDescription,
    score: listing.category === "coding-agents" || listing.category === "agent-frameworks" ? 4 : 0,
  });

  const shoppingNamed = SHOPPING_SLUGS.has(listing.slug);
  pushReport(candidates, {
    href: shoppingPath,
    title: shoppingTitle,
    kind: "Report",
    reason: shoppingNamed
      ? `${listing.name} is one of the products this shopping-agent report cites, with the dates on the company pages.`
      : shoppingDescription,
    score: shoppingNamed ? 9 : listing.category === "shopping-agents" ? 4 : 0,
  });

  if (FRAMEWORK_SLUGS.has(listing.slug)) {
    pushReport(candidates, {
      href: frameworkPath,
      title: frameworkTitle,
      kind: "Report",
      reason: `Stars, forks, licences, and the latest release for this repository, copied from the public GitHub API on ${retrievedLabel}.`,
      score: 9,
    });
  }

  const revenue = verifiedRevenueEntries.find((entry) => websiteDomain(entry.url) === websiteDomain(listing.website));
  if (revenue) {
    pushReport(candidates, {
      href: "/verified-revenue",
      title: "Verified revenue",
      kind: "Data",
      reason: `${revenue.name} is on the verified revenue table. The figure there has a payment-processor source and the date it was checked.`,
      score: 9,
    });
  }

  const seen = new Set<string>();
  return candidates
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .filter((item) => {
      if (seen.has(item.href)) return false;
      seen.add(item.href);
      return true;
    })
    .slice(0, 4)
    .map(({ href, title, kind, reason }) => ({ href, title, kind, reason }));
}

function mentionScore(
  companies: string[] | undefined,
  html: string,
  slug: string,
  kindBonus: number,
) {
  const named = companies?.includes(slug) ?? false;
  const linked = new RegExp(`/directory/${slug}(?![a-z0-9-])`, "i").test(html);
  if (!named && !linked) return 0;
  return (named ? 5 : 3) + (linked ? 1 : 0) + kindBonus;
}

function pushReport(candidates: Candidate[], item: Candidate) {
  if (item.score <= 0) return;
  candidates.push(item);
}
