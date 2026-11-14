---
name: DataFast
title: "DataFast: which channel makes the money"
absoluteTitle: true
vendor: DataFast
website: https://datafa.st
logo: /logos/datafast.png
summary: "DataFast, from Marc Lou, ties site traffic to revenue. Starter is $9 a month for 10,000 events after a 14-day trial with no card. It is not the Ecuador payments company."
category: data-analytics
tags:
  - analytics
  - marketing
  - indie
  - agents
pricing:
  - free-trial
  - paid
useCases:
  - marketing
audiences:
  - builders
features:
  - 14-day trial, $0 due today, no card
  - Starter from $9/month for 10,000 events. Growth from $19/month
  - Stripe, Lemon Squeezy, Polar, and Shopify, or a payment API
  - API, CLI, and an MCP server for coding agents
pricingSummary: "There is no /pricing route (HTTP 404 on 2026-11-14). Prices are the plan table compiled into the datafa.st homepage JavaScript, downloaded twice the same day and byte-identical. Starter monthly: 10k events $9, 100k $19, 200k $29, 500k $49, 1M $69, 2M $89, 5M $129, 10M $169, 10M+ $199. Growth monthly: 10k $19, 100k $39, 200k $59, 500k $99, 1M $139, 2M $179, 5M $259, 10M $339, 10M+ $399. Yearly charges in that file are ten times the monthly price (10k Starter $90 against a $108 anchor). Trial is 14 days, $0 due today, no card. AI Visibility add-on in the same file: $99/month or $990/year, and Pro $399/month or $3,990/year."
startingPrice: $9/month
billingPeriod: monthly
pricingPageUrl: https://datafa.st/
revenueSourceUrl: https://trustmrr.com/startup/datafast
socials:
  x: https://x.com/marclou
lastVerified: "2026-11-14"
newThisWeek: true
---

DataFast, at datafa.st, is Marc Lou's analytics product for people who want to know which marketing channel brought paying customers. Searches for datafast pricing, datafast docs, datafast api, and datafast marc lou are about this product. Searches for datafast ecuador, datafast call center, or datafast servicio al cliente are a different company. This listing is only the analytics app.

The homepage, read 2026-11-14, says you add a script, connect a payment processor, and then read which sources produce revenue rather than pageviews alone. Marc's note on the page says he has built 24 startups. The install paths named in the FAQ are a WordPress plugin, a Shopify app, Webflow, Framer, Bubble, Wix, Squarespace, Ghost, Podia, Kajabi, Google Tag Manager, an npm package, and guides for Next.js, React, Vue, Django, and Laravel. A React Native SDK, including Expo, can track screens, events, users, and revenue, and the FAQ says a web-to-app funnel can join the site and the app.

## What the product actually counts

Web analytics on the page is the usual set, kept small: visitors, sources, devices, countries. The part that is not Google Analytics is revenue attribution. Goals cover signups and downloads. Funnels and journeys show the path from the first click to the conversion. A live visitor view is part of the same product. Custom goals can be sent from the server.

The default script uses cookies so a returning visitor stays the same person across weeks, which is what long revenue journeys need. The FAQ says you may need a cookie banner for that script. A cookieless script is also offered. It does not use cookies for identification, and the page says you typically do not need a banner for DataFast itself. The trade-off is written on the page: identifiers rotate about every 24 hours, so revenue attribution over weeks is less accurate. Tracking across subdomains is on if the site is created under the root domain and the script is on each host. Cross-domain tracking is a separate allow-list of hostnames.

Payment connections named in the FAQ answer, which is in the HTML even though the accordion starts closed: Stripe, Lemon Squeezy, Polar, and Shopify, and more than one of them at once. A payment API can send revenue the native connectors do not cover. You do not need revenue to install the script. The attribution is empty until payments are connected.

## Agents

The FAQ says there is a full API for analytics, visitor journeys, server-side goals and payments, users, websites, funnels, alerts, team members, and API keys. The CLI is described as a way for Cursor, Claude Code, Codex, ChatGPT, Gemini, Copilot, and Grok to query visitors, revenue, websites, funnels, and alerts from a terminal. The MCP server uses the same tokens and permissions as the API and the CLI. That is the agent surface: an assistant can ask which blog visitors became customers, not a chatbot you embed for your own users. Docs are at datafa.st/docs. There is no separate /pricing URL. A request for that path returned HTTP 404 on 2026-11-14.

An AI Visibility add-on is compiled into the same pricing file. Starter is $99 a month or $990 a year, with 50 prompts, 10 topics, 1 website, ChatGPT only, and a 24-hour refresh. Pro is $399 a month or $3,990 a year, with 100 prompts and ChatGPT, Claude, and Gemini. AI crawler capacity in that file includes 100,000 requests per billing cycle, pooled, and extra packs of 1 million requests at $9 a month, up to 50 packs. The homepage feature list shows "100K AI bot requests" next to that $9 line.

## Pricing

The dollar cards on the homepage are rendered by a number animation, so a static HTML fetch shows "$0.00 due today. No card required." and not the plan digits. The plan table is in the public homepage bundle `app/page-72578ce26010208e.js`, downloaded twice on 2026-11-14. The two files matched. These are the monthly prices in that file, in dollars, not cents: yearly figures are ten times the monthly price, and the anchor next to them is twelve times the monthly price.

| Events / month | Starter monthly | Starter yearly | Growth monthly | Growth yearly |
| --- | --- | --- | --- | --- |
| 10k | $9 | $90 | $19 | $190 |
| 100k | $19 | $190 | $39 | $390 |
| 200k | $29 | $290 | $59 | $590 |
| 500k | $49 | $490 | $99 | $990 |
| 1M | $69 | $690 | $139 | $1,390 |
| 2M | $89 | $890 | $179 | $1,790 |
| 5M | $129 | $1,290 | $259 | $2,590 |
| 10M | $169 | $1,690 | $339 | $3,390 |
| 10M+ | $199 | $1,990 | $399 | $3,990 |

Starter limits in the same file: 1 website, 1 team member, and limited X mentions. The FAQ says Starter keeps 3 years of data. Growth limits: 30 websites, 30 team members, unlimited X mentions. The FAQ says Growth keeps 5 or more years and adds social mentions on X and Reddit plus link attribution. The trial object says 14 days, and the button copy says $0.00 due today with no card. After a trial expires, the file lists 7 days of data retention. After a subscription is cancelled, it lists 30 days.

If you pass the event cap, the FAQ answer in the page HTML says DataFast keeps tracking, and you have to upgrade to a larger plan before the dashboard shows those events.

A mobile app is linked from the same bundle: App Store id 6757958525, and Google Play package com.datafast.mobile. Team invites exist. The FAQ says the Starter seat count is one person and Growth is 30.

## Best for

A founder who already sells through Stripe or Lemon Squeezy and wants one number for revenue per visitor, not a product-analytics suite.

## Watch out for

Do not buy this if the search result is the Ecuadorian payments brand. The event number is the meter, and the dashboard hides the overflow until you upgrade even though collection continues. Cookieless tracking will under-count long journeys. Yearly billing in the bundle is a prepaid ten-month multiple, not a monthly cancel. AI Visibility and extra bot-request packs are separate from the traffic plan. The homepage says it is loved by 28,279 users. That is the site's own claim, not a figure this desk counted.

## Alternatives

This directory does not have another revenue-attribution product. The nearest listings do a different job. [AmICited](/directory/amicited) tracks whether AI answers mention you. [Rank Prompt](/directory/rank-prompt) and [LocalRank](/directory/localrank) are search-ranking tools. [Koala AI](/directory/koala) and [Outrank](/directory/outrank) write pages. [SiteGPT](/directory/sitegpt) is a support chatbot on your content, not a revenue report. Use DataFast when the question is which channel paid, and one of those when the question is rankings or a bot.

## Revenue

TrustMRR says revenue is verified with a Stripe API key. Checked 2026-11-14, last updated on that page at 2:19 AM: last 30 days $30,527 (the page title), MRR $28,010, 1,322 active subscriptions, all-time revenue $339,693. The founder field is Marc Lou. TrustMRR's pricing line says a 14-day trial with no card, then starts at $9 a month, which matches the 10k Starter card.

Last verified November 14, 2026.
