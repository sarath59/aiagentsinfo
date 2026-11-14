---
term: Approval gate
shortDefinition: A configured stop that holds a named agent action until a person approves it.
related:
  - human-in-the-loop
  - guardrail
  - autonomy
  - tool-use
  - harness
topics:
  - harnesses
  - task-performance
  - how-agents-work
---

An **approval gate** is a stop the [harness](/glossary/harness) enforces before a named action. The action can be sending a message, editing a record, deleting a file, or spending money. The run waits. A person approves or rejects that step. That person is the [human in the loop](/glossary/human-in-the-loop).

[OpenAI’s workspace-agents page](https://openai.com/business/workspace-agents/), read November 7, 2026, lists approval gates for sensitive actions such as sending messages or updating records. The [help article](https://help.openai.com/en/articles/20001143-chatgpt-workspace-agents-for-enterprise-and-business) read the same day says write actions default to Always ask during a run. [Claude’s Enterprise help article](https://support.claude.com/en/articles/17444462-set-up-and-manage-the-new-unified-claude-experience-for-your-enterprise-organization), also read November 7, says admins can turn off “Skip all approvals” and “Automatically approve,” so a member cannot let Claude act on tools, file edits, and browsing without being asked. A [guardrail](/glossary/guardrail) is the wider family of checks. The gate is the specific pause. How many gates you set is an [autonomy](/glossary/autonomy) choice. The [tool](/glossary/tool-use) still runs only after the gate opens.

The workplace guide is [What is an AI employee?](/blog/what-is-an-ai-employee). A payment gate in a store is [agentic checkout](/glossary/agentic-checkout). ChatGPT Wallet, opened November 13, 2026, puts that gate on every purchase: Face ID or Touch ID, then a [payment token](/glossary/payment-token). The explainer is [How does ChatGPT Wallet work?](/blog/how-does-chatgpt-wallet-work).
