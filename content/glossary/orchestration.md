---
term: Orchestration
shortDefinition: The rules for which step, tool, or agent runs next, and who owns the answer.
related:
  - harness
  - multi-agent
  - guardrail
topics:
  - harnesses
---

**Orchestration** is the part of a [harness](/glossary/harness) that chooses the next step and passes the result along. In a single agent, that can be the loop that calls a tool and continues. In a [multi-agent](/glossary/multi-agent) setup, it also decides who owns the reply.

[OpenAI’s Agents SDK](https://developers.openai.com/api/docs/guides/agents/orchestration) describes two patterns. A handoff gives the next specialist ownership of that branch. An agent used as a tool leaves the manager in charge of the final answer. [Google’s ADK 2.0 page](https://adk.dev/2.0/) describes another form: a graph of agents, tools, and functions with explicit routes. [LangChain’s March 10, 2026 anatomy post](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness) lists orchestration as subagent spawning, handoffs, and model routing.

The longer guide is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness). A sourced comparison of those runtimes is [Best AI agent harness](/best/ai-agent-harnesses).
