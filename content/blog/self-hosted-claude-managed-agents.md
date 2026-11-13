---
title: "Self-hosted Claude Managed Agents has no public price"
description: "Anthropic's November 12, 2026 private beta runs the harness, sandboxes, and session database on your machines. Hosted runtime stays $0.08 per hour while a session is running. Self-hosted pricing is the account team."
absoluteTitle: true
takeaways:
  - "Anthropic's November 12, 2026 article and the Claude Platform release notes the same day put self-hosted Claude Managed Agents in private beta. You operate the server, its database, and the workers. Model calls still leave your network, to the Claude API by default, or to Amazon Bedrock, Google, Microsoft Foundry, or a gateway you choose."
  - "The pricing page, read November 13, 2026, bills hosted Claude Managed Agents at $0.08 per session-hour while status is running, plus model tokens. It tells you to contact your Anthropic account team for self-hosted pricing. A 30-day month of continuous running time is $57.60 of runtime before tokens."
  - "Nothing copies over from the hosted service. Scheduled deployments, webhooks, and dreams are absent. Docker Compose is a development stack. Production is the two Helm charts, on Kubernetes 1.30 or later, with PostgreSQL 16 or later."
date: "2026-11-13"
updated: "2026-11-13"
category: explainer
topics:
  - harnesses
  - tools-saas
  - how-agents-work
  - task-performance
audience:
  - builders
  - buyers
companies:
  - anthropic
  - amazon
  - openai
  - google
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Hosted Claude Managed Agents runtime at $0.08 per running hour, read November 13, 2026"
  description: "The $0.08 session-hour rate and the $0.58 and $0.428 one-hour Opus 5.5 examples are copied from Anthropic's pricing page on November 13, 2026. The $57.60, $417.60, and $308.16 figures are those published examples multiplied by 720 hours. Self-hosted Claude Managed Agents has no public price on that page. AI Agents Info did not run a session."
  isBasedOn: "https://platform.claude.com/docs/en/about-claude/pricing"
sources:
  - title: "Anthropic, Operate Claude Managed Agents inside your security perimeter (November 12, 2026)"
    url: "https://claude.com/resources/articles/self-hosted-claude-managed-agents"
  - title: "Claude Platform release notes, November 12, 2026"
    url: "https://platform.claude.com/docs/en/release-notes/overview"
  - title: "Claude docs, Managed Agents overview (read November 13, 2026)"
    url: "https://platform.claude.com/docs/en/managed-agents/overview"
  - title: "Claude docs, Differences from the hosted service (read November 13, 2026)"
    url: "https://platform.claude.com/docs/en/managed-agents/self-hosted/differences"
  - title: "Claude docs, Data and access in self-hosted Claude Managed Agents (read November 13, 2026)"
    url: "https://platform.claude.com/docs/en/managed-agents/self-hosted-data-and-access"
  - title: "Claude docs, Pricing (read November 13, 2026)"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
  - title: "Claude docs, Get started with self-hosted Claude Managed Agents (read November 13, 2026)"
    url: "https://platform.claude.com/docs/en/managed-agents/self-hosted/quickstart"
  - title: "Claude docs, Deploy on Kubernetes (read November 13, 2026)"
    url: "https://platform.claude.com/docs/en/managed-agents/self-hosted/kubernetes"
faq:
  - question: "Is self-hosted Claude Managed Agents generally available?"
    answer: "The November 12, 2026 article and the platform release notes call it a private beta. You request access, and the release download, from your Anthropic account team. Hosted Managed Agents is a separate beta. The overview says that one is enabled by default for all API accounts, and every endpoint still sends the managed-agents-2026-04-01 beta header."
  - question: "Does self-hosting keep the prompt inside your network?"
    answer: "The transcript stays in your database. The model call sends the conversation so far, including prompts, tool inputs, and tool results, to the provider you configured. The default is the Claude API. The data-and-access page says the server connects to Anthropic only in that case, and that Anthropic has no remote access to the server or its log."
  - question: "How much does it cost?"
    answer: "Self-hosted pricing is not on the pricing page. The page says to contact your account team. Hosted runtime is $0.08 per hour while status is running. Seven hundred twenty of those hours cost $57.60 before tokens. Anthropic's own one-hour Opus 5.5 example, scaled by the same 720, is $417.60 uncached and $308.16 with the cache split the page prints."
  - question: "Can you migrate a hosted workspace?"
    answer: "The differences page says nothing is copied, session history included. You create the agents, skills, credentials, and memory stores again. Scheduled deployments and webhooks are not on the server."
  - question: "Who should apply this week?"
    answer: "A team with an account team, a cluster they will actually operate, and a review that fails while Anthropic holds the transcript. A team that only needs the sandbox on its own machines should use self-hosted sandboxes and skip the beta."
---

Self-hosted Claude Managed Agents has **no public price**. Anthropic opened the private beta on November 12, 2026. You run the harness, the sandboxes, and the session database. The model call still leaves. Hosted Claude Managed Agents, the service Anthropic runs, stays at **$0.08 per session-hour** while a session's status is `running`. A session that stays in that state for all 720 hours of a 30-day month is **$57.60** of runtime before any token.

The [November 12 article](https://claude.com/resources/articles/self-hosted-claude-managed-agents) calls the product a new way to run Managed Agents. The [release notes](https://platform.claude.com/docs/en/release-notes/overview) the same day say you run the whole service, store agents, sessions, and session history on your infrastructure, and the server sends model requests to the provider you choose, Anthropic by default. The monthly arithmetic, and the platforms that publish a different clock, are [720 hours of Claude agent runtime is $57.60](/research/always-on-ai-agent-cost-november-2026).

## What shipped on November 12?

A private beta of the control plane. The hosted harness, which Anthropic has offered since the April 8, 2026 release notes, stays where it is. Self-hosted sandboxes, which the May 19, 2026 notes added, stay a smaller move: you run the tools, Anthropic still runs the agent.

The November 12 article is specific about the new boundary. Every part of the service runs in your cloud or on-premise: the harness, the sandboxes, the credentials, and the session history. You operate the Managed Agents server, its database, and the workers where agents run shell and file tools. Developers keep the same core APIs as the hosted service. Access is a conversation with your Anthropic account team. The docs repeat that sentence on the quickstart, the Kubernetes guide, and the differences page, and they add that the release archive itself is behind the same request.

That is the whole public offer. There is no console button, no list price, and no general-availability date on the pages read November 13.

## Where does each piece actually run?

The harness can sit in your network. The weights do not. A model call carries the conversation so far, including prompts, tool inputs, and tool results.

| Piece | Hosted Managed Agents | Self-hosted sandbox, since May 19 | Self-hosted Managed Agents, November 12 |
| --- | --- | --- | --- |
| Agent loop | Anthropic | Anthropic | Your server |
| Shell and file tools | An Anthropic-managed sandbox | Your worker | Your workers, one sandbox per session in the Compose and Helm stacks |
| Session history | Anthropic, until you delete the session | Anthropic. You host only the sandbox | Your database. With no database configured, the server holds it in memory and a restart erases it |
| Vault secrets | A proxy outside the sandbox adds the credential | Environment-variable credentials are not yet supported | Your database, or a secret manager you configure for new credentials |
| Model | Claude, on the Claude API, Claude Platform on AWS, or Claude Models on Google Cloud (Anthropic managed) | Claude, on Anthropic's side | Claude API by default. The November 12 article also names Amazon Bedrock, Google's Agent Platform, Microsoft Foundry, and your own gateway |
| What the model provider receives | The conversation, tool results, and, for a cloud sandbox, the sandbox's files and state | The conversation, tool results, skills, and memory stores. Sandbox files stay on your worker | The conversation so far. When the provider is the Claude API, three ID headers go out too, and no setting turns them off |
| Zero data retention | Not eligible. Transcripts persist until you delete them | Not eligible. Anthropic still stores the transcripts | You store the transcripts. Claude API calls follow your organization's agreement, including ZDR, the same way other Messages API calls do |

Source: aiagentsinfo.com. The November 12 split is from Anthropic's [article](https://claude.com/resources/articles/self-hosted-claude-managed-agents) and the [release notes](https://platform.claude.com/docs/en/release-notes/overview). The sandbox column is from [Choosing an environment](https://platform.claude.com/docs/en/managed-agents/choosing-an-environment) and the May 19 release note. Retention and the header rule are from [Data and access](https://platform.claude.com/docs/en/managed-agents/self-hosted-data-and-access), read November 13, 2026. The Google name differs by page: the article says "Google's Agent Platform," and the data-and-access page says "Claude Models on Google Cloud (Google managed)."

Anthropic's security claim is narrower than "the prompt never leaves," and it is still a real claim. The data-and-access page says Anthropic has no remote access to the server or its log, Anthropic issues none of the credentials the server accepts, and the server never connects to a worker. Workers have whatever network you give the sandbox. The egress gateway, if you turn it on, connects to hosts you list and can attach stored credentials. Web search and web fetch, once you enable them, run at the inference provider. The server makes no connection of its own for those tools.

Two identifiers do leave when the provider is the Claude API. Each model call can carry `metadata.user_id` set to the label `cma-server`, and a `User-Agent` that names the server software and version. The data-and-access page says neither field identifies your deployment by itself. The API key identifies the organization. Calls to Amazon Bedrock and to Claude Models on Google Cloud (Google managed) do not send `metadata.user_id`. A gateway of yours that rejects that field will fail every model call that carries it.

## Who is the private beta for?

Teams that already have an Anthropic account team, and a security review that fails while Anthropic stores the transcript or can reach the box.

The November 12 article names the work: agents that fix broken builds, test releases, triage alerts, and clear a bug backlog, unattended, with access to internal systems. For that access, some teams want the whole service in their environment. The hosted product is the wrong shape for them, because the overview is explicit: Managed Agents is stateful, transcripts persist until you delete them, and the product is not eligible for zero data retention or a HIPAA BAA. The exception it names is this beta, where you store that data yourself.

It is a poor fit for four other buyers.

- A team that only needs `bash` and files on its own machines. Self-hosted sandboxes already do that. Anthropic still runs the loop, and tool results still go back so the model can continue. The [environment guide](https://platform.claude.com/docs/en/managed-agents/choosing-an-environment) is the decision page.
- A team that wants a price. The pricing page sends self-hosted pricing to the account team and prints a rate only for the hosted runtime.
- A team that wants the scheduled deployment and the webhook. The differences page says the server has no routes for scheduled deployments, dreams, or webhooks. You start sessions from your own scheduler and keep workers polling.
- A team that wants to point an existing hosted workspace at the new server. Nothing is copied.

The beta is also a single trust boundary. The data-and-access page says each deployment serves one tenant at one trust level. Environments inside one deployment do not isolate trust. The server API key reaches every environment. Separate tenants, and separate trust levels, each get their own deployment, database, key, and workers.

## What do you give up when you leave the hosted service?

The API is the same, and then the differences page spends its length on what is not.

Cloud environments do not exist. A request for one returns HTTP 400. The Messages API and the Models API are not on this server. `/v1/messages` and `/v1/models` return 404. File resources and the Files API are rejected. `memory_store` resources work. Prebuilt `docx`, `pdf`, `pptx`, and `xlsx` skills are rejected. You upload skills yourself, and a zip upload fails with `SKILL.md not found in uploaded files` because the server does not unpack archives.

Multiagent orchestration shrinks. The server accepts a `multiagent` block only when its type is `coordinator`, with 1 to 20 agents you list. Dynamic workflows, the advisor, and subagents the agent defines itself are absent. The examples that set the type to `multiagent_20261001` return 400 on this server.

Web tools are off until the settings file enables them. MCP servers and Git hosts are refused until you list the exact hostnames. The MCP result cap defaults to 100 KiB, and the rest of a longer result is dropped. On the hosted service, a long result can be saved to a file in a cloud sandbox. An image or document sent as a URL is accepted and the model never sees it. Send `base64`.

The Claude Console at platform.claude.com does not show your server. You use the console the server itself serves, on the same address as the API, with no credential required to load the page. Doing anything in it requires your identity provider. That is worth a firewall rule before the Helm install, not after.

## How does this compare with AgentCore and with OpenAI's hosted sandbox?

Those products host a place for tools to run. They do not ship Anthropic's harness, and they do not take Anthropic's $0.08.

[Amazon Bedrock AgentCore](/directory/amazon-bedrock-agentcore) is a microVM you put your own agent in. The November 12 runtime change, the V1 and V2 rates, and the 8-hour microVM lifetime are [AgentCore runtime V2 is now the default](/blog/agentcore-runtime-v2-default). A fully busy hour at 1 vCPU and 2 GB on the V2 consumption rates is $0.1614 before system overhead. The same busy hour of hosted Claude runtime is $0.08, and the model tokens are extra on both invoices. AgentCore can scale CPU to zero during I/O. Claude's $0.08 accrues for the whole time status stays `running`, including the model call, and drops to zero when status is `idle`. The clocks are different products.

OpenAI's Agents API, read November 13, bills model tokens at API rates and OpenAI-hosted sandboxes at the standard container rates. The sandbox page's default size is `medium`, 2 vCPU and 4 GB. The pricing page prices a 4 GB container at $0.12 per 20-minute session. That is a sandbox fee with a model fee beside it. It is not a Managed Agents session. Codex Cloud is a third thing: the Codex help article, retrieved the same day, says standard Codex Cloud environments have no separate VM charge at launch, and usage counts against the plan. A Codex seat is not this beta, and it is not the $0.08.

If the question is "where can the loop run," the November 12 answer is: on a server you operate, talking to a model provider you name. If the question is "where can the tools run," you have had an answer since May 19, and AgentCore and the OpenAI sandbox are other answers with their own meters. The [always-on cost note](/research/always-on-ai-agent-cost-november-2026) prices those meters for 720 hours. Seat prices for Claude Code and Codex, which are not this runtime, stay on [Claude Code vs Codex pricing](/blog/claude-code-vs-codex-pricing).

## What is the hosted bill, and which limits are printed?

$0.08 per hour of `running`. Tokens are the model card. A one-hour Opus 5.5 example on the pricing page is $0.58 with 50,000 input tokens and 15,000 output tokens, or $0.428 when 40,000 of those input tokens are cache reads.

| Line | Published figure | 720 hours, this page's multiplication |
| --- | --- | --- |
| Session runtime, status `running` | $0.08 per hour, metered to the millisecond | $57.60 |
| Opus 5.5, the uncached example | 50,000 input at $4 per million, 15,000 output at $20 per million, plus $0.08. Total $0.58 | $417.60 |
| Opus 5.5, the cached example | 10,000 uncached input, 40,000 cache reads at 0.05×, 15,000 output, plus $0.08. Total $0.428 | $308.16 |
| Self-hosted server | "Contact your Anthropic account team" | No public figure |

Source: aiagentsinfo.com. Rates and the two worked examples are from the [pricing page](https://platform.claude.com/docs/en/about-claude/pricing), read November 13, 2026. Each 720-hour cell is the published one-hour total times 720. November 2026 has 30 days, so 720 is 30 × 24. Idle, `rescheduling`, and `terminated` time are outside the runtime meter. Web search inside a session is an extra $10 per 1,000 searches. US-only inference is 1.1× on tokens. The Batch API discount does not apply.

The pricing page does not print a separate container fee on top of session runtime. It also does not print a waiver of the $0.08 when you bring your own sandbox. The self-hosted service, the one where you run the server, is the row with no number.

Limits that are printed, and that change a design review:

| Limit | Where it is printed | What it does to a plan |
| --- | --- | --- |
| Private beta, release archive on request | November 12 article, release notes, quickstart | You cannot `docker pull` this from a public registry and call it done |
| Hosted create 300 requests per minute, read 1,200, per organization | Managed Agents reference | Plus the organization's spend limit and usage-tier limits |
| Compose is development | Quickstart | Plain HTTP. Port 8400 on `127.0.0.1` by default. Run Docker Engine 28.3.3 or later. The host needs at least two CPUs. The stack starts 10 workers, and a session that never receives a message keeps a worker for up to an hour |
| Production is two Helm charts | Kubernetes guide | Kubernetes 1.30 or later, PostgreSQL 16 or later, gVisor for the sandbox pool on GKE, and a network plugin that enforces NetworkPolicy |
| Model call timeout 20 minutes, stream idle 5 minutes, MCP call 4 minutes | Self-hosted configuration reference, defaults | A hung provider call dies on the server's clock |
| Coordinator only, 1 to 20 listed agents | Differences page | A swarm the agent invents at runtime will not start |
| Workflow run lifetime 24 hours by default | Workflow runs, hosted service | Self-hosted has no scheduled-deployment routes. A cron you run is your clock |

The quickstart is blunt about the Compose stack. It serves plain HTTP, and agent tools run in containers on that host, so the machine should hold nothing you need to protect. Production is the Helm path. The upgrade guide is the other operational fact: a minor upgrade can change the database schema, the dump holds every conversation in plain text, and the guide tells you to encrypt the backup. Plan for that before the first session worth keeping.

## What should you do this week?

Ask your account team if the review in front of you is about the transcript and the server, and you can staff a Kubernetes cluster and a PostgreSQL 16 database. Read the differences page before anyone writes "lift and shift" in a ticket. Budget the hosted $0.08 for whatever you run while you wait, and treat idle time as a status you can see, because that status is the difference between $57.60 and $0 of runtime.

Wait if the requirement is only "tools on our network." Self-hosted sandboxes are the feature that matches that sentence, and they have been in the release notes since May 19. Waiting is also the right call if you need webhooks, scheduled deployments, or a copy of the agents you already built. Those are absent, and the docs say so in a table rather than a footnote.

The numbers in the table are licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Credit AI Agents Info if you reuse them. They are arithmetic on Anthropic's published hour, not an invoice.

## Frequently asked questions

### Is self-hosted Claude Managed Agents generally available?

The November 12, 2026 article and the platform release notes call it a private beta. You request access, and the release download, from your Anthropic account team. Hosted Managed Agents is a separate beta. The overview says that one is enabled by default for all API accounts, and every endpoint still sends the `managed-agents-2026-04-01` beta header.

### Does self-hosting keep the prompt inside your network?

The transcript stays in your database. The model call sends the conversation so far, including prompts, tool inputs, and tool results, to the provider you configured. The default is the Claude API. The data-and-access page says the server connects to Anthropic only in that case, and that Anthropic has no remote access to the server or its log.

### How much does it cost?

Self-hosted pricing is not on the pricing page. The page says to contact your account team. Hosted runtime is $0.08 per hour while status is `running`. Seven hundred twenty of those hours cost $57.60 before tokens. Anthropic's own one-hour Opus 5.5 example, scaled by the same 720, is $417.60 uncached and $308.16 with the cache split the page prints.

### Can you migrate a hosted workspace?

The differences page says nothing is copied, session history included. You create the agents, skills, credentials, and memory stores again. Scheduled deployments and webhooks are not on the server.

### Who should apply this week?

A team with an account team, a cluster they will actually operate, and a review that fails while Anthropic holds the transcript. A team that only needs the sandbox on its own machines should use self-hosted sandboxes and skip the beta.

