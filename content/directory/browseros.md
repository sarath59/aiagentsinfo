---
name: BrowserOS
title: "BrowserOS: free browser your agents drive"
absoluteTitle: true
vendor: BrowserOS
website: https://browseros.com
logo: /logos/browseros.png
summary: "BrowserOS neo is a free, open-source browser that Claude Code, Cursor, and Codex drive with your real logins. You bring the model keys. Sessions stay on your machine."
category: ai-agents
tags:
  - browser
  - agents
  - open-source
  - yc
pricing:
  - free
  - open-source
useCases:
  - agents
audiences:
  - builders
features:
  - Free under AGPL-3.0. You bring your own model keys
  - One-click MCP install for Claude Code, Cursor, Codex, VS Code, and Copilot
  - Agents use your logged-in accounts and run in their own tabs
  - Session replay is a video on disk. YC Summer 2024
pricingSummary: "On browseros.com, read twice on 2026-11-14: BrowserOS neo is free. The FAQ says it is open source under AGPL-3.0 and you bring your own AI provider keys. No consumer subscription is listed. Enterprise is a mailto to founders@browseros.com with no public price. The original BrowserOS browser is also described as free on browseros.com/open-source-ai-browser/."
startingPrice: $0
billingPeriod: monthly
pricingPageUrl: https://browseros.com/
socials:
  github: https://github.com/browseros-ai/BrowserOS
lastVerified: "2026-11-14"
newThisWeek: true
---

BrowserOS neo is a second browser, built so an agent can click, type, and read while signed in as you. Searches for browseros download, browseros github, and browseros neo are this product. Browserosaurus, which also appears in autocomplete, is a different Mac app that only picks which browser opens a link. It is not this one.

The homepage, read twice on 2026-11-14, says you import Chrome logins in one click, connect an agent, and hand it web tasks. The agents named on the page are Claude Code, Claude Cowork, Codex, Cursor, VS Code, Zed, GitHub Copilot, OpenClaw, and Hermes. Anything else that speaks MCP connects with a URL. The install board is one click for the named tools. There is no config file to paste for those. The FAQ says BrowserClaw is the old name of BrowserOS neo. The same browser, the same project. The GitHub repository and the MCP server name may still say BrowserClaw.

Y Combinator lists the company as BrowserOS, Summer 2024, an open-source agentic browser. The homepage says it is backed by Y Combinator and prints "13,000+ stars on GitHub." The source link on the page is github.com/browseros-ai/BrowserOS. The license on the FAQ is AGPL-3.0. A GitHub software citation on the repository names Nithin Sonti, Nikhil Sonti, and the BrowserOS team, with copyright 2026 Felafax, Inc. That citation is the repository's own bibtex, not a press bio.

## What the agent can do

The homepage splits the job into four pieces, all described as shipped.

Signed in as you. BrowserOS neo is a separate browser from your daily Chrome. Agents work in it with the sessions you imported, including Gmail, GitHub, and X. The page also names a bank as an example of a logged-in site. Your main browser tabs are not the workspace. Each agent opens its own tabs. The FAQ says an agent cannot close the document you are writing or steer the tab you are using. Per-agent profile isolation, so two agents do not share logins, is described as on the roadmap, not shipped. Today they share the logins in this browser. That is the point of the product and also the risk.

Fewer tokens. The agent gets a compact page snapshot instead of raw HTML, and it can batch actions in one call. The page contrasts that with a Chrome extension that ships the whole page.

Many agents at once. A cockpit on the new-tab page shows which agent is on which site and how many steps it has taken. Tabs are grouped per agent. Codex and Claude Code can run different tasks at the same time.

Replay. Every session is saved as a scrubbable video on your disk, plus an action log. The FAQ says session history, screenshots, replays, and settings are local files. Nothing is sent to a dashboard BrowserOS owns. The browser is not a cloud browser and not a headless driver.

Platforms on the FAQ: macOS, Windows, and Linux x64. Linux builds are AppImage and DEB. System requirements match Google Chrome. A Homebrew line is published for the Mac cask: `brew tap browseros-ai/tap` and `brew install --cask browseros-neo`. The "get started" block on the homepage highlights Mac and Windows downloads. Linux is in the FAQ and the download notes, so check the download page if you are on Linux rather than assuming the hero buttons are the full set.

## Two browsers, one project

The page at browseros.com/open-source-ai-browser/, also read 2026-11-14, separates two free AGPL products. BrowserOS neo is the browser your existing agent drives over MCP. BrowserOS, without the neo name, is the human browser with agents built in: you type a task and it clicks. You do not have to install both. Neo is enough if Claude Code or Cursor is already your agent. The comparison table on that page says both run locally, you bring your own model or a local model, and the closed browsers it names (Perplexity Comet, ChatGPT Atlas, Dia) do not give you the source or your own model keys.

The neo homepage comparison is against agent-browser, Browser Use, Dia, and Perplexity Comet. The claims in BrowserOS's own table: it works with your agent, uses your real logins without extra setup, keeps browsing data on the machine, can run many agents, lets you keep browsing, and can replay the session. It does not claim to be the only daily browser. The FAQ says it can replace Chrome, and also says it is a secondary browser so your main window stays yours. Read that as two modes, not one promise.

## Pricing

There is no paid consumer plan on the pages read 2026-11-14. The price line on the homepage is "Free!" The FAQ answer is: yes, completely free, AGPL-3.0, bring your own provider keys. The model bill is yours, at whatever Claude, OpenAI, or local runtime you already pay. Enterprise is an email to founders@browseros.com. No seat price is printed. Do not invent one.

## Best for

A developer who already pays for Claude Code, Cursor, or Codex and wants that agent to use sites where it is logged in, with a replay when the run looks wrong.

## Watch out for

The agent shares your logins. A bad instruction can act as you on Gmail, GitHub, or a bank until you stop it. Isolation between agents is not shipped. The MCP server only helps while the browser is open on your machine. This is not a hosted browser you can call from a server. AGPL-3.0 covers the source. If you ship a modified network service, read that license before you assume a private fork is free. The homepage star count ("13,000+") is the site's own figure. Autocomplete also surfaces browseros android. The FAQ platforms are macOS, Windows, and Linux x64, not a phone app.

## Alternatives

[Browser Use](/directory/browser-use) is the library people use to script a browser from Python. It does not import your Chrome profile the way neo does. [Claude Code](/directory/claude-code), [Cursor](/directory/cursor), [Codex](/directory/codex), and [Cline](/directory/cline) are the agents that can sit on the other side of the MCP connection. They are not browsers. [Perplexity](/directory/perplexity) is a research product. BrowserOS's own table names Comet as a closed browser, which is a different product from the Perplexity listing here.

## Revenue

No Stripe or TrustMRR page was found for BrowserOS on 2026-11-14. Revenue is omitted. The company is YC Summer 2024. That is a batch, not a revenue figure.

Last verified November 14, 2026.
