---
title: "Which AI Agent Framework Do People Install? 155,918,257 LangChain Downloads in 30 Days"
description: "155,918,257 PyPI downloads for langchain from October 10 through November 8, 2026, without mirrors. LangGraph had 55,093,579. CrewAI had 2,629,769 and 15,995 more GitHub stars than LangGraph."
takeaways:
  - "From October 10 through November 8, 2026, the PyPI distribution langchain was downloaded 155,918,257 times in the without_mirrors series. langgraph had 55,093,579. strands-agents, left out of this site’s November 5 star snapshot, had 37,592,185."
  - "crewai had 2,629,769 downloads in that window. LangGraph’s count was 20.95 times CrewAI’s. On a GitHub pass at 13:38–13:39 UTC on November 9, crewAIInc/crewAI had 60,684 stars and langchain-ai/langgraph had 44,689."
  - "The same dates on npm: the package ai had 140,196,706 downloads, and @mastra/core had 9,988,333. Those registries are separate counts. A download is a file request, including CI and dependency installs."
date: "2026-11-09"
updated: "2026-11-10"
category: explainer
topics:
  - tools-saas
  - harnesses
  - how-agents-work
audience:
  - builders
  - everyone
companies:
  - langchain
  - crewai
  - openai
  - anthropic
  - google
  - microsoft
  - github
  - pydantic-ai
byline: "AI Agents Info Editorial"
contentLicense: true
absoluteTitle: true
dataset:
  title: "PyPI and npm downloads for agent frameworks, October 10 to November 8, 2026"
  description: "Sums of the pypistats overall endpoint, category without_mirrors, for 19 Python distributions, from 2026-10-10 through 2026-11-08 inclusive. The largest 30-day total is langchain at 155,918,257. GitHub stargazers_count for the paired repositories was read November 9, 2026, with HTTP Date headers from 13:38:56Z to 13:39:04Z, plus strands-agents/harness-sdk at 13:40:17Z and three JavaScript repositories at 13:42:28Z. npm point totals use the same calendar window and are a separate registry."
  isBasedOn: "https://pypistats.org/api/packages/langchain/overall?mirrors=false"
sources:
  - title: "pypistats overall, mirrors=false, 19 Python distributions (daily rows through 2026-11-08)"
    url: "https://pypistats.org/api/packages/langchain/overall?mirrors=false"
  - title: "PyPI JSON for langchain 1.4.9, including requires_dist (read 13:40:16 UTC, November 9, 2026)"
    url: "https://pypi.org/pypi/langchain/json"
  - title: "PyPI JSON for strands-agents 1.64.0"
    url: "https://pypi.org/pypi/strands-agents/json"
  - title: "PyPI JSON for pydantic-ai-slim 2.66.0 (read 13:42:19 UTC)"
    url: "https://pypi.org/pypi/pydantic-ai-slim/json"
  - title: "GitHub REST API, framework repositories, HTTP Date 13:38:56Z to 13:39:04Z on November 9, 2026"
    url: "https://api.github.com/repos/langchain-ai/langchain"
  - title: "GitHub REST API, strands-agents/harness-sdk, HTTP Date 13:40:17Z"
    url: "https://api.github.com/repos/strands-agents/harness-sdk"
  - title: "npm downloads point API, 2026-10-10:2026-11-08, package ai"
    url: "https://api.npmjs.org/downloads/point/2026-10-10:2026-11-08/ai"
  - title: "npm registry metadata for ai, @mastra/core, @langchain/langgraph, @openai/agents, and @google/adk"
    url: "https://registry.npmjs.org/ai"
  - title: "npm download-counts documentation"
    url: "https://github.com/npm/registry/blob/master/docs/download-counts.md"
  - title: "AI Agents Info, framework star snapshot, November 5, 2026"
    url: "https://www.aiagentsinfo.com/reports/ai-agent-framework-github-stats-november-2026"
faq:
  - question: "Which AI agent framework do people install?"
    answer: "Among the Python distributions checked here, langchain had the most file downloads: 155,918,257 from October 10 through November 8, 2026, in pypistats’ without_mirrors series. langgraph was second at 55,093,579. On npm, for the same dates, the package ai had 140,196,706 downloads. A download counts a file request, including CI runs and dependency installs."
  - question: "Does CrewAI have more GitHub stars than LangGraph?"
    answer: "Yes, on the November 9, 2026 reading. crewAIInc/crewAI had 60,684 stars and langchain-ai/langgraph had 44,689, a gap of 15,995. Over the 30 download days, langgraph had 55,093,579 downloads and crewai had 2,629,769. LangGraph’s download total was 20.95 times CrewAI’s."
  - question: "Why is strands-agents missing from the November 5 star table?"
    answer: "That snapshot says the GitHub API returned a redirect for the repository, so strands-agents was left out. On November 9 the PyPI package strands-agents 1.64.0 listed its homepage as github.com/strands-agents/harness-sdk. That repository had 9,084 stars at 13:40 UTC. The package had 37,592,185 downloads from October 10 through November 8."
  - question: "Do LangChain downloads include LangGraph?"
    answer: "langchain 1.4.9 lists langgraph<1.3.0,>=1.2.12 with no extra marker, so a fresh install of that release also requests langgraph unless the file is cached. The 30-day totals do not nest. langchain’s 155,918,257 is larger than langgraph’s 55,093,579, which fits a window that still includes older langchain releases and cache hits."
  - question: "Is a PyPI download a user?"
    answer: "No. The figure is a count of package-file downloads in the without_mirrors series. CI, mirrors that the filter still misses, and one project installing a dependency all land in the same number. Compare distributions on the same registry and the same dates. Do not add a PyPI total to an npm total and call it users."
---

**155,918,257.** That is how many times the PyPI distribution `langchain` was downloaded from October 10 through November 8, 2026, in the `without_mirrors` series.

The [November 5 star snapshot](/reports/ai-agent-framework-github-stats-november-2026) is the page that already shows up for agent-framework stats. It ranks repositories by stars and latest release. It does not say which distribution pip actually fetched. This page sums the daily download rows for the distributions behind that set, adds the one the snapshot left out, and reads the star field again on November 9. The same method, refreshed daily from pypistats and npm, is the [AI agent framework downloads tracker](/trackers/downloads). GitHub stars for the paired repositories are the [stars tracker](/trackers/stars).

## Which AI agent framework do people install?

`langchain`, by PyPI file downloads, in this set and this window. `langgraph` is second. `strands-agents` is third, ahead of `claude-agent-sdk` and `openai-agents`.

The window is 30 calendar days, October 10 through November 8, inclusive. Each total is the sum of the daily `without_mirrors` counts from `https://pypistats.org/api/packages/{name}/overall?mirrors=false`. The series for these packages ended on November 8. November 9 was not in the file yet. Stars are `stargazers_count` from the GitHub repository API. The responses for the repositories that were already in the November 5 set carried HTTP Date headers from 13:38:56Z to 13:39:03Z on November 9, 2026. `strands-agents/harness-sdk` was read at 13:40:17Z, because the PyPI homepage pointed there and the first list did not include it.

| Distribution | Oct 10–Nov 8 | Nov 2–Nov 8 | Nov 8 | PyPI version | Stars | Repository |
| --- | --- | --- | --- | --- | --- | --- |
| langchain | 155,918,257 | 35,271,689 | 4,301,971 | 1.4.9 | 149,260 | langchain-ai/langchain |
| langgraph | 55,093,579 | 13,876,217 | 1,109,424 | 1.2.20 | 44,689 | langchain-ai/langgraph |
| strands-agents | 37,592,185 | 8,863,289 | 963,158 | 1.64.0 | 9,084 | strands-agents/harness-sdk |
| claude-agent-sdk | 33,887,233 | 8,774,136 | 748,665 | 0.2.179 | 8,502 | anthropics/claude-agent-sdk-python |
| pydantic-ai-slim | 32,785,681 | 8,730,134 | 627,097 | 2.66.0 | 21,101 | pydantic/pydantic-ai |
| openai-agents | 17,426,915 | 4,509,002 | 326,857 | 0.24.0 | 30,573 | openai/openai-agents-python |
| google-adk | 10,099,299 | 2,564,724 | 240,894 | 2.14.0 | 22,158 | google/adk-python |
| pydantic-ai | 6,575,730 | 1,601,738 | 105,808 | 2.66.0 | 21,101 | pydantic/pydantic-ai |
| dspy | 5,274,275 | 1,211,876 | 75,319 | 3.4.1 | 38,983 | stanfordnlp/dspy |
| crewai | 2,629,769 | 590,729 | 69,994 | 1.15.39 | 60,684 | crewAIInc/crewAI |
| agno | 2,134,459 | 516,797 | 44,983 | 3.1.12 | 43,117 | agno-agi/agno |
| llama-index | 2,044,132 | 411,755 | 29,851 | 0.14.25 | 52,856 | run-llama/llama_index |
| agent-framework-core | 1,469,689 | 362,008 | 29,307 | 1.25.0 | 14,603 | microsoft/agent-framework |
| smolagents | 597,936 | 175,098 | 16,897 | 1.26.0 | 30,276 | huggingface/smolagents |
| haystack-ai | 556,838 | 141,070 | 9,437 | 3.4.1 | 26,954 | deepset-ai/haystack |
| autogen-agentchat | 401,015 | 100,319 | 10,576 | 0.7.5 | 61,759 | microsoft/autogen |
| semantic-kernel | 328,540 | 80,290 | 7,421 | 1.47.0 | 28,748 | microsoft/semantic-kernel |
| agent-framework | 195,287 | 44,294 | 3,687 | 1.25.0 | 14,603 | microsoft/agent-framework |
| camel-ai | 71,056 | 11,549 | 1,255 | 0.2.90 | 18,023 | camel-ai/camel |

The 19 thirty-day totals sum to 365,081,875. That sum double-counts work that installs more than one of these distributions. It is a checksum on the rows, and it is not a market size.

`pydantic-ai` 2.66.0 requires `pydantic-ai-slim==2.66.0` with no extra marker. The slim distribution had 32,785,681 downloads, 4.99 times the meta package’s 6,575,730. Both rows share the star count of `pydantic/pydantic-ai`. The [directory page](/directory/pydantic-ai) is the product. The two download rows are two files on PyPI.

`agent-framework` 1.25.0 requires `agent-framework-core[all]==1.25.0` with no extra marker. Core had 1,469,689 downloads and the meta package had 195,287. Both point at `microsoft/agent-framework`, which had 14,603 stars, so the star cell is one repository printed twice. The [directory listing](/directory/microsoft-agent-framework) is that repository.

The order of the top five distributions is the same in the seven-day column as in the thirty-day column: langchain, langgraph, strands-agents, claude-agent-sdk, pydantic-ai-slim.

A cross-check on the same endpoint: for `langgraph`, the seven daily rows from November 2 through November 8 sum to 13,876,217, and the recent endpoint’s `last_week` field was 13,876,217. November 8 alone was 1,109,424, and `last_day` was 1,109,424. The recent endpoint’s `last_month` field was 44,769,952. The thirty daily rows sum to 55,093,579. The same split showed up for `langchain` (170,457,766 in `last_month`, 155,918,257 in the thirty daily rows) and for `crewai` (2,442,764 against 2,629,769). This page uses the daily rows.

## Why does CrewAI have more stars and fewer downloads?

CrewAI’s repository had 15,995 more stars than LangGraph’s. LangGraph’s 30-day download count was 20.95 times CrewAI’s.

60,684 minus 44,689 is 15,995. 55,093,579 divided by 2,629,769 is 20.95. The seven-day cut is the same shape: 13,876,217 against 590,729.

Stars are an account’s bookmark on a repository. Downloads are file requests for one named distribution. CrewAI’s PyPI summary calls it a framework for orchestrating role-playing, autonomous agents, and the project URL is `crewAIInc/crewAI`. LangGraph’s summary is “Building stateful, multi-actor applications with LLMs,” and the project URL is the `libs/langgraph` tree inside `langchain-ai/langgraph`. The [CrewAI listing](/directory/crewai) and the [LangChain listing](/directory/langchain) describe the products. The [framework comparison](/best/ai-agent-frameworks) is the licence and release table. Neither of those pages is an install ranking.

`langchain` itself had 59.29 times CrewAI’s downloads, 155,918,257 against 2,629,769, and 149,260 stars against 60,684. The November 5 snapshot had this repository at 149,047 stars. Four days later the field was 213 higher. The download window is the new measurement.

## Where does strands-agents rank if the star table left it out?

Third on this PyPI list. 37,592,185 downloads. 9,084 stars on the repository the package names.

The November 5 methodology says strands-agents was left out because the GitHub API returned a redirect. On November 9, PyPI’s JSON for `strands-agents` 1.64.0 gave the summary “A model-driven approach to building AI agents in just a few lines of code,” Apache-2.0 in the license field, homepage `https://github.com/strands-agents/harness-sdk`, and documentation `https://strandsagents.com`. The API for that repository returned 9,084 stars, 1,487 forks, the SPDX id Apache-2.0, `archived: false`, and the description “Build an agent harness and control it end-to-end. Open-source SDK for production AI agents in Python & TypeScript - any model, any cloud.”

37,592,185 divided by 2,629,769 is 14.29. The omitted package had 14.29 times CrewAI’s downloads and 9,084 stars against CrewAI’s 60,684. A [harness](/glossary/harness), on this site, is the loop, tools, memory, permissions, and stop rules around a model. The repository description uses that word for the SDK. This page did not install it.

`claude-agent-sdk` is the next row, 33,887,233 downloads, from `anthropics/claude-agent-sdk-python` at 8,502 stars. Version 0.2.179. The PyPI summary is “Python SDK for Claude Code.” The [listing](/directory/claude-agent-sdk) is the product page. `openai-agents` 0.24.0 had 17,426,915 downloads and the Python repository had 30,573 stars. That listing is the [OpenAI Agents SDK](/directory/openai-agents-sdk). `google-adk` 2.14.0 had 10,099,299 downloads and `google/adk-python` had 22,158 stars. Its listing is [Google ADK](/directory/google-adk).

## Does installing LangChain also download LangGraph?

A fresh install of langchain 1.4.9 requests langgraph. The 30-day totals still do not nest, because 155,918,257 is larger than 55,093,579.

The requires line, read at 13:40:16 UTC, is `langgraph<1.3.0,>=1.2.12`, with no extra marker. A cache that already holds the file, and every older langchain release inside the 30-day total, keeps the two numbers from lining up as parent and child. google-adk’s langgraph lines are different: each one is guarded by `extra == "all"`, `extra == "extensions"`, or `extra == "test"`. A default `pip install google-adk` does not, on that metadata, require langgraph.

`autogen-agentchat` 0.7.5 had 401,015 downloads. The repository `microsoft/autogen` had 61,759 stars on this pass. langchain’s download total was 388.8 times that package’s. The same repository’s README, and the archive flag, are the subject of [Is AutoGen deprecated?](/blog/is-autogen-deprecated), which read 61,753 stars at 07:41 UTC the same day. Six stars later, the install count is still the small number. semantic-kernel 1.47.0 lists `autogen-agentchat` only behind `extra == "autogen"` and a Python-version marker. That extra is not the 401,015.

## What do the npm packages show for the same dates?

The package `ai` had 140,196,706 downloads. `@langchain/langgraph` had 15,932,146. `@mastra/core` had 9,988,333.

npm’s point API was called for the range `2026-10-10:2026-11-08`. Each response echoed that start and that end. The [download-counts doc](https://github.com/npm/registry/blob/master/docs/download-counts.md) describes this endpoint. An npm download and a PyPI download are different registries. This table does not add them to the PyPI column.

| npm package | Downloads, Oct 10–Nov 8 | Version read Nov 9 | Stars | Repository the registry named |
| --- | --- | --- | --- | --- |
| ai | 140,196,706 | 7.0.166 | 27,830 | vercel/ai |
| @langchain/langgraph | 15,932,146 | 1.7.2 | 3,411 | langchain-ai/langgraphjs |
| @mastra/core | 9,988,333 | 1.82.0 | 29,428 | mastra-ai/mastra |
| @openai/agents | 8,171,695 | 0.21.0 | 3,996 | openai/openai-agents-js |
| @google/adk | 1,085,245 | 2.4.0 | 1,471 | google/adk-js |

The registry describes `ai` as the AI SDK by Vercel, a single interface for model providers. The GitHub description for `vercel/ai`, trailing space removed, was “The AI Toolkit for TypeScript. From the creators of Next.js, the AI SDK is a free open-source library for building AI-powered applications and agents.” 140,196,706 downloads and 27,830 stars sit on that repository. The November 5 snapshot included `vercel/ai` in its 19. The download count covers every app that depends on the package, including apps that call a model and never run an agent loop.

`@langchain/langgraph` names `langchain-ai/langgraphjs`, which had 3,411 stars at 13:42:28Z. The Python repository `langchain-ai/langgraph` had 44,689 stars and the PyPI distribution had 55,093,579 downloads. Those are two repositories. `@openai/agents` names `openai/openai-agents-js` (3,996 stars), and the Python SDK is the other repository (30,573 stars, 17,426,915 PyPI downloads). `@google/adk` names `google/adk-js` (1,471 stars, version 2.4.0). The Python package `google-adk` was on 2.14.0. `@mastra/core` 1.82.0 names `mastra-ai/mastra`, whose description was “Mastra is the modern TypeScript framework for AI-powered applications and agents,” at 29,428 stars. The npm metadata did not include a description field for that package. The star pass’s HTTP Date for Mastra was 13:39:01Z. The three smaller JavaScript repositories were read at 13:42:28Z and 13:42:29Z.

## Why is Letta absent from the table?

The PyPI package `letta` and the repository in the November 5 star table are different projects, so this page does not pair them.

`letta` 0.34.12 had 9,886 downloads in the same 30 days. Its summary was “Letta Code: stateful agents in your terminal,” and its source URL was `https://github.com/letta-ai/letta-code`. The star snapshot’s row is `letta-ai/letta`, which returned 25,390 stars, `pushed_at` 2026-10-18T22:28:04Z, and the SPDX id Apache-2.0. Pairing 9,886 downloads with 25,390 stars would answer a question about the wrong repository.

## What is a download count for?

A download count is the right tool for “what did pip and npm fetch,” and a weak tool for “what should I install.” Which of LangGraph, CrewAI, and the OpenAI Agents SDK to ship, once the download question is settled, is [LangGraph vs CrewAI vs OpenAI Agents SDK](/blog/langgraph-vs-crewai-vs-openai-agents-sdk), with versions and bills checked November 10, 2026.

CI, a dependency, and a person trying a tutorial all increment the same field. `langchain` 1.4.9 pulling `langgraph`, and `pydantic-ai` pulling `pydantic-ai-slim`, are the cases checked above. Other dependencies inside these graphs were not fully expanded. Quality, licence, and whether the README still promises fixes are separate questions. AutoGen’s install name in its own README is `autogen-agentchat`, and that distribution’s 401,015 downloads sit next to a repository whose maintenance statement is already written up.

Voice frameworks were outside this set. On the same dates, `livekit-agents` had 4,583,195 PyPI downloads and `pipecat-ai` had 1,468,981, while Pipecat had 2,007 more stars on the morning of November 10. That census is [LiveKit Agents had 4,583,195 downloads](/research/livekit-agents-vs-pipecat-installs-november-2026).

The [agent picker](/tools/agent-picker) is the directory’s filter for a job. [How do AI agents work?](/blog/how-do-ai-agents-work) is the loop those libraries wrap. The [AI agent harness evaluation checklist](/tools/ai-agent-harness-evaluation-checklist) is the worksheet for testing the software around a model. Public scores are the [November 2026 harness benchmark](/reports/agent-harness-benchmark-november-2026). Shopping agents, a different job from an install count, are [AI shopping agents, the next 6 months](/reports/ai-shopping-agents-next-6-months). A star census of agent products, rather than of these libraries, is [How many GitHub stars does OpenClaw have?](/research/how-many-github-stars-does-openclaw-have). How many popular repositories write instructions for the coding agents these SDKs drive is [How many repos use AGENTS.md?](/research/how-many-repos-use-agents-md). The live filename search next to that census is the [AGENTS.md adoption tracker](/trackers/agents-md).

## FAQ

### Which AI agent framework do people install?

`langchain`, at 155,918,257 PyPI downloads from October 10 through November 8, 2026, without mirrors. `langgraph` had 55,093,579. On npm, over the same dates, the package `ai` had 140,196,706. The two registries are not one ranking.

### Does CrewAI have more stars than installs would suggest?

It has more stars than LangGraph and fewer downloads. 60,684 stars against 44,689. 2,629,769 downloads against 55,093,579. The download ratio is 20.95.

### Why was strands-agents left off the star snapshot?

The snapshot’s note says the GitHub API returned a redirect. The package on PyPI now points at `strands-agents/harness-sdk`, which had 9,084 stars on November 9 and 37,592,185 downloads in the 30-day window.

### Does the LangChain number include LangGraph?

Installing langchain 1.4.9 requests langgraph. The published totals do not nest: 155,918,257 is larger than 55,093,579. Older releases and caches sit inside the larger number.

### Is a download a user?

A download is a file request in one registry’s public stats. It includes CI and dependency installs. It is the count to use when the question is what was fetched.
