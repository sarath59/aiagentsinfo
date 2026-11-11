---
title: "59 LangChain issues closed in under a minute. The bug-labeled median was 3.3 days."
description: "At 13:46 UTC on November 11, 2026, 59 of 95 LangChain issues closed in 30 days took under a minute. 58 were closed by a triage bot. The 37 labeled bug had a median of 3.3 days. LangGraph’s median, on 342 closes, was 167.26 days."
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
  title: "Issue and pull-request health for 19 AI agent frameworks, pulled 2026-11-11T13:46:26Z"
  description: "GitHub search counts anchored at 2026-11-11T13:46:26Z for the 19 repositories in the November 5 framework snapshot. Open issues 8,053. Open pull requests 8,069. Issues created on or after 2026-10-12T13:46:26Z: 4,105. Issues closed on or after that timestamp: 3,316. Open issues whose updated_at is before 2026-08-13T13:46:26Z: 2,592. LangChain closed 95 issues. Median close time 14 seconds. 59 of the 95 closed in under 60 seconds, 58 of them by langchain-oss-automated-triage[bot] with state reason NOT_PLANNED. The 37 labeled bug had a median of 286,447 seconds. LangGraph’s median on 342 closes was 14,451,593 seconds (167.26 days). anthropics/claude-agent-sdk-python and camel-ai/camel closed 0. microsoft/autogen had 453 of 574 open issues stale. The repository endpoint’s open_issues_count matched the search sum of open issues plus open pull requests on 17 repositories. huggingface/smolagents was 1,073 against 1,071. camel-ai/camel was 637 against 636."
  isBasedOn: "https://api.github.com/search/issues"
abstract: |
  At 13:46:26 UTC on November 11, 2026, 59 of the 95 issues closed on langchain-ai/langchain in the previous 30 days were closed in under 60 seconds. Fifty-eight of those 59 were closed by langchain-oss-automated-triage[bot], state reason NOT_PLANNED. The overall median was 14 seconds. The 37 issues labeled bug had a median of 286,447 seconds, which is 3.3 days.

  Across the same 19 repositories, 2,592 of 8,053 open issues had no update in the 90 days before that timestamp. That is 32.2 percent. langchain-ai/langgraph closed 342 issues at a median of 167.26 days. anthropics/claude-agent-sdk-python and camel-ai/camel closed none.
whyItMatters: |
  A median time-to-close describes issues that already died. It says nothing about the issues still open, and it treats a triage bot and a maintainer as the same click. LangChain’s 14-second median is the bot. The bug-labeled median, 3.3 days, is a different population inside the same 95 closes.

  The stale share is the other statistic. It is the fraction of open issues whose updated_at is more than 90 days behind the pull. AutoGen’s is 453/574. Pydantic AI’s is 14/1,380. Those two numbers are the maintenance fact a release tag cannot carry. This site’s November 5 table already adds issues and pull requests into one column, and says so. This note splits them.
keyFindings:
  - "59 of 95 issues closed on langchain-ai/langchain in the 30 days before 2026-11-11T13:46:26Z took under 60 seconds. 58 were closed by langchain-oss-automated-triage[bot] with state reason NOT_PLANNED. One was closed by its author, also as not planned. The median of all 95 was 14 seconds. The median of the 37 labeled bug was 286,447 seconds (3.3 days)."
  - "2,592 of 8,053 open issues across the 19 repositories had updated_at before 2026-08-13T13:46:26Z. 2,592 divided by 8,053 is 32.2 percent. microsoft/autogen was 453/574, which is 78.9 percent, and it closed 5 issues. pydantic/pydantic-ai was 14/1,380, which is 1.0 percent, and it closed 713."
  - "langchain-ai/langgraph closed 342 issues and opened 106. The median time-to-close was 14,451,593 seconds, 167.26 days. stanfordnlp/dspy’s median on 50 closes was 265.20 days. microsoft/semantic-kernel’s median on 74 closes was 162.50 days."
  - "anthropics/claude-agent-sdk-python closed 0 issues and opened 25. camel-ai/camel closed 0 and opened 46. letta-ai/letta had 0 open issues and 0 open pull requests. The 5 issues it closed were closed by github-actions[bot] in 11 to 13 seconds, median 12 seconds, state reason completed."
  - "Search open issues plus search open pull requests matched the repository endpoint’s open_issues_count on 17 of 19 repositories. The misses were huggingface/smolagents, 425+646 against 1,073, and camel-ai/camel, 308+328 against 637."
methodology: |
  The pull clock is the GitHub Date header on a rate_limit request, Wed, 11 Nov 2026 13:46:26 GMT, recorded as 2026-11-11T13:46:26Z. The 30-day window starts at 2026-10-12T13:46:26Z. The stale cutoff is 2026-08-13T13:46:26Z, exactly 90 days of 24 hours earlier. The set is the 19 repositories in this site’s November 5 framework snapshot, in that page’s order.

  The repository endpoint, GET /repos/{owner}/{repo}, was read first. Its open_issues_count includes pull requests. The split comes from the search API. Open issues: is:issue is:open. Open pull requests: is:pr is:open. Opened in the window: is:issue created:>=2026-10-12T13:46:26Z. Closed in the window: is:issue closed:>=2026-10-12T13:46:26Z. Stale open issues: is:issue is:open updated:<2026-08-13T13:46:26Z. Each search waited 2.15 seconds. The counts in the table are total_count from those queries.

  The median pass repeated the closed query and requested every page, 100 items at a time, until the items ran out. Every repository’s total_count on that pass matched the count pass. Duration is closed_at minus created_at, in seconds. An item whose closed_at fell before the window was to be dropped. None did. For an odd count the median is the middle value after sorting ascending. For an even count it is the arithmetic mean of the two middle values. The even close counts are langgraph (342), agent-framework (230), semantic-kernel (74), llama_index (12), dspy (50), haystack (94), and smolagents (2). A repository that closed zero issues has no median.

  The LangChain label split uses the label name bug on the search payload for those 95 issues. Under 60 seconds means a duration strictly below 60. The closer and the state reason for those 59 issues come from the issue timeline’s ClosedEvent, via the GraphQL API, one event per issue, the last close event on the timeline. The Letta closers come from the REST issue object’s closed_by and state_reason for issues 3453, 3455, 3456, 3457, and 3458.

  Stale share is stale open issues divided by open issues. letta-ai/letta had zero open issues, so the share is undefined. Percents in the table are that quotient times 100, rounded to one decimal. 197/308 is 63.961 percent and is printed 64.0. 14/1,380 is 1.014 percent and is printed 1.0.
limitations:
  - "The 19 repositories are the November 5 snapshot. A framework this pull did not request is absent. Issue health is not a quality rank, not an install count, and not a release cadence."
  - "The median describes issues that closed. It skips every issue that is still open. A 167-day median is the age of issues that died in the window. It is not a promise about how long a bug filed tomorrow will wait."
  - "LangChain’s 14-second median mixes a triage bot with bug reports. The bug-labeled median is the split. Two of those 37 bug-labeled issues were themselves inside the sub-minute set. This note does not recompute the bug median after removing them."
  - "The closer check covers the 59 LangChain issues under 60 seconds, and the 5 Letta issues. It does not cover the other closes. A bot close is recorded as GitHub recorded it. This note does not judge whether the close was the right decision."
  - "Stale means updated_at before the cutoff. A comment, a label, or a commit reference resets the clock. An issue can be years old and fail the stale test if someone touched it on day 89."
  - "Search is an index. The repository endpoint was read first, and the search pages followed over the next minutes of the same UTC day, still anchored to 13:46:26Z. Two repositories disagree with the endpoint by 2 and by 1. Those gaps are printed. They were not edited to match."
  - "Opened minus closed is a flow. It equals the change in the open-issue stock only when every open and every close in the window is inside the two counts and no issue was deleted or transferred."
  - "Pull requests are counted and not timed. CrewAI’s 751 open pull requests and Vercel’s 1,071 are not a review-time median."
  - "smolagents has two closes, 84,650 seconds and 9,318,311 seconds. The printed median, 54.42 days, is their mean. AutoGen’s median is five closes. Letta’s is five. Those three medians are thin."
  - "An issue opened and closed inside the window is counted in both the opened column and the closed column."
references:
  - title: "GitHub search issues, langchain-ai/langchain closed in the window"
    url: "https://api.github.com/search/issues?q=repo:langchain-ai/langchain+is:issue+closed:%3E%3D2026-10-12T13:46:26Z&per_page=100"
    note: "total_count 95. 59 durations under 60 seconds. Median of all 95: 14 seconds."
  - title: "GitHub issue timeline, LangChain closes under 60 seconds"
    url: "https://github.com/langchain-ai/langchain/issues/41751"
    note: "58 of 59 ClosedEvents were actor langchain-oss-automated-triage[bot], state reason NOT_PLANNED. Issue 41751 is one of them, closed 10 seconds after creation. The remaining close was the author anh-nguyenn on a test issue."
  - title: "GitHub issue, letta-ai/letta #3458"
    url: "https://github.com/letta-ai/letta/issues/3458"
    note: "Title: Buttons unclickable in Safari (macOS app) but work in Chrome. closed_by github-actions[bot], state_reason completed, 12 seconds after creation. The other four closes in the window had the same closer and the same reason."
  - title: "GitHub search issues, microsoft/autogen open and stale"
    url: "https://api.github.com/search/issues?q=repo:microsoft/autogen+is:issue+is:open&per_page=1"
    note: "574 open issues. The stale query returned 453. Closed in the window: 5."
  - title: "GitHub search issues, anthropics/claude-agent-sdk-python closed in the window"
    url: "https://api.github.com/search/issues?q=repo:anthropics/claude-agent-sdk-python+is:issue+closed:%3E%3D2026-10-12T13:46:26Z&per_page=1"
    note: "total_count 0 on the count pass and again on the median pass."
  - title: "AI Agents Info, framework release snapshot, November 5, 2026"
    url: "https://www.aiagentsinfo.com/reports/ai-agent-framework-github-stats-november-2026"
    note: "The same 19 repositories. That page’s open column is issues plus pull requests."
  - title: "AI Agents Info, release cadence, November 11, 2026"
    url: "https://www.aiagentsinfo.com/research/ai-agent-framework-release-cadence-october-november-2026"
    note: "Tag counts anchored at 03:42 UTC the same day. This note does not recount tags."
citation:
  apa: "AI Agents Info. (2026, November 11). 59 LangChain issues closed in under a minute. The bug-labeled median was 3.3 days. https://www.aiagentsinfo.com/research/ai-agent-framework-issue-health-november-2026"
  bibtex: |
    @misc{aiagentsinfo2026frameworkIssueHealth,
      title={59 LangChain issues closed in under a minute. The bug-labeled median was 3.3 days.},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/ai-agent-framework-issue-health-november-2026},
      note={GitHub search, window anchored at 2026-11-11T13:46:26Z}
    }
ledeQuestion: "How healthy are the issue trackers of the top AI agent frameworks?"
ledeAnswer: "At 13:46 UTC on November 11, 2026, 59 of 95 LangChain issues closed in the previous 30 days took under a minute, 58 of them by a triage bot. The 37 labeled bug had a median of 3.3 days. LangGraph’s median on 342 closes was 167.26 days. Claude’s Python agent SDK and CAMEL closed none. 2,592 of 8,053 open issues had no update in 90 days."
faq:
  - question: "Why is LangChain’s median close time 14 seconds?"
    answer: "Because 59 of the 95 issues closed in the 30 days before 13:46 UTC on November 11, 2026 were closed in under 60 seconds. 58 of those 59 were closed by langchain-oss-automated-triage[bot] with state reason NOT_PLANNED. The 37 issues labeled bug had a median of 286,447 seconds, 3.3 days. The 14-second figure is the median of all 95, and the bot is most of that set."
  - question: "Which frameworks closed no issues?"
    answer: "anthropics/claude-agent-sdk-python closed 0 and opened 25. camel-ai/camel closed 0 and opened 46. Both still have open issues: 242 and 308. Their stale shares are 154/242 (63.6 percent) and 197/308 (64.0 percent). A repository with zero closes has no median."
  - question: "What does a 167-day median mean for LangGraph?"
    answer: "LangGraph closed 342 issues and opened 106. The median duration is 14,451,593 seconds, 167.26 days, and because 342 is even that median is the mean of the two middle durations. Counted back from 13:46:26 UTC on November 11, those seconds land at 07:26 UTC on May 28. That describes the issues that closed. A bug that is still open is outside the median."
  - question: "How stale is AutoGen’s issue tracker?"
    answer: "453 of 574 open issues on microsoft/autogen had no update in the 90 days before 13:46 UTC on November 11, 2026. That is 78.9 percent. The repository opened 18 issues and closed 5. The median of those 5 closes is 4,991 seconds, 1.39 hours."
  - question: "Does a fast release cadence mean a healthy issue tracker?"
    answer: "No. The cadence note, anchored at 03:42 UTC the same day, counted 3,165 GitHub releases in 30 days for vercel/ai. This pull found 266 of 488 open issues stale, 54.5 percent, and 1,071 open pull requests. Tag frequency and issue staleness are different counts."
---

**59.** That is how many of the 95 issues closed on [langchain-ai/langchain](https://github.com/langchain-ai/langchain) in the 30 days before 13:46:26 UTC on November 11, 2026 were closed in under 60 seconds.

The median of all 95 was **14 seconds**. Fifty-eight of the 59 were closed by `langchain-oss-automated-triage[bot]`, state reason `NOT_PLANNED`. The other was closed by its author, also as not planned. The 37 issues that carried the label `bug` had a median of **286,447 seconds**, which is 3.3 days. Two of those 37 were inside the sub-minute set. The bug median still lands at 286,447 seconds.

The same pull, on the 19 repositories from the [November 5 snapshot](/reports/ai-agent-framework-github-stats-november-2026), found **2,592** open issues with no update in 90 days, out of **8,053** open issues. 2,592 ÷ 8,053 is 32.2 percent. [LangGraph](https://github.com/langchain-ai/langgraph) closed 342 issues at a median of 167.26 days. The Claude Python agent SDK and CAMEL closed none.

[How often these repositories tag a release](/research/ai-agent-framework-release-cadence-october-november-2026), counted at 03:42 UTC the same day, is a different question. A repository can publish 3,165 release objects and still leave 266 of 488 open issues untouched for 90 days. This page is the issue tracker. That page is the tags.

## The counts, and the median of the issues that closed

Open issues and open pull requests are a search split. `is:issue` excludes pull requests. Stale is an open issue whose `updated_at` is before 2026-08-13T13:46:26Z. The median is `closed_at` minus `created_at` for issues closed on or after 2026-10-12T13:46:26Z. An even count uses the mean of the two middle values. A dash means the repository closed zero issues, so it has no median. Letta’s stale share is blank because the denominator is zero.

| Repository | Open issues | Open PRs | Opened | Closed | Stale | Stale share | Median | n |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| langchain-ai/langchain | 595 | 141 | 164 | 95 | 202 | 202/595 (33.9%) | 14 seconds | 95 |
| langchain-ai/langgraph | 342 | 135 | 106 | 342 | 60 | 60/342 (17.5%) | 167.26 days | 342 |
| crewAIInc/crewAI | 496 | 751 | 451 | 205 | 0 | 0/496 (0.0%) | 36.16 days | 205 |
| microsoft/autogen | 574 | 600 | 18 | 5 | 453 | 453/574 (78.9%) | 1.39 hours | 5 |
| microsoft/agent-framework | 670 | 220 | 332 | 230 | 204 | 204/670 (30.4%) | 7.47 days | 230 |
| microsoft/semantic-kernel | 95 | 248 | 38 | 74 | 2 | 2/95 (2.1%) | 162.50 days | 74 |
| openai/openai-agents-python | 24 | 35 | 66 | 61 | 0 | 0/24 (0.0%) | 4.60 days | 61 |
| google/adk-python | 201 | 220 | 216 | 227 | 27 | 27/201 (13.4%) | 14.81 days | 227 |
| anthropics/claude-agent-sdk-python | 242 | 379 | 25 | 0 | 154 | 154/242 (63.6%) | — | 0 |
| huggingface/smolagents | 425 | 646 | 51 | 2 | 226 | 226/425 (53.2%) | 54.42 days | 2 |
| run-llama/llama_index | 395 | 966 | 135 | 12 | 117 | 117/395 (29.6%) | 21.50 hours | 12 |
| pydantic/pydantic-ai | 1,380 | 593 | 1,088 | 713 | 14 | 14/1,380 (1.0%) | 4.64 days | 713 |
| mastra-ai/mastra | 439 | 325 | 788 | 627 | 0 | 0/439 (0.0%) | 33.82 hours | 627 |
| agno-agi/agno | 948 | 923 | 177 | 121 | 401 | 401/948 (42.3%) | 95.07 days | 121 |
| stanfordnlp/dspy | 343 | 433 | 28 | 50 | 242 | 242/343 (70.6%) | 265.20 days | 50 |
| camel-ai/camel | 308 | 328 | 46 | 0 | 197 | 197/308 (64.0%) | — | 0 |
| letta-ai/letta | 0 | 0 | 5 | 5 | 0 | — | 12 seconds | 5 |
| deepset-ai/haystack | 88 | 55 | 81 | 94 | 27 | 27/88 (30.7%) | 7.29 days | 94 |
| vercel/ai | 488 | 1,071 | 290 | 453 | 266 | 266/488 (54.5%) | 2.58 days | 453 |

Add the open-issue column and you get 8,053. Add the open-PR column and you get 8,069. The two totals differ by 16. Add opened and you get 4,105. Add closed and you get 3,316. Opened minus closed is 789.

The repository endpoint’s `open_issues_count`, which includes pull requests, matched the search sum on 17 repositories. `huggingface/smolagents` returned 1,073 from the endpoint and 425 + 646 from search. `camel-ai/camel` returned 637 and 308 + 328. The endpoint was read first. Search followed. The table keeps the search split.

## LangChain’s 14 seconds are a bot. The bug label is a different median.

Of the 95 closed issues, 57 had no `bug` label and closed in under 60 seconds. Two had the `bug` label and still closed in under 60 seconds. Thirty-five had the `bug` label and took longer. One had no `bug` label and took longer. The median of the 58 without the label was 12 seconds. The median of the 37 with the label was 286,447 seconds.

Four of the fast closes, checked before the full timeline pass, were issues 41751, 41513, 41628, and 41716. Each was closed by `langchain-oss-automated-triage[bot]` 10 to 12 seconds after `created_at`, reason `NOT_PLANNED`. The timeline pass then covered all 59. Fifty-eight were that bot. The exception was issue 41491, title “test,” closed by its author `anh-nguyenn`, also `NOT_PLANNED`.

A harness team that reads “median time to close: 14 seconds” and concludes that LangChain fixes bugs in 14 seconds has read the bot. The number that describes the bug-labeled closes is 3.3 days, and 202 of the 595 issues still open had not been updated in 90 days. Both can be true. The repository is closing a flood of non-bug issues by automation, and a third of the open issue stock is quiet.

Letta is the same mechanism with an empty tracker. `letta-ai/letta` had 0 open issues and 0 open pull requests. It opened 5 issues and closed 5. The durations were 11, 12, 12, 12, and 13 seconds. The median is 12 seconds. All five were closed by `github-actions[bot]` with `state_reason` completed. One of them, [#3458](https://github.com/letta-ai/letta/issues/3458), is titled “Buttons unclickable in Safari (macOS app) but work in Chrome.” An open-issue count of zero, on this repository, on this day, means the bot emptied the window. It does not mean the Safari report was fixed.

## A long median is the age of the issues that closed

LangGraph closed 342 issues and opened 106. The median duration was 14,451,593 seconds, 167.26 days. The count is even, so that figure is the mean of the two middle durations. More issues were closed than opened. Counted back from 13:46:26 UTC on November 11, those seconds land at 07:26 UTC on May 28. That is the age of the middle of the issues that closed. The stale share on the issues still open is 60/342, 17.5 percent. The issues that closed and the issues still open are different sets. A bug filed on November 1 sits outside that median.

DSPy and Semantic Kernel have the same shape, at a smaller close count. DSPy closed 50 and opened 28, median 265.20 days, stale share 242/343 (70.6 percent). Semantic Kernel closed 74 and opened 38, median 162.50 days, stale share 2/95 (2.1 percent). Semantic Kernel’s open issues are almost all recently touched, and the issues it closed were old. The stale share and the median point at different piles.

AutoGen is the quiet pile. 453 of 574 open issues are stale, 78.9 percent. It opened 18 and closed 5. The median of those five is 4,991 seconds, 1.39 hours. The issues it still closes are young. The issues it does not touch are most of the tracker. The [cadence note](/research/ai-agent-framework-release-cadence-october-november-2026) already counted zero releases on `microsoft/autogen` in 407 days, and four releases in 30 days on `ag2ai/ag2`. This pull did not add AG2. The issue tracker and the tag list are telling the same story about the old repository.

The Claude Python agent SDK and CAMEL have no median, because the closed query returned zero. The SDK opened 25 issues against 242 already open, and 154 of the 242 are stale. CAMEL opened 46 against 308 open, and 197 are stale. The cadence note counted 15 releases in 30 days for `anthropics/claude-agent-sdk-python`, and zero for CAMEL. The SDK is the clean example of the split: tags moved, and the issue search closed nothing.

smolagents closed two issues. [#2961](https://github.com/huggingface/smolagents/issues/2961) was open 84,650 seconds, 23.51 hours, and carried the label `bug`. [#2434](https://github.com/huggingface/smolagents/issues/2434) was open 9,318,311 seconds, 107.85 days. The mean, which is the median of two values, is 54.42 days. The stale share is the more stable number: 226/425, 53.2 percent. The cadence note had the last tag at 166 days. This pull does not move that tag. It says the issue tracker closed twice.

## Pull requests are half the combined column

The [November 5 page](/reports/ai-agent-framework-github-stats-november-2026) labels its column “Open issues + PRs,” and the field it copies is `open_issues_count`. On this pull the search split shows where that sum actually sits.

CrewAI’s endpoint count was 1,247. Search says 496 issues and 751 pull requests. The larger number is pull requests. The issue side is fresh: 0 of 496 stale, 451 opened, 205 closed, median 36.16 days. A fresh issue tracker can sit next to a large open-PR pile. This note did not time those pull requests.

Vercel’s endpoint count was 1,559: 488 issues and 1,071 pull requests. Stale issues are 266/488, 54.5 percent. The median of 453 closes is 2.58 days, so the issues that closed were young, and more than half of the issues still open had not moved in 90 days. The cadence note’s 3,165 releases in 30 days are package tags. They are real, and they are not an issue-triage statistic.

LlamaIndex’s endpoint count was 1,361: 395 issues and 966 pull requests. It closed 12 issues, median 21.50 hours, and opened 135. The pull-request side is the bulk of the combined column. Pydantic AI is the reverse shape: 1,380 open issues and 593 open pull requests, only 14 issues stale, 1,088 opened, 713 closed, median 4.64 days. Mastra closed 627, opened 788, stale share 0/439, median 33.82 hours. The OpenAI Agents SDK for Python had 24 open issues, none stale, 66 opened, 61 closed, median 4.60 days.

Google ADK Python closed 227 and opened 216, median 14.81 days, stale share 27/201 (13.4 percent). Microsoft Agent Framework closed 230 and opened 332, median 7.47 days, stale share 204/670 (30.4 percent). Agno’s stale share is 401/948 (42.3 percent), median 95.07 days on 121 closes. Haystack closed 94 and opened 81, median 7.29 days, stale share 27/88 (30.7 percent).

## What this means if you depend on one of these trackers

Read the stale share before you read the median. The stale share is the open stock that has gone quiet. The median is the age, at death, of the issues that closed, and on LangChain that death was a bot 58 times out of 59 fast closes.

If you import `langchain`, budget a bot that will close a non-bug issue in under a minute and mark it not planned. Budget about 3.3 days as the median life of a bug-labeled issue that did get closed, and remember that 202 open issues had already sat 90 days without an update. If you import `langgraph`, the 167.26-day median is the age of the issues that closed, against 106 new issues. The open stock’s stale share is 17.5 percent.

If you are still importing `microsoft/autogen`, 78.9 percent of the open issues have not moved in 90 days, five issues closed, and the tag list on the cadence page has been still for 407 days. If you import `anthropics/claude-agent-sdk-python`, the cadence page counted 15 releases in 30 days and this page counted zero issue closes. Watch the issue you care about. The tag count will not tell you it was closed.

If you import `pydantic-ai` or `@mastra/core`, the trackers are being worked. Pydantic AI’s stale share is 1.0 percent and it closed 713 issues, while 1,088 were opened. Mastra’s stale share is 0 and it closed 627, while 788 were opened. Inflow is ahead of closes on both. The median wait among issues that did close was 4.64 days and 33.82 hours.

If you are choosing CrewAI by its issue freshness, 0 of 496 open issues are stale. The number beside that fact is 751 open pull requests. This page did not measure how long those pull requests wait. The [November 5 table](/reports/ai-agent-framework-github-stats-november-2026) remains the star, fork, and licence snapshot. The [cadence note](/research/ai-agent-framework-release-cadence-october-november-2026) remains the tag count. This page is the split those two columns cannot make.
---
