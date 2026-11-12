---
title: "ReTrace: 93.8% completion, 24% lower cost"
description: "ReTrace, arXiv November 10, 2026: on 79 production procedures, planner-free workflows reach 93.8% completion versus the agent's 96.8%, at $0.096 per task instead of $0.127."
date: "2026-11-12"
updated: "2026-11-12"
absoluteTitle: true
ledeQuestion: "What completion did ReTrace report on production procedures?"
ledeAnswer: "93.8% on 79 procedures, against 96.8% for the agent that still plans each step, at $0.096 per task instead of $0.127."
dataset:
  title: "ReTrace completion, success, and cost, November 2026"
  description: "Hou, Kuo, Bhattacharya, and coauthors, arXiv:2611.14492. On 79 production procedures ReTrace completion is 93.8% and cost is $0.096 per task. On τ²-bench telecom in solo mode, task success is 75.8% in 1.3 seconds."
  isBasedOn: "https://arxiv.org/abs/2611.14492"
type: paper-breakdown
topics:
  - harnesses
  - how-agents-work
  - task-performance
  - research
companies:
  - arxiv
  - amazon
  - anthropic
paperTitle: "ReTrace: Distilling Tool-Using Agents into Planner-Free Workflows"
paperAuthors: "Kaiyuan Hou, Yang Ping Kuo, Indranil Bhattacharya, Rohith Nama, Arushi Gupta, Carlos D. Castillo, Prathap Ramachandra, Xiaofan Jiang, Francesco Carbone"
paperYear: 2026
paperUrl: "https://arxiv.org/abs/2611.14492"
venue: "arXiv technical paper, 2611.14492, version 1 submitted November 10, 2026"
abstract: |
  A repeated procedure does not need a model to choose the next step on every run. ReTrace, posted to arXiv on November 10, 2026, reads a standard operating procedure and a few logged agent runs, writes the condition behind each step, and compiles that into a workflow. At run time, code selects the step. A tool may still call a model, for example to classify a document. The planner does not.

  The authors are at Amazon and Columbia University. The production set is 79 procedures from an enterprise platform they do not name. ReTrace completion on that set is 93.8%, against 96.8% for the agent that produced the traces. Mean cost per task falls from $0.127 to $0.096, which the paper calls 24% lower. Median time falls from 68 seconds to 37 seconds. Mean time rises, from 153 seconds to 163 seconds, because web-tool calls that succeed are slow.

  On the telecom slice of τ²-bench, in solo mode, the same idea scores 75.8% in 1.3 seconds. The agent scores 80.6% in 170 seconds. The paper says those τ² numbers are not comparable to published leaderboard results, because solo mode removes the simulated user. Three rounds of repair on training failures lift a separate k=2 workflow from 66.7% to 81.2%. The confidence interval is too wide to claim a tie with the agent.
whyItMatters: |
  The harness decides who picks the next action. In a planning agent, that choice is a model call on every step, on every run. ReTrace moves the choice into code, once, and leaves the model inside tools that actually need one. That is a harness change and an orchestration change. It is the opposite of keeping a written memory that a model still has to read before it acts.

  On the authors' platform, between April 1 and July 1, 2026, customers created 5,115 automations. The appendix counts 4,694 of them as agents that plan at run time and 421 as fixed workflows. The introduction calls the agent share 91.8%. Seven of the ten most frequently executed automations were fixed workflows, and each of those seven ran between 297,000 and 528,000 times in that window. For agents that use three to five tools, choosing the next step took 37% to 43% of execution time, on top of the token cost. The volume already sits on the workflows. The new automations still default to a planner.

  The comparison that matters for a buyer is inside this paper: the same procedures, the same tools, a planner against a compiled rule list. It is not a row on the public τ²-bench board. For a search over the whole harness program, see the HarnessFlow note. For a method that keeps the agent and reuses a trace inside the loop, see the Evolver note. For how to read a harness score when the protocol changes, see the evaluation guide.
keyFindings:
  - "Internal, 79 production procedures, k=3 traces, Table 2: ReTrace completion 93.8% [88.4, 98.2], the original agent 96.8% [93.5, 99.0], few-shot 88.6% [81.1, 95.3], zero-shot 82.7% [73.9, 90.7]. The paired gap versus the agent is −3.0 points [−8.0, 1.0]. Mean cost per task is $0.096 for ReTrace and $0.127 for the agent. The paper calls that 24% lower and says the figure counts model calls made inside tools. Few-shot costs $0.033 and is 5.2 points lower on completion."
  - "The same table, time as mean / median seconds: ReTrace 163 / 37, the agent 153 / 68, few-shot 105 / 42, zero-shot 134 / 42. Median time falls from 68 seconds to 37 seconds, which the paper calls 46%. Mean time rises. Twenty of the 79 procedures use web automation. Without them, ReTrace averages 58 seconds against the agent's 92 seconds, at 19% of the agent's cost. Web-tool calls succeed 86.6% of the time for ReTrace and 27.3% for the agent. A successful web call takes a median of 270 seconds."
  - "τ²-bench, telecom only, solo mode, k=4, 40 test inputs, Table 1: ReTrace 75.8% [66.1, 85.5] in 1.3 seconds, build rate 100%, 11 construction calls and 0 execution calls. The original agent is 80.6% [52.1, 100.0] in 170 seconds, with 12.1 planning calls per run. The paper calls the workflow 130× faster. AWM scores 82.3% [68.0, 100.0] in 89.8 seconds, with 26.2 model calls at execution. The text rounds AWM's time to 90 seconds."
  - "The paired gain of unrepaired ReTrace over zero-shot on τ²-bench is 37.1 points [19.8, 51.1]. The paper says the margins over few-shot (5.3 points) and execution-only (7.9 points) are not significant. Printed means are few-shot 70.6% [52.1, 88.9] and execution-only 67.9% [53.3, 82.6]. Repair from k=2 workflows, three rounds, lifts test success from 66.7% to 81.2% [74.4, 88.1]. The paper says the interval is too wide to claim parity with the agent's 80.6%."
  - "SOP-Bench, 8 of 14 domains, k=16, 744 test inputs, stricter than the benchmark's own substring match: unrepaired ReTrace 80.6% [78.1, 83.1] in 0.29 seconds. Few-shot is 83.6% [81.2, 86.2]. The agent is 85.5% [83.0, 88.0] in 46.6 seconds, three runs per input, 11.0 model calls. AWM is 84.5% in 25.8 seconds. Repair, which shows each failed training input's label, lifts ReTrace to 87.8% [86.2, 89.4] at 0.40 seconds. The paper says that comparison is not like-for-like."
  - "Removing the agent's reasoning from the traces, and keeping the rest of the pipeline, costs 6.2 points of τ²-bench success at k=4 [0.5, 12.5] and 8.8 points of enterprise completion [2.5, 15.9], from 85.0% to 93.8% over 77 procedures. On SOP-Bench the version without reasoning scores 82.3% against 80.6%. Unwitnessed branches that cite reasoning fall from 44 to 3 at k=4 when the reasoning is removed."
  - "On τ²-bench, swapping the model that writes the workflow from Sonnet 4.6 to Haiku lowers success by 36.5 points. Swapping it to Opus 4.8 lowers success by 11.8 points. The same swaps in the extraction stage lower success by 10.6 and 1.5 points. The paper says the synthesis model matters more, and that a larger model did not help. Giving the generator more full traces eventually hurts: the τ²-bench build rate falls from 100% at k=16 to 31% at k=32, and nine full traces on the enterprise set lower completion to 81.4%, below zero-shot's 82.7%."
methodology: |
  The source is arXiv 2611.14492, version 1, primary subject cs.AI. The abstract page lists version 1 as submitted Tuesday, November 10, 2026, at 18:49:47 UTC. This page did not find a later version on November 12, 2026. The comment field on the abstract page was empty.

  The HTML author block lists Kaiyuan Hou at Columbia University, with an Amazon internship and equal contribution, and Yang Ping Kuo at Amazon as corresponding author, also equal contribution. Indranil Bhattacharya, Rohith Nama, and Arushi Gupta are marked equal contribution and affiliated with Amazon. Carlos D. Castillo, Prathap Ramachandra, and Francesco Carbone are affiliated with Amazon. Xiaofan Jiang is affiliated with Columbia University.

  A trace step stores the agent's reasoning, the tool, the tool inputs, and the tool result. ReTrace extracts a condition, a tool, and the sources of the inputs, merges those rules across traces, and cites the trace step or the SOP line behind each rule. Alternatives that no trace executed are marked unwitnessed. A model then writes code, on the public benchmarks, or a typed workflow graph, on the enterprise platform. Before deployment the candidate must load and must not make a planning call. On the public benchmarks the authors keep the candidate that reproduces the most recorded training steps. That check does not establish that the condition is correct.

  τ²-bench uses only the telecom domain, official split 74 training and 40 test inputs, three task families, solo mode. Traces are eight runs of Claude Sonnet 4.6 with native thinking on each training input. Construction uses successful traces and Sonnet 4.6 in extraction, aggregation, and synthesis. k=4 is chosen by five-fold cross-validation. Test inputs are never used for traces, configuration, or candidate checks. SOP-Bench uses 8 of 14 domains, a frozen 50/50 split of 758 training and 744 test inputs, and eight runs of Sonnet 4.6 as a two-pass ReAct agent on each training input, 6,064 traces. k=16. The enterprise set uses k=3, not tuned. Those traces come from the platform's two-pass ReAct agent on Claude Sonnet 4.0. Extraction and aggregation use Claude Opus 4.8. The platform writes the final graph with a model the authors say they do not control.
limitations:
  - "The paper says the agent's reasoning may be wrong, or may not be the reason the agent acted. The construction checks confirm that code loads and contains no planning calls. They do not show that a recovered condition is true."
  - "The evaluation is new inputs of the same procedures. It is not transfer to a new procedure. A change to the SOP or the tools can require a rebuild. Traces are drawn at random. On one SOP-Bench procedure, results vary by as much as 50 points across trace samples."
  - "Enterprise completion is the platform's flag. Section 5.4 says some agent runs with no successful tool call still count as complete, and that the agent's completion rate overstates its web-procedure success. The limitations section says a human audit would be a more reliable measure."
  - "The 130× speedup is τ²-bench with simulated tools, so the workflow calls no model. On the enterprise set the mean time rises, from 153 seconds to 163 seconds, while the median falls. Cost falls 24% because tools may still call a model. The $0.096 figure is execution cost, not construction."
  - "The break-even of about 75 executions applies a $2.32 construction estimate from τ²-bench to a $0.031 enterprise cost gap. Appendix L says the $2.32 is not a measured enterprise cost, that enterprise construction uses Opus 4.8, and that the actual break-even depends on the platform's construction costs."
  - "τ²-bench here is telecom in solo mode. The paper says those scores are not comparable to published τ² results. SOP-Bench here uses a stricter exact-field score than the benchmark's substring match, so those numbers are not comparable to published SOP-Bench results. Repair on SOP-Bench sees training labels."
  - "The public benchmarks cover telecom and eight SOP-Bench domains. The arXiv abstract page, checked November 12, 2026, did not link a code repository. A search that day found other projects named ReTrace. They are not this paper."
references:
  - title: "Hou, Kuo, Bhattacharya, et al., ReTrace (arXiv:2611.14492)"
    url: "https://arxiv.org/abs/2611.14492"
    note: "Version 1 submitted November 10, 2026, 18:49:47 UTC. Primary subject cs.AI. Read November 12, 2026."
  - title: "HTML version of the paper"
    url: "https://arxiv.org/html/2611.14492"
    note: "Read November 12, 2026. Author affiliations and Table 1 and Table 2 are taken from this HTML."
  - title: "PDF of the paper"
    url: "https://arxiv.org/pdf/2611.14492"
  - title: "Barres et al., τ²-bench (arXiv:2506.07982)"
    url: "https://arxiv.org/abs/2506.07982"
    note: "The benchmark ReTrace pins. The ReTrace appendix says solo-mode scores are not comparable to published results."
  - title: "τ-bench leaderboard"
    url: "https://taubench.com/"
    note: "Opened November 12, 2026. The τ²-bench text preview lists aggregate Pass^1 across retail, airline, and telecom. Those rows are a different protocol from ReTrace."
  - title: "sierra-research/tau2-bench"
    url: "https://github.com/sierra-research/tau2-bench"
    note: "README on main, read November 12, 2026. It says 2.0 English runs are not input-identical to v1.0.1, so 2.0 scores are not comparable with the 1.x leaderboard."
  - title: "Nandi et al., SOP-Bench (arXiv:2506.08119, KDD 2026)"
    url: "https://arxiv.org/abs/2506.08119"
    note: "The benchmark ReTrace cites as Nandi et al. 2026. Its abstract, read November 12, 2026, gives an illustrative ReAct task-success example of 72.4% for Claude 4 Opus and 63.3% for Claude 4.5 Sonnet. ReTrace says its own stricter field match is not that score."
  - title: "amazon-science/sop-bench"
    url: "https://github.com/amazon-science/sop-bench"
    note: "Repository linked from the SOP-Bench paper. HTTP 200 on November 12, 2026. This is the benchmark, not a ReTrace release."
  - title: "Wang et al., Agent Workflow Memory (ICML 2025)"
    url: "https://arxiv.org/abs/2409.07429"
    note: "ReTrace reruns this method. In that rerun a model still chooses steps at execution."
citation:
  apa: "Hou, K., Kuo, Y. P., Bhattacharya, I., Nama, R., Gupta, A., Castillo, C. D., Ramachandra, P., Jiang, X., & Carbone, F. (2026, November 10). ReTrace: Distilling tool-using agents into planner-free workflows. arXiv:2611.14492."
  bibtex: |
    @article{hou2026retrace,
      title={ReTrace: Distilling Tool-Using Agents into Planner-Free Workflows},
      author={Hou, Kaiyuan and Kuo, Yang Ping and Bhattacharya, Indranil and Nama, Rohith and Gupta, Arushi and Castillo, Carlos D. and Ramachandra, Prathap and Jiang, Xiaofan and Carbone, Francesco},
      journal={arXiv preprint arXiv:2611.14492},
      year={2026},
      url={https://arxiv.org/abs/2611.14492}
    }
faq:
  - question: "What is ReTrace?"
    answer: "ReTrace turns a written procedure and a few logged agent runs into a workflow. Code, not a model, selects the next step on later runs. A tool inside that workflow may still call a model. The authors extract the condition behind each step from the agent's reasoning and the tool record, merge those conditions into a rule document, and compile the document for the target platform."
  - question: "When was the paper released, and who wrote it?"
    answer: "arXiv lists version 1 as submitted November 10, 2026, at 18:49:47 UTC, in cs.AI. The HTML author block lists Kaiyuan Hou and Xiaofan Jiang at Columbia University, and the other seven authors at Amazon. Hou is marked as an Amazon intern. Hou, Yang Ping Kuo, Indranil Bhattacharya, Rohith Nama, and Arushi Gupta are marked equal contribution. Kuo is the corresponding author. This breakdown was published November 12, 2026."
  - question: "What happened on the 79 production procedures?"
    answer: "ReTrace completion is 93.8%, and the agent that still plans each step is 96.8%. The paired difference is −3.0 points, with a 95% interval from −8.0 to 1.0. Mean cost per task is $0.096 against $0.127. Median time falls from 68 seconds to 37 seconds. Mean time rises from 153 seconds to 163 seconds. The platform is unnamed, and completion is the platform's own flag."
  - question: "Why is the τ²-bench run 1.3 seconds, and is 75.8% a leaderboard score?"
    answer: "On that run the tools are simulated, so the compiled workflow calls no model. The agent takes 170 seconds and 12.1 planning calls. The paper calls the workflow 130× faster. The 75.8% is telecom only, solo mode, 40 test inputs, Sonnet 4.6. Solo mode removes the simulated user. The paper says the scores are not comparable to published τ² results. The public board on November 12, 2026 is a different test."
  - question: "Does dropping the planner lose the task?"
    answer: "On the printed means, some of it. The enterprise gap is 3.0 points and the interval includes zero. The τ²-bench gap is 4.8 points on the printed means, 80.6% against 75.8%, and the agent's interval runs from 52.1% to 100.0%. On SOP-Bench, unrepaired ReTrace at 80.6% trails few-shot at 83.6% and the agent at 85.5%. The paper says the agent and Agent Workflow Memory gain mostly where a step must read free text at run time. Repair with training failures lifts the τ² k=2 workflow from 66.7% to 81.2%, and the paper does not claim that beats the agent."
  - question: "What does the agent's written reasoning add?"
    answer: "At k=4 on τ²-bench, keeping the reasoning adds 6.2 points [0.5, 12.5] over the same pipeline with reasoning removed. On the enterprise set the gain is 8.8 points [2.5, 15.9], from 85.0% to 93.8% over 77 procedures. On SOP-Bench, short procedures, the version without reasoning scores 82.3% against 80.6%. The reasoning also names branches no trace took: unwitnessed branches fall from 44 to 3 at k=4 when it is removed."
  - question: "When does the one-time build pay for itself?"
    answer: "Appendix L applies a $2.32 construction estimate from τ²-bench to the $0.031 enterprise cost gap and gets about 75 executions. The same appendix says that $2.32 is not a measured enterprise bill, that enterprise construction uses Opus 4.8, and that the real break-even depends on what the platform charges to build. The seven busiest fixed workflows in the April 1 to July 1, 2026 log each ran 297,000 to 528,000 times."
  - question: "Where is the paper, and is there code?"
    answer: "The record is arXiv 2611.14492. The abstract page, the HTML, and the PDF are linked in the references. On November 12, 2026 the abstract page did not link a repository, and the repositories named ReTrace that a search returned are other projects."
---

## What changes when code picks the next step

ReTrace is a November 10, 2026 method that compiles a repeated procedure out of the planner. The harness guides for the loop it replaces are on [HarnessFlow](/research/harnessflow-mcts-harness-optimization), which searches for a better harness and still runs a model inside it. ReTrace deletes that choice. A tool may still call a model. The next step is a rule.

The input is a written SOP and k logged runs of an agent. Each step in a trace keeps the reasoning the agent wrote, the tool it called, the arguments, and the result. Tool calls alone often fail to say why. The paper's example is an order lookup followed by an escalation: the trace does not say whether the shipping status caused it. The reasoning often does, and it can name a branch no logged run took. Those conditions are merged into one rule document. Every rule cites a trace step or an SOP line. A last check confirms that no named rule was dropped. It does not judge whether the condition is right.

The compiler is the only platform-specific stage. Public benchmarks get Python. The enterprise platform gets a typed graph. Candidates that make a planning call are rejected. On the public benchmarks the authors keep the candidate that reproduces the most recorded training steps. [Evolver](/research/evolver-agent-exploration-evolving-capabilities) also starts from traces. It leaves the agent in place and reuses the experience on the next run. ReTrace's bet is that, for a procedure you will run again, the experience should become the control flow.

## The scores, with the intervals next to them

Every comparison below is the authors' own rerun. The original agent is the one that produced the traces. Zero-shot sees the procedure and the tools. Few-shot also sees k full traces. Execution-only sees those traces with the reasoning removed. Agent Workflow Memory, AWM, stores workflows as text and still calls a model to choose steps at run time. Skill Factory's code is run here with inputs supplied directly, not through its usual model-based skill selection. Bold in the paper marks the best success, time, or cost among methods with no runtime planner.

### Telecom, solo mode, and eight SOP domains

τ²-bench is k=4, chosen by five-fold cross-validation on 74 training inputs, scored on 40 test inputs. SOP-Bench is k=16, scored on 744 test inputs. The agent column on SOP-Bench is three runs per input. Times are mean seconds per run. Calls are construction / execution. Task success for a planner-free method counts execution errors as failures.

| Method | τ² success | τ² seconds | SOP success | SOP seconds |
| --- | --- | --- | --- | --- |
| Original agent | 80.6 [52.1, 100.0] | 170 | 85.5 [83.0, 88.0] | 46.6 |
| Zero-shot | 38.8 [30.0, 44.4] | 1.8 | 67.7 [64.5, 70.9] | 0.27 |
| Few-shot | 70.6 [52.1, 88.9] | 1.6 | 83.6 [81.2, 86.2] | 0.24 |
| ReTrace | 75.8 [66.1, 85.5] | 1.3 | 80.6 [78.1, 83.1] | 0.29 |
| ReTrace, repair | 81.2 [74.4, 88.1] | 1.3 | 87.8 [86.2, 89.4] | 0.40 |
| AWM | 82.3 [68.0, 100.0] | 89.8 | 84.5 [82.0, 86.8] | 25.8 |
| Execution-only | 67.9 [53.3, 82.6] | 1.7 | 80.9 [78.2, 83.6] | 0.24 |
| Skill Factory | 62.3 [44.4, 80.2] | 2.9 | 60.5 [57.9, 63.2] | 0.22 |
| BPOP | 30.6 [12.1, 48.4] | 4.3 | — | — |

On τ²-bench, ReTrace is the highest unrepaired mean among methods with no runtime planner. The paired gain over zero-shot is 37.1 points, interval [19.8, 51.1]. The paper says the 5.3-point margin over few-shot and the 7.9-point margin over execution-only are not significant. The agent and AWM score higher and pay for it on every run: 12.1 planning calls and 170 seconds, or 26.2 execution calls and 89.8 seconds. ReTrace's construction is at least 11 model calls, once. Execution calls are zero, because the telecom tools are simulated. The paper calls that 130×. A separate timing run stays under 2.5 seconds on the deepest tasks, where the agent needs 214 seconds.

Repair is a different row. It starts from k=2 workflows, not from the k=4 row, and three rounds move test success from 66.7% to 81.2%. The paper says the interval is too wide to claim parity with 80.6%. Zero-shot, repaired the same way, rises from 38.8% to 60.6%.

On SOP-Bench the ranking flips. Unrepaired ReTrace at 80.6% trails few-shot at 83.6% and is level with execution-only at 80.9%. The agent at 85.5% and AWM at 84.5% gain, the paper says, mostly where a step must read free text at run time. Only ReTrace selects among candidate workflows. With that same selection, few-shot reaches 84.0% in cross-validation. Repair here shows the training label of each failed input, so 87.8% is the best cell in the table and is not a fair comparison with the unrepaired rows. Planner-free times on this benchmark sit between 0.22 and 0.40 seconds. The agent's mean is 46.6 seconds.

### Seventy-nine production procedures

k=3, not tuned. Each procedure has disjoint construction and test inputs, up to 20 test inputs. The cells are means over the procedures a method could run, 70 to 78 of 79. Time is mean / median seconds. Cost is dollars per task and includes model calls inside tools.

| Method | Completion | Low | Med | High | Time (s) | Cost |
| --- | --- | --- | --- | --- | --- | --- |
| Original agent | 96.8 [93.5, 99.0] | 95.4 | 98.5 | 96.7 | 153 / 68 | 0.127 |
| Zero-shot | 82.7 [73.9, 90.7] | 83.9 | 80.0 | 84.0 | 134 / 42 | 0.072 |
| Few-shot | 88.6 [81.1, 95.3] | 91.5 | 88.6 | 85.0 | 105 / 42 | 0.033 |
| ReTrace | 93.8 [88.4, 98.2] | 96.3 | 95.8 | 89.2 | 163 / 37 | 0.096 |

The headline gap is 3.0 points, and the paired interval includes zero. Few-shot is the cheap row, $0.033, and it gives up 5.2 points of completion. High-complexity procedures are where ReTrace sits furthest from the agent, 89.2% against 96.7%. Low and Med are close: 96.3% against 95.4%, and 95.8% against 98.5%.

The mean-time increase is the web tools. Twenty procedures use them. A successful web call takes a median of 270 seconds. A failed one takes a few seconds. Web calls succeed 86.6% of the time under ReTrace and 27.3% of the time under the agent, so the agent can look faster because it fails. Strip those twenty procedures out and ReTrace averages 58 seconds against 92 seconds, at 19% of the agent's cost. The paper also says some agent runs with no successful tool call are still marked complete. Read 96.8% as the platform's flag. It is not an audited count of correct business outcomes.

Reasoning is worth more on this set than on the short SOP-Bench procedures. Dropping it, and changing nothing else in the pipeline, drops completion from 93.8% to 85.0%, a paired 8.8 points over 77 procedures, interval [2.5, 15.9]. Cost moves from $0.096 to $0.101, so the shorter traces do not buy a cheaper run. Four Low procedures fail on all 20 test inputs without the reasoning, each time at the same code step. Remove those four and the Low gain falls to about 1 point.

More traces are not a free improvement. Nine full enterprise traces lower completion to 81.4%, under zero-shot's 82.7%. On τ²-bench the build rate of full-trace generation falls from 100% at k=16 to 31% at k=32. The generator input at k=16 is 101.4k tokens, against 24.5k tokens when it reads the rule document instead.

The model that writes the workflow matters more than the model that extracts rules. On τ²-bench at k=4, with the other stages held at Sonnet 4.6, Haiku in the synthesis stage lowers success by 36.5 points, and Opus 4.8 lowers it by 11.8 points. The same swaps in extraction lower success by 10.6 and 1.5 points. The paper says a larger model did not help, and it does not explain why Opus scored below Sonnet.

## The public τ² board, as of November 12

[taubench.com](https://taubench.com/), opened November 12, 2026, previews the τ²-bench text leaderboard as one Pass^1 across retail, airline, and telecom. The top three rows on that preview are Qwen3.5-397B-A17B at 87.9%, Gemini 3.0 Pro at 85.4%, and Claude Opus 4.5 at 85.3%. Those are leaderboard aggregates. ReTrace's 75.8% is Sonnet 4.6, telecom only, 40 test inputs, solo mode, no simulated user.

The paper states the consequence directly: because solo mode removes the simulated user, its τ²-bench scores are not comparable to published results. The [tau2-bench README](https://github.com/sierra-research/tau2-bench) on November 12, 2026 adds a second break. It says 2.0 English runs are not input-identical to v1.0.1, so 2.0 scores are not comparable with the 1.x leaderboard. ReTrace cites Barres et al., arXiv 2506.07982, and pins a revision. It is not a submission on either tab of the board this page opened.

SOP-Bench has the same kind of break inside the paper. An answer counts only when it uses the SOP's output format and every scored field matches. The benchmark's own scorer accepts substring matches. The authors say their SOP-Bench numbers are not comparable to published SOP-Bench results. Nandi et al., arXiv 2506.08119, read November 12, 2026, describe the benchmark as 12 domains and more than 2,000 tasks. The abstract's illustrative ReAct rates are 72.4% for Claude 4 Opus and 63.3% for Claude 4.5 Sonnet. ReTrace's appendix describes a pinned revision with 14 domains, admits 8, and uses the stricter field match, so 80.6% is not that 72.4%. The [evaluation guide](/blog/how-do-you-evaluate-an-ai-agent-harness) on this site is the right place to take a score apart before comparing harnesses. A percent from a different user simulator, a different domain mix, or a looser match rule is a different claim.

AWM remains the live pattern this paper argues with. Its artifact is text the agent reads, and a model still selects the step. In this rerun that costs 89.8 seconds on telecom and 25.8 seconds on SOP-Bench, against 1.3 and 0.29 seconds for unrepaired ReTrace, at a higher printed success. The [November framework snapshot](/reports/ai-agent-framework-github-stats-november-2026) counts stars and releases. It does not record whether a framework's default loop still asks a model for the next step. ReTrace is a measurement of that choice, on one unnamed platform and two public benchmarks, not a ranking of those repositories.

## What this means if the same SOP runs all day

Count executions before you keep a planner. On this platform, step choice was 37% to 43% of execution time for agents with three to five tools, and the seven busiest fixed workflows each ran hundreds of thousands of times between April 1 and July 1, 2026. Appendix L's break-even, about 75 runs, uses a $2.32 estimate from the public benchmark and a $0.031 gap in measured execution cost. Enterprise construction used Opus 4.8. Price the build on your own model bill, then compare it with the planner's share of a single run.

Keep the agent's reasoning in the traces you compile. It was worth 6.2 points on telecom and 8.8 points on the enterprise set, and it is where unwitnessed branches come from. Cap how many full traces you hand the generator. Past a point, the build rate falls and completion can land below a workflow written from the SOP alone.

Treat completion flags as a start. On the web procedures, ReTrace's tool calls succeed 86.6% of the time and the agent's succeed 27.3% of the time, while the agent's completion flag stays high. If you buy an automation on a completion number, ask for the tool-outcome rate next to it.

Leave a planner in place where a step has to read free text at run time. That is where AWM and the original agent beat unrepaired ReTrace on SOP-Bench. And review the recovered conditions before the workflow runs unattended. The ethics section says a wrong condition or a biased rule will repeat on every case, and code does not remove it.

## Read the paper

The November 10 paper, the benchmark it pins, and the leaderboard it should not be scored against:

- [ReTrace on arXiv](https://arxiv.org/abs/2611.14492)
- [HTML](https://arxiv.org/html/2611.14492)
- [PDF](https://arxiv.org/pdf/2611.14492)
- [τ²-bench paper](https://arxiv.org/abs/2506.07982)
- [τ-bench leaderboard](https://taubench.com/)
- [tau2-bench source](https://github.com/sierra-research/tau2-bench)

This page did not find a ReTrace code release linked from the arXiv record on November 12, 2026.
