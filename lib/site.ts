const CANONICAL_ORIGIN = "https://www.aiagentsinfo.com";

function resolveSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return CANONICAL_ORIGIN;
  try {
    const host = new URL(raw).hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1") {
      return raw.replace(/\/$/, "");
    }
  } catch {
    return CANONICAL_ORIGIN;
  }
  return CANONICAL_ORIGIN;
}

export const site = {
  name: "AI Agents Info",
  shortName: "Agents Info",
  domain: "www.aiagentsinfo.com",
  url: resolveSiteUrl(),
  description:
    "Find AI tools and agents in one place. Independent listings checked against a live site, plus original reporting on pricing, harnesses, and computer use.",
  tagline: "The biggest directory of AI tools and agents",
  email: "hello@aiagentsinfo.com",
  bylines: {
    editorial: "AI Agents Info Editorial",
    research: "AI Agents Info Research",
  },
  locale: "en_US",
} as const;

/** Official profiles found in this repo. No X, LinkedIn, or Medium profile is published here. */
export const organizationSameAs = ["https://github.com/sarath59/aiagentsinfo"] as const;

export const audiences = [
  {
    slug: "everyone",
    title: "Plain English",
    eyebrow: "Adult readers",
    summary:
      "Clear AI news and research for adults, with jargon linked to the glossary.",
    href: "/for/everyone",
    accent: "everyone",
  },
  {
    slug: "builders",
    title: "Builders",
    eyebrow: "Practitioners",
    summary:
      "Harnesses, tools, evals, and how working systems are put together.",
    href: "/for/builders",
    accent: "builders",
  },
  {
    slug: "research",
    title: "Research",
    eyebrow: "Frontier",
    summary:
      "Paper breakdowns, original notes, and benchmarks written for people who live in the literature.",
    href: "/for/research",
    accent: "research",
  },
] as const;

export const topics = [
  {
    slug: "news",
    title: "Daily AI & agent news",
    summary: "A calm weekly strip of what actually moved in AI and agents.",
    href: "/topics/news",
  },
  {
    slug: "tools-saas",
    title: "New AI tools & SaaS",
    summary: "Launches, product changes, and the directory of tools worth tracking.",
    href: "/topics/tools-saas",
  },
  {
    slug: "research",
    title: "Agent research & breakthroughs",
    summary: "Papers, reports, and what they change about how agents are built.",
    href: "/topics/research",
  },
  {
    slug: "shopping",
    title: "Agents in shopping",
    summary: "How agents search, compare, and buy — and where they still fail.",
    href: "/topics/shopping",
  },
  {
    slug: "task-performance",
    title: "Agents in task performance",
    summary: "Computer-use, office work, coding, and the gap between demos and reliability.",
    href: "/topics/task-performance",
  },
  {
    slug: "harnesses",
    title: "Agent harnesses",
    summary: "The loops, tools, memory, and guardrails that turn a model into an agent.",
    href: "/topics/harnesses",
  },
  {
    slug: "education",
    title: "Agents in education",
    summary: "Tutors, classroom tools, and how to learn with (and about) agents.",
    href: "/topics/education",
  },
  {
    slug: "how-agents-work",
    title: "How agents work",
    summary: "First-principles explainers: models, tools, planning, memory, and evaluation.",
    href: "/topics/how-agents-work",
  },
] as const;

export const nav = [
  { href: "/directory", label: "Directory" },
  { href: "/submit", label: "Submit" },
  { href: "/reports", label: "Reports" },
  { href: "/best", label: "Best AI agents" },
  { href: "/verified-revenue", label: "Revenue" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Blog" },
  { href: "/glossary", label: "Glossary" },
  { href: "/topics", label: "Topics" },
] as const;

export const comparisons = [
  {
    href: "/best/ai-agent-harnesses",
    title: "Best AI agent harness",
    summary:
      "Coding, open-source, and local harnesses. Licence, list price, and platform from official pages. Last verified November 2026.",
  },
  {
    href: "/best/computer-use-agents",
    title: "Best computer use agents",
    summary:
      "Desktop, API, open-source, and Windows computer use. Last verified November 2026. No invented scores.",
  },
  {
    href: "/best/ai-agent-evaluation-tools",
    title: "Best AI agent evaluation tools",
    summary:
      "Regression and trajectory evaluation stacks, including open source. Last verified November 2026.",
  },
] as const;

export const dataAssets = [
  {
    href: "/reports/ai-agents-next-12-months",
    title: "AI agents, Nov 2026 to Nov 2027",
    summary:
      "What filings, company pages, and official timelines have dated for coding agents, computer use, harnesses, and regulation from November 2026 through November 2027. Checked November 7, 2026.",
  },
  {
    href: "/reports/ai-agents-next-6-months",
    title: "AI agents, Nov 2026 to May 2027",
    summary:
      "What filings and company pages have dated for coding agents, computer use, harnesses, and regulation from November 2026 through May 2027. Checked November 5, 2026.",
  },
  {
    href: "/reports/ai-shopping-agents-next-6-months",
    title: "AI shopping agents, Nov 2026 to May 2027",
    summary:
      "What Google, OpenAI, Amazon, Microsoft, Shopify, and Adobe have dated for shopping agents from November 2026 through May 2027. Checked November 5, 2026.",
  },
  {
    href: "/reports/agent-harness-benchmark-november-2026",
    title: "Harness benchmark, November 2026",
    summary:
      "Public SWE-bench and Terminal-Bench scores for agent harnesses and coding agents, each with the date on the official source. Read November 5, 2026.",
  },
  {
    href: "/reports/ai-agent-framework-github-stats-november-2026",
    title: "AI agent framework GitHub stats, November 2026",
    summary:
      "Stars, forks, open issues, licences, and latest releases for open-source agent frameworks and SDKs. Pulled from the public GitHub API on 5 November 2026.",
  },
  {
    href: "/verified-revenue",
    title: "Verified revenue",
    summary:
      "AI tools with payment-processor-verified revenue and a public price. Sort the table. Each figure has a source link and the date it was checked.",
  },
  {
    href: "/directory/stats",
    title: "Directory stats",
    summary:
      "Counts from this site's own directory: category, pricing, indie or startup or YC origin, additions, and community submissions. Generated when the site is built.",
  },
  {
    href: "/agent-cost-calculator",
    title: "Agent cost calculator",
    summary:
      "Estimate a 30-day model bill from official per-token prices. Pick a model, then enter tokens per task and tasks per day. No login is required.",
  },
  {
    href: "/agent-prompt-checker",
    title: "Prompt and tool checker",
    summary:
      "Paste a system prompt and tool JSON. The server checks OpenAI, Anthropic, and MCP shapes, counts tokens, and estimates a 30-day bill from the same official prices as the cost calculator. The prompt is not stored.",
  },
] as const;

export const footerNav = [
  {
    title: "Read",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/research", label: "Research" },
      { href: "/papers", label: "Papers" },
      { href: "/reports", label: "Reports" },
      { href: "/best", label: "Best AI agents" },
      { href: "/glossary", label: "Glossary" },
      { href: "/directory", label: "Directory" },
      { href: "/topics", label: "Topics" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/for/everyone", label: "Plain English" },
      { href: "/for/builders", label: "Builders" },
      { href: "/for/research", label: "Research audience" },
    ],
  },
  {
    title: "Trackers",
    links: [
      { href: "/best/ai-agent-harnesses", label: "Best AI agent harness" },
      { href: "/best/computer-use-agents", label: "Best computer use agents" },
      { href: "/best/ai-agent-evaluation-tools", label: "Best AI agent evaluation tools" },
      { href: "/trackers/breakthroughs", label: "Breakthroughs timeline" },
      { href: "/trackers/harnesses", label: "Harness comparison" },
      { href: "/trackers/benchmarks", label: "Benchmark leaderboard" },
      { href: "/reports/ai-agents-next-12-months", label: "AI agents, Nov 2026 to Nov 2027" },
      { href: "/reports/ai-agents-next-6-months", label: "AI agents, Nov 2026 to May 2027" },
      { href: "/reports/ai-shopping-agents-next-6-months", label: "Shopping agents, Nov 2026 to May 2027" },
      { href: "/reports/agent-harness-benchmark-november-2026", label: "Harness benchmark, November 2026" },
      { href: "/reports/ai-agent-framework-github-stats-november-2026", label: "Framework GitHub stats, November 2026" },
      { href: "/verified-revenue", label: "Verified revenue" },
      { href: "/directory/stats", label: "Directory stats" },
      { href: "/agent-cost-calculator", label: "Agent cost calculator" },
      { href: "/agent-prompt-checker", label: "Prompt and tool checker" },
    ],
  },
  {
    title: "Site",
    links: [
      { href: "/submit", label: "Submit your tool" },
      { href: "/about", label: "About" },
      { href: "/editorial-policy", label: "Editorial policy" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/advertise", label: "Advertise" },
    ],
  },
] as const;

export function absoluteUrl(path = "/") {
  const base = site.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
