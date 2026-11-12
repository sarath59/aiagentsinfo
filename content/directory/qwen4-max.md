---
name: Qwen4-Max preview
title: "Qwen4-Max preview: Token Plan, retires Nov 25"
absoluteTitle: true
vendor: Alibaba
website: https://www.alibabacloud.com/help/en/model-studio/qwen4-max-preview
summary: "First Qwen4 model id, qwen4-max-preview, opened November 11, 2026 for coding and agentic work. 1M-token context. Token Plan only. The docs say it is retired after 24:00 on November 25, 2026 (UTC+8)."
category: developer-tools
tags:
  - model
  - coding
  - agents
  - api
pricing:
  - paid
useCases:
  - coding
  - agents
audiences:
  - builders
features:
  - Model id qwen4-max-preview, billing alias qwen4.0-max-preview on QwenCloud
  - 1M-token context and 393,216-token output cap shared with thinking
  - Function calling, web search, structured outputs, OpenAI and Anthropic compatible APIs
  - Preview from November 11 to November 25, 2026 (UTC+8), then the docs say the model is retired
pricingSummary: "No per-token dollar rate is printed for this id. Access is Alibaba Token Plan credits. During the preview, QwenCloud says usage is 20% of the standard rate, and 8% from 22:00 to 08:00 (UTC+8). The cheapest Individual plan on that page is $6 a month for 20,000 credits."
startingPrice: "$6"
billingPeriod: monthly
pricingPageUrl: https://docs.qwencloud.com/token-plan/personal/token-plan-personal-overview
lastVerified: "2026-11-12"
newThisWeek: true
---

`qwen4-max-preview` is the first Qwen4 model id in Alibaba’s docs. The [Model Studio page](https://www.alibabacloud.com/help/en/model-studio/qwen4-max-preview), last updated November 11, 2026, calls it a multimodal flagship for coding, office work, frontend design, and agentic tasks. Context is 1M tokens. Maximum output is 393,216 tokens, shared by thinking and the answer. Thinking is on by default, at `reasoning_effort` `xhigh`.

Pay-as-you-go is not supported. The preview runs from 10:00 on November 11, 2026 to 24:00 on November 25, 2026 (UTC+8). Both the Alibaba Cloud page and the QwenCloud page say the model is retired after that, and that nothing changes during the window.

QwenCloud’s model-prices page, read November 12, does not list a dollar rate for this id. Token Plan Individual starts at $6 a month for 20,000 credits on the Lite plan. Preview credits are 20% of the standard rate, or 8% from 22:00 to 08:00 (UTC+8). The standard rate in credits per token is not printed there. QwenCloud’s Claude Code guide maps the Token Plan Opus slot to this id and leaves the pay-as-you-go Opus slot on `qwen3.7-max`.

Scores and list-price arithmetic against Gemini 4 Carbon ($2 and $10 per million tokens through November 30) and Claude Fable 5.2 ($8 and $40) are [Gemini 4 Carbon vs Fable 5.2: Qwen4-Max preview](/blog/gemini-4-carbon-vs-fable-5-2-qwen4-max-preview). Alibaba has not published a FrontierSWE, FrontierCode, or AutomationBench number for this preview. [Claude](/directory/claude) and [Gemini](/directory/gemini) are the other two families in that comparison. A [harness](/glossary/harness) that needs a cost per task should use an id with a rate card.
