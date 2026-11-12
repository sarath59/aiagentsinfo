---
title: "ElevenLabs Agents: 95% off silence longer than 10 seconds"
absoluteTitle: true
description: "95% off. The ElevenLabs help center, read November 12, 2026, discounts silence longer than 10 seconds by that much. The Agents pricing page still bills every plan at $0.08 a minute and never mentions silence."
date: "2026-11-12"
updated: "2026-11-12"
category: explainer
topics:
  - tools-saas
  - how-agents-work
companies:
  - elevenlabs
audience:
  - builders
  - everyone
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "ElevenAgents plan minutes, per-minute rates, and the silence rule, read November 12, 2026"
  description: "Included minutes, monthly fees, the $0.080 additional-minute rate, the $0.160 burst rate, and the $0.003 text rate copied from the ElevenAgents pricing page on November 12, 2026. The 95 percent silence discount is copied from the ElevenLabs help center the same morning. A three-minute call at $0.24 is this page's multiplication of the pricing-page rate. No account was billed, and the silence sentence was not turned into a second dollar."
  isBasedOn: "https://elevenlabs.io/pricing/agents"
takeaways:
  - "ElevenAgents is the agents platform: a fine-tuned speech-to-text model, a language model you choose, a text-to-speech model, and a turn-taking model. Realtime models and Speech Engine are two other ElevenLabs products."
  - "On the Agents pricing page, read November 12, 2026, additional minutes are $0.080 on every column from Free through Business. Burst minutes are $0.160. Text is $0.003. The language model is extra, deducted from credits, and the page does not print the model rate."
  - "The help center, fetched the same minute, says voice and multimodal calls get a 95 percent discount for periods of silence longer than 10 seconds. That page does not mention $0.08, and it does not say how many seconds inside a long pause the discount covers."
sources:
  - title: "ElevenLabs, ElevenAgents pricing (fetched November 12, 2026; HTTP Date Thu, 12 Nov 2026 13:42:32 GMT)"
    url: "https://elevenlabs.io/pricing/agents"
  - title: "ElevenLabs Help Center, How much does ElevenAgents cost? (fetched November 12, 2026; HTTP Date Thu, 12 Nov 2026 13:42:32 GMT)"
    url: "https://elevenlabs.io/docs/help-center/product/eleven-agents/how-much-does-eleven-agents-cost"
  - title: "ElevenLabs, ElevenAgents overview (fetched November 12, 2026; HTTP Date Thu, 12 Nov 2026 13:42:33 GMT)"
    url: "https://elevenlabs.io/docs/eleven-agents/overview"
faq:
  - question: "What is ElevenLabs Agents?"
    answer: "ElevenLabs calls the product ElevenAgents. The overview, read November 12, 2026, says it coordinates four parts: a fine-tuned speech-to-text model, a language model you choose or bring, a low-latency text-to-speech model, and a turn-taking model. It is the full agents platform. Realtime models and Speech Engine are separate products on the same page."
  - question: "How much does ElevenLabs Agents cost per minute?"
    answer: "The Agents pricing page, read November 12, 2026, lists additional call minutes at $0.080 on Free, Starter, Creator, Pro, Scale, and Business. Burst pricing, past the concurrency cap, is $0.160. Text messages are $0.003. The language model is billed on top, and that page does not print a model dollar."
  - question: "Does ElevenLabs discount silence?"
    answer: "The help center says voice-only and multimodal calls are charged on call duration, with a 95 percent discount for periods of silence longer than 10 seconds. The pricing page's per-minute FAQ does not mention silence. The help center does not say whether the discount applies to the $0.080 minute, or how many seconds of a long pause are discounted."
  - question: "Does a higher ElevenLabs plan make the minute cheaper?"
    answer: "Not on the pricing page read November 12, 2026. Additional minutes are $0.080 on every column. Dividing each paid plan's fee by its included minutes lands on $0.08, within four cents on Pro and Scale. The plan buys included minutes and concurrent calls. It does not buy a lower minute rate."
  - question: "How does ElevenLabs Agents compare with Vapi, Retell, and Bland?"
    answer: "The flat-minute comparison for 1,000 three-minute calls is the November 11 guide on this site. It used the pricing page's $0.08 and did not apply a silence discount, because the pricing page does not print one. This page does not re-fetch those three vendors."
---

ElevenLabs Agents, which the docs call ElevenAgents, is a voice [harness](/glossary/harness) with four parts. On November 12, 2026, two official pages describe the clock differently. The [Agents pricing page](https://elevenlabs.io/pricing/agents) bills additional minutes at **$0.080** on every plan and never says the word silence. The [help center](https://elevenlabs.io/docs/help-center/product/eleven-agents/how-much-does-eleven-agents-cost), fetched in the same minute, says voice and multimodal calls get a **95% discount** for periods of silence longer than 10 seconds, and it never mentions $0.08.

A connected three-minute call at the pricing-page rate is **$0.24** before the language model. That is 3 × $0.08. This page does not turn the silence sentence into a second dollar. The help center does not say how many seconds of a long pause the discount covers, and it does not say the discount applies to the $0.080 minute.

The flat comparison with Vapi, Retell, and Bland, using that $0.08 and no silence discount, is already [1,000 three-minute calls](/blog/voice-ai-agent-cost-per-call-november-2026), read November 11. This page does not re-fetch those three. The directory row is [ElevenLabs](/directory/elevenlabs).

## ElevenAgents is four models, and one of them is not ElevenLabs

The [overview](https://elevenlabs.io/docs/eleven-agents/overview), read November 12, says agents accomplish tasks through natural dialogue, from a quick request to an open-ended workflow. It then names the stack:

1. A fine-tuned speech-to-text model.
2. Your choice of language model, or a custom one.
3. A low-latency text-to-speech model, which that paragraph puts across 10,000+ voices and 70+ languages.
4. A proprietary turn-taking model that handles conversation timing.

The voice-settings row on the same page says 10,000+ voices across 31 languages. Both figures are printed. This page does not pick one.

That fourth part is the piece a TTS invoice leaves out. Turn-taking decides when the caller has finished and when the agent may talk. The language model only sees what the harness puts in the [context window](/glossary/context-window): the transcript so far, the retrieved snippet, the tool result. A help article you did not upload is not knowledge.

The same overview lists the pieces a buyer is actually configuring. Workflows are multi-step. Tools let the agent call a client or an API. The knowledge base is documents plus RAG. Evals are built-in tests, and the monitor section says you create and run automated tests. A hosted MCP page is how the docs say you create and update agents from any MCP client. [Tool use](/glossary/tool-use) is the call. MCP is one socket for it. Neither one is the minute rate.

You can also point a coding agent at `npx -y @elevenlabs/cli@latest onboard init`. The overview says that command signs you in or creates an account, creates a key, and asks what to build. The CLI is a setup path. It is not a price.

## Three products share the brand. Only one is the agent platform.

The overview draws a line the pricing page does not.

| Product, on the overview | What the page says it is | Who it names |
| --- | --- | --- |
| ElevenAgents | A full omnichannel agents platform. It runs on Realtime models, or on a cascaded pipeline with custom TTS, LLM, STT, workflows, evals, and monitoring. | Developers and enterprises building production agents |
| Realtime models | A standalone API of speech-to-speech models. Available through the Realtime API, or as a model option inside ElevenAgents. | Teams who want voice with less integration, including teams switching from another realtime voice API |
| Speech Engine | The speech layer on its own, for a text agent that already exists | Teams who have a text agent and want to add voice |

The overview links an OpenAI Realtime API compatibility guide for the Realtime models, using OpenAI’s SDK and wire protocol. That is a connection guide. It is not an OpenAI price. OpenAI’s own session minute and audio-token rates, checked November 11, are on [Voice agents, Nov 2026 to May 2027](/reports/voice-agents-next-6-months). This page did not re-fetch them. ElevenLabs Realtime and OpenAI Realtime are different vendors’ speech-to-speech APIs. Do not add their rates.

## Every paid plan prepays the same $0.08 minute

The pricing page, HTTP Date Thu, 12 Nov 2026 13:42:32 GMT, prints a monthly card and a rate table. Prices exclude taxes, levies, and duties. The rate table’s additional-minute column is $0.080 on every row. Text is $0.003. Burst is $0.160. The FAQ states the same rates as $0.08, $0.003, and $0.16, and it says the plans are billed by call minutes, not by the shared credit pool.

| Plan | Monthly fee on the card | Included minutes | Concurrent calls | Additional minute |
| --- | --- | --- | --- | --- |
| Free | $0 | 15 | 4 | $0.080 |
| Starter | $1 the first month, then $6 | 75 | 6 | $0.080 |
| Creator | $11 the first month, then $22 | 275 | 10 | $0.080 |
| Pro | $99 | 1,238 | 20 | $0.080 |
| Scale | $299 | 3,738 | 30 | $0.080 |
| Business | $990 | 12,375 | 40 | $0.080 |
| Enterprise | Custom | Not printed | “Elevated” | Not printed |

Divide the steady-state fee by the included minutes. Starter is $6 ÷ 75 = $0.08. Creator is $22 ÷ 275 = $0.08. Business is 12,375 × $0.08 = $990 exactly. Pro is 1,238 × $0.08 = $99.04, so the $99 card is four cents under a pure prepay. Scale is 3,738 × $0.08 = $299.04, the same four cents. Those quotients are this page’s arithmetic. The first-month discounts, $1 and $11, are not in them.

The plan does not buy a cheaper minute. It buys a block of minutes and a concurrency cap. Scale adds 3 workspace seats. Business adds 10 workspace seats and 10 professional voice clones. The FAQ says there is no limit on how many agents you can create. The limit it does name is concurrent calls, “along with your monthly credit limit.”

Burst is the cap’s overflow. The FAQ says agents can handle up to 3 times the plan’s concurrency, and excess calls are charged at double the standard rate. Double $0.080 is $0.160, which is the burst column. Three times Free’s 4 is 12. That product is arithmetic on the FAQ, not a measured call center. The page does not say what happens to a thirteenth simultaneous call on Free.

Telephony is the column that says “At cost.” The FAQ says ElevenLabs adds no telephony fee, phone calls use the same call-minute rate as any other channel, and your carrier, Twilio or a SIP trunk, bills you directly. Do not paste a Twilio rate from another vendor onto this minute.

The LLM column says “Based on usage and varies by model” on every row. The FAQ says you pick a supported third-party model or connect a custom model, optional LLM features are extra, and the fees are shown in the product UI and deducted from ElevenLabs credits. No UI dollar was copied. None is added. A three-minute call at $0.24 is the voice minute only.

Included features on that table are text to speech, speech to text, realtime configs, knowledge bases, RAG, and telephony. The knowledge base is inside the platform minute. The model that reads it is not.

A yearly toggle is on the page. The monthly cards and the FAQ are what this fetch contains as dollar figures. A yearly Agents price was not in that text, so this page does not invent one.

## The help center discounts silence. It will not show the arithmetic.

The help center, same HTTP minute, says there is no cost to create the agent. The cost depends on whether the agent is voice only, multimodal, or text only. Then it splits the meters.

Voice only: charged on call duration, with a 95% discount for periods of silence longer than 10 seconds. The length is the connection, from when you begin the call to when you end it or the window closes. The page says this is why the call itself may be shorter than the duration you are charged for.

Multimodal: the same duration rule and the same 95% silence discount, plus a charge per text message, plus LLM costs passed through separately.

Text only: the text-message rate, and the LLM again. No minute.

The pricing page’s FAQ never uses the word silence. The help center never uses $0.08. A buyer who multiplies connected minutes by $0.080 is following the pricing page. A buyer who then knocks 95% off “the quiet parts” is following a sentence that does not define a period. It does not say whether the first 10 seconds of each pause are full price. It does not say whether one 40-second pause is one period. It does not say the discount survives on the new per-minute plans rather than on an older credit meter.

This page will not invent that rule. Twelve seconds of silence is not automatically 95% off, and a three-minute call with a long hold is not automatically $0.24 either. Until ElevenLabs prints the seconds, budget the pricing-page minute and treat the 95% as a sentence you still have to confirm against the invoice.

The help center also says you need Pay As You Go credits, or legacy usage-based billing, before you can exceed your credit quota. The pricing FAQ says the plans are billed by call minutes, not by the shared credit pool, and then the LLM answer deducts model fees from credits. The upgrade FAQ rolls unused credits into the next cycle when you move up, and expires unused paid credits when you downgrade or cancel. Minutes and credits are both on the official pages. They are not the same object. The [AI agent cost calculator](/agent-cost-calculator) prices tokens for a different set of APIs. It does not price this minute, and it does not know which of these two meters your workspace is on.

The help center says estimated LLM cost, from the agent’s past behaviour and knowledge base, is behind a Detailed costs button in the Primary LLM selector. That number lives in the product. It was not on either page fetched here.

## What to budget if you are buying the agent

Budget three lines, and do not add a fourth you cannot see.

The platform minute is $0.080, or $0.160 if the call is the one that broke the concurrency cap. A single three-minute connection is $0.24 at the ordinary rate, before the model and before any silence discount you have not seen on an invoice. One thousand of those calls, on the flat minute, are the November 11 comparison. That page’s ElevenLabs column was $238.80 for the minutes past the free 15. It did not apply a 95% silence cut, because the pricing page does not print one. If your calls are mostly hold time, the help center may make that column wrong, and only an invoice will show it.

The model is the second line. It is credits, shown in the UI, and it moves with the model, the knowledge base, and whatever optional LLM features you turn on. A cheap minute with an expensive model is still an expensive call. The pricing page does not let you see that from the outside.

The carrier is the third line. ElevenLabs says the carrier bills you. The November 11 page already refused to borrow a Twilio rate from Vapi or Retell and stick it here. That refusal still holds.

Concurrency is what the higher card buys. Scale at 3,000 minutes costs the $299 prepay, not a discount, because you bought 3,738 minutes. The November 11 page walks that trap. Outbound retries are a different product on top of the same minutes. Campaign Manager, published November 9, does not add a fee of its own on the docs page this site read November 10. The attempt caps are [What is ElevenAgents Campaign Manager?](/blog/what-is-elevenagents-campaign-manager).

If you evaluate the agent, use your own calls. The overview’s testing page is the vendor’s harness for that. Twenty of your transcripts, a pass rule, and a person on the transfers is the check. A demo minute at $0.08 is not.
