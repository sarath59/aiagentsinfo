---
title: "720 hours of Claude agent runtime is $57.60"
description: "A Claude Managed Agents session that stays running for all 720 hours of a 30-day month is $57.60 before tokens. Idle time is $0 of runtime. The same busy month on AgentCore v2 at 1 vCPU and 2 GB is $116.21. Prices read November 13, 2026."
date: "2026-11-13"
updated: "2026-11-13"
type: original-report
topics:
  - tools-saas
  - task-performance
  - how-agents-work
companies:
  - anthropic
  - amazon
  - openai
  - google
  - cursor
  - devin
contentLicense: true
absoluteTitle: true
dataset:
  title: "Always-on AI agent runtime cost for a 30-day month, computed November 13, 2026"
  description: "Monthly runtime figures are 720 times a published hourly rate, or 2,160 times a published 20-minute container rate. The 720 is 30 times 24, and November 2026 has 30 days. Token add-ons repeat Anthropic's published one-hour Opus 5.5 example, 50,000 input tokens and 15,000 output tokens, across all 720 hours. Rates were copied from vendor pricing pages on November 13, 2026. A cell marked not published had no dollar for that meter in the fetch. No session was run and no card was charged."
  isBasedOn: "https://platform.claude.com/docs/en/about-claude/pricing"
abstract: |
  A Claude Managed Agents session that stays in the running state for all 720 hours of a 30-day month costs $57.60 of runtime. Anthropic's pricing page, read November 13, 2026, meters that runtime at $0.08 per session-hour and only while status is running. Idle, rescheduling, and terminated time add $0. Anthropic's own one-hour Opus 5.5 example, 50,000 input tokens and 15,000 output tokens plus the $0.08, is $0.58. Multiplied by 720 it is $417.60. The same page's cached split of that hour, times 720, is $308.16.

  The same 720 busy hours at 1 vCPU and 2 GB on Amazon Bedrock AgentCore runtime v2 consumption rates are $116.21 before system overhead and before the model. One microVM session cannot last those 720 hours. The quota page caps a microVM session at 8 hours, so the figure is 90 back-to-back busy sessions. Google's Agent Compute rate for 1 vCPU and 2 GiB held for 720 billed hours is $74.16. OpenAI's 4 GB container, the memory size of the default hosted sandbox, is $259.20 if the container stays in a billed session all month. E2B at 1 vCPU and 2 GiB, allocated the whole time, is $59.62.
whyItMatters: |
  "Always on" is a status, and the vendors do not share one. A buyer who multiplies a seat by 730 and calls it the cost of a persistent agent has priced a subscription. A buyer who multiplies a vCPU rate by 720 and ignores an idle timeout has priced a session the platform will already have killed.

  Seat prices and credit units for coding agents are a different census. This note is the runtime clock.
keyFindings:
  - "Hosted Claude Managed Agents runtime is $57.60 for 720 hours of running status, at $0.08 per session-hour. Idle status is $0 of runtime. The uncached Opus 5.5 example from the same page, times 720, is $417.60. The cached example, times 720, is $308.16."
  - "AgentCore v2 consumption at a constant 1 vCPU and 2 GB is $116.21 for 720 hours, from $0.1276 per vCPU-hour and $0.0169 per GB-hour. The pricing page adds system overhead on top of application usage. A microVM session maxes out at 8 hours, and the default idle timeout is 15 minutes."
  - "Google Agent Compute at 1 vCPU and 2 GiB is $74.16 for 720 billed hours, at $0.085 per vCPU-hour and $0.009 per GiB-hour. The pricing page says idle time waiting for the next prompt is not billed. Gemini 4 Carbon on the Gemini API paid tier, through November 30, 2026, adds $180 of tokens at this note's usage shape, for $254.16."
  - "OpenAI's default hosted sandbox is medium, 2 vCPU and 4 GB. The 4 GB container rate is $0.12 per 20-minute session, which is $259.20 across 720 hours. The 1 GB rate is $64.80. Both the 20-minute block reading and the per-minute reading land on the same dollar for a month that is an integer number of 20-minute blocks."
  - "Self-hosted Claude Managed Agents, Devin, Cursor Cloud Agents, and Codex Cloud do not print a runtime hour you can multiply. Codex's help article says standard Codex Cloud environments have no separate VM charge. Devin's pricing page prints seats and no hour."
methodology: |
  The month is 720 hours. That is 30 × 24. November 2026 has 30 days. A 31-day month would be 744 hours. This note does not use 730 or 744.

  A price is a dollar figure on a vendor pricing, docs, or help page retrieved on November 13, 2026. Requests from this desk at 07:47:19 UTC, following redirects, returned HTTP 200 for the Claude pricing page, the November 12 self-hosted article, the Claude Platform release notes, the Managed Agents overview, the self-hosted differences page, the self-hosted data-and-access page, the AgentCore pricing page, the AgentCore quotas page, the Gemini Enterprise Agent Platform pricing page, the Gemini API pricing page, the OpenAI API pricing page, the OpenAI-hosted sandbox page, the Agents API overview, both Cursor docs pages, devin.ai/pricing, the E2B sandbox-price FAQ, and the Daytona pricing page. The OpenAI help article on Codex with a ChatGPT plan was retrieved earlier the same morning and contained the VM sentence quoted below. A second request to that help URL at 07:47 UTC returned HTTP 403, so the quotation is from the earlier retrieval, not from the 403 body.

  The token shape is Anthropic's published one-hour example, repeated: 50,000 uncached input tokens and 15,000 output tokens per hour, for 720 hours. That is 36 million input tokens and 10.8 million output tokens. No cache write, no web search, no tool-definition overhead, and no thinking tokens beyond the 15,000. Where a vendor publishes a per-token rate, the token cell uses that rate on those counts. Where the vendor's page prices a different product than the runtime (the Gemini API price beside an Agent Platform compute SKU, an API model beside a container), the cell says so. "Not published" means the fetched page had no dollar for that meter.

  Quotients are this note's multiplication. 720 × $0.08 = $57.60. 720 × $0.58 = $417.60. 720 × $0.428 = $308.16. AgentCore's busy hour at 1 vCPU and 2 GB is $0.1276 + 2 × $0.0169 = $0.1614, and 720 × $0.1614 = $116.208, shown as $116.21. No account was billed.
limitations:
  - "720 hours of billed time is an assumption. Several products refuse to hold one session open that long. AgentCore microVMs cap a session at 8 hours. OpenAI deletes a hosted sandbox after an hour without activity and keep-alives. Claude charges $0 of runtime while status is idle, so a deployed session that is waiting is not the $57.60."
  - "The token shape is Anthropic's example, not a trace of a 24/7 agent. A heartbeat that calls a model while the runtime meter is idle is outside the token column. Thinking tokens, cache writes, tool JSON, and web search are outside it too."
  - "AgentCore's $116.21 is application CPU and memory only. The pricing page says billing includes system overhead on top. The 128 MB memory minimum is not added on top of the 2 GB shape."
  - "Gemini 4 Carbon's $2 and $10 rates are the Gemini API paid tier, fetched from ai.google.dev, and they apply through November 30, 2026. They are not a line on the Agent Platform compute table. A deployment that bills a different model SKU is a different invoice. On December 1 those API rates become $4 and $20."
  - "OpenAI's container row says per 20-minute session, and a footnote says eligible sessions are billed by the minute with a 5-minute minimum. The page does not define eligible. For 720 hours the two readings match. They do not match for a short session. The sandbox page lists 1 GB, 4 GB, and 16 GB. This note pairs those memories with the container prices of the same numbers. The pricing page also lists 64 GB, and the sandbox page does not."
  - "GPT-5.6 Sol's API rates are labeled promotional through November 30, 2026. The page does not print the price after that. Cursor's token cell is the list rate before the plan's included pool. Devin's pricing page does not print an API rate for extra usage."
  - "Codex Cloud's no-VM-charge sentence is from a retrieval earlier on November 13. A second request at 07:47 UTC returned HTTP 403. This note does not treat the 403 body as a price."
  - "Daytona's pricing page prints per-second billing and does not say whether a stopped sandbox is free. This note does not fill that gap. E2B's FAQ does say paused and killed sandboxes are not billed for compute."
references:
  - title: "Anthropic, Claude Platform pricing"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
    note: "HTTP 200 at 07:47 UTC on November 13, 2026. Session runtime $0.08 per running hour. Self-hosted pricing is the account team. Opus 5.5 is $4 and $20 per million tokens. The uncached hour is $0.58. The cached hour is $0.428."
  - title: "AWS, Amazon Bedrock AgentCore pricing"
    url: "https://aws.amazon.com/bedrock/agentcore/pricing/"
    note: "HTTP 200 at 07:47 UTC. v2 consumption $0.1276 per vCPU-hour and $0.0169 per GB-hour. Billing includes system overhead. 128 MB minimum memory. CPU scales to zero during I/O. The c7g.2xlarge example is $0.289 per hour plus a 12 percent management fee."
  - title: "AWS docs, AgentCore quotas"
    url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/bedrock-agentcore-limits.html"
    note: "HTTP 200 at 07:47 UTC. MicroVM maximum session duration 8 hours. Default idle timeout 15 minutes. Instances can be configured up to 14 days."
  - title: "Google Cloud, Gemini Enterprise Agent Platform pricing"
    url: "https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing"
    note: "HTTP 200 at 07:47 UTC. Agent Compute $0.085 per vCPU-hour. Agent Memory $0.009 per GiB-hour. Runtime idle time waiting for the next prompt is not billed. Usage rounds to the nearest second."
  - title: "Google, Gemini API pricing"
    url: "https://ai.google.dev/gemini-api/docs/pricing"
    note: "HTTP 200 at 07:47 UTC. Gemini 4 Carbon paid tier, per million tokens: input $2.00 and output $10.00 through November 30, 2026, then $4.00 and $20.00. Output includes thinking tokens. Carbon is not on the free tier."
  - title: "OpenAI, API pricing"
    url: "https://developers.openai.com/api/docs/pricing"
    note: "HTTP 200 at 07:47 UTC. Containers: 1 GB $0.03, 4 GB $0.12, 16 GB $0.48, 64 GB $1.92 per 20-minute session. Eligible sessions bill by the minute with a 5-minute minimum. GB means gibibyte. gpt-5.6-sol short-context standard rates are $4 input and $20 output per million tokens. Promotional pricing runs until November 30, 2026. Short context is at or under 272,000 input tokens."
  - title: "OpenAI, OpenAI-hosted sandboxes"
    url: "https://developers.openai.com/api/docs/guides/agents-api/environments/openai-hosted"
    note: "HTTP 200 at 07:47 UTC. Default container_size is medium, 2 vCPU and 4 GB. Small is 1 vCPU and 1 GB. Large is 4 vCPU and 16 GB. Sandboxes use standard container rates. A connected sandbox can be deleted after an hour without activity and keep-alives."
  - title: "OpenAI, Agents API overview"
    url: "https://developers.openai.com/api/docs/guides/agents-api/overview"
    note: "HTTP 200 at 07:47 UTC. Model usage at API rates. Hosted sandboxes at standard container rates."
  - title: "OpenAI Help, Using Codex with your ChatGPT plan"
    url: "https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan"
    note: "Retrieved November 13, 2026, before 07:47 UTC. Standard Codex Cloud environments have no separate VM charge at launch. A request at 07:47 UTC returned HTTP 403."
  - title: "Cursor, Cloud Agents"
    url: "https://cursor.com/docs/cloud-agent"
    note: "HTTP 200 at 07:47 UTC. Cloud Agents use the plan's usage at the selected model's rate. The page prints no vCPU-hour."
  - title: "Cursor, Models and pricing"
    url: "https://cursor.com/docs/models-and-pricing"
    note: "HTTP 200 at 07:47 UTC. Grok 4.7 input $2 and output $6 per million tokens. Plus is $8 and does not include Cloud Agents. Premium is $30 and does."
  - title: "Devin pricing"
    url: "https://devin.ai/pricing"
    note: "HTTP 200 at 07:47 UTC. Free $0, Pro $20, Max $200, Teams $80 plus $40 per full seat. The page names Devin Cloud and says extra usage is API pricing. It prints no hour and no dollar per ACU."
  - title: "E2B, How do I calculate the price of a sandbox?"
    url: "https://docs.e2b.dev/faq/calculate-sandbox-price"
    note: "HTTP 200 at 07:47 UTC. $0.0504 per vCPU-hour and $0.0162 per GiB-hour, on the allocation, only while running. Paused and killed sandboxes are not billed for compute. Default sandbox is 2 vCPU and 512 MiB."
  - title: "Daytona pricing"
    url: "https://www.daytona.io/pricing"
    note: "HTTP 200 at 07:47 UTC. vCPU $0.0504 per hour, memory $0.0162 per GiB-hour, storage $0.000108 per GiB-hour after the first 5 GiB. Billing is per second. The page does not define pause."
  - title: "Anthropic, self-hosted Claude Managed Agents (November 12, 2026)"
    url: "https://claude.com/resources/articles/self-hosted-claude-managed-agents"
    note: "HTTP 200 at 07:47 UTC. Private beta. article:published_time 2026-11-12."
citation:
  apa: "AI Agents Info. (2026, November 13). 720 hours of Claude agent runtime is $57.60. https://www.aiagentsinfo.com/research/always-on-ai-agent-cost-november-2026"
  bibtex: |
    @misc{aiagentsinfo2026alwaysOnAgentCost,
      title={720 Hours of Claude Agent Runtime Is $57.60},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/always-on-ai-agent-cost-november-2026},
      note={Vendor pricing pages read 2026-11-13. 720 hours times $0.08 is $57.60 of Claude Managed Agents runtime}
    }
ledeQuestion: "What does a 24/7 AI agent cost per month?"
ledeAnswer: "On hosted Claude Managed Agents, 720 hours of running status is $57.60 of runtime. Idle status is $0. Add Anthropic's published Opus 5.5 hour, uncached, and the same month is $417.60."
faq:
  - question: "What does an always-on Claude Managed Agent cost per month?"
    answer: "Runtime is $57.60 if the session stays in the running state for all 720 hours of a 30-day month, at $0.08 per session-hour. Time spent idle, rescheduling, or terminated is $0 of runtime. Anthropic's uncached one-hour Opus 5.5 example, times 720, is $417.60. The cached example, times 720, is $308.16. Prices were read November 13, 2026."
  - question: "What does a 24/7 AgentCore session cost?"
    answer: "At the v2 consumption rates, a constant 1 vCPU and 2 GB for 720 hours is $116.21 before system overhead and before the model. A single microVM session cannot cover that month. The quota page caps microVM session duration at 8 hours, so 720 busy hours is 90 sessions. The default idle timeout is 15 minutes."
  - question: "Which platforms publish no runtime price?"
    answer: "Self-hosted Claude Managed Agents tells you to contact your account team. Devin's pricing page, read November 13, 2026, prints seat prices and no hour. Cursor's Cloud Agents docs bill the selected model's rate and print no vCPU-hour. Codex's help article says standard Codex Cloud environments have no separate VM charge."
  - question: "Why is the month 720 hours?"
    answer: "November 2026 has 30 days, and 30 times 24 is 720. A 31-day month is 744 hours. This note does not use a 730-hour average. Every dollar in the runtime column is a published rate times 720, or a 20-minute container rate times 2,160."
  - question: "Does idle time cost money?"
    answer: "On hosted Claude Managed Agents, idle status adds $0 of runtime. On Google Agent Runtime, idle time waiting for the next prompt is not billed. On E2B, a sandbox you leave running is billed for its allocation until you pause or kill it. On AgentCore, the default idle timeout terminates a microVM session after 15 minutes, and CPU can be zero during I/O while the session is still open."
---

**$57.60.** That is hosted Claude Managed Agents runtime for a session that stays `running` through all 720 hours of a 30-day month, at the **$0.08** per session-hour on Anthropic's pricing page. Idle time on that meter is **$0**. Anthropic's own uncached Opus 5.5 hour is $0.58, and $0.58 × 720 is **$417.60**. The cached hour on the same page is $0.428, and $0.428 × 720 is **$308.16**.

The rest of this note asks which other published clocks can even stay on for those 720 hours, and what they cost when they do. Self-hosted Claude Managed Agents, the November 12 private beta, is the case with no public runtime price. The product explanation is [Self-hosted Claude Managed Agents has no public price](/blog/self-hosted-claude-managed-agents). The 10-minute AgentCore comparison, and the V1 rate card, stay on [AgentCore runtime V2 is now the default](/blog/agentcore-runtime-v2-default). Coding-agent seats and credits stay on [A Devin ACU has no public price](/research/coding-agent-billing-units-november-2026).

## The month is one number. The clocks are not.

Seven hundred twenty hours is 30 × 24. November 2026 has 30 days. A platform that bills only while work is in flight will charge less than 720 hours for an agent that spends the night waiting. A platform that bills the allocation until you pause it will charge all 720 if you forget the pause. The table uses 720 billed hours so the rates can be compared. The assumption column says when a real session will not last that long.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Platform</th>
<th>Unit price, as printed</th>
<th>Billing unit</th>
<th>What the 720-hour cell assumes</th>
<th>Runtime</th>
<th>Runtime plus the Opus hour, repeated</th>
</tr>
</thead>
<tbody>
<tr>
<td>Claude Managed Agents, hosted</td>
<td>$0.08 per session-hour</td>
<td>Duration of status <code>running</code>, to the millisecond</td>
<td>Status stays <code>running</code> for 720 hours. Idle hours are a different cell, $0</td>
<td>$57.60</td>
<td>$417.60 uncached. $308.16 with the page's cache split</td>
</tr>
<tr>
<td>Self-hosted Claude Managed Agents</td>
<td>Not published. Contact the account team</td>
<td>None on the pricing page</td>
<td>Your machines are extra, and unpriced here</td>
<td>Not published</td>
<td>$360 of Opus 5.5 tokens if the model calls go to the Claude API. Machines on top</td>
</tr>
<tr>
<td>AgentCore runtime, v2 consumption</td>
<td>$0.1276 per vCPU-hour, $0.0169 per GB-hour</td>
<td>CPU and memory consumed, per second, 1-second minimum, from microVM ready until termination</td>
<td>1 vCPU and 2 GB busy every second. Overhead is extra. Ninety sessions, because one microVM ends at 8 hours</td>
<td>$116.21</td>
<td>Not computed. The model is a separate Bedrock bill</td>
</tr>
<tr>
<td>AgentCore runtime, Instances example</td>
<td>$0.289 per hour for <code>c7g.2xlarge</code>, plus 12%</td>
<td>Instance-hour from boot until stop, about a 1-minute minimum, plus the management fee</td>
<td>That example shape, billed 720 hours. One instance life maxes at 14 days, so a 30-day month is more than one life</td>
<td>$233.05</td>
<td>Not computed. Same separate model bill</td>
</tr>
<tr>
<td>Google Agent Compute</td>
<td>$0.085 per vCPU-hour, $0.009 per GiB-hour</td>
<td>Allocated vCPU and memory, rounded to the nearest second. Idle time between prompts is not billed</td>
<td>1 vCPU and 2 GiB billed for 720 hours. Waiting between prompts is outside this cell</td>
<td>$74.16</td>
<td>$254.16 with Gemini 4 Carbon at the November API rate. $434.16 from December 1</td>
</tr>
<tr>
<td>OpenAI-hosted sandbox, 1 GB</td>
<td>$0.03 per 20-minute session</td>
<td>Container session. Eligible sessions bill by the minute, 5-minute minimum</td>
<td>The sandbox page's <code>small</code> size is 1 GB. The container stays billed for 720 hours</td>
<td>$64.80</td>
<td>$424.80 at gpt-5.6-sol short-context rates</td>
</tr>
<tr>
<td>OpenAI-hosted sandbox, 4 GB</td>
<td>$0.12 per 20-minute session</td>
<td>Same container meter</td>
<td>Default size <code>medium</code> is 4 GB and 2 vCPU. Same 720 billed hours</td>
<td>$259.20</td>
<td>$619.20 at the same Sol rates</td>
</tr>
<tr>
<td>E2B</td>
<td>$0.0504 per vCPU-hour, $0.0162 per GiB-hour</td>
<td>Allocated compute, per second, while the sandbox is running</td>
<td>1 vCPU and 2 GiB, never paused. Paused and killed compute is $0</td>
<td>$59.62</td>
<td>Not computed. E2B does not sell the model</td>
</tr>
<tr>
<td>Daytona</td>
<td>$0.0504 per vCPU-hour, $0.0162 per GiB-hour</td>
<td>Per second. Storage after 5 GiB is $0.000108 per GiB-hour</td>
<td>The same 1 vCPU and 2 GiB, storage inside the free 5 GiB. Pause is not defined on the page</td>
<td>$59.62</td>
<td>Not computed. Daytona does not sell the model</td>
</tr>
</tbody>
</table>
</div>

Source: aiagentsinfo.com. Rates from the pages in the references, each read November 13, 2026. Runtime cells are this note's multiplication, shown in the next section. The Opus hour is 50,000 input tokens and 15,000 output tokens, uncached, repeated every hour. Token rates: Opus 5.5 at $4 and $20 per million, Gemini 4 Carbon at $2 and $10 through November 30, gpt-5.6-sol short context at $4 and $20. The Sol rate is promotional through November 30, and the page does not print December 1.

E2B's own default is a different shape, 2 vCPU and 512 MiB. At the FAQ's per-second rates that hour is $0.1089, and 720 hours is **$78.41**. The FAQ's rounded "about $0.109" times 720 is $78.48. The default is cheaper per hour than a 2 GiB box only because the memory is a quarter of a gibibyte. It is the wrong row if the agent needs the 2 GB the other lines use.

OpenAI's 16 GB container is $0.48 per 20-minute session. Across 2,160 of those blocks it is **$1,036.80** of runtime, and **$1,396.80** with the Sol token shape. The sandbox page's `large` size is 16 GB and 4 vCPU. The pricing page also lists 64 GB at $1.92 per 20 minutes. The sandbox size table does not have a 64 GB row, so this note does not turn that price into an Agents API sandbox.

## How each runtime dollar was produced

Every runtime cell is a published rate times 720, except the OpenAI cells, which are the same rate times 2,160 blocks of 20 minutes. Those two counts are the same month. 720 hours contain 2,160 blocks of 20 minutes.

| Cell | Arithmetic | Result |
| --- | --- | --- |
| Claude, running | 720 × 0.08 | $57.60 |
| Claude, uncached Opus hour | 720 × 0.58 | $417.60 |
| Claude, cached Opus hour | 720 × 0.428 | $308.16 |
| AgentCore v2, 1 vCPU and 2 GB busy | 720 × (0.1276 + 2 × 0.0169) = 720 × 0.1614 | $116.208, shown as $116.21 |
| AgentCore Instances example | 720 × 0.289 × 1.12 | $233.0496, shown as $233.05 |
| Google, 1 vCPU and 2 GiB | 720 × (0.085 + 2 × 0.009) = 720 × 0.103 | $74.16 |
| Google plus Carbon, through November 30 | 74.16 + (36 million × $2) + (10.8 million × $10) | $254.16 |
| Google plus Carbon, from December 1 | 74.16 + (36 million × $4) + (10.8 million × $20) | $434.16 |
| OpenAI 1 GB | 2,160 × 0.03 | $64.80 |
| OpenAI 4 GB | 2,160 × 0.12 | $259.20 |
| OpenAI 1 GB plus Sol | 64.80 + (36 million × $4) + (10.8 million × $20) | $424.80 |
| OpenAI 4 GB plus Sol | 259.20 + 360 | $619.20 |
| E2B, 1 vCPU and 2 GiB | 720 × (0.0504 + 2 × 0.0162) = 720 × 0.0828 | $59.616, shown as $59.62 |
| Daytona, same shape, no storage overage | The same 0.0828 × 720 | $59.62 |

The per-minute reading of OpenAI's footnote lands on the same month. A 4 GB session at $0.12 per 20 minutes is $0.006 per minute. 720 × 60 × 0.006 is also $259.20. The 5-minute minimum would change a short session. It does not change a session that fills every minute of the month. The page still does not define which sessions are "eligible" for the per-minute reading. Both readings are on the page. For this month they agree.

Claude's cached cell is the pricing page's own split, not a guess. Forty thousand of the 50,000 input tokens are cache reads at 0.05× the $4 input price. Per hour that is $0.04 of fresh input, $0.008 of cache reads, $0.30 of output, and $0.08 of runtime. The page prints the sum, $0.428. This note multiplies the printed sum.

AgentCore's $116.21 will not appear as one line on one session. The quotas page says a microVM session's maximum duration is 8 hours, and the default idle timeout is 15 minutes of inactivity. 720 ÷ 8 is 90. An agent that is actually busy for a month is a chain of sessions, with a new microVM after each cap, and the cold start between them is not in the $116.21. CPU that drops to zero during I/O is also not in it. AWS's published support-agent example on the pricing page is the opposite shape, 60 seconds of CPU inside 10 minutes, at $0.006703. That example, and the V1 rates, are worked on the [V2 runtime guide](/blog/agentcore-runtime-v2-default). This note does not repeat them.

Google's $74.16 has the same kind of asterisk. The Agent Platform page says that for Runtime, idle time spent waiting for the next prompt between turns is not billed. An agent that waits all night and works for an hour bills the hour. The $74.16 is the bill only when 1 vCPU and 2 GiB are the billed resources for all 720 hours. The Carbon token add-on is a second price list. `gemini-4-carbon` on the Gemini API is $2 and $10 per million tokens through November 30, 2026, and $4 and $20 starting December 1. Output includes thinking tokens. This note's 15,000 output tokens are the whole output line. If the model thinks past that, the invoice is higher, and the page says Carbon is not on the free tier. Thirty-six million input tokens at $2 is $72. 10.8 million output tokens at $10 is $108. Together with $74.16 that is $254.16 for a November run of this shape, and $434.16 once the December rates are in force.

## Who prints no runtime hour

Four products people mean when they say "an agent that stays up" do not give you a number to multiply by 720.

| Product | What the page does print | What you cannot compute from it |
| --- | --- | --- |
| Self-hosted Claude Managed Agents | "Contact your Anthropic account team," on the pricing page | A dollar for the server, the database, or the workers. Model tokens are extra wherever you send them |
| Devin | Free $0, Pro $20, Max $200, Teams $80 plus $40 a full seat. Devin Cloud is listed. Extra usage is "API pricing" | An hour, an ACU, or the API rate. The November 12 billing census is the longer read |
| Cursor Cloud Agents | The plan's usage at the selected model's rate. A spend limit on first use. Premium at $30 a month is the first plan whose card includes Cloud Agents | A vCPU-hour or a session-hour. Grok 4.7 at this note's token shape is $136.80 before the included pool |
| Codex Cloud | The help article says standard environments have no separate VM charge at launch. Usage counts toward plan limits, credits, or billing | A VM hour. A dollar per token is not on that help article. The credit table is the November 12 census |

Source: aiagentsinfo.com. Devin from [devin.ai/pricing](https://devin.ai/pricing), HTTP 200 at 07:47 UTC on November 13, 2026. Cursor from the [Cloud Agents](https://cursor.com/docs/cloud-agent) and [models](https://cursor.com/docs/models-and-pricing) docs, HTTP 200 the same minute. Codex from the help article retrieved earlier that morning. Self-hosted Claude from the [pricing page](https://platform.claude.com/docs/en/about-claude/pricing).

Cursor's $136.80 is 36 million input tokens at $2 plus 10.8 million output tokens at $6. It is the list rate for Grok 4.7. The docs say Cloud Agents draw the plan's pool first. A week that still has included usage will bill less than the list rate. The $30 Premium seat is the right to start one. It is not the 720-hour meter, and Plus at $8 does not include Cloud Agents at all.

Devin's $20 Pro seat is the same kind of number. It buys a quota, and the pricing page says cost per unit of extra usage is API pricing. It does not print the rate, and it does not print an hour. Turning $20 into a cost per always-on day requires a quota size the page does not give. The [billing-unit census](/research/coding-agent-billing-units-november-2026) is where the ACU gap is documented, from the docs fetch on November 12. This note does not re-derive it.

## What this means if you are pricing a persistent agent

Price the clock you will actually leave running.

If the agent works in bursts and the platform bills running time, the month is the sum of the bursts. Hosted Claude at $0.08, and Google Agent Compute at $0.085 per billed vCPU-hour plus memory, are that kind of clock. A session you leave idle on Claude adds no runtime. A prompt gap on Google Agent Runtime adds no Agent Compute. The $57.60 and the $74.16 are what you pay when the clock does not stop.

If the agent sits in a sandbox you allocated, you pay until you pause or kill it. E2B is explicit. Daytona prints the same two compute rates and does not say what a stopped sandbox costs, so this note will not call Daytona free when stopped. OpenAI's hosted sandbox can disappear an hour after activity and keep-alives stop, which caps a forgotten bill, and the page does not say the keep-alives themselves are free.

If the platform kills the session on a timer, "24/7" means a harness that starts the next session. AgentCore's default is 15 minutes idle and 8 hours absolute, on microVMs. The Instances path is the one AWS's own pricing example uses for a job that runs for hours in one persistent session, and that example's box is $233.05 across 720 billed hours, on an 8 vCPU instance, before the model.

If the vendor will not print the hour, do not invent one from the seat. Self-hosted Claude, Devin, Cursor Cloud Agents, and Codex Cloud are in that group this morning. The [cost calculator](/agent-cost-calculator) will price the tokens. It will not price the runtime, which is the gap this table is for.

The figures in the tables are licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Credit AI Agents Info if you reuse them.

