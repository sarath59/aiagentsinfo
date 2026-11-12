---
title: "SpecCompact agent context compaction: 8.68× median"
description: "SpecCompact speeds agent context compaction: 8.68× median in a Hermes user study, and 2.04–5.63× versus Hermes-style summaries on AppWorld and τ³. November 4, 2026."
absoluteTitle: true
ledeQuestion: "What is SpecCompact agent context compaction?"
ledeAnswer: "A November 4, 2026 method that sped a Hermes user-study compaction by 8.68× at the median."
dataset:
  title: "SpecCompact compaction speedups, November 2026"
  description: "Speedups from An, Feng, and Yin, arXiv:2611.06876. Hermes user-study median paired speedup was 8.68×. AppWorld and τ³ speedups were 2.04–5.63×."
  isBasedOn: "https://arxiv.org/abs/2611.06876"
date: "2026-11-05"
updated: "2026-11-12"
type: paper-breakdown
topics:
  - harnesses
  - how-agents-work
  - task-performance
  - research
companies:
  - arxiv
  - github
  - google
paperTitle: "SpecCompact: Accelerating LLM Agent Context Compaction with Slot-Parallel Semantic Speculative Verification"
paperAuthors: "Yulu An, Yifei Feng, Xiangyang Yin"
paperYear: 2026
paperUrl: "https://arxiv.org/abs/2611.06876"
venue: "arXiv technical paper, 2611.06876, submitted November 4, 2026"
abstract: |
  An agent harness has to keep a growing transcript short enough for the next model call. The usual fix is context compaction: ask a large model to summarize the history. That summary is itself a long generation, and the wait shows up in the product. On November 4, 2026, Yulu An, Yifei Feng, and Xiangyang Yin, listed at New York University, posted SpecCompact, a way to draft that summary faster.

  The summary is split into six fixed slots, the same kind of fields OpenClaw already uses: the goal, the constraints, the progress, the decisions, the next steps, and the critical details. A small fine-tuned model proposes lines for every slot at once. The large target model checks each line and rewrites the ones it rejects. The drafter then continues from that updated text. The authors also cut repeated work in the serving stack.

  On their AppWorld and τ³ runs, compaction was 2.04–5.63× faster than a Hermes-style summary. A user study inside the Hermes agent measured an 8.68× median speedup. Task scores moved with the target model. Full history, with no compaction, stayed the strongest accuracy reference in their tables. The speedup is the result. A better score is not.
whyItMatters: |
  Context compaction is harness engineering. The model stays frozen. The software around it decides what the next call is allowed to see. OpenClaw and Hermes, two agent frameworks in wide use, already compact with a structured summary. SpecCompact keeps that structure and tries to produce it with less waiting: a small drafter, six slots in parallel, and the target model as the checker.

  Checked on November 5, 2026, both projects still ask one model for one summary. OpenClaw's public compaction page says older turns are summarized in one request, the summary is stored in the transcript, and recent messages stay intact. The checkpoint prompt in the OpenClaw harness still uses the six sections this paper drafts separately. Hermes's context compressor, in the repository that day, writes a longer structured handoff in one summarizer call and, by the project's own developer guide, fires at 50% of the context window by default. SpecCompact is a different procedure inside that same job. It is not a new agent framework, and it does not replace the loop, the tools, or the memory files around the model.

  The practical question for a harness is whether the faster summary still carries the task. In this paper the answer depends on which target model is checking the draft. The numbers below are the authors' own baselines, run under their protocol. They are not a stopwatch of the November 5 OpenClaw or Hermes services. For a different compaction design, a written handoff on frontier APIs, see the site's breakdown of the November 3 report on short working memory. For the loop these systems sit on, see the ReAct note and the glossary entries for a harness and an agent.
keyFindings:
  - "On 100 LiveClawBench trajectories, six slots each, an LLM judge scored independent slot generation at a mean adequacy of 4.73, against 4.44 when all six slots were written in one pass. Scores of at least 4 covered 93% of slots and 85%. The score runs from 0 to 5 as the sum of five yes-or-no checks. Reversing generation order changed the mean by at most 0.03."
  - "Against Hermes-style summarization, on 20 matched inputs per workload, Gemma4-31B-IT compacted the agent workloads in 8.26, 9.14, and 6.43 seconds (4.71×, 4.28×, and 5.63×). Hermes took 38.89, 39.12, and 36.21 seconds. Qwen3.5-122B-A10B was 2.04–2.41× on the same three workloads. The abstract's 2.04–5.63× range is those AppWorld and τ³ speedups."
  - "On LongBench inputs of about 16,000 tokens, the same comparison was 2.49× for Gemma 4 (29.72 seconds versus 74.13) and 1.36× for Qwen3.5 (21.67 seconds versus 29.43). SpecCompact beat the paper's OpenClaw baseline on seven of eight latency settings. The miss is Qwen3.5 on τ³: 8.71 seconds versus OpenClaw's 7.68."
  - "Inside the Hermes codebase, with Gemma 4 on four NVIDIA RTX PRO 6000 GPUs, median compaction time fell from 63.74 seconds to 7.28 seconds. The median paired speedup was 8.68×. Of 28 blind summary preferences, 11 (39.3%) favored SpecCompact, 8 (28.6%) favored Hermes, 8 (28.6%) rated them similar, and 1 (3.6%) could not judge."
  - "Task scores are model-dependent. Versus Hermes, Gemma 4 lost 2.98 and 4.07 percentage points of AppWorld task-goal completion on the Normal and Challenge splits, and 2.50 points of τ³ success. Qwen3.5 gained 4.76 and 1.68 task-goal points on those splits and 0.83 points of τ³ success, and lost 0.72 points of Challenge scenario-goal completion. Full History is the top score in every column of that table."
  - "On LongBench and RULER, SpecCompact stayed within 0.6 points of target-self slot generation for Qwen3.5 on both LongBench sets and scored higher at both RULER lengths. On Gemma 4 it scored 0.83–4.50 points below target-self. Full history remains far above either compaction method on RULER."
  - "System optimizations, on top of slot-parallel drafting, cut agent-workload latency by a further 1.88–2.44× for Gemma 4 and 1.19–1.51× for Qwen3.5. Gemma 4 on AppWorld Normal fell from 20.17 seconds to 8.26. The paper says the full task evaluation uses the original implementation and has not been repeated with all of those optimizations."
methodology: |
  The source is arXiv 2611.06876, version 1, category cs.CL. The Atom record lists it as published November 4, 2026 at 18:34:41 UTC. The PDF date line reads 4 Nov 2026. The authors are Yulu An, Yifei Feng, and Xiangyang Yin, with equal contribution. The PDF lists New York University under each name, and Xiangyang Yin is the corresponding author. The HTML author block also prints SpecCompact as an affiliation. This page did not find a code release on the arXiv record.

  SpecCompact fine-tunes a Qwen3-0.6B drafter, separately for each target, and generates six summary slots in parallel. The targets are Gemma4-31B-IT and Qwen3.5-122B-A10B. The target model accepts or rejects each proposed line. A line is accepted when its normalized positive-judgment score is at least η = 0.7. A rejection is replaced by text the target writes, and the drafter continues from that prefix. The six slots follow the OpenClaw schema named in the paper: Goal, Constraints and Preferences, Progress, Key Decisions, Next Steps, and Critical Context.

  Agent tasks are the full AppWorld Test-Normal and Test-Challenge sets, plus three trials per task on an 80-task random subset of τ³ for each target. Long-context compaction uses LongBench GovReport and QMSum (ROUGE-L) and the full five RULER task types at 8,000 and 16,000 tokens. Latency uses 20 matched inputs per workload, served with vLLM on NVIDIA RTX PRO 6000 Blackwell GPUs. Histories are compacted every eight agent calls. The drafter's training set is described as about 50K training data drawn from AppWorld, τ³, and LiveClawBench.
limitations:
  - "The paper says SpecCompact does not offer a consistent accuracy advantage over summarization by the target model itself. The authors' suggestion is better drafter–target alignment, and they name the reinforcement-learning approach in DREAM-R as one route. That experiment is not in this paper."
  - "The latency setup gives the drafter its own GPU, on top of one GPU for Gemma 4 in BF16 or two GPUs for Qwen3.5 in FP8. The speedups are not a same-hardware comparison with a single target model."
  - "Draft acceptance with Qwen3.5 was 19.6 percentage points lower than with Gemma 4. The paper also says its vLLM deployment gets limited prefix-cache reuse on Qwen3.5's hybrid attention, because the linear-attention layers need recurrent state and not only a cached prefix. Absolute acceptance rates are not printed."
  - "On the agent benchmarks, Gemma 4 with SpecCompact scores below the paper's Hermes baseline. The reported gains on Qwen3.5 do not show up as a win on every AppWorld column, and OpenClaw's compaction baseline is ahead of SpecCompact on some of those Qwen cells."
  - "Full History, with no compaction, is the highest score in every agent column and every long-context column. On RULER, compaction drops Gemma 4 from 91.72 and 92.12 to 66.50 and 68.55, and Qwen3.5 from 90.92 at both lengths to 74.23 and 72.60."
  - "The paper says the full task evaluation uses the original implementation and has not been repeated with all system optimizations. The fast times in the latency table should not be read as a paired measurement of the task scores."
  - "The user study is three scenarios from the authors' own workflows, coding, math, and multitask question answering, with both methods started from the same saved snapshot. The paper reports 28 summary-preference responses. It does not report how many people took part, and it does not print the tally for the separate blind question about which compaction felt faster."
  - "The benchmark latency tables print one time per cell on 20 matched inputs per workload. They do not say whether that time is a mean. The user study separately reports medians on the Hermes snapshots. Neither set is a measurement of every task in AppWorld or τ³. This page did not find a code release linked from the arXiv record."
references:
  - title: "An, Feng, and Yin, SpecCompact (arXiv:2611.06876)"
    url: "https://arxiv.org/abs/2611.06876"
  - title: "HTML version of the paper"
    url: "https://arxiv.org/html/2611.06876"
  - title: "PDF of the paper"
    url: "https://arxiv.org/pdf/2611.06876"
  - title: "Nous Research, Hermes agent"
    url: "https://github.com/NousResearch/hermes-agent"
    note: "The paper cites this repository. The template described on this page was read from main at commit be765e31 on November 5, 2026."
  - title: "OpenClaw, compaction"
    url: "https://docs.openclaw.ai/concepts/compaction"
    note: "Read November 5, 2026. The paper cites this page for the six-slot schema."
  - title: "OpenClaw summary-checkpoint prompt on main"
    url: "https://github.com/openclaw/openclaw/blob/291428568d404edb7b6c4f63dd1d09e867a6acc8/packages/agent-core/src/harness/compaction/summary-checkpoint-prompt.ts"
    note: "Repository HEAD on November 5, 2026. Six-section checkpoint used by the harness."
  - title: "Chen et al., Slipstream (arXiv:2605.08580)"
    url: "https://arxiv.org/abs/2605.08580"
    note: "Cited by SpecCompact as asynchronous compaction that keeps running the agent and then checks the summary."
  - title: "Cim et al., Parallel Context Compaction (arXiv:2605.23296)"
    url: "https://arxiv.org/abs/2605.23296"
    note: "Cited by SpecCompact as summarizing input blocks concurrently."
  - title: "Pan et al., SpecReason (arXiv:2504.07891)"
    url: "https://arxiv.org/abs/2504.07891"
    note: "Cited as semantic speculation over reasoning steps."
  - title: "Hu et al., DREAM-R (arXiv:2605.28678)"
    url: "https://arxiv.org/abs/2605.28678"
    note: "Cited for binary semantic verification and for reinforcement learning that aligns a drafter. The SpecCompact authors name it as future alignment work."
  - title: "Long et al., LiveClawBench (arXiv:2604.13072)"
    url: "https://arxiv.org/abs/2604.13072"
    note: "Source of the 100 trajectories in the slot-independence study, and one source of drafter training data."
citation:
  apa: "An, Y., Feng, Y., & Yin, X. (2026, November 4). SpecCompact: Accelerating LLM agent context compaction with slot-parallel semantic speculative verification. arXiv:2611.06876."
  bibtex: |
    @article{an2026speccompact,
      title={SpecCompact: Accelerating LLM Agent Context Compaction with Slot-Parallel Semantic Speculative Verification},
      author={An, Yulu and Feng, Yifei and Yin, Xiangyang},
      journal={arXiv preprint arXiv:2611.06876},
      year={2026},
      url={https://arxiv.org/abs/2611.06876}
    }
faq:
  - question: "What is agent context compaction, and what does SpecCompact change?"
    answer: "Context compaction is the harness step that replaces a long agent transcript with a shorter summary so later calls still fit. SpecCompact keeps a structured summary and changes how it is written. A fine-tuned Qwen3-0.6B model drafts six slots at the same time. The target model checks each line, rewrites rejected lines, and the drafter continues from the text that was kept."
  - question: "When was the paper released, and who wrote it?"
    answer: "arXiv lists version 1 as published November 4, 2026, at 18:34:41 UTC, in cs.CL. The authors are Yulu An, Yifei Feng, and Xiangyang Yin, equal contribution, with New York University listed under each name. Yin is the corresponding author. The HTML author block also prints SpecCompact. This breakdown was published November 5, 2026."
  - question: "How much faster is compaction than a Hermes-style summary?"
    answer: "On 20 matched inputs per workload, Gemma4-31B-IT was 4.28–5.63× faster on the AppWorld and τ³ compaction workloads, and 2.49× faster on LongBench at about 16,000 tokens. Qwen3.5-122B-A10B was 2.04–2.41× on the agent workloads and 1.36× on that LongBench slice. In the Hermes user study the median time fell from 63.74 seconds to 7.28 seconds, and the median paired speedup was 8.68×. Those are different measurements."
  - question: "Does the faster summary still complete the task?"
    answer: "Sometimes it is close, and it depends on the model. Against the paper's Hermes baseline, Gemma 4 lost 2.98 and 4.07 percentage points of AppWorld task-goal completion and 2.50 points of τ³ success. Qwen3.5 gained 4.76 and 1.68 task-goal points and 0.83 points of τ³ success, and lost 0.72 points of Challenge scenario-goal completion. Keeping the full history scored higher than every compaction method in that table."
  - question: "What are the six slots in the OpenClaw schema?"
    answer: "The paper uses Goal, Constraints and Preferences, Progress, Key Decisions, Next Steps, and Critical Context. Progress is further split into Done, In Progress, and Blocked. Each drafter request sees the shared history and the full schema, and is asked to write only one slot. On November 5, 2026, the OpenClaw harness source still builds one checkpoint with those same section headings."
  - question: "How is this different from Hermes and OpenClaw compaction in current agent frameworks?"
    answer: "On November 5, 2026, OpenClaw's compaction docs describe one summarizer request over older history, with recent messages kept and the full transcript left on disk. Hermes's compressor writes one structured summary and updates it on later compactions. Its developer guide says that compressor fires at 50% of the context window by default. SpecCompact splits the summary into parallel drafts and spends an extra model, the 0.6B drafter, on proposing lines for the target to accept or repair. The speed numbers in the paper are against the authors' Hermes-style and OpenClaw-style baselines, not a published benchmark of those products' hosted services."
  - question: "What did the Hermes user study actually measure?"
    answer: "The authors wired SpecCompact into the Hermes codebase and ran Gemma 4 on four RTX PRO 6000 GPUs. They built three scenarios from their own work, paused Hermes at a fixed snapshot, and had people trigger each method from that same snapshot without being told which was which. The recorded medians were 63.74 seconds and 7.28 seconds, with an 8.68× median paired speedup. A separate blind preference on the summaries, 28 responses, split 11 for SpecCompact, 8 for Hermes, 8 similar, and 1 unable to judge."
  - question: "Where is the paper, and is there code?"
    answer: "The record is arXiv 2611.06876. The abstract page, the HTML version, and the PDF are linked in the references on this page. The paper cites the Hermes agent repository and the OpenClaw compaction docs. This page did not find a separate SpecCompact code release on the arXiv record."
---

## What is SpecCompact agent context compaction?

SpecCompact is a November 4, 2026 method that drafts an agent’s context summary faster. A Hermes user study in the paper measured an 8.68× median speedup. The harness guides that this compaction sits inside are on [Agent harnesses](/topics/harnesses).

## How it compares with methods in use today

The paper's comparisons are internal. Full History keeps the transcript. Hermes and OpenClaw are the authors' structured-summary baselines, sharing a 2,048-token summary budget with SpecCompact. Target-self, used on the long-document benchmarks, is the target model writing each slot itself, with no drafter and no semantic check. This section puts those tables next to the OpenClaw and Hermes compaction practice that was public on November 5, 2026. No latency number below is taken from a live product dashboard.

### OpenClaw and Hermes as agent frameworks compact today

[OpenClaw's compaction page](https://docs.openclaw.ai/concepts/compaction), read November 5, 2026, says a conversation that nears the context window has its older turns summarized, the summary is saved in the session transcript, and recent messages stay intact. The full history remains on disk. Built-in compaction summarizes the older history in one model request. A split turn adds a request for the turn prefix, and a failed safeguard quality audit adds one request per corrective attempt. Each request's conversation input is capped at 160,000 characters, which the page calls about 40,000 tokens, or less when the summarizer's own window is smaller. Auto-compaction is on by default. New configs default the mode to `safeguard`. Manual client-side compaction keeps a recent tail, with `keepRecentTokens` defaulting to 20,000. That 20,000 is the tail left verbatim. It is not the length of the summary, and it is not the 2,048-token budget in the paper.

The six names in the paper are still the harness format. On November 5, 2026, OpenClaw main (`29142856`) builds the checkpoint in `summary-checkpoint-prompt.ts` as one block: Goal, Constraints & Preferences, Progress with Done, In Progress, and Blocked, Key Decisions, Next Steps, and Critical Context. The paper's slot contracts follow that schema, including the instruction to preserve exact file paths, function names, and error messages. The public concepts page describes when compaction runs. It does not print these headings. The headings live in the harness source, and the summarizer still fills them in a single request.

[Hermes](https://github.com/NousResearch/hermes-agent), the repository the paper cites, is a different template and the same shape of work: one summarizer call. On November 5, 2026, main (`be765e31`) asks `agent/context_compressor.py` for a checkpoint with Historical Task Snapshot, Goal, Constraints & Preferences, Completed Actions, Active State, Blocked, Key Decisions, Errors & Fixes, Resolved Questions, Relevant Files, Critical Context, and Unverified / Working Hypotheses, plus a conditional Pruned Skills section. A later compaction updates the previous summary instead of starting from nothing. If the summary call fails, a deterministic fallback fills the same kind of headings from text it can extract locally. The developer guide in that repository says the agent compressor fires at 50% of the context window by default, and a gateway safety pass fires at 85%. Figure 2(a) in the paper draws a shorter Hermes sketch beside OpenClaw. This page uses the November 5 source for the live template, and the paper's tables for the Hermes-style baseline the authors timed.

SpecCompact, in the paper, is a generation method. The experiments compact on a fixed cadence, every eight agent calls, rather than at the 50% or context-window triggers above. What changes is how the summary is written: six drafts, a small model proposing lines, and the target accepting or repairing them.

### Latency against Hermes-style and OpenClaw-style summaries

Table 3 in the paper is 20 matched inputs per workload. Speedup is relative to Hermes. SpecCompact uses an additional drafter GPU. Times are seconds.

| Target | Workload | Hermes | OpenClaw | SpecCompact | Versus Hermes |
| --- | --- | --- | --- | --- | --- |
| Gemma4-31B-IT | AppWorld Normal | 38.89 | 16.44 (2.37×) | 8.26 | 4.71× |
| Gemma4-31B-IT | AppWorld Challenge | 39.12 | 18.70 (2.09×) | 9.14 | 4.28× |
| Gemma4-31B-IT | τ³ | 36.21 | 13.19 (2.75×) | 6.43 | 5.63× |
| Gemma4-31B-IT | LongBench, about 16k | 74.13 | 63.55 (1.17×) | 29.72 | 2.49× |
| Qwen3.5-122B-A10B | AppWorld Normal | 18.03 | 7.87 (2.29×) | 7.49 | 2.41× |
| Qwen3.5-122B-A10B | AppWorld Challenge | 16.98 | 8.69 (1.95×) | 7.55 | 2.25× |
| Qwen3.5-122B-A10B | τ³ | 17.81 | 7.68 (2.32×) | 8.71 | 2.04× |
| Qwen3.5-122B-A10B | LongBench, about 16k | 29.43 | 24.62 (1.20×) | 21.67 | 1.36× |

The abstract's range, 2.04–5.63×, is the six AppWorld and τ³ cells. LongBench sits outside that sentence. On Gemma 4 the agent rows are 4.28–5.63×. On Qwen3.5 they are 2.04–2.41×. OpenClaw-style summarization is already 1.95–2.75× faster than Hermes on the agent rows, and SpecCompact is faster than that OpenClaw baseline in seven of the eight settings. The exception is Qwen3.5 on τ³.

The paper gives three reasons the Qwen3.5 speedups are smaller. Its Hermes baseline is already quicker. The 0.6B drafter matches it less well: draft acceptance is 19.6 percentage points lower than with Gemma 4. And the authors' vLLM setup reuses less of the cached prefix on Qwen3.5, because that model's linear-attention layers also have to restore recurrent state. The paper does not print the acceptance rates themselves, only the 19.6 point gap.

### Whether the compacted harness still finishes the task

Table 1 is task performance in percent. Full History does not compact. Bold in the paper marks the best compaction result, which is not copied here. Each cell in the paper also has a 95% confidence interval. The intervals are wide beside the gaps. Gemma 4's AppWorld Normal task-goal scores are 57.74 with interval [47.02, 67.86] for Hermes and 54.76 with interval [44.05, 65.48] for SpecCompact. The point differences below are the ones the paper states, plus the cells it prints.

| Target | Method | Normal TGC | Normal SGC | Challenge TGC | Challenge SGC | τ³ success |
| --- | --- | --- | --- | --- | --- | --- |
| Gemma4-31B-IT | Full History | 62.50 | 46.43 | 53.24 | 41.73 | 52.08 |
| Gemma4-31B-IT | OpenClaw | 58.93 | 44.64 | 46.52 | 33.09 | 47.50 |
| Gemma4-31B-IT | Hermes | 57.74 | 39.29 | 47.24 | 32.37 | 50.00 |
| Gemma4-31B-IT | SpecCompact | 54.76 | 37.50 | 43.17 | 28.06 | 47.50 |
| Qwen3.5-122B-A10B | Full History | 40.48 | 26.79 | 20.62 | 8.63 | 67.92 |
| Qwen3.5-122B-A10B | OpenClaw | 28.57 | 14.29 | 17.75 | 8.63 | 65.83 |
| Qwen3.5-122B-A10B | Hermes | 28.57 | 14.29 | 14.39 | 7.19 | 63.75 |
| Qwen3.5-122B-A10B | SpecCompact | 33.33 | 21.43 | 16.07 | 6.47 | 64.58 |

TGC is task goal completion. SGC is scenario goal completion. Against Hermes, the paper says Gemma 4 loses 2.98 and 4.07 percentage points of TGC on Normal and Challenge, and 2.50 points of τ³ success. Qwen3.5 gains 4.76 and 1.68 TGC points on those splits and 0.83 points of τ³ success, and loses 0.72 points of Challenge SGC. The Qwen Normal SGC cell, which the paper's prose does not highlight, is 21.43 for SpecCompact and 14.29 for both Hermes and OpenClaw.

Read by column, Full History is the highest score everywhere, tied with OpenClaw on Qwen Challenge SGC at 8.63. On Gemma 4, SpecCompact is the lowest compaction score in the table, tied with OpenClaw on τ³ at 47.50. On Qwen3.5 it is the best compaction score on Normal TGC, Normal SGC, and, versus Hermes only, on τ³. OpenClaw is ahead of it on Challenge TGC (17.75 versus 16.07), Challenge SGC (8.63 versus 6.47), and τ³ (65.83 versus 64.58). Faster compaction and a higher task score are not the same result.

AppWorld here is the full Test-Normal and Test-Challenge sets. τ³ is three trials per task on an 80-task subset chosen at random, separately for each target. The paper cites that benchmark as Shi et al., τ-Knowledge, arXiv:2603.04370.

### LongBench and RULER

Table 2 is the long-document check. LongBench numbers are ROUGE-L as printed. RULER numbers are the official matching scores, scaled to 100. Execution failures count as zero. Target-self is the control that matters for the method: the same slots, written by the target, with no drafter.

| Target | Method | GovReport | QMSum | RULER 8k | RULER 16k |
| --- | --- | --- | --- | --- | --- |
| Gemma4-31B-IT | Full History | 28.36 | 24.34 | 91.72 | 92.12 |
| Gemma4-31B-IT | Target-self | 25.05 | 18.35 | 71.00 | 71.02 |
| Gemma4-31B-IT | SpecCompact | 22.28 | 17.52 | 66.50 | 68.55 |
| Qwen3.5-122B-A10B | Full History | 31.16 | 22.98 | 90.92 | 90.92 |
| Qwen3.5-122B-A10B | Target-self | 28.25 | 18.54 | 72.98 | 72.15 |
| Qwen3.5-122B-A10B | SpecCompact | 27.66 | 18.05 | 74.23 | 72.60 |

The paper's summary of this table: Qwen3.5 with SpecCompact is within 0.6 points of target-self on both LongBench sets and higher on both RULER lengths. Gemma 4 with SpecCompact is 0.83–4.50 points below target-self across the four settings. The large drop is compaction itself. Full history on RULER scores 90.92 to 92.12. The slot methods score 66.50 to 74.23.

### What the system optimizations add on top of parallel slots

Parallel slots alone still repeat the long history and pay for a model call per line. Section 3.3 adds independent scheduling of the six streams, a shared prefix cache, draft buffering of several lines per drafter call, stopping a repair at the next line break, and direct handling of duplicates, over-long lines, markdown headings, and empty-slot markers such as `(none)`. Table 4 is that package, before and after, on 20 matched inputs. Both sides already generate slots concurrently.

| Target | Workload | Before (s) | After (s) | Speedup |
| --- | --- | --- | --- | --- |
| Gemma4-31B-IT | AppWorld Normal | 20.17 | 8.26 | 2.44× |
| Gemma4-31B-IT | AppWorld Challenge | 21.56 | 9.14 | 2.36× |
| Gemma4-31B-IT | τ³ | 12.07 | 6.43 | 1.88× |
| Qwen3.5-122B-A10B | AppWorld Normal | 9.55 | 7.49 | 1.28× |
| Qwen3.5-122B-A10B | AppWorld Challenge | 11.43 | 7.55 | 1.51× |
| Qwen3.5-122B-A10B | τ³ | 10.38 | 8.71 | 1.19× |

The paper states the span as 1.88–2.44× for Gemma 4 and 1.19–1.51× for Qwen3.5. The after times match the SpecCompact agent rows in the latency table. The paper says the table measures the optimizations together, not one component at a time, and that the full task evaluation uses the original implementation and has not been repeated with all of them.

### The Hermes user study

The deployment study is separate from Table 3. SpecCompact was integrated into the Hermes codebase and run with Gemma 4 on four RTX PRO 6000 GPUs. Three scenarios came from the authors' own workflows: coding, math, and multitask question answering. Hermes was run ahead of time and paused at a fixed snapshot. People triggered each method from that snapshot and picked which felt faster without being told the method. Compaction time was recorded in the background. Afterward the agent wrote a summary, and a separate blind preference compared the two summaries.

The timed result is a median of 63.74 seconds for the Hermes path and 7.28 seconds for SpecCompact, with a median paired speedup of 8.68×. Dividing 63.74 by 7.28 does not produce 8.68, so the paired figure is its own statistic. The summary votes, 28 responses, were 11 for SpecCompact, 8 for Hermes, 8 similar, and 1 unable to judge. The paper does not print the count for the "which felt faster" question.

### A related compaction result, with different models

The November 3 report covered on this site, [You don't need long context](/research/you-dont-need-long-context), also studies compaction as a harness choice. It measures a written handoff on Claude Opus 4.5 and GPT 5.6 Sol, against keeping the full history. Those scores are not a row in the tables above. SpecCompact is about how fast a structured slot summary can be produced, and what that does to AppWorld, τ³, LongBench, and RULER for two open target models. The earlier report is about whether a short live context can hold task accuracy for the closed models it tested. Both treat compaction as harness work. They do not share a baseline.

## What the experiments controlled

Names and numbers in this section are printed in the November 4 paper unless a link says otherwise.

### Why the slots can be drafted in parallel

The preliminary study uses 100 trajectories from LiveClawBench, six slots each. Monolithic generation writes all six slots in one output. Independent generation writes each slot from the same history and does not see the other slots. An LLM judge scores how well a slot preserves information from the full history. The score is 0 to 5, the sum of five binary checks. The paper does not name the judge model. Independent generation averages 4.73, monolithic generation 4.44. The share of slots scoring at least 4 is 93% and 85%. Reversing slot order, or the order in which independent slots are invoked, moves the mean by at most 0.03. That is the warrant for treating slots as parallel units. It is an adequacy judgment, not an AppWorld score.

The six slots, taken from the OpenClaw schema, are Goal, Constraints and Preferences, Progress, Key Decisions, Next Steps, and Critical Context. The prompt in the paper's appendix tells the drafter it is writing one section of an OpenClaw-style summary, not answering the user. Progress uses Done, In Progress, and Blocked. Empty slots may return `(none)`. Exact file paths, function names, and error messages are supposed to be kept. Each request includes the history and the full schema, and asks for only one slot.

### How a line is accepted

The drafter proposes the next line conditioned on the history, the slot instruction, and the lines already accepted in that slot. The target sees the same history and prefix and returns one judgment token. The acceptance score is the estimated probability of a positive judgment divided by the sum of the positive and negative estimates. Variants such as capitalization count, and a missing label is filled from the leftover probability mass by the rule in Section 3.2. The line is accepted at η = 0.7 or higher. Otherwise the target writes a replacement with the rejected line left out of the prompt, and drafting resumes from the new prefix. Verification is one token. Drafting and repair may emit up to 64 new tokens per request. A slot stops at 12 lines or 320 tokens. The assembled summary is held to 2,048 tokens, the same budget as the baselines. A summary past that budget raises an error.

This is semantic checking, in the sense of SpecReason and DREAM-R, which the paper cites. The target can keep a line it would not have worded itself, if the line is supported by the history and consistent with the prefix. It is not token-level speculative decoding, which would require the target's own next tokens.

### The drafter

The drafter is Qwen3-0.6B, fine-tuned separately for each target on slot text that the target itself generated. The paper notes that semantic speculation does not require a shared vocabulary, and that they train on text only, so they do not have to store the target's probabilities. One history produces six supervised examples, one per slot. Training and validation examples are separated by trajectory ID. The set is described as about 50K training data from AppWorld, τ³, and LiveClawBench. The paper does not say whether that 50K counts histories or the six-per-history examples.

Each drafter trains for one epoch. LoRA is applied to all linear layers, rank 16, scaling factor 32, dropout 0. The optimizer is AdamW, learning rate 10⁻⁴, cosine decay, warmup ratio 0.05, weight decay 0, gradient clipping at 1.0. The per-device batch size is 2, with 16 gradient-accumulation steps, BF16, a maximum sequence length of 16,384, and random seed 42. Loss is computed only on the slot content.

### The agent and long-context protocol

During agent evaluation the harness compacts every eight model calls. System messages, setup messages, and the current input stay. New messages pile up until the next compaction. AppWorld is scored with task goal completion and scenario goal completion on the full Test-Normal and Test-Challenge sets. τ³ is task success, three trials per task, on an 80-task random subset for each target. The paper describes AppWorld as task completion through code and application APIs, and τ³ as task completion through user interaction and tool use.

LongBench uses GovReport and QMSum, reported as ROUGE-L. RULER uses all five task types at 8,000 and 16,000 tokens, with the official matching metrics. Latency and throughput use smaller subsets, 20 matched inputs per workload, rather than the full sets.

Serving for the latency runs is vLLM on NVIDIA RTX PRO 6000 Blackwell GPUs. Gemma 4 runs in BF16 on one GPU. Qwen3.5 runs in FP8 on two GPUs. SpecCompact adds one GPU for the drafter and runs the six slots concurrently. The user-study machine is a different count: Gemma 4 on four of those GPUs, inside Hermes.

### What the discussion leaves open

The limitations section says the work is aimed at the speed–accuracy trade-off and the system implementation, and that it does not give a consistent accuracy advantage over target-model summarization. The suggested next step is closer drafter–target alignment, with DREAM-R's reinforcement learning named as an example. The discussion also says slots do not all read the history the same way. Progress and Decisions draw on evidence spread through the context. Goal, Constraints, and Next Steps lean on the beginning or the end. The authors mention slot-conditioned sliding-window attention as a way to speed drafting further, and they leave it undone.

Two related systems in the paper's related-work section attack the wait differently. [Slipstream](https://arxiv.org/abs/2605.08580) compacts while the agent keeps acting, and uses later steps to check the summary. [Parallel Context Compaction](https://arxiv.org/abs/2605.23296) summarizes blocks of the input at the same time. SpecCompact's parallelism is across summary slots, with a line-level accept or repair, rather than across time or across input blocks.

## Read the paper

The November 4 paper, and the two harnesses it builds on:

- [SpecCompact on arXiv](https://arxiv.org/abs/2611.06876)
- [HTML](https://arxiv.org/html/2611.06876)
- [PDF](https://arxiv.org/pdf/2611.06876)
- [Hermes agent](https://github.com/NousResearch/hermes-agent)
- [OpenClaw compaction](https://docs.openclaw.ai/concepts/compaction)

Related pages on this site: [Agent harnesses](/topics/harnesses), [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness), [HarnessFlow](/research/harnessflow-mcts-harness-optimization), [how agents work](/topics/how-agents-work), [You don't need long context](/research/you-dont-need-long-context), [ReAct: Synergizing Reasoning and Acting in Language Models](/research/react-reasoning-and-acting), [harness](/glossary/harness), and [agent](/glossary/agent).

The step this paper speeds up is [context compaction](/glossary/context-compaction). The space that summary protects is the [context window](/glossary/context-window).
