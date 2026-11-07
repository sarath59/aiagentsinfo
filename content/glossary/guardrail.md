---
term: Guardrail
shortDefinition: A check that can allow, block, rewrite, or pause an agent action before it counts.
related:
  - harness
  - autonomy
  - tool-use
  - agentic-checkout
  - human-in-the-loop
  - approval-gate
topics:
  - harnesses
---

A **guardrail** is a check inside a [harness](/glossary/harness). It runs on the way in, around a [tool](/glossary/tool-use), or on the way out. The check can let the step through, block it, rewrite it, or pause it for a person.

[OpenAI’s Agents SDK](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals) uses the word for automatic checks on input, output, or tool behavior. The same page treats human review as a separate pause: the run stops until a person or a policy approves or rejects a sensitive action. [Pydantic AI’s harness docs](https://pydantic.dev/docs/ai/harness/guardrails/) describe a callable at the user prompt, at each tool call and result, and at the final output. The callable’s outcomes are allow, block, replace, retry, or — for a tool call — defer for approval.

How often a person must confirm a step is [autonomy](/glossary/autonomy). The person who approves, edits, or stops that step is a [human in the loop](/glossary/human-in-the-loop). A named stop, such as “ask before this send,” is an [approval gate](/glossary/approval-gate). A payment is one of those pauses: see [agentic checkout](/glossary/agentic-checkout). The longer guide is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness). The workplace case is [What is an AI employee?](/blog/what-is-an-ai-employee). The shopping case is [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you).
