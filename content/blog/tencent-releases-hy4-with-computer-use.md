---
title: "Tencent releases Hy4 with image understanding and computer use"
description: "On November 4, 2026, Tencent released Hy4, a model that can read images and operate a computer. The API is live. The weights are still scheduled."
takeaways:
  - "On November 4, 2026, Tencent released Hy4 and said it is the first Hy model that can read images and operate a computer."
  - "The API is on Tencent Cloud TokenHub as hy4 and on OpenRouter as tencent/hy4."
  - "Tencent says the weights and a system card are still scheduled for the coming days."
date: "2026-11-05"
updated: "2026-11-05"
category: news
topics:
  - news
  - harnesses
  - how-agents-work
  - task-performance
  - tools-saas
audience:
  - everyone
  - builders
companies:
  - tencent
  - openrouter
byline: "AI Agents Info Editorial"
sources:
  - title: "Tencent, Tencent launches Hy4 (November 4, 2026)"
    url: "https://www.tencent.com/tencent-launches-hy4-joining-the-ranks-of-the-worlds-leading-open-source-ai-models/"
  - title: "Tencent Cloud TokenHub, model list (updated November 4, 2026, 12:13:30)"
    url: "https://cloud.tencent.com/document/product/1823/130051"
  - title: "Tencent Cloud TokenHub, model prices (updated November 4, 2026, 12:13:30)"
    url: "https://cloud.tencent.com/document/product/1823/130055"
  - title: "OpenRouter, Tencent Hy4 model page (checked November 5, 2026)"
    url: "https://openrouter.ai/tencent/hy4"
  - title: "Tencent Hy, Hyra 2.0: The Next Step for Auto Research (November 1, 2026)"
    url: "https://hy.tencent.ai/research/hyra2"
  - title: "Tencent Hunyuan, Hyra-results README (HyCell note dated November 2, 2026)"
    url: "https://github.com/Tencent-Hunyuan/Hyra-results/blob/main/README.md"
faq:
  - question: "What is Tencent Hy4?"
    answer: "Hy4 is Tencent’s newest Hy language model, released on November 4, 2026. Tencent says it is the first Hy model with visual understanding and computer use. TokenHub lists the API model id as hy4, with a 1M context window, image understanding, function calling, and retained thinking. Tencent says the weights and a system card are still planned for the coming days."
  - question: "Can Hy4 use a computer?"
    answer: "Tencent’s November 4 announcement says Hy4 can interact with command-line interfaces and graphical user interfaces, and that it was trained on software such as Blender and CAD. TokenHub’s model list, updated the same day, does not use the words computer use. It does list function calling, which is how an API caller asks a model to invoke a tool."
  - question: "How much does Hy4 cost?"
    answer: "TokenHub’s price page, updated November 4, 2026 at 12:13:30, lists Hy4 at 6 yuan per million input tokens, 18 yuan per million output tokens, and 0.3 yuan per million cache-hit tokens. The same page says usage is billed at 50 percent of that catalog price through 23:59:59 Beijing time on December 31, 2026. Tencent’s English announcement approximates the catalog at US$0.90, US$2.70, and US$0.045 per million tokens."
  - question: "Are the Hy4 weights public?"
    answer: "Tencent’s November 4 announcement says the weights and system cards will be released in the coming days. On November 5, 2026, the public record checked for this article was the API listing, not a weight download. A smaller model named HyCell, which Tencent ties to the same research harness, has a weights-and-code note in the Hyra-results repository dated November 2, 2026."
  - question: "What is the Hyra 2.0 harness?"
    answer: "Hyra 2.0 is Tencent’s research agent harness, described in a November 1, 2026 post. It splits work among an Overall coordinator, Mission leads, and Workers, keeps a task queue and a research board, and requires evidence when a worker says a job is done. The November 4 Hy4 announcement says that harness, with Hy4, optimized pre-training infrastructure for smaller models of the same architecture."
  - question: "How is Hy4 different from Hy4 Preview on TokenHub?"
    answer: "On the TokenHub model list updated November 4, 2026, both rows list a 1M context window, retained thinking, structured output, function calling, and a cache. Hy4 adds image understanding. The catalog price on the price page is the same for both: 6 yuan, 18 yuan, and 0.3 yuan per million input, output, and cache-hit tokens. The 50 percent discount note on that page names Hy4."
---

On November 4, 2026, Tencent released Hy4, the next Hy [language model](/glossary/llm). Tencent says this is the first Hy model that can read images and operate a computer, both through a command line and through a graphical screen. The API is already on Tencent Cloud TokenHub, under the model id `hy4`, and on [OpenRouter](https://openrouter.ai/tencent/hy4) as `tencent/hy4`. Tencent says the weights and a system card are still scheduled for the coming days. The same announcement says Hy4, inside the Hyra 2.0 [agent harness](/glossary/harness), changed the pre-training setup for smaller models that share its architecture.

## What did Tencent release on November 4?

The English announcement is on [Tencent’s site](https://www.tencent.com/tencent-launches-hy4-joining-the-ranks-of-the-worlds-leading-open-source-ai-models/), dated November 4, 2026. It calls Hy4 the latest Hy model and says it “introduces visual understanding capabilities for the first time,” along with gains in instruction following, long-context reading, and long-horizon agent tasks.

The computer-use sentence is specific. Tencent writes that Hy4 “introduces computer-use capabilities for the first time, enabling it to interact with both command-line interfaces and graphical user interfaces.” The same paragraph says the model had specialized training on professional software such as Blender and CAD, for planning and carrying out long tasks.

Two clocks matter. The API listing is the part a caller can use now. The weights are the part Tencent still places “in the coming days,” together with system cards. The announcement also describes Hy4 as an open-source model. Until those files are public, the sourced release is the hosted model, the product integrations, and the price list.

TokenHub’s [model list](https://cloud.tencent.com/document/product/1823/130051), updated November 4, 2026 at 12:13:30, is the API spec that matches the launch day. The Hy4 row lists retained thinking, structured output, function calling, a cache, and image understanding. The context window is written as 1M tokens, with a maximum input of 960k and a maximum output of 64k. OpenRouter’s page, checked November 5, writes the same window as 1,048,576 tokens and the completion cap as 65,536 tokens. Those figures line up if the “k” on TokenHub means 1,024: 960 × 1,024 + 64 × 1,024 = 1,048,576.

The Hy4 Preview row on the same TokenHub page has the same window and the same thinking, output, tool, and cache labels. It does not list image understanding.

## Where is Hy4 available, and what does a call cost?

Tencent says Hy4 is available on Tencent Cloud TokenHub, WorkBuddy, CodeBuddy, Yuanbao, WeCom’s AI assistant Dayuan, and ima. It says the API is being made available through OpenRouter, Hermes, and OpenCode. This article confirmed the OpenRouter listing on November 5. It does not have a separate check that Hermes and OpenCode were serving Hy4 that morning. Tencent also says integration work is underway for QQ, Honor of Kings, Game of Peace, WeRead, and Tencent News. That sentence describes work in progress.

WorkBuddy and CodeBuddy are free from November 4 through November 15, 2026, according to the announcement. The post does not attach a time zone to those two dates.

The catalog price is on TokenHub’s [price page](https://cloud.tencent.com/document/product/1823/130055), also updated November 4, 2026 at 12:13:30. In the post-paid language-model tables, Hy4 and Hy4 Preview are both listed at 6 yuan per million input tokens, 18 yuan per million output tokens, and 0.3 yuan per million cache-hit tokens. A note at the top of the online-inference section says Hy4 usage is billed at 50 percent of the catalog price through 23:59:59 Beijing time on December 31, 2026, and that the catalog price returns after that. Half of those catalog rates is 3 yuan, 9 yuan, and 0.15 yuan. The batch-task table on the same page lists Hy4 Preview and does not list Hy4.

Tencent’s English announcement approximates that catalog as US$0.90 per million input tokens, US$2.70 per million output tokens, and US$0.045 per million cached input tokens, and says Hy4 keeps the Hy4 Preview price. OpenRouter’s Hy4 page, checked November 5, shows Tencent Cloud list rates of $0.834, $2.501, and $0.042 per million input, output, and cache-read tokens, with a displayed 50 percent discount at $0.417, $1.251, and $0.021. Those dollar figures sit near Tencent’s approximation. They are the rates on each page, and this article does not convert yuan into dollars on its own.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Source, checked November 5, 2026</th>
<th>Input</th>
<th>Output</th>
<th>Cache</th>
</tr>
</thead>
<tbody>
<tr>
<td>TokenHub catalog, per million tokens</td>
<td>6 yuan</td>
<td>18 yuan</td>
<td>0.3 yuan, cache hit</td>
</tr>
<tr>
<td>TokenHub bill through December 31, 2026, 23:59:59 Beijing time</td>
<td>50 percent of catalog</td>
<td>50 percent of catalog</td>
<td>50 percent of catalog</td>
</tr>
<tr>
<td>Tencent’s English announcement, approximate catalog</td>
<td>US$0.90</td>
<td>US$2.70</td>
<td>US$0.045, cached input</td>
</tr>
<tr>
<td>OpenRouter, Tencent Cloud list, then the 50 percent rate shown on the page</td>
<td>$0.834, then $0.417</td>
<td>$2.501, then $1.251</td>
<td>$0.042, then $0.021, cache read</td>
</tr>
</tbody>
</table>
</div>

OpenRouter also says Hy4 accepts text and images and returns text, and that requests can pass `tools`, `tool_choice`, and a JSON schema in `response_format`. That matches the function-calling and structured-output labels on TokenHub.

## What can Hy4 do that the preview row does not list?

The announcement and the API table answer different questions. The table is the contract for a TokenHub call. The announcement is Tencent’s account of what the model was trained to do.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Capability</th>
<th>Hy4 on TokenHub</th>
<th>Hy4 Preview on TokenHub</th>
<th>Where Tencent describes it</th>
</tr>
</thead>
<tbody>
<tr>
<td>Context window</td>
<td>1M, with 960k input and 64k output</td>
<td>The same limits</td>
<td>TokenHub model list, November 4, 2026</td>
</tr>
<tr>
<td>Image understanding</td>
<td>Listed</td>
<td>Absent from the row</td>
<td>TokenHub, and the announcement’s “first time” sentence for visual understanding</td>
</tr>
<tr>
<td>Function calling</td>
<td>Listed</td>
<td>Listed</td>
<td>TokenHub. See <a href="/glossary/tool-use">tool use</a>.</td>
</tr>
<tr>
<td>Retained thinking</td>
<td>Listed, as 深度思考（保留式思考）</td>
<td>Listed</td>
<td>TokenHub’s label. The thinking from a step stays available.</td>
</tr>
<tr>
<td>Computer use</td>
<td>Named in the November 4 announcement</td>
<td>The announcement assigns this training claim to Hy4</td>
<td>Command line and graphical interface, with Blender and CAD named as training software. TokenHub’s rows use the function-calling label instead.</td>
</tr>
</tbody>
</table>
</div>

A [context window](/glossary/context-window) is how much text the model can see on one call. A million tokens is a large window. It still fills up on a long computer-use run, because screenshots and command output are text and images the harness has to carry. What happens then is a harness decision: summarize, drop, or retrieve.

Computer use, in the announcement, means the model can be pointed at software and asked to act. On this site that is an [agent](/glossary/agent): a model plus the software that offers tools, runs the chosen step, and brings the result back. Function calling is the API shape of that offer. The TokenHub row documents function calling. The announcement documents the computer-use training. A caller still has to supply the tools, the permissions, and the stop rule. Those pieces are the harness, which the next section covers for the research system Tencent named.

The announcement also describes office and finance workflows inside WorkBuddy and WeCom: chats, mail, documents, calendars, and meetings, with the model tracking tasks and deadlines across projects. It says a team feature called Projects is still an upcoming WorkBuddy release. Treat that paragraph as a product plan attached to the model launch.

## What is the Hyra 2.0 harness, and what does Hy4 have to do with it?

[Harness engineering](/glossary/harness-engineering) is the work of designing the software around a model: the loop, the tools, the memory, the permissions, and the rule for when to stop. The longer guide is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness). Hyra is Tencent’s name for a research harness aimed at science and at the tools scientists reuse.

Hyra 2.0’s own post is dated November 1, 2026, four days before the Hy4 announcement. It is the design document. The November 4 news is that Tencent now says Hy4 ran inside that harness and “optimized the pre-training infrastructure for smaller models sharing the same architecture.” Tencent calls that step part of recursive self-improvement. This page has Tencent’s sentences for it, and no separate audit of the training runs.

The November 1 post describes a harness built for jobs that last days, with several projects at once. It uses three roles:

- Overall talks with human researchers, sets priorities, and handles resources and key decisions.
- A Mission owns one research problem over time: direction, experiments, and the conclusion.
- Workers read code, run experiments, look at failures, and can challenge the Mission. Different workers can use different models.

A scheduler pulls work from a persistent queue. An agent can set a time to wake up when a training run finishes. A Research Board stores ideas, results, evidence, and decisions. The post says operations that spend substantial compute, or that sync shared knowledge, need human approval, and that already authorized work can continue. That approval gate is a [guardrail](/glossary/guardrail). How far the loop runs before a person is asked is [autonomy](/glossary/autonomy). Who holds the next step is [orchestration](/glossary/orchestration).

When a worker reports that it is done, the post says it has to attach evidence: code versions, results, logs, or execution traces. For an independent check, Hyra can start a new review worker and hand it the original problem and the evidence first, so the review is less anchored to the first worker’s conclusion. That is a stop rule with a record, which is the part of a harness that keeps a long run from declaring victory on a summary alone.

The November 4 announcement also says the team has open-sourced two scientific models developed with Hy4 and Hyra 2.0: HyCell, for single-cell representations, and HyPDE, for physics fields. The [Hyra-results repository](https://github.com/Tencent-Hunyuan/Hyra-results/blob/main/README.md) has a November 2, 2026 note for HyCell. That note describes a 16.1-million-parameter model that maps a human cell’s raw counts to a 512-dimensional embedding, with weights and code in the repository. It reports an overall score of 0.735 on seven atlases held out from pretraining, next to a score of 0.736 for a model it calls Stack, at 218 million parameters. Those scores are the repository’s. The README checked on November 5 documents HyCell and does not contain a HyPDE entry. HyPDE remains a name in the November 4 announcement.

## What scores did Tencent report?

The numbers below are Tencent’s, from the November 4 announcement. They are useful because they name the test and the comparison. They are a weak substitute for a public scorecard, because the weights are still unreleased and several of the tests are internal.

In a blind evaluation Tencent says it ran with Tencent Financial Technology, 213 financial professionals scored the models, including 153 experts from leading external institutions. Tencent says approximately 70 percent had more than five years of industry experience. Across 579 real-world financial tasks, Tencent reports these overall scores:

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Model, in Tencent’s financial evaluation</th>
<th>Score</th>
</tr>
</thead>
<tbody>
<tr>
<td>Hy4</td>
<td>3.04</td>
</tr>
<tr>
<td>DeepSeek-V4.1-Flash-1017</td>
<td>2.97</td>
</tr>
<tr>
<td>Kimi K3.1 Pro</td>
<td>2.68</td>
</tr>
<tr>
<td>GLM-5.3</td>
<td>2.68</td>
</tr>
</tbody>
</table>
</div>

The announcement does not publish the rubric, the scale, or the harness each comparison model used. A [benchmark](/glossary/benchmark) on this site is a named test with a date. This table is that kind of citation: Tencent’s scores, on Tencent’s tasks, published November 4, 2026.

Tencent also says an internal check cut Hy4’s hallucination rate from 12.95 percent on Hy4 Preview to 7.2 percent, and cut errors from unsupported assumptions from 23.1 percent to 5.6 percent. It says Hy4 gained 12.03 percentage points over Hy4 Preview on an Investment Research Agent Benchmark run by the financial AI company Rabyte. On WorkBuddy, Tencent reports an average score of 83.18, a pass rate of 96.15 percent, and first place in nine of twelve scenarios in mainland China. The announcement does not define those twelve scenarios.

On TenureTrail, which Tencent describes as 123 executable tasks across seven disciplines, the announcement says Hy4 showed strong results in mathematical construction, physical modeling, environmental and earth sciences, systems engineering, and socio-economic decision-making. It does not print a comparison table for that test.

## What did Tencent say about safety, and when do the weights arrive?

The announcement separates two safety reviews, both internal.

On cybersecurity, Tencent says Hy4’s training favored defensive work, including proof-of-concept development and fixing vulnerabilities, and that offensive exploitation material was left out of the training set. It says experts from Tencent’s Xuanwu Lab and Keen Security Lab reviewed cryptographic reverse engineering, binary deobfuscation, and vulnerability exploitation, and found no significant concerns about offensive cybersecurity capability in the areas they evaluated. That is the company’s assessment of its own model.

On biology, Tencent says internal expert review found strong foundational knowledge and more limited skill at open-ended experimental design than frontier models. The announcement does not publish the review protocol.

The weight release is the other open item. Tencent says the weights and system cards come in the coming days, with attention to cybersecurity and biological safety. Until that drop, a reader can call the hosted model and can read the Hyra 2.0 design, and cannot download Hy4 itself from a public weight file cited in these sources.

One heading in the English announcement says “Hy4 Flash Recently Released.” The paragraph under it says Hy4 Flash “is scheduled for release soon.” The TokenHub model list and price page updated the same day have rows for Hy4 and Hy4 Preview, and no row named Hy4 Flash. The sourced claim for a model a person can call on November 5 is Hy4.

## What does the launch change for someone building an agent?

The practical change on November 4 is a new hosted model with image input, tool calling, a million-token window, and a published price, including a 50 percent TokenHub discount through the end of 2026. Computer use, as Tencent describes it, is a training claim about command lines and graphical software. Putting that model to work still means choosing the tools, the sandbox, and the approval rule. That surrounding system is the harness, whether the product is WorkBuddy or a research queue like Hyra.

Hyra 2.0 is a concrete example of the long-job pattern this site already tracks: a queue, a written record, a human gate on expensive steps, and a second pass that sees the evidence before it sees the first agent’s conclusion. The [harness comparison](/trackers/harnesses) stays empty until every cell has its own source. Hyra’s November 1 post is one sourced description. It is a research harness for science and model training, which is a different job from a coding product that edits a repository. DeepSeek’s own harness, including the November 4 pre-release, is covered in the [harness guide](/blog/what-is-an-ai-agent-harness#what-is-deepseek-harness-and-how-is-it-different), updated November 5, 2026. That guide also summarizes the Harmony Harness paper.

For the plain-language map of those parts, start with [how agents work](/topics/how-agents-work) and the [harnesses](/topics/harnesses) topic. Builders who want the vendor docs for other harnesses can use the [agent frameworks](/directory/category/agent-frameworks) shelf and the [Builders](/for/builders) page. This launch is one item on the [daily news](/topics/news) beat. Task-shaped follow-ups, including computer use and office work, sit under [task performance](/topics/task-performance).

## Frequently asked questions

### What is Tencent Hy4?

Hy4 is Tencent’s newest Hy model, released on November 4, 2026. Tencent says it is the first in that line with visual understanding and computer use. TokenHub lists it as `hy4`, with image understanding, function calling, retained thinking, and a 1M context window. The weights are still described as a coming release.

### Can Hy4 use a computer?

Tencent’s announcement says it can interact with a command line and a graphical interface, and names Blender and CAD as software it was trained on. TokenHub’s November 4 model list does not label a computer-use mode. It does list function calling, which is the API hook for [tool use](/glossary/tool-use).

### How much does Hy4 cost?

TokenHub’s November 4 price page lists 6 yuan per million input tokens, 18 yuan per million output tokens, and 0.3 yuan per million cache-hit tokens. Usage is billed at 50 percent of that catalog through 23:59:59 Beijing time on December 31, 2026. Tencent’s English post approximates the catalog at US$0.90, US$2.70, and US$0.045.

### Are the Hy4 weights public?

The November 4 announcement schedules the weights and system cards for the coming days. The public artifact checked on November 5 is the API. HyCell, a 16.1-million-parameter model the announcement links to Hy4 and Hyra 2.0, has a weights-and-code note in the Hyra-results repository dated November 2.

### What is the Hyra 2.0 harness?

It is Tencent’s research [harness](/glossary/harness), described on November 1, 2026. An Overall role sets priorities with people, Missions own research problems, and Workers run experiments. Expensive compute needs approval, and a finished worker has to attach evidence. The November 4 post says Hy4 used that harness to optimize pre-training infrastructure for smaller models of the same architecture.

### How is Hy4 different from Hy4 Preview on TokenHub?

Both rows list the same 1M window, retained thinking, structured output, function calling, and cache. Hy4 adds image understanding. The catalog price on the price page is the same for both. The 50 percent discount note names Hy4.
