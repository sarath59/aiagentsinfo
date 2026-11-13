---
title: "5 of 44 top MCP server repos are archived"
description: "An MCP server offers tools, resources, and prompts. On November 13, 2026, 5 of 44 star-ranked repos were archived, and those five still had 9,827 stars."
absoluteTitle: true
date: "2026-11-13"
updated: "2026-11-13"
type: original-report
topics:
  - tools-saas
  - harnesses
  - how-agents-work
companies:
  - github
contentLicense: true
dataset:
  title: "Top MCP server repositories on GitHub, November 13, 2026"
  description: "The first page of GitHub repository search for mcp-server in the name, sorted by stars, at 2026-11-13T03:44:49Z. total_count was 56,008 and incomplete_results was false. Six rows that are lists or a guide were removed, leaving 44. Stars, license, owner type, archived, and pushed_at are fields on those search hits. Days since push are the search time minus pushed_at. Runs and auth are a reading of each repository's README on the default branch returned in that search, fetched the same morning. They are not a live connection test."
  isBasedOn: "https://api.github.com/search/repositories?q=mcp-server+in:name&sort=stars&order=desc&per_page=50"
ledeQuestion: "What is an MCP server?"
ledeAnswer: "A service that provides context and capabilities to a host. The specification for revision 2026-07-28, fetched November 13, 2026, says servers offer resources, prompts, and tools. A GitHub repository with mcp-server in its name is not, by itself, one of those services."
abstract: |
  Five of 44 repositories were archived. Together those five still had 9,827 stars, 6.1 percent of the 160,466 stars on the set.

  The set is the first page of GitHub's repository search for mcp-server in the name, sorted by stars, at 03:44:49 UTC on November 13, 2026, after lists and one guide were removed. The most-starred row on the raw page was punkpeye/awesome-mcp-servers, a list, at 97,667 stars. It is not in the 44. The most-starred server that remains is github/github-mcp-server, at 34,421 stars, pushed 0.2 days earlier.

  Six of the 44 descriptions contain the word official. Twenty-five repositories are owned by a user account. Thirty-three READMEs document a server you run yourself. Four document only a vendor-hosted URL. Seven document both.
whyItMatters: |
  The question people type is what an MCP server is. A star sort answers a different question: which repository with those words in the name has the most bookmarks. Five archived repositories are still in that sort. Notion's description says Official Notion MCP Server, and the README says this repository is no longer the one to use.

  A harness decides which servers are connected. Stars do not make that decision. The registry count published on this site on November 8 is a third object again: metadata rows, not these 44 repositories.
keyFindings:
  - "At 03:44:49 UTC on November 13, 2026, GitHub search for mcp-server in the name returned total_count 56,008, with incomplete_results false. The first 50 rows, sorted by stars, included 6 lists or a guide. The other 44 hold 160,466 stars and 20,344 forks."
  - "Five of the 44 are archived: browserbase/mcp-server-browserbase, GongRzhe/Office-Word-MCP-Server, GongRzhe/Office-PowerPoint-MCP-Server, yzfly/douyin-mcp-server, and GongRzhe/Gmail-MCP-Server. Their stars sum to 9,827."
  - "Six descriptions contain official. All six owners are organizations. Twenty-five of the 44 owners are user accounts. Apify's README says official and its description field does not, so the six is a field, not a complete vendor list."
  - "Thirty-three READMEs document a server you run. Four document only a vendor-hosted URL. Seven document both. Eleven name OAuth as a way to connect to this server. Sixteen name a key, token, or bearer and do not name OAuth. One names a database password. The LinkedIn README names a browser session. Fifteen name no auth method in the passages used here."
  - "Twenty-five repositories were pushed in the 30 days before the search. Three were last pushed more than 365 days earlier: financial-datasets/mcp-server at 525.3 days, leonardsellem/n8n-mcp-server at 491.3, and the archived Gmail server at 464.0. Archived and stale are different flags."
methodology: |
  The source is the public GitHub REST API, called without a token. GET https://api.github.com/search/repositories?q=mcp-server+in:name&sort=stars&order=desc&per_page=50 returned at 2026-11-13T03:44:49Z, taken from the HTTP Date header. total_count was 56,008. incomplete_results was false. The response held 50 repository objects. Stars are stargazers_count. Forks are forks_count. The license column is the SPDX id on the license object, or none when that object was null. NOASSERTION is GitHub's own value. Owner is Organization or User. Archived is the archived boolean. Days since push are that Date header minus pushed_at, in days, printed to one decimal. A value of 0.0 is under 0.05 days, about 72 minutes.

  A row was dropped when the repository name contained awesome, or when the description said the project is a collection, a curated list, or a guide. The six dropped rows are punkpeye/awesome-mcp-servers, appcypher/awesome-mcp-servers, wong2/awesome-mcp-servers, punkpeye/awesome-remote-mcp-servers, figma/mcp-server-guide, and jaw9c/awesome-remote-mcp-servers. The kept set is the other 44, in the search's star order. It is not every MCP server, and it is not the official registry.

  Runs and auth come from the README on the default branch named in the search hit, fetched from raw.githubusercontent.com the same morning. All 44 requests returned HTTP 200. Remote means the README tells a client to connect to an https URL on a vendor host. Local means the documented setup is a process you run, including stdio, npx, uvx, Docker, a plugin, or HTTP on localhost or your own host. Both means the README documents a vendor-hosted URL and a process you run for this repository. A self-hosted HTTP listener is local. A third-party host mentioned as an ad or an alternative service is not counted as this repository's remote server. Notion's README points at Remote Notion MCP, a different product, so this repository is local.

  Auth is a phrase the README uses for connecting to this server. OAuth is counted only when that phrase is about this server. Notion's OAuth sentence describes the remote product, so this repository is counted as a manual token. A parts-catalog key in the KiCAD README is not counted as the server's auth. No server was started. No token was sent.
limitations:
  - "The search is one page of 50, sorted by stars, for one query string. A server whose name omits mcp-server is absent. The November 10 name search on this site used a different query, mcp server as two words, and is not a before-and-after of this total_count."
  - "Archived is GitHub's boolean. A repository can be unarchived and still untouched for a year. financial-datasets/mcp-server is the case: not archived, pushed_at 525.3 days before the search."
  - "The description field is not the README. Six is the count of descriptions that contain official. Apify's README uses that word and the description does not. A vendor that never wrote the word is not in the six."
  - "Runs and auth are a reading of the README, not a probe of the endpoint. A hosted URL in an archived repository was not requested. Browserbase is archived and its README still prints a hosted URL. This note does not say that URL answered."
  - "Stars are bookmarks. They are not users, not a quality rank, and not a list of servers a harness should connect. The registry's latest-record count, 59,506 on November 8, counts metadata rows. These 44 are repositories."
  - "License none means the search hit had no license object. It does not mean a lawyer read the tree. NOASSERTION means GitHub did not map the file it found to an SPDX id. MATLAB's official server is in that cell."
references:
  - title: "GitHub search API, mcp-server in:name, sorted by stars, HTTP Date 2026-11-13T03:44:49Z"
    url: "https://api.github.com/search/repositories?q=mcp-server+in:name&sort=stars&order=desc&per_page=50"
    note: "total_count 56,008. incomplete_results false. 50 rows. Six dropped as lists or a guide."
  - title: "Model Context Protocol specification, revision 2026-07-28, HTTP Date Fri, 13 Nov 2026 03:49:28 GMT"
    url: "https://modelcontextprotocol.io/specification/2026-07-28"
    note: "Servers offer resources, prompts, and tools. Tools represent arbitrary code execution. Hosts must obtain explicit user consent."
  - title: "README files on the default branch of each of the 44 repositories"
    url: "https://raw.githubusercontent.com/github/github-mcp-server/main/README.md"
    note: "Fetched the same morning from raw.githubusercontent.com. All 44 returned HTTP 200. The GitHub README URL above is the pattern, not the only file."
  - title: "AI Agents Info, How many official MCP servers are there?"
    url: "https://www.aiagentsinfo.com/blog/how-many-official-mcp-servers-are-there"
    note: "Registry latest-record count of 59,506 on November 8, 2026. A different object from these 44 repositories."
  - title: "AI Agents Info, MCP server meaning: 42,072 repos carry the tag"
    url: "https://www.aiagentsinfo.com/blog/mcp-server-meaning-42072-github-repos"
    note: "topic:mcp-server total on November 10, 2026. Not this name search."
citation:
  apa: "AI Agents Info. (2026, November 13). 5 of 44 top MCP server repos are archived. https://www.aiagentsinfo.com/research/top-mcp-server-repos-november-2026"
  bibtex: |
    @misc{aiagentsinfo2026mcpserverrepos,
      title={5 of 44 top MCP server repos are archived},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/top-mcp-server-repos-november-2026},
      note={GitHub search read 2026-11-13T03:44:49Z}
    }
faq:
  - question: "What is an MCP server?"
    answer: "In the specification for revision 2026-07-28, fetched November 13, 2026, a server is a service that provides context and capabilities. Servers offer resources, prompts, and tools. The host is the LLM application. The client is the connector inside the host. A repository tagged or named mcp-server is a label on code. It is not, by itself, a server your agent should call."
  - question: "How many of the top MCP server repositories are archived?"
    answer: "Five of 44. The search for mcp-server in the name, sorted by stars, was read at 03:44:49 UTC on November 13, 2026. Lists and one guide were removed. The archived five are Browserbase, Office Word, Office PowerPoint, Douyin, and Gmail. They still had 9,827 stars."
  - question: "How many top MCP servers are official?"
    answer: "Six descriptions contain the word official: GitHub, Firecrawl, Notion, MATLAB, Qdrant, and Atlassian. All six owners are organizations. Apify's README says official and the description field does not. Notion's description says official, and the README says this repository is no longer the server to use."
  - question: "Are most of these servers remote?"
    answer: "No. Thirty-three of the 44 READMEs document a server you run. Four document only a vendor-hosted URL: Exa, Cloudflare, AnySearch, and Atlassian. Seven document both a hosted URL and a process you run, including GitHub's own server."
  - question: "Should an agent connect to the most-starred MCP repository?"
    answer: "Not from the star sort. The first row of the raw search was a list, punkpeye/awesome-mcp-servers, at 97,667 stars. The first server kept in this set is github/github-mcp-server, at 34,421, and its README offers a remote URL with OAuth or a personal access token. Connect the server the vendor documents, then read archived, pushed_at, and the auth the README names."
---

An MCP server is a service that provides context and capabilities to a host. The [specification for revision 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28), fetched at 03:49:28 UTC on November 13, 2026, says servers offer resources, prompts, and tools. **Five of 44** repositories in the star ranking below are archived. Those five still have **9,827** stars.

The 44 are what remains of the first page of GitHub's search for `mcp-server` in the repository name, sorted by stars, at 03:44:49 UTC the same morning, after lists and one guide were removed. The raw page's first row was a list, at 97,667 stars. It is not a server. The count of registry records, 59,506 on November 8, is not this list either. That census is [How many official MCP servers are there?](/blog/how-many-official-mcp-servers-are-there).

## What an MCP server is

The specification says the protocol uses JSON-RPC 2.0 among three roles. Hosts are LLM applications that initiate connections. Clients are connectors inside the host. Servers are services that provide context and capabilities.

The same page says servers offer any of these features to clients:

| Feature | What the specification says it is |
| --- | --- |
| Resources | Context and data, for the user or the AI model to use |
| Prompts | Templated messages and workflows for users |
| Tools | Functions for the AI model to execute |

Tools, the same page says, represent arbitrary code execution and must be treated with appropriate caution. Hosts must obtain explicit user consent before data access and operations. A star count does not carry that consent. The short glossary entry is [What is an MCP server?](/glossary/model-context-protocol). The loop that calls the tool is [How do AI agents work?](/blog/how-do-ai-agents-work).

A [harness](/glossary/harness) is the program that decides which servers are connected and what the model may call. [Tool use](/glossary/tool-use) is the call. The JSON for a connected tool is sent on turns where the model never uses it. That cost is [Why tool JSON costs more than your system prompt](/blog/why-tool-json-costs-more-than-your-system-prompt).

## Why the most-starred name is a list

`total_count` was **56,008**. `incomplete_results` was false. This note requested 50 rows. It did not download 56,008 repositories.

Six rows came off the page before any share was computed:

| Dropped | Why |
| --- | --- |
| punkpeye/awesome-mcp-servers | Name says awesome. Description: a collection of MCP servers. 97,667 stars, the first row |
| appcypher/awesome-mcp-servers | A curated list |
| wong2/awesome-mcp-servers | A curated list |
| punkpeye/awesome-remote-mcp-servers | A collection of remote MCP servers |
| figma/mcp-server-guide | Description: a guide on how to use the Figma MCP server |
| jaw9c/awesome-remote-mcp-servers | Name says awesome |

The kept 44 hold **160,466** stars and **20,344** forks. The median star count, the mean of the 22nd and 23rd rows, is **1,868**. GitHub's own server is first among the 44, at 34,421. 34,421 divided by 160,466 is 0.2145, which is 21.45 percent of the stars in the set.

A topic search is a different index. On November 10 this site recorded 42,072 repositories tagged `mcp-server`. That page is [MCP server meaning: 42,072 repos carry the tag](/blog/mcp-server-meaning-42072-github-repos). The query here is the name, not the topic. The two totals are not a time series.

## Five archived repositories still hold 9,827 stars

Archived is GitHub's boolean on the search hit. Five are true.

| Repository | Stars | Days since push | What the README still is |
| --- | --- | --- | --- |
| browserbase/mcp-server-browserbase | 3,399 | 115.2 | Says the repository is archived. Still prints a hosted URL and a self-hosted setup |
| GongRzhe/Office-Word-MCP-Server | 2,112 | 316.6 | A local server for Word documents. Python 3.8 or higher |
| GongRzhe/Office-PowerPoint-MCP-Server | 1,862 | 316.6 | A local server for PowerPoint, with a Docker HTTP example |
| yzfly/douyin-mcp-server | 1,285 | 133.8 | A local tool for short-video text. The README tells you to set an API key |
| GongRzhe/Gmail-MCP-Server | 1,169 | 464.0 | A local Gmail server. The README's auth is OAuth 2.0 |

3,399 + 2,112 + 1,862 + 1,285 + 1,169 = 9,827. That is 6.1 percent of the 160,466 stars, and 11.4 percent of the repositories. A harness that ranks servers by stars will meet these five before it meets Atlassian, which sits at 1,157 and is not archived.

Stale is a second cut. Three repositories were last pushed more than 365 days before the search. Gmail is one of them, and it is archived. The other two are not archived: `financial-datasets/mcp-server` at 525.3 days, and `leonardsellem/n8n-mcp-server` at 491.3 days. `BeehiveInnovations/pal-mcp-server` has 11,840 stars and was pushed 332.4 days earlier. It is not archived. A year of silence and an archived flag are different facts. Report both.

Twenty-five of the 44 were pushed in the 30 days before 03:44:49 UTC. Thirty-one were pushed in the 90 days. A push is not a release, and it is not a security review. It is the field GitHub calls `pushed_at`.

## Six descriptions say official. Twenty-five owners are users.

The word official appears in six description fields. Every one of those owners is an organization.

| Repository | Stars | What makes the word easy to misuse |
| --- | --- | --- |
| github/github-mcp-server | 34,421 | Description: GitHub's official MCP Server. README documents a remote URL and a local Docker run. Auth is OAuth or a personal access token |
| firecrawl/firecrawl-mcp-server | 7,811 | Description says official. README documents a hosted URL and a local install. Auth is OAuth or an API key |
| makenotion/notion-mcp-server | 4,705 | Description says Official Notion MCP Server. README says use Remote Notion MCP instead, and that this repository is no longer actively maintained. Pushed 14.5 days ago. Not archived |
| matlab/matlab-mcp-server | 1,815 | README says the official MATLAB MCP Server from MathWorks. License field is NOASSERTION. You run it locally, next to an installed MATLAB |
| qdrant/mcp-server-qdrant | 1,568 | README says an official MCP server. The install in the README is local, with a Qdrant API key |
| atlassian/atlassian-mcp-server | 1,157 | README says the official server, cloud-hosted, at `https://mcp.atlassian.com/v2/mcp`. Auth is OAuth 2.1 or an API token |

Six of 44 is 13.6 percent. It is the wrong denominator for "servers a company maintains." Apify's description does not contain official. The README's second sentence calls it the official Apify MCP server, and the search hit was pushed the same hour, at 16,010 stars. The description field missed a vendor. The README can also overclaim. Notion's description still says official after the README has sent readers elsewhere.

Owner type is the mechanical split. **25** repositories belong to a user account. **19** belong to an organization. 25 of 44 is 56.8 percent. A user account can be a vendor's founder. An organization can be a weekend project. The type is not a warranty. It is the field that separates "someone's repository" from "a GitHub org" without a judgment call.

Licenses on the 44 hits: MIT 23, Apache-2.0 12, BSD-3-Clause 2, MPL-2.0 1, GPL-3.0 1, NOASSERTION 2, and no license object on 3. The three with no license object are `DaxianLee/cocos-mcp-server`, `harishsg993010/damn-vulnerable-MCP-server`, and `jerry-ai-dev/MODULAR-RAG-MCP-SERVER`. The Damn Vulnerable server is a teaching lab. Its README says so. A missing license is still a missing license.

## Most of the READMEs tell you to run the server yourself

Remote, in this note, means the README gives a vendor-hosted URL as a way to connect. Local means you run the process, even when that process speaks HTTP on your machine. Both means the README documents the two for this repository.

| Where it runs | Repositories | Share of 44 |
| --- | ---: | --- |
| Local only | 33 | 75.0 percent |
| Vendor-hosted and local | 7 | 15.9 percent |
| Vendor-hosted only | 4 | 9.1 percent |

The four hosted-only READMEs are Exa (`https://mcp.exa.ai/mcp`), Cloudflare (hosted `/mcp` URLs, including `https://mcp.cloudflare.com/mcp`), AnySearch (`https://api.anysearch.com/mcp`), and Atlassian (`https://mcp.atlassian.com/v2/mcp`). The seven that document both include GitHub, Apify, Firecrawl, Browserbase, Terraform, Jupyter, and MongoDB. GitHub's remote URL in the README is `https://api.githubcopilot.com/mcp/`. MongoDB's README separates an Atlas connection over OAuth, which you do not run, from a local server and a connection string.

Eleven READMEs name OAuth as a way to connect to this server. Sixteen name an API key, a token, or a bearer and do not name OAuth. One, `designcomputer/mysql_mcp_server`, names a database password. The LinkedIn README names a browser session and not a key. Fifteen name no auth method in the passages this reading used. Notion is in the sixteen that name a token, not the eleven: the OAuth sentence is about Remote Notion MCP, and this repository's own setup is a manual token.

A token in a config file is a secret the model can be tricked into reading. OAuth is not automatically safer. It is a different grant, and the spec still puts consent on the host. The archived Gmail server is an OAuth server with 1,169 stars and no push in 464 days. Do not prefer it because the README says OAuth.

## What to connect, and what to leave

Connect the server the vendor documents for the system you already use. Then read three fields before the harness is allowed to call it: `archived`, `pushed_at`, and the auth the README names. Stars are the sort key that put a list first and an archived Gmail server inside the top 44. They are a bad allow-list.

GitHub's server is the clearest row in the set: 34,421 stars, MIT, not archived, pushed 0.2 days before the search, remote or local, OAuth or a personal access token. Atlassian's row is the one a buyer misses if they stop at the top ten: 1,157 stars, not archived, hosted, OAuth 2.1 or an API token, description says official. Notion's row is the warning. The description says official. The README says this repository is no longer actively maintained. Use the hosted product the README names, not the star count on the old tree.

If you publish a server, the description and the README are the two sentences a procurement review will quote. They disagreed on Notion. They disagreed, in the other direction, on Apify. Write the auth in the install block. An archived flag with 3,399 stars still ranks. The flag is the fact. The stars are the bait.

The same kind of GitHub snapshot, for agent frameworks rather than servers, is [AI agent framework GitHub stats, November 2026](/reports/ai-agent-framework-github-stats-november-2026). The seat a small business buys when it wants an assistant for every person, which is not this server list, is [AI staff for a small business: $7, $18, and $20 a seat](/blog/ai-staff-for-small-business-seat-prices-november-2026).

## The 44 repositories

Days are the search time, 2026-11-13T03:44:49Z, minus `pushed_at`. Owner is org or user. Official is whether the description field contains that word. Runs and auth are the README reading defined above.

| Repository | Stars | License | Owner | Archived | Days since push | Runs | Auth the README names | Official in description |
| --- | ---: | --- | --- | --- | ---: | --- | --- | --- |
| github/github-mcp-server | 34,421 | MIT | org | no | 0.2 | both | OAuth or PAT | yes |
| apify/apify-mcp-server | 16,010 | MIT | org | no | 0.0 | both | OAuth or API token | no |
| BeehiveInnovations/pal-mcp-server | 11,840 | NOASSERTION | org | no | 332.4 | local | model API key | no |
| firecrawl/firecrawl-mcp-server | 7,811 | MIT | org | no | 0.3 | both | OAuth or API key | yes |
| exa-labs/exa-mcp-server | 5,228 | MIT | org | no | 7.2 | remote | OAuth or API key | no |
| makenotion/notion-mcp-server | 4,705 | MIT | org | no | 14.5 | local | manual token | yes |
| cloudflare/mcp-server-cloudflare | 4,463 | Apache-2.0 | org | no | 21.5 | remote | OAuth or API token | no |
| antvis/mcp-server-chart | 4,417 | MIT | org | no | 78.1 | local | not named | no |
| haris-musa/excel-mcp-server | 4,295 | MIT | user | no | 2.9 | local | bearer on HTTP | no |
| stickerdaniel/linkedin-mcp-server | 4,202 | Apache-2.0 | user | no | 0.0 | local | browser session | no |
| browserbase/mcp-server-browserbase | 3,399 | Apache-2.0 | org | yes | 115.2 | both | not named | no |
| mixelpixx/KiCAD-MCP-Server | 3,299 | MIT | user | no | 1.0 | local | not named | no |
| blazickjp/arxiv-mcp-server | 3,276 | Apache-2.0 | user | no | 35.6 | local | optional API key | no |
| Jpisnice/shadcn-ui-mcp-server | 3,098 | MIT | user | no | 40.5 | local | optional GitHub token | no |
| duty1g/x64dbg-mcp-server | 2,822 | MIT | user | no | 9.7 | local | bearer | no |
| financial-datasets/mcp-server | 2,325 | MIT | org | no | 525.3 | local | API key | no |
| containers/kubernetes-mcp-server | 2,244 | Apache-2.0 | org | no | 0.1 | local | OAuth for HTTP mode | no |
| benborla/mcp-server-mysql | 2,218 | MIT | user | no | 108.6 | local | bearer for HTTP mode | no |
| GongRzhe/Office-Word-MCP-Server | 2,112 | MIT | user | yes | 316.6 | local | not named | no |
| anysearch-ai/anysearch-mcp-server | 2,064 | Apache-2.0 | user | no | 56.7 | remote | optional API key | no |
| korotovsky/slack-mcp-server | 1,896 | MIT | user | no | 119.4 | local | OAuth or none | no |
| arabold/docs-mcp-server | 1,874 | MIT | user | no | 3.2 | local | not named | no |
| GongRzhe/Office-PowerPoint-MCP-Server | 1,862 | MIT | user | yes | 316.6 | local | not named | no |
| matlab/matlab-mcp-server | 1,815 | NOASSERTION | org | no | 0.5 | local | not named | yes |
| mukul975/cve-mcp-server | 1,772 | Apache-2.0 | user | no | 42.9 | local | optional API key | no |
| leonardsellem/n8n-mcp-server | 1,630 | MIT | user | no | 491.3 | local | n8n API key | no |
| isaacphi/mcp-language-server | 1,617 | BSD-3-Clause | user | no | 256.2 | local | not named | no |
| Flux159/mcp-server-kubernetes | 1,612 | MIT | user | no | 2.2 | local | not named | no |
| nickclyde/duckduckgo-mcp-server | 1,579 | MIT | user | no | 69.4 | local | not named | no |
| brave/brave-search-mcp-server | 1,574 | MIT | org | no | 0.4 | local | API key | no |
| qdrant/mcp-server-qdrant | 1,568 | Apache-2.0 | org | no | 2.7 | local | API key | yes |
| hashicorp/terraform-mcp-server | 1,559 | MPL-2.0 | org | no | 0.4 | both | API token | no |
| robotmcp/ros-mcp-server | 1,525 | Apache-2.0 | org | no | 0.5 | local | not named | no |
| lgazo/drawio-mcp-server | 1,498 | MIT | user | no | 11.8 | local | not named | no |
| DaxianLee/cocos-mcp-server | 1,488 | none | user | no | 127.9 | local | not named | no |
| designcomputer/mysql_mcp_server | 1,415 | MIT | user | no | 15.4 | local | database password | no |
| harishsg993010/damn-vulnerable-MCP-server | 1,367 | none | user | no | 11.4 | local | not named | no |
| datalayer/jupyter-mcp-server | 1,324 | BSD-3-Clause | org | no | 0.7 | both | OAuth 2.1 or PAT | no |
| yzfly/douyin-mcp-server | 1,285 | Apache-2.0 | user | yes | 133.8 | local | API key | no |
| danielgallen/mcp-server | 1,269 | GPL-3.0 | user | no | 7.8 | local | not named | no |
| jerry-ai-dev/MODULAR-RAG-MCP-SERVER | 1,201 | none | user | no | 247.9 | local | provider API key | no |
| GongRzhe/Gmail-MCP-Server | 1,169 | MIT | user | yes | 464.0 | local | OAuth | no |
| mongodb-js/mongodb-mcp-server | 1,161 | Apache-2.0 | org | no | 0.5 | both | OAuth or connection string | no |
| atlassian/atlassian-mcp-server | 1,157 | Apache-2.0 | org | no | 6.1 | remote | OAuth 2.1 or API token | yes |

