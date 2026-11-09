---
term: Orchestrator
shortDefinition: The part of a multi-agent system that chooses which worker runs next and what earlier results that worker may see.
related:
  - orchestration
  - multi-agent
  - agent-handoff
  - harness
  - agent
topics:
  - harnesses
  - how-agents-work
---

An **orchestrator** is the part that picks the next worker and the earlier results that worker is allowed to read. The workers do the reading and the writing. The orchestrator decides the order.

Liu and Xiong, [arXiv:2611.07495](https://arxiv.org/abs/2611.07495), posted November 5, 2026 and read November 9, define agent 0 as the orchestrator and the other agents as workers. Their workers can be language models, tools, or verifiers. The orchestrator chooses a worker and a set of earlier outputs, or it stops. The long explainer is [What is multi-agent orchestration?](/blog/what-is-multi-agent-orchestration).

[OpenAI’s orchestration page](https://developers.openai.com/api/docs/guides/agents/orchestration), read November 9, 2026, uses a manager for the same seat when the manager keeps the reply and calls specialists as tools. A specialist that takes over the reply is an [agent handoff](/glossary/agent-handoff). The rule, whoever fills the seat, is [orchestration](/glossary/orchestration). The program around all of them is the [harness](/glossary/harness).
