---
title: "What Is Muse Ember?"
absoluteTitle: true
description: "Muse Ember, released November 9, 2026, is Meta’s model for repeated agent steps. muse-ember-1.0 is $0.10 and $0.50 per million tokens up to 200,000 input tokens, and it scores 36 on the Artificial Analysis Intelligence Index, tying Claude Haiku 5.5."
takeaways:
  - "Meta released Muse Ember on November 9, 2026. The model id is muse-ember-1.0. The model page, read November 10, prices prompts up to 200,000 input tokens at $0.10 input, $0.004 cached input, and $0.50 output per million tokens. Above that line the rates are $0.30, $0.012, and $1.50."
  - "The same day’s research post scores Muse Ember (max) at 36 on the Artificial Analysis Intelligence Index, the same rounded score as Claude Haiku 5.5 (max). GPT-6 Luna (max) scores 28. On FrontierCode 2.0-AA, Haiku leads at 34.9% and Ember scores 27.2%."
  - "Meta’s docs tell you to keep Muse Wonder or Muse Spark on the planning loop and hand bounded subtasks to Muse Ember. A cookbook migration in that post used 158 million Ember input tokens and 4.4 million Wonder input tokens, at about $3.96."
date: "2026-11-10"
updated: "2026-11-10"
category: guide
topics:
  - news
  - harnesses
  - task-performance
  - how-agents-work
  - tools-saas
audience:
  - everyone
  - builders
companies:
  - meta
  - anthropic
  - claude
  - openai
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Muse Ember agent scores and token rates, transcribed November 10, 2026"
  description: "Scores at max reasoning and the two token-price tiers, copied from Meta’s November 9, 2026 research post and the Muse Ember model page. Rival sticker rates are from Anthropic’s pricing page and OpenAI’s GPT-6 Luna model page, both read November 10, 2026. AI Agents Info did not rerun the evaluations."
  isBasedOn: "https://research.meta.ai/blog/muse-ember"
sources:
  - title: "Meta AI Research, Introducing Muse Ember (November 9, 2026; read November 10, 2026)"
    url: "https://research.meta.ai/blog/muse-ember"
  - title: "Meta, Muse Ember model page (read November 10, 2026)"
    url: "https://dev.meta.ai/models/muse-ember"
  - title: "Meta Model API, Muse Ember docs (read November 10, 2026)"
    url: "https://dev.meta.ai/docs/muse-ember"
  - title: "Meta, Start building with Muse Ember (read November 10, 2026)"
    url: "https://dev.meta.ai/resources/blog/build-with-muse-ember"
  - title: "Anthropic, Claude API pricing (read November 10, 2026)"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
  - title: "OpenAI, GPT-6 Luna model page (read November 10, 2026)"
    url: "https://developers.openai.com/api/docs/models/gpt-6-luna"
  - title: "Muse Ember in the AI Agents Info directory"
    url: "https://www.aiagentsinfo.com/directory/muse-ember"
faq:
  - question: "What is Muse Ember?"
    answer: "Muse Ember is Meta’s model for the steps an agent repeats: tool calls, coding subtasks, routing, extraction, and long documents. Meta released it on November 9, 2026. The model id is muse-ember-1.0. The docs, read November 10, 2026, list a context window of 1,048,576 tokens, a maximum output of 524,288 tokens, and reasoning effort from minimal to max, with max as the default. It is on the Meta Model API and in Muse Code."
  - question: "How much does Muse Ember cost?"
    answer: "The model page, read November 10, 2026, prices prompts up to 200,000 input tokens at $0.10 per million input tokens, $0.004 per million cached input tokens, and $0.50 per million output tokens. Prompts over 200,000 input tokens are $0.30, $0.012, and $1.50. The research post’s comparison table lists about $0.14 per Artificial Analysis Intelligence Index task at max effort. The builder post, read the same day, says about $0.13. Those are two published estimates, and this page did not recompute them."
  - question: "Is Muse Ember cheaper than Claude Haiku 5.5?"
    answer: "The short-prompt input and output rates match. Anthropic’s pricing page, read November 10, 2026, lists Claude Haiku 5.5 at $0.10 input and $0.50 output per million tokens for prompts up to 100,000 tokens, the same input and output rates as Muse Ember up to 200,000 tokens. The cache lines differ. Haiku’s cache-hit rate on that short tier is $0.01 per million tokens. Ember’s cached-input rate is $0.004. Above 100,000 tokens Haiku is $0.50 and $2.50. Above 200,000 tokens Ember is $0.30 and $1.50. A 150,000-token prompt is still on Ember’s lower tier and already on Haiku’s higher tier."
  - question: "How does Muse Ember score against Claude Haiku 5.5 and GPT-6 Luna?"
    answer: "On Meta’s November 9, 2026 research post, all three at max reasoning, Muse Ember and Claude Haiku 5.5 both score 36 on the Artificial Analysis Intelligence Index. GPT-6 Luna scores 28. Ember leads the post’s AutomationBench-AA row at 37.8% versus 13.9% and 20.2%, and its Terminal-Bench 4.0 row at 40.9% versus 39.2% and 16.4%. Haiku leads FrontierCode 2.0-AA at 34.9% versus Ember’s 27.2% and Luna’s 25.2%. Terminal-Bench uses a different harness for each model. AI Agents Info did not rerun the tests."
  - question: "Where does Muse Ember sit in an agent harness?"
    answer: "Meta’s docs say to run Muse Wonder or Muse Spark on the planning loop and hand repeated subtasks to Muse Ember. The builder post’s cookbook sets the worker model to muse-ember-1.0 at max effort, with a cap of 120 turns. In the published Python-to-Rust migration, 16 Ember workers ran in parallel under one Wonder planner. The same post says to send a finding back to the planner when a worker hits a dependency the brief did not name."
  - question: "Can an existing OpenAI client call Muse Ember?"
    answer: "Yes. The builder post says to point an OpenAI-compatible client at https://api.meta.ai/v1, pass MODEL_API_KEY, and set the model to muse-ember-1.0. The docs also list Chat Completions and Messages, plus tool calling, structured output, computer use, and search grounding. Output is text. Input can be text, image, video, audio, or PDF."
  - question: "Is Muse Ember the same kind of model as Claude Fable 5.2?"
    answer: "Claude Fable 5.2, also released November 9, 2026, is Anthropic’s model for long agent sessions, at $8 and $40 per million tokens. Muse Ember is the worker for repeated steps, at $0.10 and $0.50 on the short tier. Meta’s own comparison for Ember is Claude Haiku 5.5 and GPT-6 Luna. The Fable write-up is https://www.aiagentsinfo.com/blog/what-is-claude-fable-5-2."
---

Muse Ember is Meta’s model for the steps an [agent](/glossary/agent) repeats, released on November 9, 2026. The model id is `muse-ember-1.0`. [Meta’s research post](https://research.meta.ai/blog/muse-ember) names the job as tool calls, coding subtasks, routing, extraction, and long document parsing. The [model page](https://dev.meta.ai/models/muse-ember), read November 10, prices prompts up to 200,000 input tokens at $0.10 per million input tokens and $0.50 per million output tokens.

That sticker matches the short-prompt rates of Claude Haiku 5.5 and GPT-6 Luna. The published cache rates do not. Ember’s cached input is $0.004 per million tokens on that tier. Haiku’s cache-hit rate, for prompts up to 100,000 tokens, is $0.01. Luna’s cached input is $0.01. On the Artificial Analysis Intelligence Index in Meta’s post, Ember and Haiku both score 36 at max reasoning, and Luna scores 28. Haiku leads the same post’s FrontierCode row.

AI Agents Info read the research post, the model page, the [API docs](https://dev.meta.ai/docs/muse-ember), the [builder post](https://dev.meta.ai/resources/blog/build-with-muse-ember), [Anthropic’s pricing page](https://platform.claude.com/docs/en/about-claude/pricing), and the [GPT-6 Luna model page](https://developers.openai.com/api/docs/models/gpt-6-luna) on November 10, 2026. This page did not rerun the evaluations. The product listing is [Muse Ember](/directory/muse-ember). How a [harness](/glossary/harness) wraps a model is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness).

## What is Muse Ember?

Muse Ember is the worker model in the Muse family. The docs, read November 10, say to run Muse Wonder or Muse Spark on the main loop, and to hand bounded subtasks, tool calls, routing, and large batches of files to Ember. The research post uses the same split in one sentence: Muse Wonder plans, Muse Ember handles the volume.

The docs list a context window of 1,048,576 tokens and a maximum output of 524,288 tokens. The research post calls the output limit 512K, which is 512 × 1,024. Reasoning effort runs from `minimal` to `max`, and the default is `max`. The score table below is the max setting. Endpoints are Responses, Chat Completions, and Messages. Input can be text, image, video, audio, or PDF. Output is text. The docs also list computer use, tool calling, structured output, and search grounding.

On the API, Ember runs in Standard mode only. The docs say it has no Contributor-mode variant. It is available on pay-as-you-go and, the builder post says, in every Muse Code subscription. The research post says Muse Ember, Muse Spark, and Muse Wonder are also on Google Cloud and Oracle Cloud.

Claude Fable 5.2 came out the same day, for a different seat. That model is for long sessions, at $8 and $40 per million tokens. The write-up is [What is Claude Fable 5.2?](/blog/what-is-claude-fable-5-2). Ember’s rivals on Meta’s own chart are Haiku 5.5 and Luna.

## What does Muse Ember cost?

The model page prints two tiers. A request with more than 200,000 input tokens, including a long conversation history, pays the higher tier for that request. Muse Code subscriptions still allow Ember, and the docs say a request over 200,000 input tokens uses the plan’s allowance faster.

| Tier on the model page, read November 10, 2026 | Input USD per million | Cached input USD per million | Output USD per million |
| --- | --- | --- | --- |
| Up to 200,000 input tokens | $0.10 | $0.004 | $0.50 |
| Over 200,000 input tokens | $0.30 | $0.012 | $1.50 |

The short-tier input and output rates match two other models. The cache rate and the length where the price jumps do not.

| Model and the prompt length on its own page | Input USD per million | Cache USD per million | Output USD per million | Where the higher tier starts |
| --- | --- | --- | --- | --- |
| Muse Ember, up to 200,000 input tokens | $0.10 | $0.004 cached input | $0.50 | 200,000 input tokens |
| Muse Ember, over 200,000 input tokens | $0.30 | $0.012 cached input | $1.50 | 200,000 input tokens |
| Claude Haiku 5.5, up to 100,000 tokens | $0.10 | $0.01 cache hits | $0.50 | 100,000 tokens |
| Claude Haiku 5.5, over 100,000 tokens | $0.50 | $0.05 cache hits | $2.50 | 100,000 tokens |
| GPT-6 Luna, 272K input tokens or fewer | $0.10 | $0.01 cached input | $0.50 | 272K input tokens |
| GPT-6 Luna, over 272K input tokens | $0.20 | $0.02 cached input | $0.75 | 272K input tokens |

Haiku’s cache column is the cache-hit price on Anthropic’s pricing page. Ember’s and Luna’s cache columns are the cached-input prices on their pages. A prompt of 150,000 tokens is still on Ember’s $0.10 tier and already on Haiku’s $0.50 tier. Luna’s model page says a prompt over 272K input tokens is priced at 2 times the input and cache rates and 1.5 times the output rate for the whole request, which is the $0.20, $0.02, and $0.75 row. Dividing Ember’s $0.004 by the $0.01 cache rate on the other two short tiers gives 0.4.

Meta also prints a cost per task, and the two posts do not use the same figure. The research post says Ember costs about $0.14 per Artificial Analysis task, and its comparison table lists $0.14 against $2.39 for Muse Spark 1.3 (max). Dividing $2.39 by $0.14 gives 17.1. The same table lists Spark at $1.25 input and $4.25 output per million tokens, and an Intelligence Index of 37 against Ember’s 36. The builder post says the estimated model cost at max effort is about $0.13 per Intelligence Index task. This page keeps both sentences. It does not average them.

Muse Code plans on the model page, read November 10, are $5, $15, $50, and $200 a month, named Everyday, High, Power, and Maximum. The Everyday bullet lists access to Muse Spark, Muse Wonder, and Muse Image. The API docs say Ember itself is included on pay-as-you-go and every plan. Those subscription prices are a seat. The token table above is the API bill.

The [cost calculator](/agent-cost-calculator) prices Claude Haiku 5.5 and GPT-6 Luna from their provider pages. Ember’s rates are the table on this page. A separate check, for the tool list a harness sends on every turn, is the [prompt checker](/agent-prompt-checker). Why that JSON can cost more than the instructions is [Why tool JSON costs more than your system prompt](/blog/why-tool-json-costs-more-than-your-system-prompt).

## How do the agent scores compare?

Every cell below is max reasoning, copied from Meta’s November 9 research post. Artificial Analysis rows are marked AA. The other rows are Meta’s evaluation suite. Terminal-Bench 4.0 uses each model’s best published harness: mini-swe-agent for Muse Ember, Claude Code for Claude Haiku 5.5, and Codex for GPT-6 Luna. A higher score in that row is the model plus that harness.

| Evaluation, max reasoning, November 9, 2026 | Muse Ember | Claude Haiku 5.5 | GPT-6 Luna | Who measured it |
| --- | --- | --- | --- | --- |
| Artificial Analysis Intelligence Index | 36 | 36 | 28 | Artificial Analysis |
| AutomationBench-AA, strict pass@1 | 37.8% | 13.9% | 20.2% | Artificial Analysis |
| Agents' Last Exam, Linux subset | 61.6% | 57.0% | 57.1% | Meta |
| Personal Superintelligence Index | 46.8% | 36.1% | 37.0% | Meta |
| Terminal-Bench 4.0 | 40.9% | 39.2% | 16.4% | Best published harness, named above |
| Coding Agent Index-AA | 46 | 37 | 31 | Artificial Analysis |
| FrontierCode 2.0-AA | 27.2% | 34.9% | 25.2% | Artificial Analysis |
| GDP.pdf-AA | 22.8% | 20.8% | 22.8% | Artificial Analysis |
| OSWorld 2.1, partial credit | 69.5% | 68.9% | 50.5% | Meta |
| OSWorld 2.1, binary | 33.8% | 27.8% | 17.0% | Meta |
| PerceptionBench, with tools | 80.6% | 78.6% | 62.8% | Meta |

The Coding Agent Index row is printed as 46, 37, and 31, without a percent sign. The Personal Superintelligence Index is an internal composite of eight evaluations: Agents' Last Exam, AutomationBench, FocusBench, JobBench, OfficeQA Pro, GDP.pdf, GDP.xlsx, and VBT. Those pieces overlap the rows above, so the index is a summary. Adding it to AutomationBench would count some of the same work twice.

Read as a buying table, Ember leads the agent-workflow and computer-use rows Meta chose to print, ties Haiku on the Intelligence Index, and trails Haiku on FrontierCode, the row the post describes as real engineering tasks judged on mergeability. Luna does not lead a row in this table. The research post’s sentence on cost is that Ember matches Haiku’s best score at about a third of the cost and beats every Luna setting. The post does not print the token counts behind “a third.”

Partner lines on the same posts are their tests. Cloudflare’s CTO says Ember ran up to 30% faster at the tail than the comparable model Cloudflare tested, and the sentence does not name that model. You.com’s inference lead says a p95 of 2.2 seconds, about 4 to 13 times faster than leading open-weight models, and 36% to 48% fewer output tokens. The sentence does not name those models. Box’s VP of AI products describes contract scoring and candidate screening on Box’s own eval. Treat those as vendor reports.

On safety, the research post says Meta evaluated Ember under its Superintelligence Scaling Framework, including chemical, biological, cybersecurity, and loss-of-control risks, and that the evaluations it ran found Ember below that framework’s high-risk thresholds. It also says Meta tested whether the model respects user intent, handles sensitive information, resists instructions hidden in pages and tool outputs, and asks a person before high-impact actions. Those are Meta’s results.

## How do you put Muse Ember in a harness?

The builder post’s rule is a handoff, not a new framework. The planner gets the change that touches many files, the dependencies, and the acceptance checks. The Ember worker gets one brief: the files it may change, the commands that check the work, and the result to return. When the worker finds a dependency the brief left out, the finding goes back to the planner before the next edit. [Orchestration](/glossary/orchestrator) is that choice of who goes next. [Tool use](/glossary/tool-use) is the command the worker actually runs.

The published coding example ports 16 Pygments lexers from Python to Rust. The checkout named in the post is `a43b45dc`. Muse Wonder plans and does not open the source itself. One worker reads the Python, the Rust engine, and the checker, and returns a map of at most 60 lines. Wonder writes a brief per lexer. Sixteen Ember agents then port in parallel, each in its own git worktree. The worker definition sets the model to `muse-ember-1.0`, effort to `max`, and a cap of 120 turns. The session allows 17 agents. The post says the 16 porters finished within about 6 minutes of each other.

The result the post reports: all 16 lexers matched Python on every one of 383 test inputs, and on 62 of 62 files from 18 public repositories that were supplied only after the code was frozen. The Rust commands ran 3.0 to 7.3 times faster than Python on about 1 MB of input. Ember handled 158 million input tokens. Wonder handled 4.4 million. The run cost about $3.96 at pay-as-you-go prices, $2.12 for Wonder and $1.84 for Ember. The post says results vary from run to run. AI Agents Info did not rerun it.

The same post’s photo job shows the other shape, one decision repeated thousands of times, and it prints two bills. One sentence says 10,000 photos were captioned, renamed, and sorted for $1.59, of which $0.50 was Ember. A later sentence says the job cost $1.33, $0.81 for Wonder and $0.52 for Ember, and that the same photo requests at Muse Wonder prices would have been about $20. The albums agreed with the dataset’s own labels for about 86% of photos. This page does not know which total is the one to quote, because the post prints both. The recipe’s worker uses effort `low` and a cap of 20 turns, and the pipeline sends eight photos per request at minimal reasoning. That is a different effort from the score table.

A direct API call returns text. The application, or Muse Code, runs tools and sends the results back. The docs’ first call is a POST to `https://api.meta.ai/v1/responses` with a bearer `MODEL_API_KEY` and `"model": "muse-ember-1.0"`. The builder post says an existing OpenAI SDK client keeps its code, sets `base_url` to `https://api.meta.ai/v1`, and passes the key explicitly because the SDK does not read `MODEL_API_KEY` on its own. GPT-6 Luna’s model page, read the same day, lists text input and output, image input, and no audio or video. Ember’s docs list all four of those inputs, plus PDF.

The [sandbox](/glossary/sandbox) in the cookbook session is Muse Code’s, with network set to restricted in the migration command. A harness you already run can do the same split by choosing the model id per call. The comparison of shipping runtimes is [Best AI agent harness](/best/ai-agent-harnesses). Coding products with their own seat prices are [Best AI coding agents](/best/ai-coding-agents). The loop those products implement is [How do AI agents work?](/blog/how-do-ai-agents-work).

## What should a buyer check before switching a worker?

The default effort is `max`, and the benchmark table is max. A batch job can set a lower effort, as the photo recipe does, and this page has no score table for that setting. The price jump is at 200,000 input tokens for Ember, 100,000 for Haiku, and 272K for Luna. A harness that stuffs a whole repository into one prompt can leave Ember’s cheap tier without leaving Luna’s.

Terminal-Bench is three harnesses, not one. FrontierCode is the row Haiku wins. Partner latency numbers do not name the other model. The two cost-per-task sentences, $0.14 and $0.13, are both in Meta’s posts from the launch, and the photo example prints $1.59 and $1.33. Use the token table for a bill you can recompute, and use the score table for the jobs Meta actually published.

[Claude](/directory/claude) is the product that serves Haiku. The free [agent picker](/tools/agent-picker) is a directory shortlist, separate from this model choice. List a harness you ship at [Submit](/submit).
