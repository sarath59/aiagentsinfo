---
title: "Can AI agents book flights? United can cancel the reservation"
description: "United's November 11, 2026 contract bars an agent from booking, changing, or buying a seat. A fare can still be shown. Shopify and ChatGPT Wallet opened a sanctioned door on November 13."
absoluteTitle: true
takeaways:
  - "No. On the contract revised November 11, 2026, United Rule 6.J.6 bars an AI agent from making, modifying, or servicing a ticket, or from buying any service or product, including a seat or an upgrade. The definition applies whether or not the passenger supervises or approves. Rule 5.H lets United cancel those reservations without notice."
  - "InsideFlyer, the same day, says the rule does not ban a fare search: an agent can show United fares and availability, and the customer completes checkout. United's own Digital Trust Center draws a harder line on the site itself. A tool that searches, books, or collects information on united.com or the United app without permission is unauthorized."
  - "Bookings an agent made before November 11, 2026 will not be cancelled, on the Digital Trust Center page. The same week, Shopify turned on Poppy for every merchant, and OpenAI opened ChatGPT Wallet so a dot can pay with a network token after a biometric. Those are sanctioned doors. United has not opened one."
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
  - builders
  - buyers
  - everyone
companies:
  - openai
  - chatgpt
  - shopify
  - sierra
  - meta
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Two Shopify Poppy files and the United agent-access rules, read November 14, 2026"
  description: "GET https://allbirds.com/.well-known/poppy.json and https://brooklinen.com/.well-known/poppy.json on November 14, 2026 each returned HTTP 200. Both documents said protocol_version 0.4. The Allbirds checkout scope said the agent prepares checkouts as the signed-in customer and the buyer completes the purchase, and that guest checkout is usually enough. United's Contract of Carriage header read the same day said revised November 11, 2026. Rule 6.J.6 and Rule 5.H were read from that document. AI Agents Info did not book a flight or send a payment."
  isBasedOn: "https://www.united.com/en/us/fly/contract-of-carriage.html"
sources:
  - title: "United newsroom, United Restricts Access for Third-Party AI Agents (November 11, 2026)"
    url: "https://united.mediaroom.com/news-releases?item=125496"
  - title: "United Digital Trust Center, Unauthorized third-party AI agents or assistants (read November 14, 2026)"
    url: "https://www.united.com/en/us/fly/help-center/digital-trust-center/artificial-intelligence/third-party-ai-agents.html"
  - title: "United Contract of Carriage, revised November 11, 2026 (read November 14, 2026)"
    url: "https://www.united.com/en/us/fly/contract-of-carriage.html"
  - title: "InsideFlyer, United bars AI agents from completing flight bookings (November 11, 2026, 8:34 p.m.)"
    url: "https://www.insideflyer.com/posts/united-bars-ai-agents-from-completing-flight-bookings/"
  - title: "CNBC, United Airlines moves to block AI agents from its platform (November 11, 2026)"
    url: "https://www.cnbc.com/2026/11/11/united-airlines-ai-agents.html"
  - title: "The Washington Post, United Airlines blocks AI agents from booking flights (November 12, 2026, 7:30 a.m. EST)"
    url: "https://www.washingtonpost.com/travel/2026/11/12/united-airlines-blocks-ai-agents-booking-flights/"
  - title: "Sierra, Releasing Personal Agent Protocol 1.0 (Bret Taylor and Clay Bavor, November 13, 2026)"
    url: "https://sierra.ai/blog/releasing-poppy"
  - title: "OpenAI, Introducing ChatGPT Wallet (November 13, 2026)"
    url: "https://openai.com/index/introducing-chatgpt-wallet/"
  - title: "Allbirds Poppy file, protocol_version 0.4 (fetched November 14, 2026)"
    url: "https://allbirds.com/.well-known/poppy.json"
  - title: "Brooklinen Poppy file, protocol_version 0.4 (fetched November 14, 2026)"
    url: "https://brooklinen.com/.well-known/poppy.json"
faq:
  - question: "Can AI agents book flights?"
    answer: "Not on United, after the contract revised November 11, 2026. Rule 6.J.6 bars an AI agent from making, modifying, or servicing a ticket, or from buying any service or product. That includes seats and upgrades. The definition applies even if the passenger watches and approves. Rule 5.H lets United cancel those reservations without notice. InsideFlyer says an agent can still show fares and availability, and the customer buys. Turkish Airlines, on Sierra's November 13 post, lets a personal agent look up fares and find a business-class upgrade the customer approves before paying. Completing that purchase inside the conversation is work Turkish says it is still doing."
  - question: "Can AI buy things online for me?"
    answer: "On some sites, and only on a path the merchant already opened. United will not let an unauthorized agent buy a ticket, a seat, or an upgrade. ChatGPT Wallet, announced November 13, 2026, can pay with a network token after you approve that purchase with Face ID or a fingerprint, inside a dot, for ChatGPT Pro subscribers 18 or older in the United States. Shopify's Poppy file, live on stores fetched the next morning, lets an agent prepare a checkout. The buyer still completes the purchase. A shared password is not one of these paths."
  - question: "Will United cancel a booking an AI agent already made?"
    answer: "Bookings made before November 11, 2026 will not be cancelled, on United's Digital Trust Center page. The page tells you to review those trips and confirm they were ticketed. Rule 5.H, on the contract revised the same day, lists reservations made, modified, or serviced by AI agents among the bookings United can cancel without notice. A later change or service call from an agent is a different act from the original booking."
  - question: "Can an AI agent still show United fares?"
    answer: "InsideFlyer, November 11, 2026, says yes. The policy does not prohibit automated flight searches. An agent can show United fares and availability, and the customer completes checkout. United's Digital Trust Center says research is fine when the tool does not access united.com or the United app, and that a tool which searches, books, buys, or collects information on those surfaces without permission is unauthorized. Showing a fare and driving the airline's own site are different jobs."
  - question: "What should an agent builder integrate instead of a shared login?"
    answer: "Use the protocol the company published, and keep a person on the step a regulator or the merchant named. Poppy, published November 13, 2026, uses OAuth so the customer sets what the agent may do. ChatGPT Wallet pays with a network token after a biometric, and the agent does not receive the real card number. On United, check-in still requires a human acknowledgment that bags do not contain banned substances. Do not put a MileagePlus password in the prompt, the tool arguments, or a browser profile the agent controls."
---

No. After the contract revised November 11, 2026, an AI agent may not book, change, or service a United ticket, and it may not buy a seat, an upgrade, or any other United product. Rule 6.J.6 says so. Rule 5.H lets United cancel that reservation without notice, and the definition holds even if you watched and approved every step. InsideFlyer, the same evening, says a fare search is a different act: the agent can show the flight and the price, and you buy it yourself.

That split is the whole question behind “can ai buy things online for me?” A [shopping agent](/glossary/shopping-agent) can spend only where a merchant has opened a door and named the approval. United shut the door on its own site and on agency channels. Two days later [Shopify](https://sierra.ai/blog/releasing-poppy) turned [Poppy](/blog/how-does-chatgpt-wallet-work) on for every merchant, and [OpenAI](https://openai.com/index/introducing-chatgpt-wallet/) opened ChatGPT Wallet so a dot can pay with a network token after a biometric. One company blocked the agent. Two companies published a contract the agent is allowed to use.

The six-month calendar of who has dated a checkout is [AI shopping agents, the next 6 months](/reports/ai-shopping-agents-next-6-months). Which assistants could finish a purchase on the earlier reading is [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you). Wallet’s token, and the Poppy files that were still on protocol 0.4 the morning after 1.0, are [How does ChatGPT Wallet work?](/blog/how-does-chatgpt-wallet-work).

## What did United actually prohibit on November 11?

The transaction. The [newsroom release](https://united.mediaroom.com/news-releases?item=125496) dated November 11, 2026 says United will restrict access, on its own digital platforms and through travel agencies and aggregators, “to prohibit use by unauthorized, third-party personal AI agents or assistants.” The work includes booking, ticketing, and distribution policies. Sharing an account login with a personal assistant can expose the account. An action the tool takes can buy something you did not mean to buy, change the reservation, or spend MileagePlus miles.

The contract, header “revised November 11, 2026,” read again on November 14, puts that in Rule 1 and in two rules InsideFlyer named the same night.

The definition is wide. An AI Agent is “any software or service, including but not limited to an AI assistant, AI agent or AI-enabled browser that takes autonomous or semi-autonomous action, whether or not Passenger or another individual supervises or approves its actions,” to discover, search for, book, purchase, ticket, service, or manage a United product. The examples are assistants inside social, messaging, or search products; AI-enabled browsers and standalone agents; and a third-party assistant that reaches United through a travel agency or other intermediary.

The prohibition is narrower than the definition. Rule 6.J.6, under Prohibited Practices, bars “the use of AI Agents to make, modify or service a Ticket, and/or to purchase any service or product.” It sits next to hidden-city ticketing, throwaway ticketing, and back-to-back ticketing. A seat and an upgrade are products. So is any ancillary the contract’s definition already listed.

Rule 5.H is the remedy. United may cancel, without notice, reservations it deems improper. The list now ends with “reservations made, modified or serviced by AI Agents.” The sentence points at Rule 6.K for the rest of the remedies, which include invalidating the ticket and cancelling the remaining itinerary. Approval on your side does not rewrite Rule 1. The definition already says the rule holds whether or not you supervise or approve.

[CNBC](https://www.cnbc.com/2026/11/11/united-airlines-ai-agents.html), published November 11 at 3:02 p.m. EST and updated at 6:16 p.m., reported the same restriction and the same check-in example. [The Washington Post](https://www.washingtonpost.com/travel/2026/11/12/united-airlines-blocks-ai-agents-booking-flights/), November 12 at 7:30 a.m. EST, led with the booking block and the regulatory claim. Neither article is the contract. The contract is the text a builder has to follow.

## Can the agent still show the fare?

Yes, on InsideFlyer’s reading of the ticketing rule. No, if the tool is logged into united.com doing the search for you.

[InsideFlyer](https://www.insideflyer.com/posts/united-bars-ai-agents-from-completing-flight-bookings/), edited by Randy Petersen and timestamped November 11 at 8:34 p.m., says the policy does not prohibit automated flight searches. Agents can show United fares and availability. The customer completes checkout. The example on that page is Expedia’s ChatGPT integration, which displays flights and hotels and sends the person to Expedia to buy. United can identify a booking source. A record that names Expedia as the seller does not, by itself, show whether an agent handled the search.

United’s [Digital Trust Center](https://www.united.com/en/us/fly/help-center/digital-trust-center/artificial-intelligence/third-party-ai-agents.html), read November 14, is stricter about the airline’s own surfaces. Research with general information is allowed, including tools United built. If the tool generates text, you review it and you search it yourself on united.com or in the app. A third-party agent, bot, browser extension, or browser feature that searches, books, buys, manages, or collects information on united.com or the United app, without United’s permission, is unauthorized. Assistive technology for customers with disabilities is excluded. United also says it does not yet work with any third-party AI agent. Permission you gave the assistant is not permission United gave the assistant.

Agencies get a third sentence. Travel agencies and booking platforms cannot use third-party AI agents to search for, book, or manage United travel, on direct or indirect channels. An agency can use its own third-party AI tools only with United’s permission. A consumer fare display and an agency that feeds United content into a personal agent are not the same integration.

For a builder, the safe reading is the intersection. Show a fare you obtained without driving united.com or the app. Hand the purchase to the human. Do not type the confirmation number, the MileagePlus login, or a stored card. Do not call check-in. The newsroom’s example is specific: flight check-in requires a human acknowledgment that bags do not contain banned substances such as explosives. The Digital Trust Center repeats it. An automated check-in can skip that acknowledgment. That is a regulatory stop, and it is the one step a [human in the loop](/glossary/human-in-the-loop) has to own even when every other click looks cheap to automate.

## What happens to a ticket the agent already bought?

It stays, if the agent bought it before November 11, 2026.

The Digital Trust Center says agent bookings made prior to that date will not be cancelled. It also says to review recent trips and confirm they were booked and ticketed. If you shared a MileagePlus login, change the password. If the agent bought something or spent miles you did not mean to spend, secure the account. The page does not say United will reverse the charge for you.

A change after November 11 is a new act. Rule 5.H names reservations modified or serviced by AI agents, not only reservations first created by them. Leaving a pre-November 11 booking alone is the path the help page describes. Sending an agent back to add a seat, move the flight, or check in is the path the contract lists for cancellation without notice.

## Who opened a door the same week?

Shopify, OpenAI, Turkish Airlines, and Mercury. Each one published a limit. None of them said “log in as the customer and click.”

[Sierra](https://sierra.ai/blog/releasing-poppy), Bret Taylor and Clay Bavor, published Personal Agent Protocol 1.0 on November 13, 2026. Shopify enabled Poppy for every merchant. Every Shopify store already supports Universal Commerce Protocol. UCP finds the product, fills the cart, and checks out. Poppy is the earlier step: the agent says who it is and learns what it may do. Authentication is OAuth. The customer can change that access later. The commerce extension, which Shopify co-authored, lets the agent shop as a guest or sign in, and it makes the agent ask before certain actions.

The live file is behind the announcement. On November 14, `GET /.well-known/poppy.json` returned HTTP 200 from Allbirds and from Brooklinen. Both documents said `protocol_version` 0.4. Allbirds’s checkout scope says the agent prepares checkouts as the signed-in customer and the buyer completes the purchase, and that guest checkout is usually enough. A 0.4 file with that scope is a real door. It is not the draft 1.0 specification. The longer reading of that gap is the [Wallet and Poppy explainer](/blog/how-does-chatgpt-wallet-work).

[ChatGPT Wallet](https://openai.com/index/introducing-chatgpt-wallet/), the same day, pays after the person reviews the merchant, the items, the total, and the card, then approves with Face ID or a fingerprint. The network then provides a payment token: a substitute card number, security code, and expiration. The charge hits the selected card. The business and the agent do not receive the real card details. It starts in dots, for ChatGPT Pro subscribers 18 or older in the United States, on an eligible US-issued card. OpenAI says spending limits you set in advance are later work. The query “can ai buy things online for me?” has a yes here, and the yes is a biometric plus a token, not a stored password. The help-center limits, including debit cards and ordinary chat, stay on the [Wallet page](/blog/how-does-chatgpt-wallet-work).

Turkish Airlines is the airline that took the other side of United’s rule, on Sierra’s account the same day. A personal agent can look up fares, flight status, and stopovers, and it can open a booking with a reference number and a surname. A Miles&Smiles member can have the agent find a business-class upgrade, which the customer approves before paying. Sierra says Turkish is working to let members complete a purchase without leaving the conversation. That last sentence is a plan. The upgrade still stops for a person. Delta Air Lines is on the design-partner list in the same post. Design partner is not a live booking API.

Mercury, also live on that post, lets a personal agent read balances, recent transactions, spending categories, budgets, and receipts, and initiate a payment or transfer. Mercury still runs the request through the account’s approval policy before anything is sent. The footnote says Mercury is not a bank. The pattern is the one United asked for and did not offer: OAuth or an account policy, a named action, and a human on the irreversible step.

| Company | Dated rule | An agent may | An agent may not | What a person still does |
| --- | --- | --- | --- | --- |
| United | Contract revised November 11, 2026. Newsroom the same day. | Show fares and availability, on InsideFlyer’s reading. Research that does not touch united.com, on the Digital Trust Center. | Make, modify, or service a ticket, or buy any product, under Rule 6.J.6. Search, book, or manage United travel for an agency’s customer, on the help page. | Buy the ticket. Acknowledge the check-in hazmat statement. A pre-November 11 agent booking is not cancelled. |
| Shopify, via Poppy | Sierra, November 13, 2026. Live files fetched November 14. | Arrive through Poppy. UCP can find a product, fill a cart, and check out. Allbirds’s 0.4 scope lets the agent prepare a signed-in checkout. | Treat protocol 0.4 as draft 1.0. Skip the ask the commerce extension requires before certain actions. | Complete the purchase, on the Allbirds scope fetched November 14. Guest checkout is the usual path. |
| ChatGPT Wallet | OpenAI, November 13, 2026. | Pay from a dot with a network token after Face ID or a fingerprint, for the Pro rollout OpenAI named. | See the real card number. Treat approval as proof the merchant placed the order. Spend in ordinary chat. | Review the merchant, items, total, and card, then pass the biometric. |
| Turkish Airlines, via Poppy | Sierra, November 13, 2026. | Look up fares, status, and stopovers. Open a booking with a reference number and surname. Find a business-class upgrade for a Miles&Smiles member. | Complete the purchase inside the conversation. Sierra describes that as work underway. | Approve the upgrade before paying. |
| Mercury, via Poppy | Sierra, November 13, 2026. | Read balances and transactions. Categorize spending. Initiate a payment or transfer. | Send the payment on its own. Mercury runs the account’s approval policy first. | Approve under that policy. Mercury’s footnote says it is not a bank. |

Source: aiagentsinfo.com. Rows are copied from the pages dated above and read November 14, 2026. A company with no date on a primary page is not in the table. CNBC’s November 11 story said Amazon has blocked Meta’s Muse and that Walmart has partnered with it. CNBC did not date those two decisions. They stay out of the table.

## How should a builder integrate, now that the sites have split?

Call the official protocol. Stop where the merchant named a person. Never put a shared password in the [harness](/glossary/harness).

Three integrations are already specified.

1. Poppy, for a company that published it. The agent fetches `/.well-known/poppy.json`, identifies itself, and takes the OAuth scopes the file offers. On the Allbirds file fetched November 14, `dev.ucp.shopping.checkout:manage` prepares a checkout. It does not finish it. If the response is `customer_account_required`, the buyer signs in or creates an account. Build the ask into the tool result. A model that retries a denied action is a failed [eval](/glossary/behavioral-evaluation), not a persistent shopper.
2. ChatGPT Wallet, if you are the merchant receiving the token. OpenAI’s November 13 announcement says the token works with the checkout you already run, and that risk systems may still decline a legitimate agent purchase. Configure the CDN or firewall for signed Web Bot Auth requests if you want the agent to reach the page. The token is single-use in spirit: do not store it and replay it for a second order. The [delegated payment token](/glossary/delegated-payment-token) in OpenAI’s other spec is a different object. Do not mix the two in one tool schema.
3. A handoff, for United and for any site that has not published a protocol. Return the fare, the itinerary, and a link. End the [tool call](/glossary/tool-use) there. Do not launch a browser session against united.com, do not reuse a logged-in profile, and do not ask the model to complete check-in. The hazmat acknowledgment is the regulated step. A prompt that says “the user already agreed” does not satisfy Rule 6.J.6, because the contract’s definition ignores that approval.

OAuth scopes beat a shared credential on every row above. United’s newsroom is explicit that a password handed to a personal assistant can leak, and that the tool can spend miles. Poppy’s design is the opposite: the customer grants a scope and can revoke it. Mercury’s payment still hits an approval policy the agent does not edit. If your harness stores MileagePlus passwords, confirmation numbers, or card numbers in the [context window](/glossary/context-window), in logs, or in a browser cookie jar, you are building the integration United just prohibited.

Cost per task follows the same split. A fare lookup plus a handoff is one or two model calls and no ticket. A browser agent that fights a block, retries a login, and then gets the reservation cancelled has spent the [context](/glossary/context-window) and still has no ticket. Browser Use’s 1.0.4 notes, published November 13, are a reminder of that bill: one 705-step task on 1.0.3 read 27.8 million input tokens. That number is Browser Use’s bench, not a United booking. It is the shape of the bill when the harness keeps clicking a site that will not transact.

The [harness](/blog/what-is-an-ai-agent-harness) decision is which tool you expose. A catalog tool, a Poppy client, and a Wallet confirmation are tools. A computer-use loop pointed at united.com is the tool United defined as an AI Agent and then banned from ticketing. The computer-use safety rules already on this site stay where they are. This page is the airline rule those safety rules now have a contract citation for.

## What this means for you

Buyers. An assistant can help you compare a United fare. It cannot buy the ticket, change it, pick the seat, or check you in. If it already bought a ticket before November 11, that booking stands, and you should open it yourself and confirm it is ticketed. If you pasted a MileagePlus password into a chat, change it. A Face ID prompt inside a ChatGPT dot is a different product, and it is not a United login.

Builders. Ship the handoff for United. Ship Poppy or Wallet only where the file or the announcement says the action is live, and test the denial. Assert that a United tool cannot return a ticket number. Assert that a check-in tool refuses to acknowledge the hazmat statement on the user’s behalf. Assert that a Poppy checkout stops for the buyer. A green demo that books a United seat in a logged-in browser is a contract violation with a cancellation clause, not a launch.

Merchants. If you sell on Shopify, a Poppy file is already on the store, and the 0.4 document fetched November 14 still tells the agent that the buyer completes the purchase. Read your own file before you tell a partner you are on draft 1.0. If you sell anywhere else, publish the actions you will accept and the action a person must confirm. United just showed the alternative: a contract term, a cancellation right, and no API.

## Where can you read more on this site?

- Wallet and Poppy, read November 14: [How does ChatGPT Wallet work?](/blog/how-does-chatgpt-wallet-work)
- Who can finish a purchase, on the earlier guide: [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you)
- Report: [AI shopping agents, the next 6 months](/reports/ai-shopping-agents-next-6-months)
- How the charge moves: [How do AI shopping agents pay?](/blog/how-do-ai-shopping-agents-pay)
- A card that belongs to the agent, launched November 12: [Can an AI agent buy things online?](/blog/can-an-ai-agent-buy-things-online)
- Glossary: [shopping agent](/glossary/shopping-agent), [agentic checkout](/glossary/agentic-checkout), [delegated payment token](/glossary/delegated-payment-token), [tool use](/glossary/tool-use), [autonomy](/glossary/autonomy), [harness](/glossary/harness)

## Frequently asked questions

### Can AI agents book flights?

Not on United, after the contract revised November 11, 2026. Rule 6.J.6 bars an AI agent from making, modifying, or servicing a ticket, or from buying any service or product. That includes seats and upgrades. The definition applies even if the passenger watches and approves. Rule 5.H lets United cancel those reservations without notice. InsideFlyer says an agent can still show fares and availability, and the customer buys. Turkish Airlines, on Sierra’s November 13 post, lets a personal agent look up fares and find a business-class upgrade the customer approves before paying. Completing that purchase inside the conversation is work Turkish says it is still doing.

### Can AI buy things online for me?

On some sites, and only on a path the merchant already opened. United will not let an unauthorized agent buy a ticket, a seat, or an upgrade. ChatGPT Wallet, announced November 13, 2026, can pay with a network token after you approve that purchase with Face ID or a fingerprint, inside a dot, for ChatGPT Pro subscribers 18 or older in the United States. Shopify’s Poppy file, live on stores fetched the next morning, lets an agent prepare a checkout. The buyer still completes the purchase. A shared password is not one of these paths.

### Will United cancel a booking an AI agent already made?

Bookings made before November 11, 2026 will not be cancelled, on United’s Digital Trust Center page. The page tells you to review those trips and confirm they were ticketed. Rule 5.H, on the contract revised the same day, lists reservations made, modified, or serviced by AI agents among the bookings United can cancel without notice. A later change or service call from an agent is a different act from the original booking.

### Can an AI agent still show United fares?

InsideFlyer, November 11, 2026, says yes. The policy does not prohibit automated flight searches. An agent can show United fares and availability, and the customer completes checkout. United’s Digital Trust Center says research is fine when the tool does not access united.com or the United app, and that a tool which searches, books, buys, or collects information on those surfaces without permission is unauthorized. Showing a fare and driving the airline’s own site are different jobs.

### What should an agent builder integrate instead of a shared login?

Use the protocol the company published, and keep a person on the step a regulator or the merchant named. Poppy, published November 13, 2026, uses OAuth so the customer sets what the agent may do. ChatGPT Wallet pays with a network token after a biometric, and the agent does not receive the real card number. On United, check-in still requires a human acknowledgment that bags do not contain banned substances. Do not put a MileagePlus password in the prompt, the tool arguments, or a browser profile the agent controls.
