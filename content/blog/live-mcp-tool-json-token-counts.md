---
title: "Context7's two tools: 1,131 tokens. DeepWiki's three: 395."
description: "On November 10, 2026 the prompt checker counted live tools/list JSON from five public MCP servers. Context7 4.5.0 was 1,131 tool tokens. DeepWiki 4.0.2 was 395. On gpt-5, at 200 output tokens and 40 turns a day, the 30-day figures were $4.143 and $3.039."
takeaways:
  - "Context7's two tools were 1,131 tokens. DeepWiki's three were 395. This site's seven tools were 973. All three figures are tiktoken o200k_base counts of the compact tools array from tools/list on November 10, 2026."
  - "On gpt-5, with 200 output tokens and 40 turns a day, Context7 was $0.0034525 a turn and $4.143 over 30 days. DeepWiki was $0.0025325 and $3.039. The $1.104 gap is the tool text. The output box is $2.40 of each total."
  - "The same DeepWiki JSON was an error on the OpenAI target and on the Anthropic target, three errors each. Auto-detect and the MCP target accepted it. DeepWiki's initialize instructions were 851 tokens and named 25 tools. tools/list returned 3."
date: "2026-11-10"
updated: "2026-11-10"
absoluteTitle: true
category: guide
topics:
  - how-agents-work
  - tools-saas
  - task-performance
audience:
  - everyone
  - builders
companies:
  - openai
  - anthropic
  - xai
  - microsoft
  - devin
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Live MCP tools/list token counts, November 10, 2026"
  description: "tiktoken o200k_base counts and 30-day prices for the compact tools array from tools/list on Context7 4.5.0, DeepWiki 4.0.2, Cloudflare docs 0.5.0, Microsoft Learn MCP 1.0.0, and the AI Agents Info directory server 1.0.0. The prompt was 31 tokens. Output tokens were entered as 200 and turns per day as 40. gpt-5 is the encoding tiktoken assigns to that model. Claude Fable 5.2 and grok-4.7 reuse that count as an estimate."
  isBasedOn: "https://www.aiagentsinfo.com/agent-prompt-checker"
sources:
  - title: "Context7 MCP server, tools/list (4.5.0, 07:42 UTC, November 10, 2026)"
    url: "https://mcp.context7.com/mcp"
  - title: "DeepWiki MCP server, tools/list (4.0.2, 07:42 UTC, November 10, 2026)"
    url: "https://mcp.deepwiki.com/mcp"
  - title: "Cloudflare docs MCP server, tools/list (docs-ai-search 0.5.0, 07:42 UTC, November 10, 2026)"
    url: "https://docs.mcp.cloudflare.com/mcp"
  - title: "Microsoft Learn MCP server, tools/list (1.0.0, 07:43 UTC, November 10, 2026)"
    url: "https://learn.microsoft.com/api/mcp"
  - title: "AI Agents Info directory MCP server, tools/list (1.0.0, 07:42 UTC, November 10, 2026)"
    url: "https://www.aiagentsinfo.com/api/mcp"
  - title: "Model Context Protocol, lifecycle, revision 2025-06-18 (schema text for InitializeResult.instructions, read November 10, 2026)"
    url: "https://modelcontextprotocol.io/specification/2025-06-18/schema"
  - title: "Model Context Protocol, Tools, revision 2026-07-28 (read November 10, 2026)"
    url: "https://modelcontextprotocol.io/specification/2026-07-28/server/tools"
  - title: "OpenAI, API pricing (gpt-5 standard row read November 10, 2026)"
    url: "https://developers.openai.com/api/docs/pricing"
  - title: "Anthropic, Claude API pricing (Claude Fable 5.2 row read November 10, 2026)"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
  - title: "xAI, Models (grok-4.7 rows read November 10, 2026)"
    url: "https://docs.x.ai/docs/models"
  - title: "OpenAI, tiktoken"
    url: "https://github.com/openai/tiktoken"
  - title: "AI Agents Info, Free agent prompt and tool checker (called November 10, 2026)"
    url: "https://www.aiagentsinfo.com/agent-prompt-checker"
  - title: "AI Agents Info, MCPHallu paper note"
    url: "https://www.aiagentsinfo.com/research/mcphallu-mcp-agent-hallucinations"
faq:
  - question: "How many tokens did the live MCP tool lists use?"
    answer: "On November 10, 2026 the checker counted the compact tools array from tools/list. Context7 was 1,131 tokens for 2 tools. Microsoft Learn was 972 for 3. This site's directory server was 973 for 7. Cloudflare docs was 407 for 2. DeepWiki was 395 for 3. The prompt beside them was 31 tokens. gpt-5 was tiktoken o200k_base. The count is the pasted text, without message framing."
  - question: "What does that tool list cost over 30 days?"
    answer: "With 200 output tokens and 40 turns a day entered, gpt-5 was $4.143 over 30 days for Context7 and $3.039 for DeepWiki. The output box is $2.40 of each figure at gpt-5's $10 per million output tokens. Context7's tool text is $1.6965 of its $4.143. The checker page rounds a total of at least $1 to the cent, so those two rows show as $4.14 and $3.04."
  - question: "Can I paste tools/list into the OpenAI or Anthropic API?"
    answer: "The checker rejected that paste. DeepWiki's three tools were three errors with the target set to OpenAI, and three errors with the target set to Anthropic. Auto-detect and the MCP target accepted the same JSON. The OpenAI error says an OpenAI function uses type function and a parameters schema. The Anthropic error says a user-defined tool uses input_schema."
  - question: "Does the prompt checker store the tool JSON?"
    answer: "No. The checker page says the server reads the prompt and the tool JSON to count tokens and check the shape, then drops them. Nothing is written to a database, a file, or a log."
---

Updated November 10, 2026.

Context7's two tools were 1,131 tokens. DeepWiki's three were 395. I counted both on the morning of November 10, 2026, from the JSON those servers returned for `tools/list`, using the live [prompt and tool checker](/agent-prompt-checker).

On gpt-5, with 200 output tokens and 40 turns a day entered, Context7 was $0.0034525 a turn and $4.143 over 30 days. DeepWiki was $0.0025325 and $3.039. The $1.104 difference is the tool text. The prompt and the output box were the same on both rows.

This site's own directory server returned seven tools and 973 tokens, still under Context7's two. Tool count did not order the bill.

## What went into the checker

Each server got `initialize` with `protocolVersion` set to `2025-06-18`, then `notifications/initialized`, then `tools/list`. No Authorization header. The [2025-06-18 schema](https://modelcontextprotocol.io/specification/2025-06-18/schema) defines `InitializeResult.instructions` as a hint that a client may add to the system prompt. Revision 2026-07-28 is a later lifecycle. I requested `protocolVersion` `2025-06-18`. All five servers completed that handshake and returned `tools/list`.

The tool paste was `JSON.stringify` of `result.tools`, compact, key order unchanged. The prompt on every tool row was:

> You are a coding agent. Use a tool when it can answer the question. Do not invent a repository, a library id, or a documentation URL.

The request was `POST /api/agent-prompt-checker` with `format` set to `mcp`, `modelId` set to `gpt-5`, `outputTokens` set to 200, and `tasksPerDay` set to 40. gpt-5 is a tiktoken `o200k_base` count of that pasted text. The checker does not add message framing, and it does not store the paste.

GitHub's remote server at `api.githubcopilot.com/mcp/` answered 401, missing Authorization. Stripe and Notion did the same. They are not in the table. The five below answered `tools/list` with no token.

| Server | Version | Retrieved (UTC) | Tools | Tool tokens |
| --- | --- | --- | --- | --- |
| [Context7](https://mcp.context7.com/mcp) | 4.5.0 | 07:42:46 | 2 | 1,131 |
| [Microsoft Learn](https://learn.microsoft.com/api/mcp) | 1.0.0 | 07:43:14 | 3 | 972 |
| [AI Agents Info](https://www.aiagentsinfo.com/api/mcp) | 1.0.0 | 07:42:47 | 7 | 973 |
| [Cloudflare docs](https://docs.mcp.cloudflare.com/mcp) | 0.5.0 | 07:42:47 | 2 | 407 |
| [DeepWiki](https://mcp.deepwiki.com/mcp) | 4.0.2 | 07:42:46 | 3 | 395 |

The names were `resolve-library-id` and `query-docs` on Context7; `microsoft_docs_search`, `microsoft_code_sample_search`, and `microsoft_docs_fetch` on Microsoft Learn; `search_cloudflare_documentation` and `migrate_pages_to_workers_guide` on Cloudflare; `ask_wiki_question`, `read_wiki_contents`, and `read_wiki_structure` on DeepWiki. This site's seven are the read-only directory tools on the [MCP server page](/mcp).

## What gpt-5 priced

The prompt was 31 tokens on every row. Input tokens are 31 plus the tool tokens. Output tokens are the 200 I entered.

| Server | Input tokens | Per turn | 30 days |
| --- | --- | --- | --- |
| Context7 | 1,162 | $0.0034525 | $4.143 |
| Microsoft Learn | 1,003 | $0.00325375 | $3.9045 |
| AI Agents Info | 1,004 | $0.003255 | $3.906 |
| Cloudflare docs | 438 | $0.0025475 | $3.057 |
| DeepWiki | 426 | $0.0025325 | $3.039 |

Per turn is the checker's `perTurn`. The 30-day column is that number times 1,200, which is 40 turns times 30 days. Context7, this site, and DeepWiki matched the `thirtyDay` field exactly. Microsoft's field was `3.9045000000000005`. Cloudflare's was `3.0569999999999995`. Those are the floating-point product of the per-turn figure and 1,200. The prices above are the decimal product.

The checker page rounds a total of at least $1 to the cent. These five rows show as $4.14, $3.90, $3.91, $3.06, and $3.04.

gpt-5's standard price on [OpenAI's pricing page](https://developers.openai.com/api/docs/pricing), read November 10, 2026, is $1.25 per million input tokens and $10 per million output tokens. That is the row the checker used. Cached, batch, and fast prices are not in it.

The 200 output tokens are $2.40 of every row: 200 × $10 / 1,000,000 × 1,200. The 31-token prompt is $0.0465. Context7's 1,131 tool tokens are $1.6965. DeepWiki's 395 are $0.5925. Add those three pieces and you get $4.143 and $3.039.

## Where the extra tokens sit

I deleted the `description` field and posted the same objects again. The checker warned that the description was missing, left `ok` true, and still priced the text.

| Server | Tool tokens with descriptions | Tool tokens after the field was removed | Tokens removed with the field |
| --- | --- | --- | --- |
| Context7 | 1,131 | 588 | 543 |
| Microsoft Learn | 972 | 462 | 510 |
| AI Agents Info | 973 | 807 | 166 |
| Cloudflare docs | 407 | 243 | 164 |
| DeepWiki | 395 | 344 | 51 |

The removed tokens are the key, the quotes, and the prose, not the prose alone. Context7 still moves by 543. DeepWiki moves by 51.

Context7's `resolve-library-id` description tells the model to call that tool before query-docs, unless the user already passed a library id of the form `/org/project`. It also says: "Do not call this tool more than 3 times per question." DeepWiki's `ask_wiki_question` description is one sentence: ask a question about a repository and get an answer grounded in its DeepWiki. The long text is an operating rule. It is also input on every later turn.

A third paste kept only `name`, `description`, and `inputSchema`.

| Server | Full tools array | Name, description, and inputSchema only | Tokens in the other fields |
| --- | --- | --- | --- |
| Context7 | 1,131 | 1,064 | 67 |
| Microsoft Learn | 972 | 726 | 246 |
| DeepWiki | 395 | 256 | 139 |

Context7's other fields are `title` and `annotations`. Microsoft Learn and DeepWiki also send `outputSchema`. DeepWiki adds `_meta`. The [tools page for revision 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28/server/tools) defines `inputSchema` as the argument schema and `title` as a display name. A host that forwards the whole tool object pays for the output schema. A host that forwards the three call fields does not. The checker priced the paste. It did not guess which fields a provider will inject.

I did not repeat that third paste for Cloudflare or for this site.

DeepWiki's MCP check returned no issues. `ask_wiki_question` still types `repoName` as `anyOf`: a string, or an array of strings. A clean MCP result does not mean that union was tested against OpenAI strict mode.

## DeepWiki's hint names 22 tools the list does not return

The same `initialize` responses carried `instructions`. I posted each string alone, with the tool box empty and output tokens set to 0. Turns per day stayed 40. Cloudflare's result had no instructions text. An empty prompt came back as HTTP 400, "Paste a system prompt." That row has no instruction price.

| Server | Instruction tokens | Per turn | 30 days, output tokens 0 |
| --- | --- | --- | --- |
| DeepWiki | 851 | $0.00106375 | $1.2765 |
| Microsoft Learn | 290 | $0.0003625 | $0.435 |
| Context7 | 143 | $0.00017875 | $0.2145 |
| AI Agents Info | 55 | $0.00006875 | $0.0825 |

DeepWiki's `thirtyDay` field was `1.2765000000000002`. Microsoft's was `0.43499999999999994`. The table is the decimal product of `perTurn` and 1,200. Context7 and this site matched the field.

DeepWiki's instructions were 851 tokens. Its tool list was 395. The hint names 25 tools. Twenty-two of those lines end with "private mode only." `tools/list` on this unauthenticated session returned the other three: `read_wiki_structure`, `read_wiki_contents`, and `ask_wiki_question`. One of the private names is `list_wiki_repos`. The opening lines say the `devin_*` tools act for one organization once a user OAuth token is present.

A client that copies `instructions` into the system prompt, which the 2025-06-18 schema says it may do, spends 851 tokens teaching names that were not in this `tools/list`. Microsoft's instructions describe the same three tools the list returned. This site's instructions are the 55-token read-only note, and they do not invent an eighth tool.

## The OpenAI target rejects the same JSON

Auto-detect on DeepWiki returned `ok: true`, format "MCP tool," and no issues. The same paste with `format` set to `openai` returned `ok: false` and one error on each of the three tools:

> This matches MCP tool. An OpenAI function tool uses type "function" and a parameters schema. The Responses API puts name and parameters on the tool. Chat Completions nests them under function.

`format` set to `anthropic` returned three errors as well:

> This matches MCP tool. An Anthropic user-defined tool puts name, description, and input_schema on the tool, with no type "function" wrapper.

Context7 did the same with two errors on each of those targets. The token counts did not change. The checker's note on the failing rows says the cost includes the tool text, and a provider can reject the request before it bills the turn. The $3.039 is the price of the text if the call is accepted. It is not a receipt for a rejected request.

The break is the field name. MCP calls the argument schema `inputSchema`. OpenAI calls it `parameters`. Anthropic calls it `input_schema`. I did not rewrite the JSON and post it again, so this page does not report a token count for that rewrite.

The November 7 walkthrough, [Why tool JSON costs more than your system prompt](/blog/why-tool-json-costs-more-than-your-system-prompt), used one weather tool in OpenAI's shape. The November 9 walkthrough, [Agent tool JSON cost across models](/blog/agent-tool-json-cost-across-models), used three support tools written for that page. The JSON here is `tools/list` from servers that answered on November 10.

## The same Context7 paste on two other prices

Claude Fable 5.2 and grok-4.7 reused the 1,162 input tokens. The checker labels both as estimates. tiktoken does not bill those models, and this server does not run their tokenizers.

Fable 5.2 was $0.017296 a turn. Times 1,200, that is $20.7552 over 30 days. The `thirtyDay` field was `20.755200000000002`. The checker's price is $8 per million input tokens and $40 per million output tokens. [Anthropic's pricing page](https://platform.claude.com/docs/en/about-claude/pricing), read November 10, 2026, lists Claude Fable 5.2 at those two rates. The published Claude tool-use system prompt was not added. The checker said that count applies when the tools are Anthropic's shape, and this JSON is not.

grok-4.7 was $0.003524 a turn and $4.2288 over 30 days, on the under-200,000-token band. [xAI's models page](https://docs.x.ai/docs/models), read the same day, lists grok-4.7 at $2 and $6 per million tokens below 200,000 prompt tokens, and $4 and $12 once the prompt reaches that line. This paste is far under the line.

## What to check before you attach the server

Call `tools/list` on the session you will actually run, and paste that array. DeepWiki's unauthenticated list is three tools. Its hint describes twenty-two more. Pricing the hint, or pricing a catalog you only see after OAuth, answers a different question.

Run the checker twice. The MCP target tells you the list matches the MCP shape the checker tests. The OpenAI or Anthropic target tells you the field names still have to change before that API will take the object. Auto-detect will report "MCP tool" and look finished.

Then read the description. Context7 spends 543 of its 1,131 tool tokens on description fields that say which tool to call first and when to stop. That rule is useful. It is also resent on the next turn.

[MCPHallu](/research/mcphallu-mcp-agent-hallucinations) is the paired note. The paper's Table 7, as copied on that page, puts correct-tool-only runs at 84.7% pass and runs that also call a confusion tool at 32.3% pass. A description that says "call this first" is one way a server tries to stay in the first group. The token count above is what that sentence costs when it rides along in the tool list. The paper's servers expose roughly 300 tools. This page does not price that catalog. It prices five servers that answered with no token, and between two and seven tools.

The [prompt and tool checker](/agent-prompt-checker) is the page that produced these figures. The [cost calculator](/agent-cost-calculator) is the shorter tool once you already know the token counts.
