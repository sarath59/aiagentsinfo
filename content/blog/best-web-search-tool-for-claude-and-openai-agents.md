---
title: "The best web search tool for a Claude or OpenAI agent is 8 tokens, or 17"
description: "OpenAI's web_search was 8 tokens and Claude's web_search_20260318 was 17. Exa's resolved schema was 5,251. Tavily's published schema was 1,329. Measured November 12, 2026."
absoluteTitle: true
takeaways:
  - "Give an OpenAI Responses agent {\"type\":\"web_search\"}. It was 8 tokens. Give a Claude Messages agent {\"type\":\"web_search_20260318\",\"name\":\"web_search\"}. It was 17. Both vendors list the search at $10 per 1,000 calls, and that fee is not in the token bill."
  - "Tavily's short OpenAI walkthrough was 90 tokens and passed with no schema notes. The full schema Tavily publishes for the same tool was 1,329 tokens, omits strict, and its country property alone was 607 tokens. The API reference also lists fast and ultra-fast. That enum does not."
  - "Exa's resolved SearchRequest, wrapped as the documented search operation, was 5,251 tokens. At the checker's starting boxes that schema is $1.969125 of tool text on gpt-5 over 30 days. The 800 output tokens are $2.40 of every gpt-5 and Claude Sonnet 5.5 row."
date: "2026-11-12"
updated: "2026-11-12"
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
  - perplexity
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Official web-search tool definitions counted on November 12, 2026"
  description: "tiktoken o200k_base counts from checkPrompt for compact JSON of OpenAI's web_search declaration, Anthropic's web_search_20260318 declaration, Tavily's published OpenAI and Anthropic search tools, and Exa's SearchRequest resolved from exa-spec.yaml. The prompt was 28 tokens. Output tokens were entered as 800 and turns per day as 10. gpt-5 and gpt-5-mini are exact o200k_base counts. Claude Sonnet 5.5 reuses that count as an estimate and adds 286 published tool-use prompt tokens only when the JSON is Anthropic's shape."
  isBasedOn: "https://www.aiagentsinfo.com/agent-prompt-checker"
sources:
  - title: "OpenAI, Web search guide, the {type: web_search} declaration (read November 12, 2026)"
    url: "https://developers.openai.com/api/docs/guides/tools-web-search"
  - title: "OpenAI API pricing, gpt-5, gpt-5-mini, and web search rows (read November 12, 2026)"
    url: "https://developers.openai.com/api/docs/pricing"
  - title: "Anthropic, Web search tool, the web_search_20260318 example (read November 12, 2026)"
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool"
  - title: "Anthropic API pricing, Claude Sonnet 5.5 row (read November 12, 2026)"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
  - title: "Tavily, OpenAI integration, the walkthrough tool and the search schema (read November 12, 2026)"
    url: "https://docs.tavily.com/documentation/integrations/openai"
  - title: "Tavily, Anthropic integration, the tavily_search input_schema (read November 12, 2026)"
    url: "https://docs.tavily.com/documentation/integrations/anthropic"
  - title: "Tavily Search API reference, search_depth and credit cost (read November 12, 2026)"
    url: "https://docs.tavily.com/documentation/api-reference/endpoint/search"
  - title: "Tavily pricing, Pay As You Go at $0.008 per credit (read November 12, 2026)"
    url: "https://www.tavily.com/pricing"
  - title: "Exa OpenAPI spec, SearchRequest (fetched November 12, 2026)"
    url: "https://exa.ai/docs/exa-spec.yaml"
  - title: "Exa pricing, lite and auto search rows (read November 12, 2026)"
    url: "https://exa.ai/docs/admin/pricing"
  - title: "Perplexity, Agent API web search tool (read November 12, 2026)"
    url: "https://docs.perplexity.ai/docs/agent-api/tools/web-search"
  - title: "Perplexity, Migrate from Sonar to the Agent API (read November 12, 2026)"
    url: "https://docs.perplexity.ai/docs/sonar/models"
  - title: "Brave Search API, Web search query parameters (read November 12, 2026)"
    url: "https://api-dashboard.search.brave.com/api-reference/web/search/get"
  - title: "AI Agents Info, Free agent prompt and tool checker"
    url: "https://www.aiagentsinfo.com/agent-prompt-checker"
faq:
  - question: "What web search tool should a Claude or OpenAI agent use?"
    answer: "Use the vendor's one-line tool. On November 12, 2026, OpenAI's guide says new Responses integrations send {\"type\":\"web_search\"}. That paste was 8 tokens. Anthropic's web search page shows {\"type\":\"web_search_20260318\",\"name\":\"web_search\"}. That paste was 17 tokens. Both list the search at $10 per 1,000 calls, on top of tokens. Paste a Tavily or Exa function only when your harness has to see the snippets and run the call."
  - question: "How many tokens is Tavily's official search tool?"
    answer: "Two different objects are on Tavily's OpenAI page. The walkthrough tool, query and max_results, was 90 tokens and the checker reported no schema notes. The full search schema on the same page was 1,329 tokens. Its country property, counted alone, was 607 tokens across 166 names. The Anthropic walkthrough, with query, max_results, and search_depth, was 78 tokens."
  - question: "Can I paste Perplexity's web_search into Claude or OpenAI?"
    answer: "The JSON is the same 23 characters as OpenAI's tool, {\"type\":\"web_search\"}. The checker calls that an OpenAI built-in. On Perplexity's Agent API it is Perplexity's search. Sending it to OpenAI calls OpenAI's search. Sonar's migration page shows a chat request with model and messages and no tools array. Sonar does not publish a function schema you can paste into Claude or OpenAI."
  - question: "Does the 30-day figure include the search fee?"
    answer: "No. The checker prices the pasted text. At the boxes used here, 800 output tokens and 10 turns a day, the output alone is $2.40 of every gpt-5 row and every Claude Sonnet 5.5 row over 30 days. One search on each of those 300 turns is a separate $3 on Claude or OpenAI at $10 per 1,000, $2.40 on Tavily basic at $0.008 a credit, and $2.10 on Exa auto at $7 per 1,000. Search-result tokens are not in any of those sums."
---

Updated November 12, 2026.

Give an OpenAI agent `{"type":"web_search"}`. It was 8 tokens. Give a Claude agent `{"type":"web_search_20260318","name":"web_search"}`. It was 17. I counted both on November 12, 2026, with `checkPrompt`, the function the [prompt and tool checker](/agent-prompt-checker) calls.

[Best AI agent for web search](/best/ai-agents-for-web-search) answers a different question. It compares ChatGPT search, Claude's app, Gemini, and Perplexity for a person sitting in a chat. Search Console for this site shows why a builder still lands there. The query "best web search tool for claude / openai agents" is new this week: 7 impressions, average position 8.4, on that comparison. "ai web search" had 7 impressions. The tools array is not on that page.

Exa's resolved search schema was 5,251 tokens. Tavily's published OpenAI schema was 1,329. Tavily's short walkthrough was 90. If the harness must see the snippet, paste the short one. Do not paste the schema page.

## What went into the checker

The prompt on every row was the same sentence used on the November 11 count:

> You are a research agent. Use a web search tool when the question needs a current page. Do not invent a URL or a quote.

That sentence was 28 tokens. Output tokens were entered as 800. Turns per day were entered as 10, the boxes the checker shows before you type. The 30-day column is the per-turn price times 300. gpt-5 and gpt-5-mini are tiktoken `o200k_base` counts of the pasted text. Claude Sonnet 5.5 reuses that count, and the checker labels it an estimate. Message framing is not included. Each paste is compact JSON. Python `True` and `False` in Tavily's docs were written as JSON `true` and `false`. Key order is the order on the page.

The November 11 page measured MCP `tools/list` payloads, including Brave's eight-tool server. This page did not call those servers again. Brave's web search reference publishes query parameters. It does not publish a tools array. I did not invent one.

Prices below are the standard rows read November 12, 2026. gpt-5 is $1.25 per million input tokens and $10 per million output tokens. gpt-5-mini is $0.25 and $2. Claude Sonnet 5.5 is $2 and $10. Cached, batch, and regional prices are not used. The 286-token Claude tool-use prompt is the figure stored in the checker from Anthropic's overview, read November 9, 2026. I did not re-count that prompt today.

## Paste the one-line declaration

OpenAI's web search guide says new Responses integrations send `{ "type": "web_search" }`. Pasted as a one-element array, that object was 8 tokens. Auto-detect and the OpenAI target accepted it, with one warning: a built-in tool is not a function schema, and its separate fee is not in the price. The Anthropic target rejected it. The error says the object matches an OpenAI built-in tool.

Anthropic's page shows `{ "type": "web_search_20260318", "name": "web_search" }` for the current agentic version. That object was 17 tokens. Auto-detect and the Anthropic target accepted it, with one warning: a dated server tool is not a user-defined `input_schema`, and its extra fee is not in the price. The OpenAI target rejected it. On Claude Sonnet 5.5 the accepting targets added 286 input tokens. gpt-5 does not get that add.

Both vendors bill the call on top of tokens. OpenAI's pricing page lists web search, including images, at $10.00 per 1,000 calls, plus search-content tokens at the model rate. The same page lists web search preview for reasoning models at $10.00 per 1,000, and web search preview for other models at $25.00 per 1,000, with those content tokens free. Anthropic's tool page lists web search at $10 per 1,000 searches. A failed Anthropic search is not billed. Neither fee is inside the checker's 30-day figure.

The chat products on the [consumer comparison](/best/ai-agents-for-web-search) are still the right answer for a person who is not sending an API request. They are not these two JSON objects.

## Tavily's walkthrough is 90 tokens. The published schema is 1,329

Tavily's OpenAI page prints two search tools. The walkthrough is the one to paste.

```json
{"type":"function","name":"tavily_search","description":"Search the web using Tavily. Provide relevant links in your answer.","parameters":{"type":"object","properties":{"query":{"type":"string","description":"Search query for Tavily."},"max_results":{"type":"integer","description":"Max number of results to return","default":5}},"required":["query","max_results"],"additionalProperties":false},"strict":true}
```

That paste was 90 tokens. Auto-detect and the OpenAI target reported no schema notes. The Anthropic target rejected it as an OpenAI Responses function. `required` lists both `query` and `max_results`. `strict` is true.

The Anthropic page's walkthrough is a different object: `input_schema` with `query`, `max_results`, and `search_depth` of `basic` or `advanced`, and only `query` required. It was 78 tokens. Auto-detect and the Anthropic target were clean. The OpenAI target rejected it. On Sonnet 5.5 this row adds the 286-token tool-use prompt. The OpenAI-shaped rows do not.

The full search schema on the OpenAI page is the trap. It was 1,329 tokens. The country property, counted alone with the same encoding, was 607 tokens. The enum has 166 names. Those two counts are not a split of 1,329. Removing the property and counting again changes the commas, so the rest of the object is not 1,329 minus 607.

That schema's `search_depth` enum is `basic` and `advanced`, default `basic`. The Search API reference, read the same day, lists `advanced`, `basic`, `fast`, and `ultra-fast`. It prices `basic`, `fast`, and `ultra-fast` at 1 credit and `advanced` at 2. An agent that only sees the published tool cannot choose `fast` or `ultra-fast`. The schema also uses `oneOf` on `include_answer` and `include_raw_content`. The checker did not mention `oneOf`. It did warn that `strict` is omitted, so a Responses request may rewrite the schema and a Chat Completions request stays non-strict.

Pay As You Go on Tavily's pricing page is $0.008 per credit. One basic search is 1 credit, so 1,000 basic searches are $8. That $8 is this page's multiplication. It is not a number Tavily prints as a per-1,000 rate.

## Exa's request schema is 5,251 tokens

Exa does not publish a short function on the search page. The source of truth it names is `https://exa.ai/docs/exa-spec.yaml`. I fetched that file on November 12, 2026. It is OpenAPI 3.1.0, title "Exa Public API", version 2.0.0. `POST /search` has operationId `search` and this description: "Perform a search with an Exa prompt-engineered query and retrieve a list of relevant results. Optionally get contents."

The paste is that operation wrapped as one OpenAI function. The parameters object is `SearchRequest` with local `$ref` values inlined. `JsonValue` refers to itself, so six `$ref` entries to that schema stayed as the spec writes them. Keys whose names start with `x-` were removed. Nothing else was added. Compact, that tools array was 5,251 tokens.

Auto-detect and the OpenAI target accepted it and warned that `strict` is omitted. The Anthropic target rejected the wrapper. The checker did not mention the six `$ref` values. A model that receives this object is reading Exa's whole request, including contents, crawl dates, compliance, and the long `type` descriptions, on every turn that keeps the tool loaded.

Exa's pricing page lists `/search` with `lite` at $4 per 1,000 requests and `auto` or `fast` at $7 per 1,000. The page says the base price covers the first 10 results, and each result above 10 adds $1 per 1,000 results. `auto` and `fast` also list contents at $1 per 1,000 pages. The schema's default for `type` is `auto`. I did not price a shorter function I would have written myself. If you need a small Exa tool, you are no longer pasting Exa's schema. You are choosing fields. This count is the cost of not choosing.

## Perplexity's object is OpenAI's object

Perplexity's Agent API web search page tells you to send `{ "type": "web_search" }`. That string is identical to OpenAI's declaration. Same 23 characters. Same 8 tokens. The checker calls it an OpenAI built-in tool, because that is what the JSON is.

On `api.perplexity.ai` it is Perplexity's search. The page prices it at $2.50 per 1,000 invocations, or $1.00 per 1,000 with `search_type` set to `fast`, plus model tokens. Sending the same object to OpenAI does not buy that price. It buys OpenAI's web search.

Sonar is not a tool definition. The migration page says Sonar Chat Completions support ended on September 27, 2026, and that synchronous requests are being reformulated as Agent API requests. The Sonar example on that page is `model` plus `messages`. There is no tools array. I did not invent a Sonar function.

## What the checker's starting boxes cost

The 800 output tokens are $2.40 of every gpt-5 row and every Sonnet 5.5 row: 800 × $10 / 1,000,000 × 300. They are $0.48 of every gpt-5-mini row, at $2 per million. The 28-token prompt is $0.0105 on gpt-5, $0.0168 on Sonnet, and $0.0021 on gpt-5-mini. Subtract those two pieces and what remains is the tool text.

| Paste | Tool tokens | gpt-5, 30 days | Sonnet 5.5, 30 days | gpt-5-mini, 30 days |
| --- | --- | --- | --- | --- |
| OpenAI `web_search` | 8 | $2.4135 | $2.4216 | $0.4827 |
| Anthropic `web_search_20260318` | 17 | $2.416875 | $2.5986 | $0.483375 |
| Tavily walkthrough, OpenAI shape | 90 | $2.44425 | $2.4708 | $0.48885 |
| Tavily walkthrough, Anthropic shape | 78 | $2.43975 | $2.6352 | $0.48795 |
| Tavily published search schema | 1,329 | $2.908875 | $3.2142 | $0.581775 |
| Exa resolved `search` | 5,251 | $4.379625 | $5.5674 | $0.875925 |

Sonnet's two Anthropic-shaped rows include the 286-token tool-use prompt. The other Sonnet rows do not. The checker page rounds a total of at least $1 to the cent, so the Exa row shows as $4.38 on gpt-5 and $5.57 on Sonnet. The OpenAI declaration shows as $2.41 on gpt-5 and $2.42 on Sonnet. The unrounded figures are the ones in the table.

The tool text alone, over the same 300 turns, is the part that changes when you swap the JSON:

| Paste | gpt-5 tool text | Sonnet 5.5 tool text |
| --- | --- | --- |
| OpenAI `web_search` | $0.003 | $0.0048 |
| Anthropic `web_search_20260318` | $0.006375 | $0.1818 |
| Tavily walkthrough, OpenAI shape | $0.03375 | $0.054 |
| Tavily walkthrough, Anthropic shape | $0.02925 | $0.2184 |
| Tavily published search schema | $0.498375 | $0.7974 |
| Exa resolved `search` | $1.969125 | $3.1506 |

Sonnet's $0.1818 and $0.2184 include the 286 tokens. Without that published prompt, the Anthropic declaration's tool text on Sonnet would be 17 tokens, $0.0102, and Tavily's Anthropic walkthrough would be 78 tokens, $0.0468. The checker does not offer that row. It adds 286 when the shape matches and the model is Claude.

## Add the per-search fee

One search on each of the 300 turns is 300 searches. The definition table does not include them.

OpenAI's `web_search` and Claude's web search tool are $10 per 1,000, so 300 searches are $3. Tavily's Search API reference prices `basic`, `fast`, and `ultra-fast` at 1 credit and `advanced` at 2. At $0.008 a credit, 300 basic searches are $2.40 and 300 advanced searches are $4.80. The same page says that when `auto_parameters` is on, `search_depth` may be set to `advanced`, and that request then costs 2 credits. `auto_parameters` defaults to false. Exa's schema defaults `type` to `auto`, listed at $7 per 1,000, so $2.10 for 300 calls that stay within the first 10 results and do not buy contents. Contents on `auto` are $1 per 1,000 pages, and that line is not in the $2.10. `lite` is $4 per 1,000, $1.20, only when the request sets `lite`. Perplexity's $2.50 rate is $0.75, and the fast rate is $0.30. Those last two apply on Perplexity's API, not because you pasted the JSON into Claude or OpenAI.

| Path | Tool text, 30 days | 300 searches | Together |
| --- | --- | --- | --- |
| OpenAI `web_search` on gpt-5 | $0.003 | $3 | $3.003 |
| Claude `web_search_20260318` on Sonnet 5.5 | $0.1818 | $3 | $3.1818 |
| Tavily's short OpenAI tool, basic, on gpt-5 | $0.03375 | $2.40 | $2.43375 |
| Tavily's published schema, basic, on gpt-5 | $0.498375 | $2.40 | $2.898375 |
| Exa resolved schema, auto, up to 10 results, on gpt-5 | $1.969125 | $2.10 | $4.069125 |

The together column still leaves out the pages. OpenAI bills search-content tokens at the model rate, and for `gpt-4o-mini` and `gpt-4.1-mini` the pricing page records a fixed 8,000-token block on the non-preview tool. Anthropic counts retrieved results as input tokens. Do not copy the $3 onto a turn that also reads those pages.

At this workload the one-line tools are rounding error next to the $3 fee. Tavily's short schema is $0.03375 of tool text against $2.40 of basic searches. The published Tavily schema flips the emphasis: $0.498375 of schema against $2.40 of searches, and most of that schema is a country list the turn may never set. Exa's resolved schema is $1.969125 before a single $2.10 of auto searches.

## What this means when you attach search

Send the one-line tool when the agent is Claude or OpenAI and the vendor may run the search.

On OpenAI, the object is `{ "type": "web_search" }`. Budget $10 per 1,000 calls, then budget the pages. Eight tokens are not the bill. On Claude, the object is `{ "type": "web_search_20260318", "name": "web_search" }`. Same $10. Set `max_uses` if you need a cap inside the turn. The 17 tokens are not the bill. The 286-token tool-use prompt is larger than the declaration, and it is still smaller than one search.

Paste Tavily when the harness has to hold the snippet and make the call. Use the walkthrough that matches the API you are calling, OpenAI's 90-token function or Anthropic's 78-token tool. Leave the 1,329-token schema, and its 166 country names, out unless the agent must pick a country. If you need `fast` or `ultra-fast`, the published tool enum will not offer them. The API reference will.

Do not paste Exa's resolved `SearchRequest` into the tools array. At 5,251 tokens it costs more, on this gpt-5 workload, than 300 auto searches. Keep `query`, and set `type` yourself in code, if you want `lite` at $4 per 1,000 instead of the schema's `auto` default.

Do not paste Perplexity's `{ "type": "web_search" }` into OpenAI or Claude and call it Sonar. The checker cannot tell the two objects apart, because they are the same object. Sonar's documented request has no tool schema to paste. Brave's web search reference has query parameters and no tools array. The MCP measurement for Brave, Tavily, and Exa servers is a different paste, on [the November 11 count](/blog/web-search-tool-definition-tokens).

The rate card for the call, including vendors this page did not count as tool JSON, is [Claude and OpenAI web search both cost $10 per 1,000](/blog/web-search-api-prices-for-ai-agents-november-2026). The harness decision, including Gemini's cap, is [What is the best web search tool for an AI agent harness?](/blog/best-web-search-tool-for-ai-agents). The person choosing a chat product is still on [Best AI agent for web search](/best/ai-agents-for-web-search).

The checker does not store the paste. These counts were produced from the public JSON and the Exa spec, then discarded with the process.
