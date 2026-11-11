export type Registry = "pypi" | "npm";

export type TrackedPackage = {
  id: string;
  name: string;
  package: string;
  registry: Registry;
  repo: string;
  directory?: string;
  note?: string;
};

export type TrackedRepo = {
  id: string;
  name: string;
  repo: string;
  directory?: string;
  note?: string;
};

/** Python distributions named in the install census and the user-facing tracker list. */
export const PYPI_PACKAGES: TrackedPackage[] = [
  {
    id: "langchain",
    name: "LangChain",
    package: "langchain",
    registry: "pypi",
    repo: "langchain-ai/langchain",
    directory: "langchain",
  },
  {
    id: "langgraph",
    name: "LangGraph",
    package: "langgraph",
    registry: "pypi",
    repo: "langchain-ai/langgraph",
  },
  {
    id: "crewai",
    name: "CrewAI",
    package: "crewai",
    registry: "pypi",
    repo: "crewAIInc/crewAI",
    directory: "crewai",
  },
  {
    id: "autogen-agentchat",
    name: "AutoGen AgentChat",
    package: "autogen-agentchat",
    registry: "pypi",
    repo: "microsoft/autogen",
    note: "The install name printed in the AutoGen README.",
  },
  {
    id: "ag2",
    name: "AG2",
    package: "ag2",
    registry: "pypi",
    repo: "ag2ai/ag2",
    note: "The AG2 distribution. Related to, but not the same file as, autogen-agentchat.",
  },
  {
    id: "llama-index",
    name: "LlamaIndex",
    package: "llama-index",
    registry: "pypi",
    repo: "run-llama/llama_index",
  },
  {
    id: "openai-agents",
    name: "OpenAI Agents SDK",
    package: "openai-agents",
    registry: "pypi",
    repo: "openai/openai-agents-python",
    directory: "openai-agents-sdk",
  },
  {
    id: "pydantic-ai",
    name: "Pydantic AI",
    package: "pydantic-ai",
    registry: "pypi",
    repo: "pydantic/pydantic-ai",
    directory: "pydantic-ai",
  },
  {
    id: "pydantic-ai-slim",
    name: "Pydantic AI slim",
    package: "pydantic-ai-slim",
    registry: "pypi",
    repo: "pydantic/pydantic-ai",
    directory: "pydantic-ai",
    note: "The slim distribution that pydantic-ai depends on. Not a second product.",
  },
  {
    id: "smolagents",
    name: "smolagents",
    package: "smolagents",
    registry: "pypi",
    repo: "huggingface/smolagents",
    directory: "smolagents",
  },
  {
    id: "google-adk",
    name: "Google ADK",
    package: "google-adk",
    registry: "pypi",
    repo: "google/adk-python",
    directory: "google-adk",
  },
  {
    id: "strands-agents",
    name: "Strands Agents",
    package: "strands-agents",
    registry: "pypi",
    repo: "strands-agents/harness-sdk",
  },
  {
    id: "claude-agent-sdk",
    name: "Claude Agent SDK",
    package: "claude-agent-sdk",
    registry: "pypi",
    repo: "anthropics/claude-agent-sdk-python",
    directory: "claude-agent-sdk",
  },
];

export const NPM_PACKAGES: TrackedPackage[] = [
  {
    id: "mastra",
    name: "Mastra",
    package: "@mastra/core",
    registry: "npm",
    repo: "mastra-ai/mastra",
  },
  {
    id: "langgraph-js",
    name: "LangGraph JS",
    package: "@langchain/langgraph",
    registry: "npm",
    repo: "langchain-ai/langgraphjs",
  },
  {
    id: "openai-agents-js",
    name: "OpenAI Agents JS",
    package: "@openai/agents",
    registry: "npm",
    repo: "openai/openai-agents-js",
  },
  {
    id: "google-adk-js",
    name: "Google ADK JS",
    package: "@google/adk",
    registry: "npm",
    repo: "google/adk-js",
  },
  {
    id: "ai-sdk",
    name: "Vercel AI SDK",
    package: "ai",
    registry: "npm",
    repo: "vercel/ai",
    note: "The registry describes this as a model-provider toolkit. Apps that never run an agent loop still increment this count.",
  },
];

export const STAR_REPOS: TrackedRepo[] = [
  { id: "langchain", name: "LangChain", repo: "langchain-ai/langchain", directory: "langchain" },
  { id: "langgraph", name: "LangGraph", repo: "langchain-ai/langgraph" },
  { id: "crewai", name: "CrewAI", repo: "crewAIInc/crewAI", directory: "crewai" },
  { id: "autogen", name: "AutoGen", repo: "microsoft/autogen" },
  { id: "ag2", name: "AG2", repo: "ag2ai/ag2" },
  { id: "llama-index", name: "LlamaIndex", repo: "run-llama/llama_index" },
  {
    id: "openai-agents",
    name: "OpenAI Agents SDK",
    repo: "openai/openai-agents-python",
    directory: "openai-agents-sdk",
  },
  { id: "openai-agents-js", name: "OpenAI Agents JS", repo: "openai/openai-agents-js" },
  { id: "pydantic-ai", name: "Pydantic AI", repo: "pydantic/pydantic-ai", directory: "pydantic-ai" },
  { id: "smolagents", name: "smolagents", repo: "huggingface/smolagents", directory: "smolagents" },
  { id: "google-adk", name: "Google ADK", repo: "google/adk-python", directory: "google-adk" },
  { id: "google-adk-js", name: "Google ADK JS", repo: "google/adk-js" },
  { id: "mastra", name: "Mastra", repo: "mastra-ai/mastra" },
  { id: "strands", name: "Strands Agents", repo: "strands-agents/harness-sdk" },
  {
    id: "claude-agent-sdk",
    name: "Claude Agent SDK",
    repo: "anthropics/claude-agent-sdk-python",
    directory: "claude-agent-sdk",
  },
  {
    id: "ai-sdk",
    name: "Vercel AI SDK",
    repo: "vercel/ai",
    note: "Broader than agent frameworks. Kept because the npm tracker rows the same repository.",
  },
];

export const TRACKER_PATHS = {
  index: "/trackers",
  downloads: "/trackers/downloads",
  agentsMd: "/trackers/agents-md",
  stars: "/trackers/stars",
} as const;

export function pypiStatsUrl(name: string) {
  return `https://pypistats.org/api/packages/${encodeURIComponent(name)}/overall?mirrors=false`;
}

export function pypiRecentUrl(name: string) {
  return `https://pypistats.org/api/packages/${encodeURIComponent(name)}/recent`;
}

export function npmRangeUrl(name: string, start: string, end: string) {
  return `https://api.npmjs.org/downloads/range/${start}:${end}/${name}`;
}

export function githubRepoApiUrl(repo: string) {
  return `https://api.github.com/repos/${repo}`;
}

export function githubRepoHtmlUrl(repo: string) {
  return `https://github.com/${repo}`;
}

export function githubReleasesApiUrl(repo: string) {
  return `https://api.github.com/repos/${repo}/releases?per_page=100&page=1`;
}

export function githubReleasesHtmlUrl(repo: string) {
  return `https://github.com/${repo}/releases`;
}
