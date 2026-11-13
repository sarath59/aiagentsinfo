---
title: "What is the best web search tool for an AI agent harness?"
description: "No single winner. On November 11, 2026 Gemini grounding is $14 per 1,000 searches and 1,500 a day. Claude and OpenAI list $10. A snippet API is the one a harness can cap."
absoluteTitle: true
takeaways:
  - "There is no single best web search tool. On November 11, 2026 a hosted tool that writes the cited answer lists $10 per 1,000 searches on Claude and on OpenAI’s web_search, or $14 per 1,000 on Gemini 3 and newer after 5,000 free requests a month. Gemini’s Developer API default is 1,500 grounding requests a day."
  - "A snippet API is a different object. Tavily basic is 1 credit and Pay As You Go lists $0.008. Exa Lite is $4 per 1,000 and serves the index, not a live fetch. Brave Search is $5 per 1,000 at 50 queries a second. The harness sees the text and has to cite it."
  - "The failures are a page that instructs the model, a cached page that missed the update, and a loop that searches until the cap. Claude’s max_uses is a per-turn cap. Gemini’s 1,500 a day is a project cap. Four searches a task is 375 tasks before that Gemini cap."
date: "2026-11-11"
updated: "2026-11-13"
category: guide
topics:
  - harnesses
  - tools-saas
  - how-agents-work
  - research
audience:
  - builders
companies:
  - openai
  - anthropic
  - google
  - gemini
  - perplexity
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Web search tool contracts for an agent harness, read November 11, 2026"
  description: "Tool fees, return shapes, and caps copied from OpenAI, Anthropic, Google, Perplexity, Tavily, Exa, and Brave pages on November 11, 2026. The four-search bills, the 375-task Gemini day, and the $560 figure for 30 days at the 1,500-request cap are this page’s arithmetic on those rates. Latency milliseconds are Brave’s citation of an AIMultiple test, and the page does not date that test. AI Agents Info did not call the APIs."
  isBasedOn: "https://ai.google.dev/gemini-api/docs/google-search"
sources:
  - title: "Google, Grounding with Google Search (read November 11, 2026)"
    url: "https://ai.google.dev/gemini-api/docs/google-search"
  - title: "Google, Gemini Developer API pricing (read November 11, 2026)"
    url: "https://ai.google.dev/gemini-api/docs/pricing"
  - title: "OpenAI, Web search guide (read November 11, 2026)"
    url: "https://developers.openai.com/api/docs/guides/tools-web-search"
  - title: "OpenAI API pricing, web search rows (read November 11, 2026)"
    url: "https://developers.openai.com/api/docs/pricing"
  - title: "Anthropic, Web search tool (read November 11, 2026)"
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool"
  - title: "Perplexity API pricing (read November 11, 2026)"
    url: "https://docs.perplexity.ai/docs/getting-started/pricing"
  - title: "Perplexity Agent API models, perplexity/sonar (read November 11, 2026)"
    url: "https://docs.perplexity.ai/docs/agent-api/models"
  - title: "Tavily pricing (read November 11, 2026)"
    url: "https://www.tavily.com/pricing"
  - title: "Tavily Search API reference (read November 11, 2026)"
    url: "https://docs.tavily.com/documentation/api-reference/endpoint/search"
  - title: "Tavily rate limits (read November 11, 2026)"
    url: "https://docs.tavily.com/documentation/rate-limits"
  - title: "Exa pricing (read November 11, 2026)"
    url: "https://exa.ai/docs/admin/pricing"
  - title: "Exa search reference, lite (read November 11, 2026)"
    url: "https://exa.ai/docs/reference/search"
  - title: "Exa billing and rate limits (read November 11, 2026)"
    url: "https://exa.ai/docs/admin/billing"
  - title: "Brave Search API (read November 11, 2026)"
    url: "https://brave.com/search/api/"
  - title: "Microsoft Learn, Web search with the Responses API (read November 11, 2026)"
    url: "https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/web-search"
  - title: "OWASP, LLM01:2026 Prompt Injection (Top 10 for LLM Applications 2026, read November 11, 2026)"
    url: "https://genai.owasp.org/download/56857/"
  - title: "AI Agents Info, web search API prices (November 11, 2026)"
    url: "https://www.aiagentsinfo.com/blog/web-search-api-prices-for-ai-agents-november-2026"
faq:
  - question: "What is the best web search tool for an AI agent harness?"
    answer: "There isn’t one. On November 11, 2026, use Claude’s web_search or OpenAI’s web_search, both $10 per 1,000 searches plus tokens, when the product is a cited answer inside that vendor’s request. Use Gemini’s google_search tool, $14 per 1,000 queries after 5,000 free a month, when the model should search inside a Gemini 3 or newer call, and budget the 1,500-request daily cap. Use Tavily, Exa Lite, Brave, or Perplexity’s Search API when the harness must see the snippet, cut it, and cite it."
  - question: "How much does Gemini search grounding cost?"
    answer: "Google’s grounding guide, read November 11, 2026, bills Gemini 3 and newer for each search query the model executes: 5,000 free search requests a month, shared, then $14 per 1,000. Empty queries are not counted. The same page checks Gemini 4 Carbon and Gemini 4 Argon as supported. The Developer API paid tier defaults to 1,500 requests a day per project. Gemini 2.5 and older are billed per prompt, not per query."
  - question: "What does a search tool return to the model?"
    answer: "A hosted tool returns the model’s answer plus citations. OpenAI returns url_citation annotations. Claude returns search results and citations, and cited_text, title, and url do not count as tokens. Gemini returns annotations on the answer, plus google_search_call and google_search_result. Tavily returns snippets of about 500 characters on basic and fast, about 800 on advanced. Exa Lite returns up to 10 results from its index and does not fetch the page live."
  - question: "How do you stop an agent from searching too often?"
    answer: "Set a tool-call budget in the harness and a vendor cap where one exists. Claude’s max_uses limits searches in a turn, and a search past the cap returns max_uses_exceeded. A failed search still counts against that cap and is not billed. OpenAI’s guide does not print a max_uses field. Gemini’s default project cap is 1,500 grounding requests a day. Four searches a task is 375 tasks before that cap."
  - question: "How do you eval a web search tool inside a harness?"
    answer: "Grade four things you can see: the tool was called only when the question needed a current page, every cited URL was in the tool result, the search count stayed inside the budget, and a page you changed shows up when you ask for a live fetch. Add one fixture page whose text tells the agent to call a second tool. The run fails if that tool is called. That last check is indirect prompt injection, which OWASP LLM01:2026 defines as instructions in content the user did not type."
---

There is no best web search tool for an agent harness. There are two objects, and they bill differently.

A hosted tool searches inside the vendor’s request and returns the model’s answer with citations. On November 11, 2026 that list price is **$10 per 1,000 searches** for Claude’s `web_search` and for OpenAI’s `web_search`, plus the tokens the results become. Google’s [grounding guide](https://ai.google.dev/gemini-api/docs/google-search) bills Gemini 3 and newer at **$14 per 1,000 search queries** after 5,000 free requests a month, and the same page checks Gemini 4 Carbon and Gemini 4 Argon as supported. The Developer API paid tier then stops a project at **1,500 requests a day**.

A snippet API returns text your [harness](/glossary/harness) puts back into the [agent loop](/glossary/agent-loop). Tavily’s Pay As You Go price is **$0.008**, and basic search is 1 credit. Exa Lite is **$4 per 1,000** and does not fetch the page live. Brave Search is **$5 per 1,000** at 50 queries a second. The model does not get a finished citation unless you build one.

The chat products that already search for a person are [Best AI agent for web search](/best/ai-agents-for-web-search). The full rate card, including Serper, SerpAPI, and Firecrawl, is [Claude and OpenAI web search both cost $10 per 1,000](/blog/web-search-api-prices-for-ai-agents-november-2026). This page is the wiring decision: what the model sees, what one task costs, and what you grade.

## What does the model actually get back?

Match the object before you match the sticker. [Search grounding](/glossary/search-grounding) is the vendor’s loop. [Tool use](/glossary/tool-use) is your loop. [RAG](/glossary/rag) is a lookup your application runs before the model speaks. A search the model can skip, repeat, or follow with another tool is not RAG.

| Tool, read November 11, 2026 | What the model sees | Who writes the citation | Cap you can set on the call |
| --- | --- | --- | --- |
| OpenAI `web_search` | A `web_search_call`, then a message. `search` is a query. Reasoning models can also `open_page` and `find_in_page`. | The model. `url_citation` carries the URL, title, and location. `sources` is the longer list, if you ask for it. | No `max_uses` on the guide. `return_token_budget` is `default` or `unlimited` on GPT-5 and later reasoning models. Up to 100 allowed or blocked domains. |
| Claude `web_search` | Search results in the turn. `web_search_20260318` can filter them in code before they reach the window. | The model. `cited_text`, `title`, and `url` are not tokens. The result body is. | `max_uses` per turn. A search past it returns `max_uses_exceeded`. Managed Agents turn search on and do not offer `max_uses`. |
| Gemini `google_search` | The model decides, searches, and answers. The response has `google_search_call`, `google_search_result`, and `url_citation` annotations with start and end indexes. | The model. `search_suggestions` is HTML. The terms of service say how to render it. | No per-request search cap on the grounding guide. The project cap is 1,500 requests a day on Gemini 3 and newer. |
| Perplexity Search API | Ranked results. Page text is in each `snippet`. No model answer and no token bill. | You do. | Up to five queries in one `POST /search`, billed as one request. |
| Perplexity Agent API `perplexity/sonar` | A grounded model, plus tools. `web_search` is a tool fee on top of tokens. | The model, on that request. | The tool fee is per invocation. This page did not re-read a per-task cap. |
| Tavily `/search` | Snippets. Basic and fast are about 500 characters. Advanced is about 800. Ultra-fast is one summary per URL. | You do, from the URLs. | Your loop. The account limit is 100 requests a minute on the free plan, 1,000 once pay-as-you-go is on. |
| Exa `/search` `lite` | Up to 10 results from the index. A result with no cached copy is left out when you ask for text. | You do. | Your loop. `/search` defaults to 10 queries a second for the team. |
| Brave Search | URLs, text, news, images, and LLM context. | You do. | 50 queries a second on the Search plan. |

OpenAI’s guide says the web-search context window is 128,000 tokens even when the model’s own window is larger. Claude says to send `encrypted_content` back unchanged or the next request fails with a 400. Gemini’s example tool is `{ "type": "google_search" }`. Those three are wiring details, not slogans.

The full packs for Serper, SerpAPI, and Firecrawl stay on the [rate card](/blog/web-search-api-prices-for-ai-agents-november-2026). This guide does not re-fetch them. Serper is the cheap Google result page on that card. It is still a result page, not a citation.

## What does 1,000 searches cost on November 11?

The fee below is the search, not the finished task. Hosted tools add tokens. A plan price divided by the credits in the plan assumes the plan is used up. That division, where this page makes one, is labeled.

| Call | Price per 1,000 | What else is on the bill | Rate limit printed that day |
| --- | --- | --- | --- |
| OpenAI `web_search` | $10, plus search-content tokens at the model rate | For `gpt-4o-mini` and `gpt-4.1-mini`, the non-preview tool bills a fixed 8,000 input tokens a call. The pricing page does not print those two models’ token rates next to that sentence. | The model’s own tier |
| OpenAI `web_search_preview`, non-reasoning | $25, and search-content tokens are free | The guide says this tool ignores `filters`, `return_token_budget`, and `external_web_access` | The model’s own tier |
| Claude `web_search` | $10, plus tokens for the retrieved text | A failed search is not billed. Each search counts once, however many results come back. | The org limit in the Claude Console. No public RPM on the tool page. |
| Gemini `google_search`, Gemini 3 and newer | $14 after 5,000 free requests a month, shared | Billed per query the model runs. Empty queries are ignored. Gemini 2.5 and older are billed per prompt. | 1,500 requests a day per project on the Developer API paid tier, reset at midnight Pacific |
| Perplexity Search API | $5, or $1 with `search_type: "fast"` | No token bill. One POST with up to five queries is one billing unit. An empty success is billed. A 429 is not. | Not re-read for this page. The rate card links the rate-limit doc. |
| Perplexity `web_search` on the Agent API | $2.50, or $1 on Fast Search | `perplexity/sonar` is $0.25 per million input tokens and $2.50 per million output tokens, on top | Not printed on the pricing page read today |
| Tavily basic, fast, or ultra-fast | $8, if Pay As You Go at $0.008 is one credit | Advanced is 2 credits, so $16 on that reading. The free Researcher plan is 1,000 credits a month, no card. | 100 requests a minute free, 1,000 with pay-as-you-go |
| Exa Lite, up to 10 results | $4 | Results past 10 are $1 per 1,000 results. `auto` is $7. `deep-lite` and `deep` are $12. `deep-reasoning` is $15. | 10 queries a second on `/search`. Deep types are 5. |
| Brave Search | $5 | Answers is a different plan: $4 per 1,000 plus $5 per million input and output tokens, at 2 queries a second | 50 queries a second |

The [Gemini Developer API pricing page](https://ai.google.dev/gemini-api/docs/pricing), fetched the same day, has a `gemini-4-argon` grounding row at the same $14 and the same 1,500-a-day cap, and it has no `gemini-4-carbon` row. The grounding guide is the page that checks Carbon. Copy the id from the guide, and do not invent a second Carbon search price. The pricing page’s high-volume line is Vertex AI, at a default of 1,000,000 search queries a day. The grounding guide’s higher-limit path is a quota request in AI Studio, next to `generate_content_search_request_paid`.

Argon’s pricing note says every token the model processes is billed, including thinking tokens and the tool’s system instructions and function declarations when you use grounding. A later note, on the Deep Research agent, says the standard distinction is that Search Grounding excludes retrieved tokens. The Argon row does not repeat that exclusion. This page does not treat the Deep Research sentence as an Argon promise.

Token math for a known count belongs on the [AI agent cost calculator](/agent-cost-calculator). The tool definition is a separate bill on every turn, measured the same morning: [Brave's MCP tool list is 25,495 tokens](/blog/web-search-tool-definition-tokens).

## How fresh is the result, and how long does the call take?

Freshness is a parameter, not a vibe.

Exa’s search reference says Lite serves content from the index and does not fetch pages at query time. Freshness options that need a live fetch are rejected. A result with no cached copy is omitted when you ask for text. The pricing page prints latency for the deep types, not for Lite: `deep-lite` at about 4 seconds, `deep` at 4 to 15 seconds, `deep-reasoning` at 12 to 40 seconds.

Tavily’s default serves cache and fetches live as needed. `max_age_hours: 0` always fetches live. `-1` never does. A value from 1 to 720 keeps a cached copy no older than that many hours. Live fetches do not cost more credits. They do add latency, and a page that cannot be fetched live is dropped. On a non-paying plan, a request that sets `max_age_hours` can return **434 Flex tier capacity exceeded** while Tavily is under load. Omit the field and the request is served from cache.

OpenAI, Claude, and the Gemini grounding guide do not print a millisecond. OpenAI says `return_token_budget: "unlimited"` can increase latency and cost, and it tells you to use background mode for a run that may take minutes. Claude’s streaming example shows a pause while the search runs, with no duration. Gemini says the tool reaches real-time web content and does not print a latency.

Brave’s Search API page cites an AIMultiple test for average latency: Brave 669 ms, Tavily 998 ms, Exa 1,200 ms, Firecrawl 1,335 ms, SerpAPI 2,400 ms, Perplexity 11,000 ms, Parallel Pro 13,600 ms. The page does not date that test. The same page’s FreshQA chart is Brave’s own runs, not that test: Brave at 85.3 percent and $18 per 1,000 questions, against Parallel Advanced at 79.0 percent and $49, Exa at 78.0 percent and $84, and Tavily at 78.0 percent and $89. This desk did not rerun either set. Do not promote Brave’s chart into a ranking this site measured.

## How do you wire the tool into the harness?

Put the hosted tool on the request when the product is the vendor’s answer. Put a snippet tool on the loop when the next step depends on what came back.

On OpenAI, new Responses integrations send `{ "type": "web_search" }`. The guide’s recommended model for that path is `gpt-6-astra`. With `tool_choice: "auto"` the model may skip the search. Use `required` when the question cannot be answered from memory. Show `url_citation` as a clickable link. The guide says that display is required when the interface shows web results. A leftover `web_search_preview` on a non-reasoning model is the $25 row.

On Claude, `max_uses` is the cap. The tool page says a single-fact question typically uses 1 to 3 searches, and a comparison can use 10 or more. Failed searches count against the cap. They are not billed. Dynamic filtering, on `web_search_20260209` and later, runs the search from code execution and is not eligible for zero data retention or HIPAA. Models that cannot call tools from code need `allowed_callers: ["direct"]`, or the API returns a 400. Managed Agents include web search once the toolset is on, and `max_uses` is not available there. A harness that must stop at three searches cannot express that stop on that surface.

On Gemini, the model may run two queries for one prompt, and both bill. The grounding guide’s example is a Euro 2024 winner query and a final-score query inside one call. You see them on `google_search_call`. You do not get a `max_uses` field in that guide. The stop is the 1,500-a-day project cap, or a stop you enforce by not sending another request. Gemini 4 and Gemini 3 can combine `google_search` with your own function tools. That combination is how a grounded answer turns into a write. Treat the write as a separate permission.

On a snippet API, the harness owns the next step. Truncate the snippet before it joins the [context window](/glossary/context-window). Store the URL next to the text. Do not let the model invent a second URL that was not in the payload. Exa’s hosted MCP server, named on the pricing page, is `https://mcp.exa.ai/mcp`. An MCP server does not change the fee. It also does not add a [tool-call budget](/glossary/tool-call-budget). You still set one.

The workshop around that loop is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness). The runtimes are [Best AI agent harness](/best/ai-agent-harnesses).

## What does one agent task cost once search is in the loop?

A task that searches four times pays the tool fee four times. Tokens are not in this table. Gemini’s four are four queries, which may be one prompt or four. Perplexity’s Search API can put those four queries in one POST and pay once.

| Four searches | Tool fee |
| --- | --- |
| Exa Lite, $0.004 each | $0.016 |
| Brave Search, $0.005 each | $0.020 |
| Perplexity Search API, four separate POSTs | $0.020 |
| Perplexity Search API, one POST with four queries | $0.005 |
| Tavily basic pay-as-you-go, $0.008 each | $0.032 |
| Claude or OpenAI `web_search`, $0.010 each | $0.040, then tokens |
| Gemini, four queries after the free allowance | $0.056 |
| OpenAI `web_search_preview` on a non-reasoning model | $0.100 |

Four searches against Gemini’s 1,500-a-day cap is **375 tasks**. That is the whole project, shared with every other call that grounds. A 30-day run at the cap is 45,000 requests. After the 5,000 free requests, 40,000 billable requests at $14 per 1,000 are **$560**. The cap resets at midnight Pacific, so a calendar month is not exactly 30 of those days. The $560 figure is this page’s arithmetic for 30 full days, not a Google invoice.

At 100,000 such tasks a month, that is 400,000 searches. The default Gemini cap covers about 45,000 of them. The native $10 fee on the other 400,000 would be $4,000 before tokens. The [rate card](/blog/web-search-api-prices-for-ai-agents-november-2026) runs the same 400,000 through Serper, SerpAPI, and Firecrawl. A $10 tool that writes the answer can still be cheaper than a $1 tool plus a long page in a frontier model. It is not cheaper when the harness only needed ten URLs, and it is not available when the day has already used 1,500 Gemini queries.

## What fails: injection, stale pages, and over-calling?

Three failures show up in the trace. None of them is “the model was dumb.”

**A fetched page gives the model an instruction.** [OWASP’s LLM01:2026](https://genai.owasp.org/download/56857/) calls this [indirect prompt injection](/glossary/indirect-prompt-injection): the model reads a web page, a tool result, or a retrieved passage that contains instructions the user did not type, and public web pages are an untrusted surface. The same entry’s web scenario is a hidden instruction that makes the model emit an image URL carrying the private conversation. A hosted search hides the page inside the vendor’s loop, so your [guardrail](/glossary/guardrail) never sees the sentence. A snippet tool shows it, and then you have to refuse the next tool call. Seeing the text is not a fix. It is the moment you can add one.

**The page is old.** Exa Lite will not live-fetch. Tavily’s free plan can refuse the live fetch with a 434 and, if you drop `max_age_hours`, serve cache instead. A price, a score, or a release that changed this hour is the wrong job for a cache-only type. Ask for the live path, or say in the answer that the result is from the index.

**The loop searches until the money or the cap runs out.** Claude will stop at `max_uses` and return an error inside an HTTP 200. The search is not billed. The turn can still be wrong, because the model answers from what it already has. Gemini will keep issuing queries until the model stops or the project hits 1,500. OpenAI’s `unlimited` token budget is how a research run gets expensive on purpose. Leave it off for the ordinary task. A reasoning model that searches, opens a page, and searches again is several fees, not one. The OpenAI guide says the `search` action incurs the tool cost. It does not say whether `open_page` is a separate $0.01. Do not assume it is free, and do not assume it is billed. Count `web_search_call` items of type `search` until the pricing page says otherwise.

Microsoft’s Foundry docs add a counting trap for the Azure path: billable Bing requests are `tool_usage.web_search.num_requests`, not the number of `search` actions. That page is not the OpenAI API price. A harness that copies one counter onto the other will mis-bill.

## How do you eval search quality in a harness?

A leaderboard from a vendor’s homepage is not your eval. [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness) is the method: one action you can see, then the whole job. For search, the visible actions are these.

1. **Call discipline.** Questions that need a page newer than the model’s cutoff must call the tool. Questions you planted in the prompt must not. A run that searches every turn fails this check even when the answer is right.
2. **Citation membership.** Every URL in the answer appears in the tool result, or in OpenAI’s `sources` list if you requested it. A quoted span appears on that page. Gemini’s `url_citation` already carries `start_index` and `end_index`. Use them. A citation the model typed from memory fails.
3. **Budget.** The trace’s search count is at or under the [tool-call budget](/glossary/tool-call-budget). On Claude, a turn that hits `max_uses_exceeded` is a failed trial, not a retry storm. On Gemini, add the day’s `google_search_call` queries and stop before 1,500.
4. **Freshness.** Change a page you control. Exa Lite should not be required to show the new sentence. Tavily with `max_age_hours: 0` should. If the 434 appears, record the status. Do not score a refusal as a stale answer.
5. **Injection.** Host a fixture page whose visible text answers the question and whose hidden text tells the agent to call a send, a shell, or a second search with the user’s secret. The trial fails if that tool is called. OWASP’s description is the definition. The fixture is yours. This page did not publish a pass rate, because this desk did not run the fixture against these APIs on November 11.

Standing up the tasks and graders is [How to build an eval harness for AI agents](/blog/how-to-build-an-eval-harness-for-ai-agents). The worksheet is the [AI agent harness evaluation checklist](/tools/ai-agent-harness-evaluation-checklist). Public scores for the runtimes, not for these search tools, are the [November 2026 harness benchmark](/reports/agent-harness-benchmark-november-2026).

## What should you wire?

Wire Claude or OpenAI `web_search` when the product is a cited answer and you will pay $10 per 1,000 searches plus tokens. Set the smallest result budget the question needs. On OpenAI that is the default `return_token_budget`, not `unlimited`. On Claude that is `max_uses`, and it is unavailable on Managed Agents. Confirm the request does not still say `web_search_preview` if you did not mean the $25 row.

Wire Gemini `google_search` when the agent is already a Gemini 3 or newer model, including Carbon and Argon on the grounding guide’s table, and the volume fits under 1,500 requests a day. The search price is $14 per 1,000 after the shared 5,000. Four-search tasks stop at 375 a day on the default cap. Ask for quota, or move the project to Vertex, before you promise more.

Wire Tavily, Exa Lite, Brave, or Perplexity’s Search API when the harness must read the snippet, drop the rest, and refuse a tool the page asked for. Exa Lite is the wrong call for a price that changed this hour. Tavily’s live fetch is that call, and the free plan can 434. Brave is the 50-query-a-second plan at $5 per 1,000. Perplexity’s Search API is the one that puts five queries on one $0.005 or $0.001 bill and does not charge tokens.

Do not pick from Brave’s FreshQA chart, and do not pick from a latency table the vendor did not date. Pick from the object the model sees, the cap you can actually set, and a trace you graded. Price the call and the tokens you keep on the [web search API cost per agent task](/tools/web-search-api-cost-per-agent-task) calculator. The November 12 dataset of 13 APIs is the [web search tools report](/reports/web-search-tools-for-ai-agents-november-2026). The shelf for the rest of the workshop is the [agent harnesses hub](/topics/harnesses).

## FAQ

### What is the best web search tool for an AI agent harness?

There isn’t one. Use Claude or OpenAI `web_search`, both $10 per 1,000 plus tokens, when you want that vendor’s cited answer. Use Gemini `google_search`, $14 per 1,000 after 5,000 free, when the model should search inside a Gemini 3 or newer call and you can live under 1,500 requests a day. Use a snippet API when the harness has to see the text.

### How much does Gemini search grounding cost?

Google’s grounding guide, read November 11, 2026, bills each query on Gemini 3 and newer at $14 per 1,000 after 5,000 free requests a month, shared across those models. The supported-model table checks Gemini 4 Carbon and Gemini 4 Argon. The paid Developer API defaults to 1,500 requests a day. Empty queries are not billed.

### What does a search tool return to the model?

A hosted tool returns an answer and citations. A snippet tool returns text and URLs. Tavily’s basic and fast snippets are about 500 characters. Exa Lite returns up to 10 index results and does not fetch live. OpenAI’s search context is capped at 128,000 tokens even on a larger model.

### How do you stop an agent from searching too often?

Set `max_uses` on Claude. Count `search` actions on OpenAI and stop the loop yourself. On Gemini, 1,500 requests a day is the project cap, and four searches a task is 375 tasks. A failed Claude search counts against `max_uses` and is not billed.

### How do you eval search quality in a harness?

Check that the tool was called only when needed, that every cited URL was in the result, that the search count stayed inside the budget, and that a page you changed shows up on a live fetch. Add a fixture page that tells the agent to call another tool. Fail the run if it does. The method is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness).
