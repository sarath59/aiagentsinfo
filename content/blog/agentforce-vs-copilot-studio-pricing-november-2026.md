---
title: "Salesforce Agentforce vs Microsoft Copilot Studio Pricing: November 2026"
description: "A Salesforce standard action is 20 Flex Credits, $0.10, on the page read November 10, 2026. A Help Agent Resolution is 400 credits, $2.00. Copilot Studio’s agent action is 5 credits, $0.04 in a $200 pack. Microsoft’s illustrative reasoning-model message is 141 credits, $1.128, before the feature meter."
takeaways:
  - "Salesforce lists Flex Credits at $500 per 100,000, which is $0.005 each. The pricing page says an Agentforce action is 20 credits, $0.10. The November 3, 2026 rate card prices a Help Agent Resolution and an IT or HR Employee Agent Resolution at 400 credits, $2.00."
  - "Microsoft sells Copilot Credit packs at $200 for 25,000 credits, $0.008 each, billed annually. Pay-as-you-go is $0.01 a credit. An agent action is 5 credits: $0.04 in a pack, $0.05 pay-as-you-go."
  - "Microsoft’s own billing example of one follow-up on Claude Opus 4.7 uses 14,100 billed tokens and 141 Copilot Credits on the premium meter alone, $1.128 in a pack, and says the feature rates are added on top. The page calls those token counts illustrative."
date: "2026-11-10"
updated: "2026-11-10"
category: explainer
topics:
  - tools-saas
  - how-agents-work
  - task-performance
audience:
  - builders
  - everyone
companies:
  - microsoft
byline: "AI Agents Info Editorial"
contentLicense: true
absoluteTitle: true
dataset:
  title: "Agentforce and Copilot Studio list prices converted to dollars, November 10, 2026"
  description: "Dollar figures are arithmetic on prices and multipliers copied from Salesforce’s Agentforce pricing page, the Flex Credits rate card updated November 3, 2026, Microsoft Learn’s Copilot Studio billing page last updated October 31, 2026, and Microsoft’s Copilot Studio licensing guide. Pack price is $200 per 25,000 Copilot Credits. Pay-as-you-go is $0.01 per credit. Flex Credits are $500 per 100,000. The 141-credit and 461-credit rows are Microsoft’s published illustrative token examples, converted at those two credit prices. They are not a measured production bill."
  isBasedOn: "https://www.salesforce.com/agentforce/pricing/"
sources:
  - title: "Salesforce Agentforce pricing page, USD column, downloaded November 10, 2026"
    url: "https://www.salesforce.com/agentforce/pricing/"
  - title: "Salesforce Flex Credits rate card, updated November 3, 2026 (PDF)"
    url: "https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf"
  - title: "Microsoft Learn, Copilot Studio billing rates, last updated October 31, 2026, read November 10, 2026"
    url: "https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management"
  - title: "Microsoft Copilot Studio licensing guide, read November 10, 2026"
    url: "https://www.microsoft.com/licensing/guidance/Microsoft-Copilot-Studio"
  - title: "Microsoft Copilot Studio pricing page, read November 10, 2026"
    url: "https://www.microsoft.com/en-us/copilot/pricing/copilot-studio"
faq:
  - question: "How much does an Agentforce action cost?"
    answer: "Twenty Flex Credits on the pricing page read November 10, 2026. At the listed $500 per 100,000 credits, that is $0.10. A voice action is 30 credits, $0.15. A Help Agent Resolution on the November 3 rate card is 400 credits, $2.00. Those are list prices. The page says they can change and tells buyers to contact sales."
  - question: "How much does a Copilot Studio agent action cost?"
    answer: "Five Copilot Credits. A pack is $200 for 25,000 credits, $0.008 each, so one agent action is $0.04. Pay-as-you-go is $0.01 a credit, so the same action is $0.05. A turn can add a generative answer, tenant-graph grounding, or a reasoning-model token meter on top of that line."
  - question: "Is Agentforce more expensive than Copilot Studio?"
    answer: "On the named action line, yes: $0.10 against $0.04 in a pack, or $0.05 pay-as-you-go. On Microsoft’s illustrative reasoning-model message, the premium meter alone is 141 credits, $1.128 in a pack, before feature rates. On Salesforce’s resolution meter, one Help Agent Resolution is $2.00. The cheaper vendor is the one whose meter matches the job."
  - question: "Do unused agent credits roll over?"
    answer: "Not on the terms read here. The Salesforce rate card says Flex Credits must be used before the order end date and that no rollover is permitted. Microsoft’s licensing guide says unused Copilot Credit pack credits do not roll over to the next month."
  - question: "Does a Microsoft 365 Copilot license zero-rate Copilot Studio?"
    answer: "Employee-facing use is no charge when the person using the agent has a Microsoft Copilot license and the agent runs as that signed-in user. Computer-using agents are excluded. Agent flows are included only for the trigger named “When an agent calls the flow.” Other triggers consume credits."
---

**$0.10 and 141 credits.** A standard Agentforce action is 20 Flex Credits. At the $500 per 100,000 credits on the [pricing page](https://www.salesforce.com/agentforce/pricing/) downloaded November 10, 2026, that is $0.10. A Copilot Studio agent action is 5 credits. At [$200 per 25,000 credits](https://www.microsoft.com/licensing/guidance/Microsoft-Copilot-Studio), that is $0.04. Microsoft’s own [billing example](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management) of one follow-up question on a reasoning model is 141 credits on the token meter alone, $1.128 in a pack, and the feature rates sit on top.

The $0.04 line is a real price. It is the price of one named meter. A purchase order that stops there prices a different event from the one the agent will run.

This page uses the USD column only. Salesforce also prints euro, pound, yen, krona, and Australian dollar prices. Every dollar figure below is arithmetic on a multiplier and a credit price those pages print. None of it is an invoice.

## A standard action is $0.10. A help resolution is $2.00.

Salesforce’s page defines an action as one function the agent executes: updating a record, summarizing a case, answering a product question, or running a custom prompt or flow. It says each action is metered on its own, and that “Agentforce actions are 20 Flex Credits, while Agentforce Voice actions are 30 Flex Credits.”

The [rate card PDF](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf), titled “Working Version Flex Credits Rate Card 11.2026” and marked “Updated as of November 3, 2026,” is the multiplier table. A credit is still $0.005 at the page’s list price. The card says multipliers may be updated.

| Usage type | Production credits | Sandbox credits | Production at $0.005 | Sandbox at $0.005 |
| --- | --- | --- | --- | --- |
| Standard action | 20 | 16 | $0.10 | $0.08 |
| Custom action | 20 | 16 | $0.10 | $0.08 |
| Standard voice action | 30 | 24 | $0.15 | $0.12 |
| Custom voice action | 30 | 24 | $0.15 | $0.12 |
| Help Agent Resolution | 400 | 0 | $2.00 | $0.00 |
| IT and HR Employee Agent Resolution | 400 | 0 | $2.00 | $0.00 |
| Customer Engagement, leads worked | 400 | 320 | $2.00 | $1.60 |
| Slackbot standard action | 40 | not printed | $0.20 | not printed |
| Slackbot advanced action | 200 | not printed | $1.00 | not printed |
| Speech to text | 150 per hour | 150 per hour | $0.75 per hour | $0.75 per hour |
| Text to speech | 6,000 per 1M characters | 6,000 per 1M characters | $30 per 1M characters | $30 per 1M characters |

A help resolution is twenty standard actions. The pricing page also sells customer-facing agents at **$2 per conversation**. At list price, one conversation and one Help Agent Resolution land on the same dollar. They are different rows. This page did not run a case inside an org to see which row a given job burns.

The same card prices a sandbox help resolution at zero credits and a production one at 400. A test and a live resolution are not the same meter. The card also prices Data 360 and Personalization. Those rows are not in the table.

Max Edition, on the pricing page, includes the Agentforce add-on and **2.75 million Flex Credits per org per year**. Divided by 20, that is 137,500 standard actions. Divided by 400, it is 6,875 help resolutions. The page does not print the Max Edition subscription price next to that allowance, so the credits are not a free-standing $13,750 gift. At $0.005 they are worth $13,750 of list-price credit inside whatever the edition costs.

Two other seat prices are on the page. The employee add-on is **$125 per user per month** and says usage for employees is unmetered. The Agentforce user license is **$5 per user per month** and says it requires Flex Credits. Foundations is listed at $0 and names the builder, not a production credit pool.

## Copilot Studio’s agent action is $0.04. Its reasoning example is 141 credits.

The [licensing guide](https://www.microsoft.com/licensing/guidance/Microsoft-Copilot-Studio), read November 10, 2026, says all subscription prices are USD estimated retail, per month, billed annually, and subject to change. A capacity pack is **$200 per month for 25,000 credits**. Unused pack credits do not roll into the next month. Pay-as-you-go is **$0.01 per credit**, billed in arrears, and the guide says that meter does not start until pack entitlements are exhausted. The [marketing page](https://www.microsoft.com/en-us/copilot/pricing/copilot-studio) states the same pack price.

[Microsoft Learn](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management), last updated October 31, 2026, is the meter table. One interaction can hit several rows. The page’s own example of a tenant-graph reply is 12 credits: 10 for grounding and 2 for the generative answer.

| Meter | Credits | Pack, at $0.008 | Pay-as-you-go, at $0.01 |
| --- | --- | --- | --- |
| Classic answer | 1 | $0.008 | $0.01 |
| Generative answer | 2 | $0.016 | $0.02 |
| Agent action | 5 | $0.04 | $0.05 |
| Tenant graph grounding for a message | 10 | $0.08 | $0.10 |
| Grounded generative answer, the page’s 12-credit example | 12 | $0.096 | $0.12 |
| Agent flow actions, per 100 actions | 13 | $0.104 | $0.13 |
| Text and generative AI tools, premium, per 1,000 tokens | 10 | $0.08 | $0.10 |
| Classic voice, per minute | 10 | $0.08 | $0.10 |
| GenAI voice, per minute | 35 | $0.28 | $0.35 |
| Premium GenAI voice, per minute | 75 | $0.60 | $0.75 |

An agent action, in that document, is a step such as a trigger, deep reasoning, or a topic transition on the activity map. Computer-using agents are billed at that same 5-credit rate. They are not included in the Microsoft Copilot user license. The rest of computer use, including what a desktop agent is, is [Can an AI agent use your computer?](/blog/can-an-ai-agent-use-your-computer).

Ten thousand agent actions, and nothing else, are $400 in packs (50,000 credits) and $500 pay-as-you-go. The same count of Salesforce standard actions is 200,000 Flex Credits, **$1,000**. That comparison holds only when each side’s “action” is the event you actually buy.

## Four tool calls are the job where $0.04 stays $0.04.

Microsoft prints three daily formulas that do not use a reasoning model. Converting them at the pack price:

| Published example | Credit formula on the page | Pack dollars | Pay-as-you-go |
| --- | --- | --- | --- |
| Website support, 900 customers, 4 classic and 2 generative answers each | [(4×1)+(2×2)] × 900 = 7,200 a day | $57.60 a day | $72.00 a day |
| Sales questions, 100 unlicensed users, 4 generative answers and 4 graph groundings | [(4×2)+(4×10)] × 100 = 4,800 a day | $38.40 a day | $48.00 a day |
| One order, 4 action calls, no other meter in the formula | 4×5 = 20 | $0.16 an order | $0.20 an order |

The sales formula multiplies the 100 unlicensed users and not the 50 licensed users named in the same paragraph. That matches the no-charge rule for a signed-in Copilot user. Thirty of those support days, if every day matched the average, would be $1,728 in a pack. That is 30 times their daily estimate. It is not a quote.

Four Salesforce standard actions, at $0.10, would be $0.40 against the $0.16 order. For a chain of tool calls and no reasoning model, the Copilot list line is the lower one. The events still are not the same object. Salesforce’s page says one action can be “summarizing a complex case.” Microsoft’s order formula bills four separate action calls and no summary line.

## A reasoning model adds 10 credits per 1,000 tokens.

When the agent uses a reasoning model, Learn says the bill is two meters: the feature rate, plus text and generative AI tools (premium) at **10 credits per 1,000 tokens**. Cache reads are not billed. Input tokens, output tokens, and tokens written into the prompt cache are billed. Each model call in the turn counts. The charge is not per message.

The worked example is a customer-support agent on Claude Opus 4.7. One follow-up takes two calls. The billed tokens are 4,600 on the plan call and 9,500 on the answer call, **14,100** in total.

14,100 × 10 / 1,000 = **141 credits**.

| How you read the 141 | Pack | Pay-as-you-go |
| --- | --- | --- |
| Premium meter only | $1.128 | $1.41 |
| Plus one generative answer, 2 credits | $1.144 | $1.43 |
| Their cold-start variant, 461 credits, premium meter only | $3.688 | $4.61 |

The page says the feature rates for the activities in the turn are added to the 141, and that the token counts are illustrative. A new conversation in the same example, with less already cached, is 461 credits on the premium meter. At the pack price that is $3.688 before the generative-answer line. One Agentforce standard action does not buy that turn. Eleven of them, at $0.10, still come to $1.10, which is short of the $1.128 premium meter.

Agents “powered by the GitHub Copilot harness” are billed on a different page. This note does not reprice that path. A token bill for a model you call yourself, outside either of these credit systems, is the [agent cost calculator](/agent-cost-calculator).

## Voice is a minute, and the action meters come inside it.

Copilot Studio’s voice table is per minute, and the classic answer, generative answer, and agent action are marked included in that minute. Classic voice is $0.08 a minute in a pack. GenAI voice is $0.28. Premium GenAI voice is $0.60. Pay-as-you-go is $0.10, $0.35, and $0.75.

Salesforce’s voice row is a voice action, 30 credits, $0.15 at list. The rate card says some customers are billed on Agentforce Voice Minutes instead. This page did not price that second voice meter. Copilot’s $0.08 is a minute with the action meters inside it. Salesforce’s $0.15 is an action. The two rates sit on different units.

Hosted voice products that sell a minute directly, rather than a credit, are a third price list. ElevenLabs’ agent product is the [ElevenAgents note](/blog/what-is-elevenagents-campaign-manager). It is not this table.

## Prepaid credits expire on different clocks, and 125% stops the agent.

The Salesforce card says Flex Credits must be used before the order end date, and that no rollover is permitted. A year of credits can sit until that date. Microsoft pack credits die at the month’s end even if the contract is annual. Buying a large Copilot pack for a seasonal agent leaves the unused credits on the table every month. Buying a large Flex Credit pool leaves them until the order ends, and then they are gone.

Copilot Studio’s enforcement rule is specific. At **125% of prepaid capacity**, for custom agents on the prepaid model, the environment’s agents are blocked. A blocked agent stops responding, including in a conversation already underway. An environment that bills overage to pay-as-you-go is not blocked when the pack runs out. The extra usage goes to the meter. The Salesforce pricing page, in the copy downloaded the same morning, does not print an equivalent cutoff.

Employee-facing Copilot Studio use is no charge when three things are true: the scenario is business-to-employee, the person has a Microsoft Copilot license, and the agent runs as that authenticated user. The guide says fair-use limits apply and Microsoft can change them. Computer-using agents stay on the 5-credit meter anyway.

## What to put on the purchase order

Price the row the job will hit, then write that row into the order.

- A record update or a single tool call is the $0.10 Salesforce action or the $0.04 Copilot action. Ten thousand of those, and nothing else, are $1,000 or $400 at list.
- A resolved help case is the $2.00 Salesforce resolution, or the $2.00 conversation SKU. It is not twenty cents.
- A reply grounded in tenant data, with no reasoning model, is Microsoft’s 12-credit example: $0.096 in a pack. That is four tenths of a cent under a Salesforce standard action, and it is a reply, not a write.
- A reasoning-model reply is the premium token meter. Use Microsoft’s 141-credit illustration as a scale, $1.128 before feature rates, and then measure your own instructions and knowledge. Their page says the counts depend on the agent.
- A voice minute on Copilot Studio starts at $0.08 and includes the action meters. A Salesforce voice action is $0.15 and is not a minute.
- If the users already hold Microsoft 365 Copilot and the agent runs as them, the feature table is no charge, computer use excepted. If they do not, the $125 unmetered Salesforce add-on is the other way off the meter, and it is a seat price, not a usage price.

The [loop those credits pay for](/blog/how-do-ai-agents-work) is still a model proposing a step and a harness running a tool. The credit is the invoice for that step. The step’s name on the rate card decides the invoice.
---
