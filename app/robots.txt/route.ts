const canonical = "https://www.aiagentsinfo.com";

/**
 * Real search and AI crawlers. Each named agent gets the same public allow
 * rule as `*`, because a specific group replaces the wildcard for that agent.
 * Nothing here is served only to bots.
 */
const userAgents = [
  "*",
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "Amazonbot",
  "DuckAssistBot",
  "cohere-ai",
  "Bytespider",
  "YouBot",
  "Diffbot",
  "AI2Bot",
] as const;

function group(userAgent: string) {
  return [`User-Agent: ${userAgent}`, "Allow: /", "Disallow: /api/", ""].join("\n");
}

export function GET() {
  const body = [
    "# Public pages are open to search and AI crawlers. The same HTML is served to every visitor.",
    `# llms.txt: ${canonical}/llms.txt`,
    `# llms-full.txt: ${canonical}/llms-full.txt`,
    "",
    ...userAgents.map(group),
    `Host: ${canonical}`,
    `Sitemap: ${canonical}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
