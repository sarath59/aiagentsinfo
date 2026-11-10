---
term: Agent trace
shortDefinition: The record of one agent run, including model calls, tool calls, handoffs, and when each step started and ended.
related:
  - harness
  - agent-loop
  - tool-use
  - behavioral-evaluation
  - benchmark
topics:
  - harnesses
  - how-agents-work
  - task-performance
---

An **agent trace** is the record of one run of an [agent](/glossary/agent). It names the steps the [harness](/glossary/harness) took: model calls, [tool calls](/glossary/tool-use), handoffs, guardrails, and the time each step occupied. A score is a later judgment of that record, or of the environment the run left behind.

[OpenAI’s tracing page](https://openai.github.io/openai-agents-python/tracing/) for the Agents SDK, read November 10, 2026, says tracing is on by default and that a trace is one end-to-end workflow made of spans. Spans cover generations, function calls, handoffs, and guardrails. The page says organizations on a Zero Data Retention policy cannot use that tracing. [LangSmith’s pricing page](https://www.langchain.com/pricing) uses the same word for one execution of an application, and it distinguishes a base trace kept 14 days from an extended trace kept 180 days.

A trace is the raw material of a [behavioral evaluation](/glossary/behavioral-evaluation). It is not itself a [benchmark](/glossary/benchmark). How to turn a stored failure into a grader is [How to build an eval harness for AI agents](/blog/how-to-build-an-eval-harness-for-ai-agents). Where LangGraph, CrewAI, and the OpenAI Agents SDK each put that record is [LangGraph vs CrewAI vs the OpenAI Agents SDK](/blog/langgraph-vs-crewai-vs-openai-agents-sdk).

The cycle being recorded is the [agent loop](/glossary/agent-loop).
