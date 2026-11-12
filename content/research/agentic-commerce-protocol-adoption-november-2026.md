---
title: "AP2 Has 3,270 Stars and No Package. @x402/core Had 1,940,555 Downloads."
description: "From October 11 through November 9, 2026, @x402/core had 1,940,555 npm downloads. AP2’s README still says a PyPI package comes later. ACP had 0 commits on main since August 13."
date: "2026-11-11"
updated: "2026-11-11"
type: original-report
topics:
  - shopping
  - tools-saas
  - research
  - how-agents-work
companies:
  - openai
  - google
  - github
contentLicense: true
absoluteTitle: true
dataset:
  title: "GitHub, npm, and PyPI readings for ACP, UCP, AP2, and x402, November 11, 2026"
  description: "stargazers_count and forks_count from the GitHub repository API at 07:48 GMT on November 11, 2026. Default-branch commits after 2026-08-13T00:00:00Z counted from the commits API Link rel=last with per_page=1, at 07:44 GMT. Contributor totals are the same Link pattern on the contributors API with anon=1, at 07:41 GMT. npm point totals for last-week (2026-11-03 through 2026-11-09) and last-month (2026-10-11 through 2026-11-09) were read at 07:45 GMT. PyPI headline totals are the sum of pypistats overall rows, category without_mirrors, for those same dates. The pypistats recent endpoint is printed separately because it does not name its dates. A download is a file request, not a merchant."
  isBasedOn: "https://api.npmjs.org/downloads/point/last-month/@x402/core"
abstract: |
  @x402/core was downloaded 1,940,555 times on npm from October 11 through November 9, 2026. The official UCP JavaScript package, @ucp-js/sdk, had 65,082 downloads in that same window. ACP and AP2 have no package in the repository the protocol org tells you to install.

  AP2 had 3,270 stars at 07:48 GMT on November 11, which is 93.7 percent of Universal-Commerce-Protocol/ucp at 3,490. The AP2 README says a PyPI package will be published later, and the install line is a git URL. The PyPI project named ap2 points at github.com/whillhill/ap2. It is not google-agentic-commerce/AP2.

  ACP had 1,600 stars, 259 forks, and 0 commits on the default branch after 2026-08-13T00:00:00Z. The latest dated spec folder is still spec/2026-04-17. x402-foundation/x402 had 6,797 stars, 2,273 forks, 401 commits in that window, and a package published November 4.
whyItMatters: |
  The shopping report on this site is the page people already find. It dates what six companies have shipped. It does not say which protocol a developer’s machine actually fetched. A merchant who picks AP2 because 3,270 stars looks close to UCP’s 3,490 will stare at a git install and a default branch whose newest commit is April 29, 2026. A builder who picks x402 because 1,940,555 downloads looks like a market will have installed an HTTP payment rail, not a checkout session.

  The practical split is the channel you sell on versus the package you can import today. Google’s shopping surfaces and OpenAI’s checkout docs are the reason to read UCP or ACP. The npm counter is the reason x402 is the only one of the four with a current registry release. Those are different jobs. A file request does not tell you a store took a payment.
keyFindings:
  - "@x402/core had 1,940,555 npm downloads from October 11 through November 9, 2026, and 546,580 from November 3 through November 9. The point responses carried HTTP Date Wed, 11 Nov 2026 07:45:27 GMT. Version 2.30.0 was published 2026-11-04T20:04:41Z. The repository field is github.com/x402-foundation/x402."
  - "AP2 had 3,270 stars and 518 forks at 07:48:16 GMT. The README, fetched 07:43 GMT, says a PyPI package will be published later and the install command is uv pip install git+https://github.com/google-agentic-commerce/AP2.git@main. The default branch’s newest commit is 2026-04-29T16:51:41Z. Commits after 2026-08-13T00:00:00Z: 0. Latest GitHub release is v0.2.0, published 2026-04-28T12:40:54Z."
  - "ACP had 1,600 stars and 259 forks at 07:48:15 GMT. The releases API returned an empty list. The spec directory on main lists 2026-04-17 as the newest dated folder. Commits on main after August 13: 0. The newest commit is 7fdd78df67 at 2026-07-18T04:51:51Z, which is also pushed_at."
  - "UCP’s spec repo had 3,490 stars, 493 forks, and 104 commits on main after August 13. The latest of those is 98607bc53f at 2026-11-11T05:03:09Z. The latest GitHub release is still v2026-08-25, published 2026-08-25T13:53:03Z. @ucp-js/sdk on npm is 0.5.1, published 2026-09-02. Main’s package.json says 0.6.0, and that version is not the dist-tag."
  - "Pairing each official package with the repository its own metadata names, last-month downloads per star are 285.5 for @x402/core against x402-foundation/x402, and 1,328.2 for @ucp-js/sdk against Universal-Commerce-Protocol/js-sdk. Pairing those 65,082 downloads with the spec repo’s 3,490 stars instead produces 18.6. That second division uses the wrong repository."
methodology: |
  The set was fixed before the totals were read: the Agentic Commerce Protocol spec repo named in this site’s November 10 version note, the Universal Commerce Protocol spec repo from the same note, Google’s Agent Payments Protocol repo at google-agentic-commerce/AP2, and the x402 repo the x402.org homepage and the foundation org publish at x402-foundation/x402. coinbase/x402 was read because the npm package @coinbase/x402 names it. The repository object says fork=true and parent=x402-foundation/x402. It is not a second protocol.

  Package names come from the README or the install file in that org, fetched from raw.githubusercontent.com at 07:43 GMT on November 11, 2026. ACP’s README does not name an npm or PyPI package. AP2’s README says a PyPI package will be published later. UCP’s python-sdk README says pip install ucp-sdk. UCP’s js-sdk README says npm install @ucp-js/sdk. x402’s README names @x402/core in both minimal install lines and pip install x402. Packages the README does not name were not treated as official. The npm name agentic-commerce-protocol and the PyPI name ap2 were fetched only so they are not added to the official row. Svix’s README says the first is unofficial. The second’s project URLs point at github.com/whillhill/ap2.

  Stars, forks, and pushed_at are the GitHub repository API, Accept application/vnd.github+json, read 07:48:15 GMT through 07:48:17 GMT. Commit counts are the commits API with since=2026-08-13T00:00:00Z and per_page=1. GitHub’s documentation says since returns commits after that timestamp. The Link header’s rel=last page number is the count. An empty array and no Link header is 0. That pass ran at 07:44:36 GMT through 07:44:39 GMT. Contributor counts use the same Link pattern on the contributors API with anon=1 and per_page=1, at 07:41:59 GMT through 07:42:00 GMT for the four spec repos and 07:44 GMT for the two UCP SDK repos. The contributors list is GitHub’s list, including anonymous entries when anon=1. It is not a census of humans.

  npm totals are the public downloads point API. last-month returned start 2026-10-11 and end 2026-11-09. last-week returned start 2026-11-03 and end 2026-11-09. HTTP Date on the @x402/core week response was Wed, 11 Nov 2026 07:45:27 GMT. Registry version, publish time, and repository field are the npm registry document read in the same minute. PyPI headline totals sum daily rows from https://pypistats.org/api/packages/{name}/overall?mirrors=false whose category is without_mirrors and whose date is inside those same two windows. The newest date in those files was November 10. The overall response for x402 carried HTTP Date Wed, 11 Nov 2026 07:47:49 GMT. The pypistats recent endpoint was also read, at 07:45:30 GMT, because it is the endpoint that returns fields named last_week and last_month. It does not return start or end dates. Its figures are a second column, not a replacement.
limitations:
  - "A download is a file request. CI, a mirror the filter still misses, and one project installing a dependency all increment it. @x402/core at 1,940,555 is not 1,940,555 merchants, and it is not 1,940,555 paid API calls."
  - "The x402 README’s minimal install also names @x402/evm, @x402/svm, and either @x402/fetch or @x402/express. Those are separate package names. Adding any of them to @x402/core counts one install as two. They are printed and not summed."
  - "The pypistats recent last_month for x402 was 204,765 at 07:45:30 GMT. The without_mirrors sum for October 11 through November 9 was 320,715. The recent endpoint does not name its dates. This note does not average the two. The comparison table uses the dated sum."
  - "Contributor totals are the last page of GitHub’s contributors list. Bots and anonymous rows can be in it. People who opened an issue and never committed are not."
  - "ACP’s 0 and AP2’s 0 are the default branch. AP2’s pushed_at is 2026-06-17T01:24:46Z, which is before August 13 and later than the newest commit the commits API returned for main, 2026-04-29T16:51:41Z. A non-default branch can explain that gap. This note did not list every branch."
  - "The npm package @coinbase/x402 had 312,060 downloads in the last-month window. Its repository field is github.com/coinbase/x402, a fork with 182 stars at 07:41:55 GMT, and the foundation README’s install block does not name it. It is Coinbase’s facilitator package. It is not added to @x402/core."
  - "Web-domain scans cited below are secondary. agenteconomy.to says its UCP row is a suspected over-count and that shares across standards are not a ranking. spck.dev says it is independent and not affiliated with the UCP maintainers. Neither scan is an npm download."
references:
  - title: "GitHub REST API, four protocol repositories, November 11, 2026"
    url: "https://api.github.com/repos/x402-foundation/x402"
    note: "07:48:15–07:48:17 GMT. ACP 1,600 stars, 259 forks, pushed_at 2026-07-18T04:51:51Z. UCP 3,490 stars, 493 forks, pushed_at 2026-11-11T05:08:01Z. AP2 3,270 stars, 518 forks, pushed_at 2026-06-17T01:24:46Z. x402-foundation/x402 6,797 stars, 2,273 forks, pushed_at 2026-11-10T17:05:53Z. python-sdk 89 stars, 56 forks. js-sdk 49 stars, 26 forks."
  - title: "GitHub commits API, default branch after 2026-08-13T00:00:00Z"
    url: "https://api.github.com/repos/x402-foundation/x402/commits?since=2026-08-13T00:00:00Z&per_page=1"
    note: "07:44 GMT. Link rel=last page: x402 401, UCP 104, UCP js-sdk 36, UCP python-sdk 21. ACP and AP2 returned an empty list. Newest commits: x402 d3eb19d018 at 2026-11-10T17:05:41Z, UCP 98607bc53f at 2026-11-11T05:03:09Z, ACP 7fdd78df67 at 2026-07-18T04:51:51Z, AP2 e1ea56db72 at 2026-04-29T16:51:41Z. UCP commits after the v2026-08-25 published_at: Link rel=last page 79, read 07:46:50 GMT."
  - title: "GitHub contributors API, per_page=1 and anon=1"
    url: "https://api.github.com/repos/x402-foundation/x402/contributors?per_page=1&anon=1"
    note: "Link rel=last page. 07:41:59–07:42:00 GMT: ACP 26, UCP 69, AP2 19, x402 379. SDK repos at 07:44 GMT: python-sdk 18, js-sdk 13."
  - title: "GitHub releases"
    url: "https://api.github.com/repos/Universal-Commerce-Protocol/ucp/releases/latest"
    note: "07:41 GMT. UCP v2026-08-25 published 2026-08-25T13:53:03Z. AP2 v0.2.0 published 2026-04-28T12:40:54Z. ACP and x402 latest-release returned 404, and the releases list was empty. python-sdk latest release tag v2026-08-25 published 2026-08-27T16:04:19Z. js-sdk latest release v0.5.1 published 2026-09-02T19:10:11Z."
  - title: "ACP README and spec directory"
    url: "https://github.com/agentic-commerce-protocol/agentic-commerce-protocol"
    note: "Raw README fetched 07:43:30 GMT. No npm or pip install line. Spec directory names: 2025-09-29, 2025-12-12, 2026-01-16, 2026-01-30, 2026-04-17, unreleased. Repository description says the specification is maintained by OpenAI and Stripe."
  - title: "AP2 README, install section"
    url: "https://github.com/google-agentic-commerce/AP2/blob/main/README.md"
    note: "Raw file fetched 07:43:31 GMT. The types section says a PyPI package will be published at a later time, and the command until then is uv pip install git+https://github.com/google-agentic-commerce/AP2.git@main."
  - title: "UCP SDK READMEs and the published registry versions"
    url: "https://github.com/Universal-Commerce-Protocol/js-sdk"
    note: "js-sdk README says npm install @ucp-js/sdk and maps 0.5.x and 0.6.x to schema 2026-08-25. Main package.json name @ucp-js/sdk version 0.6.0. npm dist-tag latest is 0.5.1, time 2026-09-02T19:10:43.969Z, repository Universal-Commerce-Protocol/js-sdk. python-sdk README says pip install ucp-sdk. Main pyproject version 0.6.0. PyPI version 0.5.0 uploaded 2026-08-27T16:10:13Z."
  - title: "x402 README, specs/x402-specification-v1.md, and registry versions"
    url: "https://github.com/x402-foundation/x402"
    note: "Raw README fetched 07:43:31 GMT. Minimal installs both start with @x402/core. Python line is pip install x402. Go line is go get github.com/x402-foundation/x402/go/v2. No Go download count was queried. specs/x402-specification-v1.md on main says Protocol Version 1. npm @x402/core 2.30.0 published 2026-11-04T20:04:41.538Z. PyPI x402 2.27.0 uploaded 2026-11-04T20:03:25Z, project URL https://github.com/x402-foundation/x402."
  - title: "npm downloads point API, last-month and last-week"
    url: "https://api.npmjs.org/downloads/point/last-month/@x402/core"
    note: "HTTP Date 07:45 GMT. Windows 2026-10-11:2026-11-09 and 2026-11-03:2026-11-09. @x402/core 1,940,555 and 546,580. @ucp-js/sdk 65,082 and 17,692. @x402/evm 1,303,692 and 339,678. @x402/fetch 822,295 and 233,531. @x402/express 161,127 and 58,624. @coinbase/x402 312,060 and 78,819. The unscoped name agentic-commerce-protocol, repository svix/agentic-commerce-protocol, 66 and 7."
  - title: "pypistats overall, mirrors=false, and the recent endpoint"
    url: "https://pypistats.org/api/packages/x402/overall?mirrors=false"
    note: "without_mirrors sums. x402 October 11–November 9: 320,715. November 3–November 9: 68,803. ucp-sdk: 13,500 and 2,505. Newest file date November 10. Overall HTTP Date for x402 07:47:49 GMT. Recent endpoint at 07:45:30 GMT, dates not included: x402 last_day 12,960, last_week 69,074, last_month 204,765. ucp-sdk last_day 483, last_week 2,686, last_month 8,621. Recent for the unofficial names: agentic-commerce-protocol last_month 50, ap2 last_month 96."
  - title: "Svix README, unofficial ACP types"
    url: "https://github.com/svix/agentic-commerce-protocol/blob/main/README.md"
    note: "Raw file fetched November 11, 2026. The overview says: This is an unofficial package maintained by Svix."
  - title: "PyPI project ap2"
    url: "https://pypi.org/pypi/ap2/json"
    note: "Version 0.1.1, summary Agent Payments Protocol (Python), uploaded 2025-10-03. Project URLs point at github.com/whillhill/ap2. Not google-agentic-commerce/AP2."
  - title: "npm registry, @coinbase/x402@2.1.0"
    url: "https://registry.npmjs.org/@coinbase/x402"
    note: "latest 2.1.0, time 2025-12-23T22:04:10.014Z. repository git+https://github.com/coinbase/x402.git. coinbase/x402 at 07:41:55 GMT: fork of x402-foundation/x402, 182 stars, 297 forks."
  - title: "agent economy, which agent standards are adopted on the web"
    url: "https://agenteconomy.to/stats/which-agent-standards-are-actually-adopted"
    note: "Read November 11, 2026. Page says updated as of November 5, 2026 UTC, data week 2026-11-02, 115,468 domains. UCP 5,429, ACP 32, x402 7, AP2 4. The page says the UCP row is a suspected over-count and that shares are not a cross-standard ranking."
  - title: "spck.dev, The State of UCP, Q3 2026"
    url: "https://spck.dev/state-of-ucp"
    note: "Read November 11, 2026. The page says it is independent and not affiliated with the UCP maintainers. Probe of 2026-08-13: 3,037 verified domains, 2,957 valid profiles, 99.5 percent on *.myshopify.com, 15 deliberate self-hosted endpoints. Registry figures on that page are dated 2026-10-11 and are not the totals in this note."
  - title: "AI Agents Info, UCP and ACP spec versions, November 10, 2026"
    url: "https://www.aiagentsinfo.com/blog/ucp-vs-acp-spec-versions-november-2026"
    note: "Version strings and the November 10 star reading. This note did not re-read OpenAI’s checkout Last-Modified header."
citation:
  apa: "AI Agents Info. (2026, November 11). AP2 has 3,270 stars and no package. @x402/core had 1,940,555 downloads. https://www.aiagentsinfo.com/research/agentic-commerce-protocol-adoption-november-2026"
  bibtex: |
    @misc{aiagentsinfo2026commerceProtocols,
      title={AP2 Has 3,270 Stars and No Package. @x402/core Had 1,940,555 Downloads},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/agentic-commerce-protocol-adoption-november-2026},
      note={npm downloads point API, 2026-10-11 through 2026-11-09. Official packages only. ACP and AP2 had none.}
    }
ledeQuestion: "Which agentic commerce protocol do developers install?"
ledeAnswer: "x402, by file requests for the package the README names. @x402/core had 1,940,555 npm downloads from October 11 through November 9, 2026. UCP’s official @ucp-js/sdk had 65,082. ACP and AP2 publish no official npm or PyPI package. AP2’s 3,270 stars do not change that."
faq:
  - question: "Which agentic commerce protocol has the most npm downloads?"
    answer: "Of the official packages named in each protocol README, @x402/core had 1,940,555 npm downloads from October 11 through November 9, 2026. @ucp-js/sdk had 65,082. ACP’s repository does not name a package. AP2’s README says a PyPI package will be published later. Do not add @x402/evm, @x402/fetch, or @x402/express to the 1,940,555. Those are other files from the same install lines."
  - question: "Does AP2’s star count mean developers are installing it?"
    answer: "No. google-agentic-commerce/AP2 had 3,270 stars at 07:48 GMT on November 11, 2026, and 0 commits on the default branch after August 13. The install command in the README is a git URL, not a registry package. The PyPI project named ap2 belongs to github.com/whillhill/ap2. Its recent last_month figure was 96, and it is not Google’s package."
  - question: "Should a merchant integrate UCP, ACP, AP2, or x402 first?"
    answer: "Integrate the protocol the channel you sell on will certify, and pin a released snapshot. UCP’s latest GitHub release is v2026-08-25. ACP’s latest dated spec folder is spec/2026-04-17. x402 is the package to import when the job is an HTTP payment on an API, not a product checkout. AP2 is a payments spec with a v0.2.0 release from April 28, 2026, and no official registry package on November 11. Stars do not pick the channel."
  - question: "Is the npm package @ucp-js/sdk the current UCP spec?"
    answer: "It targets the schema the js-sdk README maps to 0.5.x, which is 2026-08-25, the same schema the README maps to the unpublished 0.6.x line. The copy on npm is 0.5.1, published September 2, 2026. Main’s package.json says 0.6.0, and the npm dist-tag latest is still 0.5.1. The spec repo’s newest commit on November 11 is not inside that published tarball."
  - question: "Is a download a live checkout?"
    answer: "No. The figure counts package-file downloads. A store that implements UCP by configuring Shopify, and never runs npm install, is absent. A domain scan is a different count. agenteconomy.to’s week of November 2, 2026, which the page dates as updated November 5, lists x402 on 7 domains and @x402/core’s download count is not those 7 domains."
---

**1,940,555.** That is how many times npm served `@x402/core` from October 11 through November 9, 2026.

`@ucp-js/sdk`, the package the Universal Commerce Protocol’s JavaScript README tells you to install, had **65,082** downloads in the same window. Dividing those two counters gives 29.8. ACP and AP2 are not in the division. Their official repositories do not name a registry package. AP2 had **3,270** stars at 07:48 GMT on November 11 anyway.

The [November 10 version note](/blog/ucp-vs-acp-spec-versions-november-2026) says which snapshot to pin. This page says which repository a package manager actually fetched. Checkout behavior, which neither number is, stays on [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you) and the [shopping-agents report](/reports/ai-shopping-agents-next-6-months). A merchant can score the same protocols in the browser with the [shopping agent readiness checker](/tools/shopping-agent-readiness-checker). Daily refresh of a different package set is the [downloads tracker](/trackers/downloads). Bookmarks for agent frameworks, not these four repos, are the [stars tracker](/trackers/stars).

## Which repository is the protocol, and which package does its README name?

The protocol org’s README decides the package. A name that merely sounds like the protocol does not.

| Protocol | Official repository | Stars | Forks | Commits on main after Aug 13 | Contributors list | What you install |
| --- | --- | --- | --- | --- | --- | --- |
| x402 | [x402-foundation/x402](https://github.com/x402-foundation/x402) | 6,797 | 2,273 | 401 | 379 | `@x402/core`, plus the other names in the install line. `pip install x402` |
| UCP | [Universal-Commerce-Protocol/ucp](https://github.com/Universal-Commerce-Protocol/ucp) | 3,490 | 493 | 104 | 69 | No package in the spec repo. SDKs are separate repos |
| AP2 | [google-agentic-commerce/AP2](https://github.com/google-agentic-commerce/AP2) | 3,270 | 518 | 0 | 19 | No registry package. `uv pip install git+https://github.com/google-agentic-commerce/AP2.git@main` |
| ACP | [agentic-commerce-protocol/agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) | 1,600 | 259 | 0 | 26 | No package. The README points at the OpenAPI and at OpenAI’s and Stripe’s docs |

Stars and forks were read at 07:48:15–07:48:17 GMT. The commit window is the commits API with `since=2026-08-13T00:00:00Z`, which GitHub documents as commits after that instant. August 13 at 00:00 UTC is 90 days before November 11 at 00:00 UTC. The requests ran at 07:44 GMT, so the morning of November 11 is inside the count. Contributor totals are the last page of the contributors list with `anon=1`, read at 07:41 GMT for these four repos. That list can include bots. It is the list GitHub returned.

x402 is the active repository. 401 commits, the newest at 2026-11-10T17:05:41Z, message starting `refactor(core): share facilitator initialization across HTTP middleware`. UCP’s spec repo is also moving. 104 commits, the newest at 2026-11-11T05:03:09Z, `docs(food): update ucp.dev for Food Checkout launch`. ACP’s newest commit is still July 18. AP2’s newest commit on main is April 29, `fix: remove uvlock`. AP2’s `pushed_at` is June 17, 2026, which is before this window and later than that April commit. This count is the default branch.

The UCP packages live in two other repositories, both in the same org, both describing themselves as the official SDK:

| UCP SDK repo | Stars | Forks | Commits after Aug 13 | Contributors | Registry name | Published version |
| --- | --- | --- | --- | --- | --- | --- |
| [python-sdk](https://github.com/Universal-Commerce-Protocol/python-sdk) | 89 | 56 | 21 | 18 | `ucp-sdk` on PyPI | 0.5.0, uploaded 2026-08-27 |
| [js-sdk](https://github.com/Universal-Commerce-Protocol/js-sdk) | 49 | 26 | 36 | 13 | `@ucp-js/sdk` | 0.5.1, published 2026-09-02 |

Main is ahead of the registry and not ahead of the schema string the README cares about. The js-sdk `package.json` on main says `0.6.0`. npm’s `dist-tags.latest` is `0.5.1`. The python `pyproject.toml` on main says `0.6.0`. PyPI’s latest is `0.5.0`. Both READMEs map `0.5.x` and `0.6.x` to UCP schema `2026-08-25`. The unpublished bump is not a new spec date. The spec repo’s November 11 commit is also not inside the tarball npm will hand you.

## What did the registries return for October 11 through November 9?

The npm point API named the window. Last-month is October 11 through November 9. Last-week is November 3 through November 9. November 10 and November 11 are outside it. PyPI’s comparison column is the sum of `without_mirrors` daily rows for those same dates, not the recent endpoint.

| Official package | Registry | Oct 11–Nov 9 | Nov 3–Nov 9 | Version people install | Published |
| --- | --- | --- | --- | --- | --- |
| @x402/core | npm | 1,940,555 | 546,580 | 2.30.0 | 2026-11-04 |
| x402 | PyPI, without mirrors | 320,715 | 68,803 | 2.27.0 | 2026-11-04 |
| @ucp-js/sdk | npm | 65,082 | 17,692 | 0.5.1 | 2026-09-02 |
| ucp-sdk | PyPI, without mirrors | 13,500 | 2,505 | 0.5.0 | 2026-08-27 |
| ACP official | none |  |  |  |  |
| AP2 official | none |  |  |  |  |

`@x402/core` is 29.8 times `@ucp-js/sdk` on the month, 1,940,555 against 65,082. On the week it is 30.9 times, 546,580 against 17,692. The rank did not flip. Python is the same shape at a smaller scale. `x402` had 320,715 downloads without mirrors. `ucp-sdk` had 13,500. That is 23.8 times. Do not add the PyPI figure to the npm figure. They are different registries, and one install that fetches both is two file requests.

The x402 README’s minimal client line is `npm install @x402/core @x402/evm @x402/svm @x402/fetch`. The minimal server line swaps in `@x402/express`. Those extra names, same window, not added to 1,940,555:

| Package the README also names | Oct 11–Nov 9 | Nov 3–Nov 9 | Version |
| --- | --- | --- | --- |
| @x402/evm | 1,303,692 | 339,678 | 2.30.0 |
| @x402/fetch | 822,295 | 233,531 | 2.30.0 |
| @x402/express | 161,127 | 58,624 | 2.30.0 |

`@x402/core` is larger than `@x402/evm` by 636,863. Some installs fetch the core tarball without the EVM package. Adding the column would still double-count the installs that fetch both. The Go line in the same README, `go get github.com/x402-foundation/x402/go/v2`, has no download count in this note.

The pypistats recent endpoint, read at 07:45:30 GMT, does not name dates. It returned `last_month` 204,765 for `x402` and 8,621 for `ucp-sdk`, and `last_week` 69,074 and 2,686. The week is close to the dated sum. The month is not. 204,765 is not 320,715. This note keeps the dated sum in the table and does not split the difference.

Two names that are not the protocol org:

| Name | What it actually is | Figure, labeled |
| --- | --- | --- |
| npm `agentic-commerce-protocol` | Svix. The README says “This is an unofficial package maintained by Svix.” | 66 downloads, Oct 11–Nov 9 |
| PyPI `agentic-commerce-protocol` | Same Svix project, per its project URLs | recent `last_month` 50. Not a dated sum |
| PyPI `ap2` | `whillhill/ap2`, version 0.1.1, uploaded 2025-10-03 | recent `last_month` 96. Not Google’s repo |

`@coinbase/x402` had 312,060 npm downloads in the dated month and 78,819 in the week. Version 2.1.0 was published 2025-12-23. The registry repository is `coinbase/x402`, which at 07:41:55 GMT was a fork of `x402-foundation/x402` with 182 stars. The foundation README does not list this package in the install block. It is Coinbase’s facilitator. Pairing its 312,060 downloads with the foundation’s 6,797 stars, or adding them to `@x402/core`, would invent a second install base.

## What is the stars-to-downloads ratio?

The ratio is last-month file requests divided by `stargazers_count`, for the repository the package’s own metadata names. One star to N downloads. A pairing that uses a different repository is shown once, as the mistake.

| Pairing | Stars | Downloads in the dated month | Stars to downloads |
| --- | --- | --- | --- |
| x402-foundation/x402 with @x402/core | 6,797 | 1,940,555 | 1 to 285.5 |
| js-sdk with @ucp-js/sdk | 49 | 65,082 | 1 to 1,328.2 |
| python-sdk with ucp-sdk, without mirrors | 89 | 13,500 | 1 to 151.7 |
| x402-foundation/x402 with PyPI x402 | 6,797 | 320,715 | 1 to 47.2 |
| UCP spec repo with @ucp-js/sdk, the wrong repo | 3,490 | 65,082 | 1 to 18.6 |
| google-agentic-commerce/AP2 | 3,270 | no official package | not defined |
| ACP spec repo | 1,600 | no official package | not defined |

285.5 is 1,940,555 divided by 6,797. 1,328.2 is 65,082 divided by 49. The JavaScript SDK looks “more installed per star” only because its stars sit on a 49-star repo. Move the same 65,082 onto the spec repo people actually bookmark and the ratio falls to 18.6. That fall is the bookmark. It is not a collapse in downloads.

AP2 is the clean case of the opposite error. 3,270 is 93.7 percent of UCP’s 3,490. The forks are even closer the other way, 518 against 493. A star chart ranks them as peers. The install line does not. One has a September tarball. The other tells you to pip-install a git URL, and then tells you the PyPI package is future tense.

## Which spec version would you pin today?

Pin a release, then check that the package you imported is that release. On November 11 those are four different strings.

| Protocol | Spec or release to pin | Date | What moved after it |
| --- | --- | --- | --- |
| ACP | `spec/2026-04-17`, the newest dated folder | Folder name 2026-04-17. No GitHub release | Newest commit 2026-07-18. Nothing after August 13 |
| UCP | GitHub release `v2026-08-25` | Published 2026-08-25T13:53:03Z | 79 commits on main after that timestamp. npm is still 0.5.1 |
| AP2 | GitHub release `v0.2.0` | Published 2026-04-28T12:40:54Z | Newest commit on main 2026-04-29. Nothing after August 13 |
| x402 | No GitHub release. The file `specs/x402-specification-v1.md` says Protocol Version 1 | The file does not print a release date | `@x402/core` 2.30.0 and PyPI `x402` 2.27.0, both published 2026-11-04 |

x402’s SDK version and the spec file’s version are not the same number. The packages you install are 2.30.0 and 2.27.0. The specification markdown on main still says Protocol Version 1, and `specs/transports-v2/` is a separate directory. This note does not collapse those into one version string. There is also no GitHub Release object. The releases list was empty and `releases/latest` returned 404. The version a package manager will resolve is the registry version.

UCP’s release tag and the SDK’s published version do point at the same schema, `2026-08-25`, and the repo has kept committing. 79 commits after the tag is a moving `main`. The [November 10 version note](/blog/ucp-vs-acp-spec-versions-november-2026) already said not to code against `main`. The download count is a reason to repeat it. The 65,082 fetches were of 0.5.1, a September tarball mapped to the August schema, not of whatever landed at 05:03 UTC this morning.

ACP has the opposite calm. Zero commits since August 13 means the April 17 folder is not being quietly rewritten on `main`. It does not mean OpenAI’s checkout example and that folder are the same string. This page did not re-fetch the checkout spec’s `Last-Modified` header. The November 10 note is the place that header was read.

## What do the web scans say, and what do they not say?

Installs and public endpoints rank these protocols differently. Both counts are real. They answer different questions.

[agent economy’s scan](https://agenteconomy.to/stats/which-agent-standards-are-actually-adopted), read November 11, says it was updated November 5, 2026 UTC, for the data week of November 2. Of 115,468 domains, the page lists UCP on 5,429, ACP on 32, x402 on 7, and AP2 on 4. The same page says the UCP check is a loose heuristic and the 5,429 should be treated as a suspected over-count. It also says a share of all crawled domains is the wrong denominator for a payment header, and that the shares are not a ranking across standards. Read that way, the useful contrast is narrow. x402’s 1,940,555 npm downloads and 7 matched domains are not a contradiction until someone adds them. A library install does not publish a `402` response on a homepage. A homepage match does not run `npm install`.

[spck.dev’s State of UCP](https://spck.dev/state-of-ucp), read the same day, says it is independent and not affiliated with the UCP maintainers. Its population probe is dated 2026-08-13: 3,037 verified domains, 2,957 with a valid profile, 99.5 percent of those on `*.myshopify.com`, and 15 endpoints it calls deliberate and self-hosted. A re-probe of eight named launch partners on 2026-10-13 found one discovery profile, at www.chewy.com, advertising version `2026-01-23`. The page’s own registry and star figures are dated 2026-10-11. They are an earlier reading. They are not the 3,490 stars or the 65,082 downloads above. The part that survives that gap is the distinction the page draws and this note’s download count cannot: a Shopify-provisioned profile is not a developer running `npm install @ucp-js/sdk`, and neither is a completed checkout.

## What should a builder or a merchant integrate first?

If you sell on a channel that has already named a protocol, integrate that protocol and pin the release. UCP’s pin is `v2026-08-25`. The package that matches it on npm today is `@ucp-js/sdk@0.5.1`, not whatever `main` says. ACP’s pin is `spec/2026-04-17`, and you will be copying schemas or following OpenAI’s and Stripe’s docs, because there is no official package to add. The [shopping report](/reports/ai-shopping-agents-next-6-months) is the dated record of which companies have said they will take the order. This table cannot overrule a channel.

If the job is an API that should answer `402 Payment Required` and settle through the x402 flow, install `@x402/core` and the chain package the README names next to it, or `pip install x402`. That is the only row in this set with a registry release from November 4, a triple-digit commit count since August 13, and an install line a package manager can resolve without a git URL. Budget a facilitator separately. `@coinbase/x402` is one official facilitator package, last published December 23, 2025, and its 312,060 downloads are not the core SDK. The spec file still says Protocol Version 1. Read that file before you treat 2.30.0 as the spec version.

Do not start with AP2 because the star count sits next to UCP. 3,270 stars, 0 commits on main since August 13, release `v0.2.0` from April 28, and a README that still describes PyPI as later. When a card network or a merchant you actually clear through requires an AP2 mandate, pin `v0.2.0` and install from the git URL the README prints, or wait for the package the README says is coming. Do not `pip install ap2`. That name is a different repository.

A star is a bookmark. A download is a file request. A domain with a `/.well-known/ucp` document is a third thing, and on the August scan most of those documents were one platform turning the file on. None of the three is a count of carts that completed. The [agentic checkout](/glossary/agentic-checkout) glossary is the definition. The number that tells you a protocol is being imported, today, is 1,940,555, and it belongs to `@x402/core`.
