import { getBlogPosts, type BlogPost } from "@/lib/blog";
import { categoryTitle as directoryCategoryTitle, getDirectoryListings } from "@/lib/directory";
import { getGlossaryTerms } from "@/lib/glossary";
import { contentDir, loadMarkdownCollection } from "@/lib/markdown";
import { getResearchDocs } from "@/lib/research";
import { absoluteUrl, audiences, site, topics } from "@/lib/site";
import { verifiedRevenueChecked, verifiedRevenueEntries } from "@/lib/verified-revenue";

const LATEST_POSTS = 20;

function oneLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function linkLabel(value: string) {
  return oneLine(value).replace(/[\[\]]/g, "");
}

function item(title: string, path: string, note?: string) {
  const label = linkLabel(title);
  const url = absoluteUrl(path);
  const detail = note ? oneLine(note) : "";
  return detail ? `- [${label}](${url}): ${detail}` : `- [${label}](${url})`;
}

async function markdownBySlug(folder: string) {
  const docs = await loadMarkdownCollection<{ sample?: boolean }>(contentDir(folder));
  return new Map(
    docs.filter((doc) => doc.data.sample !== true).map((doc) => [doc.slug, doc.content.trim()]),
  );
}

function section(title: string, lines: string[]) {
  if (!lines.length) return "";
  return `## ${title}\n\n${lines.join("\n")}`;
}

export async function buildLlmsTxt() {
  const [posts, research, glossary, listings] = await Promise.all([
    getBlogPosts(),
    getResearchDocs(),
    getGlossaryTerms(),
    getDirectoryListings(),
  ]);
  const guides = posts.filter((post) => post.category === "guide");
  const latest = posts.slice(0, LATEST_POSTS);

  const parts = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "The sections below are generated from the same files that render the site, so new posts, research notes, glossary terms, and directory listings appear here on the next deploy. Prices, model names, and revenue figures are dated on the page they come from. A private tool-candidate backlog is not published.",
    "",
    `The longer plain-text copy of posts, research, glossary entries, and directory listings is at ${absoluteUrl("/llms-full.txt")}.`,
    "",
    section("Key sections", [
      item("Blog", "/blog", "Explainers, news, and guides."),
      item("Research", "/research", "Paper breakdowns and original notes."),
      item("Guides", "/blog?category=guide", "Blog posts filed as guides."),
      item("Glossary", "/glossary", "Short definitions used across the site."),
      item("Directory", "/directory", "AI tools, apps, SaaS, and agents, each with a source site."),
      item("Breakthroughs timeline", "/trackers/breakthroughs", "Public agent moments, added only with a date and a source."),
      item("Harness comparison", "/trackers/harnesses", "Harness and framework comparison, published only when each cell is sourced."),
      item("Benchmark leaderboard", "/trackers/benchmarks", "Public agent benchmarks, published only with a source, a date, and the harness."),
      item("Reports", "/reports", "Dated pages of public figures."),
      item(
        "AI Agent Harness Benchmark, November 2026",
        "/reports/agent-harness-benchmark-november-2026",
        "Official SWE-bench and Terminal-Bench scores, read November 5, 2026.",
      ),
      item("Verified revenue", "/verified-revenue", `Payment-processor-verified revenue. Checked ${verifiedRevenueChecked}.`),
      item("Directory stats", "/directory/stats", "Counts generated from the directory files at build time."),
      item("Agent cost calculator", "/agent-cost-calculator", "30-day token cost from official provider prices."),
      item("Submit a tool", "/submit", "Public form. A valid submission is published to the directory."),
    ]),
    section(
      "Latest blog posts",
      latest.map((post) => item(post.title, `/blog/${post.slug}`, `${post.date}. ${post.description}`)),
    ),
    section(
      "Research",
      research.map((doc) => item(doc.title, `/research/${doc.slug}`, `${doc.date}. ${doc.description}`)),
    ),
    section(
      "Guides",
      guides.map((post) => item(post.title, `/blog/${post.slug}`, post.description)),
    ),
    section(
      "Glossary",
      glossary.map((term) => item(term.term, `/glossary/${term.slug}`, term.shortDefinition)),
    ),
    section(
      "Directory",
      listings.map((listing) =>
        item(
          listing.name,
          `/directory/${listing.slug}`,
          `${directoryCategoryTitle(listing.category)}. ${listing.summary}`,
        ),
      ),
    ),
    section("Optional", [
      item("Topics", "/topics", "Coverage areas such as news, tools, shopping, and harnesses."),
      ...topics.map((topic) => item(topic.title, topic.href, topic.summary)),
      item("Reading paths", "/for/everyone", "Plain-English, builder, and research paths for adult readers."),
      ...audiences.map((audience) => item(audience.title, audience.href, audience.summary)),
      item("About", "/about", "What the publication is and what it will not invent."),
      item("Contact", "/contact"),
      item("Privacy", "/privacy"),
      item("Terms", "/terms"),
      item("Advertise", "/advertise"),
      item("Search", "/search"),
      item("Full text for agents", "/llms-full.txt", "Posts, research, glossary, directory listings, and verified-revenue figures in one file."),
    ]),
  ];

  return `${parts.filter(Boolean).join("\n\n")}\n`;
}

function articleBlock(title: string, meta: string[], body: string) {
  const lines = [`## ${title}`, "", ...meta.map((line) => oneLine(line)), "", body.trim() || "_No body text._"];
  return lines.join("\n");
}

function blogBlock(post: BlogPost, body: string) {
  return articleBlock(post.title, [
    `URL: ${absoluteUrl(`/blog/${post.slug}`)}`,
    `Published: ${post.date}${post.updated ? `. Updated: ${post.updated}` : ""}`,
    `Category: ${post.category}`,
    post.description,
  ], body);
}

export async function buildLlmsFullTxt() {
  const [posts, research, glossary, listings, blogMd, researchMd, glossaryMd, directoryMd] =
    await Promise.all([
      getBlogPosts(),
      getResearchDocs(),
      getGlossaryTerms(),
      getDirectoryListings(),
      markdownBySlug("blog"),
      markdownBySlug("research"),
      markdownBySlug("glossary"),
      markdownBySlug("directory"),
    ]);

  const revenueLines = verifiedRevenueEntries.map(
    (entry) =>
      `- ${entry.name}: MRR ${entry.mrr.display}; all-time ${entry.allTime.display}; ${entry.activeSubscriptions.toLocaleString("en-US")} active subscriptions. Price: ${oneLine(entry.pricing.summary)} Revenue source: ${entry.revenue.sourceUrl} (checked ${entry.revenue.checked}).`,
  );

  const parts = [
    await buildLlmsTxt(),
    "# Full text",
    "",
    "The index above is repeated so this file can stand alone. The sections after it are the source text.",
    "",
    "# Blog",
    "",
    posts.map((post) => blogBlock(post, blogMd.get(post.slug) ?? "")).join("\n\n"),
    "",
    "# Research",
    "",
    research
      .map((doc) =>
        articleBlock(
          doc.title,
          [
            `URL: ${absoluteUrl(`/research/${doc.slug}`)}`,
            `Published: ${doc.date}${doc.updated ? `. Updated: ${doc.updated}` : ""}`,
            doc.paperTitle ? `Paper: ${doc.paperTitle}` : "",
            doc.paperUrl ? `Paper URL: ${doc.paperUrl}` : "",
            doc.description,
          ].filter(Boolean),
          researchMd.get(doc.slug) ?? "",
        ),
      )
      .join("\n\n"),
    "",
    "# Glossary",
    "",
    glossary
      .map((term) =>
        articleBlock(
          term.term,
          [`URL: ${absoluteUrl(`/glossary/${term.slug}`)}`, term.shortDefinition],
          glossaryMd.get(term.slug) ?? "",
        ),
      )
      .join("\n\n"),
    "",
    "# Directory",
    "",
    listings
      .map((listing) => {
        const extra = [
          listing.pricingSummary ? `Pricing: ${listing.pricingSummary}` : "",
          listing.features.length ? `Features: ${listing.features.join("; ")}` : "",
          `Website: ${listing.website}`,
          `Last verified: ${listing.lastVerified}`,
        ].filter(Boolean);
        return articleBlock(
          listing.name,
          [
            `URL: ${absoluteUrl(`/directory/${listing.slug}`)}`,
            `Category: ${directoryCategoryTitle(listing.category)}`,
            listing.summary,
            ...extra,
          ],
          directoryMd.get(listing.slug) ?? "",
        );
      })
      .join("\n\n"),
    "",
    "# Verified revenue",
    "",
    `URL: ${absoluteUrl("/verified-revenue")}`,
    `Checked: ${verifiedRevenueChecked}`,
    "",
    revenueLines.join("\n"),
    "",
  ];

  return parts.join("\n");
}
