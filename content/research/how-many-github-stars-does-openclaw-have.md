---
title: "How Many GitHub Stars Does OpenClaw Have? 394,222 on November 9, 2026"
description: "394,222 stars on openclaw/openclaw at 07:41 UTC on November 9, 2026. Hermes Agent had 261,856. Claude Code had 155,043, and its LICENSE.md reserves all rights."
date: "2026-11-09"
updated: "2026-11-09"
type: original-report
topics:
  - harnesses
  - how-agents-work
  - tools-saas
  - research
companies:
  - github
  - anthropic
  - openai
  - google
  - claude-code
  - codex
  - langchain
contentLicense: true
dataset:
  title: "GitHub star census for 11 agent repositories, November 9, 2026"
  description: "Repository and latest-release fields for openclaw/openclaw, NousResearch/hermes-agent, anthropics/claude-code, langchain-ai/langchain, openai/codex, browser-use/browser-use, google-gemini/gemini-cli, OpenHands/OpenHands, cline/cline, block/goose, and Aider-AI/aider. The pass finished at 2026-11-09T07:41:51Z. OpenClaw returned 394,222 stars. A later search the same morning split open issues and open pull requests for OpenClaw, Hermes Agent, and Claude Code."
  isBasedOn: "https://api.github.com/repos/openclaw/openclaw"
abstract: |
  OpenClaw had 394,222 GitHub stars when AI Agents Info finished a pass over the public repository API at 07:41:51 UTC on November 9, 2026. Hermes Agent had 261,856. Claude Code had 155,043. LangChain, the most-starred row in this site’s November 5 framework snapshot at 149,047, had 149,241 on this later pull.

  The set is eleven repositories: ten whose own description or README calls the project an agent a person runs, and LangChain as the framework comparison. OpenClaw led the eleven by 132,366 stars over Hermes Agent. Claude Code was third on stars, and the license file in that repository is a copyright notice, not an SPDX license. This note was published November 9, 2026.
whyItMatters: |
  The page that already earns impressions for “AI agent framework” stars is the November 5 release snapshot. It answers a library question. LangChain led those 19 repositories at 149,047 stars. People who search the broader question, which agent repository has the stars, land on leaderboards that round OpenClaw to about 394,000 and mix in skill packs, crawlers, and prompt dumps. Those pages disagree with each other by thousands of stars, and they rarely print the minute of the API call.

  A star count is a popularity signal. It is not a quality rank. The November 9 note on Garry Tan’s harness evals is the cost question for some of these same names: on that public task set, OpenClaw on Opus 5.5 cost more per solved task than Claude Code. This page does not reuse those scores. It records the star field, the license field, and the latest release, from one pass.
keyFindings:
  - "openclaw/openclaw returned 394,222 stars, 82,839 forks, and open_issues_count 8,006. GitHub’s license field was MIT. created_at was 2025-11-24T10:16:47Z. The latest release was v2026.11.2, published 2026-11-08T19:31:04Z. pushed_at was 2026-11-09T07:41:03Z, 48 seconds before the pass finished."
  - "NousResearch/hermes-agent returned 261,856 stars and open_issues_count 53,817. A search later the same morning counted 18,965 open issues and 34,850 open pull requests, two short of 53,817. The license field was MIT. The latest release was v0.23.0, published November 5, 2026."
  - "anthropics/claude-code returned 155,043 stars. The license endpoint returned 404, and LICENSE.md on main is a copyright line: all rights reserved, use subject to Anthropic’s commercial terms. The latest release was v2.1.319, published November 6, 2026."
  - "langchain-ai/langchain returned 149,241 stars, 194 more than the 149,047 in the November 5 snapshot. OpenClaw’s count was 244,981 higher than LangChain’s on this pull. The latest LangChain tag was langchain-core==1.7.6, published November 5, 2026."
  - "Five coding-agent repositories recounted from the November 8 brief moved by these star deltas: openai/codex +403 to 134,025, OpenHands/OpenHands +72 to 92,999, cline/cline +22 to 71,479, google-gemini/gemini-cli +19 to 108,797, and Aider-AI/aider +9 to 50,028. This pull’s latest Aider tag was v0.86.0, published August 9, 2025. The November 8 brief recorded no tag."
methodology: |
  The source is the public GitHub REST API. One pass requested GET https://api.github.com/repos/{owner}/{repo} and GET https://api.github.com/repos/{owner}/{repo}/releases/latest for eleven repositories. The pass finished at 2026-11-09T07:41:51Z. Stars are stargazers_count. Forks are forks_count. The issue column in the main table is open_issues_count, which counts open pull requests as well as open issues. The license column is the SPDX id in the license object. A null license object is reported as no SPDX id, and the LICENSE.md file was then fetched for anthropics/claude-code.

  The eleven repositories are openclaw/openclaw, NousResearch/hermes-agent, anthropics/claude-code, openai/codex, google-gemini/gemini-cli, OpenHands/OpenHands, cline/cline, Aider-AI/aider, browser-use/browser-use, block/goose, and langchain-ai/langchain. The first ten are included because the repository description or the README, read the same day, calls the project an agent a person runs: a personal assistant, a coding agent, or a browser agent. LangChain is included as the comparison row from the November 5 framework snapshot on this site, where it was the most-starred of 19 libraries. Its description on this pull was “The agent engineering platform.” The pass did not search GitHub for every repository tagged as an agent.

  A second request, later on November 9, 2026, used the search API for open issues and open pull requests on OpenClaw, Hermes Agent, and Claude Code. Those three are the rows where a raw open_issues_count is easy to misread. The search index is not the same response as the repository object. For OpenClaw and Claude Code the two search totals added up to open_issues_count. For Hermes Agent they added up to 53,815, two under the field’s 53,817.

  README lines quoted below were fetched from raw.githubusercontent.com the same morning, from the default branch. The OpenClaw description quoted in the note is the description field with the trailing emoji removed. Other descriptions quoted in the note are the field as returned. Release tags are tag_name. Codex’s release name was “0.167.0” and its tag was rust-v0.167.0. Both are from that release object.
limitations:
  - "The eleven repositories are a defined set, not a ranking of every agent project on GitHub. A repository outside the set can have more stars. This page did not copy counts from topic leaderboards."
  - "Stars are an account’s bookmark. They are not unique people, not a quality score, and not a measure of who runs the software. The harness-eval note linked below is a cost comparison on one task set. These tables do not extend it."
  - "open_issues_count includes open pull requests. The search split was a later request, and only for three repositories. Hermes Agent’s two search totals were 53,815 against a field of 53,817."
  - "A latest-release tag in a monorepo can name one package. LangChain’s tag was langchain-core==1.7.6. Codex’s tag was rust-v0.167.0."
  - "Claude Code’s license field was empty and the license API returned 404. The conclusion that the repository is not under an SPDX open-source license comes from LICENSE.md, which reserves all rights and points at Anthropic’s commercial terms. This page did not restate those terms."
  - "Browser Use’s description calls it a Python library and a hosted agent API. It is in the table because that description names browser agents. It is a different kind of project from OpenClaw’s assistant."
  - "created_at is GitHub’s timestamp for the repository record. It is not a founding date this page checked against a company filing, and it is not a series of daily star counts. No stars-per-day rate is computed here."
  - "The November 8 coding-agent brief recorded no release tag for Aider-AI/aider. This pull received v0.86.0. The two readings are both dated. This page does not know why the earlier call came back empty."
references:
  - title: "GitHub REST API, openclaw/openclaw, pass finished 2026-11-09T07:41:51Z"
    url: "https://api.github.com/repos/openclaw/openclaw"
    note: "394,222 stars. Latest release v2026.11.2 from the releases/latest call in the same pass."
  - title: "OpenClaw README on main"
    url: "https://github.com/openclaw/openclaw/blob/main/README.md"
    note: "Read November 9, 2026. Describes an open-source assistant that runs on the user’s computer."
  - title: "GitHub REST API, NousResearch/hermes-agent, same pass"
    url: "https://api.github.com/repos/NousResearch/hermes-agent"
  - title: "Hermes Agent README on main"
    url: "https://github.com/NousResearch/hermes-agent/blob/main/README.md"
    note: "Read November 9, 2026."
  - title: "GitHub REST API, anthropics/claude-code, same pass"
    url: "https://api.github.com/repos/anthropics/claude-code"
  - title: "Claude Code LICENSE.md on main"
    url: "https://github.com/anthropics/claude-code/blob/main/LICENSE.md"
    note: "The file reserves all rights and points at Anthropic’s commercial terms. The license API route returned 404."
  - title: "GitHub REST API, openai/codex, same pass"
    url: "https://api.github.com/repos/openai/codex"
  - title: "GitHub REST API, google-gemini/gemini-cli, same pass"
    url: "https://api.github.com/repos/google-gemini/gemini-cli"
  - title: "GitHub REST API, OpenHands/OpenHands, same pass"
    url: "https://api.github.com/repos/OpenHands/OpenHands"
  - title: "GitHub REST API, cline/cline, same pass"
    url: "https://api.github.com/repos/cline/cline"
  - title: "GitHub REST API, Aider-AI/aider, same pass"
    url: "https://api.github.com/repos/Aider-AI/aider"
  - title: "GitHub REST API, browser-use/browser-use, same pass"
    url: "https://api.github.com/repos/browser-use/browser-use"
  - title: "GitHub REST API, block/goose, same pass"
    url: "https://api.github.com/repos/block/goose"
  - title: "GitHub REST API, langchain-ai/langchain, same pass"
    url: "https://api.github.com/repos/langchain-ai/langchain"
  - title: "AI Agents Info, AI agent framework release, November 2026"
    url: "https://www.aiagentsinfo.com/reports/ai-agent-framework-github-stats-november-2026"
    note: "Snapshot pulled November 5, 2026. LangChain 149,047 stars. A different set of 19 libraries."
  - title: "AI Agents Info, AI coding agents, 8 Nov to 8 Dec 2026"
    url: "https://www.aiagentsinfo.com/reports/ai-coding-agents-next-30-days"
    note: "Star fields for five of these repositories, read November 8, 2026."
citation:
  apa: "AI Agents Info. (2026, November 9). How many GitHub stars does OpenClaw have? https://www.aiagentsinfo.com/research/how-many-github-stars-does-openclaw-have"
  bibtex: |
    @misc{aiagentsinfo2026openclawStars,
      title={How many GitHub stars does OpenClaw have?},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/how-many-github-stars-does-openclaw-have},
      note={GitHub REST readings finished 2026-11-09T07:41:51Z}
    }
faq:
  - question: "How many GitHub stars does OpenClaw have?"
    answer: "394,222. That is stargazers_count for openclaw/openclaw at the end of a GitHub API pass at 07:41:51 UTC on November 9, 2026. The license field was MIT. The latest release was v2026.11.2, published November 8, 2026."
  - question: "Does OpenClaw have more stars than Hermes Agent and Claude Code?"
    answer: "In this pull, yes. Hermes Agent had 261,856, which is 132,366 fewer. Claude Code had 155,043, which is 239,179 fewer. The set is eleven repositories, not every agent project on GitHub."
  - question: "Is Claude Code open source?"
    answer: "Not under a license GitHub could name. The license API returned 404, and LICENSE.md on main says all rights are reserved and use is subject to Anthropic’s commercial terms. The repository is public. Public is not the same as an open-source license. OpenClaw, Hermes Agent, Codex, and Gemini CLI did return SPDX ids: MIT, MIT, Apache-2.0, and Apache-2.0."
  - question: "How does this compare with LangChain’s star count?"
    answer: "LangChain had 149,241 stars on this pull, 194 more than the 149,047 in the November 5 framework snapshot. OpenClaw’s count was 244,981 higher. The November 5 page is a release table for 19 libraries. This page adds the agent repositories that table left out."
  - question: "Why is Hermes Agent’s issue count so high?"
    answer: "open_issues_count was 53,817, and that field includes pull requests. A search later the same morning counted 18,965 open issues and 34,850 open pull requests. Those two totals are 53,815, two under the repository field. Most of the headline number is pull requests."
---

OpenClaw had **394,222** GitHub stars at the end of an API pass at 07:41:51 UTC on November 9, 2026. Hermes Agent had **261,856**. Claude Code had **155,043**, and the license file in that repository reserves all rights.

AI Agents Info pulled eleven repositories in that pass. Ten are projects whose own text calls them an agent a person runs. The eleventh, LangChain, is the library that led this site’s [November 5 framework snapshot](/reports/ai-agent-framework-github-stats-november-2026) at 149,047 stars. On this pull LangChain had 149,241. The framework page is a release table. It earns the impression for “agent framework” stars and does not answer how many stars OpenClaw has. This note answers that, and it prints the clock.

## How many GitHub stars does OpenClaw have?

394,222, in the repository response for openclaw/openclaw when the pass finished at 07:41:51 UTC.

The same object listed 82,839 forks, `open_issues_count` 8,006, the SPDX id MIT, TypeScript as the primary language, and `created_at` 2025-11-24T10:16:47Z. That timestamp is 349 days and about 21 hours before the pass finished. The homepage field was `https://openclaw.ai`. The description, with the trailing emoji removed, was “The AI that really does things. Any OS. Any Platform. The lobster way.” The latest release was tag `v2026.11.2`, name “openclaw 2026.11.2,” published 2026-11-08T19:31:04Z. `pushed_at` was 2026-11-09T07:41:03Z, forty-eight seconds before the pass finished, so the branch was moving while the count was being taken. The star field is the field from that response. It is not a promise about the next minute.

The README on `main`, fetched the same morning, says OpenClaw is an open-source AI assistant that runs on your own computer and meets you in the channels you already use. It names Discord, iMessage, Slack, Teams, Telegram, WhatsApp, and others, plus native apps. It says state, memory, and credentials live on your hardware, and that models and agent harnesses are plugins. A [harness](/glossary/harness), on this site, is the loop, tools, memory, permissions, and stop rules around a model. The README’s claim that OpenClaw has no paid tier is the README’s claim. This note did not audit a billing page.

| Repository | Stars | Forks | open_issues_count | Licence field | Created | Latest release | Published | Last push |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| openclaw/openclaw | 394,222 | 82,839 | 8,006 | MIT | Nov 24, 2025 | v2026.11.2 | Nov 8, 2026 | Nov 9, 2026 |
| NousResearch/hermes-agent | 261,856 | 58,267 | 53,817 | MIT | Jul 22, 2025 | v0.23.0 | Nov 5, 2026 | Nov 9, 2026 |
| anthropics/claude-code | 155,043 | 25,345 | 16,907 | No SPDX id | Feb 22, 2025 | v2.1.319 | Nov 6, 2026 | Nov 6, 2026 |
| langchain-ai/langchain | 149,241 | 25,099 | 729 | MIT | Oct 17, 2022 | langchain-core==1.7.6 | Nov 5, 2026 | Nov 9, 2026 |
| openai/codex | 134,025 | 21,231 | 26,901 | Apache-2.0 | Apr 13, 2025 | rust-v0.167.0 | Nov 6, 2026 | Nov 9, 2026 |
| browser-use/browser-use | 120,380 | 13,448 | 626 | MIT | Oct 31, 2024 | 0.13.14 | Oct 26, 2026 | Nov 9, 2026 |
| google-gemini/gemini-cli | 108,797 | 14,932 | 737 | Apache-2.0 | Apr 17, 2025 | v0.67.0 | Nov 4, 2026 | Nov 9, 2026 |
| OpenHands/OpenHands | 92,999 | 12,425 | 1,172 | MIT | Mar 13, 2024 | v1.37.0 | Nov 6, 2026 | Nov 9, 2026 |
| cline/cline | 71,479 | 7,897 | 1,752 | Apache-2.0 | Jul 6, 2024 | v4.1.26 | Oct 26, 2026 | Nov 9, 2026 |
| block/goose | 56,382 | 6,569 | 570 | Apache-2.0 | Aug 23, 2024 | v1.57.0 | Oct 28, 2026 | Nov 9, 2026 |
| Aider-AI/aider | 50,028 | 5,145 | 1,959 | Apache-2.0 | May 9, 2023 | v0.86.0 | Aug 9, 2025 | May 22, 2026 |

The eleven star fields sum to 1,594,452. Without LangChain, the ten agent repositories sum to 1,445,211. Without LangChain and without Claude Code, the nine repositories that returned an SPDX id sum to 1,290,168. Those sums are arithmetic on one pass. They are not a market size.

## How many stars does Hermes Agent have, and what is the gap?

261,856. OpenClaw’s lead on that number is 132,366 stars.

Hermes Agent’s repository object listed 58,267 forks, `open_issues_count` 53,817, the SPDX id MIT, Python, and `created_at` 2025-07-22T22:22:28Z. That timestamp is 474 days and about 9 hours before the pass, so the repository record is older than OpenClaw’s and the star field is smaller. The description was “The agent that grows with you.” The homepage was `https://hermes-agent.nousresearch.com`. The latest release was tag `v0.23.0`, name “Hermes Agent v0.23.0 — The Hearth Release,” published 2026-11-05T21:32:33Z. `pushed_at` was 2026-11-09T07:40:08Z.

The README calls it the self-improving AI agent built by Nous Research, and says it runs from Telegram, Discord, Slack, WhatsApp, Signal, and a terminal, through one gateway process. The cost of running it is not in the star field. A separate November 9 note, [Garry Tan’s harness evals](/research/garry-tan-harness-evals-november-2026), put a pinned Hermes Agent and a pinned OpenClaw on the same public tasks. On Opus 5.5 in that matrix, OpenClaw cost $0.4435 per solved task and Hermes cost $0.2434. Those are that report’s figures. They are not restated here as a new measurement, and they used older pins than the release tags in the table above. OpenClaw’s pin in that matrix was 2026.10.6. The tag on this pull was v2026.11.2.

## Is Claude Code open source?

The repository is public. The license file does not grant an open-source license.

`anthropics/claude-code` returned 155,043 stars, 25,345 forks, and `open_issues_count` 16,907. The license object was null. A request to the repository license route returned 404. `LICENSE.md` on `main` is two lines. It says “© Anthropic PBC. All rights reserved.” The second sentence says use is subject to Anthropic’s [commercial terms](https://www.anthropic.com/legal/commercial-terms). This note did not parse those terms. It records what the file says.

The description field calls Claude Code an agentic coding tool that lives in the terminal. The homepage was `https://code.claude.com/docs/en/overview`. `created_at` was 2025-02-22T17:41:21Z. The latest release was `v2.1.319`, published 2026-11-06T17:04:01Z, and `pushed_at` was the same second. The product page on this site is [Claude Code](/directory/claude-code). A star rank that files this repository under “open source” is filing it by the fact that the code can be read, not by the license GitHub returned.

OpenClaw’s lead over Claude Code is 239,179 stars. That gap is a pair of counts. It is not a verdict on which coding agent to install. Price and limits for Claude Code and Codex are on [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing) and on the [November 9 coding-agent comparison](/best/ai-coding-agents).

The other SPDX ids in the table were MIT or Apache-2.0. Codex’s description was “Lightweight coding agent that runs in your terminal,” license Apache-2.0, 134,025 stars, latest tag `rust-v0.167.0` with release name “0.167.0,” published November 6, 2026. Gemini CLI’s description was “An open-source AI agent that brings the power of Gemini directly into your terminal,” Apache-2.0, 108,797 stars, tag `v0.67.0`, published November 4. OpenHands, Cline, goose, Aider, and Browser Use returned MIT or Apache-2.0 as in the table. Browser Use’s description calls it an open-source Python library for AI browser agents, plus a hosted agent API. The glossary entry is [browser use](/glossary/browser-use). The 120,380 stars are on a library-and-service repository, which is why the row is labeled by its description and not folded into OpenClaw’s “assistant on your own computer.”

## Where does LangChain’s count sit now?

At 149,241 stars, 194 above the November 5 snapshot, and 244,981 below OpenClaw on this pull.

The [framework release report](/reports/ai-agent-framework-github-stats-november-2026) copied 19 libraries and SDKs on November 5, 2026, and LangChain led them at 149,047. That page is the one in this site’s impressions for framework GitHub stats. Its title is a release table. A person who wanted the largest star count on an agent they can run does not get OpenClaw from it, because OpenClaw was not in the 19. 394,222 divided by 149,241 is 2.64, to two decimal places. The cleaner pair is the subtraction: 244,981 more stars on OpenClaw than on LangChain, same pass.

LangChain’s description on this pull was “The agent engineering platform.” The latest tag was `langchain-core==1.7.6`, published 2026-11-05T00:22:12Z. In a monorepo, `/releases/latest` can name one package. This tag names langchain-core. The [November 9 framework comparison](/best/ai-agent-frameworks) reads licenses and release tags for those 19 again, including this repository. It does not include OpenClaw or Hermes Agent. The directory listing is [LangChain](/directory/langchain).

Five of the coding-agent rows were already counted on November 8 for the [30-day coding-agent brief](/reports/ai-coding-agents-next-30-days). That brief’s question is price and the dates official pages have set through December 8. The star fields moved anyway:

| Repository | Stars on Nov 8 | Stars on this pull | Change |
| --- | --- | --- | --- |
| openai/codex | 133,622 | 134,025 | +403 |
| OpenHands/OpenHands | 92,927 | 92,999 | +72 |
| cline/cline | 71,457 | 71,479 | +22 |
| google-gemini/gemini-cli | 108,778 | 108,797 | +19 |
| Aider-AI/aider | 50,019 | 50,028 | +9 |

The November 8 brief recorded no release tag for Aider. This pull’s `/releases/latest` call returned `v0.86.0`, published 2025-08-09T17:42:19Z. Aider’s `pushed_at` was still 2026-05-22T14:02:20Z, the same push time the brief recorded. The tag and the empty earlier call are both part of the record. Goose was not in that brief. On this pull `block/goose` had 56,382 stars, Apache-2.0, and release `v1.57.0`, published October 28, 2026. Its description calls it “an open source, extensible AI agent that goes beyond code suggestions.”

## What does the open-issue number count?

It counts open issues and open pull requests together. Hermes Agent’s 53,817 is mostly pull requests.

A search later the same morning asked for open issues and open pull requests separately. The repository field and the search totals are different requests. For two of the three, they matched.

| Repository | open_issues_count | Open issues | Open pull requests | Sum of the search |
| --- | --- | --- | --- | --- |
| openclaw/openclaw | 8,006 | 4,819 | 3,187 | 8,006 |
| NousResearch/hermes-agent | 53,817 | 18,965 | 34,850 | 53,815 |
| anthropics/claude-code | 16,907 | 16,266 | 641 | 16,907 |

4,819 plus 3,187 is 8,006. 16,266 plus 641 is 16,907. 18,965 plus 34,850 is 53,815, which is two under 53,817. The miss of two is left as a miss. It is small next to the split that matters: about two thirds of Hermes Agent’s headline issue count, on this search, was pull requests. Codex’s `open_issues_count` of 26,901 was not split. Read it as the combined field.

OpenClaw’s combined field, 8,006, is the one that matched the search exactly. 4,819 open issues on a repository with 394,222 stars is a different shape from Hermes Agent’s 18,965 open issues and 34,850 open pull requests on 261,856 stars. Neither shape is a defect rate. Issues can be questions, and pull requests can be one-line typos.

## What should a star table be used for?

Use it to see which repository accounts have bookmarked, on a dated pull, and read the license field before calling the repository open source.

The sentence the API supports: at 07:41 UTC on November 9, 2026, OpenClaw had 394,222 stars, Hermes Agent 261,856, Claude Code 155,043, and LangChain 149,241, and Claude Code’s `LICENSE.md` reserved all rights while OpenClaw and Hermes Agent returned MIT.

The sentence the API does not support: OpenClaw is the most-starred agent on GitHub, or the one a team should install, or a better harness than Claude Code. The set stops at eleven repositories. Leaderboards that add other names are answering a wider list, and this note does not import their numbers. Quality, for a harness, is a test of one action and then of the whole job. That method is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness). The pages that already collect harness notes are on the [agent harnesses hub](/topics/harnesses).

Maintenance is a separate fact from stars, and it can run the other way. The same API pass that produced this table also read `microsoft/autogen` at 61,753 stars with `archived` false, while that repository’s README says Microsoft is not providing fixes. The write-up is [Is AutoGen deprecated?](/blog/is-autogen-deprecated). AutoGen was inside the November 5 library set. It is not one of the eleven rows above.
