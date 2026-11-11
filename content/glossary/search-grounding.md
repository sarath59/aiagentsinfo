---
term: Search grounding
shortDefinition: A hosted web search the model runs inside one vendor request, then answers from, with citations.
related:
  - tool-use
  - rag
  - harness
  - tool-call-budget
  - indirect-prompt-injection
topics:
  - harnesses
  - how-agents-work
---

**Search grounding** is a web search the model runs inside the vendor’s request. The [harness](/glossary/harness) enables the tool. The vendor searches, and the model answers with citations. Google’s grounding guide, read November 11, 2026, names this `google_search` and bills Gemini 3 and newer per query. OpenAI’s `web_search` and Claude’s `web_search` are the same shape on those APIs: the search happens before your code sees a snippet.

That is not [RAG](/glossary/rag). RAG is a lookup your application runs and then places in the prompt. It is not a snippet [tool](/glossary/tool-use) either. A snippet tool returns text the harness can cut, store, or refuse. Grounding hides the page inside the vendor’s loop. The cap, when the vendor prints one, is a [tool-call budget](/glossary/tool-call-budget). Instructions hiding in a fetched page are [indirect prompt injection](/glossary/indirect-prompt-injection).

The wiring choice, with the November 11 prices, is [What is the best web search tool for an AI agent harness?](/blog/best-web-search-tool-for-ai-agents). The chat products are [Best AI agent for web search](/best/ai-agents-for-web-search).
