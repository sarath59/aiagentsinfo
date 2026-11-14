---
title: "AI agent framework downloads vs GitHub stars, November 2026: AutoGen is 6.9 per star"
description: "From October 15 through November 13, 2026, autogen-agentchat had 425,456 PyPI downloads and microsoft/autogen had 61,809 stars: 6.9 downloads per star. claude-agent-sdk had 4,249.1 on 8,541 stars. LangGraph had 1,308.0. CrewAI had 43.2."
date: "2026-11-14"
updated: "2026-11-14"
type: original-report
topics:
  - research
  - tools-saas
  - how-agents-work
  - harnesses
contentLicense: true
absoluteTitle: true
companies:
  - langchain
  - crewai
  - openai
  - openai-agents-sdk
  - anthropic
  - google
  - google-adk
  - microsoft
  - microsoft-agent-framework
  - pydantic-ai
  - huggingface
  - smolagents
dataset:
  title: "PyPI and npm downloads per GitHub star for AI agent frameworks, October 15 through November 13, 2026"
  description: "Thirty-day sums of pypistats overall, category without_mirrors, for 17 Python distributions, from 2026-10-15 through 2026-11-13 inclusive. The pypistats responses carried HTTP Date Sat, 14 Nov 2026 05:17:29 GMT for langchain and 05:17:30 GMT for the other sixteen. GitHub stargazers_count for 18 repositories was read the same morning, HTTP Date 05:17:31 GMT through 05:17:34 GMT. npm point-range totals for four packages use the same dates, HTTP Date 05:17:30 GMT through 05:17:31 GMT. Downloads per star are the 30-day total divided by that morning's stargazers_count, printed to one decimal. autogen-agentchat is 425,456 downloads and 61,809 stars, 6.9 per star. claude-agent-sdk is 36,291,587 and 8,541 stars, 4,249.1 per star. A download is a file request, not a user."
  isBasedOn: "https://pypistats.org/api/packages/autogen-agentchat/overall?mirrors=false"
abstract: |
  autogen-agentchat was downloaded 425,456 times on PyPI from October 15 through November 13, 2026, in the without_mirrors series. microsoft/autogen had 61,809 stars at 05:17 GMT on November 14. 425,456 divided by 61,809 is 6.9 downloads per star, the lowest ratio in this set.

  claude-agent-sdk had 36,291,587 downloads and anthropics/claude-agent-sdk-python had 8,541 stars, 4,249.1 per star. strands-agents had 38,256,992 downloads and 9,204 stars, 4,156.6 per star. Those two are the quietly fetched packages. LangGraph had 58,774,245 downloads and 44,934 stars, 1,308.0 per star. CrewAI had 2,629,192 downloads and 60,872 stars, 43.2 per star.
whyItMatters: |
  A star sort on this set puts AutoGen and CrewAI ahead of LangGraph. The file requests do not. LangGraph's 30-day total is 22.35 times CrewAI's, and LangGraph has 15,938 fewer stars. AutoGen has the most stars of the multi-agent repositories here and the fewest downloads per star.

  The November 5 star table and the November 14 job picker do not divide downloads by stars. The November 9 install census prints both columns and does not print this ratio. This note is that division, on a window that ends November 13.
keyFindings:
  - "autogen-agentchat had 425,456 PyPI downloads from October 15 through November 13, 2026, and microsoft/autogen had 61,809 stars at 05:17 GMT on November 14. 425,456 divided by 61,809 is 6.883, printed as 6.9 downloads per star. The November 5 snapshot already had this repository at 61,706 stars."
  - "claude-agent-sdk had 36,291,587 downloads and 8,541 stars, 4,249.1 per star. strands-agents had 38,256,992 downloads and 9,204 stars, 4,156.6 per star. Both repositories are under 10,000 stars and both packages cleared 36 million downloads."
  - "langgraph had 58,774,245 downloads and 44,934 stars, 1,308.0 per star. crewai had 2,629,192 downloads and 60,872 stars, 43.2 per star. CrewAI leads LangGraph by 15,938 stars. LangGraph's download total is 22.35 times CrewAI's."
  - "langchain-core had 158,421,619 downloads, 1,554,524 more than langchain's 156,867,095. langchain 1.5.0 requires langchain-core and langgraph with no extra marker. pydantic-ai-slim had 35,124,631 downloads against pydantic-ai's 6,888,240. The slim distribution is a dependency, and it shares pydantic/pydantic-ai's 21,199 stars."
  - "On npm, for the same dates, @mastra/core had 11,304,230 downloads and mastra-ai/mastra had 29,512 stars, 383.0 per star. @langchain/langgraph had 17,998,507 downloads and langchain-ai/langgraphjs had 3,415 stars, 5,270.4 per star. Pairing that npm total with the Python repo's 44,934 stars instead produces 400.6. That division uses the wrong repository."
methodology: |
  The Python set is the distributions a builder compares when the question is which agent framework to install, plus the two SDK packages the downloads tracker already counts and the dependency files needed for the caveat: langchain, langgraph, crewai, openai-agents, pydantic-ai, pydantic-ai-slim, google-adk, agent-framework, agent-framework-core, autogen-agentchat, ag2, smolagents, agno, llama-index, strands-agents, claude-agent-sdk, and langchain-core. The npm set is @mastra/core, @openai/agents, @langchain/langgraph, and @google/adk.

  Each PyPI total is the sum of daily without_mirrors rows from https://pypistats.org/api/packages/{name}/overall?mirrors=false for 2026-10-15 through 2026-11-13 inclusive. That is 30 days. The last positive day in every response was 2026-11-13. November 14 is not in the window. The langchain response carried HTTP Date Sat, 14 Nov 2026 05:17:29 GMT. The other sixteen carried 05:17:30 GMT. The previous window used in the change section is 2026-09-15 through 2026-10-14, also 30 days, from the same responses. The two windows do not overlap.

  Stars are stargazers_count from GET https://api.github.com/repos/{owner}/{repo}. Those 18 responses carried HTTP Date Sat, 14 Nov 2026 05:17:31 GMT through 05:17:34 GMT. Downloads per star are the 30-day registry total divided by that count, printed to one decimal. A ratio of two download totals is printed to two decimals. A percent change is printed to one decimal. PyPI and npm are never added together.

  The repository paired with a package is the repository named by that package's own metadata, read the same morning. npm registry documents at 05:21:34 GMT and 05:21:35 GMT point @mastra/core at mastra-ai/mastra, @openai/agents at openai/openai-agents-js, @langchain/langgraph at langchain-ai/langgraphjs, and @google/adk at google/adk-js. PyPI project URLs at 05:21:13 GMT point strands-agents at strands-agents/harness-sdk and claude-agent-sdk at anthropics/claude-agent-sdk-python. langchain-core's Repository field at 05:21:27 GMT is https://github.com/langchain-ai/langchain. agent-framework and agent-framework-core name microsoft/agent-framework in their source and issues fields at the same minute.

  requires_dist comes from PyPI JSON at 05:17:34 GMT. langchain 1.5.0 lists langchain-core<2.0.0,>=1.8.0 and langgraph<1.3.0,>=1.2.12 with no extra marker. pydantic-ai 2.68.0 lists pydantic-ai-slim[anthropic,cli,evals,google,logfire,mcp,openai,web]==2.68.0 with no extra marker. agent-framework 1.26.0 lists agent-framework-core[all]==1.26.0 with no extra marker. google-adk 2.14.1 lists langgraph only under extras.
limitations:
  - "A download is a file request. CI, a mirror the without_mirrors filter still misses, and one project installing a dependency all land in the same number. It is not a weekly active user and it is not a production agent."
  - "langchain-core, pydantic-ai-slim, and agent-framework-core are fetched by other distributions in this table. Adding those rows to langchain, pydantic-ai, or agent-framework double-counts one install. The per-star figure on a dependency uses the parent repository's stars."
  - "PyPI and npm are different registries. @openai/agents and openai-agents are not one population. @langchain/langgraph and langgraph are not one population."
  - "Stars were read between 05:17:31 and 05:17:34 GMT. Downloads were read at 05:17:29 and 05:17:30 GMT. A star that landed in that minute is on one side of the ratio only."
  - "The set is named. DSPy, Semantic Kernel, Haystack, CAMEL, and the Vercel AI SDK are outside it. The November 9 install census includes several of those and does not print downloads per star."
  - "A package with a few thousand stars can post a huge per-star figure because the denominator is small. claude-agent-sdk and strands-agents also have more than 36 million downloads, so their ratios are not a 27-star trick. @langchain/langgraph's 5,270.4 sits on 3,415 stars, and that one is the small denominator."
references:
  - title: "pypistats overall, mirrors=false, autogen-agentchat (HTTP Date Sat, 14 Nov 2026 05:17:30 GMT)"
    url: "https://pypistats.org/api/packages/autogen-agentchat/overall?mirrors=false"
    note: "425,456 is the sum of without_mirrors rows from 2026-10-15 through 2026-11-13. The same endpoint and window were read for the other sixteen distributions. langchain's response carried 05:17:29 GMT."
  - title: "GitHub REST API, microsoft/autogen (HTTP Date Sat, 14 Nov 2026 05:17:33 GMT)"
    url: "https://api.github.com/repos/microsoft/autogen"
    note: "stargazers_count 61,809. The other seventeen repositories were read from 05:17:31 GMT through 05:17:34 GMT."
  - title: "npm downloads range, @mastra/core, 2026-10-15 through 2026-11-13"
    url: "https://api.npmjs.org/downloads/range/2026-10-15:2026-11-13/@mastra/core"
    note: "11,304,230. HTTP Date Sat, 14 Nov 2026 05:17:30 GMT. The other three npm packages were read at 05:17:31 GMT."
  - title: "npm registry, @langchain/langgraph (HTTP Date Sat, 14 Nov 2026 05:21:35 GMT)"
    url: "https://registry.npmjs.org/@langchain/langgraph"
    note: "repository git+ssh://git@github.com/langchain-ai/langgraphjs.git. latest 1.7.4. This is not langchain-ai/langgraph."
  - title: "npm registry, @mastra/core, @openai/agents, and @google/adk"
    url: "https://registry.npmjs.org/@mastra/core"
    note: "Read 05:21:34 GMT and 05:21:35 GMT. Repositories: mastra-ai/mastra, openai/openai-agents-js, google/adk-js."
  - title: "PyPI JSON, langchain 1.5.0, requires_dist (HTTP Date Sat, 14 Nov 2026 05:17:34 GMT)"
    url: "https://pypi.org/pypi/langchain/json"
    note: "Requires langchain-core<2.0.0,>=1.8.0 and langgraph<1.3.0,>=1.2.12 with no extra marker."
  - title: "PyPI JSON, pydantic-ai 2.68.0"
    url: "https://pypi.org/pypi/pydantic-ai/json"
    note: "Requires pydantic-ai-slim[anthropic,cli,evals,google,logfire,mcp,openai,web]==2.68.0 with no extra marker."
  - title: "PyPI JSON, agent-framework 1.26.0, including project_urls (HTTP Date Sat, 14 Nov 2026 05:21:27 GMT)"
    url: "https://pypi.org/pypi/agent-framework/json"
    note: "requires_dist at 05:17:34 GMT includes agent-framework-core[all]==1.26.0 with no extra marker. The source field names microsoft/agent-framework."
  - title: "PyPI JSON, langchain-core 1.8.0"
    url: "https://pypi.org/pypi/langchain-core/json"
    note: "Repository field https://github.com/langchain-ai/langchain. Read 05:21:27 GMT. Version 1.8.0 was the version field at 05:21:13 GMT."
  - title: "PyPI JSON, strands-agents 1.65.0 and claude-agent-sdk 0.2.182"
    url: "https://pypi.org/pypi/strands-agents/json"
    note: "Homepages read 05:21:13 GMT point at strands-agents/harness-sdk and anthropics/claude-agent-sdk-python."
  - title: "AI Agents Info, framework star snapshot, November 5, 2026"
    url: "https://www.aiagentsinfo.com/reports/ai-agent-framework-github-stats-november-2026"
    note: "microsoft/autogen had 61,706 stars at 2026-11-05T04:41:05Z. run-llama/llama_index had 52,894."
  - title: "npm download-counts documentation"
    url: "https://github.com/npm/registry/blob/master/docs/download-counts.md"
    note: "A download counts a file request, including CI and dependency installs."
citation:
  apa: "AI Agents Info. (2026, November 14). AI agent framework downloads vs GitHub stars, November 2026: AutoGen is 6.9 per star. https://www.aiagentsinfo.com/research/ai-agent-framework-downloads-vs-github-stars-november-2026"
  bibtex: |
    @misc{aiagentsinfo2026frameworkDownloadsPerStar,
      title={AI agent framework downloads vs GitHub stars, November 2026: AutoGen is 6.9 per star},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/ai-agent-framework-downloads-vs-github-stars-november-2026},
      note={PyPI without_mirrors and npm downloads for 2026-10-15 through 2026-11-13, GitHub stargazers_count read 2026-11-14T05:17Z}
    }
ledeQuestion: "Which AI agent framework has the most downloads per GitHub star?"
ledeAnswer: "claude-agent-sdk, at 4,249.1, on this set and this window. It had 36,291,587 PyPI downloads from October 15 through November 13, 2026, and 8,541 stars on the morning of November 14. AutoGen, the repository with 61,809 stars, had 6.9 downloads per star."
faq:
  - question: "What is downloads per GitHub star?"
    answer: "The package's file downloads over October 15 through November 13, 2026, divided by stargazers_count on the morning of November 14. PyPI uses the without_mirrors series. npm is a separate division. The figure is printed to one decimal. It is not a count of people."
  - question: "Which AI agent framework has the most downloads per star?"
    answer: "claude-agent-sdk, at 4,249.1. 36,291,587 divided by 8,541 is 4,249.1. strands-agents is next at 4,156.6. Among repositories with at least 10,000 stars, LangGraph is highest at 1,308.0 and AutoGen is lowest at 6.9."
  - question: "Does AutoGen's star count mean people install it?"
    answer: "No. microsoft/autogen had 61,809 stars and autogen-agentchat had 425,456 downloads in the 30-day window, 6.9 per star. The November 5 snapshot already had the repository at 61,706 stars, so the ratio is not a one-week star spike. The install name and the maintenance note are on the November 9 and November 14 pages linked from this note."
  - question: "Do LangChain downloads include LangGraph and langchain-core?"
    answer: "A fresh install of langchain 1.5.0 also requests them. That release requires langchain-core<2.0.0,>=1.8.0 and langgraph<1.3.0,>=1.2.12 with no extra marker. The 30-day totals do not nest. langchain-core had 158,421,619 downloads and langchain had 156,867,095. langgraph had 58,774,245. Adding the three numbers counts one install more than once."
  - question: "Is a PyPI download a user?"
    answer: "No. The figure is a count of package-file downloads in the without_mirrors series. CI, a dependency install, and a mirror the filter misses all land in the same number. Compare distributions on the same registry and the same dates. Do not add a PyPI total to an npm total."
---

**6.9.** That is autogen-agentchat's PyPI downloads from October 15 through November 13, 2026, divided by microsoft/autogen's star count on the morning of November 14. 425,456 divided by 61,809 is 6.883, printed here as 6.9.

**4,249.1** is the other end of the same division. claude-agent-sdk had 36,291,587 downloads. anthropics/claude-agent-sdk-python had 8,541 stars. The pypistats responses carried HTTP Date Sat, 14 Nov 2026 05:17:29 GMT for langchain and 05:17:30 GMT for the rest. The GitHub responses carried 05:17:31 GMT through 05:17:34 GMT.

The [downloads tracker](/trackers/downloads) is the live file-request table. The [stars tracker](/trackers/stars) is the live bookmark table. The [November 5 star report](/reports/ai-agent-framework-github-stats-november-2026) ranks repositories and releases. [Best AI agent frameworks](/best/ai-agent-frameworks) is the licence table. None of those pages divides the 30-day download total by stars. The [November 9 install census](/blog/which-ai-agent-framework-do-people-install) prints both columns for an earlier window and stops at the comparison between two packages. This note is the ratio.

## Which AI agent framework has the most downloads per GitHub star?

claude-agent-sdk, at 4,249.1. strands-agents is second at 4,156.6. Both sit under 10,000 stars and both cleared 36 million downloads, so the ratio is not a tiny denominator dressed up as a market.

The window is 30 calendar days, October 15 through November 13, inclusive. Each Python total is the sum of daily `without_mirrors` rows. Stars are `stargazers_count` from the same morning. Per star is downloads divided by stars, to one decimal. npm is the next section. It is not in this table.

| Package | Downloads | Stars | Per star | Repository |
| --- | --- | --- | --- | --- |
| claude-agent-sdk | 36,291,587 | 8,541 | 4,249.1 | anthropics/claude-agent-sdk-python |
| strands-agents | 38,256,992 | 9,204 | 4,156.6 | strands-agents/harness-sdk |
| langgraph | 58,774,245 | 44,934 | 1,308.0 | langchain-ai/langgraph |
| langchain | 156,867,095 | 149,473 | 1,049.5 | langchain-ai/langchain |
| openai-agents | 19,169,518 | 30,661 | 625.2 | openai/openai-agents-python |
| google-adk | 10,678,997 | 22,209 | 480.8 | google/adk-python |
| pydantic-ai | 6,888,240 | 21,199 | 324.9 | pydantic/pydantic-ai |
| agent-framework-core | 1,565,472 | 14,668 | 106.7 | microsoft/agent-framework |
| agno | 2,242,183 | 43,183 | 51.9 | agno-agi/agno |
| crewai | 2,629,192 | 60,872 | 43.2 | crewAIInc/crewAI |
| ag2 | 215,889 | 5,063 | 42.6 | ag2ai/ag2 |
| llama-index | 1,936,132 | 52,893 | 36.6 | run-llama/llama_index |
| smolagents | 709,647 | 30,361 | 23.4 | huggingface/smolagents |
| autogen-agentchat | 425,456 | 61,809 | 6.9 | microsoft/autogen |

36,291,587 divided by 8,541 is 4,249.1. 38,256,992 divided by 9,204 is 4,156.6. 58,774,245 divided by 44,934 is 1,308.0. 156,867,095 divided by 149,473 is 1,049.5. 425,456 divided by 61,809 is 6.9.

Among repositories with at least 10,000 stars, LangGraph is the high end at 1,308.0 and AutoGen is the low end at 6.9. LangChain has more stars and more downloads than LangGraph, and a lower ratio, 1,049.5, because 149,473 is a large denominator under a large numerator. Raw downloads still put `langchain` first. Per star does not. Use the column that matches the decision.

PyPI's homepage for strands-agents 1.65.0, read at 05:21:13 GMT, is `github.com/strands-agents/harness-sdk`. claude-agent-sdk 0.2.182 points at `anthropics/claude-agent-sdk-python`. Those are the repositories in the star column. The [November 14 job picker](/research/which-ai-agent-framework-to-install-november-2026) assigns a job to eleven frameworks and leaves both of these SDKs out of that set. They stay in this table because the download file is where they show up.

## Which starred framework has the fewest installs per star?

AutoGen. 61,809 stars, 425,456 downloads, 6.9 per star.

The [November 5 report](/reports/ai-agent-framework-github-stats-november-2026) already had microsoft/autogen at 61,706 stars, retrieved at 2026-11-05T04:41:05Z. This morning's count is 103 stars higher. The low ratio is not a repository that got famous this week and has not had time to be installed. smolagents is the next quiet star row at 23.4, on 30,361 stars and 709,647 downloads. LlamaIndex has 52,893 stars and 36.6 downloads per star.

CrewAI is the star-versus-install comparison people already half know, and the ratio makes it sharp. crewAIInc/crewAI had 60,872 stars. langchain-ai/langgraph had 44,934. The gap is 15,938 stars. Downloads run the other way: 2,629,192 against 58,774,245. 58,774,245 divided by 2,629,192 is 22.35. Per star, LangGraph is at 1,308.0 and CrewAI is at 43.2. A star sort picks the crew. A file-request sort picks the graph. The job each one is for is the [November 14 picker](/research/which-ai-agent-framework-to-install-november-2026), not this ratio.

Agno sits with the starred-and-lighter group: 43,183 stars, 2,242,183 downloads, 51.9 per star. agno 3.2.0's Repository field is `github.com/agno-agi/agno`. AG2 is a different case. ag2ai/ag2 has only 5,063 stars, and `ag2` had 215,889 downloads, 42.6 per star. That is close to CrewAI's ratio on a repository one twelfth the size. Do not read 42.6 as "AG2 is as widely fetched as CrewAI." CrewAI's absolute count is 2,629,192. AG2's is 215,889.

## Do the npm packages tell the same story?

Mastra does, if you pair the package with its own repository. @mastra/core had 11,304,230 downloads and mastra-ai/mastra had 29,512 stars, 383.0 per star. That is a busy package on a repository people actually bookmark. It is an npm count. It is not a PyPI count, and it does not get added to LangGraph's 58,774,245.

| Package | Downloads | Stars | Per star | Repository the registry names |
| --- | --- | --- | --- | --- |
| @langchain/langgraph | 17,998,507 | 3,415 | 5,270.4 | langchain-ai/langgraphjs |
| @openai/agents | 8,816,468 | 4,016 | 2,195.3 | openai/openai-agents-js |
| @google/adk | 1,247,482 | 1,477 | 844.6 | google/adk-js |
| @mastra/core | 11,304,230 | 29,512 | 383.0 | mastra-ai/mastra |

The registry documents, read at 05:21:34 GMT and 05:21:35 GMT, are the pairing. @langchain/langgraph's repository field is `langchain-ai/langgraphjs`, latest 1.7.4. The Python repository langchain-ai/langgraph had 44,934 stars the same morning. 17,998,507 divided by 44,934 is 400.6. That second number uses the wrong repository. The JavaScript package looks "more installed per star" than Mastra because 3,415 is a small denominator, not because a star on langgraphjs means more than a star on Mastra.

The same warning applies to the two SDKs. @openai/agents at 2,195.3 uses openai/openai-agents-js, 4,016 stars. The Python package openai-agents, in the table above, is 625.2 on openai/openai-agents-python, 30,661 stars, and 19,169,518 downloads. They share a product name. They do not share a registry or a star count. @google/adk at 844.6 uses google/adk-js, 1,477 stars. google-adk on PyPI is 480.8 on google/adk-python, 22,209 stars.

## Which download counts are dependencies rather than a choice?

langchain-core, pydantic-ai-slim, and the agent-framework meta package. Count them once you know which file pip requested. Do not rank them as a second product on the parent repository's stars.

| Distribution | Downloads | What the metadata says | If you still divide by the parent stars |
| --- | --- | --- | --- |
| langchain-core | 158,421,619 | Repository is langchain-ai/langchain. langchain 1.5.0 requires it with no extra marker. langgraph 1.2.22 requires it too. | 1,059.9 on 149,473 stars |
| pydantic-ai-slim | 35,124,631 | pydantic-ai 2.68.0 requires pydantic-ai-slim==2.68.0 with the default extras and no extra marker. | 1,656.9 on 21,199 stars |
| agent-framework | 198,880 | Version 1.26.0 requires agent-framework-core[all]==1.26.0 with no extra marker. The source field names microsoft/agent-framework. | 13.6 on 14,668 stars |

158,421,619 minus 156,867,095 is 1,554,524. langchain-core was fetched more often than langchain. That fits a file that langgraph also requires, plus any install that asks for core alone. It does not mean core is a more popular framework than LangChain. The current core version at 05:21:13 GMT was 1.8.0, which is the floor of the pin on langchain 1.5.0.

35,124,631 divided by 6,888,240 is 5.10. The slim distribution was fetched about five times as often as the meta package that requires it. Some of that is the meta install. The rest is something else requesting slim, or a cache miss the meta package did not repeat. This note does not split those causes. It refuses to call 1,656.9 "Pydantic AI is the second most installed framework per star." The product row is pydantic-ai at 324.9. The slim row is the dependency.

agent-framework-core had 1,565,472 downloads, 7.87 times the meta package's 198,880. 1,565,472 divided by 198,880 is 7.87. The core row in the first table is the file machines fetched. The meta row is the shorter install line, and it is already inside core's requires. google-adk 2.14.1 lists langgraph only under the `all`, `extensions`, and `test` extras. A default ADK install does not, on that metadata, request langgraph. ADK's 10,678,997 is not an explanation of LangGraph's 58,774,245.

## What changed against the previous 30 days?

LlamaIndex's downloads fell. The OpenAI Agents SDK's rose. Stars in the ratio above are one morning, so this section is a download change, not a second per-star series.

The previous window is September 15 through October 14, 2026, taken from the same pypistats responses. It does not overlap October 15 through November 13.

| Package | Sep 15–Oct 14 | Oct 15–Nov 13 | Change |
| --- | --- | --- | --- |
| llama-index | 2,901,330 | 1,936,132 | −965,198 (−33.3%) |
| langchain | 166,525,399 | 156,867,095 | −9,658,304 (−5.8%) |
| langgraph | 48,693,012 | 58,774,245 | +10,081,233 (+20.7%) |
| openai-agents | 13,154,106 | 19,169,518 | +6,015,412 (+45.7%) |
| smolagents | 460,394 | 709,647 | +249,253 (+54.1%) |
| crewai | 2,546,852 | 2,629,192 | +82,340 (+3.2%) |
| autogen-agentchat | 388,530 | 425,456 | +36,926 (+9.5%) |

2,901,330 minus 1,936,132 is 965,198. 965,198 divided by 2,901,330 is 0.333, printed as 33.3 percent. The November 5 snapshot had run-llama/llama_index at 52,894 stars. This morning it had 52,893. The download drop is not a star spike in reverse. LlamaIndex's 36.6 downloads per star is a lighter install rate on a still-famous repository, and the latest 30 days are lighter than the 30 days before them.

openai-agents added 6,015,412 downloads, 45.7 percent. smolagents added 249,253, 54.1 percent, and still finished at 23.4 per star because 30,361 stars is a high base under 709,647 downloads. A fast growth rate on a small absolute count does not cross AutoGen's gap, and it does not catch LangGraph. LangGraph added 10,081,233 downloads, 20.7 percent. LangChain fell 9,658,304, 5.8 percent, and remained the largest Python total in the set.

CrewAI's download change was 82,340, 3.2 percent. AutoGen's was 36,926, 9.5 percent. Neither move rearranges the per-star order against LangGraph. The [November 13 install note](/blog/which-ai-agent-framework-do-people-install) used October 14 through November 12 and a star pull on November 13. Those totals will not match this table. The window is one day later on each end.

## What should you do with this if you are choosing a framework?

Read per star when a star sort is about to talk you into a quiet repository, and read the absolute count when a small repository posts a flashy ratio.

If the shortlist is "whatever has the most stars," AutoGen at 6.9 and CrewAI at 43.2 are the rows that should slow you down. LangGraph at 1,308.0, on 58,774,245 downloads, is the orchestration library in this set that people both bookmark and fetch. The Claude Agent SDK and Strands are the rows a star sort misses: under 10,000 stars, over 36 million downloads. Whether either one does the job you have is the [framework comparison](/best/ai-agent-frameworks) and the [November 14 picker](/research/which-ai-agent-framework-to-install-november-2026). This page does not award a licence, a checkpointer, or an MCP client.

If you are about to add langchain, langgraph, and langchain-core into one "LangChain installs" number, stop. Core's 158,421,619 already overlaps both. The same rule covers pydantic-ai and pydantic-ai-slim, and agent-framework and agent-framework-core. If you are about to add an npm total to a PyPI total because the product name matches, stop. The registries are different files.

The live series, which moves after this morning's pull, is the [downloads tracker](/trackers/downloads) and the [stars tracker](/trackers/stars). The dated star-and-release table remains the [November 2026 GitHub stats report](/reports/ai-agent-framework-github-stats-november-2026). A download is still a file request. CI and a transitive dependency are inside the number you just used to make the shortlist shorter.
