---
term: Agent skill
shortDefinition: A folder of instructions for an agent, centered on a SKILL.md file, loaded when a task matches the skill’s description.
related:
  - harness
  - prompt
  - tool-use
  - model-context-protocol
topics:
  - harnesses
  - how-agents-work
---

An **agent skill** is a folder that teaches an agent one job. The [Agent Skills specification](https://agentskills.io/specification), read November 6, 2026, requires a `SKILL.md` file. That file starts with YAML front matter. The required fields are `name` and `description`. The name is 1 to 64 characters, lowercase letters, numbers, and hyphens, and it must match the folder name. The description is 1 to 1,024 characters and should say what the skill does and when to use it. The markdown after the front matter is the instructions. Optional folders include `scripts/`, `references/`, and `assets/`.

The [overview](https://agentskills.io/) says the format was developed by Anthropic and released as an open standard. Agents load it in stages: the name and description at startup, the full `SKILL.md` when a task matches, and other files only if the task needs them. Anthropic’s [Agent Skills page](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview), read November 6, 2026, says Claude Code discovers custom skills on the filesystem: `~/.claude/skills/` for one person and `.claude/skills/` inside a project. [LangChain’s March 10, 2026 harness post](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness) treats skills as part of the [harness](/glossary/harness), so unused tool and [MCP](/glossary/model-context-protocol) instructions do not fill the context window. A [prompt](/glossary/prompt) is the text of one model call. A skill is a file the harness can pull into a later call.

Anthropic’s own [Agent Skills docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) add product rules on top of that format, including a ban on the reserved words “anthropic” and “claude” in the name. Those rules are the product’s. The open specification is the page linked above.

NVIDIA’s November 4, 2026 post says NeMo Eval Author provides coding-agent skills for writing evaluations. The post uses the word skills for that workflow. The guide to checking whether an agent did what a skill or a tool call requires is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness).
