---
title: "How to Build an Eval Harness for AI Agents: Isolate First"
description: "How to build an eval harness for AI agents: write tasks with checkable outcomes, isolate every trial, grade the environment, and keep a held-out set. Harbor, Inspect, and a local pytest suite are three ways to run that loop."
takeaways:
  - "An eval harness is the infrastructure that runs tasks, records traces, grades the result, and aggregates trials. It is not the same as the agent harness around the model."
  - "Anthropic’s January 9, 2026 evals post says each trial should start from a clean environment. Shared git history from earlier trials can inflate a score."
  - "Google’s September 9, 2026 post and NVIDIA’s September 21, 2026 post treat step checks and end-to-end outcome checks as a pair. Gate a release on the environment state, and keep the step trace to name the failure."
date: "2026-11-09"
updated: "2026-11-10"
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
  - title: "Anthropic, Demystifying evals for AI agents (January 9, 2026)"
    url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"
  - title: "Taylor Mullen and Christian Gunderman, Google Developers Blog, The Anatomy of Harness Engineering (September 9, 2026)"
    url: "https://developers.googleblog.com/en/the-anatomy-of-harness-engineering-how-to-evaluate-iterate-and-guard-ai-coding-agents/"
  - title: "Sophia Abbassi, Chris Alexiuk, Davide Onofrio, and Gomathy Venkata Krishnan, NVIDIA Technical Blog, How to Evaluate AI Agents From Tool Calls to Task Completion (September 21, 2026)"
    url: "https://developer.nvidia.com/blog/how-to-evaluate-ai-agents-from-tool-calls-to-task-completion/"
  - title: "Patrick Moorhead, Sean Lopp, and Moon Chung, NVIDIA Technical Blog, Use NVIDIA NeMo to Turn Agent Failures into Tests and Harness Fixes (dated November 4, 2026; re-read November 10, 2026)"
    url: "https://developer.nvidia.com/blog/use-nvidia-nemo-to-turn-agent-failures-into-tests-and-harness-fixes/"
  - title: "PyPI JSON for harbor 0.25.0 (read November 10, 2026)"
    url: "https://pypi.org/pypi/harbor/json"
  - title: "GitHub REST API, harbor-framework/harbor releases/latest (read November 10, 2026)"
    url: "https://api.github.com/repos/harbor-framework/harbor/releases/latest"
  - title: "Harbor Framework README (read November 9, 2026)"
    url: "https://github.com/harbor-framework/harbor"
  - title: "Harbor docs, Task overview (read November 9, 2026)"
    url: "https://docs.harborframework.com/tasks/overview"
  - title: "Harbor docs, Create a task (read November 9, 2026)"
    url: "https://docs.harborframework.com/tutorials/create-a-task"
  - title: "Harbor docs, Verifier (read November 9, 2026)"
    url: "https://docs.harborframework.com/tasks/verifier"
  - title: "UK AI Security Institute, Inspect sandboxes (read November 9, 2026)"
    url: "https://inspect.aisi.org.uk/extensions-sandboxes.html"
  - title: "LangChain, The Anatomy of an Agent Harness (March 10, 2026)"
    url: "https://www.langchain.com/blog/the-anatomy-of-an-agent-harness"
  - title: "Databricks, What is an AI Agent Harness? (June 17, 2026)"
    url: "https://www.databricks.com/blog/ai-harness"
  - title: "OpenAI, Harness engineering: leveraging Codex in an agent-first world (February 11, 2026)"
    url: "https://openai.com/index/harness-engineering/"
  - title: "Hong et al., HarnessFlow (arXiv:2611.06254, November 4, 2026)"
    url: "https://arxiv.org/abs/2611.06254"
faq:
  - question: "What is an eval harness for AI agents?"
    answer: "An evaluation harness is the infrastructure that runs evals end to end. Anthropic’s January 9, 2026 post says it provides instructions and tools, runs tasks, records the steps, grades outputs, and aggregates results. It is not the agent harness that lets the model call tools in production."
  - question: "How is an eval harness different from an agent harness?"
    answer: "The agent harness is the loop, tools, memory, permissions, and stop rules around a model. The eval harness is the workshop that tests that system: tasks, isolated trials, graders, and a report. Anthropic uses both phrases on the same page so the two jobs stay distinct."
  - question: "What should the first task in an eval harness check?"
    answer: "One failure you have already seen, with a grader that can read an environment state or a tool call. Google’s September 9, 2026 post starts with one missed action. NVIDIA’s November 4, 2026 NeMo walkthrough writes the first Harbor tasks from a stored send-without-confirmation failure."
  - question: "Do I need Harbor to build an eval harness?"
    answer: "No. Harbor is one format, from the Terminal-Bench authors, with a task folder, a verifier script, and a numeric reward. Inspect runs each sample in its own sandbox. Google’s September 9 post shows a local pytest assertion on a tool call. Pick the runner that matches the check."
  - question: "Should an eval harness grade the transcript or the final state?"
    answer: "Both, for different jobs. NVIDIA’s September 21, 2026 post uses step-level scoring to name where a chain broke, and end-to-end scoring to ask whether the environment reached the goal. It says most production evals gate the release on the outcome and keep the step trace for debugging."
  - question: "How do you keep an eval harness from overfitting?"
    answer: "Keep cases the editor did not see. NVIDIA’s November 4 post hid two of four Harbor tasks from the coding agents that proposed a harness edit, and says to accept a change when both the development tasks and the held-out tasks improve. Google says a behavioral check still does not replace an end-to-end destination score."
---

Updated November 10, 2026. NVIDIA’s November 4 post still names Harbor 0.22.0 and OpenShell 0.1.2 in its prerequisites. PyPI’s `harbor` package the same day was 0.25.0, uploaded October 25, 2026.

## What is an eval harness for AI agents?

An eval harness is the infrastructure that runs the tests: it starts a task, gives the agent tools and an environment, records the trace, grades the result, and rolls trials into a report.

[Anthropic’s January 9, 2026 post](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) uses that wording. It defines a **task** as one test with inputs and success criteria, a **trial** as one attempt at that task, a **grader** as the logic that scores a transcript or an outcome, and an **evaluation harness** as the system that runs those pieces end to end. The companion object is the [agent harness](/glossary/harness): the loop that lets the model act. This page is about building the first object. How to choose the checks once it exists is [How to evaluate an AI agent harness](/blog/how-do-you-evaluate-an-ai-agent-harness). What the workshop around the model is, in the first place, is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness).

You do not need a public leaderboard to start. Google’s [September 9, 2026 post](https://developers.googleblog.com/en/the-anatomy-of-harness-engineering-how-to-evaluate-iterate-and-guard-ai-coding-agents/) says evals belong after dogfooding, and that their job is confidence a prompt, tool, or model change did not make the agent worse. NVIDIA’s [September 21, 2026 post](https://developer.nvidia.com/blog/how-to-evaluate-ai-agents-from-tool-calls-to-task-completion/) says a public suite can set a floor, then a domain eval from your tickets and APIs becomes the release gate.

## How is an eval harness different from an agent harness?

The agent harness runs the job. The eval harness scores whether that job, or one step inside it, happened.

Anthropic’s January 9 post puts the split in one list. An **agent harness** (it also says scaffold) processes inputs, orchestrates tool calls, and returns results. When you evaluate “an agent,” you are evaluating the harness and the model together. Claude Code is named there as a flexible agent harness. An **evaluation harness** is the other layer: instructions, tools, concurrency, recording, grading, and aggregation.

This site uses the same split. [LangChain’s March 10, 2026 anatomy post](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness) and [Databricks’ June 17, 2026 explainer](https://www.databricks.com/blog/ai-harness) describe the agent as model plus harness. Choosing among three of those libraries, with versions and bills checked November 10, 2026, is [LangGraph vs CrewAI vs OpenAI Agents SDK](/blog/langgraph-vs-crewai-vs-openai-agents-sdk). [OpenAI’s February 11, 2026 harness-engineering post](https://openai.com/index/harness-engineering/) is about designing that surrounding system so agents can implement. The eval harness is how you find out whether a change to that system helped. Designing the agent side is [harness engineering](/glossary/harness-engineering). Scoring one visible action is a [behavioral evaluation](/glossary/behavioral-evaluation). Scoring a frozen task set is a [benchmark](/glossary/benchmark).

If you mix the two words, a SWE-bench row looks like a product ranking. The [November 2026 harness benchmark](/reports/agent-harness-benchmark-november-2026) copies official boards and keeps the harness name on the row for that reason.

## What parts does an eval harness need?

It needs a task, an isolated environment, a runner for the real agent, a trace, a grader, and a way to aggregate more than one trial.

NVIDIA’s September 21 post rolls a run up as benchmark → trial → task → turn → step. A **trial** is one pass over the task set under a fixed configuration. A **task** is one scorable instance. A **turn** is one exchange. A **step** is one action inside that turn, usually a tool call. Anthropic’s January 9 list matches: task, trial, grader, transcript, outcome, evaluation harness, evaluation suite.

The pieces you have to build, in that vocabulary:

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Part</th>
<th>What it holds</th>
<th>A public description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Task</td>
<td>Goal, starting state, success rule</td>
<td>Anthropic: a test with inputs and success criteria. Harbor’s <a href="https://docs.harborframework.com/tasks/overview">task overview</a> stores that as <code>instruction.md</code>, <code>task.toml</code>, <code>environment/</code>, and <code>tests/</code>.</td>
</tr>
<tr>
<td>Isolated trial</td>
<td>A fresh machine or workspace</td>
<td>Anthropic: start from a clean environment. Inspect’s <a href="https://inspect.aisi.org.uk/extensions-sandboxes.html">sandbox page</a> says the Docker provider runs each sample in a container, with <code>sample_init</code> at the start of the sample.</td>
</tr>
<tr>
<td>Agent runner</td>
<td>The same loop users get</td>
<td>Anthropic: the agent in the eval should function roughly the same as the production agent. Harbor’s README evaluates agents such as Claude Code, OpenHands, and Codex CLI.</td>
</tr>
<tr>
<td>Transcript</td>
<td>Ordered log of the attempt</td>
<td>NVIDIA: user message, each step, environment state when the attempt stops. Anthropic also says trace or trajectory.</td>
</tr>
<tr>
<td>Grader</td>
<td>Code, a model rubric, or a person</td>
<td>Anthropic’s three types: code-based, model-based, and human. Harbor’s verifier writes a number to <code>/logs/verifier/reward.txt</code> or <code>reward.json</code>.</td>
</tr>
<tr>
<td>Aggregation</td>
<td>More than one trial, then a report</td>
<td>Google: do not block a pull request on one noisy run; watch the aggregate pass rate. NVIDIA: report a range across 3–5 trials, not a point estimate.</td>
</tr>
</tbody>
</table>
</div>

A [guardrail](/glossary/guardrail) is not a grader. The guardrail allows, blocks, or pauses an action in production. The grader tells you, after the fact, whether the action happened.

## How do you write a task the grader can check?

Write a goal, a fixture for the starting state, and a check that reads the environment or a tool call, not the agent’s closing sentence.

Anthropic’s January 9 post is blunt about the last part. A flight-booking agent can say “Your flight has been booked.” The **outcome** is whether a reservation exists in the environment’s database. NVIDIA’s September 21 post says the same for a refund, a ticket, or a merged pull request: gate on environment state, not a judge’s opinion of the final message. Google’s September 9 example asserts that a web-search tool was called for live weather, and the comment on the assertion is “Assert behavior, not output prose.”

Harbor’s [create-a-task tutorial](https://docs.harborframework.com/tutorials/create-a-task), read November 9, 2026, generates a folder with `instruction.md`, `task.toml`, an `environment/Dockerfile`, a `solution/solve.sh`, and `tests/test.sh` plus pytest. The [verifier page](https://docs.harborframework.com/tasks/verifier) says `tests/test.sh` runs after the agent, and that it must write a numeric reward. The tutorial’s script runs pytest and writes `1` or `0` to `/logs/verifier/reward.txt`. That is an outcome check. A [behavioral](/glossary/behavioral-evaluation) check is smaller: Google’s pytest reads the tool-call names on one reply.

Start with one failure you have already seen. Google’s first step is that. NVIDIA’s [November 4, 2026 NeMo post](https://developer.nvidia.com/blog/use-nvidia-nemo-to-turn-agent-failures-into-tests-and-harness-fixes/) starts from stored traces: an agent drafted a message and also called `send_message` without confirmation. NeMo Eval Author then wrote four Harbor tasks and a verifier that fails the run if that send happened. The longer walkthrough of that cycle is the [evaluation guide](/blog/how-do-you-evaluate-an-ai-agent-harness).

If several correct paths exist, do not freeze the tool order. Google says to use an outcome check, including an LLM-as-a-judge, when a rigid sequence would punish a valid path. NVIDIA’s September 21 post treats LLM-as-a-judge as provisional until you validate it against human ratings on a sample. Anthropic says model-based graders need calibration with human graders.

## How do you keep trials isolated?

Give every trial a fresh environment, and keep earlier git history, files, and caches out of it.

Anthropic’s January 9 post says each trial should be isolated by starting from a clean environment. Leftover files, cached data, and resource exhaustion can make failures correlate with the infrastructure instead of the agent. Shared state can also inflate a score. The example the post gives is internal evals where Claude gained an unfair advantage by examining the git history from previous trials.

Inspect’s sandbox docs describe the same habit in code. The built-in Docker environment “runs each sample within a Docker container.” Lifecycle methods split expensive setup (`task_init`, such as pulling an image) from per-sample work (`sample_init` at the beginning of each sample, `sample_cleanup` at the end). Harbor’s task overview calls tasks independent, isolated, and reproducible, and it starts an environment, lets the agent act, stops the environment, then runs the verifier.

NVIDIA’s November 4 post recommends a Linux machine with Docker for its NemoClaw walkthrough. Re-read on November 10, 2026, that post still names OpenShell 0.1.2 and Harbor 0.22.0 in the prerequisites. The same day, the PyPI project `harbor` was at 0.25.0, uploaded 2026-10-25T20:27:25Z, and GitHub’s latest release for `harbor-framework/harbor` was `v0.25.0`, published at the same minute. The post’s pin and the registry’s latest release are different numbers. This page does not re-run the blueprint. The isolation rule does not depend on either pin: a new container or workspace per trial, and the solution and hidden tests kept out of the agent’s reach. Harbor’s verifier docs say that, without a dedicated verifier image, Harbor starts a fresh copy of the agent environment and uploads `tests/` to `/tests/`, and that the agent’s filesystem changes are not inherited.

Record the settings with the report: model id, agent version, CPU, memory, timeout. NVIDIA’s September 21 post lists cost per success and steps per success beside the pass rate. Two runs that used different limits are not the same experiment.

## Should you grade the steps, the outcome, or both?

Grade the outcome to decide whether the job finished. Grade the steps to name which action failed.

NVIDIA’s September 21 post calls those **process scoring** and **E2E (outcome) scoring**. Process scoring asks whether a call was valid, relevant, and useful at that point. Outcome scoring ignores the path and reads the final state. It says most production evals gate the release on the outcome and keep step-level traces for debugging. Google’s September 9 post says the same pairing in different words: macro benchmarks verify the destination; micro behavioral evals are the partner while you change a prompt, a tool, or a model.

Anthropic’s January 9 post adds a third distinction that belongs in the suite design, not in a single grader. **Capability evals** ask what the agent can do, and should start at a low pass rate. **Regression evals** ask whether it still handles what it used to, and should sit near a full pass rate. When a capability task saturates, it can graduate into the regression suite.

A published board is an outcome suite with someone else’s tasks. The [November 2026 harness benchmark](/reports/agent-harness-benchmark-november-2026) copies SWE-bench Verified and Terminal-Bench 4.0 from the official files. Harbor’s README, read November 9, 2026, says Harbor is the official harness for Terminal-Bench 2.0. Those are different editions. Do not treat a 2.0 Harbor run as a row on this site’s 4.0 table.

## When should you use Harbor, Inspect, or a local pytest suite?

Use a local pytest assertion when one action is the whole question. Use Harbor when the task needs a container, a hidden verifier, and a numeric reward. Use Inspect when you already want its sample-level Docker (or another) sandbox inside a Python eval.

Harbor is a framework from the Terminal-Bench authors. The README, read November 9, 2026, says you can evaluate agents such as Claude Code, OpenHands, and Codex CLI, build and share benchmarks, and run environments in parallel through named providers. A task is a directory. The verifier script owns the score. NVIDIA’s November 4 post says NeMo Eval Author can write evaluations in Harbor format or in NVIDIA NeMo Gym format.

Inspect, from the UK AI Security Institute, is one of the libraries on [Best AI agent evaluation tools](/best/ai-agent-evaluation-tools). Its sandbox page documents `local` (same filesystem, only if you are already inside another sandbox) and `docker` (a container per sample). That page is about how the environment is created. It is not a Harbor replacement, and it is not a pytest replacement.

Google’s September 9 post stays on pytest: `pytest evals/behavioral/ -v`, with a comment that the local suite runs in under five seconds. Treat that comment as the post’s illustration of a fast check, not as a promise about your suite. The Python example imports `Agent` from a module path the post writes as `google.antigravity`. This page does not add an API beyond that example.

You can run more than one of these. A behavioral pytest suite for iteration, and a Harbor or Inspect outcome suite for the destination, matches Google’s complementary pairing. Tools that wrap those checks, with licences and list prices, stay on the evaluation comparison. The runtimes they wrap stay on [Best AI agent harness](/best/ai-agent-harnesses).

## How do you stop the suite from overfitting?

Keep at least one case out of the edit, and keep a destination score the editor is not allowed to chase on every commit.

NVIDIA’s November 4 example produced four Harbor tasks. Two were marked held out and hidden from the coding agents that proposed the `SOUL.md` change. The post says to accept a change when both the development tasks and the held-out tasks improve. If the result is mixed, it says to run Compass on the new traces and keep the held-out cases hidden from the next edit. Those twelve runs (two tasks × three runs, twice) are the example, not a production suite. The post says production suites in their experience often hold hundreds to a few thousand examples.

[HarnessFlow](/research/harnessflow-mcts-harness-optimization) (arXiv:2611.06254, posted November 4, 2026) is the research version of the same habit at benchmark scale: search over harness code against a validation split, then score once on a held-out test set. The numbers in that paper stay on the research note. The design rule that travels is: the test the editor can see is not the test you use to claim a win.

Google’s September 9 post is the other brake. A behavioral suite can pass while the user-facing job still fails. Anthropic’s [November 26, 2025 note](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents), already walked through on the evaluation guide, is that case: features marked done after unit tests or `curl` checks that missed a click path. Keep the small check, and keep an end-to-end score for the job you ship.

Contamination is a third leak. NVIDIA’s September 21 post says web-searching agents can retrieve answer keys during evaluation, and that private domain evals avoid that by being unable to scrape. Harbor’s verifier docs keep tests out of the agent environment unless you choose shared verification. Inspect’s Docker sample is a new container. None of those is a claim about a vendor’s training data.

## What should you write down before the first run?

Write down one failure, the check that would have caught it, how a trial is reset, and which cases stay hidden.

1. Name one failure you have already seen. Google’s dogfooding step and NVIDIA’s Compass step both start there.
2. Write the success rule in one sentence that a grader can execute. “A reservation row exists” is a rule. “It booked the flight well” is not.
3. Decide whether that rule is an action (tool call, file edit) or an outcome (tests pass, database row, merged pull request). Keep the other as a debug signal.
4. Say how a trial is reset. Anthropic’s git-history example is the failure mode to design against.
5. Keep at least one case out of the edit. NVIDIA’s held-out Harbor tasks are the short version.
6. Run more than one trial before you treat a pass rate as a gate. Google warns that a single run is noisy. NVIDIA’s September 21 table reports consistency as a range across 3–5 trials.
7. Hold the [agent harness](/glossary/harness) still when you compare models, or write down that you did not. The same-model lesson is in [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness).

Live install and download counts for the libraries around this work sit on the [trackers](/trackers) and the [downloads tracker](/trackers/downloads). A token bill for the model inside a trial is the [agent cost calculator](/agent-cost-calculator). If you ship an evaluation product, [submit it](/submit) or claim its [directory](/directory) page. No login.

## Where can you read more on this site?

- This guide’s pair: [How to evaluate an AI agent harness](/blog/how-do-you-evaluate-an-ai-agent-harness), [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness)
- Terms: [harness](/glossary/harness), [harness engineering](/glossary/harness-engineering), [behavioral evaluation](/glossary/behavioral-evaluation), [benchmark](/glossary/benchmark), [guardrail](/glossary/guardrail), [agent loop](/glossary/agent-loop)
- Comparisons: [Best AI agent evaluation tools](/best/ai-agent-evaluation-tools), [Best AI agent harness](/best/ai-agent-harnesses)
- Report: [agent harness benchmark, November 2026](/reports/agent-harness-benchmark-november-2026)
- Research: [HarnessFlow](/research/harnessflow-mcts-harness-optimization), [Garry Tan harness evals](/research/garry-tan-harness-evals-november-2026), [Terminal-Bench 2.1](/research/terminal-bench-2-1-benchmark-repairs)
- At organization scale: [What is harness engineering at scale?](/blog/what-is-harness-engineering-at-scale-thoughtworks-radar)
- Trackers: [live trackers](/trackers), [framework downloads](/trackers/downloads), [harness comparison tracker](/trackers/harnesses)
- Topics: [agent harnesses hub](/topics/harnesses), [how agents work](/topics/how-agents-work), [task performance](/topics/task-performance)

<h2 id="faq">Frequently asked questions</h2>

### What is an eval harness for AI agents?

It is the infrastructure that runs evals end to end. [Anthropic’s January 9, 2026 post](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) says it provides instructions and tools, runs tasks, records the steps, grades outputs, and aggregates results. The [agent harness](/glossary/harness) is the other layer, the one that lets the model act.

### How is an eval harness different from an agent harness?

The agent harness is the loop, tools, memory, permissions, and stop rules around a model. The eval harness is the workshop that tests that system. Anthropic uses both phrases so the two jobs stay distinct. The longer definition of the workshop is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness).

### What should the first task in an eval harness check?

One failure you have already seen, with a grader that can read an environment state or a tool call. Google’s September 9, 2026 post starts with one missed action. NVIDIA’s November 4, 2026 post writes the first Harbor tasks from a stored send-without-confirmation failure. The cycle is [How to evaluate an AI agent harness](/blog/how-do-you-evaluate-an-ai-agent-harness).

### Do I need Harbor to build an eval harness?

No. Harbor is one format, from the Terminal-Bench authors, with a task folder and a numeric reward. Inspect runs each sample in its own sandbox. Google’s September 9 post shows a local pytest assertion on a tool call. The sourced tool table is [Best AI agent evaluation tools](/best/ai-agent-evaluation-tools).

### Should an eval harness grade the transcript or the final state?

Both, for different jobs. NVIDIA’s September 21, 2026 post uses step-level scoring to name where a chain broke, and end-to-end scoring to ask whether the environment reached the goal. It says most production evals gate the release on the outcome.

### How do you keep an eval harness from overfitting?

Keep cases the editor did not see. NVIDIA hid two of four Harbor tasks from the agents that proposed a harness edit, and says to adopt a change when both the development set and the held-out set improve. Google says a behavioral check still does not replace a destination score. Dated public boards stay on the [November 2026 harness benchmark](/reports/agent-harness-benchmark-november-2026).
