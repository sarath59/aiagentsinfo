---
term: Agent session
shortDefinition: Stored conversation state that the harness sends back to the model on the next turn of the same thread.
related:
  - checkpoint
  - harness
  - agent-loop
  - context-window
  - context-compaction
topics:
  - harnesses
  - how-agents-work
---

An **agent session** is the conversation the [harness](/glossary/harness) keeps for one thread and prepends on the next turn. The model sees the earlier items because the harness put them back into the call. The model does not remember them by itself.

The [OpenAI Agents SDK sessions page](https://openai.github.io/openai-agents-python/sessions/), read November 10, 2026, says the runner loads the session before the run and stores the new items after it. The built-in backends on that page include SQLite, Redis, SQLAlchemy, MongoDB, Dapr, and OpenAI’s Conversations API. A wrapper, `OpenAIResponsesCompactionSession`, compacts long history. In the same run, a session cannot be combined with `conversation_id` or `previous_response_id`. Those are server-managed continuation, and the page says to pick one mechanism.

A session is a different object from a [checkpoint](/glossary/checkpoint). A checkpoint can restore a graph’s step. A session restores the items the next model call should see. Both can be used when a person approves a tool and the run continues. CrewAI’s `@persist` and LangGraph’s checkpointer are the other two shapes in [LangGraph vs CrewAI vs the OpenAI Agents SDK](/blog/langgraph-vs-crewai-vs-openai-agents-sdk).

The items still have to fit the [context window](/glossary/context-window). Shortening them on purpose is [context compaction](/glossary/context-compaction). The cycle that fills the window is the [agent loop](/glossary/agent-loop).
