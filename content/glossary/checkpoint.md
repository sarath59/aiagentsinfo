---
term: Checkpoint
shortDefinition: A saved snapshot of an agent run's state, so the harness can resume after a pause, a crash, or a human approval.
related:
  - harness
  - agent-loop
  - agent-session
  - human-in-the-loop
  - orchestration
topics:
  - harnesses
  - how-agents-work
---

A **checkpoint** is a snapshot of an [agent](/glossary/agent) run’s state, written by the [harness](/glossary/harness) so a later process can continue from that point. The snapshot is the thread’s state at a step. It is not the model weights, and it is not the long-term memory of facts the agent has learned about a user.

[LangGraph’s persistence page](https://docs.langchain.com/oss/python/langgraph/persistence), read November 10, 2026, uses the word for short-term, thread-scoped memory: conversation continuity, human-in-the-loop, time travel, and fault tolerance. You compile the graph with a checkpointer and pass a `thread_id`. `InMemorySaver` keeps those snapshots in RAM, so a restart drops them. `SqliteSaver` and `PostgresSaver` keep them on disk or in a database. The same page separates a store, which holds key-value data across threads, from the checkpointer, which holds one thread’s graph.

Other harnesses persist different objects. [CrewAI Flows](https://docs.crewai.com/en/concepts/flows) use `@persist`, defaulting to SQLite, to resume or fork a flow’s state. The [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/sessions/) resumes an interrupted run through a [session](/glossary/agent-session), which stores conversation items. A session replay is not a graph checkpoint. The comparison of those three is [LangGraph vs CrewAI vs the OpenAI Agents SDK](/blog/langgraph-vs-crewai-vs-openai-agents-sdk).

The cycle that produces the next snapshot is the [agent loop](/glossary/agent-loop). A pause for a person is [human in the loop](/glossary/human-in-the-loop). Choosing which node runs next is [orchestration](/glossary/orchestration).
