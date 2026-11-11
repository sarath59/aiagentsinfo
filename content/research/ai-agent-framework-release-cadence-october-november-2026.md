---
title: "3,165 GitHub releases in 30 days, or 407 days of silence"
description: "At 03:42 UTC on November 11, 2026, vercel/ai had 3,165 GitHub releases in 30 days. The other 23 frameworks had 198. AutoGen had none in 407 days."
date: "2026-11-11"
updated: "2026-11-11"
type: original-report
topics:
  - research
  - tools-saas
  - how-agents-work
  - harnesses
contentLicense: true
absoluteTitle: true
dataset:
  title: "GitHub release counts for 24 AI agent frameworks, 30 and 60 days before November 11, 2026"
  description: "Counts of non-draft GitHub releases whose published_at is on or after 2026-10-12T03:42:41Z (30 days) and 2026-09-12T03:42:41Z (60 days). Pulled from GET /repos/{owner}/{repo}/releases. vercel/ai is 3,165 and 5,991. The other 23 repositories sum to 198 releases in the 30-day window. microsoft/autogen is 0 and 0, latest tag python-v0.7.5 published 2025-09-30, 407 calendar days before the pull date."
  isBasedOn: "https://api.github.com/repos/vercel/ai/releases?per_page=100"
abstract: |
  vercel/ai published 3,165 GitHub releases in the 30 days before 03:42 UTC on November 11, 2026, and 5,991 in the 60 days before that timestamp. The other 23 repositories in this count published 198 releases in the same 30 days. 3,165 is 15.98 times 198.

  microsoft/autogen published none in either window. Its latest release, python-v0.7.5, is dated 2025-09-30, which is 407 calendar days before the pull date. ag2ai/ag2, whose description calls it formerly AutoGen, published 4 releases in 30 days and 9 in 60. huggingface/smolagents published none in 60 days. v1.26.0 is 166 days old.
whyItMatters: |
  A latest-release column answers one question: which tag GitHub returned as newest. It does not say whether that tag is the library you import, or how many tags landed in the month. This site’s November 5 snapshot is that column for 19 of these repositories. The query that snapshot cannot finish is how often they ship.

  The raw count has the opposite failure. vercel/ai’s 3,165 releases are package tags, on the order of a hundred a day. langchain-ai/langgraph’s 30 releases in 30 days include 6 tags named 1.2.15 through 1.2.20 and 24 tags for other packages. CrewAI’s 12 are one version line, 1.15.28 through 1.15.39. Comparing those rows as if a release were the same object is how a cadence table lies.
keyFindings:
  - "vercel/ai published 3,165 non-draft GitHub releases with published_at on or after 2026-10-12T03:42:41Z, and 5,991 on or after 2026-09-12T03:42:41Z. The other 23 repositories published 198 in the 30-day window. 3,165 divided by 198 is 15.98."
  - "microsoft/autogen published 0 releases in both windows. python-v0.7.5 was published 2025-09-30T06:18:26Z, 407 calendar days before 2026-11-11. ag2ai/ag2 published 4 in 30 days and 9 in 60, latest v.1.3.1 at 2026-11-10T21:03:11Z."
  - "pydantic/pydantic-ai published 15 releases in 30 days, 12 on the v2 line and 3 on v1, and 30 in 60 days. anthropics/claude-agent-sdk-python also published 15 in 30 days, all on the v0.2 line, latest v0.2.180."
  - "langchain-ai/langgraph’s newest core tag is still 1.2.20, published 2026-11-05T02:20:53Z, the same timestamp as this site’s November 5 snapshot. Six days later the newest GitHub release is cli==0.4.42, published 2026-11-06T03:04:13Z. Six core tags, 1.2.15 through 1.2.20, fall inside the 30-day window."
  - "Google ADK Python v2.14.0, published 2026-11-07, labels a breaking change: Enum tool arguments arrive as members rather than the raw strings. Microsoft Agent Framework python-1.25.0, the same day, tells Python 3.10 users to move to 3.11 before installing."
methodology: |
  The pull clock is 2026-11-11T03:42:41.104841Z. A GitHub rate_limit response in that second carried HTTP Date Wed, 11 Nov 2026 03:42:41 GMT. Releases were read with the GitHub CLI against GET /repos/{owner}/{repo}/releases?per_page=100. Pages continued until a page was empty, shorter than 100, or its oldest published_at fell before the 60-day cutoff. Drafts are excluded. A release counts in the 30-day window when published_at is greater than or equal to 2026-10-12T03:42:41.104841Z, and in the 60-day window when it is greater than or equal to 2026-09-12T03:42:41.104841Z. Prereleases count in the window and are also tallied apart, except on vercel/ai pages 16 through 60, which were not split.

  vercel/ai pages 1 through 15 were part of the 03:42 pass and held 1,500 releases, all of them inside the 30-day window, oldest 2026-10-27T19:23:05Z, and none marked prerelease. Pages 16 through 60 were requested in the following minutes of the same UTC hour. Page 60’s oldest published_at was 2026-09-12T01:21:54Z, which is before the 60-day cutoff, so that window closed on that page. The cutoffs stay anchored to 03:42:41Z. GitHub returns the list by creation date. The count uses published_at. A release created early enough to land past page 60, and published inside the window, would be missed. The oldest published_at moved backward across the pages that were read.

  Days since latest are calendar days from the UTC date of published_at to 2026-11-11, the UTC date of the pull. The set is the 19 repositories in this site’s November 5 snapshot, plus openai/openai-agents-js, ag2ai/ag2, google/adk-js, google/adk-go, and strands-agents/harness-sdk. GET /repos/strands-agents/sdk-python returned HTTP 301 to https://api.github.com/repositories/983715534. The releases list that followed matched harness-sdk’s latest tag and the same 25 and 49 counts, so the old name is not a second row.

  Breaking changes are quoted only where the release notes label a break, or describe a behavior that fails across the upgrade. A search for the substring “break” also hit the word “breakpoint” and the phrase “breaking restore.” Those matches are not listed.
limitations:
  - "The 24 repositories are a named set. A framework this pull did not request is absent. Release cadence is not a quality rank and not an install count."
  - "A GitHub release is one tag object. On vercel/ai, langchain-ai/langchain, langchain-ai/langgraph, strands-agents/harness-sdk, google/adk-js, and openai/openai-agents-js, one publish can be several package tags. Mastra’s seven 30-day releases are all @mastra/core. Those rows are not the same unit."
  - "vercel/ai’s prerelease flag was checked on the first 1,500 releases only. Pages 16 through 60 are inside the 3,165 and the 5,991 and were not split."
  - "GitHub’s list order is creation date. Counting by published_at can miss a release that was created before the page where the walk stopped and published inside the window. Page 60 was already older than the 60-day cutoff."
  - "The newest tag is not always the library a person imports. langgraph’s newest release is cli==0.4.42. The newest tag named 1.2.x is still 1.2.20. adk-go’s newest release is plugin/agentanalytics/v0.1.0. v2.7.1 was published the day before."
  - "Notes were not read in full for all 5,991 Vercel tags or all 198 other 30-day releases. A breaking change that the notes do not mark, and that the substring search did not surface in the stored excerpts, is absent."
  - "camel-ai/camel’s newest tag, v0.2.91a7, is a prerelease published 2026-09-03, outside the 60-day window. The newest non-prerelease is v0.2.90, published 2026-03-22, 234 calendar days before the pull. The 69-day figure is the prerelease."
  - "AutoGen’s maintenance status is argued on the repository README and on this site’s deprecation note. This count does not add a new claim about that README. It records that the releases API returned no release in 60 days."
references:
  - title: "GitHub REST API, releases for vercel/ai"
    url: "https://api.github.com/repos/vercel/ai/releases?per_page=100"
    note: "Pages 1–15 at 03:42 UTC held 1,500 releases, oldest 2026-10-27T19:23:05Z. Pages 16–60 in the same hour closed the windows at 3,165 and 5,991."
  - title: "GitHub REST API, releases for microsoft/autogen"
    url: "https://api.github.com/repos/microsoft/autogen/releases?per_page=100"
    note: "No published_at inside either window. Latest python-v0.7.5 at 2025-09-30T06:18:26Z."
  - title: "GitHub REST API, releases for pydantic/pydantic-ai"
    url: "https://api.github.com/repos/pydantic/pydantic-ai/releases?per_page=100"
    note: "15 in 30 days, 12 tagged v2 and 3 tagged v1. Latest v2.67.0 at 2026-11-10T23:11:23Z."
  - title: "GitHub REST API, releases for langchain-ai/langgraph"
    url: "https://api.github.com/repos/langchain-ai/langgraph/releases?per_page=100"
    note: "30 in 30 days. Newest cli==0.4.42 at 2026-11-06T03:04:13Z. Core tag 1.2.20 remains 2026-11-05T02:20:53Z."
  - title: "GitHub REST API, releases for ag2ai/ag2"
    url: "https://api.github.com/repos/ag2ai/ag2/releases?per_page=100"
    note: "4 in 30 days, 9 in 60. Latest v.1.3.1 at 2026-11-10T21:03:11Z. v1.1.1 on 2026-09-29 labels a Bedrock client break."
  - title: "GitHub redirect, strands-agents/sdk-python"
    url: "https://api.github.com/repos/strands-agents/sdk-python"
    note: "HTTP 301 to repository id 983715534. Counted once, as strands-agents/harness-sdk. Latest harness-cli/v0.3.0."
  - title: "Google ADK Python release v2.14.0"
    url: "https://github.com/google/adk-python/releases/tag/v2.14.0"
    note: "Published 2026-11-07T00:58:18Z. Breaking changes: Enum tool arguments arrive as members."
  - title: "Microsoft Agent Framework release python-1.25.0"
    url: "https://github.com/microsoft/agent-framework/releases/tag/python-1.25.0"
    note: "Published 2026-11-07T15:52:42Z. Migration note: leave Python 3.10. MCP discovery bounds marked breaking."
  - title: "AI Agents Info, framework release snapshot, November 5, 2026"
    url: "https://www.aiagentsinfo.com/reports/ai-agent-framework-github-stats-november-2026"
    note: "One latest tag per repository, pulled 2026-11-05. This note does not replace that table."
citation:
  apa: "AI Agents Info. (2026, November 11). 3,165 GitHub releases in 30 days, or 407 days of silence. https://www.aiagentsinfo.com/research/ai-agent-framework-release-cadence-october-november-2026"
  bibtex: |
    @misc{aiagentsinfo2026frameworkReleaseCadence,
      title={3,165 GitHub releases in 30 days, or 407 days of silence},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/ai-agent-framework-release-cadence-october-november-2026},
      note={GitHub Releases API, windows anchored at 2026-11-11T03:42:41Z}
    }
ledeQuestion: "How many GitHub releases did these agent frameworks publish in the last 30 and 60 days?"
ledeAnswer: "vercel/ai published 3,165 in the 30 days before 03:42 UTC on November 11, 2026, and 5,991 in 60 days. The other 23 repositories published 198 in those 30 days. microsoft/autogen published none. python-v0.7.5 is 407 days old. ag2ai/ag2 published four."
faq:
  - question: "Which agent framework released the most often?"
    answer: "By GitHub release objects, vercel/ai, at 3,165 in the 30 days before 03:42 UTC on November 11, 2026. Those are package tags. Among the other 23 repositories, langchain-ai/langchain published 32 and langchain-ai/langgraph published 30, also as package tags. The fastest single version line in the set is a tie at 15: pydantic-ai, split 12 on v2 and 3 on v1, and claude-agent-sdk-python, all on v0.2."
  - question: "Is AutoGen still shipping releases?"
    answer: "The microsoft/autogen releases API returned none in the 60 days before November 11, 2026. The latest tag is python-v0.7.5, published September 30, 2025, 407 calendar days earlier. ag2ai/ag2 published four releases in the 30-day window, latest v.1.3.1 on November 10, 2026."
  - question: "Did LangGraph’s core library release after the November 5 snapshot?"
    answer: "No. Tag 1.2.20 is still the newest tag in that version series, published 2026-11-05T02:20:53Z. The newest GitHub release on November 11 was cli==0.4.42, published November 6. The 30-day window contains six core tags, 1.2.15 through 1.2.20, and 24 other package tags."
  - question: "How long has it been since smolagents last released?"
    answer: "166 calendar days. huggingface/smolagents v1.26.0 was published 2026-05-29T05:09:47Z. The 30-day and 60-day windows both contain zero releases."
  - question: "Does a higher release count mean a better framework?"
    answer: "No. The count is tag frequency. A monorepo that tags every package on every change will outrun a single-package library that ships once a month. Installs are a different measurement. This note does not rank quality."
---

**3,165.** That is how many non-draft GitHub releases [vercel/ai](https://github.com/vercel/ai) published in the 30 days before 03:42 UTC on November 11, 2026.

The other 23 repositories in this count published **198** in that same window. 3,165 divided by 198 is 15.98. In the 60-day window the Vercel repository published **5,991**. [microsoft/autogen](https://github.com/microsoft/autogen) published **zero** in both. Its latest tag, `python-v0.7.5`, is dated September 30, 2025, which is 407 calendar days before the pull date.

[ag2ai/ag2](https://github.com/ag2ai/ag2) published four releases in the 30 days and nine in the 60. The repository description calls AG2 formerly AutoGen. The release list agrees with that split: the repository under the old name is quiet, and the repository under the new name is not. What the README says about maintenance is [Is AutoGen deprecated?](/blog/is-autogen-deprecated). This note does not re-argue it. It counts tags.

The [November 5 snapshot](/reports/ai-agent-framework-github-stats-november-2026) is one latest tag per repository, for 19 of these rows. [Best AI agent frameworks](/best/ai-agent-frameworks) compares licences and those tags. Neither page is a cadence. This one is.

## The 30-day count and the 60-day count

A release is in the 30-day window when `published_at` is on or after 2026-10-12T03:42:41Z, and in the 60-day window when it is on or after 2026-09-12T03:42:41Z. Days are calendar days from that timestamp’s UTC date to 2026-11-11. Prereleases are inside the counts. The Pre column is how many of the 30-day releases were marked prerelease. Vercel’s later pages were not split that way. The first 1,500, covering October 27 through November 10, had zero prereleases.

| Repository | 30 days | Pre | 60 days | Latest tag | Published | Days |
| --- | --- | --- | --- | --- | --- | --- |
| vercel/ai | 3,165 | — | 5,991 | @ai-sdk/zai@3.0.52 | 2026-11-10 | 1 |
| langchain-ai/langchain | 32 | 0 | 62 | langchain==1.4.10 | 2026-11-10 | 1 |
| langchain-ai/langgraph | 30 | 0 | 38 | cli==0.4.42 | 2026-11-06 | 5 |
| strands-agents/harness-sdk | 25 | 0 | 49 | harness-cli/v0.3.0 | 2026-11-10 | 1 |
| pydantic/pydantic-ai | 15 | 0 | 30 | v2.67.0 | 2026-11-10 | 1 |
| anthropics/claude-agent-sdk-python | 15 | 0 | 27 | v0.2.180 | 2026-11-09 | 2 |
| crewAIInc/crewAI | 12 | 0 | 18 | 1.15.39 | 2026-11-09 | 2 |
| agno-agi/agno | 10 | 0 | 15 | v3.1.12 | 2026-10-29 | 13 |
| deepset-ai/haystack | 9 | 5 | 13 | v3.5.0 | 2026-11-10 | 1 |
| google/adk-js | 8 | 0 | 20 | integrations-v2.4.0 | 2026-10-28 | 14 |
| microsoft/agent-framework | 8 | 0 | 14 | python-1.25.0 | 2026-11-07 | 4 |
| openai/openai-agents-js | 7 | 2 | 17 | v0.22.0-alpha.2 | 2026-11-08 | 3 |
| mastra-ai/mastra | 7 | 0 | 16 | @mastra/core@1.82.0 | 2026-11-04 | 7 |
| google/adk-go | 5 | 0 | 8 | plugin/agentanalytics/v0.1.0 | 2026-11-05 | 6 |
| ag2ai/ag2 | 4 | 0 | 9 | v.1.3.1 | 2026-11-10 | 1 |
| google/adk-python | 3 | 0 | 7 | v2.14.0 | 2026-11-07 | 4 |
| openai/openai-agents-python | 3 | 2 | 6 | v0.24.0-alpha.7 | 2026-11-08 | 3 |
| microsoft/semantic-kernel | 3 | 0 | 5 | dotnet-1.82.0 | 2026-11-07 | 4 |
| stanfordnlp/dspy | 2 | 0 | 3 | 3.5.0 | 2026-11-10 | 1 |
| run-llama/llama_index | 0 | 0 | 1 | v0.14.25 | 2026-09-21 | 51 |
| microsoft/autogen | 0 | 0 | 0 | python-v0.7.5 | 2025-09-30 | 407 |
| letta-ai/letta | 0 | 0 | 0 | 0.16.8 | 2026-05-14 | 181 |
| huggingface/smolagents | 0 | 0 | 0 | v1.26.0 | 2026-05-29 | 166 |
| camel-ai/camel | 0 | 0 | 0 | v0.2.91a7 | 2026-09-03 | 69 |

Add the 30-day column without Vercel and you get 198. That is the audit of the ratio.

Four repositories are empty in both windows: AutoGen, Letta, smolagents, and CAMEL. LlamaIndex is empty in 30 days and has one release in 60, `v0.14.25` on September 21, 51 days before the pull. CAMEL’s 69 days belong to the prerelease `v0.2.91a7`. The newest tag that is not a prerelease is `v0.2.90`, published March 22, 2026, 234 days before the pull, and it sits outside the table’s latest-tag cell because the cell is the newest release GitHub returned.

## A package tag is not a library version

Vercel’s latest tag is `@ai-sdk/zai@3.0.52`, published 2026-11-10T20:21:32Z. The first 1,500 releases, the ones stored with their tags, used 86 tag prefixes. `@ai-sdk/vue`, `@ai-sdk/react`, `@ai-sdk/llamaindex`, `@ai-sdk/langchain`, and `ai` each appeared 32 times in that slice. A changeset monorepo that publishes one tag per package will post a hundred releases on a day when a single-package library posts one. 3,165 is a real count of release objects. It is not 3,165 copies of one SDK.

LangChain’s 32 and LangGraph’s 30 are the same shape, at a smaller scale. LangGraph’s 30-day tags include `cli`, `sdk`, `checkpoint`, `checkpointsqlite`, `checkpointpostgres`, and `prebuilt`, plus six tags whose names are only the version: `1.2.15` on October 12, `1.2.16` on October 16, `1.2.17` on October 24, `1.2.18` on October 26, `1.2.19` on October 30, and `1.2.20` on November 5 at 02:20:53Z. That last timestamp is the one in the November 5 snapshot. The core series has not moved. The newest release on the repository, `cli==0.4.42`, was published November 6. A page that prints only the latest tag now names the CLI.

Strands was left out of that November 5 snapshot because `strands-agents/sdk-python` redirected. It still does. The 301 target’s release list is `strands-agents/harness-sdk`: 25 releases in 30 days, 49 in 60, latest `harness-cli/v0.3.0` on November 10. Across the 60 days the 49 tags use six prefixes: `python` 13, `harness-cli` 11, `harness-python` 9, `harness-typescript` 8, `typescript` 7, and `mcp` 1.

Google’s three ADK repositories do not share a latest tag. `google/adk-python` published 3 releases in 30 days, `v2.12.0` on October 13, `v2.13.0` on October 23, and `v2.14.0` on November 7. `google/adk-js` published 8, which are two versions, 2.4.0 and 2.3.0, each cut into four package tags in the same minute. The newest is `integrations-v2.4.0` on October 28, 14 days before the pull, and `adk-v2.4.0` is in that same minute. `google/adk-go` published 5. The newest is `plugin/agentanalytics/v0.1.0` on November 5. The newest `v2` tag is `v2.7.1` on November 4, seven days before the pull. The window also contains `v1.9.0` on October 15. Two major lines, one releases list.

The rows that are one line of tags are the ones you can compare to each other. Mastra published 7, and all 7 are `@mastra/core`, from 1.76.0 on October 13 to 1.82.0 on November 4. CrewAI published 12, from `1.15.28` on October 14 to `1.15.39` on November 9, none of them prereleases. The Claude Python agent SDK published 15, from the `v0.2` series, latest `v0.2.180` on November 9. Pydantic AI published 15, but 12 are `v2` and 3 are `v1`, latest `v2.67.0` on November 10 at 23:11 UTC, one calendar day before the pull. Microsoft Agent Framework’s 8 are 4 Python tags (`python-1.22.0` through `python-1.25.0`) and 4 .NET tags (`dotnet-1.25.0` through `dotnet-1.28.0`).

OpenAI’s two SDKs are easy to misread off the latest tag, because both latest tags are alphas. `openai/openai-agents-python` published 3 releases in 30 days: stable `v0.24.0` on October 15, then `v0.24.0-alpha.6` on November 3 and `v0.24.0-alpha.7` on November 8. The stable tag is 27 days old. The alpha is 3. `openai/openai-agents-js` published 7: five package tags at 0.21.0 in the same minute on October 20, including `@openai/agents@0.21.0`, plus `v0.22.0-alpha.1` and `v0.22.0-alpha.2`. Five of the seven are one publish.

Haystack’s 9 in 30 days include 5 prereleases. The latest, `v3.5.0` on November 10, is not one of them. Agno published 10, latest `v3.1.12` on October 29, 13 days before the pull. DSPy published 2, latest `3.5.0` on November 10. Semantic Kernel published 3, latest `dotnet-1.82.0` on November 7.

## Four repositories did not ship, and one shipped once

smolagents `v1.26.0` was published 2026-05-29T05:09:47Z. That is 166 days. Letta `0.16.8` was published 2026-05-14T17:14:24Z. That is 181 days. LlamaIndex’s only release inside 60 days is `v0.14.25` on September 21. AutoGen’s gap is the long one, 407 days, and it is the gap a latest-release cell hides if the cell is allowed to look like “current” merely because the tag exists.

AG2’s four 30-day tags are `v1.2.1` on October 21, `v1.2.2` on October 27, `v1.3.0` on November 4, and `v.1.3.1` on November 10. The tag spelling is GitHub’s, including the extra dot. `v1.2.0` on October 11 falls just outside the 30-day cutoff and inside the 60.

Quiet is not the same fact as unused. The [install census](/blog/which-ai-agent-framework-do-people-install) and the [downloads tracker](/trackers/downloads) count file requests. The [stars tracker](/trackers/stars) counts bookmarks. A library can be quiet on tags and loud on downloads, or the reverse. This note does not re-sum those series.

## What the notes mark as breaking

Most of the 198 releases do not label a break. These do, in the notes read for this pull.

Google ADK Python `v2.14.0`, published November 7, has a Breaking changes section. `FunctionTool` parameters annotated `Enum`, `Optional[Enum]`, or `list[Enum]` now receive enum members instead of the raw strings the model sent. The note says string comparison, string-keyed lookups, and `json.dumps` on a plain `Enum` no longer work. `v2.13.0`, published October 23, also has that heading. Telemetry defaults to the OpenTelemetry GenAI v2 schema. The legacy schema stays available by setting `ADK_TELEMETRY_SCHEMA_VERSION_OPT_IN=otel_semconv_1_36`.

Microsoft Agent Framework `python-1.25.0`, published November 7, tells a Python 3.10 environment to move to 3.11 or later before installing. The same notes mark as breaking a bound on MCP tool and prompt discovery, 100 pages and 1,000 items per catalog, and a default 30-second timeout on framework-owned requests. `dotnet-1.28.0`, published November 6, marks as breaking the removal of `A2AServerRegistrationOptions.AgentRunMode`. The built-in handler returns a message rather than a task.

Pydantic AI `v2.62.0`, published October 27, says `GraphBuilder` broadcast branches now start in `.to()` order instead of reversed, which can break replay of a durable workflow that was paused across the upgrade. The newer `v2.67.0` notes use “Break” as a verb about chat-template special tokens. That line is a behavior description, and this page does not promote it to a breaking-change heading the notes did not use.

AG2 `v1.1.1`, published September 29, is inside the 60-day window and outside the 30. The notes head a section “Breaking: Bedrock runs on aiobotocore.” `BedrockConfig` uses a native async client instead of wrapping synchronous boto3.

CrewAI `1.15.34`, published November 1, has a Breaking Changes heading that documents the removal of the 1.15.29 agent executor and points at migration notes. `1.15.29` itself was published October 23, inside the 30-day window. The sentence above is what 1.15.34’s notes say. It is not a second reading of 1.15.29’s body.

Haystack `v3.5.0` does not use that heading for the splitter change, and the change is still a pin risk. `RecursiveDocumentSplitter` in word mode no longer counts a whitespace-only piece as a word. The notes say the chunk boundaries move for text that contains page breaks, and they tell you to re-split and re-index if you rely on stable boundaries.

A search that only looks for the letters b-r-e-a-k will also catch “breakpoint” in a LangGraph fix and “breaking restore” in a CrewAI checkpoint note. Those are not in the list above.

## What this means if you pin a framework this week

Read the tag shape before you read the count. If you import `langgraph`, the core tag to pin against is still `1.2.20` from the morning of November 5, not `cli==0.4.42`. If you import the Vercel AI SDK, 3,165 is the noise of a package publish, and the tag you pin is the package you import, not `@ai-sdk/zai@3.0.52` unless that is the package. If you import `@mastra/core`, seven releases in 30 days, 1.76.0 through 1.82.0, is the cadence of that package.

If you are choosing between the AutoGen repository and AG2, the releases API already separated them. Zero releases in 407 days on `microsoft/autogen`. Four in 30 days on `ag2ai/ag2`, latest `v.1.3.1` on November 10. The Bedrock client break in the 60-day window is `v1.1.1` on September 29, not the November tag.

If you are about to upgrade Google ADK Python to `v2.14.0` or Microsoft Agent Framework to `python-1.25.0`, both published November 7, read the enum-member change and the Python 3.10 drop before you treat the bump as a patch. Those are the two notes in this set that will fail a call or an install, rather than only adding a tag.

Do not treat smolagents’ 166 days, or LlamaIndex’s single September release, as a quality score. Treat them as a maintenance fact, and go to the download table if the question is who installs the library. The November 5 page remains the star, fork, and licence table. This page is the count that table’s latest-release cell cannot make.

The install pins and behavior notes for browser-use 1.0.2, Pydantic AI 2.67.0, AG2 1.3.1, and FastMCP 4.1.8, read the morning of November 11, are [AI agent framework release November 2026](/blog/ai-agent-framework-release-november-2026). browser-use is not one of the 24 repositories in this count.
---
