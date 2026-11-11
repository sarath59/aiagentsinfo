---
title: "Does a support-triage agent pay back?"
description: "Example assumptions, not a benchmark: 2,000 tickets, 8 minutes, $45 an hour. Monthly net is $6,370.00 and payback is 0.31 months, until review reaches 6.25 minutes."
absoluteTitle: true
takeaways:
  - "The inputs are an example, not a measured support desk: 2,000 tickets a month, 8 minutes each, $45 an hour loaded, $0.04 per task, 80% success, 2 minutes of review, 8 minutes of rework, $2,000 setup, and $150 a month for the platform."
  - "On those inputs the AI agent ROI calculator returns $6,370.00 of monthly net, 1,563.9% annual ROI, payback in 0.31 months, and a break-even volume of 46.0 tasks a month."
  - "The same example at 6.25 minutes of review nets -$5.00. From 60% to 95% success, with review held at 2 minutes, the example still pays back in under a month."
date: "2026-11-11"
updated: "2026-11-11"
category: guide
topics:
  - tools-saas
  - task-performance
  - how-agents-work
audience:
  - everyone
  - builders
byline: "AI Agents Info Editorial"
sources:
  - title: "OpenAI, API pricing (read November 9, 2026)"
    url: "https://developers.openai.com/api/docs/pricing"
faq:
  - question: "Does this article report a real support desk?"
    answer: "No. The 2,000 tickets, the 8 minutes, the $45 hour, the $0.04 task, and the 80% success rate are example inputs so the calculator has something to solve. They are not a survey and they are not your queue."
  - question: "What ROI formula is this using?"
    answer: "Annual ROI % = (12 × monthly net − setup) / (setup + 12 × monthly agent cost) × 100. Monthly net is the human cost of the queue minus the human time left after the agent, minus the monthly agent bill. Payback months are setup divided by monthly net."
  - question: "Why doesn't a lower success rate flip the example?"
    answer: "At 2 minutes of review, failed tickets are redone in the original 8 minutes, and the agent still costs $0.04. From 60% to 95% success, monthly net stays positive and payback stays under a month. Review has to reach 6.25 minutes before the same example nets -$5.00."
  - question: "Is $0.04 a published model price?"
    answer: "No. It is typed in as an assumption. A sourced alternative on the same page is gpt-5 at 4,000 input tokens and 800 output tokens, which is $0.013 per task on OpenAI's pricing page read November 9, 2026. Those token counts are the cost calculator's starting example, not a measured ticket."
---

A support queue of 2,000 tickets a month, eight minutes each, is an example. It is not a benchmark, and it is not your desk. Run those assumptions through the [AI agent ROI calculator](/tools/ai-agent-roi-calculator?tasks=2000&minutes=8&rate=45&agent=0.04&success=80&review=2&rework=8&setup=2000&platform=150) and the example pays back in 0.31 months. Move review time to 6.25 minutes and the same example loses $5.00 a month.

The link above opens the calculator with every input filled. Change one box and the payback moves with it.

## What went into the example?

Each number below is an assumption. None of them was measured on a support desk.

| Input | Example value |
| --- | --- |
| Tasks per month | 2,000 tickets |
| Minutes a person spends per ticket | 8 |
| Loaded hourly cost | $45 |
| Agent cost per ticket | $0.04 |
| Success rate | 80% |
| Review minutes on every ticket | 2 |
| Rework minutes when the agent fails | 8 |
| One-time setup | $2,000 |
| Monthly platform cost | $150 |

The $0.04 is not a vendor price. If you have a token count, the calculator can fill a per-task price from the same model list as the [AI agent cost calculator](/agent-cost-calculator). Those prices were read November 9, 2026. gpt-5 at 4,000 input tokens and 800 output tokens is $0.013 per task on [OpenAI’s API pricing page](https://developers.openai.com/api/docs/pricing). The 4,000 and 800 are that calculator’s starting example, so a price is visible. They are not a measured ticket.

Review minutes are a person still on the task. That role is [human in the loop](/glossary/human-in-the-loop).

## What does the calculator return?

Baseline human cost is 2,000 × 8 ÷ 60 × $45, which is $12,000.00 for 266.67 hours.

At 80% success, the agent scenario still uses 2 minutes of review on every ticket and 8 minutes of rework on the 20% that fail. That is 120 hours, or $5,400.00. Hours saved are 146.67. The agent bill is 2,000 × $0.04 + $150, which is $230.00.

Monthly net is $12,000.00 − $5,400.00 − $230.00 = $6,370.00.

Annual ROI on this page is (12 × monthly net − setup) / (setup + 12 × monthly agent cost) × 100. That is (12 × $6,370.00 − $2,000) / ($2,000 + 12 × $230.00) × 100, which is 1,563.9%.

Payback is setup ÷ monthly net, which is $2,000 / $6,370.00, or 0.31 months. Break-even volume is the $150 platform fee divided by the per-task margin, which is 46.0 tasks a month. Below that volume the platform fee outweighs the margin. Above it, the month stays positive. The margin itself does not change with volume.

Review puts back 66.67 of the 266.67 hours a person spends today, which is 25%. That review costs $3,000.00 a month. Rework costs $2,400.00. The platform is $150.00. The per-task agent bill is $80.00. Review is the largest monthly cost in the agent scenario.

## What does success rate do to the same inputs?

The table holds every input except success. It is the same function as the calculator’s sensitivity rows.

| Success | Monthly net | Annual ROI | Payback |
| --- | --- | --- | --- |
| 60% | $3,970.00 | 958.8% | 0.50 months |
| 65% | $4,570.00 | 1,110.1% | 0.44 months |
| 70% | $5,170.00 | 1,261.3% | 0.39 months |
| 75% | $5,770.00 | 1,412.6% | 0.35 months |
| 80% | $6,370.00 | 1,563.9% | 0.31 months |
| 85% | $6,970.00 | 1,715.1% | 0.29 months |
| 90% | $7,570.00 | 1,866.4% | 0.26 months |
| 95% | $8,170.00 | 2,017.6% | 0.24 months |

From 60% to 95%, this example still pays back in under a month. A lower success rate costs money here. It does not flip the call, because rework on a failure is the original 8 minutes and review is only 2.

Swap the assumed $0.04 for the sourced gpt-5 token price of $0.013 and monthly net moves from $6,370.00 to $6,424.00. Fifty-four dollars. The token price is not what decides this example.

## What flips the decision?

Raise review from 2 minutes to 6.25 and monthly net goes from $6,370.00 to -$5.00. The setup then never pays back. The zero-net review time, with every other example input held still, sits just under 6.25 minutes. That is the input that erases a month that looked obvious.

Success has a cliff too, and it is farther away. At 27% success, monthly net is $10.00. At 26%, it is -$110.00. You would have to believe the agent fails about three tickets in four before this particular example stops paying. That is a weaker lever than review.

Stack the two. Keep review at 6 minutes, which is still under the 6.25 cliff. At 80% success, monthly net is $370.00 and payback is 5.41 months, so the call is still a payback inside a year. At 60% success, monthly net is -$2,030.00. Once review is already long, the success-rate table starts to matter.

A seat price does not answer this. [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing) compares published plans. It does not know your ticket count. The [12-month outlook](/reports/ai-agents-next-12-months) dates filings and deadlines. It is not a cost model.

## What this does not say

It does not say a support agent pays back in 0.31 months. It says this example does, and that 6.25 minutes of review wipes the gain out. Put your own tasks, minutes, wage, success rate, and bill into the [calculator](/tools/ai-agent-roi-calculator?tasks=2000&minutes=8&rate=45&agent=0.04&success=80&review=2&rework=8&setup=2000&platform=150). If you need the token price first, start at the [cost calculator](/agent-cost-calculator). The prices there were read November 9, 2026, and a model that was not on those pages is not in the list.
