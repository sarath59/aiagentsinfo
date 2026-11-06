---
term: Behavioral evaluation
shortDefinition: A test that checks one observable agent action, such as a tool call or a question, rather than a whole benchmark score.
related:
  - harness
  - benchmark
  - harness-engineering
  - agent-skill
topics:
  - harnesses
  - how-agents-work
  - research
---

A **behavioral evaluation** (also called a behavioral eval) checks one action you can see in a run. The action might be a [tool](/glossary/tool-use) call, a clarifying question, a file edit, or a test command. The check reads that step. It does not, by itself, score whether a whole project succeeded.

[Google’s September 9, 2026 post](https://developers.googleblog.com/en/the-anatomy-of-harness-engineering-how-to-evaluate-iterate-and-guard-ai-coding-agents/) treats these checks as integration tests for an [agent harness](/glossary/harness). An end-to-end [benchmark](/glossary/benchmark) still answers whether the job finished. The longer guide is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness). Designing the system those tests wrap is [harness engineering](/glossary/harness-engineering). A paper that grades entire harnesses on held-out tasks is [HarnessFlow](/research/harnessflow-mcts-harness-optimization).
