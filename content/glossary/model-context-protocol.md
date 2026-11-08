---
term: Model Context Protocol
shortDefinition: An open protocol for connecting an AI application to external tools, data, and workflows. The specification’s current version, read November 8, 2026, is 2026-07-28.
related:
  - agent-to-agent-protocol
  - tool-use
  - harness
  - agent
  - agent-skill
topics:
  - harnesses
  - how-agents-work
  - tools-saas
---

The **Model Context Protocol** (MCP) is an open protocol for connecting an AI application to external systems. The [introductory page](https://modelcontextprotocol.io/docs/getting-started/intro), read November 8, 2026, describes it as a standard way for applications such as Claude or ChatGPT to reach data sources, tools, and workflows. The same page compares MCP to a USB-C port: one connection pattern, many devices. It names support in Claude, ChatGPT, Visual Studio Code, Cursor, and MCPJam.

The [specification for revision 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28) says MCP uses JSON-RPC so hosts, clients, and servers can share context, expose tools, and build workflows. Servers can offer resources, prompts, and tools. The [versioning page](https://modelcontextprotocol.io/docs/learn/versioning) for that revision says the current protocol version is 2026-07-28, and that a version string marks the last date of a backwards-incompatible change.

MCP is a [tool use](/glossary/tool-use) path. The [harness](/glossary/harness) decides which servers are connected and what the [agent](/glossary/agent) may call. A skill served over MCP is a separate extension of the protocol. The file format those skills use is an [agent skill](/glossary/agent-skill). The [Agent2Agent protocol](/glossary/agent-to-agent-protocol) is the complementary standard for one independent agent talking to another. The A2A project’s own comparison, read November 8, 2026, calls MCP the vertical link to tools and data. The versioning page still named 2026-07-28 as the current protocol version on that date. The evaluation guide, including NVIDIA’s November 4, 2026 example of an assistant connected through MCP, is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness). The loop that calls these tools is [How do AI agents work?](/blog/how-do-ai-agents-work).
