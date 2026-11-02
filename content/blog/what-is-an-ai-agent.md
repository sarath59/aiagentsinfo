---
title: "What is an AI agent? A plain-language map"
description: "Sample explainer of what people mean by AI agents, how they differ from a chatbot, and which questions to ask next."
date: "2026-10-20"
updated: "2026-10-28"
category: explainer
topics:
  - how-agents-work
  - news
audience:
  - everyone
  - kids
  - builders
byline: "AI Agents Info Editorial"
sample: true
sources:
  - title: "Russell & Norvig, Artificial Intelligence: A Modern Approach (agent definition in AI textbooks)"
    url: "https://aima.cs.berkeley.edu/"
  - title: "OpenAI — A practical guide to building agents (public product documentation)"
    url: "https://openai.com/index/a-practical-guide-to-building-agents/"
faq:
  - question: "Is every chatbot an agent?"
    answer: "Not in the way this site uses the word. A chatbot that only replies in text is usually just a model in a conversation. An agent is typically a system that can take actions toward a goal using tools or an environment."
  - question: "Do agents think like people?"
    answer: "No. Sample note: treat 'reasoning' in product copy as a description of extra compute and structured steps, not a claim about human-like minds."
---

> **Sample article.** This page exists to demonstrate the blog template. Replace the file in `content/blog/` with a reported piece. Claims below are generic and point to public sources.

## The short version

An **[agent](/glossary/agent)** is a system that is given a goal and can take **actions** in some environment to pursue it. In today's products that environment is often a computer: a browser, a terminal, a shopping cart, a classroom tool, or an API.

A chat box that only writes text is usually **not** an agent in this sense. It can still be useful. The extra pieces — tools, a loop, memory, and stopping rules — are what people now call a [harness](/glossary/harness).

## A picture in four parts

Most public write-ups of LLM agents share the same sketch:

1. A **[language model](/glossary/llm)** that proposes the next step in language.
2. **[Tools](/glossary/tool-use)** the model is allowed to call (search, code, a browser, a store).
3. A **loop** that feeds results back until the goal is met or a limit is hit.
4. **Guardrails**: permissions, budgets, human approval, logs.

If you take away the loop and the tools, you have a chatbot. If you add them carelessly, you have a system that can take actions you did not intend. That is why harnesses and evaluation matter as much as the model.

## What “autonomy” actually means here

[Autonomy](/glossary/autonomy) on this site is a sliding scale, not a personality trait. A coding assistant that waits for you to accept a diff is barely autonomous. A shopping agent that can place an order is more so. Neither is “unsupervised” in the science-fiction sense: someone chose the tools, the limits, and the logs.

## Questions worth asking

When a product says it is an agent, ask:

- What goal is it optimizing, in one sentence?
- What actions can it take without asking?
- How do you inspect what it did?
- What [benchmark](/glossary/benchmark), if any, is being cited — and does it match the job?

Those questions travel from a classroom to a research lab. The [glossary](/glossary) and the [research desk](/research) go deeper on each one.

## Where to go next

- [How agent harnesses work](/blog/how-agent-harnesses-work) — the loop around the model.
- [Curious Kids](/for/kids) — the same idea in smaller words.
- [Directory](/directory) — products that call themselves agents, with sample listings only for now.
