---
title: "How does ChatGPT Wallet work? Face ID, then a payment token"
description: "ChatGPT Wallet, opened November 13, 2026, pays only after Face ID or Touch ID, and only with a network token. It runs in a dot, not in ordinary chat."
absoluteTitle: true
takeaways:
  - "ChatGPT Wallet, announced November 13, 2026, lets a dot pay with a network token after you approve that purchase with Face ID or Touch ID. It is rolling out to ChatGPT Pro subscribers 18 or older who live in the United States, on an eligible US-issued credit card with a US billing address. Debit cards are out. Ordinary Chat, Work, and standalone Codex threads are out."
  - "The agent does not see the real card number, and approval is not an order. The help article says Ready to check out means the biometric finished. You still check the merchant’s confirmation before you try again. Spending limits you can set in advance are a later plan, not this release."
  - "Personal Agent Protocol 1.0, Poppy, shipped the same day and does a different job. It tells a visiting agent who the business is and what the person allowed. Sierra says every Shopify store now publishes the file. Four Shopify stores fetched November 14 still say protocol_version 0.4. The 1.0 specification still calls itself a draft."
date: "2026-11-14"
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
  - buyers
companies:
  - openai
  - chatgpt
  - sierra
  - shopify
  - visa
  - mastercard
  - american-express
  - meta
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "US Google Trends for ChatGPT Wallet against two payment phrases, and four Shopify Poppy files, read November 14, 2026"
  description: "Google Trends, United States, past 7 days, one comparison of ChatGPT Wallet, agentic payments, and AI agent payments, retrieved November 14, 2026 with the timezone offset set to UTC−6. Interest is relative to the peak inside that comparison, not a search-volume count. Google’s averages were 4, 0, and 0. ChatGPT Wallet peaked at 100 at 9:00 a.m. on November 13 and also scored 93 at 3:00 a.m. that morning. Agentic payments had one nonzero hour, 70 at 6:00 a.m. on November 7. AI agent payments had two, 62 at 1:00 a.m. on November 11 and 19 at 8:00 p.m. on November 6. The top related queries for the ChatGPT Wallet broad match were Coach Wallet 100, Google Wallet 64, ChatGPT free 54, Ridge Wallet 38, and ChatGPT login 35. The rising list was empty. Separate from Trends: GET /.well-known/poppy.json on November 14 returned HTTP 200 from Shopify for allbirds.com, brooklinen.com, kith.com, and glossier.com. Each document said protocol_version 0.4 and listed the ucp extension at version 1. shopify.com returned HTTP 404 for the same path."
  isBasedOn: "https://trends.google.com/trends/explore?date=now%207-d&geo=US&q=ChatGPT%20Wallet,agentic%20payments,AI%20agent%20payments&hl=en-US"
sources:
  - title: "OpenAI, Introducing ChatGPT Wallet (November 13, 2026)"
    url: "https://openai.com/index/introducing-chatgpt-wallet/"
  - title: "OpenAI Help Center, ChatGPT release notes, Introducing ChatGPT Wallet (November 13, 2026)"
    url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
  - title: "OpenAI Help Center, Making purchases with ChatGPT Wallet (read November 14, 2026)"
    url: "https://help.openai.com/en/articles/20001654-making-purchases-with-chatgpt-wallet"
  - title: "OpenAI, Introducing dots (September 29, 2026; update November 3, 2026)"
    url: "https://openai.com/index/introducing-dots/"
  - title: "OpenAI Help Center, Getting started with your dot (read November 14, 2026)"
    url: "https://help.openai.com/en/articles/20001530-getting-started-with-your-dot"
  - title: "OpenAI, Commerce partner playbook overview (read November 14, 2026)"
    url: "https://developers.openai.com/commerce/guides/overview"
  - title: "OpenAI, Accept payments (read November 14, 2026)"
    url: "https://developers.openai.com/commerce/guides/accept-payments"
  - title: "OpenAI, Help ensure cloud browser access (read November 14, 2026)"
    url: "https://developers.openai.com/commerce/agent-access"
  - title: "OpenAI, Build a plugin (read November 14, 2026)"
    url: "https://developers.openai.com/commerce/guides/build-a-plugin"
  - title: "OpenAI, Delegated Payment Spec (Last-Modified November 12, 2026)"
    url: "https://developers.openai.com/commerce/specs/payment"
  - title: "Sierra, Releasing Personal Agent Protocol 1.0 (Bret Taylor and Clay Bavor, November 13, 2026)"
    url: "https://sierra.ai/blog/releasing-poppy"
  - title: "Personal Agent Protocol specification, draft 1.0 (read November 14, 2026)"
    url: "https://personalagentprotocol.org/docs/1.0/spec"
  - title: "Personal Agent Protocol, UCP extension draft 1.0 (read November 14, 2026)"
    url: "https://personalagentprotocol.org/docs/1.0/extensions/ucp"
  - title: "Personal Agent Protocol, extensions index (read November 14, 2026)"
    url: "https://personalagentprotocol.org/docs/1.0/extensions"
  - title: "Personal Agent Protocol changelog (read November 14, 2026)"
    url: "https://personalagentprotocol.org/docs/changelog"
  - title: "Personal Agent Protocol, company implementation kit (read November 14, 2026)"
    url: "https://personalagentprotocol.org/kit/company/SKILL.md"
  - title: "Allbirds Poppy file, protocol_version 0.4 (fetched November 14, 2026)"
    url: "https://allbirds.com/.well-known/poppy.json"
  - title: "Brooklinen Poppy file, protocol_version 0.4 (fetched November 14, 2026)"
    url: "https://brooklinen.com/.well-known/poppy.json"
  - title: "Kith Poppy file, protocol_version 0.4 (fetched November 14, 2026)"
    url: "https://kith.com/.well-known/poppy.json"
  - title: "Glossier Poppy file, protocol_version 0.4 (fetched November 14, 2026)"
    url: "https://www.glossier.com/.well-known/poppy.json"
  - title: "Allbirds UCP profile, version 2026-08-25 (fetched November 14, 2026)"
    url: "https://allbirds.com/.well-known/ucp"
faq:
  - question: "Can an AI agent buy things for me?"
    answer: "Sometimes, and only on a payment path that already exists. ChatGPT Wallet, announced November 13, 2026, can pay from an eligible US-issued credit card after you approve that purchase with Face ID or Touch ID. It is rolling out to ChatGPT Pro subscribers 18 or older who live in the United States, and only inside a dot. It does not run in ordinary Chat. It does not take debit cards. Navoka, launched the day before, pays from a card that belongs to the agent. A delegated payment token is a third path, for a processor, and it is not Wallet."
  - question: "How does ChatGPT Wallet work?"
    answer: "You add an eligible credit card once, in a secure form, not in the chat. When the dot is ready to buy, you review the merchant, items, total, selected card, and any shipping or recurring terms, then approve with Face ID or Touch ID. The network then provides a payment token, a substitute card number with a security code and an expiration date. The charge goes to the card you selected. The real card number is not shared with the business or the agent. Ready to check out means the approval finished. It does not mean the merchant placed the order."
  - question: "What is a payment token?"
    answer: "On ChatGPT Wallet it is a substitute for the real card details. The announcement says the payment network provides a card number, security code, and expiration date after you approve. The merchant guide says the business receives a network token, not the full card number, and should use the Payment Account Reference to tie that token to the account. Do not reuse it for a different purchase. It is not the same object as OpenAI’s delegated payment token, which is a single-use token a processor returns under a max amount, a merchant, and an expiry."
  - question: "What is the Personal Agent Protocol (Poppy)?"
    answer: "Poppy is a way for a personal agent to find a company, identify itself, and learn what the person has allowed. Sierra, Bret Taylor and Clay Bavor, published version 1.0 on November 13, 2026. It is built on MCP, OpenAPI, UCP, and OAuth. A company publishes poppy.json at /.well-known/poppy.json. The specification page still calls that text draft 1.0 and says fixes can break older setups. Meta’s Muse agent looks for the file first, on Sierra’s account."
  - question: "Does a Shopify store need to install Poppy?"
    answer: "Sierra says no. The November 13 post says every Shopify store now publishes a Poppy file, merchants do no extra implementation, and every Shopify store already supports UCP. On November 14, Allbirds, Brooklinen, Kith, and Glossier each served a file from Shopify at protocol_version 0.4, with the ucp extension at version 1. shopify.com itself returned 404 for that path. A live 0.4 file is not the same contract as draft 1.0."
  - question: "Can the agent approve its own ChatGPT Wallet purchase?"
    answer: "No. Saving the card and approving a purchase are separate steps. The biometric happens on a supported device signed in to the same ChatGPT account, or you follow a link or QR code to one. The model does not receive the card number. If you agreed to recurring terms shown on the request, the merchant may store that credential and charge it again. You cancel those charges with the merchant, not by asking the dot to unapprove them."
---

Sometimes. On November 13, 2026, [OpenAI](https://openai.com/index/introducing-chatgpt-wallet/) opened ChatGPT Wallet so a [dot](https://openai.com/index/introducing-dots/) can pay with a network token after you approve that purchase with Face ID or Touch ID. The same day [Sierra](https://sierra.ai/blog/releasing-poppy) published Personal Agent Protocol 1.0, called Poppy, so a business can tell a visiting agent who it is and what the person allowed. One is a way to pay. The other is a way to be found. They do not complete each other.

A [shopping agent](/glossary/shopping-agent) can buy only when a product already has a payment path. Wallet is a new path, and it is narrow. The phrase people actually typed this week is the product name, not the category. In a United States Google Trends comparison for the past seven days, read November 14, 2026, “ChatGPT Wallet” averaged 4 and peaked at 100 at 9:00 a.m. on November 13, in the UTC−6 offset that query used. “Agentic payments” and “AI agent payments” averaged 0 in that same comparison. The related-query list for the broad match was Coach Wallet, Google Wallet, Ridge Wallet, and generic ChatGPT navigation. It did not name a second product question. Interest here is relative to the peak inside the comparison. It is not a count of searches.

## Can an AI agent buy things for me?

Yes, on ChatGPT Wallet, if you are in the rollout and you tap. No, if you were hoping the model would spend a debit card, or spend inside a limit you set once, or pay from an ordinary chat.

The [purchase help article](https://help.openai.com/en/articles/20001654-making-purchases-with-chatgpt-wallet), read November 14, is the tight list. Wallet is rolling out gradually to ChatGPT Pro users in the United States. You have to be 18 or older, live in the United States, and use an eligible US-issued credit card with a US billing address. The cards it names are American Express, Chase, Mastercard, and Visa. A Chase card has to be yours as the primary cardholder, not an authorized user’s. Debit cards are not supported. A virtual card you already hold is not supported at launch. That is separate from the virtual number Wallet itself generates after you approve. Wallet works in a conversation with your dot. It is not available in Chat, Work, or a standalone Codex thread. Set up a dot first. An eligible Pro account can still be waiting. The article says to ask the dot to add a card when Wallet shows up.

The [November 13 release note](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) says the same shape in fewer words: Pro, 18 or older, United States, eligible US-issued card, US billing address, rolling out gradually inside dots. The announcement’s shorter line is Pro subscribers in the US, through dots. Neither page prints a Wallet fee. This desk is not going to invent one. Cards saved for Wallet are separate from the card that pays for ChatGPT and from a gift-card or prepaid balance. Those are different products that share the word wallet.

Two other yeses already exist, and they are not this one. A [delegated payment token](/glossary/delegated-payment-token) is the processor credential in OpenAI’s Delegated Payment Spec, Last-Modified November 12. [Navoka](/blog/can-an-ai-agent-buy-things-online), which Wirex launched November 12, pays from an IBAN and a card that belong to the agent. A rule there can spend without a fresh biometric. Wallet spends your credit card, and it asks every time. OpenAI calls Wallet “the first wallet that lets agents pay without access to users’ actual card details and that requires a security check for every purchase.” That “first” is OpenAI’s claim. Navoka is a different object, and the day-before article is the place to read it.

## How does a ChatGPT Wallet purchase actually go through?

You add the card once. You approve every purchase. The network token is what the checkout sees.

The card number, expiration, and security code go in a secure form, not in the chat. You can ask the dot “Help me add a card to Wallet,” or open Settings, then Wallet, then Add Card on a phone. American Express uses the four-digit code on the front of the card. You review the Wallet terms and the privacy notice, then wait for “Card added.” A bank may ask you to verify during setup, including a code or a prompt in the bank’s app. Chase sends you into the Chase app, with a QR code if you started on a computer. Verification codes stay in that form. They do not go in the chat or in a support message.

When you want the purchase, you ask the dot to complete it. The request you approve shows the merchant, the items, the total, the selected card, and any shipping or recurring terms on the screen. You tap Approve and pass Face ID or Touch ID. The announcement says “a fingerprint scan.” Touch ID is that scan. If the device in front of you cannot do it, you follow a link or a QR code to another device on the same ChatGPT account. A closed laptop lid means you open it, or you approve on a phone.

After that approval, the [announcement](https://openai.com/index/introducing-chatgpt-wallet/) says the payment network provides a payment token: a substitute for the real card details, with a card number, a security code, and an expiration date. The charge hits the card you selected. The real details are not shared with the business or the agent. The help article says the dot then uses a virtual card number linked to that card, and the number at checkout may differ from the number on the plastic. The [merchant guide](https://developers.openai.com/commerce/guides/accept-payments) says the business receives a network token, not the full card number, and should use the Payment Account Reference to associate the token with the account. Those three sentences are the same handoff, described from three seats. The merchant sees a stand-in that can look like a card. It is not the primary account number. The model is not a fourth seat.

“Ready to check out” means the approval finished. It does not mean the merchant placed the order. The release note says approval alone does not confirm an order, and some sites will not complete an agent purchase. If the result is unclear, check the merchant before you try again. A pending charge is a question for the card issuer, not proof the order exists.

One exception is on the approval screen, not in a settings page. If you agree to a recurring or continuous plan shown on the request, the merchant may store that credential and charge it again under those terms. You manage or cancel that plan with the merchant. Saving the card did not pre-approve those charges. The help article is explicit that enrollment and each purchase are separate approvals.

What is not in this release is the part people will assume is included. The announcement says that over time OpenAI expects people to delegate purchases by setting spending limits, categories, or time periods, and to pre-approve those with a biometric and a record. “Over time” and “we expect” are not a control you can set today.

The networks’ own lines, printed on OpenAI’s post, describe the same gate. Luke Gebb, EVP and Head of Global Innovation at American Express, calls Wallet the first American Express Agentic Commerce Experiences integration, “enabling eligible Card Members to use their Amex Card while reviewing and approving each purchase.” Sherri Haymond, EVP, Global Head of Digital Commercialization at Mastercard, says an agent’s purchase “should strengthen, not bypass, the trust built into payments.” Rubail Birwadker, Head of Global Growth at Visa, says consumers, businesses, and banks all need to trust the process. None of those sentences hands the model the card.

OpenAI also says 1.2 billion people use ChatGPT each week. That figure is on the announcement. It is not a count of Wallet users, and it is not a count of completed agent checkouts.

A dot is older than the wallet. [OpenAI introduced dots](https://openai.com/index/introducing-dots/) on September 29, 2026, as always-on agents with their own cloud computer and their own browser. The same post says a dot can use a saved website password without exposing it to the model. Wallet is that pattern applied to a card, with a biometric on every purchase rather than a password the harness is trusted to withhold. The [getting-started article](https://help.openai.com/en/articles/20001530-getting-started-with-your-dot) is the product page for the agent. The wallet article is the product page for the charge. The wallet pages do not mention the [OpenAI Agents SDK](/directory/openai-agents-sdk). They describe a card inside [ChatGPT](/directory/chatgpt), used by a dot.

## What is a payment token, and who is allowed to see it?

A [payment token](/glossary/payment-token) here is a substitute credential. The real card number stays in the wallet. The checkout receives a different number.

Do not fold this into the delegated payment token. That spec is for payment providers and for merchants at PCI DSS level 1. The buyer saves a payment method. OpenAI sends the delegated payload to the merchant’s processor or vault. The processor returns a token scoped by a one-time allowance, a max amount, a currency, a merchant, a checkout session, and an expiry. OpenAI forwards that token on the complete-checkout call. OpenAI is not the merchant of record. Stripe’s Shared Payment Token is the implementation the spec names. A product feed does not start it. The map of that older credential, read November 12, is [How do AI shopping agents pay?](/blog/how-do-ai-shopping-agents-pay).

Wallet’s merchant guide is a different instruction, and it is the one a store can follow without joining that spec. Wallet works with the checkout page and the payment form you already have. No Wallet-specific integration is required. The customer reviews and approves in ChatGPT. Your checkout processes the payment. You remain responsible for the order, fulfillment, customer support, and the fraud decision. You may keep a card the customer already stored with you. Wallet is an extra option, not a replacement. You may not reuse or save that payment credential for a separate purchase. The customer consented to the transaction in front of them. A subscription can use the same checkout if your existing flow supports recurring billing, you got consent for the recurring charges, and you follow your processor’s rules for merchant-initiated transactions.

The risk section is where agent checkouts will actually fail. Risk systems are tuned for bots. A cloud browser trips them. OpenAI is rolling out a `Forwarded` header so a site can see signals about the person, not only about the cloud machine. The parameters the guide lists are `asn`, `for`, `ip-country`, `ip-prefix`, `locale`, `tz`, and `user-agent`. The examples on that page are placeholders, including `64496` and `198.51.100.23`. They are not a live customer. The announcement names the firms it is working with so those systems recognize an agent purchase: Forter, Riskified, Sardine, and Signifyd on fraud, and Adyen, Checkout.com, and Stripe on payments. A token that your risk stack declines is a failed purchase, whatever the biometric said.

## What does per-purchase approval change in the harness?

The [harness](/glossary/harness) prepares the cart. It does not approve the charge, and it does not get to read the credential it just spent.

[Tool use](/glossary/tool-use) is how a model steps outside the text. The failure mode is a tool whose arguments include a card number, or a tool result that returns one. Wallet’s own product refuses that shape. The card is typed into a form the model does not see. The approval is an [approval gate](/glossary/approval-gate) on a device, or on a second device reached by a link or a QR code. The result the model should be allowed to read is the merchant, the amount, the last four of the selected card, and a status. The status “Ready to check out” is not “order placed.” An eval that grades the model’s sentence “I paid” will pass a checkout that never ordered. The grader has to see the merchant’s confirmation, or the absence of one.

Retries are a cost-per-task bug, not a politeness. The help article says to check the merchant before trying another method, and to ask the issuer when a hold will clear. It does not promise that a second tap is harmless while the first charge is still pending. The merchant guide forbids reusing the credential for a different purchase. A harness that catches an error and calls `pay` again has ignored both pages. Log the hold. Stop. Do not split the amount across two requests to get under a check you were not given. There is no spend-limit API in this release to split against.

What the agent can do, on the pages read November 14:

| The agent can | The agent cannot |
| --- | --- |
| Search, compare, and ask you to approve a specific purchase in a dot | Pay from ordinary Chat, Work, or a standalone Codex thread |
| Ask in the conversation for a name, phone, email, or delivery address the merchant needs | Take the card number, the security code, or a bank verification code in the chat |
| Use a virtual card number at checkout after you approve | Show you the primary account number, or put that number in the prompt |
| Complete checkout on a site that does not block the cloud browser | Treat your approval as proof the merchant accepted the order |
| Follow recurring terms you approved on that request | Set a monthly limit, a category, or a time window and then spend inside it |

The liability split matches those rows. The announcement says you transact directly with the business. The business keeps the customer relationship and control of price, fulfillment, returns, and customer service. You keep the card’s rewards and its protections for eligible disputes, the example being a defective item. The help article then assigns the phone calls. Order status, cancellation, a return, or a refund goes to the merchant. A declined, pending, disputed, or unrecognized charge, or a problem verifying the card with the bank, goes to the issuer. A Wallet error, a ChatGPT account you think someone else opened, or a purchase that is not the one you approved goes to OpenAI Support. Removing a saved card stops new Wallet charges on it. It does not cancel an order, close the card, or delete the account. Poppy’s spec makes the same cut in different words: text from the company is never the user’s approval.

Dots already had a version of this gate. The September 29 post says custom rules can allow an action, require approval, or block it, and that changing a password stays with the person. Auto-review checks actions that could affect an account. Wallet does not replace those rules. It adds a biometric to one class of action, payment, and it refuses to treat the model as the approver. A builder who wires a `pay` tool that accepts a primary account number has built the thing both documents are written to prevent.

## What is the Personal Agent Protocol, or Poppy?

Poppy is how a personal [agent](/glossary/agent) introduces itself to a company. It is not a wallet.

[Bret Taylor and Clay Bavor](https://sierra.ai/blog/releasing-poppy) published the post on November 13, 2026. Version 1.0, they write, comes five weeks after a first draft with Meta, Genesys, Instinct, NiCE, Rocket, Shopify, Stripe, and Walmart. The protocol lets a personal agent work with a company through that company’s agent, its website, and its APIs. It is built on standards they name: the [Model Context Protocol](/glossary/model-context-protocol), OpenAPI, and the Universal Commerce Protocol, with OAuth so the customer controls what the agent can do and can revoke it later. Sierra says 60 more companies joined, for a total of more than 100. The post says Meta’s Muse agent now looks for Poppy first on every site it visits. Any company can implement the protocol on its own and, Sierra writes, immediately give people who use Muse a better experience. That sentence is Sierra’s. It is not a measurement of Muse traffic.

The [specification](https://personalagentprotocol.org/docs/1.0/spec), read the next day, is more careful than the headline. It calls itself draft version 1.0. It starts from 0.4, which it calls the 1.0 release candidate, and it says fixes for problems implementers find can include changes that are not backward compatible. The [changelog](https://personalagentprotocol.org/docs/changelog) still titles the section “Draft 1.0” and says the list grows until 1.0 is published. Ship the announcement and the spec as a pair. “v1.0 is available” and “this text can still break” are both on the record.

What a company publishes is `https://{domain}/.well-known/poppy.json`. The document names the organization, the channels, and the sign-in options. Channels include an OpenAPI file, an MCP server, the website, and a conversation with the company’s own agent. At least one of those has to exist. Account access is OAuth, discovered from the protected-resource metadata at `/.well-known/oauth-protected-resource`. A company with no issuer can still offer a signed-out session. Scope hints say whether a scope changes nothing, makes a reversible change, or makes an irreversible one, and whether it touches personal data. Paying is the example the spec gives for irreversible. The hints follow MCP’s `readOnlyHint` and `destructiveHint`, applied to a scope instead of one tool. They are the company’s claims. They are not the user’s approval.

Section 10.2 is the harness rule, and it matches Wallet’s. A secret in the model’s context can leak in any later message. Personal agents must keep access tokens, refresh tokens, session JWTs, private keys, authorization codes, PKCE verifiers, and device codes out of model context. They should keep every other secret out too, and they should sign and send requests in code the model cannot read. The [UCP extension](https://personalagentprotocol.org/docs/1.0/extensions/ucp) says payment tokens are in that set. UCP checkout is the purchase. The checkout resource is the terms. The user reviews it in a trusted interface. Complete Checkout is the call after that commitment. The extension says that is the one approval for the purchase, so the company should not also demand a second approval record for the same action. Guest checkout can run signed out. A scope such as `dev.ucp.shopping.checkout:manage` is how a signed-in checkout is described, and the example marks it irreversible and personal.

The commerce extension is the piece Shopify co-authored. Sierra’s post says UCP does the shopping: find a product, fill a cart, check out. Poppy does the moment before that: the agent arrives, says who it is, and learns what it may do. The extension lets the agent shop as a guest or sign in, makes it ask the customer before certain actions, and connects to UCP Ask so the shopper’s agent can talk to the store’s agent. The spec versions behind UCP, read November 10 on this site, are [OpenAI’s checkout example is still API version 2025-09-12](/blog/ucp-vs-acp-spec-versions-november-2026). Allbirds’ UCP profile, fetched November 14, names version `2026-08-25`.

Three design partners are the ones Sierra describes as going live, and the paragraphs do not describe the same stage.

- Mercury lets a personal agent check balances, review transactions, categorize spending, and keep budgets and receipts current. It can ask the agent to initiate a payment or a transfer. Mercury runs that request through the account’s approval policy before anything is sent. The footnote says Mercury is not a bank. Banking services come through its FDIC-insured partner banks.
- Synchrony “will bring financing and rewards into agent-led shopping.” The work “explores” how an agent could consider affordability and Synchrony offers. “Over time” it could reach a network of more than 500,000 merchant locations. That is a direction, not a checkout this desk could place.
- Turkish Airlines lets a personal agent check fares, flight status, and stopovers, and pull up a booking with a reference number and a surname. Miles&Smiles members can have the agent find a business-class upgrade, which the customer approves before paying. Completing a purchase without leaving the conversation is what the airline is “now working to” do.

The [implementation kit](https://personalagentprotocol.org/kit/company/SKILL.md) is a company-side skill plus a validator. The validator acts as a personal agent. It needs Node 22.18 or later and has no dependencies. The milestones it knows are foundation (`poppy.json`, OAuth metadata, the session header), interfaces, sign-in, and all. A business that only wants to be discoverable starts at foundation and stops when the validator passes. A business that wants signed-in checkout is not done at foundation.

## Poppy, MCP, or a plain website: what should a business do this quarter?

Publish the file if an agent is already looking for it. Do not expect the file to make ChatGPT Wallet pay. Wallet’s browser path does not require Poppy, a plugin, or a product feed.

Sierra says every Shopify store now publishes a Poppy file, that merchants do no extra work, and that Shopify supports businesses in more than 175 countries with UCP on by default. This desk checked four stores on November 14. Allbirds, Brooklinen, Kith, and Glossier each returned HTTP 200, served by Shopify, for `/.well-known/poppy.json`. Each document said `protocol_version` `0.4`, listed the `ucp` extension at version 1, and pointed a company-agent entry at that store’s `/.well-known/ucp`. Allbirds’ checkout scope is `dev.ucp.shopping.checkout:manage`, marked `irreversible` and `personal_data: true`, and the text says the agent prepares checkout and the buyer completes the purchase. `https://www.shopify.com/.well-known/poppy.json` returned HTTP 404. The corporate site is not a store. A 0.4 file on a store domain is real. It is not draft 1.0.

| If you have | What it does this week | What it does not do |
| --- | --- | --- |
| A normal website | ChatGPT’s cloud browser can already shop it, and Wallet can type a network token into the existing payment form | Survive a firewall that blocks the signed browser, or a risk rule that declines the token |
| An MCP server | Gives an agent structured tools: stock, a cart, a booking | Tell a visiting personal agent who you are, or which scopes are irreversible |
| `/.well-known/poppy.json` | Tells Muse, and any other agent that looks, which channels and scopes you offer | Charge a ChatGPT Wallet card, or upgrade a 0.4 file into the draft 1.0 contract by itself |
| A product feed in ChatGPT | Makes price and availability quotable after you claim the business | Start a payment. A feed is not a token |

The work that matches Wallet, this quarter, is on the website and the risk stack.

1. Let the signed cloud browser through. OpenAI’s [access guide](https://developers.openai.com/commerce/agent-access) uses Web Bot Auth, RFC 9421. A signed request carries `Signature` and `Signature-Input`, and `Signature-Agent` set exactly to `"https://chatgpt.com"`, quotation marks included. Public keys are at `https://chatgpt.com/.well-known/http-message-signatures-directory`. On Cloudflare the path is Security, then Settings, filter by Bot traffic, then AI Crawler and Agent access policies, then Personal Agents, then “dots, OpenAI,” set to Allow. Browser access does not require a plugin or a feed.
2. Tell your processor and your fraud vendor that agent purchases are about to look like bots. The announcement names Adyen, Checkout.com, and Stripe, and Forter, Riskified, Sardine, and Signifyd. Start reading the `Forwarded` header. Store the Payment Account Reference, not the primary account number. Do not reuse the token.
3. If you sell physical goods and you want to be quoted before the click, claim the business in ChatGPT and upload a feed. That is discovery. It is still not the charge. The playbook overview is the index: [commerce guides](https://developers.openai.com/commerce/guides/overview).
4. A plugin is optional, and it is headless. The [plugin guide](https://developers.openai.com/commerce/guides/build-a-plugin) says iframe-based MCP UI is not supported in dots and is not the recommended commerce path. Your MCP server owns availability, price, and whether the action is confirmed. The model does not own the card. The same guide says OpenAI is still working on how third-party plugins interact with ChatGPT Wallet. A plugin checkout is not, this week, a finished Wallet integration.

If Muse traffic matters and you are not on Shopify, the foundation milestone is the quarter’s Poppy work: a true `poppy.json`, OAuth metadata if you offer sign-in, and a validator run. Do not promise signed-in checkout until the sign-in milestone passes. Do not treat company text in that file as the customer’s consent. If you are on Shopify, read the file your domain already serves and make the scope sentence true. Allbirds’ sentence says the buyer completes the purchase. If your checkout does something else, the file is lying, and an agent will believe the file.

The six-month calendar of who has dated a checkout through May 2027 is [AI shopping agents, the next 6 months](/reports/ai-shopping-agents-next-6-months). Which assistants can finish a purchase, as of the earlier guide, is [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you). The store-readiness checklist is [How to make your store readable by AI shopping agents](/blog/how-to-make-your-store-readable-by-ai-shopping-agents).

## What does this mean if you build agents or sell through one?

Builders. Keep the credential out of the model, and keep the approval out of the tool list. A `pay` function that accepts a primary account number is the bug. The tool result is a status and a last-four. “Ready to check out” fails the eval until a merchant confirmation arrives. Do not retry a hold. Do not invent a spend limit the product has not shipped. If you also speak Poppy, section 10.2 already lists the secrets that stay in code the model cannot read, and the UCP extension puts payment tokens on that list. Cost per task includes the failed attempt and the pending authorization, not only the tokens the model spent describing it. The [shopping topic](/topics/shopping) collects the other checkout pages. Wallet is not one of them with a different headline. It is a biometric plus a network token, inside a dot.

Buyers. You can let a dot shop. You cannot let it approve. Add a credit card in the form, review the merchant and the total, and use Face ID or Touch ID. Decline the request if you do not recognize the seller. After you approve, look for the merchant’s confirmation before you ask again. A refund is the merchant’s. An unrecognized charge is the issuer’s. A purchase that does not match the screen you approved is OpenAI’s. Poppy is how a store introduces itself to an agent such as Muse. It is not the thing that charges your card. If you wanted a card that belongs to the agent, with limits that can spend without a fresh tap, that product is [Navoka](/blog/can-an-ai-agent-buy-things-online), and it is a different yes.

## Where can you read more on this site?

- The day before, a different card: [Can an AI agent buy things online for me? Navoka gives it a separate card](/blog/can-an-ai-agent-buy-things-online)
- The credential map, read November 12: [How do AI shopping agents pay?](/blog/how-do-ai-shopping-agents-pay)
- Which assistant can finish: [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you)
- Report: [AI shopping agents, the next 6 months](/reports/ai-shopping-agents-next-6-months)
- Spec versions: [OpenAI’s checkout example is still API version 2025-09-12](/blog/ucp-vs-acp-spec-versions-november-2026)
- Store pages: [How to make your store readable by AI shopping agents](/blog/how-to-make-your-store-readable-by-ai-shopping-agents)
- Tool: [Shopping agent readiness checker](/tools/shopping-agent-readiness-checker)
- Glossary: [payment token](/glossary/payment-token), [delegated payment token](/glossary/delegated-payment-token), [agent](/glossary/agent), [harness](/glossary/harness), [tool use](/glossary/tool-use), [MCP](/glossary/model-context-protocol), [approval gate](/glossary/approval-gate), [agentic checkout](/glossary/agentic-checkout), [agentic commerce](/glossary/agentic-commerce), [shopping agent](/glossary/shopping-agent)
- Directory: [ChatGPT](/directory/chatgpt), [OpenAI Agents SDK](/directory/openai-agents-sdk)
- Topics: [Agents in shopping](/topics/shopping)

## Frequently asked questions

### Can an AI agent buy things for me?

Sometimes, and only on a payment path that already exists. ChatGPT Wallet, announced November 13, 2026, can pay from an eligible US-issued credit card after you approve that purchase with Face ID or Touch ID. It is rolling out to ChatGPT Pro subscribers 18 or older who live in the United States, and only inside a [dot](https://openai.com/index/introducing-dots/). It does not run in ordinary Chat. It does not take debit cards. [Navoka](/blog/can-an-ai-agent-buy-things-online), launched the day before, pays from a card that belongs to the agent. A [delegated payment token](/glossary/delegated-payment-token) is a third path, for a processor, and it is not Wallet.

### How does ChatGPT Wallet work?

You add an eligible credit card once, in a secure form, not in the chat. When the dot is ready to buy, you review the merchant, the items, the total, the selected card, and any shipping or recurring terms, then approve with Face ID or Touch ID. The network then provides a [payment token](/glossary/payment-token), a substitute card number with a security code and an expiration date. The charge goes to the card you selected. The real card number is not shared with the business or the agent. “Ready to check out” means the approval finished. It does not mean the merchant placed the order.

### What is a payment token?

On ChatGPT Wallet it is a substitute for the real card details. The [announcement](https://openai.com/index/introducing-chatgpt-wallet/) says the payment network provides a card number, a security code, and an expiration date after you approve. The [merchant guide](https://developers.openai.com/commerce/guides/accept-payments) says the business receives a network token, not the full card number, and should use the Payment Account Reference. Do not reuse it for a different purchase. It is not the same object as OpenAI’s delegated payment token, which a processor returns under a max amount, a merchant, and an expiry.

### What is the Personal Agent Protocol (Poppy)?

Poppy is how a personal agent finds a company, identifies itself, and learns what the person has allowed. Sierra, Bret Taylor and Clay Bavor, published version 1.0 on November 13, 2026. It is built on [MCP](/glossary/model-context-protocol), OpenAPI, UCP, and OAuth. A company publishes `poppy.json` at `/.well-known/poppy.json`. The [specification](https://personalagentprotocol.org/docs/1.0/spec) still calls that text draft 1.0 and says fixes can break older setups. Meta’s Muse looks for the file first, on Sierra’s account.

### Does a Shopify store need to install Poppy?

Sierra says no. The November 13 post says every Shopify store now publishes a Poppy file, merchants do no extra implementation, and every Shopify store already supports UCP. On November 14, Allbirds, Brooklinen, Kith, and Glossier each served a file from Shopify at `protocol_version` `0.4`, with the `ucp` extension at version 1. `shopify.com` returned 404 for that path. A live 0.4 file is not the same contract as draft 1.0.

### Can the agent approve its own ChatGPT Wallet purchase?

No. Saving the card and approving a purchase are separate steps. The biometric happens on a supported device signed in to the same ChatGPT account, or you follow a link or a QR code to one. The model does not receive the card number. If you agreed to recurring terms shown on the request, the merchant may store that credential and charge it again. You cancel those charges with the merchant.

## What did this page not check?

This desk did not add a card, approve a purchase, or run the Poppy validator against a store. The four Poppy files and the Allbirds UCP profile are GET requests made November 14, 2026. Eligibility, the token format, and the approval steps are the help article, the release note, the announcement, and the merchant guide, read the same day. A limit you cannot find on those pages is a limit this release does not have.
