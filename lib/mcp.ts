import { comparisonsForListing, comparisonPages } from "@/lib/comparisons";
import {
  categorySummaries,
  categoryTitle,
  directoryCategories,
  filterDirectory,
  getDirectoryListings,
  pricingTitle,
  relatedListings,
  type DirectoryListing,
} from "@/lib/directory";
import { canonicalCategory } from "@/lib/directory-meta";
import { visibleText } from "@/lib/indexing";
import { conciseText } from "@/lib/listing-scan";
import { getResearchDocs, researchTypeTitle, type ResearchDoc } from "@/lib/research";
import { absoluteUrl } from "@/lib/site";

export const MCP_PATH = "/api/mcp";
export const MCP_PAGE_PATH = "/mcp";
export const MCP_SERVER_NAME = "ai-agents-info";
export const MCP_SERVER_VERSION = "1.0.0";
export const MCP_UPDATED = "2026-11-09";
export const MCP_MAX_BODY_BYTES = 64_000;

const LISTING_CACHE_MS = 5 * 60 * 1000;
const SEARCH_LIMIT_DEFAULT = 8;
const SEARCH_LIMIT_MAX = 15;
const RESEARCH_LIMIT_DEFAULT = 6;
const RESEARCH_LIMIT_MAX = 10;
const FREE_LIMIT_DEFAULT = 25;
const FREE_LIMIT_MAX = 50;
const EXCERPT_MAX = 1200;

const READ_ONLY = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

type CacheEntry = {
  listings: DirectoryListing[];
  research: ResearchDoc[];
  at: number;
};

let catalogCache: CacheEntry | null = null;

export const mcpServerJson = {
  $schema: "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
  name: "com.aiagentsinfo/directory",
  title: "AI Agents Info directory",
  description: "Read-only search of the AI Agents Info directory, comparisons, and research.",
  version: MCP_SERVER_VERSION,
  websiteUrl: absoluteUrl(MCP_PAGE_PATH),
  repository: {
    url: "https://github.com/sarath59/aiagentsinfo",
    source: "github",
  },
  remotes: [
    {
      type: "streamable-http",
      url: absoluteUrl(MCP_PATH),
    },
  ],
} as const;

export const mcpToolDocs = [
  {
    name: "search_agents",
    title: "Search agents",
    description:
      "Search the AI Agents Info directory of AI agents and tools. Optional category slug. Each hit includes the canonical listing URL.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Name, vendor, summary, tag, or use case. At least 2 characters." },
        category: {
          type: "string",
          description: "Optional directory category slug or title, such as coding-agents or AI agents.",
        },
        limit: { type: "integer", description: "How many listings to return, 1 to 15. Default 8." },
      },
      required: ["query"],
    },
  },
  {
    name: "get_agent",
    title: "Get agent",
    description:
      "Read one directory listing by slug, including pricing, features, related listings, and the canonical URL.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", description: "Directory slug, such as claude-code or langchain." },
      },
      required: ["slug"],
    },
  },
  {
    name: "list_categories",
    title: "List categories",
    description: "List directory categories that currently have listings, with counts and category page URLs.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "compare_agents",
    title: "Compare agents",
    description:
      "Place two to five directory listings side by side from fields already on the site. This is not a scored ranking.",
    inputSchema: {
      type: "object",
      properties: {
        slugs: {
          description: "Two to five directory slugs, as an array or a comma-separated string.",
          anyOf: [
            { type: "array", items: { type: "string" }, minItems: 2, maxItems: 5 },
            { type: "string" },
          ],
        },
      },
      required: ["slugs"],
    },
  },
  {
    name: "search_research",
    title: "Search research",
    description:
      "Search original research notes and paper breakdowns on AI Agents Info. Each hit includes the canonical research URL.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Title, abstract, or topic. At least 2 characters." },
        limit: { type: "integer", description: "How many notes to return, 1 to 10. Default 6." },
      },
      required: ["query"],
    },
  },
  {
    name: "list_free_tools",
    title: "List free tools",
    description:
      "List directory listings whose pricing includes free or open source, plus the free tools hosted on this site. Each item includes its canonical URL.",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string", description: "Optional directory category slug or title." },
        limit: { type: "integer", description: "How many directory listings to return, 1 to 50. Default 25." },
      },
    },
  },
  {
    name: "list_comparisons",
    title: "List comparisons",
    description:
      "List the sourced comparison tables on AI Agents Info, such as harnesses, coding agents, and shopping agents.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Optional filter on the comparison title, summary, or job." },
      },
    },
  },
] as const;

export const mcpInstructions =
  "Read-only MCP server for AI Agents Info (https://www.aiagentsinfo.com). Search directory listings, sourced comparisons, and research notes. Cite the url field on every result. Do not invent products, prices, scores, or listings that are not in the tool output.";

const SITE_FREE_TOOLS = [
  {
    name: "MCP server config generator",
    summary:
      "Writes the MCP config for Claude Desktop, Claude Code, Cursor, VS Code, or Windsurf, and checks a pasted file. Nothing is stored.",
    path: "/tools/mcp-config-generator",
  },
  {
    name: "robots.txt checker for AI crawlers",
    summary:
      "Fetches a host's robots.txt and reports documented AI tokens under RFC 9309. Can also write a file. Nothing the user enters is stored.",
    path: "/tools/ai-crawler-robots-txt-checker",
  },
  {
    name: "AGENTS.md generator",
    summary: "Drafts an AGENTS.md from your stack and commands. The form stays in the browser and is not stored.",
    path: "/tools/agents-md-generator",
  },
  {
    name: "AI agent cost calculator",
    summary: "Free 30-day model bill from official per-token prices. No login.",
    path: "/agent-cost-calculator",
  },
  {
    name: "AI agent ROI calculator",
    summary: "Payback months, annual ROI, and break-even task volume from numbers you type. Nothing is stored.",
    path: "/tools/ai-agent-roi-calculator",
  },
  {
    name: "Prompt and tool checker",
    summary: "Checks pasted prompts and OpenAI, Anthropic, or MCP tool JSON. The prompt is not stored.",
    path: "/agent-prompt-checker",
  },
  {
    name: "Which AI agent fits me?",
    summary: "Four questions and three directory links. No login and no rating.",
    path: "/tools/agent-picker",
  },
  {
    name: "Cursor vs Claude Code vs Codex pricing calculator",
    summary: "Seat prices plus the same token calculator. No login.",
    path: "/tools/cursor-vs-claude-code-vs-codex-pricing",
  },
] as const;

export type McpToolResult = {
  content: { type: "text"; text: string }[];
  isError?: boolean;
};

export function mcpText(data: unknown, isError = false): McpToolResult {
  return {
    content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    ...(isError ? { isError: true } : {}),
  };
}

export async function getMcpCatalog() {
  const now = Date.now();
  if (catalogCache && now - catalogCache.at < LISTING_CACHE_MS) return catalogCache;
  const [listings, research] = await Promise.all([getDirectoryListings(), getResearchDocs()]);
  catalogCache = { listings, research, at: now };
  return catalogCache;
}

export function clearMcpCache() {
  catalogCache = null;
}

function clamp(value: number | undefined, fallback: number, max: number) {
  if (value == null || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(1, Math.floor(value)));
}

function listingUrl(slug: string) {
  return absoluteUrl(`/directory/${slug}`);
}

function listingCard(listing: DirectoryListing) {
  return {
    name: listing.name,
    slug: listing.slug,
    vendor: listing.vendor,
    summary: listing.summary,
    category: listing.category,
    category_title: categoryTitle(listing.category),
    pricing: listing.pricing.map((slug) => ({ slug, title: pricingTitle(slug) })),
    pricing_summary: listing.pricingSummary || undefined,
    starting_price: listing.startingPrice || undefined,
    tags: listing.tags,
    use_cases: listing.useCases,
    last_verified: listing.lastVerified,
    website: listing.website,
    url: listingUrl(listing.slug),
  };
}

function parseSlugs(value: string[] | string) {
  const parts = Array.isArray(value) ? value : value.split(/[,\s]+/);
  return [...new Set(parts.map((slug) => slug.trim().toLowerCase()).filter(Boolean))];
}

function resolveCategory(value: string | undefined) {
  if (!value?.trim()) return { slug: undefined as string | undefined };
  const slug = canonicalCategory(value);
  if (!slug) {
    return {
      error: `Unknown category "${value}". Use list_categories for slugs such as coding-agents or ai-agents.`,
    };
  }
  return { slug };
}

export async function searchAgents(input: { query: string; category?: string; limit?: number }) {
  const query = input.query.trim();
  if (query.length < 2) {
    return mcpText(
      {
        error: "Query must be at least 2 characters.",
        url: absoluteUrl("/directory"),
      },
      true,
    );
  }
  const category = resolveCategory(input.category);
  if ("error" in category) return mcpText({ error: category.error, url: absoluteUrl("/directory") }, true);

  const { listings } = await getMcpCatalog();
  const matches = filterDirectory(listings, { q: query, category: category.slug });
  const limit = clamp(input.limit, SEARCH_LIMIT_DEFAULT, SEARCH_LIMIT_MAX);
  const items = matches.slice(0, limit).map(listingCard);
  return mcpText({
    query,
    category: category.slug ?? null,
    count: items.length,
    total_matches: matches.length,
    listings: items,
    directory_url: category.slug
      ? absoluteUrl(`/directory/category/${category.slug}`)
      : absoluteUrl("/directory"),
    source: "AI Agents Info",
  });
}

export async function getAgent(input: { slug: string }) {
  const slug = input.slug.trim().toLowerCase();
  if (!slug) return mcpText({ error: "Provide a directory slug.", url: absoluteUrl("/directory") }, true);

  const { listings } = await getMcpCatalog();
  const listing = listings.find((item) => item.slug === slug);
  if (!listing) {
    return mcpText(
      {
        error: `No listing with slug "${slug}". Try search_agents.`,
        url: absoluteUrl("/directory"),
      },
      true,
    );
  }

  const excerpt = conciseText(visibleText(listing.html), EXCERPT_MAX);
  const related = relatedListings(listing, listings, 3).map((item) => ({
    name: item.name,
    slug: item.slug,
    summary: item.summary,
    url: listingUrl(item.slug),
  }));
  const comparisons = comparisonsForListing(listing.slug).map((page) => ({
    title: page.title,
    summary: page.summary,
    url: absoluteUrl(page.path),
  }));

  return mcpText({
    ...listingCard(listing),
    features: listing.features,
    audiences: listing.audiences,
    excerpt: excerpt || undefined,
    related,
    comparisons,
    source: "AI Agents Info",
  });
}

export async function listCategories() {
  const { listings } = await getMcpCatalog();
  const categories = directoryCategories
    .map((category) => {
      const count = listings.filter((listing) => listing.category === category.slug).length;
      return {
        slug: category.slug,
        title: category.title,
        summary: categorySummaries[category.slug],
        count,
        url: absoluteUrl(`/directory/category/${category.slug}`),
      };
    })
    .filter((category) => category.count > 0);

  return mcpText({
    count: categories.length,
    total_listings: listings.length,
    categories,
    directory_url: absoluteUrl("/directory"),
    source: "AI Agents Info",
  });
}

export async function compareAgents(input: { slugs: string[] | string }) {
  const slugs = parseSlugs(input.slugs);
  if (slugs.length < 2 || slugs.length > 5) {
    return mcpText(
      {
        error: "Provide two to five directory slugs.",
        url: absoluteUrl("/best"),
      },
      true,
    );
  }

  const { listings } = await getMcpCatalog();
  const found = slugs.map((slug) => listings.find((listing) => listing.slug === slug) ?? null);
  const missing = slugs.filter((slug, index) => !found[index]);
  const present = found.filter((listing): listing is DirectoryListing => listing !== null);
  const sharedComparisons = comparisonPages
    .filter((page) => present.filter((listing) => page.rows.some((row) => row.listingSlug === listing.slug)).length >= 2)
    .map((page) => ({
      title: page.title,
      summary: page.summary,
      url: absoluteUrl(page.path),
    }));

  return mcpText({
    note: "This is a field-by-field view of listings already on the site. It is not a scored ranking.",
    missing: missing.length ? missing : undefined,
    agents: present.map((listing) => ({
      ...listingCard(listing),
      features: listing.features,
    })),
    comparison_pages: sharedComparisons,
    best_of_url: absoluteUrl("/best"),
    source: "AI Agents Info",
  });
}

export async function searchResearch(input: { query: string; limit?: number }) {
  const query = input.query.trim().toLowerCase();
  if (query.length < 2) {
    return mcpText({ error: "Query must be at least 2 characters.", url: absoluteUrl("/research") }, true);
  }

  const { research } = await getMcpCatalog();
  const matches = research.filter((doc) =>
    `${doc.title} ${doc.description} ${doc.abstract} ${doc.topics.join(" ")}`.toLowerCase().includes(query),
  );
  const limit = clamp(input.limit, RESEARCH_LIMIT_DEFAULT, RESEARCH_LIMIT_MAX);
  const items = matches.slice(0, limit).map((doc) => ({
    title: doc.title,
    slug: doc.slug,
    type: researchTypeTitle(doc.type),
    date: doc.date,
    updated: doc.updated,
    description: doc.description,
    abstract: conciseText(doc.abstract, 600),
    key_findings: doc.keyFindings.slice(0, 5),
    topics: doc.topics,
    paper_title: doc.paperTitle,
    paper_url: doc.paperUrl,
    url: absoluteUrl(`/research/${doc.slug}`),
  }));

  return mcpText({
    query: input.query.trim(),
    count: items.length,
    total_matches: matches.length,
    research: items,
    research_url: absoluteUrl("/research"),
    source: "AI Agents Info",
  });
}

export async function listFreeTools(input: { category?: string; limit?: number } = {}) {
  const category = resolveCategory(input.category);
  if ("error" in category) return mcpText({ error: category.error, url: absoluteUrl("/directory") }, true);

  const { listings } = await getMcpCatalog();
  const freeish = listings.filter((listing) => {
    if (category.slug && listing.category !== category.slug) return false;
    return listing.pricing.includes("free") || listing.pricing.includes("open-source");
  });
  const limit = clamp(input.limit, FREE_LIMIT_DEFAULT, FREE_LIMIT_MAX);

  return mcpText({
    note: "Directory listings here include a free or open-source pricing model already recorded on the site. Freemium-only products are omitted. Pricing arrays say which model applies.",
    category: category.slug ?? null,
    count: Math.min(freeish.length, limit),
    total_matches: freeish.length,
    listings: freeish.slice(0, limit).map(listingCard),
    site_tools: SITE_FREE_TOOLS.map((tool) => ({
      name: tool.name,
      summary: tool.summary,
      url: absoluteUrl(tool.path),
    })),
    directory_url: category.slug
      ? absoluteUrl(`/directory/category/${category.slug}`)
      : absoluteUrl("/directory"),
    source: "AI Agents Info",
  });
}

export async function listComparisons(input: { query?: string } = {}) {
  const query = input.query?.trim().toLowerCase() ?? "";
  const pages = comparisonPages.filter((page) => {
    if (!query) return true;
    return `${page.title} ${page.summary} ${page.heading} ${page.question}`.toLowerCase().includes(query);
  });

  return mcpText({
    count: pages.length,
    comparisons: pages.map((page) => ({
      title: page.title,
      summary: page.summary,
      question: page.question,
      kind: page.kind,
      listings: page.rows.map((row) => row.name),
      url: absoluteUrl(page.path),
    })),
    best_of_url: absoluteUrl("/best"),
    source: "AI Agents Info",
  });
}

export const mcpServerCard = {
  serverInfo: {
    name: MCP_SERVER_NAME,
    version: MCP_SERVER_VERSION,
    title: "AI Agents Info directory",
    websiteUrl: absoluteUrl(MCP_PAGE_PATH),
  },
  authentication: {
    required: false,
    schemes: [],
  },
  tools: mcpToolDocs.map((tool) => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema,
    annotations: READ_ONLY,
  })),
  resources: [] as unknown[],
  prompts: [] as unknown[],
};

export { READ_ONLY as mcpReadOnlyAnnotations };
