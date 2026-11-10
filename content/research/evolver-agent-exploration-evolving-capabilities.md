---
title: "Evolver raised task success to 87.50% (Nov 5, 2026)"
description: "Evolver raised task success from 83.13% to 87.50% on 320 paired runs. Task-execution tokens fell 24.24%. Claude Code and Codex. arXiv, November 5, 2026."
date: "2026-11-07"
updated: "2026-11-09"
absoluteTitle: true
ledeQuestion: "Did Evolver raise agent task success?"
ledeAnswer: "On 320 paired diagnostic runs, success rose from 83.13% to 87.50%, and recorded task-execution tokens fell 24.24%."
dataset:
  title: "Evolver paired diagnostic runs, November 2026"
  description: "320 paired diagnostic executions from Zhang et al., arXiv:2611.07595. Task success 83.13% without Evolver and 87.50% with it. Recorded task-execution tokens fell 24.24%."
  isBasedOn: "https://arxiv.org/abs/2611.07595"
type: paper-breakdown
topics:
  - harnesses
  - how-agents-work
  - task-performance
  - research
companies:
  - arxiv
  - claude-code
  - codex
  - openai
  - github
paperTitle: "Evolver: Turning Agent Exploration into Evolving Capabilities"
paperAuthors: "Haoyang Zhang, Qumeng Sun, Xiao Zhang, Xiang Liu, Zhidong Fan, Junjie Wang"
paperYear: 2026
paperUrl: "https://arxiv.org/abs/2611.07595"
codeUrl: "https://github.com/EvoMap/evolver"
venue: "arXiv technical paper, 2611.07595, submitted November 5, 2026"
abstract: |
  An agent harness is the program around a frozen model: the loop, the tools, the memory, and the stop rule. Evolver, posted to arXiv on November 5, 2026, leaves that program in place. It stores reusable procedures as Gene assets and injects a bounded selection of them into Claude Code or Codex on a later run. The model weights stay frozen.

  The measured comparison is a paired diagnostic set, not a random sample of the full benchmarks. On 320 pairs, task success moves from 83.13% to 87.50%, a gain of 4.38 percentage points. Recorded task-execution tokens fall 24.24%. Among the 265 pairs that succeed both with and without the injected Genes, tokens still fall 17.57%. The protocol is called Baseline–Extraction–Gene. Genes are distilled from the same tasks' baseline traces, then frozen, with an injection budget of 12,000 bytes. This page was published November 7, 2026.
whyItMatters: |
  Harness engineering, on this site, is the work of designing the loop, tools, memory, permissions, and stop rules around a model. The glossary entry for a harness, and the harness guide, use that definition. Evolver takes the harness as given. Claude Code and Codex keep their own tools, skills, and control loop. What changes is an external store of strategy assets the harness can read.

  That is a different change from HarnessFlow, the November 4 paper covered here on November 6. HarnessFlow searches for a new executable harness with a tree of code edits. Evolver does not rewrite harness code. It reuses exploration that a harness already did, inside the harness the user already runs. The two papers are complementary, and this page does not repeat HarnessFlow's tables.

  The practical question is whether that reuse helps on the next attempt, and whether the help is a higher success rate, a shorter trace, or both. In this paper the answer is both, on a selected diagnostic slice, and it is uneven. Nine of 16 harness–model–benchmark configurations improve. Seven stay flat. SWE-bench Multilingual stays at 96.25% either way. The scores below are the authors' paired runs of Evolver v2.0.33. They are not a row on the public Terminal-Bench or SWE-bench boards checked November 7, 2026. For a different way to spend fewer tokens inside a harness, see the November 3 note on short working memory and the November 5 SpecCompact note.
keyFindings:
  - "On 320 paired diagnostic executions, success rises from 83.13% to 87.50%, printed as +4.38 percentage points. Claude Code moves from 85.00% to 87.50% (+2.50 points). Codex moves from 81.25% to 87.50% (+6.25 points). Nine of the 16 configurations improve. Seven are unchanged. The paper does not report a configuration whose success rate falls."
  - "Terminal-Bench 2.1 is the largest aggregate gain: 64 of 80 pairs to 71 of 80, +8.75 percentage points. SWE-rebench improves by 5.00 points and GAIA by 3.75 points, on the same style of aggregate. SWE-bench Multilingual stays at 96.25% with and without Evolver. Each benchmark aggregate is 20 tasks times four harness–model configurations."
  - "The largest named configuration gain is Codex with deepseek-v4.1-flash on Terminal-Bench 2.1, from 70% to 90% (+20 percentage points). Under Codex, gpt-5.6-sol improves by 10 points on Terminal-Bench 2.1 and by 10 points on SWE-rebench. Under Claude Code, both models improve by 5 points on SWE-rebench. The paper also names a GAIA gain for DeepSeek and a Terminal-Bench 2.1 gain for GPT under Claude Code, without printing those two deltas."
  - "Recorded task-execution tokens fall from 1,641.1K to 1,243.3K on average, an aggregate reduction of 24.24% across the 320 pairs. All four harness–model pairings use fewer tokens. The paper states a range of 13.55% to 35.96%, names Codex with DeepSeek at 35.96% and Claude Code with DeepSeek at 25.12%, and does not print the other two percentages. The aggregate is the ratio of total usage, not the average of per-task ratios. Experience-extraction tokens are excluded."
  - "Among 265 pairs that succeed under both conditions, average tokens fall from 1,278.2K to 1,053.6K, a 17.57% reduction. Two case studies keep the same success and cut the trace: a Terminal-Bench token-counting task under Claude Code and GPT uses 86.5% fewer tokens and 17 model calls instead of 112; a SWE-bench Multilingual RxJava fix under Codex and DeepSeek uses 58.2% fewer tokens and 52 calls instead of 86."
  - "The task set is diagnostic. The authors prioritize the first 20 tasks in each benchmark's original order, replace empty or failed runs with later tasks, and then say the final selection also considers observed outcome improvements and token usage. It is not a random sample of Terminal-Bench 2.1, SWE-bench Multilingual, SWE-rebench, or GAIA. Genes are distilled from those same tasks' baseline traces. The paper says the protocol measures reuse of that history, not transfer to unseen tasks and not long-term online evolution."
methodology: |
  The source is arXiv 2611.07595, version 1. The Atom record lists it as published November 5, 2026 at 07:44:28 UTC, which is also the record's updated time. The primary category is cs.SE, with cs.AI as a second category. The comment line says 12 pages and 5 figures. This page did not find a later version on November 7, 2026. This breakdown was published the same day.

  The authors are Haoyang Zhang, Qumeng Sun, Xiao Zhang, Xiang Liu, Zhidong Fan, and Junjie Wang. The HTML author block places them at Infinite Evolution Lab, EvoMap, and marks Haoyang Zhang as the corresponding author, with the address 17@evomap.ai. The abstract and the author block both point to https://github.com/EvoMap/evolver.

  A Gene, following the representation in Wang, Ren, and Zhang, arXiv:2604.15097, is a structured strategy asset: a summary, procedural steps, applicability conditions, task-matching signals, and an optional validation plan. The paper says the applicability conditions and the validation plan are guidance. They are not an enforceable constraint and not a guarantee that the strategy was verified. A Capsule ties a Gene to one concrete execution case. An AntiGene records a practice to avoid. Events, provenance, and review records sit beside the assets. Storage is content-addressed and append-only, so a later rejection does not overwrite the asset. Automatically drafted and model-distilled candidates start in quarantine.

  The experiment does not turn that lifecycle loose on a live network. It uses a three-stage Baseline–Extraction–Gene protocol on Evolver v2.0.33. Baseline runs the harness with its native tools and built-in skills and no Gene injection. Extraction distills candidate Genes from the valid baseline trajectories, including failures, with a model configuration matched to that run. Pools are isolated by evaluation batch, benchmark, harness, and model, and the candidates are frozen before the augmented run. Gene-augmented execution starts a fresh session, restores the task environment, and injects selected Genes with a budget of 12,000 bytes. Selection prefers a Gene taken from the same task, then other matches in that isolated pool. Both sides keep the same foundation model and the same harness, and both are graded by the benchmark's own grader. Token totals count recorded model input and output on the final task executions. They leave out experience extraction and other overhead.

  The harnesses are Claude Code and Codex. The model configurations are deepseek-v4.1-flash and gpt-5.6-sol. The benchmarks are Terminal-Bench 2.1, SWE-bench Multilingual, SWE-rebench, and GAIA. The authors prioritize the first 20 tasks in original order and replace a task that returns an empty response because of a malformed output, a timeout, or an execution failure. Every harness–model pair sees the same 20 tasks on a given benchmark, which is 16 configurations. The analyzed set keeps 20 tasks per configuration that have a valid outcome and a complete token record on both sides, after dropping runs stopped by a timeout or a token limit. That filter, plus the authors' statement that the final selection also considers outcome improvements and token usage, is why they call the 320 pairs diagnostic.
limitations:
  - "The paper says the final task selection considers observed outcome improvements and token usage, so the 320 pairs are a diagnostic set rather than a random sample of the full benchmarks. A reader who treats 87.50% as the success rate of Claude Code or Codex on Terminal-Bench 2.1, SWE-bench Multilingual, SWE-rebench, or GAIA is reading a different experiment from the one that was run."
  - "Gene selection prefers experience distilled from the same task's baseline trace. The authors say the protocol assesses historical reuse, not generalization to unseen tasks and not long-term online evolution. The conclusion lists transfer to unseen tasks, more reliable selection, and longitudinal evolution as future work."
  - "Seven of 16 configurations do not improve task success. SWE-bench Multilingual is flat at 96.25%. The headline gain is concentrated: Terminal-Bench 2.1 accounts for the move from 64 of 80 to 71 of 80, and one named cell, Codex with DeepSeek on that benchmark, moves from 70% to 90%."
  - "The 24.24% and 17.57% token figures exclude experience extraction and other overhead outside the final task executions. A deployment that pays for the extraction pass is paying a cost these percentages leave out. The paper also says the reduction is the ratio of total usage, so a single long trace can move it."
  - "The paper does not pin a Claude Code release or a Codex release. It does pin Evolver v2.0.33. On November 7, 2026 the public repository's newest listed release was v2.0.49, published November 5, 2026. The annotated tag v2.0.33 is dated September 6, 2026. These tables are a report about the older pin."
  - "Applicability conditions and validation plans are guidance, not a check the harness must pass. The paper says admission and trust enforcement depend on the pathway, and that some direct retrieval interfaces do not apply the same restrictions. The paired study freezes an isolated pool before the augmented run, so it does not measure the public EvoMap network."
  - "Public leaderboards checked November 7, 2026 measure different task sets. Terminal-Bench's live board is version 4.0. SWE-bench Multilingual on swebench.com is a 300-instance board. Neither number is a row in this paper, and this paper's percentages are not a submission to those boards."
references:
  - title: "Zhang et al., Evolver (arXiv:2611.07595)"
    url: "https://arxiv.org/abs/2611.07595"
    note: "Atom published time November 5, 2026, 07:44:28 UTC. Version 1. Primary category cs.SE. Read November 7, 2026."
  - title: "HTML version of the paper"
    url: "https://arxiv.org/html/2611.07595"
  - title: "PDF of the paper"
    url: "https://arxiv.org/pdf/2611.07595"
  - title: "EvoMap/evolver source repository"
    url: "https://github.com/EvoMap/evolver"
    note: "Public on November 7, 2026. License GPL-3.0. The paper's pin, tag v2.0.33, is an annotated tag dated September 6, 2026. The newest release listed that day was v2.0.49, published November 5, 2026. The README research section links arXiv:2604.15097 and does not link 2611.07595."
  - title: "EvoMap"
    url: "https://evomap.ai/"
    note: "Loaded November 7, 2026. The paper cites it for network publishing and retrieval. The paired study uses isolated local pools."
  - title: "Wang, Ren, and Zhang, strategy genes (arXiv:2604.15097)"
    url: "https://arxiv.org/abs/2604.15097"
    note: "The representation Evolver builds on, as cited in the November 5 paper and linked from the repository README. This page did not re-audit that paper's tables."
  - title: "Terminal-Bench"
    url: "https://www.tbench.ai/"
    note: "Opened November 7, 2026. The live board title is Terminal-Bench 4.0, a different version from the 2.1 slice in this paper."
  - title: "SWE-bench"
    url: "https://www.swebench.com/"
    note: "Opened November 7, 2026. The multilingual submissions embedded on the page are a 300-instance board. The highest resolved rate in that embedded list is 72.7%."
citation:
  apa: "Zhang, H., Sun, Q., Zhang, X., Liu, X., Fan, Z., & Wang, J. (2026, November 5). Evolver: Turning agent exploration into evolving capabilities. arXiv:2611.07595."
  bibtex: |
    @article{zhang2026evolver,
      title={Evolver: Turning Agent Exploration into Evolving Capabilities},
      author={Zhang, Haoyang and Sun, Qumeng and Zhang, Xiao and Liu, Xiang and Fan, Zhidong and Wang, Junjie},
      journal={arXiv preprint arXiv:2611.07595},
      year={2026},
      url={https://arxiv.org/abs/2611.07595}
    }
faq:
  - question: "What does Evolver change, and what does it leave alone?"
    answer: "It leaves the foundation-model weights frozen and it leaves the agent harness in place. Claude Code and Codex still run their own tools and skills. Evolver adds an external store of Gene strategy assets and can inject a bounded selection into the next session through hooks, a prompt-time recall, an MCP interface, or a host-specific integration. That matches the site glossary: the harness is the runtime around the model. Evolver is a store the harness can read. It is not a replacement for the harness."
  - question: "What is a Gene?"
    answer: "A Gene is a compact strategy record: a summary, the steps, when it applies, signals used to match a task, and an optional validation plan. A Capsule attaches one real execution case. An AntiGene records something to avoid. The paper says the applicability text and the validation plan guide the agent. They do not force a tool call, and they do not prove the strategy already worked. The authors contrast this control-oriented record with a documentation-oriented skill package, citing their earlier arXiv paper 2604.15097."
  - question: "What is the headline result, and when was the paper released?"
    answer: "arXiv lists version 1 as published November 5, 2026, at 07:44:28 UTC. On 320 paired diagnostic executions, success moves from 83.13% to 87.50%, and recorded task-execution tokens fall 24.24%. Among 265 pairs that succeed both ways, tokens fall 17.57%. Claude Code gains 2.50 percentage points. Codex gains 6.25. This breakdown was published November 7, 2026."
  - question: "Does this beat the public Terminal-Bench or SWE-bench leaderboard?"
    answer: "The paper does not make that claim, and the numbers are not on the same scale. Checked November 7, 2026, the Terminal-Bench site leads with version 4.0. The top displayed row is Claude Code with Opus 5.5 at 64.85% accuracy, 214 successes in 330 trials, dated September 22, 2026. This paper evaluates Terminal-Bench 2.1 on 20 diagnostic tasks per configuration, 64 of 80 pairs rising to 71 of 80. SWE-bench's multilingual list, on the same day, is a 300-instance board whose highest embedded resolved rate is 72.7% for Gemini 3 Flash with mini-SWE-agent, dated February 13, 2026. This paper's multilingual result is 96.25% on its 80-pair diagnostic slice, flat with and without Evolver. A higher percentage on a smaller, selected slice is not a new leaderboard result."
  - question: "How does Evolver compare with HarnessFlow?"
    answer: "HarnessFlow, arXiv 2611.06254, searches for a better complete harness program. A coding agent rewrites harness code, and the search keeps a tree. Evolver keeps Claude Code and Codex as they are and reuses experience inside them. One paper edits the harness. The other edits the experience the harness is shown. They answer different questions, on different benchmarks, and this page does not treat either score as a substitute for the other."
  - question: "Why is the 320-pair set called diagnostic?"
    answer: "The authors start from the first 20 tasks in each benchmark's original order and replace tasks that come back empty because of a malformed output, a timeout, or an execution failure. They then say the final selection also considers observed outcome improvements and token usage. The resulting 320 pairs are the runs with a valid outcome and a complete token record on both sides. The paper's own sentence is that this set is diagnostic rather than a random sample of the full benchmarks."
  - question: "Where do the Genes in the experiment come from?"
    answer: "They are distilled from the baseline trajectories of the same evaluation batch, including unsuccessful runs, with a model matched to that setting. Pools stay isolated by batch, benchmark, harness, and model, and the assets are frozen before the augmented run. At injection time, a Gene from the same task is preferred, then other matches in that pool, up to 12,000 bytes. The paper says this tests reuse of that history. It does not test a Gene learned on one task and applied to a held-out task."
  - question: "Is the code public?"
    answer: "Yes, as checked November 7, 2026. https://github.com/EvoMap/evolver is a public repository under GPL-3.0, and the tag v2.0.33 that the paper names is present. That tag is dated September 6, 2026. The newest release listed on November 7 was v2.0.49, published November 5, 2026, so the default branch is ahead of the experimental pin. The README's research section links the earlier Gene paper, arXiv 2604.15097, and does not link this November 5 paper. EvoMap's site at evomap.ai also loaded that day."
  - question: "What are the limits of the result?"
    answer: "The sample is diagnostic, the Genes come from the same tasks, and extraction cost is outside the token savings. Seven configurations do not gain success, and SWE-bench Multilingual does not move. The paper does not name the Claude Code or Codex release it ran. Trust checks depend on which retrieval path is used. The public boards for Terminal-Bench 4.0 and SWE-bench Multilingual are different measurements. The authors name unseen-task transfer and longer-running evolution as open."
---

## How it compares with the same harness, and with public boards

The paper's comparison is internal and paired. Each task is run twice under one harness and one model: once with the harness's native tools and built-in skills, and once in a fresh session with selected Genes injected. [Claude Code](https://github.com/anthropics/claude-code) and [Codex](https://github.com/openai/codex) are the harnesses. The model configurations are deepseek-v4.1-flash and gpt-5.6-sol. Evolver is version 2.0.33. No number below is copied from a vendor leaderboard.

[HarnessFlow](/research/harnessflow-mcts-harness-optimization) is the nearby paper on this site, and it does the other job. Posted November 4, 2026, it searches for a new harness program and grades the winner on a held-out split. Evolver does not search harness source. It keeps the harness a team already runs and hands that harness a strategy asset from an earlier exploration. The November 6 HarnessFlow note stays the account of the search. This page is the account of reuse inside Claude Code and Codex.

### Success on the 320 pairs

Figure 2 is the combined set and the two harnesses. Each harness row pools 160 pairs: two models, four benchmarks, 20 tasks. The combined row pools all 320.

| Slice | Without Evolver | With Evolver | Change |
| --- | --- | --- | --- |
| Claude Code | 85.00% | 87.50% | +2.50 points |
| Codex | 81.25% | 87.50% | +6.25 points |
| All 320 pairs | 83.13% | 87.50% | +4.38 points |

The printed percentages line up with integer counts. Claude Code at 85.00% of 160 pairs is 136 successes, and 87.50% is 140. Codex at 81.25% is 130, and 87.50% is 140. Together that is 266 of 320, which is 83.125% and rounds to the printed 83.13%, then 280 of 320, which is 87.50%. Fourteen additional successes on 320 pairs is 4.375 points, printed as +4.38. Both harnesses land on the same augmented rate, 87.50%. Codex has more room because it starts lower.

Nine of the 16 configurations have a higher success rate. Seven are unchanged. The paper does not describe a configuration that gets worse.

### Where the successes move

Figure 3 breaks the same 20 tasks out by harness, model, and benchmark. The text gives the aggregate by benchmark and a partial cell-by-cell account. Each benchmark aggregate has 80 pairs, because four harness–model configurations each contribute 20 tasks.

| Benchmark | What the paper prints |
| --- | --- |
| Terminal-Bench 2.1 | 64/80 to 71/80, +8.75 percentage points |
| SWE-rebench | +5.00 points |
| GAIA | +3.75 points |
| SWE-bench Multilingual | 96.25% under both conditions |

Terminal-Bench 2.1 is the largest aggregate move. Sixty-four successes out of 80 is 80%. Seventy-one out of 80 is 88.75%. The gap is 8.75 points, and those seven extra successes are half of the fourteen extra successes in the whole study. SWE-rebench's 5.00 points on 80 pairs is four extra successes. GAIA's 3.75 points is three. SWE-bench Multilingual contributes none. 96.25% of 80 is 77, so that benchmark is 77 successes either way. The paper does not print the baseline counts for SWE-rebench or GAIA, only the point gaps.

The named cells, each on 20 tasks:

- Codex and DeepSeek on Terminal-Bench 2.1: 70% to 90%, which is 14 of 20 to 18 of 20, and the largest gain the paper names.
- Codex and GPT: +10 points on Terminal-Bench 2.1 and +10 points on SWE-rebench. Ten points on 20 tasks is two extra successes on each benchmark.
- Claude Code, both models: +5 points on SWE-rebench. Five points on 20 tasks is one extra success per model.
- Claude Code also gains on GAIA with DeepSeek and on Terminal-Bench 2.1 with GPT. The paper names those gains and does not print the size.

The paper's reading is that procedural guidance depends on the model and on how that model sits in the harness. A Gene that helps Codex with DeepSeek on a terminal task is not, in these cells, a uniform lift.

### Token use on the same pairs

Figure 4 reports recorded task-execution tokens. The paper prints averages in the form 1,641.1K, and it computes the headline reduction from total usage across pairs rather than by averaging each pair's own percentage.

| Slice | Pairs | Average without | Average with | Reduction |
| --- | --- | --- | --- | --- |
| All selected pairs | 320 | 1,641.1K | 1,243.3K | 24.24% |
| Successful both ways | 265 | 1,278.2K | 1,053.6K | 17.57% |

The ratio of the first pair of averages is (1,641.1 − 1,243.3) / 1,641.1 = 24.24%. The second is (1,278.2 − 1,053.6) / 1,278.2 = 17.57%. Tokens fall in all four harness–model pairings. The stated range is 13.55% to 35.96%. The paper names the two largest: Codex with DeepSeek at 35.96%, and Claude Code with DeepSeek at 25.12%. It does not print the Claude Code–GPT or Codex–GPT percentages. The 265-pair cut is the cleaner efficiency claim, because those tasks were already solved without Evolver. The shorter trace is not an artifact of skipping a failed attempt.

Two cases in Figure 5 keep the pass and shrink the trace.

| Case | Setting | Token cut | Model calls |
| --- | --- | --- | --- |
| Count tokens in a dataset subset | Terminal-Bench 2.1, Claude Code, GPT | 86.5% | 112 to 17 |
| Fix a null-pointer exception in RxJava's ObservableSwitchMap | SWE-bench Multilingual, Codex, DeepSeek | 58.2% | 86 to 52 |

Both executions succeed on each side. The paper presents them as illustrations, not as the average.

### What the public boards measure

Checked November 7, 2026, [Terminal-Bench](https://www.tbench.ai/) presents version 4.0. The top displayed row is Claude Code with Opus 5.5, max effort, 64.85% accuracy, 214 successes in 330 trials, result date September 22, 2026, with a 95% half-width of 3.11 points. The next displayed row is Claude Code with Sonnet 5.5 at 61.82%. The site's [November harness benchmark](/reports/agent-harness-benchmark-november-2026) reads that same 4.0 board. Evolver's terminal number is a different object: version 2.1, 20 diagnostic tasks per configuration, models deepseek-v4.1-flash and gpt-5.6-sol, and a paired with-and-without design. 71 of 80 is not a claim about the 4.0 board.

[SWE-bench](https://www.swebench.com/) on the same day embeds a multilingual list whose highest resolved rate is 72.7%, Gemini 3 Flash with mini-SWE-agent, dated February 13, 2026, with the submission path marked multilingual. The next rows in that embedded list are 72.0% and 70.7%. The official multilingual set has 300 instances. Evolver's 96.25% is 77 of 80 on a diagnostic slice of 20 tasks per configuration, and it is the same with or without Genes. It does not enter the 300-instance board, and the flat result is the paper's own finding for that slice.

The closest same-benchmark numbers already on this site are in the November 3 report [You don't need long context](/research/you-dont-need-long-context). That report runs Terminal-Bench 2.1 as 89 tasks and SWE-bench Multilingual as 300, inside mini-swe-agent 2.4, and studies context compaction. Its GPT 5.6 Sol full-history scores are 87.6% on Terminal-Bench 2.1 and 79.3% on SWE-bench Multilingual. Those are that report's runs. They use a different harness, the full task sets, and no Gene injection. They are the reminder that a percentage on Terminal-Bench 2.1 depends on which tasks were scored and which harness held the model.

## How the reuse loop works

Evolver separates three jobs. Something extracts a strategy from an old trace. Something stores it as an asset with a lifecycle. Something hands a small selection to the harness that is about to run. The model that acts is whichever model the harness was already calling.

### What gets stored

The paper writes a Gene as a five-part record. One part summarizes the experience. One lists the steps. One states when the strategy applies. One holds signals for matching a later task. One is an optional plan for checking the result. The matching signals are how retrieval decides relevance. The applicability text tells the agent the condition. The paper is explicit that neither field is a gate the runtime must enforce.

Around the Gene, a Capsule keeps a worked example, an AntiGene keeps a negative lesson, and separate records keep events, provenance, and review. The asset body is content-addressed and append-only. Quarantine, approval, rejection, and revocation change a side record. They do not rewrite the strategy text. Automatically drafted hints, and candidates produced by a model distillation, enter quarantine. The default drafting path pulls concise hints from assistant utterances and marks them unproven. A heavier distillation path, when enabled, can also emit cases and negative guidance.

### How a harness sees it

On a later task, retrieval can run at session start, as a bounded set of locally eligible Genes, or at prompt time by matching the task text to stored signals. An MCP tool can fetch an asset on demand. A separate heuristic ranks candidates by task relevance, a quality signal, and historical reuse. The pathways do not share one ranking function or one context budget. The paper's point is that the host harness still reasons, calls tools, and checks its own work. The Gene arrives as context, not as a new policy and not as a new tool implementation.

The repository README, read November 7, 2026, documents a hook installer for this idea on the default branch: `evolver setup-hooks` with a platform flag for Claude Code and another for Codex. That README is ahead of the v2.0.33 pin used in the experiments. It describes the integration. It is not a log of the 320 runs.

EvoMap, at the URL in the paper's footnote, is the networked version of the same assets: publish a Gene, discover one written elsewhere, and carry provenance with it. The homepage loaded on November 7 and describes the Genome Evolution Protocol in those terms. The measured study does not use that network. Its pools are local, isolated, and frozen before the second run.

### What the paired protocol actually does

The three stages are the whole evaluation.

1. Baseline. The harness runs the task with its own tools and skills. Nothing from Evolver is injected.
2. Extraction. A model matched to that run distills Genes from the valid baseline traces, successes and failures together. The pool is private to that batch, benchmark, harness, and model. The candidates are then frozen.
3. Gene-augmented run. The environment is restored. A new session sees the original task plus selected Genes, up to 12,000 bytes, with a same-task Gene preferred.

Both sides use the benchmark's native grader. Runs that a timeout or a token limit interrupts are dropped, and so are runs without a complete token record. The authors also say the final choice of tasks takes the observed improvements and the token totals into account. That sentence is the reason the set is diagnostic.

## What the experiments controlled

Names and numbers in this section are printed in the November 5 paper unless a link says otherwise.

The software pin is Evolver v2.0.33. The harnesses are Claude Code and Codex, unnamed as to release. The models are the configurations deepseek-v4.1-flash and gpt-5.6-sol. The paper cites DeepSeek's CoRR paper on DeepSeek-V4.1-Flash and OpenAI's GPT-5.6 post for those names. It does not print a temperature, a reasoning effort, or a dollar price.

Each benchmark contributes the same 20 tasks to every harness–model pair. The starting point is the first 20 tasks in the benchmark's original order. A task that yields an empty response, because the output was malformed, the run timed out, or execution failed, is replaced by the next task in order. After that replacement, the analyzed table still requires a valid outcome and a full token record on both the baseline and the augmented side. Interrupted runs are out.

The grader is the benchmark's own. Terminal-Bench 2.1 is terminal engineering work. SWE-bench Multilingual and SWE-rebench are software-issue resolution. GAIA is multi-step information seeking and reasoning. The paper cites Merrill et al. for Terminal-Bench, Yang et al., SWE-smith, for the multilingual set, Badertdinov et al. for SWE-rebench, and Mialon et al. for GAIA.

Experience extraction uses a model configuration matched to the evaluation setting, so a DeepSeek run is not distilled by a different family and then tested as if the hint came from nowhere. The augmented session does not continue the baseline conversation. The paper says the environment is restored and the session is fresh. Whatever the Gene carries has to fit in 12,000 bytes.

The token metric is recorded input plus recorded output on those final executions. Extraction, review, and any other overhead are outside the 24.24% and the 17.57%. Model-call counts appear in the two case studies and are not given as a study-wide total.

On November 7, 2026, the GitHub API reported the repository public, under GPL-3.0, with the default branch last pushed on November 5, 2026. Tag v2.0.33 resolves to an annotated tag created September 6, 2026 by the project's release bot. Release v2.0.49 was published November 5, 2026 at 04:36:20 UTC. Anyone who installs the current release is not installing the pin in the tables.

## Limits that change how to read the scores

The conclusion is short, and the setup section already contains the constraint that matters most.

The 320 pairs were kept because they had outcomes and token records, and the authors say the selection also looks at which runs improved and how many tokens they used. That is a diagnostic slice. It can show that a Gene injection is capable of raising success and cutting tokens on tasks chosen with those outcomes in view. It cannot show the rate a team would get by taking the next 20 tasks in order and stopping there. The public boards above are the full published sets, or the current version of them, and they answer a different question.

The Genes are taken from the baseline of the task being re-run, when such a Gene exists. The agent is being reminded of a procedure extracted from an earlier attempt at the same problem, plus other frozen hints from the same small pool. That is a real system, and it is a weaker claim than "the agent learned a skill and used it on a new problem." The authors put the stronger claim in future work.

Success does not move in seven of sixteen configurations, and the multilingual slice does not move at all. The Terminal-Bench aggregate and the single Codex–DeepSeek cell carry a large share of the headline. A harness owner who reads only +4.38 points will miss that the gain is conditional.

The token percentages are the cost of the graded attempt, not the cost of becoming experienced. Distilling the Genes is extra model use, and the paper excludes it. The 17.57% figure is the part that survives even when both attempts already pass, which is the number to quote when the question is efficiency on solved work.

The paper names Evolver v2.0.33 and does not name the Claude Code or Codex build. The public project has moved: v2.0.49 shipped the morning of the paper's arXiv publication, about three hours before the Atom timestamp. Results for the September pin are not results for the November release. The README on the default branch points its research discussion at the earlier Gene paper and does not yet point at this one.

Trust machinery is real in the design and uneven in enforcement. Quarantine, probation, and an untrusted mark for imported network assets are described. The paper also says some direct retrieval paths do not apply the same checks, and that applicability text does not bind the tool caller. The experiment sidesteps the network by freezing a private pool. A deployment that turns on EvoMap discovery is outside these 320 pairs.

## Read the paper

The November 5 paper, the repository it names, and the boards a reader might otherwise confuse with its tables:

- [Evolver on arXiv](https://arxiv.org/abs/2611.07595)
- [HTML](https://arxiv.org/html/2611.07595)
- [PDF](https://arxiv.org/pdf/2611.07595)
- [EvoMap/evolver](https://github.com/EvoMap/evolver)
- [EvoMap](https://evomap.ai/)
- [Strategy genes, arXiv:2604.15097](https://arxiv.org/abs/2604.15097)
- [Terminal-Bench](https://www.tbench.ai/)
- [SWE-bench](https://www.swebench.com/)
- [Claude Code](https://github.com/anthropics/claude-code)
- [Codex](https://github.com/openai/codex)

Related pages on this site: [agent harnesses hub](/topics/harnesses), [Best AI agent frameworks](/best/ai-agent-frameworks), [Harness comparison tracker](/trackers/harnesses), [how agents work](/topics/how-agents-work), [task performance](/topics/task-performance), [research](/topics/research), [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness), [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness), [harness](/glossary/harness), [harness engineering](/glossary/harness-engineering), [agent skill](/glossary/agent-skill), [model context protocol](/glossary/model-context-protocol), [benchmark](/glossary/benchmark), [behavioral evaluation](/glossary/behavioral-evaluation), [HarnessFlow](/research/harnessflow-mcts-harness-optimization), [SpecCompact](/research/speccompact-agent-context-compaction), [You don't need long context](/research/you-dont-need-long-context), [ReAct](/research/react-reasoning-and-acting), the [November harness benchmark](/reports/agent-harness-benchmark-november-2026), the [AI agent harness evaluation checklist](/tools/ai-agent-harness-evaluation-checklist), [Claude Code](/directory/claude-code), and [Codex](/directory/codex).
