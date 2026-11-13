---
title: "AgentCore runtime V2 is now the default: P75 under 2s, CPU at $0.1276"
description: "New Amazon Bedrock AgentCore runtimes use the next-generation runtime by default in 19 regions as of November 12, 2026. A fully busy 10-minute session at 1 vCPU and 2 GB is $0.0269 on V2 rates and $0.01807 on V1 rates. Set platformVersion and confirm it."
absoluteTitle: true
takeaways:
  - "AWS's November 12, 2026 what's-new post says new AgentCore runtimes use the next-generation runtime by default. Sessions restore from a snapshot, scale idle work to zero, and still run in a Firecracker microVM. On a 2 GB image, P75 start is under 2 seconds, down from 29.7 seconds. The runtime docs, read November 13, still say that omitting platformVersion on create uses V1."
  - "V2 consumption is $0.1276 per vCPU-hour and $0.0169 per GB-hour. V1 is $0.0895 and $0.00945. A fully busy 10 minutes at 1 vCPU and 2 GB is $0.0269 on V2 and $0.01807 on V1, about 48.9 percent more on V2 if nothing is idle. AWS's 'up to 68 percent less billed memory' is a ceiling for multi-turn agents, not a discount on the unit rate."
  - "The default consumption session is 2 vCPU and 8 GB and cannot burst. The 8 vCPU and 32 GB figure is the peak of the 8192 MB committed baseline. The pricing page still says committed rates are launching by October 2026."
date: "2026-11-13"
updated: "2026-11-13"
category: guide
topics:
  - harnesses
  - tools-saas
  - how-agents-work
  - task-performance
audience:
  - builders
companies:
  - amazon
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "AgentCore runtime V1 and V2 session bills at published microVM rates, read November 13, 2026"
  description: "Unit rates copied on November 13, 2026 from the Amazon Bedrock AgentCore pricing page. The $0.0269, $0.01807, $0.00776, and $0.0138 figures are arithmetic on those rates and on E2B's published per-hour rates for the shapes stated on the page. AWS's own example of $0.006703 is quoted, not recomputed as a new measurement. AI Agents Info did not run a session."
  isBasedOn: "https://aws.amazon.com/bedrock/agentcore/pricing/"
sources:
  - title: "AWS, The next generation AgentCore runtime is now the default (November 12, 2026)"
    url: "https://aws.amazon.com/about-aws/whats-new/2026/11/new-agentcore-runtime-default/"
  - title: "AWS, Run agents securely and efficiently with the next generation AgentCore runtime (November 12, 2026)"
    url: "https://aws.amazon.com/blogs/machine-learning/run-agents-securely-and-efficiently-with-the-next-generation-agentcore-runtime/"
  - title: "AWS docs, AgentCore Runtime microVMs and platform versions (read November 13, 2026)"
    url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-how-it-works.html"
  - title: "AWS docs, Optimize your agent for AgentCore Runtime V2 (read November 13, 2026)"
    url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-v2-optimize.html"
  - title: "AWS, Amazon Bedrock AgentCore pricing (read November 13, 2026)"
    url: "https://aws.amazon.com/bedrock/agentcore/pricing/"
  - title: "E2B, How do I calculate the price of a sandbox? (read November 13, 2026)"
    url: "https://docs.e2b.dev/faq/calculate-sandbox-price"
  - title: "Daytona, pricing (read November 13, 2026)"
    url: "https://www.daytona.io/pricing"
faq:
  - question: "Is the new AgentCore runtime the default?"
    answer: "AWS's what's-new post, dated November 12, 2026, says new runtimes in 19 listed regions use the next-generation AgentCore runtime by default. Existing runtimes stay on the current version until you move them. The runtime docs, read November 13, still say that if you omit platformVersion on create, the runtime uses V1. Set platformVersion to V2 or V1 on purpose, then confirm it with get-agent-runtime."
  - question: "How much does AgentCore runtime V2 cost per session?"
    answer: "The pricing page lists v2 consumption at $0.1276 per vCPU-hour and $0.0169 per GB-hour, billed per second with a 1-second minimum. A fully busy 10 minutes at 1 vCPU and 2 GB is $0.0269 at those rates. The same shape at v1 rates, $0.0895 and $0.00945, is $0.01807. AWS's published support-agent example, with 60 seconds of CPU and a memory profile that drops, is $0.006703 per session. Real bills also include system overhead, and memory has a 128 MB minimum."
  - question: "How do you move an existing AgentCore runtime to V2?"
    answer: "Set platformVersion to V2 when you update the runtime. Create and update take several minutes while AWS prepares the snapshot. The container must report healthy within 120 seconds, or creation fails the health check. Poll get-agent-runtime until the status is READY or ends in FAILED. An update or delete before that returns ConflictException. Initialize reusable work before the snapshot, and compute anything that expires inside the invocations handler."
  - question: "Does every V2 session get 8 vCPU and 32 GB?"
    answer: "No. The docs say the default consumption session is 2 vCPU and 8 GB, and that it cannot burst above that. The 8 vCPU and 32 GB peak is the burst ceiling of a committed baseline set with minimumMemoryInMiB 8192. The pricing page, read November 13, 2026, still describes committed baseline rates as launching by October 2026."
  - question: "Is AgentCore runtime cheaper than E2B?"
    answer: "Not on a fully busy hour. E2B's docs, read November 13, 2026, bill allocated compute at $0.0504 per vCPU-hour and $0.0162 per GiB-hour for the whole time the sandbox is running. AgentCore v2 consumption is $0.1276 and $0.0169 on what the session uses, and CPU can drop to zero during I/O. A 10-minute sandbox at 1 vCPU and 2 GiB is $0.0138 on E2B. The same window on AgentCore, with CPU active for only 60 seconds and memory held at 2 GB, is $0.00776. The meters are different."
---

Set `platformVersion` yourself. A new Amazon Bedrock AgentCore runtime in the 19 regions AWS named on November 12, 2026 is supposed to land on the next-generation runtime. The runtime docs, read November 13, still say that omitting the field on create selects V1. A fully busy 10-minute session at 1 vCPU and 2 GB costs **$0.0269** at the V2 consumption rates and **$0.01807** at the V1 rates. The cold start is the part that got cheaper in time. The unit price went up.

The [what’s-new post](https://aws.amazon.com/about-aws/whats-new/2026/11/new-agentcore-runtime-default/), dated November 12, says each session restores from a snapshot of the initialized agent, scales to zero when idle, and still runs in its own Firecracker microVM. On a 2 GB image, the P75 start is under 2 seconds, down from 29.7 seconds. For multi-turn agents, AWS says that means up to 68 percent less billed memory per session. That 68 percent is a ceiling on memory, not a cut in the rate card. The listing is [Amazon Bedrock AgentCore](/directory/amazon-bedrock-agentcore).

## What changed on November 12, and what did not?

New runtimes in 19 regions default to the snapshot runtime. Existing runtimes do not move. The Firecracker boundary stays. The per-hour CPU rate rises from $0.0895 to $0.1276.

| Fact | Previous generation, V1 | Next generation, V2 |
| --- | --- | --- |
| Who gets it if you omit `platformVersion` | The docs, read November 13, say a create without the field uses V1 | The November 12 announcement says new runtimes in the listed regions use this generation by default. Existing runtimes stay put |
| How a session starts | Initialize on each start. The docs say a runtime reaches `READY` in seconds | Restore a snapshot of the initialized agent. Create and update take several minutes |
| P75 start, 2 GB image | 29.7 seconds, in the November 12 announcement | Under 2 seconds, in the same sentence |
| Max the announcement names | Not restated as a pair | 8 vCPU and 32 GB. The docs cap the default consumption session at 2 vCPU and 8 GB, with no burst |
| Container image | Up to 2 GB compressed | Up to 10 GB compressed. Images over 2 GB need a larger `minimumMemoryInMiB` |
| CPU while the agent waits on a model or a tool | Scales to zero during I/O, on the pricing page’s runtime description | Same, and idle memory is reclaimed after 120 seconds |
| Consumption rate | $0.0895 per vCPU-hour, $0.00945 per GB-hour | $0.1276 per vCPU-hour, $0.0169 per GB-hour |

Source: aiagentsinfo.com. Behavior and the 29.7-second pair from the [November 12 what’s-new post](https://aws.amazon.com/about-aws/whats-new/2026/11/new-agentcore-runtime-default/). Caps, image sizes, and the omit rule from the [runtime docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-how-it-works.html), read November 13, 2026. Rates from the [pricing page](https://aws.amazon.com/bedrock/agentcore/pricing/), read the same day.

The [AWS blog](https://aws.amazon.com/blogs/machine-learning/run-agents-securely-and-efficiently-with-the-next-generation-agentcore-runtime/), also November 12, says sessions start up to 15 times faster, scale to 4 times more compute, and run up to 68 percent more efficiently. Divide the announcement’s 29.7 seconds by 2 seconds and you get 14.85. The announcement says “under 2 seconds,” so 15 times is the blog’s rounding of that pair, not a stopwatch this page ran. Four times the compute lines up with 8 vCPU against the docs’ 2 vCPU default, and 32 GB against 8 GB. It is the peak, not the session you get if you leave resource configuration empty.

The blog also quotes customers. Mission says the same workload had 35 percent faster cold starts for inference, 77 percent faster health checks, and 17 percent lower measured runtime cost per call. Zuora says memory footprint per invocation fell by around 60 percent in many use cases. Those are the customers’ numbers, printed by AWS. They are not the 68 percent ceiling, and they are not your bill.

## Which page do you trust on the default?

Trust the field you set, then read it back. The announcement and the docs disagree on what happens when you leave `platformVersion` off.

The announcement says new runtimes use the next generation by default, that you set `platformVersion` to `V2` to move an existing runtime or to use the new runtime in a region where it is not the default, and that you set `platformVersion` to `V1` to keep a new runtime on the current version. The [runtime docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-how-it-works.html), read the next day, say “V1 is the default” and “If you omit `platformVersion` when you create a runtime, the runtime uses V1.” An update that omits the field keeps the current platform version. Both pages can be true for different regions or different hours. A create that relies on the omit path cannot tell which sentence won.

The docs list V2 in the same 19 regions the announcement names:

| Region | Code |
| --- | --- |
| US East (N. Virginia) | `us-east-1` |
| US East (Ohio) | `us-east-2` |
| US West (Oregon) | `us-west-2` |
| Canada (Central) | `ca-central-1` |
| South America (São Paulo) | `sa-east-1` |
| Europe (Frankfurt) | `eu-central-1` |
| Europe (Ireland) | `eu-west-1` |
| Europe (London) | `eu-west-2` |
| Europe (Milan) | `eu-south-1` |
| Europe (Paris) | `eu-west-3` |
| Europe (Spain) | `eu-south-2` |
| Europe (Stockholm) | `eu-north-1` |
| Asia Pacific (Malaysia) | `ap-southeast-5` |
| Asia Pacific (Mumbai) | `ap-south-1` |
| Asia Pacific (Seoul) | `ap-northeast-2` |
| Asia Pacific (Singapore) | `ap-southeast-1` |
| Asia Pacific (Sydney) | `ap-southeast-2` |
| Asia Pacific (Thailand) | `ap-southeast-7` |
| Asia Pacific (Tokyo) | `ap-northeast-1` |

Source: aiagentsinfo.com. Region names from the [November 12 announcement](https://aws.amazon.com/about-aws/whats-new/2026/11/new-agentcore-runtime-default/). Codes from the [runtime docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-how-it-works.html), read November 13, 2026. The two lists match. A region that is not in this table is one where the announcement tells you to pass `V2` if you want the new runtime.

`platformVersion` is not the runtime version number. The docs separate them. Runtime versions are the immutable snapshots of your container, network, and protocol. Platform version is how those versions boot. Updating the image still creates a new runtime version. Moving V1 to V2 is a platform change on top of that.

## How do you move a runtime to V2?

Pass `platformVersion="V2"` on create or update, wait until `READY`, and keep expiring values out of the snapshot.

The docs’ own create path is `aws bedrock-agentcore-control create-agent-runtime` with `--platform-version V2`, or `client.create_agent_runtime(..., platformVersion="V2")`. Read it back with `get-agent-runtime` and `--query platformVersion`. In the console, the control is Platform version on the microVM create form.

A V2 create or update behaves differently from V1, and the docs are specific:

- The call returns while status is `CREATING` or `UPDATING`. Poll `get_agent_runtime` until status is `READY` or ends in `FAILED`. Allow several minutes. A second update or a delete before a terminal status returns `ConflictException`.
- The snapshot is taken on the first healthy `/ping`, or after a build warmup hook’s `memory` call. Report healthy only after initialization finishes. If the runtime is not healthy within 120 seconds of startup, creation fails the health check.
- With the AgentCore SDK, do startup work at module scope before `app.run()`. The process does not listen on port 8080 until `app.run()`, so no `/ping` can succeed early. Finish that work inside the 120 seconds.
- One snapshot per agent version, for as long as an endpoint points at that version. You do not create or delete snapshots. When nothing points at a version, deletion can take up to 8 hours, which the docs call the maximum session lifetime, because sessions already on that snapshot run until they end.

The [optimization page](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-v2-optimize.html) gives the code rule. Compute a value at startup if it stays the same for the life of the snapshot: imports, model weights, static config from the deployment bundle. Compute it in the `/invocations` handler if it varies per request or can expire. A token fetched at startup is a token every restored microVM will share until you ship a new version. That is the bug V2 adds. V1 re-ran startup on every cold start, which hid it.

Images over 2 GB are a V2 feature and a memory setting. The docs say V2 allows container images up to 10 GB compressed, against 2 GB on V1, and that an image larger than 2 GB needs a larger `minimumMemoryInMiB`. The announcement’s 10 GB figure and the docs’ 10 GB figure match. The announcement does not mention the memory setting. Copy it from the docs if the image is the reason you moved.

The November 12 blog adds a data path: an agent can mount and save work to a filesystem such as an S3 bucket with FUSE, so files stay inside the session’s trust boundary. The blog does not print the API call. Use the docs for the mount. Do not treat the quote as a parameter list. Per-session storage folders, the blog says, are a re:Invent item still ahead: “By re:Invent, per-session scoping will bind each session to its own storage folder.” That sentence is future tense on a November 12 post.

## What does a session cost when the CPU never waits?

$0.0269 on V2 and $0.01807 on V1, for 10 minutes at a constant 1 vCPU and 2 GB. V2 is about 48.9 percent more if you bill the same seconds at both rate cards.

| Piece | Rate | 10 minutes, fully busy | Amount |
| --- | --- | --- | --- |
| V2 CPU | $0.1276 per vCPU-hour | 1 vCPU | $0.02127 |
| V2 memory | $0.0169 per GB-hour | 2 GB | $0.00563 |
| V2 session | | | $0.02690 |
| V1 CPU | $0.0895 per vCPU-hour | 1 vCPU | $0.01492 |
| V1 memory | $0.00945 per GB-hour | 2 GB | $0.00315 |
| V1 session | | | $0.01807 |

Source: aiagentsinfo.com. Rates from the [AgentCore pricing page](https://aws.amazon.com/bedrock/agentcore/pricing/), read November 13, 2026. Each amount is `(600 / 3600) × rate × size`. V2 is `(1/6) × (0.1276 + 0.0338) = 0.0269`. V1 is `(1/6) × (0.0895 + 0.0189) = 0.0180666…`, shown as $0.01807. `0.0269 / 0.0180666… = 1.489`.

V2 CPU is `0.1276 / 0.0895 = 1.426` times V1, about 42.6 percent higher. V2 memory is `0.0169 / 0.00945 = 1.788` times V1, about 78.8 percent higher. A session that holds its memory and keeps the CPU busy pays more after the move. The pricing page says billing includes system overhead on top of the application, and that memory has a 128 MB minimum. These four lines are the application shape only. A real invoice is at least this, not at most this.

AWS’s own v2 example is the shape where the higher rate can still be a small bill. A support agent runs 10 minutes. CPU is active for 60 seconds at 1 vCPU. Memory is 1 GB for 300 seconds, 2 GB for 150 seconds, and 2.5 GB for 150 seconds, because unused memory is reclaimed after 120 seconds. The pricing page prints $0.002127 for CPU, $0.004576 for memory, and **$0.006703** for the session. The steps match the rates: `60 / 3600 × 0.1276 = 0.0021266…`, and the three memory slices sum to $0.004576. A million of those sessions is the page’s $6,703. That example is 90 percent I/O wait, which is the case the 68 percent sentence is about. It is not the fully busy compile.

Apply the 68 percent as a test, not as a credit. If billed memory seconds fall to 32 percent of the V1 memory seconds, the memory line is `0.32 × 1.788 = 0.572` of the old memory bill, about 43 percent less money on memory, while the CPU line is 42.6 percent more money for the same CPU seconds. Whether the session is cheaper depends on how much of the old bill was idle memory. AWS has not published the trace behind the 68 percent. If your multi-turn agent never releases memory, you do not get the ceiling, and you do pay the higher rate.

Idle is not free in the way a paused sandbox is free. The pricing page says a consumption session is billed from microVM ready, through initialization, active work, and idle periods, until termination. CPU can be zero during I/O. Memory on v2 is reclaimed after 120 seconds of being unused, not at the instant the model call starts. A session you forget to close keeps the remaining memory on the invoice. Scale-to-zero, in the announcement’s words, is for idle agents. It is not a promise that an open session costs nothing while it waits out the 120 seconds.

## When does 8 vCPU and 32 GB show up on the bill?

Only if you set a committed baseline of 8192 MB. The default consumption session stops at 2 vCPU and 8 GB, and the docs say it cannot burst.

| `minimumMemoryInMiB` | Baseline | Peak | Disk |
| --- | --- | --- | --- |
| `1024` | 1 GB, 0.25 vCPU | 4 GB, 1 vCPU | 10 GB |
| `2048` | 2 GB, 0.5 vCPU | 8 GB, 2 vCPU | 10 GB |
| `4096` | 4 GB, 1 vCPU | 16 GB, 4 vCPU | 16 GB |
| `8192` | 8 GB, 2 vCPU | 32 GB, 8 vCPU | 32 GB |

Source: aiagentsinfo.com. Copied from the [runtime docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-how-it-works.html), read November 13, 2026. vCPU is 1 per 4 GB. The peak is 4 times the baseline.

Consumption, the default when you omit `resourceConfigurations`, bills what the agent uses, up to 2 vCPU and 8 GB. A committed baseline bills that baseline until the session ends, even when the agent uses less, and bills the burst above it per second. Both the baseline and the burst use the committed rate. The pricing page prints that rate as $0.0997 per vCPU-hour and $0.0132 per GB-hour, and it still says “launching by October 2026.” The docs describe the setting as available and point at the pricing page for rates. This page will not upgrade the pricing page’s tense into a shipped discount. Confirm the rate on an invoice before you plan a fleet around $0.0997.

If that committed rate is the one you are billed, a session that sits on the 8192 baseline for 10 minutes, with no burst, is `(600 / 3600) × (2 × 0.0997 + 8 × 0.0132) = $0.05083`. You pay that floor even when the agent is waiting. The announcement’s “sessions scale to 8 vCPU and 32 GB” is this row’s peak. A team that moves to V2 to compile a large codebase, and leaves the resource configuration empty, still has the 2 vCPU and 8 GB cap.

The pricing page’s other runtime example is the Instances compute type, not microVMs: a 3-hour `c7g.2xlarge` session at $0.289 per hour plus a 12 percent management fee, $0.97104 per session. That path co-locates agents and persists up to 14 days. It is a different product from the Firecracker session this article prices. GPU instances on that example carry a 7.8 percent management fee. Neither fee is a microVM rate.

Gateway, browser, code interpreter, and memory are separate meters. Gateway invocations are $0.005 per 1,000. The browser tool and the code interpreter stay on the v1-shaped rates, $0.0895 and $0.00945, on the pricing table read November 13. Moving the runtime to V2 does not reprice those tools. The six-month read of Gateway, Identity, and Policy is [Enterprise agent platforms, next 6 months](/reports/enterprise-agent-platforms-next-6-months).

## How does that compare with E2B and Daytona?

E2B and Daytona publish a lower vCPU rate and bill the allocation for the whole run. AgentCore’s higher rate can win when the CPU is idle and you would otherwise have paid for a sandbox that stayed allocated.

| Meter, as the vendor prints it | AgentCore microVM, v2 consumption | E2B | Daytona |
| --- | --- | --- | --- |
| vCPU | $0.1276 per vCPU-hour, on use. Scales to zero during I/O | $0.0504 per vCPU-hour, on what you allocated, for the whole run | $0.0504 per vCPU-hour |
| Memory | $0.0169 per GB-hour. Reclaimed after 120 seconds unused, with a 128 MB minimum | $0.0162 per GiB-hour, on the allocation | $0.0162 per GiB-hour |
| When billing stops | Session termination. Idle time inside an open session can still bill memory until reclaim | Pause or kill. Paused and killed sandboxes are not billed for compute | The pricing page says billing is per second. It does not define pause |
| Disk | Depends on the baseline table above, 10 GB to 32 GB | Included, 10 GiB on Hobby and 20 GiB on Pro, in the FAQ | $0.000108 per GiB-hour after the first 5 GiB |
| Isolation the page states | Firecracker microVM, one session each | A sandbox you allocate. The FAQ does not name the hypervisor | Not stated on the pricing page |

Source: aiagentsinfo.com. AgentCore rates and the I/O rule from the [pricing page](https://aws.amazon.com/bedrock/agentcore/pricing/) and the [November 12 announcement](https://aws.amazon.com/about-aws/whats-new/2026/11/new-agentcore-runtime-default/). E2B from the [sandbox price FAQ](https://docs.e2b.dev/faq/calculate-sandbox-price), read November 13, 2026. Daytona from the [pricing page](https://www.daytona.io/pricing), read the same day. E2B says its rates can change and that the pricing page is the source of truth. The FAQ rates matched $0.000014 per vCPU-second, which is $0.0504 per hour.

A 10-minute E2B sandbox allocated 1 vCPU and 2 GiB costs `(600 / 3600) × (0.0504 + 2 × 0.0162) = $0.0138`, whether the CPU is busy or waiting. The same 10 minutes on AgentCore v2, with the CPU active for only 60 seconds and memory held at 2 GB the whole time, is `60 / 3600 × 0.1276 + 600 / 3600 × 2 × 0.0169 = $0.00776`. AgentCore is cheaper on that wait-heavy shape. Flip it to a fully busy 10 minutes and AgentCore is the $0.0269 above, against E2B’s $0.0138. Daytona’s two compute rates match E2B’s on the pages read November 13, so the same arithmetic applies to those two lines, before Daytona’s storage charge and before any plan minimum either vendor adds. This page did not find a Daytona sentence that says paused sandboxes are free. It will not invent one.

E2B’s FAQ example, a default 2 vCPU and 512 MiB sandbox for one hour, is about $0.109. That shape is not in the table because AgentCore’s default consumption floor is a different size. Compare a shape you will actually run. Cold start is not in either price. AWS has published a P75 under 2 seconds on a 2 GB image. E2B’s price FAQ does not print a start time. A faster start is not a lower hourly rate.

## What should you change before the next deploy?

Pass `V2` or `V1` on purpose, read `platformVersion` back, and price the session you have, not the 68 percent.

Move a runtime when the cold start is the incident, the image is over 2 GB, or the agent spends most of a multi-turn session waiting and then releasing memory. Stay on V1, by setting `V1`, when the session is a long busy compile that already fits in a 2 GB image and the default 2 vCPU cap, and you have not measured a memory drop. The unit rate is the reason. A team that moves a hot loop to V2 because the blog said “68 percent more efficiently” will see a higher CPU line and a higher memory line on the same seconds.

Before the update, move secrets, clocks, and single-use tokens into the handler. After the update, watch `CPUUsed-vCPUHours` and `MemoryUsed-GBHours`, which the docs name as the way to pick a baseline. If those metrics sit near 2 GB and 0.5 vCPU, the 2048 row is the committed size to test, once you know the committed rate is live. If they spike toward 8 vCPU, you are already on the 8192 conversation, and the default consumption cap will not get you there.

The [harness](/glossary/harness) around this runtime is still yours: the model, the tools, the stop rules. AgentCore prices the microVM. It does not price the model call inside it. A worker model at $1.50 and $7.50 per million tokens is a separate invoice, covered in [Gemini 4 Hydrogen vs Carbon vs Argon for coding agents](/blog/gemini-4-hydrogen-vs-carbon-vs-argon). The loop those models run in is the [harnesses topic](/topics/harnesses) and the [harness tracker](/trackers/harnesses).

## Frequently asked questions

### Is the new AgentCore runtime the default?

AWS’s what’s-new post, dated November 12, 2026, says new runtimes in 19 listed regions use the next-generation AgentCore runtime by default. Existing runtimes stay on the current version until you move them. The runtime docs, read November 13, still say that if you omit `platformVersion` on create, the runtime uses V1. Set `platformVersion` to `V2` or `V1` on purpose, then confirm it with `get-agent-runtime`.

### How much does AgentCore runtime V2 cost per session?

The pricing page lists v2 consumption at $0.1276 per vCPU-hour and $0.0169 per GB-hour, billed per second with a 1-second minimum. A fully busy 10 minutes at 1 vCPU and 2 GB is $0.0269 at those rates. The same shape at v1 rates, $0.0895 and $0.00945, is $0.01807. AWS’s published support-agent example, with 60 seconds of CPU and a memory profile that drops, is $0.006703 per session. Real bills also include system overhead, and memory has a 128 MB minimum.

### How do you move an existing AgentCore runtime to V2?

Set `platformVersion` to `V2` when you update the runtime. Create and update take several minutes while AWS prepares the snapshot. The container must report healthy within 120 seconds, or creation fails the health check. Poll `get-agent-runtime` until the status is `READY` or ends in `FAILED`. An update or delete before that returns `ConflictException`. Initialize reusable work before the snapshot, and compute anything that expires inside the invocations handler.

### Does every V2 session get 8 vCPU and 32 GB?

No. The docs say the default consumption session is 2 vCPU and 8 GB, and that it cannot burst above that. The 8 vCPU and 32 GB peak is the burst ceiling of a committed baseline set with `minimumMemoryInMiB` 8192. The pricing page, read November 13, 2026, still describes committed baseline rates as launching by October 2026.

### Is AgentCore runtime cheaper than E2B?

Not on a fully busy hour. E2B’s docs, read November 13, 2026, bill allocated compute at $0.0504 per vCPU-hour and $0.0162 per GiB-hour for the whole time the sandbox is running. AgentCore v2 consumption is $0.1276 and $0.0169 on what the session uses, and CPU can drop to zero during I/O. A 10-minute sandbox at 1 vCPU and 2 GiB is $0.0138 on E2B. The same window on AgentCore, with CPU active for only 60 seconds and memory held at 2 GB, is $0.00776. The meters are different.
