---
title: "What Is Claude Fable 5.2?"
absoluteTitle: true
description: "Claude Fable 5.2, released November 9, 2026, is Anthropic’s model for long agent sessions, at $8 per million input tokens. An early version ran 1,000 agents for 28.7 hours in sandboxes with no internet."
takeaways:
  - "Anthropic released Claude Fable 5.2 on November 9, 2026, as claude-fable-5-2. The model overview, read November 10, prices it at $8 per million input tokens and $40 per million output tokens, with a 1 million token context window. The API default effort is high."
  - "The same day’s engineering post says 1,000 agents on an early version of Claude Fable 5.2 finished a formal proof in 28.7 hours. Each agent had a sandbox with no internet, a shell, Git, and a shared database. A classifier checked every command and file edit."
  - "The migration notes name four breaks for agent code: a prefix check on every account, thinking blocks that only Claude Fable 5.2 and Claude Mythos 5.2 can read, the older computer-use tool erroring except on Amazon Bedrock, and an advisor that must itself be Claude Fable 5.2 or Claude Mythos 5.2."
date: "2026-11-10"
updated: "2026-11-10"
category: news
topics:
  - news
  - harnesses
  - how-agents-work
audience:
  - everyone
  - builders
companies:
  - anthropic
  - claude
  - claude-code
  - claude-agent-sdk
  - amazon
  - google
  - microsoft
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Claude Fable 5.2 1,000-agent harness timings, as published November 9, 2026"
  description: "Timings, team size, and tool limits transcribed from Anthropic’s November 9, 2026 engineering post, Safely scaling multi-agent teams with Claude Fable 5.2. The 30-hour window and the Opus 5.5 comparison are from the announcement chart that links to that post. AI Agents Info did not rerun the agents."
  isBasedOn: "https://claude.dev/blog/safely-scaling-multi-agent-teams-with-fable-5-2/"
sources:
  - title: "Anthropic, Introducing Claude Fable 5.2 and Claude Mythos 5.2 (November 9, 2026; read November 10, 2026)"
    url: "https://www.anthropic.com/claude-fable-and-mythos-5-2"
  - title: "Anthropic engineering, Safely scaling multi-agent teams with Claude Fable 5.2 (November 9, 2026; read November 10, 2026)"
    url: "https://claude.dev/blog/safely-scaling-multi-agent-teams-with-fable-5-2/"
  - title: "Anthropic, Claude Fable 5.2 model overview (read November 10, 2026)"
    url: "https://platform.claude.com/docs/en/models/fable-5-2/overview"
  - title: "Anthropic, What's new in Claude Fable 5.2 (read November 10, 2026)"
    url: "https://platform.claude.com/docs/en/models/fable-5-2/whats-new-fable-5-2"
  - title: "Claude in the AI Agents Info directory"
    url: "https://www.aiagentsinfo.com/directory/claude"
  - title: "Claude Code in the AI Agents Info directory"
    url: "https://www.aiagentsinfo.com/directory/claude-code"
  - title: "Claude Agent SDK in the AI Agents Info directory"
    url: "https://www.aiagentsinfo.com/directory/claude-agent-sdk"
faq:
  - question: "What is Claude Fable 5.2?"
    answer: "Claude Fable 5.2 is Anthropic’s model for demanding reasoning and long agent sessions, released November 9, 2026. The model id is claude-fable-5-2. The overview read November 10, 2026 lists a 1 million token context window, 128,000 max output tokens, and a price of $8 per million input tokens and $40 per million output tokens. Anthropic says to start most work on Claude Opus 5.5 and move up to Fable 5.2 when evals at a higher effort still miss the bar. Fable 5.2 can also be the advisor a smaller model consults, or the orchestrator that hands simpler tasks to smaller models."
  - question: "What did the 1,000 agents finish?"
    answer: "Anthropic’s November 9, 2026 engineering post says a team of 1,000 agents, running an early version of Claude Fable 5.2, reproduced a computer-checked formal proof of Fermat’s Last Theorem in 28.7 hours. The team used one-third as many output tokens as Anthropic’s September formalization and wrote a proof one-seventh as long. The announcement that links to that post says 30 hours, one-third as many action tokens, and a proof seven times shorter. The announcement’s chart gives the run a window of 18 hours plus 12 more after a restart. A separate sentence in the announcement says one engineer’s Fable 5.2 session coordinated over 1,000 subagents for eight days and produced a prototype operating system that boots on a laptop. That is a different experiment."
  - question: "How did the agents share the work?"
    answer: "The engineering post says the only structure in the prompt was one lead and 999 helpers. In the first 10 minutes the lead created five shared database tables: Announce, Assign, Notes, Subtasks, and Landed. Helpers claimed tasks from the database, wrote Lean proofs, and opened merge requests. The lead later built a task tree under the hardest statement, Langlands-Tunnell, which reached 2,418 tasks and 10 levels. That statement was proved at hour 28.4, and the final theorem at hour 28.7."
  - question: "What safety layers were around the team?"
    answer: "Each agent ran in its own sandbox with no network access. The only way out was a pipe to a gateway that called the Claude API and forwarded Git and database requests. A classifier checked every shell command and file edit before it ran, and an offline monitor reviewed the team’s actions. In this run only a block on the lead would have stopped everyone. A block on a helper removed that helper. Across more than a million tool calls, the post says none met the bar to be blocked."
  - question: "Which agent-code changes break on Claude Fable 5.2?"
    answer: "Anthropic’s what’s-new page, read November 10, 2026, lists four. Editing anything before a thinking block returns a 400 error on every account unless you opt into dropping the block. Only Claude Fable 5.2 and Claude Mythos 5.2 read Claude Fable 5.2 thinking blocks. The older computer_20251124 computer-use tool returns a 400 error on every platform except Amazon Bedrock. With the advisor tool, a Claude Fable 5.2 executor accepts only Claude Fable 5.2 or Claude Mythos 5.2 as its advisor. The same page says nothing changes for the prefix check if Claude Code, the Claude app, Claude Managed Agents, or the Claude Agent SDK builds the request."
  - question: "What does a Claude Fable 5.2 agent loop cost?"
    answer: "The what’s-new page lists $8 per million input tokens and $40 per million output tokens. Cache reads are $0.20 per million tokens. Five-minute cache writes are $10 and one-hour cache writes are $16, per million tokens. Batch processing is $4 and $20. Fast mode is $16 and $80. Claude Fable 5.1 was $10 and $50. The same overview lists Claude Opus 5.5 at $4 and $20. The API default effort is high. The announcement says Medium is the default in the Claude apps and in Claude Code."
  - question: "What was the eight-day operating-system run?"
    answer: "The November 9 announcement says one Anthropic engineer asked Claude Fable 5.2 to design a prototype operating system from an empty folder. The model coordinated over 1,000 subagents for eight days. Anthropic says the result boots on a laptop and includes a core, disk, keyboard, and network drivers, permanent file storage, windows, a login screen, an installer, and built-in Claude. The announcement does not say this run used the database-and-Git harness from the proof experiment."
---

Claude Fable 5.2 is Anthropic’s model for long [agent](/glossary/agent) sessions, released on November 9, 2026. The model id is `claude-fable-5-2`. For most coding and knowledge work, [Anthropic’s announcement](https://www.anthropic.com/claude-fable-and-mythos-5-2) says to start with Claude Opus 5.5 and move up to Fable 5.2 when the job is harder. The same page says Fable 5.2 can fill two seats in a [harness](/glossary/harness): advisor, where a smaller model consults it, or [orchestrator](/glossary/orchestrator), where it hands simpler tasks to smaller models.

The harness note from the same day is the part agent builders can use. [Barry Zhang, Tianyi Peng, Elle Najt, Keller Scholl, and Lance Martin](https://claude.dev/blog/safely-scaling-multi-agent-teams-with-fable-5-2/) describe a team of 1,000 agents, running an early version of Claude Fable 5.2, that finished a computer-checked proof in 28.7 hours. Each agent had its own [sandbox](/glossary/sandbox) with no internet. A classifier checked every shell command and file edit before it ran. The [model overview](https://platform.claude.com/docs/en/models/fable-5-2/overview), read November 10, 2026, prices the released model at $8 per million input tokens and $40 per million output tokens.

AI Agents Info read the announcement, that engineering post, the model overview, and the [what’s-new page](https://platform.claude.com/docs/en/models/fable-5-2/whats-new-fable-5-2) on November 10. This page did not rerun the agents. Claude the product is in the [directory](/directory/claude). The coding agent that already builds many of these requests is [Claude Code](/directory/claude-code).

## What is Claude Fable 5.2?

Claude Fable 5.2 is the Claude model Anthropic tells you to use when a long agent session, a deep research job, or a finished document is the work, and a cheaper daily model has already missed your eval.

The overview, read November 10, 2026, lists it as active, released November 9, 2026, and not retiring sooner than November 9, 2027. The context window is 1 million tokens. The maximum output is 128,000 tokens. Adaptive thinking is always on. The effort control is how you ask for more or less of that thinking. On the API the default effort is `high`. The announcement says Medium is the default in the Claude apps and in Claude Code. Those are two different defaults, on two different pages.

Claude Mythos 5.2 is the same underlying model, with some cybersecurity and biology limits lifted. The announcement says Mythos is for organizations in the Life Sciences and Cyber Verification Programs. The what’s-new page says the two models share the context window, the output limit, and the price, and that Mythos is available only to organizations verified through those programs. The Mythos model id is `claude-mythos-5-2`.

The announcement’s recommendation for everyday work is Claude Opus 5.5, which it calls the strongest daily driver. The what’s-new page says the same thing in builder language: move to Fable 5.2 when your evals on a Claude Opus model at a higher effort still do not meet the requirement. The overview’s comparison row prices Opus 5.5 at $4 per million input tokens and $20 per million output tokens, half the Fable 5.2 sticker rate. A lower sticker rate is not the same claim as a lower cost per finished task. The task claim is in the next section’s FrontierCode sentence, and it is Anthropic’s measurement.

On agent jobs, the announcement prints three scores and says they use each model’s highest available effort unless noted, with safeguards on unless noted. AI Agents Info did not rerun them.

| Agent-style eval on the announcement | Claude Fable 5.2 | Claude Fable 5.1 | Claude Opus 5.5 |
| --- | --- | --- | --- |
| FrontierCode 2.0, would maintainers merge the change | 49.1% at Xhigh effort | 32.4% at Xhigh effort | 45.5% |
| OSWorld 2.1, computer use, offline set, partial | 89.3% | 83.5% | 87.2% |

The announcement’s FrontierCode chart adds a second Fable 5.2 number. At High effort it scores 45.3%, about level with Opus 5.5’s best score of 45.5%, for roughly half the cost per task. That is a cost-per-task claim at those effort settings. It is not a claim that the $8 token price is half of Opus.

The announcement also says Fable 5.2 and Mythos 5.2 generate output up to 30% faster than the 5.1 models, and that an optional fast mode speeds token generation by up to 2.5 times. Fast mode is priced in the cost section.

One production note is about a team, not a single chat. The announcement says a team of agents running an earlier version of Fable 5.2 migrated a critical production service from Python to Rust, and that the service starts about 26 times faster. It also says that, with human guidance, over 90% of the changes merged into Anthropic’s core codebase are now written by Claude. Both sentences are Anthropic’s account of its own work.

## What did the 1,000 agents finish?

They finished a computer-checked formal proof of Fermat’s Last Theorem in 28.7 hours. The model in that run was an early version of Claude Fable 5.2, and the engineering post calls the run a toy experiment.

The post separates this run from Anthropic’s September formalization. That earlier run used dozens of agents, an internal research model the authors call roughly comparable to Claude Fable 5.1, the Prove2Me platform, and direction from a researcher. It took 11 days and roughly 6 billion output tokens, and it wrote 13 million lines of Lean. Lean is the language in which a computer checks each step. The new run, the post says, did without the Prove2Me scaffolding and without a researcher steering the proof. It used one-third as many output tokens and wrote a proof one-seventh the length.

The announcement’s mathematics section links to that post and uses rounder words. It says a team of 1,000 Fable 5.2 agents finished in 30 hours, with minimal human intervention, from minimal prompts, with “no mathematical references, only a list of intermediate theorem statements,” one-third as many action tokens, and a proof seven times shorter. Seven times shorter is the same ratio as one-seventh the length. The engineering post is the page this article follows for what the agents were given and how the [harness](/blog/what-is-an-ai-agent-harness) was built, because that post is the one that lists the pieces.

Those pieces are a list of 60 statements, including the theorem and 59 intermediate milestones, a one-sentence sketch of the classical route, the definitions those statements use, and 47 lemmas already proved in the September formalization. The authors assigned a lead and helpers. They write that they offered no other guidance on how to prove the theorem or organize themselves. During the run the harness also sent the lead 19 automatic reminders of the time left, each one encouraging the lead to keep going. At hour 18 the authors restarted the run from its last save and gave the agents 12 more hours. That restart is the 30-hour window on the announcement’s chart. The proof landed at hour 28.7, inside the window.

The announcement’s chart is one run per model. On that chart, Opus 5.5 with the same 1,000-agent setup had completed 26% at 18 hours and barely made more progress after 30. The engineering post does not reprint the 26%.

The post also says the experiment ran on a model that may not have finished the pre-release alignment assessment. Models Anthropic releases, it says, complete that assessment first. The 28.7-hour team is evidence about an early checkpoint and this harness. It is not a score for the `claude-fable-5-2` id on the API.

A second “1,000” appears in the announcement and is a different experiment. It is the eight-day operating-system run, in its own section below. The counts should not be added together.

## How did the agents share the work?

They shared a Postgres database and a Git repository. They did not have a chat tool.

The engineering post says a single shared machine ran out of room at about 100 agents. More than half of those 100-agent runs had to be stopped or restarted because memory, disk, or CPU ran out. For the 1,000-agent run, each agent had its own lightweight virtual machine. The database was the shared scratchpad. The authors say they picked SQL because transactions can take writes from 1,000 agents at once, and because Claude already knows it.

Each agent had a shell and a file editor, Lean and Mathlib in the sandbox image, its own Git branch, and the right to open a merge request into the main branch. A separate job merged those requests and refused them only for a conflict or a fault, such as unrelated history. Database calls used one shared unprivileged role. Each SQL statement had a five-second limit. Writes larger than 256 MiB were refused.

The prompt’s only org chart was one lead and 999 helpers. The lead was told to split the problem into parts and assign them. Helpers were told to expect work from the lead and to check with the lead if a task was unclear. [Orchestration](/glossary/orchestration) after that was the lead’s, and then the helpers’.

In the first 10 minutes the lead created five tables.

| Table | What the post says it held |
| --- | --- |
| Announce | The lead’s orders to the whole team |
| Assign | Who works on what |
| Notes | An open board for plans and progress |
| Subtasks | A list any agent can add to, claimed by the first helper |
| Landed | A log of finished work |

The lead then wrote 999 rows to Assign, one per helper, and put each statement with a crew of 16 to 17 helpers. One helper in each crew was the captain. About 27 minutes in, three statements were already proved. The lead read the helpers’ difficulty notes, set aside the 47 statements most helpers had called infeasible inside the time budget, and moved almost everyone onto the other 10. Crews grew from about 17 helpers to somewhere between 46 and 139. Around 45 minutes the lead wrote that the team’s throughput was far higher than those early “infeasible-in-budget” verdicts had assumed. All 10 of those statements were proved within about 70 minutes.

The lead then wrote that there was no reason to idle, and moved helpers onto the statements it had set aside. By hour 5.6, 73 helpers had written 756 tasks, and only 16 of those helpers were captains. Inside the first hour the lead had started telling free helpers not to wait for it.

Around hour 18, what remained was Langlands-Tunnell, a classical result the proof depends on, plus statements that depended on it. The captain of that statement had estimated at least 0.7 to 1 million lines of Lean, and less than a 1% chance of finishing in time. The lead had set it aside. With the other work done, the lead moved about 750 helpers onto it and wrote, “Honest odds are low.”

The crew turned the statement into a tree. A piece that was too big for one helper was split, and the new pieces could be assumed by the pieces above them, so hundreds of helpers could work before the lower pieces were proved. The tree reached 2,418 tasks, up to 10 levels deep. Langlands-Tunnell was proved at hour 28.4. The final theorem was proved at hour 28.7. The lead wrote: “Thank you all: Fermat's Last Theorem is on main, kernel-checked by the official checker.”

The post’s closing point for harness builders is that this does not remove the need for a domain-specific harness. Prove2Me, the authors say, may still be faster at compiling Lean and at reusing human results. They also say agents give up on hard problems and misjudge them. Helpers had called 47 of the 60 statements infeasible, and the team later proved most of them. A person nudging at that moment, a [human in the loop](/glossary/human-in-the-loop), is still part of the design they describe. How an orchestrator should choose the next worker, on a different paper, is [What is multi-agent orchestration?](/blog/what-is-multi-agent-orchestration).

## What safety layers were around the team?

Three layers: a sandbox with no network, a classifier on each [tool](/glossary/tool-use) call, and an offline monitor after the fact. The post says no single layer is enough for a team this size.

The sandbox rules, as the post lists them:

- Agents had no messaging tool. They coordinated through the database and Git.
- An agent could push only to its own branch.
- The sandbox had no network. Its one link out was a pipe to a gateway. The gateway called the Claude API and passed Git and SQL requests on.
- The gateway tagged each request with the agent’s identity outside the sandbox, so one agent could not pose as another.
- The kernel was built without loadable modules, kexec, raw memory access, and kernel probes, and it ran in kernel lockdown mode.
- Commands ran as an unprivileged user. Tools such as sudo were removed. The agent’s tools could not read or change the loop that ran them.

The real-time check is a prompted model that can block a shell command or a file edit. It watches for sandbox escapes, probes of the boundary, tampering with the monitor, and harmful actions if an agent did get out. In the general design, a block stops the whole team until a person reviews it. That is an [approval gate](/glossary/approval-gate). The authors say the stop is there so a second agent cannot carry out an action the classifier just refused. A check that can block a step is a [guardrail](/glossary/guardrail).

The run in the post did not use that full stop. The authors say they used only the action-based monitor, which sees actions and not the chain of thought. Only a block on the lead would have ended the run. A block on a helper removed that helper. They added a parallel chain-of-thought monitor shortly after this run. In their red-team tests, monitors that could see the chain of thought and the messages between agents detected every sabotage attempt they tried. Across more than a million tool calls in this run, none met the bar to be blocked. Replayed later against the chain-of-thought monitor, one call came close: a check for root access.

The announcement’s safety section is about the released model, not this harness. It says pre-release tests included new evals aimed at sandbox escapes, and that high-stakes risk from misalignment stayed low on their reading. The engineering post is the one that describes the containers, the classifier, and the million tool calls. Building the tasks and the isolated machines around an agent is the subject of [How to build an eval harness for AI agents](/blog/how-to-build-an-eval-harness-for-ai-agents).

## Which agent-code changes break on Claude Fable 5.2?

Four changes from Claude Fable 5.1 can return an error, or silently drop the model’s reasoning. The what’s-new page, read November 10, 2026, lists them in this order.

**The prefix check now applies to every account.** Anything before a Fable 5.2 or Mythos 5.2 thinking block has to be the same as when the model wrote it: the system prompt, the tools, and earlier messages. If you send the block back after an edit and you do not set a mismatch behavior, the API returns a 400. The message says the block is bound to a different conversation. On Fable 5.1 that error was limited to accounts created on or after August 31, 2026. Code that edited history and worked on an older account can fail after the switch.

The page says nothing changes for you if Claude Code, the Claude app, Claude Managed Agents, or the [Claude Agent SDK](/directory/claude-agent-sdk) builds the request. If your own code builds `messages`, the safe pattern on that page is: keep `system` and `tools` fixed, only append messages, and send each assistant turn back exactly as the API returned it. To drop the broken blocks and continue, send the beta header `thinking-binding-controls-2026-08-01` and set the prefix mismatch behavior to `drop_block`. The page calls that a stopgap, because dropping blocks can raise the output-token bill.

**Only Claude Fable 5.2 and Claude Mythos 5.2 read Claude Fable 5.2 thinking blocks.** On the Claude API and on Google-managed Claude on Google Cloud, those two also read blocks from Opus 5.5, Sonnet 5.5, Haiku 5.5, Fable 5.1, Mythos 5.1, and several earlier Claude models. No other model reads a Fable 5.2 thinking block. A router that falls back from Fable 5.2 to Opus 5.5 keeps the conversation and loses that reasoning. The request still succeeds. The dropped blocks are not billed.

**The older computer-use tool errors, except on Amazon Bedrock.** Fable 5.1 accepted computer use as the `computer_toolset_20260801` toolset and, with a beta header, as `computer_20251124`. Fable 5.2 and Mythos 5.2 take the toolset. Declaring `computer_20251124` returns a 400 `invalid_request_error` on every platform except Amazon Bedrock, where the older tool still works. [Computer use](/glossary/computer-use) is the loop in which the model looks at a screen and asks for a click or a key. The announcement’s OSWorld row above is the score Anthropic reports for that skill. The tool name in your request is the part that breaks.

**A Fable 5.2 executor needs a Fable 5.2 or Mythos 5.2 advisor.** The advisor tool is in beta. The advisor has to be at least as capable as the executor. Any other advisor, including Fable 5.1 and Mythos 5.1, returns a 400. If you move the executor to Fable 5.2, change the advisor’s model in the same edit, and do it in a new conversation. Changing the advisor’s model edits `tools`, which is the prefix check above. Every executor model accepts a Fable 5.2 advisor, so you can change only the advisor and keep the current executor.

Two further API rules are on the same page. They are not new if you are coming from Fable 5.1, Mythos 5.1, or Opus 5.5. Adaptive thinking cannot be turned off: a thinking block of type `enabled` or `disabled` returns a 400. Forced [tool use](/glossary/tool-use) is not supported: `tool_choice` of type `any` or `tool` returns a 400. The page says to leave tool choice on `auto` and, where structured outputs are available, set strict tool use. Organizations with customer-managed encryption keys do not get structured outputs on these two models.

Two beta features are there so a long run can stay append-only, which is what the prefix check requires. Compaction on demand, header `compact-2026-09-04`, lets you choose when older turns become a summary. That step is [context compaction](/glossary/context-compaction). Mid-conversation tool changes, header `inline-tools-2026-09-15` on the Claude API, Claude Platform on AWS, and Anthropic-managed Claude on Google Cloud, let you add or remove tools in a system message instead of editing the `tools` array.

The same page describes behavior you will see without a code change. Lines in the prompt that ask for less thinking do not stop the model at `medium` effort and above. On long tasks the model more often ends a turn early at `low` and `medium`, with a list of what remains. How much it delegates to subagents depends on the harness and the task. In a coding product whose prompts invite delegation, the page says it delegates readily, and subagents can be a large share of the session cost. Claude Code’s own switch for planning a workflow is [ultracode](/blog/what-does-ultracode-do-in-claude-code). That setting is not a Fable 5.2 feature, and this page did not retest it on the new model.

Refusals are part of the loop. A declined request returns HTTP 200 with `stop_reason` set to `refusal`. The what’s-new page says the permitted fallback targets are Claude Opus 4.8 and Claude Opus 5. The announcement is more specific about which refusal goes where: a blocked cybersecurity query is answered by Opus 4.8, and a blocked biology query by Opus 5. It says early testing saw about 55% fewer blocks than Fable 5.1, about 60% fewer in cybersecurity and 40% fewer in biology. Server-side fallback is in beta on the Claude API and on Anthropic-managed Claude on Google Cloud.

The overview also says Fable 5.2 requires 30-day data retention and is not available under zero data retention unless Anthropic has expressly authorized it. The announcement says Enterprise Frontier Safeguards, a private beta, runs the safety monitoring on data stored in the customer’s own infrastructure so that zero data retention can still apply. It names Bridgewater, Salesforce, and Stripe as customers in that beta.

## What does a Claude Fable 5.2 agent loop cost?

The released model costs $8 per million input tokens and $40 per million output tokens. Fast mode doubles those rates. Cache reads are a small fraction of the input price, which is the line that matters when an agent resends a long transcript.

The what’s-new page, read November 10, 2026, prints this table for both Fable 5.2 and Mythos 5.2. Fable 5.1 and Mythos 5.1 were $10 and $50. Cache reads are 0.025 times the base input price, the same multiplier as on those older models. Batch processing is half off.

| Rate | USD per million tokens |
| --- | --- |
| Input | $8 |
| Output | $40 |
| Cache read | $0.20 |
| Cache write, 5 minutes | $10 |
| Cache write, 1 hour | $16 |
| Batch input | $4 |
| Batch output | $20 |
| Fast mode input | $16 |
| Fast mode output | $80 |

Fast mode is available for Fable 5.2 on Claude Code, the Claude Platform, Claude on Google Cloud (Anthropic-managed and Google-managed), and Microsoft Foundry when the deployment is hosted by Anthropic. On Foundry the fast model id is `claude-fable-5-2-fast`. The announcement says fast mode speeds token generation by up to 2.5 times.

Effort is the other cost dial. The what’s-new page lists `low`, `medium`, `high`, `xhigh`, and `max`. The API default is `high`. The page says most of the gain is already there at `high`, to step up to `xhigh` for the hardest long coding and agent jobs where you have measured a gain, and to reserve `max` for a ceiling measurement or a task where time and tokens do not matter. The announcement’s Medium default in the apps and in Claude Code means a Claude Code session is not on the API’s `high` unless the session sets it.

Where you can call it, from the what’s-new page: the Claude API as `claude-fable-5-2` for all customers; Amazon Bedrock as `anthropic.claude-fable-5-2`; Claude Platform on AWS as `claude-fable-5-2`; Google Cloud, both Anthropic-managed and Google-managed, as `claude-fable-5-2`; Microsoft Foundry, on Anthropic infrastructure, as `claude-fable-5-2`.

The announcement says subscribers on eligible paid plans get extra Fable usage this week: one to three Fable resets based on how long they have subscribed, and Fable included for up to 50% of weekly usage limits on Pro and on standard Team seats. The details of that promotion are on Anthropic’s launch note, not restated here, because the note is a weekly allowance and this page did not open the billing screen.

A loop that spends most of its tokens on many short steps will feel the output price and the subagent share more than the headline input price. The what’s-new page says to re-run your evals, including an effort sweep that starts at `high`, before you switch a harness over. How to judge a harness on your own tasks, rather than on the vendor chart, is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness).

## What was the eight-day operating-system run?

One engineer asked Claude Fable 5.2 to design a prototype operating system, starting from an empty folder. The announcement says the model coordinated over 1,000 subagents, working around the clock for eight days, and produced a system that boots on a laptop.

The announcement’s inventory of that system is a core that runs the machine, drivers for the disk, keyboard, and network, permanent file storage, windows, a login screen, an installer, and built-in Claude. It points to a video on the announcement page. It does not say the agents used the Postgres tables, the lead-and-helper prompt, or the no-network sandbox from the proof experiment. This page does not treat the two runs as one harness.

The sentence is also easy to merge with the proof, because both use the number 1,000. The proof team was 1,000 agents on an early checkpoint, for 28.7 hours, in the engineering post. The operating-system session is the announcement’s account of one engineer, eight days, and subagents coordinated by the model. Keep those clocks separate when you cite either number.

## FAQ

### What is Claude Fable 5.2?

Claude Fable 5.2 is Anthropic’s model for demanding reasoning and long agent sessions, released November 9, 2026. The model id is `claude-fable-5-2`. The overview read November 10, 2026 lists a 1 million token context window, 128,000 max output tokens, and a price of $8 per million input tokens and $40 per million output tokens. Anthropic says to start most work on Claude Opus 5.5 and move up to Fable 5.2 when evals at a higher effort still miss the bar. Fable 5.2 can also be the advisor a smaller model consults, or the orchestrator that hands simpler tasks to smaller models.

### What did the 1,000 agents finish?

Anthropic’s November 9, 2026 engineering post says a team of 1,000 agents, running an early version of Claude Fable 5.2, reproduced a computer-checked formal proof of Fermat’s Last Theorem in 28.7 hours. The team used one-third as many output tokens as Anthropic’s September formalization and wrote a proof one-seventh as long. The announcement that links to that post says 30 hours, one-third as many action tokens, and a proof seven times shorter. The announcement’s chart gives the run a window of 18 hours plus 12 more after a restart. A separate sentence in the announcement says one engineer’s Fable 5.2 session coordinated over 1,000 subagents for eight days and produced a prototype operating system that boots on a laptop. That is a different experiment.

### How did the agents share the work?

The engineering post says the only structure in the prompt was one lead and 999 helpers. In the first 10 minutes the lead created five shared database tables: Announce, Assign, Notes, Subtasks, and Landed. Helpers claimed tasks from the database, wrote Lean proofs, and opened merge requests. The lead later built a task tree under the hardest statement, Langlands-Tunnell, which reached 2,418 tasks and 10 levels. That statement was proved at hour 28.4, and the final theorem at hour 28.7.

### What safety layers were around the team?

Each agent ran in its own sandbox with no network access. The only way out was a pipe to a gateway that called the Claude API and forwarded Git and database requests. A classifier checked every shell command and file edit before it ran, and an offline monitor reviewed the team’s actions. In this run only a block on the lead would have stopped everyone. A block on a helper removed that helper. Across more than a million tool calls, the post says none met the bar to be blocked.

### Which agent-code changes break on Claude Fable 5.2?

Anthropic’s what’s-new page, read November 10, 2026, lists four. Editing anything before a thinking block returns a 400 error on every account unless you opt into dropping the block. Only Claude Fable 5.2 and Claude Mythos 5.2 read Claude Fable 5.2 thinking blocks. The older `computer_20251124` computer-use tool returns a 400 error on every platform except Amazon Bedrock. With the advisor tool, a Claude Fable 5.2 executor accepts only Claude Fable 5.2 or Claude Mythos 5.2 as its advisor. The same page says nothing changes for the prefix check if Claude Code, the Claude app, Claude Managed Agents, or the Claude Agent SDK builds the request.

### What does a Claude Fable 5.2 agent loop cost?

The what’s-new page lists $8 per million input tokens and $40 per million output tokens. Cache reads are $0.20 per million tokens. Five-minute cache writes are $10 and one-hour cache writes are $16, per million tokens. Batch processing is $4 and $20. Fast mode is $16 and $80. Claude Fable 5.1 was $10 and $50. The same overview lists Claude Opus 5.5 at $4 and $20. The API default effort is `high`. The announcement says Medium is the default in the Claude apps and in Claude Code.

### What was the eight-day operating-system run?

The November 9 announcement says one Anthropic engineer asked Claude Fable 5.2 to design a prototype operating system from an empty folder. The model coordinated over 1,000 subagents for eight days. Anthropic says the result boots on a laptop and includes a core, disk, keyboard, and network drivers, permanent file storage, windows, a login screen, an installer, and built-in Claude. The announcement does not say this run used the database-and-Git harness from the proof experiment.
