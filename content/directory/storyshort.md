---
name: StoryShort
vendor: StoryShort
website: https://storyshort.ai
logo: /logos/storyshort.png
summary: Turns a prompt into short videos, with voiceover, captions, and stock-style visuals. Higher plans add long-form and UGC-style clips. You spend credits.
category: video
tags:
  - video
  - generative
pricing:
  - paid
useCases:
  - video
audiences:
  - everyone
  - builders
features:
  - Short videos from a text prompt, with voiceover and background music
  - Auto-post and download on the listed plans
  - UGC-style and long-form video on higher plans
  - Credits per video, with the estimate shown before you generate
pricingSummary: "On storyshort.ai/pricing, fetched twice on 16 Nov 2026 (both HTTP 200, identical files): Starter $39/month for 400 credits and 1 series, Growth $69 for 1,200 credits and 2 series, Influencer $129 for 2,400 credits and 3 series, Ultra $199 for 5,000 credits and 4 series. A yearly toggle is labeled save 40%. The HTML does not print a separate yearly dollar amount."
startingPrice: $39/month
billingPeriod: monthly
pricingPageUrl: https://storyshort.ai/pricing
revenueSourceUrl: https://trustmrr.com/startup/storyshort
lastVerified: "2026-11-16"
newThisWeek: true
---

People searching storyshort pricing and storyshort affiliate program are asking two concrete questions. The pricing page and the affiliate page, both read on 16 Nov 2026, answer them with numbers. StoryShort turns a prompt into a short video with a voiceover, captions, and generated pictures, then can post the file. Credits are the meter. A 30-second clip and a talking-avatar clip are not the same spend, and the pricing page prints both.

## StoryShort pricing

storyshort.ai/pricing was fetched twice on 16 Nov 2026. Both responses were HTTP 200 and the same size, 207,811 bytes. The cards on the page are monthly. A control next to them is labeled "Yearly (save 40%)". The HTML does not contain a second set of dollar amounts for that toggle. An earlier version of this listing stated yearly equivalents ($23, $42, $75, and $117 a month). Those figures are not in the page fetched today, so they are not repeated as current prices. Flip the toggle and read the charge before you pay for a year.

| Plan | Monthly price on the page | Series | Credits / month | What the page says that buys |
| --- | --- | --- | --- | --- |
| Starter | $39 | 1 | 400 | About 26 videos of 30 seconds, or 16 of 60 seconds |
| Growth | $69 | 2 | 1,200 | About 80 of 30 seconds, or 48 of 60 seconds |
| Influencer | $129 | 3 | 2,400 | About 160 of 30 seconds, or 96 of 60 seconds |
| Ultra | $199 | 4 | 5,000 | About 330 of 30 seconds, or 200 of 60 seconds |

The page says it is trusted by 90,000+ creators. That is the site's line. Every paid card lists voiceovers, AI-generated pictures, background music, no watermark, auto-post, and download.

The same page prints a second table, "what do credits actually make," and says you see the exact estimate before a generation. Longer scripts and premium models cost more than these typical figures.

| Video | Credits | Starter | Growth | Influencer | Ultra |
| --- | --- | --- | --- | --- | --- |
| 30-second, AI images | about 15 | about 26 | about 80 | about 160 | about 333 |
| 60-second, AI images | about 25 | about 16 | about 48 | about 96 | about 200 |
| ASMR | about 50 | about 8 | about 24 | about 48 | about 100 |
| AI movie | about 110 | about 3 | about 10 | about 21 | about 45 |
| Long-form | 85 to 150 | Not in plan | Not in plan | about 24 | about 50 |
| UGC video ad | about 115 | about 3 | about 10 | about 20 | about 43 |
| Talking avatar | 270 or more | about 1 | about 4 | about 8 | about 18 |

Check that against the credit pool. Starter's 400 credits divided by 15 is about 26, which matches the 30-second row. The same 400 credits cover one talking-avatar video at 270, with 130 left, which is the "about 1" in the last row. A UGC ad at about 115 credits is about three on Starter and about ten on Growth. Ultra's 5,000 credits are about 333 of the cheap 30-second clips, or about 18 talking avatars. The page's own "about 330" and "about 18" are those divisions, rounded.

There is a contradiction on the page, and it matters if you are buying Starter for long videos. The Starter and Growth cards list "Long-form video" and "UGC video" in the feature bullets. The credit table says long-form is "Not in plan" for Starter and for Growth, and only counts it on Influencer and Ultra. UGC is counted on every plan. If the video you need is long-form, the credit table is the stricter line, and it starts at Influencer, $129 a month. Do not buy Starter on the strength of the bullet alone.

## Affiliate program

storyshort.ai/affiliate, read 16 Nov 2026, is the page for the query storyshort affiliate program. The offer printed there is 30% recurring commission for the life of each customer you refer. Attribution is 60 days. Payouts are monthly, for commissions earned the previous month. The minimum payout is $100. Sign-up is described as free, with no card, and you get a link to share. The page does not print a cookie policy beyond the 60-day attribution, and it does not print a list of excluded plans. Read the join flow before you promise a rate to a partner. The footer of the pricing page also links this program.

## API and MCP

Two docs pages were live the same day. The API reference at storyshort.ai/api-docs says requests use a bearer token, `Authorization: Bearer`, created in dashboard settings, and that the base URL is `https://api.storyshort.ai`. `POST /ai-agent/api/generate` starts a video and returns immediately. The body takes a prompt, an optional `videoType` (`faceless`, `ugc_ads`, or `hook_demo`, default `ugc_ads`), a duration of 30, 60, or 120 seconds (default 60), an optional character id, and a webhook URL. The docs also list status checks, characters, connected accounts, and publish to TikTok, YouTube, Instagram, and Zapier. The key is a secret. The page says to call it from your server, not from a browser.

The MCP page at storyshort.ai/mcp says the server gives Claude, ChatGPT, and other agents the same engine. The connect example for Claude Code is an HTTP transport at `https://api.storyshort.ai/mcp`. The page says there are 24 tools, that agents can list voices (ElevenLabs, OpenAI, Qwen, and your clones), 33 caption themes, image styles, and 20+ video tools before they spend anything, and that `estimate_credits` quotes the cost before a render. A published file can go to TikTok, YouTube, or Instagram from the same conversation. The worked example on the page is a 60-second faceless video, neon captions, an energetic male voice, cost shown first, then a TikTok post. Credits still come out of the plan above. The MCP does not add a second pool.

## Revenue

TrustMRR's StoryShort page, read 16 Nov 2026, says revenue is verified with a Stripe API key and was last updated at 08:13 AM that day. The page title is $21,436 in the last 30 days. The same page lists MRR of $22,481, 382 active subscriptions, and all-time revenue of $611,291. It names the founder as Samuel Rondot, founded August 2024, in France, and describes the business as B2C with about 27,000 users. Those user and founder lines are TrustMRR's, not a sentence on the pricing page. The pricing line on TrustMRR still matches the live cards: Starter $39, Growth $69, Influencer $129, Ultra $199. An earlier read of TrustMRR on 4 Nov 2026 showed a lower MRR. The figures in this paragraph are the 16 Nov page.

## Best for

A creator who will make a lot of the cheap format, the 15-credit 30-second clip, and who will look at `estimate_credits` before asking an agent to render a talking avatar. Starter is a real month of those short clips. It is about one avatar video.

## Watch out for

The yearly dollar amount is not in the HTML, only the "save 40%" label. Long-form is listed on the Starter card and excluded in the credit table. Talking-avatar videos at 270 credits will exhaust a 400-credit month in two clips. Auto-post means the tool can publish to an account you connect. That is a different risk from downloading a file and posting it yourself. The 90,000-creator line and the 27,000-user line are not the same number and do not come from the same page. No free plan is printed on the pricing cards. Cancel is described on the page as available at any time. The page does not say whether unused credits roll over.

## Alternatives

[Revid](/directory/revid) also turns a prompt into short clips on credits, from indie maker Tibo. [HeyGen](/directory/heygen) is the avatar product, with a free tier and Creator at $29 on its own listing. [Opus Clip](/directory/opus-clip) cuts clips out of video you already have, which is the opposite of generating from a prompt. [InVideo](/directory/invideo) and [Runway](/directory/runway) are the broader editors. None of them is this credit table, and none of them is a 30% lifetime affiliate page at storyshort.ai/affiliate.

Last verified: 16 Nov 2026.
