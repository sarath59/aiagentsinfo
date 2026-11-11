---
term: Indirect prompt injection
shortDefinition: Instructions hidden in a page, file, or tool result that change what the agent does.
related:
  - guardrail
  - tool-use
  - harness
  - rag
  - search-grounding
topics:
  - harnesses
  - how-agents-work
---

**Indirect prompt injection** is a [tool](/glossary/tool-use) result, a web page, or a retrieved passage that contains instructions the user did not type. [OWASP’s LLM01:2026](https://genai.owasp.org/download/56857/) uses that name for content the model ingests from outside the chat, and it lists public web pages and search results as an untrusted surface. The model may follow the page. The page’s author never spoke to the user.

A [harness](/glossary/harness) that only checks the user’s message misses it. The check belongs on the tool result, before the next action. That check is a [guardrail](/glossary/guardrail). [Search grounding](/glossary/search-grounding) runs the fetch inside the vendor’s request, so the harness may never see the sentence. A snippet tool shows the sentence, and the harness still has to refuse the tool the page asked for. A lookup placed in the prompt before the model speaks is [RAG](/glossary/rag), and the same instructions can ride in that passage.

How to grade a fixture page that tells the agent to call a second tool is [What is the best web search tool for an AI agent harness?](/blog/best-web-search-tool-for-ai-agents). How to test one visible action is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness).
