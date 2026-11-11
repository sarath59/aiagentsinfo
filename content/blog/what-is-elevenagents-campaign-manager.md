---
title: "What Is ElevenAgents Campaign Manager?"
absoluteTitle: true
description: "ElevenLabs released ElevenAgents Campaign Manager on November 9, 2026. It keeps contacting a list until a named outcome, inside calling windows you set, with a default cap of 6 attempts and a do-not-call flag per campaign."
takeaways:
  - "ElevenLabs published ElevenAgents Campaign Manager on November 9, 2026. You give it contacts and an outcome, such as a qualified lead or a confirmed appointment. It retries, calls back, and redirects until that outcome or a stop, inside calling windows you set."
  - "The docs, read November 10, 2026, say a recipient is never called more than max_total_calls times. The default is 6 and the maximum is 30. A campaign copies the workspace policy when it is created. Changing the workspace policy later leaves the running campaign as it was."
  - "Phone voice, WhatsApp voice, and WhatsApp text work today. Email and SMS are described as coming soon. The docs reject campaigns for zero-retention workspaces and agents. The page does not list a separate Campaign Manager fee."
date: "2026-11-10"
updated: "2026-11-10"
category: news
topics:
  - news
  - tools-saas
  - how-agents-work
audience:
  - everyone
  - builders
companies:
  - elevenlabs
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "ElevenAgents Campaign Manager controls, transcribed November 10, 2026"
  description: "Attempt caps, channels, and concurrency rules copied from ElevenLabs’ Campaigns documentation and the November 9, 2026 announcement. The 50 to 60 percent sentence is a customer quote on that announcement. AI Agents Info did not run a campaign."
  isBasedOn: "https://elevenlabs.io/docs/eleven-agents/phone-numbers/campaigns"
sources:
  - title: "ElevenLabs, Introducing ElevenAgents Campaign Manager (November 9, 2026; read November 10, 2026)"
    url: "https://elevenlabs.io/blog/elevenagents-campaign-manager"
  - title: "ElevenLabs, Campaigns documentation (read November 10, 2026)"
    url: "https://elevenlabs.io/docs/eleven-agents/phone-numbers/campaigns"
  - title: "ElevenLabs in the AI Agents Info directory"
    url: "https://www.aiagentsinfo.com/directory/elevenlabs"
faq:
  - question: "What is ElevenAgents Campaign Manager?"
    answer: "ElevenAgents Campaign Manager is ElevenLabs’ outbound runner for voice agents, published November 9, 2026. You submit recipients and an outcome, such as a qualified lead or a confirmed appointment. The campaign contacts them across retries, callbacks, and redirects until that outcome or a stop, inside calling windows you set. The docs say it replaces batch calling. It uses the agents and phone numbers you already have in ElevenAgents."
  - question: "How many times will Campaign Manager call one person?"
    answer: "The docs, read November 10, 2026, say max_total_calls is a hard ceiling per recipient, including the first call. The default is 6 and the maximum you can set is 30. Separate ceilings limit callbacks and redirects. The example policy in the docs sets those to 2, and the page does not call 2 the default. A recipient can have up to five phone numbers. Exact-time callbacks the person asked for are dialed at that time, including outside your calling windows."
  - question: "Which channels does ElevenAgents Campaign Manager support?"
    answer: "The docs list phone voice, with full retry, callback, and redirect behavior; WhatsApp voice, which sends one permission request per recipient and then retries and callbacks; and WhatsApp text, which sends an approved template and does not retry. Email and SMS are described as coming soon. The announcement says the same three channels are available now."
  - question: "Does Campaign Manager have its own price?"
    answer: "The Campaigns docs, read November 10, 2026, do not list a separate fee. Campaign calls count toward the workspace and agent concurrency limits. By default a campaign uses the lower of 50 percent of workspace concurrency or 70 percent of the agent’s concurrency, and you can set a lower cap. Plan prices on the ElevenLabs directory listing were last checked November 3, 2026."
  - question: "Can you change the rules of a campaign that is already running?"
    answer: "The docs say no. A campaign copies the workspace policy when it is created. Later edits to the workspace policy apply to campaigns you create afterwards. To change a running campaign, stop it and create a new one. Do-not-call state belongs to that campaign, so a person in two campaigns is tracked twice unless you remove them yourself before you create the second one."
  - question: "Does Campaign Manager work with zero data retention?"
    answer: "The docs say campaigns are not available for workspaces or agents using Zero Retention Mode. Follow-up decisions depend on stored call state and conversation analysis, so those requests are rejected. The announcement also says Campaign Manager works with the guardrails, AI-agent detection, and transcript redaction you already use on ElevenAgents."
  - question: "What did The AA Ireland report?"
    answer: "On the November 9 announcement, Jeremy O'Sullivan, CTO of The AA Ireland, says they used to get through 50 to 60 percent of leads on a typical day, and that with Campaign Manager they get through 100 percent, with better voicemail detection than their previous system. That is a customer quote on ElevenLabs’ post. AI Agents Info did not audit the leads."
---

ElevenAgents Campaign Manager is ElevenLabs’ outbound runner for voice [agents](/glossary/agent), published on November 9, 2026. The [announcement](https://elevenlabs.io/blog/elevenagents-campaign-manager) says you give it contacts and an outcome, such as a qualified lead or a confirmed appointment, and it follows up until that outcome, carrying context from one touch to the next. The [docs](https://elevenlabs.io/docs/eleven-agents/phone-numbers/campaigns), read November 10, say this replaces batch calling.

The control that makes it a procurement question, not only a dialer, is the cap. `max_total_calls` includes the first call. The default is 6. The maximum is 30. Calling windows, a per-campaign do-not-call flag, and a policy that freezes when the campaign is created sit next to that cap. The docs do not list a separate fee for the feature. What the Agents pricing page charges for the minute underneath it, read November 11, is [what a voice AI agent costs per call](/blog/voice-ai-agent-cost-per-call-november-2026).

AI Agents Info read the announcement and the Campaigns docs on November 10, 2026. This page did not place a call. The product listing is [ElevenLabs](/directory/elevenlabs). What an agent is, beyond a voice model, is [How do AI agents work?](/blog/how-do-ai-agents-work).

## What does Campaign Manager actually run?

Campaign Manager uses the agents and phone numbers already in ElevenAgents. The announcement says there is nothing to rebuild. You enroll contacts with a CSV upload or the API, in the same request shape as a batch call. Each recipient can have up to five numbers, `phone_number` through `phone_number_5` in the CSV. Calls are queued at creation and dialed once they fall inside a calling window.

The announcement’s examples of an outcome are a qualified lead and a confirmed appointment, across sales, retention, patient care, collections, customer service, and recruiting. The telco story on that page is illustrative: a Tuesday call goes unanswered, a retry lands inside the window, the subscriber points the agent at a daughter who is on the account, and the next call is to her. The docs’ version of the same idea is a callback at a time the person names, or a redirect to another number, read from the call analysis.

A campaign shows one funnel from enrollment to outcome. Each contact has a decision timeline of what the agent did and why. Anything the system should not guess goes to a needs-attention queue with the call context attached. The announcement says the funnel and the queue export to CSV.

## Which limits can you set?

The docs put the persistence rules in a policy. The workspace has a default. Each campaign snapshots that policy at creation. A later change to the workspace policy applies only to campaigns created after the change.

| Control, from the docs read November 10, 2026 | What the page says |
| --- | --- |
| `max_total_calls` | Hard ceiling per recipient, including the first call. Default 6. Maximum 30. |
| `max_callbacks`, `max_redirects` | Ceilings on callbacks and redirects a recipient can request. The sample policy uses 2. The page does not call 2 the default. |
| `retry_delay_seconds` | Delay before a short retry after a failed, unanswered, or voicemail call. The sample uses 600. |
| `max_short_retries` | Short retries allowed in one calling window before the next attempt waits for a later window. |
| Calling windows | Weekdays 0 to 6, Monday as 0. Times are local `HH:MM` in the policy timezone. Intervals on the same day cannot overlap. |
| Exact-time callback | Dialed at the time the recipient asked for, including outside the windows. |
| Do not call | A data-collection flag. The list updates when the contact asks to stop, and it belongs to that campaign. |
| Phone numbers | Up to five per recipient. An optional `max_consecutive_failures_per_number` moves on after that many failures in a row. |
| Concurrency | Default is the lower of 50% of workspace concurrency or 70% of the agent’s concurrency. A campaign can set a lower cap. |

One policy has one timezone. The docs say contacts in several time zones need separate campaigns, so a call stays inside the hours allowed where that person lives. Retry and callback budgets reset per number when a call is redirected.

The announcement lists the same controls in product language: calling windows per campaign, attempt limits with a separate cap on callbacks, do-not-call lists that update when someone asks to stop, and disclosures set in the agent’s opening and prompt. Each attempt, callback, and redirect is logged against the contact. The announcement also says Campaign Manager uses the [guardrails](/glossary/guardrail) already on ElevenAgents, including a check of every response, detection when a call reaches another automated system, and redaction of sensitive details from transcripts and recordings.

## Which channels work on day one?

| Channel | What the docs say |
| --- | --- |
| Phone, voice | Full retry, callback, and redirect behavior. |
| WhatsApp, voice | One permission request per recipient, then retries and callbacks. |
| WhatsApp, text | An approved message template. Retries do not apply. |
| Email and SMS | Described as coming soon, on both the docs and the announcement. |

Follow-up context is a set of variables the prompt can read: `campaign__call_type` (first contact, retry, callback, or redirect), `campaign__previous_conversation_id`, `campaign__previous_summary`, and `campaign__previous_transcript`. The docs say callbacks, redirects, and do-not-call requests happen only if the agent records them. The prompt has to tell the agent when to write each one. Dynamic variables can also carry other analysis into the next call.

## What did the launch customers report?

The announcement says Campaign Manager had been in beta with customers in insurance, banking, ecommerce, and other industries. An insurance provider, unnamed, uses it to work a daily lead list and retry people it could not reach. A European bank, unnamed, calls people who may want a new credit card, qualifies interest, and hands the conversation to a relationship manager.

The one numbered result is a quote. Jeremy O'Sullivan, CTO of The AA Ireland, says: “We used to get through 50 to 60% of our leads on a typical day. With ElevenAgents Campaign Manager we get through 100%, and the voicemail detection is much better than our previous system.” That sentence is on ElevenLabs’ post. It is the customer’s account of their list. It is not a benchmark with a published task set, and this page did not see the leads.

## What should a buyer check before turning it on?

The docs put compliance on the caller. Outbound rules differ by country, state, and industry. You set the windows and the attempt limits, you are responsible for consent and for what the agent says, and the page points at the ElevenAgents terms and TCPA guidance. The caller still owns the list. The needs-attention queue is the place the product reserves for decisions it will not guess.

Four product limits matter before a contract:

- Zero Retention Mode is incompatible. The docs reject campaigns from zero-retention workspaces and submissions for zero-retention agents, because the next call depends on stored state and analysis.
- A running campaign’s policy is fixed. Stopping it and creating a new one is the documented way to change the rules.
- Do-not-call state is per campaign. The same person in two campaigns can be contacted twice unless you deduplicate first.
- There is no separate price on the docs page. Calls consume concurrency, at the lower of half the workspace or 70 percent of the agent unless you set a tighter cap. Seat and credit prices on the [directory listing](/directory/elevenlabs) were last checked November 3, 2026: Free is $0, and the paid monthly plans on that page run from Starter through Business at $990.

The API can create, manage, and read analytics. The docs point at the API reference for the paths and do not print them on the Campaigns page, so this article does not invent endpoint names. Enrollment is the same shape as a batch call.

The six-month voice-agent calendar, checked November 11, 2026, is [Voice agents, Nov 2026 to May 2027](/reports/voice-agents-next-6-months). Voice agents in the directory are under [Audio / voice](/directory/category/voice) and [Customer support](/directory/category/customer-support). A shortlist from that directory is the [agent picker](/tools/agent-picker). If you ship an outbound agent, the public form is [Submit](/submit). The definition this site uses for a stop rule a person still has to approve is an [approval gate](/glossary/approval-gate).
