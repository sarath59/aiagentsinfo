---
term: Context window
shortDefinition: How much text a model can see at once — instructions, history, tool results, and retrieved notes.
related:
  - llm
  - rag
  - prompt
  - context-compaction
topics:
  - how-agents-work
---

The **context window** is the model's working memory for one call. Agents fill it with [prompts](/glossary/prompt), traces, and [RAG](/glossary/rag) hits. When it fills up, the harness must summarize, drop, or retrieve. That summary step is [context compaction](/glossary/context-compaction).
