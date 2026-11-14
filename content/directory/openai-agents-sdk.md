---
name: OpenAI Agents SDK
vendor: OpenAI
website: https://developers.openai.com/api/docs/guides/agents/sdk
logo: /logos/openai.svg
summary: An open-source toolkit for building agents in Python and TypeScript. It runs the loop that calls a model, uses tools, hands work to another agent, and stops when the task is done.
category: agent-frameworks
tags:
  - framework
  - harnesses
  - open-source
  - agents
pricing:
  - open-source
  - paid
useCases:
  - agents
  - coding
audiences:
  - builders
features:
  - Agents, tool calls, handoffs, guardrails, sessions, and built-in tracing
  - Python package openai-agents and TypeScript package @openai/agents, both MIT licensed
  - Sandbox agents that work inside an isolated workspace
  - Uses OpenAI's Responses API by default when you call OpenAI models
pricingSummary: "The SDK itself has no license fee. The Python and TypeScript packages are MIT licensed. Model calls go through your OpenAI API account, so you pay OpenAI's API rates for the models you use. OpenAI does not list a separate subscription for the SDK."
lastVerified: "2026-11-14"
newThisWeek: true
---

This SDK is a [harness](/glossary/harness) you embed in your own app. It is not the ChatGPT product. A sourced comparison with other runtimes is [Best AI agent harness](/best/ai-agent-harnesses). The November 9, 2026 release tag is on [Best AI agent frameworks](/best/ai-agent-frameworks).

npm `@openai/agents` 0.22.0 was published at 2026-11-12T23:59:01Z. Saved state stays on schema 1.23 when it still fits, and uses 1.24 for richer metadata or a newer nested run. PyPI `openai-agents` was still 0.24.0, uploaded October 15. Those two clocks are [AI agent framework release November 2026: durable no longer checkpoints](/blog/ai-agent-framework-release-november-2026-upgrade).
