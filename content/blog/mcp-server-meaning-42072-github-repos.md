---
title: "MCP Server Meaning: 42,072 Repos Carry the Tag"
description: "42,072 GitHub repos were tagged mcp-server at 03:35 UTC on November 10, 2026. The registry listed 59,506 on November 8. An MCP server offers tools, resources, and prompts."
takeaways:
  - "At 03:35:36 UTC on November 10, 2026, GitHub’s repository search for topic:mcp-server returned total_count 42,072, with incomplete_results false. The most-starred hit was n8n-io/n8n, at 209,951 stars, a workflow product whose topics include mcp-server."
  - "The official registry’s latest-version list, counted on this site on November 8, held 59,506 records. That list and the GitHub topic are different objects, taken almost two days apart. 59,506 minus 42,072 is 17,434, and the gap is not a same-minute difference."
  - "A search for mcp server in the repository name returned 55,860. The first hit was punkpeye/awesome-mcp-servers, a list of servers, at 97,545 stars. GitHub’s own server, github/github-mcp-server, had 34,356 stars and was second on that name search."
date: "2026-11-10"
updated: "2026-11-10"
category: explainer
topics:
  - tools-saas
  - harnesses
  - how-agents-work
audience:
  - everyone
  - builders
companies:
  - github
  - google
  - anthropic
  - microsoft
byline: "AI Agents Info Editorial"
contentLicense: true
absoluteTitle: true
dataset:
  title: "GitHub search totals for MCP server tags and names, November 10, 2026"
  description: "Three GitHub repository searches at 03:35 UTC on November 10, 2026. topic:mcp-server returned total_count 42,072 at 03:35:36 GMT. topic:model-context-protocol returned 43,119 at 03:35:39 GMT. The query mcp server in:name returned 55,860 at 03:35:42 GMT. Each response had incomplete_results false. The page requested 10 rows per query. github/github-mcp-server and atlassian/atlassian-mcp-server were also read as repository objects at 03:35:35 and 03:35:36 GMT."
  isBasedOn: "https://api.github.com/search/repositories?q=topic:mcp-server"
sources:
  - title: "Model Context Protocol specification, revision 2026-07-28 (read November 10, 2026)"
    url: "https://modelcontextprotocol.io/specification/2026-07-28"
  - title: "Model Context Protocol versioning page (read November 10, 2026)"
    url: "https://modelcontextprotocol.io/docs/learn/versioning"
  - title: "GitHub search API, topic:mcp-server, sorted by stars (HTTP Date 03:35:36 GMT, November 10, 2026)"
    url: "https://api.github.com/search/repositories?q=topic:mcp-server&sort=stars&order=desc&per_page=10"
  - title: "GitHub search API, topic:model-context-protocol (HTTP Date 03:35:39 GMT)"
    url: "https://api.github.com/search/repositories?q=topic:model-context-protocol&sort=stars&order=desc&per_page=10"
  - title: "GitHub search API, mcp server in:name (HTTP Date 03:35:42 GMT)"
    url: "https://api.github.com/search/repositories?q=mcp+server+in:name&sort=stars&order=desc&per_page=10"
  - title: "GitHub REST API, github/github-mcp-server (HTTP Date 03:35:35 GMT)"
    url: "https://api.github.com/repos/github/github-mcp-server"
  - title: "GitHub REST API, atlassian/atlassian-mcp-server (HTTP Date 03:35:36 GMT)"
    url: "https://api.github.com/repos/atlassian/atlassian-mcp-server"
  - title: "AI Agents Info, How many official MCP servers are there? (registry census, November 8, 2026)"
    url: "https://www.aiagentsinfo.com/blog/how-many-official-mcp-servers-are-there"
  - title: "MCP glossary on this site"
    url: "https://www.aiagentsinfo.com/glossary/model-context-protocol"
faq:
  - question: "What does MCP server mean?"
    answer: "In the Model Context Protocol specification, revision 2026-07-28, read November 10, 2026, a server is a service that provides context and capabilities. Servers may offer resources, prompts, and tools. The versioning page read the same day says the current protocol version is 2026-07-28. A GitHub topic named mcp-server is a label on a repository. It is not, by itself, one of those services."
  - question: "How many GitHub repositories are tagged mcp-server?"
    answer: "42,072. That is total_count from GitHub’s repository search for topic:mcp-server, sorted by stars, at 03:35:36 UTC on November 10, 2026. incomplete_results was false. This page requested 10 rows and did not download 42,072 repositories. The first row was n8n-io/n8n, at 209,951 stars."
  - question: "Is 42,072 the same number as the 59,506 official MCP servers?"
    answer: "No. 59,506 is the official registry’s latest-record count from 13:43 to 13:45 UTC on November 8, 2026, from a full pagination published on this site. 42,072 is a GitHub topic total from November 10. The registry figure is 17,434 higher. The counts were taken about 38 hours apart, they count different objects, and one repository can hold many registry records."
  - question: "Is there an official Jira MCP server?"
    answer: "Atlassian’s repository atlassian/atlassian-mcp-server describes itself as the official remote MCP server for Atlassian, and the description names Jira, Confluence, Jira Service Management, Bitbucket, and Compass. It had 1,151 stars at 03:35:36 UTC on November 10, 2026. Its topics include jira and mcp-server. This page did not open the server and count its tools."
  - question: "Which MCP server should an agent connect to?"
    answer: "Connect the server the vendor publishes for the system you use. On this pass, GitHub’s official server was github/github-mcp-server, at 34,356 stars, release v2.1.0 published November 3, 2026. The topic leaderboard’s first row was n8n, a workflow product. A star rank of tagged repositories is not a list of servers to enable."
---

**42,072** GitHub repositories carried the topic `mcp-server` at 03:35:36 UTC on November 10, 2026.

MCP server meaning, in the [specification](https://modelcontextprotocol.io/specification/2026-07-28) for revision 2026-07-28, is a service that provides context and capabilities to a host. Servers may offer resources, prompts, and tools. The 42,072 figure is a topic tag on GitHub. The [official registry](/blog/how-many-official-mcp-servers-are-there) held 59,506 latest records when this site paginated it on November 8. Both numbers are real. They do not count the same thing, and a buyer who treats either one as “servers worth connecting” has misread the label.

## What does MCP server mean?

A server, in this protocol, is the program a host connects to when a model needs a tool or a piece of context.

The specification page for revision 2026-07-28, read November 10, 2026, says MCP uses JSON-RPC 2.0 between three roles. Hosts are LLM applications that initiate connections. Clients are connectors inside the host. Servers are services that provide context and capabilities. The same page says servers offer any of these features to clients:

| Feature | What the specification says it is |
| --- | --- |
| Resources | Context and data, for the user or the AI model to use |
| Prompts | Templated messages and workflows for users |
| Tools | Functions for the AI model to execute |

The [versioning page](https://modelcontextprotocol.io/docs/learn/versioning), read the same day, says the current protocol version is 2026-07-28, and that a version string marks the last date of a backwards-incompatible change. The short glossary entry, with the November 8 reading of the same revision, is [What is an MCP server in AI?](/glossary/model-context-protocol).

A host such as Claude Code or a chat app decides which servers are connected. The [harness](/glossary/harness) is the loop around the model, including that decision. [Tool use](/glossary/tool-use) is the call itself. An [agent](/glossary/agent), on this site, is the model plus that loop. An MCP server is one way the loop reaches a system outside the model. The loop that makes the call is [How do AI agents work?](/blog/how-do-ai-agents-work).

The specification’s security section says tools represent arbitrary code execution, and that hosts must obtain explicit user consent before invoking any tool. A topic tag does not carry that consent. Connecting a repository because it is tagged `mcp-server` skips the step the spec puts on the host.

## How many GitHub repositories are tagged mcp-server?

42,072, if you ask the search API for `topic:mcp-server` and you read `total_count` at 03:35:36 UTC on November 10, 2026.

`incomplete_results` was false. The request asked for 10 rows, sorted by stars. This page did not download 42,072 repositories, and GitHub’s search API does not hand you a full export of a result that large. `total_count` is the index’s reported size for that query.

Two neighboring queries, the same minute, returned different totals. Adding them would double-count repositories that match more than one query. `DeusData/codebase-memory-mcp` appeared in the first page of both topic searches.

| Query | total_count | HTTP Date (November 10, 2026) | First result | Stars on that hit |
| --- | --- | --- | --- | --- |
| `topic:mcp-server` | 42,072 | 03:35:36 GMT | n8n-io/n8n | 209,951 |
| `topic:model-context-protocol` | 43,119 | 03:35:39 GMT | HKUDS/nanobot | 49,980 |
| `mcp server in:name` | 55,860 | 03:35:42 GMT | punkpeye/awesome-mcp-servers | 97,545 |

`HKUDS/nanobot` describes itself as a lightweight open-source personal agent. Its topics on that hit included `model-context-protocol` and did not include `mcp-server`. `microsoft/mcp-for-beginners`, 17,633 stars on the protocol-topic search, describes itself as a curriculum. A course repository can carry the protocol topic. The topic is a label the maintainer applied.

## What are the 10 most-starred repositories with the tag?

n8n is first, at 209,951 stars. GitHub’s own MCP server, at 34,356, is not in this ten.

Every row below came from the `topic:mcp-server` response, and every row’s topics array included `mcp-server`. The description is the description field, shortened where the field was a slogan. Stars are the stars on the search hit.

| Repository | Stars | What the description says |
| --- | --- | --- |
| n8n-io/n8n | 209,951 | Fair-code workflow automation platform with native AI capabilities. Topics also include `mcp-client`. |
| google-gemini/gemini-cli | 108,746 | An open-source AI agent that brings Gemini into the terminal. Topics also include `mcp-client`. |
| D4Vinci/Scrapling | 100,635 | A web scraping framework. |
| koala73/worldmonitor | 90,424 | A real-time global intelligence dashboard. |
| ruvnet/ruflo | 81,376 | “The original agent harness.” The rest of the field describes swarms and workflows. |
| upstash/context7 | 64,444 | Up-to-date docs for AI agents. |
| sansan0/TrendRadar | 63,559 | An AI-driven monitor for public opinion and trends. The field says it can be reached through MCP. |
| ChromeDevTools/chrome-devtools-mcp | 55,035 | Chrome DevTools for coding agents. |
| DeusData/codebase-memory-mcp | 48,423 | Local code intelligence for developers and AI agents, including MCP tools. |
| reactive-resume/reactive-resume | 45,559 | A resume builder. |

The first row is a workflow product with hundreds of integrations. The third is a scraper. The tenth is a resume builder. Gemini CLI is an agent, and its topics include both `mcp-server` and `mcp-client`, so the tag on that repository does not tell you which role the code plays. Ruflo’s description uses the words “agent harness.” The star reading for repositories that put harness in the name, a different query, is [277,506 GitHub stars on DeepSeek Harness](/research/how-many-github-stars-does-deepseek-harness-have). Ruflo’s name is ruflo, so that note’s name filter does not include it. It is here because of the topic.

A tag leaderboard answers “which tagged repository has the most bookmarks.” It does not answer “which server should this agent call.”

## Why does the registry say 59,506?

Because the registry counted latest server records on November 8, and this page counted a GitHub topic on November 10.

The [registry census](/blog/how-many-official-mcp-servers-are-there) paginated `https://registry.modelcontextprotocol.io/v0.1/servers` with `version=latest`. From 13:43:33 to 13:45:25 UTC on November 8 it counted 59,506 latest records, 58,565 marked active and 941 marked deprecated. A second pass, ending at 13:47:43 UTC, counted 59,508. One namespace, `io.github.sadri-dridi`, held 2,366 of the records. The about page, read that hour, says the metadata is unopinionated and that host apps should use a downstream marketplace rather than the raw registry.

59,506 minus 42,072 is 17,434. The registry figure is larger, and it is also older by about 38 hours. Records can appear or disappear in that gap. The November 8 page already watched the total move by two records in two minutes. The subtraction is a way to see that the numbers disagree. It is not a measure of how many tagged repositories are missing from the registry, because the sets were not joined.

The registry can list many servers for one repository. The November 8 pass found 30,687 distinct repository URLs inside a list of about 59,500 records, and 20,434 records with no repository URL. A GitHub topic is one label per repository. A repository that publishes twenty servers can add twenty registry rows and one topic. A repository that never applied the topic, including some official servers in the name search below, adds zero to the 42,072.

This site’s own read-only server for the directory is the [MCP server](/mcp) page. It is one server. It is not part of the 42,072 unless someone has tagged a repository for it, and this page did not check that.

## Is there an official GitHub MCP server, and a Jira MCP server?

Yes for GitHub, on GitHub’s own repository. Atlassian’s repository says it is the official remote server and names Jira in the description.

The name query `mcp server in:name` is how those repositories show up when the topic chart is the wrong chart. At 03:35:42 GMT it returned `total_count` 55,860. The first page, sorted by stars:

| Repository | Stars on the search hit | Topics include `mcp-server` | What the description says |
| --- | --- | --- | --- |
| punkpeye/awesome-mcp-servers | 97,545 | No | “A collection of MCP servers.” |
| github/github-mcp-server | 34,356 | Yes | “GitHub's official MCP Server.” |
| apify/apify-mcp-server | 15,488 | Yes | The Apify MCP server, for that company’s scrapers and automation tools. |
| BeehiveInnovations/pal-mcp-server | 11,834 | No | The description names Claude Code, GeminiCLI, and CodexCLI working with several model providers as one. |
| firecrawl/firecrawl-mcp-server | 7,792 | Yes | Official Firecrawl MCP server. |
| appcypher/awesome-mcp-servers | 5,827 | No | A curated list of MCP servers. |
| exa-labs/exa-mcp-server | 5,220 | Yes | Exa MCP for web search and crawling. |
| makenotion/notion-mcp-server | 4,704 | No | “Official Notion MCP Server.” |
| cloudflare/mcp-server-cloudflare | 4,456 | No | Product-specific Cloudflare MCP servers. |
| antvis/mcp-server-chart | 4,416 | Yes | The description says it contains 25+ visual charts. |

Two of the ten are lists of servers: `punkpeye/awesome-mcp-servers` and `appcypher/awesome-mcp-servers`. The most-starred repository with “mcp server” in the name is a list. Notion’s official server and Cloudflare’s repository are on this page, and the topics array on those search hits did not include `mcp-server`. The tag total misses servers that put the words in the name and skip the topic. The name total includes lists, and it includes servers that skipped the topic.

The repository object for `github/github-mcp-server`, HTTP Date 03:35:35 GMT, agreed with the search hit: 34,356 stars, SPDX MIT, topics `github`, `mcp`, and `mcp-server`. The latest release was tag `v2.1.0`, name “GitHub MCP Server 2.1.0,” published 2026-11-03T11:11:41Z. `pushed_at` was 2026-11-09T18:56:03Z. The description was “GitHub's official MCP Server.”

The repository object for `atlassian/atlassian-mcp-server`, HTTP Date 03:35:36 GMT, had 1,151 stars, 151 forks, SPDX Apache-2.0, and `pushed_at` 2026-11-07T01:08:43Z. The description was “Official remote MCP server for Atlassian. Securely connect Jira, Confluence, Jira Service Management, Bitbucket, and Compass to Claude, ChatGPT, Cursor, VS Code, and other AI tools using OAuth 2.1 or API tokens.” The topics include `jira` and `mcp-server`. `releases/latest` returned 404. This page did not list pre-releases for that repository, and it did not count the tools the server exposes. The description is the evidence that an Atlassian-published server names Jira. A search for “jira mcp server” that lands on a topic chart will find other repositories first, because 1,151 stars does not enter the top ten of a 42,072-row tag.

## What should an agent connect to?

The server the vendor documents for the system you already use. The tag is a hint that the maintainer wanted to be found. The registry record is a metadata row. Neither one is a recommendation.

GitHub’s official server is `github/github-mcp-server`. Atlassian’s published server, the one whose description names Jira, is `atlassian/atlassian-mcp-server`. Notion’s, on the name search, is `makenotion/notion-mcp-server`. Chrome DevTools publishes `ChromeDevTools/chrome-devtools-mcp`. Those four are identifiable from the publisher and the description. n8n at 209,951 stars is identifiable as a workflow product that applied the topic. A resume builder with the same topic is still a resume builder.

The November 8 registry page already warned that one namespace can publish thousands of records that point at the same repository. This page adds the other direction: the repositories with the most stars under the topic are often products that speak MCP, or products that merely wear the tag, rather than the official server for a single vendor. If you are deciding what a coding agent is allowed to call, start from the vendor’s repository and the consent step in the specification, then use the [registry count](/blog/how-many-official-mcp-servers-are-there) only as the size of the metadata list.
