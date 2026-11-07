---
title: "Can an AI Agent Use Your Computer? Claude Computer Use (2026)"
description: "Yes, when the product has computer use. Claude computer use, the ChatGPT desktop app, and the Claude, OpenAI, and Gemini APIs can look at a screen and click, type, and scroll. A chat reply that only describes the steps does not. Re-checked November 7, 2026."
takeaways:
  - "Yes, when the product has computer use. The model looks at the screen. The app clicks, types, and scrolls. A chat reply that only describes the steps does not do that."
  - "On November 7, 2026, Claude Cowork, Claude Code, and the ChatGPT desktop app can drive a Mac or Windows screen. Anthropic and OpenAI still document API loops where your code runs each action. Google’s Computer Use guide loaded that day on AI Studio, after the old address returned HTTP 500 on November 6."
  - "Keep the agent in a sandbox, treat the screen as untrusted, and make a person confirm payments, passwords, and other steps that are hard to undo."
date: "2026-11-05"
updated: "2026-11-07"
category: guide
topics:
  - task-performance
  - how-agents-work
  - harnesses
  - tools-saas
audience:
  - everyone
  - builders
companies:
  - anthropic
  - claude
  - claude-code
  - openai
  - chatgpt
  - google
  - gemini
  - tencent
byline: "AI Agents Info Editorial"
sources:
  - title: "Anthropic, Put Claude to work on your computer (re-read November 7, 2026)"
    url: "https://claude.com/resources/articles/dispatch-and-computer-use"
  - title: "Anthropic, Computer use tool (re-read November 7, 2026)"
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool"
  - title: "OpenAI, Computer use (API guide, re-read November 7, 2026)"
    url: "https://developers.openai.com/api/docs/guides/tools-computer-use"
  - title: "OpenAI, Computer Use in the ChatGPT desktop app (re-read November 7, 2026)"
    url: "https://developers.openai.com/codex/computer-use"
  - title: "Google, Computer use (Gemini API on AI Studio, read November 7, 2026)"
    url: "https://aistudio.google.com/docs/computer-use"
  - title: "Tencent, Tencent launches Hy4 (re-read November 6, 2026)"
    url: "https://www.tencent.com/tencent-launches-hy4-joining-the-ranks-of-the-worlds-leading-open-source-ai-models/"
  - title: "Google, Gemini API changelog, October 30, 2026 entry (page re-read November 7, 2026)"
    url: "https://ai.google.dev/gemini-api/docs/changelog"
faq:
  - question: "Can an AI agent use my real desktop?"
    answer: "Yes, in the desktop products re-read on November 7, 2026. Claude Cowork and Claude Code can point and click on a Mac or Windows PC while the desktop app is awake, in research preview for Claude Pro, Max, and Ultra. The ChatGPT desktop app can operate a Mac or Windows graphical interface for ChatGPT Work and Codex, in supported regions, after you turn on Computer Use and allow apps. The Anthropic and OpenAI API pages describe a browser or machine your own code controls. Google’s Computer Use guide loaded the same day on AI Studio. The previous address returned HTTP 500 on November 6."
  - question: "Do I need to approve each click?"
    answer: "You need to approve access, and you should approve anything hard to undo. Claude's product article says Claude asks for explicit permission first, and requests permission before it opens a new app. ChatGPT asks before it uses an app, and it may also ask before a sensitive or disruptive action. On the APIs, ordinary clicks can run in a batch if your application allows them. Anthropic, OpenAI, and Google each tell you to confirm purchases and other consequential actions before they run."
  - question: "Is computer use the same thing as an agent harness?"
    answer: "Computer use is a tool. The harness is the software around the model: the loop, the tools, the memory, the permissions, and the rule for when to stop. The harness offers computer use, runs the click, and brings the new screen back. An agent, on this site, is the model plus that harness."
  - question: "How do Claude, OpenAI, and Gemini compare for computer use?"
    answer: "Claude's consumer feature is a research preview in Claude Cowork and Claude Code on macOS and Windows. ChatGPT's desktop app offers Computer Use on macOS and Windows with ChatGPT Work and Codex. Anthropic and OpenAI document an API where your application executes the action. On November 7, 2026, Anthropic’s Messages API table still lists computer_toolset_20260801 as available for models including Claude Fable 5.1, Claude Mythos 5.1, Claude Opus 5.5, Claude Sonnet 5.5, Claude Haiku 5.5, and Claude Opus 4.8, and as beta for an older set that includes Claude Opus 4.7 and Claude Sonnet 4.6. It is not available in Claude Managed Agents. Google’s Computer Use guide on AI Studio, read the same day, still names Gemini 4 Argon, Gemini 3.8 Flash, Gemini 3.5 Flash-Lite, and Gemini 3 Flash Preview. The changelog entry for general availability remains October 30, 2026."
  - question: "Is computer use reliable enough for money or passwords?"
    answer: "The pages checked here say no, unless a person is in the loop. Anthropic says computer use is still early compared with coding or text, and says to avoid sensitive data. OpenAI says to keep the user in control of purchases and of typing secrets, and the ChatGPT desktop page says to stay present for payment and credential steps. Google says Computer Use can contain errors, and its payments category can block a checkout or ask for confirmation."
  - question: "When should I use a connector instead of clicking the screen?"
    answer: "Use a connector, plugin, or API when the service has one. Anthropic says Claude tries a connector such as Slack or Google Calendar first, and that working through the screen is slower than a direct integration. OpenAI's desktop page says to prefer a plugin or MCP server for data access and repeatable operations. Clicking is the fallback for a task that only exists as a graphical interface."
  - question: "Does my computer have to stay awake?"
    answer: "For Claude's desktop feature, yes. Anthropic says the desktop app has to be awake and running, including when you assign the task from your phone with Dispatch. ChatGPT on Windows runs on the active desktop and takes the foreground. On a Mac, ChatGPT can run a scoped task in the background, and an optional locked-use setting can continue a task after the screen locks. An API agent keeps running only while the browser or machine you attached is still up."
---

Updated November 7, 2026.

## Can an AI agent use your computer?

Yes, when the product has [computer use](/glossary/computer-use). The model looks at the screen. The app clicks, types, and scrolls.

A chat reply that tells you which button to press is still a chat. Computer use starts when software can see the current screen and carry out the next action. On November 7, 2026, that software is available in two desktop products and in the Anthropic, OpenAI, and Gemini APIs. [Claude Cowork and Claude Code](https://claude.com/resources/articles/dispatch-and-computer-use) can drive a Mac or Windows screen in a research preview. The [ChatGPT desktop app](https://developers.openai.com/codex/computer-use) can do the same for ChatGPT Work and Codex, in supported regions. [Anthropic](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool) and [OpenAI](https://developers.openai.com/api/docs/guides/tools-computer-use) document API loops in which your application runs each click. [Google’s Computer Use guide](https://aistudio.google.com/docs/computer-use) loaded on November 7. The older address, `ai.google.dev/gemini-api/docs/computer-use`, redirected there. A request to that older address on November 6 had returned HTTP 500.

The short version: the model chooses the action. An app you run, or a desktop app that is awake, performs it. Payments, passwords, and other hard-to-undo steps still need a person. A workplace agent that returns a file for review, and only uses the screen as a last resort, is [What is an AI employee?](/blog/what-is-an-ai-employee).

## What does computer use mean?

Computer use is a [tool](/glossary/tool-use) that works through the screen. The model receives a picture of the display. It answers with a pointer action, a keystroke, a scroll, or a request for a closer look. The [harness](/glossary/harness) around the model takes that request, performs it, and puts the new screen back in front of the model. That pair, model plus harness, is an [agent](/glossary/agent).

Three neighbors are easy to mix up:

- A chat-only model writes the next message. It does not move the pointer.
- A connector, or any other API tool, calls a named function and gets a structured result. A calendar tool returns an event. A catalog tool returns a price. The [shopping guide](/blog/can-an-ai-shopping-agent-check-out-for-you) is that pattern pointed at a cart.
- Computer use is the path for a job that lives in a graphical interface: a desktop app, a settings pane, or a site with no API. The result of a click is a new picture, which the model has to read.

Anthropic's product article says Claude reaches for the precise tool first, including connectors such as Slack or Google Calendar. When there is no connector, Claude can control the browser, mouse, keyboard, and screen. The same article says working through the screen is slower than a direct integration, and that computer use is still early compared with Claude's coding and text work.

## What is browser use?

[Browser use](/glossary/browser-use) is the narrower tool. The agent reads and acts on a web page. It does not need every app on a desktop.

Anthropic's API page says the browser use tool is the closer fit for tasks that stay inside web pages, because its tools act on the page itself. OpenAI's API guide separates the two jobs. `BrowserToolset` is for page text, controls, and tabs. `ComputerToolset` is for screenshots and mouse or keyboard actions in a browser or on a desktop. Google's Computer Use page offers a browser environment alongside mobile and desktop. In that browser environment the client still executes the action, including clicks and a direct navigation to a URL.

A full desktop is the wider grant. It can open a local app, a file dialog, or a system setting. The safety sections below treat that wider grant as the case that needs the tighter sandbox.

## How does the loop work?

The loop has four beats. The app sends the goal and a picture of the screen. The model chooses the next action. The app runs that action. The app sends back the new picture. The cycle repeats until the model answers in text, or until a limit or a person stops it.

Anthropic's API page names the current toolset `computer_toolset_20260801`. One entry in the tools list gives Claude 17 member tools, including `screenshot`, `zoom`, `left_click`, `type`, `key`, and `scroll`. Claude answers with one or more `tool_use` blocks. Your application runs them in order, in an environment you control, and returns a result for each one. A screenshot or a zoom comes back as an image. Several actions in one response are a batch: click, type, then screenshot, for example. Anthropic says a confirmation check belongs before each action in the batch, because one turn can finish a multi-step change.

OpenAI's API guide says your application supplies the driver. The driver reads the screen or performs an allowed action, and your application owns the session, the permissions, and the cleanup. The code samples on that page use `gpt-6-astra` and `gpt-6.1-sol`. The same page says the project needs a model that supports the computer tool. A separate line in the guide points to the Agents API for a browser that OpenAI hosts.

Google's page describes the same four beats for the Gemini API. Your request includes the Computer Use tool, the target environment, the prompt, and a screenshot. The model returns a function call such as a click, a scroll, or a keystroke. For Gemini 4 and Gemini 3.x, the call also includes an `intent` that states why the model chose that action. The response can include a safety decision: allowed, `require_confirmation`, or blocked. Your client executes the action only when it is allowed or a person confirms it, then sends a new screenshot. The action tables for browser, mobile, and desktop print coordinates from 0 to 999, which the client scales to the screen. A code sample on the same page, read November 7, describes that scale as a 1,000 by 1,000 grid.

On this site that surrounding software is the [harness](/blog/what-is-an-ai-agent-harness). Designing it on purpose is [harness engineering](/glossary/harness-engineering). Checking one of those actions, such as whether the agent asked before a payment, is a [behavioral evaluation](/blog/how-do-you-evaluate-an-ai-agent-harness). Computer use is one tool the harness can offer. The [sandbox](/glossary/sandbox) is the bounded machine the tool acts on. [Autonomy](/glossary/autonomy) is how far the loop runs before a person confirms the next step.

## What do Claude, OpenAI, and Gemini offer?

The Claude, ChatGPT, OpenAI API, and Gemini rows are what those pages said on November 7, 2026. Claude’s and OpenAI’s pages matched the November 6 reading. Gemini’s guide was readable again, at a new address. A model name in a code sample is the name printed in that sample. It is a pointer to the page, and the page can change which models it lists.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Product or path</th>
<th>Who runs the environment</th>
<th>Availability when the page was read</th>
<th>Notable limits</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="/directory/claude">Claude Cowork</a> and <a href="/directory/claude-code">Claude Code</a></td>
<td>Your Mac or Windows computer. The desktop app has to be awake and running.</td>
<td>Research preview for Claude Pro, Max, and Ultra. Turn it on in the desktop app settings. Dispatch can hand the task off from the phone.</td>
<td>Anthropic says it asks for explicit permission first, and requests permission before a new app. Some apps are off-limits by default. Computer use is still early next to coding and text. Keep sensitive data out.</td>
</tr>
<tr>
<td><a href="/directory/chatgpt">ChatGPT desktop app</a></td>
<td>Your Mac or Windows desktop, in the apps you allow. On Windows it uses the active desktop.</td>
<td>In supported regions, with ChatGPT Work and Codex. Open Settings, then Computer use, and turn on Any App. If that row says Install, follow the prompts.</td>
<td>Permission before each new app. It cannot automate a terminal app or ChatGPT itself. On Windows it takes the foreground. Stay present for payments and credentials.</td>
</tr>
<tr>
<td>Claude API, <code>computer_toolset_20260801</code></td>
<td>Your application, in an environment you control. Anthropic recommends a virtual machine or a container.</td>
<td>Messages API, re-read November 7, 2026. The quick start needs no beta header. The availability table lists <code>computer_toolset_20260801</code> as available for Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, Claude Mythos 5, Claude Mythos Preview, Claude Opus 5.5, Claude Opus 5, Claude Sonnet 5.5, Claude Sonnet 5, Claude Haiku 5.5, and Claude Opus 4.8 on the Claude API and Google Cloud. A second available row, without Mythos Preview, covers AWS, Amazon Bedrock, and Microsoft Foundry. The beta row lists Claude Haiku 4.5, Claude Opus 4.7, Claude Opus 4.6, Claude Sonnet 4.6, Claude Opus 4.5, and Claude Sonnet 4.5. Not available in Claude Managed Agents.</td>
<td>Seventeen member tools. You perform every call. Confirm financial transactions and other consequential actions. Treat the screen as untrusted.</td>
</tr>
<tr>
<td>OpenAI API, <code>ComputerToolset</code> and <code>BrowserToolset</code></td>
<td>Your driver, on a browser or desktop you run, or a partner sandbox such as Daytona or E2B Desktop.</td>
<td>API guide re-read November 7, 2026. Samples use <code>gpt-6-astra</code> and <code>gpt-6.1-sol</code>. The page says you need a model that supports the computer tool.</td>
<td>Isolate the environment. Confirm purchases, destructive changes, and typing secrets. Bound the steps, the time, or the cost.</td>
</tr>
<tr>
<td>OpenAI Agents API, hosted browser</td>
<td>OpenAI hosts the browser. The computer-use page points to a separate Agents API guide for this path.</td>
<td>That separate guide. The computer-use page does not list plan names for it.</td>
<td>The safety section on the computer-use page still says to confirm hard-to-reverse actions and to bound the run.</td>
</tr>
<tr>
<td><a href="/directory/gemini">Gemini API</a> Computer Use</td>
<td>Your client. Google recommends a sandboxed virtual machine, a container, or a separate browser profile.</td>
<td>Read November 7, 2026, at the AI Studio address. The older <code>ai.google.dev</code> address redirected there. A request on November 6 had returned HTTP 500. The changelog, re-read November 7, still dates general availability to October 30, 2026, on the Interactions API and the GenerateContent API. The model list names Gemini 4 Argon, Gemini 3.8 Flash as the recommended model, Gemini 3.5 Flash-Lite, and Gemini 3 Flash Preview.</td>
<td>Browser, mobile, and desktop for Gemini 4 and Gemini 3.x. The client executes the action. Payments can be blocked or sent for confirmation. Google says the feature can contain errors.</td>
</tr>
</tbody>
</table>
</div>

Tencent's Hy4 release sits on its own page. The sourced account is [Tencent releases Hy4 with image understanding and computer use](/blog/tencent-releases-hy4-with-computer-use). Tencent’s English announcement, re-read November 6, 2026, still says Hy4 can use a command line and a graphical interface, still places the weights and a system card in the coming days, and says Hy4 Flash is scheduled for release soon. This table stays with the desktop products and the API guides checked for the rows above.

## What does Claude computer use require?

Anthropic's article says computer use in Claude Cowork and Claude Code is a research preview for Claude Pro, Max, and Ultra. It runs on macOS and Windows. You enable it in the desktop app settings, and the desktop app has to be awake and running. After that, Anthropic says Claude can open files, use the browser, and run dev tools without further setup. Complex tasks sometimes need a second try.

Dispatch, described in the same article, keeps one conversation going between the phone and the desktop. You can assign a task from the phone. Claude can keep working while you are away, for example on a morning briefing or a pull request. The awake rule still applies: the desktop app has to be running. You can stop Claude at any point. The article says the system scans model activations for prompt injection, and that some apps are off-limits by default. The recommendation on the page is to start with apps you trust and to keep sensitive data out of the task.

## What does the ChatGPT desktop app require?

OpenAI's desktop page, re-read November 7, 2026, says Computer Use is available on macOS and Windows with ChatGPT Work and Codex, in supported regions. Setup is Settings, then Computer use. Under Control, find Any App. If the row says Install, follow the prompts. If the switch is off, turn it on. If the app shows a Computer Use plugin page instead, follow that page. If Any App is missing, separate controls for a browser or one app do not grant access to other desktop apps. In a managed workspace, an administrator decides whether Computer Use is allowed. You switch the app to Work or select Codex, and you turn on control for the apps ChatGPT may use. During a task, ChatGPT asks before it uses an app. An app you mark Always allow can be used later without a fresh prompt. You can remove that grant in the same settings screen. On Windows, the page says those saved decisions live in `$CODEX_HOME/config.toml`, under `computer_use.windows`, in `always_allowed_app_ids`. A task can start by mentioning `@Computer` or an app name, or by asking ChatGPT to use Computer Use. If the target app has a plugin or an MCP server, the page says to prefer that for data access and for operations you want to repeat.

On a Mac, ChatGPT needs Screen Recording permission so it can see the app, and Accessibility permission so it can click and type. A scoped task can run in the background while you work elsewhere. Locked use is a separate switch. Enabling it installs an Apple authorization plug-in that participates in the macOS unlock flow. After you enable it, a task started from a connected device can continue once the Mac locks. OpenAI says that unlock is limited to an active Computer Use turn, that ChatGPT covers the displays while the desktop is temporarily unlocked, and that local keyboard or pointer input locks the Mac again.

On Windows, Computer Use runs on the active desktop and takes the foreground. It cannot keep working in the background while you use that same Windows session. If the task should continue while you step away, OpenAI says to leave the device unlocked and online, check it from a phone, or run the desktop app inside a Windows virtual machine so the agent takes over the virtual machine.

The page says the feature cannot automate terminal apps or ChatGPT itself, and that it cannot authenticate as an administrator or approve the operating system's own security prompts. For a difficult task that depends on screenshots, OpenAI says to choose GPT-6 Astra when that model is in the selector. For a web app you are building locally, the page says to use the built-in browser first.

## What do the API pages require?

The API pages agree on the split. The model proposes the action. Your code performs it.

Anthropic's quick start adds `computer_toolset_20260801` to a Messages API request and uses no beta header. On November 7, 2026, the availability table still lists that toolset as available for Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, Claude Mythos 5, Claude Mythos Preview, Claude Opus 5.5, Claude Opus 5, Claude Sonnet 5.5, Claude Sonnet 5, Claude Haiku 5.5, and Claude Opus 4.8 on the Claude API and on Google Cloud. The AWS, Bedrock, and Microsoft Foundry available row names the same models except Mythos Preview. The beta row names Claude Haiku 4.5, Claude Opus 4.7, Claude Opus 4.6, Claude Sonnet 4.6, Claude Opus 4.5, and Claude Sonnet 4.5. The same table says the toolset is not available in Claude Managed Agents. Your application runs every call. Anthropic's precautions are a dedicated virtual machine or container, no sensitive logins in that environment, an allowlist of domains, and a person confirming consequential actions.

OpenAI's guide offers three starts. Screenshots plus mouse and keyboard go through `ComputerToolset`. Page text, controls, and tabs go through `BrowserToolset`, with your driver exposing the operations you allow. A browser hosted by OpenAI is the Agents API path, documented separately. Partner environments named on the page include Browserbase, Browser Use, Daytona, and E2B Desktop. The page says to set a session timeout, to close the session even when the run fails, and to restrict which sites the session can reach.

Google's changelog, re-read November 7, 2026, still says Computer Use reached general availability on October 30, 2026, on the Interactions API and the GenerateContent API. The Computer Use guide on AI Studio, read the same day, lists Gemini 4 Argon, Gemini 3.8 Flash, Gemini 3.5 Flash-Lite, and Gemini 3 Flash Preview. The code samples use `gemini-3.8-flash`, and the page calls Gemini 3.8 Flash the recommended model for computer use. Gemini 4 and Gemini 3.x can target a browser, a mobile device, or a desktop. The action tables print coordinates as integers from 0 to 999. A code sample on the same page scales those coordinates from a 1,000 by 1,000 grid, and one helper’s comment says the normalized range runs from 0 to 1,000. The reference implementation linked from the page is a Docker sandbox you run yourself. The older `ai.google.dev` Computer Use address redirected to this AI Studio page on November 7. A request on November 6 had returned HTTP 500.

## What safety rules do the vendors publish?

Computer use reads pixels and then changes a machine. The pages checked for this guide publish the same four controls, with different wording.

### Where should the actions run?

Put the actions in a [sandbox](/glossary/sandbox). Anthropic's API page says to use a dedicated virtual machine or container with minimal privileges. OpenAI's API page says to use an isolated browser or virtual machine, and an allowlist of sites and actions. Google's page says to use a sandboxed virtual machine, a container, or a dedicated browser profile with limited permissions, so the agent stays off the host system.

The desktop products are the exception you opt into. Claude Cowork, Claude Code, and the ChatGPT desktop app are built to operate the computer in front of you. Their pages still tell you to limit which apps are in scope and to keep sensitive apps closed unless the task needs them.

### Who has to agree first?

A [guardrail](/glossary/guardrail) is the check that allows, blocks, or pauses an action.

Claude's product article says Claude asks for your explicit permission first, and that it requests permission before it opens a new application. You can stop it at any point. ChatGPT asks before it uses an app on your computer, and it may also ask before a sensitive or disruptive action. Always allow is a saved grant for an app you trust. Workspace administrators can restrict which apps are available and whether those saved grants are allowed.

On the APIs, the check is yours to implement. Anthropic says to ask a person to confirm decisions with real-world consequences, including accepting cookies, completing a financial transaction, or agreeing to terms. A batch of actions can finish that sequence inside one model turn, so the check has to run before each action, which means before the click that sends the money. OpenAI says to keep the user in control of purchases, data transmission, destructive changes, and other actions that are hard to reverse. Typing sensitive information into a form counts as transmission. Google returns a safety decision on the function call. `require_confirmation` means your application prompts the person. A blocked action means the client stops. Google also says that even if you disable a safety policy, the model may still ask for confirmation, and your application should handle that decision every time.

### What about payments, passwords, and other hard-to-undo steps?

The pages treat money and secrets as a person-in-the-loop problem.

Anthropic's product article says computer use is still early, that Claude can make mistakes, and that you should avoid sensitive data. The API page lists financial transactions among the actions to confirm, and it says to avoid giving the model account logins.

OpenAI's API page puts purchases and typed secrets on the confirm list, and it says to bound the run with a step limit, a time limit, or a cost limit, and to check the real outcome rather than trust only the model's last sentence. The ChatGPT desktop page says to stay present for account, security, privacy, network, payment, or credential settings, and to avoid tasks that need secrets unless you are there to approve each step. If ChatGPT uses a browser where you are already signed in, the site can treat the click as yours.

Google's warning says Computer Use may contain errors and security vulnerabilities. The recommendation is close supervision for important tasks, and avoiding the feature for critical decisions, sensitive data, or actions that cannot be corrected. The built-in category `FINANCIAL_TRANSACTIONS` blocks or asks for confirmation on payments, retail checkout, and regulated goods. Other categories cover changing health, financial, or government records, sending messages, creating accounts, deleting or sharing files, cookie banners, and legal terms.

A shopping agent that pays through a checkout integration is a different path, with its own gates. That guide is [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you). A computer-use agent that clicks a store's Pay button is the case these safety sections are describing. Leave that click for a person.

### Why is text on the screen untrusted?

The screen is an input the model will follow. A web page, a document, or an image can contain instructions aimed at the agent. That is prompt injection, and the vendors say so in different words.

Anthropic's API page says Claude can follow commands found in web pages or in images even when they conflict with your instructions. If you use the computer use tools, classifiers scan what the tools return, including screenshots, and steer the model to check that the instruction came from you. Anthropic says that extra scan is a poor fit for some uses with no person in the loop, and that a team can ask support to turn it off. The virtual machine, the allowlist, and the human check still matter when the scan is on. The product article says the desktop feature scans model activations for the same class of attack.

OpenAI's API page says to treat screen content as untrusted. Text in a page, a document, or a tool result cannot grant permission or override the user's instructions. The desktop page says web pages can contain malicious or misleading content, and that you should review website actions as if you were taking them yourself.

Google's page offers prompt-injection detection for Gemini 3.5 Flash-Lite and later models. It is off unless you turn it on. When it is on, Google says it checks a screenshot for hidden instructions, such as a line telling the model to ignore previous commands, and blocks execution when it finds them. The safety best-practices list still asks for a sandbox, an allowlist, and a log of the prompts, the screenshots, the suggested actions, and the actions the client actually ran.

## When is a connector the better tool?

Use a connector when the service has one. The connector returns a field you can check. A click returns a picture, and the model has to interpret the picture correctly, including small text, a changed layout, or a pop-up.

Anthropic's product article puts connectors first and calls screen work slower than a direct integration. OpenAI's desktop page says the same about a plugin or an MCP server: prefer it for data access and for operations you want to repeat, and use Computer Use when the task has to be seen or clicked. For public information that needs no interaction, OpenAI's API guide says to use web search. Google's page is for building an agent that must operate an interface. A catalog call or a payment API is a different tool, and the shopping guide is the place this site covers payment.

[Tool use](/glossary/tool-use) is the general name for all of these calls. Computer use is the member of that family that works in pixels. [Browser use](/glossary/browser-use) is the member that stays on a page. Picking the narrowest tool that can finish the job is the harness decision.

## What should you set up before you turn it on?

1. Name the machine that will receive the clicks. A spare virtual machine is the setup the API pages recommend. Your everyday desktop is the setup the Claude and ChatGPT apps are offering, and it deserves a shorter allowlist.
2. Turn on the product switch and the operating-system permissions that page names. For ChatGPT on a Mac, those are Screen Recording and Accessibility. For Claude, the desktop app has to be awake.
3. Allow specific apps. Claude asks before a new app, and some apps start off-limits. ChatGPT asks before an app unless you have saved Always allow. An API driver should expose only the actions the task needs.
4. Write down the steps that wait for a person. Payments, passwords, sending a message, deleting files, and accepting terms are the examples on these pages.
5. Prefer the connector, the plugin, or the built-in browser when the task does not need the whole desktop.
6. Keep a stop control, and read the result in the app itself. OpenAI's API page says to check the outcome on the screen, which means the model's closing sentence is a report.

The [task performance](/topics/task-performance) topic is the shelf for computer use, coding agents, and other jobs an agent finishes. [How agents work](/topics/how-agents-work) is the loop in general. [Harnesses](/topics/harnesses) is the workshop around the model. [New AI tools and SaaS](/topics/tools-saas) is the shelf for the products.

## Where can you read more on this site?

- Glossary: [computer use](/glossary/computer-use), [browser use](/glossary/browser-use), [sandbox](/glossary/sandbox), [harness](/glossary/harness), [tool use](/glossary/tool-use), [guardrail](/glossary/guardrail), [autonomy](/glossary/autonomy), [agent](/glossary/agent), [Model Context Protocol](/glossary/model-context-protocol)
- Guides: [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness), [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness), [What is an AI employee?](/blog/what-is-an-ai-employee), [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you)
- News: [Tencent releases Hy4 with image understanding and computer use](/blog/tencent-releases-hy4-with-computer-use)
- Directory: [Claude](/directory/claude), [Claude Code](/directory/claude-code), [ChatGPT](/directory/chatgpt), [Gemini](/directory/gemini)
- Topics: [task performance](/topics/task-performance), [how agents work](/topics/how-agents-work), [harnesses](/topics/harnesses), [tools and SaaS](/topics/tools-saas)

## Frequently asked questions

### Can an AI agent use my real desktop?

Yes, in the desktop products re-read on November 7, 2026. Claude Cowork and Claude Code can point and click on a Mac or Windows PC while the desktop app is awake. That feature is a research preview for Claude Pro, Max, and Ultra. The ChatGPT desktop app can operate a Mac or Windows interface for ChatGPT Work and Codex, in supported regions, and only in the apps you allow. The Anthropic and OpenAI API guides describe a browser or machine your code controls, and they recommend keeping it isolated from the computer that holds your passwords. Google’s Computer Use guide loaded the same day on AI Studio. A request to the older address on November 6 returned HTTP 500.

### Do I need to approve each click?

You approve access, and you should approve anything that is hard to undo. Claude's product article says Claude asks for explicit permission first and before it opens a new app. ChatGPT asks before it uses an app, with an optional Always allow for later tasks, and it may also ask before a sensitive action. On the APIs, a model can propose several clicks in one turn. Anthropic, OpenAI, and Google each say a person confirms purchases and other consequential actions before they run.

### Is computer use the same thing as an agent harness?

Computer use is a tool. The [harness](/glossary/harness) is the software around the model: the loop, the tools, the memory, the permissions, and the stop rule. The harness offers computer use, runs the click inside a [sandbox](/glossary/sandbox), and brings the new screen back. An [agent](/glossary/agent) is the model plus that harness. The longer account is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness).

### How do Claude, OpenAI, and Gemini compare for computer use?

Claude's desktop feature is a research preview in Cowork and Claude Code, on macOS and Windows, for Pro, Max, and Ultra. ChatGPT's desktop app offers Computer Use on macOS and Windows with Work and Codex. Anthropic and OpenAI document an API where your application executes the action. On November 7, Anthropic’s availability table still lists `computer_toolset_20260801` as available for a current set that includes Claude Fable 5.1, Claude Opus 5.5, Claude Sonnet 5.5, Claude Haiku 5.5, and Claude Opus 4.8, and as beta for an older set. It is not available in Claude Managed Agents. Google's changelog, re-read the same day, dates general availability to October 30, 2026. The Computer Use guide itself loaded on AI Studio. The table above has the limits from each read.

### Is computer use reliable enough for money or passwords?

The pages checked here say to keep a person on those steps. Anthropic says the desktop feature is still early compared with coding and text, and says to avoid sensitive data. OpenAI says to confirm purchases and the typing of secrets, and the ChatGPT page says to stay present for payment and credential settings. Google says the feature can contain errors, and its payments category can block a retail checkout or ask for confirmation. A checkout integration with its own gate is the shopping guide, [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you).

### When should I use a connector instead of clicking the screen?

Use the connector, plugin, or API when the service has one. Anthropic says Claude tries a connector first, and that the screen is slower than a direct integration. OpenAI's desktop page says to prefer a plugin or MCP server for repeatable data access, and to use Computer Use when the task has to be seen or clicked. A click is the fallback for a job that only exists as a graphical interface.

### Does my computer have to stay awake?

For Claude's desktop feature, the app has to be awake and running, including when Dispatch assigns the task from your phone. ChatGPT on Windows uses the active desktop and takes the foreground. On a Mac, ChatGPT can run a scoped task in the background, and locked use, after you enable it, can continue a task once the screen locks. An API agent keeps going only while the browser, virtual machine, or desktop you attached is still running.
