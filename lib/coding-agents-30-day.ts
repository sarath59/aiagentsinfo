import type { PdfModel } from "@/lib/pdf";
import { absoluteUrl } from "@/lib/site";
import type { SortableColumn, SortableRow } from "@/lib/sortable";
import { formatDate } from "@/lib/utils";

export const path = "/reports/ai-coding-agents-next-30-days";
export const title =
  "AI coding agents in the next 30 days (8 Nov to 8 Dec 2026): 11 tools, three dated marks";
export const description =
  "List prices and usage limits for 11 coding agents, checked November 8, 2026, and the three dates official pages already set between November 8 and December 8.";
export const readOn = "2026-11-08";
export const readingMinutes = 14;
export const checkedLabel = "November 8, 2026";

export const announcedAnswer =
  "Three dates are already on official pages between November 8 and December 8, 2026: November 10, November 18, and November 21.";
export const cheapestAnswer =
  "Codex, Cursor, GitHub Copilot, and Devin each list a $0 plan with some agent use. The lowest paid monthly stickers checked on November 8, 2026 are Codex Go and Cursor Plus, both $8. Claude Code starts at $20 a month, or $17 a month if you pay $200 up front.";
export const priceAnswer =
  "The table is the list price and the usage line each vendor printed on November 8, 2026. Equal stickers are not equal amounts of coding.";
export const reposAnswer =
  "On November 8, 2026, the GitHub API showed openai/codex, google-gemini/gemini-cli, and OpenHands/OpenHands pushed that same day. Aider's last push was May 22, 2026.";
export const likelyAnswer =
  "No vendor page names a new coding-agent product for a day in this window. The record supports more point releases from the tools that shipped in the last week, and it does not support a feature list.";
export const watchAnswer =
  "Watch the three dated marks first. Then watch four signals that still have no day: a Cursor GitLab line, Aider's quiet repository, Cline's release tag, and Jules's missing dollar price.";
export const leftOutAnswer =
  "This brief leaves out any price, release tag, star count, or December change that the pages and API calls on November 8 did not return.";

export const toolsCompared = [
  "Claude Code",
  "Codex",
  "Cursor",
  "GitHub Copilot",
  "Devin",
  "Jules",
  "Gemini CLI",
  "Antigravity",
  "OpenHands",
  "Aider",
  "Cline",
] as const;

export type Source = { title: string; url: string; note: string };

export const sources: Source[] = [
  {
    title: "Anthropic, Plans and pricing",
    url: "https://claude.com/pricing",
    note: "Individual, Team, and Enterprise prices and the Claude Code row. Read November 8, 2026",
  },
  {
    title: "Anthropic Help Center, Use Claude Code with your Pro, Max, or Ultra plan",
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan",
    note: "Shared limits, the wrap-up allowance, and API credits that cannot be used in Claude Code. Read November 8, 2026",
  },
  {
    title: "Claude Code changelog",
    url: "https://code.claude.com/docs/en/changelog",
    note: "Versions 2.1.316 through 2.1.319, and the November 10 gateway warning. Read November 8, 2026",
  },
  {
    title: "Anthropic, Unified Claude in Claude Desktop",
    url: "https://claude.com/docs/third-party/claude-desktop/unified-claude",
    note: "Default-on time of 12:00 PM Pacific on November 10, 2026. Read November 8, 2026",
  },
  {
    title: "OpenAI, Codex pricing",
    url: "https://learn.chatgpt.com/docs/pricing",
    note: "developers.openai.com/codex/pricing redirected here on November 8, 2026. Plan prices, local-message estimates, and the November 21 line",
  },
  {
    title: "Cursor pricing",
    url: "https://cursor.com/pricing",
    note: "Free, Plus, Premium, Super, Ultra, and Teams. Read November 8, 2026",
  },
  {
    title: "Cursor, Models and pricing",
    url: "https://cursor.com/docs/models-and-pricing",
    note: "Weekly pool, third-party model billing, and annual prices. Read November 8, 2026",
  },
  {
    title: "Cursor changelog",
    url: "https://cursor.com/changelog",
    note: "November 6 voice chat, November 5 live apps, and the GitLab line. Read November 8, 2026",
  },
  {
    title: "GitHub Docs, GitHub Copilot plans",
    url: "https://docs.github.com/en/copilot/get-started/plans",
    note: "Prices, AI credits, agent mode, and cloud agent. Read November 8, 2026",
  },
  {
    title: "Cognition, Devin plans and pricing",
    url: "https://devin.ai/pricing",
    note: "Free, Pro, Max, and Teams. Read November 8, 2026",
  },
  {
    title: "Windsurf pricing URL",
    url: "https://windsurf.com/pricing",
    note: "HTTP 308 to https://devin.ai/pricing on November 8, 2026",
  },
  {
    title: "Google, Jules",
    url: "https://jules.google/",
    note: "Task caps and named models. No dollar price on the plan cards. Read November 8, 2026",
  },
  {
    title: "Gemini CLI, Quotas and pricing",
    url: "https://geminicli.com/docs/resources/quota-and-pricing/",
    note: "Daily request caps, plus the banner about the June 18, 2026 move. Read November 8, 2026",
  },
  {
    title: "Gemini CLI, Plans",
    url: "https://geminicli.com/plans/",
    note: "Plan names without dollar prices, and the same June 18 banner. Read November 8, 2026",
  },
  {
    title: "Google, Antigravity plans",
    url: "https://antigravity.google/docs/plans",
    note: "Quota described by Google AI plan. No dollar price and no request count. Read November 8, 2026",
  },
  {
    title: "Google, Antigravity models",
    url: "https://antigravity.google/docs/models",
    note: "Three models marked for removal on November 18, 2026. Read November 8, 2026",
  },
  {
    title: "Google, Gemini subscriptions",
    url: "https://gemini.google/subscriptions/",
    note: "United States personal prices, including the Antigravity lines on Pro and Ultra. Read November 8, 2026",
  },
  {
    title: "GitHub repository openai/codex",
    url: "https://github.com/openai/codex",
    note: "Public API read November 8, 2026: 133,622 stars, release 0.167.0 published November 6, 2026, pushed November 8, 2026",
  },
  {
    title: "GitHub repository google-gemini/gemini-cli",
    url: "https://github.com/google-gemini/gemini-cli",
    note: "Public API read November 8, 2026: 108,778 stars, release v0.67.0 published November 4, 2026, pushed November 8, 2026",
  },
  {
    title: "GitHub repository OpenHands/OpenHands",
    url: "https://github.com/OpenHands/OpenHands",
    note: "Public API read November 8, 2026: 92,927 stars, release v1.37.0 published November 6, 2026, pushed November 8, 2026",
  },
  {
    title: "GitHub repository cline/cline",
    url: "https://github.com/cline/cline",
    note: "Public API read November 8, 2026: 71,457 stars, release v4.1.26 published October 26, 2026, pushed November 7, 2026",
  },
  {
    title: "GitHub repository Aider-AI/aider",
    url: "https://github.com/Aider-AI/aider",
    note: "Public API read November 8, 2026: 50,019 stars, pushed May 22, 2026. The releases call did not return a tag",
  },
];

export type PriceRow = {
  id: string;
  tool: string;
  plan: string;
  priceLabel: string;
  priceSort: number | null;
  limit: string;
  sourceLabel: string;
  sourceUrl: string;
  directoryHref?: string;
};

export const priceCaption = `Individual coding-agent plan prices and the usage line printed on each page. Checked ${checkedLabel}.`;

export const priceRows: PriceRow[] = [
  {
    id: "claude-free",
    tool: "Claude Code",
    plan: "Free",
    priceLabel: "$0",
    priceSort: 0,
    limit: "The pricing table marks Claude Code as No. Limited chat usage every five hours and every week.",
    sourceLabel: "claude.com/pricing",
    sourceUrl: "https://claude.com/pricing",
    directoryHref: "/directory/claude-code",
  },
  {
    id: "claude-pro",
    tool: "Claude Code",
    plan: "Pro",
    priceLabel: "$20/mo, or $17/mo annual",
    priceSort: 17,
    limit: "Claude Code is included. 1x usage every five hours and every week, shared with the rest of Claude. No fixed message count. Annual price is $200 up front.",
    sourceLabel: "claude.com/pricing",
    sourceUrl: "https://claude.com/pricing",
    directoryHref: "/directory/claude-code",
  },
  {
    id: "claude-max",
    tool: "Claude Code",
    plan: "Max",
    priceLabel: "$100/mo",
    priceSort: 100,
    limit: "5x Pro usage every five hours and every week. $100 a month in API credits. Those credits cannot be used in Claude Code.",
    sourceLabel: "claude.com/pricing",
    sourceUrl: "https://claude.com/pricing",
    directoryHref: "/directory/claude-code",
  },
  {
    id: "claude-ultra",
    tool: "Claude Code",
    plan: "Ultra",
    priceLabel: "$200/mo",
    priceSort: 200,
    limit: "10x Pro usage every week. Verified accounts have no five-hour limit. $200 a month in API credits, which cannot be used in Claude Code.",
    sourceLabel: "claude.com/pricing",
    sourceUrl: "https://claude.com/pricing",
    directoryHref: "/directory/claude-code",
  },
  {
    id: "codex-free",
    tool: "Codex",
    plan: "Free",
    priceLabel: "$0",
    priceSort: 0,
    limit: "Included for quick coding tasks. GPT-6 Luna at Standard speed in the desktop app, subject to rollout.",
    sourceLabel: "Codex pricing",
    sourceUrl: "https://learn.chatgpt.com/docs/pricing",
    directoryHref: "/directory/codex",
  },
  {
    id: "codex-go",
    tool: "Codex",
    plan: "Go",
    priceLabel: "$8/mo",
    priceSort: 8,
    limit: "Lightweight coding tasks. GPT-6 Luna at Standard speed in the desktop app, subject to rollout.",
    sourceLabel: "Codex pricing",
    sourceUrl: "https://learn.chatgpt.com/docs/pricing",
    directoryHref: "/directory/codex",
  },
  {
    id: "codex-plus",
    tool: "Codex",
    plan: "Plus",
    priceLabel: "$20/mo",
    priceSort: 20,
    limit: "A few focused coding sessions a week, on the web, in the CLI, in the IDE extension, and on iOS. Local-message ranges per five hours are estimates, not fixed limits.",
    sourceLabel: "Codex pricing",
    sourceUrl: "https://learn.chatgpt.com/docs/pricing",
    directoryHref: "/directory/codex",
  },
  {
    id: "codex-pro",
    tool: "Codex",
    plan: "Pro",
    priceLabel: "$100, $200, or $500/mo",
    priceSort: 100,
    limit: "The page says Pro plans currently have no five-hour limit. Ultrafast mode is on the $500 plan.",
    sourceLabel: "Codex pricing",
    sourceUrl: "https://learn.chatgpt.com/docs/pricing",
    directoryHref: "/directory/codex",
  },
  {
    id: "cursor-free",
    tool: "Cursor",
    plan: "Free",
    priceLabel: "$0",
    priceSort: 0,
    limit: "Limited agent requests and limited chat requests.",
    sourceLabel: "cursor.com/pricing",
    sourceUrl: "https://cursor.com/pricing",
    directoryHref: "/directory/cursor",
  },
  {
    id: "cursor-plus",
    tool: "Cursor",
    plan: "Plus",
    priceLabel: "$8/mo",
    priceSort: 8,
    limit: "Shared usage pool, Grok models only. Weekly refresh, shared with Grok. Annual price on the docs page is $80 a year.",
    sourceLabel: "cursor.com/pricing",
    sourceUrl: "https://cursor.com/pricing",
    directoryHref: "/directory/cursor",
  },
  {
    id: "cursor-premium",
    tool: "Cursor",
    plan: "Premium",
    priceLabel: "$30/mo",
    priceSort: 30,
    limit: "4x Plus usage. Cloud agents, code hosting, and AI code review. Third-party models at API list price, billed separately. Annual price is $300 a year.",
    sourceLabel: "cursor.com/pricing",
    sourceUrl: "https://cursor.com/pricing",
    directoryHref: "/directory/cursor",
  },
  {
    id: "cursor-super",
    tool: "Cursor",
    plan: "Super",
    priceLabel: "$100/mo",
    priceSort: 100,
    limit: "15x Plus usage and priority model access at peak times. Third-party models are still billed separately. Annual price is $1,000 a year.",
    sourceLabel: "cursor.com/pricing",
    sourceUrl: "https://cursor.com/pricing",
    directoryHref: "/directory/cursor",
  },
  {
    id: "cursor-ultra",
    tool: "Cursor",
    plan: "Ultra",
    priceLabel: "$200/mo",
    priceSort: 200,
    limit: "50x Plus usage. Third-party models are still billed separately. Annual price is $2,000 a year.",
    sourceLabel: "cursor.com/pricing",
    sourceUrl: "https://cursor.com/pricing",
    directoryHref: "/directory/cursor",
  },
  {
    id: "copilot-free",
    tool: "GitHub Copilot",
    plan: "Free",
    priceLabel: "$0",
    priceSort: 0,
    limit: "Agent mode is included. Copilot in the cloud is not. Inline suggestions are limited to 2,000 completions a month. Model access is auto selection only.",
    sourceLabel: "Copilot plans",
    sourceUrl: "https://docs.github.com/en/copilot/get-started/plans",
    directoryHref: "/directory/github-copilot",
  },
  {
    id: "copilot-pro",
    tool: "GitHub Copilot",
    plan: "Pro",
    priceLabel: "$10/mo",
    priceSort: 10,
    limit: "1,500 GitHub AI Credits a month: 1,000 base and 500 flex. Cloud agent and agent mode are included.",
    sourceLabel: "Copilot plans",
    sourceUrl: "https://docs.github.com/en/copilot/get-started/plans",
    directoryHref: "/directory/github-copilot",
  },
  {
    id: "copilot-pro-plus",
    tool: "GitHub Copilot",
    plan: "Pro+",
    priceLabel: "$39/mo",
    priceSort: 39,
    limit: "7,000 GitHub AI Credits a month: 3,900 base and 3,100 flex.",
    sourceLabel: "Copilot plans",
    sourceUrl: "https://docs.github.com/en/copilot/get-started/plans",
    directoryHref: "/directory/github-copilot",
  },
  {
    id: "copilot-max",
    tool: "GitHub Copilot",
    plan: "Max",
    priceLabel: "$100/mo",
    priceSort: 100,
    limit: "20,000 GitHub AI Credits a month: 10,000 base and 10,000 flex. Priority access to premium models.",
    sourceLabel: "Copilot plans",
    sourceUrl: "https://docs.github.com/en/copilot/get-started/plans",
    directoryHref: "/directory/github-copilot",
  },
  {
    id: "devin-free",
    tool: "Devin",
    plan: "Free",
    priceLabel: "$0",
    priceSort: 0,
    limit: "Light quota to code with agents, limited model availability, unlimited inline edits, and unlimited Tab completions.",
    sourceLabel: "devin.ai/pricing",
    sourceUrl: "https://devin.ai/pricing",
    directoryHref: "/directory/devin",
  },
  {
    id: "devin-pro",
    tool: "Devin",
    plan: "Pro",
    priceLabel: "$20/mo",
    priceSort: 20,
    limit: "Higher quotas, cloud agents, and free use of SWE-2. The allowance refreshes daily and weekly. Extra usage is API pricing.",
    sourceLabel: "devin.ai/pricing",
    sourceUrl: "https://devin.ai/pricing",
    directoryHref: "/directory/devin",
  },
  {
    id: "devin-max",
    tool: "Devin",
    plan: "Max",
    priceLabel: "$200/mo",
    priceSort: 200,
    limit: "The page says significantly higher quotas than Pro. It does not print a multiple.",
    sourceLabel: "devin.ai/pricing",
    sourceUrl: "https://devin.ai/pricing",
    directoryHref: "/directory/devin",
  },
  {
    id: "jules-start",
    tool: "Jules",
    plan: "Jules",
    priceLabel: "Not printed",
    priceSort: null,
    limit: "15 tasks a day, 3 concurrent tasks, Gemini 2.5 Pro. The plan card does not print a dollar price.",
    sourceLabel: "jules.google",
    sourceUrl: "https://jules.google/",
  },
  {
    id: "jules-pro",
    tool: "Jules",
    plan: "Jules in Pro",
    priceLabel: "Not printed",
    priceSort: null,
    limit: "100 tasks a day, 15 concurrent tasks, higher access starting with Gemini 3 Pro. No dollar price on the card.",
    sourceLabel: "jules.google",
    sourceUrl: "https://jules.google/",
  },
  {
    id: "jules-ultra",
    tool: "Jules",
    plan: "Jules in Ultra",
    priceLabel: "Not printed",
    priceSort: null,
    limit: "300 tasks a day, 60 concurrent tasks, priority access starting with Gemini 3 Pro. No dollar price on the card.",
    sourceLabel: "jules.google",
    sourceUrl: "https://jules.google/",
  },
  {
    id: "google-free",
    tool: "Antigravity",
    plan: "Google account",
    priceLabel: "$0",
    priceSort: 0,
    limit: "The Gemini subscriptions page lists $0 and does not name Antigravity on that card. Antigravity's own plans page gives people who are not on Pro or Ultra a weekly quota.",
    sourceLabel: "Gemini subscriptions",
    sourceUrl: "https://gemini.google/subscriptions/",
  },
  {
    id: "google-plus",
    tool: "Antigravity",
    plan: "Google AI Plus",
    priceLabel: "$4.99/mo",
    priceSort: 4.99,
    limit: "Printed on the United States subscriptions page. That card does not name Antigravity. The Antigravity models page groups Free and Google AI Plus in one column.",
    sourceLabel: "Gemini subscriptions",
    sourceUrl: "https://gemini.google/subscriptions/",
  },
  {
    id: "google-pro",
    tool: "Antigravity",
    plan: "Google AI Pro",
    priceLabel: "$19.99/mo",
    priceSort: 19.99,
    limit: "The subscriptions page says entry rate limits to the agent model in Antigravity. Antigravity's plans page says a high quota, refreshed every five hours until a weekly limit.",
    sourceLabel: "Gemini subscriptions",
    sourceUrl: "https://gemini.google/subscriptions/",
  },
  {
    id: "google-ultra",
    tool: "Antigravity",
    plan: "Google AI Ultra",
    priceLabel: "$99.99 or $199.99/mo",
    priceSort: 99.99,
    limit: "$99.99 is 5x higher usage than AI Pro, and $199.99 is 20x. The page maps those to higher and highest Antigravity rate limits. Antigravity does not print a request count.",
    sourceLabel: "Gemini subscriptions",
    sourceUrl: "https://gemini.google/subscriptions/",
  },
];

export const priceColumns: SortableColumn[] = [
  { key: "tool", label: "Tool" },
  { key: "plan", label: "Plan" },
  { key: "price", label: "Price", numeric: true },
  { key: "limit", label: "Usage line on the page" },
  { key: "source", label: "Source" },
];

export function priceTableRows(): SortableRow[] {
  return priceRows.map((row) => ({
    id: row.id,
    sort: { tool: row.tool, plan: row.plan, price: row.priceSort, limit: row.limit, source: row.sourceLabel },
    display: {
      tool: row.tool,
      plan: row.plan,
      price: row.priceLabel,
      limit: row.limit,
      source: row.sourceLabel,
    },
    href: {
      ...(row.directoryHref ? { tool: row.directoryHref } : {}),
      source: row.sourceUrl,
    },
  }));
}

export type DateRow = { id: string; date: string; dateSort: string; what: string; sourceLabel: string; sourceUrl: string };

export const dateCaption = `Dates official pages have already set for coding-agent users, November 8 to December 8, 2026. Checked ${checkedLabel}.`;

export const dateRows: DateRow[] = [
  {
    id: "nov-10",
    date: "Nov 10, 2026",
    dateSort: "2026-11-10",
    what: "After 12:00 PM Pacific, the Claude Desktop 3P docs say a current desktop reads an unset desktopHome as standard. Unified Claude turns on by default, and Cowork turns on even where it was off. The page says Code stays separate.",
    sourceLabel: "Unified Claude",
    sourceUrl: "https://claude.com/docs/third-party/claude-desktop/unified-claude",
  },
  {
    id: "nov-18",
    date: "Nov 18, 2026",
    dateSort: "2026-11-18",
    what: "Antigravity's models page marks Claude Sonnet 4.6 (thinking), Claude Opus 4.6 (thinking), and GPT-OSS-120b with the footnote \"Will be removed on November 18, 2026.\"",
    sourceLabel: "Antigravity models",
    sourceUrl: "https://antigravity.google/docs/models",
  },
  {
    id: "nov-21",
    date: "Nov 21, 2026",
    dateSort: "2026-11-21",
    what: "The Codex pricing page says GPT-5.6 Sol's promotional pricing is available at least through November 21, 2026. It does not print the rate that follows.",
    sourceLabel: "Codex pricing",
    sourceUrl: "https://learn.chatgpt.com/docs/pricing",
  },
];

export const dateColumns: SortableColumn[] = [
  { key: "date", label: "Date" },
  { key: "what", label: "What the page says" },
  { key: "source", label: "Source" },
];

export function dateTableRows(): SortableRow[] {
  return dateRows.map((row) => ({
    id: row.id,
    sort: { date: row.dateSort, what: row.what, source: row.sourceLabel },
    display: { date: row.date, what: row.what, source: row.sourceLabel },
    href: { source: row.sourceUrl },
  }));
}

export type RepoRow = {
  id: string;
  repo: string;
  stars: number;
  release: string;
  published: string;
  publishedSort: string;
  pushed: string;
  pushedSort: string;
  licence: string;
  url: string;
};

export const repoCaption = `Open-source coding-agent repositories. Stars, latest release, and last push from the public GitHub API on ${checkedLabel}.`;

export const repoRows: RepoRow[] = [
  {
    id: "codex",
    repo: "openai/codex",
    stars: 133622,
    release: "0.167.0",
    published: "Nov 6, 2026",
    publishedSort: "2026-11-06",
    pushed: "Nov 8, 2026",
    pushedSort: "2026-11-08T05:59:28Z",
    licence: "Apache-2.0",
    url: "https://github.com/openai/codex",
  },
  {
    id: "gemini-cli",
    repo: "google-gemini/gemini-cli",
    stars: 108778,
    release: "v0.67.0",
    published: "Nov 4, 2026",
    publishedSort: "2026-11-04",
    pushed: "Nov 8, 2026",
    pushedSort: "2026-11-08T01:08:20Z",
    licence: "Apache-2.0",
    url: "https://github.com/google-gemini/gemini-cli",
  },
  {
    id: "openhands",
    repo: "OpenHands/OpenHands",
    stars: 92927,
    release: "v1.37.0",
    published: "Nov 6, 2026",
    publishedSort: "2026-11-06",
    pushed: "Nov 8, 2026",
    pushedSort: "2026-11-08T10:28:36Z",
    licence: "MIT",
    url: "https://github.com/OpenHands/OpenHands",
  },
  {
    id: "cline",
    repo: "cline/cline",
    stars: 71457,
    release: "v4.1.26",
    published: "Oct 26, 2026",
    publishedSort: "2026-10-26",
    pushed: "Nov 7, 2026",
    pushedSort: "2026-11-07T00:08:40Z",
    licence: "Apache-2.0",
    url: "https://github.com/cline/cline",
  },
  {
    id: "aider",
    repo: "Aider-AI/aider",
    stars: 50019,
    release: "Not returned",
    published: "Not returned",
    publishedSort: "",
    pushed: "May 22, 2026",
    pushedSort: "2026-05-22T14:02:20Z",
    licence: "Apache-2.0",
    url: "https://github.com/Aider-AI/aider",
  },
];

export const repoColumns: SortableColumn[] = [
  { key: "repo", label: "Repository" },
  { key: "stars", label: "Stars", numeric: true },
  { key: "release", label: "Latest release" },
  { key: "published", label: "Release published" },
  { key: "pushed", label: "Last push" },
  { key: "licence", label: "Licence" },
];

export function repoTableRows(): SortableRow[] {
  return repoRows.map((row) => ({
    id: row.id,
    sort: {
      repo: row.repo,
      stars: row.stars,
      release: row.release,
      published: row.publishedSort,
      pushed: row.pushedSort,
      licence: row.licence,
    },
    display: {
      repo: row.repo,
      stars: row.stars.toLocaleString("en-US"),
      release: row.release,
      published: row.published,
      pushed: row.pushed,
      licence: row.licence,
    },
    href: { repo: row.url },
  }));
}

export const cadenceRows: { version: string; date: string }[] = [
  { version: "2.1.319", date: "November 6, 2026" },
  { version: "2.1.318", date: "November 4, 2026" },
  { version: "2.1.317", date: "November 3, 2026" },
  { version: "2.1.316", date: "October 31, 2026" },
];

export function priceCsv() {
  return {
    filename: "ai-coding-agents-next-30-days-prices.csv",
    headers: ["Tool", "Plan", "Price", "Usage line", "Source", "Source URL", "Checked"],
    rows: priceRows.map((row) => [row.tool, row.plan, row.priceLabel, row.limit, row.sourceLabel, row.sourceUrl, readOn]),
  };
}

export function repoCsv() {
  return {
    filename: "ai-coding-agents-next-30-days-repos.csv",
    headers: ["Repository", "Stars", "Latest release", "Release published", "Last push", "Licence", "URL", "Checked"],
    rows: repoRows.map((row) => [
      row.repo,
      String(row.stars),
      row.release,
      row.published,
      row.pushed,
      row.licence,
      row.url,
      readOn,
    ]),
  };
}

export function dateCsv() {
  return {
    filename: "ai-coding-agents-next-30-days-dates.csv",
    headers: ["Date", "What the page says", "Source", "Source URL", "Checked"],
    rows: dateRows.map((row) => [row.date, row.what, row.sourceLabel, row.sourceUrl, readOn]),
  };
}

export function codingAgents30DayPdf(): PdfModel {
  const dateLabel = formatDate(readOn);
  return {
    filename: "ai-coding-agents-8-nov-8-dec-2026.pdf",
    title,
    description,
    dateLabel,
    url: absoluteUrl(path),
    sections: [
      {
        paragraphs: [
          `${announcedAnswer} The window is November 8 through December 8, 2026. The 11 tools are ${toolsCompared.join(", ")}.`,
          cheapestAnswer,
          "This page is only about coding agents for the next month. The six-month and 12-month outlooks cover filings, computer use, harnesses, and regulation. Shopping checkout is a separate report. Official SWE-bench and Terminal-Bench scores stay in the November harness benchmark.",
        ],
      },
      {
        heading: "How a claim is sorted",
        paragraphs: [
          "Announced means a linked company page, docs page, or changelog names the date.",
          "Likely means the recent public record makes a kind of follow-up reasonable, and no page names the day or the feature.",
          `Watch for means a later check should confirm the item or drop it. The pages were read on ${checkedLabel}.`,
        ],
      },
      {
        heading: "Announced",
        paragraphs: [announcedAnswer],
        table: {
          caption: dateCaption,
          headers: ["Date", "What the page says", "Source"],
          rows: dateRows.map((row) => [row.date, row.what, row.sourceUrl]),
        },
      },
      {
        heading: "Plan prices",
        paragraphs: [
          priceAnswer,
          "Claude Team standard seats are $20 per seat per month billed annually, or $25 billed monthly. Premium seats are $100 annually or $125 monthly. Enterprise is $20 per seat per month, billed annually, with a 20-seat minimum, plus usage at API rates. The pricing page says standard seats give more usage than Pro, and premium seats give 5x more than standard. It does not print a number for standard.",
          "Codex Business is $20 per user per month for two or more users billed annually, or $25 billed monthly. Cursor Teams starts at $30 per user per month on the pricing page. The docs page lists Teams seats at $30, $100, or $200. GitHub Copilot Business is $19 per granted seat per month with 1,900 credits, and Copilot Enterprise is $39 with 3,900 credits. Usage past the shared pool is $0.01 per credit. Devin Teams is $80 a month plus $40 a month per full developer seat, for up to 200 users.",
          "On the Codex pricing page, Plus and Standard Business print these local-message estimates per five hours: GPT-6 Astra 5-45, GPT-6.1 Sol 15-160, GPT-6.1 Terra 35-285, GPT-6 Sol 15-150, and GPT-6 Luna 350-3,000. The page says the estimates are not fixed limits, and that Pro plans currently have no five-hour limit.",
          "windsurf.com/pricing returned HTTP 308 to devin.ai/pricing on November 8, 2026. Jules plan cards print task caps and do not print a dollar price. Gemini CLI's quota page still prints daily request caps, and the same site says unpaid and Google One users moved to Antigravity CLI on June 18, 2026. Antigravity's plans page does not print a request count.",
        ],
        table: {
          caption: priceCaption,
          headers: ["Tool", "Plan", "Price", "Usage line"],
          rows: priceRows.map((row) => [row.tool, row.plan, row.priceLabel, row.limit]),
        },
      },
      {
        heading: "Open-source repositories",
        paragraphs: [
          reposAnswer,
          "Star counts and push times are the GitHub API fields stargazers_count and pushed_at. Latest release is the tag and published_at from the releases API. Aider's releases call did not return a tag on this reading. The software price of an open-source repository is separate from the model bill.",
          `Claude Code's changelog, read the same day, lists 2.1.319 on November 6, 2.1.318 on November 4, 2.1.317 on November 3, and 2.1.316 on October 31. Cursor's changelog lists voice chat on November 6 and live apps on November 5. The November 5 post says support for other git providers such as GitLab is coming soon, for deploying live apps, and it does not name a day.`,
        ],
        table: {
          caption: repoCaption,
          headers: ["Repository", "Stars", "Latest release", "Published", "Last push", "Licence"],
          rows: repoRows.map((row) => [
            row.repo,
            row.stars.toLocaleString("en-US"),
            row.release,
            row.published,
            row.pushed,
            row.licence,
          ]),
        },
      },
      {
        heading: "Likely",
        paragraphs: [
          likelyAnswer,
          "Claude Code published four changelog versions from October 31 through November 6. openai/codex, google-gemini/gemini-cli, and OpenHands/OpenHands were pushed on November 8, after a release on November 4 or November 6. Those facts are a cadence. They are not a scheduled feature.",
        ],
      },
      {
        heading: "Watch for",
        paragraphs: [
          watchAnswer,
          "Confirm or drop each dated mark on its day: the Claude Desktop 3P default after 12:00 PM Pacific on November 10, the three Antigravity model rows on November 18, and the Codex promotional-pricing sentence after November 21. The Claude Code help page says a wrap-up allowance is rolling out gradually. Cursor's GitLab line has no day. Aider's repository was last pushed on May 22, 2026. Cline's newest returned release is v4.1.26 from October 26, 2026, and the repository was pushed on November 7. Jules still has no dollar price on its plan cards.",
        ],
      },
      {
        heading: "Left out",
        paragraphs: [
          leftOutAnswer,
          "Left out: a December change to Codex usage metering, because the OpenAI help center did not return the article on this pass and the pricing page that did load does not state it. Aider's latest release tag, because the releases API did not return one. Claude Code's GitHub star count, because that repository call failed. Google AI dollar prices are included only from the Gemini subscriptions page. Jules has no dollar price to include. Revenue, traffic, and usage totals are not on these pages. Benchmark scores stay in the November harness benchmark.",
        ],
      },
    ],
  };
}
