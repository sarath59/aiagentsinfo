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
