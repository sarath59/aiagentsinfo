---
title: "Paper breakdown: You don't need long context — short working memory still finishes the job"
description: "A November 3, 2026 technical report: compaction kept Claude Opus 4.5 and GPT 5.6 Sol near full-history accuracy while the live context stayed short."
date: "2026-11-04"
updated: "2026-11-09"
type: paper-breakdown
topics:
  - harnesses
  - how-agents-work
  - task-performance
companies:
  - arxiv
  - github
  - anthropic
  - openai
  - claude
paperTitle: "You don't need long context"
paperAuthors: "Peter Belcak, Saurav Muralidharan, Jindong Jiang, Yonggan Fu, Wonmin Byeon, Hanrong Ye, Ryan Angilly, Ali Taghibakhshi, Shih-Yang Liu, Siru Ouyang, Greg Heinrich, Pavlo Molchanov"
paperYear: 2026
paperUrl: "https://arxiv.org/abs/2611.05306"
venue: "Technical report on arXiv, 2611.05306, submitted November 3, 2026"
abstract: |
  A language model only sees the text that is in front of it on that call. Product pages call that space a context window, and the race has been to make it enormous. On November 3, 2026, Peter Belcak and eleven coauthors posted a technical report that asks whether those long windows are actually required. Their answer, on the tasks they ran, is no.

  They kept the models fixed and changed the harness. One setting lets the conversation grow. Another, once the conversation crosses a limit, asks the model to write a short handoff and starts a fresh conversation with the original task plus that handoff. A third setting allows only one action, then writes the handoff and starts over. On Claude Opus 4.5 and GPT 5.6 Sol, the shorter settings usually stayed within a few points of the full-history score, and sometimes scored higher. On SWE-bench Verified, the best compaction setting in the report is 74.8% for Opus 4.5, against a 70.0% full-history run, and 88.8% for GPT 5.6 Sol, against 84.4%.

  The same idea did not hold for every open model. At the tightest budget, Qwen 3 Coder Next's SWE-bench Verified score in the report falls from 53.0% to 3.6%. The authors also say the evidence does not prove that every possible task can be solved with a short context.
whyItMatters: |
  Agent products already spend much of their engineering on the harness: what the model sees, which tools it can call, and what is saved between turns. This report is a direct test of one harness choice, compaction, against the habit of keeping the whole history in the window. The practical claim is that a written handoff can stand in for a very long transcript on the workloads they measured.

  That claim sits next to products that still advertise huge windows and already offer compaction of their own. Re-read on November 9, 2026, Anthropic's context-window page gives a 1 million token window to Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, Claude Mythos 5, Claude Opus 5.5, Claude Opus 5, Claude Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, Claude Sonnet 5.5, Claude Sonnet 5, Claude Sonnet 4.6, Claude Haiku 5.5, and Claude Mythos Preview. A request to any of them can generate up to 128,000 output tokens. Other Claude models, including Claude Sonnet 4.5, which that page now marks deprecated, have a 200,000 token window. Claude Opus 4.5, the model in the main experiments, is not on the 1 million token list. For every 1 million token model, 1 million is the default and long-context requests are billed at standard pricing, except Claude Haiku 5.5, where prompts over 100,000 tokens cost more. The same page says server-side compaction is the primary strategy for long-running agent work. OpenAI's GPT 5.6 Sol page, re-read the same day, still lists a 1,050,000 token window. It prices the model at 4 USD per million input tokens and 20 USD per million output tokens, and it calls those rates promotional through November 30, 2026, a 20 percent reduction on input and a 33 percent reduction on output. Prompts above 272,000 input tokens are priced at 2 times input and 1.5 times output for the whole request. Cached input on the same card is 0.40 USD per million tokens. Cache writes are billed at 1.25 times the uncached input rate. OpenAI's compaction guide says the carried item is opaque and not intended to be human-interpretable. The report's handoff is a recap the model writes in ordinary language, then a new conversation.

  For the loop these experiments sit on, see the site's note on ReAct and the glossary entries for a harness and a context window. Those pages describe the machinery. This report measures what happens when that machinery throws most of the transcript away.
keyFindings:
  - "On open-weight models served on NVIDIA H100 GPUs, the report says generating tokens at a 256,000 token window costs 3.6 times more than at 16,000 for GLM 5.2, 5.6 times more for Kimi K2.6, and 7 times more for Qwen 3 Coder Next. The dollar figures use an on-demand H100 price of 3.85 USD per GPU-hour from Nebius in September 2026."
  - "Across six long-horizon benchmarks, the report says Claude Opus 4.5's compaction runs landed between 3.7 points below and 5.6 points above its full-history score, and GPT 5.6 Sol between 3.3 below and 4.4 above. For each model, no more than 5 of 22 threshold settings lost more than 2 points."
  - "On SWE-bench Verified, full history scored 70.0% for Opus 4.5 and 84.4% for GPT 5.6 Sol. The best compaction settings in the table are 74.8% at a 24,000 token limit for Opus and 88.8% at 48,000 for GPT 5.6 Sol. The tightest 16,000 token setting scored 68.8% and 84.6%."
  - "With only one action per conversation, Opus 4.5 scored 70.2% on SWE-bench Verified and 51.8% on Terminal-Bench 2.1, against full-history scores of 70.0% and 47.2%. GPT 5.6 Sol scored 82.4% and 84.3% (75 of 89 Terminal-Bench tasks), 2.0 and 3.3 points under its full-history scores. Median peak context in that setting was 7,000 to 9,000 tokens."
  - "On long documents, selective reading plus compaction raised some scores by a lot. Needle-in-a-Haystack went from 60.0% to 100% for Opus 4.5 and from 80.0% to 100% for GPT 5.6 Sol, with no compaction turns at all. AA-LCR went from 65.0% to 84.0% for Opus at a 16,000 token limit."
  - "The open-weight table is the counterexample. At a 16,000 token limit, Qwen 3 Coder Next fell from 53.0% to 3.6% on SWE-bench Verified. Qwen 3.6 27B moved from 68.6% to 65.0%, and MiniMax M2.7 from 72.6% to 67.8%."
methodology: |
  The source is the arXiv record 2611.05306, "You don't need long context," published November 3, 2026. That record labels it a technical report of 31 pages and 8 figures. The authors are Peter Belcak, Saurav Muralidharan, Jindong Jiang, Yonggan Fu, Wonmin Byeon, Hanrong Ye, Ryan Angilly, Ali Taghibakhshi, Shih-Yang Liu, Siru Ouyang, Greg Heinrich, and Pavlo Molchanov. The report links a lab page, nv-dler.github.io, and a project page, NVIDIA Research's Local Frontier Intelligence site. The lab page says the Deep Learning Efficiency Research team is part of NVIDIA Research and is led by Pavlo Molchanov. The arXiv author block itself does not print an affiliation line.

  The main accuracy runs use Claude Opus 4.5 and GPT 5.6 Sol. The harness is a small ReAct loop: one Bash action at a time, with the action and its result appended to the conversation. Software and terminal tasks use mini-swe-agent version 2.4, with the changes needed to manage context. Other tasks use a generalization the authors call mini-agent. Full-history accumulation keeps one growing conversation. End-of-conversation compaction, once a threshold is crossed, asks the model to stop and write a handoff, then starts a new conversation with the original task and that handoff. Single-action compaction does that after every action. Long documents are stored as files and read with search and bounded reads, instead of being pasted in whole.

  Long-horizon benchmarks in the report are SWE-bench Verified (500 tasks), SWE-bench Multilingual (300), Terminal-Bench 2.1 (89), FRAMES (824), the 184-task tau-squared bench golden set, and 200 long-context episodes of BFCLv3. Long-input benchmarks are LongBench v2, LOONG, Artificial Analysis Long Context Reasoning, Needle in a Haystack, RULER, Counting-Stars, and BABILong. A separate serving study measures GLM 5.2, Kimi K2.6, and Qwen 3 Coder Next on NVIDIA H100 GPUs under vLLM, and five local models on an NVIDIA DGX Spark.
limitations:
  - "The authors write that the evidence does not rule out tasks where a long context helps, and does not prove that every task can be solved with a short one. They give a coin-toss log as a case compaction must eventually lose, unless some other store keeps the full history."
  - "FRAMES is a real loss, not a tie. Compaction cut Opus 4.5 by 1.3 to 3.7 points from an 81.0% full-history score, and GPT 5.6 Sol by 1.5 to 3.3 points from 90.2%."
  - "Qwen 3 Coder Next's drop from 53.0% to 3.6% on SWE-bench Verified, at a 16,000 token limit, shows the result depends on the model. The authors say its long traces left too little room to make progress between compactions."
  - "The cost multiples are an estimate. Appendix B anchors retail prices and then scales them with a throughput ratio measured on other models. They are not invoices from Anthropic or OpenAI."
  - "The accuracy tables print one figure per cell. The report does not attach run-to-run error bars to those scores. The serving measurements are the place that mentions repeats: throughput varied by at most 2%."
  - "A semantic state space model, in the report, is a proposal for a model trained to continue from a written state. The experiments use existing models and a harness. They do not train that new model."
  - "These scores are the authors' own full-history runs. They are not rows on the public SWE-bench leaderboard, and the report does not claim a leaderboard record."
references:
  - title: "Belcak et al., You don't need long context (arXiv:2611.05306)"
    url: "https://arxiv.org/abs/2611.05306"
  - title: "HTML version of the report"
    url: "https://arxiv.org/html/2611.05306"
  - title: "Deep Learning Efficiency Research lab page linked from the report"
    url: "https://nv-dler.github.io"
  - title: "NVIDIA Research, Local Frontier Intelligence, the project page linked from the report"
    url: "https://research.nvidia.com/labs/lpr/lfi/"
  - title: "mini-swe-agent, the harness the report modifies"
    url: "https://github.com/SWE-agent/mini-swe-agent"
  - title: "Anthropic, context windows, including compaction as the stated strategy for long agent work"
    url: "https://platform.claude.com/docs/en/build-with-claude/context-windows"
    note: "Re-read November 9, 2026. The 1 million token list now runs from Claude Fable 5.1 and Claude Mythos 5.1 through Claude Opus 4.6, Claude Sonnet 4.6, and Claude Haiku 5.5, plus Claude Mythos Preview. Claude Sonnet 4.5 is marked deprecated at 200,000 tokens."
  - title: "Anthropic, compaction at a token threshold"
    url: "https://platform.claude.com/docs/en/build-with-claude/compaction-threshold"
    note: "Re-read November 9, 2026. Default trigger 150,000 input tokens; the smallest allowed trigger is 50,000. The page says threshold compaction is in beta on select models."
  - title: "OpenAI, GPT 5.6 Sol model page"
    url: "https://developers.openai.com/api/docs/models/gpt-5.6-sol"
    note: "Re-read November 9, 2026. Window 1,050,000 tokens. The 4 USD and 20 USD rates are labeled promotional through November 30, 2026. Above 272,000 input tokens the page charges 2 times input and 1.5 times output."
  - title: "OpenAI, compaction guide"
    url: "https://developers.openai.com/api/docs/guides/compaction"
    note: "Re-read November 9, 2026. The carried item is opaque and not intended to be human-interpretable."
  - title: "SWE-bench leaderboards"
    url: "https://www.swebench.com/"
    note: "Opened again November 9, 2026. The highest embedded Verified rate was still 79.2%, and the newest dates in that table were still in February 2026."
  - title: "Yao et al., ReAct (arXiv:2210.03629)"
    url: "https://arxiv.org/abs/2210.03629"
    note: "The report cites this as the loop its harness implements."
citation:
  apa: "Belcak, P., Muralidharan, S., Jiang, J., Fu, Y., Byeon, W., Ye, H., Angilly, R., Taghibakhshi, A., Liu, S.-Y., Ouyang, S., Heinrich, G., & Molchanov, P. (2026, November 3). You don't need long context. arXiv:2611.05306."
  bibtex: |
    @article{belcak2026longcontext,
      title={You don't need long context},
      author={Belcak, Peter and Muralidharan, Saurav and Jiang, Jindong and Fu, Yonggan and Byeon, Wonmin and Ye, Hanrong and Angilly, Ryan and Taghibakhshi, Ali and Liu, Shih-Yang and Ouyang, Siru and Heinrich, Greg and Molchanov, Pavlo},
      journal={arXiv preprint arXiv:2611.05306},
      year={2026},
      url={https://arxiv.org/abs/2611.05306}
    }
faq:
  - question: "What does the report actually claim?"
    answer: "That the tasks people treat as long-context tasks did not need a long live context in these experiments. A harness that compacts the conversation, or that lets the model read long files in pieces, kept Claude Opus 4.5 and GPT 5.6 Sol close to their full-history scores. The authors' own conclusion says this does not prove the same for every task."
  - question: "When was it released, and who wrote it?"
    answer: "arXiv lists it as submitted on November 3, 2026, with the comment that it is a technical report of 31 pages and 8 figures. The authors are Peter Belcak, Saurav Muralidharan, Jindong Jiang, Yonggan Fu, Wonmin Byeon, Hanrong Ye, Ryan Angilly, Ali Taghibakhshi, Shih-Yang Liu, Siru Ouyang, Greg Heinrich, and Pavlo Molchanov. The report points to the Deep Learning Efficiency Research lab page and to NVIDIA Research's Local Frontier Intelligence project. This breakdown was published November 4, 2026."
  - question: "What is compaction in this report?"
    answer: "When the conversation crosses a set length, the model is told to stop working and write a handoff. The handoff is supposed to keep the task, the current plan, and the facts the next stretch needs. The harness then opens a new conversation that contains the original task and that handoff, under the same system prompt. Single-action compaction does this after every environment action."
  - question: "Did one action per turn still solve software tasks?"
    answer: "On the authors' runs, yes, with small moves rather than a collapse. Claude Opus 4.5 went from 70.0% to 70.2% on SWE-bench Verified and from 47.2% to 51.8% on Terminal-Bench 2.1. GPT 5.6 Sol went from 84.4% to 82.4% and from 87.6% to 84.3%. The median of the longest single call in that setting was 7,000 to 9,000 tokens."
  - question: "Did every model tolerate a short context?"
    answer: "No. In the open-weight SWE-bench Verified table, Qwen 3 Coder Next scored 53.0% with a full history and 3.6% when the total context limit was 16,000 tokens and compaction started at 12,000. Qwen 3.6 27B and MiniMax M2.7 lost less at that same setting, moving from 68.6% to 65.0% and from 72.6% to 67.8%."
  - question: "Is this the same feature Anthropic and OpenAI already ship?"
    answer: "Both companies document compaction, and it is a different procedure from this report. Re-read on November 9, 2026, Anthropic's threshold compaction still defaults to 150,000 input tokens and cannot be set below 50,000. The page says threshold compaction is in beta on select models, and it adds separate rules for Claude 5.1 and later. OpenAI's guide says the compaction item is opaque and not intended to be human-interpretable. The report compacts much earlier, often between 6,000 and 36,000 tokens, and the handoff is text the model writes for the next conversation."
  - question: "Where is the paper, and is there code?"
    answer: "The report is on arXiv as 2611.05306. The PDF and the HTML version are linked from that record. The report also links the lab page and the Local Frontier Intelligence project page. It uses the public mini-swe-agent harness, version 2.4, and describes the compaction prompts in an appendix. This page did not find a separate code release for those harness changes."
---

## How it compares with methods in use today

The report compares each short-context run with the same model and harness keeping the full history. It does not enter those numbers on a public leaderboard. This section puts the report next to three live sources. The authors' tables are unchanged. The compaction docs from Anthropic and OpenAI were re-read on November 9, 2026. The SWE-bench leaderboard page was opened the same day, and its highest embedded Verified rate was still 79.2%.

**Against a growing transcript.** On SWE-bench Verified, 500 tasks, the full-history scores are 70.0% for Claude Opus 4.5 and 84.4% for GPT 5.6 Sol. Compaction, written as "total context limit / threshold" in tokens:

| Setting | Opus 4.5 resolved | GPT 5.6 Sol resolved |
| --- | --- | --- |
| Full history | 70.0% | 84.4% |
| 48,000 / 36,000 | 73.6% | 88.8% |
| 32,000 / 24,000 | 72.0% | 85.0% |
| 24,000 / 18,000 | 74.8% | 85.0% |
| 16,000 / 12,000 | 68.8% | 84.6% |

The only Opus cell under the full-history score is the tightest one, by 1.2 points. Every GPT 5.6 Sol cell in that table is at or above 84.4%. The authors' estimated optimized cost for the whole benchmark falls from 420.00 USD to 62.53 USD for Opus, and from 167.68 USD to 40.62 USD for GPT 5.6 Sol, at the 16,000 token setting. That estimate is defined in Appendix B. It is not a bill.

SWE-bench Multilingual, 300 tasks, is flatter. Opus moves from 66.3% to a best of 68.0% at 48,000 / 36,000, and to 64.3% at 16,000 / 12,000. GPT 5.6 Sol moves from 79.3% to 80.0%, then to 77.7% at the tightest setting. The caption on that table says the Opus run is Claude Opus 4.5 High and the GPT run is GPT 5.6 Sol Medium. The SWE-bench Verified table does not repeat those effort labels.

Terminal-Bench 2.1, 89 tasks, is where Opus gains the most in the long-horizon group: 47.2% full history, 52.8% at 32,000 / 24,000. GPT 5.6 Sol goes from 87.6% to 88.8% at 48,000 / 36,000, then to 85.4% at the two tightest settings.

FRAMES is the clearest long-horizon loss. Full history scores 81.0% and 90.2%. Every compaction setting is lower, down to 77.3% for Opus and 86.9% for GPT 5.6 Sol. The report still treats the band as small next to the cost change. A reader who needs those questions answered correctly should not round that into "no loss."

**Against one action per conversation.** Single-action compaction is the extreme. The model acts once, writes the state, and the next call starts clean.

| Benchmark | Model | Full history | Best compaction in the table | One action per call |
| --- | --- | --- | --- | --- |
| SWE-bench Verified | Opus 4.5 | 70.0% | 74.8% (24,000 / 18,000) | 70.2% |
| Terminal-Bench 2.1 | Opus 4.5 | 47.2% | 52.8% (32,000 / 24,000) | 51.8% |
| SWE-bench Verified | GPT 5.6 Sol | 84.4% | 88.8% (48,000 / 36,000) | 82.4% |
| Terminal-Bench 2.1 | GPT 5.6 Sol | 87.6% | 88.8% (48,000 / 36,000) | 84.3% |

Median peak context under the one-action setting is 8,000 tokens on SWE-bench Verified for Opus and 7,000 for GPT 5.6 Sol. The full-history maximums on those two rows are 200,000 and 173,000 tokens. The one-action maximums are 16,000 and 15,000.

**Against reading the whole document.** When the input itself is long, the harness puts the files on disk and lets the model search. On Needle in a Haystack, both models reach 100% and never compact. The full-document baselines are 60.0% and 80.0%. On AA-LCR, Opus moves from 65.0% to 84.0% at a 16,000 token limit, and GPT 5.6 Sol from 82.0% to 83.0%. On BABILong, the gains are 67.1% to 92.0% and 70.7% to 94.0%. The report's stated range for Opus on the long-input group is 0.4 points down to 40.0 points up. The 40 point jump is the needle test, 60.0% to 100%.

**Against the compaction already in products.** Anthropic's context-window page, re-read November 9, 2026, says server-side compaction is the primary way to manage long agent conversations, and that accuracy falls as the token count grows. The separate threshold page still sets the default trigger at 150,000 input tokens, with 50,000 as the minimum. It now says threshold compaction is in beta on select models, and it adds rules for Claude 5.1 and later: a custom-instruction summary sees the visible conversation, and earlier thinking blocks are not part of that summary. OpenAI's GPT 5.6 Sol page lists a 1,050,000 token window. The card shows 4 USD per million input tokens, 0.40 USD cached input, and 20 USD per million output tokens. The page calls the 4 USD and 20 USD rates promotional through November 30, 2026. Prompts above 272,000 input tokens are priced at 2 times input and 1.5 times output for the whole request, which is 8 USD and 30 USD on those promotional rates. The 4 USD and 20 USD figures match the nominal rates the report cites from OpenAI documentation it accessed on September 29, 2026. The November 9 page adds the promotion end date and the multipliers. OpenAI's compaction guide says the carried item is opaque and not intended to be human-interpretable.

The report is testing a tighter version of an idea both vendors already ship, and the handoff is text a person can read. It measures the authors' harness. The vendor compaction features are a separate implementation. Its Opus model is Claude Opus 4.5. Anthropic's 1 million token list on the November 9 page names Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, Claude Mythos 5, Claude Opus 5.5, Claude Opus 5, Claude Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, Claude Sonnet 5.5, Claude Sonnet 5, Claude Sonnet 4.6, Claude Haiku 5.5, and Claude Mythos Preview. Opus 4.5 does not appear on that list. The report's own reference window for Opus 4.5, from Anthropic docs it accessed on September 29, 2026, is 200,000 tokens. The November 9 page still places models outside that 1 million list, including deprecated Claude Sonnet 4.5, at 200,000 tokens.

**Against the public SWE-bench leaderboard.** The [SWE-bench](https://www.swebench.com/) page, opened again on November 9, 2026, still embeds a Verified table whose highest resolved rate is 79.2%, for Claude 4.5 Opus with live-SWE-agent, dated December 15, 2025, and the same 79.2% for the Sonar Foundation Agent, dated December 5, 2025. The mini-SWE-agent row named "Claude 4.5 Opus (high)," version 2.0.0, dated February 17, 2026, is 76.8%. The newest dates in that embedded Verified table are still in February 2026. GPT 5.6 Sol does not appear. The report uses mini-swe-agent 2.4 and prints 70.0% as its own Opus full-history baseline. Those are different runs. A higher number in the report is a different harness, and the lower baseline is the authors' own full-history run.

**Against smaller open models.** The negative result is part of the finding. On SWE-bench Verified, five local models:

| Model | Full history | 48,000 / 40,000 | 32,000 / 24,000 | 16,000 / 12,000 |
| --- | --- | --- | --- | --- |
| Qwen 3.6 27B | 68.6% | 69.4% | 68.2% | 65.0% |
| Qwen 3 Coder Next | 53.0% | 49.2% | 40.4% | 3.6% |
| Gemma 4 31B | 65.2% | 65.0% | 65.8% | 58.0% |
| Step 3.7 Flash | 70.0% | 66.8% | 64.6% | 56.6% |
| MiniMax M2.7 | 72.6% | 73.0% | 73.2% | 67.8% |

At the tightest budget every one of these five is below its own full-history score. Qwen 3 Coder Next is the collapse. The report's broad claim is about the frontier closed models it studied, plus a warning that a short window can still starve a model whose traces are long.

## What the experiments controlled

Names and numbers below are the ones printed in the November 3 report unless a link says otherwise.

**What "short" means here.** The report calls a context long when it is a large fraction of the windows common at the time of the study, which it puts at about 256,000 tokens or more. It calls a context short, in the regimes it emphasizes, when the limit is about 16,000 to 50,000 tokens. That is short relative to a million-token window. It is still a lot of text.

**The three harnesses.** All three are the same agent loop. Full-history accumulation never deletes a turn. End-of-conversation compaction follows that loop until the length crosses a threshold, asks for a bounded handoff, and resumes in a new conversation. If the handoff does not finish before a higher total limit, the conversation is stopped. Single-action compaction gives each call the task and the current written state, takes one environment action, records the result, updates the state, and discards the conversation.

The handoff prompt in the mini-swe-agent appendix tells the model to stop, not to run commands, and to record the objective, established facts, applied changes, verification, dead ends, and the remaining plan. The authors say the useful handoff is a brief for the work still to do, not a narrative of everything that happened.

**Serving cost.** GLM 5.2 and Kimi K2.6 run on 16 H100 GPUs, with INT4 weights and BF16 activations. Kimi also uses an FP8 key-value cache. Qwen 3 Coder Next runs on 8 H100s in BF16. The setup prefills a long prefix, turns on prefix caching, and has each request generate 1,024 tokens. The highest throughput without key-value preemption is the number they keep. Repeated measurements varied by at most 2%. Figure 1 converts that throughput at 3.85 USD per H100-hour. The 7 times gap is Qwen at 256,000 tokens versus 16,000, not a retail price anyone is charged for Claude or GPT.

**One action, and the model they did not train.** Section 5 asks whether a model could live entirely on a written state: read the state, act once, update the state, and let a fresh call continue. They name that idea a semantic state space model, to separate it from a neural state-space model whose state is a vector. The utility they claim for it is the cost of short contexts, already measured. The further claim, that such a model would be easier to train because it would not have to learn where to look in a long history, is marked as a surmise. No trained semantic state space model is in the report.

## Read the paper

The report, the lab page it links, and the harness it starts from:

- [You don't need long context](https://arxiv.org/abs/2611.05306)
- [HTML version](https://arxiv.org/html/2611.05306)
- [Deep Learning Efficiency Research](https://nv-dler.github.io)
- [Local Frontier Intelligence](https://research.nvidia.com/labs/lpr/lfi/)
- [mini-swe-agent](https://github.com/SWE-agent/mini-swe-agent)

Related pages on this site: [harnesses](/topics/harnesses), [how agents work](/topics/how-agents-work), [task performance](/topics/task-performance), [context window](/glossary/context-window), [ReAct](/research/react-reasoning-and-acting), and [agents](/glossary/agent).
