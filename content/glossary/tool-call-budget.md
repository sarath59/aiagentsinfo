---
term: Tool-call budget
shortDefinition: A limit on how many tool calls one agent task, turn, or day is allowed to make.
related:
  - harness
  - agent-loop
  - tool-use
  - autonomy
  - search-grounding
topics:
  - harnesses
  - task-performance
---

A **tool-call budget** is the maximum number of [tool](/glossary/tool-use) calls a [harness](/glossary/harness) will allow for one task, one turn, or one day. It is separate from the token price. A search that costs a cent still counts as one call, and the next call counts again.

Claude’s web search tool exposes the turn cap as `max_uses`. A search past it returns `max_uses_exceeded`. Google’s grounding guide, read November 11, 2026, does not print a per-request cap. It prints a project cap: 1,500 grounding requests a day on Gemini 3 and newer in the Developer API paid tier. Four searches a task is 375 tasks before that cap. The arithmetic is on [What is the best web search tool for an AI agent harness?](/blog/best-web-search-tool-for-ai-agents).

How far the loop may go before a person is asked is [autonomy](/glossary/autonomy). The cycle that spends the budget is the [agent loop](/glossary/agent-loop). A search the vendor runs inside one request is [search grounding](/glossary/search-grounding). The dollar side of a known token count is the [AI agent cost calculator](/agent-cost-calculator).
