---
term: Agent loop
shortDefinition: The cycle in which a model proposes an action, the harness runs an allowed tool, and the result comes back until a stop condition.
related:
  - agent
  - harness
  - tool-use
  - orchestration
  - human-in-the-loop
  - human-on-the-loop
topics:
  - how-agents-work
  - harnesses
---

An **agent loop** is the control loop from goal to action. The [model](/glossary/llm) proposes a step. The [harness](/glossary/harness) runs an allowed [tool](/glossary/tool-use), returns the result, and the cycle continues until the goal is met, a limit hits, or a person must approve.

[Anthropic’s Form S-1/A](https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm), filed November 2, 2026 and read November 8, 2026, defines the agent loop as the cycle in which an agent receives a task, takes an action, observes the result, and decides the next step until the task is complete. The [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/agent-loop) and [OpenAI’s Agents SDK](https://developers.openai.com/api/docs/guides/agents/running-agents), both read the same day, describe that cycle in a product runtime. A 2022 ancestor of the written form is [ReAct](/research/react-reasoning-and-acting).

The long explainer is [How do AI agents work?](/blog/how-do-ai-agents-work). The workshop around the loop is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness). Choosing the next specialist is [orchestration](/glossary/orchestration).
