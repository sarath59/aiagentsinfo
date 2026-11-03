---
title: "What is an AI agent harness?"
description: "A plain-language guide to the software around a language model — the loop, tools, memory, permissions, and checks — and what harness engineering means."
date: "2026-11-03"
updated: "2026-11-03"
category: guide
topics:
  - harnesses
  - how-agents-work
  - task-performance
  - research
audience:
  - kids
  - everyone
  - builders
  - research
companies:
  - openai
  - anthropic
  - claude
  - codex
  - langchain
  - google
  - microsoft
  - pydantic-ai
  - crewai
  - huggingface
  - arxiv
byline: "AI Agents Info Editorial"
sources:
  - title: "LangChain, The Anatomy of an Agent Harness (March 10, 2026)"
    url: "https://www.langchain.com/blog/the-anatomy-of-an-agent-harness"
  - title: "Databricks, What is an AI Agent Harness? (June 17, 2026)"
    url: "https://www.databricks.com/blog/ai-harness"
  - title: "OpenAI, Harness engineering: leveraging Codex in an agent-first world (February 11, 2026)"
    url: "https://openai.com/index/harness-engineering/"
  - title: "OpenAI, How enabling two settings tripled our scores on the ARC-AGI-3 benchmark (July 29, 2026)"
    url: "https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores/"
  - title: "OpenAI, Codex as a platform: build on the open agent harness"
    url: "https://developers.openai.com/blog/codex-as-a-platform"
  - title: "OpenAI, Agents SDK"
    url: "https://developers.openai.com/api/docs/guides/agents/sdk"
  - title: "OpenAI, Sandbox agents"
    url: "https://developers.openai.com/api/docs/guides/agents/sandboxes"
  - title: "OpenAI, Guardrails and human review"
    url: "https://developers.openai.com/api/docs/guides/agents/guardrails-approvals"
  - title: "OpenAI, Orchestration and handoffs"
    url: "https://developers.openai.com/api/docs/guides/agents/orchestration"
  - title: "OpenAI, GPT-5.6 Sol model page"
    url: "https://developers.openai.com/api/docs/models/gpt-5.6-sol"
  - title: "Anthropic, Agent SDK overview"
    url: "https://code.claude.com/docs/en/agent-sdk/overview"
  - title: "Anthropic, How the agent loop works"
    url: "https://code.claude.com/docs/en/agent-sdk/agent-loop"
  - title: "Anthropic, Agent SDK quickstart"
    url: "https://code.claude.com/docs/en/agent-sdk/quickstart"
  - title: "OpenAI, Running agents"
    url: "https://developers.openai.com/api/docs/guides/agents/running-agents"
  - title: "Anthropic, Effective harnesses for long-running agents (November 26, 2025)"
    url: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"
  - title: "Anthropic, Harness design for long-running application development (March 24, 2026)"
    url: "https://www.anthropic.com/engineering/harness-design-long-running-apps"
  - title: "Microsoft, Agent Framework overview"
    url: "https://learn.microsoft.com/en-us/agent-framework/overview/"
  - title: "Google, Welcome to ADK 2.0"
    url: "https://adk.dev/2.0/"
  - title: "Pydantic, Pydantic AI Harness"
    url: "https://pydantic.dev/docs/ai/harness/"
  - title: "Pydantic, Input, output, and tool guardrails"
    url: "https://pydantic.dev/docs/ai/harness/guardrails/"
  - title: "Lee et al., Meta-Harness: End-to-End Optimization of Model Harnesses (arXiv:2603.28052, March 30, 2026)"
    url: "https://arxiv.org/abs/2603.28052"
  - title: "Yao et al., ReAct (arXiv:2210.03629)"
    url: "https://arxiv.org/abs/2210.03629"
faq:
  - question: "What is an AI agent harness?"
    answer: "An AI agent harness is the software around a language model that lets the model take steps. It holds the tools, the memory, the permissions, the record of what happened, and the rule for when to stop. On this site, an agent is the model plus that harness."
  - question: "How do a model, a harness, and an agent differ?"
    answer: "The model reads context and produces the next text, including a request to use a tool. The harness runs the tool, stores the result, and decides what the model may see and do. The agent is the working combination of the two. Databricks’ June 17, 2026 explainer and LangChain’s March 10, 2026 explainer both use the shorthand agent equals model plus harness."
  - question: "What is harness engineering?"
    answer: "Harness engineering is the work of designing that surrounding system. OpenAI’s February 11, 2026 post uses the phrase for engineers who specify intent, shape the repository and tools, and build feedback loops so agents can do the implementation. Prompt wording is one part of the harness, not the whole job."
  - question: "Is an agent framework the same thing as a harness?"
    answer: "A framework is a library for building agents. A harness is the running system: the prompts, tools, sandbox, permissions, and stop rules configured for a job. The same framework can host many different harnesses. This site’s directory lists frameworks separately from the finished products that use them."
  - question: "Why can the same model score differently in two harnesses?"
    answer: "A benchmark run includes the settings around the model. On July 29, 2026, OpenAI reported that GPT-5.6 Sol scored 13.3 percent on the ARC-AGI-3 public set with the official harness and 38.3 percent after retained reasoning and compaction. The metric was Relative Human Action Efficiency. That is one dated measurement, not a current ranking of every model."
  - question: "What is a guardrail in an agent harness?"
    answer: "A guardrail is a check that can allow, block, replace, or pause an action. OpenAI’s Agents SDK uses guardrails for automatic checks on input, output, or tools, and uses a separate approval pause when a person must decide. Pydantic AI’s harness docs describe the same idea at the prompt, the tool call, and the final output."
---

Updated November 3, 2026.

## What does an agent harness mean in plain language?

A language model is a program that answers in words. An [agent](/glossary/agent) is that program when it can also take steps: look something up, change a file, run a check, and try again. The [harness](/glossary/harness) is the workshop around the program. It holds the tools, the notebook, the lock on the door, and the rule for when to stop.

Two workshops can hand the same program a job and get different results. One workshop may allow a command to run. Another may stop and ask a person first. The program did not change. The workshop did.

If you have used a chat box, you have used a model. When a product can click, edit, or buy, the software around the chat is doing extra work: it offers the tools, carries out the chosen step, and brings the result back. That extra software is the harness.

The rest of this guide is for anyone who wants the details, including people who build these systems. Short definitions live in the glossary: [harness engineering](/glossary/harness-engineering), [orchestration](/glossary/orchestration), and [guardrail](/glossary/guardrail). A larger-text door is on the [Everyone](/for/everyone) page. The [Curious Kids](/for/kids) page is the same idea with a shorter path in.

## What is an AI agent harness?

On this site, a harness is the runtime around a model: the loop, the [tools](/glossary/tool-use), the memory, the permissions, and the stop conditions. The weights stay the model. The harness is the code that puts a goal in front of those weights and does something with the reply.

Public write-ups in 2026 use the same split. [LangChain’s March 10, 2026 anatomy post](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness) says a harness is every piece of code, configuration, and execution logic that is the model’s surroundings, and it writes the shorthand as agent equals model plus harness. The parts it lists are system prompts, tools and their descriptions, bundled infrastructure such as a filesystem, a sandbox, and a browser, orchestration, and hooks that run fixed code for jobs such as compaction, continuation, and lint checks.

[Databricks’ explainer, published June 17, 2026](https://www.databricks.com/blog/ai-harness), defines an agent harness as the software infrastructure wrapped around a large language model so the model can act on tasks. It names tools, memory, a workspace, and guardrails. [OpenAI’s developer post on Codex as a platform](https://developers.openai.com/blog/codex-as-a-platform), live when this page was checked, calls the harness the surrounding execution system: the part that keeps context, calls tools, handles failures, asks for approval, and returns a result.

A research definition is narrower and still useful. The [Meta-Harness paper](https://arxiv.org/abs/2603.28052), arXiv:2603.28052, first posted March 30, 2026, describes a harness as the code that determines what information to store, retrieve, and present to the model.

Those sentences agree on the boundary. They leave room for argument about whether a particular file is “prompt” or “harness.” On this site the practical test is simple. If it is code or configuration around the weights, it belongs to the harness.

## How do a model, a harness, and an agent differ?

Databricks’ June 17 explainer separates the three words. The model reasons and generates the next output. The harness executes actions, manages memory, runs tools, and enforces rules. The agent is the working system that combines the two.

A [prompt](/glossary/prompt) sits inside that picture. It is the text the model sees on one call: standing instructions, the user goal, tool schemas, and recent observations. In an agent, the harness rebuilds that text on every turn. Prompt wording matters. It is one file in the workshop, which is why [harness engineering](/glossary/harness-engineering) is a wider job than prompt writing. Databricks’ table in the same post puts prompt engineering, context engineering, and harness engineering in that order. The last one’s artifact is the harness.

The [language model](/glossary/llm) glossary entry is the right place for what a model is. This page stays on the workshop.

## What happens in one loop?

Many agents repeat a small cycle. The model reads the current context and chooses a next step. The harness carries out that step. The harness puts the result back into the context. The model chooses again. The cycle ends when a stop rule fires.

[Shunyu Yao and coauthors](/research/react-reasoning-and-acting) named a version of this pattern in 2022: interleave a written reasoning trace with an action, then read the observation. The paper is [ReAct](https://arxiv.org/abs/2210.03629). Databricks’ 2026 explainer and LangChain’s March post both describe production agents in those terms. The 2022 scores belong to that paper’s models and tasks. The [research note](/research/react-reasoning-and-acting) says so. The pattern is what traveled.

A current product loop is more specific than the paper. Anthropic’s [agent-loop page](https://code.claude.com/docs/en/agent-sdk/agent-loop) for the Claude Agent SDK, checked November 3, 2026, describes five beats. The SDK delivers the prompt, the system prompt, the tool definitions, and the history. Claude answers with text, tool calls, or both. The SDK runs the requested tools. The cycle repeats until Claude produces a response with no tool calls. The SDK then yields that text and a result message with token usage, cost, and a session id. Hooks can intercept, change, or block a tool call before it runs.

Stop rules differ by product. The loop page says the cycle continues until the model produces a response with no tool calls. The [quickstart](https://code.claude.com/docs/en/agent-sdk/quickstart) says the loop also ends when the run hits an error. OpenAI’s [running-agents guide](https://developers.openai.com/api/docs/guides/agents/running-agents) treats a max-turn limit, a guardrail exception, and a tool error as failures, and treats a human approval as a pause. A pause is meant to resume from the same saved state. A new user turn is a different event.

## Which parts does a harness usually contain?

Vendors group the parts differently. The rows below are the pieces that show up, under those names, in the sources linked from this guide.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Part</th>
<th>What it is for</th>
<th>A public description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Tools</td>
<td>Let the model ask for a search, a file edit, a command, or an API call. The harness runs the call and returns the result.</td>
<td>Anthropic’s <a href="https://code.claude.com/docs/en/agent-sdk/overview">Agent SDK overview</a> lists built-in tools for reading, writing, editing, commands, and web search. See <a href="/glossary/tool-use">tool use</a>.</td>
</tr>
<tr>
<td>Sandbox</td>
<td>Give those commands a bounded machine so a bad step stays inside it.</td>
<td>OpenAI’s <a href="https://developers.openai.com/api/docs/guides/agents/sandboxes">sandbox guide</a> separates the harness, which it calls the control plane, from the sandbox, which it calls the execution plane.</td>
</tr>
<tr>
<td>Files and memory</td>
<td>Keep notes, plans, and progress that outlast one context window.</td>
<td>Anthropic’s <a href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents">November 26, 2025 note</a> uses a progress file, a feature list, and git. Pydantic documents a <a href="https://pydantic.dev/docs/ai/harness/memory/">memory notebook</a>.</td>
</tr>
<tr>
<td>Orchestration</td>
<td>Choose the next step, tool, or specialist, and who owns the reply.</td>
<td>OpenAI’s <a href="https://developers.openai.com/api/docs/guides/agents/orchestration">orchestration guide</a>. Glossary: <a href="/glossary/orchestration">orchestration</a>.</td>
</tr>
<tr>
<td>Guardrails</td>
<td>Allow, block, replace, or pause an action.</td>
<td>OpenAI’s <a href="https://developers.openai.com/api/docs/guides/agents/guardrails-approvals">guardrails page</a> and Pydantic’s <a href="https://pydantic.dev/docs/ai/harness/guardrails/">guardrail docs</a>. Glossary: <a href="/glossary/guardrail">guardrail</a>.</td>
</tr>
<tr>
<td>Checks before “done”</td>
<td>Require evidence, such as a test or a click-through, before a feature counts as finished.</td>
<td>Anthropic’s long-running notes, linked below, use a feature list and browser checks.</td>
</tr>
<tr>
<td>Traces</td>
<td>Record the calls, the cost, and the failures so a person can reconstruct the run.</td>
<td>Microsoft’s <a href="https://learn.microsoft.com/en-us/agent-framework/overview/">Agent Framework overview</a> includes observability on its Harness Agent. OpenAI’s SDK overview points tracing at its observability guide.</td>
</tr>
</tbody>
</table>
</div>

[Context windows](/glossary/context-window) fill up. Harnesses then summarize, drop, or retrieve. LangChain’s March post calls the quality drop “context rot” and describes compaction, offloading large tool output to files, and loading skills only when needed. Anthropic’s March 24, 2026 note, cited below, separates compaction (a summary inside the same session) from a full context reset plus a handoff file.

[Retrieval](/glossary/rag) is one way to fill the window. It is a memory tactic. Tool use is the step outside the text box. A harness can use both.

## What is harness engineering?

[Harness engineering](/glossary/harness-engineering) is the discipline of designing that workshop on purpose.

OpenAI’s [February 11, 2026 post](https://openai.com/index/harness-engineering/) by Ryan Lopopolo describes one internal experiment under that name. The team’s line is that humans steer and agents execute. The post says humans never directly contributed code on that project, and that Codex wrote the application, tests, CI configuration, documentation, observability, and internal tooling. The first commit to an empty repository landed in late August 2025. The post says the initial scaffold was generated by the Codex CLI using GPT-5. Five months later, the post says, the repository held on the order of a million lines, about 1,500 pull requests had been opened and merged, and a team of three engineers had driven the agents, later growing to seven. It reports an average of 3.5 pull requests per engineer per day for that earlier team of three, and says throughput rose as the team grew. It says the product had hundreds of internal users, including daily power users, and that the authors estimate the build took about one tenth of the time a hand-written version would have taken. Those figures are the company’s account of its own beta. This page does not have a separate audit.

The engineering claim in that post is about the human job. Early progress was slow because the environment was underspecified. The fix the authors describe is a missing capability made legible and enforceable, rather than a request to try harder. They made the app, its logs, and its metrics readable to the agent, including a per-worktree copy of the app and a local observability stack. They say they regularly see a single Codex run work on one task for upwards of six hours. They also say a single giant instruction file failed: context is scarce, a file that marks everything as important guides nothing, and the file rots. Their replacement was a short `AGENTS.md`, about 100 lines, used as a map, with a `docs/` tree as the system of record.

GPT-5 in that story is the model the post names for the August 2025 scaffold. It is a historical detail of the experiment. It is a poor label for “the model in Codex” on a later date.

Databricks’ June 17 table is the clean teaching version of the same shift. Prompt engineering writes a better input. Context engineering chooses what the model sees, and when. Harness engineering designs the tools, sandboxes, loops, and guardrails. The first two live inside the third.

LangChain’s March 10 post adds a research-shaped caution. It says products such as Claude Code and Codex are post-trained with the harness in the loop, so a model can get worse when the tool format changes, even if a person would find the new format easy. That is the company’s argument, tied to a Codex prompting guide it cites. Treat it as a reason to test a harness change, which the next sections take up.

## How is a framework different from a harness?

A framework is a library. A harness is a configured run: which prompts, tools, sandbox, approvals, and stop rules are actually in force.

This site’s [agent frameworks](/directory/category/agent-frameworks) category is the library shelf. The [LangChain listing](/directory/langchain) says the framework is the open-source library, and the harness is the runtime around the model. [CrewAI](/directory/crewai) and [smolagents](/directory/smolagents) are on that shelf too. The [harness comparison tracker](/trackers/harnesses) stays empty until every cell in a matrix has its own source. The table in the next section is a narrower substitute: what each vendor’s own docs call the harness, checked on November 3, 2026. Prices and plan limits live on the directory listings, where this site records a last-checked date, and on the vendor pages.

## How do current products divide the work?

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Product</th>
<th>What the vendor’s docs say</th>
<th>Where the loop runs</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="/directory/claude-agent-sdk">Claude Agent SDK</a></td>
<td>Anthropic’s <a href="https://code.claude.com/docs/en/agent-sdk/overview">overview</a> says the SDK gives you the same tools, agent loop, and context management that power <a href="/directory/claude-code">Claude Code</a>, including permissions, sessions, hooks, subagents, and MCP.</td>
<td>A Python or TypeScript process you operate. The SDK runs the Claude Code binary.</td>
</tr>
<tr>
<td>Anthropic Managed Agents</td>
<td>The same overview calls Managed Agents a hosted agent harness. Sessions sit in an Anthropic-managed cloud sandbox or a self-hosted sandbox.</td>
<td>Anthropic’s service, or a sandbox you host. This is a different product from the Agent SDK.</td>
</tr>
<tr>
<td><a href="/directory/openai-agents-sdk">OpenAI Agents SDK</a></td>
<td>The <a href="https://developers.openai.com/api/docs/guides/agents/sandboxes">sandbox guide</a> says the harness owns the agent loop, model calls, tool routing, handoffs, approvals, tracing, recovery, and run state. The sandbox is the machine that reads files and runs commands.</td>
<td>Your application, in the TypeScript or Python SDK. The <a href="https://developers.openai.com/api/docs/guides/agents/sdk">SDK overview</a> says the Agents API is the managed harness in OpenAI’s service.</td>
</tr>
<tr>
<td><a href="/directory/codex">Codex</a></td>
<td>The <a href="https://developers.openai.com/blog/codex-as-a-platform">Codex platform post</a> says one open-source harness powers the app, the CLI, and the IDE extension. It gathers context, uses tools, applies sandbox and approval rules, and carries work forward. Model access stays separate from that open-source layer.</td>
<td>The Codex app, CLI, or IDE, or your own app through the Codex SDK, <code>codex exec</code>, or app-server.</td>
</tr>
<tr>
<td><a href="/directory/microsoft-agent-framework">Microsoft Agent Framework</a></td>
<td>The <a href="https://learn.microsoft.com/en-us/agent-framework/overview/">overview</a> describes a Harness Agent for long, multi-step tasks: planning and todo tracking, context compaction, file access and memory, don’t-ask-again tool approval, and observability. Graph and function workflows are the path when the steps are fixed. Microsoft calls the framework the successor to Semantic Kernel and AutoGen, and says that if you can write a function for the task, do that instead of using an agent.</td>
<td>Your app. The overview shows Python and .NET, and says the Go SDK is in public preview and requires Go 1.26 or later.</td>
</tr>
<tr>
<td><a href="/directory/google-adk">Google ADK 2.0</a></td>
<td>The <a href="https://adk.dev/2.0/">ADK 2.0 page</a> says the release moves from a hierarchical executor to a workflow runtime. Agents, tools, and functions are nodes in a graph. It also describes dynamic workflows and collaborative workflows with a coordinator and subagents.</td>
<td>Your process. The page says ADK 2.0 is available for Python, TypeScript, and Go. It dates general availability to May 19, 2026 for Python, June 30, 2026 for Go, and August 21, 2026 for TypeScript.</td>
</tr>
<tr>
<td><a href="/directory/pydantic-ai">Pydantic AI Harness</a></td>
<td>The <a href="https://pydantic.dev/docs/ai/harness/">harness docs</a> say every Pydantic AI agent already has a light harness: a typed loop, a model, tools, and structured output. The harness package adds a workspace, a plan, memory, sub-agents, context management, and durable execution for long jobs. Guardrails can allow, block, replace, retry, or defer a tool call for approval.</td>
<td>Your process. The quick start says <code>LocalWorkspace</code> runs on your machine and is a sandbox only if you swap in one. The page names Modal, E2B, Sprites, Daytona, and boxd. Its example model string, on the page checked November 3, 2026, is <code>anthropic:claude-opus-5-5</code>.</td>
</tr>
</tbody>
</table>
</div>

Read a row as a pointer, then open the vendor page before you depend on a detail. Model names in sample code move. The [Claude](/directory/claude) and [Codex](/directory/codex) listings are the product doors on this site.

## Why do long tasks need a stronger harness?

A single loop works while the job fits in one context window and the model stops at the right time. Long jobs break that assumption. Each new session starts without the previous session’s memory, and a model can declare victory early or try to build the whole thing at once.

Anthropic’s [November 26, 2025 engineering note](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) calls the Claude Agent SDK a general-purpose agent harness and says compaction, by itself, was not enough. In the team’s experiments, a high-level prompt such as “build a clone of claude.ai” produced two failure patterns. The agent tried to do too much at once and left the next session with a half-built feature. Or a later session saw some progress and declared the job done. The note’s response has two prompts on one harness. A footnote says the system prompt, tools, and harness stayed the same. Only the initial user prompt changed.

The initializer prompt asks for an `init.sh` script, a `claude-progress.txt` log, an initial git commit, and a feature list. In the claude.ai-clone example the list held over 200 features, each stored as JSON with `"passes": false`. The note says the model was less likely to overwrite JSON than Markdown, and the coding prompt told the agent to change only the passes field. Later sessions work on one feature, commit, and update the progress file. The note also says the agent marked features done after unit tests or `curl` checks that missed end-to-end bugs, until the prompt required browser testing through the Puppeteer MCP, used the way a person would click.

Anthropic’s [March 24, 2026 note](https://www.anthropic.com/engineering/harness-design-long-running-apps) keeps the one-chunk handoff and adds a split between the agent that builds and the agent that judges. A planner turns a short prompt into a product spec. A generator implements one sprint at a time. An evaluator clicks through the running app with the Playwright MCP and grades the sprint against thresholds. Before the sprint, the two sides agree on a sprint contract. The note also names “context anxiety”: some models start wrapping up as they approach what they believe is the context limit. Compaction keeps a shortened history in the same session. A reset clears the window and depends on the handoff file. The note says the reset costs extra orchestration, tokens, and latency.

[OpenAI’s February post](https://openai.com/index/harness-engineering/) describes a related habit from the other direction. Humans may review pull requests. The post says that over time almost all review effort moved to agent-to-agent checks, while people still set intent and looked for missing capabilities. [Autonomy](/glossary/autonomy) on this site is that permission question: how far the loop may run before a person confirms the next step. A coding agent that opens a pull request, and a system that would design the next frontier model alone, are different permission levels. The [November 3, 2026 news note](/blog/anthropic-may-soon-meet-ai-acceleration-threshold) stays on the second one, using Anthropic’s own SEC filing.

## How can the same model score differently?

A [benchmark](/glossary/benchmark) measures a bundle. The bundle includes the model, the prompt, the tools, and the harness settings. OpenAI said this directly on [July 29, 2026](https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores/).

On the ARC-AGI-3 public set, OpenAI reports that GPT-5.6 Sol scored 13.3 percent with the official harness and 38.3 percent after two changes: retained reasoning and compaction. The score is Relative Human Action Efficiency. From official gameplay logs, OpenAI estimates the average human tester at 48 percent. The post says the official harness threw away private reasoning after each action and used rolling truncation once the conversation passed 175,000 characters, so older actions disappeared. OpenAI’s reimplementation kept reasoning by passing the previous response id on the Responses API, and it replaced truncation with compaction. The post says that for GPT-5.6 Sol at the max setting, the two changes together yielded roughly three times the score and about six times fewer output tokens. The [model page for `gpt-5.6-sol`](https://developers.openai.com/api/docs/models/gpt-5.6-sol) was still online on November 3, 2026. The 13.3 and 38.3 figures are that July measurement on that public set. They are not a leaderboard of every model available three months later.

The mechanism is the part to keep. The official harness, OpenAI writes, was generic on purpose, so model gaps would be easier to see. A production harness is tuned to the model’s settings, including whether earlier reasoning stays in the transcript. Comparing two models on different harnesses mixes those choices together.

Two other dated reports point the same way, with their own limits.

LangChain wrote on March 10, 2026 that changing only the harness moved one of its coding agents from the top 30 to the top 5 on Terminal-Bench 2.0. That is the company’s account of a leaderboard on that date.

The Meta-Harness authors, in the March 30, 2026 abstract, report three of their own results. On an online text-classification task, their search beat a context-management system they call state of the art by 7.7 points while using four times fewer context tokens. On retrieval-augmented math, one discovered harness improved accuracy by 4.7 points on average across five held-out models, on 200 IMO-level problems. On agentic coding, they say the discovered harnesses surpassed the best hand-engineered baselines they report on TerminalBench-2. Those are the authors’ measurements. The [weight-space programming note](/research/weight-space-programming) on this site cites the paper for a different reason: a harness still wraps a model whose weights someone is trying to edit. The [Builders](/for/builders) and [Research](/for/research) doors are the places those threads continue.

## What should a beginner check first?

Start with the job, then the workshop.

1. Write down the stop rule. “The model stopped talking” and “the test passed” are different finishes. Anthropic’s feature list is one way to make the second kind explicit.
2. List the tools the run may call. Pydantic’s harness quick start says `LocalWorkspace` runs file tools and commands on your machine and is a sandbox only after you swap in a sandbox capability. Commands there can reach anything you can reach.
3. Decide which steps wait for a person. OpenAI’s approval flow pauses the same run and resumes it from saved state. That is a [guardrail](/glossary/guardrail) plus a human gate.
4. Keep a record outside the chat. A progress file, a git commit, or a trace lets the next session see what the last one did.
5. When you compare models, hold the harness still, or say that you did not. The July 29 ARC-AGI-3 note is the short version of why.

The [task performance](/topics/task-performance) topic is where this site follows coding, computer use, and office work. The [harnesses](/topics/harnesses) topic is the shelf for this guide and the ones that will sit beside it.

## Where can you read more on this site?

- Glossary: [harness](/glossary/harness), [harness engineering](/glossary/harness-engineering), [orchestration](/glossary/orchestration), [guardrail](/glossary/guardrail), [agent](/glossary/agent), [tool use](/glossary/tool-use), [autonomy](/glossary/autonomy), [benchmark](/glossary/benchmark)
- Research: [ReAct](/research/react-reasoning-and-acting), [weight-space programming](/research/weight-space-programming)
- Directory: [agent frameworks](/directory/category/agent-frameworks), [Claude Agent SDK](/directory/claude-agent-sdk), [OpenAI Agents SDK](/directory/openai-agents-sdk), [Codex](/directory/codex), [Google ADK](/directory/google-adk), [Microsoft Agent Framework](/directory/microsoft-agent-framework), [Pydantic AI](/directory/pydantic-ai)
- Topics: [harnesses](/topics/harnesses), [how agents work](/topics/how-agents-work), [task performance](/topics/task-performance)

## Frequently asked questions

### What is an AI agent harness?

It is the software around a language model that lets the model take steps. It holds the tools, the memory, the permissions, the record of what happened, and the rule for when to stop. On this site, an [agent](/glossary/agent) is the model plus that [harness](/glossary/harness).

### How do a model, a harness, and an agent differ?

The model reads context and produces the next text, including a request to use a tool. The harness runs the tool, stores the result, and decides what the model may see and do. The agent is the working combination. Databricks’ June 17, 2026 explainer and LangChain’s March 10, 2026 explainer both write this as agent equals model plus harness.

### What is harness engineering?

It is the work of designing that surrounding system. [OpenAI’s February 11, 2026 post](https://openai.com/index/harness-engineering/) uses the phrase for engineers who specify intent, shape the tools and the repository, and build feedback loops so agents can do the implementation. Writing a better prompt is one part of the job.

### Is an agent framework the same thing as a harness?

A framework is a library for building agents. A harness is the running system: the prompts, tools, sandbox, permissions, and stop rules for a job. The [directory](/directory/category/agent-frameworks) lists the libraries. Two apps can import the same library and still run different harnesses.

### Why can the same model score differently in two harnesses?

The score includes the settings around the model. On July 29, 2026, OpenAI reported that GPT-5.6 Sol scored 13.3 percent on the ARC-AGI-3 public set with the official harness and 38.3 percent after retained reasoning and compaction. The metric was Relative Human Action Efficiency. That pair is one dated measurement.

### What is a guardrail in an agent harness?

A [guardrail](/glossary/guardrail) is a check that can allow, block, replace, or pause an action. OpenAI’s Agents SDK uses the word for automatic checks, and uses a separate approval step when a person must decide. Pydantic’s harness docs put a callable on the prompt, the tool call, and the final output.
