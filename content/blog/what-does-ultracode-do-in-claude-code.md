---
title: "What Is Ultracode in Claude Code?"
absoluteTitle: true
description: "Ultracode is a Claude Code setting, not a Fable 5.2 feature. It plans a dynamic workflow for each substantive task, and it is not a model or a separate plan."
takeaways:
  - "On the workflows page read November 11, 2026, ultracode is a Claude Code setting. With it on, Claude plans a dynamic workflow for each substantive task. One request can become several workflows in a row."
  - "The changelog for v2.1.284, dated September 28, 2026, says the /effort toggle no longer forces xhigh. claude --effort ultracode still turns ultracode on and sets the level to xhigh."
  - "The same workflows page says each request uses more tokens and takes longer, and those tokens draw on the plan's usage limits. It does not print a separate ultracode price."
date: "2026-11-09"
updated: "2026-11-11"
category: guide
topics:
  - harnesses
  - how-agents-work
  - tools-saas
audience:
  - everyone
  - builders
companies:
  - anthropic
  - claude
  - claude-code
byline: "AI Agents Info Editorial"
contentLicense: true
sources:
  - title: "Claude Code, Orchestrate subagents at scale with dynamic workflows (read November 11, 2026)"
    url: "https://code.claude.com/docs/en/workflows"
  - title: "Claude Code, Model configuration, Adjust effort level (read November 11, 2026)"
    url: "https://code.claude.com/docs/en/model-config"
  - title: "Claude Code, Settings reference, ultracode and workflowKeywordTriggerEnabled (read November 9, 2026)"
    url: "https://code.claude.com/docs/en/settings-reference"
  - title: "Claude Code changelog, v2.1.322 (November 10, 2026), v2.1.284 (September 28, 2026), and v2.1.160 (June 2, 2026), read November 11, 2026"
    url: "https://code.claude.com/docs/en/changelog"
  - title: "Hacker News, What is ultracode mode?, item 48314397"
    url: "https://news.ycombinator.com/item?id=48314397"
  - title: "Reddit, r/ClaudeCode, Any reason not to use Ultracode?"
    url: "https://www.reddit.com/r/ClaudeCode/comments/1u5d69n/any_reason_not_to_use_ultracode/"
  - title: "Claude Code in the AI Agents Info directory"
    url: "https://www.aiagentsinfo.com/directory/claude-code"
faq:
  - question: "What does ultracode do in Claude Code?"
    answer: "On the workflows page read November 11, 2026, ultracode turns on automatic workflow orchestration for the session. With it on, Claude plans a dynamic workflow for each substantive task. One request can become several workflows in a row. A dynamic workflow is a JavaScript script Claude writes, and a runtime runs that script, including its subagents, in the background."
  - question: "What is ultracode in Claude Code?"
    answer: "The model-config page, read the same day, calls ultracode a Claude Code setting rather than a model effort level. The effort table on that page gives it this line: plans a dynamic workflow for each substantive task at any effort level. It is not a model name and not a separate Claude plan."
  - question: "Is ultracode the same as max effort?"
    answer: "The model-config page lists max and ultracode on different rows. max is the deepest reasoning level, and Claude Code applies it to the current session only unless it comes from the CLAUDE_CODE_EFFORT_LEVEL environment variable. ultracode is the workflow setting. Since v2.1.284, dated September 28, 2026, /effort ultracode leaves the effort level where it is. claude --effort ultracode is the launch flag that turns ultracode on and also sets the level to xhigh."
  - question: "How do you turn ultracode on?"
    answer: "The model-config page lists /effort ultracode for the current session, Tab on the Ultracode toggle in the /effort slider, the settings key \"ultracode\": true for later sessions, and claude --effort ultracode for a new session. The last one also sets effort to xhigh. On Pro, the workflows page says to turn dynamic workflows on from the Dynamic workflows row in /config first."
  - question: "Does ultracode cost extra?"
    answer: "The workflows page does not print a dollar price for ultracode. It says each request uses more tokens and takes longer than the same request without a workflow, and that on a subscription those tokens draw on usage limits, so a session reaches a session or weekly limit sooner. A single workflow run can use meaningfully more tokens than the same task in conversation, and runs count toward the plan's usage and rate limits."
  - question: "How do you turn ultracode off?"
    answer: "The workflows page says /effort ultracode off. That form requires Claude Code v2.1.284 or later. Before that version, the same page says /effort ultracode off failed with Invalid argument. Turning dynamic workflows off, in /config or with \"disableWorkflows\": true, also removes the Ultracode toggle."
  - question: "Can you use ultracode with Claude Fable 5.2?"
    answer: "Ultracode is a Claude Code setting, not a Fable 5.2 feature, and this site did not retest it on that model. The model-configuration page read November 11, 2026 puts Fable models on one effort row: low, medium, high, xhigh, and max. Fable 5.2's default is medium, and the model needs Claude Code v2.1.321 or later. claude --effort ultracode turns ultracode on and also sets the effort level to xhigh."
---

Ultracode is a Claude Code setting. It plans a dynamic workflow for each substantive task, at the effort level the session is already using. It is not a Claude Fable 5.2 feature, and this page did not retest the setting on that model. On the [workflows page](https://code.claude.com/docs/en/workflows) read November 11, 2026, `/effort ultracode` is the command that turns that setting on for the current session. The same page says one request can become several workflows in a row: one to understand the code, one to make the change, and one to verify it. The [changelog](https://code.claude.com/docs/en/changelog) dates the split from a forced `xhigh` effort at Claude Code v2.1.284, September 28, 2026.

The pages read again for this note on November 11, 2026 are that workflows guide, the [model-config page](https://code.claude.com/docs/en/model-config), and the changelog through v2.1.322 (November 10, 2026). The [settings reference](https://code.claude.com/docs/en/settings-reference) was last read November 9 and was not re-fetched. A [Hacker News thread](https://news.ycombinator.com/item?id=48314397) asks the short form, “What is ultracode mode?” A [Reddit thread](https://www.reddit.com/r/ClaudeCode/comments/1u5d69n/any_reason_not_to_use_ultracode/) asks whether there is a reason to leave it off. The answers below are the docs, not the comment threads.

Ultracode sits inside the [harness](/glossary/harness): the loop, tools, and permissions around the model. The part that decides the next step is [orchestration](/glossary/orchestration). The product page on this site is [Claude Code](/directory/claude-code).

## What does ultracode do in Claude Code?

With ultracode on, Claude writes a workflow script for a substantive task and a runtime runs that script in the background, while the session stays usable.

The workflows page defines a dynamic workflow as a JavaScript script that orchestrates many subagents at once. Claude writes the script for the task you describe. The runtime executes it. The page’s examples of work that fits are a codebase-wide bug sweep, a 500-file migration, a research question whose sources need cross-checking, and a plan drafted from several independent angles.

The same page says who holds the plan. With subagents, Claude decides turn by turn, and every intermediate result lands in Claude’s context window. A workflow script holds the loop, the branching, and the intermediate results, so Claude’s context holds the final answer. The scale row in that comparison says workflows run dozens to hundreds of agents per run. Subagents, on the same row, are a few delegated tasks per turn.

| | Subagents | A workflow ultracode plans |
| --- | --- | --- |
| Who decides what runs next | Claude, turn by turn | The script |
| Where intermediate results live | Claude’s context window | Script variables |
| Scale, in the docs’ words | A few delegated tasks per turn | Dozens to hundreds of agents per run |
| If you interrupt | Restarts the turn | Resumable in the same session |

That table is the “When to use a workflow” comparison on the workflows page, read November 9, 2026, cut to the four rows that answer what ultracode changes. The page also says a workflow can have independent agents review each other’s findings before they are reported.

One bundled command is separate from the setting. `/deep-research` is a built-in workflow. It runs when you invoke it. Ultracode is the switch that lets Claude plan a workflow without that kind of request.

## What is ultracode in Claude Code?

Ultracode is a Claude Code setting. The model-config page says it with this sentence: “Ultracode is a Claude Code setting rather than a model effort level.”

The effort table on that page, read November 9, puts `ultracode` on its own row, after `low`, `medium`, `high`, `xhigh`, and `max`. The row’s text is: “A Claude Code setting rather than a level: plans a dynamic workflow for each substantive task at any effort level.”

The settings reference describes the saved key the same way. `"ultracode": true` starts later sessions with ultracode on, when dynamic workflows are enabled and the model supports `xhigh` effort. The key does not change the session’s effort level. The default is unset, so ultracode is off. Claude Code reads the key and does not write it: `/effort ultracode` is the current session only.

The word itself has a date. Changelog v2.1.160, dated June 2, 2026, says the dynamic-workflow trigger keyword was renamed from `workflow` to `ultracode`. After that release, the word “workflow” no longer starts a run. Asking for a workflow in your own words still does.

## Is ultracode the same as max effort?

`max` and ultracode are different rows on the model-config effort table. `max` is the deepest reasoning level. ultracode is the workflow setting, and since v2.1.284 it can stay on at `low`, `medium`, `high`, `xhigh`, or `max`.

The changelog line for v2.1.284, September 28, 2026, is the one that changed the old behavior: “Changed Ultracode into its own toggle in `/effort` (Tab, or `/effort ultracode [on|off]`): it no longer forces xhigh effort and stays on at any effort level.” The same release notes an Ultracode on/off switch under the Effort slider in VS Code, and says the model pill shows “· Ultracode” at any effort level.

Two launch paths still set `xhigh` at the same time. The model-config page says `claude --effort ultracode` starts the session at `xhigh` with ultracode on. An Agent SDK `effortLevel: "ultracode"` value does the same pair of things. Passing `ultracode` to `--effort` or to that SDK value requires v2.1.203 or later. Before v2.1.203, the page says `--effort ultracode` printed `Unknown --effort value 'ultracode'` and the session started at the default effort.

Before v2.1.284, the model-config page says turning ultracode on set the session to `xhigh`, picking another level turned ultracode off, and an effort cap below `xhigh` made ultracode unavailable. The workflows page adds one error string from that older behavior: `/effort ultracode off` failed with `Invalid argument`.

Picking a level in the `/effort` slider or the `/model` picker, on the current page, leaves ultracode as it was. The saved `effortLevel` key and the `CLAUDE_CODE_EFFORT_LEVEL` environment variable do not accept the word `ultracode`. If either of those sets the level, ultracode stays on at that level.

## How do you turn ultracode on?

Type `/effort ultracode` for this session, press Tab on the Ultracode toggle in the `/effort` slider, or set `"ultracode": true` so later sessions start with it on. `claude --effort ultracode` is the launch form, and that one also sets effort to `xhigh`.

| Control, as the docs name it | What it covers | Effort level |
| --- | --- | --- |
| `/effort ultracode` | This session. v2.1.284 or later keeps it on at the current level | Leaves the level where it is |
| Tab on the `/effort` slider, then Enter | This session, same toggle | Leaves the level where it is |
| `"ultracode": true` in a settings file | Later sessions, when workflows are enabled and the model supports `xhigh` | Leaves the level where it is, on v2.1.284 or later |
| `claude --effort ultracode` | The session you just launched. Requires v2.1.203 or later | Sets the level to `xhigh` |
| Agent SDK `effortLevel: "ultracode"` | That SDK request. Requires v2.1.203 or later | Sets the level to `xhigh` |
| The word `ultracode` in a prompt you type | One workflow for that prompt. The session setting stays as it was | Does not change the session level |

The word in a prompt is a one-task opt-in. The workflows page says Claude Code highlights the keyword, and Claude writes a workflow for that task. Asking “use a workflow” or “run a workflow” is the same opt-in. The keyword works in a prompt you type at the interactive prompt, in an IDE extension panel, in a Remote Control client, or in an Agent SDK application that stamps the input as human. It does not start a workflow from `claude -p`, from an SDK prompt that is not stamped as human, from a scheduled task, or from a webhook or pull-request comment. Option+W on macOS, or Alt+W on Windows and Linux, dismisses the highlight for that prompt. The settings key `workflowKeywordTriggerEnabled` defaults to true. Set it to false to type the word without starting a run. In `/config` that key is labeled Ultracode keyword trigger.

Ultracode is unavailable in two cases the model-config page names: workflows are turned off, or the model does not support `xhigh` effort. In those cases `--effort ultracode` starts the session with ultracode off, at the highest effort level the model and any cap allow, up to `xhigh`. The effort table read November 11, 2026 puts Fable models on one row, with `low`, `medium`, `high`, `xhigh`, and `max`. The same page says Fable 5.2 defaults to `medium` and needs Claude Code v2.1.321 or later. Opus 5.5, Sonnet 5.5, Haiku 5.5, Opus 5, Sonnet 5, Opus 4.8, and Opus 4.7 share that five-level row. Opus 4.6 and Sonnet 4.6 list `low`, `medium`, `high`, and `max`. A reading of this table on November 9 did not name Fable 5.2. The November 11 reading does, as the Fable models row. Changelog v2.1.322, dated November 10, does not change the ultracode toggle.

[What is Claude Fable 5.2?](/blog/what-is-claude-fable-5-2) says ultracode is Claude Code’s own switch for planning a workflow, not a Fable 5.2 feature, and that this site did not retest the setting on the new model. The November 10 reading of Claude Code’s model configuration, in [How to use Claude Fable 5.2 in an agent harness](/blog/how-to-use-claude-fable-5-2-in-an-agent-harness), says `claude --effort ultracode` turns ultracode on and also sets the effort level to `xhigh`. That page lists `xhigh` among Fable 5.2’s levels (`low`, `medium`, `high`, `xhigh`, and `max`). Claude Code’s default effort for Fable 5.2 is `medium` until you set it, and the model needs Claude Code v2.1.321 or later.

## Which Claude plans include ultracode?

Dynamic workflows, which ultracode turns on, are on all paid plans, on the Anthropic API, and on Amazon Bedrock, Google Cloud’s Agent Platform, and Microsoft Foundry. On Pro, the workflows page says to turn them on from the Dynamic workflows row in `/config`.

Turning workflows off removes ultracode with them. The page lists three ways to turn workflows off for yourself: the Dynamic workflows toggle in `/config`, `"disableWorkflows": true` in `~/.claude/settings.json`, and `CLAUDE_CODE_DISABLE_WORKFLOWS=1` at startup. An organization can set the same `disableWorkflows` key in managed settings. When workflows are disabled, `/workflows` is unavailable, the `ultracode` keyword no longer starts a run, and the Ultracode toggle is removed from `/effort`. A run already in progress keeps going. The page also says no managed setting rules out ultracode by itself: wherever ultracode is available, `/effort ultracode` can turn it on. An effort cap lowers the effort level a session with ultracode on runs at, and does not turn ultracode off.

The product that these plans pay for is [Claude Code](/directory/claude-code). List prices for the plans are a different page, [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing). This note does not restate those prices.

## Does ultracode use more of your Claude plan?

Yes. The workflows page says each request uses more tokens and takes longer than the same request without a workflow, so a subscription session with ultracode on reaches a session or weekly limit sooner. It does not print a separate dollar price for the setting.

The cost section of that page says a single workflow run can use meaningfully more tokens than working through the same task in conversation, and that runs count toward the plan’s usage and rate limits. The gauge it recommends is a small slice first: one directory, or a narrow question. `/workflows` shows each agent’s token usage while the run is going, and the run can be stopped there.

The same page, read November 11, says what happens when an agent hits the claude.ai usage limit. The run pauses. Agents that hit the limit wait for the reset, no new agents start, and shortly after the reset the waiting agents continue. That pause requires Claude Code v2.1.271 or later, or v2.1.319 or later in the Desktop Code tab. On earlier versions, the affected agents fail.

Three checks are skipped while ultracode is on, because turning it on is already the opt-in to large runs:

- The `Large workflow` warning does not appear. That warning, when ultracode is off, shows if a workflow schedules more than 25 agents or its projected token total passes 1.5 million. The warning points at `/workflows` and does not pause the run.
- The session’s concurrent subagent limit is not enforced for subagents Claude spawns with the Agent tool.
- In auto permission mode, the first workflow launch is not an approval prompt.

The runtime caps still apply. The page lists up to 16 concurrent agents by default, fewer when fewer CPUs are available. `CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS` can set that from 1 to 256, and that variable requires v2.1.269 or later. One `parallel()` or `pipeline()` call accepts up to 4,096 items. The total is 1,000 agents per run.

A size guideline is advice to Claude about how many agents to aim for, not a cap. The values are unrestricted, small (fewer than 5), medium (fewer than 10), and large (fewer than 50). The default is medium, or small on a Pro plan with v2.1.271 or later.

The Reddit question, any reason to leave ultracode off, has this answer in the docs and no other answer on this page. The setting applies to every substantive task in the session. Routine work pays the extra tokens too. `/effort ultracode off` is how the workflows page says to return to routine work.

## How do you turn ultracode off?

Run `/effort ultracode off`. On v2.1.284 and later, that turns the setting off for the current session and leaves the effort level where it is. If `"ultracode": true` is in a settings file, the off command lasts for one session.

To stop workflows entirely, use the Dynamic workflows toggle or `"disableWorkflows": true`, as the previous section quotes. That also removes the Ultracode toggle.

The approval prompt on a workflow is a different switch. In the CLI, the per-run prompt can offer “Yes, and don’t ask again” for a bundled, saved, or plugin workflow run by name, and the workflows page says that option is not offered for a script Claude wrote for the current task. With ultracode on, auto mode skips the first-launch prompt. That prompt option is not the saved Bash rule covered in the permissions docs. The public GitHub copies of that saved Bash rule are counted in [Did Claude Code leak secrets to GitHub?](/blog/claude-code-dont-ask-again). The harness around either choice is the longer guide, [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness).

## FAQ

### What does ultracode do in Claude Code?

It plans a dynamic workflow for each substantive task in the session. The workflows page, read November 11, 2026, says Claude writes a JavaScript script, a runtime runs the subagents in the background, and the session stays responsive. One request can become several workflows in a row. `/effort ultracode` turns that behavior on for the current session.

### What is ultracode in Claude Code?

A Claude Code setting. The model-config page says it is a setting rather than a model effort level, and the effort table says it plans a dynamic workflow for each substantive task at any effort level.

### Is ultracode the same as max effort?

The model-config table lists them on separate rows. `max` is the deepest reasoning level. ultracode is the workflow setting. Since changelog v2.1.284 on September 28, 2026, `/effort ultracode` leaves the effort level where it is. `claude --effort ultracode` is the form that also sets the level to `xhigh`.

### How do you turn ultracode on?

`/effort ultracode`, Tab on the slider’s Ultracode toggle, or `"ultracode": true` for later sessions. `claude --effort ultracode` turns it on and sets effort to `xhigh`. On Pro, turn Dynamic workflows on in `/config` first.

### Does ultracode cost extra?

The workflows page prints no separate price. It says each request uses more tokens and takes longer, and that a subscription draws those tokens from the plan’s usage limits, so a session or weekly limit arrives sooner. The plan prices are [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing).

### How do you turn ultracode off?

`/effort ultracode off` on Claude Code v2.1.284 or later. Turning dynamic workflows off removes the toggle as well.

### Can you use ultracode with Claude Fable 5.2?

Ultracode is a Claude Code setting, not a Fable 5.2 feature, and this site did not retest it on that model. The model-configuration page read November 11, 2026 puts Fable models on one effort row: `low`, `medium`, `high`, `xhigh`, and `max`. Fable 5.2 defaults to `medium` and needs Claude Code v2.1.321 or later. `claude --effort ultracode` turns ultracode on and also sets the effort level to `xhigh`. The November 10 reading quoted in [How to use Claude Fable 5.2 in an agent harness](/blog/how-to-use-claude-fable-5-2-in-an-agent-harness) said the same about the flag. What the model is, separate from this setting, is [What is Claude Fable 5.2?](/blog/what-is-claude-fable-5-2).
