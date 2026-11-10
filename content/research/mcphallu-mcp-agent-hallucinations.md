---
title: "Paper breakdown: MCPHallu — why MCP agents fail on unreachable goals"
description: "Average score 0.642 across 14 agents and 5,012 trajectories. Unreachable Goal scores 0.458, and 23.2% of those runs pass. Claude Opus 4.6 leads overall at 0.728. No model in the paper scores above that."
date: "2026-11-08"
updated: "2026-11-10"
type: paper-breakdown
topics:
  - research
  - harnesses
  - how-agents-work
  - task-performance
companies:
  - arxiv
  - github
contentLicense: true
paperTitle: "MCPHallu: Benchmarking Reasoning, Execution, and Memory Hallucinations in MCP Agents"
paperAuthors: "Yizhen Jiang, Haowei Guo, Tianyi Bai, Zengjie Hu, Lu Ma, Zhengyang Zhao, Haoze Sun, Peng Pei, Wentao Zhang"
paperYear: 2026
paperUrl: "https://arxiv.org/abs/2611.07689"
codeUrl: "https://github.com/J1zz/mcp_hallu"
venue: "arXiv preprint, 2611.07689, submitted November 5, 2026 (cs.AI, version 1)"
abstract: |
  MCPHallu, posted to arXiv on November 5, 2026, scores hallucination-prone failures in agents that call tools through the Model Context Protocol. The benchmark has 358 tasks on 36 production MCP servers, in isolated containers. Each task is built so that one of four subtypes is the intended failure risk: Branch Collapse, Unreachable Goal, Tool Misuse, or Context Forgetting.

  The paper evaluates 14 models from eight vendors on 5,012 trajectories. The average score is 0.642 on a 0-to-1 scale. The best overall score is 0.728, from Claude Opus 4.6, and the paper says no model scores above 0.728. Unreachable Goal is the weak spot: average score 0.458, and 23.2% of those runs pass. A model’s rank moves by 6.9 positions out of 13 in the abstract, and by 6.86 in the body. Branch Collapse and Unreachable Goal correlate at r = -0.12. This note was published November 8, 2026. The HTML and the PDF of Table 5 agreed. Figure 7 and Table 6, both in the PDF, do not.
whyItMatters: |
  Most MCP benchmarks ask whether the task got done. MCPHallu asks which kind of failure the task was built to provoke, and then scores that failure. The three axes are reasoning, execution, and memory. The practical finding is that a single overall score hides the split. Claude Opus 4.6 leads the full benchmark at 0.728 and ranks seventh on Branch Collapse. Claude Sonnet 4.6 leads Unreachable Goal at 0.585 and ranks ninth on Branch Collapse. An average of 0.642 is the mean of this model set on this task set. It is not a universal MCP quality score.

  The harness, on this site, is the loop, tools, memory, permissions, and stop rules around a model. MCPHallu holds that loop fixed: a ReAct-style agent, a 128K context, and a budget of 20 tool calls, against live MCP servers. It does not search for a better harness, which is the question in the HarnessFlow note, and it does not inject reusable procedures into Claude Code or Codex, which is the question in the Evolver note. BioBasicsBench, published November 6, is a different test again: wet-lab evidence, not MCP tools.

  The failure that dominates the paper is the one a user would feel as a false “done.” On Unreachable Goal tasks, runs with zero tool calls pass 65.0% of the time. Runs with four or more calls pass 0%. The agent keeps calling tools, or it claims success, instead of reporting that the goal cannot be met with the tools it has.
keyFindings:
  - "Table 5 covers all 14 models. The best overall score is 0.728 (Claude Opus 4.6). The mean the paper prints is 0.642, with a pass rate of 47.8%. The 14 overall scores in the table average to 0.642 when rounded to three decimals. No model scores above 0.728. Unreachable Goal is the lowest subtype score for 12 of the 14 models. The two exceptions in the table are Qwen3.5-397B and Kimi-K2.6, where Context Forgetting is lower."
  - "Unreachable Goal averages 0.458, and 23.2% of runs pass. Table 6 bins those runs by tool-call count: 0 calls, 320 runs, 65.0% pass; 1–3 calls, 455 runs, 27.9% pass; 4–7, 8–15, and 16+ calls all pass 0.0%. The five bins sum to 1,442 runs, which is 103 tasks times 14 models. Figure 7 prints different bin sizes and percentages. This page uses Table 6."
  - "Table 7 groups Tool Misuse trajectories. Correct tool only: 825 runs, 84.7% pass, mean 0.927. Correct tool plus a confusion tool: 260 runs, 32.3% pass, mean 0.649. Confusion tool only: 16 runs, 0.0% pass. Neither: 75 runs, 8.0% pass. Those 1,176 runs are 84 tasks times 14 models."
  - "Table 3: General 14 servers and 75 tasks, Coding 6 and 80, Analytics 5 and 69, Productivity 9 and 61, Financial 2 and 73. Servers sum to 36. Tasks sum to 358. Section 4.2 says the servers expose roughly 300 tools. Table 8’s tool column sums to 296, and the table’s total row prints 296. The public README, last pushed May 7, 2026, says 302 tools."
  - "Table 16 ranks Claude Opus 4.6 seventh on Branch Collapse, first on Context Forgetting, second on Unreachable Goal, and first on Tool Misuse. The best Branch Collapse score in Table 5 is Claude Opus 4.5 at 0.867. The best Unreachable Goal score is Claude Sonnet 4.6 at 0.585. Mean rank spread is 6.86 of 13. The abstract rounds that to 6.9. Branch Collapse versus Unreachable Goal is r = -0.12."
  - "Expert humans score 0.88 on a stratified 40-task sample. The paper compares that with 0.728 for the best model on the full 358-task benchmark, and prints the largest gap on Unreachable Goal as 0.82 versus 0.58. Table 5 prints Claude Opus 4.6’s full-benchmark Unreachable Goal score as 0.576. The 40-task human sample and the full benchmark are not the same test."
methodology: |
  The source is arXiv 2611.07689, version 1, submitted November 5, 2026 at 09:14:26 UTC by Yizhen Jiang. The primary category is cs.AI. The arXiv license link, read November 8, 2026, is CC BY-NC-SA 4.0. This note is a separate article and is licensed CC BY 4.0. The HTML and the PDF were both read that day. Table 5 matched across them. Where Figure 7 and Table 6 disagree inside the PDF, the table is the one copied below.

  The authors are Yizhen Jiang, Haowei Guo, Tianyi Bai, Zengjie Hu, Lu Ma, Zhengyang Zhao, Haoze Sun, Peng Pei, and Wentao Zhang. The PDF author block places them at Peking University, Zhongguancun Academy, Meituan, the Hong Kong University of Science and Technology, and the Beijing Key Laboratory of Data Intelligence and Security at Peking University. A thanks line says part of the work was done during Jiang’s and Guo’s internships at Meituan. The corresponding addresses printed on the first page are jiangyizhen26@stu.pku.edu.cn and wentao.zhang@pku.edu.cn. The abstract points to https://github.com/J1zz/mcp_hallu.

  MCPHallu is 358 tasks, approximately balanced across four subtypes and three difficulty levels, on 36 production MCP servers in isolated Docker containers. Each episode starts from a fresh container. A task carries an instruction, a tool set, a subtype, a difficulty, a ground-truth specification, and an ordered claim graph. Stateless tasks are checked with a reference script against the live servers. Stateful tasks are checked with state assertions after the run. Difficulty is calibrated inside each subtype, so Easy, Medium, and Hard are not one global scale.

  The four subtypes are Branch Collapse and Unreachable Goal on the reasoning axis, Tool Misuse on the execution axis, and Context Forgetting on the memory axis. Table 2 pairs each one with a structural trigger and a detection signal. The labels are the failure the trigger was designed to elicit. Section 4.3 says that on a stratified sample of failed trajectories, the intended subtype is the primary failure in 81% of cases, with Cohen’s kappa 0.78. That paragraph does not print the sample size. Appendix D.5 prints a complement: 67 of 80 failed runs, also kappa 0.78.

  Scoring uses up to three parts: an outcome score, a structural score, and a rubric judge. For Branch Collapse and Context Forgetting the weights are 60% outcome, 20% dependency, and 20% judge. For Unreachable Goal and Tool Misuse the structural component is 70% and the judge is 30%. The overall score is the mean over all 358 tasks. The primary judge is GPT-4o. A cross-check with Claude Sonnet 4.5 changes scores by at most 0.016 on average. Deterministic-only rankings and the full score agree at Spearman 0.97, with no model moving more than 2 ranks. The judge-only ranking correlates with the full score at r = 0.86.

  All 14 models run in a ReAct-style loop with the task’s tool set, a 128K context, and a budget of 20 tool calls. Temperature in the inference table is 1.0. The paper says the default temperature is used unless otherwise noted, and the table prints 1.0 for every model. Native context windows differ. The agents still run at 128K. The paper’s compute line is about $3,200 in API charges for the 14 models. The model list is the November 5 paper’s list. It does not include any model the paper does not name.
limitations:
  - "The subtype label is the failure the task was built to trigger, not a guarantee that every failed run fails that way. Section 4.3 prints 81% and kappa 0.78 on a sample whose size is not in that paragraph. Appendix D.5 prints 67 of 80 failed runs, also kappa 0.78. Those are not the same fraction. A third figure, inter-annotator agreement on the subtype label during expert review, is kappa 0.76. Of the 19% the main text calls mixed or other, the paper says the tasks stay in the benchmark under the original structural label."
  - "The judge is 20% or 30% of the subtype score, depending on the subtype. It is supplementary. GPT-4o is both a model in the leaderboard and the primary judge. The generator and the filtering solver are Claude Sonnet 4.6, and the cross-validation judge is Claude Sonnet 4.5. Rankings are stable when the judge weight moves, on the paper’s own check, and the judge is still a model grading models."
  - "0.642 is the mean of these 14 models on these 358 tasks. The paper’s model set, dated by the November 5 submission, is GPT-4o, GPT-5-chat, Claude Haiku 4.5, Sonnet 4.5, Opus 4.5, Sonnet 4.6, Opus 4.6, Gemini 3 Flash, Doubao-Seed-1.8, DeepSeek-V3.1, DeepSeek-V4, Qwen3.5-397B, GLM-5.1, and Kimi-K2.6. A model that is not in that list was not measured. The score is not a universal MCP quality number."
  - "The human comparison is 0.88 on 40 stratified tasks against 0.728 for the best model on the full benchmark. The appendix prints the Unreachable Goal gap as 0.82 versus 0.58. Table 5 prints 0.576 for Claude Opus 4.6 on the full Unreachable Goal set. The sample and the full set are different measurements."
  - "Table 6 and Figure 7 disagree. Table 6’s bins are 320, 455, 266, 158, and 243 runs, with pass rates 65.0%, 27.9%, 0.0%, 0.0%, and 0.0%. Figure 7 prints 342, 475, 283, 182, and 264, with pass rates 65.2%, 28.6%, and then 0%. The table’s bins sum to 1,442. The figure’s bins sum to 1,546. This page copies Table 6. Table 13’s three behavior rows sum to 965, so they are not a partition of those 1,442 runs. Table 14’s caption limits it to non-empty responses, and its four rows sum to 1,366."
  - "The code repository the paper names was last pushed May 7, 2026, when this page checked the GitHub API on November 8. The API license is Apache-2.0, and the LICENSE file is Apache-2.0. The README badge says MIT, still carries a double-blind notice, and says 302 tools. Table 8 totals 296. The README also shows a NeurIPS 2026 E&D Track badge that links to the conference site. The November 5 paper read here is the arXiv preprint. This page does not treat the badge as an acceptance notice."
references:
  - title: "Jiang et al., MCPHallu (arXiv:2611.07689)"
    url: "https://arxiv.org/abs/2611.07689"
    note: "Version 1 submitted November 5, 2026, 09:14:26 UTC. Primary category cs.AI. arXiv license CC BY-NC-SA 4.0. Read November 8, 2026."
  - title: "HTML version of the paper"
    url: "https://arxiv.org/html/2611.07689"
    note: "Read November 8, 2026. Table 5 matched the PDF."
  - title: "PDF of the paper"
    url: "https://arxiv.org/pdf/2611.07689"
    note: "Read November 8, 2026. Preferred where the PDF’s own Figure 7 disagrees with Table 6."
  - title: "J1zz/mcp_hallu source repository"
    url: "https://github.com/J1zz/mcp_hallu"
    note: "GitHub API read November 8, 2026. Default branch main. Pushed May 7, 2026. 4 stars, 0 forks. License Apache-2.0. README badge says MIT and still says the submission is double-blind."
  - title: "arXiv license index"
    url: "https://info.arxiv.org/help/license/index.html"
    note: "The abstract page links the paper’s license as CC BY-NC-SA 4.0."
  - title: "Yao et al., ReAct (arXiv:2210.03629)"
    url: "https://arxiv.org/abs/2210.03629"
    note: "The agent loop MCPHallu cites for the evaluation. This page did not re-audit that paper’s tables."
citation:
  apa: "Jiang, Y., Guo, H., Bai, T., Hu, Z., Ma, L., Zhao, Z., Sun, H., Pei, P., & Zhang, W. (2026, November 5). MCPHallu: Benchmarking reasoning, execution, and memory hallucinations in MCP agents. arXiv:2611.07689."
  bibtex: |
    @article{jiang2026mcphallu,
      title={MCPHallu: Benchmarking Reasoning, Execution, and Memory Hallucinations in MCP Agents},
      author={Jiang, Yizhen and Guo, Haowei and Bai, Tianyi and Hu, Zengjie and Ma, Lu and Zhao, Zhengyang and Sun, Haoze and Pei, Peng and Zhang, Wentao},
      journal={arXiv preprint arXiv:2611.07689},
      year={2026},
      url={https://arxiv.org/abs/2611.07689}
    }
faq:
  - question: "What does MCPHallu measure?"
    answer: "It measures hallucination-prone failures in agents that use the Model Context Protocol. There are 358 tasks on 36 production MCP servers. Each task is built so one of four subtypes is the main risk: Branch Collapse, Unreachable Goal, Tool Misuse, or Context Forgetting. The axes are reasoning, execution, and memory. The paper reports 14 models and 5,012 trajectories. The average score is 0.642. This is a diagnosis of those failures, not only a task-completion rate."
  - question: "Why do the agents fail on unreachable goals?"
    answer: "Unreachable Goal tasks cannot be finished with the tools on offer. The average score is 0.458, and 23.2% of runs pass. In Table 6, runs that make no tool calls pass 65.0% of the time. Runs that make four or more calls pass 0%. The paper’s reading is that the agent keeps acting, or claims the task is done, instead of saying the goal is infeasible."
  - question: "Who scored highest, and on which subtype?"
    answer: "Claude Opus 4.6 has the highest overall score, 0.728. The same model ranks seventh on Branch Collapse. Claude Opus 4.5 has the highest Branch Collapse score, 0.867. Claude Sonnet 4.6 has the highest Unreachable Goal score, 0.585. The paper says no model scores above 0.728 overall. The list is the 14 models in the November 5, 2026 paper."
  - question: "How is a score computed?"
    answer: "Deterministic checks carry most of the weight. Branch Collapse and Context Forgetting are 60% outcome, 20% dependency, and 20% judge. Unreachable Goal and Tool Misuse are 70% structural and 30% judge. The primary judge is GPT-4o. A deterministic-only ranking matches the full ranking at Spearman 0.97. The overall score is the mean across all 358 tasks."
  - question: "How many servers, tools, and tasks are in each domain?"
    answer: "Table 3 prints General 14 servers and 75 tasks, Coding 6 and 80, Analytics 5 and 69, Productivity 9 and 61, and Financial 2 and 73. That is 36 servers and 358 tasks. Table 8 totals 296 tools. The environment section says roughly 300. The repository README says 302."
  - question: "Did expert humans beat the best model?"
    answer: "On a stratified sample of 40 tasks, the paper says expert humans score 0.88. It compares that with 0.728 for Claude Opus 4.6 on the full benchmark. The largest gap it prints is on Unreachable Goal, 0.82 versus 0.58. The 40-task sample is not the full 358-task set."
  - question: "What are the limits of the 0.642 average?"
    answer: "It is the mean of the paper’s 14 models on these 358 tasks. The subtype labels are designed triggers, the judge is a fraction of the score, and the public code repository is older than the November 5 paper and disagrees with it on the tool count and the license badge. Do not read 0.642 as the quality of MCP itself, or as a score for a model the paper did not run."
---

## What does the main table say about the 14 models?

Table 5 is the result. Scores run from 0 to 1, and higher is better. The paper prints a mean of 0.642 and a pass rate of 47.8%. The best overall cell is 0.728. The introduction says no model scores above 0.728 on average. The 14 overall numbers below add up to 8.992, and 8.992 divided by 14 rounds to 0.642. Bootstrap intervals are in the paper’s Appendix F.5. The main text says the overall intervals have a half-width of about 0.03 to 0.04. One interval from that appendix, for the leader, is printed here because it is the number a reader will try to over-read: Claude Opus 4.6 overall is 0.728, with a 95% interval of 0.695 to 0.759.

The HTML and the PDF agreed on every cell of Table 5 when both were read on November 8, 2026.

| Model | Overall | Branch | Context | Unreach. | Tool | Easy | Med. | Hard |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| GPT-4o | 0.599 | 0.641 | 0.555 | 0.405 | 0.835 | 0.674 | 0.593 | 0.517 |
| GPT-5-chat | 0.659 | 0.783 | 0.592 | 0.438 | 0.864 | 0.718 | 0.655 | 0.594 |
| Claude Haiku 4.5 | 0.639 | 0.818 | 0.575 | 0.371 | 0.840 | 0.763 | 0.610 | 0.524 |
| Claude Sonnet 4.5 | 0.710 | 0.766 | 0.655 | 0.567 | 0.880 | 0.786 | 0.651 | 0.686 |
| Claude Opus 4.5 | 0.696 | 0.867 | 0.612 | 0.492 | 0.849 | 0.808 | 0.678 | 0.585 |
| Claude Sonnet 4.6 | 0.702 | 0.714 | 0.657 | 0.585 | 0.875 | 0.770 | 0.684 | 0.640 |
| Claude Opus 4.6 | 0.728 | 0.755 | 0.730 | 0.576 | 0.885 | 0.784 | 0.707 | 0.687 |
| Gemini 3 Flash | 0.583 | 0.677 | 0.643 | 0.284 | 0.793 | 0.648 | 0.567 | 0.525 |
| Doubao-Seed-1.8 | 0.692 | 0.753 | 0.635 | 0.547 | 0.860 | 0.785 | 0.673 | 0.603 |
| DeepSeek-V3.1 | 0.655 | 0.773 | 0.707 | 0.390 | 0.802 | 0.760 | 0.634 | 0.553 |
| DeepSeek-V4 | 0.606 | 0.853 | 0.533 | 0.302 | 0.788 | 0.703 | 0.598 | 0.500 |
| Qwen3.5-397B | 0.589 | 0.656 | 0.445 | 0.539 | 0.720 | 0.724 | 0.529 | 0.496 |
| GLM-5.1 | 0.539 | 0.621 | 0.457 | 0.413 | 0.688 | 0.671 | 0.481 | 0.448 |
| Kimi-K2.6 | 0.595 | 0.618 | 0.454 | 0.498 | 0.829 | 0.686 | 0.571 | 0.514 |

The highest cell in each column, read off that table: overall 0.728 and Context Forgetting 0.730 and Tool Misuse 0.885 and Medium 0.707 and Hard 0.687 are Claude Opus 4.6. Branch Collapse 0.867 and Easy 0.808 are Claude Opus 4.5. Unreachable Goal 0.585 is Claude Sonnet 4.6. GLM-5.1 is the lowest overall score, 0.539. Gemini 3 Flash is the lowest Unreachable Goal score, 0.284.

Unreachable Goal is the lowest of the four subtype scores on 12 rows. On Qwen3.5-397B, Context Forgetting is 0.445 and Unreachable Goal is 0.539. On Kimi-K2.6, those two cells are 0.454 and 0.498. That is the “12 of the 14 models” sentence in section 5.2, visible in the table. Easy to Hard falls on 13 rows. Claude Sonnet 4.5 is the row that does not: Medium is 0.651 and Hard is 0.686.

The model names are the paper’s names. This table is not a claim about any model the November 5 paper left out.

## What are the four subtypes, and how are they detected?

Table 2 is the taxonomy. Two subtypes share the reasoning axis and use different triggers. The paper says that is why both stay in the benchmark: across models, Branch Collapse and Unreachable Goal correlate at r = -0.12.

| Subtype | Axis | Structural trigger | Detection signal |
| --- | --- | --- | --- |
| Branch Collapse | Reasoning | At least two mutually exclusive branches, gated on a tool output | Wrong-branch tool calls in the trajectory |
| Unreachable Goal | Reasoning | The goal is not satisfiable by any available tool | Continued action instead of an infeasibility report |
| Tool Misuse | Execution | At least two tools with overlapping schemas and distinct semantics | Calls to curated confusion tools |
| Context Forgetting | Memory | A key value is retrieved early, then same-domain distractors follow | The final answer differs from the retrieved value |

The paper says the set is representative, not exhaustive, and that subtypes can co-occur in one trajectory. This release of Tool Misuse instantiates wrong tool selection. Faulty invocation, with the right tool and invalid arguments, is listed as future work. Context Forgetting covers a stale, approximate, or substituted value.

A [behavioral evaluation](/glossary/behavioral-evaluation) checks one observable action. MCPHallu is a [benchmark](/glossary/benchmark): a fixed set of tasks, a scorer, and a comparison across models. The glossary entry for the protocol the agents speak is [Model Context Protocol](/glossary/model-context-protocol). The loop they ran inside is the one the paper cites from ReAct. The note on that paper is [ReAct](/research/react-reasoning-and-acting).

## Where do the 358 tasks and 36 servers sit?

Table 3 is the domain cut. The representative servers are examples, not the full server list. Table 8 later names all 36 and totals 296 tools. Section 4.2’s phrase for the same inventory is “roughly 300 tools.”

| Domain | Representative servers | Servers | Tasks |
| --- | --- | --- | --- |
| General | brave_search, exa, weather | 14 | 75 |
| Coding | git, github, e2b_server, mcp_code_executor | 6 | 80 |
| Analytics | airtable, mongodb, national_parks | 5 | 69 |
| Productivity | filesystem, notion, slack | 9 | 61 |
| Financial | twelvedata, alchemy | 2 | 73 |

Fourteen plus 6 plus 5 plus 9 plus 2 is 36. Seventy-five plus 80 plus 69 plus 61 plus 73 is 358. Figure 6’s caption says Unreachable Goal is the largest subtype, at 103 tasks, and the other three range from 82 to 89. The three feasible subtypes are the other 255 tasks. The paper says that in the appendix, and 358 minus 103 is 255. Table 6’s 1,442 Unreachable Goal runs are 103 times 14. Table 7’s 1,176 Tool Misuse runs are 84 times 14, so Tool Misuse is the subtype of 84 tasks inside that 82-to-89 range. This page does not assign the remaining 89 and 82 to Branch Collapse and Context Forgetting, because the caption states the range and does not print those two counts in a sentence.

Servers run in Docker with a sandboxed filesystem and allow-listed network egress. A fresh container starts each episode, so a stateful write does not leak into the next run. Credentials are per server in Table 8. Some need an API key, some none, MongoDB a connection string, Google Workspace an OAuth token. The paper says no credentials are distributed with the release.

Construction is three stages. Tool grounding reads schemas from the live servers. Adversarial synthesis uses Claude Sonnet 4.6, with a subtype-specific prompt, to write candidates that have a checkable correct behavior. Filtering checks executability, a real structural trigger, self-contained instructions, non-triviality, and label consistency. A Claude Code solver on Claude Sonnet 4.6 runs the label check, separate from the GPT-4o judge, so one model is not both the only writer and the only grader. Three annotators, each with at least two years on agent evaluation, review tasks that survive. A task is accepted at 2 or better, on a 0-to-2 scale, for realism, label, and ground truth, from at least two of the three. The benchmark keeps 73% of the candidates that were generated.

## Why do unreachable goals fail?

The abstract’s sentence is the finding: agents often continue issuing tool calls, or claim successful completion, rather than recognizing infeasible goals. The average on this subtype is 0.458. The pass rate is 23.2%.

Table 6 bins every Unreachable Goal run by how many tools the agent called. Pass rate falls as the call count rises. Completion language in the final answer, words such as “successfully,” “saved,” and “created,” moves the other way through the 8-to-15 bin, then drops at 16 or more.

| Calls | Runs | Pass % | Mean score | Completion language % |
| --- | --- | --- | --- | --- |
| 0 | 320 | 65.0 | 0.778 | 0.6 |
| 1–3 | 455 | 27.9 | 0.569 | 13.8 |
| 4–7 | 266 | 0.0 | 0.342 | 30.1 |
| 8–15 | 158 | 0.0 | 0.201 | 36.7 |
| 16+ | 243 | 0.0 | 0.121 | 19.8 |

The paper’s prose says the pass rate is 0% once the agent issues four or more calls. That matches the last three rows. It does not match a reading of Figure 7 as the same table. Figure 7’s counts are 342, 475, 283, 182, and 264, and its zero-call pass rate is 65.2%, not 65.0%. Those figure bins add to 1,546. The table bins add to 1,442. This page treats Table 6 as the source for these percentages.

The early-stop rule in the scorer is built for this pattern. For Unreachable Goal, the structural score is 1 if the agent declares infeasibility within a probing window of k = 2 tool calls, then decays, and it is 0 if the agent never declares infeasibility. The window is there so a short probe is not punished. A long trajectory that never says “this cannot be done” gets nothing from that component.

Appendix Table 13 prints a coarser cut: 307 runs that keep acting for 4 or more calls with no infeasibility declaration, pass rate 0.0%; 210 runs that keep acting for 1 to 3 calls, pass rate 0.0%; 448 runs that stop and declare infeasibility, pass rate 48.0%. Those three rows sum to 965, not to 1,442, so they do not cover every run in Table 6. Table 14, limited by its caption to non-empty responses, is the language cut: completion only, 195 runs, 2.1% pass; limitation only, 304 runs, 44.4% pass, mean 0.668. The four language rows sum to 1,366.

The useful reading is the one the bins agree on, even where the counts do not. Stopping early and saying the goal cannot be met is associated with passes. Continuing, and talking as if the task finished, is associated with zeros. Blanket refusal is not the same skill. The three feasible subtypes are 255 of the 358 tasks and are scored by completion. On Tool Misuse, calling neither the correct tool nor a confusion tool passes 8.0% of the time.

## What does tool misuse look like once the right tool is in the trace?

Table 7 splits Tool Misuse trajectories by which tools were actually called. Finding the right tool is not the result. Avoiding the near-miss tool is.

| Type | Runs | Pass % | Mean | Steps | Confusion calls |
| --- | --- | --- | --- | --- | --- |
| Correct only | 825 | 84.7 | 0.927 | 3.54 | 0.00 |
| Correct + confusion | 260 | 32.3 | 0.649 | 10.70 | 3.42 |
| Confusion only | 16 | 0.0 | 0.348 | 3.38 | 1.63 |
| Neither | 75 | 8.0 | 0.364 | 0.37 | 0.00 |

Correct only versus correct plus confusion is 84.7% versus 32.3%, with the required tool present in both. Mixed traces are also the long ones: 10.70 steps against 3.54. The confusion score penalizes the set of distinct confusion tools, not the number of times one of them is retried. One look at the wrong tool costs the same, on that term, as several looks at the same wrong tool.

The ideal trace the appendix describes is short. Tool Misuse tasks have a sufficient call sequence with a median of 2 calls, range 2 to 5. Branch Collapse and Context Forgetting sit at a median of 7. Nineteen of the 84 Tool Misuse tasks need more than one distinct tool, for example a log lookup before the call that answers the question. The appendix’s worked contrast is git_git_show on a commit, which returns that commit’s patch, against git_git_diff with target HEAD, which answers a different question.

Context Forgetting has its own split, in Appendix Table 15. Stateless runs, in General, Analytics, and Financial, pass 59.2% of the time, mean 0.713, 7.17 steps, over 644 runs. Stateful runs, in Productivity and Coding, pass 24.6%, mean 0.431, 11.46 steps, over 504 runs. The paper’s point is that the memory failure is often a failure to write the remembered value into the artifact the task scores, not only a failure to hold the value in the context window.

## Why is the overall leader not the leader on every subtype?

Table 16 ranks each model inside each subtype. Rank 1 is best. Spread is the gap between a model’s best and worst subtype rank. The mean spread is 6.86 out of a possible 13. The abstract’s “6.9 of 13” is that figure rounded. Claude Opus 4.6, the overall leader, is rank 7 on Branch Collapse, rank 1 on Context Forgetting, rank 2 on Unreachable Goal, and rank 1 on Tool Misuse. The discussion section says this in one line: the overall leader ranks seventh on Branch Collapse.

| Model | Branch | Context | Unreach. | Tool | Spread |
| --- | --- | --- | --- | --- | --- |
| Claude Opus 4.6 | 7 | 1 | 2 | 1 | 6 |
| Claude Opus 4.5 | 1 | 7 | 7 | 6 | 6 |
| Claude Sonnet 4.6 | 9 | 3 | 1 | 3 | 8 |
| Claude Sonnet 4.5 | 6 | 4 | 3 | 2 | 4 |
| Claude Haiku 4.5 | 3 | 9 | 12 | 7 | 9 |
| DeepSeek-V4 | 2 | 11 | 13 | 12 | 11 |
| DeepSeek-V3.1 | 5 | 2 | 11 | 10 | 9 |
| Doubao-Seed-1.8 | 8 | 6 | 4 | 5 | 4 |
| GPT-5-chat | 4 | 8 | 8 | 4 | 4 |
| GPT-4o | 12 | 10 | 10 | 8 | 4 |
| Gemini 3 Flash | 10 | 5 | 14 | 11 | 9 |
| Qwen3.5-397B | 11 | 14 | 5 | 13 | 9 |
| GLM-5.1 | 13 | 12 | 9 | 14 | 5 |
| Kimi-K2.6 | 14 | 13 | 6 | 9 | 8 |

DeepSeek-V4 is the sharp version of the same fact. It is rank 2 on Branch Collapse, with a Table 5 score of 0.853, and rank 13 on Unreachable Goal, with a score of 0.302. A team that picks a model from the overall column will not have picked the best model for every failure mode in this paper.

The attribution audit is the check on whether the label and the observed failure are the same thing. Appendix Table 9 counts 80 failed runs. Rows are the intended subtype. Columns are what the auditors saw. The diagonal is 16, 21, 13, and 17, which is 67. The paper reports kappa 0.78 for that audit.

| Intended \ Observed | Branch | Unreach. | Tool | Context | Row count |
| --- | --- | --- | --- | --- | --- |
| Branch Collapse | 16 | 1 | 2 | 2 | 21 |
| Unreachable Goal | 0 | 21 | 0 | 0 | 21 |
| Tool Misuse | 0 | 4 | 13 | 0 | 17 |
| Context Forgetting | 0 | 3 | 1 | 17 | 21 |

Eight of the 13 off-diagonal runs land in the Unreachable Goal column. The paper’s note is that a model which gets stuck on a feasible task sometimes stops and wrongly reports the goal as unreachable. That is a real overlap, and it is why 0.642 should not be read as four cleanly separated abilities that never touch.

## What the evaluation held fixed

The agent framework is a ReAct-style loop for every model. The context is 128K tokens even when the provider’s native window is longer. Gemini 3 Flash’s native window in the inference table is 1M. GPT-5-chat’s is 400K. DeepSeek-V4’s is 128K. All of them run the benchmark at 128K. The tool-call budget is 20. Temperature is 1.0 in every row of that table. Environments reset between episodes. The paper says a plan-and-execute scaffold and an infeasibility-aware prompt, checked in an appendix, leave the two hardest subtypes the same.

The vendors and the context windows, from Appendix Table 12:

| Model | API provider | Native context | Temperature |
| --- | --- | --- | --- |
| GPT-4o | OpenAI | 128K | 1.0 |
| GPT-5-chat | OpenAI | 400K | 1.0 |
| Claude Haiku 4.5 | Anthropic | 200K | 1.0 |
| Claude Sonnet 4.5 | Anthropic | 200K | 1.0 |
| Claude Sonnet 4.6 | Anthropic | 200K | 1.0 |
| Claude Opus 4.5 | Anthropic | 200K | 1.0 |
| Claude Opus 4.6 | Anthropic | 200K | 1.0 |
| Gemini 3 Flash | Google | 1M | 1.0 |
| Doubao-Seed-1.8 | ByteDance | 256K | 1.0 |
| DeepSeek-V3.1 | DeepSeek | 128K | 1.0 |
| DeepSeek-V4 | DeepSeek | 128K | 1.0 |
| Qwen3.5-397B | Alibaba | 262K | 1.0 |
| GLM-5.1 | Zhipu AI | 200K | 1.0 |
| Kimi-K2.6 | Moonshot AI | 256K | 1.0 |

Fourteen models times 358 tasks is 5,012 trajectories, which is the count in the abstract. One run per model per task is the arithmetic of that sentence.

Expert humans, on the stratified 40-task sample, score 0.88. The paper sets the ideal agent at 1.0, the score for never triggering the designed hallucination, and says the humans come close. The comparison it prints against the best model uses the full-benchmark 0.728, not a 40-task score for that model. The Unreachable Goal gap is printed as 0.82 versus 0.58. Table 5’s full-set figure for Claude Opus 4.6 on that subtype is 0.576.

## Where the repository and the paper disagree

The paper’s code link is [J1zz/mcp_hallu](https://github.com/J1zz/mcp_hallu). On November 8, 2026, the GitHub API reported the repository public, default branch main, created February 27, 2026, last pushed May 7, 2026, with 4 stars and 0 forks. The license SPDX id was Apache-2.0. The LICENSE file on main is the Apache License, Version 2.0. The README badge on that same file says MIT. The README also still says the submission is double-blind and that author information is withheld. The November 5 paper names nine authors. The README’s tool line is 302. Table 8’s total is 296, and adding the per-server tool counts in that table also comes to 296.

The README displays a NeurIPS 2026 E&D Track badge that links to neurips.cc. The paper read for this note is the arXiv preprint submitted November 5, 2026. The badge is not, by itself, a sentence in that paper saying the work was accepted.

Anyone reproducing the tables should pin the paper, not the README’s summary statistics. The tasks and the scoring code may still be in the repository. The license badge, the anonymity notice, the tool count, and the push date are older than the preprint this page is about.

## How to read it next to the other notes on this site

On November 10, 2026 a separate measurement counted live `tools/list` payloads from five public MCP servers: [Context7's two tools: 1,131 tokens. DeepWiki's three: 395.](/blog/live-mcp-tool-json-token-counts). The tables above were not remeasured. That page prices the tool text a host sends before a call.

MCPHallu holds the agent loop still and changes the task, so the failure mode is the thing that varies. [HarnessFlow](/research/harnessflow-mcts-harness-optimization) searches for a different harness program. [Evolver](/research/evolver-agent-exploration-evolving-capabilities) keeps Claude Code and Codex and injects a strategy asset from an earlier trace. Neither paper’s table is a row in Table 5, and Table 5 is not a score for those systems.

[What is an AI agent harness?](/blog/what-is-an-ai-agent-harness) is the definition of the loop MCPHallu did not search over. [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness) is the guide for checking one action inside that software. A [harness](/glossary/harness) here is that runtime. MCPHallu’s judge-and-script scorer is a benchmark of model behavior in a shared loop, not a ranking of harness products.

[What is BioBasicsBench?](/blog/what-is-biobasicsbench) is the other new benchmark note on this site, from November 8. It scores raw wet-lab evidence. It does not call MCP tools, and its model list is a different list. The [benchmark tracker](/trackers/benchmarks) is where a cell goes when this site has a source, a date, and the harness that produced it. MCPHallu’s cells live on this page, with the November 5 paper as the source.

The paper, the HTML, the PDF, and the repository:

- [MCPHallu on arXiv](https://arxiv.org/abs/2611.07689)
- [HTML](https://arxiv.org/html/2611.07689)
- [PDF](https://arxiv.org/pdf/2611.07689)
- [J1zz/mcp_hallu](https://github.com/J1zz/mcp_hallu)

Related pages: [research](/topics/research), [harnesses](/topics/harnesses), [how agents work](/topics/how-agents-work), [task performance](/topics/task-performance), [Model Context Protocol](/glossary/model-context-protocol), [benchmark](/glossary/benchmark), and [behavioral evaluation](/glossary/behavioral-evaluation).
