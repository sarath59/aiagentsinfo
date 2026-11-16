---
name: ByeDispute
vendor: ByeDispute
website: https://byedispute.com
logo: /logos/byedispute.png
summary: Stripe chargeback helper from Marc Lou that watches payments for fraud patterns and alerts you before a dispute lands.
category: finance
tags:
  - stripe
  - chargebacks
  - indie
pricing:
  - paid
useCases:
  - finance
audiences:
  - builders
features:
  - Connect Stripe and choose which fraud patterns to watch
  - Alerts on suspicious payments, with a link back to the Stripe charge
  - Rules you can set, such as an email alert or a refund
  - One-time plans by volume at $69, $119, and $219
pricingSummary: "On byedispute.com (checked twice 2026-11-07): one-time plans at $69 for 10,000 protected transactions, $119 for 30,000, and $219 for 100,000."
startingPrice: $69 one-time
billingPeriod: one-time
pricingPageUrl: https://byedispute.com/
revenueSourceUrl: https://trustmrr.com/startup/byedispute
lastVerified: "2026-11-16"
newThisWeek: true
---

ByeDispute is the page Google is showing for the query byedispute. It is Marc Lou's no-code watcher for Stripe. You connect an account, pick the patterns you care about, and it listens for webhook events. A repeated charge on the same card, or an early-fraud-warning event, can fire a rule you set: email you, or refund the payment, with a link back to the Stripe charge. The point of the product, in the site's words, is to catch the payment before it becomes a dispute, because a new Stripe account can be closed over a handful of them.

The homepage, fetched twice on 16 Nov 2026 (both HTTP 200, identical files), is also the pricing page. There is no monthly plan.

## Pricing

| Protected transactions | Price, one time | Per transaction, as printed |
| --- | --- | --- |
| 10,000 | $69 | $0.0069 |
| 30,000 | $119 | $0.0040 |
| 100,000 | $219 | $0.0022 |

Those per-transaction figures are the page's own rounding of the price divided by the cap. 219 divided by 100,000 is $0.00219, which the table shows as $0.0022. Credits are a pool, not a subscription. The FAQ says you can connect as many Stripe accounts as you want, and the credits are shared across them. A second startup does not need a second ByeDispute bill. It does spend the same 10,000 or 30,000 or 100,000.

The homepage's own pitch numbers, which are claims rather than a measured audit: "up to 80% less disputes," "save $30 dispute fees," and "2095 solopreneurs ship safe." The $30 is the Stripe dispute fee the page says you avoid when a dispute does not get filed. The 80% line is repeated in the FAQ, next to a plainer sentence: you can still get a dispute, and it is impossible to prevent all of them. Visa and Mastercard, the page says, tolerate up to a 0.65% dispute rate, and one dispute out of five payments is already 20%. That arithmetic is the reason the page gives for caring on a new account. It also says a ban can stick even if your other Stripe accounts have a long history.

Marc's own account of why he built it is on the page. He says a habit tracker he launched in March 2022 woke up to five sales, then $75 in dispute fees and a closing account, after five years with Stripe and more than $50,000 in earnings. The closure note he quotes: "We're sorry that we can no longer offer our services to you, and we wish you the best of luck with your business." He says a public complaint got the account reviewed. The page says other people did not get that second look. Ryan Hoover is quoted on the page asking why Stripe does not ship this itself. Three other quotes are on the page, from Nico Jeanen, Jason Leow, and Nick, the last of whom says a team processing over $100,000 a day on Stripe got an alert on a suspicious payment within a day. Those are testimonials on the site, not reviews this listing collected.

## What it does, and what it will not do

Setup is described as one minute and no code. You choose patterns. ByeDispute listens. The FAQ's example of a pattern is the same card paying repeatedly, or a customer reporting a stolen card through Stripe's early-fraud-warning event. The action is whatever rule you saved: an email, a refund, or another action the product offers. The dashboard shows the alert and links to the Stripe payment so you can look at it yourself.

Stripe Radar is the comparison the FAQ expects. The page says both do real-time fraud protection, and that ByeDispute covers the cases it says Radar does not: repeated card payments, stolen cards, and the disputes that follow. It does not claim to replace Radar. It claims a different slice.

You do not hand over a full secret key if you do not want to. The FAQ says you can create a restricted Stripe key with permissions for specific resources only. On data, the FAQ's answer is one word and a follow-up: "Nothing. We don't collect any data." It says the app listens to webhooks and runs your rules. That is the company's statement. A webhook listener still receives the event Stripe sends. Read the privacy page if that distinction matters to you. The FAQ also says you could build this yourself, and that the author thinks you would miss patterns and repeat the work for every new startup. That is an argument, not a benchmark.

The footer links an affiliate invite at affiliates.reflio.com/invite/byedispute, labeled "Affiliates - Earn 30%." This listing did not open the Reflio terms, so the 30% is the label on ByeDispute's own footer, not a schedule copied from the affiliate dashboard.

## Revenue

TrustMRR, read 16 Nov 2026, says revenue is verified with a Stripe API key and was last updated at 08:00 AM that day. Last 30 days on the page title are $153. All-time revenue is $9,141. MRR is blank, with no active subscriptions. The founder field is Marc Lou, founded January 2024, Singapore. The absence of subscriptions matches a one-time product. A check of the same page on 7 Nov 2026 showed $202 in the prior 30 days and the same $9,141 all-time figure. The 16 Nov numbers are the ones to quote. All-time did not move between those two reads. The last-30-day number did.

## Best for

A solo founder on a new Stripe account who would rather pay $69 once than discover a dispute in the morning. The 10,000-transaction pack is the one that matches a small product. The $219 pack is for someone already doing real volume, where $0.0022 a transaction is the page's own unit price.

## Watch out for

The 80% figure is the site's ceiling, and the FAQ admits disputes still happen. A refund rule will refund a real customer if the pattern matches them. Shared credits mean a busy second Stripe account can burn a pack you bought for the first one. There is no monthly plan to forget, and there is also no fresh allowance next month. When the pack is gone you buy another. "We don't collect any data" is their sentence. The tool cannot see a dispute that Stripe never sends an event for. Nothing here is a guarantee Stripe will keep the account open. The directory does not have a second chargeback product to compare this with.

## Alternatives

[ZenVoice](/directory/zenvoice) is Marc Lou's other Stripe tool, for invoices a customer downloads from a link. It does not watch disputes. [DataFast](/directory/datafast) is his analytics product for which channel brought a paying customer. [ShipFast](/directory/shipfast) is his Next.js boilerplate, a one-time purchase for launching a SaaS, not a fraud rule. [CodeFast](/directory/codefast) is his course. The ByeDispute footer lists those products as his, and none of them listens for an early-fraud warning.

Last verified: 16 Nov 2026.
