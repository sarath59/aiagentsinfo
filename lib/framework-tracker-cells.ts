/**
 * Cells for the frameworks comparison that come from pages already on this site.
 * Stars and downloads are the November 9, 2026 tracker snapshots.
 * A null means that repository or package is not in the snapshot. It is not a zero.
 * Protocol text is the November 13, 2026 note. Cadence is the 30-day GitHub release
 * count pulled November 11, 2026, including package tags and prereleases.
 */

export type FrameworkTrackerCell = {
  stars: number | null;
  downloads: number | null;
  /** Package the download figure belongs to, when the snapshot has one. */
  downloadPackage: string | null;
  protocols: string;
  cadence: number;
};

export const FRAMEWORK_TRACKER_STARS_DAY = "2026-11-09";
export const FRAMEWORK_TRACKER_DOWNLOADS_WINDOW = "2026-10-10 through 2026-11-08";
export const FRAMEWORK_PROTOCOL_READ = "2026-11-13";
export const FRAMEWORK_CADENCE_PULL = "2026-11-11";

export const frameworkTrackerCells: Record<string, FrameworkTrackerCell> = {
  langchain: {
    stars: 149267,
    downloads: 155918257,
    downloadPackage: "langchain",
    protocols: "Not in the 13 Nov protocol note. LangGraph is.",
    cadence: 32,
  },
  langgraph: {
    stars: 44700,
    downloads: 55093579,
    downloadPackage: "langgraph",
    protocols: "MCP client. Agent Server. A2A not listed. LangGraph 1.2.21.",
    cadence: 30,
  },
  crewai: {
    stars: 60690,
    downloads: 2629769,
    downloadPackage: "crewai",
    protocols: "MCP client. A2A yes. CrewAI 1.15.41.",
    cadence: 12,
  },
  autogen: {
    stars: 61760,
    downloads: 401015,
    downloadPackage: "autogen-agentchat",
    protocols: "MCP client. A2A not listed. AutoGen 0.7.5.",
    cadence: 0,
  },
  "agent-framework": {
    stars: null,
    downloads: null,
    downloadPackage: null,
    protocols: "MCP client. A2A yes. Agent Framework 1.26.0.",
    cadence: 8,
  },
  "semantic-kernel": {
    stars: null,
    downloads: null,
    downloadPackage: null,
    protocols: "Not in the 13 Nov protocol note.",
    cadence: 3,
  },
  "openai-agents": {
    stars: 30578,
    downloads: 17426915,
    downloadPackage: "openai-agents",
    protocols: "MCP client. A2A not listed. Agents SDK 0.24.0.",
    cadence: 3,
  },
  adk: {
    stars: 22161,
    downloads: 10099299,
    downloadPackage: "google-adk",
    protocols: "MCP client and server. A2A yes. ADK 2.14.1.",
    cadence: 3,
  },
  "claude-agent-sdk": {
    stars: 8503,
    downloads: 33887233,
    downloadPackage: "claude-agent-sdk",
    protocols: "Not in the 13 Nov protocol note.",
    cadence: 15,
  },
  smolagents: {
    stars: 30279,
    downloads: 597936,
    downloadPackage: "smolagents",
    protocols: "MCP client. A2A not in 1.26.0.",
    cadence: 0,
  },
  llamaindex: {
    stars: 52859,
    downloads: 2044132,
    downloadPackage: "llama-index",
    protocols: "MCP client. MCP app. A2A not listed. LlamaIndex 0.14.25.",
    cadence: 0,
  },
  "pydantic-ai": {
    stars: 21103,
    downloads: 6575730,
    downloadPackage: "pydantic-ai",
    protocols: "MCP client and server. A2A not listed. Pydantic AI 2.68.0.",
    cadence: 15,
  },
  mastra: {
    stars: 29432,
    downloads: 9988333,
    downloadPackage: "@mastra/core",
    protocols: "MCP client and server. A2A yes. Mastra 1.83.0.",
    cadence: 7,
  },
  agno: {
    stars: null,
    downloads: null,
    downloadPackage: null,
    protocols: "MCP client. A2A listed as expose. Agno 3.2.0.",
    cadence: 10,
  },
  dspy: {
    stars: null,
    downloads: null,
    downloadPackage: null,
    protocols: "Not in the 13 Nov protocol note.",
    cadence: 2,
  },
  camel: {
    stars: null,
    downloads: null,
    downloadPackage: null,
    protocols: "Not in the 13 Nov protocol note.",
    cadence: 0,
  },
  letta: {
    stars: null,
    downloads: null,
    downloadPackage: null,
    protocols: "Not in the 13 Nov protocol note.",
    cadence: 0,
  },
  haystack: {
    stars: null,
    downloads: null,
    downloadPackage: null,
    protocols: "Not in the 13 Nov protocol note.",
    cadence: 9,
  },
  "ai-sdk": {
    stars: 27832,
    downloads: 140196706,
    downloadPackage: "ai",
    protocols: "MCP client. A2A not listed. Vercel AI SDK 7.0.171.",
    cadence: 3165,
  },
};
