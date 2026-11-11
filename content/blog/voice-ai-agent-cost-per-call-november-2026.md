---
title: "1,000 Three-Minute Calls: ElevenLabs Is $238.80 Before the Model. Vapi’s Low End Is $245.40."
description: "Read November 11, 2026. ElevenLabs bills $0.08 a minute on every plan, and burst minutes are $0.16. Vapi’s printed low end is $0.0818 a minute with STT, the model, and TTS in the range. Bland Start is $0.14 and caps you at 100 calls a day."
absoluteTitle: true
takeaways:
  - "1,000 connected three-minute calls are 3,000 minutes. On the ElevenLabs Agents pricing page, read November 11, 2026, the Free column’s additional minutes are $0.08, so 2,985 of those minutes cost $238.80. The language model is not in that number. Burst minutes, once you pass the concurrency cap, are $0.16."
  - "Vapi’s pricing page prints a stack at the low end of its ranges: hosting $0.05, Deepgram $0.0095, OpenAI $0.0077, ElevenLabs voice $0.0146. That sum is $0.0818 a minute, or $245.40 for 3,000 minutes, before phone. The high end of the same ranges is $0.1289 a minute, or $386.70. The page does not name the model at each end."
  - "Retell’s pricing page names a reproducible stack. Voice infra $0.055, a platform voice $0.015, and GPT 5.1 at $0.04 is $0.11 a minute before phone, $330 for 3,000 minutes. US Twilio on that page is $0.015 more. Bland Start is $0.14 with the model included, $420 for 3,000 minutes, and the pricing page caps Start at 100 calls a day."
date: "2026-11-11"
updated: "2026-11-11"
category: guide
topics:
  - tools-saas
  - how-agents-work
companies:
  - elevenlabs
audience:
  - builders
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Voice agent list prices and two call volumes, read November 11, 2026"
  description: "Plan fees, per-minute rates, included minutes, and concurrency caps copied from the ElevenLabs Agents, Vapi, Retell AI, and Bland pricing or billing pages on November 11, 2026. Monthly totals for 1,000 and 10,000 three-minute calls are this page’s arithmetic on those rates. No account was billed. A rate that was not on the page is not in the table."
  isBasedOn: "https://elevenlabs.io/pricing/agents"
sources:
  - title: "ElevenLabs, ElevenAgents pricing (fetched November 11, 2026; HTTP Date Wed, 11 Nov 2026 07:43:28 GMT)"
    url: "https://elevenlabs.io/pricing/agents"
  - title: "Vapi pricing (fetched November 11, 2026; response Date Tue, 10 Nov 2026 18:17:35 GMT, x-vercel-cache HIT)"
    url: "https://vapi.ai/pricing"
  - title: "Retell AI pricing (fetched November 11, 2026; HTTP Date Wed, 11 Nov 2026 07:44:19 GMT; Last-Modified Sat, 07 Nov 2026 20:00:17 GMT)"
    url: "https://www.retellai.com/pricing"
  - title: "Bland pricing (read November 11, 2026; response Date Wed, 11 Nov 2026 07:48:29 GMT)"
    url: "https://www.bland.ai/pricing"
  - title: "Bland, Billing and plans (read November 11, 2026; Last-Modified Wed, 11 Nov 2026 00:32:13 GMT)"
    url: "https://docs.bland.ai/platform/billing"
faq:
  - question: "What does a three-minute voice AI support call cost in November 2026?"
    answer: "On the pages read November 11, 2026, ElevenLabs is $0.24 for the voice minutes at $0.08 a minute, and the language model is extra and not priced on that page. The low end of the ranges Vapi prints is $0.2454 with hosting, speech-to-text, the model, and the voice included, before phone. Retell’s named stack of voice infra, a platform voice, and GPT 5.1 is $0.33 before phone. Bland Start is $0.42 with the model included, before phone."
  - question: "Does a higher ElevenLabs plan make the minute cheaper?"
    answer: "Not on the Agents pricing page read November 11, 2026. Additional minutes are $0.08 on every column from Free through Business. The plan fee matches included minutes times $0.08, within four cents on Pro and Scale. A plan buys concurrency slots, seats, and voice clones. It does not buy a lower minute rate. Minutes past the concurrency cap are $0.16, and the FAQ says burst can reach three times the plan’s concurrency."
  - question: "What is in Vapi’s per-minute price, and what is not?"
    answer: "The pricing page splits hosting at $0.05 a minute on the no-success package, then pass-through ranges: Deepgram $0.0095 to $0.0099, OpenAI $0.0077 to $0.0452, and ElevenLabs voice $0.0146 to $0.0238. Vapi telephony and SIP are $0. Twilio inbound is $0.008 and Twilio outbound is $0.014. Extra concurrent lines are $10 a line a month. The page does not say whether the $29 Core package replaces the $0.05 hosting fee."
  - question: "Can Bland Start carry 10,000 calls a month?"
    answer: "No. The pricing page caps Start at 100 calls a day, 100 calls an hour, and 10 concurrent calls. Ten thousand calls in a month need a higher cap. Build is $0.12 a minute plus $299, with a 2,000-call daily cap. The billing doc, last modified November 11, 2026, also lists Scale at $0.11 a minute plus $499. The marketing pricing page does not list Scale."
  - question: "Does this include the phone number and the carrier?"
    answer: "Only where the vendor’s own page prints a price. Retell phone numbers are $2 a month. Vapi includes one phone number on the usage package and prices Twilio, Vonage, and Telnyx by the minute. ElevenLabs says it adds no telephony fee and that your carrier bills you. Bland says telephony is separate, at pass-through, and its billing doc adds a $0.015 minimum on outbound attempts that use Bland’s telephony. Those carrier bills are not guessed."
---

A thousand connected three-minute support calls cost **$238.80** on ElevenLabs before the language model, and **$245.40** at the low end of the ranges Vapi prints, with speech-to-text, the model, and the voice inside the sum. Ten thousand of those calls are **$2,398.80** and **$2,454.00** on the same two rows.

The ElevenLabs plan does not move that bill by more than $1.20. Additional minutes are $0.08 on every column. The plan buys concurrency. Past the cap, the minute is $0.16. Vapi’s high end of the same ranges is $386.70 and $3,867.00. Retell’s named GPT 5.1 stack is $330 and $3,300 before the phone. Bland Start is $420 for the smaller volume and cannot carry the larger one.

Every figure was copied from the vendor’s pricing page on November 11, 2026, or from Bland’s billing doc where the marketing page is silent. A dollar amount this page multiplies is labeled as its own arithmetic. The [AI agent cost calculator](/agent-cost-calculator) prices model tokens for a different set of APIs. It does not price a voice minute, and it is not an ElevenLabs invoice. Campaign Manager, which sits on top of these minutes and does not add a fee of its own on the docs page, is [What is ElevenAgents Campaign Manager?](/blog/what-is-elevenagents-campaign-manager).

## What is a call in this comparison?

One connected call lasts three minutes. Silence counts as call time where the vendor says the clock runs for the whole connection. There is no transfer, no SMS, and no voicemail left playing. 1,000 calls are 3,000 minutes. 10,000 calls are 30,000 minutes.

That is a support desk, not a campaign. Outbound retries would multiply the attempts and, on Bland’s telephony, can add the $0.015 minimum the billing doc prints per outbound attempt. This scenario does not.

The load used only to compare concurrency is flat on purpose, and it is not a measured call center. Twenty-two weekdays of ten hours is 13,200 minutes of open time. Average concurrent calls are 3,000 divided by 13,200, which is 0.23, or 30,000 divided by 13,200, which is 2.27. A spike above that average is the trap. The average itself fits inside every vendor’s smallest cap except where a daily call cap says otherwise.

## What does each headline rate include?

The sticker prices are not the same object. One is a voice minute with the model missing. One is a range. One is a named stack. One is a bundle.

| Vendor, read November 11, 2026 | Headline | LLM | STT | TTS | Telephony on their side | Phone number |
| --- | --- | --- | --- | --- | --- | --- |
| ElevenLabs Agents | $0.08 / min additional, every plan | Not priced. “Based on usage and varies by model.” | In the minute. The included-features line lists speech to text | In the minute. Text to speech is on that same line | No ElevenLabs fee. Your carrier bills you. The word on the page is “At cost” | Not priced |
| Vapi, no success package | $0.05 / min hosting, then the ranges | OpenAI $0.0077–$0.0452 / min, pass-through. Model name not printed | Deepgram $0.0095–$0.0099 / min | ElevenLabs $0.0146–$0.0238 / min | Vapi telephony and SIP $0. Twilio inbound $0.008, outbound $0.014. Vonage $0.00814. Telnyx $0.0055 | 1 included on this package |
| Retell, pay as you go | $0.055 infra + the voice + the model you pick | GPT 5.1 standard $0.04 / min. The table has many other models | Inside Retell Voice Infra, which the page prices at $0.055 and does not split out | Platform, Minimax, Fish, Cartesia, OpenAI, Inworld voices $0.015. ElevenLabs Flash is $0.040 | Custom telephony $0 on the estimator. US Twilio $0.015 | $2 / month. Custom numbers are no charge |
| Bland Start | $0.14 / min, $0 platform fee | In the minute. “No token charges” | In the minute | In the minute. The page says premium voices | Separate, at pass-through. No per-minute carrier rate on the pricing page | An inbound number is included. The page calls it a $15/month value, not a $15 charge |

ElevenLabs also lists knowledge bases, RAG, and realtime configs as included features. Retell prices a knowledge base at an extra $0.005 a minute, and $8 a knowledge base a month after the first ten. Those are not in the Retell base stack below. Bland’s pricing page puts the model, transcription, and speech in the $0.14 and does not print a token table.

Prices on the ElevenLabs page exclude taxes, levies, and duties. The other pages were not given a tax line in the text that was read, so no tax is added anywhere.

## What do 1,000 and 10,000 calls cost before the carrier?

The ElevenLabs column uses the Free / pay-as-you-go additional rate, because that column prints $0.08 and the call volume is past the 15 included minutes. The Vapi column uses the no-success package and Vapi telephony at $0, so the only variable is the printed range. The Retell column is voice infra $0.055 plus a platform voice at $0.015 plus GPT 5.1 at $0.04, which is $0.11, plus one $2 phone number. Bland Start is the $0.14 rate and no platform fee. Bland cannot take the 10,000-call row on Start.

| 3-minute calls | Minutes | ElevenLabs voice minutes | Vapi low end, SIP | Vapi high end, SIP | Retell GPT 5.1 stack | Bland Start |
| --- | --- | --- | --- | --- | --- | --- |
| 1,000 | 3,000 | $238.80 | $245.40 | $386.70 | $332.00 | $420.00 |
| Per call | 3 | $0.2388 | $0.2454 | $0.3867 | $0.332 | $0.42 |
| 10,000 | 30,000 | $2,398.80 | $2,454.00 | $3,867.00 | $3,302.00 | Over the 100-call daily cap |
| Per call | 3 | $0.23988 | $0.2454 | $0.3867 | $0.3302 |  |

The arithmetic, so it can be checked:

- ElevenLabs, 1,000 calls. 3,000 minus 15 included minutes is 2,985. Times $0.08 is $238.80. For 10,000 calls, 29,985 times $0.08 is $2,398.80.
- Vapi low. $0.05 + $0.0095 + $0.0077 + $0.0146 is $0.0818. Times 3,000 is $245.40. Times 30,000 is $2,454.00.
- Vapi high. $0.05 + $0.0099 + $0.0452 + $0.0238 is $0.1289. Times 3,000 is $386.70. Times 30,000 is $3,867.00.
- Retell. $0.055 + $0.015 + $0.04 is $0.11. Times 3,000 is $330, plus the $2 number is $332. Times 30,000 is $3,300, plus $2 is $3,302. GPT 5 standard is also $0.04 on the same table, so this stack does not depend on picking between those two names.
- Bland Start. 3,000 times $0.14 is $420.

The Vapi page’s own calculator, set to 1,000 minutes, showed hosting $50, Deepgram $10, OpenAI $8 to $45, ElevenLabs voice $15 to $24, transport $0, and a total of $82 to $129. That is the same $0.05 hosting fee and the same ranges, with the transcriber rounded to $10. This page multiplies the per-minute endpoints instead of the rounded thousand-minute total. $0.0095 times 1,000 is $9.50, not $10.

Add US Twilio only where the page prints it. Vapi inbound is $0.008 a minute, $24 on 3,000 minutes and $240 on 30,000. Vapi outbound is $0.014, $42 and $420. Retell’s United States (Twilio) row is $0.015, so the named stack becomes $0.125 a minute: $375 and $3,750 before the $2 number. ElevenLabs and Bland do not print a carrier minute on the pages used here. Their phone cost stays off the total.

## Why does every ElevenLabs plan cost about the same?

Because the subscription is a prepay of minutes at $0.08, and extra minutes are the same $0.08. The concurrency column is the thing that changes.

| Plan | Monthly fee | Included minutes | Fee divided by included minutes | Concurrent calls | 3,000 min | 30,000 min |
| --- | --- | --- | --- | --- | --- | --- |
| Free | $0 | 15 | The 15 minutes are not prepaid | 4 | $238.80 | $2,398.80 |
| Starter | $6, after a $1 first month | 75 | $0.08 | 6 | $240.00 | $2,400.00 |
| Creator | $22, after an $11 first month | 275 | $0.08 | 10 | $240.00 | $2,400.00 |
| Pro | $99 | 1,238 | $99.04 at $0.08, so the plan is $0.04 under | 20 | $239.96 | $2,399.96 |
| Scale | $299 | 3,738 | $299.04 at $0.08, so the plan is $0.04 under | 30 | $299.00 | $2,399.96 |
| Business | $990 | 12,375 | $0.08 exactly | 40 | $990.00 | $2,400.00 |

Starter, Creator, Pro, and Business at 3,000 or 30,000 minutes land on $240 or $2,400 within four cents, except when the included minutes are larger than the month. Scale at 3,000 minutes costs $299 because you prepaid 3,738 minutes and used 3,000. Business at 3,000 minutes costs $990 for the same reason. Buying the bigger plan to “get a better rate” spends the unused prepay. The first-month discounts, $1 and $11, are not in the table. A second month is the fee in the fee column.

The FAQ on the same page says burst pricing is $0.16 a minute, double the standard rate, when you exceed the concurrency limit, and that agents can handle up to three times the plan’s concurrency while that rate applies. Free’s cap of 4 becomes a ceiling of 12. Pro’s 20 becomes 60. The page does not say what happens to a thirteenth simultaneous call on Free. This page does not invent a reject or a third rate.

If every one of the 3,000 minutes were a burst minute, the voice bill would be 3,000 times $0.16, which is $480, against $238.80 when every minute fits inside the cap. That is the ceiling, not a forecast. The premium is $0.08 a minute for the minutes that actually sit above the cap. Twelve burst minutes, four extra calls at three minutes each, cost $1.92 instead of $0.96.

Text messages are $0.003 each and are not in the call. The model still is not in any of these cells. The pricing page says the fee is shown in the product UI and deducted from credits. No UI dollar amount was copied, so none is added.

## Where does concurrency stop being a rounding error?

Vapi sells the extra line. The pricing page says extra concurrent call lines beyond the package default are **$10 a line a month**. The no-success package includes 4. Ten simultaneous calls on that package are 6 times $10, which is $60 a month, on top of the minute stack. That $60 is $0.06 a call at 1,000 calls and $0.006 a call at 10,000. It is real, and it is smaller than the gap between Vapi’s low end and Vapi’s high end.

Core is listed at $29 a month with 10 concurrent calls, five included phone numbers, and models at cost. The $0.05 hosting line is printed on the no-success package, not repeated on Core. This page does not assume the $29 replaces hosting, and it does not assume the $29 stacks on it.

Pro is 10 percent of the Vapi hosting fee, with a **$999 a month minimum**, and 30 concurrent calls. Hosting on 3,000 minutes is $150, and 10 percent of $150 is $15. Hosting on 30,000 minutes is $1,500, and 10 percent is $150. Both are under $999, so the printed minimum is the package price at either volume. $999 is $0.999 per call at 1,000 calls. The page still lists models as pass-through. It does not say the $999 replaces the $0.05. Treat $999 as a floor you can read, not as a completed invoice.

Retell includes **20 concurrent calls**, then **$8 per concurrent call a month**. The flat load above, 2.27 average on the larger month, sits inside the 20. An eighth line is not an $8 line until you are past 20. The pricing FAQ says additional capacity is $8, and enterprise concurrency is a separate conversation that starts, in that answer, at 50 or more. Retell also says billing runs for the whole call, including silence and hold, because speech-to-text stays up, and that minutes are the accumulated seconds with no per-call round-up.

Bland’s caps are plan caps, not a $10 line. Start is 10 concurrent, 100 calls a day, 100 calls an hour. One thousand calls in a month fit under 100 a day if they are spread. Ten thousand do not. One hundred calls a day for 30 days is 3,000 calls, which is 9,000 minutes of three-minute calls, not 30,000. Build is 50 concurrent and 2,000 calls a day, which can hold 10,000 calls in a month. The billing doc says hitting a limit rejects calls rather than running up a surprise overage. That sentence is in the billing doc, not on the marketing pricing page.

## When does Bland’s monthly fee beat the higher minute rate?

Start is $0.14 with no platform fee. Build is $0.12 plus $299. The $0.02 gap pays for the $299 once the minutes pass 299 divided by 0.02, which is **14,950 minutes**. Below that, Start is the cheaper rate and Build is a cap you buy. Three thousand minutes is below it: Start $420, Build $360 plus $299, which is $659. Thirty thousand minutes is above it, and Start is unavailable on the daily cap anyway.

| Plan | Where the price was read | 3,000 min | 30,000 min | Daily call cap |
| --- | --- | --- | --- | --- |
| Start, $0.14, $0 fee | bland.ai/pricing | $420 | $4,200 on the rate, and the cap does not allow 10,000 calls | 100 |
| Build, $0.12, $299 | bland.ai/pricing | $659 | $3,899 | 2,000 |
| Scale, $0.11, $499 | docs.bland.ai/platform/billing, not the pricing page | $829 | $3,799 | 5,000 |

Build against Scale, using the billing doc’s $0.11 and $499: the minute is one cent cheaper and the fee is $200 higher, so Scale costs less after 20,000 minutes. Thirty thousand minutes is past that line, $3,799 against Build’s $3,899. Three thousand minutes is not. The marketing pricing page, read the same morning, does not list Scale. If you cannot see Scale in the account you are about to pay, the billing doc is not your invoice. The pricing page’s Build row is.

The billing doc also lists an Agent Phone plan at $19.99 with one concurrent call. It describes unlimited voice minutes and SMS to the US and Canada, and it also says 1,000 call minutes a day, and it points at another page for the rest. This scenario does not use that plan. The two sentences do not produce one rate.

Transfer minutes are a different meter. Start is $0.05 a transfer minute and Build is $0.04, on the pricing page. The billing doc’s worked example bills connected time and transfer time as separate lines, and it says bring-your-own-Twilio customers do not pay the transfer fee. A support call that stays on the agent never hits that line. A call that bridges to a person does.

## What this costs you if you are buying the desk

Buy the row whose sticker contains the model, unless you already know the model bill from somewhere else.

For a flat thousand three-minute calls, with calls inside the concurrency cap and no carrier minute:

- ElevenLabs is the cheapest published voice minute, at $238.80, and it is the row that leaves the model off. Do not call it the cheapest call. The higher plans do not fix that. They prepay minutes you may not use, and they raise the concurrency cap so fewer minutes fall into the $0.16 burst rate.
- Vapi’s low end, $245.40, is a complete stack only if your model and voice land on the bottom of the ranges the page prints. The page does not name those models. The high end, $386.70, is the number to budget if you refuse to guess which end you will get. Extra lines are $10 a month. The $999 Pro minimum is a concurrency purchase, not a cheaper minute, at either volume on this page.
- Retell’s named stack is $332 with the number and without Twilio, or $377 with US Twilio at $0.015 and the $2 number. Twenty concurrent calls are included. The model has a name, GPT 5.1 or GPT 5 at the same $0.04, which is the part Vapi’s range does not give you.
- Bland Start is $420 with the model in, and it is the right Start bill only while you stay under 100 calls a day. The moment the desk is 10,000 calls in a month, Start is the wrong row and Build is $3,899 before the carrier. That is more than Retell’s $3,302 and more than Vapi’s high end of $3,867, and it is a single rate rather than a range.

The carrier is the line nobody’s headline includes, except Vapi and Retell, who print it. Add it from their table. Do not borrow a Twilio rate from one vendor and stick it on ElevenLabs or Bland. ElevenLabs already said the carrier bills you directly. Bland already said pass-through.

A token bill for a model you call yourself, outside these voice platforms, is still the [cost calculator](/agent-cost-calculator). ElevenLabs’ missing model line is not a row in that calculator. The directory page for the product under the $0.08 minute is [ElevenLabs](/directory/elevenlabs). The shutdown dates through May 2027, and the minutes that have no date, are [Voice agents, Nov 2026 to May 2027](/reports/voice-agents-next-6-months).
