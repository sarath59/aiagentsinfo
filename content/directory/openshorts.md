---
name: OpenShorts
title: "OpenShorts: open-source clips from $12/mo"
absoluteTitle: true
vendor: OpenShorts
website: https://www.openshorts.app
logo: /logos/openshorts.png
summary: "OpenShorts is an open-source AI clip maker. Self-host is free under MIT. Cloud Starter is $12/month for 100 minutes, and the MCP server spends that same minute balance."
category: video
tags:
  - video
  - social
  - agents
  - mcp
  - indie
  - open-source
pricing:
  - freemium
  - paid
  - open-source
  - free-trial
useCases:
  - video
  - social
  - agents
audiences:
  - builders
features:
  - MIT self-host at github.com/mutonby/openshorts, no watermark and no usage cap
  - Cloud Free is 20 minutes a month after a first video of up to 60 minutes, with a watermark
  - Starter $12/month ($10/month, $120/year) for 100 minutes. Creator $29 ($24.17, $290/year) for 300. Pro $59 ($49.17, $590/year) for 750
  - Remote MCP at mcp.openshorts.app/mcp. Cloud calls draw the same minute balance as the dashboard
pricingSummary: "On openshorts.app/pricing (checked twice 2026-11-13): self-hosted is $0, MIT, no cap, no watermark. Cloud Free is $0, no card, a first video up to 60 minutes, then 20 minutes a month, watermarked. Starter is $12/month or $10/month billed yearly ($120/year) for 100 minutes. Creator is $29/month or $24.17/month ($290/year) for 300 minutes. Pro is $59/month or $49.17/month ($590/year) for 750 minutes. Paid cloud plans have no watermark. Extra minutes, bought once, are 60 for $9 or 200 for $25, used after the plan minutes, and they do not expire at month end."
startingPrice: $12/month
billingPeriod: monthly
pricingPageUrl: https://www.openshorts.app/pricing
revenueSourceUrl: https://trustmrr.com/startup/openshorts
socials:
  github: https://github.com/mutonby/openshorts
lastVerified: "2026-11-13"
newThisWeek: true
---

OpenShorts cuts a long video into vertical clips. There are two editions. Self-host is Docker, your own API keys, MIT, no watermark, and no cap. Cloud is the hosted meter: the first video can run up to 60 minutes, then the free plan is 20 minutes a month with a watermark. Starter, at $12 a month, is the first plan that drops the watermark, and it includes 100 minutes.

The [MCP page](https://www.openshorts.app/mcp) tells an agent to connect at `https://mcp.openshorts.app/mcp`. The server uses OAuth 2.1 with dynamic client registration, so Claude and ChatGPT take the URL with no API key pasted in. The page says the server exposes 8 tools, and that each tool calls the same pipeline as the dashboard, on the same account and the same minutes. An agent can take a YouTube URL, make 3 to 15 vertical clips with word-level captions, restyle the captions, and publish or schedule to TikTok, Instagram Reels, and YouTube Shorts. Self-hosted serves the same endpoint with no meter.

## Best for

A podcaster or a developer who wants clips from one long video, and who wants an [agent](/glossary/agent) to spend a flat minute balance instead of a per-call fee.

## Watch out for

Cloud minutes are the bill, including when the agent is the one clipping. A loop that re-cuts the same hour spends the hour again. The free plan watermarks after that first long video, and 20 minutes a month is one short source file, not a channel. Extra minutes are a one-time pack, not a higher plan. TrustMRR verifies revenue with a Stripe API key. Synced November 13, 2026 at 06:08 UTC: MRR $2,620, last 30 days $2,733, all-time $4,647, with 179 active subscriptions. The profile names Carlos Gracia as founder.
