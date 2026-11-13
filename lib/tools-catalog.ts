export const toolCategories = ["Build", "Choose", "Cost & Pricing", "Evaluate & Secure"] as const;

export type ToolCategory = (typeof toolCategories)[number];

export type FreeTool = {
  href: string;
  title: string;
  description: string;
  category: ToolCategory;
};

/** Last path segment for a free tool page, or null when the path is not one. */
export function toolSlugForPath(pathname: string): string | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const tool = freeTools.find((item) => item.href === path);
  if (!tool) return null;
  const slug = tool.href.split("/").filter(Boolean).pop();
  if (!slug || !/^[a-z0-9_-]{1,64}$/.test(slug)) return null;
  return slug;
}

export const freeTools: FreeTool[] = [
  {
    href: "/tools/mcp-config-generator",
    title: "MCP server config generator",
    description:
      "Write the MCP file for Claude Desktop, Claude Code, Cursor, VS Code, or Windsurf. Or paste a config and get a score. Nothing is stored.",
    category: "Build",
  },
  {
    href: "/tools/agents-md-generator",
    title: "AGENTS.md generator",
    description:
      "Draft an AGENTS.md from your stack and commands. Copy or download the Markdown. Nothing you type is stored.",
    category: "Build",
  },
  {
    href: "/tools/agent-picker",
    title: "Which AI agent fits me?",
    description: "Four questions, then three directory listings that match. No login.",
    category: "Choose",
  },
  {
    href: "/agent-cost-calculator",
    title: "AI agent cost calculator",
    description: "A 30-day token bill from official per-token prices. No login.",
    category: "Cost & Pricing",
  },
  {
    href: "/tools/ai-agent-roi-calculator",
    title: "AI agent ROI calculator",
    description: "Payback months, annual ROI, and break-even task volume from numbers you type. Nothing is stored.",
    category: "Cost & Pricing",
  },
  {
    href: "/tools/web-search-api-cost-per-agent-task",
    title: "Web search API cost per agent task",
    description:
      "Call fee plus the tokens of the tool definition and the results you keep. Prices read November 13, 2026. Nothing is stored.",
    category: "Cost & Pricing",
  },
  {
    href: "/tools/cursor-vs-claude-code-vs-codex-pricing",
    title: "Cursor vs Claude Code vs Codex pricing",
    description: "Seat prices read from the vendors' pages, plus the same token calculator.",
    category: "Cost & Pricing",
  },
  {
    href: "/agent-prompt-checker",
    title: "Prompt and tool checker",
    description:
      "Check OpenAI, Anthropic, or MCP tool JSON and estimate a 30-day bill. The prompt is not stored.",
    category: "Evaluate & Secure",
  },
  {
    href: "/tools/ai-agent-harness-evaluation-checklist",
    title: "AI agent harness evaluation checklist",
    description: "Twelve yes-or-no checks from public posts. The count stays in the browser.",
    category: "Evaluate & Secure",
  },
  {
    href: "/tools/shopping-agent-readiness-checker",
    title: "Shopping agent readiness checker",
    description: "18 checks for whether an agent can find a product, read the price, and check out. The score stays in the browser.",
    category: "Evaluate & Secure",
  },
  {
    href: "/tools/ai-crawler-robots-txt-checker",
    title: "robots.txt checker for AI crawlers",
    description:
      "See which documented AI bots may fetch a path, then download a robots.txt for the policy you pick. Nothing you enter is stored.",
    category: "Evaluate & Secure",
  },
];
