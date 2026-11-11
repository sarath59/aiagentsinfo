---
title: "Claude Code vs Codex Downloads: 96,124,825 Counts Native Builds. 49,448,384 Does Not."
description: "From October 11 through November 9, 2026, @openai/codex had 96,124,825 npm downloads and @anthropic-ai/claude-code had 49,448,384. Codex counts native builds in that total. Claude Code’s manifest does not."
date: "2026-11-11"
updated: "2026-11-11"
type: original-report
topics:
  - research
  - tools-saas
  - how-agents-work
  - harnesses
  - task-performance
companies:
  - claude-code
  - codex
  - claude-agent-sdk
  - openai-agents-sdk
  - gemini
  - github
contentLicense: true
absoluteTitle: true
dataset:
  title: "npm and PyPI downloads for coding-agent CLIs, October 11 to November 9, 2026"
  description: "npm downloads point API totals for named coding-agent CLI and SDK packages from 2026-10-11 through 2026-11-09, the last day the range endpoint returned a non-zero count. Platform packages that are separate names are listed and not added to the manifest. PyPI totals are the sum of pypistats overall rows, category without_mirrors, for the same dates. GitHub stargazers_count was read November 11, 2026. A download is a file request, not a user."
  isBasedOn: "https://api.npmjs.org/downloads/point/2026-10-11:2026-11-09/@openai/codex"
abstract: |
  @openai/codex was downloaded 96,124,825 times on npm from October 11 through November 9, 2026. @anthropic-ai/claude-code was downloaded 49,448,384 times in the same window. Dividing those figures gives 1.94. That division treats two different counters as one.

  Codex publishes native builds as versions of @openai/codex. The registry listed 5,821 versions on November 11, and the six platform names in its optionalDependencies returned 404 as packages. Claude Code publishes native builds as other package names. The manifest had 560 versions, and the eight platform packages summed to 54,997,673 downloads, which are not inside the 49,448,384.

  @google/gemini-cli had 1,654,972 npm downloads. google-gemini/gemini-cli had 108,765 stars at 05:20 UTC, which is 80.7 percent of openai/codex at 134,808. The star counts look like peers. The npm manifests do not. The package the OpenCode README names, @opencode/cli, had 2,324,159 downloads. anomalyco/opencode had 225,941 stars, the most in this set.
whyItMatters: |
  The pages that already earn impressions for this site rank coding agents by price, by a 30-day product calendar, and by framework downloads. None of them says which CLI package npm fetched. A buyer who treats 96,124,825 as “twice as many Codex users” will misread a packaging choice. A buyer who treats Gemini CLI’s star count as an install count will misread a bookmark.

  The practical split is the harness you run versus the library you embed. @anthropic-ai/claude-agent-sdk had 61,334,229 npm downloads and does not depend on @anthropic-ai/claude-code. Its linux-x64 platform package alone had 47,884,861. That shape is a CI matrix, not a seat count. Price is a different question from either number. A file request does not tell you the cost per task.
keyFindings:
  - "@openai/codex had 96,124,825 npm downloads from October 11 through November 9, 2026. @anthropic-ai/claude-code had 49,448,384. The point responses carried HTTP Date Wed, 11 Nov 2026 05:18:42 GMT. November 10 and November 11 were 0 in the range endpoint, so they are outside the window."
  - "Codex optionalDependencies alias platform builds to versions of @openai/codex. Those alias package names returned 404. The registry listed 5,821 versions at 05:20:05 GMT. Claude Code’s eight platform packages are separate names and summed to 54,997,673 at 05:20:06–05:20:08 GMT. They are not added to 49,448,384."
  - "@anthropic-ai/claude-agent-sdk had 61,334,229 npm downloads. Its dependency field was null at 05:19:36 GMT. It does not require @anthropic-ai/claude-code. The Python distribution claude-agent-sdk had 34,541,167 PyPI downloads without mirrors in the same window."
  - "@google/gemini-cli had 1,654,972 npm downloads. That is 58.08 times smaller than the Codex package total and 29.88 times smaller than the Claude Code manifest. Stars at 05:20:49 GMT were 108,765 for google-gemini/gemini-cli and 134,808 for openai/codex."
  - "The OpenCode dev README, fetched at 05:20:06 GMT, says npm i -g @opencode/cli@latest. That package had 2,324,159 downloads. opencode-ai, same maintainer, no repository field, had 14,683,512. anomalyco/opencode had 225,941 stars. The star leader is not the package the README names, and it is not the npm leader."
methodology: |
  The npm source is the public downloads API, unauthenticated. Each headline total is the point endpoint for 2026-10-11:2026-11-09. A range request for 2026-10-11:2026-11-11 was summed as a cross-check. For every package in the first table the point total matched the sum of daily rows. November 10 and November 11 were 0 on @openai/codex, @anthropic-ai/claude-code, and @opencode/cli. The window stops on November 9 so a zero day is not treated as a quiet day. The week column is November 3 through November 9, the same point endpoint.

  The set was chosen before the totals were read. The CLIs are the registry packages for the coding agents in this site’s November 8 brief that publish an npm or PyPI distribution, plus @opencode/cli because the OpenCode README names it, plus the Claude Agent SDK and the OpenAI Agents SDK because those are the libraries a program installs when it embeds the agent. Cursor’s @cursor/cli returned 404. Devin, Jules, Antigravity, and Goose were not found under the names checked. They are absent, not estimated.

  Package identity comes from the npm registry document: description, bin, homepage, repository, optionalDependencies, and dist-tags.latest. @openai/codex and @anthropic-ai/claude-code version lists were read at 05:20:05 GMT. PyPI totals are the sum of daily rows whose category is without_mirrors and whose date is inside the same window, from https://pypistats.org/api/packages/{name}/overall?mirrors=false. Those responses carried HTTP Date Wed, 11 Nov 2026 05:18:50 GMT to 05:18:51 GMT. The newest date in the files was November 10, which is outside this window. Stars are stargazers_count from the GitHub repository API, Accept application/vnd.github+json. The pass used for the table ran from 05:20:49 GMT to 05:20:51 GMT, except anomalyco/opencode, read at 05:19:38 GMT. sst/opencode returned that same repository object.
limitations:
  - "A download is a file request. CI, a mirror the filter still misses, and one project installing a dependency all increment it. The linux-x64 share of Claude Code’s platform packages is 67.4 percent, 37,068,954 of 54,997,673. That is a build matrix, not a census of laptops."
  - "npm does not publish a per-version split. Codex’s 96,124,825 cannot be divided into manifest tarballs and native-build tarballs from this API. This note does not divide it by two."
  - "Claude Code’s platform packages, the Agent SDK’s platform packages, Copilot’s platform packages, and @opencode/cli’s platform packages are separate names. Adding any of them to the manifest double-counts one install that fetched two files. The sums below are checksums, not a second rank."
  - "PyPI and npm are different registries. Adding claude-agent-sdk’s 34,541,167 to the npm SDK’s 61,334,229 does not produce a user count. Homebrew, a vendor install script, and an editor extension that never requests the package are absent."
  - "opencode-ai has no repository field. It shares a maintainer, thdxr, with @opencode/cli. This note does not pair its 14,683,512 downloads with anomalyco/opencode’s 225,941 stars."
  - "Seven of opencode-ai’s twelve unscoped optional package names were not queried. The five that were queried are printed and not summed into a total. @ampcode/cli had 164,364 downloads and @sourcegraph/amp had 95,957. sourcegraph/amp returned 404. Amp is not in the rank."
  - "The unscoped npm names codex, claude-code, and aider, and the PyPI names codex, claude-code, gemini-cli, and aider, are different projects or placeholders. Their counts are in the trap table so they are not added to the official packages."
  - "Stars are an account’s bookmark. open_issues_count includes pull requests and is not used as a quality rank. Aider-AI/aider’s pushed_at on the 05:18:52 GMT read was 2026-05-22T14:02:20Z. The star count is older interest. The download count is the current file requests."
references:
  - title: "npm downloads point API, 2026-10-11:2026-11-09, @openai/codex"
    url: "https://api.npmjs.org/downloads/point/2026-10-11:2026-11-09/@openai/codex"
    note: "96,124,825. Week 2026-11-03:2026-11-09 was 26,095,328. November 9 was 3,876,766. HTTP Date Wed, 11 Nov 2026 05:18:42 GMT. November 10 and 11 were 0 on the range endpoint."
  - title: "npm downloads point API, @anthropic-ai/claude-code, same window"
    url: "https://api.npmjs.org/downloads/point/2026-10-11:2026-11-09/@anthropic-ai/claude-code"
    note: "49,448,384. Week 15,337,488. November 9 was 2,880,787. Same HTTP minute."
  - title: "npm downloads point API, @google/gemini-cli, @github/copilot, cline, @opencode/cli"
    url: "https://api.npmjs.org/downloads/point/2026-10-11:2026-11-09/@google/gemini-cli"
    note: "gemini-cli 1,654,972 at 05:18:43 GMT, week 450,315, November 9 was 64,499. @github/copilot 6,796,479 at 05:18:44 GMT, week 1,968,454, November 9 was 282,822. Platform packages at 05:20:12 GMT: linux-x64 6,941,262, win32-x64 499,746, darwin-arm64 309,885, linux-arm64 195,021, darwin-x64 85,581, win32-arm64 77,875. Sum 8,109,370. cline 350,863 at 05:18:44 GMT, week 99,150, November 9 was 13,722. @opencode/cli 2,324,159 at 05:20:49 GMT, week 689,068, November 9 was 127,841."
  - title: "npm registry, @openai/codex@0.167.1 and @anthropic-ai/claude-code@2.1.322"
    url: "https://registry.npmjs.org/@openai/codex/0.167.1"
    note: "Read 05:19:36 GMT. Codex optionalDependencies are npm aliases to versions of @openai/codex. The six alias names returned 404 at 05:20:10 GMT. Version list at 05:20:05 GMT had 5,821 versions. Claude Code’s version list had 560, and 2.1.322 was unsuffixed. Claude Code optionalDependencies name eight other packages."
  - title: "npm downloads point API, Claude Code platform packages, same window"
    url: "https://api.npmjs.org/downloads/point/2026-10-11:2026-11-09/@anthropic-ai/claude-code-linux-x64"
    note: "linux-x64 37,068,954, darwin-arm64 5,982,095, win32-x64 5,658,004, linux-x64-musl 3,218,426, linux-arm64 2,178,403, linux-arm64-musl 417,551, darwin-x64 324,426, win32-arm64 149,814. Sum 54,997,673. HTTP Date 05:20:06–05:20:08 GMT."
  - title: "npm downloads point API, @anthropic-ai/claude-agent-sdk and its platform packages"
    url: "https://api.npmjs.org/downloads/point/2026-10-11:2026-11-09/@anthropic-ai/claude-agent-sdk"
    note: "Manifest 61,334,229 at 05:18:45 GMT. Week 18,540,048. November 9 was 2,901,197. Platforms, 05:20:08–05:20:10 GMT: linux-x64 47,884,861, linux-x64-musl 28,476,481, linux-arm64 4,650,568, darwin-arm64 2,307,557, linux-arm64-musl 2,211,444, win32-x64 1,883,699, darwin-x64 847,323, win32-arm64 557,497. Sum 88,819,430. dependencies was null."
  - title: "npm downloads point API, @openai/agents, opencode-ai, and name traps"
    url: "https://api.npmjs.org/downloads/point/2026-10-11:2026-11-09/@openai/agents"
    note: "@openai/agents 8,665,151 at 05:18:46 GMT. opencode-ai 14,683,512 at 05:18:48 GMT. Unscoped claude-code 36,702. Unscoped codex 18,949. Unscoped aider 250. @cline/cli 1,232. @ampcode/cli 164,364. @sourcegraph/amp 95,957, week 27,386."
  - title: "npm downloads point API, @opencode/cli platform packages"
    url: "https://api.npmjs.org/downloads/point/2026-10-11:2026-11-09/@opencode/cli-linux-x64"
    note: "Read 05:22:24–05:22:26 GMT. linux-x64 2,525,113, linux-x64-baseline 1,639,923, linux-x64-musl 1,297,428, linux-x64-baseline-musl 1,296,266, windows-x64 1,034,257, windows-x64-baseline 916,371, darwin-arm64 628,595, linux-arm64 406,137, linux-arm64-musl 266,249, darwin-x64 164,885, darwin-x64-baseline 135,482, windows-arm64 128,926. Sum 10,439,632. Not added to 2,324,159."
  - title: "OpenCode README on the dev branch"
    url: "https://github.com/anomalyco/opencode/blob/dev/README.md"
    note: "Raw file fetched Wed, 11 Nov 2026 05:20:06 GMT. Install line: npm i -g @opencode/cli@latest. Also a curl script and brew install anomalyco/tap/opencode-v2."
  - title: "pypistats overall, mirrors=false, aider-chat, openhands, openhands-sdk, claude-agent-sdk, openai-agents"
    url: "https://pypistats.org/api/packages/aider-chat/overall?mirrors=false"
    note: "without_mirrors sums for 2026-10-11 through 2026-11-09. aider-chat 305,041. openhands 99,201. openhands-ai 344,093. openhands-sdk 3,533,759. claude-agent-sdk 34,541,167. openai-agents 17,793,199. HTTP Date 05:18:50 GMT. Newest file date was November 10."
  - title: "PyPI JSON for the name traps and the OpenHands pin"
    url: "https://pypi.org/pypi/openhands/json"
    note: "openhands 1.16.0 requires openhands-sdk==1.21.0. openhands-sdk 1.61.0 was uploaded 2026-11-09T19:03:23Z. aider-chat 0.86.2 uploaded 2026-02-12. pypi codex is a comic server, 4,947 downloads. pypi gemini-cli 0.2.5 uploaded 2024-02-08, 1,436 downloads. pypi claude-code 0.0.1 summary Reserved, 1,309."
  - title: "GitHub REST API, coding-agent repositories, November 11, 2026"
    url: "https://api.github.com/repos/openai/codex"
    note: "05:20:49–05:20:51 GMT: anthropics/claude-code 155,223 stars, openai/codex 134,808, google-gemini/gemini-cli 108,765, cline/cline 71,515, github/copilot-cli 11,400, Aider-AI/aider 50,059, OpenHands/OpenHands 93,172, OpenHands/software-agent-sdk 1,379. anomalyco/opencode 225,941 at 05:19:38 GMT. sst/opencode resolved to that repository."
  - title: "npm download-counts documentation"
    url: "https://github.com/npm/registry/blob/master/docs/download-counts.md"
    note: "The point and range endpoints used above."
  - title: "AI Agents Info, which framework people install, November 9, 2026"
    url: "https://www.aiagentsinfo.com/blog/which-ai-agent-framework-do-people-install"
    note: "Framework distributions only. claude-agent-sdk and openai-agents in that note use October 10 through November 8. This note did not re-sum that window."
citation:
  apa: "AI Agents Info. (2026, November 11). Claude Code vs Codex downloads: 96,124,825 counts native builds. 49,448,384 does not. https://www.aiagentsinfo.com/research/claude-code-vs-codex-downloads-november-2026"
  bibtex: |
    @misc{aiagentsinfo2026cliDownloads,
      title={Claude Code vs Codex Downloads: 96,124,825 Counts Native Builds. 49,448,384 Does Not},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/claude-code-vs-codex-downloads-november-2026},
      note={npm downloads point API, 2026-10-11 through 2026-11-09. Platform packages not added to manifests.}
    }
ledeQuestion: "Which coding agent CLI did npm fetch?"
ledeAnswer: "@openai/codex, by file requests for that package name: 96,124,825 from October 11 through November 9, 2026. @anthropic-ai/claude-code had 49,448,384. Those counters do not count the same kind of file. Codex includes native-build versions. Claude Code’s figure is the manifest."
faq:
  - question: "Which coding agent CLI has more npm downloads, Claude Code or Codex?"
    answer: "The package @openai/codex had 96,124,825 npm downloads from October 11 through November 9, 2026. @anthropic-ai/claude-code had 49,448,384. Codex publishes native builds as versions of the same package, so that 96,124,825 includes them. Claude Code publishes native builds as eight other package names, which sum to 54,997,673 and are not inside the 49,448,384. Do not divide the two headline figures and call the result users."
  - question: "Does the Claude Agent SDK download include the Claude Code CLI?"
    answer: "Not as a dependency of the version read on November 11, 2026. @anthropic-ai/claude-agent-sdk 0.3.322 had a null dependencies field and its own platform packages. The SDK package had 61,334,229 npm downloads in the window. The CLI manifest had 49,448,384. The Python package claude-agent-sdk had 34,541,167 PyPI downloads. Do not add the three."
  - question: "Why does Gemini CLI look as popular as Codex on GitHub?"
    answer: "Stars are close and downloads are not. At 05:20 UTC on November 11, 2026, google-gemini/gemini-cli had 108,765 stars and openai/codex had 134,808. The npm package @google/gemini-cli had 1,654,972 downloads in the 30-day window, against 96,124,825 for @openai/codex. Gemini’s optional dependencies are node-pty builds, not extra copies of the CLI under other names."
  - question: "Is the npm package named codex the OpenAI Codex CLI?"
    answer: "No. The unscoped package codex, version 0.2.3, is a static-site generator last published in 2012. It had 18,949 downloads in this window. The CLI is @openai/codex. The PyPI project codex is a comic archive server and had 4,947 downloads. The same trap exists for claude-code, gemini-cli, and aider."
  - question: "Is a download a developer?"
    answer: "No. The figure counts package-file downloads. CI jobs and dependency installs count. November 10 and November 11 were 0 on the npm range endpoint and are excluded. An install that uses Homebrew or a vendor script and never requests the package is absent."
---

**96,124,825.** That is how many times the npm package `@openai/codex` was downloaded from October 11 through November 9, 2026.

`@anthropic-ai/claude-code` had **49,448,384** downloads in the same window. The ratio of those two counters is 1.94, a gap of 46,676,441 file requests. Stop there. Codex publishes native builds as versions of `@openai/codex`. Claude Code publishes native builds as other package names, and those names are not inside the 49,448,384. A reader who wants “how many people” is asking a question this API does not answer.

The [November 9 install census](/blog/which-ai-agent-framework-do-people-install) ranks agent frameworks. It does not include a coding-agent CLI. Daily refresh of that framework set is the [downloads tracker](/trackers/downloads). Bookmarks for those repositories are the [stars tracker](/trackers/stars). Seat prices, which this count does not touch, are [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing). The dated product calendar is [AI coding agents in the next 30 days](/reports/ai-coding-agents-next-30-days).

## Do the Codex and Claude Code totals count the same file?

No. Codex’s 96,124,825 includes native-build versions. Claude Code’s 49,448,384 is the manifest. The eight Claude Code platform packages sum to 54,997,673, and they stay out of that manifest.

The point responses for the two manifests carried HTTP Date Wed, 11 Nov 2026 05:18:42 GMT. Each point total matched the sum of daily rows from the range endpoint. November 10 and November 11 were 0, so the window ends November 9. The week is November 3 through November 9.

| npm package | Oct 11–Nov 9 | Nov 3–Nov 9 | Nov 9 | Version | Published | What the registry installs |
| --- | --- | --- | --- | --- | --- | --- |
| @openai/codex | 96,124,825 | 26,095,328 | 3,876,766 | 0.167.1 | 2026-11-10 | Manifest and native versions, one name |
| @anthropic-ai/claude-code | 49,448,384 | 15,337,488 | 2,880,787 | 2.1.322 | 2026-11-10 | Manifest only. Bin `claude` |
| opencode-ai | 14,683,512 | 3,343,787 | 481,872 | 1.19.5 | 2026-10-28 | No repository field. Not the README command |
| @github/copilot | 6,796,479 | 1,968,454 | 282,822 | 1.0.109 | 2026-11-10 | Manifest only. Bin `copilot` |
| @opencode/cli | 2,324,159 | 689,068 | 127,841 | 2.2.7 | 2026-11-10 | The package the README names |
| @google/gemini-cli | 1,654,972 | 450,315 | 64,499 | 0.68.0 | 2026-11-10 | Manifest. Bin `gemini` |
| cline | 350,863 | 99,150 | 13,722 | 3.0.74 | 2026-10-26 | Manifest. Bin `cline` |

On the week, Codex’s counter was 1.70 times the Claude Code manifest, 26,095,328 against 15,337,488. On November 9 it was 1.35 times, 3,876,766 against 2,880,787. The rank did not flip. The gap in the counter narrowed. It is still a gap in a counter, not a gap in users.

At 05:19:36 GMT the Codex document’s `optionalDependencies` pointed at names such as `@openai/codex-darwin-arm64` with the alias form `npm:@openai/codex@0.167.1-darwin-arm64`. Those six names returned 404 at 05:20:10 GMT. They are not packages. They are versions. The version list at 05:20:05 GMT held 5,821 versions, including strings that end in `-darwin-arm64` and `-linux-x64`. npm’s download API does not split versions. One install that fetches the manifest version and one native version increments `@openai/codex` twice. This note does not divide 96,124,825 by two, because the API does not show the split.

Claude Code 2.1.322, read at the same minute, depends on eight packages, not on versions of itself. The version list held 560 entries. `2.1.322` was unsuffixed. The platform totals, read at 05:20:06–05:20:08 GMT:

| Platform package | Oct 11–Nov 9 |
| --- | --- |
| @anthropic-ai/claude-code-linux-x64 | 37,068,954 |
| @anthropic-ai/claude-code-darwin-arm64 | 5,982,095 |
| @anthropic-ai/claude-code-win32-x64 | 5,658,004 |
| @anthropic-ai/claude-code-linux-x64-musl | 3,218,426 |
| @anthropic-ai/claude-code-linux-arm64 | 2,178,403 |
| @anthropic-ai/claude-code-linux-arm64-musl | 417,551 |
| @anthropic-ai/claude-code-darwin-x64 | 324,426 |
| @anthropic-ai/claude-code-win32-arm64 | 149,814 |

The sum is 54,997,673. That is 5,549,289 more than the manifest. Some jobs fetch a platform tarball without the manifest, or fetch more than one platform. linux-x64 is 37,068,954 of the 54,997,673, which is 67.4 percent. A CI runner on Linux is the bulk of the native files. darwin-arm64, the largest desktop row, is 5,982,095. Do not add the sum to 49,448,384. That addition counts one install as two and then calls it a market.

`@github/copilot` is the same shape as Claude Code, at a smaller scale. The manifest had 6,796,479 downloads. Six platform packages, read at 05:20:12 GMT, summed to 8,109,370, which is 1,312,891 above the manifest. The largest was `@github/copilot-linux-x64` at 6,941,262. [github/copilot-cli](https://github.com/github/copilot-cli) had 11,400 stars at 05:20:50 GMT. The repository is small. The file requests are not. Copilot’s [directory row](/directory/github-copilot) is the product. The star count is the CLI repo only.

## Did the Claude Agent SDK out-download the CLI?

Yes, on the npm manifest. `@anthropic-ai/claude-agent-sdk` had 61,334,229 downloads. The CLI manifest had 49,448,384. The SDK does not depend on the CLI.

Version 0.3.322, published 2026-11-10T01:57:38Z, had `dependencies: null` at 05:19:36 GMT. Its peer dependencies are `zod`, `@anthropic-ai/sdk`, and `@modelcontextprotocol/sdk`. The registry description is “SDK for building AI agents with Claude Code's capabilities.” There is no `bin`. This is the library a program embeds, not the `claude` command a person types. The [Claude Agent SDK listing](/directory/claude-agent-sdk) is that product. The [Claude Code listing](/directory/claude-code) is the CLI.

The SDK’s own eight platform packages summed to 88,819,430. linux-x64 was 47,884,861. linux-x64-musl was 28,476,481. Those two rows are larger than the manifest. A matrix that installs several targets per job looks like this. The gap between the SDK manifest and the CLI manifest, 11,885,845, is not a headcount of agents in production. It is evidence that embedding the [harness](/glossary/harness) and running the CLI are different file requests.

On PyPI, same dates, `without_mirrors`: `claude-agent-sdk` had 34,541,167 downloads and `openai-agents` had 17,793,199. The npm package `@openai/agents` had 8,665,151. That package is the Agents SDK, version 0.21.0, published 2026-10-20, repository `openai/openai-agents-js`. It is not `@openai/codex`. The [OpenAI Agents SDK listing](/directory/openai-agents-sdk) covers the SDK. [Codex](/directory/codex) is the CLI. The November 9 framework census printed these SDKs for October 10 through November 8. This note did not re-sum that window, and it does not call the difference growth.

## Why do Gemini CLI’s stars look like a peer of Codex?

Because the bookmarks are close and the file requests are not. 108,765 is 80.7 percent of 134,808. The npm manifest is 58.08 times smaller.

Stars at 05:20:49 GMT on November 11: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) 108,765, [openai/codex](https://github.com/openai/codex) 134,808, [anthropics/claude-code](https://github.com/anthropics/claude-code) 155,223. Claude Code has the most stars of the three and the smaller npm manifest. Codex has the largest npm counter and the middle star count.

`@google/gemini-cli` 0.68.0, published 2026-11-10T21:22:49Z, lists `node-pty`, `@github/keytar`, and `@lydell/node-pty-*` as optional dependencies. Those are a terminal library and a keychain library, not extra copies of Gemini CLI under another name. This note did not query `node-pty`. The 1,654,972 is the CLI package. The packaging trick that inflates Codex’s counter, and the packaging split that shrinks Claude Code’s manifest, do not explain Gemini. On the numbers this pass actually fetched, Gemini CLI is a small npm package with a large star count.

[cline](https://github.com/cline/cline) is the same shape, sharper. 71,515 stars at 05:20:49 GMT. 350,863 npm downloads. The experimental package `@cline/cli`, repository `cline/sdk`, version 0.0.13, last published 2026-05-07, had 1,232 downloads. The CLI people install is the unscoped `cline` package.

## Which package does the OpenCode README tell you to install?

`@opencode/cli`. The dev README, fetched at 05:20:06 GMT, says `npm i -g @opencode/cli@latest`. That package had 2,324,159 downloads. `opencode-ai` had 14,683,512, and it is not the command in that README.

`@opencode/cli` 2.2.7 was published 2026-11-10T10:33:01Z. The repository field is `github.com/anomalyco/opencode`. The bin is `opencode`. [anomalyco/opencode](https://github.com/anomalyco/opencode) had 225,941 stars at 05:19:38 GMT, description “The open source coding agent,” license MIT. `sst/opencode` returned that same repository. Those 225,941 stars are the most in this set. Paired with the package the README names, they sit on 2,324,159 npm downloads. Paired by mistake with `opencode-ai`, they sit on 14,683,512. Neither pairing makes OpenCode the npm leader. Codex’s package counter is still larger than both names combined, and combining them would be a mistake: they are two packages.

`opencode-ai` 1.19.5, published 2026-10-28, has maintainer `thdxr`, the same maintainer as `@opencode/cli`, an empty description, and no repository field. This note does not award it the stars. Its unscoped optional dependency `opencode-linux-x64` had 14,334,726 downloads at 05:20:12 GMT, next to the old manifest’s 14,683,512. Five of the twelve unscoped optional names were fetched. The other seven were not. They are not summed.

The twelve `@opencode/cli-*` platform packages were fetched, at 05:22:24–05:22:26 GMT, and sum to 10,439,632. That is 4.49 times the manifest. linux-x64 was 2,525,113, close to the manifest, and then baseline, musl, and baseline-musl add three more Linux rows. A matrix, again. The README also offers a curl script and `brew install anomalyco/tap/opencode-v2`. Those paths do not touch the npm counter. The 2,324,159 is the registry. It is not the install base.

## What do the PyPI names show for the same dates?

`aider-chat` had 305,041 downloads without mirrors. The OpenHands CLI package had 99,201 and pins an SDK version from before the current release. The SDK package had 3,533,759.

| Distribution | Oct 11–Nov 9 | Nov 3–Nov 9 | Nov 9 | Version | Uploaded | Stars | Repository |
| --- | --- | --- | --- | --- | --- | --- | --- |
| claude-agent-sdk | 34,541,167 | 8,852,804 | 1,347,088 | 0.2.180 | 2026-11-09 | 8,520 | anthropics/claude-agent-sdk-python |
| openai-agents | 17,793,199 | 4,476,469 | 620,048 | 0.24.0 | 2026-10-15 | 30,604 | openai/openai-agents-python |
| openhands-sdk | 3,533,759 | 855,354 | 151,671 | 1.61.0 | 2026-11-09 | 1,379 | OpenHands/software-agent-sdk |
| openhands-ai | 344,093 | 29,985 | 1,861 | 1.11.0 | 2026-07-09 | 93,172 | OpenHands/OpenHands |
| aider-chat | 305,041 | 84,131 | 14,444 | 0.86.2 | 2026-02-12 | 50,059 | Aider-AI/aider |
| openhands | 99,201 | 7,202 | 642 | 1.16.0 | 2026-05-08 | 93,172 | summary says the CLI |

pypistats responses carried HTTP Date 05:18:50 GMT. The files included November 10. The totals above stop on November 9 so they share the npm window.

`openhands` 1.16.0 requires `openhands-sdk==1.21.0`. The current `openhands-sdk` is 1.61.0, uploaded November 9. A pip install of the CLI name does not fetch the SDK that shipped that day. The CLI’s star cell is the product repository, [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands), at 93,172 stars. The SDK repository had 1,379 stars and 3,533,759 downloads. Stars sit on the quiet name. File requests sit on the SDK. `openhands-ai` 1.11.0, uploaded July 9, points at the product repository and had 344,093 downloads. Three distributions, two repositories. Do not add them.

[Aider-AI/aider](https://github.com/Aider-AI/aider) had 50,059 stars at 05:20:50 GMT. `pushed_at` on the 05:18:52 GMT read was 2026-05-22T14:02:20Z. `aider-chat` 0.86.2 was uploaded 2026-02-12. 305,041 downloads in 30 days is a real, modest install base under a star count that stopped moving in May. The November 8 coding-agent brief already recorded that push time. This is the file-request side of it.

## Which downloaded names are a different project?

The unscoped npm package `codex` had 18,949 downloads. It is a documentation generator, version 0.2.3, published in 2012. The CLI is `@openai/codex`.

| Name | Registry | Oct 11–Nov 9 | What it is |
| --- | --- | --- | --- |
| codex | npm | 18,949 | Static-site generator, 2012. Not OpenAI |
| claude-code | npm | 36,702 | Pointer package, version 1.0.0, published 2025-10-15. Not the manifest’s 49,448,384 |
| aider | npm | 250 | Website component, 2020. Not Aider |
| codex | PyPI | 4,947 | Comic archive server, version 2.6.0 |
| gemini-cli | PyPI | 1,436 | Version 0.2.5, uploaded 2024-02-08. Not @google/gemini-cli |
| claude-code | PyPI | 1,309 | Version 0.0.1, summary “Reserved” |
| aider | PyPI | 2,404 | “general utility functions,” not aider-chat |

`@cursor/cli` returned 404. The npm package `cursor-agent` exists, repository `zalab-inc/cursor_agent`, description “Task sequence creator for Cursor AI agents.” It is not Cursor’s CLI, and its downloads are not in this rank. `@gooseai/goose`, `@block-goose/goose`, and `block-goose` returned 404. The npm package `goose` is a Go bracket tool. The PyPI package `goose` is a SQL migration tool. Block’s Goose agent is not in this table because this pass did not find its distribution under those names.

## What should you open next?

If you are comparing seats, open [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing). The download counter will not tell you which plan is cheaper, and it will not tell you the cost per task. The [agent cost calculator](/agent-cost-calculator) prices tokens from the vendor’s published rates. It does not add a seat fee, and it does not use these download figures.

If you wanted frameworks rather than CLIs, the live table is the [downloads tracker](/trackers/downloads) and the [stars tracker](/trackers/stars). The dated coding-agent calendar, prices included, is [AI coding agents in the next 30 days](/reports/ai-coding-agents-next-30-days). The directory rows are [Claude Code](/directory/claude-code), [Codex](/directory/codex), and [Gemini](/directory/gemini).

If the tool you ship is missing from that directory, [submit a listing](/submit). No login. An existing row can be claimed from its page.
