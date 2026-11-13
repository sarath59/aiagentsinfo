---
title: "A Devin ACU has no public price (Nov 12, 2026)"
description: "No public page prints a dollar per Devin ACU. Read November 12, 2026, Enterprise ACUs are the order form, and 1 GitHub AI credit is $0.01. A typical GPT-5.6 Sol task is 2–15 Codex credits, with no dollar on the credit."
date: "2026-11-12"
updated: "2026-11-12"
type: original-report
topics:
  - tools-saas
  - task-performance
  - how-agents-work
companies:
  - devin
  - claude-code
  - codex
  - cursor
  - github-copilot
contentLicense: true
absoluteTitle: true
dataset:
  title: "Coding-agent billing units and published prices, read November 12, 2026"
  description: "The billing unit and the published price for Devin, Claude Code, Codex, Cursor, GitHub Copilot, Windsurf, Jules, Amp, Factory, and Replit Agent, copied from each vendor's pricing or billing page on November 12, 2026. A cell that says not published had no dollar for that unit in the fetch. Task figures are the vendor's own, where a page printed one. No account was billed."
  isBasedOn: "https://docs.devin.ai/admin/billing"
abstract: |
  No public page prints a dollar per Devin ACU. Cognition's billing docs, fetched November 12, 2026, bill Enterprise customers in Agent Compute Units at the rate in the order form, and they tell you to contact sales. Self-serve Devin is a different meter: a quota, then on-demand credits, with extra usage at API pricing and no printed price for a message.

  Across the ten coding agents read the same morning, the only unit with a fixed public dollar is GitHub's. One AI credit is $0.01. A typical Copilot code review, which is not the cloud coding agent, averages $0.25, $1.50, or $10 by effort level. Codex says a typical GPT-5.6 Sol task may use 2–15 credits and does not print a dollar for the credit.
whyItMatters: |
  The query behind this note is what an ACU costs. The Devin directory row answers with seat prices. The seat is real, and it is not an ACU. A buyer who divides $20 by an imagined number of pull requests has invented the cost per task.

  Claude Code and Codex seat prices are a separate comparison. This note is the unit under the seat, for ten products, on one morning.
keyFindings:
  - "Devin Enterprise is billed in ACUs at the order-form rate. The billing docs, the enterprise page, and devin.ai/pricing, all fetched November 12, 2026, print no dollar per ACU. Self-serve extra usage is API pricing in dollars, not ACUs."
  - "One GitHub AI credit is $0.01. Copilot Pro is $10 a month and includes 1,500 credits. Copilot's published typical cost is for code review, not for the cloud agent: average $0.25, $1.50, or $10 by effort. The cloud agent has no such number."
  - "Codex prices a typical GPT-5.6 Sol task at 2–15 credits. The same page says credit purchase prices depend on the plan or agreement and does not print a dollar per credit. Plus local-message ranges are estimates, not prices."
  - "Claude Code, Cursor, Factory, and Replit publish a seat and a pool. None of those four pages prints a dollar for a finished coding task. Amp's own example deducts $2.50 for a thread that used $2 of Anthropic and $0.50 of OpenAI. Amp does not call that thread typical."
  - "Jules bills tasks: 15, 100, or 300 a day. The Jules page prints no dollar. Google AI Pro, which Jules says includes Jules in Pro, is $19.99 a month on a Google page that does not name Jules. windsurf.com returned HTTP 308 to Devin Desktop."
methodology: |
  The set is ten coding agents named for this census: Devin, Claude Code, Codex, Cursor, GitHub Copilot, Windsurf, Jules, Amp, Factory, and Replit Agent. Each one had to have a public pricing or billing URL. Windsurf's URL was requested because the product name is still in buyer searches. The response was a redirect, not a price list.

  Pages were fetched on November 12, 2026. Devin's billing, enterprise, and self-serve docs returned HTTP 200 at 13:42:34 GMT. devin.ai/pricing returned HTTP 200 at 13:42:35 GMT. The April 14, 2026 Cognition post on the self-serve change returned HTTP 200 at 13:42:35 GMT. The Devin usage doc returned HTTP 200 at 13:44:09 GMT. claude.com/pricing returned HTTP 200 at 13:42:35 GMT. chatgpt.com/codex/pricing returned HTTP 200 at 13:42:53 GMT. cursor.com/docs/models-and-pricing returned HTTP 200 at 13:42:35 GMT. GitHub's individual billing doc and plans doc returned HTTP 200 at 13:42:36 GMT. The Copilot models-and-pricing doc returned HTTP 200 at 13:42:51 GMT. Jules usage limits returned HTTP 200 at 13:42:36 GMT. gemini.google/subscriptions returned HTTP 200 at 13:44:09 GMT. ampcode.com/docs/pricing returned HTTP 200 at 13:42:37 GMT. factory.com/pricing returned HTTP 200 at 13:42:37 GMT, including the request to factory.ai/pricing. Replit's AI billing doc and replit.com/pricing returned HTTP 200 at 13:42:37 GMT. A request to https://windsurf.com/ that did not follow redirects returned HTTP 308 at 13:44:09 GMT, with Location https://devin.ai/desktop.

  A price is a dollar figure, or a credit rate the page itself converts to dollars, in that fetch. "Not published" means the fetched page did not contain a dollar for that unit. Vendor phrases such as "a typical task may use 2–15 credits" and GitHub's review averages are copied and labeled as the vendor's. Quotients in the body, such as 1,000 GitHub credits times $0.01, are this note's multiplication. No account was created and no card was charged.
limitations:
  - "Ten products are a named set, not every coding agent. Aider, Cline, and Google Antigravity are not in the table. Antigravity is named on Google's subscriptions page. Jules is not."
  - "A list price is not an invoice. Quotas, flex credits, speed multipliers, and cache reads move the bill. Codex does not print a dollar per credit on the pricing page, so 2–15 credits is not a dollar range."
  - "Amp's fetched HTML prints one Individual price, $20 a month, and a Megawatt and Gigawatt control. It does not print a separate Gigawatt dollar. A price that loads only in the browser after this fetch is not in the table."
  - "Replit's Pro card includes a control with options at $90, $215, $425, $825, and $2,000 a month. The page does not name those options as plans in the text around the control. They are not in the seat column."
  - "GitHub's review averages are GitHub's estimates for code review. They exclude Actions minutes, and the page says actual costs can fall outside the ranges. They are not a price for Copilot cloud agent."
  - "The Jules dollar is the Google AI plan's price. Jules's own page does not print it, and Google's subscriptions page does not name Jules. The link between them is Jules's sentence that Jules in Pro is a benefit of Google AI Pro."
  - "No session was run. Devin's usage page describes what consumes an ACU or a quota unit and does not convert either unit into minutes of coding or into a pull request."
references:
  - title: "Devin docs, Billing"
    url: "https://docs.devin.ai/admin/billing"
    note: "Fetched November 12, 2026, HTTP 200 at 13:42:34 GMT. Self-serve is quota plus on-demand credits. Enterprise is ACUs at the order-form rate."
  - title: "Devin docs, Enterprise billing"
    url: "https://docs.devin.ai/admin/billing/enterprise"
    note: "HTTP 200 at 13:42:34 GMT. ACUs are priced per the order form. Enterprise ACUs are distinct from self-serve quota and on-demand credits. Contact sales."
  - title: "Devin docs, Self-serve plans"
    url: "https://docs.devin.ai/admin/billing/self-serve"
    note: "HTTP 200 at 13:42:34 GMT. Free, Pro $20, Max $200, Teams $80 minimum, full seat $40, flex seat free, up to 100 members. On-demand credits roll over and never expire. Max has a weekly allowance and no daily cap."
  - title: "Devin docs, Usage"
    url: "https://docs.devin.ai/admin/billing/usage"
    note: "HTTP 200 at 13:44:09 GMT. Enterprise consumes ACUs. Self-serve consumes quota, then on-demand credits. Windows sessions use about 9 percent more than Linux. macOS matches Linux and is labeled promotional. Sleep is 5 minutes by default. Waiting on the user, tests, or a clone does not consume usage."
  - title: "Devin pricing"
    url: "https://devin.ai/pricing"
    note: "HTTP 200 at 13:42:35 GMT. Free $0, Pro $20, Max $200, Teams $80 a month plus $40 per full seat, up to 100 users. Extra usage at API pricing. Cost per message varies. No ACU dollar."
  - title: "Cognition, New self-serve plans for Devin (April 14, 2026)"
    url: "https://cognition.com/blog/new-self-serve-plans-for-devin"
    note: "HTTP 200 at 13:42:35 GMT. Dated 2026.04.14. Self-serve usage past the quota is priced in dollars rather than ACUs. Enterprise billing continues to use ACUs. The old Team entry point cited in the post is $500 a month."
  - title: "Anthropic, Plans and pricing"
    url: "https://claude.com/pricing"
    note: "HTTP 200 at 13:42:35 GMT. Pro $20 a month or $17 with $200 billed up front. Max $100. Ultra $200. Claude Code is included on paid plans and shares the pool. Console overflow is pay-as-you-go API credits. Enterprise is $20 per seat per month plus API rates, billed annually, 20-seat minimum on the card."
  - title: "OpenAI, Codex pricing"
    url: "https://chatgpt.com/codex/pricing/"
    note: "HTTP 200 at 13:42:53 GMT. Free $0, Go $8, Plus $20, Pro from $100 with tiers at $100, $200, and $500. Business $20 per user per month for 2 or more, billed annually, or $25 monthly. A typical GPT-5.6 Sol task may use 2–15 credits. Credit purchase prices depend on the plan. API-key usage follows API pricing."
  - title: "Cursor, Models and pricing"
    url: "https://cursor.com/docs/models-and-pricing"
    note: "HTTP 200 at 13:42:35 GMT. Plus $8, Premium $30, Super $100, Ultra $200. Weekly pool for Cursor models. Third-party models at API list price from prepaid credit, Premium and above. Cursor Token Rate $0.25 per million tokens on Teams and Enterprise for eligible third-party requests. Prices exclude tax."
  - title: "GitHub Docs, Usage-based billing for individuals"
    url: "https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing"
    note: "HTTP 200 at 13:42:36 GMT. 1 AI credit is $0.01. Pro $10 and 1,500 credits. Pro+ $39 and 7,000. Max $100 and 20,000. Cloud agent consumes credits. Completions on paid plans do not. Fusion is 30 percent off model costs through November 30, 2026. Auto model selection in chat, and cloud agent, are 10 percent off, with no end date in the note."
  - title: "GitHub Docs, Plans for GitHub Copilot"
    url: "https://docs.github.com/en/copilot/get-started/plans"
    note: "HTTP 200 at 13:42:36 GMT. Business $19 per granted seat and 1,900 credits per user, pooled. Enterprise $39 and 3,900, pooled."
  - title: "GitHub Docs, Models and pricing for GitHub Copilot"
    url: "https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing"
    note: "HTTP 200 at 13:42:51 GMT. Code review estimates: Lite average $0.25, Balanced average $1.50, Max average $10. Ranges and the caveat that costs can fall outside them are on the page. Actions minutes are excluded."
  - title: "Jules, Limits and plans"
    url: "https://jules.google/docs/usage-limits/"
    note: "HTTP 200 at 13:42:36 GMT. 15, 100, and 300 daily tasks. 3, 15, and 60 concurrent. No dollar. Jules in Pro is a benefit of Google AI Pro. Jules in Ultra is a benefit of Google AI Ultra. Paid plans are for individual @gmail.com accounts. Task limits are not shared on a family plan. Age 18 or older."
  - title: "Google, Gemini subscriptions"
    url: "https://gemini.google/subscriptions/"
    note: "HTTP 200 at 13:44:09 GMT. Google AI Plus $4.99 a month. Google AI Pro $19.99. Google AI Ultra starting at $99.99, with $199.99 for the higher limit. The page does not name Jules."
  - title: "Amp, Pricing"
    url: "https://ampcode.com/docs/pricing"
    note: "HTTP 200 at 13:42:37 GMT. Hobby free. Individual card $20 a month in the HTML, with a Megawatt and Gigawatt control and 45,000 minutes of orb time in that response. No markup on provider API prices for individuals and non-enterprise workspaces. Amp's example deducts $2.50. Purchased credits expire twelve months after purchase. A paused orb costs nothing."
  - title: "Factory pricing"
    url: "https://factory.com/pricing"
    note: "HTTP 200 at 13:42:37 GMT. Free $0 with your own inference. Pro $20. Plus $100 and about 5 times Pro usage. Max $200 and about 10 times Pro usage. Teams $60 a month plus $40 per individual, up to 10 seats. Business and Enterprise print no dollar."
  - title: "Replit, AI billing"
    url: "https://docs.replit.com/billing/ai-billing"
    note: "HTTP 200 at 13:42:37 GMT. Effort-based checkpoints. Confirmation before a paid action. Third-party APIs at the provider's public rate, deducted from Replit credits. No dollar per checkpoint."
  - title: "Replit pricing"
    url: "https://replit.com/pricing"
    note: "HTTP 200 at 13:42:37 GMT. Core $20 a month or $18 billed annually, with $20 toward more powerful models. Pro $100 a month or $90 billed annually, with $100 toward the most powerful models. Up to 30 hours of Free Mode chat and up to 60 projects on the Core card."
  - title: "Windsurf redirect"
    url: "https://windsurf.com/"
    note: "HTTP 308 at 13:44:09 GMT. Location https://devin.ai/desktop. No price in that response."
citation:
  apa: "AI Agents Info. (2026, November 12). A Devin ACU has no public price (Nov 12, 2026). https://www.aiagentsinfo.com/research/coding-agent-billing-units-november-2026"
  bibtex: |
    @misc{aiagentsinfo2026codingAgentBilling,
      title={A Devin ACU Has No Public Price (Nov 12, 2026)},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/coding-agent-billing-units-november-2026},
      note={Vendor pricing and billing pages fetched 2026-11-12. No public dollar per Devin ACU. One GitHub AI credit is 0.01 USD}
    }
ledeQuestion: "What does a Devin ACU cost?"
ledeAnswer: "No public page prints a dollar. On November 12, 2026, Cognition bills Enterprise Devin in Agent Compute Units at the rate in the order form, and self-serve Devin no longer bills in ACUs."
faq:
  - question: "How much does a Devin ACU cost?"
    answer: "Cognition does not publish a dollar per ACU. The enterprise billing page, read November 12, 2026, says Enterprise customers are billed in Agent Compute Units at the rate in their order form, and it says to contact sales. Self-serve plans bill a quota and then on-demand credits at API pricing. They do not bill ACUs."
  - question: "What is the billing unit for GitHub Copilot's coding agent?"
    answer: "GitHub AI credits. One credit is $0.01. Copilot cloud agent consumes credits. Code completions on paid plans do not. GitHub publishes a typical cost for code review, average $0.25, $1.50, or $10 by effort, and does not publish an equivalent number for a cloud-agent task."
  - question: "How many credits does a typical Codex task use?"
    answer: "The Codex pricing page, read November 12, 2026, says a typical GPT-5.6 Sol task may use 2 to 15 credits. The same page says credit purchase prices depend on the plan or agreement. It does not print a dollar per credit, so those 2 to 15 credits are not a dollar range."
  - question: "Does Windsurf still have its own price?"
    answer: "A request to windsurf.com on November 12, 2026 returned HTTP 308 to https://devin.ai/desktop. That response had no Windsurf price. Devin's self-serve docs still link Devin Desktop at windsurf.com, which is the URL that redirects."
  - question: "Which of these coding agents publishes a cost per task?"
    answer: "GitHub publishes estimated dollars for a code review. Codex publishes a credit range for a typical GPT-5.6 Sol task and does not price the credit. Amp publishes an example deduction of $2.50 and does not call it typical. Devin, Claude Code, Cursor, Jules, Factory, and Replit do not publish a dollar for a finished coding task."
---

**No public page prints a dollar per Devin ACU.** Cognition’s billing docs, fetched November 12, 2026, bill Enterprise customers in Agent Compute Units at the rate in the order form. Self-serve Devin is a quota, then on-demand credits, and extra usage is API pricing. The [pricing page](https://devin.ai/pricing) lists Free at $0, Pro at $20, Max at $200, and Teams at $80 plus $40 a seat. It does not list an ACU.

Of the ten coding agents read the same morning, GitHub is the one that pins its unit to a cent. **One AI credit is $0.01.** A typical Copilot code review averages **$0.25, $1.50, or $10**, depending on the effort level GitHub names. That review is not the cloud coding agent. Codex is the one that prices a typical model task in its own unit: a GPT-5.6 Sol task **may use 2–15 credits**, and the page does not say what a credit costs in dollars.

Seat prices for Claude Code and Codex, without this wider unit table, are [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing). The Devin product row is [Devin](/directory/devin). A seat is still not a runtime hour. The 720-hour clocks, including the $57.60 Claude running month and the products that print no hour, are [720 hours of Claude agent runtime is $57.60](/research/always-on-ai-agent-cost-november-2026).

## Ten agents, and the unit each one actually sells

A seat is not a task. The column that matters is the unit the vendor meters after you have paid the seat, and whether that unit has a public price.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Agent</th>
<th>Unit</th>
<th>Published price of the unit or the seat</th>
<th>Cost of a task, if the vendor printed one</th>
</tr>
</thead>
<tbody>
<tr>
<td>Devin, Enterprise</td>
<td>Agent Compute Unit</td>
<td>Not published. The order form sets the rate.</td>
<td>Not published. Windows sessions use about 9% more than Linux.</td>
</tr>
<tr>
<td>Devin, self-serve</td>
<td>Quota, then on-demand credits at API pricing</td>
<td>Pro $20, Max $200, Teams $80 minimum plus $40 per full seat. Flex seats are $0. Up to 100 members.</td>
<td>Not published. The pricing page says cost per message varies.</td>
</tr>
<tr>
<td>Claude Code</td>
<td>Shared plan pool, or API credits</td>
<td>Pro $20 a month, or $17 if you pay $200 up front. Max $100. Ultra $200. Enterprise $20 per seat per month plus API rates, billed annually.</td>
<td>Not published. The FAQ says there is no fixed message count.</td>
</tr>
<tr>
<td>Codex</td>
<td>Plan allowance, then credits. An API key bills tokens.</td>
<td>Free $0, Go $8, Plus $20, Pro $100, $200, or $500. Business $20 per user a month annually, or $25 monthly. No dollar per credit on this page.</td>
<td>A typical GPT-5.6 Sol task may use 2–15 credits. Not a dollar.</td>
</tr>
<tr>
<td>Cursor</td>
<td>Weekly usage pool, then tokens</td>
<td>Plus $8, Premium $30, Super $100, Ultra $200. Teams and Enterprise add $0.25 per million tokens on eligible third-party requests.</td>
<td>Not published.</td>
</tr>
<tr>
<td>GitHub Copilot</td>
<td>AI credit. 1 credit = $0.01.</td>
<td>Pro $10 and 1,500 credits. Pro+ $39 and 7,000. Max $100 and 20,000. Business $19 and 1,900 pooled. Enterprise $39 and 3,900 pooled.</td>
<td>Code review averages $0.25, $1.50, or $10. Cloud agent: not a number.</td>
</tr>
<tr>
<td>Windsurf</td>
<td>None on the response</td>
<td>HTTP 308 to Devin Desktop. No price.</td>
<td>Not published.</td>
</tr>
<tr>
<td>Jules</td>
<td>Task, rolling 24 hours</td>
<td>15, 100, or 300 tasks a day. Jules prints no dollar. Google AI Pro is $19.99 on a page that does not name Jules.</td>
<td>A task is the unit. No dollar per task.</td>
</tr>
<tr>
<td>Amp</td>
<td>Provider API dollars, plus orb minutes</td>
<td>Individual card $20 a month in the fetched HTML. No markup on provider API prices for individuals and non-enterprise workspaces.</td>
<td>Amp’s example deducts $2.50. Not labeled typical.</td>
</tr>
<tr>
<td>Factory</td>
<td>Usage, as a multiple of Pro</td>
<td>Pro $20. Plus $100, about 5× Pro. Max $200, about 10× Pro. Teams $60 plus $40 a person, up to 10 seats. Free is $0 and your own inference.</td>
<td>Not published.</td>
</tr>
<tr>
<td>Replit Agent</td>
<td>Effort-based checkpoint, paid from credits</td>
<td>Core $20 a month, or $18 annually, with $20 toward stronger models. Pro $100, or $90 annually, with $100 toward the strongest.</td>
<td>Not published. The docs say a simple request typically costs less, and they do not say less than what.</td>
</tr>
</tbody>
</table>
</div>

The two Devin rows are one vendor. Windsurf is in the set because the name still resolves, and the resolution is a redirect.

## Devin’s ACU is an Enterprise contract, not a sticker

The [billing index](https://docs.devin.ai/admin/billing) splits the company in one paragraph. Self-serve, at app.devin.ai, is included quota and on-demand credits. Enterprise is ACUs at the rate set in the order form. The [enterprise page](https://docs.devin.ai/admin/billing/enterprise) repeats the rate, says to contact sales, and defines Enterprise ACUs as the work Devin performs for customers on that plan, “which adheres more strictly to task planning and end-to-end testing.” They are distinct from self-serve quota and on-demand credits. Session Insights can show the ACU cost of one session. The page does not show a sample session, and it does not show a dollar.

The [usage page](https://docs.devin.ai/admin/billing/usage) says the mechanics are the same and the unit is not. Usage accrues from the actions Devin takes, and virtual-machine time is “typically a small fraction.” Windows sessions consume approximately 9% more than equivalent Linux sessions. macOS sessions currently match Linux, and the page labels that “promotional launch pricing.” Devin does not consume usage while it waits for you, waits for a test suite, or clones a repository. It sleeps after 5 minutes of inactivity by default, or 30 minutes on some Windows and GPU sessions, and sleep is free. None of those sentences converts an ACU into a minute or a pull request.

Self-serve is the plan a person can buy without sales. [The docs](https://docs.devin.ai/admin/billing/self-serve) list Pro at $20 a month with a daily and a weekly allowance, Max at $200 with a weekly allowance and no daily cap, and Teams at an $80 a month minimum with up to 100 members. A full seat is $40 and carries a Pro-equivalent quota. A flex seat is free and draws the shared on-demand pool. With fewer than two full seats, the rest of the $80 is prepaid on-demand credit. The docs say those credits roll over and never expire. The [pricing page](https://devin.ai/pricing) says the allowance refreshes daily and weekly, that cost per message varies with the model, the task, and the reasoning, and that extra usage is consumed at API pricing. It also says Teams is up to 100 users. It does not print the API rate.

Cognition’s [April 14, 2026 post](https://cognition.com/blog/new-self-serve-plans-for-devin) is the change of unit. Past the included quota, self-serve usage “will be priced and billed in dollars rather than ACUs.” Enterprise billing “will continue to use ACUs.” The post’s old Team entry point is $500 a month. That figure is the post’s history. It is not on today’s pricing page.

If you are modeling cost per pull request on Enterprise, you need two numbers Cognition has not published: the dollar per ACU on your order form, and the ACUs a session of the size you care about actually burns. Session Insights is where the second number appears, after a run. A $20 Pro seat does not answer either question. The [directory listing](/directory/devin) is the product note. It is not an ACU rate.

## Claude Code shares a pool. Codex adds a credit table that still is not dollars.

[Claude’s pricing page](https://claude.com/pricing) puts Claude Code on the Pro card. Pro is $20 a month, or $17 a month when $200 is billed up front. Max is $100. Ultra is $200. The FAQ says Claude Code is included in all paid plans and shares the limits with the rest of Claude, so the terminal and the chats draw one pool. There is no fixed message count. Pro is at least 5 times Free per five-hour session. Max is 5 times Pro every five hours and every week. Ultra is 10 times Pro’s weekly usage, with no five-hour limit for verified accounts. Past the limit, paid plans can turn on usage credits at standard API rates. Heavy sessions can switch to pay-as-you-go API credits through a Console account. Enterprise is $20 per seat per month plus usage at API rates, billed annually, and the card adds a 20-seat minimum. The page says cost scales with model and task. It does not price a task.

[Codex pricing](https://chatgpt.com/codex/pricing/) includes Codex on Free at $0, Go at $8, Plus at $20, and Pro from $100, with plans at $100, $200, and $500. Business is $20 per user a month for two or more users billed annually, or $25 billed monthly. The page says ChatGPT uses the same pricing, credits, and usage limits as Codex. An API key pays API prices. Credit-based plans pay in credits after the included limits, and “credit purchase prices and applicable discounts depend on your plan or agreement.”

The credit table is credits per million tokens, not dollars. GPT-5.6 Sol is 100 credits of input, 10 of cached input, and 500 of output, per million tokens. GPT-6 Astra is 250, 25, and 1,250. GPT-6 Luna is 2.5, 0.25, and 12.5. The line under the table is the closest thing in this census to a published coding-task size: “A typical GPT-5.6 Sol task may use 2–15 credits.” There is no cache-write charge on Codex credit billing. Fast mode is 2.5 times included usage and 2 times purchased credits. Ultrafast on GPT-6 Astra and GPT-6.1 Sol is 8 times included usage and 6 times purchased credits. The page says GPT-5.6 Sol’s promotional pricing runs at least through November 21, 2026, and it does not print the later credit rate. None of that is a dollar until the plan’s credit price is known. This page does not invent one.

The same FAQ prints local-message estimates per five hours for Plus and Standard Business. They are estimates, shared with cloud chats, and they are not fixed limits. Pro has no five-hour limit.

| Model | Plus, local messages per five hours | Standard Business |
| --- | --- | --- |
| GPT-6 Astra | 5–45 | 5–45 |
| GPT-6.1 Sol | 15–160 | 15–160 |
| GPT-6.1 Terra | 35–285 | 35–285 |
| GPT-6 Sol | 15–150 | 15–150 |
| GPT-6 Luna | 350–3,000 | 350–3,000 |

A wide range is the point. The page says tasks that look similar can consume different amounts, because model, context, reasoning, tool use, retrieval, and caching all count. Prompt length is not the bill. Desktop voice is a second meter on the same page: $0.05 a minute of the Codex usage budget, with the task model billed separately, or 1.25 credits a minute on credit-based Business, Edu, and Enterprise workspaces. That is a voice minute inside a coding product. It is not the 2–15 credit task.

## Cursor sells a week of its own models, then a token rate

[Cursor’s pricing docs](https://cursor.com/docs/models-and-pricing) sell Cursor inside The X Subscription, shared with Grok. Paid plans include one weekly pool for Cursor’s models: Grok 4.7, Grok 4.6, Grok 4.5, and Composer 2.5. The pool covers the editor agent, the CLI, Cloud Agents, and the Grok apps. Plus is $8 a month, or $80 a year, and it does not include third-party models, Auto, Cloud Agents, or your own API keys. Premium is $30, or $300 a year, at 4 times Plus, and third-party models start there at API list price from prepaid credit. Super is $100, 15 times Plus. Ultra is $200, 50 times Plus. Annual stickers are $1,000 and $2,000. Prices exclude tax. Teams is $30, $100, or $200 a seat, matching the tier.

On Teams and Enterprise, eligible third-party requests add a Cursor Token Rate of **$0.25 per million tokens**, on top of the model’s API price, including when you bring a key. Individual plans do not pay it. Cursor’s own models do not pay it. A third-party model whose cache-read price is strictly below $0.10 per million tokens, on every tier, does not pay it. The third-party table is explicitly per million tokens. Claude Fable 5.2 on that table is $8 input, $10 cache write, $0.20 cache read, and $40 output. The Cursor-model table, above that sentence, prints Composer 2.5 as $0.50, a dash, $0.20, and $2.50 under Input, Cache Write, Cache Read, and Output, and says those rates apply past the weekly pool. This note does not copy the “per million tokens” sentence backward onto that table, because the page attaches the sentence to the third-party section.

No row prices a finished task. A week of pool is not a pull request. The [Cursor listing](/directory/cursor) has the seat card. The [cost calculator](/agent-cost-calculator) can price a token count you already have. It cannot tell you how many tokens the agent will spend.

## GitHub is the vendor that prices the unit

[GitHub’s individual billing doc](https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing) says Copilot usage is measured in AI credits, and **1 AI credit = $0.01**. The interaction is tokens. The tokens are priced by the model. The total becomes credits. Copilot cloud agent is on the list of features that consume credits, with chat, the CLI, Spaces, Spark, and third-party coding agents. Code completions and next-edit suggestions are not billed in credits on paid plans.

| Plan | Seat | Base credits | Flex | Total credits | Face value at $0.01 |
| --- | --- | --- | --- | --- | --- |
| Pro | $10 | 1,000 | 500 | 1,500 | $15 |
| Pro+ | $39 | 3,900 | 3,100 | 7,000 | $70 |
| Max | $100 | 10,000 | 10,000 | 20,000 | $200 |
| Business | $19 per granted seat |  |  | 1,900, pooled | $19 |
| Enterprise | $39 per granted seat |  |  | 3,900, pooled | $39 |

The face-value column is this note’s multiplication. GitHub says base credits match the subscription price and never change, and that flex is an extra monthly amount. Pro’s 1,000 base credits are $10 at a cent each, which matches the $10 seat. The 500 flex credits are another $5 of face value on top of the seat. Business, from the [plans page](https://docs.github.com/en/copilot/get-started/plans), is 1,900 credits against a $19 seat, with no flex split in that table. Unused included credits do not carry over. They reset at 00:00 UTC on the first of the month. Extra budget spends at the same cent: a $10 budget is 1,000 credits.

Two discounts are in force on the page. Through November 30, 2026, paid plans get 30% off model costs on Copilot Fusion. Paid plans also get 10% off while using auto model selection in Copilot Chat, or Copilot cloud agent. The 10% note has no end date in the text that was read.

The published “typical” dollar is not the cloud agent. The [models page](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) says code review picks the model for you, so you cannot price it from the token table. GitHub then prints estimates, and says they are estimates, that they rise with pull-request size and custom instructions, that actual costs can fall outside the ranges, and that they exclude GitHub Actions minutes.

| Review effort | Typical range | Approximate average |
| --- | --- | --- |
| Lite | $0.05–$1 | $0.25 |
| Balanced | $0.25–$5 | $1.50 |
| Max | $1.50–$25 | $10 |

A balanced review at the average is $1.50, which is 150 credits at the published cent. That division is this note’s. GitHub did not print the review in credits. The billing doc’s only sentence on a cloud-agent session is that a long one, on a frontier model, across many files, costs more credits than a quick chat question, because it does more work. There is no average. The [Copilot listing](/directory/github-copilot) has the seat summary.

## Jules counts tasks. Amp, Factory, and Replit count something else.

[Jules](https://jules.google/docs/usage-limits/) meters a task on a rolling 24 hours. The free Jules plan is 15 tasks a day and 3 concurrent, on Gemini 2.5 Pro. Jules in Pro is 100 tasks and 15 concurrent, with higher access starting at Gemini 3 Pro. Jules in Ultra is 300 tasks and 60 concurrent, with priority access starting at the same model. The page prints no dollar. It says Jules in Pro is a benefit of Google AI Pro, and Jules in Ultra is a benefit of Google AI Ultra, for individual accounts ending in @gmail.com. Task limits are not pooled on a family plan. You have to be 18.

[Google’s subscriptions page](https://gemini.google/subscriptions/), fetched the same morning, prices Google AI Pro at **$19.99 a month** and Google AI Ultra starting at **$99.99**, with a $199.99 tier for the higher limit. Google AI Plus is $4.99. That page does not name Jules. The $19.99 is the price of the plan Jules points at. It is not a Jules line item, and it is not a price per task. Fifteen tasks on the free Jules plan have no dollar on either page. One hundred tasks are included with a $19.99 plan only if you accept Jules’s sentence and Google’s card as the same purchase. Dividing $19.99 by 100 is $0.1995 a task at the cap, and that quotient pretends the Google AI Pro subscription buys nothing else. This note does not use it.

[Amp](https://ampcode.com/docs/pricing) charges paid credits for the model and tool usage in a thread. For individuals and non-enterprise workspaces, Amp does not add a markup to provider API prices. The page’s example is the cleanest pass-through in the set: a thread that uses $2 of Anthropic and $0.50 of OpenAI deducts $2.50. Amp does not call that thread typical. You can link a ChatGPT or Claude subscription, or bring a key, and the page says there is then no Amp token fee. Purchased credits expire twelve months after purchase. Orbs are a second meter, billed by the minute, and a paused orb costs nothing. Amp pauses an orb 5 minutes after the agent stops or 20 minutes after you last interacted, whichever is later. The Individual card in the fetched HTML is **$20 a month**, with a Megawatt and Gigawatt control, and the feature text in that response includes 45,000 minutes of orb time. A separate Gigawatt dollar was not in the HTML. Hobby is free. Teams are “no extra charge” on top of the member’s tier.

[Factory](https://factory.com/pricing) sells a seat and a usage multiple. Free is $0 and your own inference: sign in with ChatGPT, GitHub Copilot, or OpenRouter, or bring a key. Pro is $20 a month. Plus is $100 and “~5x the usage of Pro.” Max is $200 and “~10x the usage of Pro.” Teams is $60 a month plus $40 per individual, up to 10 seats. Business and Enterprise print no dollar. The tilde is Factory’s. The page does not define the usage unit those multiples share, and it does not price a task. The model bill on Free is the other vendor’s bill. Factory’s $0 is the seat.

[Replit](https://docs.replit.com/billing/ai-billing) bills Agent on effort. A checkpoint is the completed work on a request. Simple requests typically cost less than complex builds. The docs do not say how much less, and they do not print a dollar. Replit asks for confirmation before a paid action. Plan Mode can bill for reasoning that does not change code. Third-party APIs, named as Claude, ChatGPT, and Gemini, are deducted from Replit credits at the provider’s public rate. The same credits also pay for published apps, storage, and databases. [The pricing page](https://replit.com/pricing) lists Core at $20 a month, or $18 billed annually, with up to 30 hours of Free Mode chat, up to 60 projects, and $20 toward more powerful models. Pro is $100 a month, or $90 billed annually, with $100 toward the most powerful models. A control on the Pro card also lists $90, $215, $425, $825, and $2,000 a month. Those options are not named as plans in the text around the control, so they are not in the table above.

Windsurf is the empty row on purpose. `https://windsurf.com/` returned **HTTP 308** to `https://devin.ai/desktop` at 13:44:09 GMT. There is no Windsurf price in that response. Devin’s self-serve docs still point Devin Desktop at windsurf.com. The desktop product is Devin’s. The old name redirects.

## What you can put in a budget

Put the seat in the budget. Put a task price in the budget only where the vendor printed one.

GitHub’s balanced code review, at GitHub’s own average, is $1.50, and the range around it is $0.25 to $5. That is a review of a pull request, with the model hidden, and it excludes Actions minutes. It is the only dollar in this set that is both a task and a published estimate. Codex’s 2–15 credits are a task size. They become money when you know what your plan charges for a credit. Amp’s $2.50 is an illustration of pass-through billing. It is not a median.

Everyone else sold a pool. Claude Code’s pool is the plan’s, shared with chat, with API rates after it. Cursor’s pool is a week of Cursor’s own models, with third-party tokens extra and a $0.25 per million token rate on the team plans. Factory’s pool is a multiple of Pro, and the multiple is approximate. Replit’s pool is credits that also buy the cloud around the agent, and the agent confirms before it spends them on a paid action. Jules’s pool is a count of tasks, and the dollar, if you are paying, is a Google AI subscription that Google’s own price page does not tie to Jules.

Devin is the row the search is about. Enterprise still speaks ACU, and the price is the contract. Self-serve speaks dollars and will not tell you the dollars per message. A Pro seat at $20 is a quota with a daily and a weekly reset. It is not a cost per pull request, and dividing it by a hoped-for number of tickets will not make it one. Run a session, read Session Insights, and use that ACU count against the rate on the order form. Until both numbers exist, the cost per task is not known.
