---
title: "How to Build an Eval Harness for AI Agents: Isolate First"
description: "How to build an eval harness for AI agents: write tasks with checkable outcomes, isolate every trial, grade the environment, and keep a held-out set. Harbor, Inspect, and a local pytest suite are three ways to run that loop."
takeaways:
  - "An eval harness runs tasks in a clean environment, records the trace, grades the result, and aggregates trials. The agent harness is the loop that lets the model act."
  - "Grade the environment or the tool call with code. Add an LLM judge only where a file, a test, or a database row cannot decide the outcome, and calibrate that judge against a person."
  - "On the Terminal-Bench 4.0 file this site read November 5, 2026, cost per success runs from $1.0063 to $234.2405. A pass rate without that cost, and without pass^k, is an incomplete gate."
date: "2026-11-09"
updated: "2026-11-14"
category: guide
topics:
  - harnesses
  - how-agents-work
  - research
  - task-performance
audience:
  - everyone
  - builders
  - research
companies:
  - google
  - anthropic
  - nvidia
  - openai
  - arxiv
byline: "AI Agents Info Editorial"
sources:
  - title: "Anthropic, Demystifying evals for AI agents (January 9, 2026; re-read November 14, 2026)"
    url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"
  - title: "Harbor docs, Create a task (read November 14, 2026)"
    url: "https://docs.harborframework.com/tutorials/create-a-task"
  - title: "PyPI JSON for harbor 0.26.0, uploaded November 13, 2026"
    url: "https://pypi.org/pypi/harbor/json"
  - title: "GitHub, harbor-framework/harbor release v0.26.0 (November 13, 2026)"
    url: "https://github.com/harbor-framework/harbor/releases/tag/v0.26.0"
  - title: "GitHub, harbor-framework/terminal-bench release v4.1.0 (November 3, 2026)"
    url: "https://github.com/harbor-framework/terminal-bench/releases/tag/v4.1.0"
  - title: "PyPI JSON for inspect-ai 0.3.289, uploaded November 10, 2026"
    url: "https://pypi.org/pypi/inspect-ai/json"
  - title: "UK AI Security Institute, Inspect scorers (read November 14, 2026)"
    url: "https://inspect.aisi.org.uk/scorers.html"
  - title: "UK AI Security Institute, Inspect sandboxes (read November 14, 2026)"
    url: "https://inspect.aisi.org.uk/extensions-sandboxes.html"
  - title: "OpenAI, Feature and endpoint deprecations (read November 14, 2026)"
    url: "https://developers.openai.com/api/docs/deprecations"
  - title: "OpenAI, Graders (read November 14, 2026)"
    url: "https://developers.openai.com/api/docs/guides/graders"
  - title: "Promptfoo pricing (read November 14, 2026)"
    url: "https://www.promptfoo.dev/pricing/"
  - title: "GitHub, promptfoo release 0.125.1 (October 25, 2026)"
    url: "https://github.com/promptfoo/promptfoo/releases/tag/0.125.1"
  - title: "PyPI JSON for deepeval 4.3.4, uploaded November 11, 2026"
    url: "https://pypi.org/pypi/deepeval/json"
  - title: "Confident AI pricing (read November 14, 2026)"
    url: "https://www.confident-ai.com/pricing"
  - title: "LangSmith plans and pricing (read November 14, 2026)"
    url: "https://www.langchain.com/pricing"
  - title: "LangChain, Trajectories in LangSmith"
    url: "https://www.langchain.com/blog/langsmith-trajectories-tracing"
  - title: "Braintrust pricing (read November 14, 2026)"
    url: "https://www.braintrust.dev/pricing"
  - title: "GitHub, Arize Phoenix release arize-phoenix-v21.1.0 (November 13, 2026)"
    url: "https://github.com/Arize-ai/phoenix/releases/tag/arize-phoenix-v21.1.0"
  - title: "Arize Phoenix LICENSE, Elastic License 2.0 (read November 14, 2026)"
    url: "https://github.com/Arize-ai/phoenix/blob/main/LICENSE"
  - title: "Sierra, tau2-bench README and release v2.0.0 (release notes dated October 19, 2026; README read November 14, 2026)"
    url: "https://github.com/sierra-research/tau2-bench"
  - title: "Sierra, tau-bench README warning (read November 14, 2026)"
    url: "https://github.com/sierra-research/tau-bench"
  - title: "This site, agent benchmark cost per solved task (file read November 5, 2026)"
    url: "https://www.aiagentsinfo.com/tools/agent-benchmark-cost-per-solved-task"
faq:
  - question: "What is an eval harness for AI agents?"
    answer: "An evaluation harness is the infrastructure that runs evals end to end. Anthropic’s January 9, 2026 post says it provides instructions and tools, runs tasks, records the steps, grades outputs, and aggregates results. The agent harness is the other layer, the one that lets the model act."
  - question: "How is an eval harness different from an agent harness?"
    answer: "The agent harness is the loop, tools, memory, permissions, and stop rules around a model. The eval harness is the system that tests that pair: tasks, isolated trials, graders, and a report. Anthropic defines both on the same page."
  - question: "Should the grader be code, a model, or a person?"
    answer: "Start with code when a file, a test, or a database row can decide the outcome. Use a model grader for freeform work, and calibrate it against human graders. Anthropic lists code-based, model-based, and human graders as the three types, each with a cost and a failure mode."
  - question: "What is the difference between pass@k and pass^k?"
    answer: "pass@k is the chance that at least one of k trials succeeds, so the score rises as you allow more attempts. pass^k is the chance that all k trials succeed. Anthropic’s example is a 75% per-trial success rate: the chance of passing three trials in a row is about 42%. Use pass^k when a user gets one shot."
  - question: "Do I need Harbor to build an eval harness?"
    answer: "No. Harbor 0.26.0, uploaded to PyPI on November 13, 2026, is the runner when the task needs a container, a hidden verifier, and a numeric reward. Inspect 0.3.289 scores samples in its own sandboxes. A single tool-call check can be an ordinary test. Pick the runner that matches the check."
  - question: "Is the OpenAI Evals API still the way to grade agents?"
    answer: "No. OpenAI’s deprecations page, read November 14, 2026, lists the Evals dashboard, API, and graders as read-only, with shutdown on November 30, 2026. The same row names Promptfoo as the replacement. The older openai/evals GitHub repository was last pushed on April 14, 2026."
  - question: "What does one Terminal-Bench success cost?"
    answer: "On the Terminal-Bench 4.0 file this site read on November 5, 2026, Claude Code with GLM-5.3-Flash lists $118.74 for 118 successes, $1.0063 each. Claude Code with Sonnet 5 at max effort lists $9,603.86 for 41 successes, $234.2405 each. A listed $0.00 stays $0.00. A partial cost stays Not listed."
---

Updated November 14, 2026. An eval harness runs each task in a clean environment, records the trace, grades the environment or the tool call, and aggregates more than one trial. Build the first gate as code on a failure you have already seen. Add a model judge only where a file, a test, or a database row cannot decide the outcome.

That split is the whole job. [Anthropic’s January 9, 2026 post](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), re-read November 14, 2026, calls the evaluation harness the infrastructure that provides instructions and tools, runs tasks, records the steps, grades outputs, and aggregates results. The [agent harness](/glossary/harness) is the other object: the system that lets a model act. This page builds the first object. The workshop itself is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness).

## What should an eval harness measure?

Measure whether the environment reached the goal, and keep the trace so you can name the step that failed.

Anthropic’s post uses a flight-booking agent that can say the flight is booked. The outcome is whether a reservation exists in the environment’s database. The transcript is the ordered log of the attempt. The outcome is the state you can check. A release gate reads the outcome. The trace tells you which tool call to fix.

The same post splits the suite in two. Capability evals ask what the agent can do, and they should start at a low pass rate. Regression evals ask whether it still handles what it used to, and they should sit near a full pass rate. When a capability task saturates, it can graduate into the regression suite. A public leaderboard is someone else’s capability suite. The [November 2026 harness benchmark](/reports/agent-harness-benchmark-november-2026) copies official SWE-bench and Terminal-Bench 4.0 rows and keeps the harness name on each row for that reason.

Score one visible action when you are changing a prompt or a tool. That check is a [behavioral evaluation](/glossary/behavioral-evaluation). Score a frozen task set when you want a destination number. That set is a [benchmark](/glossary/benchmark). Keep both. A tool-call assertion can pass while the user-facing job still fails.

## How do you build the task set?

Write a goal, a starting state, and a check that reads the environment. Keep at least one case out of the edit that proposes the next harness change.

Anthropic says a good task is one where two domain experts would reach the same pass or fail. Each task needs a reference solution that passes the graders, so you know the task is solvable and the grader is wired. A 0% pass rate across many trials, which the post calls 0% pass@100, is most often a broken task.

Harbor, the framework from the Terminal-Bench authors, stores one task as a directory. The [create-a-task tutorial](https://docs.harborframework.com/tutorials/create-a-task), read November 14, 2026, generates `instruction.md`, `task.toml`, `environment/Dockerfile`, `solution/solve.sh`, and `tests/test.sh` plus pytest. The instruction is the goal. The Dockerfile is the starting state. The tests are the check, and they run after the agent.

The original [tau-bench](https://github.com/sierra-research/tau-bench) repository still warns that its airline and retail tasks are outdated. Its README points at [tau2-bench](https://github.com/sierra-research/tau2-bench) and calls that destination τ³-bench. The destination README, read the same day, titles the current release τ-bench 2.0. Release notes date v2.0.0 to October 19, 2026, and say scores are not comparable with 1.x. The repository’s last push on the GitHub API was November 10, 2026. Use the current README’s name and the frozen benchmark flag it documents (`text-v1`, `voice-v2`). Leave the old task files alone.

[SWE-bench](https://github.com/SWE-bench/SWE-bench) is MIT. The GitHub API showed a last push on September 18, 2026, and `releases/latest` returned 404, so this page does not invent a release tag. The grader there is the repository’s tests: a solution passes when it fixes the failing tests and leaves the existing tests green. [mini-SWE-agent](https://github.com/SWE-agent/mini-swe-agent) v2.4.6 was published July 23, 2026. That is the harness on the bash-only rows of this site’s SWE-bench table.

## How do you build the harness, step by step?

Install a runner, put one known failure in a fresh environment, write a verifier that emits a number, prove the task is solvable, then run the real agent.

Harbor on PyPI was **0.26.0**, uploaded November 13, 2026 at 23:49 UTC. GitHub’s `v0.26.0` was published the same minute. The license on the repository is Apache-2.0. Terminal-Bench’s own repo published **v4.1.0** on November 3, 2026. The release notes say that edition adds verifier fixes, reproducibility work, hardening against reward hacking, and a CPU-only dataset of 63 tasks. This site’s cost figures below are Terminal-Bench **4.0**, from a file read November 5, 2026. A 4.1 run is a different experiment.

The tutorial’s loop, shortened to the commands it prints:

1. Create the task directory: `harbor task init ssh-key-pair`.
2. Write the goal in `instruction.md`. The tutorial’s example asks for an SSH key pair at `~/.ssh/id_rsa` and `~/.ssh/id_rsa.pub`, with no passphrase.
3. Pin the machine in `environment/Dockerfile`. The tutorial starts from `ubuntu:24.04` and installs `openssh-client`.
4. Put a known solution in `solution/solve.sh`. Harbor’s oracle agent runs that script to prove the task can score 1.
5. Make `tests/test.sh` write a reward. The tutorial installs pytest, runs it, and records the exit code:

```bash
pytest /tests/test_outputs.py
if [ $? -eq 0 ]; then
  echo 1 > /logs/verifier/reward.txt
else
  echo 0 > /logs/verifier/reward.txt
fi
```

6. Prove the task: `harbor run -p ssh-key-pair -a oracle`. A reward of 1 means the solution and the grader agree.
7. Run the agent you actually ship. The tutorial’s example is `harbor run -p ssh-key-pair -a claude-code -m anthropic/claude-haiku-4-5`.
8. Open `harbor view ./jobs` and read the Trajectory tab beside the verifier log.

The reward file is the gate. The trajectory is the debug view. Harbor’s tutorial also points at RewardKit when you need a weighted score or an LLM-as-a-judge rubric inside the same verifier container.

Inspect is the other runner you can start this week. PyPI `inspect-ai` **0.3.289** was uploaded November 10, 2026. The license is MIT. The [scorers page](https://inspect.aisi.org.uk/scorers.html) documents built-in scorers, including `model_graded_qa()` for an open-ended answer judged against grading guidance in the target. Inspect’s [sandbox page](https://inspect.aisi.org.uk/extensions-sandboxes.html), read November 14, 2026, says `DockerSandboxEnvironment` runs each sample in a Docker container. You pay the model provider. There is no hosted Inspect price on the project page.

A third path is a single assertion in the test suite you already run. Use it when one tool call is the whole question. Fold it into Harbor or Inspect when the check needs a machine, a hidden test, and a number you can aggregate.

## Which grader should you use: code, an LLM judge, or a person?

Use code when the outcome is a fact in the environment. Use a model when the outcome is a judgment. Use a person to calibrate the model, and for the cases the model should not settle alone.

Anthropic’s post says agent evals typically combine three grader types. Each one scores some portion of the transcript or the outcome.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Grader</th>
<th>What it can decide</th>
<th>What it costs you</th>
</tr>
</thead>
<tbody>
<tr>
<td>Code</td>
<td>String match, a binary test, static analysis, a tool call that did or did not happen, a row in a database, a reward file</td>
<td>Cheap and repeatable. Blind to a valid path you forgot to encode.</td>
</tr>
<tr>
<td>Model</td>
<td>Freeform work: a rubric over the trace, or a judgment of an answer that has no single string</td>
<td>Another model call per item. Anthropic says it needs calibration against human graders.</td>
</tr>
<tr>
<td>Human</td>
<td>Expert review, a spot check, the gold labels that tune the model grader</td>
<td>Slow. Anthropic lists expense and the need for agreement across raters as the weaknesses.</td>
</tr>
</tbody>
</table>
</div>

Harbor’s `echo 1` or `echo 0` is a code grader. Inspect’s `model_graded_qa()` is a model grader. Braintrust’s pricing page, read November 14, 2026, lists human review scores as a separate meter from model scores. A [guardrail](/glossary/guardrail) is none of these. A guardrail allows, blocks, or pauses an action while the agent is running. A grader speaks after the trial.

OpenAI’s hosted graders are the wrong place to start a new suite. The [deprecations page](https://developers.openai.com/api/docs/deprecations), read November 14, 2026, lists the Evals dashboard, API, and graders as **read-only**, with shutdown on **November 30, 2026**. The recommended replacement on that row is Promptfoo. The [graders guide](https://developers.openai.com/api/docs/guides/graders) still describes string check, text similarity, a score-model grader, and a Python grader, and it points at the same deprecation. Those graders score an output against a reference. They are not a trajectory harness. The older `openai/evals` GitHub repository was last pushed April 14, 2026. The API returned no `latest` release. Leave it as a registry with a date, and build on a runner that shipped this month.

## How do you score a trajectory and a tool call?

Score the tool call when the action is the requirement. Score the trajectory when the path can be valid in more than one order and you still need to see the path.

A tool-call check is small. The agent had to call search before it answered a live question, or it had to avoid `send_message` before a person confirmed. Code can read the call name and the arguments. DeepEval’s documentation publishes both a [tool-correctness](https://deepeval.com/docs/metrics-tool-correctness) metric and a [task-completion](https://deepeval.com/docs/metrics-task-completion) metric. The library on PyPI was **4.3.4**, Apache-2.0, uploaded November 11, 2026.

A trajectory is the whole path: messages, tool calls, and the order they happened. Harbor’s viewer has a Trajectory tab for that log. Promptfoo **0.125.0**, in the October 23, 2026 release notes, added assertion filters on trace spans; **0.125.1** followed on October 25, 2026. The repository README says Promptfoo is part of OpenAI and remains MIT. [LangChain’s trajectories post](https://www.langchain.com/blog/langsmith-trajectories-tracing) says a trajectory is a projection over the traces in a thread, and that online evaluators can score it. That is a hosted view of a session. It is still a judgment unless you attach a code check to a span.

τ-bench’s original `run.py` computes pass^k from the count of successful trials per task, using a combinations ratio rather than a raw average of rewards. The current tau2-bench README adds post-hoc judges for speech and tool use, and it says those judges do not change the task reward. Keep that split. A judge of “how it spoke” is a label. The reward is whether the database landed on the goal state.

If several correct paths exist, a frozen tool order will punish a valid one. Grade the outcome in code, and keep the trajectory for the review queue.

## What does a solved task cost?

Divide the listed run cost by the number of successes, and refuse to divide a blank or a partial cost.

The [agent benchmark cost per solved task](/tools/agent-benchmark-cost-per-solved-task) calculator uses the same file as the [November harness benchmark](/reports/agent-harness-benchmark-november-2026). The file was read November 5, 2026. On Terminal-Bench 4.0 the page prints two positive rates:

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Row</th>
<th>Harness and model</th>
<th>Date</th>
<th>Successes / trials</th>
<th>Listed cost</th>
<th>Per success</th>
</tr>
</thead>
<tbody>
<tr>
<td>Cheapest positive</td>
<td>Claude Code, GLM-5.3-Flash</td>
<td>August 26, 2026</td>
<td>118 / 330 (35.76%)</td>
<td>$118.74</td>
<td>$1.0063</td>
</tr>
<tr>
<td>Dearest positive</td>
<td>Claude Code, Sonnet 5, max effort</td>
<td>June 30, 2026</td>
<td>41 / 330 (12.42%)</td>
<td>$9,603.86</td>
<td>$234.2405</td>
</tr>
</tbody>
</table>
</div>

A listed $0.00 stays $0.00. The calculator does not treat that zero as the cheapest positive rate. One Terminal-Bench cost is marked partial, Grok Build with Grok 4.7, and the page leaves it Not listed. The same rule belongs in your harness: record model id, agent version, and the dollar cost of the trial next to the reward. Two runs with different step caps are different experiments.

The sharp reading of that table is that cost per success without the success rate picks a cheap miss or an expensive miss. GLM-5.3-Flash is the cheap positive row and still finishes about a third of the trials. Sonnet 5 at max effort on that row finishes 41 of 330 and costs $234.2405 each time it does. Put both numbers on the gate. A token price from a model card is a different meter. That bill is the [agent cost calculator](/agent-cost-calculator).

## How do you handle flakiness, pass@k, and pass^k?

Run more than one trial from a clean environment. Report pass@k when a retry is part of the product. Report pass^k when the user gets one shot.

Anthropic’s post says each trial should start from a clean environment. Leftover files, cached data, and resource exhaustion make failures correlate with the infrastructure. Shared state can also inflate a score. The example is internal evals where Claude gained an advantage by reading git history from earlier trials. Harbor’s task starts an environment, lets the agent act, stops the environment, and then runs the verifier. Inspect’s Docker provider runs each sample in a container. Either habit blocks that leak.

The same post defines the two summary stats. **pass@k** is the chance the agent gets at least one correct solution in k attempts. The score rises with k. **pass^k** is the chance every one of the k trials succeeds. At k = 1 the two numbers match. At k = 10 they diverge: pass@k climbs toward a sure thing, and pass^k falls toward zero. The post’s arithmetic: a 75% per-trial success rate across 3 trials gives (0.75)³ ≈ 42% for passing all three. Customer-facing agents live on pass^k. A coding agent that may propose several patches can live on pass@k, and you should say which one the gate uses.

Flake from the task is a different bug. Anthropic says a frontier model at 0% across many trials is a signal to fix the task. Terminal-Bench 4.1’s release notes exist because verifiers themselves get gamed and drift. When you adopt a new edition, throw out the comparison with the old board. This site’s 4.0 cost table stays 4.0.

## How do you gate a release in CI?

Block the merge on the regression suite’s aggregate, with a code grader, and keep the noisy capability run off the required check.

Promptfoo’s pricing page, read November 14, 2026, includes CI/CD on the Community plan. Community is free, MIT, and local or self-hosted. Red teaming on that plan is capped at 10,000 probes a month. Enterprise and on-prem are custom. DeepEval runs as pytest, so a failing metric fails the job. Harbor’s reward file is the same idea: a 0 fails the trial. Confident AI, the hosted companion, is $0 with 2 seats, 1 project, 5 test runs a week, and 1 GB-month of traces. Starter is $200 per organization per month. Team is $2,000 per organization per month. Enterprise is custom and is the tier that lists a dedicated on-prem deployment.

Treat one green trial as a sample, not a merge check. Anthropic’s regression target is a suite near a full pass rate, watched for a decline. Record the model id and the agent version in the check name so a model swap cannot hide inside a green history.

Hosted traces are optional until a person other than you needs the run. LangSmith’s pricing page lists Developer at $0 per seat with 5,000 base traces a month, Plus at $39 per seat with 10,000 base traces, and Enterprise as custom, including self-hosted and hybrid. One LangChain Standard Unit is $1. Tuned Evaluators are 0.015 LSU per successful Perceived Error run, in public beta for Plus and Cloud Enterprise in the US. Braintrust Starter is $0 per month with $10 of model credits, 1 GB of processed data, 10,000 scores, and 14-day retention. Pro is $249 per month with $100 of credits, 5 GB, 50,000 scores, and 30-day retention. Enterprise is custom and lists on-prem or hosted deployment. Arize Phoenix’s GitHub release **arize-phoenix-v21.1.0** was published November 13, 2026. The PyPI package `arize-phoenix` was still **21.0.0**, uploaded October 30, 2026. The license is Elastic License 2.0: you may run it yourself, and you may not offer it as a hosted or managed service.

## Which eval frameworks are live on November 14, 2026?

Ten runners and benchmarks were still reachable on November 14, 2026. The OpenAI Evals API is on the list because it shuts down in sixteen days, and a builder should see that date in the table.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Framework</th>
<th>License</th>
<th>Where it runs</th>
<th>Trajectory or tool-call scoring</th>
<th>Price</th>
<th>Last release</th>
<th>Source</th>
</tr>
</thead>
<tbody>
<tr>
<td>Harbor 0.26.0</td>
<td>Apache-2.0</td>
<td>Self-host. Container per task.</td>
<td>Verifier reward in code or RewardKit. Trajectory tab in <code>harbor view</code>.</td>
<td>No license fee. You pay the model.</td>
<td>November 13, 2026</td>
<td><a href="https://pypi.org/pypi/harbor/json">PyPI</a></td>
</tr>
<tr>
<td>Inspect 0.3.289</td>
<td>MIT</td>
<td>Self-host. Docker sandbox per sample.</td>
<td><code>model_graded_qa()</code> and other built-in scorers. Tool use is part of the sample log.</td>
<td>No license fee. You pay the model.</td>
<td>November 10, 2026</td>
<td><a href="https://pypi.org/project/inspect-ai/">PyPI</a></td>
</tr>
<tr>
<td>promptfoo 0.125.1</td>
<td>MIT</td>
<td>Local, self-host, or Enterprise cloud.</td>
<td>Trace-span filters on assertions since 0.125.0.</td>
<td>Community free. Red teaming 10,000 probes a month. Enterprise custom.</td>
<td>October 25, 2026</td>
<td><a href="https://www.promptfoo.dev/pricing/">Pricing</a></td>
</tr>
<tr>
<td>DeepEval 4.3.4</td>
<td>Apache-2.0</td>
<td>Local pytest. Confident AI is the hosted companion.</td>
<td>Tool-correctness and task-completion metrics in the docs.</td>
<td>Library free. Confident AI $0, $200, or $2,000 per organization per month.</td>
<td>November 11, 2026 (PyPI)</td>
<td><a href="https://pypi.org/project/deepeval/">PyPI</a></td>
</tr>
<tr>
<td>LangSmith</td>
<td>Hosted platform. Libraries are separate.</td>
<td>Cloud in the US or EU. Enterprise adds hybrid and self-host.</td>
<td>Online evaluators can score trajectories, per LangChain’s trajectories post.</td>
<td>Developer $0/seat, 5,000 base traces. Plus $39/seat, 10,000. Enterprise custom. 1 LSU = $1.</td>
<td>Pricing page read November 14, 2026</td>
<td><a href="https://www.langchain.com/pricing">Pricing</a></td>
</tr>
<tr>
<td>Braintrust</td>
<td>Hosted platform. SDKs are separate.</td>
<td>Hosted. Enterprise lists on-prem or hosted.</td>
<td>Scores, including human review scores. This page does not claim a separate trajectory product name.</td>
<td>Starter $0. Pro $249/month. Enterprise custom.</td>
<td>Pricing page read November 14, 2026</td>
<td><a href="https://www.braintrust.dev/pricing">Pricing</a></td>
</tr>
<tr>
<td>Arize Phoenix 21.1.0</td>
<td>Elastic License 2.0</td>
<td>Self-host. You may not offer it as a hosted service.</td>
<td>Traces and evals. PyPI was still 21.0.0 on October 30, 2026.</td>
<td>No Phoenix cloud price on the docs checked. Arize AX is a separate product.</td>
<td>November 13, 2026 (GitHub)</td>
<td><a href="https://github.com/Arize-ai/phoenix/blob/main/LICENSE">License</a></td>
</tr>
<tr>
<td>OpenAI Evals API</td>
<td>Proprietary API</td>
<td>Hosted, read-only.</td>
<td>Output graders: string check, text similarity, score model, Python. Shutdown November 30, 2026.</td>
<td>Do not start a new suite. OpenAI names Promptfoo as the replacement.</td>
<td>Deprecation read November 14, 2026</td>
<td><a href="https://developers.openai.com/api/docs/deprecations">Deprecations</a></td>
</tr>
<tr>
<td>SWE-bench and mini-SWE-agent 2.4.6</td>
<td>MIT (SWE-bench repo)</td>
<td>Self-host the benchmark. The harness on this site’s bash-only table is mini-SWE-agent.</td>
<td>Outcome is the repository tests. The trace is whatever the harness logs.</td>
<td>No license fee.</td>
<td>mini-SWE-agent July 23, 2026. SWE-bench repo last pushed September 18, 2026.</td>
<td><a href="https://github.com/SWE-bench/SWE-bench">Repo</a></td>
</tr>
<tr>
<td>tau2-bench v2.0.0</td>
<td>MIT</td>
<td>Self-host. Text and voice benchmarks.</td>
<td>Task reward from the environment. pass^k across trials. Judges do not change the reward.</td>
<td>No license fee. You pay the model, and voice keys if you run voice.</td>
<td>Release notes dated October 19, 2026</td>
<td><a href="https://github.com/sierra-research/tau2-bench">Repo</a></td>
</tr>
</tbody>
</table>
</div>

The libraries these runners wrap, with release tags read on a different day, are [Best AI agent frameworks](/best/ai-agent-frameworks). Star and release counts from the November 5, 2026 GitHub pull are the [framework stats report](/reports/ai-agent-framework-github-stats-november-2026). Live install counts are the [downloads tracker](/trackers/downloads). Licences and list prices for the eval products as a buying table sit on [Best AI agent evaluation tools](/best/ai-agent-evaluation-tools).

## What this means for you

Ship the code grader first, on one failure you have already paid for, inside a clean environment. Put that check on the regression suite and require the aggregate, not a single trial. Report pass^k if a person will run the task once and expect it to work. Report pass@k only if a retry is an honest part of the product. Price the gate with cost per success from a named board, and keep Terminal-Bench 4.0 and 4.1 in separate columns.

Skip the OpenAI Evals API for anything you intend to run in December. It is read-only now and shuts down November 30, 2026. Promptfoo is the replacement that page names. Harbor 0.26.0 is the runner when the task needs a container and a hidden reward. Inspect 0.3.289 is the runner when you want the sample, the sandbox, and `model_graded_qa()` in one Python process.

## Where can you read more on this site?

- The pair to this guide: [How to evaluate an AI agent harness](/blog/how-do-you-evaluate-an-ai-agent-harness), [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness)
- Terms: [harness](/glossary/harness), [harness engineering](/glossary/harness-engineering), [behavioral evaluation](/glossary/behavioral-evaluation), [benchmark](/glossary/benchmark), [guardrail](/glossary/guardrail)
- Comparisons: [Best AI agent frameworks](/best/ai-agent-frameworks), [Best AI agent evaluation tools](/best/ai-agent-evaluation-tools), [Best AI agent harness](/best/ai-agent-harnesses)
- Reports: [agent harness benchmark, November 2026](/reports/agent-harness-benchmark-november-2026), [framework GitHub stats, November 2026](/reports/ai-agent-framework-github-stats-november-2026)
- Calculator: [agent benchmark cost per solved task](/tools/agent-benchmark-cost-per-solved-task)
- Trackers: [downloads](/trackers/downloads), [harness comparison tracker](/trackers/harnesses)
- Topics: [agent harnesses](/topics/harnesses), [task performance](/topics/task-performance)

<h2 id="faq">Frequently asked questions</h2>

### What is an eval harness for AI agents?

It is the infrastructure that runs evals end to end. [Anthropic’s January 9, 2026 post](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) says it provides instructions and tools, runs tasks, records the steps, grades outputs, and aggregates results. The [agent harness](/glossary/harness) is the layer that lets the model act.

### How is an eval harness different from an agent harness?

The agent harness is the loop, tools, memory, permissions, and stop rules around a model. The eval harness tests that system. Anthropic defines both on the same page so the jobs stay distinct. The longer definition of the workshop is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness).

### Should the grader be code, a model, or a person?

Use code when a file, a test, or a database row can decide. Use a model for freeform work, and calibrate it against a person. Anthropic lists those three types and says model graders need human calibration. Harbor’s reward file is the code version of the same idea.

### What is the difference between pass@k and pass^k?

pass@k counts a success if any of k trials succeed, so more attempts raise the score. pass^k counts a success only if all k trials succeed. Anthropic’s example is a 75% per-trial rate: three trials in a row land near 42%. Customer-facing work belongs on pass^k.

### Do I need Harbor to build an eval harness?

You need a runner that matches the check. Harbor 0.26.0 fits a container, a hidden verifier, and a numeric reward. Inspect 0.3.289 fits a Python eval with a sandbox per sample. A single tool call can stay in the test suite you already have. The buying table is [Best AI agent evaluation tools](/best/ai-agent-evaluation-tools).

### Is the OpenAI Evals API still the way to grade agents?

The deprecations page, read November 14, 2026, marks that API read-only and schedules shutdown for November 30, 2026. The replacement it names is Promptfoo. The graders guide still documents string check, text similarity, a score-model grader, and Python, for teams finishing a migration.

### What does one Terminal-Bench success cost?

On the 4.0 file read November 5, 2026, the cheapest positive rate is Claude Code with GLM-5.3-Flash: $118.74 for 118 successes, $1.0063 each. The dearest positive rate is Claude Code with Sonnet 5 at max effort: $9,603.86 for 41 successes, $234.2405 each. The calculator is [agent benchmark cost per solved task](/tools/agent-benchmark-cost-per-solved-task). A partial cost stays Not listed.
