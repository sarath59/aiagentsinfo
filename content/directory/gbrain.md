---
name: GBrain
title: "GBrain: one memory every agent reads, from $49"
absoluteTitle: true
vendor: GBrain
website: https://gbrain.io
logo: /logos/gbrain.png
summary: "GBrain is a shared memory Claude, Codex, Cursor, and Hermes can read. Self-hosting is free under MIT. Hosted Personal is $49/month."
category: agent-frameworks
tags:
  - memory
  - mcp
  - open-source
  - agents
  - yc
pricing:
  - free
  - open-source
  - paid
useCases:
  - agents
  - coding
audiences:
  - builders
features:
  - MIT-licensed memory the agents you already use can search before they answer
  - Hosted Personal is $49/month. Team is $199/month, with $100 of AI credit and no per-seat fee
  - "MCP at https://gbrain.io/mcp, plus local stdio for Claude Code, Codex, Cursor, Hermes, and OpenClaw"
  - The npm package named gbrain is a different project. Install from GitHub
socials:
  github: https://github.com/garrytan/gbrain
pricingSummary: "On gbrain.io/pricing, fetched twice on 16 Nov 2026 (both HTTP 200, 77,402 bytes, same file): Personal is $49/month. Team is $199/month and includes $100 of AI credit each month, GBrain's own chat, scheduled skills, and the whole team in one workspace at no extra seat cost. Enterprise is custom. Personal and Team are billed monthly and stop any time. There is no hosted free plan on that page. The GitHub repository is MIT-licensed and free to self-host."
startingPrice: $49/month
billingPeriod: monthly
pricingPageUrl: https://gbrain.io/pricing
lastVerified: "2026-11-16"
newThisWeek: true
---

GBrain is the memory layer people are searching when they type gbrain github, gbrain garry tan, or gbrain hermes. You keep notes, decisions, and call transcripts in one place. Claude Code, Codex, Cursor, ChatGPT, Hermes, and OpenClaw look there before they answer, instead of starting from an empty chat. The software is free to run yourself. gbrain.io is the optional hosted copy, for a person or a team that does not want a machine left on.

## Who built it

Two public pages name different people, and both were live on 16 Nov 2026. The GitHub README at github.com/garrytan/gbrain is written in the first person by Garry Tan, President and CEO of Y Combinator. He says he built GBrain to run his own OpenClaw and Hermes agents. The gbrain.io homepage prints the lines "Backed by Y Combinator" and "Built by Garry Tan". The Y Combinator company page for the hosted product lists Brad Gessler as founder and CEO (he was cofounder and CTO of Poll Everywhere, YC S08) and Jamison Mercurio as cofounder (previously cofounder of Mango Health, YC W24). That page says the company was founded in 2026, batch Spring 2026, team size 3, San Francisco, primary partner Garry Tan. Their launch note says the three of them met building Garry's List and got tired of pasting the same keys and the same context into the next AI tool. Treat the repository as Garry Tan's MIT project and gbrain.io as the YC-hosted product in front of it. The README says the hosted site is optional.

The GitHub API on 16 Nov 2026 reported 33,120 stars, 4,955 forks, the MIT license, a repository created on 5 Apr 2026, and a push the same morning. The latest release was v0.60.728.0, published 15 Nov 2026. The README's stable channel is not every push. A release reaches stable only after the test suite and a two-hour load test of 600,000 pages, and only when an important fix is waiting or stable is a week old. Updates are not installed unless you turn automatic upgrades on.

## What you actually get

A self-hosted brain starts with no API key. Search is by keyword until you add one. The README's install is Bun 1.4.4 or newer, then `bun install -g github:garrytan/gbrain#stable`. It says GBrain is not on npm, and that the npm package named gbrain is unrelated and can shadow the real binary. `gbrain setup claude-code` or `gbrain setup codex` wires the local MCP server and a short instruction block so the agent calls the brain instead of ignoring it. Cursor and other stdio clients use `gbrain serve`. Hermes is documented as a local stdio server: Hermes runs `gbrain serve`, with no tunnel and no token, on either PGLite or Supabase. Hosted brains use `https://gbrain.io/mcp`. A setup call with a person is offered at no charge. The contact on the homepage is support@gbrain.io.

You point the brain at two folders of Markdown: your notes, and the company's docs. The company folder is meant to hold `facts.md`, `decisions.md` (each decision with a date, a reason, and who made it), and call transcripts as `.md` files. In a git folder, GBrain reads committed files only. The README is explicit that this is not a warehouse: ads, analytics, CRM, and payments stay in the warehouse, and the agent connects to those separately.

The homepage shows the memory as plain files the team owns, with one page per person, company, meeting, project, idea, concept, original note, and source document. The counts printed next to those folders (12 people, 8 companies, and so on) are the sample on the page, not a census of a customer. Garry Tan's README gives his own production figures, which this listing did not audit: 155,795 pages, 24,589 people, 5,340 companies, and 66 cron jobs. He also quotes a BrainBench relationship result: relationship retrieval lifting production recall-at-5 from 0.6626 to 0.7241. The same paragraph says 0.9791 is a graph-oracle upper bound, not a score the product claims.

Connected accounts are the other half. Gmail, calendar, Drive, Stripe, and other apps are connected once for the team. The homepage says the AI receives the result of a call, not the password. Each AI gets a level. On the sample card, Gmail can be Off, Read, Draft, Manage, or Read & Write (Read & Write also sends mail as you). Calendar can be Off, Read, or Read & Write. Stripe can be Off or On. A level change applies on the next call. An MCP server that is not on the built-in list can be added by address. The page says the official MCP registry lists more than 10,000.

Skills are packaged jobs. The homepage lists Are We Dying? (a daily email from payments, product, mail, calendar, and code), a pack of five customer-email skills that wait in Drafts until a person sends or approves auto-send, a pack of three launch skills, a pack of seven churn skills, one abandoned-checkout skill, Learn How I Talk, Deep Person Brief, and Inbox Cleanup. Scheduled cloud runs, GBrain's own chat, Slack or Telegram messages, and overnight memory upkeep start on the Team plan, not on Personal.

## Pricing

Fetched twice on 16 Nov 2026 from gbrain.io/pricing.

| Plan | Price | What is included |
| --- | --- | --- |
| Self-host | $0 | MIT repository. Keyword search with no API key. You run Bun and the machine |
| Personal | $49/month | Your apps in the AIs you already use, one shared memory, skills. No GBrain chat, no cloud schedules, no included AI credit |
| Team | $199/month | Everything in Personal, plus GBrain's own AI, Slack or Telegram, scheduled skills with the laptop closed, overnight upkeep, model choice (Anthropic or OpenAI), $100 of AI credit a month, and the whole team in one workspace at no extra seat cost |
| Enterprise | Custom | Mission Control across teams, a workspace per employee plus one per team, outside guests, one bill |

Personal and Team stop when you cancel. The page says a workspace is up in about two minutes after a Google or email sign-in, with nothing to install for the hosted path. The $100 credit is model spend inside GBrain. Your Claude, ChatGPT, or Codex subscription is a separate bill. The README says the same thing: harness subscription and any model API you configure yourself are different costs.

## Best for

A person or a small company that already pays for Claude, Codex, or Cursor and is tired of re-explaining the same decisions in every new chat. The win is one folder of facts those agents can all read, including a new hire's agent.

## Watch out for

Personal is not the team product. Chat inside GBrain, scheduled skills, and the $100 credit start at $199. There is no hosted free tier on the pricing page. Self-hosting is the free tier, and the always-on version in the README wants a server with 8 GB of RAM or more plus its own API usage. Do not `npm install -g gbrain`. The stable channel lags the repo on purpose, and the repo was pushing on the morning of this check, so a `#stable` install and the default branch are not the same bits. Sharing is not a blanket guarantee. The README says authenticated remote clients are limited by source grants, operation grants, and visibility filters, and that local files and shared database credentials are a different trust boundary. Sources alone do not isolate those callers. Read that before you put a company brain on a shared machine. Gmail set to Read & Write can send mail as you. Stripe set to On is a read in the sample card ("look up a customer and move no money" is the homepage's example), so read the live permission label before you turn it on. The homepage's "Built by Garry Tan" line and the YC founder list are both on the public web. Quote the page you mean.

## Alternatives

[TypingMind](/directory/typingmind) is a chat client in front of your own API keys. It does not file a company memory that Claude Code and Codex both read. [Claude Code](/directory/claude-code) and [Cursor](/directory/cursor) are the agents GBrain connects to, not a substitute for the memory. [Omnara](/directory/omnara) runs a durable agent with an event log and a machine. [Pydantic AI](/directory/pydantic-ai) is a Python library for typed tool calls. [BrowserOS](/directory/browseros) lets an agent use a logged-in browser. None of those is a MIT memory store with a hosted seat at $49.

Last verified: 16 Nov 2026.
