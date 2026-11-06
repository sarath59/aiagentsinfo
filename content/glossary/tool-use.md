---
term: Tool use
shortDefinition: Letting a model call APIs, a browser, a shell, or other programs, then reading the result.
related:
  - agent
  - harness
  - product-feed
  - agentic-checkout
  - model-context-protocol
topics:
  - harnesses
  - task-performance
---

**Tool use** (also called function calling) is how a model steps outside the text box. The [harness](/glossary/harness) decides which tools exist, how arguments are validated, and what the model is allowed to see of the result.

Without tools, you have dialogue. With tools and a loop, you have an [agent](/glossary/agent). One open way to connect those tools is the [Model Context Protocol](/glossary/model-context-protocol). A catalog lookup or a payment call is the same pattern in a store: see [product feed](/glossary/product-feed) and [agentic checkout](/glossary/agentic-checkout).
