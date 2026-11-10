/** Dates are the day this desk read the page, not a claim that the page was published then. */
export const AGENTS_MD_READ_ON = "2026-11-10";

export const agentsMdSources = [
  {
    name: "AGENTS.md homepage",
    url: "https://agents.md/",
    note: "Plain Markdown, no required fields, nested files, and the conflict rule.",
  },
  {
    name: "agentsmd/agents.md",
    url: "https://github.com/agentsmd/agents.md",
    note: "The spec repository. The README sample is setup commands, testing, and PR instructions.",
  },
  {
    name: "OpenAI Codex, Custom instructions with AGENTS.md",
    url: "https://learn.chatgpt.com/docs/agent-configuration/agents-md.md",
    note: "Codex reads AGENTS.md, concatenates from the root down, and stops at project_doc_max_bytes (32 KiB by default).",
  },
  {
    name: "Cursor, Rules",
    url: "https://cursor.com/docs/rules",
    note: "AGENTS.md is a plain-Markdown alternative to .cursor/rules, including nested files.",
  },
  {
    name: "GitHub Changelog, Copilot coding agent now supports AGENTS.md",
    url: "https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/",
    note: "The coding agent, not every Copilot surface. Root and nested files. Dated August 28, 2025.",
  },
  {
    name: "Aider, Specifying coding conventions",
    url: "https://aider.chat/docs/usage/conventions.html",
    note: "Aider loads a conventions file when .aider.conf.yml lists it under read.",
  },
  {
    name: "Jules docs",
    url: "https://jules.google/docs/",
    note: "Jules looks for AGENTS.md at the repository root.",
  },
] as const;
