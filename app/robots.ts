import type { MetadataRoute } from "next";

const canonical = "https://www.aiagentsinfo.com";

const userAgents = [
  "*",
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: userAgents.map((userAgent) => ({
      userAgent,
      allow: "/",
      disallow: "/api/",
    })),
    sitemap: `${canonical}/sitemap.xml`,
    host: canonical,
  };
}
