---
name: Amazon Bedrock AgentCore
title: "Amazon Bedrock AgentCore runtime"
absoluteTitle: true
vendor: Amazon Web Services
website: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-how-it-works.html
logo: /logos/amazon.png
summary: "AWS managed agent runtime. As of November 12, 2026, new runtimes in 19 regions use the next-generation runtime by default. Each session is a Firecracker microVM. V2 consumption is $0.1276 per vCPU-hour and $0.0169 per GB-hour."
category: developer-tools
tags:
  - runtime
  - agents
  - sandbox
  - aws
pricing:
  - paid
useCases:
  - agents
  - coding
audiences:
  - builders
features:
  - platformVersion V2 or V1 on each agent runtime
  - Session restore from a snapshot of the initialized agent on V2
  - Firecracker microVM isolation, up to 8 vCPU and 32 GB at the largest V2 baseline
  - Container images up to 10 GB compressed on V2, versus 2 GB on V1
pricingSummary: "AgentCore pricing, read November 13, 2026: microVM v2 consumption is $0.1276 per vCPU-hour and $0.0169 per GB-hour. v1 is $0.0895 and $0.00945. The same page still says committed baseline rates of $0.0997 and $0.0132 are launching by October 2026. Billing is per second, with a 1-second minimum and a 128 MB memory minimum. CPU scales to zero during I/O wait. On v2, idle memory is reclaimed after 120 seconds."
startingPrice: "$0.1276"
billingPeriod: usage
pricingPageUrl: https://aws.amazon.com/bedrock/agentcore/pricing/
lastVerified: "2026-11-13"
newThisWeek: true
---

Amazon Bedrock AgentCore runtime is the managed compute layer AWS uses to host an agent session. The [November 12, 2026 what’s-new post](https://aws.amazon.com/about-aws/whats-new/2026/11/new-agentcore-runtime-default/) says new runtimes use the next generation by default. Each session still runs in its own Firecracker microVM. The runtime restores the session from a snapshot of the initialized agent, scales idle agents to zero, and can scale a session to 8 vCPU and 32 GB. Container images go up to 10 GB. On a 2 GB image, AWS says the P75 start is under 2 seconds, down from 29.7 seconds on the previous generation.

The [runtime docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-how-it-works.html), read November 13, still say that omitting `platformVersion` on create uses V1. Set the field and confirm it with `get-agent-runtime`. The migration, the unit-price increase, and a worked session bill are [AgentCore runtime V2 is now the default](/blog/agentcore-runtime-v2-default).

The [pricing page](https://aws.amazon.com/bedrock/agentcore/pricing/) lists v2 consumption at $0.1276 per vCPU-hour and $0.0169 per GB-hour, above the v1 rates of $0.0895 and $0.00945. A fully busy hour is more expensive on V2. The savings AWS describes come from reclaiming idle memory and from CPU that drops to zero while the agent waits. The six-month invoice context for Gateway, Identity, and the rest of the platform is [Enterprise agent platforms, next 6 months](/reports/enterprise-agent-platforms-next-6-months).
