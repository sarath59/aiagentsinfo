---
title: "Paper breakdown: HarnessFlow — MCTS search for agent harness optimization"
description: "November 4, 2026 arXiv paper: with 15 refinement attempts per benchmark, HarnessFlow averaged 69.48%, 10.89 points above Vanilla and 3.95 points above Meta-Harness."
date: "2026-11-06"
updated: "2026-11-06"
type: paper-breakdown
topics:
  - harnesses
  - how-agents-work
  - task-performance
  - research
companies:
  - arxiv
  - microsoft
  - claude-code
  - codex
paperTitle: "HarnessFlow: MCTS-Guided Harness Optimization for LLM Agents"
paperAuthors: "Zhi Hong, Qianlong Wang, Hongchen Wei, Aidan Wu, Daohong Ying, Mingze Kong, Bei Liu, Chong Luo"
paperYear: 2026
paperUrl: "https://arxiv.org/abs/2611.06254"
venue: "arXiv technical paper, 2611.06254, submitted November 4, 2026"
abstract: |
  An agent harness is the program around a frozen model: what the model sees, which tools it can call, what state is kept, and when the run stops. HarnessFlow, posted to arXiv on November 4, 2026, searches for a better complete program instead of editing the model.

  The search keeps a tree of executable harnesses. A Monte Carlo tree search policy picks which harness to change next. A coding agent rewrites that harness, with a library of reusable pieces it may copy. Each candidate is graded on a validation split. After 15 attempts per benchmark, the best validation harness is scored once on a held-out test set.

  On six benchmarks, with GPT-5.4-mini as the model inside every harness, the selected harnesses average 69.48%. That is 10.89 points above the benchmark's own starting harness and 3.95 points above Lee et al., the March 30, 2026 harness optimizer (arXiv:2603.28052), rerun here under the same budget. The average execution cost of the selected harnesses is USD 0.232 per task. The introduction states that this is 41.4% of the Codex baseline's average. The one-time search is not included in that cost.
whyItMatters: |
  Harness engineering, on this site, is the work of designing the loop, tools, memory, permissions, and stop rules around a model. The glossary entry for a harness, and the harness guide updated November 6, 2026, use that definition. HarnessFlow takes the same object and tries to search it. The model weights stay fixed. The thing that changes is the executable harness.

  Lee et al., arXiv:2603.28052, announced March 30, 2026 at 05:33:50 UTC, already search harness code. Their proposer is a coding agent with a filesystem of earlier source, scores, and traces, and their paper imposes no parent-selection rule. Their own tasks are online text classification, retrieval-augmented math, and TerminalBench-2. Those tasks are not the six benchmarks below. On November 6, 2026, their project page was still live. HarnessFlow cites that work and then reruns it: same starting harness, same coding agent, same 15-candidate budget, and a tree-search policy the earlier method does not use.

  The hand-built comparison is also internal to this paper. Claude Code, Codex, OpenHands, and Hermes are pinned releases, run with the same backbone, the same benchmark tools, and the same per-task limits as the searched harnesses. Checked November 6, 2026, the public repositories were Anthropic's Claude Code, OpenAI's Codex, OpenHands, and Nous Research's Hermes agent. The scores below are the authors' runs of those pins. They are not a vendor leaderboard and not a measurement of the hosted products on November 6. For a different harness change, faster context compaction inside Hermes-style and OpenClaw-style summaries, see the November 5 SpecCompact note. For the loop these systems sit on, see the ReAct note.
keyFindings:
  - "Table 1, mean test score over five runs, GPT-5.4-mini: HarnessFlow 69.48. Vanilla 58.59, Claude Code 61.71, OpenHands 62.61, Hermes 64.28, Codex 64.82, and Lee et al. (arXiv:2603.28052) 65.53. HarnessFlow is the highest mean on all six benchmarks. The paper says it exceeds Vanilla, Codex, and Lee et al. by 10.89, 4.66, and 3.95 points. The largest gains over Vanilla are WebShop +21.70 (69.49 versus 47.79) and TAU2-bench +17.85 (81.83 versus 63.98). The largest gains over Lee et al. are TAU2-bench +7.21 (81.83 versus 74.62) and SWE-bench Verified +6.60 (75.40 versus 68.80)."
  - "HarnessFlow's per-benchmark means and sample standard deviations are TAU2-bench 81.83 ± 2.39, AppWorld 80.76 ± 1.33, WebShop 69.49 ± 0.88, BrowseComp-Plus 76.90 ± 1.14, SWE-bench Verified 75.40 ± 1.19, and BigCodeBench-Hard 32.50 ± 1.77. The average column has no standard deviation. BigCodeBench-Hard is the narrowest lead: Hermes is 31.70 ± 1.15 and Claude Code and OpenHands are both 30.80."
  - "Search efficiency is a validation score, not the test score. The mean best-so-far validation score is 71.5% after three candidate evaluations per benchmark and 74.2% by round 15. On four of the six benchmarks, the final best is first reached at round 10 or later. The paper says those later candidates refine an earlier retained harness, not always the immediately preceding one."
  - "Appendix arithmetic-average execution cost, GPT-5.4-mini list price, USD per test task: HarnessFlow 0.232, Lee et al. 0.351, OpenHands 0.398, Claude Code 0.446, Vanilla 0.451, Hermes 0.555, Codex 0.561. The introduction says HarnessFlow runs at 41.4% of Codex's average. Figure 3(b) is a different summary, the geometric mean, and places HarnessFlow and Lee et al. on the score-cost Pareto frontier at USD 0.101 and USD 0.092. The paper says those estimates exclude one-time harness-search costs, and that the hand-engineered harnesses cost two to three times as much at lower scores."
  - "Removing the component library lowers the three-benchmark average (TAU2-bench, AppWorld, BigCodeBench-Hard) from 65.03 to 63.39, still 8.63 points above Vanilla's 54.76. Starting the search from OpenHands instead of the benchmark harness reaches 62.61. With the exploration weight at 0, 0.35, and 1, the three-benchmark average (TAU2-bench, AppWorld, SWE-bench Verified) is 73.93, 79.33, and 73.65. The default 0.35 is highest on all three, by 5.40 and 5.68 points over the two extremes."
  - "With GPT-5.4 as the executor, and search rerun for HarnessFlow and for Lee et al., the three-benchmark average is 83.58 for HarnessFlow, 81.71 for Lee et al., and 80.85 for Claude Code. The paper says that is 2.73 and 1.87 points over Claude Code and Lee et al. HarnessFlow leads TAU2-bench (88.06) and AppWorld (90.95). On WebShop the highest mean is Codex at 73.59; HarnessFlow is 71.72. Average cost per task is USD 0.21 for HarnessFlow, USD 0.18 for Lee et al., and USD 0.67 for Claude Code."
  - "On SWE-bench Verified, the selected lineage 0 to 2 to 4 to 8 to 10 raises the validation score from 67.60% to 79.20%. The paper says the scores describe cumulative harness designs, not the isolated effect of each edit. On TAU2-bench, the appendix lineage raises validation from 59.35% to 81.30%."
methodology: |
  The source is arXiv 2611.06254, version 1, category cs.AI. The Atom record lists it as published November 4, 2026 at 10:05:15 UTC. The comment line says 18 pages, 8 figures, and 7 tables. This page did not find a later version on November 6, 2026.

  The authors are Zhi Hong (South China University of Technology), Qianlong Wang (Fudan University), Hongchen Wei (Wuhan University), Aidan Wu (Cornell University), Daohong Ying (University of California, San Diego), Mingze Kong (The Chinese University of Hong Kong, Shenzhen), Bei Liu (Microsoft Research Asia), and Chong Luo (Microsoft Research Asia). The source author block marks Bei Liu as the corresponding author. It marks internships at Microsoft Research Asia for Zhi Hong, Hongchen Wei, Aidan Wu, and Daohong Ying. The experimental HTML page repeats the corresponding-author and internship notes beside both Microsoft Research Asia names. Chong Luo is not marked corresponding in the source, and Qianlong Wang and Mingze Kong are not marked as interns. The ethics statement says the Claude Code baseline experiments were run by Aidan Wu while he was working in the United States.

  A harness here is an executable program for a fixed model, task environment, and grader. Search starts from the benchmark's own reference agent and may change context construction, state, tool use, termination, and how those pieces fit together. The budget is N = 15 refinement attempts per benchmark. Each attempt picks a parent, asks a coding agent to write a new harness, and grades it. The harness with the highest validation score is the one reported on the test set. The test set is never shown to the optimizer.

  The executor inside every harness, unless the later table says otherwise, is GPT-5.4-mini at medium reasoning effort. The coding agent that writes candidates is Codex CLI release 0.154.0 running GPT-5.5 at the highest reasoning effort. Lee et al. use that same coding agent, model, and effort in this comparison. The proposer never sees test tasks. Every method, including the root harness, is run R = 5 times on each split. Tables report the mean of those five runs and the sample standard deviation. Parent selection uses a shortlist of up to K = 5 highest-scoring nodes, exploration weight 0.35, an expansion penalty with alpha 1, and a temperature set from the validation scores' own noise.

  The six benchmarks are split once, seed 42: TAU2-bench 92 validation and 186 test, AppWorld 105 and 210, and WebShop, BrowseComp-Plus, SWE-bench Verified, and BigCodeBench-Hard 100 and 200 each. Metrics are the benchmark's own, in percent: task success on TAU2-bench and AppWorld, task score on WebShop, answer accuracy on BrowseComp-Plus, resolution rate on SWE-bench Verified, and Pass@1 on BigCodeBench-Hard.
limitations:
  - "The paper's limitations section says search is guided by a validation score, so it applies to tasks with an automatic grader. It also consumes evaluation compute. The authors call that a one-time cost, amortized over later deployment, which bounds how large a budget is practical."
  - "Candidates form a tree. Every harness has a single parent. The paper says a graph, in which one candidate could combine mechanisms from separate branches, is left to future work."
  - "Figure 3(b) and the per-task cost tables exclude one-time harness-search cost. The USD 0.232 average is the cost of running the selected harness, not the cost of the 15 attempts that produced it. The paper says the implementation and the scripts for the tables and figures will be released. On November 6, 2026, this page did not find a code link on the arXiv record."
  - "The 41.4% comparison with Codex is the ratio of arithmetic averages, USD 0.232 versus USD 0.561. Figure 3(b) switches to a geometric mean because BrowseComp-Plus is much more expensive than the other tasks, and on that plot Lee et al. are the cheaper frontier point, USD 0.092 versus USD 0.101. HarnessFlow is also not the cheapest method on every benchmark column."
  - "The GPT-5.4 comparison covers TAU2-bench, AppWorld, and WebShop only. HarnessFlow has the highest three-benchmark average and does not have the highest WebShop mean. Codex does, at 73.59 versus 71.72."
  - "Table 1 prints a sample standard deviation on every cell except the average. The BigCodeBench-Hard lead is 32.50 ± 1.77 versus Hermes at 31.70 ± 1.15. BrowseComp-Plus is 76.90 ± 1.14 versus 76.60 ± 1.02 for Lee et al. The paper still marks HarnessFlow's mean as the highest in both columns."
  - "Hand-built scores are the authors' runs of pinned releases: Claude Code 2.1.272, Codex 0.154.0, OpenHands cloud-1.45.0 (SDK 1.34.0), and Hermes v2026.9.7, all on GPT-5.4-mini except in the GPT-5.4 table. They are not the vendors' published leaderboards. A proposed candidate that fails the runtime check, or that does not yield a score, still consumes one of the 15 attempts and is not added to the tree."
references:
  - title: "Hong et al., HarnessFlow (arXiv:2611.06254)"
    url: "https://arxiv.org/abs/2611.06254"
  - title: "HTML version of the paper"
    url: "https://arxiv.org/html/2611.06254"
  - title: "PDF of the paper"
    url: "https://arxiv.org/pdf/2611.06254"
  - title: "Lee et al., Meta-Harness (arXiv:2603.28052)"
    url: "https://arxiv.org/abs/2603.28052"
    note: "Atom published time March 30, 2026, 05:33:50 UTC. Read November 6, 2026. HarnessFlow reruns this method under its own protocol. The March paper's tasks are different."
  - title: "Lee et al. project page"
    url: "https://yoonholee.com/meta-harness/"
    note: "Opened November 6, 2026. The HTML title is the March paper's full title."
  - title: "Anthropic, Claude Code"
    url: "https://github.com/anthropics/claude-code"
    note: "Repository opened November 6, 2026. The paper evaluates npm release 2.1.272, not whatever commit was current that day."
  - title: "OpenAI, Codex CLI"
    url: "https://github.com/openai/codex"
    note: "Repository opened November 6, 2026. The paper evaluates release 0.154.0, and uses that same release as the coding agent that writes candidate harnesses."
  - title: "OpenHands"
    url: "https://github.com/OpenHands/OpenHands"
    note: "Repository opened November 6, 2026. The paper evaluates cloud-1.45.0 (SDK 1.34.0)."
  - title: "Nous Research, Hermes agent"
    url: "https://github.com/NousResearch/hermes-agent"
    note: "Repository opened November 6, 2026. The paper evaluates v2026.9.7."
citation:
  apa: "Hong, Z., Wang, Q., Wei, H., Wu, A., Ying, D., Kong, M., Liu, B., & Luo, C. (2026, November 4). HarnessFlow: MCTS-guided harness optimization for LLM agents. arXiv:2611.06254."
  bibtex: |
    @article{hong2026harnessflow,
      title={HarnessFlow: MCTS-Guided Harness Optimization for LLM Agents},
      author={Hong, Zhi and Wang, Qianlong and Wei, Hongchen and Wu, Aidan and Ying, Daohong and Kong, Mingze and Liu, Bei and Luo, Chong},
      journal={arXiv preprint arXiv:2611.06254},
      year={2026},
      url={https://arxiv.org/abs/2611.06254}
    }
faq:
  - question: "What does harness mean in the HarnessFlow paper?"
    answer: "A harness is the executable program around a fixed model. It decides what information the model sees, how state is kept, which tools are called, and when the run stops. HarnessFlow searches over complete programs of that kind. It does not change the model weights. That matches the site glossary: the runtime around the model, as distinct from the weights. The paper's starting point on each benchmark is that benchmark's own reference agent."
  - question: "What is the Monte Carlo tree search doing?"
    answer: "It chooses which existing harness to rewrite next. After each attempt the search keeps a tree: a node is a harness plus its validation score and execution records, and an edge is a code edit from a parent. The policy looks at the top five scores, leans toward high scores, and also leans toward nodes that have fewer direct children. A coding agent, not the tree policy, decides the actual edit. The default mix puts 35% of the selection weight on the exploration term."
  - question: "What is the headline score, and when was the paper released?"
    answer: "arXiv lists version 1 as published November 4, 2026, at 10:05:15 UTC, in cs.AI. With 15 refinement attempts per benchmark and GPT-5.4-mini inside the harnesses, the selected harnesses average 69.48% across TAU2-bench, AppWorld, WebShop, BrowseComp-Plus, SWE-bench Verified, and BigCodeBench-Hard. The paper says that average is 10.89 points above the starting harnesses and 3.95 points above Lee et al. This breakdown was published November 6, 2026."
  - question: "How does HarnessFlow compare with Meta-Harness?"
    answer: "In this paper the two methods share the starting harness, the coding agent, the 15-candidate budget, and the grader. Lee et al. average 65.53. HarnessFlow averages 69.48. The largest gaps are 7.21 points on TAU2-bench and 6.60 points on SWE-bench Verified. The difference the authors emphasize is the search organization: HarnessFlow keeps a refinement tree and picks the parent with an explicit policy. Their description of Lee et al. is iterative refinement from execution feedback without that persistent tree. Lee et al.'s own March paper reports different tasks, including TerminalBench-2, and those numbers are not rows in this table. On the geometric-mean cost plot, Lee et al. are slightly cheaper, USD 0.092 versus USD 0.101."
  - question: "Does this beat hand-built Claude Code, Codex, OpenHands, and Hermes?"
    answer: "On the paper's means, yes, for this model and these pins. Codex has the best hand-built average, 64.82, against HarnessFlow's 69.48. Claude Code averages 61.71, OpenHands 62.61, and Hermes 64.28. The releases are Claude Code 2.1.272, Codex 0.154.0, OpenHands cloud-1.45.0 with SDK 1.34.0, and Hermes v2026.9.7. Every method uses GPT-5.4-mini, except in the separate GPT-5.4 table. Claude Code is below the benchmark's own starting harness on AppWorld and on SWE-bench Verified. These are the authors' runs, not a published product leaderboard."
  - question: "How many tries does the search need, and what does it cost to run afterward?"
    answer: "On the validation set, the mean best score is 71.5% after three candidate evaluations per benchmark and 74.2% at round 15. That is not the 69.48% test average. After search, the arithmetic-average cost of running the selected harness is USD 0.232 per task, against USD 0.561 for the paper's Codex baseline. The introduction calls that 41.4% of Codex's average. Search cost is excluded. BrowseComp-Plus dominates the arithmetic average, which is why Figure 3(b) also reports a geometric mean."
  - question: "Do the gains still show up with a stronger model?"
    answer: "On GPT-5.4, with search rerun, HarnessFlow's average on TAU2-bench, AppWorld, and WebShop is 83.58%, against 81.71% for Lee et al. and 80.85% for Claude Code. It leads TAU2-bench at 88.06 and AppWorld at 90.95. It does not lead WebShop: Codex is 73.59 and HarnessFlow is 71.72. Average cost in that table is USD 0.21 per task for HarnessFlow and USD 0.67 for Claude Code. Lee et al. average USD 0.18. The other three benchmarks are not in that table."
  - question: "What are the limits of the result?"
    answer: "The search needs an automatic grader, and the evaluation compute is a one-time cost the deployment numbers do not include. The search is a tree, so a new harness cannot merge two parents. Some leads are small relative to the printed standard deviations, especially BigCodeBench-Hard. The hand-built comparison is a pinned release on one backbone, not the product's own leaderboard. The paper says code will be released. This page did not find a repository linked from the arXiv record on November 6, 2026."
  - question: "Where is the paper?"
    answer: "The record is arXiv 2611.06254. The abstract page, the HTML version, and the PDF are linked in the references on this page. Lee et al. are arXiv 2603.28052, with a project page linked beside that reference. The four hand-built baselines are linked at the releases the paper names. This page did not find a HarnessFlow code release on the arXiv record."
---

## How it compares with Meta-Harness and hand-built harnesses

The paper's comparisons are internal. Vanilla is the benchmark's own reference agent and the root of the search tree. [Meta-Harness](https://arxiv.org/abs/2603.28052) is rerun with the same initial harness, the same coding agent, the same 15-candidate budget, and the same grader. [Claude Code](https://github.com/anthropics/claude-code), [Codex](https://github.com/openai/codex), [OpenHands](https://github.com/OpenHands/OpenHands), and [Hermes](https://github.com/NousResearch/hermes-agent) are official releases, pinned, with the same backbone, the same benchmark tools, and the same per-task limits. No number in the tables is taken from a vendor leaderboard.

On November 6, 2026, those four repositories were public. Claude Code's repository describes an agentic coding tool in the terminal. Codex's describes a lightweight coding agent in the terminal. OpenHands's describes AI-driven development. Hermes's short description is "The agent that grows with you." The pins in the paper are older than a repository's default branch may be: Claude Code 2.1.272, Codex 0.154.0, OpenHands cloud-1.45.0 (SDK 1.34.0), and Hermes v2026.9.7. The [harness guide](/blog/what-is-an-ai-agent-harness) on this site, updated November 6, 2026, uses a wider product definition for Claude Code and Codex and already summarizes Meta-Harness's own March results. Those March results used other tasks. They are not a row below.

Meta-Harness, in the March 30 paper, is an outer loop whose proposer reads a filesystem of prior code, scores, and traces and is not given a parent-selection rule. HarnessFlow's claim is about the organization of the search: a tree, an explicit parent policy, and a library of reusable mechanisms. The scores that follow are what that change did inside HarnessFlow's protocol.

### Mean scores on the six benchmarks

Table 1 is the mean test score in percent. Each cell except the average is the mean of five runs, plus or minus the sample standard deviation. Bold in the paper marks the highest mean. The average has no standard deviation. TAU2 is TAU2-bench. BC+ is BrowseComp-Plus. SWE-V is SWE-bench Verified. BCB-H is BigCodeBench-Hard.

| Method | TAU2 | AppWorld | WebShop | BC+ | SWE-V | BCB-H | Avg. |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Vanilla | 63.98 ± 2.15 | 72.00 ± 1.86 | 47.79 ± 1.14 | 72.40 ± 1.85 | 67.10 ± 0.89 | 28.30 ± 0.76 | 58.59 |
| Claude Code | 73.12 ± 1.14 | 70.86 ± 2.00 | 56.98 ± 1.19 | 73.20 ± 1.72 | 65.30 ± 1.30 | 30.80 ± 2.61 | 61.71 |
| OpenHands | 71.83 ± 1.59 | 66.29 ± 1.32 | 65.54 ± 1.77 | 74.00 ± 1.97 | 67.20 ± 1.64 | 30.80 ± 2.86 | 62.61 |
| Hermes | 72.90 ± 2.17 | 74.19 ± 1.03 | 64.50 ± 1.34 | 74.30 ± 1.30 | 68.10 ± 2.53 | 31.70 ± 1.15 | 64.28 |
| Codex | 75.91 ± 2.98 | 73.24 ± 1.97 | 66.15 ± 1.49 | 74.70 ± 2.36 | 68.70 ± 2.11 | 30.20 ± 1.10 | 64.82 |
| Meta-Harness | 74.62 ± 2.36 | 76.76 ± 2.94 | 66.33 ± 0.61 | 76.60 ± 1.02 | 68.80 ± 1.15 | 30.10 ± 1.66 | 65.53 |
| HarnessFlow | 81.83 ± 2.39 | 80.76 ± 1.33 | 69.49 ± 0.88 | 76.90 ± 1.14 | 75.40 ± 1.19 | 32.50 ± 1.77 | 69.48 |

The paper says HarnessFlow exceeds Vanilla, Codex, and Meta-Harness by 10.89, 4.66, and 3.95 points on average. Those differences are 69.48 minus 58.59, 64.82, and 65.53. The largest gains over Vanilla are WebShop, 69.49 versus 47.79, and TAU2-bench, 81.83 versus 63.98. The largest gains over Meta-Harness are TAU2-bench, 81.83 versus 74.62, and SWE-bench Verified, 75.40 versus 68.80.

The hand-built ranking is not the same on every column. Codex has the highest hand-built average, 64.82. Hermes is higher than Codex on AppWorld, BrowseComp-Plus, and BigCodeBench-Hard. Claude Code's average, 61.71, is the lowest of the four production harnesses. On AppWorld, Claude Code at 70.86 and OpenHands at 66.29 are both below Vanilla at 72.00. On SWE-bench Verified, Claude Code at 65.30 is below Vanilla at 67.10. A production harness, on this backbone and these pins, is not automatically ahead of the benchmark's own agent.

Two leads are narrow next to the printed standard deviations. BigCodeBench-Hard is 32.50 ± 1.77 for HarnessFlow and 31.70 ± 1.15 for Hermes. BrowseComp-Plus is 76.90 ± 1.14 and 76.60 ± 1.02. The paper marks HarnessFlow as the highest mean in both columns. The TAU2-bench and SWE-bench Verified gaps over Meta-Harness are several times the printed standard deviations.

The official metrics, all scaled to percent, are task success for TAU2-bench and AppWorld, task score for WebShop, answer accuracy for BrowseComp-Plus, resolution rate for SWE-bench Verified, and Pass@1 for BigCodeBench-Hard.

### Search efficiency

Figure 3(a) is the validation set, not the test set. The solid curve is the mean candidate score. The dashed curve is the mean, across benchmarks, of the best score seen so far. Round 0 is the shared initial harness.

After three candidate evaluations per benchmark, the mean best validation score is 71.5%. By round 15 it is 74.2%. On four of the six benchmarks, the paper says the final best is first reached at round 10 or later. It does not name which four. It does say those later winners refine an earlier retained harness rather than only the candidate from the previous round. The test average of 69.48% is a different number, measured once on the held-out split of the harness that won validation.

The SWE-bench Verified lineage in Figure 4 makes one path concrete. Edges 0 → 2 → 4 → 8 → 10 move the validation score from 67.60% to 79.20%. Along that path the paper describes repository-history retrieval, interpreter compatibility, symbol-level retrieval, and compaction of large submission patches. The caption says the scores are cumulative designs, not the isolated effect of each edit. The TAU2-bench appendix figure raises validation from 59.35% to 81.30%, and the caption names action reviews, structured evidence, and troubleshooting continuation along that lineage.

### What the selected harness costs to run

Figure 3(b) plots mean test score against the geometric mean of per-task execution cost, which down-weights BrowseComp-Plus. HarnessFlow and Meta-Harness are the Pareto frontier at $0.101 and $0.092. Meta-Harness is the cheaper of those two points. The paper says the hand-engineered harnesses cost two to three times as much, at lower scores. Search cost is not in the plot.

The appendix also prints an arithmetic average, which BrowseComp-Plus pulls upward. The introduction's 41.4% claim is this average, not the geometric mean: HarnessFlow at $0.232 divided by Codex at $0.561. Prices are the executor's list price for GPT-5.4-mini, $0.75 per million input tokens and $4.50 per million output tokens. Bold in the paper marks the cheapest cell in a column.

| Method | TAU2 | AppWorld | WebShop | BC+ | SWE-V | BCB-H | Avg. |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Vanilla | 0.067 | 0.132 | 0.030 | 2.292 | 0.181 | 0.007 | 0.451 |
| Claude Code | 0.177 | 0.383 | 0.191 | 1.444 | 0.456 | 0.024 | 0.446 |
| OpenHands | 0.148 | 0.286 | 0.128 | 1.365 | 0.445 | 0.017 | 0.398 |
| Hermes | 0.215 | 0.350 | 0.167 | 1.507 | 1.050 | 0.043 | 0.555 |
| Codex | 0.128 | 0.481 | 0.134 | 2.027 | 0.569 | 0.025 | 0.561 |
| Meta-Harness | 0.075 | 0.100 | 0.023 | 1.653 | 0.249 | 0.008 | 0.351 |
| HarnessFlow | 0.116 | 0.109 | 0.022 | 0.948 | 0.172 | 0.024 | 0.232 |

Read by column, HarnessFlow is the cheapest method on WebShop, BrowseComp-Plus, and SWE-bench Verified. It is not the cheapest on TAU2-bench, where Vanilla is $0.067 and Meta-Harness is $0.075, or on AppWorld, where Meta-Harness is $0.100, or on BigCodeBench-Hard, where Vanilla is $0.007, Meta-Harness is $0.008, and OpenHands is $0.017. The paper's claim is a lower arithmetic average than every hand-engineered harness, and a place on the Pareto frontier of each benchmark, which allows a higher cost when the score is higher. The hand-engineered arithmetic range in the text is $0.398 to $0.561.

### The same search with GPT-5.4 as the executor

Table 4 reruns the comparison with GPT-5.4 as the model inside the harness. For HarnessFlow and Meta-Harness, search is started again from the same initial harness, with this executor. Cost uses a different list price, $2.50 per million input tokens and $15.00 per million output tokens. Only three benchmarks are in the table. Rows in the paper are ordered by average score.

| Method | TAU2 | TAU2 $ | AppWorld | AppWorld $ | WebShop | WebShop $ | Avg. | Avg. $ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Vanilla | 83.76 ± 2.83 | 0.23 | 82.48 ± 1.09 | 0.38 | 56.29 ± 1.20 | 0.08 | 74.18 | 0.23 |
| Codex | 85.91 ± 1.59 | 0.47 | 75.52 ± 2.37 | 0.57 | 73.59 ± 0.89 | 0.38 | 78.34 | 0.47 |
| Hermes | 85.81 ± 1.73 | 0.70 | 79.43 ± 1.36 | 0.62 | 72.76 ± 1.43 | 0.47 | 79.33 | 0.60 |
| OpenHands | 83.12 ± 3.64 | 0.48 | 83.71 ± 1.32 | 0.52 | 71.62 ± 0.59 | 0.41 | 79.48 | 0.47 |
| Claude Code | 82.69 ± 1.76 | 0.61 | 87.81 ± 1.92 | 0.81 | 72.06 ± 1.36 | 0.59 | 80.85 | 0.67 |
| Meta-Harness | 84.59 ± 1.12 | 0.24 | 88.41 ± 0.73 | 0.20 | 72.12 ± 0.51 | 0.09 | 81.71 | 0.18 |
| HarnessFlow | 88.06 ± 1.92 | 0.31 | 90.95 ± 0.95 | 0.25 | 71.72 ± 0.66 | 0.08 | 83.58 | 0.21 |

HarnessFlow's average, 83.58, is the highest of the seven. The paper says that is 2.73 points above Claude Code and 1.87 points above Meta-Harness. The wins are TAU2-bench, 88.06, and AppWorld, 90.95. WebShop is not a win. Codex is 73.59, Hermes 72.76, Meta-Harness 72.12, Claude Code 72.06, HarnessFlow 71.72, and OpenHands 71.62. Average cost is $0.21 for HarnessFlow and $0.67 for Claude Code. Meta-Harness is cheaper on that average, at $0.18. The paper's sentence on cost in this table is the comparison with Claude Code.

## How the search works

HarnessFlow separates two jobs. A selection policy chooses which harness to refine. A coding agent chooses how to change the code. The model inside the harness stays the one named in the experiment. The coding agent is a different model: Codex CLI 0.154.0, running GPT-5.5 at the highest reasoning effort. It can read the search history. It cannot see the test tasks.

### Selection

After some attempts, the search holds a tree. The root is the initial harness. Each later node is a harness, its validation score, and its execution records. An edge means the child was produced by editing the parent. Scores already measured are not rewritten when the tree grows.

At the next attempt, the parent is drawn from a shortlist of up to five highest-scoring nodes. Ties break by creation order. Inside that shortlist, one term is a softmax over validation scores. A temperature, set from the scores' own standard error and clipped between 0.005 and 0.100, controls how hard the softmax concentrates on the leader. If no shortlisted node can supply that error, the temperature is 0.08. A second term prefers nodes with fewer direct children. Direct children, not the size of the whole subtree, are what get counted. The mixture used in the main experiments puts weight 0.65 on the score term and 0.35 on the exploration term.

The coding agent may still read code and evidence from nodes that were not selected. The shortlist restricts the parent, not the archive.

### Expansion

The coding agent receives the selected parent, the archive, and a read-only snapshot of the Harness Component Library. It writes a new self-contained harness and a record of the edit. The library is optional reference code, not a menu the search is required to stay inside. The agent is told to copy what it uses, and that code's local dependencies, into the candidate. It is told not to import the snapshot at runtime. The archive holds earlier implementations, the edits, validation feedback, task-level traces, and which harness was the parent of which.

The library in the experiments has 21 benchmark-neutral Python modules. They cover observation compaction and skill catalogs, note stores and logs, loop and workflow runners, and checks on tool arguments, plus shared support for verification, self-review, and recovery. The modules depend only on the Python standard library. Model calls and tool execution come from the host through a small adapter.

### Evaluation and backpropagation

A candidate is scored on the validation split with five repetitions. The score is the average of the benchmark metric. The traces are kept so a later edit can see what failed. If the candidate passes a runtime compatibility check and the evaluation yields a score, it is added to the tree under its parent, the parent's child count goes up by one, and the archive stores the change in score relative to the parent. Improving and non-improving edits are both stored. A candidate that fails the check still uses up one of the 15 attempts. It is not added to the tree.

After 15 attempts, the harness with the highest validation score in the tree is evaluated on the test set. That test score is the number in Table 1. The protocol is sequential and budgeted. It is not a claim that the search found the best harness in an open-ended space.

### What the ablations change

The library ablation repeats the search without the component library, on TAU2-bench, AppWorld, and BigCodeBench-Hard only. The average falls from 65.03 to 63.39. The paper says the drop is primarily TAU2-bench, 81.83 to 77.64, with small changes on the other two: AppWorld 80.76 to 80.63, and BigCodeBench-Hard 32.50 to 31.90. Without the library, the three-benchmark average is still 8.63 points above Vanilla's 54.76.

Starting from the OpenHands agent, instead of the benchmark's reference harness, still improves all three of those benchmarks. The average is 62.61, from TAU2-bench 76.02 ± 2.42, AppWorld 79.62 ± 0.92, and BigCodeBench-Hard 32.20 ± 1.96. The paper's reading is that the gains are not tied to one starting architecture. That 62.61 is this three-benchmark ablation, not the OpenHands row in Table 1, which prints the same average on the full set of six.

The exploration ablation keeps the top-five shortlist and the budget of 15, and changes only the mixture weight, on TAU2-bench, AppWorld, and SWE-bench Verified.

| Benchmark | Weight 0 | Weight 0.35 | Weight 1 |
| --- | --- | --- | --- |
| TAU2-bench | 74.19 ± 2.77 | 81.83 ± 2.39 | 72.80 ± 2.10 |
| AppWorld | 78.76 ± 2.47 | 80.76 ± 1.33 | 79.81 ± 0.80 |
| SWE-bench Verified | 68.83 ± 2.57 | 75.40 ± 1.19 | 68.33 ± 0.29 |
| Average | 73.93 | 79.33 | 73.65 |

Weight 0 uses only the score softmax. Weight 1 favors parents with fewer direct children. The default, 0.35, is the highest mean on all three benchmarks. The paper states the gaps as 5.40 points over pure exploitation and 5.68 points over pure exploration. The movement is larger on TAU2-bench and SWE-bench Verified than on AppWorld. AppWorld at weight 1 is 79.81, close to the default 80.76.

## What the experiments controlled

Names and numbers in this section are printed in the November 4 paper unless a link says otherwise.

Each benchmark is split once, with seed 42. TAU2-bench is 92 validation tasks and 186 test tasks. AppWorld is 105 and 210. WebShop, BrowseComp-Plus, SWE-bench Verified, and BigCodeBench-Hard are 100 and 200. BigCodeBench-Hard samples tasks from that release with its published difficulty criteria. The same split and the same official grader are used for every method. The test split is not an input to search.

The initial harness is the benchmark's reference agent, with the model client swapped for a shared gateway so that Vanilla, every candidate, and every baseline call the same model. The paper lists the upstream revisions: TAU2-bench LLMAgent at `a2c0247`, the AppWorld ReAct experiment harness at `66ad809` (v0.1.3.post1), the WebShop ReAct scaffold at `a5c0827`, BrowseComp-Plus `search_agent/openai_client.py` at `0469490`, mini-SWE-agent DefaultAgent at `04d809c` for SWE-bench Verified, and `bigcodebench.generate` at v0.1.4.

The production agents run through their official non-interactive entry points, with their default tools, skills, and subagents. All methods share a network-isolated sandbox whose only egress is the model gateway, and they reach benchmark tools through a benchmark-specific tool server. Each agent is given the task description and the benchmark's input and output conventions.

Wall-clock deadlines and step limits are the same for every method. TAU2-bench allows 200 steps and 1,800 seconds. AppWorld allows 50 interactions and 1,800 seconds. WebShop allows 30 actions and 900 seconds. BrowseComp-Plus allows 100 tool calls and 1,800 seconds. SWE-bench Verified allows 250 model calls and 2,400 seconds. BigCodeBench-Hard allows 30 iterations and 1,800 seconds.

Auxiliary models are fixed per benchmark and shared. The TAU2-bench user simulator is GPT-5.2, and its evaluator is GPT-5.5. The BrowseComp-Plus grader is GPT-5.5 with the upstream grading template. The other benchmarks use programmatic graders. Sampling temperature for the executor is the API default. The GPT-5.4 table changes the executor only.

AppWorld's starting harness is the benchmark's ReAct experiment harness. That is a historical thread on this site as well. The [ReAct](/research/react-reasoning-and-acting) note covers Yao et al. 2022, which the HarnessFlow paper cites, including the WebShop setting. HarnessFlow's WebShop root is a later ReAct scaffold, revision `a5c0827`, not the 2022 prompt. The scores in Table 1 are not a comparison with the 2022 paper.

## Limits that change how to read the scores

The limitations section of the paper is short, and the tables add constraints the abstract does not.

The search needs a validation score, so the setting is tasks with an automatic grader. Interactive work that a person still has to judge is outside the protocol. The 15 graded candidates are a one-time cost. The cost plots and the $0.232 figure leave that cost out. A reader who budgets only the serving number is not budgeting the search.

The structure is a tree. A child has one parent. The paper says the natural extension is a graph, so a candidate could combine mechanisms found on different branches, and it leaves that undone. The SWE-bench Verified story is a single lineage of cumulative edits. It is not evidence that each named edit would have helped on its own, which the figure caption states.

The arithmetic cost average and the geometric-mean plot answer different questions. BrowseComp-Plus costs about $0.95 to $2.29 per task, against a few cents on BigCodeBench-Hard. The 41.4% sentence is the arithmetic comparison with Codex. On the geometric-mean frontier, Meta-Harness is the cheaper point. On several individual benchmarks, Vanilla or Meta-Harness is cheaper than HarnessFlow at a lower score.

The GPT-5.4 table is three benchmarks, and WebShop reverses the ranking against Codex. Transfer to a stronger executor is real on the printed average and is not a win on every column. The main table's smallest margins, BigCodeBench-Hard and BrowseComp-Plus, should be read with the standard deviations next to them.

The reproducibility statement says the implementation and the scripts for the tables and figures will be released. The arXiv record, checked November 6, 2026, did not link a repository. Until that code is public, the tables are the authors' report of their own runs.

## Read the paper

The November 4 paper, the March harness optimizer it reruns, and the four pinned harnesses:

- [HarnessFlow on arXiv](https://arxiv.org/abs/2611.06254)
- [HTML](https://arxiv.org/html/2611.06254)
- [PDF](https://arxiv.org/pdf/2611.06254)
- [Meta-Harness](https://arxiv.org/abs/2603.28052)
- [Meta-Harness project page](https://yoonholee.com/meta-harness/)
- [Claude Code](https://github.com/anthropics/claude-code)
- [Codex](https://github.com/openai/codex)
- [OpenHands](https://github.com/OpenHands/OpenHands)
- [Hermes agent](https://github.com/NousResearch/hermes-agent)

Related pages on this site: [harnesses](/topics/harnesses), [how agents work](/topics/how-agents-work), [task performance](/topics/task-performance), [research](/topics/research), [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness), [harness](/glossary/harness), [harness engineering](/glossary/harness-engineering), [SpecCompact](/research/speccompact-agent-context-compaction), [ReAct](/research/react-reasoning-and-acting), [Claude Code](/directory/claude-code), and [Codex](/directory/codex).
