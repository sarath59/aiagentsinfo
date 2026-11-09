---
title: "Parallel agent teams beat the best of 100 solo agents on 10 of 12 tasks (2026)"
description: "November 6, 2026 arXiv paper, in the November 9 listing: with Qwen3.8-27B, ten teams of ten beat the expected best of 100 solo agents on 10 of 12 tasks."
date: "2026-11-09"
updated: "2026-11-09"
type: paper-breakdown
topics:
  - harnesses
  - how-agents-work
  - task-performance
  - research
companies:
  - arxiv
  - codex
  - openai
  - huggingface
paperTitle: "Test-Time Compute Scales Better with Parallel Agent Teams"
paperAuthors: "Junlin Wang, Haozhe Chen, Ang Li, Rahul Chalamala, Zhuang Liu"
paperYear: 2026
paperUrl: "https://arxiv.org/abs/2611.09798"
venue: "arXiv technical paper, 2611.09798, version 1 submitted November 6, 2026, listed November 9, 2026"
abstract: |
  Parallel agent teams are a way to spend extra inference compute on a frozen model. Wang et al. posted the paper to arXiv as version 1 on November 6, 2026, at 17:53:07 UTC. arXiv groups it with the new listings for Monday, November 9, 2026. There is no Saturday or Sunday listing between Friday, November 6 and that Monday batch.

  When a scorer can grade every attempt, two familiar options are many solo agents, keeping the best, or one large team that shares notes. Parallel agent teams take a third route: several small teams work at the same time, each team shares a forum, and the run keeps the best team's result. The model weights stay fixed. In the main experiment every agent runs in the Codex harness.

  With Qwen3.8-27B and a budget of 100 agents, ten teams of ten beat the expected best of 100 solo agents on 10 of 12 tasks. On the four tasks where the authors also ran one team of 100, ten teams of ten beat that single large team by 8% to 30%. At a matched dollar cost, teams of the 27B model beat five GPT-5.6 Sol agents on 4 of 8 tasks. This page was published November 9, 2026.
whyItMatters: |
  Harness engineering, on this site, is the work of designing the loop, tools, memory, permissions, and stop rules around a model. The glossary entry for a harness, and the harness guide, use that definition. Orchestration is the choice of the next step or the next agent. This paper holds the harness still and changes the orchestration: Codex stays the program each agent runs, and the new piece is a shared forum plus a decision about team size.

  That is a different change from HarnessFlow, the November 4 paper covered here on November 6. HarnessFlow searches for a new executable harness. Parallel agent teams do not rewrite harness code. They ask how to spend a budget of agents once the harness is already chosen. The November 9 note on Garry Tan's harness evals asks a related product question, which harness is cheaper per solved task when pass rates are close. This paper's question is how to arrange many copies of one harness. The two pages answer different questions.

  The practical claim is about test-time compute. Extra agents help, and the shape of the spend matters. One hundred solo agents flatten out. One team of one hundred can get worse as it grows. Ten teams of ten keep more of the gain. A manager who assigns the work, in the runs where the authors tried that, scores below a flat team.
keyFindings:
  - "Table of expected best scores, Qwen3.8-27B, team size 10: at 100 agents, ten teams beat 100 solo agents on 10 of 12 tasks. The two losses are Active Learning, 0.550 versus 0.560, and Kimi-Linear Decode, 2.16 versus 2.36. At 50 agents, five teams beat 50 solo agents on 11 of 12 tasks. The remaining loss is Kimi-Linear Decode, 2.04 versus 2.12. The paper says the average across 12 tasks is 10% higher at a budget of 10 agents and 27% higher at 100 agents."
  - "The largest named gap is Carleson Formalization, a 0–100 score: the expected best of 100 solo agents is 19.0, and the expected best of ten teams of ten is 54.8. At 50 agents the same task is 17.7 versus 45.8. At 10 agents, one team of ten scores 23.2 against an expected best of 12.2 for ten solo agents."
  - "On the four tasks with a single large team, the paper says ten teams of ten beat one team of 100 by 8% to 30%. Those four tasks, from the infrastructure appendix, are Dabic Gravity Inversion, Borden Source Inversion, Graph Node Classification, and KDA Chunk Forward. From 64 to 100 agents, the single team's score drops on all four. On two of them, one team of 100 scores below the expected best of 100 solo agents. The paper names one of those drops in the team-size appendix: on Dabic Gravity Inversion, one team of 100 falls to 27.5, against an expected best of 33.1 for 100 solo agents."
  - "At equal dollar cost, using GPU time for Qwen3.8-27B and token list prices for GPT-5.6 Sol, teams beat five GPT-5.6 Sol agents on 4 of 8 tasks that have at least five frontier runs. The four are Dabic Gravity Inversion, Graph Node Classification, Carleson Formalization, and Active Learning. On Carleson, eight Qwen teams reach 52.0 against 47.9 for five GPT-5.6 Sol agents. Pricing the 27B model by tokens instead of GPU time raises the paper's count to 6 of 8."
  - "Replacing the forum with a manager hurts. On Borden Source Inversion, Graph Node Classification, and KDA Chunk Forward, orchestrated teams stay below both flat teams and solo agents at every budget tested. On Borden, the best of ten orchestrated teams scores 68.4, below the average flat team of ten at 76.5. Dabic Gravity Inversion is left out of that figure because its evaluator often crashed."
  - "A longer solo session is a weak substitute for a second agent. On Graph Node Classification, the same Qwen runs move from a mean of 52.0 at hour 6 to 52.7 at hour 12. A team of two, read at hour 6, averages 57.4. The paper says those 6-hour readings come from agents that were still working toward a 12-hour plan."
methodology: |
  The source is arXiv 2611.09798, version 1, category cs.AI. The submission history records version 1 as Friday, November 6, 2026, at 17:53:07 UTC. The comment line says 29 pages, 18 figures, and 4 tables. The HTML copy states the license as CC BY 4.0. arXiv's recent listing for cs.AI, read November 9, 2026, places the paper in the Monday, November 9 batch. That batch is the first listing after Friday, November 6. There is no November 7 or November 8 listing. This page did not find a later version on November 9, 2026.

  The authors are Junlin Wang (Duke University and Modal Labs), Haozhe Chen (Princeton University), Ang Li (New York University and Modal Labs), Rahul Chalamala (Modal Labs), and Zhuang Liu (Princeton University). The source marks Junlin Wang and Haozhe Chen as equal contributors. The code line in the source points to https://github.com/modal-projects/parallel-agent-teams-scaling. On November 9, 2026 the GitHub API returned 404 for that repository.

  A sample is one agent, or one team, and its score is the best verified submission in that run. The number the tables report is the expected best of N independent samples: every subset of N runs from the pool, the best score inside each subset, then the average of those bests. With five scores 2, 4, 5, 7, and 9, the paper's own example is an expected best of 5.4 for one run, 7.1 for two, and 9 for all five. One pool therefore draws the whole curve from one sample up to the size of the pool.

  The main model is Qwen3.8-27B, the checkpoint at https://huggingface.co/Qwen/Qwen3.8-27B, which loaded on November 9, 2026. Each agent runs the Codex CLI in its own sandbox. A team shares a forum and nothing else: no roles, no manager, and no assigned work, except in the orchestrated comparison. A post can carry a title of up to 120 characters and a body of up to 64,000 characters. Agents may post and read. The reported arm does not remind them. The team's score is the best verified submission of any member.

  Each agent works for 12 hours, and for 6 hours on Browser Exploit. About 100 solo runs and 10 teams of ten were collected per task. Four tasks also have single teams of 16 to 100 agents, with one to five runs per size. The study covers more than 8,000 agent runs and about 95,000 agent-hours. Runs killed by infrastructure are dropped. A run with no valid submission scores zero. Runs that reached a known reward exploit on Kimi-Linear Decode and KDA Chunk Forward are excluded.

  The twelve tasks come from EdgeBench, MLS-Bench, ExploitBench, KernelBench, KernelBench-Verified, and a structural-design task. Five EdgeBench tasks and the structural task report higher-is-better scores on different scales. MoE Load Balance and Active Learning are rewards from 0 to 1, graded once at the deadline. Browser Exploit is a ladder from 0 to 16. The kernel tasks score the inverse of latency or a speedup. The GPT-5.6 Sol comparison cites OpenAI's GPT-5.6 system card at https://deploymentsafety.openai.com/gpt-5-6, which loaded on November 9, 2026.
limitations:
  - "The conclusion says the statistical model is only qualitative where many attempts fail or scores hit a ceiling. The predicted sign of the teams' gain at 100 agents is right on 9 of 12 tasks. On KDA Chunk Forward the paper says a normal fit misses most of a 40% gain because scores pile up under a ceiling."
  - "Team pools hold 10 to 11 runs per task. Teams larger than ten ran on four tasks, with one to five runs per size. In teams of 64 and 100 the forum index listed only the newest posts and the unread ones, while teams of up to ten saw the whole index."
  - "The paper uses one agent harness, Codex, and varies session length on one task, Graph Node Classification. The 6-hour numbers on that task are the same 12-hour runs read early. Agents told they had only 6 hours might pace themselves differently."
  - "Without an automatic scorer, keeping the best team is its own problem. The paper's setting is tasks where a verifier can score every attempt. The two MLS-Bench tasks grade the final file once, at the deadline, rather than during the run."
  - "The headline dollar comparison is 4 of 8 tasks, at the price of five GPT-5.6 Sol agents, with the 27B model priced by GPU time. At the price of one GPT-5.6 Sol agent, the appendix says the 27B model matches or beats it on MoE Load Balance and Active Learning and loses on four other named tasks. One GPT-5.6 Sol agent beats one Qwen team on Carleson Formalization."
  - "DeepSeek V4.1 Flash, on eight tasks, does not repeat the Qwen pattern. Teams lead throughout on Borden Source Inversion and KDA Chunk Forward. Carleson Formalization goes the other way by about one point. Three tasks are ties. On Browser Exploit, solo agents lead until both sides reach the ladder maximum of 16. The MoE Load Balance solo runs were cut to about 8 hours by a 60-turn cap, against 12 hours for the teams."
  - "The paper links a code repository. On November 9, 2026 the GitHub API returned 404 for https://github.com/modal-projects/parallel-agent-teams-scaling. The tables are the authors' report of their own runs."
references:
  - title: "Wang et al., Parallel agent teams (arXiv:2611.09798)"
    url: "https://arxiv.org/abs/2611.09798"
    note: "Version 1 submission history: Friday, November 6, 2026, 17:53:07 UTC. Primary category cs.AI. Placed in the Monday, November 9, 2026 cs.AI recent listing. Read November 9, 2026."
  - title: "HTML version of the paper"
    url: "https://arxiv.org/html/2611.09798"
    note: "The HTML header states License: CC BY 4.0."
  - title: "PDF of the paper"
    url: "https://arxiv.org/pdf/2611.09798"
  - title: "Code link named in the paper"
    url: "https://github.com/modal-projects/parallel-agent-teams-scaling"
    note: "GitHub API returned 404 on November 9, 2026. This page did not find a public repository at that address."
  - title: "Qwen3.8-27B on Hugging Face"
    url: "https://huggingface.co/Qwen/Qwen3.8-27B"
    note: "The model card page loaded on November 9, 2026. The paper cites this checkpoint as the main model."
  - title: "OpenAI, GPT-5.6 system card"
    url: "https://deploymentsafety.openai.com/gpt-5-6"
    note: "The page loaded on November 9, 2026, with the title GPT-5.6 System Card. The paper cites it for GPT-5.6 Sol. The scores below are the authors' runs, not a row copied from this card."
  - title: "OpenAI, Codex CLI"
    url: "https://github.com/openai/codex"
    note: "The paper runs each agent in the Codex harness. It does not name a Codex release pin."
citation:
  apa: "Wang, J., Chen, H., Li, A., Chalamala, R., & Liu, Z. (2026, November 6). Test-time compute scales better with parallel agent teams. arXiv:2611.09798."
  bibtex: |
    @article{wang2026parallelteams,
      title={Test-Time Compute Scales Better with Parallel Agent Teams},
      author={Wang, Junlin and Chen, Haozhe and Li, Ang and Chalamala, Rahul and Liu, Zhuang},
      journal={arXiv preprint arXiv:2611.09798},
      year={2026},
      url={https://arxiv.org/abs/2611.09798}
    }
faq:
  - question: "What is a parallel agent team?"
    answer: "It is several small groups of agents, run at the same time, on one task that a program can score. Inside a group, agents share a forum of notes and keep the best scored submission. Across groups, the run keeps the best group's result. The model weights stay frozen. In this paper each agent runs in the Codex harness, in its own sandbox, for 12 hours, or 6 hours on Browser Exploit."
  - question: "When was the paper released, and what is the headline result?"
    answer: "arXiv records version 1 as submitted November 6, 2026, at 17:53:07 UTC, and lists it among new cs.AI submissions for Monday, November 9, 2026. With Qwen3.8-27B and 100 agents, ten teams of ten beat the expected best of 100 solo agents on 10 of 12 tasks. The paper says that is 27% higher on average across the twelve tasks. This breakdown was published November 9, 2026."
  - question: "Do parallel teams beat running the same agents separately?"
    answer: "On the paper's expected-best scores, yes on most tasks and no on two. At 100 agents the losses are Active Learning, 0.550 for the teams against 0.560 for solo agents, and Kimi-Linear Decode, 2.16 against 2.36. At 50 agents the only loss is Kimi-Linear Decode. Carleson Formalization is the largest gap, 54.8 against 19.0 at 100 agents. A single team of ten beats the expected best of ten solo agents on 8 of 12 tasks, and loses on Borden Source Inversion, Ad Placement Optimization, MoE Load Balance, and Kimi-Linear Decode."
  - question: "Is one big team better than several small ones?"
    answer: "On the four tasks where the authors ran one team of 100, ten teams of ten scored 8% to 30% higher. Growing that single team from 64 to 100 agents lowered the score on all four. At a fixed budget of 100 agents, the best team size in the sweep sits between one agent and one team of 100. Ten teams of ten are the best size on three of those sweep tasks. On Graph Node Classification, two teams of 50 both scored 100.0."
  - question: "Do these teams beat GPT-5.6 Sol?"
    answer: "On half of the tasks where the comparison is reported, at one specific price, and with a specific way of counting cost. The 27B model is priced by GPU time, about $18.16 per 12-hour agent on the main engines and $21.79 on the kernel engines. GPT-5.6 Sol is priced from token list rates, $4 per million input tokens, $0.40 per million cached input tokens, and $20 per million output tokens. At the price of five GPT-5.6 Sol agents, Qwen teams win on 4 of 8 tasks: Dabic Gravity Inversion, Graph Node Classification, Carleson Formalization, and Active Learning. At the price of one GPT-5.6 Sol agent, one Qwen team loses on Carleson. Token pricing of the 27B model, which the paper treats as more favorable to Qwen, raises the count to 6 of 8."
  - question: "Does adding a manager help the team?"
    answer: "In this paper, no. Flat teams have no manager. The orchestrated variant puts one agent in charge of assigning work, and the workers do not read one another. Those orchestrated teams score below flat teams and below solo agents at every budget on Borden Source Inversion, Graph Node Classification, and KDA Chunk Forward. On Borden, the best of ten orchestrated teams is 68.4, and the average flat team of ten is 76.5."
  - question: "How does this compare with searching for a better harness?"
    answer: "HarnessFlow, arXiv 2611.06254, searches for a new harness program and grades the winner on held-out tasks. This paper keeps Codex as the harness and changes how many agents share a forum. Garry Tan's November 5 harness matrix, covered on this site on November 9, compares product harnesses on cost per solved task. None of those numbers is a row in this paper, and this paper's percentages are not a submission to a public product leaderboard."
  - question: "Is the code public?"
    answer: "The paper links https://github.com/modal-projects/parallel-agent-teams-scaling. On November 9, 2026 the GitHub API returned 404 for that address. The abstract page, the HTML version, and the PDF are public. The HTML copy states a CC BY 4.0 license."
  - question: "What are the limits of the result?"
    answer: "The gains need a scorer, the large-team evidence is four tasks, and each team-size pool is about ten runs. DeepSeek V4.1 Flash does not show the same pattern on every task. The dollar win over GPT-5.6 Sol is 4 of 8 tasks at the price of five frontier agents, on GPU pricing. The code link returned 404 on November 9, 2026. The authors name a missing verifier, one harness, and one session-length task as open limits."
---

## What is a parallel agent team?

A parallel agent team is a small group of agents that share notes, with several such groups running at once, and with the best scored result kept.

The paper studies tasks where a verifier can score an attempt, so the best of several attempts can be chosen without a person in the loop. A solo agent is one sample. Best-of-N keeps the best of many solo agents. One large team is a different sample: the members share a forum, and the sample's score is the best submission any member produced. Parallel agent teams apply best-of-N to the teams. Ten teams of ten, at a budget of 100 agents, are ten samples. One hundred solo agents are one hundred samples. One team of one hundred is one sample.

Each agent in the main experiment runs in the [Codex](https://github.com/openai/codex) harness, inside its own sandbox. The forum is the piece the authors add. It has three actions: post a note, list titles, and read one post. The agent's current best score is attached to its posts. The prompt tells the agent how many peers it has and says that posting and reading are optional. There is no manager in the main teams. The [harness](/glossary/harness) is the runtime around the model. The [orchestration](/glossary/orchestration) here is the choice to split a budget into teams of a given size and to let them share a forum. The model weights do not change.

The score in the tables is an expected best, not the single luckiest run. From a pool of finished runs, the authors take every way of choosing N of them, record the best score in each choice, and average those bests. Their small example is the pool 2, 4, 5, 7, 9. The expected best is 5.4 for one draw, 7.1 for two, and 9 if every run is kept. That is why one pool can draw a curve from one agent up to the whole pool.

## How do the scores compare at the same number of agents?

At 100 agents, ten teams of ten beat 100 solo agents on 10 of 12 tasks. At 50 agents, five teams beat 50 solo agents on 11 of 12.

The model is Qwen3.8-27B. Each agent has 12 hours, and 6 hours on Browser Exploit. Team size is 10 throughout the table. "Best of N" is the expected best of N solo agents. "Teams" is the expected best of that many teams. Bold in the paper marks the winner of each pair. The units are not the same from row to row. EdgeBench tasks and the numbers printed as 21.0 through 109.0 are the task's own points. MoE Load Balance and Active Learning are rewards from 0 to 1. Browser Exploit is a ladder from 0 to 16. KDA Chunk Forward and Kimi-Linear Decode are the inverse of latency. SwinMLP BF16 is a speedup. Multiscale Cantilever is a stiffness ratio. A higher number is better inside a row. A 54.8 on Carleson Formalization is not comparable with a 0.820 on MoE Load Balance.

| Task | Best of 10 | One team | Best of 50 | 5 teams | Best of 100 | 10 teams |
| --- | --- | --- | --- | --- | --- | --- |
| Dabic Gravity Inversion | 21.0 | 22.3 | 28.7 | 30.5 | 33.1 | 34.6 |
| Borden Source Inversion | 79.9 | 76.5 | 87.9 | 98.2 | 89.3 | 109.0 |
| Graph Node Classification | 69.1 | 79.0 | 76.8 | 90.0 | 81.5 | 95.1 |
| Ad Placement Optimization | 74.5 | 74.3 | 76.6 | 76.7 | 77.3 | 77.8 |
| Carleson Formalization | 12.2 | 23.2 | 17.7 | 45.8 | 19.0 | 54.8 |
| MoE Load Balance | 0.720 | 0.643 | 0.750 | 0.797 | 0.750 | 0.820 |
| Active Learning | 0.520 | 0.530 | 0.540 | 0.548 | 0.560 | 0.550 |
| Browser Exploit | 4.98 | 5.40 | 5.88 | 6.50 | 6.00 | 7.00 |
| KDA Chunk Forward | 11.21 | 13.12 | 11.77 | 15.25 | 11.83 | 16.54 |
| Kimi-Linear Decode | 1.77 | 1.33 | 2.12 | 2.04 | 2.36 | 2.16 |
| SwinMLP BF16 | 5.65 | 6.74 | 6.20 | 8.08 | 6.29 | 8.33 |
| Multiscale Cantilever | 11.06 | 11.60 | 11.44 | 11.69 | 11.50 | 11.70 |

The 100-agent losses are Active Learning and Kimi-Linear Decode. The 50-agent loss is Kimi-Linear Decode only. The paper's average statement is relative, not a raw average of these cells: parallel teams of ten score 10% higher than solo agents at a budget of 10 agents and 27% higher at 100 agents. The largest cell it names is Carleson Formalization, 19.0 for 100 solo agents and 54.8 for ten teams.

One team is a weaker claim than several teams. A single team of ten beats the expected best of ten solo agents on 8 of 12 tasks. It loses on Borden Source Inversion, Ad Placement Optimization, MoE Load Balance, and Kimi-Linear Decode. The paper's reading of those four is that one team varies from run to run, that Ad Placement Optimization is already close to its ceiling, and that Kimi-Linear Decode has little to share because most attempts score zero.

Solo agents also flatten. The paper says that at 20 agents, each task has already reached 60% to 94% of the gain that about 100 solo agents bring. From 10 to 20 agents, each extra agent adds 1.27% to the parallel-team curve and 0.64% to the solo curve. The introduction gives a related saturation figure for solo agents: 50 agents already reach 81% to 100% of the gain that 100 agents reach.

## Do several small teams beat one large team?

Yes, on all four tasks where the authors ran a team of 100. Ten teams of ten beat that one team by 8% to 30%.

The four tasks are Dabic Gravity Inversion, Borden Source Inversion, Graph Node Classification, and KDA Chunk Forward. The single large team rises at first and then falls. From 64 agents to 100, its score drops on all four. On two of the four, one team of 100 scores below the expected best of 100 solo agents. The appendix names one of those: on Dabic Gravity Inversion, one team of 100 falls to 27.5, while 100 solo agents have an expected best of 33.1.

Holding the budget at 100 agents and changing only the team size, the best size is in the middle. Ten teams of ten score highest on three tasks in that sweep. On Graph Node Classification, two teams of 50 both reached 100.0, the maximum. Twenty teams of five on that task score 77.6, which does not beat solo agents. On KDA Chunk Forward, twenty teams of five reach 13.9 and two teams of 50 reach 14.5, against 16.54 for ten teams of ten in the main table. The paper's statistical reading is that a team raises the average score, and several teams still collect the gain that comes from having more than one sample. One team, however large, is one sample.

At smaller budgets the preferred size is sometimes below ten. The appendix says teams of ten are the best size at 20, 30, and 50 agents on Graph Node Classification and Browser Exploit, while Borden Source Inversion, Carleson Formalization, and Active Learning prefer three to five throughout. Where the preferred size changes, it grows as the budget grows.

## Do the teams beat GPT-5.6 Sol at the same dollar cost?

At the price of five GPT-5.6 Sol agents, Qwen3.8-27B teams win on 4 of 8 tasks. At the price of one, they usually do not.

The eight tasks are the ones with at least five GPT-5.6 Sol runs. Kimi-Linear Decode and SwinMLP BF16 have one frontier run each and are left out of the count. Qwen is priced as a share of the H200 engines that served it: $4.54 per GPU-hour, a four-GPU engine serving twelve agents for 12 hours, which is $18.16 per agent-run, and kernel engines serving ten agents, which is $21.79. Every Qwen agent costs the same on that basis, whatever it did with the time. GPT-5.6 Sol is priced from recorded tokens at list rates of $4 per million input tokens, $0.40 per million cached input tokens, and $20 per million output tokens, plus $5 per million tokens written to cache. The CLI does not report cache writes, so the paper charges every uncached input token as a write and calls that an upper bound.

A Qwen team of ten costs about as much as one or two GPT-5.6 Sol agents. The wins at five times the price of one frontier agent are Dabic Gravity Inversion, Graph Node Classification, Carleson Formalization, and Active Learning. The printed comparisons are: on Dabic, four Qwen teams reach 29.0 against 19.7 for five GPT-5.6 Sol agents; on Graph Node Classification, three Qwen teams reach 86.9 against 84.6, while one GPT-5.6 Sol agent at 83.0 still beats anything Qwen buys for the price of that single agent; on Carleson, eight Qwen teams reach 52.0 against 47.9, and one GPT-5.6 Sol agent beats one Qwen team. GPT-5.6 Sol stays ahead on Borden Source Inversion and Ad Placement Optimization, where its mean is higher, and on KDA Chunk Forward, where its spread is wider. On MoE Load Balance it leads 0.78 to 0.77.

Pricing Qwen by tokens, at $0.25 per million input tokens, $0.025 cached, and $2.50 output, comes to $4 to $29 per agent-run. The paper says that basis favors Qwen and raises the matched-or-better count to 6 of 8, both at the price of one frontier agent and at the price of five. The headline "half the tasks" in the abstract is the GPU-time count, 4 of 8.

These are the authors' runs inside their sandboxes. They are not a row on a public GPT-5.6 Sol leaderboard. The [GPT-5.6 system card](https://deploymentsafety.openai.com/gpt-5-6) loaded on November 9, 2026. This page uses it as the document the paper cites, and it does not copy a score out of that card.

## Does a manager help, and does a longer solo session?

A manager made the tested teams worse. A longer solo session, on the one task measured, barely moved the score.

The orchestrated team replaces the forum with one agent that assigns work. Workers report back to that agent and do not read one another. On Borden Source Inversion, Graph Node Classification, and KDA Chunk Forward, those teams stay below flat teams and below solo agents at every budget in the figure. On Borden, the best of ten orchestrated teams scores 68.4. The average flat team of ten scores 76.5. The paper's reason is that workers wait on the manager and share findings only through it. An orchestrated team costs as much as a flat team and has a lower mean. Dabic Gravity Inversion is omitted because its evaluator often crashed.

On Graph Node Classification, the authors compare a longer session with a second agent. They did not launch a separate 6-hour experiment. They read 101 scheduled 12-hour runs at hour 6 and at hour 12. The mean moves from 52.0 to 52.7. A team of two, read at hour 6, averages 57.4, against 52.7 for a single agent at hour 12. The better of two independent 6-hour agents scores about 57.6, so at that size the paper says most of the gain is the second attempt. The agents being read at hour 6 still believed they had 12 hours. The paper says an agent told it had only 6 hours might pace itself differently.

## What happens with a second model?

DeepSeek V4.1 Flash does not copy the Qwen pattern on every task.

The repeat covers eight tasks, about 100 solo runs and ten teams of ten, 12 hours per agent and 6 hours on Browser Exploit. Teams beat solo agents at every budget on Borden Source Inversion and KDA Chunk Forward. On SwinMLP BF16 the lead shrinks from 11% at 10 agents to 2% at 100. On Carleson Formalization, solo agents lead by about one point at every budget. Graph Node Classification, MoE Load Balance, and Multiscale Cantilever are ties throughout. On Browser Exploit, solo agents lead until both sides reach the ladder maximum of 16.

Two caveats are in the appendix. The MoE Load Balance solo runs were cut short by a 60-turn cap in the harness and ran about 8 hours, against 12 hours for the teams. One KDA Chunk Forward team scored 31.8, far above every other run. The Qwen table is the paper's main result. The DeepSeek figure is the check on whether the same arrangement travels.

## What the experiment controlled

Names and numbers in this section are printed in the November 6 paper unless a link says otherwise.

The harness is Codex, unpinned as to release. The main model is Qwen3.8-27B, served with SGLang on the authors' H200 GPUs, about ten concurrent agents per four-GPU engine. Sandboxes are Modal. EdgeBench tasks have a judge sidecar. Kernel tasks hold a dedicated H100 for the whole run. Browser Exploit uses a privileged virtual machine. The two MLS-Bench tasks grade the sandbox at the end and do not offer a running judge. A crash or an invalid submission scores zero. Kernel runs that hit a known reward exploit on Kimi-Linear Decode and KDA Chunk Forward are excluded.

The forum is one service shared by every run. Its transport failure rate was 0.04% with 60 concurrent agents and 0.19% with 250. Teams of up to ten see the whole index of titles. Teams of 64 and 100 see the newest 100 titles and every unread post. The study's total is more than 8,000 agent runs and about 95,000 agent-hours. A run enters a pool if it finished or ran to its budget. Infrastructure failures are dropped.

The same prompts go to every model. A solo agent receives the task instruction and a time-budget line. A team member also receives a forum note. Nothing is pushed during the run. If a session ends early, the harness restarts it with a resume prompt. The time-budget line tells the agent to keep going for 12 hours, and the appendix sets Browser Exploit to 6 hours.

Checked November 9, 2026, the [Qwen3.8-27B model card](https://huggingface.co/Qwen/Qwen3.8-27B) loaded, and the [GPT-5.6 system card](https://deploymentsafety.openai.com/gpt-5-6) loaded. The code URL in the paper did not. The GitHub API returned 404 for `modal-projects/parallel-agent-teams-scaling`.

This arrangement is not a search over harness source. [HarnessFlow](/research/harnessflow-mcts-harness-optimization) edits the harness and grades a held-out split. [Evolver](/research/evolver-agent-exploration-evolving-capabilities) injects strategy notes into Claude Code or Codex from earlier traces of the same tasks. The forum here is closer to a shared log than to a stored skill. The [November 9 harness-eval note](/research/garry-tan-harness-evals-november-2026) compares named product harnesses on a fixed task list. Codex in that note is one product among several. Codex in this paper is the common runtime, and the thing that changes is how many copies share a forum.

## Limits that change how to read the scores

The conclusion lists the limits, and the appendices add more.

The method needs a score. Tasks a person still has to judge are outside the protocol. The two MLS-Bench tasks are scored once at the end, so a team cannot steer on a running number the way the EdgeBench tasks can.

The large-team claim is four tasks, with one to five runs at each large size, and the forum those large teams saw was truncated. The 8% to 30% range should be read with that sample. The main team pools are about ten runs. An expected best over ten teams is an average across a small pool, and one outlier can move it. The DeepSeek appendix flags one KDA team at 31.8.

The normal-distribution story fits Graph Node Classification and Browser Exploit and fails where scores pile up at zero or at a ceiling. The paper says the predicted sign is right on 9 of 12 tasks, and that on KDA Chunk Forward the fit misses most of the teams' 40% gain. The mechanism the authors want a reader to keep is the split between a higher mean and the gain from having many samples. The formula is not a forecast for every task.

The dollar comparison depends on the price basis and on the multiple. GPU-time pricing, at five frontier agents, is 4 of 8. One frontier agent still wins several of the printed one-agent comparisons, including Carleson. Token pricing of Qwen changes the count. A reader who quotes only "beats GPT-5.6 Sol" has dropped the denominator.

The second model does not reproduce the 10-of-12 result. DeepSeek ties or loses on several of the eight tasks, and one of those comparisons is shortened by a turn cap. Transfer across models is an open part of the paper, not a result the Qwen table settles.

The code link was not available on November 9, 2026. Until a repository is public, the tables stand as the authors' report.

## Read the paper

The November 6 paper, the model it runs, and the frontier card it cites:

- [Parallel agent teams on arXiv](https://arxiv.org/abs/2611.09798)
- [HTML](https://arxiv.org/html/2611.09798)
- [PDF](https://arxiv.org/pdf/2611.09798)
- [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)
- [GPT-5.6 system card](https://deploymentsafety.openai.com/gpt-5-6)
- [Codex](https://github.com/openai/codex)
- [Code link named in the paper](https://github.com/modal-projects/parallel-agent-teams-scaling)

Related pages on this site: [agent harnesses hub](/topics/harnesses), [how agents work](/topics/how-agents-work), [task performance](/topics/task-performance), [research](/topics/research), [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness), [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness), [How do AI agents work?](/blog/how-do-ai-agents-work), [harness](/glossary/harness), [harness engineering](/glossary/harness-engineering), [orchestration](/glossary/orchestration), [benchmark](/glossary/benchmark), [behavioral evaluation](/glossary/behavioral-evaluation), [Best AI agent harness](/best/ai-agent-harnesses), [HarnessFlow](/research/harnessflow-mcts-harness-optimization), [Evolver](/research/evolver-agent-exploration-evolving-capabilities), [Garry Tan harness evals](/research/garry-tan-harness-evals-november-2026), the [November harness benchmark](/reports/agent-harness-benchmark-november-2026), and [Codex](/directory/codex).
