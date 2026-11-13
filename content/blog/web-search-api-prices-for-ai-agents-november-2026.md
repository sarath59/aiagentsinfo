---
title: "Claude and OpenAI web search both cost $10 per 1,000. Serper’s entry pack is $1."
description: "On November 11, 2026, Claude and OpenAI charge $10 per 1,000 web searches, plus tokens. Serper’s $50 pack is $1 per 1,000 Google results. Exa Lite is $4."
absoluteTitle: true
takeaways:
  - "Claude’s API and OpenAI’s web_search tool both list $10 per 1,000 searches, read November 11, 2026. The results then bill as tokens. OpenAI’s legacy web_search_preview tool on non-reasoning models is $25 per 1,000, and on that path the search-content tokens are free."
  - "If the harness only needs Google’s result page, Serper’s Starter pack is $50 for 50,000 credits, which the page prices at $1.00 per 1,000, at 50 queries per second. SerpAPI’s Starter plan is $25 for 1,000 searches a month, at 200 successful searches an hour."
  - "Exa Lite is $4 per 1,000 requests for up to 10 results, served from cache. Tavily basic search is 1 credit, and pay-as-you-go is $0.008 a credit, so 1,000 basic searches are $8. Brave Search is $5 per 1,000 requests at 50 queries per second."
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
  - perplexity
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Web search API list prices for AI agents, read November 11, 2026"
  description: "List prices, free allowances, rate limits, and what each call returns, copied from Tavily, Exa, Brave, Perplexity, SerpAPI, Serper, Firecrawl, OpenAI, and Anthropic pricing or docs pages on November 11, 2026. Per-1,000 figures that divide a plan price by included credits are labeled as this page’s arithmetic. No account was billed."
  isBasedOn: "https://developers.openai.com/api/docs/pricing"
sources:
  - title: "OpenAI API pricing, Tools, web search (read November 11, 2026)"
    url: "https://developers.openai.com/api/docs/pricing"
  - title: "OpenAI, Web search guide (read November 11, 2026)"
    url: "https://developers.openai.com/api/docs/guides/tools-web-search"
  - title: "Anthropic, Web search tool (read November 11, 2026)"
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool"
  - title: "Anthropic API pricing, web search tool (read November 11, 2026)"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
  - title: "Tavily pricing (read November 11, 2026)"
    url: "https://www.tavily.com/pricing"
  - title: "Tavily Search API reference (read November 11, 2026)"
    url: "https://docs.tavily.com/documentation/api-reference/endpoint/search"
  - title: "Tavily rate limits (read November 11, 2026)"
    url: "https://docs.tavily.com/documentation/rate-limits"
  - title: "Exa pricing (read November 11, 2026)"
    url: "https://exa.ai/docs/admin/pricing"
  - title: "Exa billing and rate limits (read November 11, 2026)"
    url: "https://exa.ai/docs/admin/billing"
  - title: "Brave Search API plans (read November 11, 2026)"
    url: "https://brave.com/search/api/"
  - title: "Brave Search API help (read November 11, 2026)"
    url: "https://api-dashboard.search.brave.com/documentation/resources/help-feedback"
  - title: "Perplexity API pricing (read November 11, 2026)"
    url: "https://docs.perplexity.ai/docs/getting-started/pricing"
  - title: "Perplexity Agent API models, perplexity/sonar (read November 11, 2026)"
    url: "https://docs.perplexity.ai/docs/agent-api/models"
  - title: "Perplexity rate limits (read November 11, 2026)"
    url: "https://docs.perplexity.ai/docs/getting-started/rate-limits"
  - title: "SerpAPI pricing (read November 11, 2026)"
    url: "https://serpapi.com/pricing"
  - title: "Serper homepage pricing (read November 11, 2026)"
    url: "https://serper.dev/"
  - title: "Firecrawl pricing (read November 11, 2026)"
    url: "https://www.firecrawl.dev/pricing"
  - title: "Firecrawl search billing (read November 11, 2026)"
    url: "https://docs.firecrawl.dev/features/search"
  - title: "Firecrawl search endpoint (read November 11, 2026)"
    url: "https://docs.firecrawl.dev/api-reference/endpoint/search"
faq:
  - question: "Which web search tool should a Claude or OpenAI agent call?"
    answer: "Use the vendor tool when the agent must cite inside that same API call. On November 11, 2026 both Claude’s web search tool and OpenAI’s web_search tool list $10 per 1,000 searches, plus the tokens the results become. Use Serper, at $1 per 1,000 on the $50 pack, when the harness only needs Google’s result page and will run its own tool loop. Use Exa Lite, at $4 per 1,000, when the search price should include up to 10 cached results."
  - question: "Do Claude and OpenAI charge the same amount for web search?"
    answer: "The tool fee matches, at $10 per 1,000 searches. The token bill does not. OpenAI also still lists web_search_preview at $25 per 1,000 for non-reasoning models, with search-content tokens free. For gpt-4o-mini and gpt-4.1-mini, the non-preview tool bills search content as a fixed 8,000 input tokens per call."
  - question: "What is the cheapest search API with a free start and no card?"
    answer: "Tavily’s Researcher plan is 1,000 credits a month with no card. A basic search is 1 credit. Serper’s homepage offers 2,500 free queries with no card, then $1 per 1,000 on the $50 pack. Exa’s free tier is $10 in credits a month, which the pricing page caps at 2,500 Lite searches, and no payment method is required."
  - question: "Which of these publish an official MCP server?"
    answer: "Tavily, Exa, Brave, Perplexity, SerpAPI, and Firecrawl publish an official MCP server. Serper’s homepage, read November 11, 2026, does not. OpenAI web_search and Claude web_search are hosted tools on those APIs, not MCP servers you install."
  - question: "Is SerpAPI’s Starter plan $25 per 1,000 searches?"
    answer: "Yes, if the plan is used up. Starter is $25 a month for 1,000 searches, so the unit price of a full plan is $25 per 1,000. Throughput is 200 successful searches an hour. Production is $150 for 15,000, which is $10 per 1,000 on the same arithmetic, and that plan includes the U.S. Legal Shield."
---

Claude’s API and OpenAI’s current `web_search` tool both list **$10 per 1,000 searches**. You then pay for the text those searches put into the context window. Serper’s entry pack is **$1 per 1,000** Google result-page queries. If the [harness](/glossary/harness) only needs that result page, the native tool fee is ten times Serper’s, before a single token.

OpenAI’s older `web_search_preview` tool, on models that are not reasoning models, is **$25 per 1,000**, and on that path the search-content tokens are free. The web-search guide says new Responses integrations should send `{ "type": "web_search" }`, which is the $10 path.

The consumer products, ChatGPT search and Claude web search inside the apps, are a different bill. That comparison is [Best AI agent for web search](/best/ai-agents-for-web-search). This page is the API a builder wires into an agent loop. Every figure below was read from the vendor’s pricing or docs page on November 11, 2026. A per-1,000 figure that divides a plan price by the credits in the plan is this page’s arithmetic, and it assumes the plan is used up.

## Which tool do you actually call?

Match the object you get back. A snippet list, a cached page, a Google result page, and a cited answer are four different tool results. They do not become the same thing because each one is called search.

| Job | Call this | Tool fee per 1,000 | What comes back |
| --- | --- | --- | --- |
| A cited answer inside a Claude or OpenAI request | Claude `web_search`, or OpenAI `web_search` | $10, then tokens | The model’s answer, with citations. The retrieved text is input tokens. |
| Google’s result page, and you run the tool loop | Serper Starter | $1.00 | A live Google result page, as the SERP API returns it. Not cached, per the FAQ. |
| Up to 10 results with cached page content in the search price | Exa `/search` with `type: "lite"` | $4 | Up to 10 results. Lite serves page content from Exa’s cache and does not fetch live. |
| Snippets, no card, 1,000 calls a month | Tavily basic, fast, or ultra-fast | $0 on the free 1,000 credits, then $8 | Snippets, or one summary per URL on ultra-fast. Not the full page. |
| 50 queries a second, and a card is acceptable | Brave Search | $5 | URLs, text, news, images, and LLM context. Extra alternate snippets. |
| A full page in markdown, not a snippet | Firecrawl search, then scrape | $7.60 on Hobby, $1.98 on Standard, for a search of up to 10 results with no scrape | URL, title, and description unless you turn scraping on. Scraping adds credits. |

The $10 native fee is the right buy when you do not want to host the tool loop. It is the wrong buy when the next step only needs titles and URLs. [Tool use](/glossary/tool-use) is the model asking for a result. You still choose which result, and which bill, that call returns.

## What does each 1,000 searches cost on November 11?

The table is the list price of one successful search call, not a finished agent task. Native tools add tokens. Credit plans get cheaper, or more expensive, when you do not use the pack.

| Provider | Price per 1,000 searches | Free start | Rate limit on the public page | Returns |
| --- | --- | --- | --- | --- |
| OpenAI `web_search` | $10, plus search-content tokens at the model rate | None listed on the pricing page | The model’s own tier | A `web_search_call`, then a message with `url_citation` annotations |
| OpenAI `web_search_preview`, non-reasoning | $25, search-content tokens free | None listed | The model’s own tier | Legacy tool. The guide says it does not support filters or `return_token_budget`, and it ignores `external_web_access`. |
| Claude `web_search` | $10, plus tokens for the retrieved text | None listed as a separate search allowance | The console’s org limit. No single public RPM. | Cited search results, counted as input tokens. A failed search is not billed. |
| Serper Starter | $1.00 | 2,500 queries, no card | 50 queries/second on this pack | Google SERP, queried live. Credits last 6 months. |
| Serper Ultimate | $0.30 | Same free queries | 300 queries/second | Same API. $3,750 for 12.5 million credits. |
| Exa Lite | $4 for up to 10 results | $10 in credits a month, up to 2,500 Lite searches, no card | 10 QPS on `/search` | Cached page content. Results past 10 are $1 per 1,000 results. |
| Exa Auto | $7 for up to 10 results | Same free credit | 10 QPS. Deep types are 5 QPS. | The $7 row. AI page summaries are an extra $1 per 1,000 pages. |
| Tavily basic, fast, or ultra-fast | $8 at $0.008 a credit | 1,000 credits a month, no card | 100 requests/minute on the free plan, 1,000 once pay-as-you-go is on | Snippets. Ultra-fast is one summary per URL. Advanced is 2 credits, so $16. |
| Brave Search | $5 | $5 in credits a month, which is 1,000 Search requests, and a card is required | 50 queries/second | Result-page fields plus LLM context. |
| Perplexity Search API | $5, or $1 with `search_type: "fast"` | No free search allowance on the pricing page | 50 query units/second, every tier | Ranked results. Page text is extracted into each `snippet`. No model tokens. |
| Perplexity Agent API `web_search` | $2.50, or $1 on Fast Search | Tier 0 exists at $0 purchased. No search quota is printed. | 1 QPS at Tier 0, up to 33 QPS at Tier 4 | A tool call inside an agent request. Model tokens are extra. |
| SerpAPI Starter | $25 if the 1,000 searches are used | 250 searches a month | 200 successful searches/hour | One credit per successful search, whether the response has 100 results or none. |
| SerpAPI Production | $10 if all 15,000 are used | The free plan is separate | 3,000/hour | Same credit rule. U.S. Legal Shield starts on this plan. |
| Firecrawl, up to 10 results, no scrape | $7.60 on the $19 Hobby plan, $1.98 on the $99 Standard plan | 1,000 credits a month, enough for 500 such searches | Concurrency 2 on Free, 5 on Hobby, 25 on Standard. The free plan says “low rate limits.” | URL, title, and description. Markdown is a scrape, at 1 more credit a page. |

Serper’s other packs, from the same homepage, are Standard at $375 for 500,000 credits ($0.75 per 1,000, 100 queries a second) and Scale at $1,250 for 2.5 million ($0.50 per 1,000, 200 a second). Prices exclude sales tax. Credits are deducted on a successful response, and a zero balance stops new queries.

SerpAPI’s pricing page continues through Cloud 1M at $3,750 a month for 1,000,000 searches, which is $3.75 per 1,000 if that plan is used up, at 110,000 searches an hour. Ludicrous Speed is a 2× multiplier on the plan price. The $25 and $10 figures above are Best Effort, the default.

## What do you get back, besides a URL?

This is the cut that the sticker price hides.

Tavily’s search reference, read the same day, says basic and fast return chunks of about 500 characters, advanced about 800, and `chunks_per_source` stops at 3. Ultra-fast returns one NLP summary per URL. `max_results` stops at 20. Full-page extraction is the Extract endpoint, and this table does not price it. Basic, fast, and ultra-fast cost 1 credit. Advanced costs 2.

Exa’s pricing page prices `/search` with `lite` at $4 per 1,000 requests for up to 10 results, and it does not add an AI-summary charge on that row. The same docs say lite serves page content from the cache and never fetches a page live. `auto` and the legacy `fast` type are $7 per 1,000, and an AI page summary on those types is $1 per 1,000 pages. A result past the tenth is $1 per 1,000 results on both.

Brave’s Search plan says the $5 buys complete search results, named as URLs, text, news, images, and more, plus LLM context, at 50 queries a second. The help page says each plan includes $5 in free credits every month, and that the Search credit is 1,000 queries. It also says there is no standalone free plan: the card is how the $5 credit is turned on, with the prepay amount set to $0. Answers is a different plan, $4 per 1,000 requests plus $5 per million input and output tokens, at 2 queries a second. This comparison prices Search.

Perplexity’s pricing page, read November 11, does not list a Sonar Chat Completions request fee. What it lists is a Search API at $5 per 1,000 successful requests, or $1 with Fast Search, with page text extracted into the snippet and no token bill. One `POST /search` can carry up to five queries and still be one billing unit. The rate-limit page counts those five as five query units against a 50-unit-per-second cap. An empty successful response is billed. A 429 is not. The Agent API’s `web_search` tool is $0.0025 a call, which is $2.50 per 1,000, or $0.001 on Fast Search. `perplexity/sonar` on the Agent API models page is $0.25 per million input tokens and $2.50 per million output tokens. The tool fee sits on top of that.

OpenAI’s pricing page says web search, including images, is $10 per 1,000 calls plus search-content tokens at the model rate. The note under the table says those tokens are retrieved from the index and fed to the model with the prompt. For `gpt-4o-mini` and `gpt-4.1-mini`, the non-preview tool bills that content as a fixed block of 8,000 input tokens a call. At the $0.15 per million input rate on the same page, 8,000 tokens are $0.0012. Add the $0.01 tool fee and the search, before any output tokens, is $0.0112 on those two models. That multiplication is this page’s. Do not copy it onto a model whose search content is not a fixed 8,000. The guide’s rate limit is the model’s tier, not a separate search quota.

Claude’s tool page and the pricing page use the same sentence: $10 per 1,000 searches, plus standard token costs for search-generated content. Each search counts as one use no matter how many results come back. An error is not billed. Results retrieved in the turn, and in later turns, count as input tokens. The docs point the rate limit at the Claude Console. They do not print one public number, so this page does not invent one.

Firecrawl’s search docs price a search at 2 credits per 10 results, rounded up. The API reference says that without scrape options the response is the URL, the title, and the description. Markdown is `scrapeOptions`. The pricing page’s Hobby plan is $19 a month for 5,000 credits. Dividing that by 5,000 and multiplying by 2 credits is $0.0076 a search, or $7.60 per 1,000. Standard is $99 for 100,000 credits, which is $1.98 per 1,000 on the same steps. The free plan is 1,000 credits, so 500 searches of up to 10 results. Firecrawl’s own search page states those two dollar figures. The division here uses the pricing-page inputs so the quotient can be checked.

SerpAPI’s FAQ says only successful searches count, and that 100 results cost the same one credit as an empty set. Cached, errored, and failed searches do not. The official MCP server describes more than one engine. The pricing page’s unit is the successful search, not a per-URL scrape.

## A four-search task, tool fee only

An agent that searches four times, and then reads the results on your own model bill, pays the tool fee four times. Tokens are not in this column. Using the entry paid price, and assuming a SerpAPI or Firecrawl plan is fully used:

| Four searches | Tool fee |
| --- | --- |
| Serper Starter, $0.001 each | $0.004 |
| Exa Lite, $0.004 each | $0.016 |
| Brave Search, $0.005 each | $0.020 |
| Tavily basic pay-as-you-go, $0.008 each | $0.032 |
| Claude or OpenAI `web_search`, $0.010 each | $0.040, then the tokens |
| Firecrawl Hobby, up to 10 results, no scrape | $0.0304 |
| SerpAPI Starter, $0.025 each | $0.100 |

At 100,000 such tasks a month, that is 400,000 searches. Serper Starter’s 50,000 credits do not cover it. Scale, at $0.50 per 1,000, is $200, if the credits are used inside six months. SerpAPI Starter cannot cover it either. Production’s $10 per 1,000 would be $4,000. Cloud 1M’s $3.75 per 1,000 cannot cover 400,000 inside a 1,000,000 plan without a second question about the rest of the month, and this page does not price a partial Cloud plan. The native $10 tool fee alone would be $4,000, and the context-window tokens would be the larger line on any model that actually reads the pages.

That is the cost-per-task check. A $10 tool that writes the answer can still be cheaper than a $1 tool plus a long page dumped into a frontier model. It is not cheaper when the harness only needed ten URLs.

## Which ones are an MCP server?

An [MCP](/glossary/model-context-protocol) server lets a harness call the tool without you writing the HTTP client. It does not change the price. The key still bills the account.

| Vendor | Official MCP, read November 11, 2026 |
| --- | --- |
| Tavily | Remote server at `https://mcp.tavily.com/mcp/`, and `tavily-ai/tavily-mcp` |
| Exa | Hosted server at `https://mcp.exa.ai/mcp` |
| Brave | `brave/brave-search-mcp-server` |
| Perplexity | Remote server at `https://api.perplexity.ai/mcp`, repo `perplexityai/modelcontextprotocol` |
| SerpAPI | Hosted server at `https://mcp.serpapi.com`, repo `serpapi/serpapi-mcp` |
| Firecrawl | `https://mcp.firecrawl.dev/v2/mcp`, with a keyless path and an OAuth path in the docs |
| Serper | Not listed on the homepage that carries the prices |
| OpenAI `web_search` | A hosted Responses tool. Not an MCP server. |
| Claude `web_search` | A hosted Messages server tool. Not an MCP server. |

Serper has third-party MCP servers. They are not on Serper’s pricing page, and this page does not recommend one. The Exa MCP repository says the hosted server works anonymously inside a rate limit, and that an API key or OAuth is how you get a higher limit and Exa Agent. Tavily’s free plan is 100 requests a minute, shared by every key in the account, and a search counts as one request whatever the depth.

The fee in the table is the call. The tool definition is a separate bill on every turn, before the agent searches. Measured on November 11, 2026: [Brave's MCP tool list is 25,495 tokens. Web search alone is 1,400.](/blog/web-search-tool-definition-tokens).

## What this means when you wire the harness

Put the native tool on the path where the product is a cited answer and you do not want a second vendor in the loop. Budget $10 per 1,000 searches, then budget the tokens. On OpenAI, confirm the request says `web_search`. A leftover `web_search_preview` on a non-reasoning model is the $25 row. On `gpt-4o-mini` and `gpt-4.1-mini`, add the fixed 8,000 input tokens, which are $0.0012 at the published mini rate, on top of the $0.01 call.

Put Serper on the path where the agent needs Google’s result page and your own code will decide what to open. The entry paid price is $1 per 1,000, the free start is 2,500 queries, and the credits expire in six months, so a $3,750 Ultimate pack is only $0.30 per 1,000 if you actually spend 12.5 million credits in time.

Put Exa Lite on the path where ten cached results are enough and you do not want a separate extract call. $4 per 1,000, 10 queries a second, $10 a month free.

Put Tavily on the path where you want snippets, a no-card month of 1,000 basic searches, and an MCP URL. Do not pay for advanced, at 2 credits, unless you need the longer chunks.

Do not put SerpAPI Starter on an agent because the logo says search. Twenty-five dollars buys 1,000 searches, and the hour stops at 200. Production, at $10 per 1,000 if you use all 15,000, is the first SerpAPI row that matches the native tool fee, and it is the row where the Legal Shield starts. Buy it for the engines and the shield, not because it was the first SERP API in the docs.

Brave is the high-throughput middle: $5 per 1,000, 50 a second, and the monthly $5 credit needs a card. Firecrawl is the wrong row if you only wanted snippets, and the right row if the agent’s next tool needs the page in markdown and you are willing to pay the scrape credits on top of the 2-credit search.

The app products that already search for a person sitting in a chat are still [Best AI agent for web search](/best/ai-agents-for-web-search). They are not this rate card. Which of these calls belongs in the loop, including Gemini grounding at $14 per 1,000 searches and a 1,500-request daily cap, is [What is the best web search tool for an AI agent harness?](/blog/best-web-search-tool-for-ai-agents).

The same searches, with the tool-definition tokens and a result length you type, are the [web search API cost per agent task](/tools/web-search-api-cost-per-agent-task) calculator. Call prices on that page were re-read November 13, 2026. Parallel, Firecrawl, Linkup, You.com, Jina, and Serper stay on this card and are not in the calculator, because those pages were not opened again that day. The November 12 dataset is [Best web search tool for Claude and OpenAI agents](/reports/web-search-tools-for-ai-agents-november-2026).
---
