---
title: "Claude Fable 5.2 vs GPT-6 Astra for Coding Agents"
absoluteTitle: true
description: "Claude Fable 5.2 leads Anthropic’s November 9, 2026 coding-agent table: 49.1% on FrontierCode 2.0 at Xhigh effort and 69.9% on FrontierSWE v2, ahead of GPT-6 Astra and Claude Opus 5.5. Opus 5.5 costs half as much per token, and Anthropic still says to start most coding there. Gemini 4 Carbon leads AutomationBench and has no id on the Gemini API model list read November 10."
takeaways:
  - "On Anthropic’s November 9, 2026 table, Claude Fable 5.2 scores 49.1% on FrontierCode 2.0 at Xhigh effort and 69.9% on FrontierSWE v2. GPT-6 Astra scores 42.8% and 65.5%. Claude Opus 5.5 scores 45.5% and 62.3%. Gemini 4 Carbon scores 41.1% at Medium effort and 61.2%."
  - "The same announcement says Fable 5.2 at High effort scores 45.3% on FrontierCode 2.0, about level with Opus 5.5’s best 45.5%, for roughly half the cost per task. The token sticker is the other direction: Fable is $8 and $40 per million tokens, Opus is $4 and $20."
  - "A prompt over 272,000 input tokens keeps Fable 5.2 at $8 and $40. GPT-6 Astra’s model page prices that whole request at $20 and $75. Gemini 4 Carbon’s October 28 announcement prices it at $2 and $10 to start, and the Gemini API model list read November 10 does not include a Carbon id."
date: "2026-11-10"
updated: "2026-11-10"
category: guide
topics:
  - harnesses
  - task-performance
  - how-agents-work
  - tools-saas
audience:
  - everyone
  - builders
companies:
  - anthropic
  - claude
  - claude-code
  - openai
  - codex
  - google
  - gemini
byline: "AI Agents Info Editorial"
contentLicense: true
sources:
  - title: "Anthropic, Introducing Claude Fable 5.2 and Claude Mythos 5.2 (November 9, 2026; read November 10, 2026)"
    url: "https://www.anthropic.com/claude-fable-and-mythos-5-2"
  - title: "Anthropic, Claude Fable 5.2 model overview (read November 10, 2026)"
    url: "https://platform.claude.com/docs/en/models/fable-5-2/overview"
  - title: "Anthropic, Claude API pricing (read November 10, 2026)"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
  - title: "OpenAI, GPT-6 Astra model page (read November 10, 2026)"
    url: "https://developers.openai.com/api/docs/models/gpt-6-astra"
  - title: "OpenAI, Introducing GPT-6 Astra (read November 10, 2026; newest dated update note on the page is September 29, 2026)"
    url: "https://openai.com/index/gpt-6-astra/"
  - title: "Google, Introducing Gemini 4 Carbon (October 28, 2026; read November 10, 2026)"
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/"
  - title: "Google DeepMind, Gemini model page, performance table (read November 10, 2026)"
    url: "https://deepmind.google/models/gemini/"
  - title: "Google, Gemini API models (read November 10, 2026)"
    url: "https://aistudio.google.com/docs/models"
  - title: "Google, Gemini 4 Argon model card (read November 10, 2026)"
    url: "https://aistudio.google.com/docs/models/gemini-4-argon"
  - title: "Google, Gemini API pricing (read November 10, 2026)"
    url: "https://aistudio.google.com/docs/pricing"
faq:
  - question: "Is Claude Fable 5.2 better than GPT-6 Astra for coding agents?"
    answer: "On the only table that scores both, Anthropic’s November 9, 2026 announcement, Claude Fable 5.2 scores higher on the two agentic coding rows: 49.1% versus 42.8% on FrontierCode 2.0, and 69.9% versus 65.5% on FrontierSWE v2. The FrontierCode cell for Fable is Xhigh effort. Astra’s cell is the model’s highest available effort. OpenAI’s own Astra page, read November 10, does not include Fable 5.2. Fable’s list price is $8 and $40 per million tokens at any prompt length up to 1 million tokens. Astra is $10 and $50 up to 272,000 input tokens, and $20 and $75 for the whole request above that."
  - question: "Should a coding agent use Claude Fable 5.2 or Claude Opus 5.5?"
    answer: "Anthropic’s November 9 announcement says to start most coding and knowledge work on Claude Opus 5.5 and move up to Fable 5.2 when the job is harder. Opus 5.5 is $4 and $20 per million tokens. Fable 5.2 is $8 and $40. On FrontierCode 2.0, Fable at High effort scores 45.3%, about level with Opus 5.5’s best score of 45.5%, and Anthropic says that setting costs roughly half as much per task. At Xhigh, Fable scores 49.1%. On AA-Briefcase v1.1, Opus leads the Elo column at 1800 versus 1785, and Fable leads the rubric column at 66.1% versus 61.2%."
  - question: "How does Claude Fable 5.2 compare with Gemini 4 Carbon?"
    answer: "On Anthropic’s November 9 table, Gemini 4 Carbon scores 41.1% on FrontierCode 2.0 at Medium effort and 61.2% on FrontierSWE v2, behind Fable 5.2’s 49.1% and 69.9%. Carbon leads AutomationBench at 53.9% versus 51.4%. Fable leads Chartography at 73.4% versus 72.5%. Google’s October 28 announcement prices Carbon at an introductory $2 and $10 per million tokens, then $4 and $20. The Gemini API models page, read November 10, lists gemini-4-argon and leaves Carbon off that list. A context window for Carbon is not printed on the pages read that day."
  - question: "What is the context window of Claude Fable 5.2, GPT-6 Astra, and Gemini 4 Argon?"
    answer: "The Fable 5.2 overview, read November 10, 2026, lists 1 million tokens of context and 128,000 max output tokens. OpenAI’s GPT-6 Astra model page lists a 1,050,000 token context window, 922,000 maximum input tokens, and 128,000 max output tokens. Gemini 4 Argon’s model card lists a unified context window of 1,048,576 tokens, shared by input, thinking, and output, with a default synchronous max output of 65,536 tokens and long decode up to 1,048,576. Gemini 4 Carbon’s context window is not printed on the pages read November 10."
  - question: "How much does Claude Fable 5.2 cost compared with GPT-6 Astra?"
    answer: "Fable 5.2 is $8 per million input tokens and $40 per million output tokens, including prompts that use the full 1 million token window. Cache reads are $0.20 per million. GPT-6 Astra is $10 and $50 when the prompt has 272,000 input tokens or fewer, with cached input at $1. Above 272,000 input tokens the model page prices the whole request at 2 times the input and cache rates and 1.5 times the output rate, which is $20 input, $2 cached input, and $75 output. Fast mode is 2 times the applicable Astra rate. Fable fast mode is $16 and $80."
  - question: "Did OpenAI or Google publish a Claude Fable 5.2 score?"
    answer: "OpenAI’s GPT-6 Astra article and Google’s DeepMind Gemini table, both read November 10, 2026, score earlier Claude models. The OpenAI page compares Astra with Claude Fable 5.1, Claude Fable 5, and Claude Opus 5, on FrontierCode 1.1 and Terminal-Bench 4.0. Google’s table compares Gemini 4 Carbon with Claude Fable 5.1 and Claude Opus 5.5. Fable 5.2 is absent from both. Those rows use different tests, or an older Claude model, so this page keeps them out of the Fable 5.2 ranking."
  - question: "When should a harness use Claude Mythos 5.2 instead of Claude Fable 5.2?"
    answer: "Mythos 5.2 is the same underlying model, at the same $8 and $40 price and the same 1 million token context, for organizations in Anthropic’s verification programs. On the November 9 table the science row is 75.3% for Mythos and 74.6% for Fable. The cybersecurity rows are printed for Mythos, because Fable’s safeguards block most of that work. A general coding agent that can call the public API uses claude-fable-5-2."
---

On Anthropic’s November 9, 2026 comparison, Claude Fable 5.2 is the highest coding-agent score in the table: 49.1% on FrontierCode 2.0 at Xhigh effort, and 69.9% on FrontierSWE v2. [GPT-6 Astra](https://developers.openai.com/api/docs/models/gpt-6-astra) scores 42.8% and 65.5% on those rows. Claude Opus 5.5 scores 45.5% and 62.3%. Gemini 4 Carbon scores 41.1% on FrontierCode at Medium effort, and 61.2% on FrontierSWE v2. Those five numbers are Anthropic’s measurements, with each model’s highest available effort unless the cell says otherwise. This page did not rerun them.

The price decision is separate from that ranking. Fable 5.2 is $8 per million input tokens and $40 per million output tokens at every length up to its 1 million token window. Opus 5.5 is half that sticker, $4 and $20, and [Anthropic’s announcement](https://www.anthropic.com/claude-fable-and-mythos-5-2) still says to start most coding on Opus. Astra is $10 and $50 until the prompt passes 272,000 input tokens, then $20 and $75 for the whole request. The model, the [harness](/glossary/harness) around it, and the bill are three different choices. What Fable is, including the 1,000-agent run, is [What is Claude Fable 5.2?](/blog/what-is-claude-fable-5-2). How to point a harness at the model id is [How to use Claude Fable 5.2 in an agent harness](/blog/how-to-use-claude-fable-5-2-in-an-agent-harness).

AI Agents Info read the announcement, the [model overview](https://platform.claude.com/docs/en/models/fable-5-2/overview), Anthropic’s [pricing page](https://platform.claude.com/docs/en/about-claude/pricing), OpenAI’s Astra model page and launch article, Google’s October 28 Carbon announcement, the [DeepMind Gemini table](https://deepmind.google/models/gemini/), and the [Gemini API model list](https://aistudio.google.com/docs/models) on November 10, 2026. [Claude](/directory/claude) is the product. [Claude Code](/directory/claude-code) and [Codex](/directory/codex) are the coding agents that sit on these models. The sourced harness list is [Best AI agent harness](/best/ai-agent-harnesses).

## Which coding agent model leads?

Fable 5.2 leads the two agentic coding rows on the only published table that includes it. That lead is at the top effort Anthropic used for the cell, and it is Anthropic’s harness, not a score OpenAI or Google has confirmed for this model.

FrontierCode asks whether maintainers of open-source repositories would merge the model’s change. FrontierSWE v2 is the other agentic coding row on the same table. OSWorld 2.1 is computer use on an offline, partial set. The announcement says safeguards were on unless a cell says otherwise, and that every score is the model’s highest available effort unless a cell says otherwise. Two cells say otherwise: Fable’s FrontierCode number is Xhigh, and Carbon’s FrontierCode number is Medium. Ranking 49.1% against 41.1% compares those two effort settings, because that is how the table is printed.

At a lower effort the gap shrinks to a tie with Opus. The announcement’s FrontierCode chart says Fable 5.2 at High effort scores 45.3%, about the same as Opus 5.5’s best score of 45.5%, for roughly half the cost per task, and ahead of Astra’s best score of 42.8% at about the same cost. The chart does not print the token counts behind “half the cost” or “the same cost.” This page cannot recompute those task costs. The list prices below are a different measurement: they are the sticker, not the measured cost of a finished patch.

| Agentic eval on Anthropic’s November 9, 2026 table | Claude Fable 5.2 | Claude Opus 5.5 | GPT-6 Astra | Gemini 4 Carbon |
| --- | --- | --- | --- | --- |
| FrontierCode 2.0 | 49.1% | 45.5% | 42.8% | 41.1% |
| FrontierSWE v2 | 69.9% | 62.3% | 65.5% | 61.2% |
| OSWorld 2.1, offline set, partial | 89.3% | 87.2% | 79.5% | 81.5% |
| AutomationBench | 51.4% | 42.5% | 41.4% | 53.9% |

Fable’s FrontierCode cell is Xhigh effort. Carbon’s FrontierCode cell is Medium effort. Every other cell in this table is that model’s highest available effort. Click a column header to sort. The 45.3% High-effort FrontierCode figure is in the Opus section below, because the announcement prints it on the chart and not in this table.

## What are the prices, context windows, and agent features?

Fable 5.2 and Opus 5.5 keep one token price for the whole 1 million token window. Astra’s price steps up for the entire request once input passes 272,000 tokens. Argon is the Gemini model the API list actually names. Carbon’s price is the October 28 announcement, and the API list read November 10 does not include it.

| Model and when the rate applies | Context tokens | Max output tokens | Input USD per million | Output USD per million | Cache read USD per million |
| --- | --- | --- | --- | --- | --- |
| Claude Fable 5.2 | 1,000,000 | 128,000 | $8 | $40 | $0.20 |
| Claude Opus 5.5 | 1,000,000 | 128,000 | $4 | $20 | $0.20 |
| GPT-6 Astra, 272,000 input tokens or fewer | 1,050,000 | 128,000 | $10 | $50 | $1 |
| GPT-6 Astra, over 272,000 input tokens | 1,050,000 | 128,000 | $20 | $75 | $2 |
| Gemini 4 Argon, through November 30, 2026 | 1,048,576 | 65,536 | $2 | $10 | $0.10 |
| Gemini 4 Argon, from December 1, 2026 | 1,048,576 | 65,536 | $4 | $20 | $0.20 |
| Gemini 4 Carbon, introductory rate | — | — | $2 | $10 | — |
| Gemini 4 Carbon, after the introductory period | — | — | $4 | $20 | — |

Argon’s max output cell is the default synchronous limit. The model card also allows long decode up to 1,048,576 tokens, and the 1,048,576 context window is shared by input, thinking, and output. Astra’s long-context row is the model page’s rule that a prompt over 272,000 input tokens is priced at 2 times the input and cache rates and 1.5 times the output rate for the whole request, including the tokens under the line. Astra’s maximum input is 922,000 tokens inside the 1,050,000 context window. Carbon’s context and max output are blank because the pages read November 10 do not print them. Carbon’s cache cell is blank for the same reason. The October 28 post says cached input is priced at 95% off the input price. At the $2 introductory input price, 5% of $2 is $0.10. That dollar figure is arithmetic from the announced percentage, not a separate rate printed on a pricing table.

The agent controls that change a harness, from the same pages:

| Control | Claude Fable 5.2 | Claude Opus 5.5 | GPT-6 Astra | Gemini 4 Argon |
| --- | --- | --- | --- | --- |
| API id you can call | `claude-fable-5-2` | `claude-opus-5-5` | `gpt-6-astra` | `gemini-4-argon` |
| Effort | Five levels. API default `high`. Claude Code default `medium` | Five levels. API default `medium` | `reasoning.effort`: `low`, `medium`, `high`, `xhigh`, `max`. A default is not printed on the model page | Thinking is supported. A named effort ladder is not on the model card |
| Computer use | `computer_toolset_20260801` | Scored on OSWorld 2.1. The tool name is not on the Fable overview | Responses API tool `computer_use` | Model card: Computer use supported |
| MCP | [Claude Agent SDK](/directory/claude-agent-sdk) and Claude Code | Same SDK, with the Opus id | Responses API lists `mcp` as a supported tool | Function calling is supported. The model card does not list MCP |
| Coding-agent product | Claude Code. Fable is not the account default | Claude Code. On the Anthropic API the `opus` alias is Opus 5.5 | Codex | Google’s agent product page names Antigravity. It does not say Argon is the default model there |

Gemini 4 Carbon is absent from that feature table because the Gemini API models page lists one Gemini 4 id, `gemini-4-argon`. Carbon’s October 28 post says access starts with a subset of cyber defenders and the Fairwind program, then a broader rollout. Knowledge cutoffs printed on November 10: Fable and Opus, June 2026, on the Fable overview. Astra, April 30, 2026. Argon’s card says the latest update is October 2026 and does not print a cutoff date.

Fast mode is a second rate, not a second model, except on Microsoft Foundry where Fable’s fast id is `claude-fable-5-2-fast`. Fable fast mode is $16 and $80 per million tokens, and the announcement says it speeds token generation by up to 2.5 times. Astra’s model page says fast mode is up to 2 times the speed of standard processing at 2 times the applicable price. Those speed claims are each vendor’s, on that vendor’s serving stack.

Worked list-price arithmetic for one turn of 50,000 input tokens and 15,000 output tokens, with no cache and no thinking tokens added on top: Fable $1.00, Opus $0.50, Astra at the short-context rate $1.25, Argon through November 30 $0.25. The same turn with 400,000 input tokens: Fable $4.00, Opus $2.00, Astra at the long-context rate $9.50, Argon through November 30 $1.00. The [AI agent cost calculator](/agent-cost-calculator) uses the standard rates and leaves cache, batch, and fast mode out. The step-by-step bills, including cache, are in the [harness guide](/blog/how-to-use-claude-fable-5-2-in-an-agent-harness). Subscription prices for Claude Code and Codex are a different meter, in [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing).

## Which model fits which harness job?

Match the job to the row you can actually call, then re-run the job on your own tasks. A leader on Anthropic’s table is a reason to evaluate that model, and the announcement itself tells most coding work to start on Opus 5.5.

**Hardest coding agents, where you have measured a gain at the top effort.** Fable 5.2. It has the highest FrontierCode 2.0 and FrontierSWE v2 scores on the table that includes all four names. Use Xhigh only where your eval shows the gain. The what’s-new page says most of the capability gain is already present at high, which is the API default.

**Daily coding agents, and any harness whose Opus eval already passes.** Claude Opus 5.5. Half the token price, a Medium API default, and a FrontierCode best score of 45.5% that Fable matches at High effort for what Anthropic calls roughly half the cost per task. Move to Fable when a higher effort on Opus still misses the bar. That sentence is Anthropic’s recommendation, and it matches the price table.

**Computer use.** Fable 5.2, on Anthropic’s OSWorld 2.1 row: 89.3%, then Opus 87.2%, Carbon 81.5%, Astra 79.5%. [Computer use](/glossary/computer-use) is the loop that looks at a screen and asks for a click or a key. Google’s DeepMind table, read the same day, prints Astra at 80.9% and Fable 5.1 at 76.8% on OSWorld-2.1, against Anthropic’s 79.5% and 83.5%. Carbon’s 81.5% and Opus’s 87.2% match across the two pages. The Astra and Fable 5.1 cells do not match, so this page uses Anthropic’s row whenever the row includes Fable 5.2.

**Business-workflow agents.** Gemini 4 Carbon leads AutomationBench at 53.9%, with Fable at 51.4%, Opus at 42.5%, and Astra at 41.4%. Carbon’s lead is real on both Anthropic’s table and Google’s DeepMind table, which prints the same 53.9%. A harness that can only call ids on the public Gemini API list could not select Carbon on the November 10 reading of that list. Among the ids that list did include, plus the Claude and OpenAI ids, Fable 5.2 is the highest score on that row. Google’s November 10 availability post and the November 11 model-page reading are [Gemini 4 Carbon for agent harnesses](/blog/gemini-4-carbon-for-agent-harnesses).

**Long transcripts, past 272,000 input tokens.** Fable 5.2 or Opus 5.5 on price, before quality. Anthropic’s pricing page says Claude 4.6 and later models, other than Haiku 5.5, bill the full 1 million token window at the standard rate. Astra bills $20 and $75 for every token in the request once input crosses 272,000. A long [agent](/glossary/agent) loop crosses that line quickly. Argon has no separate long-context multiplier on its pricing row. Its $2 and $10 rate lasts through November 30, 2026, and the output price includes thinking tokens.

**Knowledge-work agents graded like AA-Briefcase.** Split the metric. Opus 5.5 leads Elo at 1800, against Fable 1785, Carbon 1611, and Astra 1569. Fable leads the rubric score at 66.1%, against Carbon 61.8%, Opus 61.2%, and Astra 52.0%. Pick the column your harness grades.

**Lowest sticker among models with a public id, through November 30.** Gemini 4 Argon, at $2 and $10. This page has no FrontierCode 2.0 or FrontierSWE v2 score for Argon next to Fable 5.2. Google’s table scores Argon against Fable 5.1, which is the previous model. Treat Argon as the cheap callable Gemini model, and evaluate it on your tasks.

**Cybersecurity or biology work that Fable’s classifiers block.** Claude Mythos 5.2, if the organization is in the verification program. The section below has the one-point science gap and the rows that are printed only for Mythos.

## How does Claude Fable 5.2 compare with Claude Opus 5.5?

Opus 5.5 is the model Anthropic tells you to run first. Fable 5.2 is the model it tells you to move to when Opus at a higher effort still misses the eval.

On the November 9 table, Fable is ahead on FrontierCode (49.1% against 45.5%), FrontierSWE v2 (69.9% against 62.3%), OSWorld 2.1 (89.3% against 87.2%), AutomationBench (51.4% against 42.5%), Terminal-Bench-Science 0.1 (74.6% against 58.7%), WANDR relaxed (82.1% against 72.3%), RoboDojo Sim (64.9% against 39.4%), the AA-Briefcase rubric (66.1% against 61.2%), Remote Labor Index (41.3% at High effort against 21.3%), Humanity’s Last Exam with tools (74.2% against 67.7%), and Chartography (73.4% against 64.4%). Opus is ahead on one number in that set: AA-Briefcase Elo, 1800 against 1785.

The cost chart is the number that should stop a blanket switch. At High effort, Fable’s 45.3% on FrontierCode sits next to Opus’s best 45.5%, and Anthropic says the Fable run costs roughly half as much per task. At Low effort on Humanity’s Last Exam with tools, Anthropic says Fable matches Opus’s top score for less than one-tenth of the cost per task. At Medium effort on Chartography, Fable scores 66.4%, ahead of Opus at Max effort (64.4%), for less than one-tenth of the cost per task. At Medium effort on WANDR, Anthropic says Fable matches Opus’s top score for about 40% of the cost per task. None of those sentences print the token totals. Effort changes how many thinking tokens and tool calls the model spends, and thinking tokens count against `max_tokens` together with the visible reply. A harness that sends the same prompt to both models at the same effort is not the comparison those sentences describe.

Both models have a 1 million token context, 128,000 max output, adaptive thinking that stays on, and a June 2026 knowledge cutoff. Opus’s API default effort is `medium`. Fable’s is `high`. Claude Code’s default for Fable 5.2 is `medium`, which is a product default, not the API default. The setup guide walks through that switch.

## How does Claude Fable 5.2 compare with GPT-6 Astra?

On Anthropic’s table, Fable leads Astra on FrontierCode (49.1% against 42.8%), FrontierSWE v2 (69.9% against 65.5%), OSWorld 2.1 (89.3% against 79.5%), AutomationBench (51.4% against 41.4%), Terminal-Bench-Science (74.6% against 68.1%), RoboDojo (64.9% against 29.8%), both AA-Briefcase numbers (66.1% and 1785 Elo against 52.0% and 1569), Remote Labor Index (41.3% against 20.8%), Humanity’s Last Exam with tools (74.2% against 57.2%), and Chartography (73.4% against 71.0%). WANDR is blank for Astra on that table. The announcement says Fable at High effort is ahead of Astra’s best FrontierCode score, 42.8%, at about the same cost per task.

Astra’s own page is a different test suite, and it stops at Fable 5.1. Read November 10, the newest dated update note on that page is September 29, 2026. It reports Terminal-Bench 4.0 at 57.9% for Astra, DeepSWE v1.1 at 74.1%, FrontierCode 1.1 Extended at 64.5%, and FrontierCode 1.1 Main at 53.3%, each as the maximum at any effort. FrontierCode 1.1 is not FrontierCode 2.0. This page leaves those percentages in the “cannot line up” section so a sort does not treat 64.5% and 49.1% as the same exam.

The harness difference that shows up on a bill is the long-context step. Fable stays at $8 and $40 through 1 million tokens. Astra’s cached input is $1 per million at or under 272,000 input tokens and $2 above that, against Fable’s $0.20 at every length. Cache writes on Astra’s model page are $12.50 per million at the short rate, which the page says is 1.25 times the uncached input rate, and they double with the long-context multiplier. Fable’s 5-minute cache write is $10 and the 1-hour write is $16, from the pricing page.

Astra’s agent surface, from the model page, includes the Responses API tools `computer_use`, `mcp`, `hosted_shell`, `apply_patch`, `code_interpreter`, `web_search`, and `file_search`. The launch article also describes an experimental Codex feature that keeps notes across context windows and can search earlier windows. That feature is a Codex harness behavior. It is not a number on the benchmark table. Codex plan prices, as distinct from the API rates here, are in [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing).

## How does Claude Fable 5.2 compare with Gemini 4 Carbon?

Carbon leads one row that matters for agents that run business software, and Fable leads the coding and computer-use rows on the same Anthropic table.

AutomationBench: Carbon 53.9%, Fable 51.4%. Chartography is close, Fable 73.4% and Carbon 72.5%. Everywhere else on the announcement table that has a Carbon cell, Fable is ahead: FrontierCode 49.1% against 41.1% (Xhigh against Medium), FrontierSWE v2 69.9% against 61.2%, OSWorld 2.1 89.3% against 81.5%, Terminal-Bench-Science 74.6% against 64.8%, and AA-Briefcase rubric 66.1% against 61.8% with Elo 1785 against 1611. WANDR, RoboDojo, Remote Labor Index, and Humanity’s Last Exam with tools are blank for Carbon on Anthropic’s table.

Google’s October 28, 2026 announcement calls Carbon its strongest model for cybersecurity and long-horizon work, ranks it 59 on Artificial Analysis Intelligence Index v5.0, and prints SEC-bench Pro at 88.2%, ExploitGym at 54.8%, and CWE-bench at 71.0%, evaluated without guardrails. The same post prices the launch at the introductory Argon rate, $2 and $10 per million tokens, with cached input 95% off, and says $4 and $20 apply after the introductory period. It does not print the day that period ends. It also says Carbon is reaching a subset of cyber defenders first, and that developer, business, and consumer access comes later.

The Gemini API models page, read November 10, still lists a single Gemini 4 model, `gemini-4-argon`. Argon is the model a harness can name today. Its card supports computer use, function calling, code execution, and structured outputs, with implicit caching only. Through November 30, 2026 it is the cheapest public id in the price table above. From December 1 its paid standard rate matches Opus 5.5’s $4 and $20. Google’s DeepMind table scores Argon against Fable 5.1, not against Fable 5.2, so this page does not declare an Argon-versus-Fable-5.2 winner.

## How does Claude Fable 5.2 compare with Claude Mythos 5.2?

They are the same underlying model at the same price. Mythos is the one organizations in the Life Sciences and Cyber Verification Programs can use when Fable’s classifiers would block the task.

The overview says they share the 1 million token context, the 128,000 output limit, and the $8 and $40 price. The November 9 table prints a science split: Terminal-Bench-Science 0.1 is 74.6% for Fable 5.2 and 75.3% for Mythos 5.2. Cybersecurity CyScenarioBench is 76.3% for Mythos 5.2, and the announcement says each lab’s scores on that benchmark use unique tasks. CVE Rediscovery is 89.6% for Mythos 5.2. Protein design, de novo binder design in 24 hours, is 85.1% for Mythos 5.2. Those three rows are not Fable rows. The announcement says Fable’s safeguards block most cybersecurity tasks, and a blocked cybersecurity query is answered by Opus 4.8, a blocked biology query by Opus 5.

For a coding agent on the public API, the id is `claude-fable-5-2`. Mythos is `claude-mythos-5-2`, and the what’s-new page limits it to verified organizations. The longer account of the safeguards and the 1,000-agent harness is the [Fable overview on this site](/blog/what-is-claude-fable-5-2).

## Which published scores cannot be lined up with Fable 5.2?

A score can be official, dated, and still the wrong row to sort against Fable 5.2. These are the ones this page refuses to merge into the table above.

OpenAI’s Astra launch article, read November 10, 2026, reports Astra at 57.9% on Terminal-Bench 4.0, 74.1% on DeepSWE v1.1, 64.5% on FrontierCode 1.1 Extended, and 53.3% on FrontierCode 1.1 Main. The comparison columns are GPT-5.6 Sol, Fable 5.1, Fable 5, Opus 5, and Gemini 3.8 Flash. Fable 5.2 is not in the table. The page says scores are the maximum at any effort, from OpenAI’s research environment or API. FrontierCode 1.1 is an earlier test than FrontierCode 2.0.

Google’s DeepMind performance table, read November 10, includes Carbon, Argon, Astra, Opus 5.5, and Fable 5.1. It does not include Fable 5.2. Where a cell matches Anthropic’s later table exactly, this page treats that as the same published figure: FrontierSWE 2 at 61.2% for Carbon, 65.5% for Astra, and 62.3% for Opus 5.5, and OSWorld-2.1 at 81.5% for Carbon and 87.2% for Opus. Where a cell disagrees, both numbers stay attributed to the page that printed them. Google prints Astra at 80.9% on OSWorld-2.1. Anthropic prints 79.5%. Google prints Terminal-Bench 4.0, in an Artificial Analysis column, at 65.2% for Carbon, 59.1% for Astra, 59.6% for Opus 5.5, and 52.0% for Fable 5.1. Anthropic’s November 9 table has no Terminal-Bench 4.0 row for Fable 5.2.

BenchCAD 2.1 is on Anthropic’s charts and is hardware design, scored 0 to 100 with partial credit. At Max effort Fable 5.2 scores 83.5, Opus 5.5 scores 65.3, and Fable 5.1 scores 44.4. Astra and Carbon are not on that chart. It is not a coding-agent row.

If a figure is missing from this page, it was missing from these sources on November 10, 2026. The way to judge a harness on your own tasks, rather than on a vendor chart, is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness). What the surrounding software does is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness).

## FAQ

### Is Claude Fable 5.2 better than GPT-6 Astra for coding agents?

On the only table that scores both, Anthropic’s November 9, 2026 announcement, Claude Fable 5.2 scores higher on the two agentic coding rows: 49.1% versus 42.8% on FrontierCode 2.0, and 69.9% versus 65.5% on FrontierSWE v2. The FrontierCode cell for Fable is Xhigh effort. Astra’s cell is the model’s highest available effort. OpenAI’s own Astra page, read November 10, does not include Fable 5.2. Fable’s list price is $8 and $40 per million tokens at any prompt length up to 1 million tokens. Astra is $10 and $50 up to 272,000 input tokens, and $20 and $75 for the whole request above that.

### Should a coding agent use Claude Fable 5.2 or Claude Opus 5.5?

Anthropic’s November 9 announcement says to start most coding and knowledge work on Claude Opus 5.5 and move up to Fable 5.2 when the job is harder. Opus 5.5 is $4 and $20 per million tokens. Fable 5.2 is $8 and $40. On FrontierCode 2.0, Fable at High effort scores 45.3%, about level with Opus 5.5’s best score of 45.5%, and Anthropic says that setting costs roughly half as much per task. At Xhigh, Fable scores 49.1%. On AA-Briefcase v1.1, Opus leads the Elo column at 1800 versus 1785, and Fable leads the rubric column at 66.1% versus 61.2%.

### How does Claude Fable 5.2 compare with Gemini 4 Carbon?

On Anthropic’s November 9 table, Gemini 4 Carbon scores 41.1% on FrontierCode 2.0 at Medium effort and 61.2% on FrontierSWE v2, behind Fable 5.2’s 49.1% and 69.9%. Carbon leads AutomationBench at 53.9% versus 51.4%. Fable leads Chartography at 73.4% versus 72.5%. Google’s October 28 announcement prices Carbon at an introductory $2 and $10 per million tokens, then $4 and $20. The Gemini API models page, read November 10, lists `gemini-4-argon` and leaves Carbon off that list. A context window for Carbon is not printed on the pages read that day.

### What is the context window of Claude Fable 5.2, GPT-6 Astra, and Gemini 4 Argon?

The Fable 5.2 overview, read November 10, 2026, lists 1 million tokens of context and 128,000 max output tokens. OpenAI’s GPT-6 Astra model page lists a 1,050,000 token context window, 922,000 maximum input tokens, and 128,000 max output tokens. Gemini 4 Argon’s model card lists a unified context window of 1,048,576 tokens, shared by input, thinking, and output, with a default synchronous max output of 65,536 tokens and long decode up to 1,048,576. Gemini 4 Carbon’s context window is not printed on the pages read November 10.

### How much does Claude Fable 5.2 cost compared with GPT-6 Astra?

Fable 5.2 is $8 per million input tokens and $40 per million output tokens, including prompts that use the full 1 million token window. Cache reads are $0.20 per million. GPT-6 Astra is $10 and $50 when the prompt has 272,000 input tokens or fewer, with cached input at $1. Above 272,000 input tokens the model page prices the whole request at 2 times the input and cache rates and 1.5 times the output rate, which is $20 input, $2 cached input, and $75 output. Fast mode is 2 times the applicable Astra rate. Fable fast mode is $16 and $80.

### Did OpenAI or Google publish a Claude Fable 5.2 score?

OpenAI’s GPT-6 Astra article and Google’s DeepMind Gemini table, both read November 10, 2026, score earlier Claude models. The OpenAI page compares Astra with Claude Fable 5.1, Claude Fable 5, and Claude Opus 5, on FrontierCode 1.1 and Terminal-Bench 4.0. Google’s table compares Gemini 4 Carbon with Claude Fable 5.1 and Claude Opus 5.5. Fable 5.2 is absent from both. Those rows use different tests, or an older Claude model, so this page keeps them out of the Fable 5.2 ranking.

### When should a harness use Claude Mythos 5.2 instead of Claude Fable 5.2?

Mythos 5.2 is the same underlying model, at the same $8 and $40 price and the same 1 million token context, for organizations in Anthropic’s verification programs. On the November 9 table the science row is 75.3% for Mythos and 74.6% for Fable. The cybersecurity rows are printed for Mythos, because Fable’s safeguards block most of that work. A general coding agent that can call the public API uses `claude-fable-5-2`.
