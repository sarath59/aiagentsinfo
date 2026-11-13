---
title: "How do AI shopping agents pay?"
description: "An AI shopping agent pays with a scoped token, a signed mandate, or Amazon’s encrypted card handoff. Protocols, consent limits, and what a store must turn on."
absoluteTitle: true
takeaways:
  - "A shopping agent pays only when a product already has a payment path. The usual credential is a scoped token or a signed mandate. Amazon Buy for Me is the outlier: Amazon sends encrypted card details to the brand’s own checkout."
  - "ChatGPT’s merchant page, read November 12, 2026, still finishes the purchase on the store’s site. OpenAI’s Delegated Payment Spec, Last-Modified the same morning, still describes a single-use token. A product feed does not turn that token on."
  - "Shoppers should read the approval screen. Merchants are buyable on a channel they have enabled. Builders should pin a spec date: ACP’s payment example says API version 2025-09-29, and AP2’s spec page is v0.2 from April 28, 2026."
date: "2026-11-12"
updated: "2026-11-13"
category: guide
topics:
  - shopping
  - how-agents-work
  - harnesses
  - tools-saas
audience:
  - everyone
  - builders
companies:
  - openai
  - chatgpt
  - google
  - amazon
  - microsoft
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Google Trends interest for four shopping-agent queries, read November 12, 2026"
  description: "Relative interest, 0 to 100, inside one comparison of agentic commerce, agentic checkout, AI shopping agent, and AI buy for me, past three months. Worldwide means: agentic commerce 14.4 (peak 100 on 2026-09-21), AI buy for me 10.7 (peak 85 on 2026-09-20), AI shopping agent 2.4 (peak 29 on 2026-09-21), agentic checkout 0.7 (peak 10 on 2026-09-19). United States means: AI buy for me 18.2 with a peak of 100 on 2026-11-12, agentic commerce 7.9 (peak 34 on 2026-09-19), AI shopping agent 0.5 (peak 6 on 2026-11-12), agentic checkout 0.1 (peak 1 on 2026-10-29). Top United States related queries for agentic commerce: agentic commerce protocol 100, stripe agentic commerce 65, visa agentic commerce 51, shopify agentic commerce 33, agentic commerce meaning 17, paypal agentic commerce 14. Four unrelated queries in that same list scored 5 or 3 and are omitted."
  isBasedOn: "https://trends.google.com/trends/explore?date=today%203-m&q=agentic%20commerce,agentic%20checkout,AI%20shopping%20agent,AI%20buy%20for%20me&hl=en-US"
sources:
  - title: "OpenAI, Delegated Payment Spec (Last-Modified Thu, 12 Nov 2026 11:17:31 GMT)"
    url: "https://developers.openai.com/commerce/specs/payment"
  - title: "OpenAI, Power product discovery in ChatGPT (merchant page, read November 12, 2026)"
    url: "https://openai.com/chatgpt/search-product-discovery/"
  - title: "Stripe, Agentic Commerce Protocol"
    url: "https://docs.stripe.com/agentic-commerce/protocols/acp"
  - title: "Stripe, Shared payment tokens (public preview, read November 12, 2026)"
    url: "https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens"
  - title: "Google Cloud, Announcing Agent Payments Protocol (September 16, 2025)"
    url: "https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol"
  - title: "AP2 specification v0.2 (Last-Modified Tue, 28 Apr 2026 12:33:34 GMT)"
    url: "https://ap2-protocol.org/ap2/specification/"
  - title: "google-agentic-commerce/AP2 README"
    url: "https://github.com/google-agentic-commerce/AP2"
  - title: "Visa, Find and Buy with AI (April 30, 2025)"
    url: "https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.21361.html"
  - title: "Visa, Intelligent Commerce is live in sandbox (May 1, 2025)"
    url: "https://corporate.visa.com/en/sites/visa-perspectives/trends-insights/the-future-of-commerce-is-here-and-its-ai-powered.html"
  - title: "Visa, Trusted Agent Protocol (October 14, 2025)"
    url: "https://corporate.visa.com/en/sites/visa-perspectives/newsroom/visa-unveils-trusted-agent-protocol-for-ai-commerce.html"
  - title: "Visa Developer, Intelligent Commerce concepts (read November 12, 2026)"
    url: "https://developer.visa.com/docs/visa-intelligent-commerce/concepts"
  - title: "Visa Developer, Make your first API call (read November 12, 2026)"
    url: "https://developer.visa.com/docs/visa-intelligent-commerce/make-your-first-api-call"
  - title: "Visa Developer, Getting started (read November 12, 2026)"
    url: "https://developer.visa.com/docs/visa-intelligent-commerce/docs-getting-started"
  - title: "Mastercard, Agent Pay announcement (April 29, 2025)"
    url: "https://www.mastercard.com/us/en/news-and-trends/press/2025/april/mastercard-unveils-agent-pay-pioneering-agentic-payments-technology-to-power-commerce-in-the-age-of-ai.html"
  - title: "Mastercard, Agent Pay product page"
    url: "https://www.mastercard.com/global/en/business/artificial-intelligence/mastercard-agent-pay.html"
  - title: "Mastercard, Australia’s first authenticated Agent Pay transactions (January 28, 2026)"
    url: "https://www.mastercard.com/news/ap/en/newsroom/press-releases/en/2026/mastercard-accelerates-ai-powered-commerce-with-australia-s-first-authenticated-agentic-transactions-using-agent-pay/"
  - title: "Mastercard, Korea’s first live agentic transactions (March 17, 2026)"
    url: "https://mastercardcontentexchange.com/news/ap/en/newsroom/press-releases/en/2026/mastercard-completes-korea-s-first-live-agentic-transactions-unlocking-trusted-ai-powered-commerce/"
  - title: "Mastercard, live agentic transactions in Latin America and the Caribbean (March 24, 2026)"
    url: "https://www.mastercard.com/news/latin-america/en/newsroom/press-releases/pr-en/2026/march/mastercard-advances-agentic-payments-in-latin-america-and-the-caribbean-with-live-transactions-completed-across-the-region/"
  - title: "Mastercard, Agent Pay for Machines early access (October 20, 2026)"
    url: "https://www.mastercard.com/global/en/news-and-trends/press/2026/october/Mastercard-Agent-Pay-for-Machines-in-action.html"
  - title: "Shopify, Shop Pay for agents (read November 12, 2026)"
    url: "https://shopify.dev/docs/agents/carts-and-checkout/shop-pay"
  - title: "Shopify, Carts and checkout for agents (read November 12, 2026)"
    url: "https://shopify.dev/docs/agents/carts-and-checkout"
  - title: "Shopify Help Center, Agentic storefronts (retrieved November 12, 2026)"
    url: "https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts"
  - title: "PayPal, Agent Ready overview (last updated October 13, 2026)"
    url: "https://developer.paypal.com/agent-ready/overview"
  - title: "Amazon Staff, Buy for Me (published April 3, 2025; page live November 12, 2026)"
    url: "https://www.aboutamazon.com/news/retail/amazon-shopping-app-buy-for-me-brands"
  - title: "Rajiv Mehta, Amazon, How to use Alexa for Shopping (updated October 29, 2026)"
    url: "https://www.aboutamazon.com/news/retail/how-to-use-amazon-shopping-ai-assistant"
faq:
  - question: "How do AI shopping agents pay?"
    answer: "They pay through a checkout path the product already has. OpenAI’s Delegated Payment Spec describes a single-use token with a max amount and an expiry. Google’s Agent Payments Protocol v0.2 uses a signed Checkout Mandate and Payment Mandate. Visa and Mastercard use tokenized credentials and a registered agent. Shop Pay returns a one-time credential after the buyer approves in Shop Pay. Amazon Buy for Me sends encrypted name, address, and payment details to the brand’s site after the shopper confirms an Amazon checkout page."
  - question: "Can ChatGPT charge my card inside the chat?"
    answer: "The merchant page read on November 12, 2026 says no. Shoppers discover products in ChatGPT and complete the purchase on the merchant’s website or app. The Delegated Payment Spec is still published, and its Last-Modified header that morning was 11:17 GMT. That spec is for payment providers and PCI DSS level 1 merchants. A product feed does not start it."
  - question: "What is a delegated payment token?"
    answer: "It is a payment token a processor returns after it receives card details and an allowance. On OpenAI’s spec the allowance is one-time, tied to a max amount, a currency, a merchant, a checkout session, and an expiry. Stripe’s Shared Payment Token is the first implementation Stripe names, and Stripe marks that product a public preview in the US, Canada, and select European countries."
  - question: "What must a merchant do to be buyable by an AI agent?"
    answer: "Turn on a named channel. A ChatGPT feed makes products discoverable and still sends the shopper to the store. Google direct checkout needs an eligible Merchant Center setup. PayPal Agent Ready needs an existing Braintree or PayPal account and one of three protocol paths. Shopify agentic storefronts are on by default for eligible stores, and a merchant can turn direct checkout off. Visa Intelligent Commerce and Mastercard Agent Pay are network programs for registered agents, not a theme setting. Amazon does not publish a Buy for Me enrollment form on the pages read here."
  - question: "Who is the seller when an agent pays?"
    answer: "The store, on the OpenAI, Google, Shopify, and PayPal pages checked for this guide. OpenAI’s spec says OpenAI is not the merchant of record. Shopify’s checkout docs say the merchant remains the merchant of record. For Amazon Buy for Me, the brand sends the confirmation and handles delivery, returns, and customer service."
  - question: "Is Mastercard Agent Pay for Machines a shopping checkout?"
    answer: "No. Mastercard opened it to early access on October 20, 2026 so an agent can pay for digital services such as models and APIs, inside a budget a business set, on top of x402. A product checkout and a machine paying for an API are different integrations."
---

Updated November 13, 2026.

## How do AI shopping agents pay?

With a scoped credential, a signed mandate, or, in Amazon’s case, an encrypted handoff of the card. A [shopping agent](/glossary/shopping-agent) can search and compare on its own. It can move money only when the product already has a [checkout path](/glossary/agentic-checkout), a saved payment method, and a rule for who must agree.

That rule is the whole subject of this page. The companion guide, [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you), says which assistant can finish a purchase. This page says what actually gets charged, who is allowed to approve it, and what a store has to turn on before an agent can buy.

The short version: the assistant is allowed to act. The store still sells the item. The card number should not be sitting in the chat transcript. When it leaves Amazon’s systems for a brand site, Amazon says the payload is encrypted, and the shopper has already confirmed the order on an Amazon checkout page.

A fourth pattern went live in public on November 12, 2026. Wirex’s Navoka gives the agent its own IBAN, debit card, and USDC/EURC wallet, funded separately from the shopper’s accounts, with the limits checked at card authorisation. That launch is [Can an AI agent buy things online for me? Navoka gives it a separate card](/blog/can-an-ai-agent-buy-things-online).

## What is agentic checkout?

[Agentic checkout](/glossary/agentic-checkout) is the payment step an assistant can carry out. The person has chosen an item, or has already set a rule such as “buy this if the price falls to $75.” Software then sends a cart and a payment instruction. The merchant charges on the merchant’s own systems.

A chat reply that names three toasters is advice. Checkout starts when a [tool call](/glossary/tool-use) can hold a cart and hand a payment credential to a processor. The software around that call is the [harness](/glossary/harness). The check before money moves is a [guardrail](/glossary/guardrail): a tap, a max amount, an expiry, a merchant id, or a price cap set earlier. How far the agent may go without a fresh tap is [autonomy](/glossary/autonomy).

A [product feed](/glossary/product-feed) is the catalog. It is not a charge. OpenAI’s merchant page, read November 12, 2026, says shoppers discover products in ChatGPT and complete purchases on the merchant’s site or app. Sharing a feed does not start the payment spec below.

## What is agentic commerce, and which phrase are people searching?

[Agentic commerce](/glossary/agentic-commerce) is the category: an agent helps a person discover, decide, and sometimes pay, with that person’s permission. Google’s Canada post on November 4, 2026 uses the phrase for that job and says Google’s research found that 59 percent of holiday shoppers in Canada plan to use an AI tool to help them shop this season. That figure is Google’s. Visa’s April 30, 2025 announcement uses the same idea from the network side: an agent can find and buy only if the cardholder has set the limits.

Search interest is not the same as a working checkout. On November 12, 2026, Google Trends for the past three months, scored 0 to 100 inside one comparison, put the words in this order.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Query</th>
<th>Worldwide mean</th>
<th>Worldwide peak</th>
<th>United States mean</th>
<th>United States on Nov 12</th>
</tr>
</thead>
<tbody>
<tr>
<td>agentic commerce</td>
<td>14.4</td>
<td>100, week of Sep 21</td>
<td>7.9</td>
<td>10</td>
</tr>
<tr>
<td>AI buy for me</td>
<td>10.7</td>
<td>85, week of Sep 20</td>
<td>18.2</td>
<td>100, the peak of this set</td>
</tr>
<tr>
<td>AI shopping agent</td>
<td>2.4</td>
<td>29, week of Sep 21</td>
<td>0.5</td>
<td>6, also that series’ peak</td>
</tr>
<tr>
<td>agentic checkout</td>
<td>0.7</td>
<td>10, week of Sep 19</td>
<td>0.1</td>
<td>0</td>
</tr>
</tbody>
</table>
</div>

The United States related queries for “agentic commerce” name the rails, not a brand of toaster: agentic commerce protocol (100), stripe agentic commerce (65), visa agentic commerce (51), shopify agentic commerce (33), agentic commerce meaning (17), paypal agentic commerce (14). Four unrelated queries in that list scored 5 or 3. They are left out.

The practical reading: Americans searching today are asking whether an AI can buy for them. The people building the pipes are searching the protocol names. This page answers both. “Agentic checkout” barely registers in Trends and still shows up in this site’s search console, so the definition above is here on purpose.

## Which payment rail moves the money?

Eight rails have a current primary page on November 12, 2026. A row is what that company’s page says. A partner named in a launch post is an example from that post, not a complete list of stores.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Rail</th>
<th>What moves</th>
<th>Who approves</th>
<th>Who sells</th>
<th>Status read Nov 12, 2026</th>
</tr>
</thead>
<tbody>
<tr>
<td>OpenAI Agentic Commerce Protocol, delegated payment</td>
<td>A single-use token. The allowance is <code>one_time</code>, with a max amount, currency, merchant id, checkout session, and expiry. Card only.</td>
<td>The spec says the buyer saved a payment method and approved the purchase. The merchant page says the current ChatGPT purchase finishes on the store’s site.</td>
<td>The merchant. OpenAI says it is not the merchant of record.</td>
<td>Payment spec Last-Modified 11:17 GMT on Nov 12. API-Version example is still <code>2025-09-29</code>. Direct integration is for PSPs or PCI DSS level 1 merchants. Stripe’s Shared Payment Token is the first implementation the spec names.</td>
</tr>
<tr>
<td>Stripe Shared Payment Token</td>
<td>A grant scoped to the seller’s Stripe profile: currency, max amount, expiration. Resolve can return an <code>fpan</code>, a <code>dpan</code>, or an <code>agentic_token</code>.</td>
<td>The agent sets the limits. A recurring charge needs <code>recurring_interval</code>. Stripe rejects <code>setup_future_usage</code> on these PaymentIntents.</td>
<td>The seller processes the charge on Stripe or, after resolve, on another processor.</td>
<td>Public preview. Available to agents, customers, and sellers in the US, Canada, and select European countries. Example API version on the page: <code>2026-09-30.preview</code>.</td>
</tr>
<tr>
<td>Google Agent Payments Protocol, AP2</td>
<td>A Checkout Mandate and a Payment Mandate. The credential is scoped to that checkout. The spec is payment-agnostic: cards, and other instruments the mandate names.</td>
<td>Human present: the person signs the closed mandates on a trusted surface. Human not present: the person signs constraints; the agent signs the closed mandates with its own key.</td>
<td>The merchant completes checkout. The trusted surface must be non-agentic. Verification runs in deterministic code.</td>
<td>Announced Sep 16, 2025 with more than 60 organizations. Spec page is v0.2, Last-Modified Apr 28, 2026. The README still says a PyPI package comes later.</td>
</tr>
<tr>
<td>Visa Intelligent Commerce</td>
<td>A tokenized credential plus a purchase instruction. A mandate carries <code>declineThreshold</code> and <code>effectiveUntilTime</code>. The cryptogram is one-time and lives 72 hours.</td>
<td>Human-in-the-loop, autonomous within bounds, or a standing recurring instruction. A “buy when” rule is autonomous only, and Visa requires a fresh consumer approval once the condition is met.</td>
<td>Visa is the network. The docs describe agent providers, wallets, and enablers, not Visa as the seller.</td>
<td>Announced Apr 30, 2025. Sandbox was the public status on May 1, 2025, with a planned 2026 rollout. Production on the getting-started page requires Visa onboarding, including the Agent Registry.</td>
</tr>
<tr>
<td>Mastercard Agent Pay</td>
<td>Agentic tokens for a registered agent. The product page says only registered agents can transact.</td>
<td>The April 29, 2025 announcement says the cardholder controls what the agent may buy. Issuers, acquirers, and merchants are supposed to see that an agent is in the flow.</td>
<td>The merchant. Mastercard is the network.</td>
<td>Announced Apr 29, 2025 with Microsoft, IBM, Braintree, and Checkout.com. Later posts describe live authenticated transactions in Australia (Jan 28, 2026), Korea (Mar 17, 2026), and Latin America (Mar 24, 2026).</td>
</tr>
<tr>
<td>Shopify Shop Pay and UCP checkout</td>
<td>A one-time Shop credential after the buyer approves in Shop Pay, including checkouts outside Shopify. UCP uses the <code>dev.shopify.shop_pay</code> handler.</td>
<td>The buyer connects a Shop account once and approves each purchase.</td>
<td>The merchant remains the merchant of record. If the agent cannot complete checkout, it sends the buyer to the store’s <code>continue_url</code>.</td>
<td>Docs read Nov 12. Shopify says Shop Pay has 400 million or more buyers, shoppers are 77 percent more likely to buy again, and order value is 16 percent higher. Those figures are Shopify’s. Shopify Protect covers fraud-related chargebacks on those orders.</td>
</tr>
<tr>
<td>PayPal Agent Ready</td>
<td>Three paths: an ACP delegated token through Braintree, a Google Pay token through Braintree, or an encrypted Google Pay credential through PayPal Orders v2.</td>
<td>The customer authorizes PayPal, or pays with Google Wallet, depending on the path.</td>
<td>The merchant’s existing Braintree or PayPal account.</td>
<td>Overview last updated Oct 13, 2026. Platforms named: ChatGPT, Google AI Mode, and Gemini.</td>
</tr>
<tr>
<td>Amazon Buy for Me, and Alexa auto-buy</td>
<td>Buy for Me: encrypted name, address, and payment details sent to the brand site. Auto-buy inside Amazon: the default payment method on Amazon’s own checkout.</td>
<td>Buy for Me: the shopper confirms address, tax, shipping, and payment on an Amazon page. Auto-buy: the earlier price rule, then the default card.</td>
<td>Buy for Me: the brand handles delivery, returns, and support. Auto-buy: Amazon’s checkout.</td>
<td>Buy for Me article published Apr 3, 2025 and still live. Alexa guide updated Oct 29, 2026: U.S. customers, eligible products, Amazon payment and shipping details.</td>
</tr>
</tbody>
</table>
</div>

Read a row, then open the linked page before you depend on a button. Region, merchant, and plan change the screen a person actually sees. Which of the four shopper products can finish a purchase is [Best AI agent for shopping](/best/ai-agents-for-shopping). What is dated through May 2027 is [AI shopping agents, the next 6 months](/reports/ai-shopping-agents-next-6-months).

## What does the Agentic Commerce Protocol actually charge?

Stripe’s docs call the [Agentic Commerce Protocol](https://docs.stripe.com/agentic-commerce/protocols/acp) an open standard created by Stripe, OpenAI, and Meta. One of its blocks is delegate payment: pass a token between the buyer, the agent, and the business. The checkout block, the feed, and the orders webhooks are separate.

OpenAI’s Delegated Payment Spec, Last-Modified Thu, 12 Nov 2026 11:17:31 GMT, is specific about the token. OpenAI sends the card to the merchant’s payment provider. The provider returns a token. OpenAI forwards that token on the complete-checkout call. The allowance object requires `reason: one_time`, `max_amount`, `currency`, `checkout_session_id`, `merchant_id`, and `expires_at`. The only payment method type is `card`. Network tokens are preferred, with a fallback to the raw card number, which the spec calls an FPAN. Direct integration is limited to payment providers or PCI DSS level 1 merchants who vault cards themselves. Everyone else is pointed at Stripe’s Shared Payment Token. The API-Version example on that page is `2025-09-29`.

The merchant page, read the same day, tells a different product story. “We’re moving away from a standalone Instant Checkout experience.” Purchases complete on merchant-owned websites or apps. There are no fees on purchases that start in ChatGPT. Shopping is live for ChatGPT users in the United States. Shopify and Etsy catalogs are already integrated. The page also says ACP today supports product discovery, and that the full shopping journey is later work.

Both pages are current. A merchant who only shares a feed is in the discovery product. A processor who implements `POST /agentic_commerce/delegate_payment` is in the payment spec. Treating those as one switch will bill the wrong project.

Stripe’s Shared Payment Token page, marked public preview, is the implementation a seller can actually call. The agent grants a token to the seller’s Stripe profile with usage limits. The example requests use `Stripe-Version: 2026-09-30.preview`. A one-time token matches the OpenAI allowance. A recurring token is a Stripe addition: set `recurring_interval`, and reuse the token. Stripe still refuses `setup_future_usage` on the PaymentIntent. Availability on that page is the US, Canada, and select European countries. The page does not print the European list in the opening paragraph.

The spec versions behind the checkout API, read November 10, are [OpenAI’s checkout example is still API version 2025-09-12](/blog/ucp-vs-acp-spec-versions-november-2026). Package installs, read November 11, are [the commerce-protocol census](/research/agentic-commerce-protocol-adoption-november-2026). This page does not re-count stars.

## What does Google’s Agent Payments Protocol require before a charge?

Google announced AP2 on September 16, 2025 as an open protocol for agent-led payments, usable as an extension of Agent2Agent and the [Model Context Protocol](/glossary/model-context-protocol). The post names more than 60 organizations, including Adyen, American Express, Ant International, Coinbase, Etsy, Mastercard, PayPal, Salesforce, and Worldpay. It describes two shopping shapes. A person present signs a cart mandate after seeing the items and the price. A person who is away signs an intent mandate first, with price limits and timing, and the agent may form the cart mandate when those conditions are met.

The specification page today is a later document. Its title is Agentic Payment Protocol v0.2. The Last-Modified header was Tue, 28 Apr 2026 12:33:34 GMT. It defines a Checkout Mandate and a Payment Mandate, not the announcement’s Intent Mandate and Cart Mandate names. It says AP2 is a security layer inside a commerce protocol, and that it is built to work with the Universal Commerce Protocol. Catalog APIs are out of scope.

Five roles share the job. The shopping agent builds the checkout. The credential provider holds the payment credential and checks that this agent may use it. The merchant checks that this agent may buy these items, and owns price and inventory. The merchant payment processor checks that the credential was authorized for this checkout. The trusted surface is the screen where the person gives consent. The spec says that surface must be non-agentic: deterministic code, no language model in the consent step. Every role’s validation also has to run in deterministic code, even if some other part of that company uses a model.

In the human-present flow, the person sees the closed checkout and signs it. In the human-not-present flow, the person signs open mandates that name the agent’s public key, and the agent signs the closed mandates. The agent must not open a second pair of mandates until it has a rejection receipt for the first. That is the double-spend rule. Dispute evidence is the pair of mandates and receipts. The spec says the dispute procedure itself is out of scope.

A merchant does not enroll in AP2 by starring the repository. The README still says a PyPI package will be published later, and the install line is a git URL. Google’s cart posts, as read for this site’s November 11 comparison, name Google Pay and UCP. They do not attach an AP2 mandate to a specific charge. This reading did not find a newer Google page that does. Until a receipt says so, those are two layers.

## What do Visa and Mastercard let an agent spend?

Visa introduced Intelligent Commerce on April 30, 2025, with Anthropic, IBM, Microsoft, Mistral AI, OpenAI, Perplexity, Samsung, Stripe, and others. The release describes AI-ready cards as tokenized credentials, spending limits the consumer sets, and signals Visa can use for transaction controls. On May 1, 2025, Visa’s president of value-added services wrote that Intelligent Commerce was live in sandbox, with a planned rollout for 2026.

The developer docs read on November 12 are past that sandbox sentence, and they are not a consumer launch. Production access requires onboarding to Intelligent Commerce, the Trusted Agent Protocol, Visa Token Service, Visa Payment Passkeys, and the Visa Agent Registry. Card eligibility is limited to tokenizable credit, debit, and prepaid cards. The audience named on the getting-started page is agent providers, wallet providers, agent enablers, and commerce platforms.

The concepts page is where the spend controls get specific. A mandate holds `declineThreshold` and `effectiveUntilTime`. Each credential pull draws on exactly one mandate. An instruction may hold at most 10 mandates. The cryptogram is one-time and expires after 72 hours. If the charge fails, a fresh credential can be requested once Visa is told through the confirmation API. Three purchase types exist: the cardholder authorizes that transaction, the agent stays inside approved bounds, or the agent stays inside a standing recurring instruction. Agent-side verification uses Visa Payment Passkeys or another method Visa has approved. The first-call page adds the rule that matters for “buy it when it goes on sale”: that pattern is allowed only as an autonomous purchase, and only after the consumer is notified and approves once the condition is met.

Trusted Agent Protocol, announced October 14, 2025 with Cloudflare, is the recognition layer, not the charge. Visa says it lets a merchant tell a trusted agent from a bot, using HTTP message signatures. Visa’s own headline cites a 4,700 percent surge in AI-driven traffic to U.S. retail sites. That number is Visa’s. Early partners named in the release include Adyen, Checkout.com, Microsoft, Shopify, Stripe, and Worldpay.

Mastercard announced Agent Pay on April 29, 2025. The release introduces agentic tokens, requires trusted agents to be registered and verified, and says consumers control what the agent may purchase. Named collaborators: Microsoft, IBM’s watsonx Orchestrate for business payments, and acquirers including Braintree and Checkout.com. The product page’s heading is “Know your agent”: only registered agents can transact, and the tokens are Mastercard network tokens. That registration rule is [Know Your Agent](/glossary/know-your-agent). It is Mastercard’s control. Visa’s parallel control is the Agent Registry plus Trusted Agent Protocol. They are not one standard.

Later Mastercard posts describe live authenticated transactions, not a global on-switch. On January 28, 2026, a Commonwealth Bank debit card bought cinema tickets at Event Cinemas, and a Westpac credit card booked accommodation in Thredbo. On March 17, 2026, an agent booked a hoppa ride in South Korea. On March 24, 2026, named issuers and processors in Latin America and the Caribbean ran live purchases of goods from makeup to groceries. Those posts say the issuer, acquirer, and merchant could see that an agent was in the flow. They do not publish a transaction count.

Agent Pay for Machines, opened to early access on October 20, 2026, is a different product. A business gives an agent a job and a spending limit. A service answers HTTP 402. The agent signs a voucher inside that limit. Mastercard says it sits on top of x402, and names pilots with Cloudflare, Ant International, Coinbase, and others. That is an agent paying for an API. It is not a shopper buying a jacket.

## How do Shop Pay and PayPal complete an agent checkout?

Shopify’s agent docs, read November 12, keep the merchant as the merchant of record. An agent can build a cart, then follow `continue_url` to the store, or open a checkout session when the final total matters. Direct completion is allowed when the checkout is eligible. Otherwise the buyer finishes on the store’s own page.

Shop Pay is the wallet inside that flow. The buyer pays with cards and addresses saved to Shop. For a personal agent, Shop MCP is the path Shopify documents: the buyer connects a Shop account once, approves each purchase in Shop Pay, and the agent receives a one-time credential that can complete checkout even outside Shopify. The UCP path is the `dev.shopify.shop_pay` handler. Shopify’s page says the wallet has more than 400 million buyers, that shoppers are 77 percent more likely to buy again from Shop Pay stores, and that those purchases have a 16 percent higher average order value. Shopify Protect is the fraud-chargeback guarantee on those orders. All three figures are Shopify’s.

The agentic storefronts help page, retrieved the same day, says the channel is on by default for eligible stores. The surfaces it names are ChatGPT, Google AI Mode and Gemini, Microsoft Copilot, and Meta. Stores on the Agentic plan are the exception: direct checkout starts off. A merchant can also turn direct checkout off and stay discoverable, in which case the shopper pays on the store. Shop Pay for a personal agent, Shopify’s example is Muse, does not need a separate switch. The order in admin is attributed to the agent.

PayPal’s Agent Ready overview was last updated October 13, 2026. It assumes the merchant already has Braintree or PayPal. Three integrations, three credentials:

- ACP, for ChatGPT: the customer authorizes PayPal, and the app receives a delegated token to process through Braintree.
- UCP with Braintree, for Google AI Mode and Gemini: Google returns a single-use Google Pay token.
- UCP with PayPal, for the same Google surfaces: Google sends an encrypted Google Pay credential, and the merchant forwards it to PayPal’s Orders v2 API.

PayPal does not ask the merchant to build a separate checkout for each assistant. It also does not turn a feed into a charge. The credential still has to come back from PayPal or Google.

## What does Amazon Buy for Me send to the store?

Amazon is the rail that does not hand the merchant a protocol token.

The Buy for Me article, published April 3, 2025 and still serving that text on November 12, 2026, says the shopper taps the button, lands on an Amazon checkout page, and confirms the address, taxes, shipping, and payment method. Amazon then completes the brand’s checkout by sending the customer’s encrypted name, address, and payment details. Amazon says it cannot see the customer’s previous or separate orders on that brand’s site. The brand sends the confirmation and handles delivery, returns, exchanges, and customer service. The same article says the experience runs on Amazon Bedrock, with Amazon Nova and Anthropic’s Claude. It also says the feature was starting as a test for a subset of U.S. customers and a limited set of brand stores. That sentence is the launch description. It is still on the page.

The later shopping guide, updated October 29, 2026, is the availability statement to use. Alexa for Shopping is for U.S. customers. On eligible products from other stores, the shopper taps Buy For Me and Amazon completes the purchase with the shopper’s Amazon payment and shipping details. The directory note is [Amazon Rufus latest features](/directory/amazon-rufus). Inside Amazon’s own store, auto-buy is a different grant: the person sets a target price, and Alexa for Shopping charges the default payment method when the price is reached. No second confirmation is described on that page.

A brand does not implement Buy for Me by filing a protocol spec. Amazon’s agent uses the brand’s existing site. There is no enrollment form on either page read here. If the brand’s checkout cannot accept the encrypted handoff Amazon’s agent submits, the button is Amazon’s to show or hide.

## What must a merchant do to be buyable by an agent?

Pick the channel that has already named you. A protocol logo on a slide is not a checkout button.

1. ChatGPT discovery. Apply, or sell through Shopify or Etsy, where the catalog is already integrated. Shoppers in the United States can find the product. They pay on your site or app. Fees on those purchases are zero, on the merchant page read November 12. The delegated-payment endpoint is a processor project, not a feed column.
2. Google AI Mode and Gemini. Eligible retailers use Merchant Center and UCP. The shopper pays with Google Pay in the cart, or the cart moves to your site. Shopify’s direct checkout, where it is on, takes a card in a Shopify checkout and can be switched off. The November 4 Canada list is a named set of retailers, not every store.
3. Copilot. The November 11 comparison on this site, [4 of 5 shopping agents can finish checkout](/blog/ai-shopping-agents-compared-november-2026), records Microsoft’s page as requiring a UCP-capable feed for checkout inside Copilot, for English-language merchants selling to U.S. buyers in U.S. dollars. This page does not reopen that reading.
4. PayPal or Braintree. Use Agent Ready and choose the ACP path or one of the two UCP paths. You keep the merchant account you already have.
5. Shopify, if you are the store. Agentic storefronts are on for eligible stores. Confirm whether direct checkout is on, and whether you want Shop Pay offered to personal agents. Orders from those agents should show the agent as the source.
6. Visa or Mastercard. These are programs for a registered agent and, on Visa’s getting-started page, a stack of onboardings. They are not a theme setting. The [readiness checker](/tools/shopping-agent-readiness-checker) scores find, read, and pay separately for that reason.
7. Amazon Buy for Me. Nothing on the pages read here is a merchant signup. Keep the brand checkout able to complete an order. Amazon decides which products show the button.

What the feed must contain so an agent can quote a real price is [How to make your store readable by AI shopping agents](/blog/how-to-make-your-store-readable-by-ai-shopping-agents).

## What can go wrong with consent, disputes, and a raw card?

The failure mode is a credential wider than the tap.

OpenAI’s allowance is one purchase, one max amount, one merchant, one expiry. A prompt hidden in a product page can still try to change what the agent asks for before that allowance is created. It cannot, on the spec, raise `max_amount` after the token exists. AP2 puts the consent screen on a trusted surface that is not allowed to be a model. That is the right place for the amount. A model that both recommends the item and signs the mandate has collapsed the two roles the spec separates.

Visa’s “buy when” rule is easy to miss. An autonomous instruction is not permission to charge the moment a price alert fires. The first-call page says the consumer must be notified and must approve once the condition is met. A cryptogram that is 70 hours old is also the wrong credential: the concepts page gives it 72 hours and one use.

Mastercard’s registration check is there so a merchant can refuse an agent that never passed review. A token from an unregistered agent is the case the product page is written to stop. The April 2025 release also says the cardholder’s control is part of the design. A checkout that cannot show the person what was authorized has dropped that control.

Amazon’s encrypted handoff is the raw-card case. The brand’s site receives payment details sufficient to complete checkout. The shopper’s protection, on the April 2025 article, is the Amazon confirmation page before that send, plus the brand as the party who delivers and refunds. Auto-buy on Amazon’s own checkout moves the confirmation earlier, into the price rule. Read that rule before you set it. The default card is what gets charged.

Disputes follow the seller. AP2 says the mandates and receipts can be evidence and leaves the dispute process out of the spec. OpenAI says settlement, refunds, and chargebacks stay with the merchant and the processor. Visa says commerce signals are shared so Visa can apply transaction controls. None of these pages publish a chargeback rate for agent checkouts. A rate you need for a forecast is a rate you still have to measure.

A computer-use agent that clicks a store’s Pay button is a separate path, with a separate gate. That guide is [Can an AI agent use your computer?](/blog/can-an-ai-agent-use-your-computer). Leave that click for a person unless the product’s own payment spec is the thing you integrated.

## What does this mean for shoppers, merchants, and builders?

Shoppers. Read the screen that names the amount. A Shop Pay approval, a Visa human-in-the-loop purchase, and an Amazon confirmation page are three different taps. Auto-buy at a target price spends the default card later, without a second tap on the October 29 Amazon guide. “AI buy for me” is the phrase U.S. search put at the top of this set today. The products that match it are specific, and most of them still ask.

Merchants. You are buyable on the channel you enabled, in the country that channel lists. A feed gets you quoted. A token, a mandate, or Amazon’s handoff is what gets you paid. Guest checkout on your own site does not enroll you in Visa Intelligent Commerce or Mastercard Agent Pay. If you sell through Shopify, look at the agentic storefront switch before the holiday traffic arrives. The six-month calendar is the [shopping report](/reports/ai-shopping-agents-next-6-months).

Builders. Pin a date. ACP’s payment example still says API version `2025-09-29`. Stripe’s shared-token examples say `2026-09-30.preview`, and the product is a public preview. AP2’s current spec is v0.2 from April 28, 2026, and it does not use the September 2025 mandate names. The trusted surface stays non-agentic. The shopping agent can be a model. The code that checks the mandate cannot. Cost per task includes the model calls and the payment retries. It does not include a second charge on a token whose allowance was already spent.

## Where can you read more on this site?

- Glossary: [agentic commerce](/glossary/agentic-commerce), [delegated payment token](/glossary/delegated-payment-token), [Know Your Agent](/glossary/know-your-agent), [agentic checkout](/glossary/agentic-checkout), [shopping agent](/glossary/shopping-agent), [product feed](/glossary/product-feed), [guardrail](/glossary/guardrail), [autonomy](/glossary/autonomy)
- Guides: [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you), [How to make your store readable by AI shopping agents](/blog/how-to-make-your-store-readable-by-ai-shopping-agents), [OpenAI’s checkout example is still API version 2025-09-12](/blog/ucp-vs-acp-spec-versions-november-2026)
- Comparison: [Best AI agent for shopping](/best/ai-agents-for-shopping), [4 of 5 shopping agents can finish checkout](/blog/ai-shopping-agents-compared-november-2026)
- News, November 13, 2026: [Can an AI agent buy things online for me? Navoka gives it a separate card](/blog/can-an-ai-agent-buy-things-online)
- Report: [AI shopping agents next 6 months](/reports/ai-shopping-agents-next-6-months)
- Research: [AP2 has 3,270 stars and no package](/research/agentic-commerce-protocol-adoption-november-2026)
- Tool: [Shopping agent readiness checker](/tools/shopping-agent-readiness-checker)
- Topics: [Agents in shopping](/topics/shopping)

## Frequently asked questions

### How do AI shopping agents pay?

Through a checkout path the product already has. OpenAI’s spec describes a single-use [delegated payment token](/glossary/delegated-payment-token). AP2 uses a signed Checkout Mandate and Payment Mandate. Visa and Mastercard use tokenized credentials and a registered agent. Shop Pay returns a one-time credential after the buyer approves. Amazon Buy for Me sends encrypted name, address, and payment details to the brand after the shopper confirms an Amazon checkout page.

### Can ChatGPT charge my card inside the chat?

The merchant page read on November 12, 2026 says no. Shoppers discover products in [ChatGPT](/directory/chatgpt) and pay on the merchant’s website or app. The Delegated Payment Spec is still published. Its Last-Modified header that morning was 11:17 GMT. That spec is for payment providers and PCI DSS level 1 merchants. A product feed does not start it.

### What is a delegated payment token?

A processor returns it after receiving card details and an allowance. On OpenAI’s spec the allowance is one-time, with a max amount, a currency, a merchant, a checkout session, and an expiry. Stripe’s Shared Payment Token is the first implementation Stripe names. Stripe marks it a public preview in the US, Canada, and select European countries.

### What must a merchant do to be buyable by an AI agent?

Turn on a named channel. A ChatGPT feed makes products discoverable and still sends the shopper to the store. Google direct checkout needs an eligible Merchant Center setup. PayPal Agent Ready needs an existing account and one of three paths. Shopify agentic storefronts are on by default for eligible stores. Visa and Mastercard are network programs for registered agents. Amazon does not publish a Buy for Me enrollment form on the pages read here.

### Who is the seller when an agent pays?

The store, on the OpenAI, Google, Shopify, and PayPal pages checked here. OpenAI’s spec says OpenAI is not the merchant of record. For Amazon Buy for Me, the brand sends the confirmation and handles delivery, returns, and customer service.

### Is Mastercard Agent Pay for Machines a shopping checkout?

No. Mastercard opened it to early access on October 20, 2026 so an agent can pay for digital services, inside a budget a business set, on top of x402. A jacket and an API invoice are different integrations.
