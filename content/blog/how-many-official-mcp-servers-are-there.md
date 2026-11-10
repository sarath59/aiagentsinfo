---
title: "How Many Official MCP Servers Are There? 7 Reference Servers and 59,506 Registry Records"
description: "The project-maintained MCP reference-server list contains 7 implementations (checked November 10, 2026). The public MCP Registry had 59,506 latest-version records on November 8, 2026. Those are different counts."
takeaways:
  - "The project-maintained reference-server list at github.com/modelcontextprotocol/servers contains 7 implementations: Everything, Fetch, Filesystem, Git, Memory, Sequential Thinking, and Time. Checked November 10, 2026."
  - "The public MCP Registry at registry.modelcontextprotocol.io had 59,506 latest-version records between 13:43 and 13:45 UTC on November 8, 2026. That is a registry count, not a reference-server count."
  - "33,307 of 36,737 namespaces had exactly one server. Twenty-one namespaces with 100 or more servers held 11,211 records. io.github.sadri-dridi alone had 2,366."
date: "2026-11-08"
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
  - anthropic
  - microsoft
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Official MCP registry latest-server census, November 8, 2026"
  description: "Two full paginations of https://registry.modelcontextprotocol.io/v0.1/servers with version=latest and limit=100. Pass A, 13:43:33 to 13:45:25 UTC, counted 59,506 latest records (58,565 active, 941 deprecated). Pass B, 13:45:47 to 13:47:43 UTC, counted 59,508 latest records, 36,737 namespaces, and 30,687 distinct repository URLs."
  isBasedOn: "https://registry.modelcontextprotocol.io/v0.1/servers?version=latest"
sources:
  - title: "MCP Registry REST API, list servers (OpenAPI, version=latest)"
    url: "https://registry.modelcontextprotocol.io/openapi.yaml"
  - title: "MCP Registry about page (read November 8, 2026, 13:48 UTC)"
    url: "https://modelcontextprotocol.io/registry/about"
  - title: "Pass A response, registry list with version=latest (13:43:33 to 13:45:25 UTC)"
    url: "https://registry.modelcontextprotocol.io/v0.1/servers?limit=100&version=latest"
  - title: "Pass B response, same query (13:45:47 to 13:47:43 UTC)"
    url: "https://registry.modelcontextprotocol.io/v0.1/servers?limit=100&version=latest"
  - title: "Sample, io.github.sadri-dridi (search at 13:45:35 UTC)"
    url: "https://registry.modelcontextprotocol.io/v0.1/servers?version=latest&search=sadri-dridi"
  - title: "Sample, io.github.github/github-mcp-server (search at 13:48:44 UTC)"
    url: "https://registry.modelcontextprotocol.io/v0.1/servers?version=latest&search=io.github.github"
  - title: "Model Context Protocol glossary on this site"
    url: "https://www.aiagentsinfo.com/glossary/model-context-protocol"
  - title: "MCP reference servers README (checked November 10, 2026)"
    url: "https://github.com/modelcontextprotocol/servers"
faq:
  - question: "How many official MCP servers are there?"
    answer: "The project-maintained reference-server list at github.com/modelcontextprotocol/servers contains 7 implementations: Everything, Fetch, Filesystem, Git, Memory, Sequential Thinking, and Time. Checked November 10, 2026. The public MCP Registry, a different list, had 59,506 latest-version records on November 8, 2026."
  - question: "Does active mean the server is good?"
    answer: "No. Active, deprecated, and deleted are lifecycle statuses in the registry API. The about page says the metadata is deliberately unopinionated and that downstream marketplaces are the place for curation and ratings. A record can be active and still be one of thousands published under a single namespace."
  - question: "Why is one namespace so large?"
    answer: "On both passes, io.github.sadri-dridi held 2,366 latest records, the most of any namespace. The first five records returned for that name at 13:45 UTC each described a small counter whose value is discarded, and each pointed at the same GitHub repository. The registry requires the publisher to prove they own the namespace. It does not cap how many servers that namespace can list."
  - question: "How many records point at GitHub?"
    answer: "On the first pass, 39,072 of 59,506 latest records had a repository URL. 38,980 of those URLs were marked github and 92 were marked gitlab. The second pass found 30,687 distinct repository URLs, so many records share a repository. 20,434 records in that pass had no repository URL at all."
  - question: "Should a host app load all 59,506?"
    answer: "The about page says host applications should not consume the official registry directly. They should use a downstream marketplace. The 59,506 figure is the size of the metadata list, not a recommendation of 59,506 tools to connect."
---

The project-maintained [MCP reference-server list](https://github.com/modelcontextprotocol/servers) contains **7** implementations: Everything, Fetch, Filesystem, Git, Memory, Sequential Thinking, and Time. Checked November 10, 2026. That is different from the public MCP Registry: our November 8 snapshot counted **59,506** latest-version records, not 59,506 project-maintained reference servers.

[MCP](/glossary/model-context-protocol) is the protocol a host uses to reach tools and data. The reference servers demonstrate core features and SDK usage. The registry is the public metadata catalog for servers that speak the protocol. This page covers both counts.

## How many official MCP reference servers are there?

Seven. The README at [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers), checked November 10, 2026, lists these reference implementations maintained by the MCP steering group:

1. **Everything** — Reference and test server with prompts, resources, and tools.
2. **Fetch** — Web content fetching and conversion for efficient LLM usage.
3. **Filesystem** — Secure file operations with configurable access controls.
4. **Git** — Tools to read, search, and manipulate Git repositories.
5. **Memory** — Knowledge graph-based persistent memory system.
6. **Sequential Thinking** — Dynamic and reflective problem-solving through thought sequences.
7. **Time** — Time and timezone conversion capabilities.

The README says these servers are reference implementations, not production-ready solutions. Developers should evaluate their own security requirements.

## How many servers are listed in the MCP Registry?

59,506 latest-version records between 13:43 and 13:45 UTC on November 8, 2026. A second pass, from 13:45 to 13:47 UTC, counted 59,508.

Both numbers come from `GET https://registry.modelcontextprotocol.io/v0.1/servers` with `version=latest` and `limit=100`, following `metadata.nextCursor` until the cursor was gone. The OpenAPI text for that parameter says `version=latest` returns only the latest version of each matching server. Without it, the same endpoint returns older versions as separate rows. This count used the filter. Each pass took 596 pages.

| | Pass A | Pass B |
| --- | --- | --- |
| Window (UTC, November 8, 2026) | 13:43:33–13:45:25 | 13:45:47–13:47:43 |
| Latest records | 59,506 | 59,508 |
| Marked active | 58,565 | not re-counted |
| Marked deprecated | 941 | not re-counted |
| Marked deleted | 0 | not re-counted |
| `isLatest` true | 59,506 | filtered by the query |

58,565 + 941 = 59,506. The second pass is the one that supports the namespace and repository figures further down. Its total is two higher. The count of records with no repository URL stayed at 20,434, so the net addition was two records that have a repository URL. The top ten namespaces had the same counts on both passes.

The [about page](https://modelcontextprotocol.io/registry/about), read at 13:48 UTC the same day, calls this "the official centralized metadata repository for publicly accessible MCP servers" and says it is backed by Anthropic, GitHub, PulseMCP, and Microsoft. The same page says the registry is in preview, and that breaking changes or a data reset can still happen. A count from a preview catalog is a snapshot of that catalog. It is the wrong number to engrave.

## What does the registry actually list?

A record is a `server.json` document. The about page says it carries a reverse-DNS name such as `io.github.user/server-name`, a place to get the server (a package, or a remote URL), and discovery text. Package registries such as npm host the code. The MCP registry hosts the pointer.

The page also says the metadata is "deliberately unopinionated." Ratings and curation are left to downstream marketplaces, which are expected to pull the API on a slow cadence, the example given being once an hour. Host applications are told not to consume the official registry directly.

Two records from the same hour show the range of what "listed" means. At 13:48:44 UTC, `io.github.github/github-mcp-server` was active, with the description "Connect AI assistants to GitHub - manage repos, issues, PRs, and workflows through natural language." In the same minute, `com.microsoft/azure` was active, described as Azure MCP tools for agents. Both sit in the same latest-version list as the bulk namespaces below. The API flag on all of them, in pass A, was `active` or `deprecated`. Nothing in the response is a quality score.

The status enum in the OpenAPI file is `active`, `deprecated`, and `deleted`. Pass A returned no latest row with status `deleted`. Deprecated means the publisher or the registry has marked that entry retired. It does not mean the other 58,565 were reviewed by a person.

Spam controls, from the same about page, are namespace authentication (GitHub, DNS, or an HTTP challenge), character limits on free-form fields, and manual takedown. The page says stricter rate limits, automated detection, and community reporting are under consideration. Authentication stops a stranger from publishing under your name. It does not stop you from publishing thousands of servers under a name you do own.

## Why can one namespace hold thousands of servers?

Because the list is metadata, and a verified namespace can attach that metadata to as many names as it likes. Pass B found **36,737** namespaces across **59,508** latest records. **33,307** of those namespaces, 90.7%, had exactly one server. The crowd is real. So is the pile at the top.

Twenty-one namespaces had 100 or more latest records. Together they held **11,211** records, 18.8% of pass B. The top ten held **9,821**.

| Namespace | Latest records |
| --- | --- |
| io.github.sadri-dridi | 2,366 |
| io.github.pipeworx-io | 1,915 |
| io.github.mrfentmen | 1,804 |
| io.github.mcp-dir | 1,115 |
| io.usefulapi | 884 |
| io.github.theluckystrike | 409 |
| io.github.CloudCorpRecords | 386 |
| io.github.Evozim | 375 |
| io.github.CSOAI-ORG | 354 |
| ai.smithery | 213 |

These ten counts matched on pass A and pass B. 2,366 / 59,506 is 4.0% of the first snapshot in a single namespace.

The records inside a large namespace are not copies of one another, and they are not all the same kind of product. At 13:45:35 UTC the first five latest rows for `sadri-dridi` were `aba-ok`, `abnf-ok`, `abs-ok`, `acah-ok`, and `acam-ok`. Each description said the value is discarded (an ABA routing-number shape, an ABNF rule count, an absolute-value sign, and two header counters). Each repository URL was `https://github.com/sadri-dridi/named-mcp-utilities`. Each remote URL was a path under `agent-observatory-sensor.nolimit-observatory.workers.dev`. That is five rows. The namespace has 2,366. This page did not open the other 2,361.

The same search-and-read on the next two namespaces, at 13:47:56 UTC, looked different. The first `pipeworx-io` rows were `19hz` and `42matters`, each with its own GitHub repository and a remote under `gateway.pipeworx.io`. The first `mrfentmen` rows were `1c-enterprise-mcp` and `4d-mcp`. Both pointed at `https://github.com/mrfentmen/awesome-servers`, both had no remote URL in the record, and both descriptions claimed "20 real tools" for a named programming stack. Two rows are not a description of all 1,804.

Search on this API is a substring match, and a short query returns names outside the namespace you typed. The counts in the table come from splitting the `name` field on the first slash during a full walk, not from the search box.

## How many records point at a code repository?

On pass A, **39,072** latest records included a repository URL. **38,980** had `source: github` and **92** had `source: gitlab`. 38,980 + 92 = 39,072. The other 20,434 records had no repository URL in that pass, and pass B found the same 20,434 without one.

Pass B collapsed the repository URLs to **30,687** distinct strings. 39,074 records in that pass had a URL (59,508 − 20,434), so thousands of server names share a repository. The sadri-dridi sample is the plain version of that pattern: many names, one repo. A star count on that one repository would still be one number. The registry count would still be thousands. Anyone adding those two numbers together is adding a catalog to a popularity vote.

Other fields from pass A, which are easy to misread as "servers":

| Field | Count | What it is |
| --- | --- | --- |
| At least one remote URL | 39,709 | Servers that list a remote endpoint |
| Remote entries of type `streamable-http` | 39,519 | Entries, not servers. One server can list several |
| Remote entries of type `sse` | 1,139 | Entries |
| At least one package | 23,683 | Servers that also point at a package registry |

39,519 + 1,139 = 40,658 remote entries, which is more than 39,709 servers. The extra entries are second remotes on a server that already had one. They are not 40,658 extra products.

## What should you count instead?

Count the thing the decision needs.

If the question is "how large is the official catalog right now," the answer on November 8, 2026 is 59,506 latest records at 13:45 UTC, or 59,508 at 13:47 UTC, with the preview warning attached. If the question is "how many publishers used the catalog," pass B's namespace count is 36,737, and 33,307 of them published a single server. If the question is "how many code repositories are named," the distinct URL count is 30,687, and 20,434 latest records name none.

If the question is "what should an agent be allowed to call," none of those totals is the answer. The about page hands that job to a marketplace. A harness still decides which servers are connected and what the agent may do with them. The [tool JSON](/blog/why-tool-json-costs-more-than-your-system-prompt) for a server is billed on every turn whether or not the model calls it, so connecting a namespace of 2,366 counters is a cost decision, not a completeness decision. [MCPHallu](/research/mcphallu-mcp-agent-hallucinations), posted November 5 and broken down on this site on November 8, scores a different question again: when an agent does have a tool list, which failures show up. Its 36 servers were a benchmark set. They are not a sample of these 59,506 records.

The registry will not stay at 59,506. It gained two records in the two minutes between these passes, and the about page says a preview catalog can still be reset. The useful habit is to store the window with the count. The number without the window is already a different list.
