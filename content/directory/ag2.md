---
name: AG2
vendor: AG2
website: https://ag2.ai
summary: Open-source agent framework, formerly AutoGen. The PyPI package is ag2. Version 1.3.1, uploaded November 10, 2026, changes the A2UI v1.0 version string and adds sandbox backends.
category: agent-frameworks
tags:
  - framework
  - multi-agent
  - open-source
  - agents
pricing:
  - open-source
useCases:
  - agents
  - coding
socials:
  github: https://github.com/ag2ai/ag2
audiences:
  - builders
features:
  - Python framework for multi-agent workflows. The repository description says formerly AutoGen
  - Sandbox tools with E2B and boxd backends in 1.3.1
  - MCP Apps for browser hosts. MCP-UI is documented as legacy and still works
  - Apache-2.0 on the GitHub repository, read November 11, 2026
pricingSummary: "The GitHub license field was Apache-2.0 on November 11, 2026. AG2 does not list a framework subscription on the release. Model calls are billed by the provider you configure."
lastVerified: "2026-11-16"
newThisWeek: true
---

AG2 is the open-source framework people still find under the old name AutoGen, and under the query ag2. The current package is not the 1.3.1 named in the summary above. On 16 Nov 2026 the PyPI JSON for `ag2` was version 1.3.2, uploaded at 2026-11-15T16:38:41Z, requiring Python 3.11 or newer. The GitHub release `v1.3.2` was published at 2026-11-15T16:37:55Z. The GitHub API the same morning reported 5,068 stars, the Apache-2.0 license, and a repository description that reads "AG2 (formerly AutoGen): The Open-Source AgentOS." The project URLs on PyPI point at https://ag2.ai/, https://docs.ag2.ai, https://github.com/ag2ai/ag2, and a Discord invite. There is no fee for the library. Model calls are billed by whoever hosts the model you configure. https://ag2.ai/pricing returned HTTP 404 on 16 Nov 2026, and so did https://ag2.ai/space.

## What 1.3.2 changed

The release note is about decision agents that used to answer one question per `ask()`. Classifying a support ticket as spam, naming the team, and scoring urgency took three agents and three requests, and each request sent the ticket again. In 1.3.2 the `response_schema` can be a flat class. Each field is one question, annotated with `Question("...")`, and all of the fields go out in a single request, so the shared input is sent and billed once. The note says this works with `OpenAIDecisionsConfig` and with `TypeSafeConfig`, and that the schema can be a dataclass, a TypedDict, or a Pydantic model. A scalar schema is still one question, as before. There is no new flag.

The failure mode is local. A class the decision API cannot answer is rejected before any request goes out. The note lists the rejected shapes: nested fields, `Optional`, defaults, and a field that has no question. Confidence for a field comes back on the reply metadata. The example in the note reads a department confidence of 0.74 off `reply.response.metadata["department"]["confidence"]` after `await reply.content()`. That 0.74 is the sample in the release note, not a measured accuracy for your tickets. The docs link on the release is the user guide at docs.ag2.ai.

The previous check, on 11 Nov 2026, found 1.3.1 and an A2UI v1.0 version string. This page's summary still says 1.3.1 because the summary is left as it was. Install `ag2` and read the version you get. The packages named `autogen` and `pyautogen` were the older names. How that split is counted is the [November 11 cadence note](/research/ai-agent-framework-release-cadence-october-november-2026). Whether the old project is maintained is [Is AutoGen deprecated?](/blog/is-autogen-deprecated). The wider table is [Best AI agent frameworks](/best/ai-agent-frameworks).

## What the website is selling now

ag2.ai on 16 Nov 2026 is no longer only a library homepage. The page leads with AG2 Space: people and their AI teammates in shared rooms, where they can hand off work and ask for approval. It says Space is available for macOS and works with Claude Code or Codex. Under that, AG2 AgentOS is described as a runtime that connects agents from AG2, Google ADK, OpenAI, and LangChain into one team, with shared state across a task and with A2A and MCP. The page says this is backed by the AutoGen and StateFlow research and "used by millions of developers." "Millions" is the site's line. The star count above is the number the GitHub API returned, 5,068, which is not millions. The library and Space are easy to confuse. The PyPI package does not include a macOS app, and the site does not print a price for Space. If a vendor quotes you for AgentOS, that number is not on ag2.ai/pricing, because that URL 404s.

## Best for

A Python developer who wants several agents, or several decisions about one document, in code they can pin. 1.3.2 is specifically for the case where one ticket or one email has to be labeled on more than one axis and you do not want to pay to send it three times. It is a poor fit if you wanted a hosted inbox with a published monthly price. That product is not priced in public today.

## Watch out for

The summary line on this page still says 1.3.1. The package uploaded on 15 Nov 2026 is 1.3.2. Nested schemas, optional fields, and defaults are rejected on purpose, before the call, so a Pydantic model that works elsewhere can fail here until you flatten it. Confidence in the sample is not a guarantee. AgentOS interoperability with Google ADK, OpenAI, and LangChain is the homepage's description of the runtime, not a test this listing ran. There is no AG2 subscription to compare with a seat on another platform. You still pay the model provider. Apache-2.0 covers the GitHub repository. It does not cover the models. Space for macOS is a separate surface from `pip install ag2`, and nobody has published what it costs.

## Alternatives

[Pydantic AI](/directory/pydantic-ai) is the other typed Python agent loop, MIT licensed, with a separate harness package for files and a shell. It does not share AG2's one-request multi-question decision API. [CrewAI](/directory/crewai) is the role-based multi-agent library, with an open-source core and a commercial platform of its own. [OpenAI Agents SDK](/directory/openai-agents-sdk) and [Google ADK](/directory/google-adk) are the vendor frameworks AgentOS says it can sit beside. [LangChain](/directory/langchain) is the other name on that homepage list. [smolagents](/directory/smolagents) is the smaller Python agent loop. Read [Best AI agent frameworks](/best/ai-agent-frameworks) if you are choosing among them rather than looking up this release.

Last verified: 16 Nov 2026.
