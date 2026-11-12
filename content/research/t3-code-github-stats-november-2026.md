---
title: "T3 Code on GitHub: 57,212 stars on November 12, 2026"
description: "pingdotgg/t3code had 57,212 stars at 03:45 UTC on November 12, 2026, up 2,249 from November 10. Of 5,178 open items, 3,426 are pull requests. 759 of 823 releases are prereleases."
absoluteTitle: true
date: "2026-11-12"
updated: "2026-11-12"
type: original-report
topics:
  - harnesses
  - tools-saas
  - how-agents-work
  - research
companies:
  - github
  - claude-code
  - codex
  - cursor
contentLicense: true
dataset:
  title: "T3 Code GitHub census, November 12, 2026"
  description: "Repository fields for pingdotgg/t3code at 2026-11-12T03:45:28Z, issue and pull-request search totals at 2026-11-12T03:45:31Z, a contributors Link header at 2026-11-12T03:45:32Z, a commits Link header at the same second, and a nine-page release list finished at 2026-11-12T03:46:36Z. Peer repository fields for charannyk06/conductor-oss, nubbymong/ai-code-conductor, and hyldmo/conductor-remote were read at 2026-11-12T03:47:47Z. The five largest contribution counts were read at 2026-11-12T03:47:27Z. Earlier star readings are this site’s November 8 and November 10 API snapshots, not a new history series."
  isBasedOn: "https://api.github.com/repos/pingdotgg/t3code"
ledeQuestion: "How many GitHub stars does T3 Code have?"
ledeAnswer: "57,212. That is stargazers_count for pingdotgg/t3code at 03:45:28 UTC on November 12, 2026. The same object listed 10,539 forks. A search one minute later split the open queue into 1,752 issues and 3,426 pull requests."
abstract: |
  pingdotgg/t3code had 57,212 GitHub stars when the repository endpoint returned at 03:45:28 UTC on November 12, 2026. Forks were 10,539. The license field was MIT. open_issues_count was 5,178. A search at 03:45:31 UTC, with incomplete_results false, split that field into 1,752 open issues and 3,426 open pull requests. The two search totals add to 5,178.

  The same morning’s release list held 823 releases. 759 were marked prerelease. 64 were not. The newest of those 64 is v0.1.9, published 2026-11-11T11:33:49Z. Stars were 2,249 higher than this site’s November 10 reading of 54,963, across 39 hours and 57 minutes. The install guide on main still names ten agent backends. The README names seven. The FAQ names eight.
whyItMatters: |
  People searching “t3 code github” already land near a page that explains the product and prints 54,963 stars from November 10. That page answers what T3 Code is. It does not split the open queue, count the releases, or say how fast the star field moved after that reading.

  T3 Code is a control surface in front of coding agents you already run. A star count is a bookmark, not a quality rank and not a user count. The number that changes a buyer’s week is the pace, the release train, and which backends the docs actually list. Seat prices for three of those backends sit on a different page.
keyFindings:
  - "pingdotgg/t3code returned 57,212 stars, 10,539 forks, and open_issues_count 5,178 at 2026-11-12T03:45:28Z. The license field was MIT. pushed_at was 2026-11-12T03:42:08Z. The description field was null."
  - "Search totals at 2026-11-12T03:45:31Z were 1,752 open issues, 6,322 closed issues, 3,426 open pull requests, and 19,432 closed pull requests. incomplete_results was false on each query. 1,752 plus 3,426 equals the repository field 5,178."
  - "The contributors list named 477 users. The Link header at 2026-11-12T03:45:32Z set the last page at 477 for per_page=1, and that page contained one user. At 03:47:27Z the five largest contribution counts were juliusmarminge 4,322, t3dotgg 1,125, maria-rcks 565, only21mil 256, and saphid 254."
  - "Nine pages of releases, finished at 2026-11-12T03:46:36Z, held 823 releases. 759 had prerelease true. 64 had it false. v0.1.0 through v0.1.9 are ten of those 64, published from 2026-10-15T23:18:08Z to 2026-11-11T11:33:49Z, a span of 26.51 days."
  - "Against this site’s earlier API readings, stars rose by 3,561 from November 8 to November 10 (63.6 per hour) and by 2,249 from November 10 to November 12 (56.3 per hour). Two other public repositories whose descriptions call them a coding-agent control surface had 58 and 56 stars at 03:47:47Z."
methodology: |
  The source is the public GitHub REST API, called without a token. GET https://api.github.com/repos/pingdotgg/t3code returned at 2026-11-12T03:45:28Z, taken from the HTTP Date header. Stars are stargazers_count. Forks are forks_count. The combined open column is open_issues_count, which counts open pull requests as well as open issues. The license column is the SPDX id in the license object.

  Four search calls at 2026-11-12T03:45:31Z used q=repo:pingdotgg/t3code with is:issue or is:pr, and is:open or is:closed. Each response had incomplete_results false. total_count is the figure in the tables. The search index and the repository object are different requests. On this pass the two open totals added to open_issues_count.

  Contributors were counted from the Link header on GET /repos/pingdotgg/t3code/contributors?per_page=1 at 2026-11-12T03:45:32Z. rel=last pointed at page 477. A request for that page returned one user, so the list length is 477. The endpoint lists GitHub users with commits on the default branch. Anonymous contributors were not requested. A follow-up at 2026-11-12T03:47:27Z requested per_page=5. The contributions field is the count that endpoint returns, not a pull-request count.

  Commits were counted from the Link header on GET /repos/pingdotgg/t3code/commits?per_page=1 at 2026-11-12T03:45:32Z. rel=last pointed at page 10,434. This pass did not download page 10,434.

  Releases were listed with per_page=100. Page 1 of a later pass returned at 2026-11-12T03:46:27Z. Page 9, the last page, returned 23 releases at 2026-11-12T03:46:36Z. The nine pages sum to 823. A release is counted as prerelease when the prerelease field is true. Drafts were not present. /releases/latest, in the 03:45 pass, returned v0.1.9 because that route skips prereleases.

  The README, docs/user/install.md, and docs/user/faq.md were fetched from raw.githubusercontent.com for commit 7462f234e89027943cf0d1a73d3ae1f36571d4e3. GET /repos/pingdotgg/t3code/commits/main at 2026-11-12T03:48:43Z returned that sha. The committer date on the commit is 2026-11-12T03:01:42Z. The files match a fetch from main made earlier the same morning.

  Earlier star, fork, and open_issues_count values are the readings already published on this site for 2026-11-08T03:46:26Z and 2026-11-10T11:48:27Z. They were not requested again. Hourly rates are the star delta divided by the elapsed time between those timestamps and 2026-11-12T03:45:28Z.

  Peer rows are three repositories returned by a search for conductor coding agent control, then read with GET /repos/{owner}/{repo} at 2026-11-12T03:47:47Z. The search was the same morning. The README names Conductor, Claude Desktop, and Cursor Glass. Those product names were not resolved to a repository object on this pass. The three rows are public repositories the search returned, kept because their descriptions talk about controlling coding agents. They are not a ranking of every control surface on GitHub.
limitations:
  - "Stars are an account’s bookmark. They are not unique people, not a quality score, and not the number of developers who run T3 Code. This pass did not audit a download count or the homepage’s user claim."
  - "The star series is three dated readings from this desk, on November 8, November 10, and November 12. It is not a daily history. A rate between two readings is arithmetic. It is not a promise about the next hour. The repository was moving: pushed_at was 03:42:08Z, about three minutes before the star field was read."
  - "open_issues_count includes open pull requests. The split is a search a few seconds later. The two open totals matched the field on this pass. Closed totals have no repository field to match them against."
  - "The contributors list is capped by GitHub at 500 users and omits anonymous contributors unless anon=1 is set. This pass did not set it. 477 is under the cap, so the cap did not truncate the list that was requested. The contributions field is not the commits listing. The commits listing length, 10,434, comes from a Link header. Page 10,434 was not downloaded."
  - "prerelease is GitHub’s boolean. Thirteen tags named v0.0.0-alpha have that boolean set to false. Calling all 64 a stable channel would be wrong. Nightly and preview tags are inside the 759."
  - "Backend names are the README, the install guide, and the FAQ at one commit. The pages disagree. This note does not merge them, and it does not claim each named CLI launched on November 12."
  - "The peer table is three repositories from one search query. A control surface with a different name, or a closed-source app, is outside the table. The Conductor product named in the README was not matched to a repository."
references:
  - title: "GitHub REST API, pingdotgg/t3code, HTTP Date 2026-11-12T03:45:28Z"
    url: "https://api.github.com/repos/pingdotgg/t3code"
    note: "57,212 stars, 10,539 forks, open_issues_count 5,178, MIT, description null."
  - title: "GitHub search, issues and pull requests in pingdotgg/t3code, HTTP Date 2026-11-12T03:45:31Z"
    url: "https://api.github.com/search/issues?q=repo:pingdotgg/t3code+is:issue+is:open"
    note: "Four queries. Open issues 1,752. Closed issues 6,322. Open pull requests 3,426. Closed pull requests 19,432. incomplete_results false."
  - title: "GitHub REST API, contributors for pingdotgg/t3code, HTTP Date 2026-11-12T03:45:32Z"
    url: "https://api.github.com/repos/pingdotgg/t3code/contributors?per_page=1"
    note: "Link rel=last page 477. The five largest contribution counts were read at 2026-11-12T03:47:27Z."
  - title: "GitHub REST API, commits for pingdotgg/t3code, HTTP Date 2026-11-12T03:45:32Z"
    url: "https://api.github.com/repos/pingdotgg/t3code/commits?per_page=1"
    note: "Link rel=last page 10,434. That page was not downloaded."
  - title: "GitHub REST API, releases for pingdotgg/t3code, pages 1 through 9, finished 2026-11-12T03:46:36Z"
    url: "https://api.github.com/repos/pingdotgg/t3code/releases?per_page=100"
    note: "823 releases. 759 prerelease. 64 not. /releases/latest in the 03:45 pass returned v0.1.9."
  - title: "T3 Code v0.1.9 release notes, published 2026-11-11T11:33:49Z"
    url: "https://github.com/pingdotgg/t3code/releases/tag/v0.1.9"
    note: "The notes open with “198 changes from 31 contributors.”"
  - title: "README at 7462f234e89027943cf0d1a73d3ae1f36571d4e3"
    url: "https://github.com/pingdotgg/t3code/blob/7462f234e89027943cf0d1a73d3ae1f36571d4e3/README.md"
    note: "Calls T3 Code an agent harness control surface and names seven subscriptions."
  - title: "Install guide at the same commit"
    url: "https://github.com/pingdotgg/t3code/blob/7462f234e89027943cf0d1a73d3ae1f36571d4e3/docs/user/install.md"
    note: "Providers table names ten backends."
  - title: "FAQ at the same commit"
    url: "https://github.com/pingdotgg/t3code/blob/7462f234e89027943cf0d1a73d3ae1f36571d4e3/docs/user/faq.md"
    note: "Says T3 Code is not a harness. The bring-your-own list names eight backends."
  - title: "GitHub REST API, charannyk06/conductor-oss, HTTP Date 2026-11-12T03:47:47Z"
    url: "https://api.github.com/repos/charannyk06/conductor-oss"
    note: "56 stars. Description calls it a local-first control surface for AI coding agents."
  - title: "GitHub REST API, nubbymong/ai-code-conductor, HTTP Date 2026-11-12T03:47:47Z"
    url: "https://api.github.com/repos/nubbymong/ai-code-conductor"
    note: "58 stars. Description calls it mission control for Claude Code and Codex."
  - title: "GitHub REST API, hyldmo/conductor-remote, HTTP Date 2026-11-12T03:47:47Z"
    url: "https://api.github.com/repos/hyldmo/conductor-remote"
    note: "8 stars. Description calls it a phone control panel for local Conductor coding agents."
  - title: "AI Agents Info, What is T3 Code?"
    url: "https://www.aiagentsinfo.com/blog/what-is-t3-code"
    note: "Earlier readings. 51,402 stars at 2026-11-08T03:46:26Z. 54,963 stars at 2026-11-10T11:48:27Z."
citation:
  apa: "AI Agents Info. (2026, November 12). T3 Code on GitHub: 57,212 stars on November 12, 2026. https://www.aiagentsinfo.com/research/t3-code-github-stats-november-2026"
  bibtex: |
    @misc{aiagentsinfo2026t3codegithub,
      title={T3 Code on GitHub: 57,212 stars on November 12, 2026},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/t3-code-github-stats-november-2026},
      note={GitHub repository object read 2026-11-12T03:45:28Z}
    }
faq:
  - question: "How many GitHub stars does T3 Code have?"
    answer: "57,212. That is stargazers_count for pingdotgg/t3code at 03:45:28 UTC on November 12, 2026. Forks were 10,539. The license field was MIT. The November 10 reading on this site was 54,963 stars, so the field rose by 2,249 in 39 hours and 57 minutes."
  - question: "How many open issues does T3 Code have?"
    answer: "1,752 open issues and 3,426 open pull requests, from a GitHub search at 03:45:31 UTC on November 12, 2026. The repository field open_issues_count was 5,178, and 1,752 plus 3,426 equals 5,178. Closed issues were 6,322. Closed pull requests were 19,432."
  - question: "How often does T3 Code release?"
    answer: "The release list finished at 03:46:36 UTC held 823 releases, and 759 were marked prerelease. Of the 64 that were not, v0.1.0 through v0.1.9 are ten tags published from October 15 to November 11, 2026, a span of 26.51 days. The newest of those ten is v0.1.9, published 2026-11-11T11:33:49Z. /releases/latest returned that tag because the route skips prereleases."
  - question: "Which coding agents can T3 Code control?"
    answer: "It depends which file you read at commit 7462f234. The README names Claude Code, Codex, Cursor, Grok Build, OpenCode, Google Antigravity, and fx. The FAQ names Claude Code, Codex, Cursor, Grok Build, OpenCode, Google Antigravity, Pi, and Muse Code. The install guide names those plus Kiro, ten in all. This note does not merge the lists."
  - question: "How does T3 Code’s star count compare with other control surfaces?"
    answer: "At 03:47:47 UTC on November 12, 2026, nubbymong/ai-code-conductor had 58 stars and charannyk06/conductor-oss had 56. Both descriptions talk about controlling coding agents. hyldmo/conductor-remote, a phone panel for Conductor, had 8. The Conductor, Claude Desktop, and Cursor Glass products named in the T3 Code README were not matched to a repository on this pass. 57,212 is a star field, not a verdict that the smaller repositories work worse."
---

pingdotgg/t3code had **57,212** GitHub stars at 03:45:28 UTC on November 12, 2026. The open queue beside that number is mostly pull requests: **3,426** of **5,178**. And **759** of **823** releases are marked prerelease.

The repository is the project behind [T3 Code](https://t3.codes/). The README at commit `7462f234` calls it an agent-harness control surface. A [harness](/glossary/harness), on this site, is the loop, tools, memory, permissions, and stop rules around a model. The FAQ on the same commit says T3 Code is not that loop. It drives a harness you already installed. What the product is, in the longer November 8 reading, is [What is T3 Code?](/blog/what-is-t3-code). This note is the GitHub census.

## How many GitHub stars does T3 Code have?

57,212, in the repository response whose HTTP Date header was 2026-11-12T03:45:28Z.

The same object listed 10,539 forks, `open_issues_count` 5,178, the SPDX id MIT, TypeScript as the primary language, `archived: false`, and `created_at` 2026-02-08T23:46:22Z. That timestamp is 276.17 days before the response. The homepage field was `https://t3.codes`. The description field was null, so the phrase on the GitHub card is not where “agent harness control surface” lives. That phrase is the README. `pushed_at` was 2026-11-12T03:42:08Z, three minutes and twenty seconds before the star field was read. `subscribers_count` was 107. 57,212 divided by 107 is 534.7 stars per subscriber. Subscribers are people watching the repository. Stars are bookmarks. The ratio is arithmetic, not a count of operators.

The languages endpoint, in the same pass, returned 209,777,771 bytes across languages. TypeScript was 202,386,383 of them, which is 96.5 percent. The next share was MDX at 2.0 percent. Kotlin and Swift are in the list, which matches a repo that also ships phone apps. The byte share is not a claim about which language the agent loop is written in. T3 Code does not contain that loop.

| Field | Value | When |
| --- | --- | --- |
| Stars | 57,212 | 2026-11-12T03:45:28Z |
| Forks | 10,539 | Same response |
| open_issues_count | 5,178 | Same response. Issues plus pull requests |
| Open issues | 1,752 | Search, 2026-11-12T03:45:31Z |
| Open pull requests | 3,426 | Same search minute |
| Closed issues | 6,322 | Same search minute |
| Closed pull requests | 19,432 | Same search minute |
| Contributors in the API list | 477 | Link header, 2026-11-12T03:45:32Z |
| Commits in the listing | 10,434 | Link header, same second. Last page not downloaded |
| License field | MIT | Repository object |
| Latest non-prerelease | v0.1.9 | Published 2026-11-11T11:33:49Z |

The numbers in the tables are licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Credit AI Agents Info if you reuse them.

## How fast did the star field move after November 8?

It rose by 5,810 stars from the November 8 reading to this one, and the latest stretch ran at 56.3 stars per hour.

This site already printed two earlier responses from the same endpoint. At 03:46:26 UTC on November 8 the star field was 51,402. At 11:48:27 UTC on November 10 it was 54,963. Those readings stay on [What is T3 Code?](/blog/what-is-t3-code). They were not requested again.

| Reading | Stars | Forks | open_issues_count | Elapsed from the previous reading | Stars per hour |
| --- | --- | --- | --- | --- | --- |
| 2026-11-08T03:46:26Z | 51,402 | 9,893 | 5,806 |  |  |
| 2026-11-10T11:48:27Z | 54,963 | 10,263 | 5,789 | 56 hours 2 minutes | 63.6 |
| 2026-11-12T03:45:28Z | 57,212 | 10,539 | 5,178 | 39 hours 57 minutes | 56.3 |

Source: aiagentsinfo.com. The first two rows are the published API readings. The third row is this pass. 54,963 minus 51,402 is 3,561. 3,561 divided by 56.0336 hours is 63.55, printed here as 63.6. 57,212 minus 54,963 is 2,249. 2,249 divided by 39.9503 hours is 56.29, printed here as 56.3. Per day, those rates are 1,525 and 1,351 if the pace held for 24 hours. It may not.

Across the whole repository life, 57,212 stars over 276.17 days is 207.2 stars per day. The latest interval, at 1,351 per day, is 6.5 times that lifetime average. 1,351 divided by 207.2 is 6.52. The average hides a quiet stretch. The longest gap between releases with `prerelease: false` is 671.65 hours, from v0.0.28 on June 29, 2026 to v0.0.29 on July 27. The star average is not a flat line, and this note does not have the daily star series that would draw one.

Forks rose by 370 between November 8 and November 10, and by 276 between November 10 and November 12. The combined open field fell by 17, then by 611. The 611 is issues and pull requests together. This pass did not split the November 10 field, so it cannot say whether issues or pull requests moved.

## What is inside the open queue?

1,752 issues and 3,426 pull requests. The pull requests are 66.2 percent of the headline open count.

GitHub’s `open_issues_count` adds the two. A buyer who reads 5,178 as 5,178 bug reports is reading a pull-request queue as a defect queue. 3,426 divided by 5,178 is 0.6616, which is 66.2 percent. The issue share is 33.8 percent.

| Kind | Open | Closed | Open plus closed | Share closed |
| --- | --- | --- | --- | --- |
| Issues | 1,752 | 6,322 | 8,074 | 78.3% |
| Pull requests | 3,426 | 19,432 | 22,858 | 85.0% |
| Sum | 5,178 | 25,754 | 30,932 |  |

Source: aiagentsinfo.com. Search totals at 2026-11-12T03:45:31Z. `incomplete_results` was false on each of the four queries. 6,322 divided by 8,074 is 0.7830. 19,432 divided by 22,858 is 0.8501.

The closed share is high, and the open remainder is still mostly code waiting to merge, not mostly tickets. v0.1.9’s own notes, published the day before, open with “198 changes from 31 contributors.” That sentence is the release notes’ count for one tag. It is not the 477.

## Who shows up in the contributor list?

477 GitHub users, and five accounts hold the largest contribution counts on the endpoint.

The Link header at 03:45:32 UTC named page 477 as last for a one-user page, and that page contained one user. At 03:47:27 UTC the top of the list was:

| Login | Contributions on the endpoint |
| --- | --- |
| juliusmarminge | 4,322 |
| t3dotgg | 1,125 |
| maria-rcks | 565 |
| only21mil | 256 |
| saphid | 254 |

Source: aiagentsinfo.com. `GET /repos/pingdotgg/t3code/contributors?per_page=5` at 2026-11-12T03:47:27Z. Contributions are the field GitHub returns for that list. They are not a count of merged pull requests, and they are not the 10,434 commits in the separate commits listing.

The README on `7462f234` says the project is very early, that bugs are expected, and that the maintainers are mostly not accepting contributions. It says small fixes may be considered and big features will not. The API list and that paragraph are both dated the same morning. A contributor count of 477 does not mean 477 feature proposals were accepted. It means 477 GitHub users have commits the endpoint is willing to list. The commits listing itself, from a Link header at 03:45:32Z, runs to page 10,434. This pass did not open that page, so 10,434 is the header’s last-page number, not a commit this desk read.

## How often does a non-prerelease tag ship?

Ten tags, v0.1.0 through v0.1.9, shipped in 26.51 days. The full release list is mostly previews and nightlies.

The nine-page list finished at 03:46:36 UTC. It held 823 releases. Page 9 had 23. 759 had `prerelease: true`, which is 92.2 percent of 823. 64 had it false. Thirteen of those 64 are named `v0.0.0-alpha`. Forty-one are numbered `v0.0.x`. Ten are `v0.1.0` through `v0.1.9`. GitHub did not mark the alpha tags as prereleases. The tag name and the boolean disagree, and this note keeps the boolean as the count.

`/releases/latest` in the 03:45 pass returned v0.1.9, published 2026-11-11T11:33:49Z. A releases page fetched in that same pass began with `v0.1.10-preview.20261112.4560`, published 2026-11-12T03:22:30Z. Latest and newest are different tags, because latest skips prereleases. Anyone automating an upgrade off the top of the releases page will install a preview. `t3 update`, in the install guide, says it moves to the newest release. This note did not run the command, so it does not say which tag that command selects.

The v0.1 tags, which are the current train:

| Tag | Published | Hours since the previous v0.1 tag |
| --- | --- | --- |
| v0.1.0 | 2026-10-15T23:18:08Z |  |
| v0.1.1 | 2026-10-21T02:29:41Z | 123.19 |
| v0.1.2 | 2026-10-22T20:44:22Z | 42.24 |
| v0.1.3 | 2026-10-27T06:09:26Z | 105.42 |
| v0.1.4 | 2026-10-29T07:44:41Z | 49.59 |
| v0.1.5 | 2026-10-29T13:08:50Z | 5.40 |
| v0.1.6 | 2026-10-31T10:52:24Z | 45.73 |
| v0.1.7 | 2026-11-04T06:39:38Z | 91.79 |
| v0.1.8 | 2026-11-09T22:46:42Z | 136.12 |
| v0.1.9 | 2026-11-11T11:33:49Z | 36.79 |

Source: aiagentsinfo.com. Published times from the release objects. The span from v0.1.0 to v0.1.9 is 26.51 days. The nine gaps average 70.70 hours, which is 2.95 days. The shortest gap is 5.40 hours, between v0.1.4 and v0.1.5. The longest is 136.12 hours, between v0.1.7 and v0.1.8. v0.1.8 is the tag this site’s November 10 reading recorded as latest. v0.1.9 landed the next day.

v0.1.9’s notes are a product change, not only a version bump. They name T3 Connect agent sign-in, Claude session approvals for an MCP app, OpenCode goals kept in sync across clients, and GitLab revert of a merged merge request. The first line of the notes is the 198 changes and 31 contributors. The control surface is still shipping provider-specific behavior. It is not a frozen shell in front of untouched CLIs.

## Which agent backends do the docs name?

Ten, if you read the install guide. Seven, if you read the README. Eight, if you read the FAQ. The files are the same commit.

| Page at 7462f234 | Backends it names |
| --- | --- |
| README introduction and install warning | Claude Code, Codex, Cursor, Grok Build, OpenCode, Google Antigravity, fx |
| FAQ, “bring your own” | Claude Code, Codex, Cursor, Grok Build, OpenCode, Google Antigravity, Pi, Muse Code |
| Install guide, providers table | Codex, Claude, Cursor, Grok Build, Kiro, OpenCode, Antigravity, Pi, Muse Code, fx |

The install table is the longest list, and it is the one that says how you sign in: `codex login`, `claude auth login`, Cursor’s `agent login`, `grok login`, `kiro-cli login`, `opencode auth login`, Google sign-in for Antigravity from T3 Code’s settings, `pi` then `/login`, `muse login`, and `fx login`. The guide says Codex connected through ChatGPT, and Antigravity, can run without a binary on `PATH`. The others need the CLI on the computer that runs the server, not on the phone.

The FAQ’s answer to “is T3 Code a harness?” is no. It says a harness gives a model tools, runs them, and returns the results, and that Claude Code and Codex are that layer. T3 Code uses them. It does not work without one. That split is the reason a star comparison with Claude Code would be the wrong table. Claude Code is a backend this app drives. [Claude Code](/directory/claude-code), [Codex](/directory/codex), and [Cursor](/directory/cursor) are three of the names with directory pages here. Seat prices, which this census does not reprint, are [Best AI coding agents](/best/ai-coding-agents).

The README says the project was inspired by the Codex desktop app, Conductor, Claude Desktop, and Cursor Glass, and that none of them met the bar. It also says there is nothing to buy. The FAQ says the same thing about price: no way to pay the project to use T3 Code, MIT licensed, and you bring the subscription you already pay. T3 Connect is described as free for now, with a cap of three machines, and a paid T3 Chat plan is the way the FAQ says that cap rises. The FAQ does not print a dollar price for T3 Chat. This note does not invent one.

## How do the other public control surfaces compare?

Two repositories whose own descriptions call them a control surface or mission control for coding agents had 58 and 56 stars. T3 Code’s field was 57,212.

A repository search the same morning, query `conductor coding agent control`, did not return the Conductor product the README names, and this pass did not match Claude Desktop or Cursor Glass to a repository object. Three public repositories from that search did return, and their descriptions are about controlling coding agents. They were read at 03:47:47 UTC.

| Repository | Stars | Forks | open_issues_count | License field | What the description calls it | Latest release on /releases/latest |
| --- | --- | --- | --- | --- | --- | --- |
| pingdotgg/t3code | 57,212 | 10,539 | 5,178 | MIT | README: agent harness control surface. The API description field was null | v0.1.9, 2026-11-11 |
| nubbymong/ai-code-conductor | 58 | 0 | 14 | MIT | Mission control for Claude Code and Codex | v2.1.2, 2026-10-17 |
| charannyk06/conductor-oss | 56 | 13 | 23 | Apache-2.0 | Local-first control surface for AI coding agents | v0.62.8, 2026-08-15 |
| hyldmo/conductor-remote | 8 | 6 | 11 | MIT | Phone control panel for local Conductor coding agents | v1.131.6, 2026-09-10 |

Source: aiagentsinfo.com. T3 Code’s row is the 03:45:28Z repository object. The other three rows are 03:47:47Z. Latest-release tags are `/releases/latest` in that peer pass, which skips prereleases. hyldmo/conductor-remote is a phone panel for Conductor, not a second full control plane. It is in the table because the search returned it and the description names the job. It is not a claim that these four are the market.

57,212 divided by 58 is 986.4. 57,212 divided by 56 is 1,021.6. Those quotients are star fields. conductor-oss was last pushed 2026-10-31T03:28:20Z. ai-code-conductor was last pushed 2026-10-18T06:52:20Z. T3 Code was pushed the morning of this reading. A quiet repository can be finished. A busy one can be unstable. The README still says to expect bugs. The star gap does not settle which control surface to install. It settles which public repository, among the ones this pass could name, is the one people have bookmarked.

## What should a builder do with these numbers?

Use T3 Code’s repository as a control surface that is moving, and pin the backend yourself.

The star field gained 2,249 bookmarks in 39 hours and 57 minutes, while a non-prerelease tag, v0.1.9, is a day old and the top of the releases list is a preview. If you install from “latest,” confirm you got v0.1.9 and not a `v0.1.10-preview` tag. If you install from the top of the releases page, you may get the preview on purpose. Read the tag before you treat the app as the November 10 build this site described, which was v0.1.8.

Treat 5,178 as 1,752 issues plus 3,426 pull requests. File a bug against the issue list. Do not read the combined field as the defect count. The docs you point an agent at should be the install table when you need the backend list, because the README is shorter by Kiro, Pi, and Muse Code, and the FAQ is shorter by Kiro and fx. The three files agree that the harness is the thing you bring. They do not agree on the menu.

The smaller public control surfaces are real repositories with real star counts under 60. They are not a reason to ignore T3 Code, and T3 Code’s star count is not a reason to ignore a license, a last-push date, or a backend you actually run. Prices for Claude Code, Codex, Cursor, and GitHub Copilot, which are the products under some of these buttons, stay on [Best AI coding agents](/best/ai-coding-agents).
