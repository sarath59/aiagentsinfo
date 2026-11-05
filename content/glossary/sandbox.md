---
term: Sandbox
shortDefinition: A bounded machine, often a virtual machine or container, where an agent's actions run so a mistake stays inside it.
related:
  - harness
  - computer-use
  - guardrail
topics:
  - harnesses
  - task-performance
---

A **sandbox** is a bounded machine where an agent's actions run. A virtual machine or a container is the usual form. The point is containment: a bad click, a bad command, or a hostile page stays inside that machine.

The [harness](/glossary/harness) decides which commands are even offered. A [guardrail](/glossary/guardrail) can still pause a step inside the sandbox. [Computer use](/glossary/computer-use) is one reason the boundary matters, because the model is asking for real pointer and keyboard actions.

[Anthropic's computer-use page](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool) lists a dedicated virtual machine or container with minimal privileges as a precaution. [OpenAI's computer-use guide](https://developers.openai.com/api/docs/guides/tools-computer-use) says to use an isolated browser or virtual machine. [Google's Computer Use guide](https://ai.google.dev/gemini-api/docs/computer-use) says to run the agent in a sandboxed virtual machine or container, separate from the host. The longer guide is [Can an AI agent use your computer?](/blog/can-an-ai-agent-use-your-computer).
