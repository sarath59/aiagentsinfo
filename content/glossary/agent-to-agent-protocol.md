---
term: Agent2Agent protocol
shortDefinition: An open protocol for independent AI agents to discover each other and delegate work. A2A is the horizontal link. MCP is the vertical link to tools and data.
related:
  - model-context-protocol
  - multi-agent
  - agent
  - orchestration
  - tool-use
topics:
  - how-agents-work
  - harnesses
  - tools-saas
---

The **Agent2Agent protocol** (A2A) is an open standard for agents built on different frameworks, or by different vendors, to discover each other, delegate tasks, and share results. The [project home page](https://a2a-protocol.org/latest/), read November 8, 2026, says A2A was developed by Google and donated to the Linux Foundation. The [specification](https://a2a-protocol.org/latest/specification/) lists the latest released version as 1.0.0. Agents collaborate from declared capabilities. The page says they do not have to share internal memory, tools, or proprietary logic.

A2A is horizontal: one agent to another agent. The [Model Context Protocol](/glossary/model-context-protocol) is vertical: one agent to its tools and data. The [A2A and MCP page](https://a2a-protocol.org/latest/topics/a2a-and-mcp/), read the same day, says to use both. A2A’s home page says A2A does not replace MCP, and it is not the protocol an agent uses to call its own tools.

How several roles share one job is [multi-agent](/glossary/multi-agent). The long explainer is [How do AI agents work?](/blog/how-do-ai-agents-work).
