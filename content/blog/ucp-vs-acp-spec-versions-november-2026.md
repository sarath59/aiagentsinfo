---
title: "OpenAI’s Checkout Example Is Still API Version 2025-09-12"
description: "2025-09-12 is still the API-Version example on OpenAI’s Agentic Checkout spec, read November 10, 2026. The ACP GitHub snapshot is 2026-04-17. UCP’s latest release tag is v2026-08-25."
takeaways:
  - "OpenAI’s Agentic Checkout spec, Last-Modified Tue, 10 Nov 2026 05:35:09 GMT, still prints 2025-09-12 in the API-Version example. That date is 424 days before November 10, 2026. The same page says MCP support is in the future."
  - "The ACP repository’s latest stable folder is spec/2026-04-17. Its last commit on main is 2026-07-18T04:51:51Z, 115 days before November 10. Seventeen markdown files sit in changelog/unreleased and have not been snapshotted into a dated folder."
  - "UCP’s latest GitHub release is v2026-08-25, published 2026-08-25T13:53:03Z. Main had a commit at 2026-11-10T06:30:29Z. That commit is not a release tag. Google’s November 4 Canada post names UCP and does not name a spec date."
date: "2026-11-10"
updated: "2026-11-10"
category: guide
topics:
  - shopping
  - harnesses
  - tools-saas
audience:
  - builders
  - everyone
companies:
  - google
  - openai
  - meta
byline: "AI Agents Info Editorial"
contentLicense: true
absoluteTitle: true
dataset:
  title: "UCP and ACP repository readings, November 10, 2026"
  description: "GitHub repository objects read at 13:39:45 GMT and 13:39:46 GMT on November 10, 2026. Universal-Commerce-Protocol/ucp had 3,489 stars, 493 forks, and 263 open issues, license Apache-2.0, pushed_at 2026-11-10T06:36:00Z. agentic-commerce-protocol/agentic-commerce-protocol had 1,600 stars, 259 forks, and 148 open issues, license Apache-2.0, pushed_at 2026-07-18T04:51:51Z. UCP releases: v2026-08-25 published 2026-08-25T13:53:03Z, then v2026-04-08, v2026-01-23, and v2026-01-11. ACP releases endpoint returned an empty list. ACP spec directories on main: 2025-09-29, 2025-12-12, 2026-01-16, 2026-01-30, 2026-04-17, and unreleased. Newest ACP commit 7fdd78df67 at 2026-07-18T04:51:51Z. Newest UCP commit 5f42601e42 at 2026-11-10T06:30:29Z. OpenAI Agentic Checkout spec Last-Modified Tue, 10 Nov 2026 05:35:09 GMT, API-Version example 2025-09-12."
  isBasedOn: "https://github.com/agentic-commerce-protocol/agentic-commerce-protocol"
sources:
  - title: "GitHub REST API, agentic-commerce-protocol/agentic-commerce-protocol (HTTP Date 13:39:46 GMT, November 10, 2026)"
    url: "https://api.github.com/repos/agentic-commerce-protocol/agentic-commerce-protocol"
  - title: "GitHub REST API, Universal-Commerce-Protocol/ucp (HTTP Date 13:39:45 GMT, November 10, 2026)"
    url: "https://api.github.com/repos/Universal-Commerce-Protocol/ucp"
  - title: "ACP README, latest stable OpenAPI path spec/2026-04-17 (read November 10, 2026)"
    url: "https://github.com/agentic-commerce-protocol/agentic-commerce-protocol"
  - title: "ACP MAINTAINERS.md, lead maintainers OpenAI, Stripe, and Meta (read November 10, 2026)"
    url: "https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/MAINTAINERS.md"
  - title: "OpenAI, Agentic Checkout Spec (Last-Modified Tue, 10 Nov 2026 05:35:09 GMT)"
    url: "https://developers.openai.com/commerce/specs/checkout"
  - title: "OpenAI, Key concepts (Last-Modified Tue, 10 Nov 2026 05:37:59 GMT)"
    url: "https://developers.openai.com/commerce/guides/key-concepts"
  - title: "OpenAI, Get Started (Last-Modified Tue, 10 Nov 2026 05:00:52 GMT)"
    url: "https://developers.openai.com/commerce/guides/get-started"
  - title: "UCP versioning guide (read November 10, 2026)"
    url: "https://github.com/Universal-Commerce-Protocol/ucp/blob/main/docs/versioning.md"
  - title: "UCP specification overview (Last-Modified Tue, 10 Nov 2026 06:36:34 GMT)"
    url: "https://ucp.dev/latest/specification/overview/"
  - title: "UCP Shopping Tech Council (read November 10, 2026)"
    url: "https://github.com/Universal-Commerce-Protocol/.github/blob/main/MAINTAINERS.md"
  - title: "Google Canada, A new way to shop (November 4, 2026)"
    url: "https://blog.google/intl/en-ca/products/explore-get-answers/a-new-way-to-shop-introducing-a-more-intuitive-agentic-shopping-experience-for-consumers-and-retailers-in-canada/"
  - title: "Google, Prepare your Merchant Center account (Last-Modified Thu, 29 Oct 2026 01:45:42 GMT)"
    url: "https://developers.google.com/merchant/ucp/guides/merchant-center"
faq:
  - question: "What is the latest ACP spec version on November 10, 2026?"
    answer: "The GitHub repository’s latest dated folder is spec/2026-04-17, and the README points the OpenAPI, JSON Schema, and examples at that folder. The releases API returned no GitHub releases. OpenAI’s Agentic Checkout spec, Last-Modified 05:35 GMT the same day, still shows 2025-09-12 as the API-Version example. Those are two different version strings."
  - question: "What is the latest UCP release?"
    answer: "v2026-08-25, published 2026-08-25T13:53:03Z. Older release tags on the same repository are v2026-04-08, v2026-01-23, and v2026-01-11. A commit landed on main at 2026-11-10T06:30:29Z. The versioning guide says a new version is tagged when the Tech Council approves it. That commit is not a tag."
  - question: "Should a store implement UCP or ACP?"
    answer: "Implement the surface you sell on, against a released snapshot, and start with the product feed. Google’s November 4, 2026 Canada post names UCP for direct checkout and says simplified Merchant Center integration starts next year. OpenAI’s Get Started guide says ChatGPT product feeds are available to approved partners and tells you to begin by sharing a feed. Do not code against UCP main, and do not assume OpenAI’s checkout page and the ACP GitHub snapshot are the same version."
  - question: "Does the November 10 UCP commit change the spec version?"
    answer: "No release tag was published that morning. The newest tag was still v2026-08-25. The specification overview at ucp.dev, Last-Modified 06:36 GMT, still uses 2026-08-25 in its profile example. The 06:30 UTC commit adds a purchase-options extension and a subscription policy on main."
  - question: "Who maintains UCP and ACP?"
    answer: "ACP’s MAINTAINERS.md lists OpenAI, Stripe, and Meta as lead maintainers. The README badge names OpenAI and Stripe. UCP’s Shopping Tech Council file names 17 people at Google, Shopify, Etsy, Meta, Amazon, Target, Microsoft, Stripe, Salesforce, and Wayfair. Amit Handa of Google is marked as a standing Governing Council member. Both repositories are Apache-2.0."
  - question: "Is MCP part of ACP checkout?"
    answer: "The documents disagree. The ACP README says the 2026-04-17 snapshot includes an MCP binding. OpenAI’s Agentic Checkout spec says that in the future the spec will support MCP servers. Read the page you will certify against before you build an MCP checkout."
---

Updated November 10, 2026. Versions, commits, and headers below were read that day from GitHub, ucp.dev, OpenAI’s developer docs, and Google’s Canada post.

**2025-09-12.** That is the API-Version example on [OpenAI’s Agentic Checkout spec](https://developers.openai.com/commerce/specs/checkout). The page’s Last-Modified header was Tue, 10 Nov 2026 05:35:09 GMT. The date in the example is 424 days before November 10, 2026.

The [Agentic Commerce Protocol repository](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) does not use that string as its latest snapshot. Its README points the OpenAPI, the JSON Schema, and the examples at `spec/2026-04-17`. April 17, 2026 is 217 days after September 12, 2025, and 207 days before November 10, 2026.

A store that “implements ACP” has to say which of those two strings it means. [Universal Commerce Protocol](https://github.com/Universal-Commerce-Protocol/ucp) has a third date. Its latest release tag is **v2026-08-25**.

## Which version should you code against?

Code against a release tag or a dated spec folder. A commit on `main` is not that folder.

| Document | What it calls current | When that marker was set | Read on November 10 |
| --- | --- | --- | --- |
| OpenAI Agentic Checkout spec | API-Version example `2025-09-12` | Example cell; page Last-Modified 05:35:09 GMT | HTTP 200 |
| ACP GitHub, latest stable folder | `spec/2026-04-17` | Last commit on main 2026-07-18T04:51:51Z | Repository object 13:39:46 GMT |
| UCP GitHub releases | `v2026-08-25` | Published 2026-08-25T13:53:03Z | Releases list 13:39:51 GMT |
| ucp.dev specification overview | Profile example `2026-08-25` | Page Last-Modified 06:36:34 GMT | HTTP 200 |
| Google Merchant Center UCP guide | No spec date in the page text checked here | Last-Modified Thu, 29 Oct 2026 01:45:42 GMT | HTTP 200 |

The feed a shopping agent is allowed to quote is a separate file. The field list is [How to make your store readable by AI shopping agents](/blog/how-to-make-your-store-readable-by-ai-shopping-agents). Who can pay today is [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you). The six-company calendar through May 2027 is [AI shopping agents, the next 6 months](/reports/ai-shopping-agents-next-6-months).

## ACP’s repo stopped on July 18. OpenAI’s page did not.

At 13:39:46 GMT the ACP repository had **1,600** stars, 259 forks, and 148 open issues. GitHub’s open-issue count includes pull requests. `pushed_at` was 2026-07-18T04:51:51Z. The newest commit, `7fdd78df67`, has that same timestamp and the message “SEP: Optional product URL on checkout Item (#281).” July 18 is 115 days before November 10.

The releases API returned an empty list. Versions live as directories. On `main` those directories are `2025-09-29`, `2025-12-12`, `2026-01-16`, `2026-01-30`, `2026-04-17`, and `unreleased`. The README table calls `spec/2026-04-17/openapi/` the latest stable OpenAPI. The status badge says beta. The license file is Apache-2.0.

`changelog/unreleased` holds 17 markdown files plus a `.gitkeep`. They have not been copied into a dated snapshot. One of the 17 is `stale-pr-reminder.md`, a process note. The directory is not a hidden 2026-11-10 release.

Two maintainer files do not list the same companies. The README badge says the spec is maintained by OpenAI and Stripe. `MAINTAINERS.md` lists three lead maintainers: OpenAI, Stripe, and Meta. The governance doc says the technical steering committee has up to seven seats, and that the founding maintainers’ veto is a last resort.

OpenAI’s own checkout page, touched the morning of November 10, still teaches the older example. The request-header table sets `API-Version` to `2025-09-12`. The same page says: “In the future, the Agentic Checkout Spec will support MCP servers.” The GitHub README says the `2026-04-17` snapshot is the one that added cart, feed, orders, authentication, and MCP. If you are about to expose checkout as an [MCP](/glossary/model-context-protocol) server, those two sentences cannot both be your spec.

[Key concepts](https://developers.openai.com/commerce/guides/key-concepts), Last-Modified 05:37:59 GMT, still describes Instant Checkout inside ChatGPT. It says the checkout session is rendered in the OpenAI UI, and that checkout state and payment processing stay on the merchant’s systems. The same page says OpenAI is not the merchant of record. [Get Started](https://developers.openai.com/commerce/guides/get-started), Last-Modified 05:00:52 GMT, says product-feed onboarding is available to approved partners and tells you to apply, then upload a feed over SFTP. The first step in that guide is the feed, not `POST /checkout_sessions`.

## UCP’s release tag is August 25. Main moved this morning.

At 13:39:45 GMT [Universal-Commerce-Protocol/ucp](https://github.com/Universal-Commerce-Protocol/ucp) had **3,489** stars, 493 forks, and 263 open issues, the same open-issue field that includes pull requests. That is 2.18 times the ACP star count, a gap of 1,889. `pushed_at` was 2026-11-10T06:36:00Z. The license field was Apache-2.0.

The releases list has four tags. The newest is `v2026-08-25`, published 2026-08-25T13:53:03Z. Then `v2026-04-08`, `v2026-01-23`, and `v2026-01-11`.

The newest commit on `main` is `5f42601e42` at 2026-11-10T06:30:29Z: “feat: add purchase options extension and subscription policy (#890).” The two before it are a list-price field on November 9 and a checkout-docs clarification on November 7. The [versioning guide](https://github.com/Universal-Commerce-Protocol/ucp/blob/main/docs/versioning.md) says new development happens on `main`, and that a release branch named `release/YYYY-MM-DD` is cut when the Tech Council approves a version, then tagged. No `v2026-11-10` tag was in the releases response.

The specification overview at ucp.dev carried Last-Modified Tue, 10 Nov 2026 06:36:34 GMT, six minutes after that commit. The profile example on the page still says `"version": "2026-08-25"`. The docs site can move without the version string moving.

The [Shopping Tech Council](https://github.com/Universal-Commerce-Protocol/.github/blob/main/MAINTAINERS.md) names 17 people. The companies on that table are Google (5), Shopify (4), and one seat each for Etsy, Meta, Amazon, Target, Microsoft, Stripe, Salesforce, and Wayfair. Amit Handa of Google is marked as a standing Governing Council member. A star count is not a seat count. ACP’s 1,600 stars do not mean fewer companies can implement it.

## Google named UCP for Canada. It did not name a spec date.

Google’s [November 4, 2026 Canada post](https://blog.google/intl/en-ca/products/explore-get-answers/a-new-way-to-shop-introducing-a-more-intuitive-agentic-shopping-experience-for-consumers-and-retailers-in-canada/) says direct checkout, powered by UCP, is expanding to Canadian shoppers in AI Mode and the Gemini app. It names lululemon, select Shopify merchants, Shoppers Drug Mart, and Simons. It says retailers remain the seller of record. It says simplified UCP integration inside Merchant Center starts next year.

The post does not print `2026-08-25` or `2026-04-08`. The [Merchant Center guide](https://developers.google.com/merchant/ucp/guides/merchant-center), Last-Modified Thu, 29 Oct 2026 01:45:42 GMT, tells a merchant to set `native_commerce` checkout eligibility to true for a product that should be buyable, and to leave it empty or false for products the guide lists as ineligible. Subscriptions are in that ineligible list. The November 10 commit on UCP `main` is a subscription policy. The October 29 guide has not absorbed it. If you sell a subscription, the guide you can follow today still says leave checkout eligibility off.

## What this means if you are implementing checkout

Ship the feed first. Both protocols are useless to an agent that does not have a price, a stock state, and a product URL. OpenAI’s Get Started guide puts the feed before checkout. Google’s Canada post is a checkout announcement for named retailers, and the self-serve Merchant Center path is “starting next year,” not this week.

If the channel is Google AI Mode in Canada, the protocol Google named is UCP, and the release tag to read is `v2026-08-25`. Ignore the 06:30 UTC commit until it is tagged. A purchase-options extension on `main` is a draft of the next snapshot, including the part that talks about subscriptions the Merchant Center guide still excludes.

If the channel is ChatGPT, match the document OpenAI will certify you against. On November 10 that published checkout page still showed API version `2025-09-12` and still described an embedded checkout, with the merchant charging on the merchant’s own systems. The GitHub snapshot a protocol engineer will open is `2026-04-17`, and it is 217 days newer than the example. Write down which one your integration uses. An agent that sends `API-Version: 2026-04-17` to a server built from the OpenAI example, or the reverse, is a broken [agentic checkout](/glossary/agentic-checkout), not a second protocol.

Stars do not break the tie. UCP had 3,489. ACP had 1,600. Neither number is a merchant count, and neither number is the version string in the header.

Installs are a different count, read the next day. [@x402/core had 1,940,555 npm downloads from October 11 through November 9, and ACP and AP2 still publish no official package](/research/agentic-commerce-protocol-adoption-november-2026). That note does not change the version strings above.
