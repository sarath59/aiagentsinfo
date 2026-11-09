---
title: "Claude Code Don't Ask Again: 1,122 Public Files Held a Secret (Nov 2026)"
description: "1,122 public copies of .claude/settings.local.json held at least one secret, 1,379 in all, in the census The Hacker News and iTnews attribute to Apiiro. Claude Code writes that file when you pick Yes, and don't ask again."
takeaways:
  - "Claude Code's permissions page says Yes, and don't ask again saves a Bash command permanently, per repository, in .claude/settings.local.json. A file-edit approval is not saved there. It lasts until the session ends."
  - "The Hacker News on November 7, 2026, and iTnews on November 9, citing Apiiro, report 104,185 public copies of that file. 1,122 of them hold at least one secret, 1,379 distinct secrets in all. Apiiro did not test whether the secrets still work."
  - "The settings page says the first write adds the filename to a global git excludes file on that computer. It does not add the filename to the project's own .gitignore, and a global exclude does not untrack a file that is already committed."
date: "2026-11-09"
updated: "2026-11-09"
category: explainer
topics:
  - news
  - harnesses
  - how-agents-work
audience:
  - everyone
  - builders
companies:
  - anthropic
  - claude
  - claude-code
  - github
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Claude Code settings.local.json secret census as reported on November 7 and 9, 2026"
  description: "Counts The Hacker News (November 7, 2026) and iTnews (November 9, 2026) attribute to Apiiro's public-GitHub census of .claude/settings.local.json. AI Agents Info did not recount GitHub. A direct request to Apiiro's write-up on November 9 returned a Cloudflare challenge. 1,122 of 104,185 copies is 1.08 percent, which is this page's division of the two reported totals."
  isBasedOn: "https://thehackernews.com/2026/11/claude-codes-dont-ask-again-file.html"
sources:
  - title: "Claude Code, Configure permissions (read November 9, 2026)"
    url: "https://code.claude.com/docs/en/permissions"
  - title: "Claude Code, Settings files and precedence (read November 9, 2026)"
    url: "https://code.claude.com/docs/en/settings"
  - title: "Swati Khandelwal, The Hacker News, Claude Code's Don't Ask Again file exposes passwords and keys in 1,122 public copies (November 7, 2026)"
    url: "https://thehackernews.com/2026/11/claude-codes-dont-ask-again-file.html"
  - title: "Juha Saarinen, iTnews, Don't ask again in Anthropic's Claude Code leaks developer secrets (November 9, 2026)"
    url: "https://www.itnews.com.au/news/dont-ask-again-in-anthropics-claude-code-leaks-developer-secrets-630203"
  - title: "Apiiro, Coding agents leaking secrets on GitHub (write-up URL cited by the coverage; direct fetch on November 9 returned a Cloudflare challenge)"
    url: "https://apiiro.com/blog/coding-agents-leaking-secrets-github-dont-ask-again"
  - title: "Hacker News thread, item 50408126, comment by bcherny (read November 9, 2026)"
    url: "https://news.ycombinator.com/item?id=50408126"
  - title: "Claude Code in the AI Agents Info directory"
    url: "https://www.aiagentsinfo.com/directory/claude-code"
faq:
  - question: "What does don't ask again do in Claude Code?"
    answer: "On the permissions page read November 9, 2026, Yes, and don't ask again saves an allow rule for a Bash command permanently, for that repository and that command. The same choice for a WebFetch domain is permanent per repository and domain. A file-edit approval is different. It lasts until the session ends and is not written to .claude/settings.local.json."
  - question: "How many Claude Code settings files held a secret?"
    answer: "The Hacker News on November 7, 2026, and iTnews on November 9, both citing Apiiro, report 104,185 public copies of .claude/settings.local.json in 103,617 repositories. 1,122 copies hold at least one secret, and those copies hold 1,379 distinct secrets. Adding older versions, the shared settings file, and saved agent chat logs, the same articles put the wider total at 2,539 secrets across 1,994 repositories. AI Agents Info did not recount GitHub."
  - question: "Did anyone check that the secrets still work?"
    answer: "Both articles say Apiiro did not test whether the credentials still work. Both say one organization Apiiro notified confirmed that its key had been live. A value counted as a secret, in The Hacker News account, when it matched a known key format or when a password or token sat beside the address of a public server, and an AI reviewer agreed."
  - question: "Does Claude Code gitignore settings.local.json?"
    answer: "The settings page says the first time Claude Code writes the file in a git repository that does not already ignore it, Claude Code adds **/.claude/settings.local.json to the user's global git excludes file. That exclude stays on that computer. The same page says that if you created the file by hand, and Claude Code has not written to it yet, you add it to the project's .gitignore yourself. A global exclude does not remove a file that is already tracked."
  - question: "Is don't ask again the same as dontAsk mode?"
    answer: "No. Don't ask again is one option on a permission prompt, and it can save an allow rule. dontAsk is a permission mode. The permissions page says dontAsk auto-denies calls that would otherwise prompt, aside from the exceptions that page lists, including tools you already allowed."
  - question: "What should you do if the file is in a repository?"
    answer: "The researchers' order, as The Hacker News prints it, is to rotate every password, token, and key the file has ever held before you delete the file. Deleting the current copy leaves older copies in git history and in forks. Then stop tracking the file and add it to the repository's own .gitignore. Open the copy on your own computer, even if it was never committed, and delete any rule that contains a secret."
---

On November 9, 2026, the phrase people were searching was Claude Code don't ask again. The product answer is on Claude Code's own permissions page. The count attached to it is someone else's. [The Hacker News](https://thehackernews.com/2026/11/claude-codes-dont-ask-again-file.html), on November 7, and [iTnews](https://www.itnews.com.au/news/dont-ask-again-in-anthropics-claude-code-leaks-developer-secrets-630203), on November 9, both cite an Apiiro census: 1,122 public copies of `.claude/settings.local.json` hold at least one secret, 1,379 distinct secrets in all. AI Agents Info read those two articles, the permissions page, and the settings page on November 9. A direct request to [Apiiro's write-up](https://apiiro.com/blog/coding-agents-leaking-secrets-github-dont-ask-again) that day returned a Cloudflare challenge, so the census below is the census those articles attribute to Apiiro. This page did not recount GitHub, and it did not test a key.

The file sits inside the [harness](/glossary/harness): the loop, tools, and permission stops around the model. The stop, on this site, is an [approval gate](/glossary/approval-gate). Claude Code is the coding agent in the [directory](/directory/claude-code). A separate November 9 note reads a public cost comparison of that harness against others: [Garry Tan harness evals](/research/garry-tan-harness-evals-november-2026).

## What does “don’t ask again” do in Claude Code?

Yes, and don't ask again can save the command you just approved, so a later session in that repository runs a matching command without asking.

[Claude Code's permissions page](https://code.claude.com/docs/en/permissions), read November 9, 2026, prints a table of what the option does. Bash commands are "Permanently per repository and command." WebFetch is "Permanently per repository and domain." Web search is "Permanently per repository." File modification is "Until session end." Read-only tools inside the working directory are not asked in the first place.

The same page says the prompt only offers don't ask again when it can show you everything the saved rule would allow. A saved rule covers what that option named, not a wider class of commands you did not see. For a compound command, the page gives `git status && npm test` as the example: the saved rule is for `npm test`, the subcommand that needed approval, and a single approval can save up to five rules.

That is the mechanism the news reports are about. If the thing you approved is one exact command, and the command has a password or a token in it, the allow rule is that string. The Hacker News says the researchers found saved commands with the secret still inside, and that they reproduced the behavior with Opus 5.5 and Fable 5.1. iTnews says the same reproduction, and says Apiiro treated it as a property of Claude Code rather than of the model.

## Where does Claude Code save the approval?

A permanent approval is written to `.claude/settings.local.json` at the root of the git repository, as an allow rule.

The permissions page says that when the approval saves permanently, Claude Code writes the rule to that file, resolved through worktrees to the main checkout. The rule then applies to later sessions anywhere in that repository, including a session started in a subdirectory or a worktree. A file-modification approval is the exception in the table. It is not saved to the file.

The [settings page](https://code.claude.com/docs/en/settings), read the same day, says Claude Code creates `.claude/settings.local.json` the first time you give a standing approval on a permission prompt, and it names "Yes, and don't ask again" for a Bash command as the example. The scope table calls the file personal to one project. The shared file, `.claude/settings.json`, is the one the same page tells a team to commit.

Two limits are on that page, and they matter if you go looking for the file and do not find it at the root. Outside a git repository, when the repository root is your home directory, on Windows, or when the root or its `.git` or `.claude` entry is not owned by your user, the file stays with `.claude/settings.json` instead. Before v2.1.211, Claude Code kept the file in the directory where you started the session. Current Claude Code still reads an older file left there, and permission rules from both files apply.

The settings page also says the local file's allow rules apply without the workspace trust step while the file stays untracked. If git is tracking the file, the trust step applies to it too.

## How many public copies held a secret?

The reported census is 104,185 public copies in 103,617 repositories. 1,122 copies, 1.08 percent of 104,185, hold at least one secret.

Both news articles print 104,185 copies, 103,617 repositories, 1,122 copies with at least one secret, and 1,379 distinct secrets. 1,122 divided by 104,185 is 1.08 percent. The Hacker News rounds the same ratio to about 1.1 percent. The wider total in both articles, once older versions of the file, the shared `.claude/settings.json`, and saved agent chat logs are included, is 2,539 secrets across 1,994 repositories.

The Hacker News describes how a value got into the 1,379. It matched a known key format, or a password or token sat beside the address of a public server, and an AI reviewer also had to agree. The article says the researchers do not say whether anyone has used these secrets. Both articles say Apiiro did not test whether the credentials still work, and that one company notified earlier confirmed its key had been live.

AI Agents Info did not repeat the search. The GitHub code-search API, requested without a token on November 9, returned 401. The figures in the table are the figures the two articles attribute to Apiiro.

| What was counted | Number | Who reported it |
| --- | --- | --- |
| Public copies of `.claude/settings.local.json` | 104,185 | The Hacker News and iTnews, citing Apiiro |
| Repositories holding those copies | 103,617 | Both |
| Copies with at least one secret | 1,122 | Both |
| Distinct secrets in the current copies | 1,379 | Both |
| Database passwords | 379 | Both |
| Supabase service-role keys | 122 | iTnews, citing Apiiro |
| SSH logins for public servers | 43 | Both |
| GitHub, GitLab, and npm tokens | 42 | Both |
| AWS keys | 23 | Both |
| Secrets once history, the shared settings file, and chat logs are included | 2,539 | Both |
| Repositories in that wider count | 1,994 | Both |
| Organizations among the owners | 63 | Both |

The Hacker News says more than a third of the secrets open a database directly, and it names the 379 database passwords inside that statement. iTnews puts 122 Supabase service-role keys in the same breath as those 379 passwords. This page does not add 379 and 122 and call the sum Apiiro's, because the November 7 article's paragraph does not print 122, and "including" does not say the two rows are a partition.

Three further counts are in The Hacker News and not in the iTnews article read for this page.

| What The Hacker News adds | Number |
| --- | --- |
| Repositories where a commit listing Claude as a co-author changed the file | 539 of 1,105 |
| Secrets present only in older versions of the file | 734, across 509 repositories |
| Forks carrying the same secrets as the originals | 211 forks of 74 repositories |
| Copies of the shared `.claude/settings.json` that hold a secret | 298 of 76,011 |

The same article says that as of Monday, every file with a secret was still on its repository's default branch, and that in half of those repositories the file had been there for at least 217 days. The article's dateline is November 7, 2026. It does not name which Monday.

It also says that of 16 coding agents whose documentation the researchers compared, Claude Code was the only one confirmed to save the full approved command in a project file by default. This page did not read those 16 documentation sets. That sentence is The Hacker News's account of the comparison.

## Why did secret scanners miss 215 files?

Of the 1,122 files with a secret, gitleaks flagged 564 and TruffleHog flagged 643. Neither flagged 215.

Both articles print those three counts, and both say the scanners were run without their verification step. The Hacker News's explanation is that most misses are passwords typed inside commands. A scanner built for known key formats can look straight past a password after `PGPASSWORD=`, `sshpass -p`, or `mysql -p`.

The three counts overlap. Files flagged by neither are 215, so files flagged by at least one scanner are 1,122 minus 215, which is 907. gitleaks plus TruffleHog is 564 plus 643, which is 1,207. The difference, 1,207 minus 907, is 300. On these counts, 300 files were flagged by both scanners. That subtraction is this page's. Neither article prints 300.

The Hacker News also says the file matters off GitHub. It is plain JSON in the project folder, and it can sit in an npm package, a Docker image, a zip archive, or a synced folder. The same article says the Shai-Hulud worm, in September 2025, ran TruffleHog over infected computers. That is a reason the local copy is part of the cleanup, not a claim that this census measured laptops.

## Does the git exclude stop a commit?

It stops a later commit on the computer that wrote the file. It does not travel with the repository, and it does not untrack a file that is already in git.

The settings page is specific. The first time Claude Code writes `.claude/settings.local.json` in a git repository that does not already ignore it, Claude Code adds `**/.claude/settings.local.json` to the global git excludes file. That path is `core.excludesFile` when the global git config sets it to an absolute or `~`-prefixed path. Otherwise it is `$XDG_CONFIG_HOME/git/ignore`, or `~/.config/git/ignore` when `XDG_CONFIG_HOME` is unset. Git on that computer then ignores the file in every repository.

The same paragraph says you do have to gitignore it yourself if you created the file by hand and Claude Code has not written to it yet. The scope table says the same thing in shorter form: "Claude Code keeps it out of git when it creates the file; if you create it by hand, add it to `.gitignore` yourself."

A global exclude is not the project's `.gitignore`. A teammate's clone does not inherit it. A file that was committed before the exclude existed stays in the repository, and it stays in history after someone deletes the current copy. The Hacker News's 734 secrets across 509 repositories are the older-version row of that fact. Its 211 forks of 74 repositories are the fork row.

Boris Cherny's comment on [Hacker News](https://news.ycombinator.com/item?id=50408126), posted by the account bcherny and beginning "Boris from the Claude Code team here," says: "We automatically gitignore it when Claude creates the file, so in this case the files were manually created and checked in." He links the settings docs. iTnews identifies him as Boris Cherny, head of Claude Code. The comment's inference and the co-author count are both public, and they are not the same claim. The Hacker News says that in 539 of the 1,105 repositories the researchers traced, a commit listing Claude as a co-author changed the file, and that the researchers take this to mean Claude often commits the file. This page has not read those commits. The settings page, read November 9, describes a global exclude on creation, plus a hand-created-file exception. It does not say every public copy was typed by hand, and it does not say Claude Code writes a project `.gitignore` line.

## Is don’t ask again the same as dontAsk mode?

No. One saves an allow rule. The other auto-denies prompts.

The permissions page lists `dontAsk` as a mode, next to `default` (Manual), `acceptEdits`, `plan`, `auto`, and `bypassPermissions`. In `dontAsk`, Claude Code auto-denies every call that would otherwise prompt, with the exceptions that page lists: a mod can still approve some calls, file reads in your working directories still run, and tools you pre-approved still run. `AskUserQuestion`, MCP tools marked `requiresUserInteraction`, reads from network paths, and connector tools an organization set to ask are denied even if you have allowed them.

`auto` is a third thing. The page says it runs without routine prompts, and a background classifier checks that shell commands and network requests align with your request before they run. The settings page does not say that auto mode writes `.claude/settings.local.json`. Boris Cherny's comment treats permission rules and auto mode as alternatives: "Permission rules are old hat. Everyone should be using auto mode instead. It is safer and also does not require manually maintaining finicky allow/deny lists. Auto mode is enabled by default and is included for free in all plans." That is his comment. This page did not re-check plan prices. List prices for Claude Code and Codex are in [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing).

A reader on the same thread wrote: "This still presumably happens in auto mode as it asks for sensitive commands (and the default is 'always allow,' which saves it)." Cherny replied: "Yeah good catch. Thinking through what we can do to improve this (ideas welcome)." In a separate reply he named approaches under consideration: "making sure auto mode catches this, building in basic secret scanning, a few other ideas. Going to prototype a few of these to understand the tradeoffs better before we ship something." His opening comment says Claude Code has historically not done secret scrubbing, and that the team is looking into what it can do.

The "good catch" reply agrees with a presumption about auto mode's sensitive-command prompt. It does not, by itself, say that auto mode writes the full command into `settings.local.json`. The documented writer of that file, on the pages read November 9, is the permanent don't-ask-again approval.

## What should you do if the file is in a repository?

Rotate the credentials first. Deleting the file does not remove a secret from git history or from a fork.

The Hacker News prints the researchers' order. Search the organization for `.claude/settings.local.json` and `.claude/settings.json`, and check history even where the current tree no longer has the file. Rotate every password, token, and key the files have ever held before cleaning up. Stop tracking the local file and add it to the repository's own `.gitignore`. The command the article prints for the untrack step is `git rm --cached .claude/settings.local.json`. Open the copy on your own computer, even if it was never pushed, and delete every rule that contains a secret. Keep the secret out of the command in the first place, by referring to a variable such as `$DB_URL`. Approve a pattern such as `Bash(npm run:*)` rather than one exact command.

For a security team, the same article's list is to treat agent folders, including `.claude/`, `.cursor/`, `.gemini/`, and `.specstory/`, and agent memory files, the way a team treats `.env` files, on laptops as well as in repositories. Add them to pre-commit and CI scanning, including history, with a scanner that catches passwords inside commands. Add `.claude/settings.local.json` to the organization's gitignore templates. Check credentials that are paired with a public server first.

None of that is a finding that a named key in the census still works. The only live confirmation either article reports is the one company.

## Why does the approval gate matter here?

An approval that remembers the exact command is a harness decision, and the remembered string is what ended up in public git.

On this site an [approval gate](/glossary/approval-gate) holds a named action until a person approves it. Don't ask again is that gate deciding to stay open for one command, and then writing the command down. A [guardrail](/glossary/guardrail) that only watches known key formats missed 215 of the 1,122 files, on the scanner counts above. A [sandbox](/glossary/sandbox) is a different control. Cherny pointed one Hacker News reader who objected to auto mode at the built-in `/sandbox`. The reader's reply on that thread was that the sandbox still has holes. This page did not re-test `/sandbox`.

The practical split, from the permissions table, is smaller than the headline. A file edit you approve is forgotten at the end of the session. A Bash command you tell it not to ask about again is stored, in the project, until you take the rule out. The census says 1,122 public copies still had a secret in that stored rule. The settings page says the protection that is supposed to keep the file local lives in one user's global git excludes, on one computer.

How a harness is scored once the permissions are in place is a different question. The method is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness). The product definition is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness).

## FAQ

### What does don’t ask again do in Claude Code?

On the permissions page read November 9, 2026, Yes, and don't ask again saves an allow rule for a Bash command permanently, for that repository and that command. The same choice for a WebFetch domain is permanent per repository and domain. A file-edit approval lasts until the session ends and is not written to `.claude/settings.local.json`.

### How many Claude Code settings files held a secret?

The Hacker News on November 7 and iTnews on November 9, both citing Apiiro, report 104,185 public copies of `.claude/settings.local.json` in 103,617 repositories. 1,122 copies hold at least one secret, 1,379 distinct secrets in all. The wider total they print, with history, the shared settings file, and chat logs, is 2,539 secrets across 1,994 repositories. AI Agents Info did not recount GitHub.

### Did anyone check that the secrets still work?

Both articles say the census did not test whether the credentials still work. Both say one notified organization confirmed that its key had been live. The Hacker News says a value counted when it matched a known key format, or when a password or token sat beside a public server, and an AI reviewer agreed.

### Does Claude Code gitignore settings.local.json?

The settings page says the first write adds `**/.claude/settings.local.json` to the user's global git excludes file, so that computer ignores it in every repository. If you created the file by hand and Claude Code has not written to it yet, the same page tells you to add it to `.gitignore` yourself. A global exclude does not untrack a file that is already committed, and it does not travel with the clone.

### Is don’t ask again the same as dontAsk mode?

No. Don't ask again is a prompt option that can save an allow rule. `dontAsk` is a mode that auto-denies calls which would otherwise prompt, aside from the exceptions on the permissions page.

### What should you do if the file is in a repository?

Rotate every password, token, and key the file has ever held, then remove it from the tree and from history's reach as far as you can. The researchers' order, printed by The Hacker News, puts rotation before cleanup, because a deleted file leaves the secret in git history and in forks. Add `.claude/settings.local.json` to the repository's own `.gitignore`, and delete secret-bearing rules from the copy on your computer even if you never pushed it.
