---
title: "AI agent frameworks: 13 MCP clients, 5 servers, 6 A2A"
description: "On November 13, 2026, 13 current agent frameworks document an MCP client. Five document a way to expose the agent as an MCP server. Six document A2A in their own docs. AG-UI is mostly an adapter list."
date: "2026-11-13"
updated: "2026-11-13"
type: original-report
topics:
  - research
  - tools-saas
  - how-agents-work
  - harnesses
contentLicense: true
absoluteTitle: true
dataset:
  title: "MCP, A2A, AG-UI, streaming, human-in-the-loop, and tracing cells for 13 AI agent frameworks, November 13, 2026"
  description: "Installable versions from PyPI and npm on November 13, 2026, checked against each repository's latest GitHub release. Protocol cells are Yes only where that framework's own docs, or a release note, describe the feature. AG-UI 'listed' means the name appears on docs.ag-ui.com/integrations that day. A blank-style cell means the named page was read and did not document the feature."
  isBasedOn: "https://docs.ag-ui.com/integrations"
abstract: |
  Thirteen agent frameworks with a current installable release document an MCP client. Five document a way for the agent to be the MCP server: LangGraph Agent Server, Google ADK, Pydantic AI, Mastra, and a LlamaIndex workflow turned into an MCP app. Six document A2A in the docs that match the installable release: CrewAI, Google ADK, Microsoft Agent Framework, Mastra, Agno, and Strands. Agno's page documents exposing an agent. The other five document calling a remote agent and serving one.

  AG-UI is a different object. The integrations page names LangChain, Microsoft Agent Framework, Google ADK, Strands, Mastra, Pydantic AI, Agno, LlamaIndex, CrewAI, AG2, and the OpenAI Agents SDK. That list is the protocol project's adapter shelf. Microsoft is the one in this set whose own docs tell you to pip install agent-framework-ag-ui.
whyItMatters: |
  A framework comparison that stops at stars, downloads, or the latest tag cannot tell a builder whether the library can call a tool server, be the tool server, or talk to another vendor's agent. Those are three different wires. MCP client is the common one. MCP server and A2A are the short lists. Treating an AG-UI adapter in someone else's repository as a feature of langgraph 1.2.21 is how the matrix lies.

  The same day, three install commands and three GitHub "latest release" tags disagree. agent-framework 1.26.0 is on PyPI and is not a GitHub release. @mastra/core 1.83.0 is on npm while the latest GitHub release is still 1.82.0. strands-agents 1.64.0 is the PyPI package, and the sdk-python repository's latest release tag is a TypeScript harness package.
keyFindings:
  - "All 13 frameworks in this note document an MCP client on an official docs page read November 13, 2026."
  - "Five document exposing the agent, or a workflow, over MCP: LangGraph Agent Server at /mcp, Google ADK, Pydantic AI, Mastra's MCPClient and MCPServer, and LlamaIndex's workflow-to-MCP-app example."
  - "Six document A2A on a page that matches the installable release: CrewAI 1.15.41, Google ADK, Microsoft Agent Framework, Mastra, Agno, and Strands. smolagents 1.26.0's docs say the A2A page does not exist in that version."
  - "docs.ag-ui.com/integrations lists 11 names that overlap this set. smolagents, the Vercel AI SDK, and AutoGen are not on that list. AG2 is, and AG2 is not AutoGen's repository."
  - "PyPI agent-framework 1.26.0 was uploaded 2026-11-12T18:25:37Z. GitHub's latest release is python-1.25.0, published 2026-11-07, and GET /releases/tags/python-1.26.0 returned 404."
methodology: |
  Versions were read on November 13, 2026 from PyPI JSON, the npm registry, and the GitHub releases API. A GitHub latest-release tag is recorded beside the registry version when they differ. Protocol cells were marked from the framework's own documentation pages fetched the same day, plus Microsoft Learn pages returned in that read. A cell is Yes only when the page describes the behavior. "Listed" for AG-UI means the framework name appears under Agent Frameworks on https://docs.ag-ui.com/integrations. A cell that names a page and says the feature was not on it means that page was fetched and the feature was not in the text used for this note. It does not mean the feature is absent from the product.

  Streaming, human-in-the-loop, and tracing were marked only where a fetched page described them. Several frameworks surely stream. This note does not fill those cells from memory.
limitations:
  - "Thirteen frameworks is a named set. A library not requested is absent. Claude Agent SDK, Semantic Kernel, DSPy, Haystack, and CAMEL are not in the table."
  - "A missing cell is not a no. It means the page named in that row did not document the feature in the text read on November 13, 2026."
  - "LangGraph's MCP server is Agent Server, which the page says needs langgraph-api. It is not a claim that import langgraph grows an /mcp route."
  - "AG-UI 'listed' is the protocol site's adapter list. It is not a claim that the framework package exports an AG-UI server, except where Microsoft's own page says to install agent-framework-ag-ui."
  - "AutoGen's maintenance status is not re-argued here. The version is the package autogen-agentchat 0.7.5, uploaded September 30, 2025."
  - "Token and dollar figures are not in this note. Search prices are a different page."
references:
  - title: "LangChain, MCPAdapter (read November 13, 2026)"
    url: "https://docs.langchain.com/oss/python/langchain/mcp"
    note: "Connect LangChain agents to MCP servers with MCPAdapter."
  - title: "LangSmith, MCP endpoint in Agent Server (read November 13, 2026)"
    url: "https://docs.langchain.com/langsmith/server-mcp"
    note: "Agent Server exposes LangGraph agents as MCP tools at /mcp. The page says the revisions it describes require langgraph-api>=0.18.0."
  - title: "LangGraph, interrupts (read November 13, 2026)"
    url: "https://docs.langchain.com/oss/python/langgraph/interrupts"
    note: "interrupt() pauses the graph for external input."
  - title: "LangGraph, streaming (read November 13, 2026)"
    url: "https://docs.langchain.com/oss/python/langgraph/streaming"
    note: "stream_mode=\"messages\" streams LLM tokens."
  - title: "LangSmith, trace with LangGraph (read November 13, 2026)"
    url: "https://docs.langchain.com/langsmith/trace-with-langgraph"
    note: "LangSmith integrates with LangGraph to trace agents. LangSmith is a separate product."
  - title: "CrewAI 1.15.41, MCP servers as tools (read November 13, 2026)"
    url: "https://docs.crewai.com/v1.15.41/en/mcp/overview"
    note: "Agents take MCP servers through the mcps field and MCPServerAdapter. The page is the client direction."
  - title: "CrewAI 1.15.41, A2A (read November 13, 2026)"
    url: "https://docs.crewai.com/v1.15.41/en/learn/a2a-agent-delegation"
    note: "Agents delegate tasks to remote A2A agents and can operate as A2A-compliant server agents."
  - title: "OpenAI Agents SDK, MCP (read November 13, 2026)"
    url: "https://openai.github.io/openai-agents-python/mcp/"
    note: "Hosted MCP, Streamable HTTP, SSE, and stdio. The page is the SDK as a client."
  - title: "OpenAI Agents SDK, human in the loop (read November 13, 2026)"
    url: "https://openai.github.io/openai-agents-python/human_in_the_loop/"
    note: "Tools can pause a run until a person approves or rejects the call."
  - title: "OpenAI Agents SDK, streaming (read November 13, 2026)"
    url: "https://openai.github.io/openai-agents-python/streaming/"
    note: "Streaming subscribes to updates as the run proceeds."
  - title: "Google ADK, MCP tools (read November 13, 2026)"
    url: "https://adk.dev/tools-custom/mcp-tools/"
    note: "McpToolset consumes MCP servers. The same page says an ADK server can be configured as an MCP server."
  - title: "Google ADK, A2A (read November 13, 2026)"
    url: "https://adk.dev/a2a/"
    note: "The guide covers exposing an agent over A2A and calling a remote A2A agent."
  - title: "Google ADK, tool confirmation (read November 13, 2026)"
    url: "https://adk.dev/tools-custom/confirmation/"
    note: "Workflows can pause for a person or another system to confirm."
  - title: "Microsoft Learn, Agent Framework tools (read November 13, 2026)"
    url: "https://learn.microsoft.com/en-us/agent-framework/agents/tools/"
    note: "Rows for MCP servers invoked by the provider runtime, and for local MCP tools."
  - title: "Microsoft Learn, expose an agent as an A2A server (read November 13, 2026)"
    url: "https://learn.microsoft.com/en-us/agent-framework/integrations/a2a"
    note: "The fetched URL resolved to the self-hosting A2A serve page. It links a separate page for discovering and invoking a remote A2A agent."
  - title: "Microsoft Learn, AG-UI integration (read November 13, 2026)"
    url: "https://learn.microsoft.com/en-us/agent-framework/integrations/by-component/ui/ag-ui/"
    note: "pip install agent-framework-ag-ui. The page maps agent.run(..., stream=True) to server-sent events."
  - title: "Microsoft Learn, workflow human-in-the-loop (read November 13, 2026)"
    url: "https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop"
    note: "A RequestPort lets an executor wait for a response from outside the workflow."
  - title: "Pydantic AI, MCP overview (read November 13, 2026)"
    url: "https://pydantic.dev/docs/ai/mcp/overview/"
    note: "Agents connect to MCP servers. A later section points at building MCP servers."
  - title: "Pydantic AI, MCP server (read November 13, 2026)"
    url: "https://pydantic.dev/docs/ai/mcp/server/"
    note: "Pydantic AI models can be used within MCP servers."
  - title: "Pydantic AI, deferred tools (read November 13, 2026)"
    url: "https://pydantic.dev/docs/ai/tools-toolsets/deferred-tools/"
    note: "Deferred tools pause for approval or an external result."
  - title: "Mastra, MCP connections (read November 13, 2026)"
    url: "https://mastra.ai/docs/connections/mcp"
    note: "MCPClient connects to MCP servers. MCPServer exposes Mastra agents, tools, and workflows. Both speak MCP revision 2026-07-28."
  - title: "Mastra, built-in MCP server (read November 13, 2026)"
    url: "https://mastra.ai/docs/server/mcp"
    note: "The Mastra server exposes registered agents, workflows, and tools at /api/mcp."
  - title: "Mastra, A2A (read November 13, 2026)"
    url: "https://mastra.ai/docs/connections/a2a"
    note: "Mastra supports A2A protocol version 0.3.0, to expose agents as remote agents and to consume remote A2A agents as subagents."
  - title: "Agno, MCP tools (read November 13, 2026)"
    url: "https://docs.agno.com/tools/mcp/overview"
    note: "Connect agents to an MCP server with MCPTools. The overview is the client direction."
  - title: "Agno, A2A interface (read November 13, 2026)"
    url: "https://docs.agno.com/agent-os/interfaces/a2a/introduction"
    note: "Expose Agno agents via the A2A protocol. The page names protocol v2.1.2, which is the protocol, not the agno 3.2.0 package."
  - title: "smolagents, tools (read November 13, 2026)"
    url: "https://huggingface.co/docs/smolagents/tutorials/tools"
    note: "MCPClient and ToolCollection.from_mcp load tools from an MCP server."
  - title: "smolagents 1.26.0, A2A docs slot (read November 13, 2026)"
    url: "https://huggingface.co/docs/smolagents/en/a2a"
    note: "The versioned page says the A2A documentation does not exist in v1.26.0 and exists on main."
  - title: "Strands, MCP tools (read November 13, 2026)"
    url: "https://strandsagents.com/latest/documentation/docs/user-guide/concepts/tools/mcp-tools/"
    note: "Strands loads an MCP server's tools in Python and TypeScript."
  - title: "Strands, agent-to-agent (read November 13, 2026)"
    url: "https://strandsagents.com/latest/documentation/docs/user-guide/concepts/multi-agent/agent-to-agent/"
    note: "Strands documents consuming a remote A2A agent and serving one of its own."
  - title: "Vercel AI SDK, MCP tools (read November 13, 2026)"
    url: "https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools"
    note: "The SDK connects to MCP servers. The page is the client."
  - title: "Vercel AI SDK, generating and streaming text (read November 13, 2026)"
    url: "https://ai-sdk.dev/docs/ai-sdk-core/generating-text"
    note: "streamText streams text from a model."
  - title: "LlamaIndex, MCP example (read November 13, 2026)"
    url: "https://developers.llamaindex.ai/python/examples/tools/mcp/"
    note: "Using tools from an MCP server, and converting a workflow to an MCP app."
  - title: "AutoGen, MCP tools reference (read November 13, 2026)"
    url: "https://microsoft.github.io/autogen/stable/reference/python/autogen_ext.tools.mcp.html"
    note: "The stable reference wraps an MCP tool over STDIO for AutoGen. autogen-agentchat 0.7.5 was uploaded 2025-09-30."
  - title: "AG-UI integrations (read November 13, 2026)"
    url: "https://docs.ag-ui.com/integrations"
    note: "Agent Frameworks list read that day names LangChain, Microsoft Agent Framework, Google ADK, Strands, Mastra, Pydantic AI, Agno, LlamaIndex, CrewAI, AG2, and the OpenAI Agents SDK. smolagents, the Vercel AI SDK, and AutoGen were not in that list."
  - title: "PyPI and npm version JSON, and GitHub releases (read November 13, 2026)"
    url: "https://pypi.org/pypi/langgraph/json"
    note: "Registry upload times and GitHub latest-release tags cited in the version section. npm ai 7.0.171, @mastra/core 1.83.0, @openai/agents 0.22.0, @langchain/langgraph 1.7.4."
citation:
  apa: "AI Agents Info. (2026, November 13). AI agent frameworks: 13 MCP clients, 5 servers, 6 A2A. https://www.aiagentsinfo.com/research/ai-agent-framework-mcp-a2a-support-november-2026"
  bibtex: |
    @misc{aiagentsinfo2026frameworkProtocolMatrix,
      title={AI agent frameworks: 13 MCP clients, 5 servers, 6 A2A},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/ai-agent-framework-mcp-a2a-support-november-2026},
      note={Official docs read November 13, 2026}
    }
ledeQuestion: "Which agent frameworks support MCP and A2A in November 2026?"
ledeAnswer: "All 13 in this note document an MCP client. Five document an MCP server. Six document A2A: CrewAI, Google ADK, Microsoft Agent Framework, Mastra, Agno, and Strands."
faq:
  - question: "Which AI agent frameworks support MCP?"
    answer: "All 13 in this note document an MCP client on a page read November 13, 2026: LangGraph via LangChain's MCPAdapter, CrewAI 1.15.41, the OpenAI Agents SDK, Google ADK 2.14.1, Microsoft Agent Framework, AutoGen's MCP extension, LlamaIndex 0.14.25, Pydantic AI 2.68.0, Mastra, Agno 3.2.0, smolagents 1.26.0, Strands 1.64.0, and the Vercel AI SDK 7.0.171. An MCP client calls someone else's server. It is not the same as exposing your agent as a server."
  - question: "Which frameworks can expose an agent as an MCP server?"
    answer: "Five pages document that direction. LangGraph Agent Server serves agents at /mcp and says the behavior it describes needs langgraph-api 0.18.0 or newer. Google ADK's MCP page says an ADK server can be configured as an MCP server. Pydantic AI documents using its models inside an MCP server. Mastra documents MCPServer and a built-in /api/mcp route. LlamaIndex's MCP example includes converting a workflow to an MCP app."
  - question: "Which frameworks support A2A?"
    answer: "Six of the installable releases document it. CrewAI 1.15.41, Google ADK, Microsoft Agent Framework, Mastra, and Strands document both calling a remote agent and serving one. Agno's AgentOS page documents exposing an agent, and it names A2A protocol v2.1.2. smolagents 1.26.0's docs say the A2A page does not exist in that version. LangGraph's guessed /a2a URL returned 404. Pydantic's guessed URL left Pydantic's docs. A missing cell is not a claim that the feature is impossible."
  - question: "Is AG-UI built into these frameworks?"
    answer: "The AG-UI integrations page lists LangChain, Microsoft Agent Framework, Google ADK, Strands, Mastra, Pydantic AI, Agno, LlamaIndex, CrewAI, AG2, and the OpenAI Agents SDK. That is the protocol project's list of adapters. Microsoft's own docs also say to install agent-framework-ag-ui. smolagents, the Vercel AI SDK, and AutoGen were not on the integrations list. AG2 was, and AG2 is a different repository from microsoft/autogen."
  - question: "Does the latest GitHub release match the package you install?"
    answer: "Not for three of these. PyPI agent-framework 1.26.0 was uploaded November 12, 2026, and GitHub has no release tag python-1.26.0. The latest GitHub release is python-1.25.0 from November 7. npm @mastra/core 1.83.0 was published November 12, and the latest GitHub release is still @mastra/core@1.82.0 from November 4. PyPI strands-agents 1.64.0 was uploaded November 4, and the sdk-python repository's latest release that day in November is harness-typescript/v0.4.0."
---

**13 clients. 5 servers. 6 A2A pages that match the package you can install.** That is the split on November 13, 2026, across the 13 frameworks whose installable versions are in the table.

An MCP client lets the agent call a tool server. An MCP server lets some other client call the agent. A2A is a third wire, agent to agent, and it is the short list. AG-UI is a fourth, and most of the "support" is an adapter named on [docs.ag-ui.com/integrations](https://docs.ag-ui.com/integrations), not a module inside the framework package.

The [November 5 GitHub snapshot](/reports/ai-agent-framework-github-stats-november-2026) is stars and one latest tag. [Best AI agent frameworks](/best/ai-agent-frameworks) is the licence and that tag. [LangGraph vs CrewAI vs the OpenAI Agents SDK](/blog/langgraph-vs-crewai-vs-openai-agents-sdk) is three bills. None of those pages is this matrix.

## Which installable version was current on November 13?

The registry version is what `pip` or `npm` would have resolved. The GitHub tag is what the releases API called latest. They match on LangGraph, CrewAI, Google ADK, Pydantic AI, Agno, AutoGen, LlamaIndex, smolagents, and the Vercel AI SDK package `ai`. They do not match on Microsoft Agent Framework, Mastra, or Strands.

| Framework | Registry version | Registry time (UTC) | GitHub latest release |
| --- | --- | --- | --- |
| LangGraph | langgraph 1.2.21 | 2026-11-12T18:06:30Z | 1.2.21 at 2026-11-12T18:06:43Z |
| LangGraph, JavaScript | @langchain/langgraph 1.7.4 | 2026-11-12T18:09:51Z | The Python tag above is a different package |
| CrewAI | crewai 1.15.41 | 2026-11-12T18:42:55Z | 1.15.41 at 2026-11-12T18:42:07Z |
| OpenAI Agents SDK | openai-agents 0.24.0 | 2026-10-15T02:38:18Z | Python tag v0.24.0 at 2026-10-15T02:20:12Z |
| OpenAI Agents SDK, JavaScript | @openai/agents 0.22.0 | 2026-11-12T23:59:01Z | Latest JS release that hour was @openai/agents-extensions@0.22.0 |
| Google ADK | google-adk 2.14.1 | 2026-11-12T21:32:01Z | v2.14.1 at 2026-11-12T21:30:11Z |
| Microsoft Agent Framework | agent-framework 1.26.0 | 2026-11-12T18:25:37Z | python-1.25.0 at 2026-11-07T15:52:42Z. Tag python-1.26.0 returned 404 |
| AutoGen | autogen-agentchat 0.7.5 | 2025-09-30T06:16:12Z | python-v0.7.5 at 2025-09-30T06:18:26Z |
| LlamaIndex | llama-index 0.14.25 | 2026-09-21T16:22:20Z | v0.14.25 at 2026-09-21T16:22:27Z |
| Pydantic AI | pydantic-ai 2.68.0 | 2026-11-12T02:30:01Z | v2.68.0 at 2026-11-12T01:56:19Z |
| Mastra | @mastra/core 1.83.0 | 2026-11-12T21:27:47Z | @mastra/core@1.82.0 at 2026-11-04T10:59:56Z |
| Agno | agno 3.2.0 | 2026-11-12T17:48:01Z | v3.2.0 at 2026-11-12T17:47:14Z |
| smolagents | smolagents 1.26.0 | 2026-05-29T05:08:43Z | v1.26.0 at 2026-05-29T05:09:47Z |
| Strands | strands-agents 1.64.0 | 2026-11-04T19:54:19Z | Latest release on the sdk-python repo was harness-typescript/v0.4.0 at 2026-11-12T22:34:40Z |
| Vercel AI SDK | ai 7.0.171 | 2026-11-12T20:22:00Z | ai@7.0.171 at 2026-11-12T20:20:02Z |

Install the registry version when you are reproducing a bug. Quote the GitHub tag when you are talking about what GitHub called latest. Microsoft's 1.26.0 is a real upload. It is not, on this read, a GitHub release.

## Which cells are actually documented?

Thirteen rows document an MCP client. Five document a server path. Six document A2A on the installable release. Yes means the framework's own page describes it. Listed means the AG-UI integrations page names it. A dash means the page in the notes did not document that feature. A dash is not a no.

| Framework | MCP client | MCP server | A2A | AG-UI | Streaming | Human in the loop | Tracing or evals |
| --- | --- | --- | --- | --- | --- | --- | --- |
| LangGraph 1.2.21 | Yes | Agent Server | — | LangChain is listed | Yes | Yes | LangSmith |
| CrewAI 1.15.41 | Yes | — | Yes | Listed | — | — | — |
| OpenAI Agents SDK 0.24.0 | Yes | — | — | Listed | Yes | Yes | — |
| Google ADK 2.14.1 | Yes | Yes | Yes | Listed | — | Yes | — |
| Microsoft Agent Framework 1.26.0 | Yes | — | Yes | First-party docs | Yes, on the AG-UI page | Yes | — |
| AutoGen 0.7.5 | Yes | — | — | Not listed | — | — | — |
| LlamaIndex 0.14.25 | Yes | MCP app | — | Listed | — | — | — |
| Pydantic AI 2.68.0 | Yes | Yes | — | Listed | — | Yes | — |
| Mastra 1.83.0 | Yes | Yes | Yes | Listed | — | — | — |
| Agno 3.2.0 | Yes | — | Expose | Listed | — | — | — |
| smolagents 1.26.0 | Yes | — | Not in 1.26.0 | Not listed | — | — | — |
| Strands 1.64.0 | Yes | — | Yes | Listed | — | — | — |
| Vercel AI SDK 7.0.171 | Yes | — | — | Not listed | Yes | — | — |

LangGraph's client is [MCPAdapter](https://docs.langchain.com/oss/python/langchain/mcp) on the LangChain docs, which is the layer a LangGraph agent uses to call MCP servers. The server is a different product. [Agent Server](https://docs.langchain.com/langsmith/server-mcp) exposes LangGraph agents as MCP tools at `/mcp`, and the page says the protocol behavior it describes requires `langgraph-api>=0.18.0`. Streaming is `stream_mode="messages"`. Human-in-the-loop is `interrupt()`. Tracing is [LangSmith's integration](https://docs.langchain.com/langsmith/trace-with-langgraph), which is not the open-source graph package.

CrewAI 1.15.41's [MCP page](https://docs.crewai.com/v1.15.41/en/mcp/overview) is servers as tools: the `mcps` field and `MCPServerAdapter`. That is a client. It does not document CrewAI itself as an MCP server. A2A is a different page in the same 1.15.41 docs: agents [delegate to remote A2A agents and can run as A2A servers](https://docs.crewai.com/v1.15.41/en/learn/a2a-agent-delegation). Streaming, approval gates, and evals were not on either page, so those cells stay empty. AG-UI lists CrewAI.

The [OpenAI Agents SDK MCP guide](https://openai.github.io/openai-agents-python/mcp/) is also a client: hosted MCP, Streamable HTTP, SSE, and stdio. The [streaming](https://openai.github.io/openai-agents-python/streaming/) and [human-in-the-loop](https://openai.github.io/openai-agents-python/human_in_the_loop/) guides are in the same docs. This read did not quote the tracing guide, so that cell stays empty. The Python package on PyPI is still 0.24.0 from October 15. The JavaScript package `@openai/agents` reached 0.22.0 on November 12.

Google ADK 2.14.1 uses `McpToolset` as the client, and the [same MCP page](https://adk.dev/tools-custom/mcp-tools/) says an ADK server can be configured as an MCP server for other clients. The [A2A guide](https://adk.dev/a2a/) covers exposing an agent and calling a remote one. The [confirmation page](https://adk.dev/tools-custom/confirmation/) is the human-in-the-loop cell. A standalone streaming guide was not in the pages that resolved, so streaming stays empty even though the A2A material elsewhere talks about a streaming mode.

Microsoft Agent Framework's [tools page](https://learn.microsoft.com/en-us/agent-framework/agents/tools/) has rows for MCP servers the provider runtime calls, and for local MCP tools. That is a client. The [A2A serve page](https://learn.microsoft.com/en-us/agent-framework/integrations/a2a) is the server direction and links a page for invoking a remote agent. [AG-UI](https://learn.microsoft.com/en-us/agent-framework/integrations/by-component/ui/ag-ui/) is documented by Microsoft, including `pip install agent-framework-ag-ui` and `agent.run(..., stream=True)`. [Workflow human-in-the-loop](https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop) uses a `RequestPort`. The observability URL tried for this note returned 404, so tracing stays empty. The installable Python package is 1.26.0. GitHub's latest release tag is still python-1.25.0.

AutoGen's [MCP reference](https://microsoft.github.io/autogen/stable/reference/python/autogen_ext.tools.mcp.html) wraps an MCP tool over STDIO. That is a client, on a package uploaded September 30, 2025. The AG-UI list names AG2, not AutoGen. This note does not treat those as the same row. The maintenance argument is [Is AutoGen deprecated?](/blog/is-autogen-deprecated). This matrix does not add a new claim about the README.

Pydantic AI 2.68.0 [connects to MCP servers](https://pydantic.dev/docs/ai/mcp/overview/) and [can sit inside an MCP server](https://pydantic.dev/docs/ai/mcp/server/). [Deferred tools](https://pydantic.dev/docs/ai/tools-toolsets/deferred-tools/) are the approval pause. A guessed A2A URL redirected away from Pydantic's docs, so A2A stays empty. AG-UI lists Pydantic AI.

Mastra's [connections page](https://mastra.ai/docs/connections/mcp) documents both `MCPClient` and `MCPServer`, on MCP revision `2026-07-28`. The [built-in server](https://mastra.ai/docs/server/mcp) is `/api/mcp` for agents, workflows, and tools already registered on the Mastra instance. The [A2A page](https://mastra.ai/docs/connections/a2a) says Mastra supports protocol version 0.3.0, to expose agents as remote agents and to consume remote A2A agents as subagents. npm is 1.83.0. The latest GitHub release is 1.82.0 from November 4. AG-UI lists Mastra.

Agno 3.2.0's [MCP overview](https://docs.agno.com/tools/mcp/overview) connects an agent to an MCP server with `MCPTools`. That is a client. The overview does not document Agno as the MCP server. A2A is the AgentOS interface: the page says to [expose Agno agents via the A2A protocol](https://docs.agno.com/agent-os/interfaces/a2a/introduction), and the version it names, v2.1.2, is the protocol. AG-UI lists Agno.

smolagents 1.26.0, unchanged since May 29, loads MCP tools with `MCPClient` and `ToolCollection.from_mcp` on the [tools tutorial](https://huggingface.co/docs/smolagents/tutorials/tools). It is not on the AG-UI list. The tutorial does not document smolagents as an MCP server. The [versioned A2A URL](https://huggingface.co/docs/smolagents/en/a2a) says the page does not exist in v1.26.0 and exists on main. The package you install does not have that page.

Strands 1.64.0 [loads MCP tools](https://strandsagents.com/latest/documentation/docs/user-guide/concepts/tools/mcp-tools/) in Python and TypeScript, and its [A2A page](https://strandsagents.com/latest/documentation/docs/user-guide/concepts/multi-agent/agent-to-agent/) documents both consuming and serving. AG-UI lists Strands as AWS Strands Agents. The PyPI package and the repository's latest GitHub tag are different objects: 1.64.0 versus `harness-typescript/v0.4.0`.

The Vercel AI SDK at `ai` 7.0.171 [connects to MCP servers](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools). [streamText](https://ai-sdk.dev/docs/ai-sdk-core/generating-text) is the streaming cell. The MCP page is the client direction. The AG-UI integrations list did not name the Vercel AI SDK. GitHub's release `ai@7.0.171` matches npm, the same hour. The repository publishes other packages from the same tag list, so "latest release" on that repo is not always the `ai` package.

LlamaIndex 0.14.25's [MCP example](https://developers.llamaindex.ai/python/examples/tools/mcp/) covers using tools from an MCP server and converting a workflow to an MCP app. AG-UI lists LlamaIndex. The example page does not document A2A. The package date is September 21, 2026, the oldest current release in this set after AutoGen and smolagents.

## Where does AG-UI sit, if it is not the framework?

On the adapter shelf, unless the vendor's own docs install it.

The integrations page read November 13 names LangChain, not a heading that says LangGraph. LangChain is the MCP client layer this note already used for LangGraph. The protocol repository also ships a Python package, `ag-ui-langgraph`, which is an adapter you install beside LangGraph. That package is not langgraph 1.2.21.

Microsoft is the exception in this set. The Learn page tells you to install `agent-framework-ag-ui` and maps framework runs onto AG-UI events, including approval. That is first-party documentation of an integration package. It is still a separate install from `agent-framework`.

smolagents, AutoGen, and the Vercel AI SDK were not on the list. If a demo wraps one of them, this note did not find it on that page.

## What does this mean for the framework you install?

Call MCP when the agent needs someone else's tools. Every framework in the table documents that, and the docs are not interchangeable. CrewAI wants an `mcps` list. ADK wants `McpToolset`. The OpenAI SDK wants a hosted tool or a transport class. Copying one project's snippet into another project is how the tool call fails before the model sees it.

Expose MCP when some other host, a coding agent or a second product, has to call your agent. The list is Agent Server, ADK, Pydantic AI, Mastra, and the LlamaIndex MCP app. LangGraph's open-source graph does not grow `/mcp` because the Agent Server page exists. You install the server.

Use A2A when the other party is an agent with its own card, not a tool with a JSON schema. On the installable docs, that is CrewAI, ADK, Microsoft Agent Framework, Mastra, Agno, and Strands. Agno's page is the expose direction. The other five describe both calling and serving. Do not describe the other seven as incompatible. LangGraph's `/a2a` URL returned 404. The OpenAI Agents SDK, LlamaIndex, and Vercel AI SDK URLs tried the same day returned 404. Pydantic's guessed URL left the docs for `github.com/datalayer/fasta2a`. AutoGen's guessed URL returned 404. smolagents is the one that says the page is missing from the release you can install.

Do not buy AG-UI support off a logo strip. Read the integrations page, then read the framework's own install line. Microsoft has one. The others on the list are the protocol project's adapters until their own docs say otherwise.

If the bill you actually need is the search call those tools make, that is a different page: [web search API cost per agent task](/tools/web-search-api-cost-per-agent-task). Framework release tags from the November 5 pull are the [GitHub stats report](/reports/ai-agent-framework-github-stats-november-2026). How often those tags landed is the [30-day cadence note](/research/ai-agent-framework-release-cadence-october-november-2026).

## What should you open next?

The comparison shelf, the trackers, and the directory.

- [Best AI agent frameworks](/best/ai-agent-frameworks) is the licence and release-tag comparison. This note does not replace it.
- [AI agent framework GitHub stats, November 2026](/reports/ai-agent-framework-github-stats-november-2026) is the November 5 snapshot these names come from.
- [Which of 11 frameworks to install](/research/which-ai-agent-framework-to-install-november-2026) is the November 14 recount, plus the job. It records that `python-1.26.0` and `@mastra/core@1.83.0` are now GitHub releases. It does not replace this matrix.
- [Which AI agent framework do people install?](/blog/which-ai-agent-framework-do-people-install) is file requests, not protocol support.
- The [downloads tracker](/trackers/downloads) and the [stars tracker](/trackers/stars) move after this page. A download is not a user.
- [Web search API cost per agent task](/tools/web-search-api-cost-per-agent-task) prices the search call once a framework can make one. [All free tools](/tools) are on one page.
- [Submit or claim a listing](/submit) if you ship an agent and want it in the directory.
