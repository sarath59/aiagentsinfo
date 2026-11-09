---
title: "Garry Tan Harness Evals: $0.17 to $0.44 per Solved Task (Nov 2026)"
description: "Seven harness cells on November 5, 2026 scored 71.3% to 78.8% on 20 tasks, and all six preregistered pass-rate tests came back can't tell apart. OpenClaw on Opus 5.5 cost $0.4435 per solved task; Claude Code cost $0.2170."
date: "2026-11-09"
updated: "2026-11-09"
type: benchmark
topics:
  - research
  - harnesses
  - task-performance
companies:
  - github
  - anthropic
  - openai
  - claude
  - claude-code
  - codex
contentLicense: true
codeUrl: "https://github.com/garrytan/g-harness-evals"
venue: "Public repository garrytan/g-harness-evals, matrix run November 5, 2026, files read November 9, 2026 at commit 1c26ae4"
dataset:
  title: "Garry Tan harness matrix, 20 public tasks, November 5, 2026"
  description: "Seven harness-model cells from the matrix report in garrytan/g-harness-evals, commit 1c26ae409de0c90c32f5becd33a2aa7c311e7ef7, read November 9, 2026. Pass rate is the task mean the report prints, not passes divided by scored trials. Cost per solved task is the report's cost per pass. OpenClaw on GPT-6.1 Sol prints $0.2222 as the headline and a separate interval around $0.1964."
  isBasedOn: "https://github.com/garrytan/g-harness-evals/blob/1c26ae409de0c90c32f5becd33a2aa7c311e7ef7/docs/benchmarks/2026-11-04-matrix-mu/report.md"
abstract: |
  Garry Tan's public harness evals, in garrytan/g-harness-evals, hold the model fixed and swap the harness. The matrix report for 20 public v0.3 multi-user dev tasks says the run cannot tell any two harnesses apart on pass rate, on Opus 5.5 or on GPT-6.1 Sol. Seven cells ran on November 5, 2026, from 07:02Z to 12:06Z. The printed pass rates run from 71.3% to 78.8%. All six preregistered comparisons came back "can't tell apart," with Holm p = 1.

  What the same report says it can show is cost. OpenClaw on Opus 5.5 cost $0.4435 per solved task. Claude Code on the same model cost $0.2170. Hermes Agent was $0.2434 on Opus and $0.1869 on GPT-6.1 Sol. Codex was $0.1653 on Sol. QM, a Pi loop on Opus, was $0.1853, on a network the report says was not held fixed. The cells spent $99.0057. This note was published November 9, 2026, from the repository's main commit 1c26ae4.
whyItMatters: |
  A harness, on this site, is the loop, tools, memory, permissions, and stop rules around a model. The search "garry tan harness evals" is a request for a ranking of those loops. The repository's own answer is that this task set cannot rank them on pass rate. Fourteen of the twenty tasks scored the same in every cell. The minimum detectable difference was 7.7 to 14.2 points. The highest printed pass rate, Hermes Agent on Opus at 78.8%, and the lowest, Codex on GPT-6.1 Sol at 71.3%, sit on different models, and the report refuses to compare Claude Code with Codex because they cannot run the same model.

  The ranking the files do support is cost and time, with the caveats printed under the tables. On Opus, OpenClaw's ledger was $26.6127 against Claude Code's $13.2346. A second run, waterfall-frontier-2026-11, preregistered cost contrasts and again found OpenClaw more expensive per trial than Claude Code on Opus and more expensive than Codex on Sol. Hermes Agent shared the cheap group on the repository's rank rule, and on that second run its Opus cost per trial could not be told apart from Claude Code's.

  These numbers are not a Terminal-Bench score and not a SWE-bench score. They are dev results on public tasks, at pinned versions, and the report's verdict on the null pass-rate result is FIX-METHOD: the tasks saturated, so the ceiling has to rise before the matrix is used to pick a harness. Hermes Agent is one of the seven cells. A page that quotes 78.8% as a win over 71.3% is quoting past the test the authors ran.
keyFindings:
  - "The matrix report prints seven cells, 560 recorded trials, and 415 passes out of 554 scored trials. Pass rates, as task means, run from 71.3% (Codex, GPT-6.1 Sol, 57/80) to 78.8% (Hermes Agent, Opus 5.5, 63/80). All six preregistered pass-rate comparisons were 'can't tell apart,' Holm p = 1. The largest gaps the report names are OpenClaw plus 3.9 points over Codex, interval [+0.0, +11.8], and Hermes plus 3.8 over Codex, interval [+0.0, +10.0]."
  - "Cost per solved task in that report: QM $0.1853, Claude Code $0.2170, Hermes $0.2434, and OpenClaw $0.4435 on Opus 5.5; Codex $0.1653, Hermes $0.1869, and OpenClaw $0.2222 on GPT-6.1 Sol. OpenClaw's Sol interval is computed around $0.1964 because one timed-out charge of $1.4432 is outside the trial records. Cell spend sums to $99.0057. Dividing OpenClaw's Opus spend, $26.6127, by Claude Code's, $13.2346, gives 2.01."
  - "Fourteen of 20 tasks scored the same in every cell: 11 passed on every repetition in every cell, and 3 never passed in any cell. The report says the run had less than an 80% chance to detect a gap smaller than 7.7 to 14.2 points. The scoreboard calls the set saturated and says a gap under that range could hide."
  - "Pins in the matrix report: Claude Code 2.1.312, OpenClaw 2026.10.6, Hermes Agent v2026.9.24, QM main@b6786d67, Codex 0.165.0. Models: anthropic:claude-opus-5-5 and openai:gpt-6.1-sol. The run used one Ubicloud standard-16 VM per cell, trials one at a time, from 2026-11-05 07:02Z to 12:06Z. VM list price beside the cap was $6.3601, not inside the $99.0057."
  - "The scoreboard's second run, two tries per task, preregistered cost rather than pass rate. On Opus, Claude Code at $0.180 per trial was cheaper than OpenClaw at $0.345, could not be told apart from Hermes at $0.190, and cost more than QM at $0.138. On Sol, Codex at $0.117 per trial was cheaper than OpenClaw at $0.225 and Hermes at $0.141. Wall times in that run are confounded with the machine, because each cell had its own VM."
methodology: |
  The source is the public repository garrytan/g-harness-evals. On November 9, 2026, the GitHub API returned default branch main, commit 1c26ae409de0c90c32f5becd33a2aa7c311e7ef7, committer date 2026-11-09T02:05:42Z, and repository pushed_at 2026-11-09T03:31:42Z. The same response listed 11 stars, 2 forks, open_issues_count 4, the MIT license, creation at 2026-11-05T19:06:44Z, and the description "Open source harness evals: which agent harness does tasks the best, for the least cost?" open_issues_count counts pull requests as well as issues. The README and docs/scoreboard.md were fetched from main in that same request window. The matrix report was fetched from raw main immediately after. This note uses the matrix report's unrounded cost-per-pass figures. The README rounds those to $0.19, $0.22, $0.24, and $0.44 on Opus and $0.17, $0.19, and $0.22 on Sol.

  The matrix is 7 cells and 20 public v0.3 multi-user dev tasks, 4 repetitions each, 560 trials. Pass rate is the mean of each task's pass share, not the pooled count of passes over trials. Intervals are task-clustered 95% bootstrap intervals, 10,000 draws, seed 7. The six primary comparisons use a task-level sign-flip test with Holm adjustment across those six. "Can't tell apart" means that test did not find a difference. The report says it does not mean the harnesses are equal. Cost per solved task is the cell's ledger spend divided by scored passes. Spend includes excluded trials. The reported cap was $156.27, and the report says the cells spent $99.01 of it. The table total is $99.0057.

  Two OpenClaw cells are incomplete. On Opus, repetitions 3 and 4 of sy-03-marrow-fieldworks-ticket-numbers ended in a cap stop, so that cell is 60 passes of 78 scored trials. The report says 61 trials in the cell carry grade pass, and the excluded repetition 3 is one of them, because its termination was model_error. On Sol, all four repetitions of that task ended in a cap stop, so the cell is 56 of 76 and the task drops from three comparisons. QM ran on the default Docker bridge, so the report labels every QM comparison as network not held fixed and untested. QM's shipped housekeeping model, Haiku, made 180 calls costing $0.0141, inside QM's $10.7478. OpenClaw on Opus lists the same housekeeping model and made 0 calls.

  The waterfall run in the scoreboard is a separate cost run on the same task set, two tries per task. Its preregistered calls are cost contrasts. This note copies that table from the scoreboard and does not recompute the tests. The repository's disclosures, copied below, are part of the source. gstack and gbrain rows in the README are not in the seven-cell matrix. The matrix report says every cell was no-gstack and no-gbrain, and that 560 of 560 event logs had no gbrain event.
limitations:
  - "Can't tell apart is not a tie. The matrix report says the run had less than an 80% chance to detect a gap smaller than 7.7 to 14.2 points, and that 14 of 20 tasks scored the same in every cell. The verdict on the null result is FIX-METHOD. A later, harder task set could separate harnesses these 20 tasks cannot."
  - "Pass rate is a task mean. OpenClaw on Opus is 60 passes out of 78 scored trials, which is 76.9% if you divide the counts, and the report prints 76.3%. The 76.3% is the mean of per-task rates. One further trial had grade pass and was excluded because it ended in a cap stop."
  - "Claude Code ran only on Opus 5.5, and Codex ran only on GPT-6.1 Sol. The report says they are never compared with each other. Hermes at 78.8% and Codex at 71.3% are not a same-model ranking. The Sol gaps the report does print, 3.9 and 3.8 points, have intervals that touch zero."
  - "QM's $0.1853 is the lowest Opus point estimate, and the report says its comparisons were not tested because the network was not held fixed. The cost-run contrast with Claude Code has the same network caveat. QM also meters Haiku housekeeping inside its spend."
  - "OpenClaw on Sol has two cost figures. The headline cost per solved task is $0.2222. The interval sits around $0.1964 because a $1.4432 timed-out charge was logged after that trial's meter closed. The scoreboard's rank rule uses ranges, and this page does not treat $0.22 as a tested win over $0.19."
  - "The matrix cost gaps are descriptive. The tests of cost are the waterfall run's preregistered contrasts. That run gave each cell its own VM, so its wall times are confounded with the machine. On Sol, the scoreboard says the proxy billed every uncached prompt token at the cache-write rate, above OpenAI's input list price."
  - "The repository is run by Garry Tan. The README discloses that gstack and gbrain are his projects, that QM is a project of Y Combinator, which he runs, that Y Combinator is an investor in Hermes, and that OpenAI is now the key benefactor of OpenClaw. The seven matrix cells exclude gstack and gbrain. The disclosures still apply to who ran the eval."
  - "Pins are Claude Code 2.1.312, Codex 0.165.0, OpenClaw 2026.10.6, and Hermes Agent v2026.9.24. A later release is not measured. This note does not read the result as a leaderboard for the hosted products on November 9."
references:
  - title: "garrytan/g-harness-evals README"
    url: "https://github.com/garrytan/g-harness-evals/blob/1c26ae409de0c90c32f5becd33a2aa7c311e7ef7/README.md"
    note: "Read November 9, 2026, from main at commit 1c26ae4. Rank table, rounded costs, and disclosures."
  - title: "Scoreboard"
    url: "https://github.com/garrytan/g-harness-evals/blob/1c26ae409de0c90c32f5becd33a2aa7c311e7ef7/docs/scoreboard.md"
    note: "Read November 9, 2026. Matrix table and the waterfall-frontier-2026-11 cost run."
  - title: "Matrix report, matrix-mu-2026-11"
    url: "https://github.com/garrytan/g-harness-evals/blob/1c26ae409de0c90c32f5becd33a2aa7c311e7ef7/docs/benchmarks/2026-11-04-matrix-mu/report.md"
    note: "Read November 9, 2026. Source for the unrounded costs, the 560-trial accounting, the Holm results, and the cap stops."
  - title: "GitHub API, repository garrytan/g-harness-evals"
    url: "https://api.github.com/repos/garrytan/g-harness-evals"
    note: "Read November 9, 2026. 11 stars, 2 forks, open_issues_count 4, MIT, pushed_at 2026-11-09T03:31:42Z."
  - title: "GitHub API, commit 1c26ae409de0c90c32f5becd33a2aa7c311e7ef7"
    url: "https://github.com/garrytan/g-harness-evals/commit/1c26ae409de0c90c32f5becd33a2aa7c311e7ef7"
    note: "Committer date 2026-11-09T02:05:42Z. Message begins Public export."
citation:
  apa: "Tan, G. (2026). g-harness-evals: Open source harness evals. GitHub. https://github.com/garrytan/g-harness-evals (matrix report read November 9, 2026, commit 1c26ae4)."
  bibtex: |
    @misc{tan2026harnessEvals,
      title={g-harness-evals: Open source harness evals},
      author={Tan, Garry},
      year={2026},
      url={https://github.com/garrytan/g-harness-evals},
      note={Matrix report read November 9, 2026, commit 1c26ae409de0c90c32f5becd33a2aa7c311e7ef7}
    }
faq:
  - question: "What are the Garry Tan harness evals?"
    answer: "They are a public comparison in garrytan/g-harness-evals. The November 5, 2026 matrix held the tasks fixed, ran Opus 5.5 or GPT-6.1 Sol, and swapped only the harness. Seven cells ran 20 public dev tasks. The report says pass rates cannot be told apart, and it ranks the readable difference as cost and time."
  - question: "Did one harness win on pass rate?"
    answer: "No tested pair did. All six preregistered comparisons came back can't tell apart, with Holm p = 1. Printed task-mean pass rates run from 71.3% to 78.8%. Fourteen of 20 tasks scored the same in every cell, and the report says a gap under 7.7 to 14.2 points could hide. Can't tell apart is not a declaration that the harnesses are equal."
  - question: "Which harness was cheapest?"
    answer: "The lowest point estimate on Opus is QM at $0.1853 per solved task, and the report says that comparison was not tested because QM's network was not held fixed. Claude Code was $0.2170 and Hermes Agent $0.2434. OpenClaw on Opus was $0.4435. On GPT-6.1 Sol the point estimates are Codex $0.1653, Hermes $0.1869, and OpenClaw $0.2222. The Sol cost gaps in the matrix are descriptive. The second run's tested result is that Codex cost less per trial than Hermes and OpenClaw."
  - question: "Where did Hermes Agent place?"
    answer: "Hermes Agent v2026.9.24 scored 78.8% on Opus 5.5, 63 of 80, at $0.2434 per solved task and a median 64.6 seconds. On GPT-6.1 Sol it scored 75.0%, 60 of 80, at $0.1869 and 81.5 seconds. The README's overlapping-range rule puts it in rank 1 on cost on both models. On the second run, its Opus cost per trial could not be told apart from Claude Code's, and on Sol it cost more per trial than Codex."
  - question: "Why is OpenClaw about twice the Opus cost?"
    answer: "The matrix report prints $0.4435 per solved task for OpenClaw on Opus and $0.2170 for Claude Code. The ledgers are $26.6127 and $13.2346, and 26.6127 divided by 13.2346 is 2.01. The README says about 81% of OpenClaw's extra cost over Claude Code on Opus is cache writes, from a larger system prompt and larger tool results. That cost gap in the matrix is descriptive. The second run tested it and found OpenClaw more expensive per trial."
  - question: "Are these Terminal-Bench scores?"
    answer: "No. The task set is 20 public v0.3 multi-user dev tasks. The report's verdict is FIX-METHOD because the set is saturated. Terminal-Bench 2.1, HarnessFlow, and the November harness benchmark report on this site are different measurements. Do not paste 78.8% or $0.44 onto those boards."
---

Garry Tan's harness evals ask which agent harness to run once the model is held still. The [matrix report](https://github.com/garrytan/g-harness-evals/blob/1c26ae409de0c90c32f5becd33a2aa7c311e7ef7/docs/benchmarks/2026-11-04-matrix-mu/report.md) in [garrytan/g-harness-evals](https://github.com/garrytan/g-harness-evals) answers that, for 20 public tasks run on November 5, 2026, the pass rates cannot be told apart. The costs can. OpenClaw on Opus 5.5 cost $0.4435 per solved task. Claude Code, on the same model and the same tasks, cost $0.2170.

AI Agents Info read the README, the scoreboard, and that matrix report on November 9, 2026, at main commit `1c26ae4`. The GitHub API that morning listed 11 stars, 2 forks, and the MIT license. The numbers below are copied from those files. A pass rate in a different paper is not a row in these tables.

## What did the Garry Tan harness evals measure?

They measured pass rate, cost per solved task, and time, with the model and the 20 tasks held fixed, and only the harness swapped.

The matrix report says the run is 7 cells and 560 trials: 20 public v0.3 multi-user dev tasks, 4 repetitions each. It ran from 2026-11-05 07:02Z to 12:06Z, one Ubicloud standard-16 VM per cell, trials one at a time. Every cell was a plain harness. The report says no trial produced a gbrain event, in 560 of 560 event logs.

Four cells used Opus 5.5, which the report names as `anthropic:claude-opus-5-5`. Three used GPT-6.1 Sol, `openai:gpt-6.1-sol`. Claude Code and Codex are each model's own harness. The report says they cannot run the same model, so they are never compared with each other.

| Harness | Version | Model |
| --- | --- | --- |
| Claude Code | 2.1.312 | Opus 5.5 |
| OpenClaw | 2026.10.6 | Opus 5.5 |
| Hermes Agent | v2026.9.24 | Opus 5.5 |
| QM (Pi loop) | main@b6786d67 | Opus 5.5 |
| Codex | 0.165.0 | GPT-6.1 Sol |
| OpenClaw | 2026.10.6 | GPT-6.1 Sol |
| Hermes Agent | v2026.9.24 | GPT-6.1 Sol |

Pass rate in the report is a task mean. Each task contributes its own share of passing scored tries, and those shares are averaged. It is not the pooled fraction of passes over trials. The 95% ranges are task-clustered bootstrap intervals, 10,000 draws, seed 7, so a few lucky tasks do not narrow the range. Cost per solved task is the cell's whole spend at list price through the project's metering proxy, divided by scored passes. Spend includes trials the scorer then excluded. Time is the median wall-clock time of one trial.

The [harness](/glossary/harness), in the glossary on this site, is that bundle of loop, tools, memory, and permissions. The [benchmark](/glossary/benchmark) entry is the frozen task set plus the scoring rule. This matrix is one benchmark. It is not the only one, and the last section says what it is not.

## Can the pass rates tell the harnesses apart?

No. All six preregistered tests came back "can't tell apart," and the report prints Holm p = 1 for every one of them.

The report's own summary is the sentence to quote: on these 20 tasks, the run cannot tell any two harnesses apart on pass rate, on either model. The biggest gaps it names are on Sol, where the model is shared. OpenClaw is 3.9 points over Codex, interval [+0.0, +11.8]. Hermes is 3.8 points over Codex, interval [+0.0, +10.0]. Both intervals include zero. Each primary pair differed on 1 to 4 tasks.

The reason the tests cannot see a smaller gap is the task set. Eleven tasks passed on every repetition in every cell. Three tasks never passed in any cell. That is 14 of 20 tasks with the same score everywhere. The scoreboard calls the set saturated: half or more of the tasks scored the same in every cell, so the tasks, not the harness, decide most of the score. The minimum detectable difference was 7.7 to 14.2 points at alpha 0.05. The report says the run had less than an 80% chance to detect a gap under that range.

"Can't tell apart" is the glossary line in the scoreboard. It is the preregistered test, adjusted for the number of comparisons, finding no difference. The scoreboard says it does not mean equal. The report's verdict on why the result is null is FIX-METHOD. The tasks hit a ceiling. The report says to raise that ceiling before this matrix runs again.

QM is not one of the six tests. The report says QM ran on the default Docker bridge rather than the internal network, so its comparisons are labelled untested.

## What did each harness cost per solved task?

OpenClaw on Opus cost $0.4435 per solved task. The other Opus point estimates were $0.1853, $0.2170, and $0.2434. On Sol the three point estimates were $0.1653, $0.1869, and $0.2222.

The table copies the matrix report's per-cell results. Pass rate is the task mean, printed next to the raw passes so the two are not divided into each other. OpenClaw on Opus is the row where they disagree: 60 divided by 78 is 76.9%, and the task mean is 76.3%.

| Harness | Model | Passes / scored | Pass rate | Cost per solved task | Spend | Median time |
| --- | --- | --- | --- | --- | --- | --- |
| Claude Code | Opus 5.5 | 61 / 80 | 76.3% [57.5%, 92.5%] | $0.2170 [$0.1644, $0.3042] | $13.2346 | 40.1 s |
| OpenClaw | Opus 5.5 | 60 / 78 | 76.3% [58.8%, 91.3%] | $0.4435 [$0.3280, $0.6282] | $26.6127 | 99.4 s |
| Hermes Agent | Opus 5.5 | 63 / 80 | 78.8% [60.0%, 95.0%] | $0.2434 [$0.1764, $0.3576] | $15.3320 | 64.6 s |
| QM (Pi loop) | Opus 5.5 | 58 / 80 | 72.5% [53.8%, 88.8%] | $0.1853 [$0.1259, $0.2807] | $10.7478 | 40.1 s |
| Codex | GPT-6.1 Sol | 57 / 80 | 71.3% [51.2%, 90.0%] | $0.1653 [$0.1154, $0.2575] | $9.4236 | 30.1 s |
| OpenClaw | GPT-6.1 Sol | 56 / 76 | 73.7% [53.9%, 90.8%] | $0.2222 (interval basis $0.1964 [$0.1333, $0.2954]) | $12.4437 | 83.6 s |
| Hermes Agent | GPT-6.1 Sol | 60 / 80 | 75.0% [56.3%, 91.3%] | $0.1869 [$0.1350, $0.2760] | $11.2113 | 81.5 s |

The seven spend figures sum to $99.0057. The report's prose rounds that to $99.01 of a $156.27 cap. VM list price, from the same table, is $6.3601, and the report says that cost sits beside the cap rather than inside it. Passes sum to 415. Scored trials sum to 554. The 6 trials in the gap from 560 recorded to 554 scored are the cap stops below.

The README rounds cost per solved task to $0.19, $0.22, $0.24, and $0.44 on Opus, and to $0.17, $0.19, and $0.22 on Sol, and it ranks by whether those 95% ranges overlap. On that rule every row is rank 1, with a mark on OpenClaw's Opus row. OpenClaw's range, [$0.33, $0.63] in the README's rounding, overlaps Hermes's [$0.18, $0.36] and clears Claude Code's [$0.16, $0.30] and QM's [$0.13, $0.28]. The README says the cost differences are descriptive, with no test. The test is the second run, further down.

Two cells did not finish the plan. A cap stop, in the report, is the metering proxy refusing a request because the worst-case reservation would pass the shard's lease. The trial is recorded as `model_error` and is not retried.

| Cell | Trials cut off | Scored | What was refused |
| --- | --- | --- | --- |
| OpenClaw, Opus 5.5 | sy-03 r3 and r4 | 60 / 78 | Reservations of $3.50 and $3.37, each over a $29.76 lease, after $25.91 had already been committed |
| OpenClaw, GPT-6.1 Sol | sy-03, all 4 reps | 56 / 76 | Reservations of $1.44 to $1.69, each over a $13.88 lease, after $12.03 had been committed |

The task id in the report is `sy-03-marrow-fieldworks-ticket-numbers`. On Sol, that task drops out of the comparisons, so those pairs use 19 tasks. The report says OpenClaw on Opus averaged $0.333 per trial against a lease formula that assumed $0.270, and OpenClaw on Sol averaged $0.156 against $0.125. It also records two timed-out Sol requests charged at their full reservations, $2.8755 together. One of those, $1.4432 on `cn-01-tamsin-cold-chain-site` r4, was logged after the trial's meter closed. That is why the Sol cost interval is built around $0.1964 while the headline, which keeps the charge in the ledger, is $0.2222.

## Where does Hermes Agent land?

Hermes Agent has the highest printed pass rate on Opus, 78.8%, and the tests still cannot tell it apart from Claude Code or OpenClaw. On cost, the second run can tell it apart from Codex and cannot tell it apart from Claude Code.

The pin is Hermes Agent v2026.9.24. On Opus the cell is 63 passes out of 80, $0.2434 per solved task, $15.3320 spent, median 64.6 seconds. On Sol it is 60 of 80, $0.1869, $11.2113, median 81.5 seconds. The README's rank rule, overlapping cost ranges, puts both of those rows in rank 1 with the other cells.

The same README says Hermes sends more per request on Sol: 423 kB more tool schemas per trial than the comparison it is drawing, and 16.7 requests per trial against Codex's 11.6. It gives that as the reason Hermes costs $0.023 more per trial than Codex in the separate cost run, interval [−$0.030, −$0.016] on the Codex-minus-Hermes contrast. The scoreboard's waterfall table is the place those calls are marked as tested. On Opus, Hermes at $0.190 per trial "can't tell apart" from Claude Code at $0.180. On Sol, Hermes at $0.141 "costs more per trial than Codex" at $0.117.

The matrix report also notes a side channel that did not become a model call. Hermes probes the provider for its model list. The proxy refused 2,640 of those probes on Opus and 1,540 on Sol. The report says no model request from Hermes was refused, and the refusals cost nothing.

Hermes on this site is already a row in other people's experiments. The [HarnessFlow](/research/harnessflow-mcts-harness-optimization) note copies that paper's runs of Hermes v2026.9.7, an earlier pin, on different benchmarks. The [SpecCompact](/research/speccompact-agent-context-compaction) note is about compaction inside a Hermes-style summary. Neither table is this matrix. The repository discloses that Y Combinator, which Garry Tan runs, is an investor in Hermes.

## Why did OpenClaw cost about twice as much on Opus?

OpenClaw's Opus ledger was $26.6127 and Claude Code's was $13.2346. Dividing those two totals gives 2.01. The report's cost per solved task is $0.4435 against $0.2170, which is 2.04.

The README's account of where the money went: about 81% of OpenClaw's extra cost over Claude Code on Opus is cache writes, because OpenClaw re-sends a much bigger system prompt and bigger tool results. On Sol, the same paragraph says most of the gap to Codex is output tokens, 282,492 against 32,226, and that $0.036 per trial of the gap is one timed-out stream charged at its full reservation. Those token counts are the README's. This page did not re-sum the trial logs.

The matrix itself marks the Opus cost gap as descriptive. The waterfall run is the preregistered cost test. There, OpenClaw on Opus cost $0.345 per trial against Claude Code's $0.180, and the scoreboard's call is "costs more per trial than Claude Code." The README prints the paired contrast as $0.165 less per trial for Claude Code, interval [−$0.206, −$0.128]. The difference of the two printed per-trial averages is $0.165. Median time on the matrix was 99.4 seconds for OpenClaw on Opus and 40.1 seconds for Claude Code. On the waterfall run those medians were 90.3 and 34.1 seconds, and the scoreboard says wall time there is confounded with the machine.

OpenClaw's Sol headline, $0.2222, is not twice Codex's $0.1653. The ratio of those two point estimates is 1.34. The waterfall call on that pair is still "costs more per trial," $0.225 against $0.117, and the README calls the paired gap $0.107, interval [−$0.270, −$0.002], barely clear of zero.

The repository discloses that OpenAI is now the key benefactor of OpenClaw, and that OpenClaw's creator, Peter Steinberger, works for OpenAI. It also discloses that OpenAI began through YC Research. The cells are still the cells in the table.

## What did the second run say about cost?

It tested cost per trial. On Opus, OpenClaw cost more than Claude Code, Claude Code and Hermes could not be told apart, and Claude Code cost more than QM. On Sol, Codex cost less than OpenClaw and less than Hermes.

The scoreboard names the run waterfall-frontier-2026-11. Same 20 tasks, two tries each, the same pins. Each cell ran alone on its own VM. The calls below are the scoreboard's, and they are cost contrasts. They are not pass-rate tests. Three Opus cells each printed 80.0%, which is 32 of 40. That repeated 80% is the saturation story again, on a smaller sample.

| Harness | Model | Passes / scored | Pass rate | Cost per trial | Median time | The run's cost call |
| --- | --- | --- | --- | --- | --- | --- |
| Claude Code | Opus 5.5 | 32 / 40 | 80.0% [62.5%, 95.0%] | $0.180 | 34.1 s | Cheaper than OpenClaw; can't tell apart from Hermes; costs more than QM |
| OpenClaw | Opus 5.5 | 32 / 40 | 80.0% [65.0%, 92.5%] | $0.345 | 90.3 s | Costs more per trial than Claude Code |
| Hermes Agent | Opus 5.5 | 32 / 40 | 80.0% [62.5%, 95.0%] | $0.190 | 63.5 s | Can't tell apart from Claude Code |
| QM (Pi loop) | Opus 5.5 | 29 / 40 | 72.5% [52.5%, 90.0%] | $0.138 | 36.7 s | Cheaper per trial than Claude Code |
| Codex | GPT-6.1 Sol | 28 / 40 | 70.0% [50.0%, 90.0%] | $0.117 | 22.9 s | Cheaper per trial than OpenClaw and Hermes |
| OpenClaw | GPT-6.1 Sol | 31 / 40 | 77.5% [60.0%, 92.5%] | $0.225 | 76.6 s | Costs more per trial than Codex |
| Hermes Agent | GPT-6.1 Sol | 30 / 40 | 75.0% [57.5%, 92.5%] | $0.141 | 66.3 s | Costs more per trial than Codex |

QM's "cheaper" call carries the network caveat. The scoreboard says QM ran on the default Docker bridge while the other cells ran on the internal network. The README's paired figure for the Claude Code side of that contrast is $0.041 more per trial than QM, interval [+$0.020, +$0.061]. The difference of the printed averages is $0.042. This page quotes the interval from the README and the averages from the scoreboard, and does not treat $0.041 and $0.042 as two measurements.

Two further caveats are on the scoreboard and not in the matrix table. On Sol, the proxy billed every uncached prompt token at the cache-write rate, above OpenAI's input list price, because OpenAI caches prompts on its own. And OpenClaw on Sol in this run includes one stream that timed out before its final usage, charged at the full reservation.

## What should a ranking use, and what should it leave alone?

Use the tested cost calls, and leave the pass rates unranked.

The sentence the files support: on this public 20-task set, pass rate did not separate the harnesses, and a second run found OpenClaw more expensive per trial than Claude Code on Opus 5.5 and more expensive than Codex on GPT-6.1 Sol. Hermes Agent's Opus cost per trial could not be separated from Claude Code's. Codex was cheaper per trial than Hermes on Sol. QM's lower Opus point estimate was not tested on a shared network.

The sentence the files do not support: Hermes won, or Claude Code beat OpenClaw at the task, or 78.8% is better than 71.3% in a way the experiment could see. The intervals on the pass rates are 32 to 39 points wide. The report says so.

A reader who wants a harness for a reason other than this task set has other pages, and they answer different questions. [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness) is the method: one visible action, then the whole job. [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness) is the definition. [Best AI agent harness](/best/ai-agent-harnesses) is licence, list price, and platform from official pages, last verified November 2026. It does not use these pass rates. The [November harness benchmark report](/reports/agent-harness-benchmark-november-2026) copies official SWE-bench and Terminal-Bench numbers. [Terminal-Bench 2.1](/research/terminal-bench-2-1-benchmark-repairs) is a repair of 28 of 89 tasks in a different suite. [HarnessFlow](/research/harnessflow-mcts-harness-optimization) searches for a harness and scores it against pinned Claude Code, Codex, OpenHands, and Hermes on that paper's benchmarks.

Claude Code's permission file is a different November 9 page. [Don't ask again](/blog/claude-code-dont-ask-again) is about what a saved approval writes to disk. It is not a row in this matrix. The product pages are [Claude Code](/directory/claude-code) and [Codex](/directory/codex).

The disclosures in the README, which this note is not in a position to audit, are these. Garry Tan runs the repository and the evaluation. gstack and gbrain are his projects, and they are not in the seven cells. QM is a project of Y Combinator, which he runs. Y Combinator is an investor in Hermes. OpenAI began through YC Research. OpenAI is now the key benefactor of OpenClaw, and OpenClaw's creator works for OpenAI. The report says the receipts are in the tree so the trials can be regraded. This note did not regrade them. It copied the tables the repository had already published.
