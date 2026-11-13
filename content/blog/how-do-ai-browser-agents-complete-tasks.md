---
title: "How Do AI Browser Agents Complete Tasks?"
absoluteTitle: true
description: "A browser agent reads a page as an accessibility tree, a screenshot, or both, then acts. OSWorld 2.0's best 500-step finish rate, read November 13, 2026, is 20.6%."
takeaways:
  - "A browser agent finishes a website task in a loop. The harness shows the page, the model picks an action from a fixed action space, the harness runs it, and the next page is the check. Login and payment stop for a person."
  - "On the pages read November 13, 2026, ChatGPT Work's cloud browser is the current OpenAI product. Operator and ChatGPT agent are not. Claude's browser tool reads the accessibility tree and a screenshot. Gemini computer use is screenshot and coordinates, priced as the model."
  - "OSWorld 2.0's own page still prints 20.6% binary completion for Claude Opus 4.8 at 500 steps, and about 14% for GPT-5.5. A 97% row on Online-Mind2Web is a different test. Do not average them."
date: "2026-11-13"
updated: "2026-11-13"
category: guide
topics:
  - task-performance
  - how-agents-work
  - harnesses
audience:
  - everyone
  - builders
companies:
  - openai
  - chatgpt
  - anthropic
  - claude
  - google
  - perplexity
byline: "AI Agents Info Editorial"
sources:
  - title: "OpenAI Help, Using cloud browser in ChatGPT (read November 13, 2026)"
    url: "https://help.openai.com/en/articles/20001280-using-cloud-browser-in-chatgpt"
  - title: "OpenAI Help, ChatGPT agent (read November 13, 2026)"
    url: "https://help.openai.com/en/articles/11752874-chatgpt-agent"
  - title: "OpenAI, Computer use (read November 13, 2026)"
    url: "https://developers.openai.com/api/docs/guides/tools-computer-use"
  - title: "OpenAI, Codex pricing (read November 13, 2026)"
    url: "https://learn.chatgpt.com/docs/pricing"
  - title: "Anthropic, Browser use tool (read November 13, 2026)"
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool"
  - title: "Anthropic, Computer use tool (read November 13, 2026)"
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool"
  - title: "Anthropic, Plans and pricing (HTTP Date Fri, 13 Nov 2026 11:55:26 GMT)"
    url: "https://claude.com/pricing"
  - title: "Google Cloud, Computer use (last updated 2026-11-12 UTC; read November 13, 2026)"
    url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/computer-use"
  - title: "Google Chrome Help, Ask Gemini in Chrome to complete tasks with auto browse (read November 13, 2026)"
    url: "https://support.google.com/chrome/answer/16821166?hl=en"
  - title: "Google One, AI plans (read November 13, 2026)"
    url: "https://one.google.com/about/google-ai-plans/"
  - title: "Google Labs, Project Mariner (HTTP 200 app shell, read November 13, 2026)"
    url: "https://labs.google.com/mariner/"
  - title: "OSWorld 2.0 (read November 13, 2026)"
    url: "https://osworld-v2.xlang.ai/"
  - title: "Zhou et al., WebArena, PDF on webarena.dev (read November 13, 2026)"
    url: "https://webarena.dev/static/paper.pdf"
  - title: "WebArena-Infinity (read November 13, 2026)"
    url: "https://webarena.dev/webarena-infinity/content.md"
  - title: "OSU NLP, Online-Mind2Web leaderboard CSV (read November 13, 2026)"
    url: "https://huggingface.co/spaces/osunlp/Online_Mind2Web_Leaderboard/raw/main/human_Mind2Web-Online%20-%20Leaderboard_data.csv"
  - title: "Browser Use, pricing (read November 13, 2026)"
    url: "https://browser-use.com/pricing"
  - title: "browser-use 1.0.0 release notes (published 2026-11-10T02:04:48Z)"
    url: "https://github.com/browser-use/browser-use/releases/tag/1.0.0"
  - title: "browser-use 1.0.3 release notes (published 2026-11-12T16:52:54Z); PyPI JSON the same afternoon"
    url: "https://github.com/browser-use/browser-use/releases/tag/1.0.3"
  - title: "Browserbase, pricing (read November 13, 2026)"
    url: "https://www.browserbase.com/pricing"
  - title: "Yang et al., Set-of-Mark Prompting (arXiv:2310.11441)"
    url: "https://arxiv.org/abs/2310.11441"
  - title: "Perplexity, Comet (page text retrieved November 13, 2026; no price on that text)"
    url: "https://www.perplexity.ai/comet"
faq:
  - question: "How do AI browser agents complete tasks?"
    answer: "A harness shows the model the current page, as an accessibility tree, a screenshot, or both. The model picks one action from a fixed list, such as click, type, scroll, or navigate. The harness runs that action and returns the new page. The loop stops when the task is done, a limit hits, or a person must sign in or pay."
  - question: "Do browser agents read the DOM or a screenshot?"
    answer: "Both exist, and they are different tools. Anthropic's browser tool, read November 13, 2026, reads the accessibility tree and can also take a screenshot. Its computer-use tool uses screenshots and coordinates only. OpenAI's API guide splits BrowserToolset, for page text and controls, from ComputerToolset, for screenshots and mouse or keyboard actions. Google's computer-use API takes a screenshot and returns coordinates on a 0 to 999 grid."
  - question: "Is OpenAI Operator still available?"
    answer: "No. OpenAI's ChatGPT agent help page, read November 13, 2026, says ChatGPT agent is no longer available and points to ChatGPT Work and the cloud browser. The same page says Operator was folded into agent mode and that the Operator website is no longer accessible. The body of that page still prints older message limits. This guide does not treat those limits as the allowance for Work."
  - question: "Can ChatGPT complete a task on a website?"
    answer: "Yes, on paid plans except Free and Go, through the cloud browser inside ChatGPT Work. There is no separate browser fee on the help page. Plus is $20 a month. Pro is $100, $200, or $500 a month. The browser pauses for sign-in and asks before a payment or a booking."
  - question: "What is Chrome auto browse?"
    answer: "Chrome auto browse is Gemini in Chrome completing a multi-step web task after you approve a plan. Chrome's help page, read November 13, 2026, requires age 18 or older, the United States, English, a personal Google account, and Google AI Plus, Pro, or Ultra. Google One's plans page, read the same day, does not agree on Plus or on India. Read both pages before you treat a country or the $4.99 plan as included."
  - question: "How often do browser agents actually succeed?"
    answer: "It depends on the test. OSWorld 2.0's page, read November 13, 2026, prints 20.6% binary completion for Claude Opus 4.8 on 108 long tasks at 500 steps, and about 14% for GPT-5.5. Online-Mind2Web's leaderboard file has submitted rows above 90% on 300 live-web tasks. Those are not the same task success rate."
  - question: "Will a browser agent type my password or pay for me?"
    answer: "The current product pages say no, unless you take that step. ChatGPT's cloud browser puts the password in a secure form the model does not see, and it asks before a payment or a booking. Chrome auto browse asks you to take over financial transactions, terms, and account creation. Google's API says a confirmation for a financial transaction may not be bypassed."
  - question: "How do I make my website readable by an AI agent?"
    answer: "Give the control an accessible name a tree can return, keep login and payment as ordinary pages a person can take over, and do not hide the only instruction inside a canvas. Allowing ChatGPT-User or a Google fetcher is a separate choice from ranking. An llms.txt file helps an agent find Markdown. It does not click a button."
---

Updated November 13, 2026.

## How do AI browser agents complete tasks?

An AI browser agent completes a website task by looping. A [harness](/glossary/harness) shows the model the page, as an [accessibility tree](/glossary/accessibility-tree), a screenshot, or both. The model picks an action from a fixed [action space](/glossary/action-space). The harness runs it and checks the new page. Login, payment, and other hard-to-undo steps stop for a person.

That loop is the part vendors have shipped. The [task success rate](/glossary/task-success-rate) is the part they have not settled. On [OSWorld 2.0](https://osworld-v2.xlang.ai/), read November 13, 2026, the best binary completion at 500 steps is 20.6 percent, for Claude Opus 4.8. GPT-5.5 plateaus near 14 percent. Above 163 minutes of human time, binary completion on that plot is zero. A submitted 97 percent on a different, shorter, live-web test does not cancel that sentence.

The desktop case, where the tool is the whole screen, is [Can an AI agent use your computer?](/blog/can-an-ai-agent-use-your-computer). This page stays on the website. The workshop around the model is the [harness topic](/topics/harnesses). The short definitions are [browser use](/glossary/browser-use) and [computer use](/glossary/computer-use).

Agents are already fetching sites like this one. On the DataFast and Search Console brief for the seven days ending November 13, 2026, OpenAI’s ChatGPT-User fetched pages here 414 times, and Google and GoogleAgent fetched 68. The most fetched page in that Google set was the [November framework-stats report](/reports/ai-agent-framework-github-stats-november-2026), 29 times. ChatGPT referred 5 people. The computer-use guide drew 4. An earlier closed week, November 4 through 10, is the published [answer-crawler count](/reports/ai-answer-crawlers-november-2026). Those two windows are not one number.

## How does a browser agent see the page?

It sees whatever the harness returns. Three views are in current use, and they do not cost the same or fail the same way.

The accessibility tree is the structured list of named controls. [Anthropic’s browser tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool), read November 13, 2026, says Claude works with the page through that tree, the elements, the forms, and the tabs, and also through screenshots and viewport coordinates. `read_page` returns the tree as text. Each element carries a reference such as `[ref_2]`. The next click can name `ref_2`. It does not have to find the link in a picture first. `find` searches that same tagged text, up to 20 matches, for a phrase such as “add to cart button.”

A screenshot is the other view. Anthropic’s computer-use tool, on the page read the same day, works through screenshots and coordinates alone. The model asks for `screenshot`, then `left_click` at a coordinate. [Google’s computer-use guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/computer-use), last updated 2026-11-12 UTC, says the model observes a screenshot and returns a UI action. `click_at` takes `x` and `y` as integers from 0 to 999. The setup text on the same page tells you to scale a 0 to 1,000 grid. Both ranges are printed. A client has to follow the sample it ships, not average them.

[OpenAI’s computer-use guide](https://developers.openai.com/api/docs/guides/tools-computer-use), read November 13, splits the two views into two toolsets. `ComputerToolset` is screenshots and mouse or keyboard actions. `BrowserToolset` is page text, controls, and tabs, exposed as function tools by your driver. The guide’s first computer example tells the model to call `display(pyautogui.screenshot())` before it acts, and to check the screen after a short group of actions. The sample model id on that page is `gpt-6-astra`.

Set-of-marks is the older overlay. Yang and coauthors, 2023, partition an image, stamp marks on the regions, and let the model point at a mark instead of a raw pixel. [The paper](https://arxiv.org/abs/2310.11441) is a prompting method for GPT-4V. It is not the contract on Anthropic’s `browser_toolset_20260801` page. That contract is a reference from `read_page`, or a coordinate when the call asks for one.

Browser Use 1.0, published November 10, 2026, dropped the old DOM action schema. The agent writes Python in one persistent REPL on Chrome DevTools Protocol. The release notes say ultrafast mode, the mode `bu-fast` uses, works with accessibility-tree ids, and `mode='default'` opts out. PyPI’s latest on the afternoon of November 12 was 1.0.3. It still requires `pydantic-ai-slim==2.66.0`. PyPI’s `pydantic-ai` the next morning was 2.68.0. Those two exact pins do not install together.

What this means: if the job is a website, start with the tree. A named button is a reference. A pixel guess is a second tool, for the control the tree does not name. Shipping only screenshots makes every click a localization problem. OSWorld 2.0 tags visual-spatial precision on 45 of 108 tasks, 41.7 percent.

## What actions can a browser agent take?

Only the actions the harness declared. That list is the action space. A model that “can use a browser” cannot invent a new verb.

Anthropic’s browser entry declares 31 member tools. Four stay off unless you enable them: `javascript_exec`, `file_upload`, `read_console`, and `read_network`. The default set is the other 27, including `navigate`, `read_page`, `left_click`, `type`, `form_input`, `screenshot`, and `zoom`. `form_input` sets a control’s value from a reference. It does not retype the field from a picture. The page says `javascript_exec` and `file_upload` stay off because they widen what a manipulated page can make Claude do. The tool is not available in Claude Managed Agents. Your application runs every call. Nothing in that loop runs on Anthropic’s side.

Google’s browser actions, on the same computer-use page, include `navigate`, `click_at`, `type_text_at`, `scroll_document`, `go_back`, `search`, and `drag_and_drop`. Each call can carry an `intent` string. You can remove verbs with `excluded_predefined_functions`. The sample excludes `drag_and_drop`. The client executes the call. The API does not click.

OpenAI’s cloud browser, the product rather than the API, is described by behavior. The [help page](https://help.openai.com/en/articles/20001280-using-cloud-browser-in-chatgpt) says it reads pages, clicks buttons, enters information into forms, and carries out steps on public and signed-in sites. It does not publish the tool schema. ChatGPT chooses when to use it. If a connected app can finish the job, ChatGPT may use the app instead. That is the right order. A tool with an API beats a click.

Browser Use’s 1.0 loop is a Python cell, not a menu of `click` and `type`. The cell runs on CDP. The action space is whatever that cell is allowed to call, inside the domain rules you set. `prohibited_domains` also blocks subdomains. With any domain rule set, every `file:` URL is blocked.

A wider action space is not a better agent. `javascript_exec` can read a page the tree already explained, and it can also obey a script the page planted. Keep it off until the task needs it. The same judgment, for a coding harness, is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness).

## How does the agent check that the step worked?

The next observation is the check. If the harness does not return it, the model is grading its own plan.

Anthropic’s browser page says a result other than a tab-management result may include an image, usually a screenshot taken after the action, so Claude sees the outcome without a separate `screenshot` call. `read_page` can be called again. The computer-use page says Claude typically ends a batch with `screenshot`. When a batch does not, your application can attach one.

Google’s loop is the same shape. After the client runs the action, it sends a new screenshot and the current URL back as the function response. The model plans the next action from that image. A blocked action, or a confirmation the person denied, is also a result. The loop ends when the task is done, an error hits, or a safety filter or the person stops it.

OpenAI’s computer example caps the run at six Responses requests and checks the page before it reports success. The cloud browser help page tells the person to check the result and its sources. That is a human check, not an automatic grader.

The failure mode on OSWorld 2.0 is a check against the wrong object. In one published trace the agent gathers a reimbursement file and then treats the file’s existence as success. In another it submits a purchase sheet that matches its memory and misses a row that arrived later in Slack. The page’s own summary: agents lose track of constraints, miss information that arrives mid-task, guess rather than ask, and skip verification. They struggle most when the task hinges on hidden state.

A [benchmark](/glossary/benchmark) that scores the final state, not the model’s last sentence, is the one to read. WebArena’s paper, in the PDF on webarena.dev, says the tasks are checked for functional correctness. A model that writes “I booked it” and did not change the site has not succeeded.

## Which browser agents can run a task today?

The products below were read on November 13, 2026. A seat price is not a cost per finished task. The November 9 product calendar, including the one dated launch it found, is [Browser and computer-use agents, the next 6 months](/reports/browser-and-computer-use-agents-next-6-months). Prices on that page are the November 9 reading. Where a vendor page moved, the table here is the later one.

| Product | What it sees and does | Who can use it on November 13 | Price on the page read that day | Where it stops |
| --- | --- | --- | --- | --- |
| ChatGPT Work, cloud browser | Its own browser on a cloud computer. Reads, clicks, fills forms. ChatGPT picks it. | Paid ChatGPT plans except Free and Go. Region and workspace can still limit it. | No separate browser fee. Plus is $20 a month. Pro is $100, $200, or $500. | Sign-in, payment, booking, and a site that blocks the agent. You can take over. |
| Operator, and ChatGPT agent | Not a current product. The help page says the agent is gone and the Operator site is not accessible. | The overview says use Work and the cloud browser. | The old page still prints message caps. This guide does not use them. | — |
| Claude browser tool | Accessibility tree plus screenshot. 27 tools on by default. Your app runs them. | Claude API, for the models the tool page lists. Not in Claude Managed Agents. | No separate browser fee on the tool page. Token rates. | You write the pause. `javascript_exec` and file upload start off. |
| Claude in Chrome | Named on the pricing table, not given a tool schema there. | Free: no. Pro, Max, and Ultra: yes. | Inside the plan. Pro is $20 a month, or $17 if you pay $200 up front. | The table does not print a success rate. |
| Gemini computer use | Screenshot in, action out, on a 0 to 999 grid. Browser, mobile, or desktop. Your code clicks. | The model list includes Gemini 4 Hydrogen, Carbon, and Argon, plus Gemini 3.8 Flash and other 3.x ids. The quickstart sample uses `gemini-3.8-flash`. | Same rates and SKUs as Gemini. No separate computer-use price. | `require_confirmation` stops the client. Financial transactions are one of those stops. |
| Chrome auto browse | Gemini in Chrome runs a plan you approve, on the local browser or a remote one. | Chrome Help: 18 or older, United States, English, Plus, Pro, or Ultra, personal account. Google One does not match that sentence. See below. | Plus $4.99, Pro $19.99, Ultra 5x $99.99, Ultra 20x $199.99 a month, on the plans page. | Take over for payment, terms, and new accounts. You can stop the task. |
| Comet | Perplexity’s browser page lists Mac, Windows, iOS, and Android. | The retrieved page text says download. It does not print a country limit. | No dollar figure. The pricing hub and the Max help article returned a bot check on November 13, so this row has no price. | Not stated on the text this desk could read. |
| Browserbase, with Stagehand | Cloud browsers your agent drives. Stagehand is the SDK Browserbase maintains. | On sale. US East, US West, EU Central, UK. Asia Pacific on request for enterprise. | Free $0. Developer $20. Startup $99. Scale is custom. | A browser hour is infrastructure. It is not a finished task. |
| Browser Use 1.0.3 | Python on CDP. Ultrafast mode uses accessibility-tree ids. MIT harness. | On sale, pay as you go. Local Chrome is free. Cloud browsers are hosted. | $0.06 per browser hour on the pricing page. `bu-ultrafast` is listed at $0.006 a task. | The ladder and the FAQ do not agree on how many browsers the unpaid credit can run at once. |

ChatGPT’s cloud browser pauses at a supported sign-in, shows you the address and a preview, and sends the password to the remote browser. The help page says the username and password are not visible to the model and are not stored by ChatGPT. After that, the session can persist until it expires or you clear cookies. Before a booking or a payment, it asks in the chat. If it gets stuck, it gives you a link to take the browser over. Some sites block the agent even when they work in your own browser. The help page says that block is the site’s decision, and it points operators at an allowlisting guide.

Chrome’s help page asks you to review the plan and click Start Task. It asks you to take over to finish a financial transaction, accept terms, or create an account. It aims to ask before sending a message, changing data, submitting a form, scheduling, or opening a site with highly sensitive financial or health data. Google Password Manager can sign the browser in with your permission. The help page says Google does not share those passwords with Gemini. The local browser needs the computer awake. A remote browser can continue after you close the device, and it pauses for sign-in.

Google One’s plans page, read the same morning, does not tell the same eligibility story. The Plus card says “Access to Chrome auto browse.” The comparison table leaves the Plus cell blank and marks Pro as Expanded, Ultra 5x as Higher, and Ultra 20x as Highest. The feature blurb says Pro and Ultra, in the United States and India. The FAQ says auto browse is available in the United States and India. Chrome Help says the United States, and it includes Plus. This guide does not merge those sentences. Open both pages before you buy the $4.99 plan for this feature, or before you assume India is included.

[Project Mariner](https://labs.google.com/mariner/) returned HTTP 200 on November 13 and served an app shell named MarinerWebApp. That response is not a help page. It does not state a price, a perception method, or a handoff rule. This guide does not treat the shell as a current way to complete a task. The Google products with a readable contract today are Chrome auto browse and the computer-use API.

Comet’s public page, in the text retrieved November 13, lists Mac, Windows, iOS, and Android and offers a download. Direct requests for the pricing hub and the Max help article came back as a bot check. A price this desk could not re-read is not printed here. The last successful price reading on this site is the [November 9 outlook](/reports/browser-and-computer-use-agents-next-6-months). It is four days older than this page.

Desktop computer use, for Claude Cowork, Claude Code, and the ChatGPT desktop app, is the other loop. It can drive a browser and it can drive other apps. The sourced account is the [computer-use guide](/blog/can-an-ai-agent-use-your-computer). A comparison of desktop, API, and open-source options is [Best computer use agents](/best/computer-use-agents).

## What is a real task success rate?

A task success rate is a fraction with a denominator you can name. The date, the task set, the step cap, the judge, and whether the score is binary or partial all belong in the sentence. Strip them and the number is an advertisement.

| Test | What it measures | Figure on the page read November 13, 2026 | What it is not |
| --- | --- | --- | --- |
| OSWorld 2.0, 500-step binary | 108 long desktop workflows. Median human time about 1.6 hours. 69.6% of tasks take a skilled person more than an hour. | Claude Opus 4.8, maximum thinking, batched calls: 20.6% binary, 54.8% partial, 244K output tokens. Opus 4.7: 18.2% at 150K. GPT-5.5: about 14% at 39K, then a plateau. | Not a browser-only score. Not a Gemini 4 or Claude Fable score. The page’s named runs stop at Opus 4.8 and GPT-5.5. |
| OSWorld 2.0, long horizon | Binary completion against human time. | Under 45 minutes, GPT-5.5 and Opus 4.7 reach 20% to 24%, then fall. Above 163 minutes, binary completion is zero for every model kept in the plot. | Not evidence that a 10-click form will fail. |
| WebArena, paper PDF | 812 tasks on self-hosted sites, scored by functional correctness. | The PDF on webarena.dev says the best GPT-4 agent in that copy reaches 10.59% end to end. | Not a 2026 leaderboard. A later community sheet is a different document. |
| WebArena-Infinity | 1,260 generated tasks across ten environments, with programmatic checks. | The project page says Gemini-3-Flash with Browser Use reaches 69.3% (873 of 1,260). Qwen-3.5-Plus is 49.1%. Kimi-K2.5 is 45.9%. | The model name on that page is Gemini-3-Flash. It is not the Gemini 4 list on Google’s computer-use page. |
| Online-Mind2Web CSV | 300 tasks on 136 live websites. Rows are submissions. | Hark Handoff, 97.7% average, dated 2026-08-04. Navigator n1.5, 97.3%, dated 2026-06-28. ACT-2 with GPT-5.4, 92.7%, dated 2026-08-04. Browser Use with gpt-4o, 30.0%, dated 2025-03-22. Operator, 61.3%, dated 2025-03-22. | The top rows name Careerflow as the human judge. The live web changes. This is not OSWorld. |
| Browser Use, BU Bench v2 | 60 tasks, 3 reps, cloud browsers, 2026-11-09, both arms on gpt-6-luna. | Ultrafast 1.0: 62.5%, interval 58.3 to 66.5, $0.070 a task, 650 seconds. After provider errors are removed, the quality gap versus Browser Use Pi is +1.1, interval −3.2 to +5.7. | Not a public-web success rate. The default `bu-fast` model was not in the run. |

Vendor cards that say “OSWorld 2.1, offline set, partial” and print a number in the 80s are a different cut. This page does not subtract 20.6 from those 80s. The comparison that keeps the cut, the effort, and the date in the cell is [Gemini 4 Carbon vs Claude Fable 5.2](/blog/gemini-4-carbon-vs-claude-fable-5-2-for-agents). How to build a grader that checks one action, rather than a vendor’s headline, is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness).

Cost per task splits the same way. Browser Use’s pricing page lists `bu-ultrafast` at $0.006 a task and a browser hour at $0.06. The November 9 bench, on `gpt-6-luna`, printed $0.070 a task. Those are two meters. ChatGPT’s cloud browser has no per-task price on the help page. It draws the allowance Work shares with Codex. A $20 Plus plan that finishes four short forms and stalls on one long booking is not a $5 task. If you already have a success rate, a review minute, and a dollar cost, the [ROI calculator](/tools/ai-agent-roi-calculator) turns those inputs into payback months. It does not know your site.

## Where do browser agents fail?

They fail in the places the long tasks were built to expose, and on the ordinary web they fail one site at a time.

OSWorld 2.0’s challenge table, counts over 108 tasks, puts cross-source reasoning on 46 tasks, visual-spatial precision on 45, implicit-state inference on 43, and multi-item tracking on 43. The authors say the lowest-scoring phenomena are the ones that demand state the instruction does not hand over. A late Slack approval, a receipt amount that disagrees with the email, a form field that is not in the prompt: the agent freezes an early list and then checks that list instead of the world.

The horizon is its own failure. A 500-step cap still leaves the reimbursement agent inside the form, debugging a read-only date field, with the claim unsent. More tokens move the binary number from about 14 percent to 20.6 percent on that page. They do not make a two-hour workflow reliable. If your task is “find three flights and stop,” you are not in that denominator. If your task is “file the expense the way the PDF says, after the bank email arrives,” you are.

Live sites add a failure the benchmark can turn off. ChatGPT’s help page says a website may block the cloud browser even when the same site works in your browser. Chrome’s help page says the agent can click the wrong control, add the wrong quantity, or report a task done when it is not. Google’s API page says a screenshot can contain an instruction the person did not write. That is [indirect prompt injection](/glossary/indirect-prompt-injection). Anthropic scans computer-use tool results, including screenshots, and tells the model to check that the instruction came from you. The scan is not a reason to drop the allowlist.

The install can fail before the first click. browser-use 1.0.3, uploaded 2026-11-12T17:20:36Z, still pins `pydantic-ai-slim[anthropic,google,openai]==2.66.0`. `pydantic-ai` 2.68.0, the PyPI latest at 11:55 GMT on November 13, requires the 2.68.0 slim extra. One environment cannot satisfy both pins. The 1.0 rewrite, the bench, and the earlier pin are [AI agent framework release, November 2026](/blog/ai-agent-framework-release-november-2026).

## When does the agent hand the task back?

When the next action is hard to undo, or when the harness is no longer sure the page is the one you asked for. The product pages name that moment. They do not all name it with the same verb.

ChatGPT’s cloud browser asks you to confirm a booking or a payment, and it asks you to take over when it is stuck. You can also demand the browser. Credentials go through the secure form, not through the chat. The help page says to never paste a password or a card number into the conversation.

Chrome auto browse asks you to take over the financial step, the terms, and account creation. It also lets you take over any time, then hand the task back with Resume. The help page says you are responsible for the agent’s actions, including a purchase you did not want.

Google’s API makes the stop a field. A `safety_decision` of `require_confirmation` means the client must ask the person before it runs the call. The terms say you are not permitted to bypass that ask. `FINANCIAL_TRANSACTIONS` covers the last step of a payment, a transfer, a subscription change, or a reservation. `ACCOUNT_CREATION` covers sign-up. An organization policy can stop a developer from disabling those checks. The page also shows a `yield_to_user` pattern for a 2FA screen: exclude the built-in action and return control.

Anthropic’s browser tool does not click a pay button on Anthropic’s servers, because your application is the one clicking. The pause is yours to write. The page tells you to treat everything a page supplies as untrusted, and to get the person’s consent before you turn the tool on in a product. A configured stop, the kind that holds one named action, is an [approval gate](/glossary/approval-gate). The person who approves it is the [human in the loop](/glossary/human-in-the-loop).

A handoff between two agents, where a specialist owns the next reply, is a different term. That pattern is [agent handoff](/glossary/agent-handoff). This section is the person taking the browser back.

## How do you make a website agent-ready?

Make the control something the tree can name, and make the dangerous step something a person can finish. The agents already fetching your pages are not waiting for a new file format.

1. Use a real control with an accessible name. Claude’s `find` looks for “add to cart button” in the tree text. A `div` with a click handler and no name is a coordinate problem. The screenshot path can still try. It is the path that misses small type, which is why the browser tool has `zoom`.
2. Keep the name stable. The reference id is assigned by the executor, not by your HTML id. The accessible name is what the next run searches for. Renaming “Pay” to a glyph with no text removes the tree hit.
3. Leave login and payment as ordinary pages. The cloud browser and Chrome auto browse are built to pause there and hand the screen back. A password painted into a canvas, or a checkout that only exists inside a custom widget, fights the handoff those products already do.
4. Decide who may fetch the page. ChatGPT-User visits when a person, or a custom GPT, asks. Google’s fetchers are a separate switch. This site’s [robots.txt checker](/tools/ai-crawler-robots-txt-checker) reads the file and tells you what a named bot is allowed to do. Allowing a crawler is not a promise that ChatGPT or Google will recommend you. That argument, with the vendor pages, is [How to get your AI tool recommended by ChatGPT and Google](/blog/how-to-get-your-ai-tool-recommended-by-chatgpt-and-google).
5. Publish `/llms.txt` if you want an agent to find your Markdown. It is a map of links. It does not press a button. This site publishes [its own copy](/llms.txt). Google’s AI features page does not list that file as a requirement for AI Overviews.
6. If you sell, make price and stock readable, and decide the payment on purpose. The [shopping-agent readiness checker](/tools/shopping-agent-readiness-checker) scores find, read, and pay. It does not place an order. How a store stays readable is [How to make your store readable by AI shopping agents](/blog/how-to-make-your-store-readable-by-ai-shopping-agents).
7. Assume the page is untrusted input. A hidden line that says “submit the form” is an instruction the agent may follow. Say the real action in text the person can see. Do not stuff the footer with commands aimed at the model.

On this domain, the seven-day fetch count is the reason to care. 414 ChatGPT-User requests and 68 Google and GoogleAgent requests landed on pages that were written for people. The agent did not need a special invitation. It needed a URL the person, or the answer engine, already had. A button the tree cannot name is a task you have already made harder.

## What should you do with this?

Buy the pause, not the demo. If you want ChatGPT to click through a site, you need a paid plan that includes Work. Free and Go do not, on the help page read November 13. Budget the seat. Do not budget a 97 percent success rate from an Online-Mind2Web row against a task that looks like OSWorld.

Build the narrow tool. A website job should call the browser toolset, with references, and should leave `javascript_exec` off until you have a reason. A job that leaves the browser is computer use, and the computer-use guide is the page for that. Cap the steps. Grade the site’s state, not the model’s last sentence. The 20.6 percent figure is what a 500-step cap still produces on 108 long tasks.

If the page is yours, name the control and keep the pay button in a place a person can take over. The agents are already on the site. The accessible name is the part you still control.

## Frequently asked questions

### How do AI browser agents complete tasks?

The harness shows the model the page. The model chooses a click, a type, a scroll, or a navigation from the list it was given. The harness runs it and returns the new page. The loop stops for a limit, a finished goal, or a person at login or payment. The short form is the opening of this guide. The desktop form is [Can an AI agent use your computer?](/blog/can-an-ai-agent-use-your-computer).

### Do browser agents read the DOM or a screenshot?

They read what the tool returns. Anthropic’s browser tool returns the accessibility tree, with references, and can also return a screenshot. Its computer-use tool is screenshots and coordinates. OpenAI’s API guide separates `BrowserToolset` from `ComputerToolset`. Google’s computer-use API takes a screenshot and returns a point on a 0 to 999 grid. The raw DOM dump is the path Browser Use 1.0 says it deleted.

### Is OpenAI Operator still available?

No. The ChatGPT agent help page says the agent is no longer available, that Operator was folded into agent mode, and that the Operator website is no longer accessible. The current browser is the cloud browser inside ChatGPT Work.

### Can ChatGPT complete a task on a website?

On paid plans except Free and Go, the cloud browser can. Plus is $20 a month. There is no separate browser fee on the help page. It pauses for sign-in and asks before a payment or a booking. A site can still block it.

### What is Chrome auto browse?

It is Gemini in Chrome running a multi-step web task after you approve a plan. Chrome Help, read November 13, 2026, limits it to people 18 or older in the United States, in English, on Plus, Pro, or Ultra. Google One’s page, read the same day, also mentions India and does not mark Plus the same way. Use both pages.

### How often do browser agents actually succeed?

Name the test. OSWorld 2.0 prints 20.6 percent binary completion for Opus 4.8 at 500 steps, and about 14 percent for GPT-5.5. Online-Mind2Web’s file has submitted averages of 97.7 percent and 97.3 percent on 300 live tasks, dated August 4 and June 28, 2026, next to a March 2025 Browser Use row at 30.0 percent. Those fractions do not combine.

### Will a browser agent type my password or pay for me?

The pages read here say the person takes that step. ChatGPT’s secure sign-in form hides the password from the model. Chrome asks you to take over a payment, terms, and account creation. Google’s API forbids bypassing a confirmation the safety check required.

### How do I make my website readable by an AI agent?

Name the control in the accessibility tree, keep login and payment as pages a person can finish, and treat page text as untrusted. The [robots.txt checker](/tools/ai-crawler-robots-txt-checker) is the fetch question. The [shopping-agent readiness checker](/tools/shopping-agent-readiness-checker) is the store question. `/llms.txt` is a map of Markdown, not a click.
