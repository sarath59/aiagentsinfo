---
term: Agent handoff
shortDefinition: A multi-agent pattern in which a specialist takes ownership of the next reply, instead of answering only as a tool the manager calls.
related:
  - orchestration
  - orchestrator
  - multi-agent
  - agent
  - harness
topics:
  - harnesses
  - how-agents-work
---

An **agent handoff** gives the next specialist ownership of that branch of the work. Control moves. The specialist’s reply is the reply for that branch.

[OpenAI’s orchestration page](https://developers.openai.com/api/docs/guides/agents/orchestration), read November 9, 2026, draws the line in those words. A handoff fits when a specialist should own the next response. An agent used as a tool fits when a manager should stay in control and call specialists as bounded capabilities. The page says to give each specialist a narrow job and to keep the handoff description short. The same page says a handoff can carry structured metadata or a filtered history, and that the exact API differs by language.

The person or policy that decides a handoff is due is the [orchestrator](/glossary/orchestrator). The broader rule is [orchestration](/glossary/orchestration). A system with more than one role is [multi-agent](/glossary/multi-agent). How a learned orchestrator chooses the next call, including pairs of calls that only help together, is [What is multi-agent orchestration?](/blog/what-is-multi-agent-orchestration). The software that runs the transfer is the [harness](/glossary/harness).
