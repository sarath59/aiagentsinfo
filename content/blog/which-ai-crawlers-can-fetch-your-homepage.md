---
title: "Which AI crawlers can fetch your homepage"
description: "Checked 12 November 2026. nytimes.com blocks GPTBot and OAI-SearchBot. github.com allows both on /. example.com has no robots.txt, which RFC 9309 treats as allow-all."
absoluteTitle: true
takeaways:
  - "On 12 November 2026 the robots.txt checker fetched four hosts. aiagentsinfo.com and github.com allow the documented answer, search, and training tokens on /. nytimes.com allows 0 of 2 answer tokens that honor the file, 2 of 8 search tokens, and 1 of 6 training controls."
  - "example.com returned HTTP 404 for /robots.txt. RFC 9309 treats a missing file as allow-all. The checker scored every honoring token allowed, and it did not invent a Disallow."
  - "The Times file names GPTBot, OAI-SearchBot, ClaudeBot, Claude-User, and Claude-SearchBot, each with Disallow: /. Those are separate groups. Blocking the training crawler does not, by itself, block the search crawler. On this file, both are blocked."
  - "ChatGPT-User has Disallow: / at nytimes.com. OpenAI says that fetcher may ignore robots.txt, so the line is not in the answer-fetch score. Claude-User is in the score, and Anthropic says a block stops retrieval."
date: "2026-11-12"
updated: "2026-11-12"
category: guide
topics:
  - tools-saas
  - how-agents-work
audience:
  - builders
companies:
  - openai
  - anthropic
  - google
byline: "AI Agents Info Editorial"
sources:
  - title: "robots.txt checker for AI crawlers (the tool that produced these results)"
    url: "https://www.aiagentsinfo.com/tools/ai-crawler-robots-txt-checker"
  - title: "RFC 9309, Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309"
  - title: "OpenAI, Overview of OpenAI Crawlers (read 12 November 2026)"
    url: "https://developers.openai.com/api/docs/bots"
  - title: "Anthropic, Does Anthropic crawl data from the web? (read 12 November 2026)"
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler"
  - title: "aiagentsinfo.com robots.txt, fetched 12 November 2026"
    url: "https://www.aiagentsinfo.com/robots.txt"
  - title: "github.com robots.txt, fetched 12 November 2026"
    url: "https://github.com/robots.txt"
  - title: "nytimes.com robots.txt, fetched 12 November 2026"
    url: "https://www.nytimes.com/robots.txt"
  - title: "example.com robots.txt, HTTP 404 on 12 November 2026"
    url: "https://example.com/robots.txt"
faq:
  - question: "Which AI crawlers can fetch a homepage?"
    answer: "It depends on that host's robots.txt. On 12 November 2026, aiagentsinfo.com and github.com allowed the documented tokens that honor the file on /. nytimes.com blocked both answer tokens that honor the file, 6 of 8 search tokens, and 5 of 6 training controls. example.com has no robots.txt, so a compliant crawler may fetch."
  - question: "Does blocking GPTBot block ChatGPT search?"
    answer: "No. OpenAI says GPTBot and OAI-SearchBot are independent. The Times file blocks both, in two groups. GitHub's file allows both on /. A block of one is not a block of the other."
  - question: "What does a 404 on robots.txt mean?"
    answer: "example.com returned HTTP 404. RFC 9309 says a crawler may then fetch public URLs. The checker reported allow-all. It did not treat the HTML error page as rules."
  - question: "Does the Times block Claude-User?"
    answer: "Yes. The fetched file has User-agent: Claude-User and Disallow: /. Anthropic says Claude-User honors robots.txt, so that block stops retrieval for a user question. ChatGPT-User is also Disallow: /, and OpenAI says that fetcher may ignore the file."
---

The useful question is not "do we block AI." It is which product token may fetch `/`, and which line in the file decides it.

The [robots.txt checker for AI crawlers](/tools/ai-crawler-robots-txt-checker) fetched four hosts on 12 November 2026. The scores below are what it returned. A token counts in a score only when its operator says the file applies. ChatGPT-User, Perplexity-User, Amzn-User, Meta-ExternalFetcher, Google-Agent, and Google-GeminiNotebook are outside those fractions. Their operators say the fetcher may ignore robots.txt.

## What did four live files actually allow?

Two sites leave the homepage open to every token that honors the file. One names the bots and blocks most of them. One has no file.

| Host | robots.txt | Answer fetches | Search | Training controls | /llms.txt |
| --- | --- | --- | --- | --- | --- |
| aiagentsinfo.com | 200, one redirect to www | 2/2 allowed | 8/8 allowed | 6/6 allowed | 200 |
| github.com | 200 | 2/2 allowed | 8/8 allowed | 6/6 allowed | 200 |
| nytimes.com | 200 | 0/2 allowed | 2/8 allowed | 1/6 allowed | 404 |
| example.com | 404 | 2/2 allowed | 8/8 allowed | 6/6 allowed | 404 |

The answer denominator is Claude-User and DuckAssistBot. The search denominator is OAI-SearchBot, Claude-SearchBot, PerplexityBot, Applebot, Amzn-SearchBot, Meta-WebIndexer, YouBot, and Diffbot. The training denominator is GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, Amazonbot, and Meta-ExternalAgent. AI2Bot and Bytespider stay out of the fractions. Their operator pages do not say the crawler reads robots.txt.

## Why does this site allow /, then block /api/?

aiagentsinfo.com's file, after one redirect to `https://www.aiagentsinfo.com/robots.txt`, gives each named token `Allow: /` and `Disallow: /api/`. The checker matched those groups. On `/`, answer fetches were 2/2, search 8/8, and training controls 6/6. On `/api/`, each of those scores was 0. The longer rule wins, so `/api/` is blocked even though `/` is allowed.

The file has a Sitemap line. `/llms.txt` returned HTTP 200. That file is not a robots rule. Google-Extended being allowed does not change Google Search. Google says the token is a control for Gemini training and grounding, and that it has no separate HTTP user agent.

The checker's fix list, on this file, points at the split OpenAI publishes: GPTBot may train models, OAI-SearchBot is the search switch, and the two are independent. This site currently allows both. That is a choice, not an accident in the parser.

## What does GitHub allow on /, and what does it block on /gist/?

GitHub's file puts GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, and Perplexity-User in one group. That group does not disallow `/`. The checker allowed all of them on the homepage, and it allowed the training controls that are not named, because `User-agent: *` does not disallow `/` either. `/llms.txt` returned HTTP 200. One Sitemap line was present.

The same GPTBot group does disallow `/gist/`. Checked on that path, GPTBot, OAI-SearchBot, Applebot, and Google-Extended were blocked. Bytespider was blocked on `/` and on `/gist/`, by `Disallow: /` in its own group. Bytespider is not in the score. Toutiao's page names the token and does not say it obeys robots.txt.

A shared group is the thing people miss. Those eight tokens follow one set of rules. Editing GPTBot means editing OAI-SearchBot, unless you split them.

## Why is the Times score 0/2, 2/8, and 1/6?

The Times file names the bots and, for most of them, says `Disallow: /`.

OAI-SearchBot, Claude-SearchBot, PerplexityBot, Meta-WebIndexer, YouBot, and Diffbot are each disallowed on `/`. That is 6 of the 8 search tokens. The two allowed search tokens are Applebot and Amzn-SearchBot. Neither is named. They follow `User-agent: *`, and that group does not disallow `/`. Apple's page says that if the file skips Applebot and names Googlebot, Applebot follows the Googlebot group. On this file those two agents share a group, and that group also allows `/`. The checker printed both facts.

Claude-User and DuckAssistBot are disallowed on `/`. That is the 0/2. Anthropic says a Claude-User block stops retrieval for a user question. ChatGPT-User is also `Disallow: /`, and OpenAI says robots.txt may not apply to it, so it is not in the 0/2.

GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, and Meta-ExternalAgent are disallowed on `/`. Amazonbot is the 1 of 6. Its group does not disallow `/`. It disallows `/wirecutter/`. On that path the checker blocked Amazonbot and still blocked GPTBot, because GPTBot's rule is the whole site.

`/llms.txt` returned HTTP 404. The file has 25 Sitemap lines. A missing llms.txt does not change the robots rules.

## What happens when the file is missing?

example.com returned HTTP 404 for `/robots.txt` and for `/llms.txt`. The body was HTML. The checker did not parse that HTML as rules. It treated the status as a missing file. RFC 9309 then lets a crawler fetch public URLs, so every honoring token was allowed. There was no Sitemap line, because there was no file.

A 404 is not a polite block. It is the opposite. If you want training crawlers out, you have to publish a file that names them.

A 5xx would have gone the other way. RFC 9309 says an unreachable robots.txt is a complete disallow until a fetch works. This run did not hit a 5xx.

## What should you publish if you want search in and training out?

Use separate groups. Allow OAI-SearchBot, Claude-SearchBot, and PerplexityBot if you want those indexes. Disallow GPTBot, ClaudeBot, Google-Extended, and Applebot-Extended if you want out of those training uses. Repeat any path you care about inside each allowed group. A named group does not inherit `User-agent: *`.

Do not expect the file to stop ChatGPT-User, Perplexity-User, or Google-Agent. The operator pages say those fetches may ignore it. robots.txt is a request. It is not access control, and an allow is not a citation.

The checker that produced this page is the [robots.txt checker for AI crawlers](/tools/ai-crawler-robots-txt-checker). It can fetch another host, or take a paste, or write the split above. The host is not stored. The week of fetches behind the "who is even asking" question is the [November 2026 answer-crawler report](/reports/ai-answer-crawlers-november-2026).
