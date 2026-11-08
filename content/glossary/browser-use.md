---
term: Browser use
shortDefinition: Agent tools that read and act on a web page, without taking over a full desktop.
related:
  - computer-use
  - tool-use
  - harness
topics:
  - task-performance
  - how-agents-work
---

**Browser use** is a set of [tools](/glossary/tool-use) that let a model read a web page and act on it. The work stays in the browser. A full desktop, with every local app, is [computer use](/glossary/computer-use).

[Anthropic's computer-use page](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool) says the browser use tool reads and acts on the page itself and does not need a full desktop environment. [OpenAI's computer-use guide](https://developers.openai.com/api/docs/guides/tools-computer-use) separates `BrowserToolset`, for page text, controls, and tabs, from `ComputerToolset`, for screenshots and mouse or keyboard actions. Both still sit inside a [harness](/glossary/harness) that runs the calls and applies the permissions.

The longer guide is [Can an AI agent use your computer?](/blog/can-an-ai-agent-use-your-computer). Desktop, API, and Windows options are compared in [Best computer use agents](/best/computer-use-agents).
