---
title: "Is AutoGen Deprecated? 61,753 Stars on an Unarchived Repo"
description: "61,753 GitHub stars on November 9, 2026, and the API field archived was false. AutoGen’s README, changed October 16, says Microsoft is not providing bug fixes, security fixes, new features, or support."
takeaways:
  - "At 07:41 UTC on November 9, 2026, the GitHub API returned archived: false for microsoft/autogen, with 61,753 stars. The README on main says the project is archived and that Microsoft is not providing fixes or support."
  - "The latest release tag was still python-v0.7.5, published September 30, 2025. Of the five newest commits on main, the newest one that is not a documentation banner is dated March 26, 2026."
  - "Microsoft’s Learn overview calls Agent Framework the direct successor of AutoGen and Semantic Kernel. That repository had 14,598 stars the same morning, and its latest release was python-1.25.0, published November 7, 2026. Semantic Kernel’s own repository was not archived and published dotnet-1.82.0 the same day."
date: "2026-11-09"
updated: "2026-11-09"
category: explainer
topics:
  - harnesses
  - how-agents-work
  - tools-saas
audience:
  - builders
  - everyone
companies:
  - microsoft
  - github
byline: "AI Agents Info Editorial"
contentLicense: true
absoluteTitle: true
dataset:
  title: "Microsoft agent-framework repositories, GitHub API, November 9, 2026"
  description: "Repository and latest-release fields for microsoft/autogen, microsoft/agent-framework, and microsoft/semantic-kernel. The pass finished at 2026-11-09T07:41:51Z. AutoGen returned archived false, 61,753 stars, and latest release python-v0.7.5 published 2025-09-30T06:18:26Z. A later search the same morning split AutoGen’s open_issues_count of 1,172 into 572 open issues and 600 open pull requests."
  isBasedOn: "https://api.github.com/repos/microsoft/autogen"
sources:
  - title: "GitHub REST API, microsoft/autogen (repository and latest release, pass finished 07:41:51 UTC)"
    url: "https://api.github.com/repos/microsoft/autogen"
  - title: "AutoGen README on main, read November 9, 2026"
    url: "https://github.com/microsoft/autogen/blob/main/README.md"
  - title: "Commit 004749e6b7, README archive wording, October 16, 2026"
    url: "https://github.com/microsoft/autogen/commit/004749e6b7102c8fd317b9b1499ce5807223c278"
  - title: "README at 027ecf0a37, maintenance-mode wording, April 6, 2026"
    url: "https://github.com/microsoft/autogen/blob/027ecf0a379bcc1d09956d46d12d44a3ad9cee14/README.md"
  - title: "Commit d07c667a32, archive caution on the landing page, October 28, 2026"
    url: "https://github.com/microsoft/autogen/commit/d07c667a3239ea4ab7af62a53b0f4ff205a1f23d"
  - title: "GitHub REST API, microsoft/agent-framework (same pass)"
    url: "https://api.github.com/repos/microsoft/agent-framework"
  - title: "GitHub REST API, microsoft/semantic-kernel (same pass)"
    url: "https://api.github.com/repos/microsoft/semantic-kernel"
  - title: "Semantic Kernel README on main, read November 9, 2026"
    url: "https://github.com/microsoft/semantic-kernel/blob/main/README.md"
  - title: "Microsoft Learn, Agent Framework overview (read November 9, 2026)"
    url: "https://learn.microsoft.com/en-us/agent-framework/overview/"
  - title: "Microsoft Learn, migrate from AutoGen (read November 9, 2026)"
    url: "https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/"
  - title: "AI Agents Info, framework release snapshot, November 5, 2026"
    url: "https://www.aiagentsinfo.com/reports/ai-agent-framework-github-stats-november-2026"
faq:
  - question: "Is AutoGen deprecated?"
    answer: "Microsoft’s README says the project is archived and no longer maintained, and that Microsoft is not providing bug fixes, security fixes, new features, or support. At 07:41 UTC on November 9, 2026, GitHub’s repository API still returned archived: false. The latest release tag was python-v0.7.5, published September 30, 2025. The repository had 61,753 stars."
  - question: "Did GitHub archive the AutoGen repository?"
    answer: "The archived field was false. Archiving in GitHub’s product is that boolean. The README and an October 28, 2026 commit that adds an archive caution to the landing page are statements in the files. They are not the same switch."
  - question: "When did AutoGen’s README start saying archived?"
    answer: "Commit 004749e6b7, committed October 16, 2026, carries the message that the README should say AutoGen is archived and no longer maintained. The README at the previous banner commit, April 6, 2026, said maintenance mode, and that the project would not receive new features and was community managed going forward."
  - question: "Is Semantic Kernel deprecated too?"
    answer: "Semantic Kernel’s README says Semantic Kernel is now Microsoft Agent Framework. The repository API on November 9 returned archived: false, 28,747 stars, and latest release dotnet-1.82.0, published November 7, 2026. That is a different pair of facts from AutoGen’s README, which says Microsoft is not providing fixes."
  - question: "What does Microsoft say to use instead of AutoGen?"
    answer: "The AutoGen README points new users to Microsoft Agent Framework and to the AutoGen migration guide. The Learn overview calls Agent Framework the direct successor of AutoGen and Semantic Kernel, made by the same teams. On the same API pass, microsoft/agent-framework had 14,598 stars and latest release python-1.25.0, published November 7, 2026."
---

AutoGen’s README says the project is archived. GitHub’s archive flag, read at the end of a pass at 07:41:51 UTC on November 9, 2026, was false. The repository had **61,753** stars.

Those two sentences are the whole disagreement. A README can say “archived” while the API field `archived` stays false. AI Agents Info read both on the same morning. The [November 5 framework snapshot](/reports/ai-agent-framework-github-stats-november-2026) already had this repository in a table of 19, at 61,706 stars, and the public page does not answer the maintenance question. This page does.

## Is AutoGen deprecated?

Microsoft’s current README says the project is archived and no longer maintained. GitHub’s repository record, the same morning, said it was not archived.

The README on `main`, fetched November 9, opens the caution with “Project archived and no longer maintained.” The next sentences say Microsoft is not providing bug fixes, security fixes, new features, or support, and that the repository remains available for historical reference. A later sentence says new users should start with Microsoft Agent Framework, and points existing users at the [migration guide](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/).

The API response for `GET /repos/microsoft/autogen` in that pass returned `"archived": false`. It also returned 61,753 stars, 9,392 forks, `open_issues_count` 1,172, the SPDX id CC-BY-4.0, Python as the primary language, `created_at` 2023-08-18T11:43:45Z, and `pushed_at` 2026-10-28T14:45:27Z. The latest-release call returned tag `python-v0.7.5`, published 2025-09-30T06:18:26Z.

A search request later the same morning, still November 9, split that 1,172. It counted 572 open issues and 600 open pull requests. 572 plus 600 is 1,172, so the split matched the repository field. GitHub’s `open_issues_count` includes pull requests. The 1,172 figure is not 1,172 bug reports.

| Repository | Stars | Forks | open_issues_count | Archived field | Latest release | Release published | Last push |
| --- | --- | --- | --- | --- | --- | --- | --- |
| microsoft/autogen | 61,753 | 9,392 | 1,172 | false | python-v0.7.5 | Sep 30, 2025 | Oct 28, 2026 |
| microsoft/semantic-kernel | 28,747 | 4,857 | 329 | false | dotnet-1.82.0 | Nov 7, 2026 | Nov 7, 2026 |
| microsoft/agent-framework | 14,598 | 2,596 | 905 | false | python-1.25.0 | Nov 7, 2026 | Nov 9, 2026 |

61,753 minus 14,598 is 47,155. The repository whose README says Microsoft will not ship fixes had 47,155 more stars than the repository Microsoft’s own pages name as the successor.

The [November 5 snapshot](/reports/ai-agent-framework-github-stats-november-2026) recorded AutoGen at 61,706 stars, 9,367 forks, and `open_issues` 1,144, with the same release tag and the same `pushed_at`. The archive boolean in that file was already false. Four days later the star field was 47 higher. The release tag had not moved. The [November 9 framework comparison](/best/ai-agent-frameworks) lists the same release, python-v0.7.5 on September 30, 2025, and calls the row an older Microsoft framework. It does not quote the README.

## When did the README change from maintenance mode to archived?

The archived wording landed in the README on October 16, 2026. On April 6, 2026 the same file said maintenance mode.

Commit [004749e6b7](https://github.com/microsoft/autogen/commit/004749e6b7102c8fd317b9b1499ce5807223c278), committer date 2026-10-16T16:14:36Z, is titled “docs: clarify AutoGen is archived and no longer maintained.” The README at the previous banner commit, [027ecf0a37](https://github.com/microsoft/autogen/commit/027ecf0a379bcc1d09956d46d12d44a3ad9cee14), committer date 2026-04-06T22:35:32Z, used a maintenance-mode badge. Its caution said AutoGen was in maintenance mode, would not receive new features or enhancements, and was community managed going forward. It already sent new users to Microsoft Agent Framework.

The October 16 text is stricter. It names bug fixes, security fixes, new features, and support as things Microsoft is not providing. It tells the reader to use an archived repository with caution, and it says AutoGen was developed for research and experimentation. The April text did not say that.

The October 16 commit was 23 days and about 15 hours before the API pass. The wording a person meets on the front of the repository today is the October wording, plus whatever else is on `main`. The April file is the one to open if you want the earlier banner.

## What has been committed since that notice?

The last push GitHub recorded was October 28, 2026, and the subject line of that commit is documentation.

These are the five newest commits the API returned for the default branch:

| Commit | Committer date | Subject |
| --- | --- | --- |
| d07c667a32 | Oct 28, 2026 | docs: add archive caution to landing page (#8393) |
| 004749e6b7 | Oct 16, 2026 | docs: clarify AutoGen is archived and no longer maintained (#8366) |
| 027ecf0a37 | Apr 6, 2026 | Update maintenance mode banner in readme (#7521) |
| 8544314fa6 | Mar 26, 2026 | fix: restrict importlib provider loading to trusted namespaces (#7463) |
| b0477309d2 | Mar 11, 2026 | fix: Improve AutoGen Studio: deprecate FunctionTool, harden MCP WebSocket endpoint (#7362) |

Of those five, the newest subject that is not a documentation banner is the March 26 fix. This page did not read the diffs. A commit titled “docs” can still touch code, and a commit titled “fix” can be small. The subjects are the evidence. The latest release tag is older than all five: python-v0.7.5, September 30, 2025, which was 405 days before the API pass.

The repository description GitHub returned was still “A programming framework for agentic AI.” The homepage field was `https://microsoft.github.io/autogen/`. Neither field carried the archive sentence. The sentence lives in the README and, as of the October 28 commit, on the landing page that commit names.

## Is Semantic Kernel in the same position?

No. Semantic Kernel’s README points people at Agent Framework, and the repository is still publishing releases.

The README’s notice, read the same day, says “Semantic Kernel is now Microsoft Agent Framework” and calls that framework the enterprise-ready successor. It links a migration guide. It does not say Microsoft has stopped bug fixes, and it does not use the word archived.

The API agreed with the release history. `archived` was false. Stars were 28,747. Forks were 4,857. `open_issues_count` was 329. The license field was MIT. The primary language was C#. `pushed_at` was 2026-11-07T00:59:55Z. The latest release was `dotnet-1.82.0`, published 2026-11-07T01:00:07Z, twelve seconds after that push. `pushed_at` moves when any ref is pushed, including a release tag, so that clock is not by itself the date of the newest commit on `main`. The newest commit the API returned for `main` was “.Net: Bump package version to 1.82.0,” committer date November 5, 2026. The one before it prepared a Python 1.47.0 release.

28,747 minus 14,598 is 14,149. Semantic Kernel still had 14,149 more stars than Agent Framework, and it had shipped a release two days before this reading. AutoGen’s README and Semantic Kernel’s README are both sending new work toward the same successor. Only AutoGen’s README says Microsoft is not providing fixes.

## What does Microsoft say to use instead?

Agent Framework, in both the AutoGen README and the Learn overview.

The [overview](https://learn.microsoft.com/en-us/agent-framework/overview/), read November 9, 2026, says Agent Framework combines AutoGen’s agent abstractions with Semantic Kernel’s enterprise features, and then says the framework is the direct successor, created by the same teams. A later sentence says it is the next generation of both Semantic Kernel and AutoGen. The page also says that if you can write a function for the task, do that instead of using an agent. The same page describes a Harness Agent for long tasks, with planning, context compaction, file access, memory, tool approval, and observability. On this site that surrounding software is a [harness](/glossary/harness). The directory page is [Microsoft Agent Framework](/directory/microsoft-agent-framework).

The successor’s own repository, in the same API pass, had 14,598 stars and 2,596 forks. `archived` was false. The license field was MIT. The description was “A framework for building, orchestrating and deploying AI agents and multi-agent workflows with support for Python and .NET.” The latest release tag was `python-1.25.0`, published 2026-11-07T15:52:42Z. `pushed_at` was 2026-11-09T06:38:42Z, about an hour before the AutoGen read. The [November 5 snapshot](/reports/ai-agent-framework-github-stats-november-2026) had this repository at 14,539 stars and release python-1.24.0, published October 30, 2026. The tag moved. The star count moved by 59.

The AutoGen README also contains the sentence “Microsoft Agent Framework 1.0 gives you enterprise-grade multi-agent orchestration.” The release tag GitHub returned for that repository on November 9 was python-1.25.0, not a tag named 1.0. This page treats 1.25.0 as the release tag and treats “1.0” as a phrase in the README. The README sentence as fetched also contains the typo “FrameworkAF in now.” That typo is in the file. It is not a second product.

The migration guide’s background section says Agent Framework is a new multi-language SDK and that it was developed by the core AutoGen and Semantic Kernel teams. One difference it names: AutoGen’s `AssistantAgent` is single-turn unless `max_tool_iterations` is raised, and Agent Framework’s `Agent` keeps invoking tools until it can return an answer. Another: AutoGen’s high-level `Team` sits on an event-driven core, and Agent Framework centers on a typed graph workflow. Those are the guide’s distinctions. This page did not port a project.

## Why do the framework star pages skip this?

They are release tables. The question they rank for is which framework shipped, and which repository has the stars. Maintenance is a different question, and it is the one a person asks before installing `autogen-agentchat`.

The November 5 report copies stars, forks, issues, license, language, creation, and the latest release for 19 repositories. AutoGen is one row. LangChain led that snapshot at 149,047 stars. AutoGen’s 61,706 was enough to sit in the table and not enough to force a sentence about the README. The November 9 comparison reads the license and the latest tag again. AutoGen’s tag had not changed since September 30, 2025, so the row looks quiet, and the page says so. Quiet is not the same sentence as “Microsoft says it is not providing security fixes.”

The practical stake is the star count. 61,753 stars still sat on a repository whose own front page says there will be no security fixes. A star is an account’s bookmark, and it does not come off when a README changes. A tutorial from 2024 still finds the package. The install block is still in the README, under the caution, including `pip install -U "autogen-agentchat"`. The caution is above the install. Both are on the page.

The count of stars on the successor is the other stake. Agent Framework has the commits and the November 7 release. AutoGen has the reputation, measured the only way this page measured it: 61,753 stars against 14,598.

How an agent framework fits the loop around a model is [How do AI agents work?](/blog/how-do-ai-agents-work). The harness definition is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness). Both sit on the [agent harnesses hub](/topics/harnesses). A separate November 9 count, of stars on agent products rather than on these three libraries, is [How many GitHub stars does OpenClaw have?](/research/how-many-github-stars-does-openclaw-have).

## FAQ

### Is AutoGen deprecated?

Microsoft’s README says the project is archived and no longer maintained, and that Microsoft is not providing bug fixes, security fixes, new features, or support. At 07:41 UTC on November 9, 2026, GitHub’s repository API still returned `archived: false`. The latest release was python-v0.7.5, published September 30, 2025. The repository had 61,753 stars.

### Did GitHub archive the AutoGen repository?

The `archived` field was false. That field is the archive switch. The README, and the October 28 commit that adds an archive caution to the landing page, are text in the repository. They do not flip the switch by themselves.

### When did AutoGen’s README start saying archived?

On October 16, 2026, in commit 004749e6b7. The README at the April 6, 2026 banner commit said maintenance mode, and that the project would not receive new features and was community managed going forward.

### Is Semantic Kernel deprecated too?

Its README says Semantic Kernel is now Microsoft Agent Framework. The API the same morning returned `archived: false`, 28,747 stars, and release dotnet-1.82.0, published November 7, 2026. The README does not say Microsoft has stopped fixes.

### What does Microsoft say to use instead of AutoGen?

The AutoGen README and the Learn overview both name Microsoft Agent Framework. The overview calls it the direct successor of AutoGen and Semantic Kernel. The successor’s repository had 14,598 stars, and its latest release was python-1.25.0, published November 7, 2026.
