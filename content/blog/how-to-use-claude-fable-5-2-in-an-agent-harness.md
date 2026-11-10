---
title: "How to Use Claude Fable 5.2 in an Agent Harness"
absoluteTitle: true
description: "Point the harness at claude-fable-5-2. The Messages API defaults to high effort; Claude Code defaults Fable 5.2 to medium until you set it, and the model needs Claude Code v2.1.321 or later. A turn of 50,000 input tokens and 15,000 output tokens is $1.00 at the $8 and $40 rates."
takeaways:
  - "The model id is claude-fable-5-2. Claude Code needs v2.1.321 or later. The fable alias resolves to Fable 5.2 except in Claude apps gateway sessions, where it resolves to Fable 5 unless you set ANTHROPIC_DEFAULT_FABLE_MODEL."
  - "The Messages API default effort is high, set with output_config.effort. Claude Code’s default for Fable 5.2 is medium. An Agent SDK session that omits effort follows Claude Code’s default, so set effort to high when you want the API default."
  - "At the rates read November 10, 2026, 50,000 input tokens and 15,000 output tokens cost $1.00. The same shape on Claude Opus 5.5 is $0.50. A 400,000-input turn stays at $8 and $40 on Fable and moves to $20 and $75 on GPT-6 Astra."
date: "2026-11-10"
updated: "2026-11-10"
category: guide
topics:
  - harnesses
  - how-agents-work
  - tools-saas
  - task-performance
audience:
  - builders
  - everyone
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
sources:
  - title: "Anthropic, What's new in Claude Fable 5.2 (read November 10, 2026)"
    url: "https://platform.claude.com/docs/en/models/fable-5-2/whats-new-fable-5-2"
  - title: "Anthropic, Claude Fable 5.2 migration guide (read November 10, 2026)"
    url: "https://platform.claude.com/docs/en/models/fable-5-2/migration-guide"
  - title: "Anthropic, Effort (read November 10, 2026)"
    url: "https://platform.claude.com/docs/en/build-with-claude/effort"
  - title: "Anthropic, Prompting Claude Fable 5.2 (read November 10, 2026)"
    url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2"
  - title: "Anthropic, Claude API pricing (read November 10, 2026)"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
  - title: "Anthropic, Claude Fable 5.2 model overview (read November 10, 2026)"
    url: "https://platform.claude.com/docs/en/models/fable-5-2/overview"
  - title: "Claude Code, Model configuration (read November 10, 2026)"
    url: "https://code.claude.com/docs/en/model-config"
  - title: "Claude Code, Agent SDK configuration (read November 10, 2026)"
    url: "https://code.claude.com/docs/en/agent-sdk/configuration"
  - title: "Claude Code, Agent SDK TypeScript reference (read November 10, 2026)"
    url: "https://code.claude.com/docs/en/agent-sdk/typescript"
  - title: "Claude Code, Connect to external tools with MCP (read November 10, 2026)"
    url: "https://code.claude.com/docs/en/agent-sdk/mcp"
  - title: "OpenAI, GPT-6 Astra model page (read November 10, 2026)"
    url: "https://developers.openai.com/api/docs/models/gpt-6-astra"
faq:
  - question: "How do you use Claude Fable 5.2 in an agent harness?"
    answer: "Set the model to claude-fable-5-2. On the Messages API, effort defaults to high and is set with output_config.effort. In Claude Code, run claude --model fable --effort high on v2.1.321 or later, because Claude Code’s own default for Fable 5.2 is medium. In the Claude Agent SDK, pass model and effort on the query options. Keep the system prompt, tools, and earlier messages unchanged for the whole conversation, or the API returns a 400 on the thinking block."
  - question: "What Claude Code version runs Claude Fable 5.2?"
    answer: "Claude Code’s model configuration page, read November 10, 2026, says Fable 5.2 requires v2.1.321 or later. Fable 5.1 requires v2.1.257 or later. The fable alias resolves to Fable 5.2 everywhere except Claude apps gateway sessions, where it resolves to Fable 5 unless ANTHROPIC_DEFAULT_FABLE_MODEL is set. In a gateway session that serves Fable 5.2, select it with /model claude-fable-5-2."
  - question: "What is the default effort for Claude Fable 5.2?"
    answer: "The Messages API default is high. Claude Code’s model configuration page says Fable 5.2 defaults to medium, and that an organization default for the organization default model wins when you run that model. The Agent SDK effort option defaults to unset, and an unset session follows Claude Code’s resolution order. Set effort to high on the SDK options when the session should match the API default. The levels are low, medium, high, xhigh, and max."
  - question: "How much does a Claude Fable 5.2 agent turn cost?"
    answer: "At the November 10, 2026 list price, 50,000 input tokens and 15,000 output tokens cost $1.00. Cache reads of those input tokens cost $0.20 per million instead of $8. The same 50,000 and 15,000 tokens on Claude Opus 5.5 cost $0.50. A turn with 400,000 input tokens and 20,000 output tokens costs $4.00 on Fable and $9.50 on GPT-6 Astra, because Astra prices the whole request at $20 and $75 once input passes 272,000 tokens. These are list-price arithmetic, not a measured coding task."
  - question: "Which API changes break an existing harness?"
    answer: "Four, from the what’s-new page read November 10, 2026. Editing anything before a thinking block returns a 400 on every account unless you opt into dropping the block. Only Fable 5.2 and Mythos 5.2 read Fable 5.2 thinking blocks. Declaring the older computer_20251124 tool returns a 400 everywhere except Amazon Bedrock. A Fable 5.2 executor accepts only a Fable 5.2 or Mythos 5.2 advisor. Claude Code, the Claude app, Claude Managed Agents, and the Claude Agent SDK already build the request, so the prefix check does not add a step when they own the messages array."
  - question: "How do you attach an MCP server to a Fable 5.2 agent?"
    answer: "Pass mcpServers on the Agent SDK query options, or add a project .mcp.json and load the project setting source. MCP tool names look like mcp__github__list_issues. The server can call a tool only after allowedTools names it, for example mcp__docs__*. strictMcpConfig set to true ignores project files, user settings, plugins, and claude.ai connectors and uses only the servers you passed."
  - question: "Can Claude Fable 5.2 run with zero data retention?"
    answer: "The migration guide, read November 10, 2026, says Fable 5.2 and Mythos 5.2 require 30-day data retention and are unavailable under zero data retention unless Anthropic has expressly authorized it. On the Claude API, a request from an organization or workspace without 30-day retention returns a 400 invalid_request_error. The November 9 announcement says Enterprise Frontier Safeguards, a private beta, runs safety monitoring on data stored in the customer’s infrastructure so zero data retention can still apply."
---

Set the model to `claude-fable-5-2`, keep every earlier turn byte-for-byte, and decide the effort before you compare the bill with Claude Opus 5.5. On the Messages API the effort default is `high`. In Claude Code the default for this model is `medium`, and the binary has to be v2.1.321 or later. A single turn of 50,000 input tokens and 15,000 output tokens is $1.00 at the $8 and $40 rates read on November 10, 2026. The same token counts on Opus 5.5 are $0.50.

That is the whole switch for a [harness](/glossary/harness) that already speaks the Claude API. The rest of this page is which flag sets the id, which requests return a 400, how [MCP](/glossary/model-context-protocol) tools get permission, and what a longer loop costs when the cache hits. What the model is, and the 1,000-agent run from the same day, is [What is Claude Fable 5.2?](/blog/what-is-claude-fable-5-2). How the scores compare with GPT-6 Astra, Opus 5.5, and Gemini 4 Carbon is [Claude Fable 5.2 vs GPT-6 Astra for coding agents](/blog/claude-fable-5-2-vs-gpt-6-astra). [Claude](/directory/claude) is the product. [Claude Code](/directory/claude-code) and the [Claude Agent SDK](/directory/claude-agent-sdk) are the two harnesses Anthropic ships. The wider list is [Best AI agent harness](/best/ai-agent-harnesses).

AI Agents Info read the what’s-new page, the migration guide, the effort page, the prompting page, the pricing page, the model overview, and the Claude Code model, Agent SDK, and MCP pages on November 10, 2026. This page did not run an agent.

## How do you select Claude Fable 5.2?

Use the id for the platform that bills you. The what’s-new page, read November 10, lists one name per host.

| Host | Model id |
| --- | --- |
| Claude API | `claude-fable-5-2` |
| Amazon Bedrock | `anthropic.claude-fable-5-2` |
| Claude Platform on AWS | `claude-fable-5-2` |
| Claude on Google Cloud, Anthropic-managed or Google-managed | `claude-fable-5-2` |
| Microsoft Foundry, on Anthropic infrastructure | `claude-fable-5-2` |
| Microsoft Foundry fast mode | `claude-fable-5-2-fast` |

Mythos 5.2 uses the same pattern with `claude-mythos-5-2` and `anthropic.claude-mythos-5-2`. It is limited to organizations in Anthropic’s verification programs. Fast mode on Fable doubles the token rates to $16 and $80 per million and, on the November 9 announcement, speeds token generation by up to 2.5 times. The announcement lists fast mode on Claude Code, the Claude Platform, both Google Cloud hosts, and Anthropic-hosted Microsoft Foundry.

The overview says the model is active, released November 9, 2026, and not retiring sooner than November 9, 2027. Context is 1 million tokens. Max output on the synchronous Messages API is 128,000 tokens. Adaptive thinking stays on. Sampling fields `temperature`, `top_p`, and `top_k` are omitted. The migration guide says prefilling the assistant message returns a 400, and that Priority Tier does not support either Fable 5.2 or Mythos 5.2.

## How do you set it in Claude Code?

Update the app, then name the model. Claude Code’s [model configuration page](https://code.claude.com/docs/en/model-config), read November 10, says Fable 5.2 requires v2.1.321 or later. An older binary that asks for the model fails. The page says to run `claude update`.

No Fable model is the account-type default on any plan or provider. Select it:

```bash
claude update
claude --model fable --effort high
```

Inside a session, `/model fable` switches immediately. `/effort high` sets the level. The `fable` alias resolves to Fable 5.2 everywhere except Claude apps gateway sessions, where it resolves to Fable 5 unless `ANTHROPIC_DEFAULT_FABLE_MODEL` is set. A gateway that is not configured to serve `claude-fable-5-2` rejects that id. In a gateway session that does serve it, run `/model claude-fable-5-2`.

The model configuration page lists the controls in this order: `/model` during a session, then `claude --model`, then `ANTHROPIC_MODEL`, then the `model` field in settings, then `ANTHROPIC_DEFAULT_MODEL` for new sessions. `ANTHROPIC_DEFAULT_MODEL` requires Claude Code v2.1.236 or later. Typing `/model fable` behaves like Enter in the picker, which switches and saves the choice. Press `s` on the picker’s row to switch for this session only. With the `-p` flag, `/model` applies to the current session only and needs Claude Code v2.1.205 or later. The page says project and managed settings still take precedence and reapply on the next launch, and an organization default configured to override user selection does too. A settings file can pin the id:

```json
{
  "model": "claude-fable-5-2"
}
```

Effort is a second stack. The same page takes the first source that applies: `CLAUDE_CODE_EFFORT_LEVEL`, then a level you pick in the session with `/effort`, the `/model` picker, or `applyFlagSettings()`, then launching with `--effort`, then the level saved for that model, then the model’s default. For Fable 5.2 that default is `medium`. The Messages API default is `high`. A Claude Code session is on medium until one of those earlier sources sets it. `--effort high` is the launch flag that matches the API default. Setting `CLAUDE_CODE_EFFORT_LEVEL` to `auto` or `unset` sends no effort level, and the page says the API default then applies, which for this model is `high`. A top-level `effortLevel` in a user settings file does not apply to Opus 5.5 or to models released after it. Fable 5.2 starts at its own default until you choose a level. A top-level `effortLevel` in project, local, or managed settings, or one passed with `--settings`, applies to every model. `claude --effort ultracode` is a different switch: it turns ultracode on and also sets the level to `xhigh`. Ultracode itself is a Claude Code workflow setting. What it does is [What does ultracode do in Claude Code?](/blog/what-does-ultracode-do-in-claude-code).

On Pro or Max, a saved `claude-fable-5-1` in user settings moves to the `fable` alias the first time you run v2.1.321 or later. Team and Enterprise wait for the organization’s settings, and the move can come later or not at all. Console accounts, third-party providers, and project, local, or managed settings keep `claude-fable-5-1`. After a move, the session starts at Fable 5.2’s Claude Code default effort unless you have saved a level for it.

Two billing prompts are part of the harness, not the model. Depending on plan and seat, Fable can bill usage credits instead of the included allowance, and the `/model` picker then says “Requires usage credits.” In a background session, a Remote Control session, or a teammate session, Claude Code holds the mid-session consent prompt for the `dialogExpiry` deadline, five minutes by default. If nobody answers, it ends the turn without sending the request. In non-interactive `-p` mode, and in an Agent SDK app that does not show the prompt, a Fable request that would bill to usage credits is billed without asking.

Zero data retention is a hard stop on this model. The model configuration page points at the availability note, and the migration guide says a Claude API request from an organization or workspace without 30-day retention returns a 400 `invalid_request_error`. When the organization cannot use Fable, the picker row stays and is grayed out.

## How do you set it in the Claude Agent SDK?

Pass `model` and `effort` on the options object. The [configuration page](https://code.claude.com/docs/en/agent-sdk/configuration) says a session with neither, and with no settings or environment model, starts on Claude Code’s default model. The TypeScript `effort` option accepts `low`, `medium`, `high`, `xhigh`, and `max`, and its default is unset. Unset follows Claude Code, whose Fable 5.2 default is `medium`. Set `high` when the session should match the API.

`fallbackModel` is the backup for an overloaded or unavailable primary. It is a different mechanism from the safety-classifier fallback described later. In TypeScript, a fallback equal to `model` throws at startup. The primary is retried at the start of each user turn.

`maxBudgetUsd` stops the query when the client-side cost estimate reaches that many dollars. The reference says the estimate can pass the value, so leave headroom, and that spend restored from a resumed session does not count. `0` is rejected and the session never runs. `maxTurns` of `0` means no turn limit, the same as leaving it unset. A cap ends the run with subtype `error_max_budget_usd` or `error_max_turns`.

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Fix the failing test in this repo and stop when it passes.",
  options: {
    model: "claude-fable-5-2",
    effort: "high",
    fallbackModel: "claude-opus-5-5",
    maxBudgetUsd: 5,
    maxTurns: 30,
    cwd: "/path/to/repo",
    allowedTools: ["Read", "Glob", "Grep", "Bash", "mcp__docs__*"],
    mcpServers: {
      docs: {
        type: "http",
        url: "https://code.claude.com/docs/mcp",
      },
    },
  },
})) {
  if (message.type === "result" && message.subtype === "success" && !message.is_error) {
    console.log(message.result);
  }
}
```

The shape of `query()`, `fallbackModel`, `maxBudgetUsd`, `maxTurns`, `allowedTools`, and `mcpServers` is the configuration and MCP pages, read November 10. The prompt and the paths are this guide’s example. Point `cwd` at a real checkout before you run it. `allowedTools` pre-approves the names. It does not limit the session to those tools. Unlisted tools fall through to the permission mode. The `tools` option is the list that decides what is loaded, or `{ type: "preset", preset: "claude_code" }` for Claude Code’s set.

Subagents are where the bill surprises people. The what’s-new page says that in a coding product whose prompts invite delegation, Fable delegates readily, and subagents can be a large share of the session cost. An `AgentDefinition` can pin `model` to `fable`, `opus`, `sonnet`, `haiku`, `inherit`, or a full id, and can pin `effort`. When `model` is omitted, Claude Code picks the model in its subagent order. The prompting page says Fable 5.2, at `xhigh` and `max`, has been observed using subagents to review its own work, which Fable 5.1 did not do on the same tasks. Put the cheaper model on the subagent when the parent is already Fable.

`thinking` on the SDK options defaults to `{ type: "adaptive" }` for models that support it. That matches Fable, where adaptive thinking cannot be turned off. `maxThinkingTokens` is marked deprecated on the reference, in favor of `thinking`. A `temperature` or `top_p` field is not on the options object. The configuration page says to set effort or a spend cap, or to call the Messages API when you need those parameters. On Fable, the migration guide says those sampling parameters return a 400 anyway.

Changing model mid-session with `setModel()` uses a new prompt cache. The configuration page says each model has its own cache, so the next request recomputes the conversation at the new model’s rates. A router that falls from Fable 5.2 to Opus 5.5 also drops Fable’s thinking blocks. The request succeeds. The dropped blocks are not billed. The safety fallback targets the what’s-new page names are Claude Opus 4.8 and Claude Opus 5, which is a third path, separate from `fallbackModel`.

## How do you call it from the Messages API?

Send the id and, when you want to be explicit, the effort. Anthropic’s [effort page](https://platform.claude.com/docs/en/build-with-claude/effort) sets `output_config.effort`. With no value, the model default applies, and for Fable 5.2 that default is `high`. The curl example on that page sends `anthropic-version: 2026-10-21`. This snippet uses the same header and the Fable id.

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2026-10-21" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-fable-5-2",
    "max_tokens": 16000,
    "messages": [{
      "role": "user",
      "content": "Summarize the failing test and name the file to open next."
    }],
    "output_config": {
      "effort": "high"
    }
  }'
```

`max_tokens` is a hard cap on total output, thinking plus the visible reply. The effort page says to set a large `max_tokens` at high and above. Effort changes thinking, tool calls, and reply text. It barely changes how long the visible reply is. Lower the level to spend less. A line in the prompt that says “answer directly without deliberating” did not stop the model at `medium` and above, in Anthropic’s testing on the prompting page.

The levels, from that page: `low` for subagents and other high-volume turns, `medium` for interactive coding, `high` for hard coding and long unattended runs, `xhigh` where you have measured a gain on a long coding or agent job, `max` for a ceiling measurement or a task where time and tokens do not matter. On Anthropic’s internal coding evals, `xhigh` raised scores slightly and used many more tokens. The step from `medium` to `high` raised scores on most of the coding and knowledge-work evals they track, and used more tokens and more time.

Per-message effort, so a long run can drop to `low` for a side question and keep the prompt cache, uses a `role: "system"` message with `output_config.effort` and the beta header `mid-conversation-output-config-2026-07-01`. The prompting page says that where per-message effort is unavailable, a new top-level effort on the next request starts the cache over.

Four changes from Fable 5.1 are the ones that return an error or drop reasoning. The long version is the [overview on this site](/blog/what-is-claude-fable-5-2). The setup version is:

1. Append messages. Send each assistant turn back exactly as the API returned it, and keep `system` and `tools` fixed. Anything else makes the thinking block fail the prefix check. The 400 says the block is bound to a different conversation. On Fable 5.1 that error was limited to accounts created on or after August 31, 2026. On Fable 5.2 it applies to every account. The prompting page adds a split the overview states more briefly: the Messages API rejects the request, and the Message Batches API drops the blocks. To drop them on the Messages API too, send beta header `thinking-binding-controls-2026-08-01` and set `thinking.block_binding.prefix_mismatch_behavior` to `drop_block`. Anthropic’s testing found that dropping earlier thinking on every turn made the model think again and spend more output tokens.
2. Stay on Fable 5.2 or Mythos 5.2 if later turns need those thinking blocks. Opus 5.5 can hand its blocks to Fable. Fable’s blocks do not survive a handoff to Opus.
3. Declare computer use as the `computer_toolset_20260801` toolset. `computer_20251124` returns a 400 `invalid_request_error` on every platform except Amazon Bedrock.
4. If the executor is Fable 5.2, the advisor tool’s model has to be `claude-fable-5-2` or `claude-mythos-5-2`. Change it in a new conversation. Changing `tools` is an edit, and the prefix check then fails on the old transcript.

`tool_choice` of `any` or `tool` returns a 400. Leave it on `auto`. Where structured outputs are available, set strict tool use. Organizations with customer-managed encryption keys do not get structured outputs on these two models. The migration guide says to remove `strict: true` and `output_config.format` there and validate in your own code.

Two betas keep a long run append-only, which is what the prefix check requires. Compaction on demand uses header `compact-2026-09-04`. Mid-conversation tool changes use header `inline-tools-2026-09-15` on the Claude API, Claude Platform on AWS, and Anthropic-managed Claude on Google Cloud. The glossary name for the summary step is [context compaction](/glossary/context-compaction).

A refusal is HTTP 200 with `stop_reason` set to `refusal`. The prompting page lists `stop_details.category` values `cyber`, `bio`, `frontier_llm`, `reasoning_extraction`, and `general_harms`. Prompts that ask the model to write its reasoning into the reply text are the `reasoning_extraction` case. The page says to remove those lines and read thinking blocks with `display` set to `summarized` instead. Progress updates between tool calls come back as thinking blocks, and at the default `thinking.display` of `omitted` their text is empty. A client that renders only text blocks looks silent. The beta header for updates is `thinking-display-updates-2026-08-18`.

## How do you connect MCP tools?

Name the server on the SDK options, then allow the tool names. The [MCP page](https://code.claude.com/docs/en/agent-sdk/mcp), read November 10, says that without permission the model can see the tools and cannot call them.

Tool names are `mcp__<server>__<tool>`. Dots and spaces in the server key become underscores, so a key `my.server` and a tool `list_issues` is `mcp__my_server__list_issues`. A wildcard such as `mcp__docs__*` allows every tool from that server. `disallowedTools` accepts `mcp__server__*` to remove a server and `mcp__*` to remove every MCP tool.

A project file works when the `project` setting source is on, which it is for default `query()` options. If you set `settingSources` yourself, include `"project"` or the file is skipped.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/repo"]
    }
  }
}
```

`strictMcpConfig: true` uses only the servers in `mcpServers` and ignores the project file, user settings, plugin servers, and claude.ai connectors. Pass secrets on the server’s `env` field. The SDK page shows that field for tokens. This guide does not put a live token in the example.

In-process tools use `createSdkMcpServer()` in TypeScript and `create_sdk_mcp_server()` in Python, from the language references. An SDK server registered by an `initialize` control request starts connecting as soon as Claude Code processes the request.

This site’s own read-only directory server is a different MCP endpoint, at [`/mcp`](/mcp). It searches the catalog. It is not a tool inside your Fable session unless you add it yourself.

## What does a task cost?

The list price is $8 per million input tokens and $40 per million output tokens. Cache reads are $0.20. A 5-minute cache write is $10 and a 1-hour write is $16. Batch processing is $4 and $20. Fast mode is $16 and $80. US-only inference via `inference_geo` is 1.1 times every token category, for Claude 4.6 and later models. The pricing page’s FAQ says Claude 4.7 and later models produce about 30 percent more tokens for the same text than earlier models. Fable uses the tokenizer introduced with Opus 4.7, so a prompt you sized on an older Claude is a low count. Count tokens with the token-counting endpoint and this model id before you trust a budget.

The figures below are arithmetic on those rates for token counts this page chose. They are not a measured coding task, and they do not add a thinking-token estimate, because the pricing page does not print a separate thinking rate. The effort page says thinking, when it is active, is part of the output the effort setting changes, and `max_tokens` caps thinking plus the visible reply together. Put the thinking tokens you actually observe into the output side of the sum.

Anthropic’s own Opus worked example uses 50,000 input tokens and 15,000 output tokens. The same counts at Fable’s rates:

| Line, 50,000 input and 15,000 output | USD |
| --- | --- |
| Claude Fable 5.2, standard | $1.00 |
| Claude Fable 5.2, batch, half off | $0.50 |
| Claude Fable 5.2, fast mode | $2.00 |
| Claude Opus 5.5, standard | $0.50 |
| GPT-6 Astra, prompt at or under 272,000 input tokens | $1.25 |

Forty of the standard Fable turns a day, with nothing cached, for 30 days, is 1,200 turns and $1,200. The same schedule on batch rates is $600. On fast mode it is $2,400. That schedule is an illustration of the sticker. A real session’s thinking and tool results move the total. The [AI agent cost calculator](/agent-cost-calculator) multiplies your own counts by the standard rate. It leaves cache, batch, and fast mode out. The calculator’s Fable 5.2 row is the $8 and $40 price. Anthropic’s tool-use table, read November 10, does not list a tool-use system-prompt token count for Fable 5.2, so none is added. The same page does list 325 extra input tokens for the bash tool definition on Claude 4.7 and later models.

A long turn, 400,000 input tokens and 20,000 output tokens, is where Astra’s step matters:

| Line, 400,000 input and 20,000 output | USD |
| --- | --- |
| Claude Fable 5.2 | $4.00 |
| Claude Opus 5.5 | $2.00 |
| GPT-6 Astra, whole request at the long-context rate | $9.50 |

Cache arithmetic for 80,000 repeated input tokens on Fable, using the pricing page’s rule that a cache write replaces the base input charge on those tokens: sending them twice with no cache is $1.28. A 5-minute write ($0.80) plus one read ($0.016) is $0.816. The page’s general rule is that a 5-minute write, at 1.25 times base input, pays off after one read, and a 1-hour write, at 2 times base, pays off after two reads. Fable’s read rate is 0.025 times base, which is why the read is $0.016 rather than 10 percent of $8. New tokens and output tokens on each turn are extra. They are not inside that 80,000.

Claude Managed Agents add a session-runtime line the token table does not include: $0.08 per hour while the session status is `running`, metered to the millisecond. Idle time is not billed. The pricing page’s worked example is an Opus session. The runtime rate is the SKU, independent of that example’s token prices. Batch discount and partner-cloud pricing do not apply to Managed Agents sessions, on that page.

Anthropic’s FrontierCode chart says Fable at High effort costs roughly half as much per task as Opus at its best score, for a similar accuracy. That claim includes whatever thinking and tools the eval spent. It is not the $1.00 figure above, and the token counts are not printed. Re-run your evals, including an effort sweep that starts at `high`, before you switch a production harness. How to build that eval is [How to build an eval harness for AI agents](/blog/how-to-build-an-eval-harness-for-ai-agents).

## What should you check before you leave it running?

The prompting page’s migration order is the checklist. Set effort to `high` explicitly, then run the same evals at `medium` and `xhigh`. Read the system prompt, skills, agent files, memory, and notes you are carrying over. Run the longest task and write down where the model stops early, asks for an approval it does not need, goes quiet, delegates too much, or patches around a problem instead of merging the fix. Change one of those and measure tokens again.

The behaviors that page measured, so you know what “fixed” cost:

- On long tasks the model more often ends a turn early at `low` and `medium`, with a list of what remains. Anthropic’s text that tells it to finish, replayed at medium effort, cut sessions that ended with doable work left to about half, and raised output tokens by about 30 percent. Endings that list what remains and then stop mostly stayed. Keep your own confirmation step for risky or irreversible actions. The full paragraph they tested is on the prompting page. This guide does not reprint it.
- A prompt that says the codebase is the model’s own made the model merge repeated code in about half of small-task tries, against under a tenth without the sentence, and used about 1.5 times the output tokens. A nearby rule against drive-by refactors did not cancel it. Leave the sentence out when you want the smallest diff.
- At high and above, the model thinks before almost every reply, including a greeting. Move easy turns to a lower effort. The prompt cannot talk the model out of that thinking at medium and above.
- Standing “delegate” lines in skills and agent files are worth deleting if subagents dominate the bill. On short tasks, a tool description that led with cost cut delegation by about a third, with the same task success, in Anthropic’s testing.
- A token budget written into the prompt changed how much the model spent. On coding tasks at high and xhigh, removing a large budget lowered cost with equivalent performance, in that testing. The finding is about text in the prompt. The API’s `taskBudget` option is a separate beta, and the prompting page says that testing did not cover it.
- Notes carried in memory can block retries. One “never retry” note among a dozen, with nothing in the prompt that allowed retries, dropped retries after a busy tool from nearly all tries to about four in ten. Naming the safe retries in the rule itself worked. A general instruction to act more freely did not.
- Instructions to write the chain of thought into the reply are a refusal risk under `reasoning_extraction`. Read the thinking blocks instead.

The what’s-new page also says the model follows style rules closely, so a hard sentence-length cap can make the prose choppy, and that lines about who owns the code change whether it reports a nearby problem or fixes it. Review the diff, not only the closing summary. The ownership testing found the summary named the larger changes and often left out the small ones.

Then watch the account. Thinking blocks work in the account that produced them, or a linked account. Another account’s request succeeds and the blocks are dropped. With the thinking-binding beta header, the drop shows up in `input_transformations` with reason `organization_binding_mismatch`.

If the harness is still on Opus and the eval passes, stay there. The announcement’s instruction is to move up only when the harder effort still misses. The comparison of the published scores is the [Fable versus Astra guide](/blog/claude-fable-5-2-vs-gpt-6-astra). How to judge the harness you actually run is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness).

## FAQ

### How do you use Claude Fable 5.2 in an agent harness?

Set the model to `claude-fable-5-2`. On the Messages API, effort defaults to `high` and is set with `output_config.effort`. In Claude Code, run `claude --model fable --effort high` on v2.1.321 or later, because Claude Code’s own default for Fable 5.2 is `medium`. In the Claude Agent SDK, pass `model` and `effort` on the query options. Keep the system prompt, tools, and earlier messages unchanged for the whole conversation, or the API returns a 400 on the thinking block.

### What Claude Code version runs Claude Fable 5.2?

Claude Code’s model configuration page, read November 10, 2026, says Fable 5.2 requires v2.1.321 or later. Fable 5.1 requires v2.1.257 or later. The `fable` alias resolves to Fable 5.2 everywhere except Claude apps gateway sessions, where it resolves to Fable 5 unless `ANTHROPIC_DEFAULT_FABLE_MODEL` is set. In a gateway session that serves Fable 5.2, select it with `/model claude-fable-5-2`.

### What is the default effort for Claude Fable 5.2?

The Messages API default is `high`. Claude Code’s model configuration page says Fable 5.2 defaults to `medium`, and that an organization default for the organization default model wins when you run that model. The Agent SDK `effort` option defaults to unset, and an unset session follows Claude Code’s resolution order. Set `effort` to `high` on the SDK options when the session should match the API default. The levels are `low`, `medium`, `high`, `xhigh`, and `max`.

### How much does a Claude Fable 5.2 agent turn cost?

At the November 10, 2026 list price, 50,000 input tokens and 15,000 output tokens cost $1.00. Cache reads of those input tokens cost $0.20 per million instead of $8. The same 50,000 and 15,000 tokens on Claude Opus 5.5 cost $0.50. A turn with 400,000 input tokens and 20,000 output tokens costs $4.00 on Fable and $9.50 on GPT-6 Astra, because Astra prices the whole request at $20 and $75 once input passes 272,000 tokens. These are list-price arithmetic, not a measured coding task.

### Which API changes break an existing harness?

Four, from the what’s-new page read November 10, 2026. Editing anything before a thinking block returns a 400 on every account unless you opt into dropping the block. Only Fable 5.2 and Mythos 5.2 read Fable 5.2 thinking blocks. Declaring the older `computer_20251124` tool returns a 400 everywhere except Amazon Bedrock. A Fable 5.2 executor accepts only a Fable 5.2 or Mythos 5.2 advisor. Claude Code, the Claude app, Claude Managed Agents, and the Claude Agent SDK already build the request, so the prefix check does not add a step when they own the messages array.

### How do you attach an MCP server to a Fable 5.2 agent?

Pass `mcpServers` on the Agent SDK query options, or add a project `.mcp.json` and load the project setting source. MCP tool names look like `mcp__github__list_issues`. The server can call a tool only after `allowedTools` names it, for example `mcp__docs__*`. `strictMcpConfig` set to true ignores project files, user settings, plugins, and claude.ai connectors and uses only the servers you passed.

### Can Claude Fable 5.2 run with zero data retention?

The migration guide, read November 10, 2026, says Fable 5.2 and Mythos 5.2 require 30-day data retention and are unavailable under zero data retention unless Anthropic has expressly authorized it. On the Claude API, a request from an organization or workspace without 30-day retention returns a 400 `invalid_request_error`. The November 9 announcement says Enterprise Frontier Safeguards, a private beta, runs safety monitoring on data stored in the customer’s infrastructure so zero data retention can still apply.
