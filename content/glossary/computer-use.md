---
term: Computer use
shortDefinition: A tool loop in which a model looks at a screen and asks for a mouse or keyboard action, and the app runs that action.
related:
  - harness
  - tool-use
  - agent
  - guardrail
  - autonomy
topics:
  - task-performance
  - how-agents-work
  - harnesses
---

**Computer use** is a [tool](/glossary/tool-use) loop. The model looks at a screen and asks for a click, a keystroke, or a scroll. The app around the model takes the screenshot, runs the action, and returns the new screen. That app is part of the [harness](/glossary/harness). The working pair is an [agent](/glossary/agent).

[Anthropic's computer-use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool) is the API form: one toolset entry, and your application runs each call in an environment you control. [Claude's product article](https://claude.com/resources/articles/dispatch-and-computer-use) describes the same idea in Claude Cowork and Claude Code, on a Mac or Windows desktop. A check before a risky click is a [guardrail](/glossary/guardrail). How far the loop runs before a person confirms is [autonomy](/glossary/autonomy).

A narrower tool that stays on a web page is [browser use](/glossary/browser-use). The longer guide is [Can an AI agent use your computer?](/blog/can-an-ai-agent-use-your-computer). A sourced comparison of desktop, API, open-source, and Windows options is [Best computer use agents](/best/computer-use-agents). What is dated from November 9, 2026 through May 9, 2027 is [Browser and computer-use agents next 6 months](/reports/browser-and-computer-use-agents-next-6-months). A workplace agent that returns a file for review, rather than driving the screen, is [What is an AI employee?](/blog/what-is-an-ai-employee).
