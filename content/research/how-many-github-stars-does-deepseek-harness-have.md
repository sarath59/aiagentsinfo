---
title: "277,506 GitHub Stars on DeepSeek Harness"
description: "277,506 stars on deepseek-ai/deepseek-harness at 03:35 UTC on November 10, 2026. First of 7 repos with harness in the name above 10,000 stars. OpenClaw had 394,260."
date: "2026-11-10"
updated: "2026-11-10"
type: original-report
topics:
  - research
  - harnesses
  - how-agents-work
  - tools-saas
companies:
  - github
  - google
  - anthropic
  - langchain
  - claude-code
contentLicense: true
absoluteTitle: true
codeUrl: "https://github.com/deepseek-ai/deepseek-harness"
dataset:
  title: "GitHub star reading for repositories with harness in the name, November 10, 2026"
  description: "Repository objects for seven public repositories whose names contain harness and that the search API reported above 10,000 stars. deepseek-ai/deepseek-harness returned 277,506 stars. HTTP Date on that object was Tue, 10 Nov 2026 03:35:29 GMT. The search that defined the set of seven returned total_count 7 at 03:35:44 GMT, and its star fields matched the repository objects. Comparison rows for openclaw/openclaw, NousResearch/hermes-agent, anthropics/claude-code, langchain-ai/langchain, and affaan-m/ECC were read in the same pass."
  isBasedOn: "https://api.github.com/repos/deepseek-ai/deepseek-harness"
abstract: |
  deepseek-ai/deepseek-harness had 277,506 GitHub stars at 03:35:29 UTC on November 10, 2026. The license field was MIT. Issues are disabled on the repository. The newest release GitHub listed was a pre-release, dsh-v0.2.2-rc.1, published November 4, 2026, and the latest-release endpoint returned 404.

  A search for repositories with harness in the name and more than 10,000 stars returned seven repositories. DeepSeek Harness had the most stars of the seven. Three of the seven describe an agent harness a person can run. One is Google’s research code for agent harnessing. One is a tutorial. One is the Harness CI product, created in 2014. One is EleutherAI’s language-model evaluation harness, created in 2020.
whyItMatters: |
  The page that already earns impressions for agent-framework stars is this site’s November 5 release snapshot. LangChain led those 19 libraries at 149,047 stars. The November 9 agent-repo census answered a wider question and put OpenClaw first, at 394,222, with Hermes Agent second at 261,856. DeepSeek Harness was in neither table. On November 10 it had 277,506 stars, 15,397 more than Hermes Agent’s count from the same morning, and 128,221 more than LangChain’s.

  Leaderboards that round this repository to about 277,000, or that mix it with skill packs, do not print the minute of the API call or the other six names the search actually returned. A star count is a bookmark total. It is not a quality rank and not a download count. The install census on this site is the download question for the libraries. This note is the star question for one harness the earlier tables left out.
keyFindings:
  - "deepseek-ai/deepseek-harness returned 277,506 stars, 34,038 forks, and open_issues_count 0. has_issues was false. The license field was MIT. created_at was 2026-08-13T11:56:32Z. pushed_at was 2026-11-04T13:06:39Z. HTTP Date was Tue, 10 Nov 2026 03:35:29 GMT. An earlier read the same morning, HTTP Date 03:33:16 GMT, returned 277,505."
  - "GET /releases/latest returned 404. The releases list, HTTP Date 03:36:01 GMT, began with tag dsh-v0.2.2-rc.1, name v0.2.2-rc.1, published 2026-11-04T13:07:14Z, prerelease true. The README on the default branch calls the project an open-source agent harness, dsh, and says it is in developer preview."
  - "Search query harness in:name stars:>10000 returned total_count 7 and incomplete_results false at 03:35:44 GMT. The seven star fields on that response matched the repository objects. The seven stars sum to 413,364."
  - "On the same pass, openclaw/openclaw had 394,260 stars, 38 more than the 394,222 in the November 9 census. NousResearch/hermes-agent had 262,109, which is 15,397 below DeepSeek Harness. affaan-m/ECC had 300,291. Its name does not contain harness, so the search excluded it. Its description calls it an agent harness performance optimization system."
  - "langchain-ai/langchain had 149,285 stars, 44 more than the 149,241 on November 9 and 238 more than the 149,047 in the November 5 snapshot. anthropics/claude-code had 155,109. Its license field was null. The latest tag was v2.1.322, published 2026-11-10T02:29:43Z."
methodology: |
  The source is the public GitHub REST API, unauthenticated, with Accept application/vnd.github+json and X-GitHub-Api-Version 2022-11-28. One pass requested GET https://api.github.com/repos/{owner}/{repo} and GET https://api.github.com/repos/{owner}/{repo}/releases/latest. The DeepSeek Harness repository object carried HTTP Date Tue, 10 Nov 2026 03:35:29 GMT. The seven repository objects were read from 03:35:29 GMT through 03:35:32 GMT. Comparison repositories were read through 03:35:35 GMT.

  The set of seven came from the search API, not from a hand-built list. The query was harness in:name stars:>10000, sorted by stars. The response at 03:35:44 GMT reported total_count 7 and incomplete_results false, and it returned all seven. Stars in the tables are stargazers_count from the repository object. The search items carried the same seven star counts. Forks are forks_count. The license column is the SPDX id in the license object.

  releases/latest returned 404 for deepseek-ai/deepseek-harness, walkinglabs/learn-harness-engineering, and google-research/harness2. A follow-up GET https://api.github.com/repos/deepseek-ai/deepseek-harness/releases?per_page=5 at 03:36:01 GMT returned pre-releases. The first item is the one quoted below. This note did not walk the full release history.

  README text was read from the repository README endpoint at 03:36:01 GMT for google-research/harness2, HKUDS/OpenHarness, browser-use/browser-harness, and affaan-m/ECC, and from the raw README on master for deepseek-ai/deepseek-harness the same morning. DeepSeek Harness pushed_at was 2026-11-04T13:06:39Z, so the default branch had not moved during this pass. Quotes are the sentences those files contained. Descriptions in the table are the description field.

  The November 9 figures used as the comparison are the figures printed in this site’s OpenClaw note: 394,222, 261,856, 155,043, and 149,241, from a pass that finished at 07:41:51 UTC. The November 5 LangChain figure, 149,047, is the figure in the framework snapshot. This note did not re-download those earlier responses.
limitations:
  - "The seven repositories are every result of one query: harness in the name, more than 10,000 stars, at 03:35:44 UTC on November 10, 2026. A repository can describe itself as an agent harness and fail that query. affaan-m/ECC had 300,291 stars on this pass. openclaw/openclaw had 394,260. ruvnet/ruflo, 81,376 stars in a separate topic search the same minute, describes itself as an agent harness. None of those three names contain harness."
  - "Stars are an account’s bookmark. They are not unique people, not a quality score, and not a measure of who runs the software. The download census on this site is a different measurement, on a different set of package names. This page did not query npm for @deepseek-ai/dsh."
  - "An earlier read at 03:33:16 GMT returned 277,505 stars. The figure used here is 277,506, from 03:35:29 GMT. The count was moving. A later minute can differ."
  - "has_issues was false, and open_issues_count was 0. A zero in that field means GitHub is not tracking issues on the repository. It does not mean the project has no bug reports. The README points feedback at GitHub Discussions. This note did not count discussions."
  - "releases/latest skips pre-releases. The 404 on DeepSeek Harness means there was no stable release for that endpoint to return. The releases list did contain pre-releases. This note quotes the first of five items from one page. It does not claim that tag is the only tag in the repository."
  - "The word harness in a repository name is not a product category. harness/harness is a CI platform from 2014. EleutherAI/lm-evaluation-harness is a language-model evaluation framework from 2020. Both belong in the table because the query returned them. They are not DeepSeek Harness."
  - "README quotes are opening lines. This note did not install dsh, did not run the browser harness, and did not read the Harness2 paper linked from that README. google-research/harness2 had an empty description field. The classification uses the README heading that was present."
  - "Search total_count is the index’s reported size. incomplete_results was false for this query, and the page size covered all seven, so the set is the full result. The same is not true of a query that reports tens of thousands of hits. This note does not treat a search total as a clone of every matching repository."
references:
  - title: "GitHub REST API, deepseek-ai/deepseek-harness"
    url: "https://api.github.com/repos/deepseek-ai/deepseek-harness"
    note: "277,506 stars. HTTP Date Tue, 10 Nov 2026 03:35:29 GMT. has_issues false. License SPDX MIT. pushed_at 2026-11-04T13:06:39Z. created_at 2026-08-13T11:56:32Z."
  - title: "Same repository, earlier the same morning"
    url: "https://api.github.com/repos/deepseek-ai/deepseek-harness"
    note: "277,505 stars. HTTP Date Tue, 10 Nov 2026 03:33:16 GMT. The census figure is the later read."
  - title: "GitHub REST API, releases list, deepseek-ai/deepseek-harness"
    url: "https://api.github.com/repos/deepseek-ai/deepseek-harness/releases?per_page=5"
    note: "HTTP Date 03:36:01 GMT. First item tag dsh-v0.2.2-rc.1, published 2026-11-04T13:07:14Z, prerelease true. releases/latest returned 404."
  - title: "DeepSeek Harness README on master"
    url: "https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md"
    note: "Read November 10, 2026. Calls the project an open-source agent harness, dsh, in developer preview, MIT."
  - title: "GitHub search, harness in:name stars:>10000"
    url: "https://api.github.com/search/repositories?q=harness+in:name+stars:%3E10000&sort=stars&order=desc&per_page=10"
    note: "total_count 7, incomplete_results false. HTTP Date Tue, 10 Nov 2026 03:35:44 GMT. Star fields matched the repository objects."
  - title: "GitHub REST API, the other six repositories in that search"
    url: "https://api.github.com/repos/harness/harness"
    note: "harness/harness, walkinglabs/learn-harness-engineering, google-research/harness2, browser-use/browser-harness, HKUDS/OpenHarness, EleutherAI/lm-evaluation-harness. HTTP Dates 03:35:30 GMT through 03:35:32 GMT."
  - title: "GitHub REST API, openclaw/openclaw, same pass"
    url: "https://api.github.com/repos/openclaw/openclaw"
    note: "394,260 stars. HTTP Date 03:35:33 GMT. Latest release v2026.11.2, published 2026-11-08T19:31:04Z."
  - title: "GitHub REST API, NousResearch/hermes-agent, same pass"
    url: "https://api.github.com/repos/NousResearch/hermes-agent"
    note: "262,109 stars. HTTP Date 03:35:33 GMT. Latest release v0.23.1, published 2026-11-10T01:42:15Z."
  - title: "GitHub REST API, anthropics/claude-code, same pass"
    url: "https://api.github.com/repos/anthropics/claude-code"
    note: "155,109 stars. HTTP Date 03:35:34 GMT. License field null. Latest release v2.1.322, published 2026-11-10T02:29:43Z."
  - title: "GitHub REST API, langchain-ai/langchain, same pass"
    url: "https://api.github.com/repos/langchain-ai/langchain"
    note: "149,285 stars. HTTP Date 03:35:34 GMT. Latest release tag langchain-core==1.7.6, published 2026-11-05T00:22:12Z."
  - title: "GitHub REST API, affaan-m/ECC, same pass"
    url: "https://api.github.com/repos/affaan-m/ECC"
    note: "300,291 stars. HTTP Date 03:35:35 GMT. Outside the name filter. Description calls it an agent harness performance optimization system."
  - title: "AI Agents Info, How many GitHub stars does OpenClaw have?"
    url: "https://www.aiagentsinfo.com/research/how-many-github-stars-does-openclaw-have"
    note: "Pass finished 07:41:51 UTC on November 9, 2026. OpenClaw 394,222. Hermes Agent 261,856. Claude Code 155,043. LangChain 149,241. DeepSeek Harness was not in the set."
  - title: "AI Agents Info, AI agent framework GitHub stats, November 2026"
    url: "https://www.aiagentsinfo.com/reports/ai-agent-framework-github-stats-november-2026"
    note: "Snapshot pulled November 5, 2026. LangChain 149,047 stars. Nineteen libraries. DeepSeek Harness was not in the set."
citation:
  apa: "AI Agents Info. (2026, November 10). 277,506 GitHub stars on DeepSeek Harness. https://www.aiagentsinfo.com/research/how-many-github-stars-does-deepseek-harness-have"
  bibtex: |
    @misc{aiagentsinfo2026deepseekHarnessStars,
      title={277,506 GitHub Stars on DeepSeek Harness},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/how-many-github-stars-does-deepseek-harness-have},
      note={GitHub REST reading at 2026-11-10T03:35:29Z. Search total_count 7 at 2026-11-10T03:35:44Z}
    }
ledeQuestion: "How many GitHub stars does DeepSeek Harness have?"
ledeAnswer: "277,506. That is stargazers_count for deepseek-ai/deepseek-harness at 03:35:29 UTC on November 10, 2026. It is the largest of seven repositories with harness in the name and more than 10,000 stars. OpenClaw, whose name does not contain harness, had 394,260 on the same pass."
faq:
  - question: "How many GitHub stars does DeepSeek Harness have?"
    answer: "277,506. That is the stargazers_count on deepseek-ai/deepseek-harness at 03:35:29 UTC on November 10, 2026. The license field was MIT. A read two minutes earlier returned 277,505. The repository has issues disabled, so the open-issue field of 0 is not a backlog count."
  - question: "Is DeepSeek Harness the most-starred agent repository?"
    answer: "OpenClaw had more stars on this pass, 394,260 against 277,506. ECC had 300,291. DeepSeek Harness was first inside the seven repositories with harness in the name and more than 10,000 stars. OpenClaw and ECC do not have harness in the name, so that search left them out."
  - question: "Did the November framework table include DeepSeek Harness?"
    answer: "The November 5 framework snapshot did not. LangChain led that table of 19 libraries at 149,047 stars. On November 10 LangChain had 149,285. DeepSeek Harness had 128,221 more stars than that later LangChain reading, and it is a harness repository, not one of those 19 library rows."
  - question: "What is the latest DeepSeek Harness release?"
    answer: "The latest-release endpoint returned 404 at 03:35 UTC, which is what that endpoint does when there is no stable release to point at. The releases list at 03:36:01 UTC began with pre-release tag dsh-v0.2.2-rc.1, published 2026-11-04T13:07:14Z. pushed_at was 2026-11-04T13:06:39Z. The star count on November 10 is not evidence of a commit that morning."
  - question: "How many of the seven repositories are agent harnesses?"
    answer: "Three say so in the opening of the README read on November 10. DeepSeek Harness calls itself an open-source agent harness. Browser Harness says it lets Claude Code, Codex, or Cursor use the reader’s Chrome. OpenHarness says it delivers agent infrastructure, including tool use, skills, memory, and multi-agent coordination. Their stars sum to 312,679. Harness2 is a research repository whose README heading is Recursive Agent Harnessing for an Open World. The Harness CI repository and EleutherAI’s evaluation harness use the word for other software."
---

**277,506.** That is `stargazers_count` for `deepseek-ai/deepseek-harness` at 03:35:29 UTC on November 10, 2026.

The [November 5 framework snapshot](/reports/ai-agent-framework-github-stats-november-2026) is the page that already shows up for agent-framework stars. LangChain led those 19 libraries at 149,047. The [November 9 census](/research/how-many-github-stars-does-openclaw-have) answered a different question, which agent repository has the stars, and DeepSeek Harness was not in its eleven. This note counts the repository, then counts every other public repository whose name contains harness and whose star field was above 10,000.

## How many GitHub stars does DeepSeek Harness have?

277,506, in the repository response whose HTTP Date was Tue, 10 Nov 2026 03:35:29 GMT.

The same object listed 34,038 forks, `open_issues_count` 0, `has_issues` false, the SPDX id MIT, TypeScript as the primary language, and `created_at` 2026-08-13T11:56:32Z. The description was “DeepSeek Harness: Everything is a Plugin.” `pushed_at` was 2026-11-04T13:06:39Z. The default branch had last moved six days before this reading. Stars accumulated on a branch that was not receiving commits that morning.

A read at 03:33:16 GMT the same morning returned 277,505. The census figure is the later one. One star in about two minutes is the field behaving like a live counter. It is also the reason a rounded “about 277,000” on a leaderboard cannot be checked against this page without the clock.

`GET /repos/deepseek-ai/deepseek-harness/releases/latest` returned 404. That endpoint returns the newest release that is not a pre-release. The releases list, HTTP Date 03:36:01 GMT, started with tag `dsh-v0.2.2-rc.1`, name v0.2.2-rc.1, `published_at` 2026-11-04T13:07:14Z, `prerelease` true. The next four items on that page were pre-releases as well. This note did not page further. The [November 5 reading](/blog/what-is-an-ai-agent-harness) of the same endpoint also got a 404, and the same tag was the newest item that day. The tag has not moved. The star field has.

The README on `master`, read November 10, says DeepSeek Harness (`dsh`) is an open-source agent harness developed by DeepSeek AI, built on an everything-is-a-plugin architecture. It says the project is in developer preview and that compatibility-breaking changes are expected. The run line it prints is `npx @deepseek-ai/dsh web`. The license section points at MIT. A [harness](/glossary/harness), on this site, is the loop, tools, memory, permissions, and stop rules around a model. The README uses the word for this repository. This note did not install the package. The longer product description, including the November 5 release check, is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness).

Issues are turned off. `has_issues` false is why `open_issues_count` is 0. The README sends feedback to GitHub Discussions. A zero in the issue field is not a claim that the project has an empty bug list.

## Which repositories with harness in the name have more than 10,000 stars?

Seven. DeepSeek Harness is first. The seven star counts add up to 413,364.

The query was `harness in:name stars:>10000`, sorted by stars. At 03:35:44 GMT the search API returned `total_count` 7 and `incomplete_results` false, and the response included every result. Each star number below is the repository object, read a few seconds earlier. The search items carried the same seven numbers.

| Repository | Stars | Forks | License | Created | What the repository says |
| --- | --- | --- | --- | --- | --- |
| deepseek-ai/deepseek-harness | 277,506 | 34,038 | MIT | 2026-08-13 | README: an open-source agent harness. Description: “DeepSeek Harness: Everything is a Plugin.” |
| harness/harness | 38,872 | 3,457 | Apache-2.0 | 2014-02-07 | Description: an end-to-end developer platform with source control, CI/CD, hosted environments, and artifact registries. |
| walkinglabs/learn-harness-engineering | 24,078 | 2,769 | MIT | 2026-03-29 | Description: “Harness engineering beginner tutorial, from 0 to 1.” |
| google-research/harness2 | 23,302 | 2,336 | Apache-2.0 | 2026-10-06 | Description field empty. README heading: “Recursive Agent Harnessing for an Open World.” |
| browser-use/browser-harness | 18,981 | 1,878 | MIT | 2026-04-17 | README: lets Claude Code, Codex, or Cursor use your real Chrome. |
| HKUDS/OpenHarness | 16,192 | 2,609 | MIT | 2026-04-01 | README: lightweight agent infrastructure, with tool use, skills, memory, and multi-agent coordination. |
| EleutherAI/lm-evaluation-harness | 14,433 | 3,781 | MIT | 2020-08-28 | Description: “A framework for few-shot evaluation of language models.” |

277,506 + 38,872 + 24,078 + 23,302 + 18,981 + 16,192 + 14,433 = 413,364. That sum is a checksum on the rows. It is not a market size. The CI repository and the 2020 evaluation framework are in the sum because the query does not know what harness means.

Three READMEs describe an agent harness a person can run. DeepSeek Harness, Browser Harness, and OpenHarness. 277,506 + 18,981 + 16,192 = 312,679. Harness2 is the fourth repository whose own heading is about agent harnessing. It is research code. The README links a paper PDF at `https://arxiv.org/pdf/2610.14224`. This note did not read the paper, and the description field on the repository was null, so the heading is the evidence.

Browser Harness’s latest stable tag was `v0.1.13`, published 2026-09-04T02:52:52Z. `pushed_at` was 2026-11-10T00:08:24Z, so the branch had moved after that tag. OpenHarness’s latest stable tag was `v0.1.9`, published 2026-05-07T11:10:46Z, and `pushed_at` was 2026-06-04T02:42:40Z. Sixteen thousand stars on a branch that last moved in June is a reminder that the star field and the commit field answer different questions. The Harness CI repository’s latest tag was `v2.28.2`, published 2026-04-20T11:19:42Z. EleutherAI’s latest tag was `v0.4.13`, published 2026-08-31T20:42:30Z.

The tutorial row, `walkinglabs/learn-harness-engineering`, carries the topics `agent`, `harness`, `dsh`, and `dsh-plugin`. The description calls it a beginner tutorial. `releases/latest` returned 404. This note did not read the lessons. A tutorial about [harness engineering](/glossary/harness-engineering) is not the harness. The Thoughtworks account of the same phrase is [harness engineering at scale](/blog/what-is-harness-engineering-at-scale-thoughtworks-radar).

`harness/harness` has worn the name since February 7, 2014. Its description is a CI and source-control platform. Anyone who sorts GitHub by the word harness and stops at the second row has left agent software. `EleutherAI/lm-evaluation-harness` has worn the name since August 28, 2020. Its description is a framework for evaluating language models. An evaluation harness for models is a cousin of an [eval harness for agents](/blog/how-to-build-an-eval-harness-for-ai-agents), and it is a different repository from DeepSeek’s.

## Where does 277,506 sit next to the November 9 census?

Above Hermes Agent. Below OpenClaw. OpenClaw’s name does not contain harness, so OpenClaw was never going to appear in the seven.

The November 9 note finished at 07:41:51 UTC. This pass reread four of its repositories so the comparison is two clocks, not a mix of a leaderboard and an API.

| Repository | November 9, 07:41 UTC | November 10, this pass | Change |
| --- | --- | --- | --- |
| openclaw/openclaw | 394,222 | 394,260 | +38 |
| deepseek-ai/deepseek-harness | not in that set | 277,506 |  |
| NousResearch/hermes-agent | 261,856 | 262,109 | +253 |
| anthropics/claude-code | 155,043 | 155,109 | +66 |
| langchain-ai/langchain | 149,241 | 149,285 | +44 |

394,260 minus 277,506 is 116,754. OpenClaw still leads DeepSeek Harness by that many stars. 277,506 minus 262,109 is 15,397. DeepSeek Harness leads the Hermes Agent reading from this pass by that many. On November 9, Hermes Agent was second in a set that did not include DeepSeek Harness. Adding the missing repository changes second place.

Hermes Agent’s latest tag on this pass was `v0.23.1`, name “Hermes Agent v0.23.1,” published 2026-11-10T01:42:15Z. The November 9 note recorded `v0.23.0`, published November 5. Claude Code’s latest tag was `v2.1.322`, published 2026-11-10T02:29:43Z, the same timestamp as `pushed_at`. The November 9 note recorded `v2.1.319`, published November 6. The license field on Claude Code was null again. The November 9 note read `LICENSE.md` and found a copyright line, all rights reserved. This pass did not re-fetch that file. OpenClaw’s latest tag was still `v2026.11.2`, published 2026-11-08T19:31:04Z. LangChain’s latest tag was still `langchain-core==1.7.6`, published 2026-11-05T00:22:12Z.

LangChain’s November 5 figure was 149,047. 149,285 minus 149,047 is 238 stars in five days, on the repository that leads the framework table. DeepSeek Harness, absent from that table, had 128,221 more stars than LangChain on November 10. The framework page is a release table for libraries. The [install census](/blog/which-ai-agent-framework-do-people-install) is the download table for those libraries. Neither number is a star count for `dsh`. The daily star field for the paired framework repositories is the [stars tracker](/trackers/stars).

## What did the name filter leave out?

`affaan-m/ECC` had 300,291 stars at 03:35:35 GMT. That is 22,785 more than DeepSeek Harness. The name is ECC, so `harness in:name` did not return it.

The description field was “The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.” The README endpoint the same morning uses the image alt text “ECC - the agent harness operating system.” The latest tag was `v2.2.3`, published 2026-10-01T23:00:36Z. The license field was MIT. This note did not install the repository and does not decide whether it is a harness you run or a pack of skills for other harnesses. The description is the description. The star field is the star field. Both are outside the seven because the query was about the name.

A separate search the same morning, `topic:mcp-server` sorted by stars, returned `ruvnet/ruflo` at 81,376 stars. Its description begins “The original agent harness.” The name is ruflo. It is also outside the seven. The topic total from that search is the subject of [MCP server meaning: 42,072 repos carry the tag](/blog/mcp-server-meaning-42072-github-repos). This note uses the one row as a boundary on the name filter, not as an MCP census.

The [harness comparison](/best/ai-agent-harnesses) on this site is a licence and list-price table. It is not a star ranking. DeepSeek Harness at 277,506 stars does not, by itself, move a row on that page. A bookmark count does not say whether `npx @deepseek-ai/dsh web` finishes a task.
