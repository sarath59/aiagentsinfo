export const directoryCategories = [
  { slug: "ai-agents", title: "AI agents" },
  { slug: "agent-frameworks", title: "Agent frameworks & harnesses" },
  { slug: "coding-agents", title: "Coding agents" },
  { slug: "coding", title: "Coding" },
  { slug: "writing", title: "Writing" },
  { slug: "image", title: "Image" },
  { slug: "video", title: "Video" },
  { slug: "image-video", title: "Image & video" },
  { slug: "voice", title: "Audio / voice" },
  { slug: "chatbots", title: "Chatbots" },
  { slug: "productivity", title: "Productivity" },
  { slug: "marketing", title: "Marketing" },
  { slug: "seo", title: "SEO" },
  { slug: "sales", title: "Sales" },
  { slug: "customer-support", title: "Customer support" },
  { slug: "design", title: "Design" },
  { slug: "education", title: "Education" },
  { slug: "research", title: "Research" },
  { slug: "data-analytics", title: "Data / analytics" },
  { slug: "finance", title: "Finance" },
  { slug: "legal", title: "Legal" },
  { slug: "hr-recruiting", title: "HR / recruiting" },
  { slug: "health", title: "Health" },
  { slug: "developer-tools", title: "Developer tools" },
  { slug: "no-code", title: "No-code" },
  { slug: "automation", title: "Automation" },
  { slug: "ecommerce", title: "E-commerce" },
  { slug: "shopping-agents", title: "Shopping agents" },
  { slug: "social-media", title: "Social media" },
  { slug: "other", title: "Other" },
] as const;

export const pricingModels = [
  { slug: "free", title: "Free" },
  { slug: "freemium", title: "Freemium" },
  { slug: "paid", title: "Paid" },
  { slug: "open-source", title: "Open source" },
  { slug: "free-trial", title: "Free trial" },
] as const;

export const billingPeriods = [
  { slug: "monthly", title: "Monthly" },
  { slug: "yearly", title: "Yearly" },
  { slug: "weekly", title: "Weekly" },
  { slug: "one-time", title: "One-time" },
  { slug: "usage", title: "Usage-based" },
] as const;

export type DirectoryCategory = (typeof directoryCategories)[number]["slug"];
export type PricingModel = (typeof pricingModels)[number]["slug"];
export type BillingPeriod = (typeof billingPeriods)[number]["slug"];

const CATEGORY_ALIASES: Record<string, DirectoryCategory> = {
  audio: "voice",
  "audio-voice": "voice",
  "audio-and-voice": "voice",
  "agent-framework": "agent-frameworks",
  "agent-frameworks-and-harnesses": "agent-frameworks",
  harnesses: "agent-frameworks",
  "image-and-video": "image-video",
  "data-and-analytics": "data-analytics",
  analytics: "data-analytics",
  data: "data-analytics",
  "hr-and-recruiting": "hr-recruiting",
  hr: "hr-recruiting",
  recruiting: "hr-recruiting",
  "e-commerce": "ecommerce",
  "customer-service": "customer-support",
  support: "customer-support",
  devtools: "developer-tools",
  "developer-tool": "developer-tools",
  nocode: "no-code",
  "ai-agent": "ai-agents",
  agents: "ai-agents",
  "shopping-agent": "shopping-agents",
  shopping: "shopping-agents",
  "coding-agent": "coding-agents",
  chatbot: "chatbots",
  social: "social-media",
};

const PRICING_ALIASES: Record<string, PricingModel> = {
  trial: "free-trial",
  "free-trial": "free-trial",
  opensource: "open-source",
  "open-source": "open-source",
};

const BILLING_ALIASES: Record<string, BillingPeriod> = {
  month: "monthly",
  mo: "monthly",
  annual: "yearly",
  annually: "yearly",
  year: "yearly",
  week: "weekly",
  once: "one-time",
  onetime: "one-time",
  "one-time": "one-time",
  "usage-based": "usage",
  "per-use": "usage",
};

export function categoryTitle(slug: string) {
  return directoryCategories.find((category) => category.slug === slug)?.title ?? slug;
}

/** Title used on the category URL so it does not collide with other "Research" pages. */
export function categoryPageTitle(slug: string) {
  if (slug === "research") return "Research tools";
  return categoryTitle(slug);
}

export const categorySummaries: Record<DirectoryCategory, string> = {
  "ai-agents":
    "Products whose main job is to pursue a goal with tools or actions, not only to answer in a chat box.",
  "agent-frameworks":
    "Libraries and harnesses for building agents: the loop, tools, memory, and permissions around a model.",
  "coding-agents":
    "Agents that write, review, or run code, including IDE agents and coding command-line tools.",
  coding: "Developer tools for writing software that are not themselves coding agents.",
  writing: "Tools for drafting, editing, and rewriting text.",
  image: "Image generation and image-editing products.",
  video: "Video generation, editing, and repurposing products.",
  "image-video": "Products that produce both still images and video.",
  voice: "Speech, voice, and other audio products.",
  chatbots: "Conversational assistants whose main interface is a chat thread.",
  productivity: "Work tools for documents, tasks, and everyday office jobs.",
  marketing: "Advertising, campaign, and paid-media tools.",
  seo: "Tools for search research, content optimization, and site audits.",
  sales: "Prospecting, outreach, and pipeline tools.",
  "customer-support": "Help-desk and customer-support products.",
  design: "Design, interface, and visual-production tools.",
  education: "Tutors, classroom tools, and other learning products.",
  research: "Tools for literature search, reading papers, and research workflows.",
  "data-analytics": "Analysis, business-intelligence, and data-work products.",
  finance: "Accounting, markets, and other finance tools.",
  legal: "Contract, compliance, and legal-work tools.",
  "hr-recruiting": "Hiring, resume, and people-operations tools.",
  health: "Health and clinical workflow tools. Listings here are not medical advice.",
  "developer-tools": "APIs, gateways, and infrastructure for people building software.",
  "no-code": "Builders that assemble software without a traditional codebase.",
  automation: "Workflow and task-automation products.",
  ecommerce: "Store, catalog, and online-selling tools.",
  "shopping-agents": "Agents that search, compare, or buy products.",
  "social-media": "Scheduling and social-publishing tools.",
  other: "Listings that do not fit a narrower category yet.",
};

export function pricingTitle(slug: string) {
  return pricingModels.find((model) => model.slug === slug)?.title ?? slug;
}

export function billingPeriodTitle(slug: string) {
  return billingPeriods.find((period) => period.slug === slug)?.title ?? slug;
}

export function canonicalCategory(value: string): DirectoryCategory | null {
  return canonicalChoice(value, directoryCategories, CATEGORY_ALIASES);
}

export function canonicalPricing(value: string): PricingModel | null {
  return canonicalChoice(value, pricingModels, PRICING_ALIASES);
}

export function canonicalBillingPeriod(value: string): BillingPeriod | null {
  return canonicalChoice(value, billingPeriods, BILLING_ALIASES);
}

function canonicalChoice<T extends string>(
  value: string,
  options: readonly { slug: T; title: string }[],
  aliases: Record<string, T>,
): T | null {
  const slug = labelSlug(value);
  if (!slug) return null;
  if (options.some((item) => item.slug === slug)) return slug as T;
  const alias = aliases[slug];
  if (alias && options.some((item) => item.slug === alias)) return alias;
  const titled = options.find((item) => labelSlug(item.title) === slug);
  return titled?.slug ?? null;
}

function labelSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[_/]+/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
