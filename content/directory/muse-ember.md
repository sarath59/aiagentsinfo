---
name: Muse Ember
title: "Muse Ember: $0.10 and $0.50 (Nov 9, 2026)"
absoluteTitle: true
vendor: Meta
website: https://dev.meta.ai/models/muse-ember
summary: "Meta's model for repeated agent steps, released November 9, 2026. Model id muse-ember-1.0. $0.10 input and $0.50 output per million tokens up to 200,000 input tokens."
category: developer-tools
tags:
  - agents
  - coding
  - api
  - models
pricing:
  - paid
useCases:
  - coding
  - agents
audiences:
  - builders
features:
  - Model id muse-ember-1.0 on the Meta Model API and in Muse Code
  - Text, image, video, audio, and PDF in; text out; 1,048,576-token context
  - Tool calling, structured output, computer use, and search grounding on the docs
pricingSummary: "API, read November 10, 2026: $0.10 per million input tokens, $0.004 cached input, and $0.50 output, for prompts up to 200,000 input tokens. Over that line: $0.30, $0.012, and $1.50. Muse Code plans on the same page are $5, $15, $50, and $200 a month. The docs say Ember is included on pay-as-you-go and every plan."
startingPrice: $0.10 per million input tokens
billingPeriod: usage
pricingPageUrl: https://dev.meta.ai/models/muse-ember
lastVerified: "2026-11-10"
newThisWeek: true
---

Muse Ember is Meta’s worker model for repeated [agent](/glossary/agent) steps, released November 9, 2026 ([research post](https://research.meta.ai/blog/muse-ember); [model page](https://dev.meta.ai/models/muse-ember)). The model id is `muse-ember-1.0`. Prompts up to 200,000 input tokens are $0.10 per million input tokens, $0.004 cached, and $0.50 output. The score table, the harness split, and the Haiku and Luna comparison are [What is Muse Ember?](/blog/what-is-muse-ember).

The [docs](https://dev.meta.ai/docs/muse-ember), read November 10, 2026, say to keep Muse Wonder or Muse Spark on the planning loop and to hand bounded subtasks to Ember. Calls go to `https://api.meta.ai/v1`. An OpenAI-compatible client changes `base_url` and the model id. How a [harness](/glossary/harness) chooses the next model is [How do AI agents work?](/blog/how-do-ai-agents-work). Shipping runtimes are [Best AI agent harness](/best/ai-agent-harnesses).
