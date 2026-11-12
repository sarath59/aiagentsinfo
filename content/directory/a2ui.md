---
name: A2UI
title: "A2UI 1.0: agent UI protocol, November 2026"
absoluteTitle: true
vendor: Google
website: https://a2ui.org/
logo: /logos/google.png
summary: "Open protocol for generative UI from agents. Google called version 1.0 the first stable release on November 11, 2026. The agent sends JSON components. The app renders them natively. Apache-2.0."
category: agent-frameworks
tags:
  - framework
  - protocol
  - open-source
  - agents
pricing:
  - open-source
useCases:
  - agents
  - coding
audiences:
  - builders
features:
  - Protocol version 1.0, announced November 11, 2026
  - Renderer SDKs for React, Angular, Lit, Flutter, and SwiftUI; Jetpack Compose still on v0.9.1 in the announcement
  - Agent SDKs for Python, TypeScript, and Dart
  - Carries over MCP as application/a2ui+json and over A2A at the v1.0 extension URI
pricingSummary: "The GitHub repository a2ui-project/a2ui is Apache-2.0. Google does not list a fee for the protocol or the SDKs. You pay the model and the host you connect."
socials:
  github: https://github.com/a2ui-project/a2ui
lastVerified: "2026-11-12"
newThisWeek: true
---

Google’s [November 11, 2026 post](https://developers.googleblog.com/en/a2ui-10-build-delightful-fast-reliable-agentic-experiences/) calls A2UI 1.0 the first stable open protocol for generative UI. An agent describes components, data bindings, and function calls. The host draws them with native widgets from a catalog the app registered. The model does not send HTML.

The same post says Gemini supports A2UI 0.9.1 today, and that the Jetpack Compose renderer is v0.9.1 with v1.0 still coming. Web renderers (React, Angular, Lit), Flutter, and SwiftUI are in the “use it now” list. Agent SDKs are Python, TypeScript, and Dart. MCP Apps hosts such as Claude and Gemini can show the screens. The A2A extension URI for v1.0 is `https://a2ui.org/a2a-extension/a2ui/v1.0`.

GitHub’s repository API, read November 12, 2026, reported Apache-2.0 and 17,104 stars, with `pushed_at` 2026-11-12T04:02:10Z. PyPI `a2ui-agent-sdk` 0.11.0 uploaded at 2026-11-10T22:20:43Z. npm `@a2ui/agent` was still 0.1.0 from November 2. The package clocks, the 0.9.1 host gap, and how to add the protocol to a [harness](/glossary/harness) are [A2UI 1.0 agent framework release November 2026](/blog/a2ui-1-0-agent-framework-release-november-2026).

A2UI is not one of the 19 repositories in the [November 5 framework snapshot](/reports/ai-agent-framework-github-stats-november-2026). The [agent frameworks category](/directory/category/agent-frameworks) is the directory shelf. [MCP](/glossary/model-context-protocol) and [A2A](/glossary/agent-to-agent-protocol) stay the tool link and the agent-to-agent link.
