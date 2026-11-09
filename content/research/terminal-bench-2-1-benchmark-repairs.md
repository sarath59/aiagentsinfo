---
title: "Terminal-Bench 2.1: 28 of 89 repaired (2026)"
description: "Terminal-Bench 2.1 repairs 28 of 89 tasks from version 2.0. Individual scores shift by up to 12 points, ranks move by at most 3. Spearman 0.958."
date: "2026-11-08"
updated: "2026-11-09"
type: paper-breakdown
topics:
  - research
  - harnesses
  - task-performance
companies:
  - arxiv
  - github
  - anthropic
  - openai
contentLicense: true
paperTitle: "Benchmarks as Software: Terminal-Bench and the Case for Continuous Benchmarks"
paperAuthors: "E. Kelly Buchanan, Crystal Zhou, Scott W. Linderman, Christopher Ré"
paperYear: 2026
paperUrl: "https://arxiv.org/abs/2611.08417"
codeUrl: "https://github.com/harbor-framework/terminal-bench-2-1"
venue: "arXiv preprint, 2611.08417, submitted November 5, 2026 (cs.AI, version 1)"
dataset:
  title: "Terminal-Bench 2.0 to 2.1 changed-task pass rates (Table 7)"
  description: "Pass rates on the 28 Terminal-Bench tasks revised for version 2.1, copied from Table 7 of Buchanan, Zhou, Linderman, and Ré, arXiv:2611.08417 (November 5, 2026). Rates are aggregated across the paper's agent-model pairs. The other 61 tasks are not in this table."
  isBasedOn: "https://arxiv.org/pdf/2611.08417"
abstract: |
  Buchanan, Zhou, Linderman, and Ré posted arXiv:2611.08417 on November 5, 2026. The paper audits Terminal-Bench 2.0, a benchmark of 89 terminal tasks, and releases the repairs as Terminal-Bench 2.1. The audit finds issues in 28 tasks, about 30% of the set. The abstract says those repairs raise accuracy by over 10 percentage points and move leaderboard positions by up to three ranks. Rankings stay highly correlated, with Spearman ρ = 0.958. The discussion says individual scores shift by up to 12 percentage points.

  The same abstract says a longer time limit closes a harness gap of about 20 points on GPT 5.4 and shrinks a 30-point gap on GPT 5.4 mini to 5 points. Figure 6 prints the eight accuracies behind those gaps. This note was published November 8, 2026. The PDF and the arXiv HTML were both read that day. Where the paper's own pages disagree, the disagreement is printed below.
whyItMatters: |
  A Terminal-Bench score is a product of the model, the harness, the task files, and the time and memory budget. Terminal-Bench 2.1 is a repair of the task files, not a new model. The practical finding is that a score printed against version 2.0 can move because the grader was wrong, the environment had drifted, or the clock was too short. The rank order of 19 agents stays highly correlated. Nearby agents, and any claim that quotes a single percentage, can still change with the version.

  Public pages already treat "Terminal-Bench 2.1" as several different objects. The Evolver note on this site uses a 20-task diagnostic slice. The short-context note runs the 89-task set inside a different harness. On November 8, 2026, the Terminal-Bench homepage HTML still titled its visible board Terminal-Bench 4.0, and the request for the 2.1 leaderboard URL redirected there. This note does not copy a third-party 2.1 leaderboard. It copies the paper's tables.

  On this site, the harness is the loop, tools, memory, permissions, and stop rules around a model. The paper's own term matches that split. Terminus-2, the baseline harness, is a single-agent ReAct loop. Claude Code, Codex, and Gemini CLI are the provider harnesses in the same comparison. Giving Terminus-2 more time closes most of its gap with Codex. A harness ranking read off a short clock is partly a speed ranking.
keyFindings:
  - "The audit repairs 28 of 89 Terminal-Bench 2.0 tasks and releases that set as Terminal-Bench 2.1. Figure 3a splits the 28 into instruction–verification mismatch on 16 tasks (57%), task drift on 12 (43%), and environment issues on 8 (29%). A task can carry more than one label. 16, 12, and 8 sum to 36."
  - "Table 7 is the pass-rate table for those 28 tasks, averaged across the paper's agent-model pairs. Five tasks move from at most 15% to over 50%: caffe-cifar-10 (5.0% to 69.2%), polyglot-c-py (5.0% to 80.0%), polyglot-rust-c (5.0% to 66.7%), sam-cell-seg (0.0% to 53.3%), and torch-tensor-parallelism (15.0% to 66.7%). Their absolute changes are 62.7% of the absolute changes on all 28 rows, matching the paper's figure."
  - "The abstract says accuracy increased by over 10 percentage points and ranks move by up to three. The discussion says individual scores shift by up to 12 points. Spearman ρ = 0.958 across 19 agents, with a task-bootstrap 95% interval of 0.881 to 0.979. The OLS fit printed in the text is TB2.1 = 2.1 + 1.04 × TB2.0. The paper does not print a 19-row accuracy table. Table 6 prints 20 agent-model configurations."
  - "Figure 6 prints eight Terminal-Bench 2.1 accuracies. Read so the gaps match the abstract: at the default timeout, Codex versus Terminus-2 is 74.2% versus 53.9% on GPT 5.4 (20.3 points) and 67.0% versus 37.1% on GPT 5.4 mini (29.9 points). At 32× the timeout those pairs are 74.9% versus 75.3%, and 68.2% versus 62.9% (5.3 points)."
  - "On November 8, 2026 at 13:42:29 GMT, the GitHub contents API listed 89 directories under tasks/ on harbor-framework/terminal-bench-2-1, and all 28 names from Table 7 were among them. The README on main says 26 tasks were modified. The paper says 28. Pull request 53 on terminal-bench-2 was still open."
methodology: |
  The source is arXiv 2611.08417, version 1. The arXiv API records the submission at 2026-11-05T18:18:39Z. The abstract page, read November 8, 2026, says submitted on 5 Nov 2026, primary category cs.AI, and links the license as CC BY 4.0. This note is a separate article and is also licensed CC BY 4.0. The PDF and the HTML were both read on November 8. Table 7 matched across them. Figure 6 is a chart. The eight percentages below are the numbers the PDF text layer prints, paired so the gaps equal the gaps the abstract states.

  The PDF author line is E. Kelly Buchanan and Scott W. Linderman and Christopher Ré at Stanford University, and Crystal Zhou at Cornell University. The correspondence address printed on the HTML is kelly.buchanan@stanford.edu.

  Terminal-Bench 2.0 has 89 tasks. The audit labels a task as clean, as an instruction–verification mismatch, as task drift, or as an environment issue. A task can carry more than one defect label. Repairs are propose-only: the workflow can open a diff, and a person merges it. The accepted repairs ship as Terminal-Bench 2.1. The paper says 19 of the 28 repaired tasks were hard, 7 medium, and 2 easy.

  The rank comparison uses trials of TB2.0 and TB2.1. Table 4 lists 13 models. Table 5 lists four harnesses: terminus-2, claude-code, codex, and gemini-cli. Table 6 lists the agent-model rows and the sampling overrides. A separate condition multiplies the wall-clock budget by up to 32. That condition is not the default leaderboard protocol. The paper says it was run on a subset of agents because of cost.

  Two checks on November 8 are ours, not the paper's. The GitHub REST API for harbor-framework/terminal-bench-2-1 was read at 13:48:44 GMT. The contents API for tasks/ was read at 13:42:29 GMT. Pull request 53 on harbor-framework/terminal-bench-2 was read the same afternoon. The Terminal-Bench site was requested at 13:42:54 GMT.
limitations:
  - "The abstract's 'over 10 percentage points' and the discussion's 'up to 12 percentage points' are not the same sentence, and neither is the mean of Table 7. The signed changes on the 28 Table 7 rows sum to 377.7 points, which is 13.5 points per repaired task. Spread across all 89 tasks, that sum is 4.2 points, and only if the other 61 tasks did not move. The paper does not print those 61 rates. Do not quote 13.5, 10, or 4.2 as the accuracy of a named agent."
  - "The results section says the rank correlation is across 19 agents. Table 6 prints 20 agent-model rows. Table 4 also lists Qwen 3.5 9B and Qwen 3.5 27B, which are not rows in Table 6. Figure 7 names cells, including Claude Opus 4.7, that Table 6 does not. This page does not invent the missing accuracy for each of the 19."
  - "Figure 6 is a chart. The PDF text layer prints 74.2, 74.9, 53.9, 75.3, 67.0, 68.2, 37.1, and 62.9. The pairing in the table below is the pairing that reproduces the abstract's 20-point gap, the closed gap, the 30-point gap, and the 5-point gap. It is not a typeset table in the paper."
  - "The repository README, read November 8, says 26 tasks were modified. The paper, Table 3, and Table 7 say 28. The task directory count that afternoon was 89, which matches the paper's benchmark size and does not decide between 26 and 28."
  - "Pull request 53 was opened March 11, 2026, last updated May 28, 2026, and was still open on November 8. The paper points to that pull request for the revision discussion. Open is not merged. The 2.1 repository exists separately and was last pushed November 5, 2026."
  - "On November 8, a request to the 2.1 leaderboard URL returned a redirect to the site root with ?version=2.1, and the HTML that came back still titled the visible board Terminal-Bench 4.0. No score rows were in that HTML. This note does not treat any third-party 2.1 percentage as the paper's result. The Evolver and short-context notes on this site are different experiments on version 2.1."
references:
  - title: "Buchanan et al., Benchmarks as Software (arXiv:2611.08417)"
    url: "https://arxiv.org/abs/2611.08417"
    note: "Version 1, submitted November 5, 2026, 18:18:39 UTC. Primary category cs.AI. Abstract page links CC BY 4.0. Read November 8, 2026."
  - title: "PDF of the paper"
    url: "https://arxiv.org/pdf/2611.08417"
    note: "Read November 8, 2026. Source for Table 7 and for the eight Figure 6 percentages."
  - title: "HTML version of the paper"
    url: "https://arxiv.org/html/2611.08417"
    note: "Read November 8, 2026. Table 7 matched the PDF."
  - title: "arXiv API record for 2611.08417"
    url: "https://export.arxiv.org/api/query?id_list=2611.08417"
    note: "Published and updated timestamps 2026-11-05T18:18:39Z. Four authors. Read November 8, 2026."
  - title: "harbor-framework/terminal-bench-2-1"
    url: "https://github.com/harbor-framework/terminal-bench-2-1"
    note: "GitHub API read November 8, 2026 at 13:48:44 GMT. Default branch main. Pushed 2026-11-05T20:22:18Z. 136 stars, 73 forks, 48 open issues. License Apache-2.0."
  - title: "tasks/ directory listing"
    url: "https://github.com/harbor-framework/terminal-bench-2-1/tree/main/tasks"
    note: "Contents API read November 8, 2026 at 13:42:29 GMT. 89 directories. Every Table 7 task name was present."
  - title: "README on main"
    url: "https://github.com/harbor-framework/terminal-bench-2-1/blob/main/README.md"
    note: "Read November 8, 2026. Says 26 tasks were modified. Says community submissions to the 2.1 leaderboard are closed."
  - title: "terminal-bench-2 pull request 53"
    url: "https://github.com/harbor-framework/terminal-bench-2/pull/53"
    note: "GitHub API read November 8, 2026. State open. Created 2026-03-11. Updated 2026-05-28. Not merged. Author ekellbuch. Title: Terminal-Bench 2.1."
  - title: "Terminal-Bench homepage"
    url: "https://www.tbench.ai/"
    note: "The 2.1 leaderboard path redirected here with ?version=2.1 at 13:42:54 GMT on November 8, 2026. The HTML title in that response was Terminal-Bench 4.0."
citation:
  apa: "Buchanan, E. K., Zhou, C., Linderman, S. W., & Ré, C. (2026, November 5). Benchmarks as software: Terminal-Bench and the case for continuous benchmarks. arXiv:2611.08417."
  bibtex: |
    @article{buchanan2026terminalbench21,
      title={Benchmarks as Software: Terminal-Bench and the Case for Continuous Benchmarks},
      author={Buchanan, E. Kelly and Zhou, Crystal and Linderman, Scott W. and R{\'e}, Christopher},
      journal={arXiv preprint arXiv:2611.08417},
      year={2026},
      url={https://arxiv.org/abs/2611.08417}
    }
faq:
  - question: "What is Terminal-Bench 2.1?"
    answer: "It is a repaired edition of Terminal-Bench 2.0. The November 5, 2026 paper says the audit found issues in 28 of 89 tasks and shipped the fixes as version 2.1. The task count on the GitHub repository was still 89 directories on November 8. The repairs change graders, environments, and resource budgets. They do not add a new model."
  - question: "By how much did scores move?"
    answer: "The abstract says accuracy increased by over 10 percentage points, and ranks move by up to three. The discussion says individual scores shift by up to 12 points. Spearman correlation across the paper's 19 agents is 0.958. Table 7's average change on the 28 repaired tasks is 13.5 points. That average is not the change on the full 89-task benchmark, and the paper does not print a 19-row score table."
  - question: "Which tasks jumped?"
    answer: "Five tasks in Table 7 go from at most 15% to over 50%. caffe-cifar-10 goes from 5.0% to 69.2%. polyglot-c-py goes from 5.0% to 80.0%. polyglot-rust-c goes from 5.0% to 66.7%. sam-cell-seg goes from 0.0% to 53.3%. torch-tensor-parallelism goes from 15.0% to 66.7%. The paper reads these as cases where agents already had valid solutions and version 2.0 failed to accept them."
  - question: "Does the harness still matter after the repair?"
    answer: "Yes, at the default clock. Figure 6's numbers put Codex 20.3 points ahead of Terminus-2 on GPT 5.4, and 29.9 points ahead on GPT 5.4 mini. At 32 times the timeout, the first gap is gone and the second is 5.3 points. The paper's reading is that most of the harness gap is speed under the default time limit."
  - question: "Is this the public Terminal-Bench leaderboard?"
    answer: "No. On November 8, 2026 the site's HTML still presented Terminal-Bench 4.0, and the 2.1 leaderboard URL redirected there. The README says community submissions for 2.1 are closed. Use this note for the repair paper. Use the live site for whatever board it is showing the day you look."
  - question: "Why do the README and the paper disagree on 26 versus 28?"
    answer: "The README on main, read November 8, says 26 tasks were modified. The paper's Table 3 and Table 7 list 28. Both documents were public the same day. This page keeps both numbers and uses 28 whenever it is quoting the paper."
---

Terminal-Bench 2.1 is a repair of a benchmark that was already supposed to be clean. [Buchanan, Zhou, Linderman, and Ré](https://arxiv.org/abs/2611.08417) say version 2.0 had been through human review, model-assisted auditing, and red-teaming before release, and that 28 of its 89 tasks still needed a fix. The fixes ship as Terminal-Bench 2.1. The abstract says accuracy rose by over 10 percentage points. The discussion says an individual score can move by as much as 12 points, while the ordering of 19 agents stays highly correlated.

This page was published November 8, 2026. The PDF, the HTML, the arXiv record, the 2.1 repository, pull request 53, and the Terminal-Bench homepage were read that day.

## What did the Terminal-Bench 2.1 repair change?

The Terminal-Bench 2.1 repair changes tasks, not models. Section 5 says the audit found issues in 28 tasks, roughly a third of the 89. The paper sorts the defects into three piles, and a task can sit in more than one. Figure 3a prints the shares. Table 2 prints the counts.

| Defect | Tasks in Table 2 | Share of the 28 in Figure 3a |
| --- | --- | --- |
| Instruction–verification mismatch | 16 | 57% |
| Task drift | 12 | 43% |
| Environment issues | 8 | 29% |

Sixteen divided by 28 is 57%. Twelve divided by 28 is 43%. Eight divided by 28 is 29%. The three counts sum to 36 because of the overlap. The example the paper gives for a mismatch is `query-optimize`: the grader demanded a byte-for-byte copy of a database file, and the instructions never said so. Drift is a task that broke after release because a package, an API, or a web page moved. Environment issues are budgets and images that were too tight for the known-correct solution. The repair rule for a resource limit is at least 1.5 times what the oracle and the grader actually used.

The sources of the 28 are also printed. Eleven tasks had already been flagged in Terminal-Bench 2.0 Verified, five more had been discussed in public issues and pull requests, and 14 were new to this audit. The paper says two tasks appear in more than one of those lists, and 11 + 5 + 14 − 2 = 28.

Z.ai's earlier audit, which this paper cites, is a different measurement. The paper says environment fixes alone, on all 89 task images, moved Claude Opus 4.5 from 52.4% to 57.9% in that earlier report. That 5.5-point gap is Z.ai's number. It is not a row in Table 7.

## Which of the 28 Terminal-Bench 2.1 tasks moved?

Table 7 lists the pass rate of each of the 28 repaired tasks, averaged across the paper's agent-model pairs. After the repair, the paper says no task in the table is still at zero for every agent. The largest drop is `overfull-hbox`, from 53.3% to 36.7%, which the appendix explains as a broken build that had been giving credit the repaired grader refuses.

The five tasks that go from at most 15% to over 50% are the ones the main text says account for roughly 62.7% of the absolute pass-rate change on the modified tasks. Adding the absolute changes on those five rows gives 305.9 points. Adding the absolute changes on all 28 rows gives 487.5 points. 305.9 / 487.5 is 62.7%.

| Task | TB 2.0 | TB 2.1 | Change |
| --- | --- | --- | --- |
| adaptive-rejection-sampler | 31.7% | 58.3% | +26.6 |
| build-pmars | 75.0% | 81.7% | +6.7 |
| build-pov-ray | 75.0% | 68.3% | −6.7 |
| caffe-cifar-10 | 5.0% | 69.2% | +64.2 |
| compile-compcert | 45.0% | 48.3% | +3.3 |
| configure-git-webserver | 46.7% | 50.0% | +3.3 |
| crack-7z-hash | 75.0% | 86.7% | +11.7 |
| extract-moves-from-video | 8.3% | 13.3% | +5.0 |
| filter-js-from-html | 0.0% | 6.7% | +6.7 |
| financial-document-processor | 61.7% | 56.7% | −5.0 |
| fix-git | 98.3% | 95.0% | −3.3 |
| gpt2-codegolf | 15.0% | 18.3% | +3.3 |
| hf-model-inference | 88.3% | 86.7% | −1.6 |
| install-windows-3.11 | 0.0% | 23.3% | +23.3 |
| make-doom-for-mips | 6.7% | 1.7% | −5.0 |
| mcmc-sampling-stan | 75.0% | 71.7% | −3.3 |
| mteb-leaderboard | 28.3% | 36.7% | +8.4 |
| mteb-retrieve | 15.0% | 41.7% | +26.7 |
| overfull-hbox | 53.3% | 36.7% | −16.6 |
| polyglot-c-py | 5.0% | 80.0% | +75.0 |
| polyglot-rust-c | 5.0% | 66.7% | +61.7 |
| protein-assembly | 20.0% | 15.0% | −5.0 |
| query-optimize | 50.0% | 43.3% | −6.7 |
| rstan-to-pystan | 58.3% | 58.3% | 0.0 |
| sam-cell-seg | 0.0% | 53.3% | +53.3 |
| torch-pipeline-parallelism | 8.3% | 10.0% | +1.7 |
| torch-tensor-parallelism | 15.0% | 66.7% | +51.7 |
| train-fasttext | 5.0% | 3.3% | −1.7 |

The signed changes sum to +377.7 points, or 13.5 points per repaired task. That is the mean on these 28 rows. It is the wrong number to paste next to a model's name. The other 61 tasks are outside the table. If they were unchanged, the same +377.7 points would be 4.2 points across all 89 tasks. The abstract's "over 10 percentage points" is larger than 4.2, so it is not this diluted average. The discussion's ceiling, 12 points on an individual agent, is a third quantity. The paper never prints the 19 accuracies that would let a reader see which agent moved by 12.

Claude Code with Claude Opus 4.6 is the one agent the text names for a rank change: it sits more than 7 points above the fitted line and climbs three places. Codex with GPT 5.4 sits below the line. The two weakest agents, both under 40% on version 2.0, lose accuracy on 2.1. The paper says that is what you would expect when 19 of the 28 repairs were hard tasks. It does not name those two agents.

## Did the ordering of agents survive?

Mostly. Spearman ρ = 0.958 between version 2.0 and Terminal-Bench 2.1 across 19 agents. The task-bootstrap 95% interval is 0.881 to 0.979. The fitted line in the text is TB2.1 = 2.1 + 1.04 × TB2.0. A correlation that high means the broad order is stable. A move of three ranks, which is the maximum the paper reports, is enough to change which of two close agents you would call the leader.

Table 6 is the configuration list, and it has 20 rows, not 19. Three use Claude Code (Opus 4.6, Sonnet 4.6, GLM 5.1). Four use Codex (GPT 5.3 Codex, GPT 5.4, GPT 5.4 mini, GPT 5.5). Two use Gemini CLI (Gemini Flash 3, Gemini Pro 3.1). Eleven use Terminus-2, including Gemma 4 31B and Kimi K2.6. Qwen 3.5 9B and Qwen 3.5 27B appear in the model table and in the budget curves, and they are not in Table 6. This page stops at that count. It does not guess which row was left out of the 19.

The auditor-agreement table is a different 89. Claude Code (Opus 4.6) and Codex (GPT 5.4) agree on the primary defect label, including "no defect," at κ = 0.80 on all 89 tasks. Cheaper judges agree less. Table 1 prints three pairs, each over the same 89 tasks:

| Judge A | Judge B | Agree | Disagree | κ |
| --- | --- | --- | --- | --- |
| gpt-4o-mini | gpt-4o | 69 | 20 | 0.550 |
| gpt-4o-mini | gemini-2.5-flash | 79 | 10 | 0.769 |
| gpt-4o | gemini-2.5-flash | 69 | 20 | 0.549 |

Against the final 2.1 release, the workflow's precision is 57.1% and its recall is 71.4%. The paper says those figures are retrospective, because the workflow helped build the repair set. They are a check on triage, not a claim that an unattended agent found every bug.

## How much of the harness gap is the clock?

At the default timeout, the harness is a large part of the score. The abstract says extending the time limit closes a gap of about 20 points on GPT 5.4 and shrinks a 30-point gap on GPT 5.4 mini to 5 points. Figure 6 prints eight accuracies for Codex and Terminus-2 on Terminal-Bench 2.1. One pairing reproduces those gaps exactly, within ordinary rounding:

| Model | Harness | 1× timeout | 32× timeout |
| --- | --- | --- | --- |
| GPT 5.4 | Codex | 74.2% | 74.9% |
| GPT 5.4 | Terminus-2 | 53.9% | 75.3% |
| GPT 5.4 mini | Codex | 67.0% | 68.2% |
| GPT 5.4 mini | Terminus-2 | 37.1% | 62.9% |

On GPT 5.4, 74.2 − 53.9 is 20.3 points at the default clock. At 32×, Terminus-2 is at 75.3 and Codex is at 74.9, so the gap has closed and the order has flipped by 0.4 points. On GPT 5.4 mini, 67.0 − 37.1 is 29.9 points, and 68.2 − 62.9 is 5.3 points. Codex barely moves when it is given more time. Terminus-2 uses the extra time. The paper's conclusion is that a fixed budget is an operating point, and that a harness comparison read only at that point can be a comparison of speed.

Figure 3b says something compatible about failures. More than half of failed trials at the default budget ended in a timeout. The range the text prints is 68% under Claude Code and 18% under Gemini CLI. The appendix adds that 11.8% of graded timeouts still pass, because a timed-out trial is scored on the files the agent left behind. About 27% of upstream trials were filtered out before that chart, as runner and provider failures rather than agent outcomes.

GLM 5.1 is the efficiency outlier the text names. On the budget sweep it solves 8 more tasks on version 2.1 than on 2.0 and overtakes GPT 5.4, whose coverage barely changes. The Qwen curves barely change at all. A longer clock and a repaired task set can reorder agents even when the default-time ranking looks stable.

Terminus-2 is the baseline [harness](/glossary/harness): a single-agent ReAct loop with a shell and file tools. The ReAct paper is the [reasoning-and-acting note](/research/react-reasoning-and-acting) on this site. Claude Code and Codex are the provider harnesses in the same figure. A sourced comparison of those shipping runtimes is [Best AI agent harness](/best/ai-agent-harnesses). A harness guide that starts from the product side, rather than from this benchmark, is [How to evaluate an AI agent harness](/blog/how-do-you-evaluate-an-ai-agent-harness). The November harness board on the live site is a different version, and the [November 2026 agent harness benchmark](/reports/agent-harness-benchmark-november-2026) reads that board.

## What was on GitHub the day this page was written?

The paper says Terminal-Bench 2.1 is at [harbor-framework/terminal-bench-2-1](https://github.com/harbor-framework/terminal-bench-2-1), and that the discussion of the revisions is [pull request 53](https://github.com/harbor-framework/terminal-bench-2/pull/53). Both were checked on November 8, 2026.

| Check | Result |
| --- | --- |
| Repository API, 13:48:44 GMT | 136 stars, 73 forks, 48 open issues, license Apache-2.0, default branch `main`, `pushed_at` 2026-11-05T20:22:18Z |
| `tasks/` listing, 13:42:29 GMT | 89 directories. All 28 Table 7 names were present |
| README on `main` | "26 tasks were modified." Community submissions to the 2.1 leaderboard are closed |
| Pull request 53 | Open. Created March 11, 2026. Updated May 28, 2026. Not merged. Opened by ekellbuch |

The README's 26 and the paper's 28 were both public on the same afternoon. The directory count confirms the benchmark is still 89 tasks. It does not say which two tasks the README left out, or whether the README is counting a narrower kind of edit.

The homepage check is the reason this page refuses to become a leaderboard. At 13:42:54 GMT, `https://www.tbench.ai/leaderboard/terminal-bench/2.1` returned a redirect to `/?version=2.1`. The HTML of that response still said Terminal-Bench 4.0 and did not include score rows. The README still links a 2.1 board and says only maintainer-run submissions are being added. Until that board is in the HTML, a percentage on a third-party "2.1 leaderboard" is someone else's run.

Two earlier notes on this site already use the words Terminal-Bench 2.1 for other experiments. [Evolver](/research/evolver-agent-exploration-evolving-capabilities) reports a diagnostic slice of 20 tasks per configuration. [You don't need long context](/research/you-dont-need-long-context) runs the 89 tasks inside mini-swe-agent and studies context, not grader repairs. A percentage from either note is not a cell in Table 7, and Table 7 is not a submission to Terminal-Bench 4.0.

The audit also left Terminal-Bench for a spot check. On 34 tasks drawn from an 80-task Harbor-Index snapshot, covering 29 source benchmarks, the workflow flagged 14 and manual review confirmed 12, which the paper calls 86% precision. Reviewers also found defects the workflow missed, and two bugs in shared grading code touched 13 tasks. The paper treats 2.1 as a checkpoint. The last sentence of the discussion says the pipeline can keep running, so version 2.1 is not a finished board.
