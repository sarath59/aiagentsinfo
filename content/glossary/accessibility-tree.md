---
term: Accessibility tree
shortDefinition: The browser's structured list of named controls. A browser agent reads it so a click can name a button instead of guessing a pixel.
related:
  - browser-use
  - action-space
  - computer-use
  - tool-use
topics:
  - task-performance
  - how-agents-work
---

The **accessibility tree** is the browser’s structured list of what a page exposes to assistive technology: roles, names, and states. A browser agent reads that list so the next [tool](/glossary/tool-use) can target a control by reference.

[Anthropic’s browser-use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool), read November 13, 2026, says `read_page` returns the tree as text, with each element tagged by a reference such as `[ref_2]`. A later `left_click` or `form_input` can pass that reference. The same page says the computer-use tool does not work this way. It uses screenshots and coordinates only. That tool is [computer use](/glossary/computer-use). The web-page tool is [browser use](/glossary/browser-use).

Browser Use 1.0, published November 10, 2026, says its ultrafast mode works with accessibility-tree ids. The closed list of calls the model may make against those ids is the [action space](/glossary/action-space). How the loop uses the tree, where a screenshot is still required, and what to put in the tree if the page is yours, is [How do AI browser agents complete tasks?](/blog/how-do-ai-browser-agents-complete-tasks). A sourced comparison of desktop, API, and open-source options is [best computer use agents](/best/computer-use-agents).
