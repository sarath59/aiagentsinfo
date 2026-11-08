---
title: "How Do AI Agents Work? The Control Loop From Goal to Action (2026)"
description: "How do AI agents work? A language model proposes a step. A harness runs an allowed tool, returns the result, and the loop continues until the goal is met, a limit hits, or a person must approve."
takeaways:
  - "An AI agent is a language model plus a harness. The model proposes a step. The harness runs an allowed tool, returns the result, and the loop continues until the goal is met, a limit hits, or a person must approve."
  - "A chatbot replies. A RAG app answers from text the application retrieved. A fixed workflow follows rules written in advance. An agent lets the model choose the next step. A multi-agent system splits that work across roles."
  - "On November 8, 2026, the Claude Agent SDK and OpenAI’s Agents SDK both describe that loop, and the Model Context Protocol specification’s current version is still 2026-07-28. Agent2Agent (A2A) 1.0.0 is the separate protocol for one agent talking to another."
  - "Deloitte’s November 18, 2025 essay predicts a shift toward human-on-the-loop supervision during 2026. That is a forecast. A person who must approve a step before it counts is still human in the loop."
date: "2026-11-08"
updated: "2026-11-08"
category: guide
topics:
  - how-agents-work
  - harnesses
  - research
audience:
  - everyone
  - builders
companies:
  - anthropic
  - claude
  - openai
  - microsoft
  - google
  - sec
  - arxiv
byline: "AI Agents Info Editorial"
sources:
  - title: "Anthropic, How the agent loop works (read November 8, 2026)"
    url: "https://code.claude.com/docs/en/agent-sdk/agent-loop"
  - title: "Anthropic, Agent SDK overview (read November 8, 2026)"
    url: "https://code.claude.com/docs/en/agent-sdk/overview"
  - title: "Anthropic, PBC, Form S-1/A, defined terms for agent loop and agentic AI (filed November 2, 2026; read November 8, 2026)"
    url: "https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm"
  - title: "OpenAI, Running agents (read November 8, 2026)"
    url: "https://developers.openai.com/api/docs/guides/agents/running-agents"
  - title: "OpenAI, Orchestration and handoffs (read November 8, 2026)"
    url: "https://developers.openai.com/api/docs/guides/agents/orchestration"
  - title: "OpenAI, Guardrails and human review (read November 8, 2026)"
    url: "https://developers.openai.com/api/docs/guides/agents/guardrails-approvals"
  - title: "OpenAI, A business leader’s guide to working with agents (PDF, read November 8, 2026; no publication date on the copy)"
    url: "https://cdn.openai.com/business-guides-and-resources/a-business-leaders-guide-to-working-with-agents.pdf"
  - title: "Microsoft Learn, Workflow orchestrations in Agent Framework (read November 8, 2026)"
    url: "https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/"
  - title: "Microsoft Learn, AI Agent Orchestration Patterns (read November 8, 2026)"
    url: "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns"
  - title: "Agent2Agent Protocol, home page (read November 8, 2026)"
    url: "https://a2a-protocol.org/latest/"
  - title: "Agent2Agent Protocol, A2A and MCP (read November 8, 2026)"
    url: "https://a2a-protocol.org/latest/topics/a2a-and-mcp/"
  - title: "Agent2Agent Protocol specification, latest released version 1.0.0 (read November 8, 2026)"
    url: "https://a2a-protocol.org/latest/specification/"
  - title: "Model Context Protocol, What is MCP? (read November 8, 2026)"
    url: "https://modelcontextprotocol.io/docs/getting-started/intro"
  - title: "Model Context Protocol, specification revision 2026-07-28 (read November 8, 2026)"
    url: "https://modelcontextprotocol.io/specification/2026-07-28"
  - title: "Model Context Protocol, Versioning (read November 8, 2026)"
    url: "https://modelcontextprotocol.io/docs/learn/versioning"
  - title: "Deloitte Insights, Unlocking exponential value with AI agent orchestration (November 18, 2025; read November 8, 2026)"
    url: "https://www.deloitte.com/global/en/insights/industry/technology/technology-media-and-telecom-predictions/2026/ai-agent-orchestration.html"
  - title: "Yao et al., ReAct: Synergizing Reasoning and Acting in Language Models (arXiv:2210.03629)"
    url: "https://arxiv.org/abs/2210.03629"
  - title: "Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (arXiv:2005.11401)"
    url: "https://arxiv.org/abs/2005.11401"
faq:
  - question: "How do AI agents work?"
    answer: "An AI agent is a language model plus a harness. The model proposes a step. The harness runs an allowed tool, returns the result, and the loop continues until the goal is met, a limit hits, or a person must approve. Anthropic’s November 2, 2026 prospectus calls that cycle the agent loop."
  - question: "What is an agent loop?"
    answer: "An agent loop is the cycle of proposing an action, running an allowed tool, observing the result, and choosing the next step until a stop condition. Anthropic’s prospectus, read November 8, 2026, defines it as receiving a task, taking an action, observing the result, and deciding the next step until the task is complete."
  - question: "What is the difference between a chatbot, a RAG app, a workflow, and an AI agent?"
    answer: "A chatbot returns a reply. A RAG app retrieves text and then generates an answer from it. A fixed workflow follows steps and rules written in advance. An AI agent starts from a goal, and the model chooses the next tool while a harness runs only what the rules allow. A multi-agent system splits that work across more than one role."
  - question: "How does an AI agent use tools?"
    answer: "The model requests a tool, such as a file read, a command, a web search, or an external connector. The harness checks the permission rules and, if the call is allowed, runs it and returns the result. The Model Context Protocol, current version 2026-07-28 on November 8, 2026, is one open way to connect those tools."
  - question: "What is agent orchestration?"
    answer: "Agent orchestration is the rule for which step, tool, or agent runs next, and who owns the answer. OpenAI’s Agents SDK distinguishes a handoff, where a specialist takes over, from an agent used as a tool, where a manager keeps the final answer. Microsoft Learn documents sequential, concurrent, handoff, group chat, and Magentic patterns."
  - question: "How do multi-agent systems work?"
    answer: "A multi-agent system assigns one job to more than one role. The roles may run in a fixed line, at the same time, by handing off ownership, in a shared thread, or under a manager that keeps a plan. Microsoft’s architecture guide says this adds coordination cost, and to use it when one agent cannot reliably do the job."
  - question: "How will AI agents work in the future?"
    answer: "Two protocols are already specified. MCP connects an agent to tools and data. A2A connects independent agents to each other. Deloitte’s November 18, 2025 essay predicts that, in 2026, the most advanced organizations will start moving some supervision from approving every step to watching telemetry and intervening. That prediction is dated. It is not a claim that the shift is finished."
  - question: "What is human on the loop?"
    answer: "Human on the loop means a person supervises a run from its record and can intervene. Human in the loop means a person approves, edits, or stops a step before that step counts. Deloitte’s November 18, 2025 essay names both, along with humans out of the loop, as a supervision spectrum."
---

Updated November 8, 2026.

## How do AI agents work?

An AI agent works as a [language model](/glossary/llm) plus a [harness](/glossary/harness). The model proposes a step. The harness runs an allowed [tool](/glossary/tool-use), returns the result, and the loop continues until the goal is met, a limit hits, or a person must approve.

That cycle is the control loop from goal to action. [Anthropic’s Form S-1/A](https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm), filed November 2, 2026 and read again on November 8, defines the [agent loop](/glossary/agent-loop) as the cycle in which an agent receives a task, takes an action such as planning, running code, or calling a tool, observes the result, and decides the next step, repeating until the task is complete. The same defined terms call that loop the core execution pattern of agentic AI, and they call agentic AI a system that can plan and carry out steps, including with tools, services, datasets, and environments, on a user’s behalf.

AI Agents Info uses those words the same way on the glossary and on this guide. The short definition stays at [What are AI agents and how do they work?](/glossary/agent). This page is the long explainer. A model that only replies, a retrieval step that fills the prompt, and a script that follows rules written in advance are the neighboring systems. Each one is spelled out below.

The workshop around the model is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness). Testing one observable action in that workshop is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness). The 2022 prompting pattern that interleaved a written thought with an action is [ReAct](/research/react-reasoning-and-acting). The dated public record for the coming year is [AI agents, the next 12 months](/reports/ai-agents-next-12-months). Read those for the workshop, the tests, the paper, and the forecast.

## What is an agent loop?

An agent loop is the cycle of proposing an action, running an allowed tool, observing the result, and choosing the next step until a stop condition.

Anthropic’s filing gives the public definition quoted above. The [Claude Agent SDK loop page](https://code.claude.com/docs/en/agent-sdk/agent-loop), read November 8, 2026, describes the same cycle inside a product runtime. The SDK delivers the prompt, the system prompt, the tool definitions, and the conversation history. Claude answers with text, tool calls, or both. The SDK runs the requested tools and feeds the results back. The cycle repeats until Claude produces a response with no tool calls. The SDK then yields that text and a result message with token usage, cost, and a session id. Hooks can intercept, change, or block a tool call before it runs. `maxTurns` and `maxBudgetUsd` stop the loop at a turn count or a spend cap. The page says a read-only agent whose allow list is Read, Glob, and Grep runs those tools without asking the person, apart from reads on network paths, and a tool on the disallow list is blocked.

[OpenAI’s running-agents guide](https://developers.openai.com/api/docs/guides/agents/running-agents), read the same day, describes one SDK run as one application turn. The runner calls the current agent’s model, inspects the output, executes tool calls and continues, switches agents on a handoff, and returns when the model produces a final answer with no more tool work. A max-turn limit, a guardrail exception, or a tool error is a failure. A human approval is a pause: the run resumes from the saved state, and it is the same run.

[ReAct](https://arxiv.org/abs/2210.03629), Yao and coauthors, 2022, is the research ancestor of the written form of this cycle: a reasoning trace, then an action, then an observation. The paper’s scores belong to that paper. The [research note](/research/react-reasoning-and-acting) says so. The pattern is what later runtimes kept.

## How does an AI agent differ from a chatbot, an assistant, a RAG app, and a workflow?

A chatbot returns a reply. A RAG app retrieves text and then answers. A fixed workflow follows rules written in advance. An AI agent lets the model choose the next step, and a harness runs it. A multi-agent system splits that work across roles.

An assistant, in ordinary product language, is the application a person opens. The same assistant sits in a different row of the table below depending on what the software does after the message arrives. [Microsoft’s architecture guide](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns), read November 8, 2026, puts the choices in that order and says to use the lowest level that reliably meets the requirement: a direct model call, one agent with tools, or multi-agent orchestration.

[OpenAI’s business guide](https://cdn.openai.com/business-guides-and-resources/a-business-leaders-guide-to-working-with-agents.pdf), a PDF read November 8, 2026, draws the same line with three systems. The copy has no publication date. Its examples still use the names ChatGPT agent, Deep Research, and Operator. This page uses the PDF for the distinction, and it leaves current workplace product names to [What is an AI employee?](/blog/what-is-an-ai-employee), which was checked November 7, 2026.

<div class="table-scroll">
<table>
<thead>
<tr>
<th></th>
<th>Chatbot</th>
<th>RAG app</th>
<th>Fixed workflow</th>
<th>AI agent</th>
<th>Multi-agent system</th>
</tr>
</thead>
<tbody>
<tr>
<td>Who chooses the next step</td>
<td>The person does, by sending another message. OpenAI’s guide says a question-answering chatbot can call a tool for one current document and still cannot plan a multi-step job unless every step is programmed.</td>
<td>The application does. Lewis et al., 2020, retrieve passages and then a generator writes the answer conditioned on those passages.</td>
<td>The workflow does. OpenAI’s guide says the steps and the “if this, then that” rules are written in advance. An LLM may handle one judgment, such as classifying a request, and then control returns to the script. Microsoft’s sequential pattern is the multi-agent version of a fixed line: the next agent is defined by the workflow.</td>
<td>The model does. The <a href="/glossary/harness">harness</a> runs the tool the rules allow. Anthropic’s SDK and OpenAI’s SDK both describe that pass from model to runtime.</td>
<td>A pattern does. OpenAI’s handoff gives the specialist the branch. An agent used as a tool leaves the manager in charge of the final answer. Microsoft also documents a fixed sequence, a parallel fan-out, a shared thread, and a manager with a task ledger.</td>
</tr>
<tr>
<td>Whether it acts</td>
<td>It replies in text. Anthropic’s loop page says that without tools, Claude can only respond with text.</td>
<td>It reads retrieved text into the answer. In the 2020 paper the retriever is a Wikipedia index, and the generator writes. A product that keeps choosing new searches has left that one pass.</td>
<td>It performs the actions named in the rules. OpenAI’s examples are a locked account after failed logins, and an expense flow that stalls on a blank field.</td>
<td>It can read, write, search, call an API, or run a command, inside the permissions. The model requests the action. The harness carries it out.</td>
<td>Each role can act inside its own tools. <a href="/glossary/agent-to-agent-protocol">A2A</a> is for one independent agent delegating to another. <a href="/glossary/model-context-protocol">MCP</a> is for an agent calling its own tools.</td>
</tr>
<tr>
<td>What “done” looks like</td>
<td>A message in the thread.</td>
<td>A generated answer that used the retrieved passages. Lewis et al. also treat the retrieved text as something a person can inspect.</td>
<td>The predetermined outcome, such as a routed ticket or a locked account. OpenAI’s guide says every branch was written down, which is why the result is auditable and why an unlisted condition can stall the run.</td>
<td>The goal is met, the model stops calling tools, a turn or budget limit hits, a guardrail fails the run, or a person has to approve before the run resumes.</td>
<td>The owning role returns the answer, or the pattern’s stop rule fires: a checker approves, a manager’s ledger is complete, or an iteration limit ends the thread.</td>
</tr>
</tbody>
</table>
</div>

[Retrieval-augmented generation](/glossary/rag), in Lewis et al., [arXiv:2005.11401](https://arxiv.org/abs/2005.11401), combines a pre-trained generator with a retriever over an explicit index. The paper’s index is Wikipedia, and the point of the retrieval is an answer a person can trace. That is a memory tactic for one generation. It is a different grant from an agent loop, which can call a tool, read the observation, and choose again. Products mix the two. The mix is still worth naming, because a search that the application always runs is RAG, and a search the model can skip, repeat, or follow with a write is [tool use](/glossary/tool-use).

Microsoft’s guide says one agent with tools is often the right default for an enterprise case, and it says to set an iteration limit so a tool loop cannot run without end. Multi-agent orchestration, on that page, is justified when one agent cannot reliably handle the job because of prompt complexity, tool overload, or a security boundary.

## How does an AI agent use tools?

The model requests a tool. The harness runs that tool when the rules allow it, and it puts the result back in front of the model.

Anthropic’s loop page, read November 8, 2026, groups the built-in tools as file operations, search, shell commands, web search and page fetch, on-demand tool discovery, and orchestration tools that spawn a subagent, invoke a skill, ask the user, or track tasks. External services connect through MCP servers. Custom tools are another path. Read-only tools can run at the same time when the model requests several in one turn. Tools that change state, such as an edit or a shell command, run one after another. A denied call comes back as a tool result, and the page says Claude typically tries another approach or reports that it could not proceed.

OpenAI’s business guide says the model supplies the judgment and the tools supply the action: a lookup, an edit, a function call, code in a terminal, a computer, or another agent reached through orchestration. The running-agents guide is the runtime version. Tool calls continue the loop. A final answer with no more tool work ends it.

The [Model Context Protocol](/glossary/model-context-protocol) is the open protocol for that connection. The [introductory page](https://modelcontextprotocol.io/docs/getting-started/intro), read November 8, 2026, calls MCP a standard way for an application such as Claude or ChatGPT to reach data sources, tools, and workflows, and it compares the shape to a USB-C port. The [versioning page](https://modelcontextprotocol.io/docs/learn/versioning) for the current revision says the protocol version is 2026-07-28. The [specification](https://modelcontextprotocol.io/specification/2026-07-28) says servers can offer resources, prompts, and tools, and that a host must obtain a person’s consent before invoking a tool. Anthropic’s November 2 prospectus says Anthropic introduced MCP in November 2024 and donated it to the Linux Foundation’s Agentic AI Foundation in December 2025.

Measured failures of agents that call tools through MCP, including tool misuse and goals the tools cannot reach, are the subject of [MCPHallu](/research/mcphallu-mcp-agent-hallucinations).

## What happens in one loop, from goal to stop?

Today’s loop has seven parts. The names differ by vendor. The jobs show up in the pages read on November 8, 2026.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Part</th>
<th>What it does</th>
</tr>
</thead>
<tbody>
<tr>
<td>Goal</td>
<td>The task the run is trying to finish. Anthropic’s defined term starts the agent loop when the agent receives a task. OpenAI’s business guide says an agent starts from a goal and can pause to ask for clarification.</td>
</tr>
<tr>
<td>Model</td>
<td>The component that reads the current context and proposes the next step or a final answer. OpenAI’s guide says the model interprets instructions, plans, and decides what to do next. Anthropic’s SDK sends that proposal back as text, tool calls, or both.</td>
</tr>
<tr>
<td>Instructions and policies</td>
<td>Standing text and checks. OpenAI’s business guide separates guardrails, which bound the action, from instructions, which guide the decision. The <a href="https://developers.openai.com/api/docs/guides/agents/guardrails-approvals">Agents SDK</a> uses guardrails for automatic checks and a separate approval pause before a side effect. Anthropic’s permission mode, allow list, and disallow list are the same kind of boundary on the loop page.</td>
</tr>
<tr>
<td>Tools</td>
<td>The actions the model may request. The harness validates and runs them. MCP is one open connector. A single programmed lookup, in OpenAI’s chatbot example, is a tool call that still leaves the plan in the application’s hands.</td>
</tr>
<tr>
<td>State and memory</td>
<td>What the next turn can see. Anthropic resends conversation history and can keep a session. OpenAI’s running-agents guide offers four ways to carry state: replayed history, a session your application stores, a conversation id, or the previous response id. The business guide says memory of past steps lets an agent refine a later pass, and it describes that memory as still developing.</td>
</tr>
<tr>
<td>Harness and control loop</td>
<td>The software that feeds the goal, offers tools, stores observations, enforces the rules, and decides when to call the model again. On this site that software is the <a href="/glossary/harness">harness</a>, and the cycle it runs is the <a href="/glossary/agent-loop">agent loop</a>. Anthropic’s SDK overview says the SDK gives you the same tools, agent loop, and context management that power Claude Code. The overview also names Managed Agents as a hosted harness that runs the loop in an Anthropic-managed cloud sandbox or a self-hosted sandbox.</td>
</tr>
<tr>
<td>Stop or escalation</td>
<td>The run ends on a final answer with no further tool calls, on a turn or budget limit, or on a failed guardrail. It pauses when a person must approve. OpenAI says to resume that pause from the saved state. A person who approves before the action counts is <a href="/glossary/human-in-the-loop">human in the loop</a>. A person who watches the record and can step in is <a href="/glossary/human-on-the-loop">human on the loop</a>.</td>
</tr>
</tbody>
</table>
</div>

A click on a real screen is the same loop with a narrower tool. That guide is [Can an AI agent use your computer?](/blog/can-an-ai-agent-use-your-computer). A workplace job with a file to review is [What is an AI employee?](/blog/what-is-an-ai-employee).

## Where does the harness fit?

The harness is the software that runs the loop: tools, memory, permissions, and the stop rule. The model proposes. The harness is what makes the proposal an action.

[Harness engineering](/glossary/harness-engineering) is the work of designing that software on purpose. [Orchestration](/glossary/orchestration) is the part that chooses the next step or the next specialist. A [guardrail](/glossary/guardrail) allows, blocks, rewrites, or pauses one action. An [agent framework](/directory/category/agent-frameworks) is a library for building those pieces. The running configuration for one job is the harness. [Claude’s Agent SDK](/directory/claude-agent-sdk) and the [OpenAI Agents SDK](/directory/openai-agents-sdk) describe that loop on the pages read November 8, 2026. The [Microsoft Agent Framework](/directory/microsoft-agent-framework) documents the multi-agent patterns on the orchestration pages read the same day. The comparison of shipping runtimes is [Best AI agent harness](/best/ai-agent-harnesses).

The long account of the workshop is the [harness guide](/blog/what-is-an-ai-agent-harness). How a recorded failure becomes one check is the [evaluation guide](/blog/how-do-you-evaluate-an-ai-agent-harness). This page stays on the loop those pages assume.

## What is agent orchestration?

Agent orchestration is the rule for which step, tool, or agent runs next, and who owns the answer.

In a single agent, the orchestration is the loop itself: call the model, run the allowed tool, continue. In a [multi-agent](/glossary/multi-agent) system, it also decides who speaks next and who is responsible for the reply the person sees.

[OpenAI’s orchestration guide](https://developers.openai.com/api/docs/guides/agents/orchestration), read November 8, 2026, offers two patterns. A handoff moves control to a specialist for that branch. An agent used as a tool leaves the manager in charge of the final answer. The same page says to start with one agent, and to add a specialist when the next branch needs different instructions, tools, or policy.

Microsoft documents a wider set. The [Agent Framework orchestration page](https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/), read November 8, 2026, lists five patterns:

- Sequential: agents run one after another in a defined order.
- Concurrent: agents run at the same time.
- Handoff: agents transfer control based on context.
- Group chat: agents share one conversation.
- Magentic: a manager agent coordinates specialists.

The [Azure architecture guide](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns), read the same day, uses the same names and adds the conditions. Sequential orchestration suits a pipeline whose next stage is already decided. Concurrent orchestration runs independent analyses and can aggregate them. Handoff orchestration transfers full control when the right specialist is clear only mid-task. Group chat keeps a shared thread, and the guide says to consider keeping that pattern to three or fewer agents because the thread gets hard to control. Magentic orchestration is for an open-ended problem: a manager builds and revises a task ledger, and specialist agents use tools to change external systems. The Agent Framework page also says these orchestrations can pause for tool approval or for a request for information, which is the human-in-the-loop stop inside a multi-agent run.

## How do multi-agent systems work?

A multi-agent system gives one job to more than one role. The pattern decides whether those roles run in a line, at the same time, by handing off ownership, in a shared thread, or under a manager that keeps a plan.

The roles can be several prompts, several model calls, or several processes. On this site it is still one product and one bill unless a source says otherwise. Extra roles are a coordination choice. Microsoft’s architecture guide says they add overhead, latency, and new ways to fail, and it treats that cost as justified when a security boundary or the size of the tool list makes one agent unreliable. OpenAI’s guide makes the same point from the other direction: splitting early creates more prompts, more traces, and more approval surfaces.

Two protocols cover two different edges, and both were live on November 8, 2026.

The [Agent2Agent protocol](https://a2a-protocol.org/latest/) is the horizontal edge. The project’s home page says A2A is an open standard for agents built on different frameworks, or by different vendors, to discover each other, delegate work, and share results. It says A2A was developed by Google and donated to the Linux Foundation, with a technical steering committee that includes AWS, Cisco, Google, IBM Research, Microsoft, Salesforce, SAP, and ServiceNow. The [specification page](https://a2a-protocol.org/latest/specification/) lists the latest released version as 1.0.0. Agents interact from declared capabilities. The page says they do not have to share internal memory, tools, or proprietary logic. The specification’s goals include discovery, collaboration, and long-running tasks that can include a person.

MCP is the vertical edge. The [A2A and MCP page](https://a2a-protocol.org/latest/topics/a2a-and-mcp/) says MCP deepens one agent with tools, resources, and data, and A2A connects agents across a team or a company boundary. The same page says to use both: A2A between agents, MCP from each agent to its own tools. A2A’s home page also says A2A is not a replacement for MCP, and it is not the protocol an agent uses to call its own sub-agents or its own tools.

[Google’s Agent Development Kit](/directory/google-adk) is one framework the A2A home page names as a way to build an agent. The protocol is the link between agents. The framework is the code that builds one of them.

## How will AI agents work in the future?

The part already specified is interoperability and supervision. The part still ahead is a set of dated forecasts, and this page leaves them as forecasts.

MCP and A2A are the two public protocols in the sources above. MCP, version 2026-07-28, connects an application to tools and data. A2A 1.0.0 connects independent agents. [Deloitte’s November 18, 2025 essay](https://www.deloitte.com/global/en/insights/industry/technology/technology-media-and-telecom-predictions/2026/ai-agent-orchestration.html) predicted that, by the following year, competing agent protocols would begin converging on two or three standards. On November 8, 2026, MCP and A2A are both still published, and the A2A project’s own page tells builders to use them together. That is the status of the documents. It is not a score of which protocol has more users.

Identity and least privilege are already written as product rules, in different words. Anthropic’s loop page lets a builder allow a narrow tool list and disallow the rest. A read-only agent is the page’s example. MCP’s specification says a person consents before a tool runs, and it says tool descriptions are untrusted unless they come from a trusted server. A2A’s specification treats the other agent as opaque: collaboration uses declared capabilities, and the caller does not receive the other agent’s internal tools. OpenAI’s guardrails page pauses a run before a side effect such as a cancellation, an edit, a shell command, or a sensitive MCP action, and its cybersecurity section says a review should see the proposed action and the calling identity against the approved scope. Those are boundaries a harness can enforce now.

Observability is the record that makes a later review possible. Anthropic’s result message includes token usage, cost, and a session id. OpenAI’s pause returns the interruptions and a state the application can store and resume. A2A’s specification lists tracing and monitoring among the enterprise practices the protocol aligns with. Deloitte’s essay says orchestration platforms were, at the time of writing, adding telemetry such as latency, error rates, and token usage, plus a view of the orchestration, so a person can see what happened.

The supervision forecast is the sentence to keep dated. Deloitte’s essay says a spectrum will emerge, from humans in the loop, to humans on the loop, to humans out of the loop, depending on the task, the domain, and how serious the outcome is. It says the in-the-loop and on-the-loop approaches rely on telemetry so people can intervene, and that humans out of the loop would still need continuous monitoring. It predicts that in 2026 the most advanced businesses will begin to lay the foundation for human-on-the-loop orchestration. On this site the two nearer terms stay distinct, because the product pages describe different stops. [Human in the loop](/glossary/human-in-the-loop) means a person approves, edits, or stops a step before that step counts. [Human on the loop](/glossary/human-on-the-loop) means a person supervises from the record and can intervene, and the step does not wait for approval first. Deloitte named the spectrum. The sharper split is this site’s, so a reader can tell an approval gate from a dashboard.

OpenAI’s undated business guide says that, on the day of that copy, agents run when prompted or scheduled, and that in the future they may start themselves from a goal, a calendar, or a new event. The same guide says that, in the future, agents may run several tools at once. Anthropic’s loop page, read November 8, 2026, already runs read-only tools concurrently when the model requests more than one in a single turn. Tools that change state still run in order on that page. A forecast in an undated PDF and a behavior in a current SDK page can both be true. They are about different products.

No source read for this guide names a month in which agents will work without a stop rule. [Autonomy](/glossary/autonomy) on this site remains a permission setting: how many steps are allowed before a person is asked. The next-twelve-months report collects the dates companies and governments have already put on paper. It does not add a launch this page cannot cite.

## Where can you read more on this site?

- This guide’s terms: [agent](/glossary/agent), [agent loop](/glossary/agent-loop), [harness](/glossary/harness), [harness engineering](/glossary/harness-engineering), [tool use](/glossary/tool-use), [orchestration](/glossary/orchestration), [multi-agent](/glossary/multi-agent), [Model Context Protocol](/glossary/model-context-protocol), [Agent2Agent protocol](/glossary/agent-to-agent-protocol), [human in the loop](/glossary/human-in-the-loop), [human on the loop](/glossary/human-on-the-loop)
- Nearby terms: [RAG](/glossary/rag), [language model](/glossary/llm), [guardrail](/glossary/guardrail), [autonomy](/glossary/autonomy), [approval gate](/glossary/approval-gate)
- Guides: [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness), [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness), [What is an AI employee?](/blog/what-is-an-ai-employee), [Can an AI agent use your computer?](/blog/can-an-ai-agent-use-your-computer)
- Research: [ReAct](/research/react-reasoning-and-acting), [MCPHallu](/research/mcphallu-mcp-agent-hallucinations)
- Report: [AI agents, the next 12 months](/reports/ai-agents-next-12-months)
- Directory: [Claude Agent SDK](/directory/claude-agent-sdk), [OpenAI Agents SDK](/directory/openai-agents-sdk), [Microsoft Agent Framework](/directory/microsoft-agent-framework), [Google ADK](/directory/google-adk)
- Comparisons: [Best AI agents](/best), [Best AI agent harness](/best/ai-agent-harnesses), [Best AI agent evaluation tools](/best/ai-agent-evaluation-tools)
- Topics: [how agents work](/topics/how-agents-work), [harnesses](/topics/harnesses), [research](/topics/research)

## Frequently asked questions

### How do AI agents work?

A language model proposes a step. A [harness](/glossary/harness) runs an allowed tool, returns the result, and the [agent loop](/glossary/agent-loop) continues until the goal is met, a limit hits, or a person must approve. [Anthropic’s November 2, 2026 prospectus](https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm) calls that cycle the agent loop. The short definition is [What are AI agents and how do they work?](/glossary/agent).

### What is an agent loop?

It is the control loop from goal to action: propose an action, run an allowed tool, observe the result, choose the next step, and stop when the task is done or a limit fires. The Claude Agent SDK and OpenAI’s Agents SDK, both read November 8, 2026, describe that cycle in their own runtimes. The glossary entry is [agent loop](/glossary/agent-loop).

### What is the difference between a chatbot, an assistant, a RAG app, a workflow, and an AI agent?

An assistant is the application a person opens. A chatbot returns a reply. A [RAG](/glossary/rag) app retrieves text and then generates an answer, the pattern in Lewis et al., 2020. A fixed workflow follows rules written in advance, including a single model step that hands control back to the script, which is how OpenAI’s business guide separates workflows from agents. An agent starts from a goal and chooses tools inside a harness. The table above is the comparison.

### How does an AI agent use tools?

The model requests a tool. The harness checks the allow and disallow rules, runs the call when it is allowed, and returns the result for the next decision. File edits, shell commands, web search, and external connectors are the kinds of tools on Anthropic’s loop page. [MCP](/glossary/model-context-protocol), current version 2026-07-28 as of November 8, 2026, is one open way to attach those connectors. Measured failures of those MCP calls are the subject of [MCPHallu](/research/mcphallu-mcp-agent-hallucinations).

### What is agent orchestration?

It is the rule for which step, tool, or agent runs next, and who owns the answer. OpenAI distinguishes a handoff from an agent used as a tool. Microsoft Learn, read November 8, 2026, documents sequential, concurrent, handoff, group chat, and Magentic orchestration. The glossary entry is [orchestration](/glossary/orchestration).

### How do multi-agent systems work?

More than one role shares a job. They may run in order, in parallel, by transferring control, in one shared thread, or under a manager that keeps a plan. Microsoft’s architecture guide says to add that machinery when one agent cannot reliably do the work. When the other party is an independent agent, the open protocol is [A2A](/glossary/agent-to-agent-protocol). When the call is a tool or a data source, the open protocol is MCP. The glossary entry is [multi-agent](/glossary/multi-agent).

### How will AI agents work in the future?

MCP and A2A are already specified, and the A2A project says to use them together. Deloitte’s November 18, 2025 essay predicts that during 2026 the most advanced organizations will start building human-on-the-loop supervision, with people watching telemetry and intervening, beside the older pattern of approving steps. OpenAI’s undated business guide says agents of that copy run when prompted or scheduled, and that later ones may start from a goal or an event. This page does not add a month those sources do not name. The dated record is [AI agents, the next 12 months](/reports/ai-agents-next-12-months).

### What is the difference between human in the loop and human on the loop?

Human in the loop means a person approves, edits, or stops a step before that step counts. OpenAI’s Agents SDK implements that pause and tells you to resume the same run. Human on the loop means a person supervises from the record and can intervene, without that prior approval. Deloitte’s November 18, 2025 essay names both on one spectrum and predicts a shift toward the second during 2026. The entries are [human in the loop](/glossary/human-in-the-loop) and [human on the loop](/glossary/human-on-the-loop).
