---
title: "A2UI 1.0 agent framework release November 2026: Gemini still renders 0.9.1"
description: "Google called A2UI 1.0 the first stable generative UI protocol on November 11, 2026. Gemini and Jetpack Compose still speak 0.9.1. Python 0.11.0 landed the night before."
absoluteTitle: true
takeaways:
  - "Google’s November 11, 2026 Developers Blog post calls A2UI 1.0 the first stable open protocol for generative UI, with renderer SDKs for web, Android, and iOS and agent SDKs for Python, TypeScript, and Dart. The same post says Gemini supports A2UI 0.9.1 today, and that the Jetpack Compose renderer is v0.9.1 with v1.0 still coming."
  - "The v1.0 spec sends JSON component descriptions, not HTML. Messages set version to 1.0. MCP carries that JSON as application/a2ui+json. The A2A extension URI is https://a2ui.org/a2a-extension/a2ui/v1.0. The November 5 framework snapshot does not include a2ui-project/a2ui."
  - "Registries read November 12, 2026: PyPI a2ui-agent-sdk 0.11.0 uploaded 2026-11-10T22:20:43Z and requires a2ui-core >=0.6.0,<0.7.0. pub.dev a2ui_agent 0.3.0 and a2ui_core 0.7.0 published November 11. npm @a2ui/agent is still 0.1.0 from November 2. GitHub reported 17,104 stars and Apache-2.0."
date: "2026-11-12"
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
  - google
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "A2UI package clocks and GitHub stars, read November 12, 2026"
  description: "PyPI upload_time for a2ui-agent-sdk 0.11.0 and a2ui-core 0.6.0, GitHub release published_at for those tags and for cli-v0.3.0, pub.dev published times for a2ui_agent 0.3.0 and a2ui_core 0.7.0, npm time values for @a2ui/agent 0.1.0, @a2ui/web_core 0.15.0, @a2ui/react 0.15.0, @a2ui/lit 0.15.0, and @a2ui/angular 0.14.0, plus stargazers_count 17104 and license Apache-2.0 from the GitHub repository API. AI Agents Info did not republish the protocol."
  isBasedOn: "https://github.com/a2ui-project/a2ui"
sources:
  - title: "Google Developers Blog, A2UI 1.0 (November 11, 2026; read November 12, 2026)"
    url: "https://developers.googleblog.com/en/a2ui-10-build-delightful-fast-reliable-agentic-experiences/"
  - title: "A2UI v1.0 protocol specification (read November 12, 2026)"
    url: "https://a2ui.org/specification/v1.0-a2ui/"
  - title: "A2UI v1.0 evolution guide (read November 12, 2026)"
    url: "https://a2ui.org/specification/v1.0-evolution-guide/"
  - title: "A2UI v1.0 A2A extension (read November 12, 2026)"
    url: "https://a2ui.org/specification/v1.0-a2ui-extension-specification/"
  - title: "A2UI, How to integrate A2UI into an agent (read November 12, 2026)"
    url: "https://a2ui.org/guides/agent-integration/"
  - title: "A2UI, A2UI over MCP (read November 12, 2026)"
    url: "https://a2ui.org/guides/a2ui-over-mcp/"
  - title: "A2UI repository, a2ui-project/a2ui (GitHub API, read November 12, 2026)"
    url: "https://github.com/a2ui-project/a2ui"
  - title: "PyPI, a2ui-agent-sdk 0.11.0 JSON (read November 12, 2026)"
    url: "https://pypi.org/pypi/a2ui-agent-sdk/json"
  - title: "pub.dev, a2ui_agent 0.3.0 (read November 12, 2026)"
    url: "https://pub.dev/packages/a2ui_agent"
faq:
  - question: "What is A2UI 1.0?"
    answer: "A2UI 1.0 is the stable version of Google’s open protocol for generative UI, announced on the Google Developers Blog on November 11, 2026. An agent sends JSON that describes components, data bindings, and function calls. The host app renders those messages with native components from a catalog the developer registered. The model does not send HTML or executable UI code."
  - question: "How is A2UI different from MCP and A2A?"
    answer: "MCP connects an agent to tools and data. A2A connects one agent to another agent. A2UI is the description of the screen a person sees. A2UI can travel inside MCP as application/a2ui+json, and over A2A under the extension URI https://a2ui.org/a2a-extension/a2ui/v1.0. The November 11 post says the web and Flutter renderers also run inside MCP Apps hosts such as Claude and Gemini."
  - question: "Does Gemini render A2UI 1.0 yet?"
    answer: "The November 11, 2026 post says Gemini supports A2UI 0.9.1 today, and that Gemini Enterprise agents can already use A2UI while an upgrade to 1.0 is still in progress. The same post says the Jetpack Compose renderer is v0.9.1, with v1.0 coming soon. A client aimed at those two surfaces should keep sending 0.9.1 until the host says otherwise."
  - question: "Which A2UI packages shipped around the November 11 announcement?"
    answer: "PyPI a2ui-agent-sdk 0.11.0 uploaded at 2026-11-10T22:20:43Z and requires a2ui-core >=0.6.0 and <0.7.0. pub.dev published a2ui_agent 0.3.0 at 2026-11-11T01:50:26Z and a2ui_core 0.7.0 a minute earlier. The GitHub CLI release cli-v0.3.0 was published at 2026-11-11T01:57:49Z. npm @a2ui/agent was still 0.1.0, published 2026-11-02T02:44:47Z, when this page read the registry on November 12."
  - question: "How do you add A2UI to an agent?"
    answer: "The agent guide read November 12, 2026 says to install the agent SDK, register the v1.0 basic catalog, generate the prompt from that catalog, compile the model’s output into wire messages, and answer renderer events. The install lines on that page are npm install @a2ui/agent @a2ui/web_core, pip install a2ui-agent-sdk, and dart pub add a2ui_agent a2ui_core. Express is the default inference format on that page."
  - question: "Is A2UI in the November 2026 framework GitHub table?"
    answer: "No. The November 5, 2026 snapshot behind AI agent framework release November 2026 covers 19 framework and SDK repositories. a2ui-project/a2ui is not one of them. GitHub’s repository API, read November 12, 2026, reported 17,104 stars and the license Apache-2.0 for that repository. The pushed_at field on the same response was 2026-11-12T04:02:10Z."
---

On November 11, 2026, Google released [A2UI 1.0](https://developers.googleblog.com/en/a2ui-10-build-delightful-fast-reliable-agentic-experiences/) and called it the first stable version of its open protocol for generative UI. An agent describes a screen. The app draws that screen with components it already ships. The same post says the Gemini host supports A2UI 0.9.1 today, and that the Jetpack Compose renderer is v0.9.1, with v1.0 still coming.

That split is the release a builder can act on. The spec is 1.0. Two surfaces a phone agent actually hits are still on the previous protocol.

A2UI is a protocol and a set of SDKs, which is the thing people mean by an agent framework when they ask what shipped. It is absent from the [November 5 framework snapshot](/reports/ai-agent-framework-github-stats-november-2026), the page already collecting impressions for “ai agent framework release november 2026.” AG2 1.3.1, the night before the blog post, already flipped its client to the stable wire format. That patch note is in [AI agent framework release November 2026](/blog/ai-agent-framework-release-november-2026). This page is the protocol, the hosts, and the package clocks.

## What is A2UI 1.0?

A2UI is a JSON protocol. The agent sends messages such as `createSurface`, `updateComponents`, and `updateDataModel`. The renderer maps each component name onto a widget in the catalog the app registered: a button, a text field, a chart. The [v1.0 spec](https://a2ui.org/specification/v1.0-a2ui/), which the docs site marks current, says the model’s output is validated data. The README on `a2ui-project/a2ui`, read November 12, says the agent does not send executable UI code, and that the app decides which capabilities exist.

Version 1.0, against 0.9.1, does four things a harness will feel.

The wire envelopes are `agent_to_renderer` and `renderer_to_agent`. Dynamic bindings use `@path` and `@call`. Component envelope keys use `@catalogId`, `@accessibility`, `@metadata`, and `@checks`. The spec examples set `version` to `1.0`. AG2 1.3.1’s notes, tag `v.1.3.1` published 2026-11-10T21:03:11Z, say 1.3.0 targeted a release candidate and that v1.0 messages carry `"version": "1.0"` instead of `"v1.0"`. A client still sending `v1.0` is on the old string.

Bidirectional function calls are in the protocol: `callRendererFunction` and `callAgentFunction`, with matching response messages. The November 11 post uses a flight or reservation picker that checks availability on the spot as the example. The evolution guide says catalogs declare `allowedCallers`, and the runtime checks them. Python 0.11.0’s release notes, published 2026-11-10T22:15:35Z, reject a call the renderer would refuse, with the code `INVALID_FUNCTION_CALL`.

Accessibility is a field, `@accessibility`, with `label`, `description`, `live`, and `hidden`. Extensions carry extra metadata under `@metadata`. The basic catalog’s `TextField` now requires `value`. The same Python notes say a field without one fails validation, because the input never reaches the data model. The evolution guide also removes `theme` and `primaryColor` from `createSurface`. A v1.0 `createSurface` that still carries `theme` is invalid. Branding stays in the host’s own design system, which is the point of native rendering.

The [directory listing](/directory/a2ui) is the short record. The [agent frameworks category](/directory/category/agent-frameworks) is the shelf it sits on.

## Where does A2UI sit next to MCP and A2A?

Three protocols, three jobs. Mixing them up is how a harness grows a second tool layer it did not need.

| Layer | Protocol | What moves | How A2UI 1.0 uses it |
| --- | --- | --- | --- |
| The screen a person sees | A2UI | Component descriptions, data bindings, function calls | The protocol itself. Payload MIME type `application/a2ui+json`. |
| Tools and data | [MCP](/glossary/model-context-protocol) | Resources, prompts, and tools | An MCP resource, or an embedded resource inside a tool result, carries the same MIME type. The November 11 post says the web and Flutter renderers also run inside MCP Apps, in hosts such as Claude and Gemini. |
| One agent to another | [A2A](/glossary/agent-to-agent-protocol) | Tasks between agents that do not share memory or tools | Extension URI `https://a2ui.org/a2a-extension/a2ui/v1.0`. An A2A `DataPart` sets `metadata.mimeType` to `application/a2ui+json`. |

Source: aiagentsinfo.com, from the v1.0 spec, the A2A extension, the A2UI-over-MCP guide, and the November 11 blog, read November 12, 2026.

MCP stays the vertical link. The agent calls a tool. The tool can answer with an A2UI payload, and a host that understands the MIME type hands that payload to a renderer. Alation’s example in the November 11 post is this path: the same feed renders in Claude and inside Alation.

A2A stays the horizontal link. The extension page says activation is optional. A renderer can advertise support with `message.metadata["a2uiRendererCapabilities"]`. An agent can advertise the extension on its Agent Card. The page says renderers may rely on that card, and that the card is encouraged and not required. It also says not to use `accepted_output_modes: ['a2ui']`. That string is not an A2UI standard. The header that does activate the extension, on JSON-RPC and HTTP, is `X-A2A-Extensions` with the v1.0 URI.

A [harness](/glossary/harness) that already speaks MCP and A2A adds a catalog and a renderer. It does not replace either protocol. [Tool use](/glossary/tool-use) is still how the agent reaches a booking API. A2UI is how the confirmation screen comes back.

## Which hosts still speak 0.9.1?

The November 11 post is explicit about the lag, which is more useful than the word “stable” on its own.

| Surface | What the November 11, 2026 post says |
| --- | --- |
| Protocol | 1.0, called the first stable version |
| Web renderers | React, Angular, and Lit, available now |
| Flutter | Mobile, web, and desktop, and inside MCP Apps |
| SwiftUI | iOS, available now |
| Jetpack Compose | v0.9.1, with v1.0 coming soon |
| Gemini, for registered agents | Supports A2UI 0.9.1 today |
| Gemini Enterprise | Agents can use A2UI; an upgrade to 1.0 is in progress |
| ByteDance Lynx | Supports 0.9 today and is adapting to 1.0 |

Source: aiagentsinfo.com, from Google’s November 11, 2026 Developers Blog post.

Send 1.0 to a renderer you built from the current spec and the current agent SDK. Send 0.9.1 to Gemini’s component gallery, and to a Compose client, until those surfaces print 1.0. The evolution guide is the migration list: version string, `@` prefixes, function calls, catalog mixing, and the removed theme. AG2 already documented the string change and the required `TextField.value`. A custom v1.0 catalog that still uses a `$ref` the spec rejects will fail at load, which is the AG2 note, not a guess.

Gemini Notebook is the in-product example on the same post. A slide-deck request comes back as a card that asks for presenter slides or a detailed deck, and which topics to keep. A review card follows, and the person edits format, focus, and visual style before generation. The same cards guide Video Overviews on web and mobile. That is a confirm step inside the agent loop. It is also still the product’s own client, on whatever protocol version Notebook shipped, which the post does not number separately from the Gemini 0.9.1 line.

## Which packages actually moved on November 10 and 11?

The blog says the SDKs are ready. The registries say the three languages did not move on the same clock. Package numbers are not the protocol number. Nothing below is version 1.0.0.

| Package | Version | Registry time, UTC |
| --- | --- | --- |
| `a2ui-agent-sdk` (PyPI) | 0.11.0 | upload_time 2026-11-10T22:20:43Z |
| `a2ui-core` (PyPI) | 0.6.0 | upload_time 2026-11-10T22:20:41Z |
| GitHub `python/a2ui-agent-sdk/v0.11.0` | 0.11.0 | published 2026-11-10T22:15:35Z |
| GitHub `python/a2ui-core/v0.6.0` | 0.6.0 | published 2026-11-10T22:15:32Z |
| `a2ui_agent` (pub.dev) | 0.3.0 | 2026-11-11T01:50:26Z |
| `a2ui_core` (pub.dev) | 0.7.0 | 2026-11-11T01:49:58Z |
| GitHub `cli-v0.3.0` | 0.3.0 | published 2026-11-11T01:57:49Z |
| `@a2ui/agent` (npm) | 0.1.0 | 2026-11-02T02:44:47Z |
| `@a2ui/web_core` (npm) | 0.15.0 | 2026-11-02T02:44:15Z |
| `@a2ui/react` (npm) | 0.15.0 | 2026-11-02T02:43:37Z |
| `@a2ui/lit` (npm) | 0.15.0 | 2026-11-02T02:43:37Z |
| `@a2ui/angular` (npm) | 0.14.0 | 2026-11-02T02:43:39Z |

Source: aiagentsinfo.com. PyPI JSON, the GitHub releases API, the pub.dev API, and the npm registry, read November 12, 2026.

`a2ui-agent-sdk` 0.11.0 requires `a2ui-core>=0.6.0,<0.7.0`. Dart’s `a2ui_core` is already 0.7.0. Those constraints belong to different languages. Copying 0.7.0 into a Python pin will not satisfy 0.11.0.

The Python 0.11.0 notes are the v1.0 break a server will hit: `TextField.value` is required, and `callRendererFunction` is checked against the catalog before it runs. Express compiles the system function `@index`, which v1.0 allows and earlier versions reject. The npm agent package did not get a new publish in that window. `npm install @a2ui/agent` on November 12 still resolves to the November 2 package. Treat the TypeScript agent SDK as the 0.1.0 that the registry serves, and read its changelog before you assume it contains the November 10 Python breaks.

GitHub’s repository API, read the same day, reported 17,104 stars, license Apache-2.0, and `pushed_at` 2026-11-12T04:02:10Z. The homepage on that response is https://a2ui.org/. Stars are a stock count at that response, not a measure of who has shipped 1.0 in production. The [framework star table](/reports/ai-agent-framework-github-stats-november-2026) remains the November 5 pull of a different set of repositories. [Best AI agent frameworks](/best/ai-agent-frameworks) compares that set.

## How do you add A2UI to an agent?

The [agent guide](https://a2ui.org/guides/agent-integration/), read November 12, is five steps: install, create a generator with your catalogs and an inference format, build the system prompt from the catalog and stream messages, process messages coming back from the renderer, and attach a transport. The install lines on that page are:

- `npm install @a2ui/agent @a2ui/web_core`
- `pip install a2ui-agent-sdk`
- `dart pub add a2ui_agent a2ui_core`

The TypeScript sample on the same page imports `basicCatalog` from `@a2ui/web_core/v1_0` and uses `ExpressFormatFactory` as the default. Express tells the model to emit compact `<a2ui>` blocks. The SDK compiles those blocks into validated wire messages. Direct JSON is the alternative the guide names. The generator writes the skill from the catalog, so a hand-written prompt that lists components will drift the next time the catalog changes. That is the part worth copying into a [harness](/glossary/harness): the catalog is the source of the prompt.

The quickstart’s sample, Travel A2UI, is a Python server plus a React client and a Flutter client. The quickstart page says the sample is for learning and is not meant for production. Server-sent events are the transport in that sample. The spec also allows HTTP, WebSockets, gRPC, and polling. Pick the one your host already speaks. If the agent and the renderer share a process, the guide says to skip the transport and pass messages in memory.

Server-side binding is the security property the November 11 post stresses. The model chooses components and paths. Sensitive values can be bound on the server, so those values never enter the prompt. A catalog that omits a payment button means the model cannot invent one. That is the same idea as a [guardrail](/glossary/guardrail) on a tool: the allowlist is the product. The [harness evaluation checklist](/tools/ai-agent-harness-evaluation-checklist) is the place to write down which components the catalog allows, and which actions require a person, before the first real user.

CopilotKit’s A2UI Playground is the try-it surface the post names. Google ADK and the A2A packages are the framework connectors the repo publishes: GitHub released `python/a2ui-adk/v0.3.0` and `python/a2ui-a2a/v0.3.0` at 2026-11-10T22:15Z, the same minute as the agent SDK.

## Who is already building with it?

The November 11 post names four companies in the lede: Atlassian, Alation, Bloomberg, and ByteDance. The product sections that follow cover three of them. Bloomberg is named and not given a product write-up on that page. This page will not invent one.

Atlassian is bringing A2UI to Jira. The post says an agent assigned a work item can ask the team for a missing detail or a decision with an interactive card inside the work item, and the team answers there.

Alation’s Intelligence Operating System builds feeds of metric cards and charts. Each chart can show the SQL and the data behind the figure. The post says the same feed renders in Claude, through A2UI, and inside Alation’s Data Products app. GT Volpe, identified as vice president of product management, is quoted on the scaffolding that makes those artifacts feel like applications in Alation or in the assistants customers already use.

ByteDance shipped an A2UI renderer for Lynx in June 2026. The post says Lynx supports A2UI 0.9 today and is adapting to 1.0 with the A2UI team. Shouqun Liu, identified as engineering lead for Lynx, describes a playground where a decision model named Jev picks components and values, and the SDK builds the A2UI messages Lynx renders. The post’s roadmap item matches that sentence: official SDK support for decision models like Jev is listed as still ahead, next to design-system primitives that render natively on every platform.

Inside Google, the post says several teams behind large products are building A2UI features that have not launched, and that the launched example to look at is Gemini Notebook. Organizations can register their own agents with Gemini. The Cloud documentation, which the post points at, covers registering an agent and hosting one on Cloud Run. Those registered agents hit the 0.9.1 gallery until the upgrade lands.

Partner demos listed on the post, and not reviewed by this desk, are Homeward, an investing companion, Alder, GenUI Clinic, Riviera Home, and Vital Loop, plus a Soverius walkthrough of A2UI Express on a local model. A demo on a blog is a prompt to read the repo. It is not a production reference.

## What should you change this week?

Register a catalog and render native components if the agent’s answer is a choice, a form, or a chart. A wall of text is the failure the November 11 post is aimed at, and a confirm card is the fix Gemini Notebook already shows.

Keep 0.9.1 for Gemini’s gallery and for Jetpack Compose. Move your own web, Flutter, and SwiftUI clients, and the Python agent, to the 1.0 rules: `version` of `1.0`, `TextField.value`, no `theme` on `createSurface`, and function calls that the catalog marks as agent-callable. If AG2 emits the UI, 1.3.1 is the release that already made that string change.

Pin the package you installed. Python 0.11.0 is the November 10 server. Dart 0.3.0 / core 0.7.0 is the November 11 client pair. The npm agent package is still the November 2 publish. The [framework release report](/reports/ai-agent-framework-github-stats-november-2026) will not grow a row for this repository until a later snapshot says so. Until then, this page is the November 11 release note.

The [harnesses topic](/topics/harnesses) collects the loop these SDKs plug into. How that loop calls tools, remembers, and stops is [How do AI agents work?](/blog/how-do-ai-agents-work).
