export const directoryCategories = [
  { slug: "coding-agents", title: "Coding agents" },
  { slug: "shopping-agents", title: "Shopping agents" },
  { slug: "education", title: "Education" },
  { slug: "productivity", title: "Productivity" },
  { slug: "research", title: "Research" },
  { slug: "voice", title: "Voice" },
  { slug: "image-video", title: "Image & video" },
  { slug: "agent-frameworks", title: "Agent frameworks & harnesses" },
] as const;

export const pricingModels = [
  { slug: "free", title: "Free" },
  { slug: "freemium", title: "Freemium" },
  { slug: "paid", title: "Paid" },
  { slug: "open-source", title: "Open source" },
] as const;

export type DirectoryCategory = (typeof directoryCategories)[number]["slug"];
export type PricingModel = (typeof pricingModels)[number]["slug"];

export function categoryTitle(slug: string) {
  return directoryCategories.find((category) => category.slug === slug)?.title ?? slug;
}

export function pricingTitle(slug: string) {
  return pricingModels.find((model) => model.slug === slug)?.title ?? slug;
}
