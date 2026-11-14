---
name: Omnara
title: "Omnara: managed agents, $0 platform fee"
absoluteTitle: true
vendor: Omnara
website: https://www.omnara.com
logo: /logos/omnara.svg
summary: "Omnara is an open-source control plane for managed agents on any model and any machine. Omnara Cloud has no platform fee. Bring your own keys, or pay sandbox time."
category: ai-agents
tags:
  - agents
  - open-source
  - yc
  - developer-tools
pricing:
  - free
  - open-source
useCases:
  - agents
audiences:
  - builders
features:
  - Self-host free under Apache 2.0, or use Omnara Cloud with a $0 platform fee
  - Bring your own model keys and machines at no Omnara charge
  - Managed machines at $0.0414 per GiB-hour, plus retention
  - GitHub pull-request tools and a 5% fee on Omnara-managed credits
pricingSummary: "On omnara.com/pricing, fetched twice on 2026-11-14 and matching: $0 platform fee. No per-seat fee. Bring your own model keys free. Connect your own machines free. Self-host under Apache 2.0 free. Omnara-managed machines: $0.0414 per GiB of memory per hour online. Idle machines auto-sleep and pause runtime charges. Retention: $0.20016 per GiB of memory per 30 days, on top of runtime. The page's example: a 4 GiB machine active one hour a day is about $5 a month of runtime plus $0.80 of retention. Managed model tokens are the provider's rates. Credits for Omnara-managed models and machines carry a 5% service fee. No credit card required. Enterprise is contact sales."
startingPrice: $0
billingPeriod: usage
pricingPageUrl: https://www.omnara.com/pricing
socials:
  x: https://x.com/omnaraai
  linkedin: https://www.linkedin.com/company/omnara
  github: https://github.com/omnara-ai/omnara
lastVerified: "2026-11-14"
newThisWeek: true
---

Omnara is a control plane for agents you run in production. Searches for omnara ai, omnara github, omnara app, and omnara yc land here, not on the other "omnara" names in autocomplete. The homepage, read 2026-11-14, calls it the open-source alternative to Claude Managed Agents: one API to deploy and run agents for your users and your team, on any model, any machine, and any cloud. Y Combinator lists the company in Summer 2025. The organization schema on the pricing page names the email contact@omnara.com and the same GitHub, X, and LinkedIn links.

The app is app.omnara.com. Docs are docs.omnara.com. Source is github.com/omnara-ai/omnara. A coding agent can be pointed at omnara.com/SKILL.md. The homepage also shows a CLI launch, `npx omnara agents launch`, with a name, a source config, and a first message. TypeScript SDK and cURL are the other two clients on that block.

## What you deploy

The homepage list of places an agent can sit is specific: a panel inside your own product, an internal Slack agent, a code-review workflow, and an interactive CLI. The examples on the page are an SRE agent with read-only access to AWS and the repo, a Slack coding agent that can open a pull request, a daily digest of posts from X, Reddit, and LinkedIn, a browser agent that signs into web apps and works a queue, and a video agent that renders an MP4 with Remotion. Those are templates, not a claim that every install includes Slack and AWS on day one.

The durable-agent section says Omnara stores state in an event log so a run can resume after a failed model call, and so an idle agent does not hold compute. The machine section names three ways to get a computer: Omnara-managed sandboxes, your own account at Blaxel, Daytona, or Unikraft, or the Omnara daemon on a laptop, VM, or container. The daemon connects outbound, so you do not open a port. Access control on the page is human approval for risky tool calls, encrypted scoped secrets, roles for people and API keys, and an append-only audit history. A GitHub integration, documented at docs.omnara.com/integrations/github, lets an agent read a pull request or comment through a GitHub App you own. Omnara supplies the webhook and the permission set. GitHub has no chat handler. Approvals happen in the Omnara dashboard.

The comparison block on the homepage is Omnara's own framing against building the platform yourself and against a single-vendor managed agent service. The row that is a price, not a slogan, is "$0 platform fee" against "vendor-set" pricing, and "open source" against a closed control plane. Models are "any" against "one vendor's." Agent machines are "any machine" against "vendor's sandboxes." Data is "yours" against "vendor-held."

## Pricing

[omnara.com/pricing](https://www.omnara.com/pricing) was fetched twice on 2026-11-14. Both copies contained the same rates.

| What | Price |
| --- | --- |
| Platform fee | $0 |
| Per-seat fee | none listed |
| Your own model keys | $0 |
| Your own machines | $0 |
| Self-host the control plane | $0, Apache 2.0 |
| Managed machine, online | $0.0414 per GiB of memory per hour |
| Managed machine, retained | $0.20016 per GiB per 30 days, plus runtime |
| Managed model tokens | the provider's token rates |
| Service fee on Omnara-managed credits | 5% |

Idle managed machines auto-sleep. Runtime charges pause. Retention does not. The page's worked example: a 4 GiB machine active one hour a day is about $5 a month of runtime plus $0.80 of retention. No credit card is required to start. The 5% fee is described as covering provider costs on credits for Omnara-managed models and machines. It is not a fee on keys and machines you bring yourself.

Enterprise is a conversation, not a card: bring your own cloud with their team running it, on-prem install, SSO, access controls, audit logs, model fine-tuning, custom integrations, security review, and a custom SLA. A startup program offers credits and a shared Slack channel if you are accepted. Neither program prints a dollar amount.

The GitHub README comparison, as quoted on the public repository page, puts Claude Managed Agents at Claude token rates plus $0.08 per active session-hour, and puts Omnara at free to self-host or pay-as-you-go on Cloud. Use Omnara's own pricing page for the machine rates above. Do not mix the $0.08 figure into Omnara's bill. That number is the other product.

## Best for

A team that wants a managed agent loop, approvals, and a log, and does not want the agent history and the model choice locked to one lab.

## Watch out for

The $0 platform fee is not a $0 model bill. Tokens are still the provider's price, and Omnara-managed machines bill memory by the hour plus retention. A 4 GiB box left online all month is not the one-hour-a-day example. The 5% fee applies to Omnara-managed credits. Self-hosting moves the Postgres, the daemon, and the upgrades onto you. Enterprise SSO and on-prem are not in the self-serve card. The homepage quotes other companies on how hard their own agent platforms were to build. Those quotes are about their systems, not a benchmark Omnara ran.

## Alternatives

[Claude Agent SDK](/directory/claude-agent-sdk) and [OpenAI Agents SDK](/directory/openai-agents-sdk) are the harnesses tied to those labs. Omnara's pitch is that you can point the same control plane at either, or at a key you already have. [LangChain](/directory/langchain) and [CrewAI](/directory/crewai) are libraries you host and wire yourself. [Amazon Bedrock AgentCore](/directory/amazon-bedrock-agentcore) is AWS's managed agent runtime. [Browser Use](/directory/browser-use) is a browser driver, which is one tool an Omnara browser-agent template might call, not the control plane.

## Revenue

No public Stripe or TrustMRR figure for Omnara was found on 2026-11-14. Revenue is omitted. YC Summer 2025 is a batch, not a revenue number.

Last verified November 14, 2026.
