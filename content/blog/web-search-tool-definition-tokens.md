---
title: "Brave's MCP tool list is 25,495 tokens. Web search alone is 1,400."
description: "On November 11, 2026 Brave's eight-tool MCP list was 25,495 tokens and brave_web_search was 1,400. On gpt-5, at 200 output tokens and 40 turns a day, 30 days cost $40.6845 and $4.542."
absoluteTitle: true
takeaways:
  - "Brave Search MCP 2.1.4 returned eight tools. The compact tools/list paste was 25,495 tokens. brave_web_search alone was 1,400. brave_place_search alone was 17,296, and 71,381 of its 77,365 characters are the output schema."
  - "On gpt-5, with a 28-token prompt, 200 output tokens, and 40 turns a day, that eight-tool list was $0.03390375 a turn and $40.6845 over 30 days. The web-search tool alone was $0.003785 and $4.542. The 200 output tokens are $2.40 of every gpt-5 row."
  - "OpenAI's published web_search declaration was 8 tokens. Anthropic's web_search_20260318 declaration was 17. Exa's live search-only list was 348. The call fee is still the larger line on those tools. On Brave's full list, the definition is larger than 1,200 searches at $5 per 1,000."
date: "2026-11-11"
updated: "2026-11-13"
category: guide
topics:
  - tools-saas
  - how-agents-work
  - harnesses
  - research
audience:
  - builders
companies:
  - openai
  - anthropic
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Web search tool-definition token counts, November 11, 2026"
  description: "tiktoken o200k_base counts and 30-day prices for compact tools/list JSON from Exa MCP 3.5.0, Firecrawl MCP 3.39.0, Tavily MCP 0.2.23, and Brave Search MCP 2.1.4, plus the published OpenAI and Anthropic web search declarations. The prompt was 28 tokens. Output tokens were entered as 200 and turns per day as 40. gpt-5 is an exact o200k_base count. Claude Sonnet 5.5 reuses that count as an estimate, and adds 286 published tool-use prompt tokens only on the Anthropic-shaped declaration."
  isBasedOn: "https://www.aiagentsinfo.com/agent-prompt-checker"
sources:
  - title: "Exa hosted MCP, tools/list (server 3.5.0, 07:17:59 UTC, November 11, 2026)"
    url: "https://mcp.exa.ai/mcp"
  - title: "Exa hosted MCP, tools/list with tools=web_search_exa (server 3.5.0, same request window)"
    url: "https://mcp.exa.ai/mcp?tools=web_search_exa"
  - title: "Tavily MCP, repository main, commit ff166aa, package 0.2.23 (committed November 5, 2026)"
    url: "https://github.com/tavily-ai/tavily-mcp"
  - title: "Firecrawl hosted MCP, keyless tools/list (firecrawl-fastmcp 3.39.0, 07:17:59 UTC, November 11, 2026)"
    url: "https://mcp.firecrawl.dev/v2/mcp"
  - title: "Brave Search MCP server 2.1.4, tag v2.1.4, commit 8bcb302 (published September 17, 2026)"
    url: "https://github.com/brave/brave-search-mcp-server"
  - title: "OpenAI, Web search guide, the {type: web_search} declaration (read November 11, 2026)"
    url: "https://developers.openai.com/api/docs/guides/tools-web-search"
  - title: "Anthropic, Web search tool, the web_search_20260318 example (read November 11, 2026)"
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool"
  - title: "OpenAI API pricing (gpt-5 standard row, read November 11, 2026)"
    url: "https://developers.openai.com/api/docs/pricing"
  - title: "Anthropic API pricing (Claude Sonnet 5.5 row, read November 11, 2026)"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
  - title: "AI Agents Info, web search API prices (read November 11, 2026)"
    url: "https://www.aiagentsinfo.com/blog/web-search-api-prices-for-ai-agents-november-2026"
  - title: "AI Agents Info, Free agent prompt and tool checker"
    url: "https://www.aiagentsinfo.com/agent-prompt-checker"
faq:
  - question: "How many tokens does a web search tool definition cost?"
    answer: "It depends which JSON you keep loaded. On November 11, 2026, Brave Search MCP 2.1.4's eight-tool list was 25,495 tokens. brave_web_search alone was 1,400. Exa's search-only tools/list was 348. OpenAI's published {type: web_search} declaration was 8. Anthropic's web_search_20260318 example was 17. The count is tiktoken o200k_base of the compact JSON, with a 28-token prompt beside it."
  - question: "What does Brave's tool list cost over 30 days?"
    answer: "On gpt-5, with 200 output tokens and 40 turns a day entered, the eight-tool list was $0.03390375 a turn and $40.6845 over 30 days. brave_web_search alone was $0.003785 and $4.542. The checker page rounds a total of at least $1 to the cent, so those two rows show as $40.68 and $4.54. The 200 output tokens are $2.40 of each figure."
  - question: "Is the search fee included in those 30-day figures?"
    answer: "No. The checker prices the pasted text as tokens. The search fee is extra, and only when the agent searches. At one search on every one of those 1,200 turns, Brave's web search plan is $6, Tavily basic pay-as-you-go is $9.60, and Claude or OpenAI web search is $12. Those rates are the November 11 price card. Search-result tokens are still not in the sum."
  - question: "Can I paste an MCP tools/list into the OpenAI or Anthropic API?"
    answer: "The checker rejected that paste. Each MCP tool was one error with the target set to OpenAI, and one error with the target set to Anthropic. Auto-detect and the MCP target accepted the same JSON. Tavily's sixth tool, tavily_feedback, also drew one warning for anyOf."
---

Updated November 11, 2026.

Brave's eight tools were 25,495 tokens. Pasted alone, `brave_web_search` was 1,400. I counted both on the morning of November 11, 2026, from the JSON those servers return for `tools/list`, using the same `checkPrompt` function the [prompt and tool checker](/agent-prompt-checker) calls.

On gpt-5, with 200 output tokens and 40 turns a day entered, the eight-tool list was $0.03390375 a turn and $40.6845 over 30 days. `brave_web_search` alone was $0.003785 and $4.542. The $36.1425 difference is the rest of that list. The prompt and the output box were the same on both rows.

OpenAI's published declaration, `{"type":"web_search"}`, was 8 tokens. Anthropic's `web_search_20260318` example was 17. Exa's live search-only list was 348. If you search on every turn, those three are cheap to keep loaded and the per-search fee is the bill. Brave's default list is the other way around.

## What went into the checker

The prompt on every row was:

> You are a research agent. Use a web search tool when the question needs a current page. Do not invent a URL or a quote.

That sentence was 28 tokens. Output tokens were entered as 200. Turns per day were entered as 40, so the 30-day column is the per-turn price times 1,200. gpt-5 is a tiktoken `o200k_base` count of the pasted text. Claude Sonnet 5.5 reuses that count and the checker labels it an estimate. Message framing is not included. The paste was `JSON.stringify` of the tools array, compact, key order unchanged.

Exa and Firecrawl answered a live `tools/list` at 07:17:59 UTC. The handshake asked for protocol version `2025-06-18`. No Authorization header.

Tavily's hosted URL, `https://mcp.tavily.com/mcp`, returned HTTP 401 with an empty body. The official repository at commit `ff166aa` (package 0.2.23, committed November 5, 2026) started on stdio without `TAVILY_API_KEY`, printed that it was in keyless mode, and returned six tools. That is the list below. npm's latest tarball that morning was 0.2.22, so this is the repository, not that tarball.

Brave's CLI exited 1 without a key. The message was: "A Brave API key is required via --brave-api-key, BRAVE_API_KEY, --brave-api-key-file, or BRAVE_API_KEY_FILE." I did not invent a key and I did not call the search API. The tool JSON is `createMcpServer()` from the published package `@brave/brave-search-mcp-server` 2.1.4, tag `v2.1.4`, commit `8bcb302`, released September 17, 2026, listed over the SDK's in-memory transport. That is the same `registerTool` path the CLI uses after the key check.

The hosted declarations are the objects the vendor docs tell you to send. OpenAI's web-search guide says new Responses integrations send `{ "type": "web_search" }`. Anthropic's tool page uses `{ "type": "web_search_20260318", "name": "web_search" }` for the current agentic version. Neither page publishes the schema the model sees internally. This count is the declaration, not a guessed hidden prompt.

| Paste | Version | Tools | Tool tokens |
| --- | --- | --- | --- |
| [Brave](https://github.com/brave/brave-search-mcp-server) default list | 2.1.4 | 8 | 25,495 |
| Brave, name, description, and inputSchema only | 2.1.4 | 8 | 8,284 |
| [Firecrawl](https://mcp.firecrawl.dev/v2/mcp) keyless list | 3.39.0 | 3 | 5,887 |
| [Tavily](https://github.com/tavily-ai/tavily-mcp) keyless list | 0.2.23 | 6 | 3,184 |
| [Exa](https://mcp.exa.ai/mcp) default list | 3.5.0 | 2 | 549 |
| OpenAI `{"type":"web_search"}` | guide, read Nov 11 | 1 | 8 |
| Anthropic `web_search_20260318` | tool page, read Nov 11 | 1 | 17 |

Exa's two tools were `web_search_exa` and `web_fetch_exa`. Firecrawl's keyless three were `firecrawl_scrape`, `firecrawl_search`, and `firecrawl_parse`. Tavily's six were `tavily_search`, `tavily_extract`, `tavily_crawl`, `tavily_map`, `tavily_research`, and `tavily_feedback`. Brave's eight were `brave_web_search`, `brave_local_search`, `brave_video_search`, `brave_image_search`, `brave_news_search`, `brave_summarizer`, `brave_llm_context`, and `brave_place_search`.

`initialize` also returned an instructions string. Counted alone, with the same encoding, Exa was 98 tokens, Firecrawl 402, Tavily 92, and Brave 18. Those tokens are not in the table. A client that copies instructions into the system prompt pays them on top.

## Where Brave's 25,495 tokens sit

`brave_place_search`, pasted as its own one-tool array, was 17,296 tokens. The object is 77,365 of the 110,719 characters in the eight-tool list. Of that object, 71,381 characters are `outputSchema`. The name, the description, and `inputSchema` for that one tool were 1,527 tokens.

The eight tools with only name, description, and `inputSchema` were 8,284 tokens. Dropping every `outputSchema` cuts the list from 25,495 to 8,284. The model does not need the output schema to decide whether to call the tool. A harness that forwards the raw `tools/list` body pays for it anyway.

`brave_web_search` does not carry an output schema. Pasted alone it was 1,400 tokens, and the input-schema slice was 1,369. The expensive object is place search, not web search.

## What the schema check said

Every MCP paste was accepted on auto-detect and on the MCP target. The same paste was one error per tool on the OpenAI target and one error per tool on the Anthropic target. The OpenAI error says a function tool uses `type: "function"` and a `parameters` schema. The Anthropic error says a user-defined tool uses `input_schema`. Tavily's `tavily_feedback` also drew one warning: `anyOf` is present, and this checker does not test those branches.

OpenAI's `{ "type": "web_search" }` was accepted on auto-detect and on the OpenAI target, with one warning that a built-in tool is not a function schema and that its separate fee is not in the price. The Anthropic and MCP targets rejected it.

Anthropic's `web_search_20260318` object was accepted on auto-detect and on the Anthropic target, with one warning that a dated server tool is not a user-defined `input_schema` and that its extra fee is not in the price. The OpenAI and MCP targets rejected it. On Claude Sonnet 5.5, those two accepting targets added 286 input tokens from Anthropic's published tool-use system prompt. gpt-5 does not get that add, and the MCP rows do not get it either, because the JSON is not Anthropic's shape.

## What gpt-5 and Sonnet 5.5 priced

gpt-5's standard price, read November 11, 2026, is $1.25 per million input tokens and $10 per million output tokens. Claude Sonnet 5.5 is $2 and $10. Cached, batch, and fast prices are not in either row.

The 200 output tokens are $2.40 of every gpt-5 row and every Sonnet row: 200 × $10 / 1,000,000 × 1,200. The 28-token prompt is $0.042 on gpt-5 and $0.0672 on Sonnet. Subtract those two pieces from a 30-day figure and what remains is the tool text.

| Paste | gpt-5 per turn | gpt-5, 30 days | Sonnet 5.5, 30 days |
| --- | --- | --- | --- |
| Brave, eight tools | $0.03390375 | $40.6845 | $63.6552 |
| Brave, input schemas only | $0.01239 | $14.868 | $22.3488 |
| Firecrawl, three tools | $0.00939375 | $11.2725 | $16.596 |
| Tavily, six tools | $0.006015 | $7.218 | $10.1088 |
| Exa, two tools | $0.00272125 | $3.2655 | $3.7848 |
| OpenAI `web_search` | $0.002045 | $2.454 | $2.4864 |
| Anthropic `web_search_20260318` | $0.00205625 | $2.4675 | $3.1944 |

Sonnet's Claude row is the one that includes the 286-token tool-use prompt. Without it, that row's input is 45 tokens and the 30-day figure is $2.508, which is what the MCP target priced. The other Sonnet rows do not add 286. The checker page rounds a total of at least $1 to the cent. The eight-tool Brave row shows as $40.68 on gpt-5 and $63.66 on Sonnet. The web-search-only row below shows as $4.54 and $5.83.

## The search tool, without the rest of the server

Exa's `?tools=web_search_exa` is a second `tools/list`. It returned one tool and 348 tokens. The other search rows are slices of the lists above. I did not get a second handshake that contained only that tool.

| Search paste | How it was taken | Tool tokens | gpt-5, 30 days | Sonnet 5.5, 30 days |
| --- | --- | --- | --- | --- |
| Exa `web_search_exa` | `tools/list` with `?tools=web_search_exa` | 348 | $2.964 | $3.3024 |
| Tavily `tavily_search` | sliced from the six-tool list | 862 | $3.735 | $4.536 |
| Brave `brave_web_search` | sliced from the eight-tool list | 1,400 | $4.542 | $5.8272 |
| Firecrawl `firecrawl_search`, full object | sliced from the keyless list | 2,455 | $6.1245 | $8.3592 |
| Firecrawl search, input schema only | same object, three fields | 2,109 | $5.6055 | $7.5288 |
| Brave `brave_place_search`, full object | sliced from the eight-tool list | 17,296 | $28.386 | $43.9776 |
| Brave place search, input schema only | same object, three fields | 1,527 | $4.7325 | $6.132 |

Tavily's search schema defaults `search_depth` to `basic`. Firecrawl's `scrapeOptions` says to leave it unset unless you need the full page, and that each fetched result is billed as a scrape. The `limit` field has a minimum of 1 and a maximum of 100 and no default. Exa 3.5.0's search schema has `query`, `numResults`, and a required `objective`. It does not name a search type.

## Add the per-search fee

The token table is the cost of keeping the definition loaded. The [November 11 price card](/blog/web-search-api-prices-for-ai-agents-november-2026) is the cost of the call. One search on each of the 1,200 turns is 1,200 searches.

Brave's Search plan is $5 per 1,000, so 1,200 web searches are $6. Tavily basic pay-as-you-go is $8 per 1,000, so $9.60. Claude's web search tool and OpenAI's `web_search` tool are $10 per 1,000, so $12. Those three mappings come from the tool's own schema or from the declaration the docs name. Exa's 3.5.0 schema does not say lite or auto, so this page does not add the price card's $4 or $7. Firecrawl's schema does not fix the result count, so this page does not add the Hobby or Standard figure.

| Path, gpt-5, except the Claude row | Definition, 30 days | 1,200 searches | Together |
| --- | --- | --- | --- |
| Brave's eight tools, and one web search a turn | $40.6845 | $6 | $46.6845 |
| `brave_web_search` only | $4.542 | $6 | $10.542 |
| Tavily's six tools, basic depth | $7.218 | $9.60 | $16.818 |
| `tavily_search` only | $3.735 | $9.60 | $13.335 |
| OpenAI `{ "type": "web_search" }` | $2.454 | $12 | $14.454 |
| Claude `web_search_20260318` on Sonnet 5.5 | $3.1944 | $12 | $15.1944 |

The together column still leaves out the text the search puts back into the window. On OpenAI and Claude that text is billed as input tokens, and for `gpt-4o-mini` and `gpt-4.1-mini` the price card records a fixed 8,000-token block. Do not copy the $12 onto a turn that also reads the pages. The $12 is the tool fee for 1,200 calls.

At this workload, Brave's tool text is $38.2425 of the $40.6845. Twelve hundred Brave searches are $6. The definition is the larger line, and most of that line is an output schema on a tool the turn did not call. Tavily flips it. Six tools of schema are $4.776 of tool text. Twelve hundred basic searches are $9.60. OpenAI's declaration is $0.012 of tool text. The $12 fee is the line that matters, and then the pages.

## What this means when you attach search

Keep the search tool. Leave the rest unloaded until the turn needs it.

On Brave, pass `--enabled-tools brave_web_search`. The package reads that flag. The default eight-tool list is a $40.6845 definition on this gpt-5 workload. The web-search tool is $4.542, and $2.40 of that is the output box I typed. Place search is the object to refuse unless the agent is looking up a business.

On Exa, set `?tools=web_search_exa` when you do not need `web_fetch_exa` on every turn. That list was 348 tokens and $2.964 over 30 days, against 549 tokens and $3.2655 for the default pair. The gap is small. The reason to trim it is the result text, not the schema. I did not price Exa's call, because server 3.5.0 does not name the type.

On Tavily, the keyless process still listed crawl, map, research, and feedback. Pasted alone, `tavily_search` was 862 tokens. The six-tool list was 3,184. Paste the search tool when the turn only searches. The hosted endpoint still wants a key before it will list anything. I did not measure that hosted list.

On Firecrawl's keyless server, scrape and parse sit beside search. The three-tool list was 5,887 tokens. The search object was 2,455 tokens, and the same object kept to name, description, and inputSchema was 2,109. Leave `scrapeOptions` unset unless you mean to buy the scrape. The price card's Hobby and Standard figures are for a search of up to 10 results with no scrape. This schema does not set that limit for you.

On OpenAI and Claude, send the short declaration and budget the $10 per 1,000, then budget the pages. Do not budget a 25,000-token schema for a hosted tool. The vendors do not publish one. Eight tokens and 17 tokens are what the request sends.

The calculator that adds the call fee to these definition sizes, and to a result length you type, is [web search API cost per agent task](/tools/web-search-api-cost-per-agent-task). Brave's row there uses the 1,400-token search tool, not the 25,495-token list.

Serper's $1 per 1,000 pack is still the cheap Google result page on the [price card](/blog/web-search-api-prices-for-ai-agents-november-2026), and that page found no official MCP server for it. The consumer products are [Best AI agent for web search](/best/ai-agents-for-web-search). A documentation-server count from the day before, Context7 and DeepWiki, is a different list: [Context7 and DeepWiki MCP tool definitions](/blog/live-mcp-tool-json-token-counts).

The checker does not store the paste. These counts were produced from the public tool JSON and the two published declarations, then discarded with the process.
