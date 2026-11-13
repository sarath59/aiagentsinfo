---
title: "Reduce MCP tool definition token overhead"
description: "Reduce MCP tool-definition overhead by loading full schemas only when the agent needs them. Atlassian's mcp-compressor and on-demand discovery can cut prompt tokens. Test that the agent can still call every required tool."
takeaways:
  - "Loading full MCP tool schemas at the start of every turn adds input tokens to every request. On-demand discovery loads a schema only when the agent asks for it."
  - "Atlassian's mcp-compressor replaces full tool definitions with a small proxy interface. Their post reports 70–97% token reduction; those figures are theirs, not ours."
  - "Fewer prompt tokens are not a success if task completion falls. Measure both the baseline token count and the required-tool success rate before and after."
date: "2026-11-10"
updated: "2026-11-13"
category: guide
topics:
  - how-agents-work
  - harnesses
  - tools-saas
audience:
  - builders
companies:
  - anthropic
  - atlassian
byline: "AI Agents Info Editorial"
sources:
  - title: "Atlassian, MCP compression: Preventing tool bloat in AI agents (blog post)"
    url: "https://www.atlassian.com/blog/development/mcp-compression-preventing-tool-bloat-in-ai-agents"
  - title: "Anthropic, Code execution with MCP (documentation)"
    url: "https://docs.anthropic.com/en/docs/build-with-claude/computer-use/code-execution"
  - title: "Model Context Protocol, Tools specification 2025-06-18 (read November 10, 2026)"
    url: "https://modelcontextprotocol.io/specification/2025-06-18/server/tools"
  - title: "AI Agents Info, Why tool JSON costs more than your system prompt"
    url: "https://www.aiagentsinfo.com/blog/why-tool-json-costs-more-than-your-system-prompt"
faq:
  - question: "How do you reduce MCP tool-definition token overhead?"
    answer: "Load full schemas only when the agent needs them. Replace the full tool list with a meta-tool or catalog that returns details on demand. Atlassian's mcp-compressor is one implementation. Test that the agent can still discover and call every required tool."
  - question: "What is on-demand tool discovery?"
    answer: "Instead of sending every tool schema at the start of each turn, expose a small catalog or router tool. The agent searches for a tool name, and the router returns that tool's full schema. Only loaded schemas add to the prompt."
  - question: "Does mcp-compressor work with any MCP server?"
    answer: "Atlassian's post describes it as a proxy between a client and one or more MCP servers. Compatibility depends on whether the client and server support the proxy pattern. Read their documentation for current constraints."
  - question: "How much does on-demand discovery save?"
    answer: "Atlassian reports 70–97% token reduction. That figure is from their post, not an independent measurement here. Your savings depend on how many tools your server exposes and how many the agent actually loads per turn."
---

Reduce MCP tool-definition overhead by loading full schemas only when the agent needs them, rather than sending every definition at the start. Test that the agent can still discover and call every required tool; fewer prompt tokens are not a success if task completion falls.

## MCP reduce tool overhead: on-demand discovery

On-demand discovery replaces the full tool list with a lightweight catalog or router. The agent searches for a capability, and the router returns that tool's schema. Only loaded schemas appear in the prompt.

[Atlassian's mcp-compressor](https://www.atlassian.com/blog/development/mcp-compression-preventing-tool-bloat-in-ai-agents) is an implementation of this pattern. Their blog post, published in 2026, describes replacing full tool definitions with a small proxy interface that lets the agent discover and load schemas on demand. They report 70–97% token reduction. Those figures are from their post, not an independent measurement on this site.

The trade-off is that the agent must now search before it can call. If the agent fails to find a tool, or if the proxy does not expose all servers, the task can fail in a way it would not have failed with the full list loaded up front.

## Measure tokens without losing tool access

A reproducible measurement needs:

1. **A baseline.** Load all tool schemas and record the input token count. Run a set of required-tool tasks and record the success rate.
2. **A discovery-enabled configuration.** Enable on-demand discovery (e.g., mcp-compressor or your own router). Record the new input token count under the same prompt.
3. **The same required-tool tasks.** Run the tasks again and compare the success rate. A token reduction that breaks tasks is not a reduction worth keeping.

Anthropic's [code-execution-with-MCP documentation](https://docs.anthropic.com/en/docs/build-with-claude/computer-use/code-execution) describes using MCP servers with Claude. It is an alternative context for tool-schema management, not a direct token-reduction technique, but it shows how tool configuration affects what the model sees.

The [prompt and tool checker](/agent-prompt-checker) on this site counts tool-JSON tokens. Paste the schema to get a baseline, then compare against the proxy interface.

## What this guide does not measure

This guide explains the on-demand discovery pattern and points to Atlassian's implementation. It does not:

- Measure 70–97% savings as our own result. That figure is quoted from Atlassian's post.
- Guarantee compatibility with every MCP client or server.
- Test every required-tool scenario.

Run your own measurements before adopting a proxy pattern in production.

## Related pages

- [Why tool JSON costs more than your system prompt](/blog/why-tool-json-costs-more-than-your-system-prompt) — the measurement that shows tool text can outweigh the prompt.
- [AI agent cost calculator](/agent-cost-calculator) — multiply tokens by model price.
- [Prompt and tool checker](/agent-prompt-checker) — count tool-JSON tokens and check schema validity.
- [MCP server config generator](/tools/mcp-config-generator) — write the client file, then check a config you already have. The paste is not stored.
- [Model Context Protocol glossary](/glossary/model-context-protocol) — what MCP is.
