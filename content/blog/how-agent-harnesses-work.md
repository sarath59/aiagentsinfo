---
title: "How agent harnesses work (a builder's sketch)"
description: "Sample guide to the loop around a language model: tools, memory, permissions, and evaluation — without pretending one stack is the winner."
date: "2026-10-22"
updated: "2026-10-30"
category: guide
topics:
  - harnesses
  - how-agents-work
  - task-performance
audience:
  - builders
  - research
byline: "AI Agents Info Editorial"
sample: true
sources:
  - title: "Yao et al., ReAct: Synergizing Reasoning and Acting in Language Models"
    url: "https://arxiv.org/abs/2210.03629"
  - title: "Anthropic — Building effective agents (public engineering article)"
    url: "https://www.anthropic.com/engineering/building-effective-agents"
faq:
  - question: "Is a harness the same as a framework?"
    answer: "Not exactly. A framework is a library you import. A harness is the runtime pattern: the loop, the tools, the state, and the limits. Some frameworks encode a harness; you can also write one in a few hundred lines."
---

> **Sample article.** Template demonstration for builders. Swap this file for a reported guide. Links below are to public papers and vendor engineering posts.

## Why this word showed up

Once teams could call tools from a [language model](/glossary/llm), they discovered the model is not the product. The product is the **[harness](/glossary/harness)**: the loop that proposes an action, executes it, observes the result, and decides whether to continue.

Public patterns (ReAct-style thought-then-act, planner/worker splits, computer-use loops) differ in packing, not in the core job.

## The loop, without mystique

A minimal harness looks like this:

1. Load the goal, the tool list, and any memory you are willing to trust.
2. Ask the model for the next action (a tool call, a plan, or a final answer).
3. Run that action in a sandbox you control.
4. Append the observation.
5. Stop on success, on a budget, on a policy violation, or when a human takes over.

Everything controversial lives in step 3 and 5: filesystem access, browsers, payments, email. The [directory](/directory/category/agent-frameworks) lists sample frameworks that implement variations of this loop.

## Memory is a product decision

“Memory” is not one feature. It is at least three:

- **Working context** inside the [context window](/glossary/context-window).
- **Retrieved notes** ([RAG](/glossary/rag) over docs or prior traces).
- **Durable state** (tickets, carts, git branches) owned by your app, not the model.

Mixing them up is how agents repeat themselves or leak data. Keep durable state in systems you already audit.

## Evaluation before aesthetics

A pretty trace UI does not tell you if the agent is useful. Pair every harness with:

- a frozen set of tasks,
- an explicit [benchmark](/glossary/benchmark) or an internal suite,
- a human review sample,
- cost and latency budgets.

See the [benchmark leaderboard stub](/trackers/benchmarks) and the sample research note on [reading agent benchmarks](/research/reading-agent-benchmarks).

## A small reading list

- Our sample breakdown of [ReAct](/research/react-reasoning-and-acting).
- The [harness comparison table](/trackers/harnesses) (structure only in v1).
- Glossary: [tool use](/glossary/tool-use), [multi-agent](/glossary/multi-agent), [autonomy](/glossary/autonomy).
