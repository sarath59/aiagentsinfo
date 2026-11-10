---
title: "LangGraph vs CrewAI vs OpenAI Agents SDK: Three MIT Libraries, Three Separate Bills"
description: "On November 10, 2026 the Python packages were langgraph 1.2.20, crewai 1.15.39, and openai-agents 0.24.0, all MIT. The import is free. LangSmith seats, CrewAI AMP executions, and the model API are the bills."
takeaways:
  - "Ship LangGraph when the run has to pause or crash and resume from a checkpoint you can point at a database. Python langgraph 1.2.20 was uploaded November 5. The npm package @langchain/langgraph 1.7.3 was published November 10. GitHub’s latest tag that day was langgraph-sdk 0.4.14, a different package."
  - "Ship CrewAI when the work is a crew of roles, or a Flow with @persist, on Python 3.10 through 3.13. crewai 1.15.39 was published November 9. The open-source library has no execution cap. CrewAI AMP Basic is free for 50 workflow executions a month, and Enterprise is custom."
  - "Ship the OpenAI Agents SDK when you want the smallest loop you host yourself: handoffs, guardrails, sessions, and tracing that is on by default. openai-agents 0.24.0 was published October 15. An agent with no model set uses gpt-5.6-luna. The Agents API is a separate hosted harness."
date: "2026-11-10"
updated: "2026-11-10"
category: guide
topics:
  - harnesses
  - tools-saas
  - how-agents-work
audience:
  - builders
  - everyone
companies:
  - langchain
  - crewai
  - openai
  - openai-agents-sdk
byline: "AI Agents Info Editorial"
contentLicense: true
absoluteTitle: true
dataset:
  title: "LangGraph, CrewAI, and OpenAI Agents SDK versions and stars, November 10, 2026"
  description: "PyPI versions and upload times for langgraph 1.2.20 (2026-11-05), crewai 1.15.39 (2026-11-09), and openai-agents 0.24.0 (2026-10-15). npm latest for @langchain/langgraph 1.7.3 at 2026-11-10T00:00:50.710Z and @openai/agents 0.21.0 at 2026-10-20T22:14:20.969Z. GitHub stargazers_count in a pass whose langgraph releases response carried HTTP Date 2026-11-10T11:45:33Z: langchain-ai/langgraph 44746, crewAIInc/crewAI 60723, openai/openai-agents-python 30600, openai/openai-agents-js 4001. GitHub latest-release tags the same pass: langgraph sdk==0.4.14 published 2026-11-06, crewAI 1.15.39 published 2026-11-09, openai-agents-python v0.24.0 published 2026-10-15."
  isBasedOn: "https://pypi.org/pypi/langgraph/json"
sources:
  - title: "LangGraph overview (read November 10, 2026)"
    url: "https://docs.langchain.com/oss/python/langgraph/overview"
  - title: "LangGraph persistence (read November 10, 2026)"
    url: "https://docs.langchain.com/oss/python/langgraph/persistence"
  - title: "LangChain MCP adapter (read November 10, 2026)"
    url: "https://docs.langchain.com/oss/python/langchain/mcp"
  - title: "LangSmith Agent Server MCP endpoint (read November 10, 2026)"
    url: "https://docs.langchain.com/langsmith/server-mcp"
  - title: "LangSmith plans and pricing (read November 10, 2026)"
    url: "https://www.langchain.com/pricing"
  - title: "PyPI JSON for langgraph 1.2.20 (read November 10, 2026)"
    url: "https://pypi.org/pypi/langgraph/json"
  - title: "npm registry for @langchain/langgraph (read November 10, 2026)"
    url: "https://registry.npmjs.org/@langchain/langgraph"
  - title: "GitHub REST API, langchain-ai/langgraph releases/latest (HTTP Date 11:45:33 UTC, November 10, 2026)"
    url: "https://api.github.com/repos/langchain-ai/langgraph/releases/latest"
  - title: "CrewAI LLMs, docs for 1.15.39 (read November 10, 2026)"
    url: "https://docs.crewai.com/v1.15.39/en/concepts/llms"
  - title: "CrewAI Flows, including @persist, docs for 1.15.39 (read November 10, 2026)"
    url: "https://docs.crewai.com/v1.15.39/en/concepts/flows"
  - title: "CrewAI MCP servers as tools (read November 10, 2026)"
    url: "https://docs.crewai.com/edge/en/mcp/overview"
  - title: "CrewAI testing, docs for 1.15.39 (read November 10, 2026)"
    url: "https://docs.crewai.com/v1.15.39/en/concepts/testing"
  - title: "CrewAI AMP Agent Control Plane (read November 10, 2026)"
    url: "https://docs-platform.crewai.com/platform/en/features/agent-control-plane/overview"
  - title: "CrewAI pricing (read November 10, 2026)"
    url: "https://crewai.com/pricing"
  - title: "CrewAI AMP custom MCP servers (read November 10, 2026)"
    url: "https://docs-platform.crewai.com/platform/en/guides/custom-mcp-server"
  - title: "PyPI JSON for crewai 1.15.39 (read November 10, 2026)"
    url: "https://pypi.org/pypi/crewai/json"
  - title: "npm registry for the package named crewai (read November 10, 2026)"
    url: "https://registry.npmjs.org/crewai"
  - title: "OpenAI Agents SDK guide (read November 10, 2026)"
    url: "https://developers.openai.com/api/docs/guides/agents/sdk"
  - title: "OpenAI Agents SDK models (read November 10, 2026)"
    url: "https://openai.github.io/openai-agents-python/models/"
  - title: "OpenAI Agents SDK sessions (read November 10, 2026)"
    url: "https://openai.github.io/openai-agents-python/sessions/"
  - title: "OpenAI Agents SDK tracing (read November 10, 2026)"
    url: "https://openai.github.io/openai-agents-python/tracing/"
  - title: "OpenAI Agents SDK MCP (read November 10, 2026)"
    url: "https://openai.github.io/openai-agents-python/mcp/"
  - title: "OpenAI, Evaluate agent workflows (read November 10, 2026)"
    url: "https://developers.openai.com/api/docs/guides/agent-evals"
  - title: "PyPI JSON for openai-agents 0.24.0 (read November 10, 2026)"
    url: "https://pypi.org/pypi/openai-agents/json"
  - title: "npm registry for @openai/agents (read November 10, 2026)"
    url: "https://registry.npmjs.org/@openai/agents"
  - title: "AI Agents Info, which framework people install (downloads through November 8, 2026)"
    url: "https://www.aiagentsinfo.com/blog/which-ai-agent-framework-do-people-install"
faq:
  - question: "Which should you pick, LangGraph, CrewAI, or the OpenAI Agents SDK?"
    answer: "Pick LangGraph when a run must pause or crash and resume from a checkpoint. Pick CrewAI when the work is a crew of roles or a Flow, on Python 3.10 through 3.13. Pick the OpenAI Agents SDK when you will host a small loop of handoffs, guardrails, sessions, and default tracing. All three libraries were MIT and free to import on November 10, 2026. The bills are LangSmith, CrewAI AMP, and the model API."
  - question: "Are LangGraph, CrewAI, and the OpenAI Agents SDK free?"
    answer: "The libraries are free under MIT. On November 10, 2026 LangSmith Developer was $0 for one seat and 5,000 base traces a month, and Plus was $39 per seat with 10,000 base traces. CrewAI AMP Basic was free for 50 workflow executions a month, and Enterprise was custom. The OpenAI Agents SDK has no seat price. You pay the model API, and the tracing page says traces in the OpenAI dashboard are free."
  - question: "What versions were current on November 10, 2026?"
    answer: "PyPI listed langgraph 1.2.20, uploaded November 5; crewai 1.15.39, uploaded November 9; and openai-agents 0.24.0, uploaded October 15. npm listed @langchain/langgraph 1.7.3, published November 10, and @openai/agents 0.21.0, published October 20. GitHub’s latest LangGraph release that morning was langgraph-sdk 0.4.14 from November 6, which is not the core library."
  - question: "Which model does the OpenAI Agents SDK use if you do not set one?"
    answer: "The models page, read November 10, 2026, says an Agent with no model set uses gpt-5.6-luna, with reasoning effort none and verbosity low. The same page tells you to set gpt-5.6-sol when you want a frontier model. CrewAI’s LLM page does not name one default model. Its test command defaults to gpt-6-luna and says the only provider for that command is OpenAI."
  - question: "Do LangGraph, CrewAI, and the OpenAI Agents SDK support MCP?"
    answer: "They support it in different places. CrewAI’s docs put MCP servers on an agent through the mcps field, over stdio, SSE, or streamable HTTP. The OpenAI Agents SDK documents hosted MCP, streamable HTTP, SSE, and stdio. LangGraph nodes call tools you pass in. LangChain’s MCPAdapter, in beta from langchain 1.4.0, adapts MCP servers into LangChain tools. A deployed LangSmith Agent Server exposes agents at /mcp."
  - question: "Can a LangGraph run resume after a crash?"
    answer: "Yes, if you compiled the graph with a checkpointer that survives the process. The persistence page says InMemorySaver and MemorySaver live in RAM and disappear on restart. It names SqliteSaver for local development and PostgresSaver for production. CrewAI Flows can persist with @persist, which defaults to SQLite. The OpenAI Agents SDK resumes an interrupted run through the same session, which stores conversation items, not a graph checkpoint."
  - question: "Does CrewAI 1.15.39 support Python 3.14?"
    answer: "No. The PyPI metadata for crewai 1.15.39, read November 10, 2026, requires Python >=3.10 and <3.14. langgraph 1.2.20 and openai-agents 0.24.0 require Python >=3.10 and do not print an upper bound on that page."
  - question: "Is npm install crewai the CrewAI framework?"
    answer: "The registry record read November 10, 2026 says the package crewai is at 1.0.1, published August 21, 2024, and its repository field points at github.com/jaafarskafi1/crew-js. CrewAI 1.15.39 is the Python package on PyPI. The docs install that package."
---

Updated November 10, 2026. Versions, licenses, prices, and model defaults below were read that day from PyPI, npm, GitHub, and the vendor docs.

LangGraph, CrewAI, and the OpenAI Agents SDK are three [harnesses](/glossary/harness) you import. Each one is MIT. None of them charges for the `import`. The money starts when you want someone else’s traces, a hosted runner, or the model on the other side of the call.

The short version: use LangGraph when the run has to resume. Use CrewAI when the work is a crew of roles. Use the OpenAI Agents SDK when you want the smallest loop and you will host it. The rest of this page is the versions, the bills, and the places those three sentences break.

## Which harness should you ship: LangGraph, CrewAI, or the OpenAI Agents SDK?

Ship the harness whose failure mode you can already name.

[LangGraph](https://docs.langchain.com/oss/python/langgraph/overview) is a graph of state, nodes, and edges. The overview calls it a low-level orchestration runtime for long-running, stateful agents, and it says the library does not prescribe prompts or an agent architecture. A [checkpoint](/glossary/checkpoint) is how a paused or crashed run continues. That is the reason to take on the graph.

[CrewAI](/directory/crewai) is a crew of role-playing agents, plus Flows for event-driven steps. Version 1.15.39 runs on Python 3.10 through 3.13. The open-source library is the code. CrewAI AMP is the hosted studio, and its free plan stops at 50 workflow executions a month.

The [OpenAI Agents SDK](/directory/openai-agents-sdk) is an agent, a runner, tools, [handoffs](/glossary/agent-handoff), guardrails, [sessions](/glossary/agent-session), and a [trace](/glossary/agent-trace). The SDK guide says your server owns deployment, tools, state, and approvals. The same page separates that from the Agents API, which is a managed harness inside OpenAI’s service.

A [framework](/best/ai-agent-frameworks) comparison that only sorts release tags will not make this choice. Nineteen of those tags, read November 9, are on [Best AI agent frameworks](/best/ai-agent-frameworks). What people actually downloaded through November 8 is [Which AI agent framework do people install?](/blog/which-ai-agent-framework-do-people-install). The workshop around the model, in the abstract, is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness).

## What are the versions, licenses, and languages on November 10, 2026?

The version numbers do not line up, even inside LangGraph. GitHub’s latest-release endpoint, PyPI, and npm were three different artifacts on the morning of November 10.

<div class="table-scroll">
<table>
<thead>
<tr>
<th></th>
<th>LangGraph</th>
<th>CrewAI</th>
<th>OpenAI Agents SDK</th>
</tr>
</thead>
<tbody>
<tr>
<td>Python package</td>
<td>langgraph 1.2.20, uploaded 2026-11-05T02:20:37Z. Requires Python &gt;=3.10.</td>
<td>crewai 1.15.39, uploaded 2026-11-09T01:07:50Z. Requires Python &gt;=3.10 and &lt;3.14.</td>
<td>openai-agents 0.24.0, uploaded 2026-10-15T02:38:18Z. Requires Python &gt;=3.10. PyPI classifiers include MIT.</td>
</tr>
<tr>
<td>JavaScript package</td>
<td>@langchain/langgraph 1.7.3, registry time 2026-11-10T00:00:50.710Z. License field MIT.</td>
<td>The docs install the Python package. The npm package named crewai was 1.0.1, published 2024-08-21, repository github.com/jaafarskafi1/crew-js.</td>
<td>@openai/agents 0.21.0, registry time 2026-10-20T22:14:20.969Z. License field MIT.</td>
</tr>
<tr>
<td>GitHub latest release</td>
<td>sdk==0.4.14 (langgraph-sdk), published 2026-11-06T03:03:34Z. That tag is the SDK package, not langgraph 1.2.20.</td>
<td>1.15.39, published 2026-11-09T01:07:14Z.</td>
<td>v0.24.0 on openai/openai-agents-python, published 2026-10-15T02:20:12Z.</td>
</tr>
<tr>
<td>License</td>
<td>MIT. GitHub’s SPDX id on langchain-ai/langgraph.</td>
<td>MIT. GitHub’s SPDX id on crewAIInc/crewAI.</td>
<td>MIT. GitHub’s SPDX id on openai/openai-agents-python and openai/openai-agents-js.</td>
</tr>
<tr>
<td>Stars in the 11:45 UTC pass</td>
<td>44,746 on langchain-ai/langgraph.</td>
<td>60,723 on crewAIInc/crewAI. That is 15,977 more than LangGraph.</td>
<td>30,600 on openai/openai-agents-python. 4,001 on openai/openai-agents-js.</td>
</tr>
<tr>
<td>What the library is</td>
<td>A state graph. Durable execution, streaming, human-in-the-loop, persistence. LangChain is optional.</td>
<td>Role-playing agents, plus Flows with state and @persist.</td>
<td>A runner you embed. Your process owns the loop.</td>
</tr>
</tbody>
</table>
</div>

The star and version rows are a reading of public APIs on November 10, 2026. The LangGraph releases response carried HTTP Date `Tue, 10 Nov 2026 11:45:33 GMT`. The PyPI reads carried `11:45:44 GMT`. The numbers are licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Credit AI Agents Info if you reuse them.

Treat “latest” as a question about which artifact. A blog that says LangGraph is “on 0.4.14” is quoting the SDK tag. A blog that says it is “on 1.7.3” is quoting npm. The package `pip install langgraph` resolved to 1.2.20.

## What does each library cost once you leave the README?

The license fee is zero. Three other bills are printed.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Bill</th>
<th>LangGraph</th>
<th>CrewAI</th>
<th>OpenAI Agents SDK</th>
</tr>
</thead>
<tbody>
<tr>
<td>Library</td>
<td>MIT. No seat fee in the overview.</td>
<td>MIT. No seat fee on the framework docs.</td>
<td>MIT. No seat fee on the SDK guide.</td>
</tr>
<tr>
<td>Hosted product, list price</td>
<td><a href="https://www.langchain.com/pricing">LangSmith</a>. Developer is $0 per seat, one seat, up to 5,000 base traces a month, then pay as you go. Plus is $39 per seat per month, unlimited seats, up to 10,000 base traces, then pay as you go. Enterprise is custom.</td>
<td><a href="https://crewai.com/pricing">CrewAI AMP</a>. Basic is free and includes 50 workflow executions a month. Enterprise is custom. The public page does not print a price past those 50 executions.</td>
<td>No SDK plan. You pay the model provider. The tracing page says to view free traces in the OpenAI dashboard, and that non-OpenAI models can export traces with an OpenAI API key for free tracing.</td>
</tr>
<tr>
<td>What the paid tier adds</td>
<td>Plus adds Deployment, Engine, and one free small serverless deployment. Further deployments are metered. Enterprise adds self-hosted and hybrid hosting. One LangChain Standard Unit is $1.</td>
<td>Enterprise adds SSO, RBAC, workload identity, PII redaction, policies, and deploy on CrewAI cloud, your VPC, or your own infrastructure. The Agent Control Plane docs say creating or editing a PII redaction policy requires an Enterprise or Ultra plan. The alert they quote says the policies require an Enterprise plan. The public pricing page lists Basic and Enterprise and does not print an Ultra price.</td>
<td>The Agents API, named on the SDK guide, is a managed harness in OpenAI’s service. It is a different product from the SDK.</td>
</tr>
<tr>
<td>Trace retention, where printed</td>
<td>A base trace is kept 14 days. An extended trace is kept 180 days, for an extra fee.</td>
<td>The pricing page lists tracing and OpenTelemetry on Basic and on Enterprise. It does not print a retention window.</td>
<td>The tracing page does not print a retention window. Tracing is off for organizations on a Zero Data Retention policy.</td>
</tr>
</tbody>
</table>
</div>

A buyer who hears “we’ll use LangGraph” still has to ask which of three things that means: the MIT library with your own Postgres, a LangSmith Developer seat, or Plus at $39 per seat so Deployment is on the table. A buyer who hears “CrewAI” has the same split between `pip install crewai` and an AMP workspace that includes 50 executions. A buyer who hears “OpenAI agents” has to ask whether the process is yours or the Agents API’s.

Model tokens sit on top of all three. This page does not reprint token prices. The harness that spends them, for the two coding products, is compared in [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing).

## Which models can the harness call?

LangGraph does not pick a model. The overview says docs examples often use LangChain for models and tools, and that LangGraph does not require LangChain. You call a model from a node. There is no default model string on that page.

CrewAI’s LLM page, read the same day, says it has native SDK integrations for OpenAI, Anthropic, Google’s Gemini API, Azure, AWS Bedrock, and Snowflake Cortex. Every other provider goes through LiteLLM. The examples printed on that page include `openai/gpt-5.6-terra`, `anthropic/claude-sonnet-4-6`, and `gemini/gemini-3.6-flash`. Those are the page’s examples. The same page tells you to check the provider’s catalog because models are added and retired. The testing page is narrower: `crewai test` defaults to 3 iterations and `gpt-6-luna`, and it says the only provider for that command is OpenAI.

The OpenAI Agents SDK is explicit. If the agent does not set a model, the models page says the SDK uses `gpt-5.6-luna` with `reasoning.effort="none"` and `verbosity="low"`. Set `model="gpt-5.6-sol"` when you want the frontier settings that page describes. Non-OpenAI providers start with the SDK’s own integration points. LiteLLM and Any-LLM are in the SDK as best-effort beta adapters. A handoff can carry a different model than the agent that passed it the turn. Hosted multi-agent on the Responses API is marked experimental on that page, and it is a different mechanism from a handoff.

## How do tools and MCP attach?

All three can call tools. [MCP](/glossary/model-context-protocol) is not one switch with the same owner.

LangGraph’s unit of work is a node. You pass tools into the node that should call them. The MCP page in the LangChain docs is `MCPAdapter`, and it requires `langchain[mcp]>=1.4.0`. The page says that namespace is in beta. Its quickstart builds a LangChain agent with `create_agent`, then hands that agent the tools `list_tools()` returned. Transports on that page are an in-process server, a script over stdio, and an `http` or `https` URL over streamable HTTP. Separately, LangSmith’s Agent Server exposes a deployed graph as MCP at `/mcp`, over streamable HTTP, for protocol revisions `2024-11-05` through `2026-07-28`. The server page says that needs `langgraph-api>=0.2.3` and `langgraph-sdk>=0.1.61`. Calling an MCP server from a graph, and publishing the graph as an MCP server, are two features.

CrewAI puts MCP on the agent. The MCP overview documents a `mcps` field, string references for a remote URL or a named catalog server, and structured configs. Transports listed there are stdio, server-sent events, and streamable HTTPS. The simple path needs the `mcp` library. The adapter path is `crewai-tools[mcp]`. AMP’s custom-MCP guide is streamable HTTP only, with no auth, a bearer token, or OAuth 2.0. The pricing page says Basic and Enterprise can both export a workflow as an MCP server.

The OpenAI Agents SDK documents four MCP shapes on its MCP page: `HostedMCPTool`, so OpenAI’s Responses API calls a public server; `MCPServerStreamableHttp`; `MCPServerSse`; and `MCPServerStdio`. Tracing records the list-tools call and the tool calls. Hosted MCP and a server your process opens are different trust boundaries. The integrations page says to use hosted MCP for a public server that fits the platform’s trust model, and a local or private server when your runtime should own the connection.

[Tool use](/glossary/tool-use) is the general name for the call. The JSON you send on every turn has its own cost, measured on [Why tool JSON costs more than your system prompt](/blog/why-tool-json-costs-more-than-your-system-prompt).

## Where do traces and evals live?

A trace tells you what the run did. An eval tells you whether a change helped. These libraries do not put both in the same box.

LangSmith’s pricing page includes tracing, monitoring, and online and offline evals on the observability product. Tuned Evaluators are priced at 0.015 LSU per successful evaluation run. The page says they are in public beta for Plus and for Cloud Enterprise in the US, and that skipped or failed evaluations are not billed. LangSmith Engine, on Plus, reads traces and proposes fixes. That is a LangChain product on top of the library, not a function inside `langgraph`.

CrewAI’s testing page is a CLI: `crewai test`, defaulting to three iterations and `gpt-6-luna`, OpenAI only. It prints task scores. AMP’s pricing comparison lists tracing, OpenTelemetry, LLM testing, guardrails, and human-in-the-loop input on both Basic and Enterprise. The open-source test command and the AMP checkboxes are different products.

The OpenAI Agents SDK turns tracing on by default. The tracing page says a run records generations, tool calls, handoffs, guardrails, and custom spans, and that you can disable it with `OPENAI_AGENTS_DISABLE_TRACING=1` or a run flag. Sensitive inputs and outputs are included unless you turn `trace_include_sensitive_data` off. Grading those traces is the platform page [Evaluate agent workflows](https://developers.openai.com/api/docs/guides/agent-evals): start with trace grading, then move to datasets and eval runs. That grader is not a function this page found inside the SDK.

How to build the tasks, the isolation, and the grader yourself is [How to build an eval harness for AI agents](/blog/how-to-build-an-eval-harness-for-ai-agents). How to read a harness score without mixing boards is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness).

## Where does the run resume after a crash?

This is the sharpest split, and it is why “they all have memory” is a useless sentence.

LangGraph’s persistence page gives you two stores. A checkpointer saves snapshots of one thread’s graph state, for conversation continuity, human-in-the-loop, time travel, and fault tolerance. A store saves key-value data across threads. `InMemorySaver` and `MemorySaver` sit in RAM. The page says a process restart drops them. Production is `PostgresSaver` or `AsyncPostgresSaver`, and the `thread_id` has to stay under 255 characters. `SqliteSaver` is the local-file option. Agent Server, if you deploy there, handles the checkpointer for you and still requires PostgreSQL for threads, runs, assistants, crons, and the memory store. The checkpointer itself can be Postgres, MongoDB, or custom.

CrewAI Flows keep state on the flow object while it runs. `@persist` writes that state so a later kickoff can resume or fork. The default named on the page is `SQLiteFlowPersistence`. `kickoff(inputs={"id": ...})` resumes under the same id. `kickoff(restore_from_state_id=...)` forks a new id from the latest snapshot. That is flow state. It is not the per-node graph checkpoint LangGraph describes.

The OpenAI Agents SDK session stores conversation items and prepends them on the next turn. The Python page’s built-in list is `SQLiteSession`, `AsyncSQLiteSession`, `RedisSession`, `SQLAlchemySession`, `MongoDBSession`, `DaprSession`, `OpenAIConversationsSession`, plus wrappers for compaction and encryption. If a run pauses for approval, you resume it with the same session. A session cannot be combined, in the same run, with `conversation_id`, `previous_response_id`, or `auto_previous_response_id`. Those are the server-managed continuation options. A session replays history into the next call. It does not restore a half-finished graph node.

If a human has to approve a tool, LangGraph pauses the graph, CrewAI AMP lists human-in-the-loop on the pricing page, and the OpenAI SDK pauses on an interruption you approve and then resume. The glossary entries are [human in the loop](/glossary/human-in-the-loop) and [approval gate](/glossary/approval-gate).

## Where does production hosting sit?

LangGraph runs in your process. You bring the checkpointer. LangSmith Deployment is the managed runner, and the pricing FAQ says Plus includes one free small serverless deployment, meant to scale to zero, with dedicated deployments for a customer-facing agent. Enterprise can be fully managed, hybrid, or self-hosted. Developer, at $0, is the tracing seat. The “which plan” answer on that page puts Deployment on Plus.

CrewAI runs in your process when you use the library. AMP is the managed path: Basic includes infrastructure on the comparison table, and Enterprise is the line that says cloud, your VPC, or your own infrastructure. The pricing page does not print a region list or a per-execution overage.

The OpenAI Agents SDK runs in your process. The SDK guide’s words are that your server owns deployment, tool implementations, state storage, and approval decisions. Sandbox agents are available when the agent needs a container, files, and commands. That sandbox is still an SDK feature you configure. The Agents API is the product where OpenAI runs the harness.

Coding agents that already own a shell are a different shelf. [Claude Code](/directory/claude-code), [Codex](/directory/codex), and the [Claude Agent SDK](/directory/claude-agent-sdk) are on it. So are [Google ADK](/directory/google-adk) and [Pydantic AI](/directory/pydantic-ai), if the constraint is Google Cloud, Go, or typed Python outputs. Those five are outside this comparison on purpose. The [harness table](/best/ai-agent-harnesses) is the wider list. The [harnesses hub](/topics/harnesses) is the shelf.

## Which should a builder pick, and which should a buyer pay for?

**Builder, the run must survive a restart or a person who answers tomorrow.** LangGraph, with `PostgresSaver` or Agent Server. Budget a LangSmith Plus seat only if you want their deployment and their evals. A Postgres you already operate does not require that seat.

**Builder, the spec is a team of specialists and the language is Python 3.13 or older.** CrewAI. Stay on the library until a non-engineer needs the studio. AMP Basic’s 50 executions are a ceiling you can hit in a week of demos.

**Builder, the product is a Python or TypeScript service you already deploy, and the control flow is handoffs plus a few tools.** The OpenAI Agents SDK. Set the model on purpose if `gpt-5.6-luna` is the wrong cost. Turn sensitive trace data off before the first production run. If the organization is on Zero Data Retention, tracing will not be there.

**Buyer, a vendor’s proposal says “open source, so the platform is free.”** Ask for the seat, the execution cap, and the model invoice as three lines. LangSmith Plus is $39 per seat before traces past 10,000. CrewAI Enterprise has no public dollar figure. The OpenAI SDK’s platform fee is the model bill, plus a separate decision if they meant the Agents API.

**Buyer, the proposal leads with GitHub stars.** On this pass CrewAI had 60,723 and LangGraph had 44,746. From October 10 through November 8, 2026, the download page on this site counted 55,093,579 PyPI downloads for `langgraph` and 2,629,769 for `crewai`. Stars and installs answered different questions. Neither number is a quality score.

## What do the star counts and the npm name get wrong?

Three mistakes show up in other comparison posts. Each one was false on the sources read today.

The first is one version number for LangGraph. Core Python, the Python SDK tag, and the npm package were 1.2.20, 0.4.14, and 1.7.3. Shipping a lockfile against “LangGraph latest” without saying which registry will not reproduce.

The second is `npm install crewai`. That name resolved to 1.0.1 from August 21, 2024, with a repository field of `git+https://github.com/jaafarskafi1/crew-js.git`. A maintainer email on the registry record is `greyson@crewai.com`. The package CrewAI’s own docs tell you to install is the Python distribution `crewai` 1.15.39.

The third is reading stars as the install. CrewAI led this trio by 15,977 stars at 11:45 UTC. The download window that ended November 8 had LangGraph ahead by a wide margin, and that margin is computed on the install page, not re-summed here. The live counters are the [downloads tracker](/trackers/downloads) and the [stars tracker](/trackers/stars).

[Multi-agent orchestration](/blog/what-is-multi-agent-orchestration) is the research question of which calls to make together. [How AI agents work](/blog/how-do-ai-agents-work) is the loop these libraries implement. This page is the purchasing and lockfile decision in front of both.

## Frequently asked questions

### Which should you pick, LangGraph, CrewAI, or the OpenAI Agents SDK?

LangGraph, if the run has to resume from a checkpoint. CrewAI, if the work is roles and Flows on Python 3.10 through 3.13. The OpenAI Agents SDK, if you will host a small handoff loop and you want tracing on by default. The libraries are MIT. LangSmith, CrewAI AMP, and the model API are the bills.

### Are LangGraph, CrewAI, and the OpenAI Agents SDK free?

The libraries are. LangSmith Developer is $0 for one seat and 5,000 base traces a month. Plus is $39 per seat and 10,000 base traces. CrewAI AMP Basic is free for 50 workflow executions a month. Enterprise is custom. The OpenAI SDK has no seat price. Traces in the OpenAI dashboard are described as free, and they are unavailable under Zero Data Retention.

### What versions were current on November 10, 2026?

`langgraph` 1.2.20, `crewai` 1.15.39, and `openai-agents` 0.24.0 on PyPI. `@langchain/langgraph` 1.7.3 and `@openai/agents` 0.21.0 on npm. GitHub’s latest LangGraph tag was `sdk==0.4.14`.

### Which model does the OpenAI Agents SDK use if you do not set one?

`gpt-5.6-luna`, with reasoning effort none and verbosity low. The models page points at `gpt-5.6-sol` for frontier work. CrewAI’s test command defaults to `gpt-6-luna` and OpenAI only. LangGraph does not name a default model.

### Do all three support MCP?

CrewAI and the OpenAI Agents SDK document client transports in the framework docs, including stdio and streamable HTTP. LangGraph calls tools you pass into a node. LangChain’s MCP adapter is a beta LangChain feature. Agent Server can also publish a deployed graph at `/mcp`.

### Can a LangGraph run resume after a crash?

With `PostgresSaver` or `SqliteSaver`, yes. With `InMemorySaver`, the checkpoint dies with the process. CrewAI’s `@persist` defaults to SQLite and can resume or fork a Flow. An OpenAI Agents SDK session stores the conversation and resumes an approval. It is not a graph checkpoint.

### Does CrewAI 1.15.39 support Python 3.14?

The PyPI metadata says no. It requires Python at least 3.10 and below 3.14.

### Is npm install crewai the CrewAI framework?

The npm package `crewai` was 1.0.1 from August 21, 2024, pointed at `jaafarskafi1/crew-js`. CrewAI 1.15.39 is the Python package.
