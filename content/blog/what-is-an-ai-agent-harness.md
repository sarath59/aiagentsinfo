---
title: "What Is an AI Agent Harness? DeepSeek Super Agent and DeepSeek Harness (2026)"
description: "What is DeepSeek Harness? DeepSeek’s open-source agent harness, still in developer preview. The documented start command runs a web interface on your own machine. The DeepSeek super agent note covers the router and worker prototype. An AI agent harness is the loop, tools, memory, permissions, and stop rules around a model."
takeaways:
  - "A harness is the workshop around a model: the tools, the notebook, the lock on the door, and the rule for when to stop."
  - "Two workshops can hand the same program a job and get different results. The program did not change. The workshop did."
  - "On this site, a harness is the runtime around a model: the loop, the tools, the memory, the permissions, and the stop conditions."
date: "2026-11-03"
updated: "2026-11-08"
category: guide
topics:
  - harnesses
  - how-agents-work
  - task-performance
  - research
audience:
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
  - title: "OpenAI, Models index (checked November 4, 2026)"
    url: "https://developers.openai.com/api/docs/models"
  - title: "Lee et al., Meta-Harness: End-to-End Optimization of Model Harnesses (arXiv:2603.28052, March 30, 2026)"
    url: "https://arxiv.org/abs/2603.28052"
  - title: "Yao et al., ReAct (arXiv:2210.03629)"
    url: "https://arxiv.org/abs/2210.03629"
  - title: "DeepSeek, DeepSeek Harness repository (created August 13, 2026; README and releases checked November 5, 2026)"
    url: "https://github.com/deepseek-ai/deepseek-harness"
  - title: "DeepSeek Harness README (developer preview, plugin architecture, MIT license)"
    url: "https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md"
  - title: "DeepSeek Harness pre-release v0.2.2-rc.1 (published November 4, 2026)"
    url: "https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.2-rc.1"
  - title: "Yu et al., Harmony Harness: Multi-Objective Self-Evolution of Agent Harnesses (arXiv:2610.15150)"
    url: "https://arxiv.org/abs/2610.15150"
  - title: "South China Morning Post, DeepSeek unveils AI super agent (published November 1, 2026; checked November 6, 2026)"
    url: "https://www.scmp.com/tech/article/3372884/deepseek-unveils-ai-super-agent-coding-race-openai-anthropic"
  - title: "MarkTechPost, DeepSeek open-sources dsh-superagent, a router-worker coding agent (November 1, 2026)"
    url: "https://www.marktechpost.com/2026/11/01/deepseek-dsh-superagent-router-worker-coding-agent/"
  - title: "DeepSeek, dsh-superagent-prototype README (research prototype, MIT license; checked November 6, 2026)"
    url: "https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/README.md"
  - title: "DeepSeek, dsh-superagent execution notes (router preset, worker session per ticket)"
    url: "https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/003-execution.md"
faq:
  - question: "What is DeepSeek Harness?"
    answer: "DeepSeek Harness is an open-source agent harness from DeepSeek, in the repository deepseek-ai/deepseek-harness, created August 13, 2026. The README calls it dsh, says everything is a plugin, and says the project is in developer preview. On November 5, 2026, the newest item on the releases list was the pre-release v0.2.2-rc.1, published November 4, 2026. The README’s run instructions are local: npx @deepseek-ai/dsh web starts a web interface on the machine where you run it. A separate repository, dsh-superagent-prototype, is a research prototype of a router and worker design, not an official DeepSeek product. DeepSeek Harness is the harness itself, not a shipping app like Claude Code or Codex."
  - question: "What does DeepSeek Harness desktop refer to on this page?"
    answer: "It refers to the local run in the DeepSeek Harness README, checked November 5, 2026. The instructions run on your own machine. npx @deepseek-ai/dsh web starts a web interface there. A checkout can be installed and built from the repository."
  - question: "What is the DeepSeek super agent?"
    answer: "In the sources on this page, DeepSeek super agent is the name used for a router and worker design the DeepSeek Harness group described at the end of October 2026. The repository deepseek-ai/dsh-superagent-prototype calls itself a research prototype, not an official DeepSeek product, and says the published code is not identical to the internal version. The South China Morning Post’s November 1, 2026 story reports the aim as reducing the human work of coordinating several agents. This page has not re-run any timing test."
  - question: "What is an AI agent harness?"
    answer: "An AI agent harness is the software around a language model that lets the model take steps. It holds the tools, the memory, the permissions, the record of what happened, and the rule for when to stop. On this site, an agent is the model plus that harness."
  - question: "How do a model, a harness, and an agent differ?"
    answer: "The model reads context and produces the next text, including a request to use a tool. The harness runs the tool, stores the result, and decides what the model may see and do. The agent is the working combination of the two. Databricks’ June 17, 2026 explainer and LangChain’s March 10, 2026 explainer both use the shorthand agent equals model plus harness."
  - question: "What is harness engineering?"
    answer: "Harness engineering is the work of designing that surrounding system. OpenAI’s February 11, 2026 post uses the phrase for engineers who specify intent, shape the repository and tools, and build feedback loops so agents can do the implementation. Prompt wording is one part of the harness, not the whole job. Thoughtworks’ November 4, 2026 account of the same work at organization scale is the harness engineering at scale note on this site."
  - question: "Is an agent framework the same thing as a harness?"
    answer: "A framework is a library for building agents. A harness is the running system: the prompts, tools, sandbox, permissions, and stop rules configured for a job. The same framework can host many different harnesses. This site’s directory lists frameworks separately from the finished products that use them."
  - question: "Why can the same model score differently in two harnesses?"
    answer: "A benchmark run includes the settings around the model. On July 29, 2026, OpenAI reported that GPT-5.6 Sol scored 13.3 percent on the ARC-AGI-3 public set with the official harness and 38.3 percent after retained reasoning and compaction. The metric was Relative Human Action Efficiency. That is one dated measurement, not a current ranking of every model."
  - question: "What is a guardrail in an agent harness?"
    answer: "A guardrail is a check that can allow, block, replace, or pause an action. OpenAI’s Agents SDK uses guardrails for automatic checks on input, output, or tools, and uses a separate approval pause when a person must decide. Pydantic AI’s harness docs describe the same idea at the prompt, the tool call, and the final output."
---

Updated November 8, 2026.

## What does an agent harness mean in plain language?

A language model is a program that answers in words. An [agent](/glossary/agent) is that program when it can also take steps: look something up, change a file, run a check, and try again. The [harness](/glossary/harness) is the workshop around the program. It holds the tools, the notebook, the lock on the door, and the rule for when to stop.

Two workshops can hand the same program a job and get different results. One workshop may allow a command to run. Another may stop and ask a person first. The program did not change. The workshop did.

If you have used a chat box, you have used a model. When a product can click, edit, or buy, the software around the chat is doing extra work: it offers the tools, carries out the chosen step, and brings the result back. That extra software is the harness.

The rest of this guide is the full account for adult readers, including people who build these systems. Short definitions live in the glossary: [harness engineering](/glossary/harness-engineering), [orchestration](/glossary/orchestration), and [guardrail](/glossary/guardrail). A sourced comparison of shipping harnesses, without invented scores, is [Best AI agent harness](/best/ai-agent-harnesses).

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

Screen clicks sit on the tools row and the sandbox row together. The guide to that loop, including [computer use](/glossary/computer-use), [browser use](/glossary/browser-use), and the [sandbox](/glossary/sandbox), is [Can an AI agent use your computer?](/blog/can-an-ai-agent-use-your-computer), checked November 5, 2026.

[Context windows](/glossary/context-window) fill up. Harnesses then summarize, drop, or retrieve. LangChain’s March post calls the quality drop “context rot” and describes compaction, offloading large tool output to files, and loading skills only when needed. Anthropic’s March 24, 2026 note, cited below, separates compaction (a summary inside the same session) from a full context reset plus a handoff file.

[Retrieval](/glossary/rag) is one way to fill the window. It is a memory tactic. Tool use is the step outside the text box. A harness can use both.

## What is harness engineering?

[Harness engineering](/glossary/harness-engineering) is the discipline of designing that workshop on purpose. Thoughtworks’ November 4, 2026 account of the same work across an organization is [What is harness engineering at scale?](/blog/what-is-harness-engineering-at-scale-thoughtworks-radar).

OpenAI’s [February 11, 2026 post](https://openai.com/index/harness-engineering/) by Ryan Lopopolo describes one internal experiment under that name. The team’s line is that humans steer and agents execute. The post says humans never directly contributed code on that project, and that Codex wrote the application, tests, CI configuration, documentation, observability, and internal tooling. The first commit to an empty repository landed in late August 2025. The post says the initial scaffold was generated by the Codex CLI using GPT-5. Five months later, the post says, the repository held on the order of a million lines, about 1,500 pull requests had been opened and merged, and a team of three engineers had driven the agents, later growing to seven. It reports an average of 3.5 pull requests per engineer per day for that earlier team of three, and says throughput rose as the team grew. It says the product had hundreds of internal users, including daily power users, and that the authors estimate the build took about one tenth of the time a hand-written version would have taken. Those figures are the company’s account of its own beta. This page does not have a separate audit.

The engineering claim in that post is about the human job. Early progress was slow because the environment was underspecified. The fix the authors describe is a missing capability made legible and enforceable, rather than a request to try harder. They made the app, its logs, and its metrics readable to the agent, including a per-worktree copy of the app and a local observability stack. They say they regularly see a single Codex run work on one task for upwards of six hours. They also say a single giant instruction file failed: context is scarce, a file that marks everything as important guides nothing, and the file rots. Their replacement was a short `AGENTS.md`, about 100 lines, used as a map, with a `docs/` tree as the system of record.

GPT-5 in that story is the model the post names for the August 2025 scaffold. It is a historical detail of the experiment. It is a poor label for “the model in Codex” on a later date.

Databricks’ June 17 table is the clean teaching version of the same shift. Prompt engineering writes a better input. Context engineering chooses what the model sees, and when. Harness engineering designs the tools, sandboxes, loops, and guardrails. The first two live inside the third.

LangChain’s March 10 post adds a research-shaped caution. It says products such as Claude Code and Codex are post-trained with the harness in the loop, so a model can get worse when the tool format changes, even if a person would find the new format easy. That is the company’s argument, tied to a Codex prompting guide it cites. Treat it as a reason to test a harness change. The test for one observable action is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness). How to stand up the tasks, sandboxes, and graders is [How to build an eval harness for AI agents](/blog/how-to-build-an-eval-harness-for-ai-agents). The short definition of the job is the [harness engineering](/glossary/harness-engineering) glossary entry.

## How is a framework different from a harness?

A framework is a library. A harness is a configured run: which prompts, tools, sandbox, approvals, and stop rules are actually in force.

This site’s [agent frameworks](/directory/category/agent-frameworks) category is the library shelf. A separate page copies the latest GitHub release for 19 open-source agent frameworks and SDKs, pulled 5 November 2026: [AI agent framework release, November 2026](/reports/ai-agent-framework-github-stats-november-2026). The [LangChain listing](/directory/langchain) says the framework is the open-source library, and the harness is the runtime around the model. [CrewAI](/directory/crewai) and [smolagents](/directory/smolagents) are on that shelf too. The [harness comparison tracker](/trackers/harnesses) stays empty until every cell in a matrix has its own source. The table in the next section is a narrower substitute: what each vendor’s own docs call the harness. Those rows were checked on November 3, 2026. The Pydantic row was checked again on November 4, 2026. Prices and plan limits live on the directory listings, where this site records a last-checked date, and on the vendor pages. The side-by-side list prices for the two shipping coding-agent harnesses are [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing), checked November 6, 2026.

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
<td>Your process. The quick start says <code>LocalWorkspace</code> runs on your machine and is a sandbox only if you swap in one. The page checked November 4, 2026 names Modal, E2B, Render, Sprites, Daytona, and boxd. Its first example model string is still <code>anthropic:claude-opus-5-5</code>. The same section also shows a coder on <code>gpt-6.1-sol</code>.</td>
</tr>
</tbody>
</table>
</div>

Read a row as a pointer, then open the vendor page before you depend on a detail. Model names in sample code move. The [Claude](/directory/claude) and [Codex](/directory/codex) listings are the product doors on this site. DeepSeek Harness is not in the table. Its repository was checked separately on November 5, 2026, in the next section.

## What is DeepSeek Harness?

DeepSeek Harness is an agent harness from DeepSeek, published as source. The general name for that surrounding software is an [agent harness](/glossary/harness). Designing one on purpose is [harness engineering](/glossary/harness-engineering). GitHub records the public repository [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) as created on August 13, 2026. The repository description is “DeepSeek Harness: Everything is a Plugin.” The [README](https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md) calls it an open-source agent harness, `dsh`, developed by DeepSeek, built on an everything-is-a-plugin architecture. The same README says the project is in developer preview and that compatibility-breaking changes are expected. GitHub lists the license as MIT, and the README points at the same MIT license file.

On November 5, 2026, GitHub’s latest-release endpoint, which returns the newest release that is not a pre-release, responded 404. The newest item on the releases list was a pre-release: tag `dsh-v0.2.2-rc.1`, name v0.2.2-rc.1, published November 4, 2026.

## What does “DeepSeek Harness desktop” refer to here?

On this page it refers to the local run already in the README. The instructions run on your own machine. `npx @deepseek-ai/dsh web` starts a web interface there. A checkout can be installed and built from the repository.

That is a different artifact from the products in the table. [Claude Code](/directory/claude-code) and [Codex](/directory/codex) are shipping products with their own apps and plan pages. Inside Claude Code, ultracode is the setting that plans a workflow for a substantive task. The November 9, 2026 reading of that setting is [What does ultracode do in Claude Code?](/blog/what-does-ultracode-do-in-claude-code). DeepSeek’s repository is the harness itself, in preview, organized as plugins. This page does not turn that into a ranking. The sourced table is [Best AI agent harness](/best/ai-agent-harnesses). The [harness comparison tracker](/trackers/harnesses) points at that page.

## What is the DeepSeek super agent?

The DeepSeek super agent, in the sources below, is a second shape the same group described at the end of October 2026, with a prototype published beside it. Designing that shape is still [harness engineering](/glossary/harness-engineering). A check of one action in a run is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness). The [South China Morning Post](https://www.scmp.com/tech/article/3372884/deepseek-unveils-ai-super-agent-coding-race-openai-anthropic), in a story published November 1, 2026, says the DeepSeek Harness team published a technical article the day before, a Saturday, about a system it calls a super agent. The Post says the aim is to reduce the human work of coordinating several agents and watching their progress. That story is a news report of the article. It describes the aim. It does not print a results table.

The code published with the discussion is [deepseek-ai/dsh-superagent-prototype](https://github.com/deepseek-ai/dsh-superagent-prototype). The [README](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/README.md), checked November 6, 2026, calls it dsh-superagent: a proactive coding agent for one GitHub repository, packaged as a bundle for DeepSeek Harness. The README says it is a research prototype for reference, not an official DeepSeek product. It says the published code was adapted, so it is not identical to the internal version or to the implementation described in “Exploring Super-agent Design: Towards a More Autonomous Agent System,” and that some designs in that article are later work and are not in the prototype. The README links an MIT license.

[MarkTechPost’s November 1, 2026 article](https://www.marktechpost.com/2026/11/01/deepseek-dsh-superagent-router-worker-coding-agent/) describes the design as two layers. A long-running router handles interaction and dispatch. Isolated worker sessions do the work. The prototype’s [execution notes](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/003-execution.md) say the main session uses a router preset with a smaller tool set, and that each ticket gets its own worker session and directory. Those notes say worker sessions run commands without approval, as the operator’s operating-system user. MarkTechPost also prints simulation times from secondary reports of a DeepSeek test, a p95 of 15.7 minutes for the super-agent setup and 29.5 minutes for a single-session baseline, and it says the runs used synthetic messages and simulated tools. It says real coding quality was not measured. This page has not re-run that test, and it does not treat those minutes as a product score.

The prototype is a harness you can read. The bill for a shipping coding agent is a separate question. [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing) compares those list prices as of November 6, 2026. An open-source workshop can still call a model on a paid plan. The plan is how those calls are billed. The harness is what the calls are allowed to do.

## Can an agent harness improve itself?

A research paper can study that question. It does not, by itself, mean a product you can install already rewrites its own workshop.

[Harmony Harness](https://arxiv.org/abs/2610.15150) (arXiv:2610.15150) is a framework described in a paper, “Harmony Harness: Multi-Objective Self-Evolution of Agent Harnesses.” The author list includes researchers affiliated with Google Cloud AI Research, Google DeepMind, and Carnegie Mellon University. The abstract says recent work treats the agent harness as an optimization target that can be improved from execution feedback, and that those approaches mostly optimize a single objective and evolve the harness as one block.

The abstract’s own description of Harmony Harness is narrower. It formulates harness evolution as a multi-objective optimization problem. It uses decomposition-based evolutionary search to keep solutions across different regions of the Pareto frontier. Separate operators refine general-purpose harness mechanisms and benchmark-specific adaptations, and a composition step puts them together when the agent runs. On SecRepoBench and BaxBench, the authors report that it outperformed strong harness-evolution baselines, with gains exceeding 10 percent on both benchmarks. That is the authors’ measurement on those two benchmarks.

It is not a claim that [Claude Code](/directory/claude-code), [Codex](/directory/codex), or DeepSeek Harness rewrites itself. The older pattern of taking a step and reading the result is the [ReAct](/research/react-reasoning-and-acting) note. Designing the surrounding system on purpose is [harness engineering](/glossary/harness-engineering).

## Why do long tasks need a stronger harness?

A single loop works while the job fits in one context window and the model stops at the right time. Long jobs break that assumption. Each new session starts without the previous session’s memory, and a model can declare victory early or try to build the whole thing at once.

Anthropic’s [November 26, 2025 engineering note](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) calls the Claude Agent SDK a general-purpose agent harness and says compaction, by itself, was not enough. In the team’s experiments, a high-level prompt such as “build a clone of claude.ai” produced two failure patterns. The agent tried to do too much at once and left the next session with a half-built feature. Or a later session saw some progress and declared the job done. The note’s response has two prompts on one harness. A footnote says the system prompt, tools, and harness stayed the same. Only the initial user prompt changed.

The initializer prompt asks for an `init.sh` script, a `claude-progress.txt` log, an initial git commit, and a feature list. In the claude.ai-clone example the list held over 200 features, each stored as JSON with `"passes": false`. The note says the model was less likely to overwrite JSON than Markdown, and the coding prompt told the agent to change only the passes field. Later sessions work on one feature, commit, and update the progress file. The note also says the agent marked features done after unit tests or `curl` checks that missed end-to-end bugs, until the prompt required browser testing through the Puppeteer MCP, used the way a person would click.

Anthropic’s [March 24, 2026 note](https://www.anthropic.com/engineering/harness-design-long-running-apps) keeps the one-chunk handoff and adds a split between the agent that builds and the agent that judges. A planner turns a short prompt into a product spec. A generator implements one sprint at a time. An evaluator clicks through the running app with the Playwright MCP and grades the sprint against thresholds. Before the sprint, the two sides agree on a sprint contract. The note also names “context anxiety”: some models start wrapping up as they approach what they believe is the context limit. Compaction keeps a shortened history in the same session. A reset clears the window and depends on the handoff file. The note says the reset costs extra orchestration, tokens, and latency.

[OpenAI’s February post](https://openai.com/index/harness-engineering/) describes a related habit from the other direction. Humans may review pull requests. The post says that over time almost all review effort moved to agent-to-agent checks, while people still set intent and looked for missing capabilities. [Autonomy](/glossary/autonomy) on this site is that permission question: how far the loop may run before a person confirms the next step. A coding agent that opens a pull request, and a system that would design the next frontier model alone, are different permission levels. The [November 3, 2026 news note](/blog/anthropic-may-soon-meet-ai-acceleration-threshold) stays on the second one, using Anthropic’s own SEC filing.

## How can the same model score differently?

A [benchmark](/glossary/benchmark) measures a bundle. The bundle includes the model, the prompt, the tools, and the harness settings. OpenAI said this directly on [July 29, 2026](https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores/).

On the ARC-AGI-3 public set, OpenAI reports that GPT-5.6 Sol scored 13.3 percent with the official harness and 38.3 percent after two changes: retained reasoning and compaction. The score is Relative Human Action Efficiency. From official gameplay logs, OpenAI estimates the average human tester at 48 percent. The post says the official harness threw away private reasoning after each action and used rolling truncation once the conversation passed 175,000 characters, so older actions disappeared. OpenAI’s reimplementation kept reasoning by passing the previous response id on the Responses API, and it replaced truncation with compaction. The post says that for GPT-5.6 Sol at the max setting, the two changes together yielded roughly three times the score and about six times fewer output tokens. The [model page for `gpt-5.6-sol`](https://developers.openai.com/api/docs/models/gpt-5.6-sol) still responded on November 4, 2026. The same day, [OpenAI’s models index](https://developers.openai.com/api/docs/models) told a new project to start with GPT-6 Astra, to choose GPT-6.1 Sol to balance intelligence and cost, or GPT-6 Luna for high-volume work. The 13.3 and 38.3 figures remain that July measurement of GPT-5.6 Sol on that public set. They are not a score for GPT-6 Astra or GPT-6.1 Sol.

The mechanism is the part to keep. The official harness, OpenAI writes, was generic on purpose, so model gaps would be easier to see. A production harness is tuned to the model’s settings, including whether earlier reasoning stays in the transcript. Comparing two models on different harnesses mixes those choices together. A score on a whole benchmark still leaves the failed step unnamed. Checking one action at a time is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness).

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

The [task performance](/topics/task-performance) topic is where this site follows coding, computer use, and office work. The [harnesses](/topics/harnesses) topic is the shelf for this guide and the ones that will sit beside it. A shopping assistant that can pay is the same workshop pointed at a cart: [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you).

## Where can you read more on this site?

- Glossary: [harness](/glossary/harness), [harness engineering](/glossary/harness-engineering), [orchestration](/glossary/orchestration), [guardrail](/glossary/guardrail), [agent](/glossary/agent), [tool use](/glossary/tool-use), [computer use](/glossary/computer-use), [browser use](/glossary/browser-use), [sandbox](/glossary/sandbox), [autonomy](/glossary/autonomy), [benchmark](/glossary/benchmark), [behavioral evaluation](/glossary/behavioral-evaluation)
- At organization scale: [What is harness engineering at scale?](/blog/what-is-harness-engineering-at-scale-thoughtworks-radar)
- Evaluation: [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness), [How to build an eval harness for AI agents](/blog/how-to-build-an-eval-harness-for-ai-agents)
- Research: [ReAct](/research/react-reasoning-and-acting), [weight-space programming](/research/weight-space-programming)
- Directory: [agent frameworks](/directory/category/agent-frameworks), [Claude Agent SDK](/directory/claude-agent-sdk), [OpenAI Agents SDK](/directory/openai-agents-sdk), [Codex](/directory/codex), [Google ADK](/directory/google-adk), [Microsoft Agent Framework](/directory/microsoft-agent-framework), [Pydantic AI](/directory/pydantic-ai)
- Shopping: [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you)
- Computer use: [Can an AI agent use your computer?](/blog/can-an-ai-agent-use-your-computer)
- Coding-agent prices: [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing)
- Reports: [AI agents, November 2026 to November 2027](/reports/ai-agents-next-12-months), [AI agents, November 2026 to May 2027](/reports/ai-agents-next-6-months), [agent harness benchmark, November 2026](/reports/agent-harness-benchmark-november-2026)
- Also on the harness hub: [Harness comparison tracker](/trackers/harnesses), [Best AI agent frameworks](/best/ai-agent-frameworks), [SpecCompact agent context compaction](/research/speccompact-agent-context-compaction), [HarnessFlow](/research/harnessflow-mcts-harness-optimization)
- Topics: [harnesses](/topics/harnesses), [how agents work](/topics/how-agents-work), [task performance](/topics/task-performance), [shopping](/topics/shopping)

## Frequently asked questions

### What is DeepSeek Harness?

It is an open-source [agent harness](/glossary/harness) from DeepSeek, in the repository deepseek-ai/deepseek-harness, which GitHub records as created on August 13, 2026. The README calls the program `dsh`, says everything is a plugin, and says the project is in developer preview. On November 5, 2026, the newest item on the releases list was the pre-release v0.2.2-rc.1, published November 4, 2026. The README’s run instructions are local: `npx @deepseek-ai/dsh web` starts a web interface on the machine where you run it. A later section covers the DeepSeek super agent note: the separate dsh-superagent prototype, a router and worker design published at the end of October 2026. [Claude Code](/directory/claude-code) and [Codex](/directory/codex) are shipping products. Their list prices are [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing). DeepSeek Harness is the harness itself, still in preview. The longer account is the section above. The work of designing any harness, including this one, is [harness engineering](/glossary/harness-engineering).

### What does “DeepSeek Harness desktop” refer to here?

It refers to the local run in the README, checked November 5, 2026. The instructions run on your own machine. `npx @deepseek-ai/dsh web` starts a web interface there. A checkout can be installed and built from the repository. The section above is the same note.

### What is the DeepSeek super agent?

In the sources on this page, it is the name for a router and worker design the DeepSeek Harness group described at the end of October 2026. The [dsh-superagent-prototype README](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/README.md) calls the code a research prototype, not an official DeepSeek product, and says the published code is not identical to the internal version. The [South China Morning Post](https://www.scmp.com/tech/article/3372884/deepseek-unveils-ai-super-agent-coding-race-openai-anthropic) story of November 1, 2026 reports the aim as reducing the human work of coordinating several agents. This page has not re-run any timing test. The section above is the full note.

### What is an AI agent harness?

It is the software around a language model that lets the model take steps. It holds the tools, the memory, the permissions, the record of what happened, and the rule for when to stop. On this site, an [agent](/glossary/agent) is the model plus that [harness](/glossary/harness).

### How do a model, a harness, and an agent differ?

The model reads context and produces the next text, including a request to use a tool. The harness runs the tool, stores the result, and decides what the model may see and do. The agent is the working combination. Databricks’ June 17, 2026 explainer and LangChain’s March 10, 2026 explainer both write this as agent equals model plus harness.

### What is harness engineering?

It is the work of designing that surrounding system. [OpenAI’s February 11, 2026 post](https://openai.com/index/harness-engineering/) uses the phrase for engineers who specify intent, shape the tools and the repository, and build feedback loops so agents can do the implementation. Writing a better prompt is one part of the job. Thoughtworks’ November 4, 2026 account of the same work at organization scale is [What is harness engineering at scale?](/blog/what-is-harness-engineering-at-scale-thoughtworks-radar).

### Is an agent framework the same thing as a harness?

A framework is a library for building agents. A harness is the running system: the prompts, tools, sandbox, permissions, and stop rules for a job. The [directory](/directory/category/agent-frameworks) lists the libraries. Two apps can import the same library and still run different harnesses.

### Why can the same model score differently in two harnesses?

The score includes the settings around the model. On July 29, 2026, OpenAI reported that GPT-5.6 Sol scored 13.3 percent on the ARC-AGI-3 public set with the official harness and 38.3 percent after retained reasoning and compaction. The metric was Relative Human Action Efficiency. That pair is one dated measurement.

### What is a guardrail in an agent harness?

A [guardrail](/glossary/guardrail) is a check that can allow, block, replace, or pause an action. OpenAI’s Agents SDK uses the word for automatic checks, and uses a separate approval step when a person must decide. Pydantic’s harness docs put a callable on the prompt, the tool call, and the final output.
