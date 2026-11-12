import type { ChartSpec, ReportChapter } from "@/lib/report-model";
import { readingTime } from "@/lib/utils";

export const path = "/reports/web-search-tools-for-ai-agents-november-2026";
export const title =
  "Best web search tool for Claude and OpenAI agents, November 2026: prices and limits of 13 APIs checked";
export const thesis =
  "On November 12, 2026, Claude and OpenAI both list web search at $10 per 1,000 calls, before the tokens those results become. The cheapest printed result-list price in this set is $1 per 1,000.";
export const description =
  "List prices, free tiers, rate limits, result format, and official MCP servers for 13 web search APIs used by Claude and OpenAI agents. Checked November 12, 2026. Nothing here is estimated.";
export const readOn = "2026-11-12";

const CHECKED = "12 Nov 2026";

export const keyNumbers = [
  {
    value: "$10",
    label: "Claude and OpenAI, per 1,000 searches",
    note: "Tool fee. Retrieved text bills as tokens. OpenAI’s non-reasoning preview is $25.",
  },
  {
    value: "$1",
    label: "Cheapest printed result list, per 1,000",
    note: "Parallel fast or turbo, and Perplexity Search with search_type fast.",
  },
  {
    value: "$14",
    label: "Gemini 3 and newer grounding, per 1,000",
    note: "After 5,000 free requests a month. Daily cap 1,500. Each query can bill.",
  },
  {
    value: "7,803",
    label: "Stars on Firecrawl’s official MCP server",
    note: "Default-branch commit 3.40.0 at 03:19 UTC on 12 Nov 2026.",
  },
];

export const findings = [
  "Anthropic lists web search at $10 USD per 1,000 searches, plus tokens for retrieved text. OpenAI lists the same $10.00 per 1,000 calls. OpenAI’s preview on non-reasoning models is $25.00 per 1,000, and those search-content tokens are free.",
  "Parallel lists turbo and fast at $1 per 1,000 requests, and basic and advanced at $5. Perplexity Search is $5.00 per 1,000, or $1.00 on fast. Up to five queries in one request are one bill.",
  "Gemini 3 and newer grounding is 5,000 free requests a month, then $14 per 1,000, capped at 1,500 a day. One prompt can run several queries. Gemini 2.5 is $35 per 1,000 prompts after 1,500 free a day.",
  "firecrawl/firecrawl-mcp-server had 7,803 GitHub stars. Its newest commit on main is 3.40.0, at 03:19 UTC on 12 November 2026. The hosted Claude, OpenAI, and Gemini tools had no MCP repo in an org search that day.",
  "Jina’s public pricing page prints a floor of 10,000 tokens per s.jina.ai request, and 100 requests a minute with a free key. The dollar rate is not published.",
];

export const executiveSummary = [
  "On 12 November 2026 this page records one web-search call across thirteen APIs: Claude, OpenAI, Gemini, Perplexity, Tavily, Exa, Brave, Parallel, Firecrawl, SerpAPI, Linkup, You.com, and Jina. [[1]][[3]][[5]]",
  "Claude and OpenAI charge $10 per 1,000, then tokens. Parallel fast and Perplexity fast print $1 per 1,000. Gemini 3 and newer prints $14 per 1,000 after 5,000 free a month. [[1]][[7]][[17]]",
  "Nothing here is estimated. Printed prices are copied. A figure this page multiplies or divides is labeled computed. A missing dollar rate is marked not published.",
];

export const reportCharts: ChartSpec[] = [
  {
    id: "price-per-thousand",
    title: "List price per 1,000 search calls",
    caption:
      "Dollars per 1,000 calls. A longer bar is a higher price. Tavily’s $8 is 1,000 × $0.008, computed. Firecrawl’s plan arithmetic is in the table.",
    unit: "USD per 1,000 calls",
    source: `Vendor pricing pages. Checked ${CHECKED}. Tavily: 1,000 × $0.008, computed. [[1]][[3]][[5]][[7]][[12]][[14]][[16]][[17]][[20]][[22]][[24]]`,
    series: ["USD per 1,000"],
    categories: [
      { label: "Parallel fast", values: [1], displays: ["$1"] },
      { label: "Perplexity fast", values: [1], displays: ["$1"] },
      { label: "Exa lite", values: [4], displays: ["$4"] },
      { label: "Brave Search", values: [5], displays: ["$5"] },
      { label: "Linkup standard", values: [5], displays: ["$5"] },
      { label: "You.com search", values: [5], displays: ["$5"] },
      { label: "Tavily basic", values: [8], displays: ["$8"] },
      { label: "OpenAI web_search", values: [10], displays: ["$10"] },
      { label: "Claude web_search", values: [10], displays: ["$10"] },
      { label: "Gemini 3+ search", values: [14], displays: ["$14"] },
      { label: "SerpAPI Starter", values: [25], displays: ["$25"] },
    ],
  },
];

const sourced = (cells: string[]) => [...cells, CHECKED];

export const chapters: ReportChapter[] = [
  {
    id: "what-does-a-call-cost",
    title: "What does one search call cost on November 12?",
    blocks: [
      {
        kind: "p",
        text: "Each bar is one mode, before tokens and extra results. SerpAPI’s bar is Starter, $25 for 1,000 searches. Jina’s dollar rate is not published.",
      },
      { kind: "chart", id: "price-per-thousand" },
      {
        kind: "p",
        text: "Tavily pay as you go is $0.008 a credit. Basic search is 1 credit, so $8 per 1,000, computed. Project prints $0.0075, or $7.50 per 1,000, computed. Advanced is 2 credits. [[12]]",
      },
      {
        kind: "p",
        text: "Firecrawl search is 2 credits per 10 results. Standard, $99 for 50,000 searches, is $1.98 per 1,000 if spent on search, computed. Hobby is $19 for 2,500 searches, $7.60 per 1,000, computed. A gov-category search adds no search credits. [[18]][[19]]",
      },
      {
        kind: "table",
        caption:
          "List price of one search call, read 12 November 2026. Computed cells say so. “not published” means the official page did not print the figure.",
        headers: ["API", "Price per 1,000 calls", "Free start", "What comes back", "Source", "Checked"],
        rows: [
          sourced([
            "Claude web_search",
            "$10, plus tokens for retrieved text",
            "not published",
            "Cited results. Citation fields are outside the token count. A failed search is not billed.",
            "Anthropic pricing [[3]][[4]]",
          ]),
          sourced([
            "OpenAI web_search",
            "$10, plus search-content tokens. Preview on non-reasoning models: $25, content tokens free.",
            "not published",
            "A web_search_call, then a message with url citations. Search context window is 128,000 tokens.",
            "OpenAI pricing [[1]][[2]]",
          ]),
          sourced([
            "Gemini grounding, Gemini 3 and newer",
            "$14 after 5,000 free requests a month",
            "5,000 requests a month on the paid tier. Free tier: not available.",
            "A grounded answer. Each search query the model runs can bill separately.",
            "Gemini pricing [[5]][[6]]",
          ]),
          sourced([
            "Perplexity Search API",
            "$5 standard, or $1 with search_type fast",
            "not published",
            "Ranked JSON with snippet text. Up to five queries are one bill. No model tokens.",
            "Perplexity pricing [[7]]",
          ]),
          sourced([
            "Tavily Search, basic",
            "$8 on pay as you go, computed",
            "1,000 credits a month, no card",
            "Basic is 1 credit. Advanced is 2. The credits page does not describe the JSON.",
            "Tavily credits [[12]]",
          ]),
          sourced([
            "Exa /search, lite",
            "$4 for up to 10 results. Auto and fast are $7.",
            "$10 in credits a month, up to 2,500 Lite searches, no card",
            "Search results with page contents. Results past 10 are $1 per 1,000 results.",
            "Exa pricing [[14]]",
          ]),
          sourced([
            "Brave Search",
            "$5",
            "not published",
            "URLs, text, news, images, and LLM context. Answers are $4 per 1,000 plus tokens.",
            "Brave plans [[16]]",
          ]),
          sourced([
            "Parallel Search, fast or turbo",
            "$1 for 10 results. Basic and advanced are $5.",
            "not published",
            "Pages and excerpts. Results past 10 are $1 per 1,000. Excerpt length does not change the price.",
            "Parallel pricing [[17]]",
          ]),
          sourced([
            "Firecrawl /search",
            "2 credits per 10 results. Standard computes to $1.98 if the plan is used on search.",
            "1,000 credits a month, no card, listed as 500 searches",
            "Title, URL, and description, with highlights by default. Markdown is a scrape.",
            "Firecrawl pricing [[18]][[19]]",
          ]),
          sourced([
            "SerpAPI",
            "Starter is $25 for 1,000 searches. Production is $10 per 1,000, computed, if all 15,000 are used.",
            "250 searches a month",
            "One credit per successful search, whether the response has 100 results or none.",
            "SerpAPI pricing [[20]]",
          ]),
          sourced([
            "Linkup /search, standard",
            "$5 for searchResults. Sourced answer or structured output is $6. Deep searchResults is $50.",
            "$20 for a professional email, topped up to $20 each month",
            "Ranked sources, or a sourced answer, or JSON. The FAQ prints the per-1,000 figures.",
            "Linkup pricing and FAQ [[21]][[22]]",
          ]),
          sourced([
            "You.com Web Search",
            "$5, up to 100 results. Live full-page extraction is $1 per 1,000 pages.",
            "100 queries a day through the MCP server, no key and no card",
            "Web and news JSON. Snippets by default. One result and 100 results are the same call price.",
            "You.com billing and pricing [[23]][[24]]",
          ]),
          sourced([
            "Jina s.jina.ai",
            "not published",
            "A free key is offered. The token grant’s dollar value is not printed.",
            "LLM-friendly text of search results. Each request starts at 10,000 tokens.",
            "Jina pricing [[25]]",
          ]),
        ],
      },
      {
        kind: "means",
        audience: "Builders",
        text: "A result list starts at $1 per 1,000 on Parallel fast and Perplexity fast. Claude or OpenAI adds $10 plus tokens. Gemini 3 and newer is $14 per 1,000 after the monthly allowance, capped at 1,500 a day.",
      },
    ],
  },
  {
    id: "hosted-tools",
    title: "What do the Claude and OpenAI tools add to the call?",
    blocks: [
      {
        kind: "p",
        text: "New integrations send type web_search. The preview tool skips filters and return_token_budget. On gpt-4o-mini and gpt-4.1-mini, non-preview search content is 8,000 input tokens a call. The search window is 128,000 tokens. Limits follow the model tier. [[1]][[2]]",
      },
      {
        kind: "p",
        text: "Each Claude search is one use. Errors are not billed. Later turns must return encrypted_content unchanged. cited_text, title, and url sit outside the token count. Retrieved text is input tokens. [[3]][[4]]",
      },
      {
        kind: "p",
        text: "Gemini 3 bills each query the model runs. Empty queries are ignored. Gemini 2.5 bills per prompt, $35 per 1,000 after 1,500 free a day. Search Grounding excludes retrieved tokens. Claude and OpenAI bill that text. [[5]][[6]]",
      },
      {
        kind: "p",
        text: "perplexity/sonar is $0.25 and $2.50 per million tokens. Chat Completions support ended 27 September 2026. Agent web_search is $2.50 per 1,000, or $1.00 on fast, plus tokens. The raw Search API has no token line. [[7]][[9]][[10]]",
      },
    ],
  },
  {
    id: "which-limit",
    title: "Which limit stops an agent loop first?",
    blocks: [
      {
        kind: "p",
        text: "A cheap call still stalls when the public ceiling is low. A silent page is marked not published.",
      },
      {
        kind: "table",
        caption: "Published rate limits, read 12 November 2026. A blank public page is “not published,” not a guess.",
        headers: ["API", "Published limit", "Source", "Checked"],
        rows: [
          sourced(["OpenAI web_search", "The underlying model’s tiered rate limits. No separate search RPM on the guide.", "OpenAI guide [[2]]"]),
          sourced(["Claude web_search", "The organization’s console limit. No single public RPM.", "Claude tool page [[4]]"]),
          sourced(["Gemini 3 and newer grounding", "1,500 requests a day per project, after the pricing row’s monthly allowance.", "Gemini pricing [[5]]"]),
          sourced(["Perplexity Search API", "50 query units a second, every tier. Five queries spend five units and one bill.", "Perplexity rate limits [[8]]"]),
          sourced(["Perplexity Agent API", "1 QPS at Tier 0 ($0 purchased), up to 33 QPS at Tier 4 and Tier 5.", "Perplexity rate limits [[8]]"]),
          sourced(["Tavily", "100 RPM on the free Researcher plan. 1,000 RPM once pay as you go is on.", "Tavily rate limits [[13]]"]),
          sourced(["Exa /search", "10 QPS. Deep types are 5 QPS. 25 QPS after $1,000 purchased in 30 days.", "Exa billing [[15]]"]),
          sourced(["Brave Search", "50 queries a second. The Answers endpoint is 2 queries a second.", "Brave plans [[16]]"]),
          sourced(["Parallel Search", "not published", "Parallel pricing [[17]]"]),
          sourced(["Firecrawl /search", "10 a minute on Free, 100 on Hobby, 500 on Standard. Concurrency is 2 on Free.", "Firecrawl pricing [[18]]"]),
          sourced(["SerpAPI", "50 successful searches an hour on Free, 200 on Starter, 3,000 on Production.", "SerpAPI pricing [[20]]"]),
          sourced(["Linkup", "not published", "Linkup pricing [[21]]"]),
          sourced(["You.com Web Search", "100 queries a day on the free MCP profile. Paid QPS is a custom enterprise limit.", "You.com pricing [[24]]"]),
          sourced(["Jina s.jina.ai", "No key is blocked. 100 RPM on a free or paid key. 1,000 RPM on premium.", "Jina pricing [[25]]"]),
        ],
      },
      {
        kind: "p",
        text: "Gemini caps grounding at 1,500 requests a day. Four queries a task fill that day in 375 tasks. Perplexity Search allows 50 query units a second on every tier. [[5]][[8]]",
      },
    ],
  },
  {
    id: "mcp-servers",
    title: "Which vendors publish an official MCP server?",
    blocks: [
      {
        kind: "p",
        text: "Stars are stargazers_count. The time is the newest commit on main. pushed_at is newer for Exa (5 Nov vs 3 Nov), SerpAPI (10 Nov vs 4 Nov), and Linkup (1 Nov vs 1 Oct). The table uses the commit. [[26]]",
      },
      {
        kind: "table",
        caption: "Official MCP repositories named by the vendor org or the repo description, read from the GitHub API on 12 November 2026.",
        headers: ["Repository", "Stars", "Newest commit on main (UTC)", "Source", "Checked"],
        rows: [
          sourced(["[firecrawl/firecrawl-mcp-server](https://github.com/firecrawl/firecrawl-mcp-server)", "7,803", "2026-11-12 03:19", "GitHub API [[26]][[27]]"]),
          sourced(["[exa-labs/exa-mcp-server](https://github.com/exa-labs/exa-mcp-server)", "5,227", "2026-11-03 01:15", "GitHub API [[26]]"]),
          sourced(["[perplexityai/modelcontextprotocol](https://github.com/perplexityai/modelcontextprotocol)", "2,621", "2026-10-21 23:47", "GitHub API [[26]]"]),
          sourced(["[tavily-ai/tavily-mcp](https://github.com/tavily-ai/tavily-mcp)", "2,486", "2026-11-05 16:36", "GitHub API [[26]][[28]]"]),
          sourced(["[brave/brave-search-mcp-server](https://github.com/brave/brave-search-mcp-server)", "1,569", "2026-11-09 12:07", "GitHub API [[26]]"]),
          sourced(["[jina-ai/MCP](https://github.com/jina-ai/MCP)", "907", "2026-10-15 22:19", "GitHub API [[26]]"]),
          sourced(["[serpapi/serpapi-mcp](https://github.com/serpapi/serpapi-mcp)", "184", "2026-11-04 10:04", "GitHub API [[26]]"]),
          sourced(["[parallel-web/search-mcp](https://github.com/parallel-web/search-mcp)", "32", "2026-10-05 23:15", "GitHub API [[26]]"]),
          sourced(["[LinkupPlatform/linkup-mcp-server](https://github.com/LinkupPlatform/linkup-mcp-server)", "29", "2026-10-01 14:17", "GitHub API [[26]]"]),
          sourced(["[youdotcom-oss/mcp](https://github.com/youdotcom-oss/mcp)", "27", "2026-10-28 16:20", "GitHub API [[26]]"]),
        ],
      },
      {
        kind: "p",
        text: "Hosted servers: Exa at https://mcp.exa.ai/mcp and You.com at https://api.you.com/mcp?profile=free. Parallel’s repo says “Free web search and page fetching for agents. Hosted MCP, no API key required.” The Search API price page leaves that allowance not published. [[14]][[17]][[23]]",
      },
      {
        kind: "p",
        text: "On 12 November 2026, GitHub search returned 0 repos for the OpenAI, Anthropic, Google, and Google APIs org queries. Those hosted tools have no official MCP repo in that search. [[26]]",
      },
    ],
  },
  {
    id: "last-seven-days",
    title: "What changed from November 5 through November 12?",
    blocks: [
      {
        kind: "p",
        text: "No pricing page re-read today carries a price change dated 5–12 November 2026. OpenAI’s entry in that window is GPT-6-Cyber on 5 November. You.com’s newest changelog line is 26 October 2026. [[2]][[23]]",
      },
      {
        kind: "p",
        text: "Perplexity’s November changelog names ultra@2026-11-05.0 on claude-opus-5-5, and 2026-11-11.0 versions that can omit max_output_tokens. gemini-4-carbon is $2, $0.10 cached, and $10 per million tokens through 30 November 2026. Search stays $5 and $1. [[11]]",
      },
      {
        kind: "quote",
        text: "The new 2026-11-11.0 versions of fast, low, medium, high, xhigh, and ultra use this default. Calling an effort level by name, such as effort=\"fast\", selects the new version.",
        cite: "Perplexity API changelog, November 2026. Checked 12 Nov 2026. [[11]]",
      },
      {
        kind: "p",
        text: "Firecrawl MCP 3.40.0 landed at 03:19 UTC on 12 November 2026: Alexandria tools, max_credits guidance, and people and company search. Ordinary search stays 2 credits per 10 results. Alexandria discovery is free. [[19]][[27]]",
      },
      {
        kind: "p",
        text: "Tavily’s MCP repo merged an OAuth docs change at 16:36 UTC on 5 November 2026. Brave’s 9 November commit bumps a dependency. SerpAPI v2.2.0 is dated 4 November, outside this window. [[26]][[28]]",
      },
    ],
  },
  {
    id: "left-out",
    title: "What was left out?",
    blocks: [
      {
        kind: "p",
        text: "No query was sent and no account was billed. Quality scores, including Linkup’s FAQ benchmarks, stay off this page. Serper was not re-fetched. Consumer chat plans stay on the buyer’s comparison.",
      },
      {
        kind: "p",
        text: "Not published: Jina’s dollar rate, Brave’s free credit, Parallel’s free allowance and rate limit, Linkup’s rate limit, You.com’s paid QPS, and a free search allowance for OpenAI or Claude.",
      },
      {
        kind: "p",
        text: "Firecrawl’s $1.98 and SerpAPI Production’s $10 assume the monthly allowance is used. Tavily’s $8 is 1,000 times the printed credit price.",
      },
    ],
  },
  {
    id: "faq",
    title: "FAQ",
    blocks: [
      { kind: "h3", text: "What is the cheapest web search tool for a Claude or OpenAI agent?" },
      {
        kind: "p",
        text: "Parallel fast or turbo, and Perplexity Search with fast, print $1 per 1,000. Claude and OpenAI print $10 per 1,000, plus tokens.",
      },
      { kind: "h3", text: "Do Claude and OpenAI charge the same amount for web search?" },
      {
        kind: "p",
        text: "Both tool fees are $10 per 1,000. OpenAI’s non-reasoning preview is $25 per 1,000, with content tokens free. Mini models bill 8,000 input tokens a call.",
      },
      { kind: "h3", text: "How much is Gemini grounding with Google Search?" },
      {
        kind: "p",
        text: "Gemini 3 and newer: 5,000 free a month, then $14 per 1,000, capped at 1,500 a day. Gemini 2.5 is $35 per 1,000 prompts after 1,500 free a day.",
      },
      { kind: "h3", text: "Is Perplexity Sonar still a separate search price?" },
      {
        kind: "p",
        text: "Chat Completions support ended 27 September 2026. perplexity/sonar remains $0.25 and $2.50 per million tokens. Agent web_search is $2.50 or $1.00 per 1,000. The raw Search API adds no model tokens.",
      },
      { kind: "h3", text: "Which of these publish an official MCP server?" },
      {
        kind: "p",
        text: "Ten vendor orgs had a search MCP repo on 12 November 2026. Firecrawl’s had 7,803 stars. The hosted Claude, OpenAI, and Gemini tools had none.",
      },
    ],
  },
];

export const methodology = [
  "Every dollar figure was read on 12 November 2026 from the vendor’s own page. A multiplied or divided figure is labeled computed. A missing rate is marked not published.",
  "GitHub stars are stargazers_count. Commit time is the newest commit on the default branch. The window is 5–12 November 2026. Nothing here is estimated. Computed: Tavily $8 and $7.50, Firecrawl $1.98 and $7.60, SerpAPI Production $10.",
];

export const sources: { n: number; title: string; url: string; detail: string }[] = [
  {
    n: 1,
    title: "OpenAI, API pricing",
    url: "https://developers.openai.com/api/docs/pricing",
    detail:
      "Checked 12 November 2026. Web search $10.00 per 1,000 calls plus search-content tokens. Preview on reasoning models $10.00. Preview on other models $25.00, search-content tokens free. gpt-4o-mini and gpt-4.1-mini non-preview search content is a fixed 8,000 input tokens.",
  },
  {
    n: 2,
    title: "OpenAI, Web search guide",
    url: "https://developers.openai.com/api/docs/guides/tools-web-search",
    detail:
      "Checked 12 November 2026. New integrations use type web_search. Search context window 128,000 tokens. Rate limits match the model tier. Changelog in the same docs: 5 November is GPT-6-Cyber, not a search-price change.",
  },
  {
    n: 3,
    title: "Anthropic, API pricing",
    url: "https://platform.claude.com/docs/en/about-claude/pricing",
    detail:
      "Checked 12 November 2026. Web search is $10 USD per 1,000 searches, plus token costs. Each search is one use. A failed search is not billed.",
  },
  {
    n: 4,
    title: "Anthropic, Web search tool",
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool",
    detail:
      "Checked 12 November 2026. max_uses, encrypted_content, and the rule that cited_text, title, and url do not count as tokens. The organization rate limit is on the console page.",
  },
  {
    n: 5,
    title: "Google, Gemini API pricing",
    url: "https://ai.google.dev/gemini-api/docs/pricing",
    detail:
      "Checked 12 November 2026. Gemini 3 and newer: 5,000 free search requests a month, then $14 per 1,000, daily cap 1,500 per project. Gemini 2.5: 1,500 RPD free, then $35 per 1,000 grounded prompts. Agents row: Search Grounding retrieved tokens excluded.",
  },
  {
    n: 6,
    title: "Google, Grounding with Google Search",
    url: "https://ai.google.dev/gemini-api/docs/google-search",
    detail:
      "Checked 12 November 2026. Gemini 3 bills each search query the model executes. Gemini 2.5 and older models bill per prompt.",
  },
  {
    n: 7,
    title: "Perplexity, Pricing",
    url: "https://docs.perplexity.ai/docs/getting-started/pricing",
    detail:
      "Checked 12 November 2026. Search API $5.00 per 1,000 requests, $1.00 with fast. Up to five queries are one bill. Agent web_search $0.0025, or $0.001 on fast.",
  },
  {
    n: 8,
    title: "Perplexity, Rate limits",
    url: "https://docs.perplexity.ai/docs/getting-started/rate-limits",
    detail:
      "Checked 12 November 2026. Search API: 50 query units a second, all tiers. Agent API: 1 QPS at Tier 0 through 33 QPS at Tier 4 and Tier 5. A five-query request spends five rate-limit units.",
  },
  {
    n: 9,
    title: "Perplexity, Agent API models",
    url: "https://docs.perplexity.ai/docs/agent-api/models",
    detail:
      "Checked 12 November 2026. perplexity/sonar: $0.25 per million input tokens, $2.50 per million output tokens, $0.0625 per million cache-read tokens.",
  },
  {
    n: 10,
    title: "Perplexity, Migrate from Sonar",
    url: "https://docs.perplexity.ai/docs/agent-api/migrate-from-sonar/overview",
    detail:
      "Checked 12 November 2026. Sonar Chat Completions support ended 27 September 2026. Synchronous requests are reformulated as Agent API requests.",
  },
  {
    n: 11,
    title: "Perplexity, Changelog",
    url: "https://docs.perplexity.ai/docs/resources/changelog",
    detail:
      "Checked 12 November 2026. November 2026 entries: ultra@2026-11-05.0, effort versions 2026-11-11.0, and google/gemini-4-carbon introductory token prices through 30 November 2026.",
  },
  {
    n: 12,
    title: "Tavily, Credits and pricing",
    url: "https://docs.tavily.com/documentation/api-credits",
    detail:
      "Checked 12 November 2026. Free 1,000 credits a month, no card. Pay as you go $0.008 a credit. Basic search 1 credit. Advanced search 2 credits. Project plan $30 for 4,000 credits at $0.0075 a credit.",
  },
  {
    n: 13,
    title: "Tavily, Rate limits",
    url: "https://docs.tavily.com/documentation/rate-limits",
    detail: "Checked 12 November 2026. Researcher plan 100 requests a minute. Pay as you go 1,000. Growth and Scale 1,500.",
  },
  {
    n: 14,
    title: "Exa, Pricing",
    url: "https://exa.ai/docs/admin/pricing",
    detail:
      "Checked 12 November 2026. Lite and instant $4 per 1,000 requests for up to 10 results. Auto and fast $7. Deep and deep-lite $12. Deep-reasoning $15. Free tier $10 a month, up to 2,500 Lite searches, no card. Hosted MCP at https://mcp.exa.ai/mcp.",
  },
  {
    n: 15,
    title: "Exa, Billing and rate limits",
    url: "https://exa.ai/docs/admin/billing",
    detail:
      "Checked 12 November 2026. /search is 10 QPS. Deep types are 5 QPS. Adding $1,000 in credits inside 30 days raises the team to 25 QPS for 90 days.",
  },
  {
    n: 16,
    title: "Brave, Search API plans",
    url: "https://brave.com/search/api/",
    detail:
      "Checked 12 November 2026. Search is $5 per 1,000 requests at 50 queries a second. Answers are $4 per 1,000 plus $5 per million input and output tokens, at 2 queries a second. A free monthly credit amount is not printed on this plans section.",
  },
  {
    n: 17,
    title: "Parallel, API pricing",
    url: "https://docs.parallel.ai/getting-started/pricing",
    detail:
      "Checked 12 November 2026. Search turbo and fast $1 per 1,000 requests. Basic and advanced $5. Ten results included. Further results $1 per 1,000. No free allowance and no rate limit on this page.",
  },
  {
    n: 18,
    title: "Firecrawl, Pricing",
    url: "https://www.firecrawl.dev/pricing",
    detail:
      "Checked 12 November 2026. Search is 2 credits per 10 results. Free 1,000 credits, listed as 500 searches. Hobby $19 for 5,000 credits, listed as 2,500 searches. Standard $99 for 100,000 credits, listed as 50,000 searches. /search rate limit 10/min on Free, 100 on Hobby, 500 on Standard.",
  },
  {
    n: 19,
    title: "Firecrawl, Search",
    url: "https://docs.firecrawl.dev/features/search",
    detail:
      "Checked 12 November 2026. Highlights by default. Cost is 2 credits per 10 results, rounded up. Gov results add no search credits. Alexandria tool discovery is free.",
  },
  {
    n: 20,
    title: "SerpAPI, Pricing",
    url: "https://serpapi.com/pricing",
    detail:
      "Checked 12 November 2026. Free 250 searches at 50 an hour. Starter $25 a month for 1,000 searches at 200 an hour. Production $150 for 15,000 at 3,000 an hour. Only successful searches count.",
  },
  {
    n: 21,
    title: "Linkup, Pricing",
    url: "https://docs.linkup.so/pages/documentation/platform/pricing",
    detail:
      "Checked 12 November 2026. Standard, fast, and flash searchResults $0.005 a call. Sourced answer or structured $0.006. Deep searchResults $0.05. Deep sourced answer $0.055. Professional-email accounts start with $20, topped up to $20 a month. No rate limit on this page.",
  },
  {
    n: 22,
    title: "Linkup, FAQ",
    url: "https://docs.linkup.so/pages/faq/faq",
    detail:
      "Checked 12 November 2026. Prints $5 per 1,000 queries for flash, fast, and standard searchResults, $6 with a sourced answer, $50 for deep searchResults, and $55 with a sourced answer.",
  },
  {
    n: 23,
    title: "You.com, Billing",
    url: "https://you.com/docs/administration/billing",
    detail:
      "Checked 12 November 2026. Web Search API $5.00 per 1,000 calls, up to 100 results. Live full-page extraction $1.00 per 1,000 pages. Cached pages on that add-on are free. Changelog’s newest entry on the docs index header’s linked log was 26 October 2026 when that log was opened the same day.",
  },
  {
    n: 24,
    title: "You.com, Pricing",
    url: "https://you.com/pricing",
    detail:
      "Checked 12 November 2026. Web Search API Standard $5 per 1,000 calls. Free MCP profile: 100 queries a day, no API key, no account, no card. Paid QPS is a custom enterprise item.",
  },
  {
    n: 25,
    title: "Jina, API pricing",
    url: "https://jina.ai/api-dashboard/pricing/",
    detail:
      "Checked 12 November 2026. s.jina.ai starts at 10,000 tokens a request. No key is blocked. Free and paid keys are 100 requests a minute. Premium is 1,000. The page does not print a dollar price per million tokens.",
  },
  {
    n: 26,
    title: "GitHub REST API, repository and commit lists",
    url: "https://docs.github.com/en/rest/repos/repos",
    detail:
      "Read 12 November 2026. GET /repos/{owner}/{repo} for stargazers_count, and the commits list on the default branch. Organization searches returned total_count 0 for openai, anthropics, google, and googleapis queries named in the text. Commit list: https://docs.github.com/en/rest/commits/commits",
  },
  {
    n: 27,
    title: "Firecrawl MCP, commit 3.40.0",
    url: "https://github.com/firecrawl/firecrawl-mcp-server/commit/07d49d80b0db5a9779d637e0d7c2f6e1f1ddcfd1",
    detail:
      "Committed 12 November 2026, 03:19 UTC. Message: chore(release): 3.40.0. Repository stargazers_count 7,803 at the same read.",
  },
  {
    n: 28,
    title: "Tavily MCP, commit on account-picker docs",
    url: "https://github.com/tavily-ai/tavily-mcp/commit/ff166aa86e6dff08dea47d22fee4c9b8371ffec2",
    detail:
      "Committed 5 November 2026, 16:36 UTC. Message: Merge pull request #241, docs for choosing an account for OAuth. stargazers_count 2,486 at the 12 November read.",
  },
];

export const faq = [
  {
    question: "What is the cheapest web search tool for a Claude or OpenAI agent?",
    answer:
      "For a result list, Parallel’s fast and turbo modes and Perplexity’s fast Search API both print $1 per 1,000 requests, checked 12 November 2026. Claude’s web search tool and OpenAI’s web_search tool both print $10 per 1,000, and then the retrieved text bills as tokens.",
  },
  {
    question: "Do Claude and OpenAI charge the same amount for web search?",
    answer:
      "The tool fee matches, at $10 per 1,000. OpenAI also lists web search preview at $25 per 1,000 on non-reasoning models, with search-content tokens free. For gpt-4o-mini and gpt-4.1-mini, the non-preview tool bills search content as 8,000 input tokens per call.",
  },
  {
    question: "How much is Gemini grounding with Google Search?",
    answer:
      "For Gemini 3 and newer, Google lists 5,000 free search requests a month, then $14 per 1,000 requests, with a default daily cap of 1,500 per project. Each query the model runs can count. Gemini 2.5 lists $35 per 1,000 grounded prompts after 1,500 free requests a day.",
  },
  {
    question: "Is Perplexity Sonar still a separate search price?",
    answer:
      "Sonar Chat Completions support ended on 27 September 2026. The Agent API models page still prices perplexity/sonar at $0.25 and $2.50 per million tokens. Web search on that API is a tool fee of $2.50 or $1.00 per 1,000 invocations. The raw Search API is $5.00 or $1.00 per 1,000 requests and does not add model tokens.",
  },
  {
    question: "Which of these publish an official MCP server?",
    answer:
      "Firecrawl, Exa, Perplexity, Tavily, Brave, Jina, SerpAPI, Parallel, Linkup, and You.com had a repository under the vendor’s GitHub organization on 12 November 2026. Firecrawl’s had 7,803 stars and a commit that morning. GitHub search returned no official repository for the hosted Claude, OpenAI, or Gemini search tools.",
  },
];

function blockWords(block: ReportChapter["blocks"][number]) {
  if (block.kind === "p" || block.kind === "h3") return block.text;
  if (block.kind === "quote") return `${block.text} ${block.cite}`;
  if (block.kind === "callout") return `${block.title} ${block.text}`;
  if (block.kind === "means") return `${block.audience} ${block.text}`;
  if (block.kind === "table") return [block.caption, ...block.headers, ...block.rows.flat()].join(" ");
  return "";
}

function bodyCopy() {
  return [
    title,
    thesis,
    description,
    ...keyNumbers.flatMap((item) => [item.value, item.label, item.note ?? ""]),
    ...executiveSummary,
    ...findings,
    ...chapters.flatMap((chapter) => [chapter.title, ...chapter.blocks.map(blockWords)]),
    ...reportCharts.flatMap((chart) => [chart.title, chart.caption, chart.source]),
    ...methodology,
  ].join("\n");
}

const bodyWords = bodyCopy().trim().split(/\s+/).filter(Boolean).length;
export const readingMinutes = bodyWords >= 1500 && bodyWords <= 2500 ? 8 : readingTime(bodyCopy());
export const bodyWordCount = bodyWords;
