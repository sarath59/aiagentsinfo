---
title: "How Many Repos Use AGENTS.md? 6,006 of 22,854 on October 16, 2026"
description: "6,006 of 22,854 popular, active GitHub repositories had a root AGENTS.md or CLAUDE.md on October 16, 2026. That is 26.3%. The AGENTS.md homepage, read November 9, still says over 60,000 projects."
date: "2026-11-09"
updated: "2026-11-09"
type: paper-breakdown
topics:
  - research
  - harnesses
  - how-agents-work
  - tools-saas
companies:
  - arxiv
  - github
  - anthropic
  - openai
contentLicense: true
absoluteTitle: true
paperTitle: "What Open-Source Projects Tell Their Coding Agents: A Census of AGENTS.md and CLAUDE.md"
paperAuthors: "Pawel Zarzycki"
paperYear: 2026
paperUrl: "https://arxiv.org/abs/2610.31715"
venue: "arXiv:2610.31715v2 [cs.SE], revised October 26, 2026. First submitted October 22, 2026. License CC BY 4.0."
dataset:
  title: "AGENTS.md census figures from Zarzycki 2026, plus a November 9 reading of the spec site"
  description: "Adoption counts copied from arXiv:2610.31715v2. On October 16, 2026 the paper’s frame held 22,854 repositories and 6,006 with a root AGENTS.md or CLAUDE.md. Star-tier and language tables are the paper’s Table 16 and Table 4. On November 9, 2026 the AGENTS.md homepage still said over 60,000 open-source projects, and agentsmd/agents.md had 25,408 stars."
  isBasedOn: "https://arxiv.org/abs/2610.31715"
abstract: |
  On October 16, 2026, Pawel Zarzycki’s census found a root AGENTS.md, a root CLAUDE.md, or both in 6,006 of 22,854 public GitHub repositories. That is 26.3%. The frame was repositories with at least 1,000 stars, a push in the previous 90 days, no fork and no archive flag, in thirteen languages. Among the 89 repositories with 100,000 stars or more, 59.6% had one of the two files.

  The AGENTS.md homepage, fetched November 9, 2026, still says the format is used by over 60,000 open-source projects. That sentence and the census count different sets. The spec repository agentsmd/agents.md had 25,408 stars the same morning. This note was published November 9, 2026. The adoption counts, the star-tier table, and the language table were checked against the PDF of arXiv:2610.31715v2.
whyItMatters: |
  Guides that rank for “what is AGENTS.md” repeat the homepage’s “over 60,000” and then explain how to write the file. They do not say how many popular, active repositories had one on a named day, or what those files require. The census does. One in four repositories in a defined popular set had root instructions. Adoption rises with stars, from 23.2% of the 1,000-to-5,000-star tier to 59.6% of the 89 repositories at 100,000 stars or above. Where both filenames exist, CLAUDE.md usually points at AGENTS.md.

  The content findings are a separate kind of evidence. The paper coded 341,852 statements with language models and a human review of 60 statements. It reports that 74.0% of directives give no reason, and that commit-message rules prohibit AI attribution more often than they require it, while pull-request rules more often require disclosure. The human reviewer agreed with the models on description versus rule and much less on subject. A harness, on this site, is the loop around a model. An AGENTS.md file is one of the instruction files that loop reads before it edits a repository.
keyFindings:
  - "6,006 of 22,854 repositories (26.3%) had a root AGENTS.md, a root CLAUDE.md, or both on October 16, 2026. The split is 2,566 with only AGENTS.md, 1,052 with only CLAUDE.md, and 2,388 with both. Of those with both, CLAUDE.md defers to AGENTS.md in 1,540 repositories and the reverse happens in 182."
  - "Table 16: 59.6% of 89 repositories with 100,000 or more stars had either file, against 23.2% of 16,619 repositories with 1,000 to 5,000 stars. The four tier sizes sum to 22,854. Table 4: TypeScript is 40.8% of 4,048 repositories, Python 24.3% of 5,015, C 13.0% of 1,272. The thirteen language rows sum to 22,854."
  - "74.0% of directives carry no reason, on Sonnet’s codes reweighted to the population. 80.9% of instruction sets mark at least one rule as mandatory, and 77.8% prohibit something. The median instruction set has 818 words. 98.2% contain at least one rule (95% CI 97.3–98.9)."
  - "On files with commit-message rules, Haiku’s uncorrected codes require AI attribution in 3.5% and prohibit it in 7.4%. The prose gives a repository cut: 7.5% prohibit it (95% CI 6.3–8.9) and 59 require it. Pull-request files require AI-use disclosure in 5.7% and prohibit it in 1.9%."
  - "948 of 5,998 instruction sets (15.8%) match an /init signature. The opening line of claude /init appears in 692 (11.5%). 81.8% of instruction sets were edited after creation. Counting the other formats the paper lists, 6,652 repositories (29.1%) have at least one, and 646 have another format with no root AGENTS.md or CLAUDE.md."
methodology: |
  The paper is arXiv:2610.31715, version 2, revised October 26, 2026. Version 1 was submitted October 22, 2026 at 05:44:41 UTC. The abstract page, read November 9, 2026, lists one author, Pawel Zarzycki, primary category cs.SE, and a cross-list to cs.AI. The license link on that page is CC BY 4.0. This note is a separate article and uses the same license. The DOI the abstract page prints is https://doi.org/10.48550/arXiv.2610.31715.

  The PDF and the HTML were both read on November 9. The counts 22,854 and 6,006, the 26.3% and 59.6% rates, the file split 2,566 / 1,052 / 2,388, Table 4, Table 16, the 74.0% sentence, and the hypothesis verdicts below were checked in the PDF. The HTML agreed on those figures. This note does not re-query the 22,854 repositories.

  The frame, dated 2026-10-16 in the paper, is public repositories with at least 1,000 stars, a push within the preceding 90 days, neither a fork nor archived, and one of thirteen primary languages: Python, JavaScript, TypeScript, Java, C#, C++, C, Go, Rust, PHP, Ruby, Kotlin, or Swift. GitHub’s search API returned 22,854. An adopter has a root AGENTS.md or CLAUDE.md, exact case, on the default branch. The paper collected files through the GitHub API and did not clone. Symbolic links and thin imports were resolved so text was not counted twice. Structural features use 5,998 joined instruction sets. Content is coded on 6,578 files that do not merely defer to the other file.

  Statements were segmented with Claude Haiku 5.5, producing 341,852 statements, 99.4% with spans found verbatim. Headline shares use Sonnet 5.5 on 992 sample repositories whose files were coded completely, reweighted by the inverse of the repository’s inclusion probability. Element tables use Haiku’s codes on the full corpus, uncorrected. The author coded 60 statements before seeing the model annotations. The paper says coding cost $13.83 for an existing-taxonomy comparison and $195.68 for statement extraction and annotation, using Haiku 5.5, Sonnet 5.5, and Opus 5.5 through Amazon Bedrock in October 2026.

  The November 9 additions are outside the paper. The AGENTS.md homepage was fetched that day. GET https://api.github.com/repos/agentsmd/agents.md returned during a pass whose last HTTP Date header was 13:39:04Z.
limitations:
  - "The 6,006 count is root AGENTS.md and CLAUDE.md inside one frame: 1,000 stars, a push in the prior 90 days, thirteen languages, public, not a fork, not archived, on October 16, 2026. Nested files are excluded. The homepage’s “over 60,000 open-source projects,” read November 9, is a different sentence and a different set. This note does not treat either number as the size of GitHub."
  - "File presence is not evidence that an agent read the file, followed it, or that the file changed task success. The paper says the effect of instruction files is contested and makes no effect claim of its own."
  - "Content percentages are model codes. On 60 statements the reviewer agreed with the models on description versus rule in 82–83% of statements once references were excluded, and on subject area in 43–50%. Subject categories and the element stances remain model-defined. A single reviewer gives no agreement between humans."
  - "The 7.5% repository figure for prohibiting AI attribution in commit messages, with a confidence interval, is not the same cut as Table 1’s 7.4% of files. The paper’s “59 require it” is a count, and the sentence does not print the denominator next to the 59."
  - "Generator signatures mostly detect Claude Code’s /init line. Tools that leave no signature are invisible in that 15.8%. AI-marked commits depend on a trailer the tool may not add. The paper says that among adopters with any AI-marked commit in their latest 100 commits, 88.0% have a Claude marker."
  - "Claude Code’s support for AGENTS.md is dated September 18, 2026 in the paper’s citation of changelog v2.1.277. This note did not re-read that changelog. The census is four weeks after the date the paper uses."
  - "Project type is Haiku’s classification of repository metadata. Agreement with the reviewer on type was kappa 0.43 on 29 repositories. The paper calls those contrasts indicative. AI focus agreed more closely, kappa 0.80."
references:
  - title: "Zarzycki, What Open-Source Projects Tell Their Coding Agents (arXiv:2610.31715)"
    url: "https://arxiv.org/abs/2610.31715"
    note: "Version 2 revised October 26, 2026. Version 1 submitted October 22, 2026, 05:44:41 UTC. cs.SE, cross-listed cs.AI. Abstract page read November 9, 2026. License link CC BY 4.0."
  - title: "PDF of arXiv:2610.31715"
    url: "https://arxiv.org/pdf/2610.31715"
    note: "Read November 9, 2026. Adoption counts, Table 4, Table 16, the 74.0% sentence, and the hypothesis verdicts were checked here."
  - title: "HTML of arXiv:2610.31715"
    url: "https://arxiv.org/html/2610.31715"
    note: "Read November 9, 2026. The checked figures agreed with the PDF."
  - title: "AGENTS.md homepage"
    url: "https://agents.md/"
    note: "Fetched November 9, 2026. The page says the format is used by over 60,000 open-source projects and describes it as a README for agents."
  - title: "GitHub REST API, agentsmd/agents.md"
    url: "https://api.github.com/repos/agentsmd/agents.md"
    note: "25,408 stars. HTTP Date 13:39:04Z on November 9, 2026. SPDX id MIT. pushed_at 2026-09-10T18:46:16Z."
  - title: "DOI for the preprint"
    url: "https://doi.org/10.48550/arXiv.2610.31715"
    note: "The DOI printed on the arXiv abstract page."
citation:
  apa: "Zarzycki, P. (2026). What open-source projects tell their coding agents: A census of AGENTS.md and CLAUDE.md. arXiv. https://doi.org/10.48550/arXiv.2610.31715"
  bibtex: |
    @article{zarzycki2026agentsmd,
      title={What Open-Source Projects Tell Their Coding Agents: A Census of AGENTS.md and CLAUDE.md},
      author={Zarzycki, Pawel},
      year={2026},
      journal={arXiv preprint arXiv:2610.31715},
      doi={10.48550/arXiv.2610.31715},
      note={Census date 2026-10-16. Version 2 revised 2026-10-26}
    }
ledeQuestion: "How many repositories use AGENTS.md?"
ledeAnswer: "On October 16, 2026, 6,006 of 22,854 popular, active GitHub repositories had a root AGENTS.md, a root CLAUDE.md, or both. That is 26.3 percent. The AGENTS.md homepage, read November 9, still says over 60,000 projects. Those counts cover different sets."
faq:
  - question: "How many repositories use AGENTS.md?"
    answer: "In Zarzycki’s October 16, 2026 census, 6,006 of 22,854 popular, active repositories had a root AGENTS.md, a root CLAUDE.md, or both. That is 26.3%. The set required 1,000 stars, a push in the prior 90 days, and one of thirteen languages. The AGENTS.md homepage, read November 9, says over 60,000 open-source projects, which is a wider claim this paper does not remeasure."
  - question: "What is AGENTS.md?"
    answer: "The homepage calls it a simple, open format for guiding coding agents, a README for agents, in plain Markdown. The census treats a root AGENTS.md and a root CLAUDE.md as one instruction set. Of 2,388 repositories with both names, CLAUDE.md points at AGENTS.md in 1,540."
  - question: "Do more popular repositories adopt it?"
    answer: "Yes, inside this frame. Table 16 shows 23.2% of the 16,619 repositories with 1,000 to 5,000 stars, and 59.6% of the 89 repositories with 100,000 stars or more. The four tier sizes add up to 22,854."
  - question: "What do the files tell the agent to do?"
    answer: "The median instruction set is 818 words, and 98.2% contain at least one rule. Code conventions appear as rules in 74.4% of instruction sets, build and delivery in 72.6%, and agent workflow in 67.3%, on Sonnet’s reweighted codes. 74.0% of directives give no reason. Those content shares are model codes. A human review of 60 statements agreed much less on subject than on the split between a description and a rule."
  - question: "Do projects want AI credited in commits?"
    answer: "The paper’s file-level table says commit-message rules prohibit AI attribution in 7.4% of those files and require it in 3.5%. The prose says 7.5% of repositories with commit-message rules prohibit it, and that 59 require it. Pull-request files require disclosure in 5.7% and prohibit it in 1.9%. The two cuts are printed separately because they are not the same denominator."
---

On October 16, 2026, **6,006** of **22,854** popular, active GitHub repositories had a root `AGENTS.md`, a root `CLAUDE.md`, or both. That is 26.3%.

Pawel Zarzycki’s census is arXiv:2610.31715, version 2, revised October 26, 2026. The pages that rank for the filename repeat a round number from the format’s homepage. The homepage, fetched November 9, 2026, still says the format is used by over 60,000 open-source projects. The census says how many repositories cleared a star floor, a recency floor, and a language list, and then had one of two root files. Both sentences can be true. They are not the same count.

## What is AGENTS.md?

A plain Markdown file that coding agents are expected to read before they change a repository. The homepage calls it a README for agents.

The page fetched November 9 opens with “A simple, open format for guiding coding agents, used by over 60k open-source projects.” It says a README is for humans and that AGENTS.md holds build steps, tests, and conventions that would clutter that README. The sample on the page has setup commands and a code-style section. The compatible-agent list on that page includes Codex, Cursor, Copilot, Gemini CLI, Aider, Devin, Zed, and others. This note did not test whether each named tool loads the file.

The spec repository `agentsmd/agents.md` returned 25,408 stars, 1,949 forks, the SPDX id MIT, and `pushed_at` 2026-09-10T18:46:16Z. The HTTP Date on that response was 13:39:04Z on November 9, 2026. Stars on the spec repository are not the adoption count. The paper cites the homepage as accessed on the census day, October 16.

A [harness](/glossary/harness) is the software around the model: the loop, the tools, the permissions, the stop rules. An instruction file is one input to that loop. [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness) describes a short AGENTS.md used as a map. Thoughtworks’ write-up of the same pattern is [harness engineering at scale](/blog/what-is-harness-engineering-at-scale-thoughtworks-radar).

## How many popular repositories had a root file on October 16?

6,006 of 22,854. Adoption is higher in the repositories with the most stars.

The search that built the frame asked for public repositories with at least 1,000 stars, a push in the previous 90 days, that were not forks and not archived, in thirteen languages. GitHub returned 22,854. A repository counts if the default branch has a root `AGENTS.md` or a root `CLAUDE.md` in that exact case.

| Stars | Repositories | AGENTS.md | CLAUDE.md | Either |
| --- | --- | --- | --- | --- |
| 100,000 or more | 89 | 52.8% | 31.5% | 59.6% |
| 10,000–100,000 | 3,059 | 32.3% | 21.5% | 37.0% |
| 5,000–10,000 | 3,087 | 26.1% | 17.9% | 31.2% |
| 1,000–5,000 | 16,619 | 18.7% | 13.2% | 23.2% |

89 + 3,059 + 3,087 + 16,619 = 22,854. The bottom tier is 23.2%. The top tier is 59.6%, and it contains 89 repositories. The paper’s Figure 1A is this table.

Of the 6,006 adopters, 2,566 have only `AGENTS.md`, 1,052 have only `CLAUDE.md`, and 2,388 have both. 2,566 + 1,052 + 2,388 = 6,006. Among the 2,388, `CLAUDE.md` defers to `AGENTS.md` through a link, an import, or a pointer in 1,540 repositories. The reverse pointer appears in 182. The paper says 598 keep two files that each have content of their own. 1,540 + 182 + 598 = 2,320, which is 68 short of 2,388. The paper’s sentence does not account for those 68 in the three buckets it names. This note leaves the gap as the paper left it.

New adopters moved from starting with `CLAUDE.md` to starting with `AGENTS.md`. The paper says 73.7% of new adopters from January through August 2025 started with `CLAUDE.md`, and that the `CLAUDE.md`-first share since May 2026 is 17.1%. It dates Claude Code’s support for `AGENTS.md` to September 18, 2026, from changelog version 2.1.277, and draws that date as a dashed line on the monthly chart. This note did not re-open the changelog. The census day is four weeks after the date the citation uses.

## What else did the census count, besides the two root names?

6,652 repositories, 29.1%, had at least one of the instruction paths the paper listed. 646 had one of the other paths and no root `AGENTS.md` or `CLAUDE.md`.

| Path | Repositories | Share of 22,854 | Also has root AGENTS.md |
| --- | --- | --- | --- |
| /AGENTS.md | 4,954 | 21.7% | — |
| /CLAUDE.md | 3,440 | 15.1% | 69.4% |
| .github/copilot-instructions.md | 1,024 | 4.5% | 52.3% |
| .cursor/rules/ | 347 | 1.5% | 64.6% |
| .github/instructions/ | 273 | 1.2% | 59.0% |
| /GEMINI.md | 179 | 0.8% | 83.2% |
| .claude/CLAUDE.md | 150 | 0.7% | 56.7% |
| /.cursorrules | 94 | 0.4% | 66.0% |
| Root name in another case | 47 | 0.2% | 8.5% |
| /.windsurfrules | 20 | 0.1% | 95.0% |
| Any of these | 6,652 | 29.1% | — |

4,954 equals 2,566 + 2,388, the only-AGENTS.md repositories plus the both-file repositories. 3,440 equals 1,052 + 2,388. The root-file census and this wider list meet. 6,652 minus 6,006 is 646, the paper’s count of repositories that use another format and no root file. Copilot’s instruction path is the largest of those other formats, at 1,024 repositories, 4.5%. Cursor’s `.cursor/rules/` is 347. A case-variant filename such as `agents.md` at the root is 47 repositories, and only 8.5% of those also have the exact-case `AGENTS.md`. The exact-case rule in the main count is doing work.

## What do the files contain?

Rules, in almost every instruction set. The median length is 818 words. Most directives do not say why.

Sonnet’s codes, reweighted to the population, put at least one rule in 98.2% of instruction sets (95% CI 97.3–98.9). A repository’s statements average 52.6% rules, 29.8% descriptions, and 17.6% references. The rules cover code and its artefacts in 88.7% of repositories, workflow in 85.4%, the agent’s own behaviour in 79.3%, and the instruction files themselves in 52.7%.

The subject shares the paper prints for rules: code conventions and quality 74.4%, build, environment, and delivery 72.6%, agent workflow and conduct 67.3%. Project knowledge appears in 86.2% of instruction sets, and 54.3% contain a rule on that area. The most common specific rule subjects are verification before declaring work done (49.7%), test writing (48.2%), and the instruction files themselves (44.3%). Each of those three is under half of repositories.

The 10th and 90th percentiles of length are 163 and 3,010 words. A file can be a short command list or a long manual. The median, 818, is the figure to remember.

## Do the rules give a reason?

Most instruction sets contain a reason somewhere. Most directives do not carry one. 74.0% of directives have none.

82.9% of instruction sets give a reason at least once. 10.8% cite an incident or evidence. 80.9% mark at least one rule as mandatory, and 77.8% prohibit something, yet prohibitions average 15.8% of a repository’s directives. Unmarked imperatives are the most common form. Rules are tied to a moment in the workflow in 54.7% of instruction sets, and 53.7% state an exception. 8.6% of repositories name a specific agent somewhere. 8.3% address human contributors. Vague directives appear in 40.5% of repositories and are 3.5% of directives.

These shares are Sonnet’s codes on the reweighted sample. The human review, below, is why this note keeps the label on them.

On collaboration files, Haiku’s uncorrected codes name concrete requirements. Of files with a rule on pull-request descriptions, 27.2% require a test plan, 24.2% require the project’s template, and 23.3% require linked issues. Of files with a commit-message rule, 36.7% require Conventional Commits. Test-writing rules prohibit trivial tests in 8.1% of those files and prohibit weakening tests so they pass in 4.9%.

## Do projects agree about AI attribution?

Commit-message rules prohibit it more often than they require it. Pull-request rules more often require disclosure. The paper prints both a file table and a repository sentence, and the percentages are not identical.

| Cut | Require | Prohibit |
| --- | --- | --- |
| Commit messages, share of files with such a rule (Table 1, Haiku) | 3.5% | 7.4% |
| Pull-request descriptions, share of files with such a rule (Table 1) | 5.7% | 1.9% |
| Commit messages, repositories, in the prose | 59 repositories | 7.5% (95% CI 6.3–8.9) |
| Pull requests, in the prose | 5.8% | 1.9% |

The 7.5% and the 7.4% are close and they are not the same statistic. One is repositories, with an interval. One is files, uncorrected. The “59 require it” is a count. The sentence does not print how many repositories had a commit-message rule, so this note does not turn 59 into a percentage. The pull-request prose says 5.8% require disclosure and 1.9% prohibit it, mostly in different repositories. The file table says 5.7% and 1.9%. Trailer-based measures of AI use inherit the disagreement: a project that forbids the trailer and a project that demands it will not leave the same trace for the same amount of agent work.

[Claude Code’s “Don’t ask again” files](/blog/claude-code-dont-ask-again) are a different instruction surface, permission prompts rather than a root markdown file. The census does not count them.

## Where does the text come from, and do projects edit it?

15.8% of instruction sets match an `/init` signature. 81.8% were edited after they were created.

948 of 5,998 instruction sets match a signature the paper associates with an `/init` command. The opening line of `claude /init` is in 692, which is 11.5%. Codex’s heading set appears in 146. The share falls with popularity, from 17.1% in the lowest star tier to 9.4% in the highest. The paper says the detector mainly measures Claude Code, because other tools leave no verbatim line.

93 instruction sets, 1.6%, contain a block a tool writes into the file. The Next.js development server accounts for 44 of those. 3.4% share a paragraph verbatim with the files of at least two other owners. 17.7% were created in an AI-marked commit, and 41.7% have at least one AI-marked commit. Among the 5,942 instruction sets with a file history, 33.1% carry a text trace or were created in an AI-marked commit. The paper’s “a third” is that 33.1%.

81.8% were edited after creation. Sets with a generator signature were edited about as often as sets without one, 82.4% against 81.7%, and the paper does not adjust those two shares for age. By file, 80.0% of `AGENTS.md` files and 67.7% of `CLAUDE.md` files have more than one commit. 24.5% of the 106,279 commits that touched agent files are AI-marked. The marker is a trailer. It does not identify which lines a model wrote.

## Which languages have the files?

TypeScript is the highest share, 40.8% of 4,048 repositories. C is the lowest, 13.0% of 1,272. Python, the largest group, is 24.3% of 5,015.

| Language | Repositories | AGENTS.md | CLAUDE.md | Either |
| --- | --- | --- | --- | --- |
| TypeScript | 4,048 | 34.4% | 24.5% | 40.8% |
| Rust | 1,706 | 28.1% | 18.9% | 32.7% |
| Go | 2,264 | 24.5% | 16.6% | 28.9% |
| Swift | 474 | 23.4% | 17.9% | 28.1% |
| Kotlin | 611 | 21.1% | 14.9% | 26.0% |
| Java | 1,262 | 20.9% | 12.4% | 24.6% |
| Python | 5,015 | 19.5% | 14.9% | 24.3% |
| C# | 964 | 18.2% | 12.0% | 23.5% |
| PHP | 804 | 14.6% | 9.1% | 18.9% |
| JavaScript | 2,211 | 13.0% | 10.1% | 17.5% |
| C++ | 1,785 | 14.7% | 7.7% | 17.4% |
| Ruby | 438 | 15.1% | 8.9% | 17.1% |
| C | 1,272 | 10.7% | 6.3% | 13.0% |

The thirteen repository counts sum to 22,854. JavaScript’s either-share, 17.5%, is well below TypeScript’s 40.8% even though the names are often discussed together. The percentages are the paper’s Table 4. They are rounded, so a reader who multiplies them back by the repository count will not always land on an integer.

## Which of the paper’s hypotheses held?

Three of six prespecified hypotheses held. More stars go with more rules about pull requests or AI contribution policy. Compiled languages go with more build-and-run statements. In a repository that has both files, `CLAUDE.md` is more descriptive than `AGENTS.md`.

| Hypothesis | Verdict | Effect the paper prints |
| --- | --- | --- |
| H1. A higher AI-marked share goes with more agent rules, permission rules, and prohibitions | Not supported | IRR 0.977 (0.959–0.996) on the first of three tests |
| H2. More collaboration goes with more workflow rules and fewer descriptions | Mixed, 2 of 4 | Merged pull requests: workflow IRR 1.027; human authors moved workflow the other way |
| H3. Compiled languages state how to build and run more often | Supported | OR 1.68 (1.48–1.91) |
| H4. Emphasis goes with more rules on agent failure modes | Not supported | OR 0.93 (0.88–0.99) |
| H5. CLAUDE.md is more descriptive than AGENTS.md in the same repository | Supported | +6.3 percentage points (4.2–8.4), 484 pairs |
| H6. More stars go with rules on pull requests or AI policy | Supported | OR 1.36 (1.29–1.44) per standard deviation of log stars |

The tests use 5,587 repositories with at least five coded statements. A hypothesis counts as supported only if every one of its tests points the predicted way and the adjusted p-value is under 0.05. H1 and H4 are significant in the wrong direction, which is why they are not supported. The paper says H3, H6, and the pull-request half of H2 still hold on the Sonnet sample and when either of the two largest languages is left out.

The exploratory models, 99 tests on 5,586 instruction sets, associate commits in the past year with more of the content outcomes than the other predictors: 11 of 13 tests on that predictor stay significant after the false-discovery correction. LLM and agent projects are 27.9% of adopters and 13.3% of matched controls, an odds ratio of 2.76 within star tier and language. A post hoc check that holds age and activity fixed, and drops agent-tooling projects, shrinks that ratio to 1.54 (95% CI 1.28–1.84). Libraries are under-represented, odds ratio 0.58. The paper classifies project type with Haiku on repository metadata. On 29 repositories the reviewer agreed on type at kappa 0.43 and on AI focus at kappa 0.80. The type contrasts are the paper’s “indicative” results.

## How much did the human review agree?

The reviewer accepted the statement boundaries in 55 of 60 cases, 92%. Agreement on the subject was 43% to 50%.

The 60 statements were coded before the reviewer saw the model labels. Restatements and extracted elements were accepted in 56 of 60, 93%. The free-text subject fit in 57 of 60, 95%. Against the models, description versus rule agreed in 82–83% of statements once references were excluded. The three-way split into description, rule, and reference agreed in 62–67%, kappa 0.33–0.40. Subject area agreed in 43–50%. The fine subject agreed in 32–37%.

The paper’s own reading of that gap: the models agree with each other more closely than with this reviewer, and subject categories stay model-defined. One reviewer cannot produce a human-human kappa. The adoption counts in the first table do not depend on these codes. The 74.0%, the subject shares, and the attribution stances do.

## What would a fresh count have to change?

A count that wants to update the 6,006 has to keep the frame or publish a new one. “Over 60,000” does not update it. A live GitHub code search for files named `AGENTS.md`, kept on a separate row so it is not mistaken for this census, is the [AGENTS.md adoption tracker](/trackers/agents-md).

The homepage number, read November 9, has no date, no star floor, and no language list on the sentence itself. The census has all three, and a day. Adding nested `AGENTS.md` files, dropping the star floor, or including archived repositories would move the numerator and the denominator together. The paper’s data-availability section says the dataset is on Hugging Face and does not print a URL. This note did not locate the dataset from that sentence, and it did not re-run the search.

Which libraries people actually install around these agents is a different November 9 count: [Which AI agent framework do people install?](/blog/which-ai-agent-framework-do-people-install). Coding-agent prices and the dates already on vendor pages are the [30-day coding-agents brief](/reports/ai-coding-agents-next-30-days). The sourced product table is [Best AI coding agents](/best/ai-coding-agents). How the loop uses a file like this one is [How do AI agents work?](/blog/how-do-ai-agents-work).
