---
title: "How Do You Evaluate an AI Agent Harness? Behavioral Evals Explained (2026)"
description: "A behavioral eval checks one observable action, such as a tool call or a test run, instead of a whole benchmark score. Here is when to write one, and how a recorded failure becomes a harness fix."
takeaways:
  - "A behavioral evaluation checks one action you can see in the run, such as a search, a question, or a test command. It does not grade the whole project."
  - "An end-to-end benchmark still answers whether the job finished. Google’s September 9, 2026 post says the benchmark is the destination and the behavioral eval is the check you use while you iterate."
  - "NVIDIA’s November 4, 2026 NeMo post turns a stored failure into a test, changes one part of the harness, and scores that change on tasks the editor was not shown."
date: "2026-11-06"
updated: "2026-11-06"
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
  - openai
  - anthropic
  - langchain
  - arxiv
  - claude
  - codex
byline: "AI Agents Info Editorial"
sources:
  - title: "Taylor Mullen and Christian Gunderman, Google Developers Blog, The Anatomy of Harness Engineering (September 9, 2026)"
    url: "https://developers.googleblog.com/en/the-anatomy-of-harness-engineering-how-to-evaluate-iterate-and-guard-ai-coding-agents/"
  - title: "Patrick Moorhead, Sean Lopp, and Moon Chung, NVIDIA Technical Blog, Use NVIDIA NeMo to Turn Agent Failures into Tests and Harness Fixes (November 4, 2026)"
    url: "https://developer.nvidia.com/blog/use-nvidia-nemo-to-turn-agent-failures-into-tests-and-harness-fixes/"
  - title: "OpenAI, Harness engineering: leveraging Codex in an agent-first world (February 11, 2026)"
    url: "https://openai.com/index/harness-engineering/"
  - title: "LangChain, The Anatomy of an Agent Harness (March 10, 2026)"
    url: "https://www.langchain.com/blog/the-anatomy-of-an-agent-harness"
  - title: "Databricks, What is an AI Agent Harness? (June 17, 2026)"
    url: "https://www.databricks.com/blog/ai-harness"
  - title: "Anthropic, Effective harnesses for long-running agents (November 26, 2025)"
    url: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"
  - title: "Hong et al., HarnessFlow (arXiv:2611.06254, November 4, 2026)"
    url: "https://arxiv.org/abs/2611.06254"
  - title: "Agent Skills specification (agentskills.io, read November 6, 2026)"
    url: "https://agentskills.io/specification"
  - title: "Model Context Protocol, specification revision 2026-07-28 (read November 6, 2026)"
    url: "https://modelcontextprotocol.io/specification/2026-07-28"
faq:
  - question: "What is a behavioral evaluation of an AI agent?"
    answer: "A behavioral evaluation checks one observable action in a run. Google’s September 9, 2026 post gives the examples of asking a clarifying question, running a local validator before calling a build file done, and including canonical links in documentation. The check looks at the step, such as a tool call, rather than at whether a whole project passed."
  - question: "How is a behavioral eval different from an end-to-end benchmark?"
    answer: "A benchmark scores a frozen set of tasks. A behavioral eval scores a specific action. Google’s September 9 post says end-to-end suites such as Terminal-Bench and DeepSWE show that a score moved and usually do not show which step caused the move. The same post says the two checks work together: the benchmark is the destination, and the behavioral eval is the partner you use while you change the harness."
  - question: "When should you start evaluating an agent harness?"
    answer: "Google’s September 9 post says to dogfood first. Evals belong to the next phase, once the agent can already do routine work in its own codebase. Their purpose is confidence that a prompt change, a tool change, or a model change did not make the agent worse. NVIDIA’s November 4 post starts the written test from a failure you can already see in stored traces."
  - question: "What is NVIDIA NeMo Compass?"
    answer: "In NVIDIA’s November 4, 2026 technical post, NeMo Compass reads stored agent traces and a short file of expected behavior, then returns a backlog of recurring problems with trace IDs. NeMo Eval Author is the companion that helps a coding agent write Harbor or NeMo Gym evaluations for those problems. The post’s walkthrough then changes the harness and reruns the tests."
  - question: "What is a held-out task in an agent evaluation?"
    answer: "A held-out task is a case you keep hidden from the person or coding agent that is proposing the harness change. In NVIDIA’s November 4 example, two of four Harbor tasks were held out. The post says to accept a change when both the development tasks and the held-out tasks improve, so the edit is less likely to fit only the cases used to design it."
  - question: "Can a behavioral eval replace a benchmark such as Terminal-Bench?"
    answer: "Google’s September 9 post says no. Behavioral evals and end-to-end suites are complementary. A small check can pass while the user-facing job still fails, which is the failure Anthropic described on November 26, 2025, when an agent marked features done after unit tests or curl checks that missed end-to-end bugs. Keep a destination score and the smaller behavior checks."
  - question: "What is an agent skill in a coding harness?"
    answer: "On the Agent Skills specification, a skill is a folder whose required file is SKILL.md. The file starts with a name and a description, then instructions the agent loads when a task matches. LangChain’s March 10, 2026 harness post treats skills as a harness feature that keeps tool and MCP instructions out of the context window until they are needed."
---

Updated November 6, 2026.

## How do you evaluate an AI agent harness?

You evaluate an [agent harness](/glossary/harness) by checking the actions you expect, then checking whether the whole job still finishes.

A [behavioral evaluation](/glossary/behavioral-evaluation) watches one step you can point at in the trace: a tool call, a file edit, a clarifying question, a test command. An end-to-end [benchmark](/glossary/benchmark) scores a frozen set of tasks and tells you whether the bundle of model plus harness succeeded. [Google’s September 9, 2026 post](https://developers.googleblog.com/en/the-anatomy-of-harness-engineering-how-to-evaluate-iterate-and-guard-ai-coding-agents/) says a composite score can move a few points and still leave you unsure which step changed. The behavioral check is how you name that step.

The workshop those checks sit on is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness). Designing it on purpose is [harness engineering](/glossary/harness-engineering). The shelf for both is the [harnesses](/topics/harnesses) topic.

## What is a behavioral evaluation?

A behavioral evaluation is a test of an observable action, written the way a software team writes an integration test for a function.

Google’s September 9 post, by Taylor Mullen and Christian Gunderman, draws the contrast with a report card. Many teams hand an agent a large codebase, set a time limit, and count how many tests pass. When that score drops, the post lists the questions the score does not answer: the model may have guessed on an ambiguous prompt, skipped the test suite, or invented a command-line flag. A behavioral eval asks a smaller question:

- Given an underspecified prompt, does the agent ask a clarifying question?
- When it edits a build file, does it run the local validator before it says the edit is done?
- When it writes documentation, does it include the canonical links for the repository?

Those are harness behaviors. The [model](/glossary/llm) proposes the step. The harness offers the tools, runs the one the model picked, and records what happened. A behavioral eval reads that record.

The same idea applies outside coding agents. Any AI evaluation that scores only the final paragraph misses the path, and for an [agent](/glossary/agent) the path is the product. A chat benchmark can still grade the last answer. An agent evaluation also has to grade whether the system searched, called a [tool](/glossary/tool-use), loaded an [agent skill](/glossary/agent-skill), or stopped for a person. [Databricks’ June 17, 2026 explainer](https://www.databricks.com/blog/ai-harness) puts evaluation next to observability for that reason: at production scale you need a record of what the agent did, and a way to measure it across many runs.

A narrow check can also be the wrong check. [Anthropic’s November 26, 2025 note](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) describes agents that marked features done after unit tests or `curl` checks, while the feature still failed when someone clicked through it. The note’s response was to require browser testing, through the Puppeteer MCP, used the way a person would. A behavioral eval is only as good as the action it names. “The unit test ran” and “a person could complete the click path” are different actions.

## How does a behavioral eval differ from an end-to-end benchmark?

Google’s post treats them as a pair. Macro benchmarks verify the destination. Micro behavioral evals are the partner that lets you change a prompt, a tool, or a model without guessing.

<div class="table-scroll">
<table>
<thead>
<tr>
<th></th>
<th>Behavioral evaluation</th>
<th>End-to-end benchmark</th>
</tr>
</thead>
<tbody>
<tr>
<td>Question</td>
<td>Did this expected action happen?</td>
<td>Did the task succeed under the suite’s scoring rule?</td>
</tr>
<tr>
<td>What you read</td>
<td>A tool call, a file change, a question, or another step in the trace.</td>
<td>A score on a frozen task set. The <a href="/glossary/harness">harness</a> is part of the bundle being scored.</td>
</tr>
<tr>
<td>What a drop tells you</td>
<td>Which behavior moved. Google’s examples are a missed question, a skipped validator, or a missing link.</td>
<td>That the bundle did worse. Google names Terminal-Bench and DeepSWE as suites where a small score change is hard to explain.</td>
</tr>
<tr>
<td>How strict it should be</td>
<td>Strict when one action is the right milestone. For a task with several correct paths, Google says to avoid a rigid tool sequence and use an outcome check, including an LLM-as-a-judge.</td>
<td>The suite’s own grader. A search over whole harnesses, such as <a href="/research/harnessflow-mcts-harness-optimization">HarnessFlow</a>, lives at this end of the scale.</td>
</tr>
<tr>
<td>What it is for</td>
<td>Iteration and regression checks while you edit the harness.</td>
<td>A destination measurement. Google says behavioral evals do not replace it.</td>
</tr>
</tbody>
</table>
</div>

[LangChain’s March 10, 2026 anatomy post](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness) is the public reminder that the destination score still moves when only the harness changes. The company wrote that a harness-only change took one of its coding agents from the top 30 to the top 5 on Terminal-Bench 2.0. That is LangChain’s account of a leaderboard on that date. It is also why a single headline number is a poor debugging tool: the score moved, and a behavioral suite is how you would ask which new behavior carried it.

A research search sits on the benchmark side. [HarnessFlow](/research/harnessflow-mcts-harness-optimization), arXiv:2611.06254, posted November 4, 2026, keeps the model fixed and searches for a better executable harness. This site’s breakdown, checked the same day as this guide, reports the authors’ average of 69.48 percent across six benchmarks after 15 refinement attempts each, 10.89 points above the starting harness and 3.95 points above the Meta-Harness rerun in that paper. Those are automatic grades of whole runs. They answer a different question from “did the agent call search before it answered.”

The same-model lesson, with the measurement and its limits, is in [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness). Hold the harness still when you compare models, or say that you did not.

## When do you start evaluating a harness?

Start after the agent can already do ordinary work, and start with one repeated mistake.

Google’s post says not to build a large evaluation system on day one. The first phase is developer instinct and dogfooding: use the agent on its own codebase, on boilerplate, and on routine tasks. Until that works, a score is ahead of the system. Evals are the second phase. Their job is confidence that a prompt tweak, a tool-schema change, or a model upgrade did not make the agent worse. The post says the point is not celebrating a 2 percent gain.

NVIDIA’s [November 4, 2026 post](https://developer.nvidia.com/blog/use-nvidia-nemo-to-turn-agent-failures-into-tests-and-harness-fixes/) starts from the other direction, once traces exist. Generic benchmark scores may not explain a domain failure: the wrong tool, the wrong branch, missing context, a model that was more expensive than the step required, or a task that finished without meeting a domain rule. The post’s order is: find the failure in stored traces, write a test that reproduces it, change the harness, and measure again.

You can write tests before production traffic. NVIDIA says NeMo Eval Author can draft evaluations from a requirements file and from the code, including tool definitions, before real traces exist. Once failures show up in logs, those tests should grow to match the work the agent actually does.

Anthropic’s long-running note is a third clock. The eval that matters there is the definition of done. A feature list, stored as JSON with `"passes": false`, stops a later session from declaring the project finished because some of it exists. That list is a harness artifact. The behavioral question is whether the agent flipped a feature to passing only after the check you named.

## How is a behavioral eval written?

Google’s September 9 post prints one example and a three-step loop. This section describes that example. It does not add an API beyond what the post shows.

The example is a Python test. It imports `Agent`, `LocalAgentConfig`, and `types` from a module path the post writes as `google.antigravity`. The test asks an agent for the weather in Mountain View, California, collects the names of the tool calls on the reply, and asserts that a built-in web-search tool is among them. The assertion message says the agent answered from memory without consulting live search. The comment above the assertion is the design rule: assert the behavior, not the prose of the answer.

The post then suggests a loop in which a model edits its own system prompt until a failing test passes, while the rest of the suite guards the behaviors you already care about. That is a suggestion on the blog. It is not a separate product this page can point to.

The three-step loop on the same page:

1. Pick one failure. Use a recent mistake, such as marking a task done without running unit tests. Name one action that slipped.
2. Match the assertion to the task. If one milestone is the right behavior, assert that milestone on a single turn, for example that the test runner was called. If several paths would be correct, do not lock the tool order. Use an outcome check. The post names an LLM-as-a-judge as one fuzzier check.
3. Run the suite in batches. A single run is noisy, because model output varies. The post says to avoid blocking a pull request on one run, to collect a larger batch, and to watch the aggregate pass rate. The shell block on the page is `pytest evals/behavioral/ -v`, with a comment that the local suite runs in under five seconds. Treat that comment as the post’s illustration of a fast local check.

Two harness features show up in the thing you might assert, and they have their own glossary entries. An [agent skill](/glossary/agent-skill) is a `SKILL.md` file a coding harness can load when a task matches its description. The [Model Context Protocol](/glossary/model-context-protocol) is the open protocol for connecting an agent to external tools. [LangChain’s March post](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness) lists tools, skills, and MCP servers as harness parts, and it says skill front matter is loaded at the start so the full instructions stay out of context until they are needed. A behavioral eval can ask whether the agent used the skill or the connector you expected. The assertion still has to allow another correct path when the task has one.

## How do you turn a failure into a harness fix?

NVIDIA’s November 4 post, by Patrick Moorhead, Sean Lopp, and Moon Chung, walks through one cycle with NVIDIA NeMo. The blueprint it points to is NemoClaw for agent optimization. The example agent is a Hermes assistant for a fictional company, running in an NVIDIA OpenShell sandbox, connected through MCP to chat, email, files, and tickets.

The post says the blueprint uses three libraries: NeMo Compass, NeMo Eval Author, and NVIDIA NeMo Relay. The walkthrough below is the part the post actually demonstrates: Compass, Eval Author, a harness edit, and a rerun.

The failure they start from is specific. Asked to draft a message with project updates, the agent drafted the message and also called `send_message` without the user confirming the send.

NeMo Compass reads stored traces plus a short expected-behavior file, `ETHOS.md`. In the example, Compass was pointed at 42 traces. It groups signals about unusual behavior, tool use, and divergence from the intended rules, and it returns trace IDs for the runs behind each finding. NVIDIA says an internal run of the full signal set, on thousands of traces, found anomalies that a coding agent given a similar task missed. That is the company’s comparison.

NeMo Eval Author is the next step. The post says it provides skills and workflows for a coding agent such as Codex or Claude Code, and that it can write evaluations in Harbor format or in NVIDIA NeMo Gym format. You hand the coding agent the Compass findings, the raw traces, `ETHOS.md`, and the agent repository, then review what it writes. In the example it produced four Harbor tasks similar to “draft a response,” plus a verifier that fails the run if `send_message` was called without human confirmation.

The harness edit in the example is one instruction in the Hermes agent’s `SOUL.md`, which the post calls a Hermes concept similar to a system prompt. The new line says a request to write, draft, compose, prepare, or suggest a message authorizes the draft only. The agent should show the draft and stop before sending. A token returned by a preparation tool is the technical ability to act, and it is not the user’s consent. The post says other harness edits can be middleware or plugins. This one is a prompt-level rule inside the harness.

They then reran the four tasks. Two tasks, marked held out, were hidden from the coding agents that proposed the change.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Evaluation set</th>
<th>Baseline passes / runs</th>
<th>Updated agent</th>
<th>Tool calls, before to after</th>
</tr>
</thead>
<tbody>
<tr>
<td>Development, 2 tasks × 3 runs</td>
<td>3/6</td>
<td>6/6</td>
<td>10 to 6</td>
</tr>
<tr>
<td>Held out, 2 tasks × 3 runs</td>
<td>4/6</td>
<td>6/6</td>
<td>28 to 15</td>
</tr>
</tbody>
</table>
</div>

Those twelve runs are the example, not a production suite. The post says the team started narrow, on the Compass finding, and that production suites in their experience often hold hundreds to a few thousand examples. Accept a change when it helps both the development cases and the held-out set. If the result is mixed, run Compass on the new traces and keep the held-out cases hidden from the next edit.

A second pass on the updated traces dropped the send-without-confirmation finding and surfaced a different one: the agent sometimes had the answer and failed to ground the reply in the retrieved evidence. The post treats that as the next loop, not as a finished agent.

The same post applies the loop to a harder engineering example. LEO, the engineering Virtual Companion from Dassault Systèmes, proposes car-door design changes and tests them in simulation. Compass found `QueryModel` arguments placed outside the expected `options` field, with an empty error, across multiple traces. A coding agent added a validation step that catches misplaced arguments. NVIDIA reports malformed tool calls falling from 142 to zero, with accuracy unchanged and no regressions on the other scenarios. An unattended overnight pass of about 12 hours, across six scenarios, is reported as a 28 percent relative improvement in the overall evaluation score and 35 percent fewer tool calls per run. Those figures are NVIDIA’s account of that example.

The post’s setup list, for readers who want the version pins, is a Linux machine running Docker, with Ubuntu 24.04, 8 vCPUs, and 32 GB of RAM recommended. It names OpenShell 0.1.2, Harbor 0.22.0, an NVIDIA API key from build.nvidia.com, and a coding agent Eval Author supports, such as Codex or Claude Code. Confirm those versions on the post before you install anything. This guide does not re-run the blueprint.

## How does evaluation fit harness engineering?

[Harness engineering](/glossary/harness-engineering) is the work of designing the loop, the tools, the memory, the permissions, and the stop rules. Evaluation is how you tell whether a change to that design helped.

[OpenAI’s February 11, 2026 post](https://openai.com/index/harness-engineering/) describes the human job on one internal project as specifying intent, shaping the repository and the tools, and building feedback loops so agents could do the implementation. The authors say a missing capability had to be made legible and enforceable. A behavioral eval is one way to make a failure legible: the test fails until the harness, not a plea to “try harder,” produces the action you named. The longer account of that post is the [harness guide](/blog/what-is-an-ai-agent-harness).

LangChain’s March post puts the same split in one line: if you are not the model, you are the harness. It also names an open problem that matches the NVIDIA loop: agents that read their own traces and fix harness-level failures. Compass is a published tool for the reading step. The post still has a person review the generated tests and the harness edit. The two pages are describing the same kind of work from different ends.

A [guardrail](/glossary/guardrail) is the check that allows, blocks, or pauses an action in production. A behavioral eval is the measurement that the action did or did not happen. The `SOUL.md` line in NVIDIA’s example is a harness instruction. A confirmation step before `send_message` would be a guardrail. The eval tells you whether runs still send without a person. It does not, by itself, stop the send.

[Computer use](/blog/can-an-ai-agent-use-your-computer) is a case where the action is a click. The behavioral question is whether the agent asked before a payment, a password, or another hard-to-undo step. The safety rules on that guide are the harness controls. An eval would record whether those controls held.

## What should you write down before the first eval?

1. Name one failure you have already seen, in a trace or in dogfooding. Google’s first step and NVIDIA’s Compass step are the same habit.
2. Write the action that should have happened, in one sentence. “Called the test runner” is an action. “Did a good job” is not.
3. Decide whether that action is the only acceptable path. If it is not, score the outcome and leave the tool order free.
4. Keep at least one case out of the edit. NVIDIA’s held-out tasks are the short version.
5. Rerun the older checks after the harness change. A fix that creates a new failure is still a failure.
6. Keep a destination score for the job you actually care about. Google’s post is explicit that behavioral evals complement end-to-end suites.

The [how agents work](/topics/how-agents-work) topic is the loop in general. [Task performance](/topics/task-performance) is where this site follows coding, computer use, and other jobs an agent finishes. [Research](/topics/research) is the shelf for papers that grade a harness, including [HarnessFlow](/research/harnessflow-mcts-harness-optimization).

## Where can you read more on this site?

- This guide’s terms: [behavioral evaluation](/glossary/behavioral-evaluation), [agent skill](/glossary/agent-skill), [Model Context Protocol](/glossary/model-context-protocol)
- Harness hub: [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness), [harness](/glossary/harness), [harness engineering](/glossary/harness-engineering), [benchmark](/glossary/benchmark), [guardrail](/glossary/guardrail), [tool use](/glossary/tool-use)
- Research: [HarnessFlow](/research/harnessflow-mcts-harness-optimization)
- Nearby guides: [Can an AI agent use your computer?](/blog/can-an-ai-agent-use-your-computer), [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing)
- Topics: [harnesses](/topics/harnesses), [how agents work](/topics/how-agents-work), [task performance](/topics/task-performance), [research](/topics/research)
- Report: [harness benchmark, November 2026](/reports/agent-harness-benchmark-november-2026)

## Frequently asked questions

### What is a behavioral evaluation of an AI agent?

It is a test of one observable action. [Google’s September 9, 2026 post](https://developers.googleblog.com/en/the-anatomy-of-harness-engineering-how-to-evaluate-iterate-and-guard-ai-coding-agents/) uses asking a clarifying question, running a validator before calling a build file done, and including canonical documentation links. The [glossary entry](/glossary/behavioral-evaluation) is the short definition. The check reads the step, such as a tool call, rather than grading an entire project.

### How is a behavioral eval different from an end-to-end benchmark?

A [benchmark](/glossary/benchmark) scores a frozen task set. A behavioral eval scores a specific action. Google says suites such as Terminal-Bench and DeepSWE show that a score moved and usually do not show which step moved it. The table above is the comparison. Google also says the behavioral check does not replace the destination score.

### When should you start evaluating an agent harness?

After the agent can do routine work, and then on one repeated mistake. Google says dogfooding comes first, and evals are the phase that guards against regressions from prompt, tool, and model changes. NVIDIA’s November 4 post writes the test from a failure already present in stored traces.

### What is NVIDIA NeMo Compass?

In the November 4, 2026 technical post, NeMo Compass reads stored traces and a file of expected behavior, then returns recurring problems with the trace IDs behind them. NeMo Eval Author helps a coding agent turn a finding into a Harbor or NeMo Gym evaluation. The harness change comes after that test exists. The NemoClaw blueprint is the walkthrough NVIDIA points to.

### What is a held-out task in an agent evaluation?

It is a case hidden from the editor of the harness. NVIDIA withheld two of four example tasks from the coding agents that proposed the `SOUL.md` change. The post says to keep those cases hidden on later rounds, and to adopt a change when both the development tasks and the held-out tasks improve.

### Can a behavioral eval replace a benchmark such as Terminal-Bench?

Google says the two are complementary. A small check can pass while the job a person would attempt still fails. Anthropic’s November 26, 2025 note is that case: features marked done after unit tests or `curl` checks that missed end-to-end bugs. Use the behavioral suite to iterate, and keep an end-to-end score for the destination. [HarnessFlow](/research/harnessflow-mcts-harness-optimization) is this site’s breakdown of one paper that grades whole harnesses.

### What is an agent skill in a coding harness?

A skill is a folder with a `SKILL.md` file: a name, a description, and instructions the agent loads when a task matches. The open format is the [Agent Skills specification](https://agentskills.io/specification). [LangChain](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness) treats skills as part of the harness, loaded in stages so unused MCP and tool instructions do not fill the context window. The glossary entry is [agent skill](/glossary/agent-skill).
