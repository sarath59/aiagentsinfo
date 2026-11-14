---
title: "Can an AI agent buy things online for me? Navoka gives it a separate card"
description: "Sometimes. Wirex’s Navoka, launched November 12, 2026, pays from the agent’s own IBAN and debit card, inside limits checked at authorisation. ChatGPT still sends you to the store."
absoluteTitle: true
takeaways:
  - "An agent can buy online only when a product already has a payment path. Navoka’s path, launched November 12, 2026, is a separate IBAN, debit card, and USDC/EURC wallet. ChatGPT’s merchant page, read November 12, still completes the purchase on the store’s site."
  - "Navoka’s agent terms, version 1.0 dated October 18, 2026 and read November 13, charge no software fee. A separate Wirex group company holds the funds and issues the card. Wirex Holdings caps its own liability at the greater of £100 and software fees paid in a 12-month period."
  - "The mandate is holder-only. set_policy from an agent session is refused. Card checks run at authorisation. The kill switch freezes the card and does not reverse a payment that has already executed."
date: "2026-11-13"
updated: "2026-11-14"
category: news
topics:
  - news
  - shopping
  - how-agents-work
  - harnesses
  - tools-saas
audience:
  - everyone
  - builders
companies:
  - wirex
  - navoka
  - chatgpt
  - claude
  - grok
  - google
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Navoka fees, liability cap, and sandbox rules, read November 13, 2026"
  description: "Navoka agent terms v1.0, dated October 18, 2026: software fee none; Wirex Holdings Limited’s liability cap is the greater of £100 and software fees paid in any 12-month period. Developers page the same day: production MCP endpoint https://mcp.navoka.com, sandbox https://mcp.sandbox.navoka.com, sandbox free, test holder auto-approves after 5 seconds unless the header X-Navoka-Test-Hold is always. The €500 monthly budget, €250 approval threshold, and €600 per-transaction ceiling are the sample mandate on that page, not a tariff and not a limit this desk measured."
  isBasedOn: "https://navoka.com/legal/agent-terms"
sources:
  - title: "Wirex, Navoka launch (PR Newswire, November 12, 2026, 10:44 ET)"
    url: "https://www.prnewswire.com/news-releases/wirex-launches-navoka-an-ai-agent-that-pays-from-its-own-bank-account-and-card-302938065.html"
  - title: "Navoka, product home (read November 13, 2026)"
    url: "https://navoka.com/"
  - title: "Navoka, spending limits and approvals (read November 13, 2026)"
    url: "https://navoka.com/controls"
  - title: "Navoka, MCP endpoint and tools (read November 13, 2026)"
    url: "https://navoka.com/developers"
  - title: "Navoka, security (read November 13, 2026)"
    url: "https://navoka.com/security"
  - title: "Navoka, connect ChatGPT, Claude, or Grok (read November 13, 2026)"
    url: "https://navoka.com/connect"
  - title: "Navoka, connect ChatGPT (read November 13, 2026)"
    url: "https://navoka.com/connect/chatgpt"
  - title: "Navoka, connect Claude (read November 13, 2026)"
    url: "https://navoka.com/connect/claude"
  - title: "Navoka, agent terms v1.0 (October 18, 2026; read November 13, 2026)"
    url: "https://navoka.com/legal/agent-terms"
  - title: "Navoka, about and availability (read November 13, 2026)"
    url: "https://navoka.com/about"
  - title: "Navoka, Wirex One connection (read November 13, 2026)"
    url: "https://navoka.com/wirex-one"
  - title: "Navoka, comparison framing (competitor rows dated October 9, 2026 by Navoka)"
    url: "https://navoka.com/compare"
  - title: "Wirex, principal membership of Visa and Mastercard (read November 13, 2026)"
    url: "https://www.wirexapp.com/"
  - title: "AI Agents Info, How do AI shopping agents pay? (read November 12, 2026)"
    url: "https://www.aiagentsinfo.com/blog/how-do-ai-shopping-agents-pay"
  - title: "OpenAI, Power product discovery in ChatGPT (merchant page, read on this site November 12, 2026)"
    url: "https://openai.com/chatgpt/search-product-discovery/"
  - title: "Google, Gemini 4 Hydrogen (November 12, 2026)"
    url: "https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-4-hydrogen/"
  - title: "TechCrunch, Nectar Creator Agent (November 12, 2026)"
    url: "https://techcrunch.com/2026/11/12/nectar-launches-an-ai-agent-to-automate-creator-discovery-and-outreach-for-brands/"
  - title: "Nectar, Creator Agent launch (Business Wire, November 12, 2026)"
    url: "https://www.businesswire.com/news/home/20261112267815/en/Nectar-Launches-an-Always-On-Creator-Agent-to-Activate-Every-Brands-Biggest-Distribution-Channel"
  - title: "Nectar MCP (read November 13, 2026)"
    url: "https://www.nectarsocial.com/mcp/"
  - title: "DOPE Labs, DOPE launch (GlobeNewswire, November 12, 2026)"
    url: "https://www.globenewswire.com/news-release/2026/11/12/3401713/0/en/dope-labs-launches-dope-a-personal-ai-agent-for-prediction-markets.html"
  - title: "DOPE, terms of use (read November 13, 2026)"
    url: "https://dope.markets/terms.html"
faq:
  - question: "Can an AI agent buy things online for me?"
    answer: "Sometimes, and only on a payment path the product already has. ChatGPT’s merchant page, read November 12, 2026, still sends the purchase to the store’s website or app. On November 13, ChatGPT Wallet added a separate path inside a dot: your credit card, a network token, and a biometric on every purchase. Navoka, launched by Wirex on November 12, pays from an IBAN, debit card, and USDC/EURC wallet that belong to the agent, inside limits you set. A scoped token or a signed mandate spends your own card inside a max amount."
  - question: "Does Navoka charge my personal card?"
    answer: "No. Navoka’s pages say the agent’s debit card is separate from a Wirex One card, the agent cannot use yours, and neither the agent nor a connected assistant sees the card number. You move money into the agent’s account. The card is a network token. The pages read November 13, 2026 do not name the card scheme."
  - question: "What does Navoka cost?"
    answer: "The agent terms, version 1.0 dated October 18, 2026, say the software service has no software fee. Fees for payments, cards, exchange, and trading are set by a separate Wirex group company and shown before you approve when the rail returns a quote. The pages read November 13 do not publish that tariff. The sandbox is free."
  - question: "Can ChatGPT pay by itself if I connect Navoka?"
    answer: "It can ask. It cannot approve, and it cannot change the limits. ChatGPT setup is on the web: Developer mode, a plugin pointed at https://mcp.navoka.com, authentication set to OAuth. A payment inside a rule you already set to run unattended can go through without a fresh tap. Anything outside the rule is held until you approve."
  - question: "Can the agent raise its own spending limit?"
    answer: "No. Navoka’s developers page says set_policy is holder-only, refused from an agent session, and the attempt is logged. Approve and Decline are bound to your account, device, or web session. A connected assistant has no path to the mandate."
  - question: "Does the kill switch undo a payment?"
    answer: "No. The agent terms say pausing stops new actions and does not reverse actions already executed. The kill switch freezes the card, pauses the rules, and unlinks assistants. The ledger is the record of what already left."
---

Published November 13, 2026. Updated November 13, 2026.

Sometimes. A [shopping agent](/glossary/shopping-agent) can buy online only when a product already has a way to take payment. On November 12, 2026, Wirex launched [Navoka](https://navoka.com/), an agent that pays from its own IBAN, debit card, and USDC/EURC wallet. The money is not sitting on your personal card. You write the limits. The card is checked against them at authorisation. You can freeze it.

That is a different answer from ChatGPT. The merchant page read on this site on November 12 still finishes the purchase on the store’s website or app. Which credential moves in that model, and in Visa, Mastercard, Shop Pay, and Amazon Buy for Me, is [How do AI shopping agents pay?](/blog/how-do-ai-shopping-agents-pay). What those companies have dated through May 2027 is [AI shopping agents, the next 6 months](/reports/ai-shopping-agents-next-6-months).

This desk did not open a Navoka account, pass an invite gate, or authorise a card payment. The reading below is the November 12 release and the Navoka pages open on November 13.

## Can an AI agent buy things online for me?

Yes, on a specific product, and the product decides whose balance moves.

Checkout redirect and a scoped token were already on this site’s record. Navoka adds an account that belongs to the agent. DOPE, launched the same morning, is not a shop. It is in the table because it refuses to hold the money.

| Path | Whose balance | Where the “no” sits | What was true on November 12–13 |
| --- | --- | --- | --- |
| Checkout redirect | Yours, on the store’s page | You, at the store | ChatGPT’s merchant page, read November 12, completes the purchase on the merchant’s site or app |
| Scoped token or signed mandate | Yours, narrowed | A max amount, a merchant, an expiry, or a tap on a trusted screen | [Delegated payment token](/glossary/delegated-payment-token), AP2, Shop Pay, Visa, Mastercard. The map is the November 12 payments guide |
| Agent’s own account and card | A balance you moved into an account opened for the agent | The issuer, at card authorisation, against a mandate you wrote | Navoka, launched November 12 |
| Confirm, then place, on your own venue account | Yours, at the exchange | You, on every order | DOPE, for prediction markets, launched November 12. Not a shop |

[Agentic checkout](/glossary/agentic-checkout) is the payment step. [Agentic commerce](/glossary/agentic-commerce) is the category around it. A chat that names three toasters has not bought anything. A buy starts when a [tool call](/glossary/tool-use) can hold a cart or a payment instruction, and a [guardrail](/glossary/guardrail) can stop it.

Navoka’s own [compare page](https://navoka.com/compare) asks the same two questions: who holds the money, and who issues the card. Its footnote dates the competitor rows to October 9, 2026. This article does not adopt those rows. The table above is the set this desk could re-read on November 12 and 13.

## What did Wirex launch on November 12?

[Wirex’s release](https://www.prnewswire.com/news-releases/wirex-launches-navoka-an-ai-agent-that-pays-from-its-own-bank-account-and-card-302938065.html), timed 10:44 ET on November 12, says Navoka launched that day at Full Stack London and is accessible by invitation only. The release calls it the first agent that pays from a dedicated bank account and card. That “first” is Wirex’s claim. The release does not show a survey of every other issuer.

Pavel Matveev, CEO and co-founder of Wirex, is quoted: “Navoka gives the agent its own account and card, so people can hand over the paying without handing over their bank details.”

The release says each agent gets its own IBAN, debit card, and USDC and EURC wallet, separate from the user’s personal accounts, with funds moving instantly between them. Users set allowed merchants, spending limits, daily caps, and country lists. Agents cannot change those rules. Anything outside them waits. A kill switch freezes the card, pauses the rules, and disconnects linked assistants. Each payment records the rule it ran under, who approved it, and why. The agent and connected assistants never see the user’s card numbers. Each agent runs on its own isolated machine, wiped if the user revokes access.

The same release lists dollars, euros, and pounds, plus buying, holding, and selling USDC, EURC, BTC, ETH, and SOL, and recurring buys of stocks and tokenised stocks inside a monthly cap and an asset list the user chooses. It also cites two outside figures as the reason for the product: Juniper Research’s expectation that 1.3 billion people will use agentic commerce by 2031, and Visa’s Trust Index finding that 23 percent of US consumers trust generative AI to handle payment transactions. Those numbers are the release’s citations. This desk did not reopen either study.

Wirex’s boilerplate in that release says the company issues cards on its own Visa and Mastercard principal membership, with programmes in 136 markets, and that it was the fastest in crypto-card history to reach $1 billion in annualised card spend. Read that as Wirex describing Wirex. It is not a Navoka volume, and it is not the name of Navoka’s card scheme. [Wirex’s own site](https://www.wirexapp.com/), read November 13, still says the company is a principal member of Visa and Mastercard. Navoka’s pages, read the same day, call the agent’s card a network token and do not name Visa or Mastercard.

## Whose money moves when Navoka pays?

Not yours, until you move it.

The [home page](https://navoka.com/) says the wallet, IBAN, and card belong to the agent. USDC and EURC can be held and sent as soon as the account exists. The IBAN and the card wait on an identity check, or on an import from Wirex One. [Wirex One’s connection page](https://navoka.com/wirex-one) says that import skips a second verification, that transfers both ways are instant and free, and that the agent’s card earns at the holder’s Wirex One cashback rate, paid back to the Wirex One account rather than the agent’s. Yield, ATM withdrawals, and travel perks stay on the person’s side. The [about page](https://navoka.com/about) says accounts are in dollars, euros, and pounds, with ACH, SEPA, Faster Payments, SWIFT, and stablecoin rails, and that eligibility is confirmed during sign-in before identity documents are requested.

The release and the product site do not say the same thing about who can get in. The release says invitation only. The connect pages and the [agent terms](https://navoka.com/legal/agent-terms) describe an account created at sign-in. This desk did not click through a signup, so it cannot tell you whether an invite code still stops the form.

The terms are the sharper document. Version 1.0 is dated October 18, 2026, three weeks before the press release. They say Navoka is software operated by Wirex Holdings Limited, company number 12323130, at 9th Floor, 107 Cheapside, London. They also say the service is not a financial service. Any account, IBAN, card, payment, transfer, currency exchange, stablecoin, or trading service is provided by a separate Wirex group company, called the Provider. The Provider, not Wirex Holdings, holds the funds, issues the card, and executes the payment. If the two contracts conflict on a regulated service, the Provider’s terms win. Those Provider terms are accepted during onboarding. They are not pasted on the pages read here. The pages do not name the Provider, the card scheme, or a deposit-protection scheme.

Section 6 of the agent terms says the software has no software fee. Provider fees for payments, cards, exchange, and trading are shown before you approve when the rail returns a quote. There is no public tariff on the pages read November 13. The [developers page](https://navoka.com/developers) says the sandbox is free.

Section 10.3 caps Wirex Holdings’ liability to you, in any 12-month period, at the greater of £100 and the software fees you paid in that period. A software fee of zero makes that cap £100. Section 10.2 says Wirex Holdings is not liable for acts or omissions of the Provider, a messaging app, a third-party assistant, or a merchant. The company that holds the money is the company whose contract you have not been shown in public.

That is the trade. A separate card can be declined without exposing your personal PAN. The balance that feeds the card sits with a Provider this site cannot name from the public pages, under a software contract that caps the software company at £100 and does not unwind the Provider’s acts.

You must be 18. Messages from your connected assistant count as your instructions. The agent uses models to read invoices and merchant pages, and the terms say that output can be wrong. Check the payee, the amount, and the reference before you approve.

## What gets checked before the card is approved?

The mandate, at the account, not a sentence in the prompt.

[Navoka’s controls page](https://navoka.com/controls) lists a monthly budget, an approve-above threshold, a per-transaction ceiling, a daily count and value, an allowlist of merchants and payees, a country list, category blocks, a mode, and a kill switch. A new rule defaults to “approve each”: every payment waits for a tap. “Run inside the limit” lets an in-policy payment proceed and holds the rest. A new payee, an amount above the threshold, a blocked category, or a new country is held either way. The mode changes what happens inside the rules. It does not erase the outside.

Those two modes are the glossary, applied to a card. Approve-each is a [human in the loop](/glossary/human-in-the-loop): the payment does not count until you tap. Run-inside-the-limit is a [human on the loop](/glossary/human-on-the-loop): you already approved the rule, the payment proceeds, and you can still stop the next one. How far that rule reaches is [autonomy](/glossary/autonomy). The pause itself is an [approval gate](/glossary/approval-gate).

The euro figures on the controls page are a worked example of the sentence “give my agent €500 a month,” not a price list and not a default this desk observed on a live account. The developers page prints the same idea as a sample mandate: monthly budget €500, approve above €250, per-transaction ceiling €600, velocity of 10 payments and €800 a day, countries ES, GB, US, and AE, and MCC allow `5411`, `4722`, `5734`, `4900` with deny `7995` and `6011`. The controls page glosses the blocked set as gambling and cash. Treat the names, the amounts, and the country list as the sample. The [controls page](https://navoka.com/controls) also says ceilings, and how many agents and cards you can run, follow your Wirex One tier. It does not print the tier prices.

The [security page](https://navoka.com/security) says the card is issued in the agent’s name and provisioned as a network token. The PAN stays in the issuer’s vault. It is not in the model’s context, the logs, or the chat. `issue_card` returns a token reference. IBANs are masked. A leaked token still has to pass the mandate, and you can freeze the card.

Each agent runs in its own virtual machine with its own encrypted storage. The security page says the machine is torn down and rebuilt on revoke. The release’s phrase was “wiped.” Both sentences are the company’s. This desk did not inspect a VM.

Approve and Decline are bound to your identity: Telegram account, device, or web session. An agent session cannot press them. `set_policy` from an agent session is refused and logged. The controls page says raising a ceiling in the middle of a payment is a separate action by you, then a fresh approval.

The kill switch freezes cards, pauses rules, and unlinks assistants. Write tools then return `frozen`. The agent terms, section 3.5, say pausing stops new actions and does not reverse actions already executed. Unpausing restores the rules as they were. Nothing is re-approved for you.

The ledger row stores the payee, the amount, the rule, the approver, and the reason you gave, captured when the payment is made. The controls page describes a dispute pack: the instruction, the rule, the approval, the receipt, and the timestamps. That pack is Navoka’s description of a button. It is not a scheme rule, and it is not a chargeback rate.

One residual risk is easy to miss. Inside “run inside the limit,” a message from a connected [ChatGPT](/directory/chatgpt), [Claude](/directory/claude), or Grok account can spend without a fresh tap, up to the rule you already wrote. The terms say a message from that connected account counts as yours. A stolen assistant session cannot rewrite the mandate. It can spend whatever the mandate already allows. Fund the agent’s account like a card you can afford to have used today. Do not park a salary in it.

The release’s stock feature sits under the same shape: a monthly cap and an asset list you choose. The terms say the agent does not give investment advice, and trading is the Provider’s service. A recurring buy of a tokenised stock is not a jacket checkout. Do not treat the shopping sentence and the brokerage sentence as one permission.

## Why is this not the same as ChatGPT sending you to the store?

Because ChatGPT, on the page read November 12, never becomes the payer.

Shoppers discover products in ChatGPT. The purchase completes on the merchant’s site or app. There is no agent balance and no agent card in that sentence. A [product feed](/glossary/product-feed) gets the item quoted. It does not charge anyone. The longer account of who can finish a purchase is [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you). Licence and checkout path for the products already checked are [Best AI agent for shopping](/best/ai-agents-for-shopping).

A delegated token is the middle path. OpenAI’s spec describes a single-use token with a max amount, a merchant, and an expiry. Google’s Agent Payments Protocol uses signed mandates. Visa and Mastercard register the agent and tokenise a credential. Shop Pay returns a one-time credential after the buyer approves. Amazon Buy for Me sends encrypted card details after the shopper confirms an Amazon checkout page. In all of those, the shopper’s own payment method is the source of funds. The agent does not have an IBAN.

Navoka flips the source of funds and leaves the merchant integration alone. A store that already accepts a tokenised debit card can be charged. The merchant does not turn on the Agentic Commerce Protocol to receive it, and a guest checkout still does not enroll that merchant in Visa Intelligent Commerce or Mastercard Agent Pay. [Know Your Agent](/glossary/know-your-agent) is Mastercard’s registration check. Navoka’s compare page says its cards are “designed to work with” network protocols. That is a design sentence, not a certification list this desk could verify on a scheme page.

The practical split for a merchant: a Navoka charge looks like a card authorisation that Navoka can decline before it reaches you. You do not get the protocol’s agent id, the single-use allowance, or a feed flag. If you need to know an agent is paying, you still need the network or protocol path in the [payments guide](/blog/how-do-ai-shopping-agents-pay). If you only need to get paid, a normal card acceptance path is what this product is aiming at. What your page must publish so an agent can quote a real price is [How to make your store readable by AI shopping agents](/blog/how-to-make-your-store-readable-by-ai-shopping-agents). The [readiness checker](/tools/shopping-agent-readiness-checker) scores find, read, and pay separately.

A computer-use agent that clicks Pay on your site is a different shape, and a worse one for consent: the card number is whatever is saved in the browser. That guide is [Can an AI agent use your computer?](/blog/can-an-ai-agent-use-your-computer). Navoka’s pitch is the opposite of that click. The PAN never enters the model.

## What should a builder test before trusting the mandate?

The policy lives at the account. A system prompt that says “do not overspend” is not a control. The [harness](/glossary/harness) may call the tools. It does not get to edit the mandate. That split is the same idea as a trusted surface that is not allowed to be the model. Here the surface is the issuer-side check, not a wallet popup.

The production endpoint, from the developers page, is `https://mcp.navoka.com`. Transport is MCP over streamable HTTP. Auth is OAuth 2.1 with PKCE. The holder authorizes once. The agent session gets a scoped token. Scopes listed: `ledger:read`, `policy:read`, `cards:issue`, `payments:write`, `payouts:write`. There is no API key that outranks the policy. A REST surface for the same operations is `api.navoka.com/v1`. The [Model Context Protocol](/glossary/model-context-protocol) is the tool path. The account policy is the guardrail. Connecting MCP does not move the check into the client.

The tools, as named on that page:

| Tool | What it does | When it holds |
| --- | --- | --- |
| `get_balance` | Balance and remaining budget by currency | Never |
| `get_policy` | Read the mandate | Never |
| `issue_card` | Issue or read the agent’s debit card; returns a token reference, never a PAN | Never. The check is at authorisation |
| `pay_invoice` | Pay by ACH, SEPA, or Faster Payments | New payee, above threshold, over ceiling |
| `send` | Transfer. Rails named: `ach`, `sepa_instant`, `fps`, `swift`, `usdc`, `eurc`, `push_to_card` | New payee, above threshold, country not allowed |
| `payout` | A batch, one approval for the batch | New payees, batch above threshold, monthly cap |
| `get_ledger`, `get_line` | The row, or one `line_id` | Never |
| `set_policy` | Holder only | Always, from an agent session. Refused and logged |

Every write takes a `reason` string. It is stored on the ledger row. Every write returns a `line_id` and a `status`. `held` is a normal result, not an error. Reason codes on the developers page: `new_payee`, `above_threshold`, `merchant_not_allowed`, `country_not_allowed`, `mcc_denied`, `velocity`, `budget_exceeded`. The sample `pay_invoice` for €1,250 comes back `held` with `new_payee` and `above_threshold`. That sample is a fixture on the page, including the payee name. It is not a payment this desk watched settle.

The docs tell the agent not to retry a hold and not to split the amount to duck the ceiling. Velocity and the budget catch the split, and the attempt is logged. The agent terms ban the same trick.

The sandbox is `https://mcp.sandbox.navoka.com`. Same tools, synthetic rails, no KYC, no real money. The test holder auto-approves after 5 seconds, or never if you send `X-Navoka-Test-Hold: always`. Test cards decline on the merchant `decline.test`. Rail fees come back on the `quote` field before execution.

An eval for this integration is those statuses, not a screenshot of a chat. Did an out-of-policy `pay_invoice` return `held` and a reason code? Did `set_policy` from the agent session fail and leave a log? Did `decline.test` decline? Did the kill switch make the next write return `frozen`? Did the model retry or split a held amount? The [sandbox](/glossary/sandbox) is where that run belongs. This desk did not send those calls. If your harness cannot assert `held`, you do not have a payments integration. You have a prompt.

Chat surfaces, from the pages read November 13:

- Telegram is live. The about page lists the bot as [t.me/NavokaAiBot](https://t.me/NavokaAiBot). WhatsApp and iMessage are marked coming soon.
- [ChatGPT](/directory/chatgpt) is a web plugin. Settings, then Security and login, then Developer mode. Developer mode is not in the mobile app. New Plugin, name Navoka, server URL `https://mcp.navoka.com`, authentication OAuth. Do not leave “No Auth” selected. Navoka says it has no plan requirement of its own, and that custom plugins need a ChatGPT plan that includes Developer mode. If the plan cannot add a connector, the Telegram bot is the same account and the same limits.
- [Claude](/directory/claude) is an MCP connector. The connect page offers a pre-filled add, or Customize, Connectors, Add custom connector. Claude Code is `claude mcp add --transport http navoka https://mcp.navoka.com`, then sign in with `/mcp`. A hold raised from Claude Code can be approved in Telegram.
- Grok, on the connect index, is Skills and Connectors, then New Connector, same URL.

Claude can be connected beside ChatGPT on one Navoka account. Either can ask. Neither can approve itself. Disconnecting one assistant drops that endpoint. The kill switch is the stop for the card and the rules together.

## What else shipped for agents on November 12?

Three other launches, checked against their own pages, change a different layer. None of them gives an agent an IBAN.

Google’s [Gemini 4 Hydrogen post](https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-4-hydrogen/), dated November 12, says developers can build with Hydrogen for repository coding, debugging, and agentic workflows, on its own across four thinking levels or beside Gemini 4 Carbon and Gemini 4 Argon. The door is the Gemini API in AI Studio and Android Studio, Gemini for business, or the Gemini app path for paid Google AI Pro and Ultra subscribers in Antigravity. [Gemini](/directory/gemini) is the product family. Hydrogen does not pay a merchant. It is a model a harness can call. The Carbon price, the model id, and the HTTP 400 on `thinking_budget` stay on [Gemini 4 Carbon for agent harnesses](/blog/gemini-4-carbon-for-agent-harnesses).

[Nectar’s Creator Agent](https://techcrunch.com/2026/11/12/nectar-launches-an-ai-agent-to-automate-creator-discovery-and-outreach-for-brands/), reported by TechCrunch the same day, finds and messages creators for brands. Nectar’s [release](https://www.businesswire.com/news/home/20261112267815/en/Nectar-Launches-an-Always-On-Creator-Agent-to-Activate-Every-Brands-Biggest-Distribution-Channel) says it is available to Nectar customers, covers Instagram and TikTok, and pulls from more than 300 million profiles. It also says the Creator Agent will soon be available in Nectar’s MCP. Nectar’s [MCP page](https://www.nectarsocial.com/mcp/), read November 13, says the connector that is live today reads. Publishing, replies, DMs, and creator search are on the roadmap, not in that release. An “agent with MCP” headline and a read-only server are not the same ship.

[DOPE](https://www.globenewswire.com/news-release/2026/11/12/3401713/0/en/dope-labs-launches-dope-a-personal-ai-agent-for-prediction-markets.html), from DOPE Labs on November 12, prepares prediction-market orders and does not place them until the user confirms. The [terms](https://dope.markets/terms.html), read November 13, say DOPE does not open accounts, does not hold funds, and is not a counterparty. A connected account has to be one the user already holds at a CFTC-regulated exchange. The user authorizes each order. The device sends it. That is the confirm-then-place model, on the person’s own venue account. Navoka is the other pole: the Provider holds a balance, and a rule can spend it without a fresh tap. If you are choosing a payments design, those are the two ends. A redirect, like ChatGPT’s store handoff, sits in between and never holds either balance.

## What does this mean if you shop, sell, or build?

Shoppers. An agent can buy for you on Navoka only after money is in the agent’s account and a mandate exists. Start on “approve each.” Move a rule to “run inside the limit” only after you have watched it. The release says access is invite-only. The site describes sign-in. Until you have an account, you do not have this card. ChatGPT’s merchant page, read November 12, still sends you to the store. On November 13, OpenAI opened a different yes, ChatGPT Wallet, inside a dot: your own credit card, a network token, and Face ID or Touch ID on every purchase. That explainer is [How does ChatGPT Wallet work? Face ID, then a payment token](/blog/how-does-chatgpt-wallet-work). The phrase people are searching, “can AI buy things online for me,” does not have one product behind it.

Merchants. You do not integrate Navoka to be chargeable by this card. You also do not learn, from the card payment alone, that an agent sent it. Keep the protocol work on the channel that has already named you. A decline at authorisation is Navoka’s mandate, not your checkout rule. Your feed still has to be readable if you want to be quoted before that charge. The calendar of who has dated a checkout through May 2027 remains the [shopping report](/reports/ai-shopping-agents-next-6-months).

Builders. Put the spend limit in the account policy, then test that the model cannot edit it. Assert `held`, `frozen`, and a refused `set_policy` in the sandbox before you let a session near a live balance. Show the `quote` before execution. Do not retry a hold. Do not split an amount. Treat a connected ChatGPT plugin as an instruction channel, not as a second approver. The software fee is zero on the agent terms. The Provider’s fee is whatever the quote says, on a contract you accept at onboarding, from a company the public pages do not name. Price that uncertainty. Do not price a demo.

The [shopping topic](/topics/shopping) collects the checkout guides. The word for the loop around these tools is still a [harness](/glossary/harness). Navoka is not one you install. It is an account you point a harness at, with the stop rule on the other side of the API.

## Where can you read more on this site?

- November 14, 2026: [How does ChatGPT Wallet work? Face ID, then a payment token](/blog/how-does-chatgpt-wallet-work)
- Payments map, read November 12, 2026: [How do AI shopping agents pay?](/blog/how-do-ai-shopping-agents-pay)
- Who can finish a purchase: [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you)
- Report: [AI shopping agents, the next 6 months](/reports/ai-shopping-agents-next-6-months)
- Comparison: [Best AI agent for shopping](/best/ai-agents-for-shopping)
- Store pages: [How to make your store readable by AI shopping agents](/blog/how-to-make-your-store-readable-by-ai-shopping-agents)
- Tool: [Shopping agent readiness checker](/tools/shopping-agent-readiness-checker)
- Glossary: [shopping agent](/glossary/shopping-agent), [agentic checkout](/glossary/agentic-checkout), [agentic commerce](/glossary/agentic-commerce), [delegated payment token](/glossary/delegated-payment-token), [Know Your Agent](/glossary/know-your-agent), [guardrail](/glossary/guardrail), [approval gate](/glossary/approval-gate), [human in the loop](/glossary/human-in-the-loop), [human on the loop](/glossary/human-on-the-loop), [autonomy](/glossary/autonomy), [harness](/glossary/harness), [tool use](/glossary/tool-use), [MCP](/glossary/model-context-protocol)
- Directory: [ChatGPT](/directory/chatgpt), [Claude](/directory/claude), [Gemini](/directory/gemini)

## Frequently asked questions

### Can an AI agent buy things online for me?

Sometimes. [ChatGPT](/directory/chatgpt)’s merchant page, read November 12, 2026, still sends the purchase to the store. On November 13, ChatGPT Wallet added a path inside a dot: your credit card, a network token, and a biometric on every purchase. That page is [How does ChatGPT Wallet work?](/blog/how-does-chatgpt-wallet-work). Navoka, launched by Wirex on November 12, pays from an IBAN, debit card, and USDC/EURC wallet that belong to the agent, inside limits you set. A [delegated payment token](/glossary/delegated-payment-token) spends your own card inside a max amount. The map of the older token path is [How do AI shopping agents pay?](/blog/how-do-ai-shopping-agents-pay).

### Does Navoka charge my personal card?

No. The [Wirex One page](https://navoka.com/wirex-one) says the agent’s debit card is separate, your Wirex One card is untouched, and the agent cannot use it. You move money into the agent’s account. The card is a network token. The pages read November 13 do not name the scheme.

### What does Navoka cost?

The [agent terms](https://navoka.com/legal/agent-terms), version 1.0 dated October 18, 2026, charge no software fee. Payment, card, exchange, and trading fees belong to a separate Wirex group company and are shown before you approve when the rail returns a quote. No public tariff for those fees was on the pages read November 13. The sandbox is free.

### Can ChatGPT pay by itself if I connect Navoka?

It can ask. It cannot approve, and it cannot change the limits. Setup is a web plugin at `https://mcp.navoka.com` with OAuth, not “No Auth.” A payment inside a rule you set to run unattended can go through without a fresh tap. Anything outside the rule is held.

### Can the agent raise its own spending limit?

No. `set_policy` is holder-only. An agent session that calls it is refused, and the attempt is logged. Approve and Decline are bound to you. A connected assistant has no path to the mandate.

### Does the kill switch undo a payment?

No. The agent terms say pausing stops new actions and does not reverse a payment already executed. The switch freezes the card, pauses the rules, and unlinks assistants. The ledger is what already left.
