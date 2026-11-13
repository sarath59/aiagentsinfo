---
title: "Firecrawl's search MCP had 680,952 npm downloads"
description: "From October 14 through November 12, 2026, firecrawl-mcp had 680,952 npm downloads. In the 7 days through November 12, Perplexity passed Exa, 55,781 to 44,387. Brave had 162,285 downloads and 1,577 stars. Tavily had 84,003 and 2,489."
date: "2026-11-13"
updated: "2026-11-13"
type: original-report
topics:
  - research
  - tools-saas
  - harnesses
  - how-agents-work
companies:
  - github
  - perplexity
contentLicense: true
absoluteTitle: true
dataset:
  title: "npm downloads and GitHub stars for official web-search MCP servers, November 13, 2026"
  description: "npm downloads point API totals for seven packages whose package.json on the default branch names them and whose npm repository field points back at the same GitHub repo. The 30-day window is 2026-10-14 through 2026-11-12. The 7-day window is 2026-11-06 through 2026-11-12. Responses carried HTTP Date Fri, 13 Nov 2026 13:47:02 GMT, and the You.com 7-day response carried 13:47:03 GMT. The largest 30-day total is firecrawl-mcp at 680,952. GitHub stargazers_count for the ten repositories in the November 12 MCP table was read at 13:43 GMT the same day. Jina's package.json sets private true. Parallel has no package.json. PyPI returned 404 for serpapi-mcp-server. A download is a file request, not a user."
  isBasedOn: "https://api.npmjs.org/downloads/point/2026-10-14:2026-11-12/firecrawl-mcp"
abstract: |
  firecrawl-mcp was downloaded 680,952 times on npm from October 14 through November 12, 2026. exa-mcp-server had 164,636 in that window. @brave/brave-search-mcp-server had 162,285. @perplexity-ai/mcp-server had 132,575. tavily-mcp had 84,003.

  The last seven days of that window change the order under Firecrawl. @perplexity-ai/mcp-server had 55,781 downloads from November 6 through November 12. @brave/brave-search-mcp-server had 50,312. exa-mcp-server had 44,387. Perplexity's seven-day total is 42.1 percent of its 30-day total. Firecrawl's is 29.4 percent. Exa's is 27.0 percent.
whyItMatters: |
  The November 12 price report on this site ranks these same repositories by GitHub stars. Stars put Exa second, Tavily fourth, and Brave fifth. File requests put Firecrawl first in both windows, Brave ahead of Tavily in both, and Perplexity ahead of Exa in the last seven days.

  A builder who picks a search MCP server from the star table will overweight Exa and Tavily relative to what machines actually fetched. The bill for a call is still the price report. A download does not say the package was the right tool, and it does not say a person installed it.
keyFindings:
  - "firecrawl-mcp had 680,952 npm downloads from October 14 through November 12, 2026, and 200,147 from November 6 through November 12. The point responses carried HTTP Date Fri, 13 Nov 2026 13:47:02 GMT. npm latest is 3.40.0, published 2026-11-12T03:24:52.205Z, which matches package.json on main."
  - "In the 30-day window exa-mcp-server had 164,636 and @brave/brave-search-mcp-server had 162,285, a gap of 2,351. In the 7-day window Brave had 50,312 and Exa had 44,387. Brave's repository had 1,577 stars at 13:43 GMT. Exa's had 5,231."
  - "@perplexity-ai/mcp-server had 132,575 downloads in 30 days and 55,781 in 7 days. 55,781 divided by 132,575 is 0.421. Exa's 7-day share of its 30-day total is 0.270. Perplexity's npm latest is 1.3.0, published 2026-09-25T20:18:54.576Z. package.json on main says 1.4.0."
  - "tavily-mcp had 84,003 downloads in 30 days and 2,489 stars. Brave had 162,285 downloads and 1,577 stars. Brave's 30-day count divided by Tavily's is 1.93. Tavily's npm latest is 0.2.22, published 2026-08-05T16:49:02.196Z. package.json on main says 0.2.23."
  - "jina-ai/MCP had 909 stars and package.json sets private to true. parallel-web/search-mcp had 33 stars and no package.json on main. GET https://pypi.org/pypi/serpapi-mcp-server/json returned 404 at 13:44:16 GMT. Those three are in the star table and out of the npm ranking."
methodology: |
  The set is the ten repositories in the MCP table of this site's November 12 web-search tools report. Stars, forks, license SPDX ids, pushed_at, and default branch come from the GitHub repository API, Accept application/vnd.github+json. The ten responses carried HTTP Date Fri, 13 Nov 2026 13:43:43 GMT through 13:43:45 GMT. CopilotKit/OpenBot was not in the set.

  The npm package name is the name field of package.json on the default branch, fetched from raw.githubusercontent.com the same afternoon. The npm registry document for that name was then read. A package stays in the download table when its repository URL points at the same GitHub repository. All seven published packages did. jina-ai/MCP's package.json sets private to true, so it has no npm download row. parallel-web/search-mcp returned 404 for package.json on main.

  Download totals are the npm downloads point API. The 30-day window is 2026-10-14:2026-11-12. The 7-day window is 2026-11-06:2026-11-12. Both are inclusive. Each 30-day response and six of the seven 7-day responses carried HTTP Date Fri, 13 Nov 2026 13:47:02 GMT. @youdotcom-oss/mcp's 7-day response carried 13:47:03 GMT. A download is a file request. npx, CI, and a dependency install all count. The two windows share November 6 through November 12, so the 7-day figure is a slice of the 30-day figure, not a second population.

  Downloads per star are the 30-day npm total divided by stargazers_count from the 13:43 GMT pass, printed to one decimal. Shares of the 30-day total are the 7-day total divided by the 30-day total, printed to three decimals in the findings and as a percent to one decimal in the prose. Version strings are the version field on main and the latest dist-tag on the npm document, with the time field for that version. PyPI was requested only for the name in serpapi/serpapi-mcp's pyproject.toml, serpapi-mcp-server. That URL returned HTTP 404 with Date Fri, 13 Nov 2026 13:44:16 GMT.
limitations:
  - "The ten repositories are the November 12 table, not every search MCP server. A package whose name omits the official repo is absent. The npm package firecrawl, and the Python SDKs for these APIs, are different objects and are not in the totals."
  - "A download is a file request. It is not a weekly active user, not a production agent, and not a quality rank. One CI matrix can outrun a careful install."
  - "Jina, Parallel, and SerpAPI can be connected as remote HTTP servers. Their absence from the npm table is an absence of a counted package, not a claim that no agent uses them."
  - "Stars were read at 13:43 GMT and downloads at 13:47 GMT. A star that landed in those four minutes is on one side of the ratio only."
  - "npm's latest dist-tag is the version a default install receives. A git URL install of main can receive the version string in package.json instead. This note records the disagreement. It does not run either install."
  - "The 7-day share can rise because this week was busy or because earlier weeks in the 30-day window were quiet. The point API does not say which."
references:
  - title: "npm downloads point API, firecrawl-mcp, October 14 through November 12, 2026"
    url: "https://api.npmjs.org/downloads/point/2026-10-14:2026-11-12/firecrawl-mcp"
    note: "680,952. HTTP Date Fri, 13 Nov 2026 13:47:02 GMT. The other six 30-day URLs were the same window and the same minute."
  - title: "npm downloads point API, @perplexity-ai/mcp-server, November 6 through November 12, 2026"
    url: "https://api.npmjs.org/downloads/point/2026-11-06:2026-11-12/@perplexity-ai/mcp-server"
    note: "55,781. HTTP Date Fri, 13 Nov 2026 13:47:02 GMT."
  - title: "npm registry, firecrawl-mcp"
    url: "https://registry.npmjs.org/firecrawl-mcp"
    note: "latest 3.40.0 at 2026-11-12T03:24:52.205Z. repository git+https://github.com/firecrawl/firecrawl-mcp-server.git. Read 13:44:11 GMT."
  - title: "npm registry, @perplexity-ai/mcp-server"
    url: "https://www.npmjs.com/package/@perplexity-ai/mcp-server"
    note: "latest 1.3.0 at 2026-09-25T20:18:54.576Z. The versions map has no 1.4.0. Registry document read 13:44:15 GMT."
  - title: "npm registry, tavily-mcp"
    url: "https://registry.npmjs.org/tavily-mcp"
    note: "latest 0.2.22 at 2026-08-05T16:49:02.196Z. The versions map has no 0.2.23. Registry document read 13:44:13 GMT."
  - title: "GitHub repository API, the ten search MCP repositories"
    url: "https://api.github.com/repos/firecrawl/firecrawl-mcp-server"
    note: "stargazers_count read 13:43:43–13:43:45 GMT on November 13, 2026. Firecrawl 7,815. Exa 5,231. Perplexity 2,624. Tavily 2,489. Brave 1,577. Jina 909. SerpAPI 184. Parallel 33. Linkup 29. You.com 27."
  - title: "package.json on the default branch of each repository"
    url: "https://raw.githubusercontent.com/firecrawl/firecrawl-mcp-server/main/package.json"
    note: "Fetched the same afternoon. Jina sets private true. Parallel's package.json URL returned 404."
  - title: "PyPI JSON, serpapi-mcp-server"
    url: "https://pypi.org/pypi/serpapi-mcp-server/json"
    note: "HTTP 404. Date Fri, 13 Nov 2026 13:44:16 GMT. The name is the one in pyproject.toml on main."
  - title: "AI Agents Info, web search tools for AI agents, November 12, 2026"
    url: "https://www.aiagentsinfo.com/reports/web-search-tools-for-ai-agents-november-2026"
    note: "The star table this set is taken from. Prices and rate limits live there. This note does not replace them."
citation:
  apa: "AI Agents Info. (2026, November 13). Firecrawl's search MCP had 680,952 npm downloads. https://www.aiagentsinfo.com/research/web-search-mcp-npm-downloads-november-2026"
  bibtex: |
    @misc{aiagentsinfo2026searchMcpDownloads,
      title={Firecrawl's search MCP had 680,952 npm downloads},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/web-search-mcp-npm-downloads-november-2026},
      note={npm downloads point API, windows ending 2026-11-12, read 2026-11-13T13:47:02Z}
    }
ledeQuestion: "Which official web search MCP server do agents install?"
ledeAnswer: "firecrawl-mcp, with 680,952 npm downloads from October 14 through November 12, 2026. In the last seven days of that window Perplexity passed Exa, 55,781 to 44,387. Brave had fewer stars than Tavily and 162,285 downloads to Tavily's 84,003."
faq:
  - question: "Which web search MCP server has the most npm downloads?"
    answer: "firecrawl-mcp, with 680,952 downloads from October 14 through November 12, 2026. The same package had 200,147 downloads from November 6 through November 12. npm latest is 3.40.0, published November 12. The responses carried HTTP Date Fri, 13 Nov 2026 13:47:02 GMT."
  - question: "Did the install ranking change in the last seven days?"
    answer: "Under Firecrawl, yes. The 30-day order is Firecrawl, Exa, Brave, Perplexity, Tavily. The 7-day order is Firecrawl, Perplexity, Brave, Exa, Tavily. Perplexity had 55,781 downloads in those seven days. Exa had 44,387. Brave had 50,312."
  - question: "Does a higher GitHub star count mean more installs?"
    answer: "No. At 13:43 GMT on November 13, Tavily had 2,489 stars and Brave had 1,577. Brave had 162,285 npm downloads in the 30-day window and Tavily had 84,003. Exa had 5,231 stars and 164,636 downloads, 2,351 ahead of Brave over 30 days and behind Brave over the last seven."
  - question: "Why are Jina, Parallel, and SerpAPI missing from the download table?"
    answer: "Jina's package.json sets private to true. Parallel has no package.json on main. The README points at https://search.parallel.ai/mcp. PyPI returned 404 for serpapi-mcp-server, the name in SerpAPI's pyproject.toml. The README documents a hosted URL and a local uv run. They remain in the star list."
  - question: "Does the npm version match the GitHub tree?"
    answer: "Firecrawl, Exa, Brave, and You.com match. Perplexity's main package.json says 1.4.0 and npm latest is 1.3.0 from September 25. Tavily's main says 0.2.23 and npm latest is 0.2.22 from August 5. Linkup's main says 3.0.0 and npm latest is 3.4.0 from September 15."
---

**680,952.** That is how many times the npm package `firecrawl-mcp` was downloaded from October 14 through November 12, 2026.

The next three official search MCP packages in that window were `exa-mcp-server` at **164,636**, `@brave/brave-search-mcp-server` at **162,285**, and `@perplexity-ai/mcp-server` at **132,575**. `tavily-mcp` had **84,003**. The point responses carried HTTP Date Fri, 13 Nov 2026 13:47:02 GMT.

The last seven days of the same window, November 6 through November 12, keep Firecrawl first at **200,147** and then change the order. Perplexity had **55,781**. Brave had **50,312**. Exa had **44,387**. Tavily had **19,428**.

Stars, read at 13:43 GMT the same afternoon, still put Exa second and Tavily ahead of Brave. The [November 12 price and limit report](/reports/web-search-tools-for-ai-agents-november-2026) is that star table, plus the call prices. This note is the file requests. The call fee, including the tokens you keep, is the [web search API cost calculator](/tools/web-search-api-cost-per-agent-task). Claude's and OpenAI's own `web_search` tools are a different object. The November 12 search found no official MCP repo for those two, and they are not in this table.

## The 30-day count and the 7-day count

A download is a file request on npm. It counts `npx`, a CI job, and a dependency. It does not count a person. The 7-day window sits inside the 30-day window. Per star is the 30-day total divided by `stargazers_count` from the 13:43 GMT pass.

| Package | 30 days | 7 days | 7-day share | Stars | Per star | npm latest |
| --- | --- | --- | --- | --- | --- | --- |
| firecrawl-mcp | 680,952 | 200,147 | 29.4% | 7,815 | 87.1 | 3.40.0 |
| exa-mcp-server | 164,636 | 44,387 | 27.0% | 5,231 | 31.5 | 3.4.3 |
| @brave/brave-search-mcp-server | 162,285 | 50,312 | 31.0% | 1,577 | 102.9 | 2.1.4 |
| @perplexity-ai/mcp-server | 132,575 | 55,781 | 42.1% | 2,624 | 50.5 | 1.3.0 |
| tavily-mcp | 84,003 | 19,428 | 23.1% | 2,489 | 33.7 | 0.2.22 |
| @youdotcom-oss/mcp | 2,724 | 334 | 12.3% | 27 | 100.9 | 4.0.7 |
| linkup-mcp-server | 1,858 | 542 | 29.2% | 29 | 64.1 | 3.4.0 |

200,147 divided by 680,952 is 0.294. 55,781 divided by 132,575 is 0.421. 44,387 divided by 164,636 is 0.270. 50,312 divided by 162,285 is 0.310. 19,428 divided by 84,003 is 0.231. 334 divided by 2,724 is 0.123. 542 divided by 1,858 is 0.292.

You.com's 100.9 downloads per star sits on 27 stars. Brave's 102.9 sits on 1,577 stars and 162,285 downloads. The small denominator is why You.com is in the table and out of the sentence that calls Brave the busiest package per star among the five that cleared 10,000 downloads.

## Perplexity passed Exa in seven days

Over 30 days Exa leads Brave by **2,351** downloads. 164,636 minus 162,285 is 2,351. That is 1.4 percent of Brave's total. Over the last seven days Brave leads Exa, 50,312 to 44,387, and Perplexity leads both.

Perplexity's seven-day total is 42.1 percent of its 30-day total. Exa's is 27.0 percent. A week that holds two-fifths of the month is a faster recent fetch rate, on this registry, for this package name. It is still a file request. The npm document's repository field is `git+https://github.com/perplexityai/modelcontextprotocol.git`, which is the official repo. The count is not a second package that happens to share a word.

The [star table from November 12](/reports/web-search-tools-for-ai-agents-november-2026) had Firecrawl at 7,803, Exa at 5,227, Perplexity at 2,621, Tavily at 2,486, and Brave at 1,569. This pass, at 13:43 GMT on November 13, has 7,815, 5,231, 2,624, 2,489, and 1,577. The star order did not move. The install order did, inside the week.

## Brave has fewer stars than Tavily and more installs

Tavily's repository had **2,489** stars. Brave's had **1,577**. Brave's 30-day downloads were **1.93** times Tavily's. 162,285 divided by 84,003 is 1.932. The seven-day multiple is larger: 50,312 divided by 19,428 is 2.59.

Downloads per star make the same split. Brave is at 102.9. Tavily is at 33.7. Exa, second in stars and second in the 30-day count, is at 31.5, the lowest of the five large packages. A star on Exa or Tavily is a weaker signal of a recent npm fetch than a star on Brave, inside this set, on this date.

That is a reason to read the install column before you pick a default MCP server for a harness. It is not a reason to ignore the bill. Brave's search API price, Tavily's credit, and Exa's list price are on the [November 12 report](/reports/web-search-tools-for-ai-agents-november-2026). Firecrawl leading the download table does not make Firecrawl the cheap call.

## Three starred repos are not in the npm table

The November 12 table has ten repositories. Seven have an npm package whose registry metadata points back at that repository. Three do not.

| Repository | Stars | What the tree offers instead of an npm count |
| --- | --- | --- |
| jina-ai/MCP | 909 | package.json name `jina-mcp`, version 1.10.0, `private: true`. The README's remote URL is `https://mcp.jina.ai/v1`. |
| serpapi/serpapi-mcp | 184 | pyproject name `serpapi-mcp-server`. PyPI returned 404 for that name at 13:44:16 GMT. The README's local line is `uv sync && uv run`, and it also documents `https://mcp.serpapi.com/mcp`. |
| parallel-web/search-mcp | 33 | No package.json on main. The README's server URL is `https://search.parallel.ai/mcp`, with no API key. |

Jina's 909 stars would put it sixth if this page ranked the ten by stars and then pretended every row was an npm package. It is sixth by stars. It is absent from the download ranking because the package is marked private. Parallel's README tells a coding agent to add a hosted URL. A star there bookmarks that instruction. It does not increment `linkup-mcp-server` or `firecrawl-mcp`.

## The version on main and the version npm will install

Four packages agree with themselves. `firecrawl-mcp` 3.40.0 was published 2026-11-12T03:24:52.205Z, and that string is the version on main. `exa-mcp-server` 3.4.3 was published 2026-11-03T01:19:27.949Z. `@brave/brave-search-mcp-server` 2.1.4 was published 2026-09-17T14:48:15.965Z. `@youdotcom-oss/mcp` 4.0.7 was published 2026-10-28T00:01:42.756Z.

Three disagree.

| Package | version on main | npm latest | npm time (UTC) |
| --- | --- | --- | --- |
| @perplexity-ai/mcp-server | 1.4.0 | 1.3.0 | 2026-09-25T20:18:54.576Z |
| tavily-mcp | 0.2.23 | 0.2.22 | 2026-08-05T16:49:02.196Z |
| linkup-mcp-server | 3.0.0 | 3.4.0 | 2026-09-15T15:43:06.227Z |

The npm versions map for Perplexity ends at 1.3.0. Tavily's ends at 0.2.22. Linkup's latest is 3.4.0, which is ahead of the `3.0.0` string sitting on main, not behind it. A default `npx` install receives the dist-tag. A clone of main can carry the other string. Pin the version you ran when you write the eval down. The [MCP config generator](/tools/mcp-config-generator) writes the client file. It does not choose between these two strings for you.

## What this means if you are wiring search

Use the 30-day column when you want the package machines fetched all month. Use the 7-day column when you want the week that just finished. On November 13 those two columns agree on Firecrawl and disagree on Perplexity, Brave, and Exa.

If the harness needs the official MCP package people already resolve from npm, start with `firecrawl-mcp` and then decide whether the last week is enough reason to try `@perplexity-ai/mcp-server` beside it. If you were about to pick Tavily because 2,489 stars beat Brave's 1,577, read 84,003 against 162,285 first. Then read the price. Installs are not a rate card.

If the harness should call a hosted URL and never `npm install` a search server, Jina, SerpAPI, and Parallel are in that group, and this table is the wrong ranking for them. Claude's and OpenAI's built-in web search tools are in that group too. Their fee, $10 per 1,000 calls on the pages read November 12, is the [price report](/reports/web-search-tools-for-ai-agents-november-2026), and the token cost of the tool definition is [8 tokens or 17](/blog/best-web-search-tool-for-claude-and-openai-agents).
