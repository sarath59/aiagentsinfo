import { getBlogPosts, type BlogPost } from "@/lib/blog";
import {
  description as frameworkGithubDescription,
  leadParagraph as frameworkLead,
  path as frameworkGithubPath,
  retrievedDay as frameworkRetrievedDay,
  title as frameworkGithubTitle,
} from "@/lib/framework-github-stats";
import {
  categorySummaries,
  categoryTitle as directoryCategoryTitle,
  directoryCategories,
  getDirectoryListings,
} from "@/lib/directory";
import { getGlossaryTerms } from "@/lib/glossary";
import { contentDir, loadMarkdownCollection } from "@/lib/markdown";
import { getResearchDocs } from "@/lib/research";
import { comparisonPages } from "@/lib/comparisons";
import { absoluteUrl, audiences, entityLine, site, topics } from "@/lib/site";
import { verifiedRevenueChecked, verifiedRevenueEntries } from "@/lib/verified-revenue";
import { description as yearDescription, path as yearPath, readOn as yearReadOn, title as yearTitle } from "@/lib/agents-12-month-outlook";
import { description as outlookDescription, path as outlookPath, readOn as outlookReadOn, title as outlookTitle } from "@/lib/agents-outlook";
import { description as shoppingDescription, path as shoppingPath, readOn as shoppingReadOn, title as shoppingTitle } from "@/lib/shopping-report";
import { description as browserDescription, path as browserPath, readOn as browserReadOn, title as browserTitle } from "@/lib/browser-computer-report";
import {
  announcedAnswer,
  cheapestAnswer,
  description as codingDescription,
  path as codingPath,
  readOn as codingReadOn,
  title as codingTitle,
} from "@/lib/coding-agents-30-day";
import { description as benchmarkDescription, path as benchmarkPath, title as benchmarkTitle } from "@/lib/benchmark-report";
import { BENCHMARK_READ_ON, swebenchBenchmark, terminalBench } from "@/lib/harness-benchmark";
import { paperSentence } from "@/lib/trackers/agents-md";
import { integer } from "@/lib/trackers/http";
import downloadsSnapshot from "@/data/trackers/downloads-snapshot.json";
import starsSnapshot from "@/data/trackers/stars-snapshot.json";
import agentsMdSnapshot from "@/data/trackers/agents-md-snapshot.json";

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

function counted(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function topBy<T>(rows: readonly T[], value: (row: T) => number) {
  return [...rows].sort((a, b) => value(b) - value(a) || 0)[0];
}

function dataPageSummaries() {
  const pypiTop = topBy(downloadsSnapshot.pypi, (row) => row.windowDownloads);
  const npmTop = topBy(downloadsSnapshot.npm, (row) => row.windowDownloads);
  const starTop = topBy(starsSnapshot.rows, (row) => row.stars);
  const sourcegraph = agentsMdSnapshot.sourcegraph;
  return [
    articleBlock(
      "AI agent framework downloads",
      [
        `URL: ${absoluteUrl("/trackers/downloads")}`,
        `Snapshot retrieved: ${downloadsSnapshot.retrievedDay}`,
        "A download is a file request, not a user. The page refreshes from pypistats and npm. These figures are the snapshot shipped with the build.",
      ],
      [
        pypiTop
          ? `${pypiTop.name} (${pypiTop.package}) had ${integer(pypiTop.windowDownloads)} PyPI downloads without mirrors from ${pypiTop.windowStart} through ${pypiTop.windowEnd}.`
          : "",
        npmTop
          ? `${npmTop.name} (${npmTop.package}) had ${integer(npmTop.windowDownloads)} npm downloads from ${npmTop.windowStart} through ${npmTop.windowEnd}.`
          : "",
      ]
        .filter(Boolean)
        .join("\n\n"),
    ),
    articleBlock(
      "AGENTS.md adoption",
      [
        `URL: ${absoluteUrl("/trackers/agents-md")}`,
        `Snapshot retrieved: ${agentsMdSnapshot.retrievedDay}`,
        paperSentence(),
      ],
      [
        `Sourcegraph public code search on ${sourcegraph.retrievedAt.slice(0, 10)} reported ${integer(sourcegraph.rootAgentsMd)} root AGENTS.md files and ${integer(sourcegraph.rootClaudeMd)} root CLAUDE.md files. ${sourcegraph.warnings.join(" ")}`,
        `The agents.md repository had ${integer(agentsMdSnapshot.specStars)} GitHub stars in that snapshot. The homepage claim recorded then was "${agentsMdSnapshot.homepageClaim}".`,
      ].join("\n\n"),
    ),
    articleBlock(
      "AI agent framework GitHub stars",
      [
        `URL: ${absoluteUrl("/trackers/stars")}`,
        `Snapshot retrieved: ${starsSnapshot.retrievedDay}`,
        `Source: ${starsSnapshot.source}`,
      ],
      starTop
        ? `${starTop.name} (${starTop.repo}) had ${integer(starTop.stars)} stars in that snapshot. The live page reads stargazers_count from the GitHub repository API.`
        : "The snapshot had no rows.",
    ),
    articleBlock(benchmarkTitle, [
      `URL: ${absoluteUrl(benchmarkPath)}`,
      `Read: ${BENCHMARK_READ_ON}`,
      benchmarkDescription,
    ], [
      `${swebenchBenchmark.bashOnly.length} bash-only SWE-bench Verified rows, ${swebenchBenchmark.teamCheckedOther.length} other team-checked SWE-bench Verified rows, and ${swebenchBenchmark.multilingual.length} SWE-bench Multilingual rows are copied from the official board. The newest result date stored with that SWE-bench copy is ${swebenchBenchmark.newestResultDate}.`,
      `${terminalBench.rows.length} Terminal-Bench rows are copied from the official leaderboard.`,
      "Each score on the page keeps the date printed on the official source.",
    ].join("\n\n")),
    articleBlock(frameworkGithubTitle, [
      `URL: ${absoluteUrl(frameworkGithubPath)}`,
      `Pulled: ${frameworkRetrievedDay}`,
      frameworkGithubDescription,
    ], frameworkLead()),
    articleBlock(browserTitle, [`URL: ${absoluteUrl(browserPath)}`, `Checked: ${browserReadOn}`, browserDescription], browserDescription),
    articleBlock(codingTitle, [
      `URL: ${absoluteUrl(codingPath)}`,
      `Checked: ${codingReadOn}`,
      codingDescription,
    ], `${announcedAnswer}\n\n${cheapestAnswer}`),
    articleBlock(yearTitle, [`URL: ${absoluteUrl(yearPath)}`, `Read: ${yearReadOn}`, yearDescription], yearDescription),
    articleBlock(outlookTitle, [`URL: ${absoluteUrl(outlookPath)}`, `Read: ${outlookReadOn}`, outlookDescription], outlookDescription),
    articleBlock(shoppingTitle, [`URL: ${absoluteUrl(shoppingPath)}`, `Checked: ${shoppingReadOn}`, shoppingDescription], shoppingDescription),
  ].join("\n\n");
}

export async function buildLlmsTxt() {
  const [research, glossary, listings] = await Promise.all([
    getResearchDocs(),
    getGlossaryTerms(),
    getDirectoryListings(),
  ]);
  const categoryLines = directoryCategories.flatMap((category) => {
    const count = listings.filter((listing) => listing.category === category.slug).length;
    if (!count) return [];
    return [
      item(
        directoryCategoryTitle(category.slug),
        `/directory/category/${category.slug}`,
        `${counted(count, "listing")}. ${categorySummaries[category.slug]}`,
      ),
    ];
  });

  const parts = [
    `# ${site.name}`,
    "",
    `> ${entityLine}`,
    "",
    "Prices, scores, and revenue figures are dated on the page they come from. This file is generated from the same files that render the site.",
    "",
    `Fuller plain text, including posts, research notes, glossary entries, directory listings, and the dated figures below, is at ${absoluteUrl("/llms-full.txt")}.`,
    "",
    section("Trackers and data", [
      item("Live data trackers", "/trackers", "Download, AGENTS.md, and GitHub star counts that refresh daily from public APIs."),
      item("AI agent framework downloads tracker", "/trackers/downloads", `PyPI and npm file-request counts. Snapshot in this build: ${downloadsSnapshot.retrievedDay}. A download is not a user.`),
      item("AGENTS.md adoption tracker", "/trackers/agents-md", paperSentence()),
      item("AI agent framework GitHub stars tracker", "/trackers/stars", `Live stargazers_count. Snapshot in this build: ${starsSnapshot.retrievedDay}.`),
      item("Breakthroughs timeline", "/trackers/breakthroughs", "Public agent moments, added only with a date and a source. No rows are published yet."),
      item("Harness comparison", "/trackers/harnesses", "Pointer to the sourced harness comparison. Cells are published only with a source."),
      item("Verified revenue", "/verified-revenue", `Payment-processor-verified revenue. Checked ${verifiedRevenueChecked}.`),
      item("Directory stats", "/directory/stats", "Counts generated from the directory files at build time."),
      item(frameworkGithubTitle, frameworkGithubPath, frameworkGithubDescription),
    ]),
    section("Reports", [
      item("Reports", "/reports", "Dated pages with a source and a citation."),
      item(browserTitle, browserPath, browserDescription),
      item(codingTitle, codingPath, codingDescription),
      item(yearTitle, yearPath, yearDescription),
      item(outlookTitle, outlookPath, outlookDescription),
      item(shoppingTitle, shoppingPath, shoppingDescription),
    ]),
    section("Research", [
      item("Research", "/research", "Paper breakdowns and original notes."),
      item("Papers", "/papers", "Paper breakdowns, each with the source link and the paper's authors."),
      ...research.map((doc) => item(doc.title, `/research/${doc.slug}`, `${doc.date}. ${doc.description}`)),
    ]),
    section("Benchmarks", [
      item(benchmarkTitle, benchmarkPath, benchmarkDescription),
      item("Benchmark leaderboard", "/trackers/benchmarks", "Public agent benchmarks, published only with a source, a date, and the harness. The November 2026 scores live on the harness benchmark."),
    ]),
    section("Free tools", [
      item(
        "AI agent cost calculator",
        "/agent-cost-calculator",
        "Free 30-day model bill from official per-token prices. No login.",
      ),
      item(
        "Prompt and tool checker",
        "/agent-prompt-checker",
        "Server-side check of pasted prompts and OpenAI, Anthropic, or MCP tool JSON. The prompt is not stored.",
      ),
      item("Agent picker", "/tools/agent-picker", "Free picker over the directory listings. No login."),
      item(
        "Cursor, Claude Code, and Codex pricing",
        "/tools/cursor-vs-claude-code-vs-codex-pricing",
        "Free comparison of list prices from the vendors' pages.",
      ),
    ]),
    section("Directory", [
      item("Directory", "/directory", `${counted(listings.length, "listing")} of AI tools, apps, SaaS, and agents, each with a source site.`),
      ...categoryLines,
    ]),
    section("Submit", [
      item("Submit a tool", "/submit", "Public form. A valid submission is published to the directory."),
    ]),
    section("Glossary", [
      item("Glossary", "/glossary", `${counted(glossary.length, "short definition")} used across the site.`),
    ]),
    section("Optional", [
      item("Blog", "/blog", "Explainers, news, and guides."),
      item("Best AI agents", "/best", "Sourced comparisons. Last verified November 2026."),
      ...comparisonPages.map((page) => item(page.title, page.path, page.summary)),
      item("Topics", "/topics", "Coverage areas such as news, tools, shopping, and harnesses."),
      ...topics.map((topic) => item(topic.title, topic.href, topic.summary)),
      ...audiences.map((audience) => item(audience.title, audience.href, audience.summary)),
      item(
        "AI agents directory MCP server",
        "/mcp",
        "Public, read-only Model Context Protocol server at /api/mcp for searching listings, comparisons, and research.",
      ),
      item("About", "/about", entityLine),
      item("Contact", "/contact"),
      item("Editorial policy", "/editorial-policy"),
      item("Privacy", "/privacy"),
      item("Terms", "/terms"),
      item("Full text for agents", "/llms-full.txt", "Posts, research, glossary, directory listings, data-page summaries, and verified-revenue figures in one file."),
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
    "# Data pages",
    "",
    dataPageSummaries(),
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
