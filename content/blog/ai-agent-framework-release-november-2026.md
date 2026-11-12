---
title: "AI agent framework release November 2026: browser-use 1.0.2 will not install next to Pydantic AI 2.67"
description: "From November 9 to the morning of November 11, 2026, browser-use 1.0.2 pinned pydantic-ai-slim at 2.66.0. pydantic-ai 2.67.0 requires 2.67.0. AG2 1.3.1 and FastMCP 4.1.8 shipped in the same window."
absoluteTitle: true
takeaways:
  - "browser-use 1.0.2, uploaded to PyPI at 2026-11-11T04:07:32Z, requires pydantic-ai-slim==2.66.0. pydantic-ai 2.67.0, uploaded at 2026-11-11T00:23:27Z, requires pydantic-ai-slim==2.67.0. A resolver cannot satisfy both exact pins."
  - "GitHub published browser-use 1.0.0 at 2026-11-10T02:04:48Z. The agent writes Python in one persistent REPL on Chrome DevTools Protocol. Browser() now starts a Browser Use Cloud browser. The 1.0.0 notes claim up to 33 points on the same models. The only score table on that page compares 1.0 with Browser Use Pi, and the quality gap there is not significant once provider errors are removed."
  - "AG2 1.3.1 was uploaded to PyPI at 2026-11-10T21:03:53Z. A2UI v1.0 messages now carry version 1.0, not v1.0. FastMCP 4.1.8, uploaded at 2026-11-10T20:44:54Z, makes OAuth proxy token revocation work for the client that owns the token."
date: "2026-11-11"
updated: "2026-11-12"
category: news
topics:
  - news
  - harnesses
  - tools-saas
  - how-agents-work
audience:
  - builders
  - everyone
companies:
  - pydantic-ai
  - langchain
  - crewai
  - openai
  - anthropic
  - google
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Agent framework versions and exact pins, read November 11, 2026"
  description: "PyPI and npm latest versions whose registry times fall from November 9 through 04:12 UTC on November 11, 2026, plus browser-use 1.0.2 requires_dist pins and the pydantic-ai 2.67.0 requirement on pydantic-ai-slim==2.67.0. Bench figures are copied from the browser-use 1.0.0 GitHub release. AI Agents Info did not run the installer or the benchmark."
  isBasedOn: "https://pypi.org/pypi/browser-use/json"
sources:
  - title: "browser-use 1.0.0 release notes (published 2026-11-10T02:04:48Z; read November 11, 2026)"
    url: "https://github.com/browser-use/browser-use/releases/tag/1.0.0"
  - title: "browser-use 1.0.2 release notes (published 2026-11-11T04:00:00Z; read November 11, 2026)"
    url: "https://github.com/browser-use/browser-use/releases/tag/1.0.2"
  - title: "PyPI JSON, browser-use 1.0.2 (HTTP Date Wed, 11 Nov 2026 04:08:36 GMT)"
    url: "https://pypi.org/pypi/browser-use/json"
  - title: "PyPI JSON, pydantic-ai 2.67.0 (HTTP Date Wed, 11 Nov 2026 04:12:27 GMT)"
    url: "https://pypi.org/pypi/pydantic-ai/2.67.0/json"
  - title: "Pydantic AI v2.67.0 release (published 2026-11-10T23:11:23Z; read November 11, 2026)"
    url: "https://github.com/pydantic/pydantic-ai/releases/tag/v2.67.0"
  - title: "AG2 v.1.3.1 release (published 2026-11-10T21:03:11Z; read November 11, 2026)"
    url: "https://github.com/ag2ai/ag2/releases/tag/v.1.3.1"
  - title: "PyPI JSON, ag2 1.3.1 (HTTP Date Wed, 11 Nov 2026 04:11:51 GMT)"
    url: "https://pypi.org/pypi/ag2/json"
  - title: "FastMCP v4.1.8 release (published 2026-11-10T20:44:13Z; read November 11, 2026)"
    url: "https://github.com/PrefectHQ/fastmcp/releases/tag/v4.1.8"
  - title: "OpenAI Python SDK v3.49.0 (published 2026-11-10T06:47:04Z; read November 11, 2026)"
    url: "https://github.com/openai/openai-python/releases/tag/v3.49.0"
  - title: "google-genai v3.1.0 (published 2026-11-10T20:13:56Z; read November 11, 2026)"
    url: "https://github.com/googleapis/python-genai/releases/tag/v3.1.0"
  - title: "Browser Use pricing (read November 11, 2026)"
    url: "https://browser-use.com/pricing"
  - title: "AI Agents Info, framework release counts, November 11, 2026"
    url: "https://www.aiagentsinfo.com/research/ai-agent-framework-release-cadence-october-november-2026"
faq:
  - question: "What is the AI agent framework release in November 2026 that changes an install?"
    answer: "browser-use 1.0. GitHub published 1.0.0 at 2026-11-10T02:04:48Z. PyPI’s latest on the morning of November 11 was 1.0.2, uploaded at 2026-11-11T04:07:32Z. It requires pydantic-ai-slim==2.66.0. pydantic-ai 2.67.0, uploaded at 2026-11-11T00:23:27Z, requires pydantic-ai-slim==2.67.0. Those two exact pins do not resolve together."
  - question: "Did browser-use 1.0 score 33 points higher?"
    answer: "The 1.0.0 release notes say the same models are up to 33 points higher, 2.7 to 5.2 times cheaper, and 2 to 3 times faster. The only score table on that page is BU Bench v2, dated 2026-11-09, comparing browser-use 1.0 in ultrafast mode with Browser Use Pi, both on gpt-6-luna. After provider errors are excluded, the paired score gap is +1.1 with a 95 percent interval from -3.2 to +5.7. That interval includes zero."
  - question: "Which other agent frameworks published a release from November 9 to November 11, 2026?"
    answer: "PyPI ag2 1.3.1 uploaded at 2026-11-10T21:03:53Z. fastmcp 4.1.8 uploaded at 2026-11-10T20:44:54Z. crewai 1.15.39 uploaded at 2026-11-09T01:07:50Z. claude-agent-sdk 0.2.180 uploaded at 2026-11-09T20:08:02Z. The npm package @langchain/langgraph 1.7.3 was published at 2026-11-10T00:00:50Z. Python langgraph stayed at 1.2.20 from November 5. openai-agents stayed at 0.24.0 from October 15."
  - question: "Does Browser() still launch a local browser in browser-use 1.0?"
    answer: "No. The 1.0.0 notes say Browser() starts a Browser Use Cloud browser. Browser('chromium') or Browser(local=True) selects a local Chromium. Browser('chrome') attaches only to a browser whose DevToolsActivePort file is in your own profile directories. The pricing page, read November 11, 2026, lists cloud browsers at $0.02 per browser hour."
  - question: "What did AG2 1.3.1 change for agent builders?"
    answer: "The GitHub notes for tag v.1.3.1, published 2026-11-10T21:03:11Z, add E2B and boxd sandbox backends, fix MCP Apps on browser hosts, and change A2UI v1.0 so messages carry version 1.0 instead of v1.0. The PyPI package to install is ag2, version 1.3.1. The packages named autogen and pyautogen were older distributions on the same morning."
---

browser-use 1.0.2 and Pydantic AI 2.67.0 will not install in the same environment. PyPI’s browser-use 1.0.2, uploaded at 2026-11-11T04:07:32Z, requires `pydantic-ai-slim[anthropic,google,openai]==2.66.0`. PyPI’s pydantic-ai 2.67.0, uploaded at 2026-11-11T00:23:27Z and read again at 04:12 UTC, requires `pydantic-ai-slim[anthropic,cli,evals,google,logfire,mcp,openai,web]==2.67.0`. Those are two exact pins on one library. A resolver cannot satisfy both.

That is the AI agent framework release that matters in this window. GitHub published browser-use 1.0.0 at 2026-11-10T02:04:48Z under the title “browser-use 1.0: CDP is all you need.” The agent no longer picks one action from a DOM dump. It writes Python in one persistent REPL on Chrome DevTools Protocol, on [Pydantic AI](/directory/pydantic-ai). The 1.0.2 notes, published at 2026-11-11T04:00:00Z, are fixes on top of that rewrite. They do not loosen the pin.

How often these repositories tag a release, counted at 03:42 UTC the same morning, is [3,165 GitHub releases in 30 days, or 407 days of silence](/research/ai-agent-framework-release-cadence-october-november-2026). That count does not include browser-use. The November 5 star table is [AI agent framework GitHub stats](/reports/ai-agent-framework-github-stats-november-2026). The bill for LangGraph, CrewAI, and the OpenAI Agents SDK, checked November 10, is [LangGraph vs CrewAI vs the OpenAI Agents SDK](/blog/langgraph-vs-crewai-vs-openai-agents-sdk).

## Which packages actually published from November 9 to November 11?

The rows below are registry documents read between 04:07 and 04:12 UTC on November 11, 2026. A version outside that window stays in the table only so a pin does not get “upgraded” to a release that did not happen.

| Package | Version | Registry time (UTC) | What the notes change for a harness |
| --- | --- | --- | --- |
| browser-use (PyPI) | 1.0.2 | 2026-11-11T04:07:32Z | REPL on CDP. Exact pin on pydantic-ai-slim 2.66.0. Cloud browser by default. |
| pydantic-ai (PyPI) | 2.67.0 | 2026-11-11T00:23:27Z | Instruction files, durable sub-agents, operator authority. Requires slim 2.67.0. |
| ag2 (PyPI) | 1.3.1 | 2026-11-10T21:03:53Z | A2UI version string, MCP Apps on browser hosts, E2B and boxd sandboxes. |
| fastmcp (PyPI) | 4.1.8 | 2026-11-10T20:44:54Z | OAuth proxy revocation for the client that owns the token. 28 backports. |
| google-genai (GitHub v3.1.0) | 3.1.0 | 2026-11-10T20:13:56Z | Adds `gemini-4-carbon` to the Interactions model enum. |
| @google/genai (npm) | 3.1.0 | 2026-11-10T20:47:12Z | Same enum addition on JavaScript. |
| anthropic (PyPI) | 2.8.0 | 2026-11-10T16:33:21Z | Claude Tag analytics. Not the agent loop. |
| @anthropic-ai/sdk (npm) | 1.8.0 | 2026-11-10T16:38:44Z | Version only. This page did not copy the npm changelog. |
| openai (PyPI) | 3.49.0 | 2026-11-10T06:47:52Z | Typed async function tools. |
| openai (npm) | 7.55.0 | 2026-11-10T06:58:16Z | Version only. This page did not copy the npm changelog. |
| @langchain/core (npm) | 1.3.7 | 2026-11-10T18:44:00Z | Version only. This page did not copy the changelog. |
| @langchain/langgraph (npm) | 1.7.3 | 2026-11-10T00:00:50Z | JavaScript package. Python langgraph is still 1.2.20 from November 5. |
| crewai (PyPI) | 1.15.39 | 2026-11-09T01:07:50Z | Patch on the 1.15 line. The separate bill is the November 10 comparison. |
| claude-agent-sdk (PyPI) | 0.2.180 | 2026-11-09T20:08:02Z | GitHub release body is the pip line. No behavior notes on the tag. |
| @anthropic-ai/claude-agent-sdk (npm) | 0.3.322 | 2026-11-10T01:57:38Z | Version only. This page did not copy the changelog. |
| langgraph (PyPI) | 1.2.20 | 2026-11-05T02:20:37Z | Outside this window. |
| openai-agents (PyPI) | 0.24.0 | 2026-10-15T02:38:18Z | Outside this window. |
| @openai/agents (npm) | 0.21.0 | 2026-10-20T22:14:20Z | Outside this window. |
| google-adk (PyPI) | 2.14.0 | 2026-11-07T01:03:32Z | Outside this 48-hour window. The enum break is in the cadence note. |

Source: aiagentsinfo.com. Times are `upload_time_iso_8601` on PyPI or the npm `time` field, except google-genai’s Python row, which is the GitHub release `published_at`. HTTP Date on the browser-use document was Wed, 11 Nov 2026 04:08:36 GMT, when 1.0.2 was already latest.

Google ADK’s November 7 enum change, and the 30-day release counts, stay on the [cadence note](/research/ai-agent-framework-release-cadence-october-november-2026). This page is the behavior and the pin.

## What does browser-use 1.0 change in the harness?

The loop. A [harness](/glossary/harness) that used to send a DOM snapshot and receive one click now hosts a Python cell. The 1.0.0 notes draw it as three steps: the model writes a cell, the REPL runs it on Chrome over CDP, the model calls `finish(result)`. [Tool use](/glossary/tool-use) is that cell, not a fixed action schema. The library sits on Pydantic AI. The summary string on PyPI, read the same morning, is “Browser agent on Pydantic AI: one persistent Python REPL on raw CDP, cloud or local Chrome.”

The defaults move with the loop:

| | 0.x | 1.0 |
| --- | --- | --- |
| Model when `llm` is omitted | Required | `bu-fast` on the Browser Use gateway |
| `Browser()` | Local Chromium | A Browser Use Cloud browser. `Browser('chromium')` for a local one |
| Key | One per model provider | One `BROWSER_USE_API_KEY`, or `browser-use login` |
| Mode |  | `ultrafast` on `bu-fast` and `bu-ultrafast`. `mode='default'` opts out |
| `run()` | `max_steps=500` | `max_steps=100`, `timeout=1700` seconds. One step is one model request |

Source: aiagentsinfo.com, copied from the browser-use 1.0.0 release notes published November 10, 2026.

An option 1.0 cannot honor raises `TypeError` before a browser starts or anything is billed. Removed 0.x imports raise `ImportError` and name the replacement. `except ImportError` fallbacks still work. LangChain chat models raise `TypeError`. `BROWSER_USE_ALLOWED_DOMAINS` is not read: `Browser()` raises while it is set. After configuration checks pass, `run()` returns `status='error'` instead of raising, and a browser that started is stopped. A missing key still raises before anything is created.

`Browser('chrome')` attaches only to a browser whose live `DevToolsActivePort` is in your own profile directories. It no longer attaches to whatever answers on `127.0.0.1:9222`. Tasks aimed at localhost or a private IP need `Browser('chromium')`.

1.0.2, the PyPI latest that morning, fixes four things on top of 1.0.1. `browser-use --cli-mcp` drives its own Chromium when Chrome’s remote debugging is off, and tells the agent how to switch to the user’s Chrome. CDP calls from the CLI and MCP wait 20 seconds, matching the agent, and a page frozen by a JavaScript dialog fails with an error that says to handle the dialog. `open()` in MCP `browser_exec` reads and writes UTF-8 on Windows. `browser-use feedback` and a `browser_feedback` tool send scrubbed text.

GitHub’s license field on browser-use/browser-use was MIT at 04:11:03 GMT, with 120,632 stars. The download count through November 8, before 1.0, is [Browser Use had 6,423,201 PyPI downloads](/research/browser-use-vs-stagehand-installs-november-2026). The [directory listing](/directory/browser-use) is the product row.

## Does the 33-point claim match the table on the same page?

The sentence and the table are both on the 1.0.0 notes. They are not the same comparison.

The sentence says: same models, up to 33 points higher, 2.7 to 5.2 times cheaper, 2 to 3 times faster. The table under it is BU Bench v2, 60 tasks times 3 reps, cloud browsers, dated 2026-11-09.

| Agent | Score (95% CI) | $ / task | Seconds / task |
| --- | --- | --- | --- |
| browser-use 1.0, `mode='ultrafast'` | 62.5 [58.3, 66.5] | 0.070 | 650 |
| Browser Use Pi (e7007f2) | 56.3 [50.2, 62.4] | 0.082 | 743 |

Source: aiagentsinfo.com, copied from the browser-use 1.0.0 release notes. Both arms ran `gpt-6-luna` on api.openai.com, judged by `gpt-5.6-luna` at xhigh. The default `bu-fast` model was not in this run.

An OpenAI outage hit the window. Pi lost 18 of 180 runs to provider errors. 1.0 lost 1. With those errors excluded, the paired difference of 1.0 minus Pi is score +1.1 [−3.2, +5.7], cost −$0.013 per task [−0.024, −0.004], and time −114 seconds [−202, −31]. The notes call the quality gap not significant and the cost and time gaps real. The 33-point sentence is still in the notes. It is not a row in this table. Treat the table as the number you can recompute a decision from, and the 33-point line as a claim whose comparison the page does not print.

`result.cost_usd` covers model and web-search charges. It does not cover the cloud browser or its proxy. The $0.070 is not a browser-hour bill.

The pricing page, read November 11, 2026, lists browsers at $0.02 per browser hour, a home-IP proxy at $5 per GB, your own proxy or a direct connection at $0.20 per GB, and the open-source harness at $0. A worked example on that page prices BU Fast as 20 million input tokens times $0.12 plus 1 million output tokens times $0.60, which is $3. `bu-ultrafast` is listed at $0.006 per task. Pay as you go is $0 a month, up to 1,000 browsers at once. Because `Browser()` is now the cloud browser, a 0.x script that called `Browser()` and ran on a local Chromium starts a meter it did not have.

A [shopping agent](/glossary/shopping-agent) that drives a page is this library plus a task, or a different product. Who can pay, on the paths already checked, is [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you). The dated product calendar is [AI shopping agents, next 6 months](/reports/ai-shopping-agents-next-6-months).

## Which pins does 1.0.2 refuse to move?

From `requires_dist` on the PyPI JSON for 1.0.2, read at 04:08:36 GMT:

| Pin | Why it matters on November 11 |
| --- | --- |
| `pydantic-ai-slim[anthropic,google,openai]==2.66.0` | pydantic-ai 2.67.0 requires slim `==2.67.0`. The two projects do not share an environment. |
| `pydantic==2.14.3` | The host app’s Pydantic pin has to match. |
| `google-genai==2.34.0` | google-genai 3.1.0, published November 10, adds `gemini-4-carbon`. 1.0.2 does not use that client. |
| `mcp==2.3.0` | The MCP extra is pinned exactly. |
| `browser-harness==0.1.13` | The REPL helpers are a second package, also exact. |

Source: aiagentsinfo.com, from the PyPI JSON documents cited above.

The 1.0.0 notes say every dependency is pinned with `==`, and that a project which needs a different `pydantic`, `pydantic-ai-slim`, `mcp`, `google-genai`, or `pillow` cannot install 1.0 beside it. They also say `google-genai` stays below 3 because 3.0.0 calls the Gemini API on v1, which rejects tools. The 1.0.2 document still shows `google-genai==2.34.0`, so that warning survived the patch. How to call `gemini-4-carbon` from a client that knows the id is [Gemini 4 Carbon for agent harnesses](/blog/gemini-4-carbon-for-agent-harnesses). That call does not belong inside this pin.

## What does Pydantic AI 2.67 change, once you are off the browser-use pin?

The GitHub tag v2.67.0 was published at 2026-11-10T23:11:23Z. The compatibility notes are the part a harness feels. This page did not re-run them.

`RepoContext` loads one instruction file per directory, and nested files, by default. `walk_up` is new. `Coder` builds on those files. Inlined nested instructions cap at 32,000 characters per conversation, with `RepoContext(nested_max_chars=...)`. Nested instruction files surface when the model writes or edits in a directory. That is the file a coding agent treats as its standing orders. A cap of 32,000 characters is the point where a long AGENTS.md stops being free context.

`SubAgents(dynamic_agents=...)` works under durable execution. `InputGuardrail`, `OutputGuardrail`, and `ToolGuardrail` verdicts are recorded as durable operations. `CapabilityCreation` refuses to run when `directory` is below `'operator'` authority. `CodeMode` rejects tools named after Python builtins, because the sandbox was calling the builtin instead of the tool. Provider-specific native-tool fields move to `provider_settings`. An OpenAI response that has no `history_digest` is no longer continued through `openai_previous_response_id`.

GitHub’s license field on pydantic/pydantic-ai was MIT at 04:11:03 GMT, with 21,131 stars. The library fee and the Logfire fee are separate. The [directory listing](/directory/pydantic-ai) keeps that split. The [framework comparison](/best/ai-agent-frameworks) is the wider table. A token bill for the model under the loop is the [AI agent cost calculator](/agent-cost-calculator).

If the environment also installs browser-use 1.0.2, stay on 2.66.0 until that pin moves. The 2.67 instruction-file behavior is not what that environment runs.

## What did AG2 1.3.1 change on November 10?

The PyPI package `ag2` 1.3.1 uploaded at 2026-11-10T21:03:53Z. The GitHub tag is `v.1.3.1`, including the extra dot, published at 2026-11-10T21:03:11Z. The repository description calls AG2 formerly AutoGen. On the same morning, PyPI `autogen` was 0.14.1 from 2026-06-30, and `pyautogen` was 0.10.0 from 2025-07-15. Install `ag2` if you want 1.3.1.

The notes add sandbox backends for `SandboxShellTool` and `SandboxCodeTool`: `E2BEnvironment` in `ag2.extensions.e2b`, and `ag2.extensions.boxd` for boxd Linux microVMs. MCP Apps work with browser-based hosts: `/mcp` no longer redirects `POST` or the CORS preflight. MCP-UI is documented as legacy. `ag2.mcp_ui` is not deprecated.

The upgrade note that will break a client: A2UI v1.0 now speaks the stable upstream spec. 1.3.0 targeted a release candidate. v1.0 messages carry `"version": "1.0"` instead of `"v1.0"`. The basic catalog requires `TextField.value`. Custom v1.0 catalogs with a `$ref` the spec does not allow are rejected at load. `protocol_version="v1.0"` and the `v0.9` default are unchanged. The protocol those messages implement, the hosts that still render 0.9.1, and the package clocks are [A2UI 1.0 agent framework release November 2026](/blog/a2ui-1-0-agent-framework-release-november-2026).

`Usage.cache_creation_extended_input_tokens` counts OpenAI 12-hour and Anthropic 1-hour cache writes, which are priced differently, and the field flows through telemetry and eval traces. A [context window](/glossary/context-window) bill that ignored extended cache writes was undercounting that line.

GitHub’s license field was Apache-2.0 at 04:11:45 GMT, with 5,056 stars. The homepage on that response was https://ag2.ai. Whether the old repository is maintained is [Is AutoGen deprecated?](/blog/is-autogen-deprecated). The [directory listing](/directory/ag2) is this package, not `microsoft/autogen`.

## Which SDK bumps are real and still not a new agent loop?

OpenAI’s Python SDK 3.49.0, published at 2026-11-10T06:47:04Z, adds typed async function tools. That is a [tool use](/glossary/tool-use) typing change in the client. It is not a new Agents SDK. `openai-agents` was still 0.24.0, uploaded October 15. `@openai/agents` was still 0.21.0, published October 20.

Anthropic’s Python SDK 2.8.0, published at 2026-11-10T16:32:58Z, adds Claude Tag metrics and a `reply_mode` on Claude Tag Slack settings. The agent library is a different package. `claude-agent-sdk` 0.2.180 uploaded at 2026-11-09T20:08:02Z, and the GitHub release body is the install line. There is no behavior note on that tag to quote. The [Claude Agent SDK listing](/directory/claude-agent-sdk) is the product. How Fable 5.2 sits in that SDK is [How to use Claude Fable 5.2 in an agent harness](/blog/how-to-use-claude-fable-5-2-in-an-agent-harness).

`@langchain/langgraph` 1.7.3 published at 2026-11-10T00:00:50Z. Python `langgraph` did not move. It was still 1.2.20 from November 5. GitHub’s latest release on langchain-ai/langgraph, read at 04:07 UTC, was still `sdk==0.4.14` from November 6, a different package. Pin the package you import. The [LangChain listing](/directory/langchain) is the company. CrewAI 1.15.39, uploaded November 9, is the version already in the [three-way bill](/blog/langgraph-vs-crewai-vs-openai-agents-sdk). The [CrewAI listing](/directory/crewai) points there.

FastMCP 4.1.8, published at 2026-11-10T20:44:13Z, backports 28 fixes from the 4.2 line. The notes lead with OAuth proxy token revocation, which now works for the client that owns the token. They also fix recursive schema hydration, GitHub sessions across a transient verification failure, and proxied sampling. That is an [MCP](/glossary/model-context-protocol) server bugfix, not a new spec. GitHub’s license field on PrefectHQ/fastmcp was Apache-2.0 at 04:11:03 GMT, with 28,377 stars. The [directory listing](/directory/fastmcp) is that repository.

google-genai 3.1.0 adds `gemini-4-carbon` to the Interactions model enum. browser-use 1.0.2 will not take that client. The twelve-month calendar of dated filings, which is not this week’s pin list, is [AI agents, next 12 months](/reports/ai-agents-next-12-months).

## What should you pin on November 11?

If you run browser-use, pin `browser-use==1.0.2` and read [MIGRATING.md](https://github.com/browser-use/browser-use/blob/1.0.0/MIGRATING.md) before you bump. Keep `pydantic-ai` off 2.67.0 in that environment. Pass `Browser('chromium')` for localhost. Expect `ImportError` on 0.x imports, which is the point of the error: it names the replacement before a cloud browser starts.

If you run Pydantic AI and you do not install browser-use 1.0, 2.67.0 is the release with the instruction-file cap and the operator check. Read the compatibility list on the tag. The 32,000-character cap will truncate a nested instruction file you used to inline in full.

If you emit A2UI from AG2, change `"v1.0"` to `"1.0"` before you upgrade, and require `TextField.value`. If you run a FastMCP OAuth proxy, 4.1.8 is the revocation fix for the client that owns the token.

Leave `openai-agents` at 0.24.0 until that package actually publishes. Leave Python `langgraph` at 1.2.20 unless you meant the JavaScript package. The [harnesses topic](/topics/harnesses) collects the longer guides. The [best harness comparison](/best/ai-agent-harnesses) is the product table, separate from these pins.

## Frequently asked questions

### What is the AI agent framework release in November 2026 that changes an install?

browser-use 1.0. GitHub published 1.0.0 at 2026-11-10T02:04:48Z. PyPI’s latest on the morning of November 11 was 1.0.2, uploaded at 2026-11-11T04:07:32Z. It requires `pydantic-ai-slim==2.66.0`. pydantic-ai 2.67.0, uploaded at 2026-11-11T00:23:27Z, requires `pydantic-ai-slim==2.67.0`. Those two exact pins do not resolve together.

### Did browser-use 1.0 score 33 points higher?

The 1.0.0 release notes say the same models are up to 33 points higher, 2.7 to 5.2 times cheaper, and 2 to 3 times faster. The only score table on that page is BU Bench v2, dated 2026-11-09, comparing browser-use 1.0 in ultrafast mode with Browser Use Pi, both on `gpt-6-luna`. After provider errors are excluded, the paired score gap is +1.1 with a 95 percent interval from −3.2 to +5.7. That interval includes zero.

### Which other agent frameworks published a release from November 9 to November 11, 2026?

PyPI `ag2` 1.3.1 uploaded at 2026-11-10T21:03:53Z. `fastmcp` 4.1.8 uploaded at 2026-11-10T20:44:54Z. `crewai` 1.15.39 uploaded at 2026-11-09T01:07:50Z. `claude-agent-sdk` 0.2.180 uploaded at 2026-11-09T20:08:02Z. The npm package `@langchain/langgraph` 1.7.3 was published at 2026-11-10T00:00:50Z. Python `langgraph` stayed at 1.2.20 from November 5. `openai-agents` stayed at 0.24.0 from October 15.

### Does Browser() still launch a local browser in browser-use 1.0?

The 1.0.0 notes say `Browser()` starts a Browser Use Cloud browser. `Browser('chromium')` or `Browser(local=True)` selects a local Chromium. `Browser('chrome')` attaches only to a browser whose `DevToolsActivePort` file is in your own profile directories. The pricing page, read November 11, 2026, lists cloud browsers at $0.02 per browser hour.

### What did AG2 1.3.1 change for agent builders?

The GitHub notes for tag `v.1.3.1`, published 2026-11-10T21:03:11Z, add E2B and boxd sandbox backends, fix MCP Apps on browser hosts, and change A2UI v1.0 so messages carry `"version": "1.0"` instead of `"v1.0"`. The PyPI package to install is `ag2`, version 1.3.1. The packages named `autogen` and `pyautogen` were older distributions on the same morning.
