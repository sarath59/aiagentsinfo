---
title: "Gemini 4 Carbon for agent harnesses: the model id, the price after November 30, and the 400"
description: "Google opened Gemini 4 Carbon on November 10, 2026 at $2 and $10 per million tokens through November 30, then $4 and $20. The Enterprise page names gemini-4-carbon. thinking_budget returns HTTP 400."
absoluteTitle: true
takeaways:
  - "Google’s November 10, 2026 availability post prices the public Gemini 4 Carbon model at $2 per million input tokens and $10 per million output tokens. After the introductory period expires on November 30, 2026, the rates are $4 and $20. The footnote limits that sentence to the Carbon model intended for public access."
  - "The Gemini Enterprise Agent Platform model page, read November 11, 2026, lists the model id gemini-4-carbon, a unified 1,048,576-token pool that includes thinking and function calls, and an availability line for verified enterprise customers in select regions. thinking_budget and thinking_level MINIMAL return HTTP 400."
  - "google-genai 3.1.0, published November 10, adds gemini-4-carbon to the Interactions model enum. browser-use 1.0.2 pins google-genai==2.34.0. /swarm is a preview in Google Antigravity, not a generateContent parameter."
date: "2026-11-11"
updated: "2026-11-11"
category: news
topics:
  - news
  - harnesses
  - tools-saas
  - task-performance
  - how-agents-work
audience:
  - builders
  - everyone
companies:
  - google
  - gemini
  - anthropic
  - openai
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Gemini 4 Carbon access, token pool, and list price, read November 11, 2026"
  description: "Public list price from Google’s November 10, 2026 availability post. Model id, 1,048,576-token unified pool, foreground segment caps, and the HTTP 400 on thinking_budget from the Gemini Enterprise Agent Platform model page read November 11, 2026. The worked $0.25 and $0.50 figures are arithmetic on those rates for 50,000 input tokens and 15,000 output tokens. AI Agents Info did not call the API."
  isBasedOn: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/"
sources:
  - title: "Google, Gemini 4 Carbon is now available (November 10, 2026; read November 11, 2026)"
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/"
  - title: "Google, Introducing Gemini 4 Carbon (October 28, 2026; read November 11, 2026)"
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/"
  - title: "Google Cloud, Gemini 4 Carbon model page, Gemini Enterprise Agent Platform (read November 11, 2026)"
    url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/4-carbon"
  - title: "google-genai v3.1.0 (published 2026-11-10T20:13:56Z; read November 11, 2026)"
    url: "https://github.com/googleapis/python-genai/releases/tag/v3.1.0"
  - title: "AI Agents Info, Claude Fable 5.2 vs GPT-6 Astra (November 10, 2026)"
    url: "https://www.aiagentsinfo.com/blog/claude-fable-5-2-vs-gpt-6-astra"
  - title: "Gemini in the AI Agents Info directory"
    url: "https://www.aiagentsinfo.com/directory/gemini"
faq:
  - question: "What is the Gemini 4 Carbon model id?"
    answer: "gemini-4-carbon. That string is on the Gemini Enterprise Agent Platform model page, read November 11, 2026, and in the google-genai 3.1.0 release published November 10, which adds it to the Interactions model enum. A second id, gemini-4-carbon-cyber-permissive, is the cyber variant on that page and is behind an allowlist."
  - question: "How much does Gemini 4 Carbon cost?"
    answer: "Google’s November 10, 2026 availability post prices the public model at $2 per million input tokens and $10 per million output tokens, the same introductory price as Gemini 4 Argon. After the introductory period expires on November 30, 2026, the price is $4 and $20 per million tokens. The footnote says that applies to the Carbon model intended for public access. A turn of 50,000 input tokens and 15,000 output tokens is $0.25 at the introductory rate and $0.50 after it."
  - question: "Why does thinking_budget return 400 on Gemini 4 Carbon?"
    answer: "The Enterprise Agent Platform guide, read November 11, 2026, says setting thinking_budget or thinking_level to MINIMAL returns HTTP 400. Valid thinking_level values are LOW, MEDIUM, and HIGH. MEDIUM is the default on gemini-4-carbon. HIGH is the default on gemini-4-carbon-cyber-permissive."
  - question: "Is /swarm a Gemini API parameter?"
    answer: "No. Google’s November 10 post describes /swarm as a preview in Google Antigravity that turns one prompt into a team of agents. It is not a field on generateContent. The post says developers can assign Carbon to architectural design, coordination, and auditing, and pair it with faster models in parallel workspaces."
  - question: "Can browser-use 1.0.2 call Gemini 4 Carbon?"
    answer: "Not through the client that package pins. browser-use 1.0.2 requires google-genai==2.34.0. google-genai 3.1.0 is the release that adds gemini-4-carbon to the Interactions model enum. The browser-use 1.0.0 notes say google-genai stays below 3 because 3.0.0 calls the Gemini API on v1, which rejects tools."
---

Call it `gemini-4-carbon`. Google’s [November 10, 2026 availability post](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/) prices the public model at $2 per million input tokens and $10 per million output tokens through the introductory period, then $4 and $20 after that period expires on November 30, 2026. The footnote limits the sentence to the Carbon model intended for public access.

That post and the [Enterprise Agent Platform model page](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/4-carbon), read November 11, are two doors. The post says paying developers can build with the Gemini API in Google AI Studio and Android Studio, and that Google AI Ultra subscribers get Carbon in Google Antigravity, the Gemini app, and AI Mode in Search. The Enterprise page names the id, a shared 1,048,576-token pool, and an availability line for verified enterprise customers in select regions. `thinking_budget`, and `thinking_level` set to `MINIMAL`, return HTTP 400 on that page.

This desk did not get a rendered model list out of the AI Studio app shell on November 11. The id is in the Enterprise page and in the [google-genai 3.1.0](https://github.com/googleapis/python-genai/releases/tag/v3.1.0) release published at 2026-11-10T20:13:56Z, which adds `gemini-4-carbon` to the Interactions model enum. [Gemini](/directory/gemini) is the product family. The scores next to Claude Fable 5.2, from Anthropic’s November 9 table, stay on [Claude Fable 5.2 vs GPT-6 Astra](/blog/claude-fable-5-2-vs-gpt-6-astra). That page’s “not on the public list” sentence is a November 10 reading. This page is the November 11 reading of the opening.

## Which door are you actually calling?

The availability post, by Koray Kavukcuoglu and dated November 10, 2026, says Carbon is available via the API in Google AI Studio and Gemini for business for all paying developers and enterprises, at Argon’s introductory price. It also says Carbon is rolling out to all Google AI Ultra subscribers in Antigravity, the Gemini app, and AI Mode in Search. Argon, the post says, remains the choice for most software engineering and knowledge work. Carbon is for tasks that use more tokens: multi-step coding and debugging, and open-ended research, with longer verification loops.

The Enterprise page is a different contract. The text read on November 11 says Gemini 4 Carbon is available to verified enterprise customers in select regions. Supported locations on that page are `global`, `us`, and `eu` for `gemini-4-carbon`, and `global` or `us` for `gemini-4-carbon-cyber-permissive`. The cyber id is described as generally available on the platform behind an allowlist. A harness pointed at `aiplatform.googleapis.com` with `enterprise=True` is on this page’s rules. A harness pointed at the Gemini API paid tier is on the blog’s rules. Copying the id from one page onto the other account is how a 404 or a permission error shows up on Monday.

The October 28 announcement had limited the first cohort to cyber defenders and the Fairwind program. The November 10 post is the wider opening. Fairwind remains the path the post names for Carbon for cyber.

## What does a turn cost before and after November 30?

The public rates, from the November 10 post:

| Window | Input, per 1M tokens | Output, per 1M tokens | Who the footnote covers |
| --- | --- | --- | --- |
| Introductory, through November 30, 2026 | $2 | $10 | The Carbon model intended for public access |
| After the introductory period expires on November 30, 2026 | $4 | $20 | The same footnote |

Source: aiagentsinfo.com. Rates copied from Google’s November 10, 2026 availability post. The October 28 announcement prints the same $2 and $10 introductory pair, and the same $4 and $20 after the introductory period, without the November 30 date. The November 10 post is the one that dates the expiry.

Arithmetic on those rates, with no cache and no extra thinking tokens added on top: 50,000 input tokens and 15,000 output tokens cost $0.25 through November 30 and $0.50 after it. Input is `0.05 × 2 = 0.10`, then `0.05 × 4 = 0.20`. Output is `0.015 × 10 = 0.15`, then `0.015 × 20 = 0.30`. The same turn at the Fable 5.2 rates transcribed on the [November 10 comparison](/blog/claude-fable-5-2-vs-gpt-6-astra) is $1.00. That comparison’s Argon row is also $2 and $10 through November 30. Carbon’s introductory sticker matches Argon. The post’s reason to pick Carbon is the extra tokens it spends, not a lower rate.

The [AI agent cost calculator](/agent-cost-calculator) prices models from their provider pages. Use it for a Claude or OpenAI id it already lists. Use the table above for Carbon until the calculator’s rate card includes this id. Cache, batch, and priority throughput are not in the $0.25 figure. The Enterprise page says implicit caching applies to a shared prefix of 4,096 tokens or more, with durable caching on by default, and that explicit context caching is not supported. It does not print the cache price. This page will not invent one.

A procurement check is the date on the invoice, not the benchmark rank. A contract signed against the introductory rate has 19 days from November 11 to November 30. A harness that caches nothing and runs long verification loops, which is the behavior the post attributes to Carbon, pays the output rate on those tokens. After November 30 the output rate doubles, from $10 to $20 per million.

## What returns HTTP 400, and what the token pool actually counts?

The Enterprise guide, read November 11, is specific.

Valid `thinking_level` values are `LOW`, `MEDIUM`, and `HIGH`. `MEDIUM` is the default on `gemini-4-carbon`. `HIGH` is the default on `gemini-4-carbon-cyber-permissive`. Setting `thinking_budget`, or `thinking_level="MINIMAL"`, returns HTTP 400. The Interactions API wants the lowercase strings `low`, `medium`, and `high`. Sampling parameters `temperature`, `top_k`, and `top_p` are ignored. The guide says to control reasoning with `thinking_level` and format with `response_schema`.

The context window is one pool. The page says 4 Carbon has a unified 1,048,576-token limit that includes input and output, and that output includes thinking, function calls, and the final response. A single foreground segment generates up to 65,536 output tokens when streaming, or 32,768 when it is not streaming. Long decodes extend that to 1,048,576 minus the input tokens, on the Interactions API and on `GenerateContent` at `v1beta1`, using `continuation_token`. The guide’s known issue: continuation is not on `v1`. The Google Gen AI SDK uses `v1beta1` unless you set `api_version='v1'`.

Changing `model`, `system_instruction`, or function declarations on a continuation segment returns HTTP 400. Keep `thinking_level` and the built-in tools unchanged across segments. The guide says a mid-decode change to `thinking_level` or to built-in tools such as `google_search`, `code_execution`, and `url_context` is not rejected by server validation, and tells you to keep them unchanged anyway.

For a [harness](/glossary/harness), the pool is the budget. A long [agent loop](/glossary/agent-loop) spends it on the system prompt, the tool JSON, the thinking, and the tool results, then on the answer. Tool definitions that ride on every turn are why [tool JSON can cost more than the system prompt](/blog/why-tool-json-costs-more-than-your-system-prompt). A continuation that swaps the tool list to “save tokens” is the 400.

Computer use is listed as supported on the Enterprise page. That is the tool, not a second product. [Computer use](/glossary/computer-use) on other vendors is compared in [Best computer use agents](/best/computer-use-agents).

The SDK floor in the guide, for automatic continuation on the Interactions API, is `google-genai` 2.34.0 or newer on Python and `@google/genai` 2.32.0 or newer on JavaScript. Automatic continuation on `GenerateContent` is a lower floor, 2.30.1 and 2.29.1. The 3.1.0 release is the one that adds the Carbon id to the enum. Installing 2.34.0 meets the continuation floor and does not, by itself, add the November 10 enum entry.

## Why /swarm is not a flag you pass to the API

The November 10 post previews `/swarm` in Google Antigravity. One prompt becomes a team of agents you can watch. The post says to assign Carbon to architectural design, coordination, and auditing, and to pair it with faster models across parallel isolated workspaces, with adversarial verifiers on every change.

That is a product surface. It is not a field in the `generateContent` body on the Enterprise page. A harness you host still picks the model id per call. If you want Carbon on the hard step and a cheaper model on the subtasks, you write that split. Antigravity’s `/swarm` is Google’s version of the split, inside Google’s workspace. The post’s demos, a Three.js scene, a textile visualizer, a fortepiano, are illustrations of that product. They are not a benchmark score.

[Multi-agent](/glossary/multi-agent) on this site means more than one agent coordinating. `/swarm` matches that description in Google’s words. It does not match an API parameter you can pin in a lockfile.

## Which scores did Google print, and which did it only rank?

The November 10 post says Carbon ranks number one on CursorBench 4.0, Perplexity’s WANDR, and Zapier’s AutomationBench, at more than 2 times lower cost per task than the next best external model. It does not print the percentages or the dollars. The same post says Carbon ranks number two on the new Multimodal Knowledge Agent benchmark, built with Artificial Analysis, at more than 6 times lower average cost per task than the top model. It does not print that score either. A rank without the number is a claim you cannot drop into an eval table. This page leaves the cells blank.

Anthropic’s November 9 table, transcribed on the [Fable comparison](/blog/claude-fable-5-2-vs-gpt-6-astra), does print numbers, and they are Anthropic’s measurements. On that table Carbon scores 41.1 percent on FrontierCode 2.0 at Medium effort and 61.2 percent on FrontierSWE v2, behind Fable 5.2 at 49.1 and 69.9. Carbon leads AutomationBench at 53.9 percent versus Fable at 51.4. Those rows are not Google’s November 10 rank list. Do not average them.

Safety figures the November 10 post does print, as Google’s own tests:

| Check, as Google describes it | Carbon | Comparison in the same sentence |
| --- | --- | --- |
| Attack trajectories blocked, adaptive red team, ExploitBench and CyScenarioBench seeds | 99% |  |
| Per-attempt breach rate | 0.8% | 3.1% on Argon |
| Gray Swan automated cyberattack query success | 2.17% | 9.86% on Argon |
| Trajectory Labs, new universal jailbreaks | 0 | 132 hours, over 13,000 requests |
| Agentic honesty benchmark, 375 tasks | 92% passed | 70% for Argon |
| Declined to fill in missing experimental data | 98% of the time |  |
| Flagged methodological flaws | 68% of the time |  |

Source: aiagentsinfo.com. Copied from Google’s November 10, 2026 availability post. These are Google’s measurements. This page did not rerun them.

The post also repeats a 0 percent prompt-injection attack success rate on the Gray Swan indirect prompt injection benchmark, first shared two weeks earlier, and says prompt-injection robustness still needs work. Project Fortify, Google’s internal scanning benchmark, is reported at 100 percent recall on scanning and 95 percent precision on triage, plus a relative improvement of over 25 percent on Argon’s recall against open-source repositories. “Over 25 percent” is relative, and the post does not print Argon’s base rate. A buyer can treat the table as Google’s safety story. An independent eval is still the one you run.

## What should a harness do with this on November 11?

Use `gemini-4-carbon` on the account the post describes, the paid Gemini API, if that is the door you have. Use the Enterprise page’s region and allowlist rules if the client is `enterprise=True`. Set `thinking_level` to `low`, `medium`, or `high`. Leave `thinking_budget` out. Keep the tool list stable across a continuation. Budget the output rate as if the verification loop is part of the bill, because the post says Carbon spends more tokens than Argon on purpose.

Do not expect browser-use 1.0.2 to speak this id. That package pins `google-genai==2.34.0`, and the 1.0.0 notes say the 3.x client rejects tools. The pin table is [AI agent framework release November 2026](/blog/ai-agent-framework-release-november-2026). Call Carbon from a client on 3.1.0, in a separate environment, until that pin moves.

Re-check the rate on December 1. The introductory window the post names ends November 30. A harness that logged $0.25 a turn in November is a $0.50 turn on the same token counts after the expiry, before thinking tokens. The twelve-month filing calendar, which does not set this price, is [AI agents, next 12 months](/reports/ai-agents-next-12-months). Shopping checkout, which this model id does not perform by itself, is [AI shopping agents, next 6 months](/reports/ai-shopping-agents-next-6-months).

How Fable 5.2 is wired into Claude’s own SDK, including the flags that 400 there, is [How to use Claude Fable 5.2 in an agent harness](/blog/how-to-use-claude-fable-5-2-in-an-agent-harness). The [harnesses topic](/topics/harnesses) is the shelf for both.

## Frequently asked questions

### What is the Gemini 4 Carbon model id?

`gemini-4-carbon`. That string is on the Gemini Enterprise Agent Platform model page, read November 11, 2026, and in the google-genai 3.1.0 release published November 10, which adds it to the Interactions model enum. A second id, `gemini-4-carbon-cyber-permissive`, is the cyber variant on that page and is behind an allowlist.

### How much does Gemini 4 Carbon cost?

Google’s November 10, 2026 availability post prices the public model at $2 per million input tokens and $10 per million output tokens, the same introductory price as Gemini 4 Argon. After the introductory period expires on November 30, 2026, the price is $4 and $20 per million tokens. The footnote says that applies to the Carbon model intended for public access. A turn of 50,000 input tokens and 15,000 output tokens is $0.25 at the introductory rate and $0.50 after it.

### Why does thinking_budget return 400 on Gemini 4 Carbon?

The Enterprise Agent Platform guide, read November 11, 2026, says setting `thinking_budget` or `thinking_level` to `MINIMAL` returns HTTP 400. Valid `thinking_level` values are `LOW`, `MEDIUM`, and `HIGH`. `MEDIUM` is the default on `gemini-4-carbon`. `HIGH` is the default on `gemini-4-carbon-cyber-permissive`.

### Is /swarm a Gemini API parameter?

No. Google’s November 10 post describes `/swarm` as a preview in Google Antigravity that turns one prompt into a team of agents. It is not a field on `generateContent`. The post says developers can assign Carbon to architectural design, coordination, and auditing, and pair it with faster models in parallel workspaces.

### Can browser-use 1.0.2 call Gemini 4 Carbon?

Not through the client that package pins. browser-use 1.0.2 requires `google-genai==2.34.0`. google-genai 3.1.0 is the release that adds `gemini-4-carbon` to the Interactions model enum. The browser-use 1.0.0 notes say google-genai stays below 3 because 3.0.0 calls the Gemini API on v1, which rejects tools.
