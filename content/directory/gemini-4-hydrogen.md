---
name: Gemini 4 Hydrogen
title: "Gemini 4 Hydrogen: $1.50 and $7.50 per million"
absoluteTitle: true
vendor: Google
website: https://aistudio.google.com/docs/models/gemini-4-hydrogen
logo: /logos/gemini.png
summary: "Google model id gemini-4-hydrogen, generally available November 12, 2026. Paid standard price is $1.50 per million input tokens and $7.50 per million output tokens, including thinking. Four thinking levels, default high."
category: developer-tools
tags:
  - model
  - coding
  - agents
  - api
pricing:
  - free
  - paid
useCases:
  - coding
  - agents
audiences:
  - builders
features:
  - Model id gemini-4-hydrogen, GA on November 12, 2026
  - Paid standard $1.50 input and $7.50 output per million tokens, including thinking
  - Thinking levels low, medium, high (default), and xhigh
  - Unified 1,048,576-token context, with long decode up to that pool
pricingSummary: "Gemini API pricing, read November 13, 2026: paid standard is $1.50 per million input tokens and $7.50 per million output tokens, including thinking tokens. The standard free tier lists those tokens as free of charge and marks the free tier as used to improve Google's products. Batch and Flex are $0.75 and $3.75, and are not on the free tier. Priority is $2.70 and $13.50."
startingPrice: "$1.50"
billingPeriod: usage
pricingPageUrl: https://aistudio.google.com/docs/pricing
lastVerified: "2026-11-13"
newThisWeek: true
---

`gemini-4-hydrogen` is the Gemini 4 id Google opened on November 12, 2026 for everyday coding and agentic work. The [Gemini API model page](https://aistudio.google.com/docs/models/gemini-4-hydrogen) names that string, a unified 1,048,576-token context, and a default synchronous output cap of 65,536 tokens, with long decode up to 1,048,576. The [model card](https://deepmind.google/models/model-cards/gemini-4-hydrogen/), published November 12, says Hydrogen is adapted from Gemini 4 Carbon. The knowledge cutoff on that card is March 2026.

The [Gemini API pricing page](https://aistudio.google.com/docs/pricing), read November 13, 2026, prices the paid standard tier at $1.50 per million input tokens and $7.50 per million output tokens, including thinking tokens. The standard free tier on the same card lists input and output as free of charge, and the free-tier column is marked as used to improve Google’s products. Paid standard is marked no. Batch and Flex are $0.75 and $3.75 and are not on the free tier. Priority is $2.70 and $13.50. The card does not print a dated price increase.

Thinking levels on the [Enterprise Agent Platform page](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/4-hydrogen), read the same day, are `LOW`, `MEDIUM`, `HIGH` (the default), and `XHIGH`. Setting `thinking_budget`, or `thinking_level` to `MINIMAL`, returns HTTP 400. The per-token price does not change with the level. Google has not published how many thinking tokens each level emits.

Where to put the id in a [harness](/glossary/harness), next to Carbon, Argon, and Claude Fable 5.2, is [Gemini 4 Hydrogen vs Carbon vs Argon for coding agents](/blog/gemini-4-hydrogen-vs-carbon-vs-argon). [Gemini](/directory/gemini) is the product family. The Carbon id and the HTTP 400 rules that page already documented are [Gemini 4 Carbon for agent harnesses](/blog/gemini-4-carbon-for-agent-harnesses).
