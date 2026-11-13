---
title: "Gemini 4 Hydrogen vs Carbon vs Argon for coding agents: $1.50 in, $7.50 out"
description: "gemini-4-hydrogen is $1.50 and $7.50 per million tokens. A 50,000-in, 15,000-out turn is $0.1875, against $0.25 on Carbon through November 30, 2026 and $1.00 on Claude Fable 5.2. Four thinking levels do not change the rate."
absoluteTitle: true
takeaways:
  - "On the Gemini API pricing page read November 13, 2026, gemini-4-hydrogen paid standard is $1.50 per million input tokens and $7.50 per million output tokens, including thinking tokens, flat across the 1 million-token window. A turn of 50,000 input and 15,000 output is $0.1875. The same tokens are $0.25 on gemini-4-carbon and gemini-4-argon through November 30, $0.50 from December 1, and $1.00 on claude-fable-5-2."
  - "The Enterprise model page lists thinking levels LOW, MEDIUM, HIGH (default), and XHIGH. thinking_budget and thinking_level MINIMAL return HTTP 400. Google has not published a token count per level, so a higher level can erase the sticker gap without changing the rate."
  - "Google's November 12 posts put Hydrogen on the worker and verifier role under Carbon, in Antigravity Orchestrator and in parallel workspaces. No vendor page read November 13 scores Hydrogen against Claude Fable 5.2. The model card's Claude column is Sonnet 5.5."
date: "2026-11-13"
updated: "2026-11-13"
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
  title: "Equal-token agent bills for Gemini 4 Hydrogen, Carbon, Argon, and Claude Fable 5.2, read November 13, 2026"
  description: "List prices copied on November 13, 2026 from the Gemini API pricing page and Anthropic's pricing page. The $0.1875, $0.25, $0.50, $1.00, $0.3375, $0.09375, $0.14475, and $1.125 figures are arithmetic on those rates for the token counts stated on the page. AI Agents Info did not call either API and did not rerun the evals."
  isBasedOn: "https://aistudio.google.com/docs/pricing"
sources:
  - title: "Google, Build with Gemini 4 Hydrogen (November 12, 2026)"
    url: "https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-4-hydrogen/"
  - title: "Google, Introducing Gemini 4 Hydrogen (November 12, 2026)"
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/"
  - title: "Google DeepMind, Gemini 4 Hydrogen model card (published November 12, 2026; read November 13, 2026)"
    url: "https://deepmind.google/models/model-cards/gemini-4-hydrogen/"
  - title: "Gemini API, Gemini 4 Hydrogen model page (read November 13, 2026)"
    url: "https://aistudio.google.com/docs/models/gemini-4-hydrogen"
  - title: "Gemini API pricing (read November 13, 2026)"
    url: "https://aistudio.google.com/docs/pricing"
  - title: "Google Cloud, Gemini 4 Hydrogen model page (read November 13, 2026)"
    url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/4-hydrogen"
  - title: "Google Cloud, Thinking (read November 13, 2026)"
    url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking"
  - title: "Google Antigravity, Gemini 4 Hydrogen and Orchestrator (November 12, 2026)"
    url: "https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity/"
  - title: "Anthropic, Claude API pricing (read November 13, 2026)"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
  - title: "Google Cloud, Agent Platform pricing (read November 13, 2026)"
    url: "https://cloud.google.com/model-garden/pricing"
faq:
  - question: "Which Gemini 4 model should a coding agent call?"
    answer: "Call gemini-4-hydrogen for everyday edits, tests, and worker or verifier agents. On November 13, 2026 the paid standard rate is $1.50 per million input tokens and $7.50 per million output tokens. A turn of 50,000 input and 15,000 output is $0.1875. Call gemini-4-carbon when the job is the plan, the recovery, or a long-horizon task Google assigns to a frontier model. That turn is $0.25 through November 30 and $0.50 from December 1. Call gemini-4-argon when you want the frontier id whose pricing page says it spends fewer tokens per turn than Carbon. Argon's sticker matches Carbon. Call claude-fable-5-2 when the harness is Claude and your eval needs the gap Anthropic published against Carbon, not against Hydrogen. That turn is $1.00."
  - question: "How much does Gemini 4 Hydrogen cost compared with Carbon, Argon, and Claude Fable 5.2?"
    answer: "On November 13, 2026 the Gemini API pricing page lists gemini-4-hydrogen paid standard at $1.50 and $7.50 per million tokens, with no dated increase. gemini-4-carbon and gemini-4-argon are $2 and $10 through November 30, 2026, then $4 and $20. Anthropic lists Claude Fable 5.2 at $8 and $40. Until November 30, Hydrogen is 25 percent cheaper per token than Carbon and Argon on any mix of input and output. Fable is 5 and 1/3 times the Hydrogen bill on any mix with no cache, batch, or priority."
  - question: "What are Gemini 4 Hydrogen's thinking levels?"
    answer: "The Enterprise Agent Platform page, read November 13, 2026, lists LOW, MEDIUM, HIGH, and XHIGH. HIGH is the default. Setting thinking_budget, or thinking_level to MINIMAL, returns HTTP 400. The per-token price is the same at every level. Google has not published how many output tokens each level uses. Google's November 12 post says the Artificial Analysis Intelligence Index is 51 at the default high level and 54 at xhigh, against Argon's 50."
  - question: "Does Gemini 4 Hydrogen beat Claude Fable 5.2?"
    answer: "No page read on November 13, 2026 puts Gemini 4 Hydrogen and Claude Fable 5.2 on the same benchmark row. The Hydrogen model card compares Hydrogen with Claude Sonnet 5.5 and GPT-6.1 Terra. On Terminal-Bench 4.1, cheating-adjusted, that card prints 57.0 percent for Hydrogen and 63.9 percent for Sonnet 5.5. Sonnet 5.5's list price the same day is $2 and $10 per million tokens, not Fable's $8 and $40."
  - question: "Is Gemini 4 Hydrogen on the free tier?"
    answer: "The Gemini API pricing page, read November 13, 2026, lists standard and priority input and output for gemini-4-hydrogen as free of charge on the free tier. The free-tier column is marked as used to improve Google's products. Paid standard is marked no. Batch and Flex are not available on the free tier. Carbon and Argon are not on the free tier at all."
---

Put `gemini-4-hydrogen` on the worker. Put `gemini-4-carbon` on the plan and the recovery. Leave `gemini-4-argon` for the frontier calls where Google says the model spends fewer tokens than Carbon. A turn of 50,000 input tokens and 15,000 output tokens is **$0.1875** on Hydrogen’s paid standard rate, **$0.25** on Carbon or Argon through November 30, 2026, **$0.50** on those two from December 1, and **$1.00** on Claude Fable 5.2.

Those four bills are list-price arithmetic on pages read November 13, 2026. They hold the token counts equal. They are not a measured cost per solved task. Hydrogen’s four thinking levels do not change the rate. They change how many thinking tokens the model emits, and Google has not published that count. A harness that pins `xhigh` on every file edit can spend the sticker gap before the diff lands. The model listing is [Gemini 4 Hydrogen](/directory/gemini-4-hydrogen). The family page is [Gemini](/directory/gemini).

## Which Gemini 4 id should the harness call?

Send the everyday loop to Hydrogen. Send the plan, the stuck state, and the long-horizon job to Carbon. Send Argon when you want frontier quality and Google’s claim of a smaller token bill than Carbon. Send Fable only from a Claude harness that has already measured the gap.

| Call this id when | API id | Paid standard, per 1M tokens | This turn, 50k in / 15k out | Do not send |
| --- | --- | --- | --- | --- |
| Edits, tests, verifiers, sub-agents | `gemini-4-hydrogen` | $1.50 in, $7.50 out, including thinking. No dated increase on the card | $0.1875 | `thinking_budget`, or `thinking_level` `MINIMAL`. The Enterprise page says both return HTTP 400 |
| Plan, recovery, long-horizon work, the coordinator in a swarm | `gemini-4-carbon` | $2 / $10 through November 30, 2026. $4 / $20 from December 1 | $0.25, then $0.50 | The same 400s. Carbon’s default thinking level is `MEDIUM`, not `HIGH` |
| Frontier work where the pricing page says the model spends fewer tokens per turn than Carbon | `gemini-4-argon` | Same sticker as Carbon. Not on the free tier | $0.25, then $0.50 | A hope that Argon is cheaper per token than Hydrogen. It is not |
| A Claude coding or computer-use loop whose eval needs the gap Anthropic scored against Carbon | `claude-fable-5-2` | $8 / $40 | $1.00 | A claim that Fable beat Hydrogen on a shared official table. No such row was on the pages read November 13 |

Source: aiagentsinfo.com. Gemini rates from the [Gemini API pricing page](https://aistudio.google.com/docs/pricing), read November 13, 2026. Fable’s rate from [Anthropic’s pricing page](https://platform.claude.com/docs/en/about-claude/pricing), read the same day. The 400s and the defaults are the [Enterprise Hydrogen page](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/4-hydrogen) and the [thinking page](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking). The turn is arithmetic on those rates, with no cache and no grounding.

[Google’s developer post](https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-4-hydrogen/), dated November 12, says Hydrogen runs on its own across four thinking levels or beside Carbon and Argon. The [DeepMind post](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/) the same day says Carbon and Argon are for deep, long-horizon reasoning, and Hydrogen is for rapid execution. The pricing page’s Argon blurb, read November 13, says Argon has faster responses and lower token spend per turn than Carbon. That is a token-count claim, not a lower rate. Carbon and Argon share the rate card.

The equal-token Carbon versus Fable bill, and the shared scores, stay on [Gemini 4 Carbon vs Claude Fable 5.2 for agents](/blog/gemini-4-carbon-vs-claude-fable-5-2-for-agents). The Carbon id, regions, and continuation rules are [Gemini 4 Carbon for agent harnesses](/blog/gemini-4-carbon-for-agent-harnesses). Qwen4-Max preview, which still has no per-token dollar rate, is [Gemini 4 Carbon vs Fable 5.2: Qwen4-Max preview](/blog/gemini-4-carbon-vs-fable-5-2-qwen4-max-preview). Product harnesses, as distinct from these model ids, are [Best AI agent harnesses](/best/ai-agent-harnesses) and the [harness tracker](/trackers/harnesses).

## What does one agent turn cost on November 13?

$0.1875 on Hydrogen standard, $0.25 on Carbon or Argon until November 30, $0.50 after that, and $1.00 on Fable, for 50,000 input tokens and 15,000 output tokens with no cache and no grounding.

| Model and window | Input, per 1M | Output, per 1M | Cache read, per 1M | This turn |
| --- | --- | --- | --- | --- |
| Gemini 4 Hydrogen, paid standard | $1.50 | $7.50, including thinking | $0.075, implicit only | $0.1875 |
| Gemini 4 Carbon or Argon, through November 30, 2026 | $2 | $10, including thinking | $0.10, implicit only | $0.25 |
| Gemini 4 Carbon or Argon, from December 1, 2026 | $4 | $20, including thinking | $0.20, implicit only | $0.50 |
| Claude Fable 5.2, base rate | $8 | $40 | $0.20 | $1.00 |

Source: aiagentsinfo.com. Rates copied November 13, 2026 from the [Gemini API pricing page](https://aistudio.google.com/docs/pricing) and [Anthropic’s pricing page](https://platform.claude.com/docs/en/about-claude/pricing). Hydrogen’s output line is the pricing page’s phrase, “including thinking tokens.” Fable’s cache-hit cell is the “cache hits and refreshes” column.

The arithmetic, in order. Hydrogen: `50,000 / 1,000,000 × 1.50 = 0.075`, and `15,000 / 1,000,000 × 7.50 = 0.1125`. Sum, $0.1875. Carbon or Argon through November 30: `0.10 + 0.15 = 0.25`. From December 1: `0.20 + 0.30 = 0.50`. Fable: `0.40 + 0.60 = 1.00`.

Until November 30, Hydrogen’s input price is three quarters of Carbon’s and Hydrogen’s output price is three quarters of Carbon’s. Any mix of input and output, with no cache, no batch, no flex, no priority, and no search grounding, is a 25 percent smaller Hydrogen bill. From December 1, Carbon and Argon step to $4 and $20 while Hydrogen’s card has no step. The same mix is then `4 / 1.50 = 8/3`, so Carbon costs 2 and 2/3 times Hydrogen. Fable’s $8 and $40 are `8 / 1.50 = 16/3` times Hydrogen on both sides, so any uncached mix is 5 and 1/3 times the money. The ratio does not depend on this 50,000 and 15,000. The dollar amounts do.

Hydrogen is on the free tier. Carbon and Argon are not. The Hydrogen standard row says free-tier input and output are free of charge, and that the free tier is used to improve Google’s products. Paid standard on that row is marked no. A harness sending customer code should read that column before it uses the free key. The pricing page does not print a free-tier request cap for this id. This page does not invent one.

Search grounding is a separate meter on the same card: 5,000 free search requests a month, shared across Gemini 3 and newer models, then $14 per 1,000 requests, with a daily cap of 1,500. This turn does not include that fee. The pricing page also says every token is counted, including thinking tokens and, when grounding is on, internal tool instructions and function declarations. A [tool call](/glossary/tool-use) definition that rides on every turn is input.

The [AI agent cost calculator](/agent-cost-calculator) now includes the Hydrogen standard pair. It does not apply the December 1 Carbon step by itself, and it does not add cache, batch, or priority. Re-check Carbon and Argon on December 1. Hydrogen’s card, as read November 13, has nothing to re-check on that date.

## What do batch, flex, and priority do to the same turn?

Priority Hydrogen costs $0.3375, which is more than standard Carbon through November 30. Batch and Flex cost $0.09375, and they are not on the free tier.

| Hydrogen tier, paid | Input, per 1M | Output, per 1M | This turn | Free tier |
| --- | --- | --- | --- | --- |
| Standard | $1.50 | $7.50 | $0.1875 | Free of charge. Marked as used to improve Google’s products |
| Batch | $0.75 | $3.75 | $0.09375 | Not available |
| Flex | $0.75 | $3.75 | $0.09375 | Not available |
| Priority | $2.70 | $13.50 | $0.3375 | Free of charge on the priority tab |
| Contributor, invite-only preview | $0.75 | $3.75 | $0.09375 | Free of charge. Marked as used to improve Google’s products |

Source: aiagentsinfo.com. Tab labels and rates from the [Gemini API pricing page](https://aistudio.google.com/docs/pricing), read November 13, 2026. The turn uses the same 50,000 and 15,000 with no cache. The Contributor tab says speed and reliability match standard inference, and that the tier is a private preview.

`0.05 × 2.70 + 0.015 × 13.50 = 0.3375`. Priority is 1.8 times standard Hydrogen (`2.70 / 1.50`). It is also 1.35 times standard Carbon’s introductory rate (`2.70 / 2`). A harness that flips the worker to priority to “go faster” pays more per token than Carbon’s intro sticker, before any extra thinking. Batch and Flex are half of standard: `0.05 × 0.75 + 0.015 × 3.75 = 0.09375`. Use them for eval sweeps that can wait. Do not use them for a user who is watching a terminal.

The [Agent Platform pricing page](https://cloud.google.com/model-garden/pricing), read the same day, prints three global Hydrogen pairs: $1.50 and $7.50, $2.70 and $13.50, and $0.75 and $3.75. Those match the API standard, priority, and batch rates. Non-global on that page is 10 percent higher: $1.65 and $8.25, $2.97 and $14.85, and $0.825 and $4.125. The Gemini API card read the same day does not split global and non-global. Cache writes on the Cloud page are $1.875 per million on the $1.50 row, which is 1.25 times input, and the footnote says that cache-write price takes effect January 12, 2027. The Enterprise page says the same date, and says explicit context caching is not supported.

## What changes when a 30,000-token prefix is cached?

The steady-state Hydrogen turn falls to $0.14475. Output is still most of the bill. Google does not promise the cache hit.

Assume 30,000 tokens at the cache-read price, 20,000 tokens at the normal input price, and 15,000 output tokens. No grounding. Standard tier.

| Piece | Hydrogen standard | Carbon through Nov 30 | Fable 5.2 |
| --- | --- | --- | --- |
| 30,000 cache-read tokens | $0.00225 | $0.003 | $0.006 |
| 20,000 uncached input | $0.030 | $0.040 | $0.160 |
| 15,000 output | $0.1125 | $0.150 | $0.600 |
| Turn | $0.14475 | $0.193 | $0.766 |

Source: aiagentsinfo.com. Arithmetic on the cache and token rates in the price table above. This is the bill if those 30,000 tokens are charged at the published cache price. It is not a trace from either API.

Hydrogen’s API card says context caching is implicit only and that explicit caching is not supported. The Enterprise page says implicit caching applies to a shared prefix of 4,096 tokens or more, with durable caching on by default. A 30,000-token prefix is above 4,096. The public API card does not print that cutoff. Fable lets the harness place the cache breakpoint. The first write of those 30,000 tokens to Fable’s 5-minute cache is `30,000 / 1,000,000 × 10 = $0.30`. Later reads are the $0.006 line.

Six identical uncached Hydrogen turns are `6 × $0.1875 = $1.125`. The same six turns are $1.50 on Carbon through November 30, $3.00 from December 1, and $6.00 on Fable. That example is a flat task, not a growing transcript. A real [agent loop](/glossary/agent-loop) resends earlier turns, so later requests are larger than the first. Count the trace you have. Do not treat $1.125 as the cost of a six-turn log you have not measured.

## What do the four thinking levels actually change?

They change latency and how many thinking tokens you buy. They do not change the $1.50 and $7.50. `HIGH` is the default. `XHIGH` is the level Carbon and Argon do not have.

The [thinking page](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking), read November 13, lists Hydrogen’s supported values as `LOW`, `MEDIUM`, `HIGH`, and `XHIGH`, with `HIGH` as the default. Carbon and Argon stop at `HIGH`, and their default is `MEDIUM`. The page says `thinking_budget` on Gemini 4 models returns `400 INVALID_ARGUMENT`, and that `MINIMAL` is not supported on Gemini 4. The Enterprise Hydrogen page says the same 400 for `thinking_budget` and for `thinking_level="MINIMAL"`. Sampling parameters `temperature`, `top_p`, and `top_k` are ignored. The fixed defaults on that page are temperature 1.0, topP 0.95, and topK 64.

Google’s November 12 post says the four levels scale quality, latency, and cost, and that you pay only for the reasoning depth a task needs. The post does not print output tokens, latency, or dollars per level. The only level-specific score it prints is the Artificial Analysis Intelligence Index: 51 at the default high setting, 54 at `xhigh`, against Argon’s 50. That index is Google citing Artificial Analysis. This page did not pull a live board. Treat 51 and 54 as Google’s claim, and treat the missing token counts as a blank. If your traces show `xhigh` emitting twice the output of `high`, the output half of the $0.1875 turn doubles, from $0.1125 to $0.225, and the turn becomes $0.300 before you have beaten Carbon’s $0.25 on quality you measured yourself.

The [API model page](https://aistudio.google.com/docs/models/gemini-4-hydrogen) says thinking is supported, and it points at a what’s-new guide for the controls. The Enterprise page is the one that names the four strings and the 400. A harness on the Gemini API should send the level the Enterprise page lists and should read the error if the API rejects `XHIGH`. Do not invent a fifth level.

## Where does Hydrogen sit under Carbon?

As the execution model in the same session, and as the worker in a parallel workspace. Orchestrator is not `/swarm`, and Google’s two posts do not agree on the benchmark version.

[Antigravity’s November 12 post](https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity/) describes Orchestrator as a bidirectional handoff inside one trajectory. Carbon can start read-only, map dependencies, and write a plan with re-planning triggers. Hydrogen then edits, updates packages, and runs tests. If Hydrogen sticks, it hands back to Carbon. The post says that on Terminal-Bench 4.1, Orchestrator reached near-Carbon task success while using 24 percent less quota and finishing 19 percent faster, on average. The [DeepMind post](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/) the same day uses the same 24 percent and 19 percent and names Terminal-Bench 4.0. Neither post prints the success rates, the run count, or the quota unit. Quote the pair you cite. Do not average 4.0 and 4.1 into one number.

The same Antigravity post separates two products. `/swarm`, introduced with Carbon earlier in the week, is the parallel multi-worktree path. Orchestrator is the single-session path for everyday feature work, where running a frontier model on every step burns quota. The SDK example on that page assigns Hydrogen agents to triage, coding, clarifying questions, and fast UI iteration, and assigns the Carbon agent to larger refactors, new features, and security checks. That split matches the price table. The worker id is the one at $1.50. The coordinator is the one whose output steps to $20 on December 1.

Availability is not one switch. The DeepMind post says Hydrogen is rolling out for all tiers of AI Studio and the Gemini API, Gemini for business, the Gemini app, and Google Search, plus paid Google AI Pro and Ultra subscribers in Antigravity. The Antigravity post is narrower for the IDE: Hydrogen for paid Pro and Ultra, Orchestrator (Carbon) and Orchestrator (Argon) for Ultra, and Orchestrator (Argon) for Pro. Enterprises get both in Gemini for business. A Pro subscriber who expects Orchestrator (Carbon) does not get that dropdown item on the sentence Antigravity published.

The model card says Hydrogen is suited to “fast, disciplined execution on its own or as sub-agents orchestrated alongside frontier models.” That is the product intent. It is not a `generateContent` parameter named swarm or orchestrator. If your harness is the Gemini API, you route the ids yourself.

## What did Google measure, and what is missing next to Fable?

The model card scores Hydrogen against Claude Sonnet 5.5 and GPT-6.1 Terra. It does not score Fable 5.2. Do not paste Carbon’s Terminal-Bench 4.0 cell onto Hydrogen’s 4.1 cell.

| Benchmark, as the model card names it | Gemini 4 Hydrogen | Claude Sonnet 5.5 | GPT-6.1 Terra |
| --- | --- | --- | --- |
| SWE-sweep | 13.5% | 3.1% | 5.8% |
| Terminal-Bench 4.1, cheating-adjusted | 57.0% | 63.9% | — |
| Agents' Last Exam v1.1 | 71.6% | 60.4% | 69.8% |
| AutomationBench-AA | 76.1% | 71.8% | 60.2% |
| Vending-Bench 2, bank balance | $14,549 | $11,165 | $9,107 |
| OSWorld-2.1, offline subset | 77.6% | 83.9% | 74.2% |
| MKA, Climb WSR accuracy | 53.4% | 52.0% | 43.8% |
| Chartography | 66.6% | 61.6% | 63.2% |
| Terminal-Bench-Science 0.1 | 51.4% | 59.9% | 58.3% |
| HLE-Diamond | 58.8% | 53.3% | 47.3% |

Source: aiagentsinfo.com. Copied from the [Gemini 4 Hydrogen model card](https://deepmind.google/models/model-cards/gemini-4-hydrogen/), published November 12, 2026 and read November 13. These are Google’s measurements. This page did not rerun them. The dash is the card’s empty cell, not a zero.

Sonnet 5.5’s list price on Anthropic’s page the same day is $2 per million input tokens and $10 per million output tokens. That is Carbon’s introductory sticker, not Fable’s. On the two coding-adjacent rows in this table, Sonnet leads Terminal-Bench 4.1 (63.9% to 57.0%) and OSWorld-2.1 offline (83.9% to 77.6%). Hydrogen leads SWE-sweep (13.5% to 3.1%), Agents' Last Exam v1.1 (71.6% to 60.4%), AutomationBench-AA (76.1% to 71.8%), and HLE-Diamond (58.8% to 53.3%). AutomationBench-AA is not the AutomationBench row on the Carbon versus Fable page, where Carbon leads Fable 5.2 53.9% to 51.4%. Different names. Do not subtract them.

The DeepMind post adds claims that are not in the model-card table. Against Gemini 3.8 Flash, it says Hydrogen finishes tasks 2.5 times faster at the high default, more than triples Terminal-Bench 4.1 (57% versus 18.2%), and cuts fabricated claims by more than 5 times. The 57% matches the card’s 57.0%. The post does not say that 57% cell is cheating-adjusted, and the card does. It also says partners, in early testing on graphs, SQL, and data-heavy workflows, saw Hydrogen run 2 to 2.8 times faster and use 12 to 23 percent fewer tokens than 3.8 Flash. That is a partner anecdote with a range, not a public eval. The post’s other named scores, not repeated as a full table here, include Vals Tax Agent Bench at 52.3% and a tie at 55.8% on the Vals Legal Research Bench. Agent Arena rank number 5 is arena.ai’s live board, as Google describes it.

The card’s safety section says a full Safety and Security Report is coming. It says Hydrogen did not reach the CBRN or cybersecurity critical capability levels, and that it did reach the alert thresholds for both. Internal safety deltas versus Gemini 3.8 Flash are on the card, including unjustified refusals up 5.57 percentage points, which is a regression on a “lower is better” row. The November 12 post’s agent-honesty figure, 96.7%, and the “up to 81%” overreach reduction are Google’s internal evals. They are not a substitute for the eval you run on your tools.

[Benchmark tracker](/trackers/benchmarks) pages on this site are for the benches this desk recounts from primary tables. They are not a second Hydrogen leaderboard.

## What should the harness set on Monday?

Call `gemini-4-hydrogen`. Set `thinking_level` to `low` or `medium` for the worker loop, and raise it only when a trace shows the cheaper level failing. Leave `thinking_budget` out. Keep the tool list stable. Budget thinking as output.

The [API model page](https://aistudio.google.com/docs/models/gemini-4-hydrogen) lists the stable id `gemini-4-hydrogen`, inputs of text, image, video, audio, and PDF, and text out. Context is 1,048,576 tokens, unified. Max output is 65,536 by default and up to 1,048,576 with long decode. The Enterprise page says a foreground segment generates up to 65,536 output tokens whether or not you stream, and that output in the pool includes thinking, function calls, and the final response. The model card’s “64K” is that 65,536. Long decode is how you get the rest of the pool. Computer use, function calling, code execution, structured output, and search grounding are marked supported on both the API page and the Enterprise page. Live API and image generation are not.

Supported Enterprise regions for the model are `global`, `us`, and `eu`. Copying the id onto an account that does not have it is how a 404 shows up. The November 10 Carbon post said Argon remained the model for most software engineering. The November 12 Hydrogen post moves everyday execution to Hydrogen and leaves Carbon and Argon on the hard problems. Both sentences are dated. The price table is the reason the newer sentence is the one to route on: Hydrogen is the only Gemini 4 id in this set that is cheaper per token than the other two, and the only one on the free tier.

Fable remains the Claude id for coding and computer use after Opus 5.5 misses your eval. That argument is unchanged, because nobody has published a Hydrogen-versus-Fable table. Price the trace on both stickers. $0.1875 against $1.00 is 5 and 1/3 times on equal tokens. It is not 5 and 1/3 times on equal task success. The [coding-agent comparison](/best/ai-coding-agents) is the product layer. The [harnesses topic](/topics/harnesses) is the loop around whichever id you pick.

## Frequently asked questions

### Which Gemini 4 model should a coding agent call?

Call `gemini-4-hydrogen` for everyday edits, tests, and worker or verifier agents. On November 13, 2026 the paid standard rate is $1.50 per million input tokens and $7.50 per million output tokens. A turn of 50,000 input and 15,000 output is $0.1875. Call `gemini-4-carbon` when the job is the plan, the recovery, or a long-horizon task Google assigns to a frontier model. That turn is $0.25 through November 30 and $0.50 from December 1. Call `gemini-4-argon` when you want the frontier id whose pricing page says it spends fewer tokens per turn than Carbon. Argon’s sticker matches Carbon. Call `claude-fable-5-2` when the harness is Claude and your eval needs the gap Anthropic published against Carbon, not against Hydrogen. That turn is $1.00.

### How much does Gemini 4 Hydrogen cost compared with Carbon, Argon, and Claude Fable 5.2?

On November 13, 2026 the Gemini API pricing page lists `gemini-4-hydrogen` paid standard at $1.50 and $7.50 per million tokens, with no dated increase. `gemini-4-carbon` and `gemini-4-argon` are $2 and $10 through November 30, 2026, then $4 and $20. Anthropic lists Claude Fable 5.2 at $8 and $40. Until November 30, Hydrogen is 25 percent cheaper per token than Carbon and Argon on any mix of input and output. Fable is 5 and 1/3 times the Hydrogen bill on any mix with no cache, batch, or priority.

### What are Gemini 4 Hydrogen's thinking levels?

The Enterprise Agent Platform page, read November 13, 2026, lists `LOW`, `MEDIUM`, `HIGH`, and `XHIGH`. `HIGH` is the default. Setting `thinking_budget`, or `thinking_level` to `MINIMAL`, returns HTTP 400. The per-token price is the same at every level. Google has not published how many output tokens each level uses. Google’s November 12 post says the Artificial Analysis Intelligence Index is 51 at the default high level and 54 at `xhigh`, against Argon’s 50.

### Does Gemini 4 Hydrogen beat Claude Fable 5.2?

No page read on November 13, 2026 puts Gemini 4 Hydrogen and Claude Fable 5.2 on the same benchmark row. The Hydrogen model card compares Hydrogen with Claude Sonnet 5.5 and GPT-6.1 Terra. On Terminal-Bench 4.1, cheating-adjusted, that card prints 57.0 percent for Hydrogen and 63.9 percent for Sonnet 5.5. Sonnet 5.5’s list price the same day is $2 and $10 per million tokens, not Fable’s $8 and $40.

### Is Gemini 4 Hydrogen on the free tier?

The Gemini API pricing page, read November 13, 2026, lists standard and priority input and output for `gemini-4-hydrogen` as free of charge on the free tier. The free-tier column is marked as used to improve Google’s products. Paid standard is marked no. Batch and Flex are not available on the free tier. Carbon and Argon are not on the free tier at all.
