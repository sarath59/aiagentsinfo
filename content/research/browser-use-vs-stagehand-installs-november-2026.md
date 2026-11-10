---
title: "Browser Use Had 6,423,201 PyPI Downloads. Stagehand Had 8,582,033 on npm."
description: "From October 10 through November 8, 2026, browser-use was downloaded 6,423,201 times on PyPI without mirrors. stagehand had 1,909,034. The npm package @browserbasehq/stagehand had 8,582,033 in the same window."
date: "2026-11-10"
updated: "2026-11-10"
type: original-report
topics:
  - research
  - tools-saas
  - task-performance
  - how-agents-work
contentLicense: true
absoluteTitle: true
codeUrl: "https://github.com/browser-use/browser-use"
dataset:
  title: "PyPI and npm downloads for browser-agent libraries, October 10 to November 8, 2026"
  description: "Sums of the pypistats overall endpoint, category without_mirrors, for browser-use, stagehand, skyvern, and notte, from 2026-10-10 through 2026-11-08 inclusive. The largest PyPI total is browser-use at 6,423,201. Responses carried HTTP Date Tue, 10 Nov 2026 13:40:30 GMT and 13:40:31 GMT. November 9 is outside that window. GitHub stargazers_count was read at 13:39:44 GMT for browser-use/browser-use (120,535), 13:39:45 GMT for browserbase/stagehand (25,992) and Skyvern-AI/skyvern (23,378), and 13:42:08 GMT for nottelabs/notte (2,059). npm point totals for the same calendar window were read at 13:40:32 GMT and 13:40:33 GMT. @browserbasehq/stagehand had 8,582,033. A download is a file request, not a user."
  isBasedOn: "https://pypistats.org/api/packages/browser-use/overall?mirrors=false"
abstract: |
  browser-use was downloaded 6,423,201 times on PyPI from October 10 through November 8, 2026, in the without_mirrors series. stagehand had 1,909,034 downloads in the same window. Browser Use’s Python total was 3.36 times Stagehand’s.

  The npm registry reverses the pair. @browserbasehq/stagehand had 8,582,033 downloads over those dates, which is 1.34 times the PyPI total for browser-use. The npm package named browser-use is a different project. It had 8,969 downloads. Skyvern had 23,378 GitHub stars on the morning of November 10 and 6,386 PyPI downloads in the window.
whyItMatters: |
  Public Browser Use-versus-Stagehand pages rank the two by a weekly download number and a star number, and the weekly numbers disagree with each other about who leads. They round, and they do not say which registry the week came from. On this pass the Python install leader is Browser Use and the JavaScript install leader is Stagehand. Adding the two Stagehand totals, or treating the npm name browser-use as the Python library, produces a third ranking that is not an install count.

  Stars point the same way as PyPI and hide the size of the gap. browser-use/browser-use had 120,535 stars. browserbase/stagehand had 25,992. Skyvern had 23,378 stars, close to Stagehand, and 6,386 downloads, close to neither. The November 5 framework snapshot and the November 9 install census do not include these repositories. The six-month browser-agent brief is a product calendar, not a download table.
keyFindings:
  - "browser-use had 6,423,201 PyPI downloads without mirrors from October 10 through November 8, 2026. stagehand had 1,909,034. The ratio is 3.36. The gap is 4,514,167. pypistats responses carried HTTP Date Tue, 10 Nov 2026 13:40:30 GMT."
  - "@browserbasehq/stagehand had 8,582,033 npm downloads in the same window, read at 13:40:32 GMT. That is 4.50 times the PyPI stagehand total and 1.34 times the PyPI browser-use total. The npm package browser-use, repository webllm/browser-use, had 8,969."
  - "At 13:39:44 GMT on November 10, browser-use/browser-use had 120,535 stars. browserbase/stagehand had 25,992 at 13:39:45 GMT. Skyvern-AI/skyvern had 23,378 at the same minute and 6,386 PyPI downloads in the window, so the star count was 3.66 times the 30-day download count."
  - "PyPI’s latest browser-use at 13:41:05 GMT was 1.0.0, uploaded 2026-11-10T02:34:13Z. GitHub had already published tag 1.0.1 at 2026-11-10T09:27:28Z. The 1.0.1 file was absent from the PyPI releases map at 13:41:05 GMT. The 30-day window ends November 8, before either 1.0 upload."
  - "notte had 4,041 PyPI downloads in the window. Its summary calls it browser infrastructure, and its license expression is SSPL-1.0. It is in the table and out of the agent-library rank."
methodology: |
  The download source is pypistats, unauthenticated, endpoint https://pypistats.org/api/packages/{name}/overall?mirrors=false. Each 30-day total is the sum of daily rows whose category is without_mirrors and whose date is from 2026-10-10 through 2026-11-08 inclusive. browser-use and stagehand responses carried HTTP Date Tue, 10 Nov 2026 13:40:30 GMT. skyvern and notte carried 13:40:31 GMT. Each series ran through 2026-11-09. November 10 was not in the file. November 9 is reported as its own day and inside a second 30-day window, October 11 through November 9, and it is not inside the headline total.

  The four Python distributions were chosen after their PyPI summaries were read and before the sums were added. browser-use’s summary is “Browser agent on Pydantic AI: one persistent Python REPL on raw CDP, cloud or local Chrome.” stagehand’s summary is “Browserbase's SDK for building browser agents.” skyvern’s summary field was empty; the description opens with “Automate Browser-based workflows using LLMs and Computer Vision” and links to github.com/Skyvern-AI/skyvern. notte’s summary is “Notte: browser infrastructure for AI agents and web automation.” The PyPI name steel was checked and excluded. Its summary is a Python framework for binary file formats, version 0.5, uploaded 2025-09-05. It is not Steel Browser.

  Versions and upload times come from the PyPI JSON document, HTTP Date Tue, 10 Nov 2026 13:40:17 GMT, with a second read of browser-use at 13:41:05 GMT that confirmed version 1.0.1 was not in the releases map. Stars, forks, open issues, license SPDX ids, and pushed_at come from the GitHub repository API, Accept application/vnd.github+json, X-GitHub-Api-Version 2022-11-28. browser-use/browser-use was read at 13:39:44 GMT. browserbase/stagehand and Skyvern-AI/skyvern were read at 13:39:45 GMT. nottelabs/notte was read at 13:42:08 GMT. GitHub releases for browser-use were read at 13:39:52 GMT.

  npm figures are the downloads point API for 2026-10-10:2026-11-08. @browserbasehq/stagehand and the unscoped name browser-use were read at 13:40:32 GMT. steel-sdk, agent-browser, and @browserbasehq/sdk were read at 13:40:33 GMT. Package versions come from the npm registry at 13:40:17 GMT and 13:40:18 GMT. The langchain comparison uses the total already printed in this site’s November 9 install census. This note did not re-sum langchain.
limitations:
  - "The four Python distributions are a named set, not every package whose summary contains the word browser. A library this pass did not query is absent. The PyPI name steel was checked and excluded because it is a binary-format library."
  - "A download is a file request. CI, a mirror the filter still misses, and one project installing a dependency all increment it. browser-use 1.0.0 describes itself as an agent on Pydantic AI. Downloads of pydantic-ai are not inside the 6,423,201."
  - "PyPI and npm are different registries. Adding 1,909,034 to 8,582,033 does not produce a Stagehand user count. The same person, or the same CI job, can request both."
  - "The npm package browser-use is not browser-use/browser-use. Its registry repository field points at github.com/webllm/browser-use, version 0.9.0, published 2026-10-08T18:15:47.367Z. Its 8,969 downloads are not a JavaScript edition of the 6,423,201."
  - "@browserbasehq/sdk, agent-browser, and steel-sdk are in the exclusion table because their totals are large enough to be mistaken for the libraries in the rank. They are a hosted-browser client, a CLI, and a Steel API client."
  - "November 9 is higher than November 8 for browser-use and stagehand. browser-use 1.0.0rc5 was uploaded 2026-11-09T23:42:06Z, which cannot account for a full calendar day of downloads. This note does not explain the jump. The headline window ends November 8 so the jump cannot inflate it."
  - "Stars are an account’s bookmark. They are not unique people and not a quality rank. Skyvern’s 23,378 stars against 6,386 downloads is the case a star sort gets wrong."
  - "notte’s GitHub license field was NOASSERTION at 13:42:08 GMT. The SSPL-1.0 label is the PyPI license_expression, not a GitHub detection. The star count and the download count were read at different minutes."
  - "The langchain multiple, 24.27, divides a total published on November 9 by the browser-use total measured on November 10. Both windows are October 10 through November 8, and both use without_mirrors. The earlier total was not re-downloaded."
  - "GitHub tag 1.0.1 existed at 13:39:52 GMT and was missing from PyPI at 13:41:05 GMT. This note does not know whether a publish was in flight. The 30-day totals do not include November 10."
references:
  - title: "pypistats overall, mirrors=false, browser-use"
    url: "https://pypistats.org/api/packages/browser-use/overall?mirrors=false"
    note: "without_mirrors sum 6,423,201 for 2026-10-10 through 2026-11-08. November 9 was 304,218. HTTP Date Tue, 10 Nov 2026 13:40:30 GMT."
  - title: "pypistats overall, mirrors=false, stagehand"
    url: "https://pypistats.org/api/packages/stagehand/overall?mirrors=false"
    note: "1,909,034 in the same 30 days. November 9 was 56,303. Same minute as browser-use."
  - title: "pypistats overall, mirrors=false, skyvern and notte"
    url: "https://pypistats.org/api/packages/skyvern/overall?mirrors=false"
    note: "skyvern 6,386. notte 4,041. HTTP Date 13:40:31 GMT."
  - title: "PyPI JSON, browser-use 1.0.0"
    url: "https://pypi.org/pypi/browser-use/json"
    note: "Uploaded 2026-11-10T02:34:13Z. Requires Python <4.0,>=3.11. License MIT. 1.0.1 absent at HTTP Date 13:41:05 GMT."
  - title: "PyPI JSON, stagehand 4.4.0 and skyvern 1.0.57"
    url: "https://pypi.org/pypi/stagehand/json"
    note: "stagehand uploaded 2026-11-04T17:06:39Z, license MIT, requires >=3.11. skyvern uploaded 2026-11-06T21:43:49Z, requires <3.15,>=3.11. HTTP Date 13:40:17 GMT."
  - title: "GitHub REST API, browser-use/browser-use"
    url: "https://api.github.com/repos/browser-use/browser-use"
    note: "120,535 stars, MIT, pushed_at 2026-11-10T09:29:07Z. HTTP Date 13:39:44 GMT. Release 1.0.1 published 2026-11-10T09:27:28Z."
  - title: "GitHub REST API, browserbase/stagehand and Skyvern-AI/skyvern"
    url: "https://api.github.com/repos/browserbase/stagehand"
    note: "25,992 stars, MIT, at 13:39:45 GMT. skyvern 23,378 stars, AGPL-3.0, same minute. The PyPI description also says AGPL-3.0."
  - title: "npm downloads point API, 2026-10-10:2026-11-08"
    url: "https://api.npmjs.org/downloads/point/2026-10-10:2026-11-08/@browserbasehq/stagehand"
    note: "@browserbasehq/stagehand 8,582,033 at 13:40:32 GMT. browser-use 8,969. agent-browser 8,357,760, @browserbasehq/sdk 10,053,702, and steel-sdk 341,945 at 13:40:33 GMT."
  - title: "AI Agents Info, which framework people install, November 9, 2026"
    url: "https://www.aiagentsinfo.com/blog/which-ai-agent-framework-do-people-install"
    note: "langchain 155,918,257 PyPI downloads, same dates, without_mirrors."
citation:
  apa: "AI Agents Info. (2026, November 10). Browser Use had 6,423,201 PyPI downloads. Stagehand had 8,582,033 on npm. https://www.aiagentsinfo.com/research/browser-use-vs-stagehand-installs-november-2026"
  bibtex: |
    @misc{aiagentsinfo2026browserAgentInstalls,
      title={Browser Use Had 6,423,201 PyPI Downloads. Stagehand Had 8,582,033 on npm},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/browser-use-vs-stagehand-installs-november-2026},
      note={PyPI without_mirrors and npm point totals, 2026-10-10 through 2026-11-08}
    }
ledeQuestion: "Which open-source browser agent do people install?"
ledeAnswer: "On PyPI, browser-use. 6,423,201 downloads from October 10 through November 8, 2026, without mirrors, against 1,909,034 for stagehand. On npm, @browserbasehq/stagehand. 8,582,033 downloads in the same window. The npm package named browser-use had 8,969 and is not that Python library."
faq:
  - question: "Which has more installs, Browser Use or Stagehand?"
    answer: "It depends on the registry. On PyPI, from October 10 through November 8, 2026, browser-use had 6,423,201 downloads without mirrors and stagehand had 1,909,034. On npm, over the same dates, @browserbasehq/stagehand had 8,582,033 and the package named browser-use had 8,969. Do not add the PyPI and npm totals."
  - question: "Which one has more GitHub stars?"
    answer: "Browser Use. browser-use/browser-use had 120,535 stars at 13:39:44 UTC on November 10, 2026. browserbase/stagehand had 25,992 at 13:39:45 UTC. The gap is 94,543. Skyvern-AI/skyvern had 23,378 stars at that same minute and only 6,386 PyPI downloads in the 30-day window."
  - question: "Is a PyPI download a developer?"
    answer: "No. The figure counts package-file downloads in the without_mirrors series. CI jobs and dependency installs count. browser-use 1.0.0 sits on Pydantic AI, and that second distribution is not inside the 6,423,201."
  - question: "Did Browser Use 1.0 change the 30-day total?"
    answer: "No. The window ends November 8. browser-use 1.0.0 was uploaded to PyPI at 2026-11-10T02:34:13Z. GitHub published tag 1.0.1 at 2026-11-10T09:27:28Z, and that version was not on PyPI at 13:41:05 GMT. November 9, which is also outside the headline window, was 304,218 for browser-use."
  - question: "Why is the npm package browser-use so small?"
    answer: "It is not the official library. The registry record points at github.com/webllm/browser-use, version 0.9.0, published October 8, 2026. It had 8,969 downloads from October 10 through November 8. The Python distribution had 6,423,201, which is 716 times that npm total."
---

**6,423,201.** That is how many times the PyPI distribution `browser-use` was downloaded from October 10 through November 8, 2026, in the `without_mirrors` series.

`stagehand` had **1,909,034** downloads in the same window. Browser Use’s Python count is 3.36 times Stagehand’s, a gap of 4,514,167 file requests. The npm count points the other way. [`@browserbasehq/stagehand`](https://www.npmjs.com/package/@browserbasehq/stagehand) had **8,582,033** downloads over those dates. That is 1.34 times the PyPI total for `browser-use`, and 4.50 times the PyPI total for `stagehand`.

The [November 9 install census](/blog/which-ai-agent-framework-do-people-install) does not include a browser-agent library. The [November 5 star snapshot](/reports/ai-agent-framework-github-stats-november-2026) does not either. The product calendar is [Browser and computer-use agents, the next 6 months](/reports/browser-and-computer-use-agents-next-6-months). This note is the install row those pages leave out. Daily refresh of the broader framework set lives on the [downloads tracker](/trackers/downloads).

## On PyPI, Browser Use leads. On npm, Stagehand leads.

The window is 30 calendar days, October 10 through November 8, inclusive. Each Python total is the sum of daily `without_mirrors` rows from pypistats. browser-use and stagehand were read at 13:40:30 GMT. skyvern and notte were read at 13:40:31 GMT. Stars are `stargazers_count`.

| Distribution | Oct 10–Nov 8 | Nov 2–Nov 8 | Nov 8 | Nov 9 | PyPI version | Uploaded | Stars | Repository |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| browser-use | 6,423,201 | 1,610,367 | 178,587 | 304,218 | 1.0.0 | 2026-11-10 | 120,535 | browser-use/browser-use |
| stagehand | 1,909,034 | 423,949 | 30,126 | 56,303 | 4.4.0 | 2026-11-04 | 25,992 | browserbase/stagehand |
| skyvern | 6,386 | 2,265 | 274 | 388 | 1.0.57 | 2026-11-06 | 23,378 | Skyvern-AI/skyvern |
| notte | 4,041 | 1,421 | 76 | 75 | 1.10.8 | 2026-11-07 | 2,059 | nottelabs/notte |

November 9 is in the table and outside the 30-day total. The week column is November 2 through November 8. In that week Browser Use was 3.80 times Stagehand on PyPI: 1,610,367 against 423,949.

A second 30-day window, October 11 through November 9, puts the jump inside the total. browser-use moves to 6,526,033. stagehand moves to 1,937,369. The ratio is 3.37. skyvern moves to 6,631. notte moves to 4,055. The PyPI rank is unchanged.

notte is in the table because its summary was read before the sums, and it is not in the rank of agent libraries. The summary calls it browser infrastructure. The PyPI `license_expression` is SSPL-1.0. [nottelabs/notte](https://github.com/nottelabs/notte) had 2,059 stars at 13:42:08 GMT, and GitHub’s license field on that object was `NOASSERTION`. Treat 4,041 as the install count of an infrastructure package, not as a third browser agent that almost caught Skyvern.

PyPI summaries, read at 13:40:17 GMT: browser-use is “Browser agent on Pydantic AI: one persistent Python REPL on raw CDP, cloud or local Chrome.” stagehand is “Browserbase's SDK for building browser agents.” skyvern’s summary field was empty. Its description says it automates browser-based workflows with LLMs and computer vision, and it links to `github.com/Skyvern-AI/skyvern`. That repository’s license field was AGPL-3.0 at 13:39:45 GMT. The description says the same license. browser-use and stagehand were MIT on both PyPI and GitHub.

`requires_python`, same documents: browser-use is `<4.0,>=3.11`, stagehand is `>=3.11`, skyvern is `<3.15,>=3.11`.

## The npm package named browser-use is not the library.

`@browserbasehq/stagehand` version 4.4.0 was published 2026-11-04T17:20:39.326Z. The PyPI file of the same version was uploaded 2026-11-04T17:06:39Z. Same version number, same morning, two registries. The repository field on the npm record is `github.com/browserbase/stagehand`.

| npm package | Oct 10–Nov 8 | Version | What the registry says | In the rank? |
| --- | --- | --- | --- | --- |
| @browserbasehq/stagehand | 8,582,033 | 4.4.0 | Browserbase's SDK for building browser agents | Yes, JavaScript Stagehand |
| browser-use | 8,969 | 0.9.0 | Repository github.com/webllm/browser-use | No |
| @browserbasehq/sdk | 10,053,702 | 2.25.0 | Official TypeScript library for the Browserbase API | No, hosted-browser client |
| agent-browser | 8,357,760 | 0.42.0 | Browser automation CLI for AI agents | No, CLI |
| steel-sdk | 341,945 | 0.22.0 | Official TypeScript library for the Steel API | No, API client |

`@browserbasehq/sdk` at 10,053,702 is the largest npm number in this pass, and it is the client for Browserbase’s hosted browsers. It is not Stagehand. Adding it to 8,582,033 would double-count a company and still would not count a person.

`agent-browser` at 8,357,760 is [Vercel’s CLI](https://github.com/vercel-labs/agent-browser), version 0.42.0 published 2026-11-10T00:40:05.816Z. A coding agent that shells out to a CLI is a different install from a library you import. It stays out of the Browser Use-versus-Stagehand rank for that reason. The number is printed so a weekly chart that leads with it is traceable.

The unscoped npm name `browser-use` had 8,969 downloads. 6,423,201 divided by 8,969 is 716. The official library’s Python users, measured as file requests, are not hiding on npm under that name.

Skyvern had no npm package under the name `skyvern`. That lookup returned 404 at 13:40:18 GMT.

## Skyvern has the stars of a popular library and the downloads of a small one.

Skyvern-AI/skyvern had 23,378 stars at 13:39:45 GMT. stagehand had 25,992. The star gap is 2,614. The PyPI gap is not close: 1,909,034 against 6,386. Stagehand was downloaded 298.9 times as often.

Skyvern’s star count was 3.66 times its own 30-day downloads. Browser Use’s PyPI downloads were 53.29 times its star count. A sort by stars puts Skyvern next to Stagehand. A sort by PyPI file requests puts Skyvern next to notte.

The license is the other reason not to treat them as substitutes. Stagehand and Browser Use are MIT. Skyvern’s repository and its PyPI description are AGPL-3.0. An MIT service that imports an AGPL agent loop has a distribution question a star chart will not ask. This note does not give legal advice. It records the SPDX field and the description line.

Using the langchain total from the November 9 census, 155,918,257, the same dates and the same mirror filter, langchain was downloaded 24.27 times as often as browser-use. Browser agents are a smaller install base than the general agent SDK. Inside that smaller base, the registry decides the winner.

## Browser Use 1.0 shipped after the window.

GitHub’s releases list, read at 13:39:52 GMT, starts with tag `1.0.1`, published 2026-11-10T09:27:28Z, then `1.0.0`, published 2026-11-10T02:04:48Z. PyPI’s latest field at 13:41:05 GMT was still `1.0.0`, uploaded 2026-11-10T02:34:13Z. The releases map had `1.0.0` and `1.0.0rc5`. It did not have `1.0.1`.

`pushed_at` on browser-use/browser-use was 2026-11-10T09:29:07Z, two minutes after the 1.0.1 tag. None of that upload is inside a window that ends November 8. The 6,423,201 is the pre-1.0 package. A census repeated after November 10 will be the first one that can show whether 1.0 changed the daily rate. This one cannot.

November 9 was 304,218 for browser-use, up from 178,587 on November 8, and 56,303 for stagehand, up from 30,126. `1.0.0rc5` was uploaded at 23:42 UTC on November 9. A file that appears in the last minutes of a day does not explain the day’s total. The same jump, on a package that did not ship 1.0 that day, is stagehand. The headline ratio uses the window that stops on November 8.

## What this means if you are choosing a browser-agent library

Import `browser-use` when the agent loop is Python and you want the distribution people already request. On this window that was 6,423,201 file requests, MIT, Python `>=3.11` and `<4.0`, and the current release is the 1.0.0 that landed on PyPI the morning of November 10. Confirm 1.0.1 yourself before you pin it. It was on GitHub at 09:27 UTC and not on PyPI at 13:41 UTC.

Import `@browserbasehq/stagehand` when the loop is TypeScript. That package, not the PyPI name, is the larger Stagehand number: 8,582,033. The PyPI package is the same version, 4.4.0, and a smaller count. Public pages that say Stagehand “has more downloads” are reading this registry, or a mix of the two, and rounding. Public pages that say Browser Use leads are reading PyPI, or the 120,535 stars. Both sentences were true on November 10. They are not the same sentence.

Do not pick Skyvern because 23,378 stars sit near Stagehand’s 25,992. The install count was 6,386, and the license on the repository was AGPL-3.0. Do not pick the npm package `browser-use` and think you installed Browser Use. You installed an unofficial port with 8,969 downloads.
