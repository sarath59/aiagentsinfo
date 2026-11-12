---
title: "Microsoft Copilot harness in Foundry: the forecast PDF, and the creation-time lock"
description: "On November 10, 2026 a Foundry prompt agent stopped on a quarterly forecast. The Copilot harness returned a PDF. Learn says you pick that harness when you create the agent. US East hosted compute is $0.0994 per vCPU-hour."
absoluteTitle: true
takeaways:
  - "Jeff Hollan’s November 10, 2026 Microsoft Mechanics episode shows one Foundry finance prompt agent answer a September spend question, then stop when asked for a quarterly forecast and an executive PDF. The same brief on the Microsoft Copilot harness planned, called tools and subagents, and returned a PDF plus a forecast file. That is one on-screen task. Microsoft did not publish a pass rate for it."
  - "Microsoft Learn, read November 12, 2026, says you select the Copilot harness only when you create the prompt agent. Changing the choice means creating another agent. The harness is in public preview in 22 regions. File, shell, web, and subagent tools are on by default. Foundry Memory is not supported on this runtime."
  - "The Azure pricing page read the same day prices Hosted agents at $0.0994 per vCPU-hour and $0.0118 per GiB-hour in US East. One active hour of the 1 vCPU / 2 GiB sandbox is $0.123 before model tokens. The October 28 Foundry post uses those same unit rates for the Copilot harness sandbox starting December 1, and says that runtime is free before then."
date: "2026-11-12"
updated: "2026-11-12"
category: news
topics:
  - news
  - harnesses
  - tools-saas
  - how-agents-work
audience:
  - builders
  - everyone
companies:
  - microsoft
  - anthropic
  - github
  - google
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Foundry hosted-agent compute rates and tool-search token cuts, read November 12, 2026"
  description: "US East hosted-agent rates from the data-amount attributes on the Azure Foundry Agent Service pricing page: $0.0994 per vCPU-hour and $0.0118 per GiB-hour. The $0.1230, $0.0615, and $0.2460 figures are arithmetic on those rates for the 1 vCPU/2 GiB, 0.5 vCPU/1 GiB, and 2 vCPU/4 GiB session sizes on the hosted-agents Learn page. Tool-search cuts of more than 60 percent at 50 tools and more than 97 percent at 1,000 tools, and the Recall@10 table, are copied from Microsoft’s July 29, 2026 Command Line post. AI Agents Info did not run the finance demo or the ToolRet ablation."
  isBasedOn: "https://azure.microsoft.com/en-us/pricing/details/foundry-agent-service/"
sources:
  - title: "Microsoft Mechanics, New Microsoft Copilot Harness (Tech Community, published 2026-11-10T16:53:18Z; read November 12, 2026)"
    url: "https://techcommunity.microsoft.com/blog/microsoftmechanicsblog/new-microsoft-copilot-harness--more-power-token-efficiency--control-for-agents-i/4572063"
  - title: "Microsoft Learn, Prompt agents in Foundry Agent Service (read November 12, 2026)"
    url: "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/prompt-agents"
  - title: "Microsoft Learn, Quotas and limits for Microsoft Foundry Agent Service (read November 12, 2026)"
    url: "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/limits-quotas-regions"
  - title: "Microsoft Learn, What is Microsoft Foundry Agent Service? (read November 12, 2026)"
    url: "https://learn.microsoft.com/en-us/azure/foundry/agents/overview"
  - title: "Microsoft Learn, Hosted agents in Foundry Agent Service (read November 12, 2026)"
    url: "https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents"
  - title: "Microsoft Learn, Enable tool search in a toolbox (read November 12, 2026)"
    url: "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/tool-search"
  - title: "Microsoft Learn, Use skills with Microsoft Foundry agents (preview) (read November 12, 2026)"
    url: "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/skills"
  - title: "Microsoft Foundry Blog, Introducing the Microsoft Copilot harness in Foundry Agent Service (October 28, 2026; read November 12, 2026)"
    url: "https://devblogs.microsoft.com/foundry/microsoft-copilot-harness-in-foundry/"
  - title: "Microsoft, Tool search: Finding the right tool at the right time (Command Line, July 29, 2026; read November 12, 2026)"
    url: "https://commandline.microsoft.com/tool-search-toolboxes-foundry/"
  - title: "Microsoft Azure, Foundry Agent Service pricing (read November 12, 2026)"
    url: "https://azure.microsoft.com/en-us/pricing/details/foundry-agent-service/"
  - title: "Microsoft Azure, Foundry Agent Service product page (read November 12, 2026)"
    url: "https://azure.microsoft.com/en-us/products/ai-foundry/agent-service"
  - title: "Google Open Source Blog, Scaling AI agents with open standards (November 11, 2026; read November 12, 2026)"
    url: "https://opensource.googleblog.com/2026/11/scaling-ai-agents-open-standards-mcp-aaif.html"
faq:
  - question: "What is the Microsoft Copilot harness?"
    answer: "It is the managed agent loop Microsoft runs for a Foundry prompt agent. You select it when you create the agent. The harness plans, calls tools, can read and write files, run shell commands, fetch the web, and delegate to subagents, inside a sandbox Foundry operates. It entered public preview on October 28, 2026. Jeff Hollan demonstrated it on Microsoft Mechanics on November 10, 2026."
  - question: "How is the Copilot harness different from a prompt agent?"
    answer: "Both are prompt agents invoked through the Responses API. The default runtime coordinates the model and the tools you declared. The Copilot harness adds a workspace plus built-in file, shell, web-fetch, and subagent tools. On November 10, a default finance agent answered a simple spend question and stopped when asked for a forecast PDF. The harness version of that brief returned the PDF. Microsoft did not publish a score for that demo."
  - question: "Can you switch an existing Foundry prompt agent onto the Copilot harness?"
    answer: "No. Microsoft Learn, read November 12, 2026, says you select the harness only when you create the prompt agent. To change the choice, create another agent. The episode’s narration says “move it onto” the harness. The contract on Learn is a new agent, a new endpoint, and a conversation on every response."
  - question: "Can you bring the Claude Agent SDK or your own harness to Foundry?"
    answer: "Yes, as a hosted agent, which is a different resource from a prompt agent. Learn’s overview names the Anthropic Agent SDK, the OpenAI Agents SDK, LangGraph, Microsoft Agent Framework, the Copilot SDK, and custom code. Hollan showed a finance agent he said he wrote against the Claude Agent SDK, in a per-session VM sandbox. The Azure product page calls that runtime scale-to-zero with zero idle cost."
  - question: "What does Foundry tool search change in the token bill?"
    answer: "A toolbox is one governed MCP endpoint. Tool search is a separate switch. With it on, the model first sees tool_search and call_tool, then the definitions that match. Microsoft’s July 29, 2026 ToolRet write-up says that cut token use by more than 60 percent at 50 tools and more than 97 percent at 1,000 tools, versus sending the full catalog. Hollan repeated those figures on November 10 and said the savings come from tool search, not from creating a toolbox."
  - question: "How much does Foundry agent compute cost?"
    answer: "The Azure pricing page read November 12, 2026 prices the Hosted agents row at $0.0994 per vCPU-hour and $0.0118 per GiB-hour in US East. One active hour of the documented 1 vCPU and 2 GiB session is $0.123 before model tokens and tools. Japan East and Sweden Central are $0.10934 and $0.01298. The October 28 post prints $0.0994 per vCPU-hour and $0.0118 per GiB-hour for the Copilot harness sandbox starting December 1, 2026, says prices may vary by region, and says that harness runtime is free before then. Model inference stays billed either way."
---

On November 10, 2026, Jeff Hollan put one finance question through two Foundry runtimes. The prompt agent looked up September spend. Asked for a quarterly forecast, a comparison, and an executive PDF, it stopped and offered to help structure the work. The [Microsoft Copilot harness](https://techcommunity.microsoft.com/blog/microsoftmechanicsblog/new-microsoft-copilot-harness--more-power-token-efficiency--control-for-agents-i/4572063) version of that brief planned, pulled data, called skills and subagents, and returned a PDF plus a forecast file.

That episode, posted to Microsoft Tech Community at 16:53 UTC, is a demonstration of one task. It is not a benchmark. The contract is on [Microsoft Learn](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/prompt-agents), read November 12: you select the harness when you create the prompt agent. To change the choice, you create another agent. The narration says “move it onto” the harness. The docs say the switch does not exist yet.

A [harness](/glossary/harness) is the loop, the tools, the memory, the permissions, and the stop rule around a model. The longer definition is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness). Foundry now makes you pick which of those loops you are buying before the agent resource exists.

## What is the Microsoft Copilot harness?

The Microsoft Copilot harness is a managed [agent loop](/glossary/agent-loop) for a Foundry prompt agent. Microsoft runs the loop and the [sandbox](/glossary/sandbox). You bring instructions, a model Foundry already hosts, skills, and tools.

Hollan, identified on the episode page as Microsoft Foundry VP, described five pieces he expects in any harness: the loop that reasons, acts, and observes until a limit or a finished result; context management as the window fills; skills and tools, including [MCP](/glossary/model-context-protocol) servers, files, and commands; subagents that take a slice of the work and return it; and memory across turns and, where you allow it, across sessions. He said this particular harness is model-agnostic, built for enterprise task completion, and already runs behind GitHub and Microsoft 365. The [October 28 Foundry post](https://devblogs.microsoft.com/foundry/microsoft-copilot-harness-in-foundry/) is the preview announcement. It says the GitHub engineering team built the harness and that it powers Copilot Code, Copilot Studio, the [GitHub Copilot](/directory/github-copilot) app, the CLI, and VS Code. November 10 is the operating tour: prompt agent, then this harness, then your own code on hosted agents.

The preview is still a preview. The [quotas page](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/limits-quotas-regions) lists the harness in 22 regions: Australia East, Brazil South, Canada Central, Canada East, Central US, East US, France Central, Germany West Central, Italy North, Japan East, Korea Central, North Central US, Norway East, Poland Central, Southeast Asia, South India, Spain Central, Sweden Central, UK South, West Europe, West US, and West US 3. The model has to support reasoning and tool calling. Bring-your-own-model is not supported on this runtime. Foundry Agent Service itself is generally available. The harness is the sub-feature that is not.

## How is it different from a prompt agent?

A prompt agent with the default runtime and a prompt agent on the Copilot harness are the same resource type. Applications call the Responses API either way. Learn draws the line at what the runtime will do without you hosting code.

| Choice | What Foundry runs | What you give up |
| --- | --- | --- |
| Default prompt agent | The model and the tools declared on the agent | The harness workspace, and its built-in file, shell, web-fetch, and subagent tools |
| Copilot harness (preview) | That loop, plus those built-in tools, in a service-managed sandbox | Customer control of sandbox CPU, memory, and lifecycle. Also `temperature`, `top_p`, `tool_choice`, and `previous_response_id` |

Source: aiagentsinfo.com, from the prompt-agent and quotas pages read November 12, 2026.

The finance demo is the concrete case. Hollan started with a prompt agent on the Responses API, instructions, and Fabric IQ. “Spend by category for September” returned numbers and a simple calculation. “Generate a forecast of projected spend over the next quarter, compare it with previous quarters, and prepare an executive PDF” stopped. He said the agent offered to help structure the forecast and did not generate one. His account of the failure: one pass, no persistence, no skills, no subagents.

He then showed what he called the same agent definition on the Copilot harness. The trace planned, fetched data, ran analysis, looped through skills, and called subagents. The reply included a PDF and a separate forecast file. The run was inside a sandbox. A later frame showed the agent trying an unauthorized web endpoint. The trace recorded a deny before the call left. That deny is the part worth copying. The PDF is one successful screen.

Learn’s limits explain why a harness agent will reject requests a default prompt agent accepts. Every response needs a first-class `conversation`. `store: false` and `previous_response_id` are unsupported. Call the agent’s own Responses endpoint. The project-level endpoint is unsupported even if the body names the agent. Do not send `max_output_tokens`, `max_tool_calls`, `parallel_tool_calls`, `truncation`, `context_management`, `service_tier`, or `user`. Unsupported fields return an error. They are not ignored.

Built-in file read, file write, shell, web, and subagents are on by default, subject to service and organizational policy. A finance agent that only needs Fabric IQ does not need a shell. Turn the broad tools down before the first real run. The workspace is per conversation. It survives ordinary idle and sandbox replacement. Learn still says to store anything you must keep in Foundry Files or another durable store.

Foundry Memory is a separate product, and the quotas page says it is not available on the Copilot harness. Conversation history and files in that conversation’s workspace still exist. Hollan’s general description of harness memory is not a switch that turns Foundry Memory on.

Skills are the open [Agent Skills](/glossary/agent-skill) format: a folder whose root is `SKILL.md`, with YAML `name` and `description`, then the instructions. The [skills page](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/skills) says a Copilot-harness prompt agent references them from the agent definition. You can pin an immutable version. If you omit the version, Foundry stores the current default on the new agent version. The cap is 50 top-level skill references. Names are lowercase letters, digits, and hyphens, at most 64 characters. Function tools cannot set `strict: true`, cannot use the reserved separator `___`, and cannot collide with harness-managed tool names.

The October 28 post prices this sandbox, not the model. Harness runtime is free before December 1, 2026. From that date, sandbox compute is USD $0.0994 per vCPU-hour and memory is $0.0118 per GiB-hour, and the post says prices vary by region and agreement. Model inference and separately billed tools stay billable the whole time. The quotas page says you do not set that sandbox’s CPU or memory. Those unit rates cannot become a cost per task until Microsoft prints the allocation. The [agent harness benchmark for November 2026](/reports/agent-harness-benchmark-november-2026) is a different scoreboard. It does not include this demo.

## Why does the harness have to be chosen when the agent is created?

Because Learn says the choice is part of creation, and the product will not rewrite it later.

The prompt-agent page, read November 12, is specific: select the harness only when you create the prompt agent. To change the choice, create another agent. The October 28 post says the same thing in the preview notes: existing agents stay as they are, and switching the harness after creation is not supported yet. Hollan’s demo can still be “the same definition” in the portal sense. He configured a second runtime. A team with a live prompt agent, a saved endpoint, and a stack of conversation ids does not get a toggle.

The new agent is still a prompt agent. Project roles and the governance controls Learn lists do not change with the harness. The endpoint does. Copilot harness calls go to the agent endpoint, and each one carries a conversation. Plan on a new resource, a new URL, and a client that stops sending `previous_response_id`.

The quickstart that builds a web research agent sets the choice in `azure.yaml` as `harness.type: microsoft_copilot_preview`, next to the skill and the `web_search` tool. That string is the creation-time lock in source control. Changing it later is a new deployment of a new agent, which is what the docs already require.

## Can you bring the Claude Agent SDK or your own harness?

Yes. That path is a hosted agent, and it is a different Foundry resource from the prompt agent above.

[Learn’s overview](https://learn.microsoft.com/en-us/azure/foundry/agents/overview), read November 12, says hosted agents are code you build with Microsoft Agent Framework, LangGraph, the OpenAI Agents SDK, the Anthropic Agent SDK, the Copilot SDK, or your own code. You ship a container image or a zip of source. Foundry builds the image from the zip. Each agent gets a dedicated Microsoft Entra identity, a managed endpoint, session state, and tracing. Hollan showed the finance agent rewritten against the Claude Agent SDK, which is the library this site lists as the [Claude Agent SDK](/directory/claude-agent-sdk). He deployed it with the Visual Studio Code Foundry toolkit. He kept the loop, the tools, and the middleware. Foundry kept the sandbox.

The episode also names Hermes, OpenClaw, and a fully custom harness as hosted options, plus a customer virtual network with no public egress, images from the customer’s own registry, and more concurrent sessions. Learn’s written authoring list does not include the names Hermes or OpenClaw. Treat the episode as his demo inventory. Treat the overview as the support matrix until a Learn page names the others. The [hosted-agents page](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents) does confirm the isolation model he described: one VM-isolated sandbox per session, a persistent filesystem at `$HOME` and `/files`, scale-to-zero, and restore after idle. The [Azure product page](https://azure.microsoft.com/en-us/products/ai-foundry/agent-service) calls that “autoscaling and zero idle cost.”

Idle is a timer, not a feeling. The timeout is 2 to 240 minutes and defaults to 15. When it elapses, Foundry deprovisions the compute and keeps the session state. A session is deleted after 30 days without activity. Disk is up to 20 GiB at 1 vCPU or larger, and about 20 percent of that budget is reserved for the platform. You pick the size. The page allows three pairs: 0.5 vCPU with 1 GiB, 1 vCPU with 2 GiB, and 2 vCPU with 4 GiB. Billing follows CPU and memory on active sessions. There is no replica count and no warm pool on that page.

The public [pricing page](https://azure.microsoft.com/en-us/pricing/details/foundry-agent-service/), read November 12, puts regional amounts on the Hosted agents row. The rendered cell shows a dash until the page script fills it. The `data-amount` values in the HTML are the numbers below. US East (`us-east`) matches the October 28 unit rates. Other regions on the same attributes are higher.

| Region on the pricing page | vCPU-hour | GiB-hour |
| --- | --- | --- |
| US East, US East 2, US West, US North Central, Australia East | $0.0994 | $0.0118 |
| Japan East, Sweden Central, UK South | $0.10934 | $0.01298 |
| Brazil South, Southeast Asia | $0.11928 | $0.01416 |

Source: aiagentsinfo.com. Amounts copied from the Hosted agents `data-amount` attributes on the Azure pricing page, read November 12, 2026. The page source has 29 regions. This table is the subset checked against the regions Hollan named. The US East amounts match the unit rates the October 28 post prints for the Copilot harness sandbox.

Arithmetic on the US East pair for one active hour of one session, before model tokens and tools:

| Session size on the Learn page | Active-hour compute, US East |
| --- | --- |
| 0.5 vCPU and 1 GiB | $0.0615 |
| 1 vCPU and 2 GiB | $0.1230 |
| 2 vCPU and 4 GiB | $0.2460 |

Source: aiagentsinfo.com. `0.5 × 0.0994 + 0.0118 = 0.0615`. `0.0994 + 2 × 0.0118 = 0.1230`. `2 × 0.0994 + 4 × 0.0118 = 0.2460`. A second concurrent session doubles the compute line. Tokens are a separate meter. The October 28 waiver, free harness runtime until December 1, is written for the Copilot harness sandbox. The pricing page does not repeat that waiver on the Hosted agents row. Do not apply it to a Claude Agent SDK container unless the invoice says so.

Hosted agents are listed in 31 regions on the concept page, including North Central US, East US, Japan East, Southeast Asia, and Sweden Central, which are the five Hollan said the footprint had expanded to include. East US 2 is on the hosted list and is absent from the 22-region harness list. A region that can run your container is not automatically a region that can run the Copilot harness. Private networking for hosted agents is bring-your-own VNet, with each session’s sandbox on that network. Prompt agents have a separate private-network column. The harness’s own egress control, on the quotas page, is an RAI policy with network rules on traffic from the harness sandbox. Declared Foundry tools keep their own network boundaries.

[Harness engineering](/glossary/harness-engineering) here is the decision of which loop you are willing to operate. The Copilot harness is the loop you do not patch. The hosted agent is the loop you do patch, on Microsoft’s VM, identity, and egress controls. The [best harness comparison](/best/ai-agent-harnesses) is the licence and list-price table for the libraries. This page is the Foundry hosting choice around them. The [harness tracker](/trackers/harnesses) points at that table.

## What does a governed MCP toolbox and tool search mean for token cost?

A Foundry toolbox is a versioned catalog behind one MCP-compatible endpoint. Authentication, guardrails, and the default version sit on the toolbox. Any MCP client can call it. Learn names Microsoft Agent Framework, LangGraph, and other MCP runtimes, not only Foundry prompt agents. Adding a tool to the toolbox does not, by itself, remove that tool’s JSON from the model’s context.

Tool search is the separate switch. The [tool-search page](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/tool-search) says you add `{"type": "toolbox_search"}`. The first `tools/list` then hides the catalog and exposes two meta-tools: `tool_search` and `call_tool`. The model describes the capability. Foundry returns matching definitions. `call_tool` invokes one by name. Learn says the ranker is BM25 over the tool name, description, and parameter information. `limit` defaults to 5 and caps at 10. Matches stay callable for the rest of the turn. Learn’s threshold for turning it on is more than about 10 to 15 tools, or tasks that need different subsets.

Hollan, on November 10, cited a ToolRet evaluation: more than 60 percent less token use at 50 tools, and more than 97 percent at 1,000 tools, against sending the full catalog up front. He added the caveat that matters: those savings come from tool search, not from the toolbox. The written measurement is older than the episode. Microsoft’s [July 29, 2026 Command Line post](https://commandline.microsoft.com/tool-search-toolboxes-foundry/) by Viswajeeet Balaji and Saket Sathe says the ablation grew the catalog on ToolRet, a benchmark they describe as more than 44,000 tools and 7,000 queries. The baseline sent every tool definition. Prompt caching was on in that baseline, and they note cached tokens are cheaper and still occupy the context window.

The same post prints Recall@10. Tool search is their system. BM25s and BGE-reranker-v2-gemma are the comparison columns, and they say those two columns come from the ToolRet paper’s reported numbers.

| Method | Web | Code | Customized |
| --- | --- | --- | --- |
| Tool search | 45.99% | 39.56% | 41.36% |
| BM25s | 24.62% | 28.23% | 32.39% |
| BGE-reranker-v2-gemma | 45.94% | 38.23% | 49.43% |

Source: aiagentsinfo.com. Copied from Microsoft’s July 29, 2026 Command Line post. The post says the run used the user query only, and left out the benchmark’s instruction string.

Learn’s November 12 page calls the shipping ranker BM25. The July post calls the evaluated system an enhanced sparse pipeline and compares it with BM25s. This page will not collapse those into one score. Use the July table as Microsoft’s published retrieval result. Use the Learn page as the contract: BM25, a default of five tools, a cap of ten, and a miss when the description does not match the query.

Two controls keep the token cut from deleting a tool the agent must see. Pin a tool and it stays in the initial list. `additional_search_text` is indexed and, the July post says, is not returned to the model in the MCP payload. The post says tuned metadata improved retrieval hit rate by about 56 percent and end-to-end accuracy by about 55 percent, recovering to within about 4 percent of the full-catalog baseline. Those are Microsoft’s figures for that metadata pass. They are not a guarantee for a finance toolbox whose descriptions say “get” and “manage.”

The reason the JSON matters is the same reason [tool JSON can cost more than the system prompt](/blog/why-tool-json-costs-more-than-your-system-prompt). A definition rides on every turn until something removes it. Measured `tools/list` sizes for five public MCP servers are on [the live token-count page](/blog/live-mcp-tool-json-token-counts). Tool search is Microsoft’s removal step. It adds a retrieval call, and a bad description becomes a missing tool. The [context window](/glossary/context-window) still holds the definitions that search returned, plus the conversation.

The same week, the portability of that catalog got a sharper owner. Google’s [November 11, 2026 Open Source Blog post](https://opensource.googleblog.com/2026/11/scaling-ai-agents-open-standards-mcp-aaif.html) says Anthropic donated the Agent Skills specification to the Linux Foundation’s Agentic AI Foundation alongside MCP, and that engineers from Google, Anthropic, and OpenAI now co-maintain both. Kurtis Van Gent’s account in that post splits the work the way Foundry’s docs do: MCP is the live tool call, and a skill loads a short name and description until the task needs the rest of `SKILL.md`. A Foundry toolbox can expose both. The harness you pick, Microsoft’s or the Claude Agent SDK’s, is the piece that does not travel. The `SKILL.md` file and the MCP endpoint are the pieces that can.

## What should builders and buyers do now?

Create the agent in the shape you mean to run. A prototype on the default prompt runtime cannot be promoted onto the Copilot harness in place. If the job needs files, a multi-step forecast, or subagents, put `microsoft_copilot_preview` on the definition now, in a harness region, on a model that can call tools. Point the client at the agent endpoint and send a conversation every time.

Then narrow the default tools. Shell, web, file write, and subagents start enabled. The useful trace in the episode is the denied egress, and that deny was configured. An RAI network rule covers the harness sandbox. A hosted agent that must stay private belongs on your VNet, with an image from a registry you scan. The identity on both paths is a dedicated Entra identity for the agent. Give it the smallest role that can read the file it is supposed to return.

Use tool search when the catalog passes the 10-to-15-tool line Learn names. Pin the few tools the loop always needs. Write `additional_search_text` in the words users actually type. Leave tool search off for a three-tool agent. The extra `tool_search` round trip is pure overhead when the whole catalog already fits.

Judge the harness on your tasks. Hollan showed Agent Optimizer against a private set of the questions his finance agent receives, with built-in evaluators he named as latency, relevance, intent resolution, and task adherence, plus his own prompts. The [overview](https://learn.microsoft.com/en-us/azure/foundry/agents/overview) says Agent Optimizer, in preview, generates new instructions, skills, tool descriptions, and model selections for prompt agents and hosted agents. He said the on-screen benchmark moved up a few points, and the host described a large latency drop on that candidate. The episode page does not print the before and after. A few points on an unpublished set is not a procurement number. The method this site uses for a real check is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness): one visible action, then the whole job. Optimizer output is a candidate. It still needs a held-out set the optimizer did not see.

Price the run, not the slogan. A default prompt agent, on the pricing page’s own sentence, has no extra platform charge beyond model tokens and tools. A hosted 1 vCPU / 2 GiB session in US East is $0.123 per active hour before those tokens, and $0 while the sandbox is deprovisioned. The Copilot harness sandbox uses the same unit rates in the October 28 post starting December 1, and Microsoft has not published the vCPU count it will assign. Re-read the invoice on December 1. Until then, the harness runtime line should be zero and the model line should not be.

The [harnesses topic](/topics/harnesses) collects the rest of the workshop. How Fable 5.2 is wired inside Anthropic’s own SDK is [How to use Claude Fable 5.2 in an agent harness](/blog/how-to-use-claude-fable-5-2-in-an-agent-harness). Release pins for the open-source frameworks people actually install are the [November framework report](/reports/ai-agent-framework-github-stats-november-2026).

## Frequently asked questions

### What is the Microsoft Copilot harness?

It is the managed agent loop Microsoft runs for a Foundry prompt agent. You select it when you create the agent. The harness plans, calls tools, can read and write files, run shell commands, fetch the web, and delegate to subagents, inside a sandbox Foundry operates. It entered public preview on October 28, 2026. Jeff Hollan demonstrated it on Microsoft Mechanics on November 10, 2026.

### How is the Copilot harness different from a prompt agent?

Both are prompt agents invoked through the Responses API. The default runtime coordinates the model and the tools you declared. The Copilot harness adds a workspace plus built-in file, shell, web-fetch, and subagent tools. On November 10, a default finance agent answered a simple spend question and stopped when asked for a forecast PDF. The harness version of that brief returned the PDF. Microsoft did not publish a score for that demo.

### Can you switch an existing Foundry prompt agent onto the Copilot harness?

No. Microsoft Learn, read November 12, 2026, says you select the harness only when you create the prompt agent. To change the choice, create another agent. The episode’s narration says “move it onto” the harness. The contract on Learn is a new agent, a new endpoint, and a conversation on every response.

### Can you bring the Claude Agent SDK or your own harness to Foundry?

Yes, as a hosted agent, which is a different resource from a prompt agent. Learn’s overview names the Anthropic Agent SDK, the OpenAI Agents SDK, LangGraph, Microsoft Agent Framework, the Copilot SDK, and custom code. Hollan showed a finance agent he said he wrote against the Claude Agent SDK, in a per-session VM sandbox. The Azure product page calls that runtime scale-to-zero with zero idle cost.

### What does Foundry tool search change in the token bill?

A toolbox is one governed MCP endpoint. Tool search is a separate switch. With it on, the model first sees `tool_search` and `call_tool`, then the definitions that match. Microsoft’s July 29, 2026 ToolRet write-up says that cut token use by more than 60 percent at 50 tools and more than 97 percent at 1,000 tools, versus sending the full catalog. Hollan repeated those figures on November 10 and said the savings come from tool search, not from creating a toolbox.

### How much does Foundry agent compute cost?

The Azure pricing page read November 12, 2026 prices the Hosted agents row at $0.0994 per vCPU-hour and $0.0118 per GiB-hour in US East. One active hour of the documented 1 vCPU and 2 GiB session is $0.123 before model tokens and tools. Japan East and Sweden Central are $0.10934 and $0.01298. The October 28 post prints $0.0994 per vCPU-hour and $0.0118 per GiB-hour for the Copilot harness sandbox starting December 1, 2026, says prices may vary by region, and says that harness runtime is free before then. Model inference stays billed either way.
