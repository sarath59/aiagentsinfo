import { TRACKER_PATHS } from "@/lib/trackers/catalog";
import { TRACKER_REVALIDATE_SECONDS } from "@/lib/trackers/http";

export const trackerRevalidate = TRACKER_REVALIDATE_SECONDS;

export const liveTrackers = [
  {
    href: TRACKER_PATHS.downloads,
    title: "AI agent framework downloads tracker (updated daily)",
    summary:
      "Monthly PyPI and npm download counts for LangChain, LangGraph, CrewAI, AutoGen/AG2, LlamaIndex, OpenAI Agents, Pydantic AI, smolagents, Google ADK, Mastra, and related packages.",
    kicker: "Downloads",
    measures: "Package file downloads on PyPI and npm",
    sources: "pypistats.org and the npm downloads API",
  },
  {
    href: TRACKER_PATHS.agentsMd,
    title: "AGENTS.md adoption tracker (updated daily)",
    summary:
      "How many public repositories contain an AGENTS.md file, next to the October 2026 census of 6,006 of 22,854 popular repos.",
    kicker: "AGENTS.md",
    measures: "Public files named AGENTS.md, plus a dated census of popular repositories",
    sources: "GitHub code search, the AGENTS.md homepage, and arXiv:2610.31715",
  },
  {
    href: TRACKER_PATHS.stars,
    title: "AI agent framework GitHub stars tracker (updated daily)",
    summary:
      "Live stargazers_count for the repositories behind those frameworks. Stars are a bookmark, not a quality score.",
    kicker: "Stars",
    measures: "GitHub stargazers_count",
    sources: "GitHub REST API api.github.com/repos/{owner}/{repo}",
  },
] as const;

export const livingPointers = [
  {
    href: "/trackers/harnesses",
    title: "Harness comparison",
    summary: "Points at the sourced harness table. Cells stay empty without a source.",
  },
  {
    href: "/trackers/benchmarks",
    title: "Benchmark leaderboard",
    summary: "Points at public SWE-bench and Terminal-Bench scores that already have a date.",
  },
  {
    href: "/trackers/breakthroughs",
    title: "Breakthroughs timeline",
    summary: "Public agent moments, added only with a date and a source.",
  },
] as const;
