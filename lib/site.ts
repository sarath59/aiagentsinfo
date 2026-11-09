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

/** Organization, WebSite, and article publisher name. Visible chrome keeps site.name. */
export const publisherName = "AI Agents Info (aiagentsinfo.com)";
export const publisherAlternateName = "aiagentsinfo.com";

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
    href: "/best/ai-agent-frameworks",
    title: "Best AI agent frameworks",
    summary:
      "19 free and open-source frameworks and SDKs. Licence and latest GitHub release read November 9, 2026.",
  },
  {
    href: "/best/ai-coding-agents",
    title: "Best AI coding agents",
    summary:
      "Claude Code, Codex, Cursor, and GitHub Copilot list prices, free and paid, read November 9, 2026.",
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
    href: "/reports/ai-coding-agents-next-30-days",
    title: "AI coding agents, 8 Nov to 8 Dec 2026",
    summary:
      "List prices and usage limits for 11 coding agents, checked November 8, 2026, and three dates official pages already set: November 10, November 18, and November 21.",
  },
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
    title: "AI shopping agents next 6 months: 6 companies",
    summary:
      "What Google, OpenAI, Amazon, Microsoft, Shopify, and Adobe have dated for shopping agents from November 2026 through May 2027. Checked November 5, 2026.",
  },
  {
    href: "/reports/agent-harness-benchmark-november-2026",
    title: "Agent harness benchmark, November 2026",
    summary:
      "Agent harness benchmark for November 2026: public SWE-bench and Terminal-Bench scores for coding agents, each with the date on the official source.",
  },
  {
    href: "/reports/ai-agent-framework-github-stats-november-2026",
    title: "AI agent framework release, November 2026",
    summary:
      "The latest GitHub release for each of 19 open-source agent frameworks and SDKs, pulled 5 November 2026. Fourteen of the 19 had a release within 30 days.",
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
    title: "AI agent cost calculator",
    summary:
      "Free AI agent and chatbot cost calculator. Estimate a 30-day model bill from official per-token prices. No login is required.",
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
      { href: "/best/ai-agent-frameworks", label: "Best AI agent frameworks" },
      { href: "/best/ai-coding-agents", label: "Best AI coding agents" },
      { href: "/best/computer-use-agents", label: "Best computer use agents" },
      { href: "/best/ai-agent-evaluation-tools", label: "Best AI agent evaluation tools" },
      { href: "/best/ai-agents-for-shopping", label: "Best AI agent for shopping" },
      { href: "/best/ai-agents-for-web-search", label: "Best AI agent for web search" },
      { href: "/best/ai-agents-for-travel-booking", label: "Best AI agent for travel booking" },
      { href: "/best/ai-agents-for-email", label: "Best AI agent for email" },
      { href: "/best/ai-agents-for-personal-assistant-tasks", label: "Best AI agent for personal assistant tasks" },
      { href: "/best/ai-agents-for-research", label: "Best AI agent for research" },
      { href: "/best/ai-agents-for-scheduling", label: "Best AI agent for scheduling" },
      { href: "/best/ai-agents-for-writing", label: "Best AI agent for writing" },
      { href: "/best/ai-agents-for-students", label: "Best AI agent for students" },
      { href: "/best/ai-agents-for-small-business", label: "Best AI agent for small business" },
      { href: "/trackers/breakthroughs", label: "Breakthroughs timeline" },
      { href: "/trackers/harnesses", label: "Harness comparison" },
      { href: "/trackers/benchmarks", label: "Benchmark leaderboard" },
      { href: "/reports/ai-coding-agents-next-30-days", label: "AI coding agents, 8 Nov to 8 Dec 2026" },
      { href: "/reports/ai-agents-next-12-months", label: "AI agents, Nov 2026 to Nov 2027" },
      { href: "/reports/ai-agents-next-6-months", label: "AI agents, Nov 2026 to May 2027" },
      { href: "/reports/ai-shopping-agents-next-6-months", label: "Shopping agents, Nov 2026 to May 2027" },
      { href: "/reports/agent-harness-benchmark-november-2026", label: "Agent harness benchmark, November 2026" },
      { href: "/reports/ai-agent-framework-github-stats-november-2026", label: "Framework releases, November 2026" },
      { href: "/verified-revenue", label: "Verified revenue" },
      { href: "/directory/stats", label: "Directory stats" },
      { href: "/agent-cost-calculator", label: "AI agent cost calculator" },
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
