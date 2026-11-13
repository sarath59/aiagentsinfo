---
title: "12 of 15 AI employee products print a price (Nov 12, 2026)"
description: "On November 12, 2026, 12 of 15 pricing pages print a dollar. The median of seven fixed subscription cards is $33 a month. AiSDR is $1.50 a person. 11x Growth is $36,000 a year."
date: "2026-11-12"
updated: "2026-11-12"
type: original-report
topics:
  - tools-saas
  - how-agents-work
  - task-performance
contentLicense: true
absoluteTitle: true
dataset:
  title: "AI employee list prices for small businesses, read November 12, 2026"
  description: "Fifteen named AI-employee or role-agent products, three each for inbox, support, outbound, phone, and bookkeeping. Prices, units, and human-control sentences were copied from the vendor pricing page on November 12, 2026. A cell that says not public had no dollar in that fetch. Medians and wage comparisons are arithmetic on those figures and on BLS May 2025 median wages read the same morning. No account was billed."
  isBasedOn: "https://sintra.ai/pricing"
abstract: |
  Twelve of fifteen AI-employee pricing pages print a dollar. Three do not. Artisan, Synthflow, and Truewind send the buyer to a demo or an enterprise agreement.

  Among the seven products that print a fixed subscription, the median of the lowest card is $33 a month. That figure is Phonely’s annual starter. It uses Sintra’s $15.60 yearly card, not the $48.50 the same page’s FAQ calls the starting price. AiSDR prints $1.50 per person prospected and no monthly fee. 11x Growth prints $36,000 a year for up to 2,000 new prospects a month. Fill that cap and the 11x floor is also $1.50 a prospect. Contact 100 people and 11x is still $3,000 for the month, twenty times AiSDR.
whyItMatters: |
  The pages that rank for “what is an AI employee” describe a role and do not print a vendor price. A small business cannot budget a role. It can budget a meter: a seat, an hour pool, a resolution, a unique customer, a minute, or a person contacted.

  This note is the meter. The November 11 cost guide on this site already priced a different mix, and it recorded an 11x Growth card of $3,750 a month beside an FAQ of $36,000. On November 12 the same 11x URL prints $36,000 a year and does not print $3,750. The jobs those meters buy are [AI employee for a small business: 5 jobs (Nov 2026)](/blog/ai-employee-for-small-business-november-2026).
keyFindings:
  - "12 of 15 pricing pages print a dollar. Artisan, Synthflow, and Truewind do not. The set is three products for each of five jobs: inbox, support, outbound, phone, and bookkeeping."
  - "Seven products print a fixed subscription. Sorted by the lowest card on the page, the prices are $15.60, $24, $29.99, $33, $40, $65, and $79. The median is $33, Phonely’s annual starter. Replace Sintra’s $15.60 yearly card with the $48.50 its FAQ calls the start, and the median becomes $40."
  - "The six cards that print a distinct month-to-month price, with Kick left out because its card does not print a second monthly dollar, sort to $29.99, $44, $48.50, $50, $65, and $79. The median of an even count is the mean of the middle two, $49.25."
  - "AiSDR is $1.50 per person prospected, billed daily, with no monthly fee. One FAQ says campaigns start at $7.50. Another sentence on the same page says campaigns start from $3. 11x Growth is $36,000 a year, billed annually, for up to 2,000 new prospects a month. At that cap the year is $1.50 a prospect. At 100 people in a month, 11x is $3,000 and AiSDR is $150."
  - "A part-time bookkeeping clerk at the BLS May 2025 median, 80 hours, is $1,948.80 in wages before benefits. Digits Essentials is $65 a month. Kick Basic prints $40. Neither page prices a transaction. A 6-minute customer-service ticket at the May 2025 median is $2.153 of wages. Intercom Fin is $0.99 an outcome, and a handoff can be that outcome. Zendesk pay-as-you-go is $2.00, and only when no human takes the ticket."
methodology: |
  The set was fixed as three vendors for each of five jobs a small business tries to hand to a named AI employee: inbox or office agent, customer-support agent, outbound SDR, phone receptionist, and bookkeeper. Each vendor has a public pricing URL. Where a known vendor in the job prints no dollar, that vendor is the third row, so the count of published prices is not limited to vendors that show a price. Synthflow’s page says the product is an annual enterprise agreement. It stays in the phone row as the page a buyer hits when the price is missing. Truewind stays in the bookkeeping row for the same reason. Artisan stays in the outbound row.

  Pages were fetched on November 12, 2026. Direct GETs of the fourteen HTML pricing URLs other than AiSDR returned HTTP 200 with Date headers from Thu, 12 Nov 2026 07:50:08 GMT through 07:50:13 GMT. AiSDR returned 403 to a plain client and HTTP 200 at 07:55:15 GMT to a browser User-Agent. Goodcall’s FAQ was a separate GET at 07:54:45 GMT. HubSpot’s customer-agent product page was a separate GET at 07:53:41 GMT and is not one of the fifteen. BLS Occupational Outlook Handbook pages for receptionists, bookkeeping clerks, customer service representatives, and secretaries were fetched at 07:50:12–07:50:13 GMT. Wages on those pages are May 2025 medians.

  A price is a dollar figure in that fetch. “Not public” means the fetched pricing page did not contain a product price. Medians use the lowest fixed subscription card when a page prints both a monthly and a yearly rate. “Starts at,” per-outcome, per-resolution, and per-person prices are reported and are not inside the $33 median. Wage lines are this page’s multiplication. They are wages, not loaded cost, and they are not invoices.

  Frontdesk (myaifrontdesk.com/pricing) and Pilot Essentials were read in the same window and are cited in the body. They are not in the fifteen and not in the median. Pilot’s Core card rendered as $0 in the HTML, which is a placeholder, not a price, and it is unused.
limitations:
  - "The fifteen vendors are a named set, not every product that uses the words AI employee. A vendor absent from the set is absent. Frontdesk and Pilot were read and left outside so the set stayed at three per job."
  - "A list price is not an invoice. Credits, hours, outcomes, and overages move the bill. Sintra does not print credits per email. Lindy puts a reply draft inside a band of 2 to 250 credits and does not say where a draft lands."
  - "Phonely’s plan card says 200 minutes on Starter. A comparison table on the same page says 250 minutes included. Both figures are printed. This note does not pick one."
  - "AiSDR’s FAQ says campaigns start at $7.50 and, later, from $3. Five people at $1.50 is $7.50. The page does not explain the $3 sentence. Team plans say up to 40 percent lower and do not print the discounted rate."
  - "11x’s $8,000 to $12,000 fully loaded SDR sentence is 11x’s claim. It is not a BLS wage. The BLS figure used here is the May 2025 median for wholesale and manufacturing sales representatives, $76,460, from the customer-service handbook’s related-occupations table. That occupation is not titled SDR."
  - "HubSpot Customer Agent is $0.50 per resolution on its product page, and voice is $0.50 a minute, and the page requires Professional or Enterprise. The seat price is not on that page, so HubSpot is not in the median."
  - "Goodcall’s own 13-cent minute uses the page’s “about 150 calls” and a four-minute assumption. The billed unit is $0.79 per unique customer on Starter. This note prints both and does not treat 13 cents as the invoice unit."
  - "No account was created and no card was charged. A checkout that disagrees with the pricing page is the checkout."
references:
  - title: "Sintra pricing"
    url: "https://sintra.ai/pricing"
    note: "12-month card $15.60 beside a struck $52. 1-month card $48.50 beside $97. 3-month card $23.60 beside $59. Every card lists 250 monthly credits. FAQ: pricing starts from $48.50/m. Helpers print $39/month and are labeled included with Sintra X. HTTP Date Thu, 12 Nov 2026 07:50:08 GMT."
  - title: "Marblism pricing"
    url: "https://www.marblism.com/pricing"
    note: "$24/mo on the yearly option, $44/mo monthly, 50 monthly hours, seven AI employees including receptionist Rachel, top-ups when hours run out. HTTP Date 07:50:08 GMT."
  - title: "Lindy pricing"
    url: "https://www.lindy.ai/pricing"
    note: "$29.99 per active user per month for 3,000 credits. Everyday asks are 2–250 credits, including drafting a reply. Outside actions wait for approval. MCP is listed. HTTP Date 07:50:09 GMT."
  - title: "Intercom pricing"
    url: "https://www.intercom.com/pricing"
    note: "Fin $0.99 per outcome. An outcome includes a completed Procedure and a handoff. Essential seat prints $29 and $19 with the line New customers save 35%. HTTP Date 07:50:10 GMT."
  - title: "Zendesk pricing"
    url: "https://www.zendesk.com/pricing/"
    note: "Automated resolution $1.50 committed and $2.00 pay-as-you-go, only with no escalation to a human. Comparison columns print 5, 5, and 10 included resolutions per agent per month under Support Team, Suite Team, and Suite Professional. Seats paid yearly: $19, $55, $115. HTTP Date 07:50:10 GMT."
  - title: "Tidio pricing"
    url: "https://www.tidio.com/pricing/"
    note: "Lyro AI Agent starts at $32.50/mo from 50 Lyro conversations. A Lyro conversation has at least one AI reply. Human handoff is a listed feature. HTTP Date 07:50:10 GMT."
  - title: "11x Outbound pricing"
    url: "https://www.11x.ai/products/alice/pricing"
    note: "Growth starting at $36,000/yr, billed annually, up to 5 end users, 2,000 new prospects a month. Priced per lead, not per send. The $3,750 card from this site’s November 11 reading is not in this HTML. HTTP Date 07:50:09 GMT."
  - title: "AiSDR pricing"
    url: "https://aisdr.com/pricing/"
    note: "$1.50 per person prospected, no monthly fee, billed daily. Campaigns starting from $7.50 in one FAQ answer and from $3 in a later answer. Co-pilot mode is listed. The $149 managed add-on says you review and approve before anything sends. HTTP 200 at 07:55:15 GMT."
  - title: "Artisan pricing"
    url: "https://www.artisan.co/pricing"
    note: "No dollar. Plans sized to lead volume, mailboxes, and dialer seats. Guardrails sentence: approvals, escalation rules, and when a human steps in. HTTP Date 07:50:09 GMT."
  - title: "Goodcall pricing and FAQ"
    url: "https://www.goodcall.com/pricing"
    note: "Starter $79 a month, 100 unique customers, then 79 cents. No minute meter. FAQ at 07:54:45 GMT: month to month, no annual plan, set up a human escalation contact. An external tool can be an MCP server. Pricing page HTTP Date 07:50:10 GMT."
  - title: "Phonely pricing"
    url: "https://www.phonely.ai/pricing"
    note: "Starter $50 a month billed monthly, or $33 a month billed annually, marked 33% off. Card says 200 minutes. Comparison table says 250 minutes included. Overage $0.25/min on Starter. Post-transfer minutes can still bill. HTTP Date 07:50:11 GMT."
  - title: "Synthflow pricing"
    url: "https://synthflow.ai/pricing"
    note: "No dollar and no per-minute rate. Annual enterprise agreement. The page lists escalation paths, handoffs, and fallback logic as scope. HTTP Date 07:50:11 GMT."
  - title: "Digits pricing"
    url: "https://digits.com/pricing/"
    note: "Essentials $65/mo, Core $100/mo, Pro $250/mo. 24/7 AI bookkeeping. Developer API and MCP on every plan. Bill pay is drag, drop, approve, pay. Verified financials may need a professional review. HTTP Date 07:50:11 GMT."
  - title: "Kick pricing"
    url: "https://kick.co/pricing"
    note: "Basic card prints $40/mo and $480 billed annually. MCP read/write, and approvals that preview and confirm MCP or CLI changes before a write to the books. HTTP Date 07:50:12 GMT."
  - title: "Truewind startup pricing"
    url: "https://www.truewind.ai/solutions/startups/pricing"
    note: "No dollar. Book a demo. Reviewer routing and approval configuration are listed. The page addresses growth-stage finance teams. HTTP Date 07:50:12 GMT."
  - title: "HubSpot customer agent"
    url: "https://www.hubspot.com/products/artificial-intelligence/ai-customer-service-agent"
    note: "Messaging $0.50 per resolution. Voice $0.50 per minute. A resolution is support provided, and the conversation not handed to a human for 72 hours, or a lead qualification. Requires Professional or Enterprise. Not in the fifteen. HTTP Date 07:53:41 GMT."
  - title: "Frontdesk pricing"
    url: "https://www.myaifrontdesk.com/pricing"
    note: "Business-in-a-Box $99/mo or $79/mo billed annually, 200 voice minutes. Overage voice is 25 credits a minute and 1 credit is $0.01. Outside the fifteen. HTTP Date 07:50:12 GMT."
  - title: "Pilot pricing"
    url: "https://pilot.com/pricing"
    note: "Essentials $99/month up to $100,000 in monthly expenses. The card says AI categorizes, reconciles, and closes the books monthly. Core’s dollar rendered as $0 in the HTML and is unused. Outside the fifteen. HTTP Date 07:50:12 GMT."
  - title: "BLS Occupational Outlook Handbook, May 2025 wages"
    url: "https://www.bls.gov/ooh/office-and-administrative-support/receptionists.htm"
    note: "Receptionists $18.27 an hour. Bookkeeping clerks $24.36 an hour and $50,670 a year. Customer service representatives $21.53 an hour. Secretaries and administrative assistants $23.23 an hour. Related occupation on the customer-service page: wholesale and manufacturing sales representatives, $76,460. Fetched 07:50:12–07:50:13 GMT."
citation:
  apa: "AI Agents Info. (2026, November 12). 12 of 15 AI employee products print a price (Nov 12, 2026). https://www.aiagentsinfo.com/research/ai-employee-pricing-small-business-november-2026"
  bibtex: |
    @misc{aiagentsinfo2026aiEmployeePrices,
      title={12 of 15 AI Employee Products Print a Price (Nov 12, 2026)},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/ai-employee-pricing-small-business-november-2026},
      note={Vendor pricing pages fetched 2026-11-12. Median of seven fixed subscription cards is $33 a month}
    }
ledeQuestion: "How many AI employee products publish a price?"
ledeAnswer: "12 of 15, on the pricing pages fetched November 12, 2026. Artisan, Synthflow, and Truewind print no dollar. The median of the seven fixed subscription cards is $33 a month."
faq:
  - question: "How many AI employee products publish a price in November 2026?"
    answer: "12 of the 15 pricing pages fetched on November 12, 2026 print a dollar. Artisan, Synthflow, and Truewind do not. The set is three products for each of five jobs: inbox, support, outbound, phone, and bookkeeping."
  - question: "What is the median monthly cost of an AI employee?"
    answer: "Among the seven products that print a fixed subscription, the median of the lowest card is $33 a month. That is Phonely’s annual starter. The figure uses Sintra’s $15.60 yearly card. Use Sintra’s FAQ start of $48.50 instead and the median of those seven cards is $40. The six distinct month-to-month cards, with Kick excluded, have a median of $49.25."
  - question: "What does an AI SDR cost per prospect?"
    answer: "AiSDR prints $1.50 per person prospected and no monthly fee. 11x Growth prints $36,000 a year for up to 2,000 new prospects a month. At that cap the 11x year is also $1.50 a prospect. At 100 people in a month, AiSDR is $150 and 11x is still $3,000. Artisan prints no dollar."
  - question: "How does an AI bookkeeper compare with a part-time clerk?"
    answer: "Eighty hours at the BLS May 2025 median for bookkeeping clerks, $24.36, is $1,948.80 in wages before benefits. Digits Essentials is $65 a month. Kick Basic prints $40. Neither pricing page sells a per-transaction rate, and both still expect a person on the review."
  - question: "Does handing a support ticket to a person still cost money?"
    answer: "On Intercom, a completed Procedure includes a handoff, and Fin charges $0.99 once per conversation. On Zendesk, the $1.50 or $2.00 automated resolution applies only when no human takes the ticket. On HubSpot’s customer-agent page, a handoff to a human within 72 hours means that conversation is not a $0.50 resolution, and qualifying a lead can still be one."
---

**12 of 15.** That is how many of these AI-employee pricing pages print a dollar on November 12, 2026. Artisan, Synthflow, and Truewind do not.

The other finding is the shape of the bill, not a single “AI employee salary.” Seven products print a fixed subscription. The lowest card on each, sorted, is **$15.60, $24, $29.99, $33, $40, $65, and $79**. The median is **$33**. That card is Phonely’s annual starter. It is not the price of a month you can cancel, and it is not the price of a resolution or a prospect.

[AiSDR](https://aisdr.com/pricing/) is **$1.50 per person prospected**, with no monthly fee. [11x Growth](https://www.11x.ai/products/alice/pricing) is **$36,000 a year**. Fill the 2,000-prospect cap and that year is also $1.50 a prospect. Contact 100 people and 11x is still $3,000 for the month. The jobs these meters buy, and where each job fails, are [AI employee for a small business: 5 jobs (Nov 2026)](/blog/ai-employee-for-small-business-november-2026). The November 11 reading of a different mix is [How much does an AI employee cost for a small business?](/blog/how-much-does-an-ai-employee-cost). A token bill for a model you call yourself is the [AI agent cost calculator](/agent-cost-calculator). It does not price these seats. A workspace priced the next day, and absent from these fifteen, is [OpenBot for Business: $2,075 for 100 people](/blog/openbot-for-business-pricing-november-2026). The first 25 active users on that page are $29. The next 75 are $18.

## What each of the fifteen pages actually prints

Three vendors per job. The third outbound, phone, and bookkeeping rows are the pages that do not print a dollar. Leaving them out would make “everyone publishes a price” true by selection.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Product</th>
<th>Job</th>
<th>What the agent does, on the pricing page</th>
<th>Price</th>
<th>Unit</th>
<th>Human control on that page</th>
<th>Accessed</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://sintra.ai/pricing">Sintra</a></td>
<td>Inbox and office</td>
<td>Twelve named helpers, including support, email, and sales. Shared Brain AI. 250 credits on every card.</td>
<td>$15.60/mo on the 12-month card, beside a struck $52. The 1-month card is $48.50 beside $97. The 3-month card is $23.60 beside $59. The FAQ says pricing starts from $48.50/mo.</td>
<td>Subscription, plus credits. Helpers also print $39/mo and are labeled included with Sintra X.</td>
<td>Not stated. The fetch does not contain an approval rule for sends.</td>
<td>Nov 12, 2026, 07:50 UTC</td>
</tr>
<tr>
<td><a href="https://www.marblism.com/pricing">Marblism</a></td>
<td>Inbox and office</td>
<td>Seven roles: inbox, social, leads, website, SEO, phone (Rachel), contracts. 50 hours a month.</td>
<td>$24/mo yearly, or $44/mo monthly.</td>
<td>Subscription sized by metered hours. Hours reset. The page says you can buy top-ups.</td>
<td>Not stated as a send gate. Rachel is described as answering and transferring calls.</td>
<td>Nov 12, 2026, 07:50 UTC</td>
</tr>
<tr>
<td><a href="https://www.lindy.ai/pricing">Lindy</a></td>
<td>Inbox and office</td>
<td>A teammate for inbox, calendar, meetings, phone, and other roles. Everyday asks, including drafting a reply, are 2–250 credits.</td>
<td>$29.99 per active user per month for 3,000 credits. Top-ups are $10 per 1,000 credits.</td>
<td>Per active user, plus credits. Monthly credits do not roll over. Anyone who @mentions Lindy in Slack takes a seat.</td>
<td>Yes. Anything with outside impact waits for approval: a send, a ticket update, a post, a published doc. Read-only lookups do not. MCP is listed.</td>
<td>Nov 12, 2026, 07:50 UTC</td>
</tr>
<tr>
<td><a href="https://www.intercom.com/pricing">Intercom Fin</a></td>
<td>Support</td>
<td>AI agent for customer conversations. One charge per conversation.</td>
<td>$0.99 per Fin outcome. Essential prints $29 and $19 per seat per month, with “New customers save 35%.”</td>
<td>Per outcome, plus a seat if you use Intercom. Fin on another helpdesk has a minimum commitment. The page’s example is 50 outcomes.</td>
<td>A handoff can be the outcome. The page counts an outcome when the customer confirms, when the customer does not ask for more help, or when Fin completes a Procedure, including a handoff.</td>
<td>Nov 12, 2026, 07:50 UTC</td>
</tr>
<tr>
<td><a href="https://www.zendesk.com/pricing/">Zendesk AI agents</a></td>
<td>Support</td>
<td>AI agents on Support or Suite. You pay when the agent resolves the request with no human escalation.</td>
<td>$1.50 committed, or $2.00 pay-as-you-go. Support Team is $19 per agent per month paid yearly. Suite Team is $55. Suite Professional is $115.</td>
<td>Per automated resolution, plus a human seat. Included resolutions on the comparison: 5, 5, and 10 per agent per month, in that plan order.</td>
<td>The charge is the absence of a human. The page also says you can monitor the agent’s steps and give feedback.</td>
<td>Nov 12, 2026, 07:50 UTC</td>
</tr>
<tr>
<td><a href="https://www.tidio.com/pricing/">Tidio Lyro</a></td>
<td>Support</td>
<td>Lyro replies from support content. A Lyro conversation is an interaction with at least one AI reply.</td>
<td>Starts at $32.50/mo, from 50 Lyro conversations. The first 50 on an account are described as free and one-off until you buy the monthly limit.</td>
<td>Subscription that starts at a conversation allowance. Not a single printed per-resolution rate.</td>
<td>Human handoff is a listed feature. A human reply is a separate “billable conversation,” and Lyro’s replies are not counted as that.</td>
<td>Nov 12, 2026, 07:50 UTC</td>
</tr>
<tr>
<td><a href="https://www.11x.ai/products/alice/pricing">11x Outbound</a></td>
<td>Outbound</td>
<td>Prospecting, email and social, meeting booking. Up to 5 end users on Growth. Onboarding is included, standard window two weeks.</td>
<td>Starting at $36,000 a year, billed annually. Pro and Enterprise are custom.</td>
<td>Per lead, not per send, inside an annual floor. Growth includes 2,000 new prospects a month.</td>
<td>Not stated on the pricing page.</td>
<td>Nov 12, 2026, 07:50 UTC</td>
</tr>
<tr>
<td><a href="https://aisdr.com/pricing/">AiSDR</a></td>
<td>Outbound</td>
<td>Ami builds and runs outbound. Research, lists, and writing are inside the per-person price. Replies in 5–10 minutes, or co-pilot mode.</td>
<td>$1.50 per person prospected. No monthly fee. One FAQ says campaigns start at $7.50. A later answer says campaigns start from $3.</td>
<td>Per person contacted, billed daily. Team plans, for 1,000 or more people a month, say up to 40% lower and do not print that rate. A warmed mailbox is $33. A managed campaign is $149, and you approve before it sends. Fully managed is $2,500/mo.</td>
<td>Co-pilot is a listed mode, not the default sentence. The approval sentence is on the $149 add-on.</td>
<td>Nov 12, 2026, 07:55 UTC</td>
</tr>
<tr>
<td><a href="https://www.artisan.co/pricing">Artisan Ava</a></td>
<td>Outbound</td>
<td>Finds leads, writes outreach, handles replies. The page says reps dial, and Ava queues the calls.</td>
<td>Not public.</td>
<td>Credits, scoped on a call to lead volume, mailboxes, and dialer seats.</td>
<td>Yes, as a sentence: you set approvals, escalation rules, and when a human steps in. No dollar next to it.</td>
<td>Nov 12, 2026, 07:50 UTC</td>
</tr>
<tr>
<td><a href="https://www.goodcall.com/pricing">Goodcall</a></td>
<td>Phone</td>
<td>AI phone agent. Answers, books, or takes a message. Starter includes 5 workers you add. A worker is a booker, a message taker, or a knowledge expert.</td>
<td>$79 a month for 100 unique customers, then 79¢. Growth is $129 for 500, then 26¢. Scale is $299 for 2,000, then 15¢.</td>
<td>Per unique customer, one phone number once a month. Not per minute. The FAQ says every plan is month to month and there is no annual plan.</td>
<td>You choose who receives transfers. The FAQ says to set a human escalation contact. An external tool can be an API, an MCP server, or a code block, and it counts once.</td>
<td>Nov 12, 2026, 07:50 and 07:54 UTC</td>
</tr>
<tr>
<td><a href="https://www.phonely.ai/pricing">Phonely</a></td>
<td>Phone</td>
<td>AI receptionist. Starter is self-serve, with transcripts and spam filtering. The card says about 100 calls.</td>
<td>$50/mo billed monthly, or $33/mo billed annually. The card says 33% off. Enterprise says as low as 5¢ a minute and is a sales conversation.</td>
<td>Per month for an included minute pool, then per minute. Starter overage is $0.25/min. The card says 200 minutes. The comparison table says 250 minutes included.</td>
<td>A transfer is allowed. Post-transfer minutes can still bill if Phonely’s connection stays up. SIP REFER transfers are the exception the page names.</td>
<td>Nov 12, 2026, 07:50 UTC</td>
</tr>
<tr>
<td><a href="https://synthflow.ai/pricing">Synthflow</a></td>
<td>Phone</td>
<td>Voice agents for phone conversations. The page says there is no free plan, no trial, and no rate by the minute.</td>
<td>Not public.</td>
<td>Annual enterprise agreement, scoped to volume, phone system, integrations, and launch support.</td>
<td>The scope list includes escalation paths, handoffs, and fallback logic. No price.</td>
<td>Nov 12, 2026, 07:50 UTC</td>
</tr>
<tr>
<td><a href="https://digits.com/pricing/">Digits</a></td>
<td>Bookkeeping</td>
<td>24/7 AI bookkeeping and reconciliation, financials, invoicing, bill pay, and Ask Digits. API and MCP on every plan.</td>
<td>Essentials $65/mo. Core $100/mo. Pro $250/mo. An added entity is free up to 250 transactions a year, then starts at $35/mo.</td>
<td>Per business per month. Not per transaction and not per seat.</td>
<td>Bill pay is drag, drop, approve, pay. An AI quality review checks the books. The page says verified financials may still need a professional.</td>
<td>Nov 12, 2026, 07:50 UTC</td>
</tr>
<tr>
<td><a href="https://kick.co/pricing">Kick</a></td>
<td>Bookkeeping</td>
<td>Categorization, reconciliation, and a ledger an outside agent can read and write. The product line is “doer to reviewer.”</td>
<td>Basic prints $40/mo and $480 billed annually, the same $40 rate. Free is $0 with a 250-transaction-a-year categorization cap. Plus is $100/mo. Advanced is $300/mo.</td>
<td>Per month. The card contains both “$480 billed annually” and the words “Billed monthly.” This note uses the printed $40 and does not invent a higher monthly price.</td>
<td>Yes. Approvals preview and confirm MCP or CLI changes before they write to the books. MCP is on the Basic card.</td>
<td>Nov 12, 2026, 07:50 UTC</td>
</tr>
<tr>
<td><a href="https://www.truewind.ai/solutions/startups/pricing">Truewind</a></td>
<td>Bookkeeping</td>
<td>Close workflows for growth-stage finance teams. The page describes reviewer routing and an audit trail.</td>
<td>Not public.</td>
<td>Not stated. The path is “Book a demo.”</td>
<td>Yes, as implementation scope: reviewer routing, approval configuration, and reviewer ownership. No price.</td>
<td>Nov 12, 2026, 07:50 UTC</td>
</tr>
</tbody>
</table>
</div>

Two more pages were fetched and left out of the fifteen so the set stayed at three per job. [Frontdesk](https://www.myaifrontdesk.com/pricing) is $99 a month, or $79 billed annually, for 200 voice minutes. Voice overage is 25 credits a minute, and the page says 1 credit is $0.01, so the overage minute is $0.25. [Pilot](https://pilot.com/pricing) Essentials is $99 a month, up to $100,000 in monthly expenses, and the card says AI categorizes, reconciles, and closes monthly. Pilot Core rendered as $0 in the HTML. That is not a price.

## The $33 median is seven cards, not fifteen bills

Per-outcome, per-person, and “starts at” prices do not go into a monthly median. Tidio’s $32.50 is a floor for 50 conversations, not a fixed card with a single included bundle you can point at. 11x’s $36,000 is a year. Fin’s $0.99 is a conversation. Folding them into one median would invent a unit.

The seven fixed cards, lowest figure printed:

| Product | Lowest card | What that card is | Month-to-month figure on the same page |
| --- | --- | --- | --- |
| Sintra | $15.60 | 12-month card | $48.50 |
| Marblism | $24 | Yearly | $44 |
| Lindy | $29.99 | Per active user, no separate annual dollar on the page | $29.99 |
| Phonely | $33 | Annual starter, marked 33% off | $50 |
| Kick | $40 | Basic, and $480 billed annually is the same rate | No second dollar |
| Digits | $65 | Essentials, per month | $65 |
| Goodcall | $79 | Starter, and the FAQ says there is no annual plan | $79 |

Sorted lowest cards: $15.60, $24, $29.99, $33, $40, $65, $79. Seven values, so the median is the fourth, **$33**.

Swap Sintra’s yearly card for the FAQ’s $48.50 and the list is $24, $29.99, $33, $40, $48.50, $65, $79. The median becomes **$40**. The $33 result depends on treating the promotional yearly card as the price.

The six pages that print a distinct month-to-month dollar, Kick excluded, sort to $29.99, $44, $48.50, $50, $65, $79. The median of six is the mean of $48.50 and $50, which is **$49.25**. Add 11x as $3,000 a month ($36,000 divided by 12) onto the seven lowest cards and the eight-value median is the mean of $33 and $40, which is **$36.50**. The contract does not move the middle by much. It changes the left tail, not the buyer who only has 100 prospects.

## Where a wage has a number, and where it does not

BLS wages below are May 2025 medians, read November 12, 2026. They exclude benefits, payroll tax, and software. Eighty hours is four weeks of 20 hours. It is a part-time line this page defined so the plans can be set next to a wage. It is not a measured shop.

| Work | Wage arithmetic | Software figure from the same morning | What the comparison cannot do |
| --- | --- | --- | --- |
| Receptionist, 80 hours | $18.27 × 80 = $1,461.60 | Goodcall Starter $79, which is 5.4% of that wage, for 100 unique customers. Phonely’s $50 card divided by the card’s 200 minutes is $0.25 a minute. One minute of the receptionist wage is $18.27 / 60 = $0.3045. | A receptionist also covers the door. The software covers a phone line and a cap. |
| Bookkeeping clerk, 80 hours | $24.36 × 80 = $1,948.80 | Digits Essentials $65, 3.3% of that wage. Kick Basic $40, 2.1%. | Neither page prices a transaction. The close and the tax return are not in the $65. |
| Customer service, one 6-minute ticket | $21.53 × 0.1 = $2.153 | Fin $0.99. Zendesk committed $1.50. Zendesk pay-as-you-go $2.00. HubSpot $0.50, if you already have Professional or Enterprise. | Eight hundred such tickets fill 80 hours. At $2.00 that is $1,600, which is 93% of the $1,722.40 wage line, before the human seat. |
| Secretary, one hour | $23.23 | No product in the fifteen sells scheduling as its own meter. | A calendar tool is not an employee price. The scheduling shelf is a different page. |

Goodcall’s pricing page says that at four-minute calls, Starter works out to about 13¢ a minute. The page also says Starter is about 150 calls. One hundred and fifty calls times four minutes is 600 minutes, and $79 / 600 is $0.132. The billed unit is still $0.79 per unique customer ($79 / 100). A caller who phones five times is one customer. A four-minute call at the receptionist wage is 4 × $0.3045 = $1.22. Goodcall’s $0.79 is under that only if you accept one customer as the unit and you do not add a person who has to fix the booking.

Phonely’s minute is the awkward one. $0.25 is 82% of a minute of median receptionist wages ($0.25 / $0.3045). The savings are not “AI minutes are cheap.” The savings are the hours nobody sits by the phone, and the concurrent calls the Starter card marks unlimited. If the comparison table’s 250 included minutes is the real pool, $50 / 250 is $0.20, and the card’s 200 minutes are the number that makes the included minute equal the overage. This note does not resolve the contradiction. A buyer should read the checkout.

HubSpot’s voice price, on the customer-agent page, is $0.50 a minute, which is above the $0.3045 wage minute. Messaging is $0.50 a resolution, and only on Professional or Enterprise. The seat under that resolution is not on the page, so it is not in the median.

## Two SDRs print $1.50. Only one of them lets you stop

11x’s FAQ says the company charges per lead, not per send, and that Growth starts at $36,000 a year. Divide the year by 12 and the floor is $3,000 a month. Divide $36,000 by 2,000 prospects times 12 months and the cap price is $1.50 a prospect. That is the same unit AiSDR prints on the door, and AiSDR does not require the year.

One hundred people in a month:

- AiSDR, at the printed rate: 100 × $1.50 = **$150**.
- 11x Growth, if you are on the floor: **$3,000**, whether those 100 people were the whole month.

The ratio is 20. It collapses only when you actually use the 2,000-prospect allowance. A shop that sends a few dozen cold emails is paying for a cap it will not touch. 11x also says a fully loaded SDR costs $8,000 to $12,000 a month. That sentence is 11x’s. The BLS related-occupation median for wholesale and manufacturing sales representatives is $76,460 a year, which is $6,371.67 a month of wages if you divide by 12, not a loaded SDR cost, and not this occupation’s job title.

AiSDR’s own page disagrees with itself about the smallest campaign. “Campaigns starting from $7.50” is five people at $1.50. “Campaigns start from as little as from $3” is on a later answer. Two people at $1.50 would be $3. The page does not say that. Treat $1.50 as the rate and $7.50 as the floor the FAQ is willing to repeat. Do not budget $3 until a checkout shows it.

The approval sentence is not on the $1.50 line. It is on the $149 managed-campaign add-on: you review and approve before anything sends. The default feature list says replies go out in 5–10 minutes or in co-pilot mode. Those are different grants. Artisan says you set the guardrails and does not show the price. A guardrail you cannot cost is not a budget.

On November 11 this site’s cost guide recorded an 11x Growth card of $3,750 a month beside an FAQ of $36,000. The HTML fetched November 12 at 07:50 UTC prints “Starting at $36,000 / yr” and the FAQ matches it. The $3,750 string is not in that file. Use $36,000 until a newer fetch says otherwise. The November 11 table remains a record of that day.

## What this means if you are the buyer

Pay for a unit you can count, and read the sentence that defines the unit before you connect the tool.

A subscription under $80 a month is a real card for the phone (Goodcall, $79, month to month) and for the books (Digits $65, Kick $40). It buys categorization or call answering inside a cap. It does not buy a reviewer. Kick states the reviewer in the product: confirm the write before it hits the ledger. Digits states it as bill-pay approval and as an optional professional on verified financials. Truewind states the reviewer and withholds the price. If the close is the work you needed, the $40 card is the wrong object.

A support agent is cheap per ticket only inside the vendor’s definition. Fin’s $0.99 can be the moment the customer asks for a person. Zendesk’s $2.00 is the month you avoided that person, and at a full part-time queue of 6-minute tickets it sits within a few percent of the wage. HubSpot’s $0.50 is a resolution that survived 72 hours without a handoff, or a lead the agent qualified, and it assumes a Professional or Enterprise subscription this page did not price.

An outbound agent at $1.50 a person is a meter you can stop. The same $1.50 inside a $36,000 year is a hire. Do not sign the year to “try AI.” Artisan will not tell you which of those two you are buying until the demo.

Before any of them send, write the stop rule down. Lindy already waits on outside actions. The others need the same [approval gate](/glossary/approval-gate). The [harness](/glossary/harness) is that loop, the tools, the memory, and the stop. The job title on the invoice is not. A worked example against your own volume is the [AI agent ROI calculator](/tools/ai-agent-roi-calculator). It will not discover a credit band the vendor did not print.

## Frequently asked questions

### How many of these products publish a price?

Twelve of the fifteen pages fetched on November 12, 2026. The three without a dollar are Artisan, Synthflow, and Truewind. Each of those three still describes a human step. None of them lets you cost it.

### Why is the median $33 and not $49?

They answer different questions. $33 is the middle of the seven lowest cards, including yearly rates. $49.25 is the middle of the six month-to-month prices that are printed as their own dollars. A buyer who can cancel this month should use the second figure and then read the cap, because Goodcall at $79 and Digits at $65 are both in that list and they buy different jobs.

### Is $1.50 the price of an AI SDR?

It is AiSDR’s printed rate per person prospected, and it is 11x’s rate only if you divide the $36,000 year by a full 24,000 prospects. It is not Artisan’s price, because Artisan does not print one. It is not a wage.

### Does a part-time hire still win on the phone?

On the wage minute, barely, for Phonely. $0.25 is close to $0.3045. The software wins when the alternative is a person sitting there for the empty hours, which is the $1,461.60 line, not the minute. It loses when someone has to redo the call, and when post-transfer minutes keep the meter running.

### What should you ignore in a vendor’s competitor table?

Prices that vendor prints for other companies’ tools. AiSDR’s page lists “from” prices for products such as Clay and Outreach under “software you’ll no longer need.” Those figures were not checked on those companies’ own pages, so they are not in this dataset.
---
