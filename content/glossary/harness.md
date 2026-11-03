---
term: Harness
shortDefinition: The runtime around a model — loop, tools, memory, permissions, and stop conditions.
related:
  - agent
  - tool-use
  - autonomy
  - harness-engineering
  - orchestration
  - guardrail
topics:
  - harnesses
---

A **harness** is the software around the model weights. It feeds the goal, exposes [tools](/glossary/tool-use), stores observations, retries, and stops. Two products can share a model and behave differently because the harness differs.

Designing that software is [harness engineering](/glossary/harness-engineering). Choosing the next step or agent is [orchestration](/glossary/orchestration). A check that allows, blocks, or pauses an action is a [guardrail](/glossary/guardrail). The longer guide is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness).
