---
term: Context window
shortDefinition: How much text a model can see at once — instructions, history, tool results, and retrieved notes.
sample: true
related:
  - llm
  - rag
  - prompt
topics:
  - how-agents-work
---

> **Sample glossary term.**

The **context window** is the model's working memory for one call. Agents fill it with [prompts](/glossary/prompt), traces, and [RAG](/glossary/rag) hits. When it fills up, the harness must summarize, drop, or retrieve — which is a product decision, not magic.
