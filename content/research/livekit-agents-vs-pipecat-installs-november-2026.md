---
title: "LiveKit Agents Had 4,583,195 Downloads. Pipecat Had 2,007 More Stars."
description: "From October 10 through November 8, 2026, livekit-agents was downloaded 4,583,195 times on PyPI without mirrors. pipecat-ai had 1,468,981. At 07:38 UTC on November 10, pipecat-ai/pipecat had 17,168 stars and livekit/agents had 15,161."
date: "2026-11-10"
updated: "2026-11-10"
type: original-report
topics:
  - research
  - tools-saas
  - how-agents-work
contentLicense: true
absoluteTitle: true
codeUrl: "https://github.com/livekit/agents"
dataset:
  title: "PyPI and npm downloads for voice-agent frameworks, October 10 to November 8, 2026"
  description: "Sums of the pypistats overall endpoint, category without_mirrors, for livekit-agents, pipecat-ai, vocode, and bolna, from 2026-10-10 through 2026-11-08 inclusive. The largest 30-day total is livekit-agents at 4,583,195. A separate row records 2026-11-09, which is outside that window. GitHub stargazers_count was read November 10, 2026, with HTTP Date headers from 07:38:01 GMT to 07:39:15 GMT. npm point totals for @livekit/agents, the unscoped livekit-agents package, and three @pipecat-ai client packages use the same calendar window and were read at 07:41:28 GMT. A download is a file request, not a user."
  isBasedOn: "https://pypistats.org/api/packages/livekit-agents/overall?mirrors=false"
abstract: |
  livekit-agents was downloaded 4,583,195 times on PyPI from October 10 through November 8, 2026, in the without_mirrors series. pipecat-ai had 1,468,981 downloads in the same window. LiveKit’s total was 3.12 times Pipecat’s. vocode had 964. bolna had 11,509.

  Stars ran the other way. At 07:38 UTC on November 10, 2026, pipecat-ai/pipecat had 17,168 stars and livekit/agents had 15,161, a gap of 2,007. The Node package @livekit/agents, a separate registry, had 4,176,784 downloads over the same 30 days. Pipecat does not publish a Node agent framework under the names checked here. Its JavaScript client, @pipecat-ai/client-js, had 466,933 downloads.
whyItMatters: |
  The framework page that already earns impressions ranks libraries by stars and by a later install census. Neither table includes a voice-agent framework. Public LiveKit-versus-Pipecat comparisons round both download totals and both star totals, and they leave the Node package out. On this pass the Python star leader is Pipecat and the Python install leader is LiveKit, by 3,114,214 downloads. The Node package is almost as large as the Python one, and it sits on a repository with 961 stars.

  A star is a bookmark. A download is a file request, including CI and dependency installs. The same split showed up in the November 9 census, where CrewAI had more stars than LangGraph and far fewer downloads. Voice frameworks repeat it. Using the langchain total printed in that census, 155,918,257, the same dates and the same mirror filter, langchain was downloaded 34.02 times as often as livekit-agents. Voice is a smaller install base than the general agent SDK, and inside voice the install rank and the star rank disagree.
keyFindings:
  - "livekit-agents had 4,583,195 PyPI downloads without mirrors from October 10 through November 8, 2026. pipecat-ai had 1,468,981. The ratio is 3.12. The pypistats responses carried HTTP Date Tue, 10 Nov 2026 07:37:57 GMT. The newest day in the file was November 9, which is outside this window."
  - "On November 9 alone, livekit-agents had 203,073 downloads and pipecat-ai had 58,024, against 83,617 and 31,751 on November 8. The current PyPI releases were not uploaded that day. livekit-agents 1.8.11 was uploaded 2026-11-05T19:45:28Z. pipecat-ai 1.15.0 was uploaded 2026-10-29T05:50:38Z."
  - "pipecat-ai/pipecat had 17,168 stars at 07:38:01 GMT on November 10. livekit/agents had 15,161 at the same minute. bolna-ai/bolna had 821 at 07:38:02 GMT. vocodedev/vocode-core had 3,810 at 07:38:30 GMT, and its pushed_at was 2024-11-15T22:16:58Z."
  - "npm, same dates: @livekit/agents had 4,176,784 downloads. The unscoped name livekit-agents had 51. @pipecat-ai/client-js had 466,933, @pipecat-ai/client-react had 226,786, and @pipecat-ai/small-webrtc-transport had 157,925. Those three are client and transport packages. The responses were read at 07:41:28 GMT."
  - "vocode 0.1.113, the current PyPI release, was uploaded 2024-06-17T23:26:45Z. It had 964 downloads in the 30-day window. The package people still name as a voice SDK has not shipped a PyPI release since June 2024."
methodology: |
  The download source is pypistats, unauthenticated, endpoint https://pypistats.org/api/packages/{name}/overall?mirrors=false. Each 30-day total is the sum of daily rows whose category is without_mirrors and whose date is from 2026-10-10 through 2026-11-08 inclusive. The four responses carried HTTP Date Tue, 10 Nov 2026 07:37:57 GMT. The series in those files ran from 2026-04-08 through 2026-11-09. November 10 was not in the file. November 9 is reported as its own day and inside a second 30-day window, October 11 through November 9, and it is not inside the headline total.

  The set is four distributions, chosen before the sums were read. livekit-agents and pipecat-ai are the two frameworks public comparisons already pair, and their PyPI summaries call them a voice-agent framework and a voice-assistant framework. vocode’s summary is “The all-in-one voice SDK.” bolna’s repository description is “Conversational voice AI agents,” and it shipped a release on November 6, 2026. The PyPI name pipecat, without the -ai suffix, is a different project. Its summary is data logging for sensors, version 0.3.0. It is not in the table.

  Versions and upload times come from the PyPI JSON document for each distribution, HTTP Date Tue, 10 Nov 2026 07:38:17 GMT. Stars, forks, open issues, license SPDX ids, and pushed_at come from the GitHub repository API, Accept application/vnd.github+json, X-GitHub-Api-Version 2022-11-28. livekit/agents and pipecat-ai/pipecat were read at 07:38:01 GMT. bolna-ai/bolna was read at 07:38:02 GMT. vocodedev/vocode-python returned 301 to repositories/606164768, which is vocodedev/vocode-core, read at 07:38:30 GMT. livekit/agents-js was read at 07:39:15 GMT.

  npm figures are the downloads point API for 2026-10-10:2026-11-08. The five point responses were read at 07:41:28 GMT and each body named that start and end. Package versions for the JavaScript packages come from the npm registry at 07:38:38 GMT for @livekit/agents and at 07:41:29 GMT for the three @pipecat-ai packages. The langchain comparison uses the total already printed in this site’s November 9 install census. This note did not re-sum langchain.
limitations:
  - "The four Python distributions are a named set, not every package whose summary contains the word voice. A framework this pass did not query is absent. The Pipecat name without the -ai suffix was checked and excluded because it is a logging library."
  - "A download is a file request. CI, a mirror the filter still misses, and one project installing a dependency all increment it. livekit-agents 1.8.11 requires livekit==1.2.0 with no extra marker, so a cold install also requests the LiveKit realtime SDK. That SDK’s downloads are not in the 4,583,195."
  - "PyPI and npm are different registries. Adding 4,583,195 to 4,176,784 does not produce a user count. The same person, or the same CI job, can request both."
  - "@pipecat-ai/client-js, client-react, and small-webrtc-transport are not the Python agent loop. Their download totals are printed so Pipecat’s JavaScript surface is not reported as zero. They are not added to pipecat-ai’s 1,468,981."
  - "November 9 is higher than November 8 for both leading distributions, and neither current release was uploaded that day. This note does not explain the jump. The headline window ends November 8 so the jump cannot inflate it. A 30-day window that includes November 9 is in the body, and the rank does not change."
  - "Stars are an account’s bookmark. They are not unique people and not a quality rank. vocodedev/vocode-core has 3,810 stars and 964 downloads in this window. The star count is older interest. The download count is current installs of the package."
  - "open_issues_count includes pull requests. A zero would not mean a project has no bugs, and the counts here are not zeros. This note did not read the issue tracker."
  - "The langchain multiple, 34.02, divides a total published on November 9 by the livekit-agents total measured on November 10. Both windows are October 10 through November 8, and both use without_mirrors. The earlier total was not re-downloaded."
references:
  - title: "pypistats overall, mirrors=false, livekit-agents"
    url: "https://pypistats.org/api/packages/livekit-agents/overall?mirrors=false"
    note: "without_mirrors sum 4,583,195 for 2026-10-10 through 2026-11-08. November 9 was 203,073. HTTP Date Tue, 10 Nov 2026 07:37:57 GMT."
  - title: "pypistats overall, mirrors=false, pipecat-ai"
    url: "https://pypistats.org/api/packages/pipecat-ai/overall?mirrors=false"
    note: "1,468,981 in the same 30 days. November 9 was 58,024. Same HTTP Date."
  - title: "pypistats overall, mirrors=false, vocode and bolna"
    url: "https://pypistats.org/api/packages/vocode/overall?mirrors=false"
    note: "vocode 964. bolna 11,509. Same window and the same response minute."
  - title: "PyPI JSON, livekit-agents 1.8.11"
    url: "https://pypi.org/pypi/livekit-agents/json"
    note: "Uploaded 2026-11-05T19:45:28Z. Requires livekit==1.2.0. License Apache-2.0. Source github.com/livekit/agents. HTTP Date 07:38:17 GMT."
  - title: "PyPI JSON, pipecat-ai 1.15.0"
    url: "https://pypi.org/pypi/pipecat-ai/json"
    note: "Uploaded 2026-10-29T05:50:38Z. License BSD-2-Clause. Source github.com/pipecat-ai/pipecat. livekit is an extra, not a core dependency."
  - title: "PyPI JSON, vocode 0.1.113 and bolna 0.11.32"
    url: "https://pypi.org/pypi/vocode/json"
    note: "vocode uploaded 2024-06-17T23:26:45Z. bolna uploaded 2026-11-06T12:37:57Z. bolna’s PyPI license field was a copyright notice, not an SPDX id."
  - title: "GitHub REST API, livekit/agents and pipecat-ai/pipecat"
    url: "https://api.github.com/repos/livekit/agents"
    note: "15,161 and 17,168 stars. HTTP Date Tue, 10 Nov 2026 07:38:01 GMT."
  - title: "GitHub REST API, bolna-ai/bolna, vocodedev/vocode-core, livekit/agents-js"
    url: "https://api.github.com/repos/bolna-ai/bolna"
    note: "821 stars at 07:38:02 GMT. vocode-core 3,810 at 07:38:30 GMT. agents-js 961 at 07:39:15 GMT."
  - title: "npm downloads point API, 2026-10-10:2026-11-08"
    url: "https://api.npmjs.org/downloads/point/2026-10-10:2026-11-08/@livekit/agents"
    note: "@livekit/agents 4,176,784. livekit-agents 51. @pipecat-ai/client-js 466,933. client-react 226,786. small-webrtc-transport 157,925. HTTP Date 07:41:28 GMT."
  - title: "AI Agents Info, which framework people install, November 9, 2026"
    url: "https://www.aiagentsinfo.com/blog/which-ai-agent-framework-do-people-install"
    note: "langchain 155,918,257 PyPI downloads, same dates, without_mirrors. CrewAI had more stars than LangGraph and fewer downloads."
citation:
  apa: "AI Agents Info. (2026, November 10). LiveKit Agents had 4,583,195 downloads. Pipecat had 2,007 more stars. https://www.aiagentsinfo.com/research/livekit-agents-vs-pipecat-installs-november-2026"
  bibtex: |
    @misc{aiagentsinfo2026voiceFrameworkInstalls,
      title={LiveKit Agents Had 4,583,195 Downloads. Pipecat Had 2,007 More Stars},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/livekit-agents-vs-pipecat-installs-november-2026},
      note={PyPI without_mirrors, 2026-10-10 through 2026-11-08. GitHub stars at 2026-11-10T07:38:01Z}
    }
ledeQuestion: "Which open-source voice agent framework do people install?"
ledeAnswer: "livekit-agents, by PyPI file downloads, in this set and this window. 4,583,195 downloads from October 10 through November 8, 2026, without mirrors. pipecat-ai had 1,468,981. Pipecat had more stars the next morning: 17,168 against 15,161."
faq:
  - question: "Which voice agent framework has more installs, LiveKit or Pipecat?"
    answer: "LiveKit Agents, on PyPI, for October 10 through November 8, 2026. livekit-agents had 4,583,195 downloads without mirrors. pipecat-ai had 1,468,981, which is 3.12 times smaller. The npm package @livekit/agents had 4,176,784 downloads over the same dates. Pipecat’s JavaScript packages checked here are clients, and the largest had 466,933."
  - question: "Which one has more GitHub stars?"
    answer: "Pipecat. pipecat-ai/pipecat had 17,168 stars at 07:38:01 UTC on November 10, 2026. livekit/agents had 15,161. The gap is 2,007. The Node repository livekit/agents-js had 961 stars at 07:39:15 UTC, under the package that was downloaded 4,176,784 times."
  - question: "Is a PyPI download a developer?"
    answer: "No. The figure counts package-file downloads in the without_mirrors series. CI jobs and dependency installs count. livekit-agents 1.8.11 also requires the livekit SDK, and that second distribution is not inside the 4,583,195. Do not add the npm total to the PyPI total."
  - question: "Is Vocode still shipping?"
    answer: "Not on PyPI. vocode 0.1.113 was uploaded on June 17, 2024, and it had 964 downloads from October 10 through November 8, 2026. The GitHub repository vocodedev/vocode-core had 3,810 stars and a pushed_at of November 15, 2024. Stars from 2024 are not a current install count."
  - question: "Did November 9 change the rank?"
    answer: "No. November 9 was 203,073 for livekit-agents and 58,024 for pipecat-ai, both above the previous day, and neither current release was uploaded that day. A 30-day window that includes November 9 is 4,707,974 against 1,503,296, still 3.13 times. The headline total stops on November 8."
---

**4,583,195.** That is how many times the PyPI distribution `livekit-agents` was downloaded from October 10 through November 8, 2026, in the `without_mirrors` series.

`pipecat-ai` had **1,468,981** downloads in the same window. LiveKit’s count is 3.12 times Pipecat’s, a gap of 3,114,214 file requests. The star count the next morning points the other way. [pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat) had 17,168 stars. [livekit/agents](https://github.com/livekit/agents) had 15,161.

The [November 9 install census](/blog/which-ai-agent-framework-do-people-install) answers this question for the general agent SDKs. LangChain led that table. Voice frameworks were not in it. The [November 5 star snapshot](/reports/ai-agent-framework-github-stats-november-2026) did not include them either. This note is that missing row, read again on November 10. Daily refresh of the broader set lives on the [downloads tracker](/trackers/downloads) and the [stars tracker](/trackers/stars).

## LiveKit had the installs. Pipecat had the stars.

The window is 30 calendar days, October 10 through November 8, inclusive. Each total is the sum of daily `without_mirrors` rows from pypistats. The responses carried HTTP Date Tue, 10 Nov 2026 07:37:57 GMT. Stars are `stargazers_count` from the repository object.

| Distribution | Oct 10–Nov 8 | Nov 2–Nov 8 | Nov 8 | Nov 9 | PyPI version | Uploaded | Stars | Repository |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| livekit-agents | 4,583,195 | 1,252,048 | 83,617 | 203,073 | 1.8.11 | 2026-11-05 | 15,161 | livekit/agents |
| pipecat-ai | 1,468,981 | 369,032 | 31,751 | 58,024 | 1.15.0 | 2026-10-29 | 17,168 | pipecat-ai/pipecat |
| bolna | 11,509 | 2,308 | 95 | 202 | 0.11.32 | 2026-11-06 | 821 | bolna-ai/bolna |
| vocode | 964 | 220 | 61 | 48 | 0.1.113 | 2024-06-17 | 3,810 | vocodedev/vocode-core |

November 9 is in the table and outside the 30-day total. The week column is November 2 through November 8, the last seven days before that jump. In that week LiveKit was 3.39 times Pipecat: 1,252,048 against 369,032.

A second 30-day window, October 11 through November 9, puts the jump inside the total. LiveKit moves to 4,707,974. Pipecat moves to 1,503,296. The ratio is 3.13. vocode moves to 975. bolna moves to 11,211. The rank is unchanged.

PyPI summaries, read at 07:38:17 GMT: livekit-agents is “A powerful framework for building realtime voice AI agents.” pipecat-ai is “An open source framework for voice (and multimodal) assistants.” vocode is “The all-in-one voice SDK.” bolna’s summary field was empty. The GitHub description on bolna-ai/bolna is “Conversational voice AI agents.”

## The Node package is a second framework, on 961 stars.

`@livekit/agents` is not a types package. The registry document at 07:38:38 GMT calls it “LiveKit Agents - Node.js,” version 1.9.5, published 2026-10-28T17:52:06Z, license Apache-2.0. Its repository is [livekit/agents-js](https://github.com/livekit/agents-js), which had **961** stars, 425 forks, and 538 open issues at 07:39:15 GMT. `pushed_at` was 2026-11-10T06:32:04Z.

| npm package | Oct 10–Nov 8 | Version | What the registry says | Repository stars |
| --- | --- | --- | --- | --- |
| @livekit/agents | 4,176,784 | 1.9.5 | LiveKit Agents - Node.js | 961 |
| livekit-agents | 51 | unscoped name | Not the Node framework | not paired |
| @pipecat-ai/client-js | 466,933 | 1.16.0 | JavaScript client | not paired |
| @pipecat-ai/client-react | 226,786 | 1.11.0 | React client | not paired |
| @pipecat-ai/small-webrtc-transport | 157,925 | 1.11.2 | Pipecat Small WebRTC Transport Package | not paired |

The version numbers do not line up across languages, and they should not be sorted as if they did. Python is on 1.8.11, uploaded November 5. Node is on 1.9.5, published October 28. They are two release trains in one product family.

`@livekit/agents` at 4,176,784 is 91.1 percent of the Python distribution’s 4,583,195. That is a second large install base. The unscoped npm name `livekit-agents` had 51 downloads. 4,176,784 divided by 51 is 81,897.7.

Pipecat’s registry names checked here returned 404 for `pipecat-ai` and `@pipecat-ai/pipecat`. The packages that do exist are a browser client, a React client, and a transport. `@pipecat-ai/client-js` at 466,933 is the largest of the three. `@livekit/agents` was downloaded 8.94 times as often. The client’s version 1.16.0 was published 2026-10-29T05:02:43Z, the same morning as pipecat-ai 1.15.0 on PyPI. Same release window. Different job: a client the browser loads, not the agent loop a server runs.

The three Pipecat npm totals sum to 851,644. That sum mixes a client, a React binding, and a transport, so it is not one install. It is printed here as arithmetic, not as a framework rank.

## Vocode’s last release is June 17, 2024.

vocode 0.1.113 was uploaded 2024-06-17T23:26:45Z. The PyPI homepage still points at `vocodedev/vocode-python`. That API path returned 301 to `vocodedev/vocode-core`. The repository had 3,810 stars, 655 forks, 2 open issues, the MIT license, and `pushed_at` 2024-11-15T22:16:58Z. The archive flag was false. `pushed_at` is November 15, 2024.

964 downloads in 30 days is a real number. It is 0.021 percent of livekit-agents. 964 / 4,583,195 is 0.000210. A recommendation that still lists Vocode beside LiveKit and Pipecat is listing a package whose current release predates the other two versions in this table by more than two years. Bolna is the opposite shape: version 0.11.32 uploaded November 6, 2026, MIT on the GitHub license object, 821 stars, and 11,509 downloads. A fresh release, a small install base.

## What an install count is for

It answers which distribution pip and npm fetched. Quality, latency, and a pass at your own tasks are separate questions.

`livekit-agents` 1.8.11 requires `livekit==1.2.0` with no extra marker, plus `livekit-api`, `livekit-protocol`, `livekit-blingfire`, and `livekit-local-inference`. A cold install requests those files too. The 4,583,195 counts only the framework distribution. `pipecat-ai` 1.15.0 pulls LiveKit only under the `livekit` extra. A default Pipecat install does not request it.

The same dates in the general-framework census put `langchain` at 155,918,257 downloads. That is 34.02 times livekit-agents. Voice frameworks are not the install volume of a general agent SDK, even when the voice package is the leader in its own set. CrewAI’s position in that census is the precedent for the star inversion: more stars, fewer downloads. Pipecat is that case again, by 2,007 stars and by 3.12 times fewer PyPI downloads.

Hosted voice products bill a minute or a campaign, which this count does not. ElevenLabs’ outbound runner is [ElevenAgents Campaign Manager](/blog/what-is-elevenagents-campaign-manager). The directory row is [ElevenLabs](/directory/elevenlabs). How the loop around a voice model still has to stop is [How do AI agents work?](/blog/how-do-ai-agents-work).

