---
title: "One hundred OpenBot users cost $2,075 a month"
description: "OpenBot's pricing script, fetched November 13, 2026, prices the first 25 active users at $29 and the next 75 at $18. One hundred people are $2,075. Model spend above $5,000 adds 5%."
absoluteTitle: true
takeaways:
  - "The pricing page's script prices active users 1 through 25 at $29 and users 26 through 100 at $18. One hundred people are $2,075 for the month, $20.75 on average. The server-rendered estimator, with its number input at 100, shows those two figures."
  - "Once the count passes 100, the page stops printing the total and says to contact sales. The script still contains later brackets. Those brackets are code on the page, and the visible offer above 100 users is the sales line."
  - "Model spend above $5,000 a month adds 5 percent, rounded to the cent by the script. The page's own example is $250 on a $10,000 month. You pay the model provider separately. The application source is MIT. CopilotKit Intelligence is a separate license."
date: "2026-11-13"
updated: "2026-11-13"
category: explainer
topics:
  - tools-saas
  - how-agents-work
  - news
audience:
  - buyers
  - builders
companies:
  - github
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "OpenBot for Business plan totals at 1, 25, 26, 50, and 100 active users, November 13, 2026"
  description: "Plan totals computed from the pricing function in the script loaded by https://open.bot/pricing, fetched with HTTP Date Fri, 13 Nov 2026 13:44:17 GMT. The function is 29 dollars times min(users, 25) plus 18 dollars times min(max(users minus 25, 0), 75), for counts through 100. The page's server-rendered estimator shows $2,075 and $20.75 at the default of 100 users and $2,000 of model spend. The model-usage charge in the same script is round(5 times max(0, spend minus 5000)) divided by 100. GitHub stargazers_count for CopilotKit/OpenBot was 11,997 at 13:43:45 GMT. Release v1.0.2 was published 2026-11-11T08:45:38Z."
  isBasedOn: "https://open.bot/pricing"
sources:
  - title: "OpenBot pricing (HTTP 200, Date Fri, 13 Nov 2026 13:44:17 GMT)"
    url: "https://open.bot/pricing"
  - title: "OpenBot pricing script loaded by that page (fetched November 13, 2026)"
    url: "https://open.bot/_next/static/immutable/chunks/3-ws2ytwp_sxk.js"
  - title: "CopilotKit/OpenBot README on main (HTTP Date Fri, 13 Nov 2026 13:44:17 GMT)"
    url: "https://github.com/CopilotKit/OpenBot/blob/main/README.md"
  - title: "GitHub repository API, CopilotKit/OpenBot (HTTP Date Fri, 13 Nov 2026 13:43:45 GMT)"
    url: "https://api.github.com/repos/CopilotKit/OpenBot"
  - title: "OpenBot release v1.0.2 (published 2026-11-11T08:45:38Z)"
    url: "https://github.com/CopilotKit/OpenBot/releases/tag/v1.0.2"
  - title: "OpenBot release v1.0.0 (published 2026-11-09T09:13:22Z)"
    url: "https://github.com/CopilotKit/OpenBot/releases/tag/v1.0.0"
  - title: "AI Agents Info, AI employee list prices, November 12, 2026"
    url: "https://www.aiagentsinfo.com/research/ai-employee-pricing-small-business-november-2026"
faq:
  - question: "How much does OpenBot for Business cost?"
    answer: "On the pricing page fetched November 13, 2026, the first 25 active users are $29 each and the next 75 are $18 each. One hundred people are $2,075 for the month, which is $20.75 on average. The hero line says up to $29 per active user per month. Annual is labeled Custom. Above 100 users the page says to contact sales."
  - question: "What is an OpenBot active user?"
    answer: "A named person with at least one interaction with OpenBot for Business in the billing month. The pricing page says only production usage counts, each person counts once, and bots, agents, API calls, and guests are never counted. A person with no interaction in a month is not billed for that month."
  - question: "Does OpenBot charge for the model?"
    answer: "You pay the model provider directly. OpenBot adds 5 percent of monthly model spend above $5,000 per organization. The page's example is no charge at $4,000 and $250 at $10,000. The script computes that charge as round(5 times the dollars over 5,000) divided by 100."
  - question: "Is OpenBot free if the GitHub repo is MIT?"
    answer: "The application source is MIT. CopilotKit Intelligence is separately licensed. Personal use on a laptop needs a free local Intelligence license, which desktop setup requests for you. Production on Kubernetes needs a production license. OpenBot for Business includes Intelligence for use with OpenBot. Building agents into your own product needs a separate Intelligence license."
  - question: "Which OpenBot release is current?"
    answer: "GitHub's latest non-prerelease tag on the afternoon of November 13, 2026 was v1.0.2, published 2026-11-11T08:45:38Z. v1.0.0 was published 2026-11-09T09:13:22Z. The repository had 11,997 stars at 13:43:45 GMT. The license SPDX id on the repository API was MIT."
---

One hundred active users of OpenBot for Business cost **$2,075** a month, before any model bill. The first 25 are **$29** each. The next 75 are **$18** each. 29 times 25 is $725. 18 times 75 is $1,350. $725 plus $1,350 is $2,075. $2,075 divided by 100 is **$20.75**.

That arithmetic is the function in the script the pricing page loaded on November 13, 2026. The HTML fetched at 13:44:17 GMT already shows it. The estimator's user field is set to 100, the model-spend field is set to $2,000, and the rendered plan line is $2,075 and $20.75 per active user. The hero on the same page says "up to $29 per active user per month." The $29 is the first bracket, the price of user number 1. The average at 100 people is $20.75.

OpenBot is CopilotKit's workspace for AI coworkers. Each bot can have a browser and files. You can connect an agent you already run over AG-UI, and tools over MCP. The [GitHub repository](https://github.com/CopilotKit/OpenBot) had **11,997** stars at 13:43:45 GMT, license SPDX `MIT`. The current tag is `v1.0.2`, published 2026-11-11T08:45:38Z. Tag `v1.0.0` was published two days earlier, at 2026-11-09T09:13:22Z. The seat math below is the pricing page, not the release notes.

A token bill you compute yourself still belongs on the [AI agent cost calculator](/agent-cost-calculator). OpenBot's per-user charge is a second meter, and the calculator does not add it.

## What the script charges through 100 people

The plan total, for a count of users the page is willing to price, is `29 * min(users, 25) + 18 * min(max(users - 25, 0), 75)`. The page prints that total only while the count is 100 or below. Averages use the same two-decimal currency format the script applies to `total / users`.

| Active users | What the next person costs | Plan total | Average |
| --- | --- | --- | --- |
| 1 | $29 | $29 | $29.00 |
| 25 | $29 | $725 | $29.00 |
| 26 | $18 | $743 | $28.58 |
| 50 | $18 | $1,175 | $23.50 |
| 100 | $18 | $2,075 | $20.75 |

$743 divided by 26 is 28.5769, which the formatter prints as $28.58. $1,175 divided by 50 is $23.50. The marginal rate changes at person 26, from $29 to $18. The average falls from there because the first 25 stay at $29.

The script also contains three later brackets: $12 from user 101 through 500, $6 from 501 through 2,500, and $3 from 2,501 through 10,000. At 101 users and above, the page does not print that total. It prints "Contact Sales for pricing for teams of more than 100 active users." Treat the sales line as the offer. Treat the later brackets as code that shipped with the page, not as a rate card you can hand a finance team.

The Annual card says Custom. Its note says to agree on rates for larger teams in the first order. SSO, an air-gapped deploy, and a purchase order sit on that card. They are not on the pay-as-you-go card.

## The model bill is yours, plus 5 percent past $5,000

You pay the model provider directly. OpenBot does not resell the tokens. On top of the plan, the page charges **5 percent of monthly model spend above $5,000**, per organization. The worked example on the page: $4,000 of model spend adds nothing. $10,000 adds **$250**, which is 5 percent of the $5,000 above the threshold.

The script writes that charge as `round(5 * max(0, spend - 5000)) / 100`. At $10,000 the charge is `round(25000) / 100`, which is $250. At the estimator's default of $2,000 the charge is $0, which is why the rendered monthly total matches the $2,075 plan total and does not add a model line.

Put the two meters on one row when you budget a team:

| People | Model spend | Plan | Model surcharge | OpenBot total |
| --- | --- | --- | --- | --- |
| 10 | $2,000 | $290 | $0 | $290 |
| 25 | $4,000 | $725 | $0 | $725 |
| 100 | $2,000 | $2,075 | $0 | $2,075 |
| 100 | $10,000 | $2,075 | $250 | $2,325 |

The last column is OpenBot's charge. The model provider's invoice is extra. Hosting is extra too, unless you take the hosted early-access deploy, which the page prices at the same plan rate. The page says self-hosted is the default.

## An active user is a person who showed up

The pricing page's definition is narrow. An active user is a named person with at least one interaction with OpenBot for Business in the billing month. Only production usage counts. Each person counts once. Bots, agents, API calls, and guests are never counted. A person who does not interact is not billed that month, and the page says there is nothing to remove.

That is a seat that can go to zero, and it is also a seat that flips on at the first message. One hundred people who each send one production message are the $2,075 row. One hundred bots in a workspace with four human operators are four active users, on this definition, if the bots themselves are not counted. The page says they are not.

Pay-as-you-go is a credit card, monthly, with no commitment. Standard support by ticket and email is included. The connected-tools line is included. None of those sentences prices a tool call.

## MIT covers the application. Intelligence is a second license

The README, fetched the same minute as the pricing page, says the application template is MIT and that it uses CopilotKit Intelligence, which is separately licensed. The license table on that README has three rows. A laptop, for personal use, needs a free local Intelligence license, and desktop setup requests it. A Kubernetes evaluation needs a free trial license. Kubernetes in production needs a production license. OpenBot for Business includes Intelligence for use with OpenBot.

The pricing FAQ draws the same line from the other direction. The Business license covers Intelligence so you can run OpenBot. Building agents into your own product requires a separate Intelligence license. A production deployment needs that license as well as the MIT source.

Personal OpenBot runs on your laptop with Docker. Workspace data stays on that machine. Your model provider still bills usage. The README's local-Intelligence note for a Mac says the local license lasts 30 days and `npx copilotkit@latest local renew` renews it while the account is in good standing. That note calls the local path a preview for macOS with Docker Desktop.

The README badge still says "get early access" for OpenBot for Business. The pricing page sells pay-as-you-go on a card and says hosted deploys are the part in early access, at the same plan price. Read both. A self-hosted cluster is the default the pricing page describes. A hosted cluster is the early-access path.

## What v1.0.2 changed on the desktop

The price is not the release. The release matters if you already installed 1.0.0.

`v1.0.2` runs no migration. The notes say the database stays at `0088_approval_reviewer_guidance`, and a 1.0.1 database is used as it is. Upgrading from 1.0.0 or from 0.3.x runs the 1.0.1 migrations, and the notes say a database that has run them does not go back. Restore the backup.

Three desktop changes are in the same notes. On Windows, OpenBot runs in a Podman machine of its own, named `openbot`, beside any machine you already have. An install that used to run inside your machine starts fresh in `openbot`, and the earlier data stays in yours. At setup and at every Start, a Docker Desktop or Podman that is too old to run OpenBot is updated, and Docker Desktop quits while that update runs. The installer, on Windows, no longer opens the old uninstaller with a "Delete the application data" box in the middle of an upgrade. The notes say the old version is removed as an update, and the Installing page says your bots and data stay.

The same tag moves OpenBot Desktop's back end and the Helm chart to CopilotKit Intelligence `0.16.0-rc.11`. The release-candidate suffix is on the Intelligence build the notes name. It is a reason to read the tag before you point a production cluster at it.

## What this means if you are buying a workspace

Budget the person, then the model, then the cluster.

For a team of 25 or fewer, the plan is $29 times the number of people who will actually send a production message. Ten people are $290, plus the model invoice, plus whatever you pay to run Kubernetes if you leave the laptop. For a team of 100, the plan is $2,075, and the average has fallen to $20.75 because 75 of those people are on the $18 bracket. A model month of $10,000 adds $250 on top. Past 100 people, the page you can cite is the sales line.

Compare that with a role subscription only if you keep the meters apart. On November 12 this site read fifteen AI-employee pricing pages. The median of the seven that print a fixed subscription was **$33** a month. OpenBot was not in those fifteen. One OpenBot user, at $29, sits next to that median, and the products are different. The $33 figure is the lowest card on a role product. OpenBot's $29 is the first of a declining bracket, with unlimited bots, and a 5 percent charge that appears only after $5,000 of model spend. Keep the two invoices in separate rows.

If you only needed the model bill, stay on the [cost calculator](/agent-cost-calculator). If you needed a named role with a published card, the November 12 census is [12 of 15 AI employee products print a price](/research/ai-employee-pricing-small-business-november-2026). OpenBot is the workspace around agents you bring, priced per person who shows up.

## Frequently asked questions

### How much does OpenBot for Business cost?

On the pricing page fetched November 13, 2026, the first 25 active users are $29 each and the next 75 are $18 each. One hundred people are $2,075 for the month, which is $20.75 on average. The hero line says up to $29 per active user per month. Annual is labeled Custom. Above 100 users the page says to contact sales.

### What is an OpenBot active user?

A named person with at least one interaction with OpenBot for Business in the billing month. The pricing page says only production usage counts, each person counts once, and bots, agents, API calls, and guests are never counted. A person with no interaction in a month is not billed for that month.

### Does OpenBot charge for the model?

You pay the model provider directly. OpenBot adds 5 percent of monthly model spend above $5,000 per organization. The page's example is no charge at $4,000 and $250 at $10,000. The script computes that charge as round(5 times the dollars over 5,000) divided by 100.

### Is OpenBot free if the GitHub repo is MIT?

The application source is MIT. CopilotKit Intelligence is separately licensed. Personal use on a laptop needs a free local Intelligence license, which desktop setup requests for you. Production on Kubernetes needs a production license. OpenBot for Business includes Intelligence for use with OpenBot. Building agents into your own product needs a separate Intelligence license.

### Which OpenBot release is current?

GitHub's latest non-prerelease tag on the afternoon of November 13, 2026 was v1.0.2, published 2026-11-11T08:45:38Z. v1.0.0 was published 2026-11-09T09:13:22Z. The repository had 11,997 stars at 13:43:45 GMT. The license SPDX id on the repository API was MIT.
