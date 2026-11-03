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
    "A learning and research publication about AI and AI agents — from first questions to frontier research — plus a growing directory of AI tools, apps, SaaS, and agents.",
  tagline: "Learn AI agents from first questions to frontier research.",
  email: "hello@aiagentsinfo.com",
  bylines: {
    editorial: "AI Agents Info Editorial",
    research: "AI Agents Info Research",
  },
  locale: "en_US",
} as const;

export const audiences = [
  {
    slug: "kids",
    title: "Curious Kids",
    eyebrow: "Ages of wonder",
    summary:
      "Friendly explanations, pictures in words, and experiments you can try with a grown-up.",
    href: "/for/kids",
    accent: "kids",
  },
  {
    slug: "everyone",
    title: "Everyone",
    eyebrow: "Plain language",
    summary:
      "Large, readable writing for anyone who wants to understand agents without the jargon.",
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
  { href: "/verified-revenue", label: "Revenue" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Blog" },
  { href: "/glossary", label: "Glossary" },
  { href: "/topics", label: "Topics" },
] as const;

export const footerNav = [
  {
    title: "Read",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/research", label: "Research" },
      { href: "/glossary", label: "Glossary" },
      { href: "/directory", label: "Directory" },
      { href: "/topics", label: "Topics" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/for/kids", label: "Curious Kids" },
      { href: "/for/everyone", label: "Everyone" },
      { href: "/for/builders", label: "Builders" },
      { href: "/for/research", label: "Research audience" },
    ],
  },
  {
    title: "Trackers",
    links: [
      { href: "/trackers/breakthroughs", label: "Breakthroughs timeline" },
      { href: "/trackers/harnesses", label: "Harness comparison" },
      { href: "/trackers/benchmarks", label: "Benchmark leaderboard" },
      { href: "/verified-revenue", label: "Verified revenue" },
    ],
  },
  {
    title: "Site",
    links: [
      { href: "/submit", label: "Submit your tool" },
      { href: "/about", label: "About" },
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
