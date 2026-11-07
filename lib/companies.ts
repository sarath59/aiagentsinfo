export type LogoTile = "light" | "dark";

export type Company = {
  slug: string;
  name: string;
  website: string;
  /** Public path under /logos. Omitted when no official asset was found. */
  logo?: string;
  /** Light tile behind dark marks. Dark tile behind light marks. */
  tile: LogoTile;
  aliases: string[];
  hosts: string[];
};

/**
 * Official marks only, saved from each company's own site or press kit.
 * Midjourney and Meta have no usable official file here, so they fall back
 * to the initial badge.
 */
export const companies: Company[] = [
  {
    slug: "openai",
    name: "OpenAI",
    website: "https://openai.com",
    logo: "/logos/openai.svg",
    tile: "light",
    aliases: ["OpenAI"],
    hosts: ["openai.com"],
  },
  {
    slug: "chatgpt",
    name: "ChatGPT",
    website: "https://chatgpt.com",
    logo: "/logos/chatgpt.svg",
    tile: "light",
    aliases: ["ChatGPT"],
    hosts: ["chatgpt.com"],
  },
  {
    slug: "anthropic",
    name: "Anthropic",
    website: "https://www.anthropic.com",
    logo: "/logos/anthropic.png",
    tile: "light",
    aliases: ["Anthropic"],
    hosts: ["anthropic.com"],
  },
  {
    slug: "claude",
    name: "Claude",
    website: "https://claude.ai",
    logo: "/logos/claude.png",
    tile: "light",
    aliases: ["Claude"],
    hosts: ["claude.ai"],
  },
  {
    slug: "google",
    name: "Google",
    website: "https://www.google.com",
    logo: "/logos/google.png",
    tile: "light",
    aliases: ["Google"],
    hosts: ["google.com"],
  },
  {
    slug: "gemini",
    name: "Gemini",
    website: "https://gemini.google.com",
    logo: "/logos/gemini.png",
    tile: "light",
    aliases: ["Gemini"],
    hosts: ["gemini.google.com"],
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    website: "https://elevenlabs.io",
    logo: "/logos/elevenlabs.svg",
    tile: "light",
    aliases: ["ElevenLabs"],
    hosts: ["elevenlabs.io"],
  },
  {
    slug: "xai",
    name: "xAI",
    website: "https://x.ai",
    logo: "/logos/xai.png",
    tile: "light",
    aliases: ["xAI"],
    hosts: ["x.ai"],
  },
  {
    slug: "grok",
    name: "Grok",
    website: "https://grok.com",
    logo: "/logos/grok.png",
    tile: "light",
    aliases: ["Grok"],
    hosts: ["grok.com"],
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    website: "https://www.microsoft.com",
    logo: "/logos/microsoft.png",
    tile: "light",
    aliases: ["Microsoft"],
    hosts: ["microsoft.com"],
  },
  {
    slug: "meta",
    name: "Meta",
    website: "https://about.meta.com",
    tile: "light",
    aliases: ["Meta"],
    hosts: ["meta.com", "about.fb.com"],
  },
  {
    slug: "github",
    name: "GitHub",
    website: "https://github.com",
    logo: "/logos/github.svg",
    tile: "light",
    aliases: ["GitHub"],
    hosts: ["github.com"],
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    website: "https://github.com/features/copilot",
    logo: "/logos/github-copilot.svg",
    tile: "dark",
    aliases: ["GitHub Copilot"],
    hosts: [],
  },
  {
    slug: "amazon",
    name: "Amazon",
    website: "https://www.amazon.com",
    logo: "/logos/amazon.png",
    tile: "light",
    aliases: ["Amazon"],
    hosts: ["amazon.com", "aboutamazon.com"],
  },
  {
    slug: "amazon-rufus",
    name: "Alexa for Shopping",
    website: "https://www.amazon.com",
    logo: "/logos/amazon.png",
    tile: "light",
    aliases: ["Alexa for Shopping", "Amazon Rufus", "Rufus"],
    hosts: [],
  },
  {
    slug: "cursor",
    name: "Cursor",
    website: "https://cursor.com",
    logo: "/logos/cursor.svg",
    tile: "light",
    aliases: ["Cursor"],
    hosts: ["cursor.com"],
  },
  {
    slug: "anysphere",
    name: "Anysphere",
    website: "https://anysphere.inc",
    logo: "/logos/anysphere.svg",
    tile: "light",
    aliases: ["Anysphere"],
    hosts: ["anysphere.inc"],
  },
  {
    slug: "crewai",
    name: "CrewAI",
    website: "https://crewai.com",
    logo: "/logos/crewai.png",
    tile: "dark",
    aliases: ["CrewAI"],
    hosts: ["crewai.com"],
  },
  {
    slug: "khan-academy",
    name: "Khan Academy",
    website: "https://www.khanacademy.org",
    logo: "/logos/khan-academy.png",
    tile: "light",
    aliases: ["Khan Academy"],
    hosts: ["khanacademy.org"],
  },
  {
    slug: "khanmigo",
    name: "Khanmigo",
    website: "https://www.khanmigo.ai",
    logo: "/logos/khanmigo.png",
    tile: "light",
    aliases: ["Khanmigo"],
    hosts: ["khanmigo.ai"],
  },
  {
    slug: "langchain",
    name: "LangChain",
    website: "https://www.langchain.com",
    logo: "/logos/langchain.png",
    tile: "light",
    aliases: ["LangChain", "LangSmith"],
    hosts: ["langchain.com"],
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    website: "https://www.midjourney.com",
    tile: "light",
    aliases: ["Midjourney"],
    hosts: ["midjourney.com"],
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    website: "https://www.perplexity.ai",
    logo: "/logos/perplexity.png",
    tile: "light",
    aliases: ["Perplexity AI", "Perplexity"],
    hosts: ["perplexity.ai"],
  },
  {
    slug: "claude-code",
    name: "Claude Code",
    website: "https://claude.com/product/claude-code",
    logo: "/logos/claude-code.svg",
    tile: "light",
    aliases: [
      "Claude Code",
      "Claude Code: Anthropic's Coding Agent – Features, Pricing, Where It Runs",
      "Claude Code vs Codex Pricing: Plans, Features, and Where It Runs",
    ],
    hosts: [],
  },
  {
    slug: "claude-agent-sdk",
    name: "Claude Agent SDK",
    website: "https://code.claude.com/docs/en/agent-sdk/overview",
    logo: "/logos/claude-code.svg",
    tile: "light",
    aliases: ["Claude Agent SDK"],
    hosts: [],
  },
  {
    slug: "codex",
    name: "Codex",
    website: "https://openai.com/codex/",
    logo: "/logos/openai.svg",
    tile: "light",
    aliases: ["Codex"],
    hosts: [],
  },
  {
    slug: "openai-agents-sdk",
    name: "OpenAI Agents SDK",
    website: "https://developers.openai.com/api/docs/guides/agents/sdk",
    logo: "/logos/openai.svg",
    tile: "light",
    aliases: ["OpenAI Agents SDK"],
    hosts: [],
  },
  {
    slug: "google-adk",
    name: "Google ADK",
    website: "https://adk.dev",
    logo: "/logos/adk.png",
    tile: "dark",
    aliases: ["Google ADK", "Agent Development Kit"],
    hosts: ["adk.dev"],
  },
  {
    slug: "microsoft-agent-framework",
    name: "Microsoft Agent Framework",
    website: "https://learn.microsoft.com/en-us/agent-framework/overview/",
    logo: "/logos/microsoft.png",
    tile: "light",
    aliases: ["Microsoft Agent Framework"],
    hosts: [],
  },
  {
    slug: "pydantic-ai",
    name: "Pydantic AI",
    website: "https://pydantic.dev/docs/ai/overview/",
    logo: "/logos/pydantic.svg",
    tile: "light",
    aliases: ["Pydantic AI"],
    hosts: ["ai.pydantic.dev"],
  },
  {
    slug: "huggingface",
    name: "Hugging Face",
    website: "https://huggingface.co",
    logo: "/logos/huggingface.svg",
    tile: "light",
    aliases: ["Hugging Face"],
    hosts: ["huggingface.co"],
  },
  {
    slug: "smolagents",
    name: "smolagents",
    website: "https://huggingface.co/docs/smolagents/index",
    logo: "/logos/huggingface.svg",
    tile: "light",
    aliases: ["smolagents"],
    hosts: [],
  },
  {
    slug: "devin",
    name: "Devin",
    website: "https://devin.ai",
    logo: "/logos/devin.png",
    tile: "dark",
    aliases: ["Devin"],
    hosts: ["devin.ai"],
  },
  {
    slug: "runway",
    name: "Runway",
    website: "https://runway.com",
    logo: "/logos/runway.png",
    tile: "light",
    aliases: ["Runway"],
    hosts: ["runway.com", "runwayml.com"],
  },
  {
    slug: "sec",
    name: "SEC",
    website: "https://www.sec.gov",
    logo: "/logos/sec.png",
    tile: "light",
    aliases: ["SEC", "Securities and Exchange Commission"],
    hosts: ["sec.gov", "investor.gov"],
  },
  {
    slug: "techcrunch",
    name: "TechCrunch",
    website: "https://techcrunch.com",
    logo: "/logos/techcrunch.png",
    tile: "light",
    aliases: ["TechCrunch"],
    hosts: ["techcrunch.com"],
  },
  {
    slug: "arxiv",
    name: "arXiv",
    website: "https://arxiv.org",
    logo: "/logos/arxiv.png",
    tile: "light",
    aliases: ["arXiv"],
    hosts: ["arxiv.org"],
  },
  {
    slug: "wikipedia",
    name: "Wikipedia",
    website: "https://www.wikipedia.org",
    logo: "/logos/wikipedia.png",
    tile: "light",
    aliases: ["Wikipedia"],
    hosts: ["wikipedia.org"],
  },
  {
    slug: "speel",
    name: "Speel",
    website: "https://www.speel.co",
    logo: "/logos/speel.png",
    tile: "dark",
    aliases: ["Speel"],
    hosts: ["speel.co"],
  },
  {
    slug: "traxy",
    name: "traxy",
    website: "https://traxy.ai",
    logo: "/logos/traxy.png",
    tile: "light",
    aliases: ["traxy"],
    hosts: ["traxy.ai"],
  },
  {
    slug: "rank-prompt",
    name: "Rank Prompt",
    website: "https://rankprompt.com",
    logo: "/logos/rank-prompt.png",
    tile: "light",
    aliases: ["Rank Prompt"],
    hosts: ["rankprompt.com"],
  },
  {
    slug: "apiframe",
    name: "Apiframe",
    website: "https://apiframe.ai",
    logo: "/logos/apiframe.png",
    tile: "light",
    aliases: ["Apiframe"],
    hosts: ["apiframe.ai"],
  },
  {
    slug: "storyshort",
    name: "StoryShort",
    website: "https://storyshort.ai",
    logo: "/logos/storyshort.png",
    tile: "dark",
    aliases: ["StoryShort"],
    hosts: ["storyshort.ai"],
  },
  {
    slug: "superx",
    name: "SuperX",
    website: "https://superx.so",
    logo: "/logos/superx.png",
    tile: "light",
    aliases: ["SuperX"],
    hosts: ["superx.so"],
  },
  {
    slug: "localrank",
    name: "LocalRank",
    website: "https://localrank.so",
    logo: "/logos/localrank.png",
    tile: "dark",
    aliases: ["LocalRank"],
    hosts: ["localrank.so"],
  },
  {
    slug: "taja",
    name: "Taja",
    website: "https://www.taja.ai",
    logo: "/logos/taja.png",
    tile: "dark",
    aliases: ["Taja"],
    hosts: ["taja.ai"],
  },
  {
    slug: "notfair",
    name: "NotFair",
    website: "https://notfair.co",
    logo: "/logos/notfair.svg",
    tile: "dark",
    aliases: ["NotFair"],
    hosts: ["notfair.co"],
  },
  {
    slug: "magicslides",
    name: "MagicSlides",
    website: "https://www.magicslides.app",
    logo: "/logos/magicslides.svg",
    tile: "light",
    aliases: ["MagicSlides"],
    hosts: ["magicslides.app"],
  },
  {
    slug: "datafast",
    name: "DataFast",
    website: "https://datafa.st",
    logo: "/logos/datafast.png",
    tile: "light",
    aliases: ["DataFast"],
    hosts: ["datafa.st"],
  },
  {
    slug: "tencent",
    name: "Tencent",
    website: "https://www.tencent.com",
    logo: "/logos/tencent.png",
    tile: "dark",
    aliases: ["Tencent"],
    hosts: ["tencent.com", "tencent.ai"],
  },
  {
    slug: "openrouter",
    name: "OpenRouter",
    website: "https://openrouter.ai",
    logo: "/logos/openrouter.png",
    tile: "dark",
    aliases: ["OpenRouter"],
    hosts: ["openrouter.ai"],
  },
  {
    slug: "thoughtworks",
    name: "Thoughtworks",
    website: "https://www.thoughtworks.com",
    logo: "/logos/thoughtworks.png",
    tile: "light",
    aliases: ["Thoughtworks"],
    hosts: ["thoughtworks.com"],
  },
];

const bySlug = new Map(companies.map((company) => [company.slug, company]));

const aliasIndex = companies
  .flatMap((company) => company.aliases.map((alias) => ({ alias, company })))
  .sort((a, b) => b.alias.length - a.alias.length);

const aliasPattern = new RegExp(
  aliasIndex.map((entry) => entry.alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
  "gi",
);

const hostIndex = companies
  .flatMap((company) => company.hosts.map((host) => ({ host: host.toLowerCase(), company })))
  .sort((a, b) => b.host.length - a.host.length);

export function companyBySlug(slug: string) {
  return bySlug.get(slug.trim().toLowerCase());
}

export function companyForName(name: string) {
  const key = name.trim().toLowerCase();
  return aliasIndex.find((entry) => entry.alias.toLowerCase() === key)?.company;
}

export function resolveCompanies(slugs: string[] | undefined): Company[] {
  if (!slugs?.length) return [];
  const seen = new Set<string>();
  const resolved: Company[] = [];
  for (const slug of slugs) {
    const key = slug.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    const known = bySlug.get(key);
    if (known) {
      resolved.push(known);
      continue;
    }
    resolved.push({
      slug: key,
      name: key
        .split("-")
        .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
        .join(" "),
      website: "",
      tile: "light",
      aliases: [],
      hosts: [],
    });
  }
  return resolved;
}

export function companyForUrl(url: string) {
  try {
    const hostname = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
    for (const entry of hostIndex) {
      if (hostname === entry.host || hostname.endsWith(`.${entry.host}`)) {
        return entry.company;
      }
    }
  } catch {
    return undefined;
  }
  return undefined;
}

export type CompanyTextPart =
  | { kind: "text"; text: string }
  | { kind: "company"; text: string; company: Company };

function aliasAt(raw: string) {
  const key = raw.toLowerCase();
  return aliasIndex.find((entry) => entry.alias.toLowerCase() === key)?.company;
}

export function splitCompanyMentions(text: string): CompanyTextPart[] {
  if (!text) return [];
  const parts: CompanyTextPart[] = [];
  let last = 0;
  for (const match of text.matchAll(aliasPattern)) {
    const start = match.index ?? 0;
    const raw = match[0];
    const before = start > 0 ? text[start - 1] : "";
    const after = text[start + raw.length] ?? "";
    if ((before && /[A-Za-z0-9]/.test(before)) || (after && /[A-Za-z0-9]/.test(after))) {
      continue;
    }
    const company = aliasAt(raw);
    if (!company) continue;
    if (start > last) parts.push({ kind: "text", text: text.slice(last, start) });
    parts.push({ kind: "company", text: raw, company });
    last = start + raw.length;
  }
  if (last < text.length) parts.push({ kind: "text", text: text.slice(last) });
  if (!parts.length) return [{ kind: "text", text }];
  return parts;
}

export function companiesInText(text: string) {
  const seen = new Set<string>();
  const found: Company[] = [];
  for (const part of splitCompanyMentions(text)) {
    if (part.kind !== "company" || seen.has(part.company.slug)) continue;
    seen.add(part.company.slug);
    found.push(part.company);
  }
  return found;
}

export function sourceMark(source: { title: string; url?: string }) {
  if (source.url) {
    const fromUrl = companyForUrl(source.url);
    if (fromUrl) return fromUrl;
  }
  return companiesInText(source.title)[0];
}
