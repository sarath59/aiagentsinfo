---
term: Context compaction
shortDefinition: A harness step that replaces older turns of an agent transcript with a shorter summary so later model calls still fit.
related:
  - context-window
  - harness
  - agent-loop
  - prompt
topics:
  - harnesses
  - how-agents-work
---

**Context compaction** is the [harness](/glossary/harness) step that shortens a long transcript. Later calls see the summary, plus whatever recent turns the harness keeps, instead of the whole history.

Two product versions were re-read on November 9, 2026. [Anthropic’s context-window page](https://platform.claude.com/docs/en/build-with-claude/context-windows) calls server-side compaction the primary strategy for long-running agent work. The [threshold page](https://platform.claude.com/docs/en/build-with-claude/compaction-threshold) says compaction starts when input tokens reach a trigger, 150,000 by default and at least 50,000, and that threshold compaction is in beta on select models. [OpenAI’s compaction guide](https://developers.openai.com/api/docs/guides/compaction) says the carried item is opaque and not intended to be human-interpretable.

A research handoff is a third version. The November 3, 2026 report [You don’t need long context](/research/you-dont-need-long-context) has the model write a short brief and then starts a new conversation. The space being protected is the [context window](/glossary/context-window). The text of one call is a [prompt](/glossary/prompt). The cycle that fills the window is the [agent loop](/glossary/agent-loop).
