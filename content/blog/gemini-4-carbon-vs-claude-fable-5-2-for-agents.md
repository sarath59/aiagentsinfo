---
title: "Gemini 4 Carbon vs Claude Fable 5.2 for agents: $0.25 a turn, or $1.00"
description: "A 50,000-in, 15,000-out agent turn is $0.25 on Gemini 4 Carbon through November 30, 2026, and $1.00 on Claude Fable 5.2. Carbon leads AutomationBench, 53.9% to 51.4%. Fable leads FrontierSWE v2, 69.9% to 61.2%."
absoluteTitle: true
takeaways:
  - "At the list prices read November 12, 2026, 50,000 input tokens and 15,000 output tokens cost $0.25 on gemini-4-carbon through November 30 and $0.50 from December 1. The same tokens cost $1.00 on claude-fable-5-2. Both of Carbon’s rates are exactly four times cheaper than Fable’s until November 30, then exactly half."
  - "On Anthropic’s November 9 table, the only vendor table that scores Fable 5.2 and Carbon on the same rows, Carbon leads AutomationBench at 53.9% to 51.4%. Fable leads FrontierCode 2.0 (49.1% at Xhigh vs 41.1% at Medium), FrontierSWE v2 (69.9% vs 61.2%), and OSWorld 2.1 (89.3% vs 81.5%)."
  - "Google’s DeepMind table, read the same day, still compares Carbon with Claude Fable 5.1, not Fable 5.2. Its Terminal-Bench 4.0 cell is 65.2% for Carbon and 52.0% for Fable 5.1. Neither page prints a SWE-bench Verified score or a tau-bench score for this pair."
date: "2026-11-12"
updated: "2026-11-12"
category: guide
topics:
  - harnesses
  - task-performance
  - how-agents-work
  - tools-saas
audience:
  - builders
  - everyone
companies:
  - google
  - gemini
  - anthropic
  - claude
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Equal-token agent bills and shared official scores, Gemini 4 Carbon vs Claude Fable 5.2, read November 12, 2026"
  description: "List prices copied on November 12, 2026 from the Gemini API pricing page and Anthropic’s pricing page. The $0.25, $0.50, $1.00, $1.50, $3.00, $6.00, $0.193, $0.386, and $0.766 figures are arithmetic on those rates for the token counts stated on the page. Shared scores are copied from Anthropic’s November 9, 2026 announcement. Google’s DeepMind table is quoted separately because its Claude column is Fable 5.1. AI Agents Info did not call either API and did not rerun the evals."
  isBasedOn: "https://aistudio.google.com/docs/pricing"
sources:
  - title: "Gemini Developer API pricing (read November 12, 2026)"
    url: "https://aistudio.google.com/docs/pricing"
  - title: "Anthropic, Claude API pricing (read November 12, 2026)"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
  - title: "Anthropic, Claude Fable 5.2 model overview (read November 12, 2026)"
    url: "https://platform.claude.com/docs/en/models/fable-5-2/overview"
  - title: "Anthropic, Adaptive thinking (read November 12, 2026)"
    url: "https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking"
  - title: "Anthropic, Introducing Claude Fable 5.2 and Claude Mythos 5.2 (November 9, 2026; read November 12, 2026)"
    url: "https://www.anthropic.com/claude-fable-and-mythos-5-2"
  - title: "Google, Gemini 4 Carbon is now available (November 10, 2026; read November 12, 2026)"
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/"
  - title: "Google, Introducing Gemini 4 Carbon (October 28, 2026; read November 12, 2026)"
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/"
  - title: "Google DeepMind, Gemini performance table (read November 12, 2026)"
    url: "https://deepmind.google/models/gemini/"
  - title: "Google Cloud, Gemini 4 Carbon model page (read November 12, 2026; page says last updated 2026-11-11 UTC)"
    url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/4-carbon"
faq:
  - question: "Should an agent harness call Gemini 4 Carbon or Claude Fable 5.2?"
    answer: "Call gemini-4-carbon when the job is a business-workflow agent or the bill is the constraint. A turn of 50,000 input tokens and 15,000 output tokens is $0.25 through November 30, 2026 and $0.50 from December 1. Call claude-fable-5-2 when the job is a coding agent or a computer-use loop and your eval needs the gap on Anthropic’s November 9 table. That same turn is $1.00. Anthropic still says to start most coding on Claude Opus 5.5 before moving up to Fable."
  - question: "How much does Gemini 4 Carbon cost compared with Claude Fable 5.2?"
    answer: "On November 12, 2026 the Gemini API pricing page lists gemini-4-carbon at $2 per million input tokens and $10 per million output tokens through November 30, then $4 and $20. Anthropic’s pricing page lists Claude Fable 5.2 at $8 and $40 at every length up to 1 million tokens. Until November 30, Carbon’s input rate and output rate are each one quarter of Fable’s. From December 1 they are each half."
  - question: "What is the context window for Gemini 4 Carbon and Claude Fable 5.2?"
    answer: "The Claude Fable 5.2 overview lists 1 million tokens of context and 128,000 tokens of max output. The Gemini Enterprise Agent Platform page lists a unified 1,048,576-token pool for gemini-4-carbon that includes input and output, and says output includes thinking, function calls, and the final response. The Gemini API pricing page describes long-decode generation up to 1M tokens. A single foreground segment on the Enterprise page generates up to 65,536 output tokens when streaming, or 32,768 when it is not."
  - question: "Does Gemini 4 Carbon beat Claude Fable 5.2 on Terminal-Bench or SWE-bench?"
    answer: "Neither vendor page read on November 12, 2026 prints a SWE-bench Verified score or a tau-bench score for this pair. Google’s DeepMind table prints Terminal-Bench 4.0 at 65.2% for Carbon and 52.0% for Claude Fable 5.1, not Fable 5.2. Anthropic’s November 9 table has no Terminal-Bench 4.0 row. On the agentic coding row both pages share a number for, FrontierSWE, Anthropic prints 69.9% for Fable 5.2 and 61.2% for Carbon."
  - question: "What request returns HTTP 400 on each model?"
    answer: "On the Enterprise page for Gemini 4 Carbon, setting thinking_budget or thinking_level to MINIMAL returns HTTP 400. Valid thinking levels are LOW, MEDIUM, and HIGH. On the Claude Fable 5.2 overview, forced tool use with tool_choice any or tool returns HTTP 400, and custom temperature, top_p, and top_k return HTTP 400. Adaptive thinking stays on."
---

Put `gemini-4-carbon` in the [harness](/glossary/harness) when the task is a business workflow or the invoice is the point. Put `claude-fable-5-2` in it when the task is a coding agent or a computer-use loop and you have already measured that a cheaper Claude misses the bar. A turn of 50,000 input tokens and 15,000 output tokens is **$0.25** on Carbon through November 30, 2026, **$0.50** from December 1, and **$1.00** on Fable 5.2.

Those three bills are list-price arithmetic on the pages read November 12, 2026. They hold the token counts equal. They are not a measured cost per solved task. [Google’s November 10 availability post](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/) says Carbon spends more tokens than Gemini 4 Argon on purpose. A harness that lets it do that can spend part of the sticker gap before the task is done.

## Which model should the harness call?

Call Carbon for the workflow row and the bill. Call Fable for the coding and computer-use rows, after Opus 5.5 has already missed your eval.

| Decision | Gemini 4 Carbon | Claude Fable 5.2 |
| --- | --- | --- |
| Call this id when | The job looks like AutomationBench, or the bill is the constraint | The job is coding or computer use, and your eval needs the gap below |
| API id | `gemini-4-carbon` | `claude-fable-5-2` |
| Input / output, USD per 1M tokens | $2 / $10 through November 30, 2026. $4 / $20 from December 1 | $8 / $40 at every length up to 1 million tokens |
| 50,000 input and 15,000 output, no cache | $0.25, then $0.50 | $1.00 |
| Context the vendor prints | 1,048,576 unified tokens on the Enterprise page, counting thinking and function calls. Pricing page: long-decode up to 1M tokens | 1,000,000 tokens. Max output 128,000 |
| Lead on Anthropic’s November 9 table | AutomationBench, 53.9% to 51.4% | FrontierSWE v2, 69.9% to 61.2%. OSWorld 2.1, 89.3% to 81.5% |
| Do not send | `thinking_budget`, or `thinking_level` `MINIMAL`. The Enterprise page says both return HTTP 400 | `tool_choice` `any` or `tool`. The overview says both return HTTP 400 |

Source: aiagentsinfo.com. Prices from the [Gemini API pricing page](https://aistudio.google.com/docs/pricing) and [Anthropic’s pricing page](https://platform.claude.com/docs/en/about-claude/pricing), read November 12, 2026. Scores from [Anthropic’s November 9 announcement](https://www.anthropic.com/claude-fable-and-mythos-5-2), read the same day. Context and the 400s from the [Fable overview](https://platform.claude.com/docs/en/models/fable-5-2/overview) and the [Enterprise model page](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/4-carbon).

[Anthropic’s announcement](https://www.anthropic.com/claude-fable-and-mythos-5-2) still says to start most coding and knowledge work on Claude Opus 5.5, at $4 and $20, and to move up to Fable when the job is harder. If Opus is available to the harness, it is the first coding id to try. This page is the choice after that, between the two models people are comparing this week. The four-way table that also includes GPT-6 Astra is [Claude Fable 5.2 vs GPT-6 Astra](/blog/claude-fable-5-2-vs-gpt-6-astra). How to set the Fable id, effort, and cache is [How to use Claude Fable 5.2 in an agent harness](/blog/how-to-use-claude-fable-5-2-in-an-agent-harness). The Carbon id, the regions, and the continuation rules are [Gemini 4 Carbon for agent harnesses](/blog/gemini-4-carbon-for-agent-harnesses).

Google’s November 10 post says Argon remains the model for most software engineering, and that Carbon is for tasks that use more tokens. Argon’s paid standard rate on the same pricing page is the same $2 and $10, then $4 and $20. Choosing Carbon over Argon is not a way to pay less per token. It is a way to buy the model Google says will spend more of them.

## What does one agent turn cost on November 12?

$0.25 on Carbon until November 30, $0.50 after that, and $1.00 on Fable, for 50,000 input tokens and 15,000 output tokens with no cache and no grounding.

| Model and window | Input, per 1M | Output, per 1M | Cache read, per 1M | This turn |
| --- | --- | --- | --- | --- |
| Gemini 4 Carbon, through November 30, 2026 | $2 | $10, including thinking | $0.10, implicit only | $0.25 |
| Gemini 4 Carbon, from December 1, 2026 | $4 | $20, including thinking | $0.20, implicit only | $0.50 |
| Claude Fable 5.2, any length up to 1M | $8 | $40 | $0.20 | $1.00 |

Source: aiagentsinfo.com. Rates copied November 12, 2026. Carbon’s output line is the pricing page’s phrase, “including thinking tokens.” Fable’s output line is the base output price. [Anthropic’s adaptive-thinking page](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking) says tokens Claude uses while thinking are billed as output tokens.

The arithmetic, in order. Carbon through November 30: `50,000 / 1,000,000 × 2 = 0.10`, and `15,000 / 1,000,000 × 10 = 0.15`. Sum, $0.25. From December 1 the same steps are $0.20 and $0.30, sum $0.50. Fable: `50,000 / 1,000,000 × 8 = 0.40`, and `15,000 / 1,000,000 × 40 = 0.60`. Sum, $1.00.

Until November 30, Carbon’s input price is one quarter of Fable’s and Carbon’s output price is one quarter of Fable’s. Any mix of input and output, with no cache, no batch, no fast mode, and no search grounding, is a 4× bill. From December 1 both rates are half of Fable’s, so the same mix is a 2× bill. The ratio does not depend on this particular 50,000 and 15,000. The dollar amounts do.

Carbon is not on the free tier. The pricing page says every token is counted, including thinking tokens and, when grounding is on, internal tool instructions and function declarations. A [tool call](/glossary/tool-use) definition that rides on every turn is input. Search grounding is a separate meter: 5,000 free search requests a month, shared across Gemini 3 and newer models, then $14 per 1,000 requests, with a daily cap of 1,500. This turn does not include that fee. Fable’s web search, on Anthropic’s pricing page, is $10 per 1,000 searches plus the tokens. This turn does not include that fee either.

Fable’s other published rates, same page: 5-minute cache writes $10 per million, 1-hour cache writes $16, batch $4 and $20, fast mode $16 and $80. Fast mode is not available with the Batch API. Carbon’s pricing card does not print a batch rate or a fast-mode rate. This page does not invent them. The [AI agent cost calculator](/agent-cost-calculator) uses the standard rates and leaves cache, batch, and fast mode out.

The last day of Carbon’s introductory rate is November 30. That is 18 days after November 12. A harness that logged $0.25 on this token shape in November logs $0.50 on December 1, before any extra thinking.

## What does a six-turn task cost when every turn is that size?

$1.50 on Carbon through November 30, $3.00 from December 1, and $6.00 on Fable.

Six identical turns are `6 × $0.25`, `6 × $0.50`, and `6 × $1.00`. The example is a flat task, not a growing transcript. A real [agent loop](/glossary/agent-loop) resends earlier turns, so later requests are larger than the first. Use the flat task to price a shape you already measured. Do not treat $1.50 as the cost of a six-turn trace you have not counted.

Fable’s thinking page adds a second place those tokens can land. Thinking generated on a turn is output. Thinking blocks from earlier turns that remain in the next request are input. The $6.00 figure already counts whatever you placed in the 50,000 and the 15,000. It does not add a hidden third line. If your harness keeps prior thinking, those tokens are inside the next input count, and the input rate is $8 per million.

Carbon’s pricing page puts thinking in the output price. The Enterprise page puts thinking, function calls, and the final response inside one 1,048,576-token pool. A long verification loop spends that pool. It does not get a separate free budget.

## What changes when a 30,000-token prefix is cached?

The steady-state turn falls to $0.193 on Carbon through November 30, $0.386 from December 1, and $0.766 on Fable. Output still dominates the gap.

Assume 30,000 tokens billed at the cache-read price, 20,000 tokens billed at the normal input price, and 15,000 output tokens. No grounding. No fast mode.

| Piece | Carbon through Nov 30 | Carbon from Dec 1 | Fable 5.2 |
| --- | --- | --- | --- |
| 30,000 cache-read tokens | $0.003 | $0.006 | $0.006 |
| 20,000 uncached input | $0.040 | $0.080 | $0.160 |
| 15,000 output | $0.150 | $0.300 | $0.600 |
| Turn | $0.193 | $0.386 | $0.766 |

Source: aiagentsinfo.com. Arithmetic on the cache and token rates in the price table above. This is the bill if those 30,000 tokens are charged at the published cache price. It is not a trace from either API.

Carbon’s pricing page says context caching is implicit only and that explicit caching is not supported. The Enterprise page says implicit caching applies to a shared prefix of 4,096 tokens or more. The 4,096 figure is on the Enterprise page, not on the public pricing card. A 30,000-token prefix is above 4,096. The public card does not promise that the Gemini API applies the same cutoff.

Fable lets the harness place the cache breakpoint. The first write of those 30,000 tokens to the 5-minute cache is `30,000 / 1,000,000 × 10 = $0.30`. Later reads of that prefix are the $0.006 line. Anthropic’s thinking page says changing the effort level between requests invalidates cache breakpoints, because the effort value is rendered into the prompt. A harness that sweeps `low` through `xhigh` on one cached prefix pays the write again each time the effort changes.

Cache also breaks the clean 4× ratio. Through November 30, Fable’s cache read is $0.20 and Carbon’s is $0.10, which is 2×, not 4×. Output is still 4×. In the table above, output is most of both bills, so the turn is 3.97 times the money until December 1 (`0.766 ÷ 0.193`) and 1.98 times after it (`0.766 ÷ 0.386`).

## Which official agent scores include both names?

Carbon leads one shared row. Fable leads the coding, computer-use, and science rows on the same Anthropic table. The FrontierCode cells are not the same effort.

Anthropic’s November 9 table is the only vendor table read on November 12 that puts Fable 5.2 and Gemini 4 Carbon in the same columns. The announcement says scores are the highest available effort unless a cell says otherwise, and that Fable, Fable 5.1, and Opus scores are with safeguards on unless noted.

| Benchmark, as Anthropic names it | Claude Fable 5.2 | Gemini 4 Carbon | What the cell is |
| --- | --- | --- | --- |
| FrontierCode 2.0, agentic coding | 49.1% | 41.1% | Fable at Xhigh. Carbon at Medium |
| FrontierSWE v2, agentic coding | 69.9% | 61.2% | Highest available effort |
| AutomationBench, business workflows | 51.4% | 53.9% | Carbon leads by 2.5 points |
| Terminal-Bench-Science 0.1 | 74.6% | 64.8% | Agentic scientific research |
| OSWorld 2.1, offline set, partial | 89.3% | 81.5% | Computer use |
| Chartography, no tools | 73.4% | 72.5% | Not a tool-using row |
| AA-Briefcase v1.1, rubric | 66.1% | 61.8% | Knowledge work |
| AA-Briefcase v1.1, Elo | 1785 | 1611 | Opus 5.5 leads this column at 1800, on the same table |

Source: aiagentsinfo.com. Copied from Anthropic’s November 9, 2026 announcement, read November 12. WANDR, RoboDojo, Remote Labor Index, and Humanity’s Last Exam with tools have a Fable cell and a blank Carbon cell on that table. They are left out here so a blank is not read as a zero.

FrontierCode is the row where the effort labels differ. Fable’s 49.1% is marked Xhigh. Carbon’s 41.1% is marked Medium. The announcement says that, in Anthropic’s testing, Fable at High effort scored 45.3% on FrontierCode, about level with Opus 5.5’s best 45.5%, for roughly half the cost per task. It does not print the token totals, and it does not print a Carbon cost per task. Do not turn the 49.1 and the 41.1 into “8 points at the same setting.”

AutomationBench is the row a business-workflow harness can actually use. Carbon 53.9%, Fable 51.4%. Google’s November 10 post says Carbon ranks first on Zapier’s AutomationBench, at more than 2 times lower cost per task than the next best external model. The post does not print the percentage or the dollars. The 53.9% and the 51.4% are Anthropic’s cells. The “more than 2 times” sentence is Google’s, without a denominator. Keep them apart.

OSWorld 2.1 is the computer-use row: Fable 89.3%, Carbon 81.5%. [Computer use](/glossary/computer-use) is the loop that looks at a screen and asks for a click or a key. Chartography is close, and the announcement labels it “no tools.” It is not the row that decides a tool-calling harness.

Neither page read on November 12 prints SWE-bench Verified or tau-bench for this pair. The public boards this site copies for harnesses, which are a different object from a vendor model card, are the [November 2026 agent harness benchmark](/reports/agent-harness-benchmark-november-2026). If a model is missing there, it was missing from those official files.

## Which official scores cannot be sorted against Fable 5.2?

Google’s DeepMind table compares Carbon with Claude Fable 5.1. Terminal-Bench 4.0 on that table is not a Fable 5.2 result.

Read November 12, the [DeepMind performance table](https://deepmind.google/models/gemini/) has columns for Gemini 4 Carbon, Gemini 4 Argon, GPT-6 Astra, Claude Opus 5.5, and Claude Fable 5.1. There is no Fable 5.2 column. The page points at a methodology URL for Carbon. This desk did not re-run those tasks.

| Benchmark, as the DeepMind table names it | Gemini 4 Carbon | Claude Fable 5.1 | Note on the table |
| --- | --- | --- | --- |
| Terminal-Bench 4.0 (AA) | 65.2% | 52.0% | Not Fable 5.2 |
| FrontierSWE 2 | 61.2% | 56.3% | Carbon’s 61.2% matches Anthropic’s Carbon cell |
| SWE-sweep | 9.6% | 2.9% | No Fable 5.2 cell |
| OSWorld-2.1, offline subset | 81.5% | 76.8% | Carbon’s 81.5% matches Anthropic |
| AutomationBench, Zapier | 53.9% | 31.4% | The 31.4% is Fable 5.1, not Fable 5.2’s 51.4% |
| Terminal-Bench-Science 0.1 (AA) | 64.8% | 43.3% | Anthropic prints Fable 5.2 at 74.6% and Carbon at 64.8% |

Source: aiagentsinfo.com. Copied from the DeepMind Gemini table, read November 12, 2026. Astra’s cells on that table are not repeated here. Where a Carbon cell matches Anthropic’s later table exactly, both pages are printing the same Carbon figure. Where the Claude column is Fable 5.1, it is the wrong model for this comparison.

Two rank sentences from Google do not become cells. The November 10 post says Carbon ranks first on CursorBench 4.0, Perplexity’s WANDR, and Zapier’s AutomationBench, at more than 2 times lower cost per task than the next best external model. It says Carbon ranks second on a Multimodal Knowledge Agent benchmark, at more than 6 times lower average cost per task than the top model. It does not print those percentages or those dollars. Anthropic prints WANDR at 82.1% for Fable 5.2 and leaves Carbon blank. A rank without a number, next to a blank cell, is not a winner.

The October 28 announcement prints cybersecurity scores for Carbon, evaluated without guardrails: SEC-bench Pro 88.2%, ExploitGym 54.8%, CWE-bench 71.0%. Those rows are not on Anthropic’s Fable 5.2 table. Fable’s safeguards block most cybersecurity work. The model that clears that program is Mythos 5.2, at the same $8 and $40 price, and it is not the id a general coding harness calls. What Fable is, including that split, is [What is Claude Fable 5.2?](/blog/what-is-claude-fable-5-2).

## What does the harness have to send?

Carbon wants a thinking level. Fable wants an effort. Each API rejects a control the other one taught people to send.

| Control | Gemini 4 Carbon | Claude Fable 5.2 |
| --- | --- | --- |
| Id | `gemini-4-carbon` | `claude-fable-5-2` |
| Thinking control | `thinking_level` `LOW`, `MEDIUM`, or `HIGH`. Default `MEDIUM` on this id | Adaptive thinking, always on. Effort `low`, `medium`, `high`, `xhigh`, `max`. API default `high` |
| What returns HTTP 400 | `thinking_budget`, or `thinking_level` `MINIMAL` | `tool_choice` `any` or `tool`. Also `temperature`, `top_p`, and `top_k` |
| Sampling | Enterprise page: custom `temperature`, `top_p`, and `top_k` are ignored | Omit them |
| Tools the vendor lists | Enterprise page: function calling, code execution, URL context, computer use, and grounding. MCP is not in that list | Overview: text and image in, text out. MCP is a Claude Agent SDK and Claude Code surface, not a field on the model-overview tool grid |
| Cache | Implicit only, on the pricing page. Explicit caching is not supported | You place the breakpoint. Reads are $0.20 per million |
| Knowledge cutoff printed | March 2026, on the Enterprise page | June 2026, on the model overview |
| Input the card allows | Enterprise page: text, image, audio, and video in. Text out | Text and images in. Text out |

Source: aiagentsinfo.com. Carbon’s rows are the Enterprise model page and the public pricing page, read November 12, 2026. Fable’s rows are the model overview, the pricing page, and the adaptive-thinking page, read the same day. The Enterprise page says Carbon is available to verified enterprise customers in select regions, on `global`, `us`, and `eu`. The November 10 post says paying developers can call it on the Gemini API. Those are two doors. Copying the id from one account onto the other is how a Monday 404 starts. The door-by-door reading is the [Carbon harness note](/blog/gemini-4-carbon-for-agent-harnesses).

A foreground segment on the Enterprise page stops at 65,536 output tokens when streaming and 32,768 when it is not. Long decodes continue toward the rest of the 1,048,576 pool. Fable’s synchronous max output is 128,000 tokens, and thinking counts against that cap together with the visible answer. A harness that sets `max_tokens` for a short reply, then turns effort up, is the request that stops on `max_tokens` before the tool call lands.

## What this means when you pick one

Price the trace you already have, on both stickers, and switch models only where your eval shows the gap.

If the harness runs business software and AutomationBench is the closest public row, Carbon is the id that leads the only shared table, by 2.5 points, at a quarter of the token price through November 30. Re-price that same trace on December 1 before you sign anything against the introductory rate. The output price doubles, from $10 to $20 per million, and thinking is inside it.

If the harness writes code or drives a computer, Fable is ahead on the rows Anthropic scored for both models: 8.7 points on FrontierSWE v2, and 7.8 points on OSWorld 2.1. You pay $1.00 where Carbon’s equal-token turn is $0.25. That premium is worth it only if your own tasks move. Anthropic’s own instruction is to try Opus 5.5 first. The commands for the Fable id are in the [harness guide](/blog/how-to-use-claude-fable-5-2-in-an-agent-harness).

Do not import Google’s Terminal-Bench 4.0 number, 65.2%, as a win over Fable 5.2. The Claude cell beside it is Fable 5.1 at 52.0%. Do not import Google’s “more than 2 times lower cost per task” as the bill for your loop. The dollars were not printed. The dollars you can defend are the ones in the tables above, at token counts you counted.

[Gemini](/directory/gemini) and [Claude](/directory/claude) are the product families. The model is not the harness. The loop, the tools, the permissions, and the stop rules still decide whether a 69.9% cell shows up in your repository. Qwen4-Max preview, opened November 11, 2026, has no score and no per-token price to add to this table, and the docs retire the id at 24:00 on November 25 (UTC+8). That third column is [Gemini 4 Carbon vs Fable 5.2: Qwen4-Max preview](/blog/gemini-4-carbon-vs-fable-5-2-qwen4-max-preview).

## Frequently asked questions

### Should an agent harness call Gemini 4 Carbon or Claude Fable 5.2?

Call `gemini-4-carbon` when the job is a business-workflow agent or the bill is the constraint. A turn of 50,000 input tokens and 15,000 output tokens is $0.25 through November 30, 2026 and $0.50 from December 1. Call `claude-fable-5-2` when the job is a coding agent or a computer-use loop and your eval needs the gap on Anthropic’s November 9 table. That same turn is $1.00. Anthropic still says to start most coding on Claude Opus 5.5 before moving up to Fable.

### How much does Gemini 4 Carbon cost compared with Claude Fable 5.2?

On November 12, 2026 the Gemini API pricing page lists `gemini-4-carbon` at $2 per million input tokens and $10 per million output tokens through November 30, then $4 and $20. Anthropic’s pricing page lists Claude Fable 5.2 at $8 and $40 at every length up to 1 million tokens. Until November 30, Carbon’s input rate and output rate are each one quarter of Fable’s. From December 1 they are each half.

### What is the context window for Gemini 4 Carbon and Claude Fable 5.2?

The Claude Fable 5.2 overview lists 1 million tokens of context and 128,000 tokens of max output. The Gemini Enterprise Agent Platform page lists a unified 1,048,576-token pool for `gemini-4-carbon` that includes input and output, and says output includes thinking, function calls, and the final response. The Gemini API pricing page describes long-decode generation up to 1M tokens. A single foreground segment on the Enterprise page generates up to 65,536 output tokens when streaming, or 32,768 when it is not.

### Does Gemini 4 Carbon beat Claude Fable 5.2 on Terminal-Bench or SWE-bench?

Neither vendor page read on November 12, 2026 prints a SWE-bench Verified score or a tau-bench score for this pair. Google’s DeepMind table prints Terminal-Bench 4.0 at 65.2% for Carbon and 52.0% for Claude Fable 5.1, not Fable 5.2. Anthropic’s November 9 table has no Terminal-Bench 4.0 row. On the agentic coding row both pages share a number for, FrontierSWE, Anthropic prints 69.9% for Fable 5.2 and 61.2% for Carbon.

### What request returns HTTP 400 on each model?

On the Enterprise page for Gemini 4 Carbon, setting `thinking_budget` or `thinking_level` to `MINIMAL` returns HTTP 400. Valid thinking levels are `LOW`, `MEDIUM`, and `HIGH`. On the Claude Fable 5.2 overview, forced tool use with `tool_choice` `any` or `tool` returns HTTP 400, and custom `temperature`, `top_p`, and `top_k` return HTTP 400. Adaptive thinking stays on.
