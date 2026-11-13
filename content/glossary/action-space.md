---
term: Action space
shortDefinition: The closed list of actions a harness lets a model request on a page or a screen, such as click, type, scroll, or navigate.
related:
  - accessibility-tree
  - browser-use
  - tool-use
  - harness
  - tool-call-budget
topics:
  - task-performance
  - harnesses
  - how-agents-work
---

An **action space** is the set of actions a [harness](/glossary/harness) will accept from the model. If the action is not in the set, the model cannot take it, no matter how it describes the goal.

[Anthropic’s browser tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool), read November 13, 2026, declares 31 member tools and leaves four off unless you enable them, including `javascript_exec` and `file_upload`. The default calls include `navigate`, `read_page`, `left_click`, `type`, and `form_input`. [Google’s computer-use page](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/computer-use), last updated 2026-11-12 UTC, lets the client remove verbs with `excluded_predefined_functions`. A click in that set still needs a target, either a reference from the [accessibility tree](/glossary/accessibility-tree) or a coordinate.

Each call spends the [tool-call budget](/glossary/tool-call-budget). A wider list is a larger attack surface, because a page the agent is reading can try to steer the next call. The loop those calls sit in is [How do AI browser agents complete tasks?](/blog/how-do-ai-browser-agents-complete-tasks). The general mechanism is [tool use](/glossary/tool-use). The web-only case is [browser use](/glossary/browser-use).
