---
title: "60,871 stars shipped November 12. The 61,809-star repo did not."
description: "At 03:46 UTC on November 14, 2026, CrewAI had 60,871 stars and a release from November 12. AutoGen had 61,809 stars and its latest release was still September 30, 2025. Eleven frameworks, one job each."
date: "2026-11-14"
updated: "2026-11-14"
type: original-report
topics:
  - research
  - tools-saas
  - how-agents-work
  - harnesses
contentLicense: true
absoluteTitle: true
companies:
  - langchain
  - crewai
  - openai
  - openai-agents-sdk
  - google
  - google-adk
  - microsoft
  - microsoft-agent-framework
  - pydantic-ai
  - huggingface
  - smolagents
dataset:
  title: "GitHub stars, forks, contributors, licenses, and latest releases for 11 AI agent frameworks, November 14, 2026"
  description: "GitHub REST API census with HTTP Date headers from Sat, 14 Nov 2026 03:46:14 GMT through 03:46:22 GMT. Stars, forks, primary language, SPDX license, and latest release are from GET /repos/{owner}/{repo} and GET /repos/{owner}/{repo}/releases/latest. Contributor counts are the last page number of GET /repos/{owner}/{repo}/contributors?per_page=1&anon=0. langchain-ai/langgraph 44932 stars, 7747 forks, 288 contributors, MIT, release 1.2.22 at 2026-11-14T01:43:55Z. crewAIInc/crewAI 60871, 9177, 368, MIT, 1.15.41 at 2026-11-12T18:42:07Z. openai/openai-agents-python 30661, 5051, 401, MIT, v0.24.0 at 2026-10-15T02:20:12Z. google/adk-python 22209, 4356, 431, Apache-2.0, v2.14.1 at 2026-11-12T21:30:11Z. microsoft/agent-framework 14668, 2622, 342, MIT, python-1.26.0 at 2026-11-13T08:28:16Z. mastra-ai/mastra 29512, 3095, 466, SPDX NOASSERTION, @mastra/core@1.83.0 at 2026-11-13T14:32:29Z. pydantic/pydantic-ai 21199, 3169, 475, MIT, v2.68.0 at 2026-11-12T01:56:19Z. huggingface/smolagents 30360, 3214, 203, Apache-2.0, v1.26.0 at 2026-05-29T05:09:47Z. microsoft/autogen 61809, 9400, 443, CC-BY-4.0, python-v0.7.5 at 2025-09-30T06:18:26Z, archived false. ag2ai/ag2 5063, 791, 432, Apache-2.0, v.1.3.1 at 2026-11-10T21:03:11Z. run-llama/llama_index 52894, 8558, 476, MIT, v0.14.26 at 2026-11-13T22:38:15Z. A second GET the same morning returned fork false for all 11. Language shares are from GET /repos/{owner}/{repo}/languages."
  isBasedOn: "https://api.github.com/repos/crewAIInc/crewAI"
abstract: |
  At 03:46 UTC on November 14, 2026, crewAIInc/crewAI had 60,871 GitHub stars and a latest release, 1.15.41, published November 12. microsoft/autogen had more stars, 61,809, and its latest release was still python-v0.7.5 from September 30, 2025, which is 410 days before this pull. The GitHub field archived was false. The README on main says the project is archived and that Microsoft is not providing fixes or support.

  The install decision is the job, not the star sort. LangGraph 1.2.22, published at 01:43 UTC the same morning, is the checkpointed Python graph. CrewAI is the role-based crew, with a free hosted plan of 50 workflow executions a month. The OpenAI Agents SDK is the small handoff loop you host, and tracing is on by default. Google ADK names Agent Runtime, Cloud Run, and GKE. Microsoft Agent Framework python-1.26.0, tagged November 13, is the successor the AutoGen README points at, and its workflow page checkpoints to memory, disk, or Cosmos DB.
whyItMatters: |
  A star sort on this set picks a repository whose own README tells new users to start somewhere else. That is the failure mode of the comparison pages that rank frameworks by popularity and then fill the capability cells from memory.

  Three tags also moved after this site's November 13 protocol note. GitHub's latest release for microsoft/agent-framework is now python-1.26.0, published 2026-11-13T08:28:16Z. The November 13 note recorded GET /releases/tags/python-1.26.0 as 404. mastra-ai/mastra's latest release is now @mastra/core@1.83.0, published 2026-11-13T14:32:29Z. langchain-ai/langgraph published 1.2.22 at 01:43 UTC on November 14. Those are release clocks. They are not a reason to ignore the job.
keyFindings:
  - "crewAIInc/crewAI had 60,871 stars, 9,177 forks, and 368 contributors at 03:46 UTC on November 14, 2026. Latest release 1.15.41 was published 2026-11-12T18:42:07Z. microsoft/autogen had 61,809 stars, 9,400 forks, and 443 contributors, and its latest release was still python-v0.7.5 from 2025-09-30T06:18:26Z. The repository field archived was false."
  - "langchain-ai/langgraph published release 1.2.22 at 2026-11-14T01:43:55Z, about two hours before this pull. The notes since 1.2.21 are performance fixes, a subgraph streaming fix, and releases of the checkpoint packages. Stars were 44,932. Contributors were 288, the second-lowest count in the set."
  - "Contributor counts from the contributors API, anonymous commits excluded, put run-llama/llama_index first at 476, pydantic/pydantic-ai at 475, and mastra-ai/mastra at 466. huggingface/smolagents was last at 203, and its latest release is v1.26.0 from May 29, 2026."
  - "LangGraph's persistence page describes checkpointers for thread state and stores for cross-thread memory. Pydantic AI's durable-execution page names nine engines, including Temporal, DBOS, Prefect, and Restate. LlamaIndex's durable-workflows page says there is no built-in checkpointer to enable."
  - "Hosted runtimes named on pages read the same day: CrewAI AMP Basic is free and includes 50 workflow executions a month. Google ADK's deploy page names Agent Runtime, Cloud Run, GKE, and your own container. LangSmith Agent Server names Cloud, Hybrid, self-hosted, and standalone containers. Mastra's deploy page names a Mastra platform Server product plus Vercel, Netlify, and Cloudflare deployers."
methodology: |
  The census is eleven repositories chosen because a builder comparing agent frameworks in November 2026 actually has to choose among them: langchain-ai/langgraph, crewAIInc/crewAI, openai/openai-agents-python, google/adk-python, microsoft/agent-framework, mastra-ai/mastra, pydantic/pydantic-ai, huggingface/smolagents, microsoft/autogen, ag2ai/ag2, and run-llama/llama_index. The set is named. It is not a ranking of every agent repository on GitHub.

  Stars, forks, the archived flag, the primary language, the SPDX license, and the description come from GET /repos/{owner}/{repo}. The HTTP Date headers on those responses run from Sat, 14 Nov 2026 03:46:14 GMT through Sat, 14 Nov 2026 03:46:22 GMT. Latest release tag and published_at come from GET /repos/{owner}/{repo}/releases/latest in the same pass. A second GET of each repository, later the same morning and still on November 14, returned fork: false for all eleven. The first pass had already returned archived: false for all eleven, including microsoft/autogen.

  Contributor counts are the page number on rel="last" from GET /repos/{owner}/{repo}/contributors?per_page=1&anon=0. That endpoint lists GitHub accounts with commits the API returns. Anonymous contributors are excluded. It is not a headcount of current maintainers, and a repository that imported history without using GitHub's fork button can carry authors who never opened a pull request against the new name. None of these eleven returned fork: true.

  Language shares are byte counts from GET /repos/{owner}/{repo}/languages, divided by the sum of those bytes. A second language is reported only when it is at least 10 percent. Calendar age is the number of UTC dates from the release's published_at date through 2026-11-14. September 30, 2025 through November 14, 2026 is 410 days. Partial hours are not added.

  Capability cells come from the vendor's own documentation pages fetched on November 14, 2026, plus the AutoGen and AG2 READMEs on main and Mastra's LICENSE.md from the license API at 03:47 UTC. A cell says what that page describes. A feature that was not on the page fetched today is not filled in from the November 13 protocol note. That note remains the cell-by-cell read for A2A and for MCP server paths this page did not re-fetch.
limitations:
  - "Eleven repositories is a named set. Claude Agent SDK, Semantic Kernel, DSPy, Strands, Agno, and the Vercel AI SDK are outside it. Strands and Agno are on the November 13 protocol note."
  - "The contributors API can omit accounts, and GitHub's own documentation has capped how far that list goes. Treat 476 as the last-page count this call returned, not as a census of humans."
  - "microsoft/autogen's LICENSE file is CC BY 4.0, which is the SPDX id GitHub returned. This note did not re-read the PyPI classifier for autogen-agentchat."
  - "Mastra's root LICENSE.md puts Apache 2.0 on content outside ee/. The ee/ license file was not opened. GitHub's SPDX field for the repository is NOASSERTION."
  - "Hosted-runtime cells name the product the docs name. Dollar prices were not on the pages used for those cells, so this note does not repeat prices from older pages on this site."
  - "LangGraph 1.2.22's notes are performance work and a streaming fix, plus checkpoint-package tags in the same release body. A same-day tag is not a new orchestration feature."
references:
  - title: "GitHub REST API, the 11 repositories and their latest releases (HTTP Date 03:46:14–03:46:22 UTC, November 14, 2026)"
    url: "https://api.github.com/repos/crewAIInc/crewAI"
    note: "Stars, forks, license, archived, and latest release. The same calls were made for the other ten repositories."
  - title: "LangGraph persistence (read November 14, 2026)"
    url: "https://docs.langchain.com/oss/python/langgraph/persistence"
    note: "Checkpointers for thread state. Stores for cross-thread memory. MemorySaver does not persist between restarts."
  - title: "LangGraph overview (read November 14, 2026)"
    url: "https://docs.langchain.com/oss/python/langgraph/overview"
    note: "Durable execution and persistence are the orchestration runtime. LangSmith is the separate platform for tracing, evaluation, and deployment."
  - title: "LangSmith Agent Server (read November 14, 2026)"
    url: "https://docs.langchain.com/langsmith/deployment"
    note: "Cloud, Hybrid, self-hosted, and standalone containers. The page says Agent Server is framework-agnostic and names LangGraph and a path for Google ADK."
  - title: "LangChain MCP adapter (read November 14, 2026)"
    url: "https://docs.langchain.com/oss/python/langchain/mcp"
    note: "MCPAdapter connects LangChain agents to MCP servers."
  - title: "LangGraph 1.2.22 release notes"
    url: "https://github.com/langchain-ai/langgraph/releases/tag/1.2.22"
    note: "Published 2026-11-14T01:43:55Z. Changes since 1.2.21 are performance fixes and a subgraph streaming fix, and the body also tags checkpoint 4.3.2 and checkpoint-postgres 3.2.1."
  - title: "CrewAI Flows, docs for 1.15.41 (read November 14, 2026)"
    url: "https://docs.crewai.com/v1.15.41/en/concepts/flows"
    note: "The @persist decorator persists flow state. The default named on the page is SQLiteFlowPersistence."
  - title: "CrewAI MCP overview, docs for 1.15.41 (read November 14, 2026)"
    url: "https://docs.crewai.com/v1.15.41/en/mcp/overview"
    note: "The page describes integrating MCP servers as tools with the crewai-tools library."
  - title: "CrewAI pricing (read November 14, 2026)"
    url: "https://crewai.com/pricing"
    note: "Basic is Free and lists 50 workflow executions a month. Enterprise is Custom and says deploy on CrewAI cloud, your own VPC, or your own infrastructure."
  - title: "OpenAI Agents SDK, handoffs (read November 14, 2026)"
    url: "https://openai.github.io/openai-agents-python/handoffs/"
    note: "Handoffs let an agent delegate to another agent."
  - title: "OpenAI Agents SDK, sessions (read November 14, 2026)"
    url: "https://openai.github.io/openai-agents-python/sessions/"
    note: "Session memory across runs. SQLite, Redis, and SQLAlchemy backends are documented. A paused approval resumes with the same session."
  - title: "OpenAI Agents SDK, tracing (read November 14, 2026)"
    url: "https://openai.github.io/openai-agents-python/tracing/"
    note: "Tracing is enabled by default. It is unavailable for organizations on a Zero Data Retention policy."
  - title: "OpenAI Agents SDK, MCP (read November 14, 2026)"
    url: "https://openai.github.io/openai-agents-python/mcp/"
    note: "Hosted MCP server tools, Streamable HTTP, and HTTP with SSE."
  - title: "OpenAI API, Agents guide (read November 14, 2026)"
    url: "https://developers.openai.com/api/docs/guides/agents"
    note: "The guide separates the Agents SDK, which your application runs, from hosted orchestration on the Agents API."
  - title: "Google ADK, deploying your agent (read November 14, 2026)"
    url: "https://adk.dev/deploy/"
    note: "Agent Runtime, Cloud Run, GKE, or a container you run yourself."
  - title: "Google ADK, session, state, and memory (read November 14, 2026)"
    url: "https://adk.dev/sessions/"
    note: "In-memory session and memory services lose data on restart. The page also names cloud and database backends."
  - title: "Google ADK, why evaluate agents (read November 14, 2026)"
    url: "https://adk.dev/evaluate/"
    note: "Trajectory and final-response evaluation, test files, eval sets, and a conformance command."
  - title: "Google ADK, MCP tools (read November 14, 2026)"
    url: "https://adk.dev/tools-custom/mcp-tools/"
    note: "McpToolset is the client. to_mcp_server exposes ADK tools as an MCP server."
  - title: "Microsoft Learn, Agent Framework overview (read November 14, 2026)"
    url: "https://learn.microsoft.com/en-us/agent-framework/overview/agent-framework-overview"
    note: "Calls Agent Framework the direct successor of AutoGen and Semantic Kernel. Names MCP clients, workflows, and evaluation services among integrations."
  - title: "Microsoft Learn, workflow checkpoints (read November 14, 2026)"
    url: "https://learn.microsoft.com/en-us/agent-framework/workflows/checkpoints"
    note: "Checkpoints at the end of each superstep. In-memory, file, and Cosmos DB storage. Handoff is one of the built-in orchestration names."
  - title: "AutoGen README on main (read November 14, 2026)"
    url: "https://github.com/microsoft/autogen/blob/main/README.md"
    note: "The README says the project is archived and no longer maintained, and it points new users at Microsoft Agent Framework. The GitHub archived field was still false."
  - title: "AG2 README on main (read November 14, 2026)"
    url: "https://github.com/ag2ai/ag2/blob/main/README.md"
    note: "As of AG2 v1.0 the classic import autogen lives in ag2ai/ag2-classic. This repository is imported as ag2."
  - title: "Mastra storage (read November 14, 2026)"
    url: "https://mastra.ai/docs/storage"
    note: "Persistent storage keeps workflow snapshots, traces, and eval results across restarts. The default in-memory store does not."
  - title: "Mastra workflows (read November 14, 2026)"
    url: "https://mastra.ai/docs/workflows/overview"
    note: "Suspend and resume, and restart from the last active step after a lost connection."
  - title: "Mastra deployment (read November 14, 2026)"
    url: "https://mastra.ai/docs/deployment/overview"
    note: "Any Node server, the Mastra platform Server product, and optional deployers for Vercel, Netlify, and Cloudflare."
  - title: "Mastra MCP (read November 14, 2026)"
    url: "https://mastra.ai/docs/connections/mcp"
    note: "MCPClient and MCPServer, both on MCP revision 2026-07-28."
  - title: "Mastra LICENSE.md (license API, 03:47 UTC, November 14, 2026)"
    url: "https://github.com/mastra-ai/mastra/blob/main/LICENSE.md"
    note: "Apache 2.0 outside the listed ee/ directories. GitHub SPDX for the repo is NOASSERTION."
  - title: "Pydantic AI, durable execution (read November 14, 2026)"
    url: "https://ai.pydantic.dev/durable_execution/overview/"
    note: "Nine engines, including Temporal, DBOS, Prefect, and Restate. StepPersistence snapshots steps without an engine."
  - title: "smolagents tools, docs for v1.26.0 (read November 14, 2026)"
    url: "https://huggingface.co/docs/smolagents/v1.26.0/en/tutorials/tools"
    note: "MCPClient loads tools from an MCP server. The fetched URL resolved to the v1.26.0 docs."
  - title: "smolagents, orchestrate a multi-agent system (read November 14, 2026)"
    url: "https://huggingface.co/docs/smolagents/en/examples/multiagents"
    note: "A notebook that builds a multi-agent web browser. It is an example, not a checkpoint runtime."
  - title: "LlamaIndex, writing durable workflows (read November 14, 2026)"
    url: "https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/"
    note: "No built-in checkpointer to enable. You snapshot context and pass it back to run(). Resume is at-least-once. A DBOS runtime plugin is the alternative."
citation:
  apa: "AI Agents Info. (2026, November 14). 60,871 stars shipped November 12. The 61,809-star repo did not. https://www.aiagentsinfo.com/research/which-ai-agent-framework-to-install-november-2026"
  bibtex: |
    @misc{aiagentsinfo2026frameworkPickNov14,
      title={60,871 stars shipped November 12. The 61,809-star repo did not},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/which-ai-agent-framework-to-install-november-2026},
      note={GitHub API census at 03:46 UTC on November 14, 2026, and vendor docs read the same day}
    }
ledeQuestion: "Which AI agent framework should you install on November 14, 2026?"
ledeAnswer: "Match the job. CrewAI 1.15.41 leads the repos that actually shipped this month, at 60,871 stars. AutoGen's 61,809 stars sit on a September 30, 2025 release, and the README says not to start there."
faq:
  - question: "Which AI agent framework has the most GitHub stars?"
    answer: "In this set of 11, microsoft/autogen had 61,809 stars at 03:46 UTC on November 14, 2026. crewAIInc/crewAI was next at 60,871. AutoGen's latest release was still python-v0.7.5 from September 30, 2025, and the README says the project is archived. The GitHub archived field was false. Star rank is the wrong install order."
  - question: "Which AI agent framework should you install for a run that has to resume?"
    answer: "LangGraph 1.2.22, published at 01:43 UTC on November 14, if you want a checkpointer on a graph you own. Pydantic AI 2.68.0 if the requirement is a named durable engine such as Temporal, DBOS, Prefect, or Restate. Microsoft Agent Framework if you are leaving AutoGen and want checkpoints, including Cosmos DB. LlamaIndex's own durable-workflows page says there is no built-in checkpointer to turn on."
  - question: "Is AutoGen deprecated?"
    answer: "The README on main, read November 14, 2026, says the project is archived and that Microsoft is not providing bug fixes, security fixes, new features, or support. It tells new users to start with Microsoft Agent Framework. The GitHub API still returned archived: false, 61,809 stars, and latest release python-v0.7.5 from September 30, 2025. The longer reading of that split, from November 9, is the AutoGen deprecation note on this site. This page does not reopen the commit history."
  - question: "Which of these frameworks have a hosted runtime?"
    answer: "Pages read November 14 name one for five of them. CrewAI AMP Basic is free and includes 50 workflow executions a month, and Enterprise says you can deploy on CrewAI cloud, your VPC, or your own infrastructure. Google ADK names Agent Runtime, Cloud Run, GKE, or a container you run. LangSmith Agent Server names Cloud, Hybrid, self-hosted, and standalone containers. Mastra names its platform Server product and deployers for Vercel, Netlify, and Cloudflare. The OpenAI Agents SDK runs in your application. The OpenAI Agents guide describes hosted orchestration as a separate API."
  - question: "Did the November 13 protocol matrix go stale overnight?"
    answer: "Two GitHub latest-release tags moved. microsoft/agent-framework's latest release is now python-1.26.0, published 2026-11-13T08:28:16Z. The November 13 note recorded a 404 for that tag. mastra-ai/mastra's latest release is now @mastra/core@1.83.0, published 2026-11-13T14:32:29Z. LangGraph also published 1.2.22 on November 14. The protocol cells on that note were not re-tested as a matrix. This page does not replace them."
---

**Install for the job. The star sort fails.** At 03:46 UTC on November 14, 2026, [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) had **60,871** stars and a latest release, 1.15.41, from November 12. [microsoft/autogen](https://github.com/microsoft/autogen) had **61,809** stars, 56 more, and its latest release was still python-v0.7.5 from September 30, 2025. That is 410 days. The README says the project is archived. The GitHub field `archived` was false.

[LangGraph 1.2.22](https://github.com/langchain-ai/langgraph/releases/tag/1.2.22) published at 01:43 UTC the same morning, with 44,932 stars and 288 contributors, the second-lowest contributor count in this set of 11. The release notes are performance fixes and a streaming fix, not a new orchestration model. The [checkpoint](/glossary/checkpoint) was already the reason to pick it.

This page is the install decision. The [November 5 GitHub snapshot](/reports/ai-agent-framework-github-stats-november-2026) is stars and one tag. The [November 13 protocol matrix](/research/ai-agent-framework-mcp-a2a-support-november-2026) is MCP and A2A. [LangGraph vs CrewAI vs the OpenAI Agents SDK](/blog/langgraph-vs-crewai-vs-openai-agents-sdk) is three bills, read November 10. None of those is today's count, and none of them is the job.

## Which framework do you install?

Match the failure you cannot afford. A crashed run, a crew of roles, a handoff you host yourself, a Google Cloud deploy, or a TypeScript workflow are five different purchases. Stars do not distinguish them.

| The job | Install | Why this one, from a page read November 14 |
| --- | --- | --- |
| A Python run that must pause or crash and then resume | LangGraph 1.2.22 | Checkpointers keep thread state. MemorySaver does not survive a restart. You pick a real saver. |
| A crew of roles, and a free hosted trial is enough to start | CrewAI 1.15.41 | Flows take `@persist`. AMP Basic is free and includes 50 workflow executions a month. |
| The small handoff loop, tracing on, you host the process | OpenAI Agents SDK v0.24.0 | Handoffs delegate. Sessions store the conversation. Tracing is on unless you turn it off. |
| Google Cloud, with evals in the same framework | Google ADK v2.14.1 | The deploy page names Agent Runtime, Cloud Run, GKE, or your own container. The eval page scores the trajectory and the final answer. |
| You are leaving AutoGen and want workflow checkpoints | Microsoft Agent Framework python-1.26.0 | The AutoGen README points here. Checkpoints can sit in memory, on disk, or in Cosmos DB. |
| TypeScript, and a workflow that survives a process restart | Mastra @mastra/core 1.83.0 | Storage keeps a durable snapshot of a suspended run. The in-memory store does not. |
| A named durable engine: Temporal, DBOS, Prefect, Restate | Pydantic AI v2.68.0 | The durable-execution page lists nine engines, plus a step snapshot that needs no engine. |
| A small multi-agent example, and a May release is acceptable | smolagents v1.26.0 | The multi-agent page is a notebook. The tools page loads MCP. Neither page documents a checkpointer. |
| The line that used to be `import autogen` | AG2 v.1.3.1, after you read the split | The README says classic `import autogen` moved to ag2-classic. This repository is `ag2`. |
| Document workflows, and you will write the snapshot yourself | LlamaIndex v0.14.26 | The durable-workflows page says there is no built-in checkpointer to enable. Resume is at-least-once. |
| A new production agent on the AutoGen repo | Do not | The README says Microsoft is not providing fixes or support. 61,809 stars do not change that sentence. |

A [harness](/glossary/harness) is the loop, the tools, the memory, and the stop rule around a model. These libraries are how you build that loop. They are not the model bill. The [November 10 comparison](/blog/langgraph-vs-crewai-vs-openai-agents-sdk) prices LangSmith seats, CrewAI AMP, and the model API for three of these rows. This note does not reprice them.

## What did GitHub return at 03:46 UTC?

Eleven repositories. Stars, forks, and the latest release are copied from the API. Contributor counts are the last page of the contributors list with `anon=0`, so anonymous commits are out. Calendar age counts UTC dates from the release date through November 14, 2026.

| Repository | Stars | Forks | Contributors | Latest release | Published | Age |
| --- | --- | --- | --- | --- | --- | --- |
| microsoft/autogen | 61,809 | 9,400 | 443 | python-v0.7.5 | 2025-09-30 | 410 days |
| crewAIInc/crewAI | 60,871 | 9,177 | 368 | 1.15.41 | 2026-11-12 | 2 days |
| run-llama/llama_index | 52,894 | 8,558 | 476 | v0.14.26 | 2026-11-13 | 1 day |
| langchain-ai/langgraph | 44,932 | 7,747 | 288 | 1.2.22 | 2026-11-14 | 0 days |
| openai/openai-agents-python | 30,661 | 5,051 | 401 | v0.24.0 | 2026-10-15 | 30 days |
| huggingface/smolagents | 30,360 | 3,214 | 203 | v1.26.0 | 2026-05-29 | 169 days |
| mastra-ai/mastra | 29,512 | 3,095 | 466 | @mastra/core@1.83.0 | 2026-11-13 | 1 day |
| google/adk-python | 22,209 | 4,356 | 431 | v2.14.1 | 2026-11-12 | 2 days |
| pydantic/pydantic-ai | 21,199 | 3,169 | 475 | v2.68.0 | 2026-11-12 | 2 days |
| microsoft/agent-framework | 14,668 | 2,622 | 342 | python-1.26.0 | 2026-11-13 | 1 day |
| ag2ai/ag2 | 5,063 | 791 | 432 | v.1.3.1 | 2026-11-10 | 4 days |

The contributor sort is not the star sort. LlamaIndex leads contributors at 476 and is third in stars. Pydantic AI is second in contributors, 475, and ninth in stars. LangGraph shipped this morning and has 288 contributors. AG2 has 432 contributors and 5,063 stars. A contributor count is accounts with commits the API listed. It is not the size of the team that will answer your issue. The [November 11 issue-health note](/research/ai-agent-framework-issue-health-november-2026) is the closer reading of who actually closes bugs.

Licenses and languages, same pass:

| Repository | SPDX license GitHub returned | Primary language | Second language, if at least 10% of bytes |
| --- | --- | --- | --- |
| langchain-ai/langgraph | MIT | Python, 99.6% | |
| crewAIInc/crewAI | MIT | Python, 99.4% | |
| openai/openai-agents-python | MIT | Python, 99.9% | |
| google/adk-python | Apache-2.0 | Python, 98.4% | |
| microsoft/agent-framework | MIT | Python, 59.3% | C#, 38.5% |
| mastra-ai/mastra | NOASSERTION | TypeScript, 99.3% | |
| pydantic/pydantic-ai | MIT | Python, 98.7% | |
| huggingface/smolagents | Apache-2.0 | Python, 100.0% | |
| microsoft/autogen | CC-BY-4.0 | Python, 61.6% | C# 25.1%, TypeScript 12.4% |
| ag2ai/ag2 | Apache-2.0 | Python, 83.5% | MDX, 15.8% |
| run-llama/llama_index | MIT | Python, 72.6% | Jupyter Notebook, 24.9% |

Mastra's SPDX field is NOASSERTION because the detector did not pick a single id. The root `LICENSE.md`, read from the license API at 03:47 UTC, puts Apache 2.0 on content outside the `ee/` directories and points those directories at a separate license. That `ee/` file was not opened. AutoGen's root `LICENSE` is the CC BY 4.0 text, which is why GitHub says CC-BY-4.0. This note did not re-check the PyPI classifier.

Microsoft Agent Framework is not a Python-only repository. C# is 38.5% of the bytes. AutoGen is the same shape, with a TypeScript slice on top. LlamaIndex's second language is notebooks. AG2's is MDX, which is docs in the tree, not a second runtime.

## What can pause, and who will host it?

Durable state, a handoff, MCP, tracing, and a hosted runtime are five different wires. The [November 13 matrix](/research/ai-agent-framework-mcp-a2a-support-november-2026) already did MCP client, MCP server, and A2A for a wider set. The cells below are only what was on a page fetched today. A dash means that page did not document the feature. A dash is not a no.

| Framework | Durable state | Multi-agent or handoff | MCP, on a page read today | Tracing or evals | Hosted runtime the docs name |
| --- | --- | --- | --- | --- | --- |
| LangGraph 1.2.22 | Checkpointer per thread. MemorySaver dies on restart | You build the graph | Client, via MCPAdapter | LangSmith, a separate product | LangSmith Agent Server: Cloud, Hybrid, self-hosted, standalone |
| CrewAI 1.15.41 | `@persist`, SQLite by default | Crews of roles | Client. MCP servers as tools | AMP says it adds observability | AMP. Basic is free, 50 executions a month. Enterprise is custom |
| OpenAI Agents SDK 0.24.0 | Sessions: SQLite, Redis, SQLAlchemy. Not a graph checkpoint | Handoffs | Client: hosted MCP, Streamable HTTP, SSE | Tracing on by default | The SDK runs in your app. The Agents API is a separate hosted guide |
| Google ADK 2.14.1 | Sessions. In-memory is lost on restart. Database and cloud backends are named | Workflow agents and sub-agents | Client and server (`McpToolset`, `to_mcp_server`) | Trajectory and final-response evals, in the framework | Agent Runtime, Cloud Run, GKE, or your container |
| Microsoft Agent Framework 1.26.0 | Checkpoints: memory, disk, or Cosmos DB | Workflows. Handoff is a built-in orchestration name | Client, named on the overview | Overview names evaluation services and harness observability | You run it. Cosmos DB is the durable store, not a hosted agent process |
| Mastra 1.83.0 | Storage snapshots for suspend and resume | Workflows | Client and server, MCP revision 2026-07-28 | Storage keeps traces and eval results | Mastra platform Server, or Vercel, Netlify, Cloudflare |
| Pydantic AI 2.68.0 | Nine durable engines, or StepPersistence with no engine | The durable page is not a handoff guide | The durable page names MCP servers as wrapped tool calls | Not on the durable page | Not on the durable page. You bring the engine |
| smolagents 1.26.0 | Not on the pages read | A multi-agent notebook | Client, `MCPClient`, on the v1.26.0 tools page | Not on those pages | Not on those pages |
| AutoGen 0.7.5 | Not the reason to start | README still shows multi-agent examples | Client example, `McpWorkbench` | Not the reason to start | README says Studio is for prototypes |
| AG2 1.3.1 | README says persistent knowledge. That is not a crash resume | README describes a network of channels | Not in the README | README links an evaluation guide this note did not fetch | README links a playground. No production host was priced |
| LlamaIndex 0.14.26 | You snapshot. There is no built-in checkpointer. Resume is at-least-once | Not on the durable page | Not re-read today | Not on the durable page | A DBOS plugin, or WorkflowServer running that plugin. No sticker price on the page |

LangGraph's [persistence page](https://docs.langchain.com/oss/python/langgraph/persistence) splits the two memories. A checkpointer saves the thread so you can continue a conversation, resume after an interrupt, or recover from a failure. A store keeps facts across threads. The overview says LangGraph is the orchestration runtime and [LangSmith](https://docs.langchain.com/langsmith/deployment) is where tracing, evaluation, and deployment live. Agent Server can run in LangChain's cloud, in your VPC with LangChain's control plane, fully self-hosted, or as containers with no control plane. The page also says you can deploy an ADK agent through that server. That is LangChain's claim about ADK, not Google's deploy page.

CrewAI's [1.15.41 flows page](https://docs.crewai.com/v1.15.41/en/concepts/flows) says `@persist` writes state so a flow can restart. The default it names is `SQLiteFlowPersistence`. The [pricing page](https://crewai.com/pricing) lists Basic as Free, with a visual editor, GitHub integration, and 50 workflow executions a month. Enterprise is Custom. The sentence under it says you can deploy on CrewAI cloud, your own VPC, or your own infrastructure. There is no dollar figure on that card. This note does not invent one.

The OpenAI Agents SDK [handoff page](https://openai.github.io/openai-agents-python/handoffs/) is delegation to a specialist. The [session page](https://openai.github.io/openai-agents-python/sessions/) is conversation memory, including a resume after an approval pause, with SQLite, Redis, and SQLAlchemy backends. That is not LangGraph's checkpoint of every superstep. The [tracing page](https://openai.github.io/openai-agents-python/tracing/) says tracing is on by default, and off for organizations on a Zero Data Retention policy. The [Agents API guide](https://developers.openai.com/api/docs/guides/agents) is a different product: hosted orchestration, with the SDK described as the thing your application runs. The Python package's latest GitHub release is still v0.24.0 from October 15, 30 days before this pull. Do not describe the SDK and the hosted API as one install.

Google's [deploy page](https://adk.dev/deploy/) names four places: Agent Runtime on Google Cloud, Cloud Run, GKE, and a container you run anywhere, including a machine with no Google Cloud connection. The [session page](https://adk.dev/sessions/) says the in-memory services are for local tests and lose everything on restart, and that database and cloud backends exist. The [eval page](https://adk.dev/evaluate/) is unusually concrete for this set. It scores the trajectory, the tool calls along the way, and the final response, with test files, eval sets, and a conformance command against a recorded baseline. The [MCP page](https://adk.dev/tools-custom/mcp-tools/) is both directions: `McpToolset` consumes a server, and `to_mcp_server` exposes ADK tools.

Microsoft's [checkpoint page](https://learn.microsoft.com/en-us/agent-framework/workflows/checkpoints) saves state at the end of each superstep so a long run can pause, resume, or move machines. The Python storages it names are in-memory, a local directory, and Azure Cosmos DB. Handoff sits in the list of built-in orchestration names, next to Concurrent, Sequential, GroupChat, and Magentic. The [overview](https://learn.microsoft.com/en-us/agent-framework/overview/agent-framework-overview) calls this framework the successor of AutoGen and Semantic Kernel, names MCP clients, and lists evaluation services among the integrations. It does not, on the page read today, describe a hosted process that runs your agent the way Agent Server or AMP does. You run the process. Cosmos DB is the durable database.

Mastra's [storage page](https://mastra.ai/docs/storage) is the one that matters for a restart. It keeps workflow snapshots, traces, and eval results after the process exits, and it says the default in-memory store does not. The [workflow page](https://mastra.ai/docs/workflows/overview) covers suspend, resume, and a restart from the last active step. The [deploy page](https://mastra.ai/docs/deployment/overview) says a Mastra server runs on any Node host, names a Mastra platform Server as a production target, and ships optional deployers for Vercel, Netlify, and Cloudflare. MCP is both `MCPClient` and `MCPServer`, on revision `2026-07-28`.

Pydantic AI's [durable-execution page](https://ai.pydantic.dev/durable_execution/overview/) is the widest engine list in this set. Agents run durably on Temporal, DBOS, Prefect, Restate, and further engines the page names, nine in total. The page's distinction is worth keeping: an engine journals model requests and tool calls so a crash mid-step can replay. Saving a run and resuming it later does not require that engine. `StepPersistence` snapshots settled steps. The same page says an engine wraps MCP server calls, which is a client. This pass did not re-fetch Pydantic's MCP server page. That cell stays on the [November 13 matrix](/research/ai-agent-framework-mcp-a2a-support-november-2026).

smolagents is the stale tag that is still a reasonable example. v1.26.0 was published May 29, 2026. The [tools page for that version](https://huggingface.co/docs/smolagents/v1.26.0/en/tutorials/tools) loads MCP tools with `MCPClient`. The [multi-agent page](https://huggingface.co/docs/smolagents/en/examples/multiagents) is a notebook of agents sharing a web task. Neither page documents a checkpointer. If the run has to survive a kill, this is the wrong row. 30,360 stars and 203 contributors say the same thing in two directions: people starred it, and the contributor list is the shortest here.

LlamaIndex is the opposite warning. v0.14.26 published November 13, and the repository leads this set in contributors, at 476. The [durable-workflows page](https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/) says there is no built-in checkpointer to enable. You snapshot context when a step finishes and pass that snapshot back to `run()` after a crash. Resume is at-least-once: a step that was mid-flight runs again, so the side effect has to be safe to repeat. The page's alternative is a runtime plugin. It names DBOS, which journals steps, and `WorkflowServer`, which can run that plugin. Do not describe LlamaIndex as "it checkpoints" without that sentence.

AG2 is easy to mis-file as AutoGen. The [README](https://github.com/ag2ai/ag2/blob/main/README.md) says that as of v1.0, `ConversableAgent`, `GroupChat`, and `import autogen` live in [ag2ai/ag2-classic](https://github.com/ag2ai/ag2-classic). This repository is `pip install ag2`. It had 5,063 stars and release v.1.3.1 from November 10. The README describes a network of channels and persistent knowledge in the harness. Persistent knowledge is not a workflow checkpoint. This note did not fetch a crash-resume page, so that cell stays empty.

AutoGen's row is the one the star sort gets wrong. The [README](https://github.com/microsoft/autogen/blob/main/README.md) says the project has been archived and is no longer maintained, that Microsoft is not providing bug fixes, security fixes, new features, or support, and that new users should start with Microsoft Agent Framework. The API, the same morning, returned `archived: false` and 61,809 stars. Both sentences are true. The [November 9 note](/blog/is-autogen-deprecated) is the place that walks the commit that changed the README. On that morning the count was 61,753 and Agent Framework's latest tag was python-1.25.0. Today the AutoGen count is 61,809 and Agent Framework's latest tag is python-1.26.0, published 2026-11-13T08:28:16Z. The successor gained a GitHub release. The predecessor did not.

## What moved since the November 13 matrix?

Three clocks, and nothing else this note is willing to call a change.

The [protocol note](/research/ai-agent-framework-mcp-a2a-support-november-2026) said PyPI already had `agent-framework` 1.26.0 and that GitHub had no release tag `python-1.26.0`. At 03:46 UTC on November 14, `GET /repos/microsoft/agent-framework/releases/latest` returned `python-1.26.0`, published 2026-11-13T08:28:16Z. The tag exists. This note did not read the release body, so it does not say what the tag contains.

That note also said npm `@mastra/core` was 1.83.0 while GitHub's latest release was still 1.82.0. GitHub's latest release is now `@mastra/core@1.83.0`, published 2026-11-13T14:32:29Z. Registry and tag match on the version number. This note did not re-query npm.

LangGraph was 1.2.21 on that note, uploaded November 12. Release 1.2.22 published at 01:43 UTC on November 14. The body says the changes since 1.2.21 include skipping message conversion for plain messages, filtering pending writes, and streaming a child graph on its own thread. It also tags `checkpoint` 4.3.2 and `checkpoint-postgres` 3.2.1. Quote the tag. Do not call it a feature release.

## What this means when you pick

Builders. Sort by the crash. If a killed process must continue the same graph, start with LangGraph and a checkpointer that is not `MemorySaver`, or with Pydantic AI and one named engine. If the team writes TypeScript, Mastra's storage page is the test: the run has to resume after the process exits, on a store that is not the default memory. If the team is on Google Cloud and wants the eval in the same repo as the agent, ADK's deploy page and eval page are a pair. If the design is roles and a product manager will touch the workflow, CrewAI's free 50 executions are a real trial, and Enterprise is a conversation, not a sticker. If you are already on AutoGen, the README and the Learn overview agree on the exit. Agent Framework 1.26.0 is the tag. The 61,809-star repository is the history.

Do not buy MCP support from this table alone when the cell says the November 13 note was the last full read. Client and server are different installs. The matrix is the wire. This page is the job.

Buyers who are not going to import a package should not use this table at all. A personal agent that books, browses, and stops before a payment is a product, not a framework. That reading is [ChatGPT agent is retired. Gemini tasks skip the EEA and the UK.](/blog/personal-assistant-ai-what-it-will-do-november-2026)

## What should you open next?

The counts move. The job does not.

- [AI agent framework GitHub stats, November 2026](/reports/ai-agent-framework-github-stats-november-2026) is the November 5 snapshot of a wider set. This note is 11 repositories, pulled November 14.
- [13 MCP clients, 5 servers, 6 A2A](/research/ai-agent-framework-mcp-a2a-support-november-2026) is the protocol matrix. Two of its GitHub tags have since moved. The protocol cells were not re-run.
- [LangGraph vs CrewAI vs the OpenAI Agents SDK](/blog/langgraph-vs-crewai-vs-openai-agents-sdk) is the bill for three of these rows, read November 10.
- [Is AutoGen deprecated?](/blog/is-autogen-deprecated) is the November 9 reading of the README and the `archived` field. The star count there is 61,753.
- [Which AI agent framework do people install?](/blog/which-ai-agent-framework-do-people-install) is file requests. A download is not a user, and it is not a star.
- [Best AI agent frameworks](/best/ai-agent-frameworks) is the licence and release-tag comparison on the best-of page.
- The [stars tracker](/trackers/stars) moves after this page. A number here is the 03:46 UTC pull, not the tracker.
