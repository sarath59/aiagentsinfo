---
title: "How to make your store readable by AI shopping agents: a feed, not a slogan"
description: "How AI shopping agents read a store: OpenAI’s nine feed fields, Google’s checkout flag, and Shopify’s catalog sync. Pages read November 10, 2026."
absoluteTitle: true
takeaways:
  - "OpenAI’s product feed, read November 10, 2026, requires nine fields for a discovery row: item id, title, description, product URL, brand, seller name, image URL, availability, and price. Checkout is a separate integration."
  - "Google’s Universal Commerce Protocol guide, last updated 2026-10-29 UTC, says a product is eligible for agent checkout only when native_commerce checkout eligibility is true. Missing or false means it is not eligible."
  - "Shopify’s Google AI Mode help page, read November 10, 2026, says products reach those surfaces through Merchant Center. Direct checkout can be turned off, and discovery can remain."
date: "2026-11-10"
updated: "2026-11-10"
category: guide
topics:
  - shopping
  - harnesses
  - tools-saas
audience:
  - everyone
  - builders
companies:
  - google
  - openai
  - chatgpt
  - microsoft
byline: "AI Agents Info Editorial"
sources:
  - title: "OpenAI, Product feed specification (read November 10, 2026)"
    url: "https://developers.openai.com/commerce/specs/file-upload/products"
  - title: "OpenAI, Power product discovery in ChatGPT (merchant page, read November 10, 2026)"
    url: "https://openai.com/chatgpt/search-product-discovery/"
  - title: "Google, Prepare your Merchant Center account, Universal Commerce Protocol guide (last updated 2026-10-29 UTC; read November 10, 2026)"
    url: "https://developers.google.com/merchant/ucp/guides/merchant-center"
  - title: "Google Merchant Center Help, Native commerce (read November 10, 2026)"
    url: "https://support.google.com/merchants/answer/17251586?hl=en"
  - title: "Shopify Help Center, Selling on Google AI Mode and Gemini (read November 10, 2026)"
    url: "https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/google"
  - title: "Vidhya Srinivasan, Google, New tech and tools for retailers in an agentic shopping era (January 11, 2026)"
    url: "https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/"
  - title: "Shopify, The agentic commerce platform (January 11, 2026)"
    url: "https://www.shopify.com/news/ai-commerce-at-scale"
faq:
  - question: "How do you make a store readable by an AI shopping agent?"
    answer: "Publish a product feed the agent can quote. On OpenAI’s spec, read November 10, 2026, a discovery row needs an item id, title, description, product URL, brand, seller name, image URL, availability, and price. A sentence on the homepage is not that row."
  - question: "Does a product feed turn on checkout?"
    answer: "No. OpenAI’s spec says checkout is a separately enabled integration, and the checkout flag does nothing until that integration is on. Google’s UCP guide says checkout eligibility defaults to false until the feed sets it to true."
  - question: "What does Google require before an agent can buy?"
    answer: "The UCP guide, last updated 2026-10-29 UTC, requires a Merchant Center account in good standing, products approved for free listings, a return policy with cost, window, and a policy link, at least one customer-support contact, and native_commerce checkout eligibility set to true."
  - question: "Does Shopify send products to Google AI Mode automatically?"
    answer: "The help page read November 10, 2026 says products reach Google AI Mode and Gemini through the Google and YouTube channel or Merchant Center. Direct checkout is on by default for an eligible store, and a merchant can turn that checkout off while leaving discovery on."
  - question: "Which products should stay off Google’s checkout flag?"
    answer: "The UCP guide lists subscriptions, installments, personalized goods, refurbished, used, and final-sale items, pre-orders, bundled services, special shipping, gifting, in-store activation, age-restricted goods, prohibited content, services, rentals, virtual items, and goods that require software to be installed first. Those rows should leave checkout eligibility empty or false."
  - question: "Where is shopping in ChatGPT available?"
    answer: "OpenAI’s merchant page, read November 10, 2026, says shopping is live for ChatGPT users in the United States. Purchases are completed on the merchant’s website or app. Shopify and Etsy catalogs are already integrated."
---

Updated November 10, 2026.

## How do you make a store readable by an AI shopping agent?

Publish a product row the agent can quote: a stable id, a title, a plain-text description, a public product URL, a brand, a seller name, an image URL, an availability value, and a price.

That row is a [product feed](/glossary/product-feed). A homepage sentence that says “AI ready” does not give the agent a price, a stock state, or a page it can open. [OpenAI’s feed spec](https://developers.openai.com/commerce/specs/file-upload/products), read November 10, 2026, names those nine fields as the discovery minimum. Search eligibility defaults to on. Checkout defaults to off.

Who can pay today, product by product, is [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you). The six-company calendar from November 2026 through May 2027 is [AI shopping agents, the next 6 months](/reports/ai-shopping-agents-next-6-months). The software that calls the feed is an [agent harness](/glossary/harness). The payment step, when a product allows it, is [agentic checkout](/glossary/agentic-checkout).

## What file does ChatGPT read?

ChatGPT’s merchant path reads a product feed. The nine required fields are the file. A crawl of the homepage is optional.

[OpenAI’s merchant page](https://openai.com/chatgpt/search-product-discovery/), read November 10, 2026, says feeds give the merchant control over how products appear, and that a crawl is not required. Shopping is live for ChatGPT users in the United States. Shopify and Etsy catalogs are already integrated, with no extra application. Other merchants apply. The page says a self-serve portal is planned for later this year, and that purchases finish on the merchant’s website or app. There is no fee on a purchase that starts in ChatGPT and finishes on that site or app.

The spec’s rules for a row that will actually parse:

- One row per purchasable item or variant. A variant needs its own `item_id`, the same `group_id`, `listing_has_variations` set true, and a `variant_dict` of the selected options.
- Availability is one of `in_stock`, `out_of_stock`, `pre_order`, `backorder`, or `unknown`. An omitted or unrecognized value rejects the row. `unknown` means the stock status was not supplied. It does not mean in stock.
- Price is a positive amount, a space, and an ISO currency code, as in `79.99 USD`. Update the feed when a sale starts or ends. A sale price has to be greater than zero, strictly less than the regular price, and in the same currency.
- Use UTF-8. Product and image URLs have to be public absolute HTTP or HTTPS URLs. Prefer HTTPS. Keep identifiers as strings so a leading zero survives.
- Omit an unknown optional field. The spec says not to send placeholder strings such as `null`, `unknown`, or `n/a`, except where `unknown` is an allowed availability value. An omitted shipping price means the charge is unknown. It does not mean free shipping.
- `is_eligible_checkout` can be true only when search eligibility is also true and checkout is enabled for that integration. The spec also asks for a public privacy-policy URL and a public terms URL when you opt into checkout. Those URLs do not, by themselves, turn checkout on.

The same page says apps inside ChatGPT are optional and aimed at larger merchants. Most merchants start with the feed.

## What does Google require before an agent can buy?

A Merchant Center account in good standing, products approved for free listings, a return policy, a customer-support contact, and checkout eligibility set to true on the rows you want an agent to buy.

[Google’s Universal Commerce Protocol guide](https://developers.google.com/merchant/ucp/guides/merchant-center) for Merchant Center, last updated 2026-10-29 UTC and read November 10, 2026, splits the work into account settings and feed flags.

The account has to include a return policy with the return cost, the return window, and a link to the full policy. On an advanced account, each sub-account needs its own policy. The account also needs at least one support contact: a customer-service URL, an email address, or a phone number. That contact is what Google uses for the “Contact Merchant” link on the order confirmation.

The feed flag is `native_commerce(checkout_eligibility)`. True opts the product into checkout on Google. False, or a missing value, means the product is not eligible. The guide says the default is false. [Merchant Center’s native-commerce help page](https://support.google.com/merchants/answer/17251586?hl=en), also read November 10, describes the same boolean as the switch for the Buy button on surfaces such as Gemini and AI Mode. Google recommends putting the attribute in a supplemental feed so a formatting mistake does not disturb the primary product data. The UCP guide adds a warning: the whole `native_commerce` group is replaced on each upload. A later file that omits a flag clears it.

Cart transfer is a second switch. Once the merchant profile declares `dev.ucp.shopping.cart`, products approved for free listings are included unless `native_commerce(cart_eligibility)` is false. If you send both flags, the guide’s composite form is `native_commerce(checkout_eligibility:cart_eligibility)`, with the two values separated by a colon.

Two identifiers have to agree. The product `id` in the feed has to be the id the Checkout API expects. When they differ, the guide says to send `merchant_item_id`, which then takes precedence. For variants, the guide recommends `variant_option` next to `item_group_id`, up to 30 options, with the same details in the title and the description. It says missing variant data can suppress the checkout button.

When a law requires a warning, such as California Proposition 65, the guide says to send `consumer_notice` with a `notice_type` of `legal_disclaimer`, `safety_warning`, or `prop_65`, and a `notice_message` of at most 1,000 characters. The merchant remains responsible for the legal content. This page is not legal advice.

[Google’s January 11, 2026 announcement](https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/) is the protocol’s public launch: the Universal Commerce Protocol, co-developed with Shopify, Etsy, Wayfair, Target, and Walmart. [Shopify’s post the same day](https://www.shopify.com/news/ai-commerce-at-scale) describes that protocol as the shared language. The attribute names above are the later Merchant Center guide, not a paraphrase of the January post.

## What does a Shopify store already sync?

Products reach Google AI Mode and Gemini through Google Merchant Center. Direct checkout is on by default for an eligible store, and the merchant can turn that checkout off.

[Shopify’s help page](https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/google), read November 10, 2026, lists the eligibility rules for direct checkout:

- The store sells to customers in the United States, Canada, or Australia. The store itself can be based in any country.
- There is a valid Google Merchant Center account that meets Google’s requirements for free listings, including return policies.
- Products are in Merchant Center, either through the Google & YouTube channel with automatic product sync and automatic shipping sync, or through a third-party feed or a manual upload.
- Products are eligible for Shopify Catalog.
- The merchant has agreed to the Agentic Storefronts terms.
- Terms of service, privacy policy, and return and refund policy are filled in under Settings, then Policies.

If the Google & YouTube channel is the path, both automatic sync settings have to stay on so Merchant Center matches the store. The page says to put required legal disclosures in the first 6,000 characters of the product description. It also says there is no extra fee for the direct checkout beyond ordinary payment processing.

Turning direct checkout off does not remove the products from discovery. Shoppers can still find them, and they are sent to the online store to pay. Customers who do not yet have the direct-checkout rollout are sent to the store as well. The page says the rollout to shoppers in the United States, Canada, and Australia is gradual.

Some products cannot use that direct checkout even when the flag is on: products sold only as subscriptions, bundles, customizable products, and B2B-only products. A product that offers both a one-time purchase and a subscription can be bought once. The subscription option is not available there. Local delivery and store pickup are not delivery methods in that checkout, and the merchant cannot require an account sign-in before it. Google Analytics and custom client-side pixels do not fire. Server-to-server pixels for started and completed checkout do.

## Which products should stay off the checkout flag?

Leave checkout eligibility empty or false for any product Google’s guide lists as ineligible. A true flag on an ineligible row is a checkout that cannot complete.

The [UCP guide](https://developers.google.com/merchant/ucp/guides/merchant-center) names these groups:

- Subscriptions and installment plans.
- Personalized goods, such as engravings or monograms.
- Refurbished goods, used goods, and final-sale items.
- Pre-orders.
- Items that add a contract, such as a warranty, installation, or setup.
- Special shipping, such as freight.
- Gifting that splits the invoice or hides the price.
- Products that have to be activated in a store.
- Age-restricted goods, and anything blocked by Google’s Shopping policies.
- Services, rentals, virtual items, and goods that require the shopper to install software before the purchase can finish.

OpenAI’s flag is a different switch on a different feed. `is_eligible_checkout` opts a row in only after checkout is enabled for that merchant. The discovery fields stay required either way.

## How does the feed sit inside the agent harness?

The harness is what calls the feed, and the feed is what the call is allowed to trust. A model that invents a price has skipped the tool.

A [shopping agent](/glossary/shopping-agent) is a model plus a [harness](/blog/what-is-an-ai-agent-harness) that can look up a catalog, hold a cart, and stop or pay under a rule. On the Google, OpenAI, and Shopify pages read for this guide, the store remains the seller. The assistant passes the cart. The store charges the payment method on its own systems.

The same shape of test used on a coding harness applies here, with a shopping action in the trace. Did the agent read the feed row, or did it guess the price? Did it stop when checkout eligibility was false? Those are behavioral checks. How to write them is [How to evaluate an AI agent harness](/blog/how-do-you-evaluate-an-ai-agent-harness). The worksheet is the [AI agent harness evaluation checklist](/tools/ai-agent-harness-evaluation-checklist). Public coding scores, which are a different job from a product feed, are the [November 2026 harness benchmark](/reports/agent-harness-benchmark-november-2026). Two papers that edit a harness, on different questions, are [HarnessFlow](/research/harnessflow-mcts-harness-optimization) and [Evolver](/research/evolver-agent-exploration-evolving-capabilities). The paper shelf is [AI agent papers](/papers).

## Which pages sit next to a store an agent can read?

The shopping calendar, the checkout guide, the harness checks, and a public listing are the next pages.

- [AI shopping agents, the next 6 months](/reports/ai-shopping-agents-next-6-months) is the dated record for Google, OpenAI, Amazon, Microsoft, Shopify, and Adobe. Microsoft’s feed requirement for Copilot Checkout is recorded there from a page read November 5, 2026. This guide did not re-open that Microsoft page on November 10.
- [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you) is who can pay today.
- [Best AI agent for shopping](/best/ai-agents-for-shopping) is the sourced product table. The shelf is [Agents in shopping](/topics/shopping).
- [Which AI agent framework do people install?](/blog/which-ai-agent-framework-do-people-install) is a download count, which is a file request, not a shopper.
- [Verified revenue](/verified-revenue) is a payment-processor figure for listed tools. It is not a feed-quality score.
- Live counts sit on the [trackers](/trackers).
- To put an agent product on this site, [submit a listing](/submit) or open a page in the [directory](/directory) and claim it. There is no login, and payment does not buy a rank.

## What do merchants ask after the feed is live?

The feed answers discovery. Checkout, country, and a listing on this site are separate steps.

### How do you make a store readable by an AI shopping agent?

Publish a product feed with a stable id, title, description, public product URL, brand, seller name, image URL, availability, and price. OpenAI’s spec, read November 10, 2026, requires those nine fields for discovery.

### Does a product feed turn on checkout?

Checkout is a second switch. OpenAI says the flag works only when checkout is already enabled for the integration. Google’s UCP guide says checkout eligibility defaults to false.

### What does Google require before an agent can buy?

A Merchant Center account in good standing, products approved for free listings, a return policy with cost, window, and a policy link, a customer-support contact, and `native_commerce(checkout_eligibility)` set to true.

### Does Shopify send products to Google AI Mode automatically?

Products have to be in Merchant Center, through the Google & YouTube channel or another feed. Direct checkout is on by default for an eligible store. Turning it off leaves discovery on and sends the shopper to the store to pay.

### Which products should stay off Google’s checkout flag?

Subscriptions, installments, personalized goods, refurbished, used, and final-sale items, pre-orders, bundled services, special shipping, gifting, in-store activation, age-restricted and prohibited goods, services, rentals, virtual items, and goods that need software installed first. The UCP guide says those rows should leave checkout eligibility empty or false.

### Where is shopping in ChatGPT available?

The merchant page, read November 10, 2026, says it is live in the United States. Shoppers discover products in ChatGPT and complete the purchase on the merchant’s website or app.
