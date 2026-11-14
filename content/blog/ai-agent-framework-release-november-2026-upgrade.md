---
title: "AI agent framework release November 2026: durable no longer checkpoints"
description: "From November 12 to 14, 2026, Mastra 1.83.0 limits durable to resumable streams. @openai/agents 0.22.0 can write saved state as schema 1.24. langgraph 1.2.22 does not change the graph API."
absoluteTitle: true
takeaways:
  - "The AI agent framework release that changes a production setting this window is @mastra/core 1.83.0. npm published it at 2026-11-12T21:27:47Z. The GitHub release, published at 2026-11-13T14:32:29Z, says Agent's durable option now controls resumable streams only. Checkpoint-backed durable execution moves to createDurableAgent({ agent })."
  - "@openai/agents 0.22.0, published on GitHub at 2026-11-12T23:57:46Z and on npm at 2026-11-12T23:59:01Z, is the TypeScript break. Saved states stay on schema 1.23 when they still fit, and use 1.24 for richer metadata or newer nested runs. Usage details, MCP descriptions, and tracing metadata got narrower types. Responses compaction waits while a tool approval is pending. On Chat Completions, function tools and handoffs default reasoning effort to none for gpt-6-sol and gpt-6-luna."
  - "langgraph 1.2.22, uploaded to PyPI at 2026-11-14T01:43:42Z, is performance work plus a fix that streams a child graph on its own thread. It is not a new orchestration API. browser-use 1.0.4, uploaded at 2026-11-13T20:56:54Z, still requires pydantic-ai-slim==2.66.0. pydantic-ai 2.68.0 requires slim==2.68.0. Those two still do not install together."
date: "2026-11-14"
updated: "2026-11-14"
category: news
topics:
  - news
  - harnesses
  - tools-saas
  - how-agents-work
audience:
  - builders
companies:
  - langchain
  - crewai
  - openai
  - openai-agents-sdk
  - anthropic
  - pydantic-ai
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Agent framework registry clocks, November 12–14, 2026"
  description: "PyPI upload_time_iso_8601 and npm time values read November 14, 2026, with HTTP Date headers from Sat, 14 Nov 2026 04:09:41 GMT through 04:11:07 GMT. langgraph 1.2.22 at 2026-11-14T01:43:42Z and 1.2.21 at 2026-11-12T18:06:30Z. @langchain/langgraph 1.7.4 at 2026-11-12T18:09:51Z. @openai/agents 0.22.0 at 2026-11-12T23:59:01Z. openai-agents 0.24.0 still uploaded 2026-10-15T02:38:18Z. crewai 1.15.41 at 2026-11-12T18:42:55Z. claude-agent-sdk 0.2.182 at 2026-11-13T21:38:29Z and 0.2.181 at 2026-11-12T23:09:50Z. pydantic-ai 2.68.0 at 2026-11-12T02:30:01Z. @mastra/core 1.83.0 at 2026-11-12T21:27:47Z. ai 7.0.173 at 2026-11-13T22:35:41Z and 7.0.172 at 2026-11-13T05:59:50Z. browser-use 1.0.4 at 2026-11-13T20:56:54Z still requires pydantic-ai-slim==2.66.0. GitHub published_at values are cited in the article when they differ. AI Agents Info did not run the installers."
  isBasedOn: "https://pypi.org/pypi/langgraph/json"
sources:
  - title: "langgraph 1.2.22 release (published 2026-11-14T01:43:55Z)"
    url: "https://github.com/langchain-ai/langgraph/releases/tag/1.2.22"
  - title: "langgraph 1.2.21 release (published 2026-11-12T18:06:43Z)"
    url: "https://github.com/langchain-ai/langgraph/releases/tag/1.2.21"
  - title: "PyPI JSON, langgraph (HTTP Date Sat, 14 Nov 2026 04:09:41 GMT)"
    url: "https://pypi.org/pypi/langgraph/json"
  - title: "@langchain/langgraph 1.7.4 release (published 2026-11-12T18:06:18Z)"
    url: "https://github.com/langchain-ai/langgraphjs/releases/tag/%40langchain/langgraph%401.7.4"
  - title: "npm, @langchain/langgraph (HTTP Date Sat, 14 Nov 2026 04:09:42 GMT)"
    url: "https://www.npmjs.com/package/@langchain/langgraph"
  - title: "@openai/agents 0.22.0 release (published 2026-11-12T23:57:46Z)"
    url: "https://github.com/openai/openai-agents-js/releases/tag/%40openai/agents%400.22.0"
  - title: "@openai/agents-core 0.22.0 release notes (published 2026-11-12T23:57:37Z)"
    url: "https://github.com/openai/openai-agents-js/releases/tag/%40openai/agents-core%400.22.0"
  - title: "npm, @openai/agents (HTTP Date Sat, 14 Nov 2026 04:09:42 GMT)"
    url: "https://www.npmjs.com/package/@openai/agents"
  - title: "OpenAI Agents SDK Python v0.24.0 (published 2026-10-15T02:20:12Z)"
    url: "https://github.com/openai/openai-agents-python/releases/tag/v0.24.0"
  - title: "OpenAI Agents SDK Python v0.24.0-alpha.7 (published 2026-11-08T07:05:11Z, before this window)"
    url: "https://github.com/openai/openai-agents-python/releases/tag/v0.24.0-alpha.7"
  - title: "PyPI JSON, openai-agents (HTTP Date Sat, 14 Nov 2026 04:09:42 GMT)"
    url: "https://pypi.org/pypi/openai-agents/json"
  - title: "CrewAI 1.15.41 release (published 2026-11-12T18:42:07Z)"
    url: "https://github.com/crewAIInc/crewAI/releases/tag/1.15.41"
  - title: "PyPI JSON, crewai (HTTP Date Sat, 14 Nov 2026 04:09:41 GMT)"
    url: "https://pypi.org/pypi/crewai/json"
  - title: "claude-agent-sdk v0.2.182 (published 2026-11-13T21:44:32Z)"
    url: "https://github.com/anthropics/claude-agent-sdk-python/releases/tag/v0.2.182"
  - title: "claude-agent-sdk v0.2.181 (published 2026-11-12T23:11:10Z)"
    url: "https://github.com/anthropics/claude-agent-sdk-python/releases/tag/v0.2.181"
  - title: "PyPI JSON, claude-agent-sdk (HTTP Date Sat, 14 Nov 2026 04:09:42 GMT)"
    url: "https://pypi.org/pypi/claude-agent-sdk/json"
  - title: "Pydantic AI v2.68.0 (published 2026-11-12T01:56:19Z)"
    url: "https://github.com/pydantic/pydantic-ai/releases/tag/v2.68.0"
  - title: "PyPI JSON, pydantic-ai 2.68.0 (HTTP Date Sat, 14 Nov 2026 04:09:42 GMT)"
    url: "https://pypi.org/pypi/pydantic-ai/2.68.0/json"
  - title: "@mastra/core 1.83.0 release (published 2026-11-13T14:32:29Z; release name November 12, 2026)"
    url: "https://github.com/mastra-ai/mastra/releases/tag/%40mastra/core%401.83.0"
  - title: "npm, @mastra/core (HTTP Date Sat, 14 Nov 2026 04:09:42 GMT)"
    url: "https://www.npmjs.com/package/@mastra/core"
  - title: "Vercel AI SDK ai@7.0.173 (published 2026-11-13T22:34:02Z)"
    url: "https://github.com/vercel/ai/releases/tag/ai%407.0.173"
  - title: "Vercel AI SDK ai@7.0.172 (published 2026-11-13T05:57:52Z)"
    url: "https://github.com/vercel/ai/releases/tag/ai%407.0.172"
  - title: "npm, ai (HTTP Date Sat, 14 Nov 2026 04:09:43 GMT)"
    url: "https://www.npmjs.com/package/ai"
  - title: "browser-use 1.0.4 release (published 2026-11-13T20:50:13Z)"
    url: "https://github.com/browser-use/browser-use/releases/tag/1.0.4"
  - title: "PyPI JSON, browser-use 1.0.4 requires_dist (HTTP Date Sat, 14 Nov 2026 04:11:07 GMT)"
    url: "https://pypi.org/pypi/browser-use/json"
faq:
  - question: "What is the AI agent framework release in November 2026 that can break a running agent?"
    answer: "Two of them, and they break different things. @mastra/core 1.83.0, on npm at 2026-11-12T21:27:47Z, says Agent's durable option now controls resumable streams only. Checkpoint-backed durable execution moves to createDurableAgent. @openai/agents 0.22.0, on npm at 2026-11-12T23:59:01Z, narrows TypeScript types around usage metadata and MCP descriptions, and writes saved state as schema 1.24 when the state has richer metadata or a newer nested run. langgraph 1.2.22, uploaded November 14, does not carry a breaking note."
  - question: "Did langgraph 1.2.22 change the graph API?"
    answer: "The 1.2.22 notes, published 2026-11-14T01:43:55Z, do not say so. Since 1.2.21 they list performance fixes and one behavior fix: a child graph streams on its own thread when the caller is streaming subgraphs. The same body tags langgraph-checkpoint 4.3.2, langgraph-checkpoint-postgres 3.2.1, and langgraph-prebuilt 1.1.2. 1.2.21, published November 12, fixes subgraph namespace matching. Neither tag is labeled breaking."
  - question: "What breaks in @openai/agents 0.22.0?"
    answer: "The agents-core notes say the breaking types require narrowing usage details, Realtime image content, nullable MCP descriptions, unknown schemas and tracing metadata, and optional transcription breakdowns. Saved states retain schema 1.23 when compatible and use 1.24 for richer metadata or newer nested runs. Automatic Responses compaction is deferred while a tool approval is pending. On the Chat Completions API, function tools and handoffs default reasoning effort to none for gpt-6-sol and gpt-6-luna."
  - question: "Does Mastra 1.83.0 still checkpoint when durable is true?"
    answer: "Not as checkpoint-backed durable execution. The breaking-changes section says durable now controls resumable streams only. Clients can reconnect, observe a run, and abort it. The migration the notes name is createDurableAgent({ agent }). npm's latest stable on November 14 was 1.83.0. The alpha tag was 1.84.0-alpha.0, published on npm at 2026-11-13T01:08:58Z. That alpha is not the pin."
  - question: "Can browser-use 1.0.4 install next to Pydantic AI 2.68.0?"
    answer: "No. PyPI's browser-use 1.0.4, uploaded at 2026-11-13T20:56:54Z, still requires pydantic-ai-slim[anthropic,google,openai]==2.66.0. pydantic-ai 2.68.0, uploaded at 2026-11-12T02:30:01Z, requires pydantic-ai-slim==2.68.0. Those exact pins do not resolve in one environment. The November 11 note on browser-use 1.0.2 and Pydantic AI 2.67 is the same conflict, one release later on each side."
---

Two releases in this window change a running agent. [@mastra/core 1.83.0](https://github.com/mastra-ai/mastra/releases/tag/%40mastra/core%401.83.0) stops using `durable: true` as checkpoint-backed execution. The option now means a resumable stream, and the notes tell you to move the checkpointed path to `createDurableAgent({ agent })`. [@openai/agents 0.22.0](https://github.com/openai/openai-agents-js/releases/tag/%40openai/agents%400.22.0) is the TypeScript failure: narrower types, and a saved state that stays on schema 1.23 only when it still fits. [langgraph 1.2.22](https://github.com/langchain-ai/langgraph/releases/tag/1.2.22), uploaded the morning of November 14, is performance work and a child-graph streaming fix. It does not rename the graph API.

That is the AI agent framework release question for November 12 through November 14, 2026. The earlier window, November 9 through 11, is [browser-use 1.0.2 will not install next to Pydantic AI 2.67](/blog/ai-agent-framework-release-november-2026). The pin survived. browser-use 1.0.4 still requires `pydantic-ai-slim==2.66.0`, and pydantic-ai 2.68.0 requires slim `==2.68.0`. Which repository to install for which job, counted at 03:46 UTC on November 14, is [60,871 stars shipped November 12. The 61,809-star repo did not.](/research/which-ai-agent-framework-to-install-november-2026). This page is the upgrade risk. That page is the job.

The November 5 star table is [AI agent framework GitHub stats](/reports/ai-agent-framework-github-stats-november-2026). Current star pages are under [/trackers/stars](/trackers/stars). Download pages are under [/trackers/downloads](/trackers/downloads). The bill for three of these libraries, checked November 10, is [LangGraph vs CrewAI vs the OpenAI Agents SDK](/blog/langgraph-vs-crewai-vs-openai-agents-sdk).

## Which tags actually published from November 12 to November 14?

The rows are registry documents read on November 14, 2026, between 04:09 and 04:11 UTC, plus the GitHub release body for what changed. A package with no release in the window stays in the table so a lockfile does not get “upgraded” to a tag that did not ship.

| Framework | Version | Registry time (UTC) | What changed | Breaking? | Pin advice |
| --- | --- | --- | --- | --- | --- |
| langgraph (PyPI) | 1.2.22 | 2026-11-14T01:43:42Z | Performance fixes, and a child graph streams on its own thread. 1.2.21 on November 12 fixes subgraph namespaces. | No break labeled | Bump if you stream subgraphs and want that thread split. Re-check a test that asserts stream order. |
| @langchain/langgraph (npm) | 1.7.4 | 2026-11-12T18:09:51Z | The package notes are a dependency bump to @langchain/langgraph-sdk 1.16.0. | No, on this package’s notes | The new subagent panel API is on the SDK. `scopedSubagents` defaults off. |
| @openai/agents (npm) | 0.22.0 | 2026-11-12T23:59:01Z | Narrower usage, MCP, and tracing types. Saved state 1.23 or 1.24. Compaction waits on a pending tool approval. Reasoning effort `none` for function tools on gpt-6-sol and gpt-6-luna via Chat Completions. | Yes. Types. | Narrow the types, then bump. Do not assume every saved state is 1.24. |
| openai-agents (PyPI) | 0.24.0 | 2026-10-15T02:38:18Z | No release in this window. |  | Stay here. GitHub’s newest prerelease is v0.24.0-alpha.7 from November 8, before this window. |
| crewai (PyPI) | 1.15.41 | 2026-11-12T18:42:55Z | Approved private URL hosts. A human-feedback resume keeps earlier step outputs. Projects depend on PyMuPDF 2.x. | No break section | Bump. Re-test a resume that used to drop step outputs. |
| claude-agent-sdk (PyPI) | 0.2.182 | 2026-11-13T21:38:29Z | The GitHub body is the pip line. 0.2.181, the day before, is the same shape. | Not stated | Pin 0.2.182 only if you accept a bump with no behavior notes. |
| pydantic-ai (PyPI) | 2.68.0 | 2026-11-12T02:30:01Z | Compatibility notes. Old harness event names stay as deprecated aliases. `ModelFallback` can switch models when a response hits `max_tokens`. | Aliases kept | Read the rename list if you match on event names. Do not install beside browser-use 1.0.4. |
| @mastra/core (npm) | 1.83.0 | 2026-11-12T21:27:47Z | Resumable streams on every Agent. `durable` is streams only. | Yes | Move checkpointed runs to `createDurableAgent({ agent })`. Leave 1.84.0-alpha.0 on the alpha tag. |
| ai (npm) | 7.0.173 | 2026-11-13T22:35:41Z | Approval replay no longer lets schema validation rewrite approved tool arguments. 7.0.172, earlier the same day, requires an explicit download hook for remote files in `experimental_extract` and `experimental_decide`. | 7.0.172, if you relied on a silent fetch | Pass `experimental_download` or `createDownload` for untrusted URLs. Then take 7.0.173. |
| browser-use (PyPI) | 1.0.4 | 2026-11-13T20:56:54Z | Screenshot pruning, so a long run stops rewriting the prompt cache. The slim pin is still 2.66.0. | Install break against pydantic-ai 2.68.0 | Separate environments. The November 11 note still describes the conflict. |

Source: aiagentsinfo.com. Registry times are PyPI `upload_time_iso_8601` or the npm `time` field, read November 14, 2026. Behavior is from the GitHub release body cited above. GitHub `published_at` for @mastra/core@1.83.0 is 2026-11-13T14:32:29Z, and the release name is “November 12, 2026.” The npm clock is the row.

Python `openai-agents` did not move. The alpha line the GitHub releases page still shows, v0.24.0-alpha.7, was published at 2026-11-08T07:05:11Z. That is before this window. Its notes introduce `agents.classic` and `CustomStorage` sessions. They are not a November 12–14 change, and they are not on PyPI’s latest. Do not pip-install that prerelease because a blog said the Agents SDK shipped this week. The TypeScript package did. The Python stable package did not.

## Why does Mastra’s durable flag change the harness?

Because the word used to mean the checkpoint, and the notes say it now means the stream.

The breaking-changes section of [@mastra/core@1.83.0](https://github.com/mastra-ai/mastra/releases/tag/%40mastra/core%401.83.0) is one paragraph. `Agent`’s `durable` option controls resumable streams only, not checkpoint-backed durable execution. The migration is `createDurableAgent({ agent })`. Plain-agent disconnect behavior differs when streams are enabled. The highlight above that paragraph says every `Agent` can publish a resumable run stream, with replay caching, `agent.observe(runId)`, `observe().abort()`, and `agent.abortRunStream(runId)`, plus ownership and TTL checks. A client can reconnect without killing the run by default.

That is a [harness](/glossary/harness) change, not a patch note you skip. A process restart, a dropped HTTP connection, and a checkpoint you can resume from a database are three different failures. 1.83.0 documents the connection. It tells you the database resume is a different constructor. If your run used `durable: true` and expected a checkpoint after a crash, read that constructor before you bump. The [Mastra releases tracker](/trackers/releases/mastra/2026-11) is the month page. Stars are on [Mastra GitHub stars](/trackers/stars/mastra). npm downloads are on [@mastra/core downloads](/trackers/downloads/mastra). There is no directory row for Mastra yet.

The same release also turns on a built-in [MCP](/glossary/model-context-protocol) server at `/api/mcp` when `server.auth` is configured, with OAuth discovery through `server.mcp.oauth`. That is a new surface on the server, on by default under that condition. If you did not mean to expose agents, workflows, and tools at that path, set `server.mcp` before you deploy 1.83.0. The notes let you turn it off, change the path, or serve only read-only tools.

npm’s `alpha` dist-tag on the same morning was `1.84.0-alpha.0`, time `2026-11-13T01:08:58Z`. Latest remained `1.83.0`. Pin the stable tag.

## What does @openai/agents 0.22.0 break in the types?

The types a strict build was already using, and the schema number on a saved run.

The [@openai/agents-core@0.22.0](https://github.com/openai/openai-agents-js/releases/tag/%40openai/agents-core%400.22.0) notes, published at 2026-11-12T23:57:37Z, say the change preserves bounded JSON usage metadata and reuses OpenAI wire types. Then they name the break: you have to narrow usage details, Realtime image content, nullable MCP descriptions, unknown schemas and tracing metadata, and optional transcription breakdowns. Saved states retain schema 1.23 when compatible, and use 1.24 for richer metadata or newer nested runs. A lockfile bump can typecheck-fail before it changes a single token of model output. It can also write a newer schema the next time a nested run saves. Load both shapes. Do not migrate every stored session to 1.24 on faith, and do not reject 1.24 as corrupt.

Two behavior lines sit next to the types. Automatic Responses compaction is deferred while a tool approval is pending. If your session compacted as soon as the context filled, a run that is waiting on a person now keeps the uncompacted thread until that approval resolves. On the OpenAI Chat Completions API, function tools and handoffs default reasoning effort to `none` for `gpt-6-sol` and `gpt-6-luna`. The notes say this matches a Python SDK change. A [tool call](/glossary/tool-use) that used to spend reasoning tokens on those two models, on Chat Completions, now defaults to none. Set the effort if the old default was load-bearing. The Responses API path is a different default. Read the line before you copy it onto every provider.

The meta package [@openai/agents@0.22.0](https://github.com/openai/openai-agents-js/releases/tag/%40openai/agents%400.22.0) also moves Zod to 4.6.6 and says saved guardrail checkpoints with omitted metadata are preserved. That is the kind of checkpoint you want a test for: a guardrail state written by 0.21 still loads.

Python is the other package. PyPI `openai-agents` latest on November 14 was still 0.24.0, uploaded 2026-10-15T02:38:18Z. GitHub’s latest stable release is that same tag, published 2026-10-15T02:20:12Z. The [directory listing](/directory/openai-agents-sdk) covers both languages. Python releases are on the [OpenAI Agents SDK tracker](/trackers/releases/openai-agents/2026-11). JavaScript installs are on [@openai/agents downloads](/trackers/downloads/openai-agents-js). Stars for the Python repo are [OpenAI Agents SDK GitHub stars](/trackers/stars/openai-agents).

## Is langgraph 1.2.22 safe to bump?

The notes say it is a fix, and one of the fixes changes how a child graph shows up in a stream.

[1.2.22](https://github.com/langchain-ai/langgraph/releases/tag/1.2.22), GitHub `published_at` 2026-11-14T01:43:55Z, PyPI upload 2026-11-14T01:43:42Z. Since 1.2.21 the body lists performance work: skip message conversion in `add_messages` for plain messages, filter pending writes before reading statuses, match update keys against a set on wide states, check only failed futures for the runner stop, find untracked and delta channels once per run. The behavior line is the one to test: stream a child graph on its own thread to a caller who is streaming subgraphs. If your [eval](/glossary/behavioral-evaluation) asserts that parent and child tokens arrive on one thread, that assertion can fail on 1.2.22 for a reason that is the fix.

The same body tags three other packages: `langgraph-checkpoint` 4.3.2, `langgraph-checkpoint-postgres` 3.2.1, and `langgraph-prebuilt` 1.1.2. Those are performance notes of their own, including a lone store read outside a pipeline and skipping a lock for connection pools. A bump of `langgraph` that also floats those dependencies is a wider change than the one-line streaming fix. Pin the checkpoint package you meant.

[1.2.21](https://github.com/langchain-ai/langgraph/releases/tag/1.2.21), published 2026-11-12T18:06:43Z and uploaded to PyPI at 2026-11-12T18:06:30Z, is the release under that. It matches whole namespace segments in `get_subgraphs`, reads an undeclared subgraph namespace with the parent graph, and documents that each `interrupt()` has its own id in `UnknownInterruptError`. It also bumps `filelock` and `langgraph-api` for security fixes. No breaking label.

[@langchain/langgraph@1.7.4](https://github.com/langchain-ai/langgraphjs/releases/tag/%40langchain/langgraph%401.7.4), published 2026-11-12T18:06:18Z, npm time 2026-11-12T18:09:51Z, has no behavior of its own in the release body. It updates the dependency on `@langchain/langgraph-sdk` to 1.16.0. That SDK minor, published the same minute, adds `StreamOrchestrator` scopes for a subagent panel that streams only while it is open. `scopedSubagents: true` keeps the subagent’s messages out of the main conversation. The notes say it is off by default. Taking 1.7.4 does not turn that on. Calling the new API does.

GitHub’s release list for langchain-ai/langgraph still contains `sdk==0.4.14` from November 6. That tag is `langgraph-sdk`, not the core library. Install `langgraph==1.2.22` if you import the Python graph. The month page is [LangGraph releases](/trackers/releases/langgraph/2026-11). JavaScript installs are [@langchain/langgraph downloads](/trackers/downloads/langgraph-js). Stars are [LangGraph GitHub stars](/trackers/stars/langgraph). The company listing is [LangChain](/directory/langchain). There is no separate LangGraph directory row.

`langgraph-cli` 0.4.43, published 2026-11-12T16:20:16Z, is a different package again. The notes say it uses Agent Server flags with hidden deployment aliases, and it removes a discontinued local debugger image. If a deploy script still pulls that image, the CLI bump is the break, not 1.2.22.

## What did the other SDKs actually change?

CrewAI kept step outputs. Pydantic AI renamed events and left aliases. Claude’s SDK published a version and no notes. Vercel’s `ai` package stopped a silent download and then stopped an approval replay from rewriting the arguments you already approved. browser-use got cheaper on its own bench and kept the pin that blocks Pydantic AI 2.68.

[CrewAI 1.15.41](https://github.com/crewAIInc/crewAI/releases/tag/1.15.41), GitHub 2026-11-12T18:42:07Z, PyPI 2026-11-12T18:42:55Z. The feature line is “allow approved private URL hosts.” The bugfix that can change a run is “keep earlier step outputs across a human-feedback resume.” A resume that used to see an empty prior step will now see the output. That is the test to add, not a migration guide the tag forgot to write. Projects depend on PyMuPDF 2.x. The cache-breakpoint marker is stripped on the LiteLLM path. No breaking section. The listing is [CrewAI](/directory/crewai). Releases are [CrewAI releases](/trackers/releases/crewai/2026-11). Stars are [CrewAI GitHub stars](/trackers/stars/crewai). Downloads are [crewai downloads](/trackers/downloads/crewai).

[Pydantic AI v2.68.0](https://github.com/pydantic/pydantic-ai/releases/tag/v2.68.0), GitHub 2026-11-12T01:56:19Z. The release name says “v2.68.0 (2026-11-11).” PyPI’s upload is 2026-11-12T02:30:01Z. Use the upload if you are pinning a lockfile, and read the notes under the November 11 label. The compatibility section is the part that touches a [harness](/glossary/harness). Sub-agent task-control events gain an `Event` suffix and past-participle names, with `agent_name` and `parent_task_id`. Old names stay as deprecated aliases. Harness `CapabilityEvent` fields are renamed to `*_count`, `*_name`, `duration_ms`, and `previous_item`, again with aliases. `pydantic_ai_harness` spells out `max_results` and `max_duration_seconds`. `OutputTokenLimitExceeded` is new, and `ModelFallback` moves to the next model when a response is cut off at `max_tokens`. That fallback changes [cost per task](/agent-cost-calculator) if the second model is the expensive one and you did not expect the hop. `RequestInput` asks for approvals inside the run. Text that looks like an application frame in user or tool content is noted instead of escaped.

The install conflict is unchanged. browser-use 1.0.4’s `requires_dist`, read at 04:11 UTC on November 14, still contains `pydantic-ai-slim[anthropic,google,openai]==2.66.0` and `pydantic==2.14.3`. pydantic-ai 2.68.0 requires `pydantic-ai-slim[anthropic,cli,evals,google,logfire,mcp,openai,web]==2.68.0`. A resolver cannot satisfy both exact pins. The November 11 write-up of that conflict is [the earlier release note](/blog/ai-agent-framework-release-november-2026). The listing is [Pydantic AI](/directory/pydantic-ai). Installs are [pydantic-ai downloads](/trackers/downloads/pydantic-ai).

[claude-agent-sdk 0.2.182](https://github.com/anthropics/claude-agent-sdk-python/releases/tag/v0.2.182), GitHub 2026-11-13T21:44:32Z, PyPI 2026-11-13T21:38:29Z. The body is the pip install line. [0.2.181](https://github.com/anthropics/claude-agent-sdk-python/releases/tag/v0.2.181), GitHub 2026-11-12T23:11:10Z, PyPI 2026-11-12T23:09:50Z, is the same. There is no behavior sentence to quote, so this page will not invent one. The last tag in that repository whose body described a feature, on the releases page read the same morning, was 0.2.177 on November 3, which is outside this window. The listing is [Claude Agent SDK](/directory/claude-agent-sdk). Installs are [claude-agent-sdk downloads](/trackers/downloads/claude-agent-sdk).

[ai@7.0.173](https://github.com/vercel/ai/releases/tag/ai%407.0.173), GitHub 2026-11-13T22:34:02Z, npm 2026-11-13T22:35:41Z. The line that matters for a tool-approval loop: in-place schema validation or input refinement must not change approved tool arguments during approval replay. If a replay used to “fix” the arguments the person approved, 7.0.173 stops that. The same notes add `toolApproval` and a `timeout` object on `WorkflowAgent`. [ai@7.0.172](https://github.com/vercel/ai/releases/tag/ai%407.0.172), GitHub 2026-11-13T05:57:52Z, npm 2026-11-13T05:59:50Z, is the sharper break for anyone on the experimental file tools. `experimental_extract` and `experimental_decide` no longer silently download a remote file URL through global fetch. You pass `experimental_download`, and `createDownload({ fetch })` is the hook the notes name for untrusted URLs with a DNS-protected transport. Inline file data still works without the hook. Latest on npm was 7.0.173, not 7.0.172. The month page is [Vercel AI SDK releases](/trackers/releases/ai-sdk/2026-11). Downloads are [ai downloads](/trackers/downloads/ai-sdk).

[browser-use 1.0.4](https://github.com/browser-use/browser-use/releases/tag/1.0.4), GitHub 2026-11-13T20:50:13Z, PyPI 2026-11-13T20:56:54Z. The agent drops old screenshots in one batch once 20 tool results carry one, instead of on every new screenshot. Each prune used to rewrite an earlier message and break the provider’s prompt cache, so screenshot-heavy runs paid full input price on almost every step. The notes give their own bench: one 705-step task on 1.0.3 read 27.8 million input tokens, 1.6 million from cache. BU Bench v2.1, 200 tasks, versus 1.0.3: score 76.1 versus 76.0, model cost per task $0.208 versus $0.434. Those figures are Browser Use’s. This desk did not rerun them. 1.0.3, published 2026-11-12T16:52:54Z, is the CLI and CDP cleanup under that: a dead `BU_CDP_URL` fails in 3 seconds, and a cancelled cloud run copies downloads within 10 seconds instead of holding the browser up to 300 seconds. The [directory listing](/directory/browser-use) is the product. The pin, not the bench, is why 1.0.4 is in this table.

## What should you pin on November 14?

Pin the tag whose notes you have read. Float the ones that are patches. Split the environment that still cannot resolve.

If you run Mastra and any run uses `durable: true` for a checkpoint, read `createDurableAgent` before you take 1.83.0. Then decide whether `/api/mcp` should be on.

If you run `@openai/agents`, bump to 0.22.0 only after the project typechecks against the narrower usage and MCP types. Accept schema 1.23 and 1.24 in the session store. Expect compaction to wait on a pending tool approval. Set reasoning effort if `gpt-6-sol` or `gpt-6-luna` function tools on Chat Completions used to reason by default. Leave Python `openai-agents` at 0.24.0.

If you run LangGraph, `langgraph==1.2.22` is the core library. Pin `langgraph-checkpoint` and `langgraph-checkpoint-postgres` if you do not want those performance tags to float. Re-run one subgraph stream test. `@langchain/langgraph@1.7.4` is the JavaScript dependency bump. It does not enable `scopedSubagents`.

If you run browser-use and Pydantic AI in one environment, you still cannot. 1.0.4 wants slim 2.66.0. 2.68.0 wants slim 2.68.0. Two virtual environments, or stay on the older pair the November 11 page already named.

If you run the Claude Agent SDK, 0.2.182 is latest and the release body does not say what changed. Treat an empty changelog as a reason to pin the version you have tested, not as a reason to invent a diff.

CrewAI 1.15.41 and `ai@7.0.173` are the other bumps worth taking this week, after one resume test and one download-hook test. The [harnesses topic](/topics/harnesses) collects the longer guides. The [framework comparison](/best/ai-agent-frameworks) is the product table, separate from these pins.

## Frequently asked questions

### What is the AI agent framework release in November 2026 that can break a running agent?

Two of them, and they break different things. `@mastra/core` 1.83.0, on npm at 2026-11-12T21:27:47Z, says `Agent`’s `durable` option now controls resumable streams only. Checkpoint-backed durable execution moves to `createDurableAgent`. `@openai/agents` 0.22.0, on npm at 2026-11-12T23:59:01Z, narrows TypeScript types around usage metadata and MCP descriptions, and writes saved state as schema 1.24 when the state has richer metadata or a newer nested run. langgraph 1.2.22, uploaded November 14, does not carry a breaking note.

### Did langgraph 1.2.22 change the graph API?

The 1.2.22 notes, published 2026-11-14T01:43:55Z, do not say so. Since 1.2.21 they list performance fixes and one behavior fix: a child graph streams on its own thread when the caller is streaming subgraphs. The same body tags langgraph-checkpoint 4.3.2, langgraph-checkpoint-postgres 3.2.1, and langgraph-prebuilt 1.1.2. 1.2.21, published November 12, fixes subgraph namespace matching. Neither tag is labeled breaking.

### What breaks in @openai/agents 0.22.0?

The agents-core notes say the breaking types require narrowing usage details, Realtime image content, nullable MCP descriptions, unknown schemas and tracing metadata, and optional transcription breakdowns. Saved states retain schema 1.23 when compatible and use 1.24 for richer metadata or newer nested runs. Automatic Responses compaction is deferred while a tool approval is pending. On the Chat Completions API, function tools and handoffs default reasoning effort to `none` for `gpt-6-sol` and `gpt-6-luna`.

### Does Mastra 1.83.0 still checkpoint when durable is true?

Not as checkpoint-backed durable execution. The breaking-changes section says `durable` now controls resumable streams only. Clients can reconnect, observe a run, and abort it. The migration the notes name is `createDurableAgent({ agent })`. npm’s latest stable on November 14 was 1.83.0. The alpha tag was `1.84.0-alpha.0`, published on npm at 2026-11-13T01:08:58Z. That alpha is not the pin.

### Can browser-use 1.0.4 install next to Pydantic AI 2.68.0?

No. PyPI’s browser-use 1.0.4, uploaded at 2026-11-13T20:56:54Z, still requires `pydantic-ai-slim[anthropic,google,openai]==2.66.0`. pydantic-ai 2.68.0, uploaded at 2026-11-12T02:30:01Z, requires `pydantic-ai-slim==2.68.0`. Those exact pins do not resolve in one environment. The November 11 note on browser-use 1.0.2 and Pydantic AI 2.67 is the same conflict, one release later on each side.
