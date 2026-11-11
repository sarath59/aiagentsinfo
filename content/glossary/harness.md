---
term: Harness
shortDefinition: The runtime around a model — loop, tools, memory, permissions, and stop conditions.
related:
  - agent
  - agent-loop
  - tool-use
  - autonomy
  - harness-engineering
  - orchestration
  - context-compaction
  - guardrail
  - behavioral-evaluation
  - checkpoint
  - agent-session
  - agent-trace
  - search-grounding
  - tool-call-budget
  - indirect-prompt-injection
topics:
  - harnesses
---

A **harness** is the software around the model weights. It feeds the goal, exposes [tools](/glossary/tool-use), stores observations, retries, and stops. Two products can share a model and behave differently because the harness differs. A limit on those calls is a [tool-call budget](/glossary/tool-call-budget). A search the vendor runs inside one request is [search grounding](/glossary/search-grounding). Instructions hiding in a fetched page are [indirect prompt injection](/glossary/indirect-prompt-injection).

Designing that software is [harness engineering](/glossary/harness-engineering). Choosing the next step or agent is [orchestration](/glossary/orchestration). A check that allows, blocks, or pauses an action is a [guardrail](/glossary/guardrail). A test of one observable action is a [behavioral evaluation](/glossary/behavioral-evaluation). The cycle it runs is the [agent loop](/glossary/agent-loop). The long explainer of that cycle is [How do AI agents work?](/blog/how-do-ai-agents-work). The longer guide to the workshop itself is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness). How to test the workshop is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness). How to stand up the tasks, sandboxes, and graders is [How to build an eval harness for AI agents](/blog/how-to-build-an-eval-harness-for-ai-agents). A sourced comparison of coding, open-source, and local runtimes is [Best AI agent harness](/best/ai-agent-harnesses). Nineteen framework release tags are [Best AI agent frameworks](/best/ai-agent-frameworks). The lockfile decision among LangGraph, CrewAI, and the OpenAI Agents SDK, with versions and bills checked November 10, 2026, is [LangGraph vs CrewAI vs OpenAI Agents SDK](/blog/langgraph-vs-crewai-vs-openai-agents-sdk). A saved step of a run is a [checkpoint](/glossary/checkpoint). The conversation sent back on the next turn is an [agent session](/glossary/agent-session). The record of one run is an [agent trace](/glossary/agent-trace). Public scores are the [November 2026 agent harness benchmark](/reports/agent-harness-benchmark-november-2026). The short pointer is the [harness comparison tracker](/trackers/harnesses). All of those sit on the [agent harnesses hub](/topics/harnesses). A shopping assistant that can pay is the same split applied to a cart: [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you).
