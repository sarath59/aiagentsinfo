---
name: Browser Use
vendor: Browser Use
website: https://browser-use.com
summary: Open-source browser agent. Version 1.0 writes Python in a persistent REPL on Chrome DevTools Protocol, on Pydantic AI. Browser() starts a cloud browser.
category: agent-frameworks
tags:
  - framework
  - harnesses
  - open-source
  - agents
  - browser
pricing:
  - open-source
  - paid
useCases:
  - agents
socials:
  github: https://github.com/browser-use/browser-use
audiences:
  - builders
features:
  - The agent writes Python against raw CDP instead of picking one action from a DOM dump
  - Browser() starts a Browser Use Cloud browser. Browser('chromium') stays local
  - MIT license on the GitHub repository, read November 11, 2026
  - Exact dependency pins, including pydantic-ai-slim 2.66.0 on the 1.0.4 release
pricingSummary: "The library is MIT licensed. The pricing page, read November 11, 2026, lists the open-source harness at $0 and cloud browsers at $0.02 per browser hour, with no monthly subscription. A home-IP proxy is $5 per GB. Your own proxy or a direct connection is $0.20 per GB."
lastVerified: "2026-11-14"
newThisWeek: true
---

Browser Use 1.0 is a [harness](/glossary/harness) change, not a patch. GitHub published 1.0.0 at 2026-11-10T02:04:48Z. PyPI’s latest on November 14 was 1.0.4, uploaded at 2026-11-13T20:56:54Z, and that release still requires `pydantic-ai-slim==2.66.0`. The 1.0.4 screenshot prune, and the pin against Pydantic AI 2.68.0, are [AI agent framework release November 2026: durable no longer checkpoints](/blog/ai-agent-framework-release-november-2026-upgrade). The 1.0.2 pins, the bench table, and the cloud-browser default are [the November 11 release note](/blog/ai-agent-framework-release-november-2026).

The term for this kind of tool is [browser use](/glossary/browser-use). Downloads through November 8, before 1.0, are [Browser Use had 6,423,201 PyPI downloads](/research/browser-use-vs-stagehand-installs-november-2026). Desktop agents are [Best computer use agents](/best/computer-use-agents).
