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

/** One sentence, used verbatim in the footer, About page, default meta description, and Organization/WebSite JSON-LD. */
export const entityLine =
  "aiagentsinfo.com is an independent directory and research site tracking AI agents, agent harnesses, frameworks and agent benchmarks.";

export const site = {
  name: "AI Agents Info",
  shortName: "Agents Info",
  domain: "www.aiagentsinfo.com",
  url: resolveSiteUrl(),
  description: entityLine,
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

/**
 * Profiles that exist. GitHub is this repository. Medium @sarathc225 publishes notes that say they
 * were first published at aiagentsinfo.com. No X profile for the site is named in this repo.
 */
export const organizationSameAs = [
  "https://github.com/sarath59/aiagentsinfo",
  "https://medium.com/@sarathc225",
] as const;

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
      "19 free and open-source frameworks and SDKs. Latest GitHub release read November 11, 2026. AutoGen’s tag is still September 30, 2025.",
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
    href: "/reports/ai-agents-next-12-months",
    title: "AI agents in the next 12 months: $70.7 billion is dated (Nov 2026 to Nov 2027)",
    summary:
      "Flagship calendar. Anthropic’s November 10 filing, the December 1 and January 1 token-price steps, and the regulation clocks through November 2027. Updated November 12, 2026.",
  },
  {
    href: "/reports/ai-agent-vendor-robots-txt-november-2026",
    title:
      "Do AI agent companies let AI agents read their sites? robots.txt and llms.txt of 52 websites, November 2026",
    summary:
      "52 vendor sites, fetched November 13, 2026. 45 of 47 parsed robots.txt files allow / for GPTBot. 27 returned llms.txt as text.",
  },
  {
    href: "/reports/enterprise-agent-platforms-next-6-months",
    title:
      "Enterprise agent platforms, Nov 2026 to May 2027: Agent Builder ends November 30. A standard action is still $0.10.",
    summary:
      "Salesforce, Microsoft, Google, AWS, ServiceNow, OpenAI, and Workday meters, read November 12, 2026. Agent Builder ends November 30. Salesforce reports December 2.",
  },
  {
    href: "/reports/ai-shopping-agents-next-30-days",
    title: "AI shopping agents, 12 Nov to 12 Dec 2026: Black Friday is dated. A new checkout day is not.",
    summary:
      "Adobe’s two Thanksgiving forecasts, Amazon’s undated text rollout, and the checkout pages that still have no day. Checked November 12, 2026.",
  },
  {
    href: "/reports/ai-agent-frameworks-next-6-months",
    title:
      "AI agent frameworks, Nov 2026 to May 2027: Pydantic AI 2.68.0 shipped today. The Agents SDK stable tag did not.",
    summary:
      "Tags and a seven-day star delta for LangGraph, the Agents SDK, ADK, CrewAI, Microsoft Agent Framework, Mastra, Pydantic AI, and the Claude Agent SDK. Read November 12, 2026.",
  },
  {
    href: "/reports/web-search-tools-for-ai-agents-november-2026",
    title:
      "Best web search tool for Claude and OpenAI agents, November 2026: prices and limits of 13 APIs checked",
    summary:
      "List prices, free tiers, rate limits, and official MCP servers for 13 web search APIs. Checked November 12, 2026. Nothing here is estimated.",
  },
  {
    href: "/reports/ai-answer-crawlers-november-2026",
    title: "AI answer crawlers, November 2026: 196 fetches in 7 days, 160 from ChatGPT-User",
    summary:
      "Which answer engines fetched this site from 4 to 10 November 2026, and how that compares with the people they sent. Checked November 11, 2026.",
  },
  {
    href: "/reports/voice-agents-next-6-months",
    title:
      "Voice agents, Nov 2026 to May 2027: November 17 can retire two Gemini Live previews. January 20 retires gpt-realtime.",
    summary:
      "Per-minute prices, speech-to-speech versus a cascade, LiveKit and Pipecat, and the model ids with a shutdown date. Checked November 11, 2026.",
  },
  {
    href: "/reports/ai-agents-in-production-2026",
    title: "AI agents in production, 2026: the grader decides who is shipping",
    summary:
      "McKinsey's scaling split, Menlo's spend estimates, SWE-bench and Terminal-Bench with the harness named, OSWorld 2.0, and the packages builders download. Checked November 10, 2026.",
  },
  {
    href: "/reports/ai-agents-in-2027",
    title: "AI agents in 2027: task cost will not fall like token cost",
    summary:
      "A labeled forecast. Coding agents stay, computer use stays on runbooks, and a cheaper token is not a cheaper successful run. Checked November 10, 2026.",
  },
  {
    href: "/reports/mcp-next-6-months",
    title: "MCP, Nov 2026 to May 2027: the breaking change already shipped",
    summary:
      "Revision 2026-07-28 is still current. The official registry, client transports, SDK downloads, and the security advisories, through May 2027. Checked November 10, 2026.",
  },
  {
    href: "/reports/browser-and-computer-use-agents-next-6-months",
    title: "Browser and computer-use agents, Nov 2026 to May 2027",
    summary:
      "Ten live browser and computer-use agents, the one day a vendor has named through May 9, 2027, and the OSWorld 2.0 scores printed on the benchmark page. Checked November 9, 2026.",
  },
  {
    href: "/reports/ai-coding-agents-next-30-days",
    title: "AI coding agents, 8 Nov to 8 Dec 2026",
    summary:
      "List prices and usage limits for 11 coding agents, checked November 8, 2026, and three dates official pages already set: November 10, November 18, and November 21.",
  },
  {
    href: "/reports/ai-agents-next-6-months",
    title: "AI agents, Nov 2026 to May 2027",
    summary:
      "What filings and company pages have dated for coding agents, computer use, harnesses, and regulation from November 2026 through May 2027. Checked November 5, 2026.",
  },
  {
    href: "/reports/ai-shopping-agents-next-6-months",
    title: "AI shopping agents: Google checks out in Canada. ChatGPT still sends you to the store.",
    summary:
      "Google’s Canada checkout is live for named retailers. ChatGPT, re-read November 13, 2026, still finishes on the store’s site. Undated months through May 2027 stay empty.",
  },
  {
    href: "/reports/agent-harness-benchmark-november-2026",
    title: "Agent harness benchmark, November 2026",
    summary:
      "Agent harness benchmark for November 2026: public SWE-bench and Terminal-Bench scores for coding agents, each with the date on the official source.",
  },
  {
    href: "/reports/ai-agent-framework-github-stats-november-2026",
    title: "AI agent framework release November 2026",
    summary:
      "Sortable table of the latest GitHub release for each of 19 open-source agent frameworks and SDKs, pulled 5 November 2026. Fourteen of the 19 had a release within 30 days.",
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
    href: "/tools/ai-crawler-robots-txt-checker",
    title: "robots.txt checker for AI crawlers",
    summary:
      "See which documented AI bots may fetch a path, then download a robots.txt that allows search and blocks training. Nothing you enter is stored.",
  },
  {
    href: "/tools/agents-md-generator",
    title: "AGENTS.md generator",
    summary:
      "Free AGENTS.md draft from your stack and commands, for Codex, Cursor, and the Copilot coding agent. Copy or download. Nothing you type is stored.",
  },
  {
    href: "/tools/mcp-config-generator",
    title: "MCP server config generator",
    summary:
      "Free MCP config for Claude Desktop, Claude Code, Cursor, VS Code, and Windsurf. Paste a file to score it. Formats checked 13 Nov 2026. Nothing is stored.",
  },
  {
    href: "/agent-cost-calculator",
    title: "AI agent cost calculator",
    summary:
      "Free AI agent and chatbot cost calculator. Estimate a 30-day model bill from official per-token prices. No login is required.",
  },
  {
    href: "/tools/ai-agent-roi-calculator",
    title: "AI agent ROI calculator",
    summary:
      "Payback months, annual ROI, and break-even task volume from tasks, a loaded wage, and an agent bill you type. Nothing is stored.",
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
      { href: "/trackers", label: "Live data trackers" },
      { href: "/trackers/downloads", label: "Framework downloads" },
      { href: "/trackers/agents-md", label: "AGENTS.md adoption" },
      { href: "/trackers/stars", label: "Framework GitHub stars" },
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
      { href: "/reports/ai-agent-vendor-robots-txt-november-2026", label: "Vendor robots.txt, November 2026" },
      { href: "/reports/web-search-tools-for-ai-agents-november-2026", label: "Web search APIs, November 2026" },
      { href: "/reports/ai-answer-crawlers-november-2026", label: "AI answer crawlers, November 2026" },
      { href: "/reports/ai-agents-in-production-2026", label: "AI agents in production, 2026" },
      { href: "/reports/ai-agents-in-2027", label: "AI agents in 2027" },
      { href: "/reports/mcp-next-6-months", label: "MCP, Nov 2026 to May 2027" },
      { href: "/reports/browser-and-computer-use-agents-next-6-months", label: "Browser and computer-use agents, Nov 2026 to May 2027" },
      { href: "/reports/ai-coding-agents-next-30-days", label: "AI coding agents, 8 Nov to 8 Dec 2026" },
      { href: "/reports/ai-agents-next-12-months", label: "AI agents, next 12 months" },
      { href: "/reports/ai-shopping-agents-next-30-days", label: "Shopping agents, next 30 days" },
      { href: "/reports/ai-agent-frameworks-next-6-months", label: "Frameworks, Nov 2026 to May 2027" },
      { href: "/reports/enterprise-agent-platforms-next-6-months", label: "Enterprise platforms, Nov 2026 to May 2027" },
      { href: "/reports/ai-agents-next-6-months", label: "AI agents, Nov 2026 to May 2027" },
      { href: "/reports/ai-shopping-agents-next-6-months", label: "Shopping agents, Nov 2026 to May 2027" },
      { href: "/reports/voice-agents-next-6-months", label: "Voice agents, Nov 2026 to May 2027" },
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
      { href: "/tools", label: "Free tools" },
      { href: "/tools/mcp-config-generator", label: "MCP server config generator" },
      { href: "/tools/ai-crawler-robots-txt-checker", label: "robots.txt checker for AI crawlers" },
      { href: "/tools/agents-md-generator", label: "AGENTS.md generator" },
      { href: "/tools/ai-agent-roi-calculator", label: "AI agent ROI calculator" },
      { href: "/submit", label: "Submit your tool" },
      { href: "/about", label: "About" },
      { href: "/editorial-policy", label: "Editorial policy" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/advertise", label: "Advertise" },
      { href: "/mcp", label: "MCP server" },
    ],
  },
] as const;

export function absoluteUrl(path = "/") {
  const base = site.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
