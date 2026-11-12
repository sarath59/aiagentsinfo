---
title: "Which AI video generators can an AI agent call in November 2026? A 10-second Pika clip is $0.20"
description: "Pika’s public catalog prices H3 Flex at $0.02 a second at 768p, which is $0.20 for 10 seconds. Sora’s Videos API shut down on September 24, 2026. FreeGenVideo publishes no API."
date: "2026-11-12"
updated: "2026-11-12"
type: original-report
topics:
  - tools-saas
  - harnesses
  - how-agents-work
  - research
companies:
  - google
  - openai
  - runway
contentLicense: true
absoluteTitle: true
dataset:
  title: "Video API prices an agent can call, read November 12, 2026"
  description: "List prices copied on November 12, 2026 from Google’s Gemini API pricing page, Google Cloud’s Veo pricing table, OpenAI’s deprecations page, Runway Dev’s pricing guide, Kling’s video price page, MiniMax’s pricing and rate-limit pages, Pika’s public catalog, Luma’s Agents API pricing and usage guides, and the FreeGenVideo homepage. A 10-second figure marked computed is seconds times the published per-second rate, or credits times the published list rate. It is not a bundle price the vendor printed, except where the note says the vendor printed it."
  isBasedOn: "https://api.dev.pika.art/catalog/apis"
abstract: |
  An agent can call a video model only when the vendor publishes an API, a price, and a duration you can set. On November 12, 2026, Pika’s public catalog prices its own H3 Flex text-to-video at $0.02 an output second at 768p. Ten times that rate is $0.20. Google’s Gemini API page prices gemini-omni-1.2-flash at about $0.07 a second of 720p video and prints about $0.70 for a 10-second clip. Runway Dev lists Gen-4.5 at 12 credits a second, and a credit is $0.01, which computes to $1.20 for 10 seconds.

  Sora is not in that comparison. OpenAI’s deprecations page says the Videos API and the sora-2 snapshots were removed on September 24, 2026, with no replacement named. Vertex AI still lists Veo 3.1, at $0.40 per count for video plus audio at 720p or 1080p, and the model page lists lengths of 4, 6, or 8 seconds. The price table does not say a count is a second, so this note does not turn $0.40 into a 10-second bill. Luma’s current Agents API prices Ray 3.2 at 300 credits for 10 seconds of standard 720p video. The usage guide’s default list rate is $0.003 a credit, which computes to $0.90, and only when the account has no contract rate. FreeGenVideo’s homepage offers one free browser video a day and does not publish an API.
whyItMatters: |
  The directory page people are already opening, FreeGenVideo, is a browser generator. A harness that “calls” it is a person, or a computer-use loop burning a one-a-day guest allowance. The bill that belongs in a tool description is a per-second rate you can multiply and then check against the invoice.

  The practical split is the tool you wire. Runway’s MCP page tells an agent to paste https://mcp.runwayml.com/mcp and sign in. It bills Runway credits the way the Runway app does. The Dev API publishes a separate price, $0.01 a credit. The MCP page does not say those two balances are the same pool. A harness you control should call one REST model, pass the duration, and eval the returned length against the length you bought. Leaving sora-2 in the tool list calls a model OpenAI has removed.
keyFindings:
  - "Pika’s unauthenticated catalog, GET https://api.dev.pika.art/catalog/apis on November 12, 2026, prices pika/pika-h3-flex/text-to-video at $0.02 per output second at 768p. The operation description says 3 to 15 seconds, billed per output second. 10 × $0.02 = $0.20, computed on this page."
  - "Google’s Gemini API pricing page prices gemini-omni-1.2-flash video output at $12.00 per million tokens and says 5,792 tokens per second of 720p video is about $0.07 a second, about $0.70 for a 10-second clip. Free tier for that model is Not available. gemini-omni-1.1-flash is about $0.10 a second at 720p until December 3, 2026, when requests route to 1.2 and bill at 1.2 rates."
  - "OpenAI’s deprecations page says the Videos API, sora-2, sora-2-pro, and the dated snapshots shut down on September 24, 2026. The recommended replacement column is empty. The retained video guide says the same shutdown and that no one-to-one replacement API is available."
  - "Runway Dev’s pricing guide says credits are $0.01 and gen4.5 is 12 credits per second. 12 × $0.01 = $0.12 a second, and 10 × $0.12 = $1.20, both computed here. Runway’s MCP page, read the same day, says to paste https://mcp.runwayml.com/mcp, that no API key is required, and that MCP uses your Runway credits just like the Runway app."
  - "Vertex AI lists Veo 3.1 video-plus-audio at $0.40 per count for 720p and 1080p. The Veo 3.1 model page lists video lengths of 4, 6, or 8 seconds. A 10-second Veo clip is not a length on that page, and the count is not defined as a second. Kling’s own API prices Kling 4.0 with no input video at ¥1.0 a second at 720p. MiniMax-H3 at 768P is $0.08 a second, with a 300 request-per-minute cap and 30 tasks in flight."
methodology: |
  The set was fixed before the prices were read: Google Veo on the Gemini API and on Vertex, OpenAI Sora, Runway, Luma, Kling, Pika, MiniMax Hailuo, and FreeGenVideo because it is the free generator in this site’s directory that people are already opening. A reseller price is labeled as a reseller price. Kling’s yuan rate is Kling’s. Kling’s dollar rate on Runway Dev is Runway’s.

  Each vendor page was fetched on November 12, 2026. Pika’s prices are the sell_usd fields on the public catalog, which Pika’s own docs say is the runtime source of truth and which does not require an API key. A 10-second cost is printed only when the vendor states a per-second rate and a 10-second duration is inside the length the same page allows. The multiplication is labeled computed. Where the unit is a count, or the page has no price, the 10-second cell says so.

  Official MCP means a server the vendor documents, with a URL. A documentation host’s own MCP toggle is not a video tool. Rate limits are copied only when the vendor’s page states a number.
limitations:
  - "A catalog sell_usd is the price the public catalog returned. It is not a quote for a signed-in org, a volume contract, or a membership tier this note did not open."
  - "Google’s $0.70 for 10 seconds of Omni Flash 720p is the approximation printed on the pricing page, from 5,792 tokens a second at $12.00 per million tokens. A different resolution, an input image, or upsampling is a different rate. The page also prints $0.023 a second at 360p, $0.104 a second for 1080p with upsampling, and $0.209 a second for 4K with upsampling."
  - "Vertex’s Veo table says $0.40 per count and does not define the count in the Veo section. This note does not treat that count as a second and does not multiply it by 8 or by 10."
  - "Kling’s prices are in yuan on the Chinese-language price page. This note does not convert them to dollars. A 10-second bill of ¥10 assumes output_duration comes back as 10 and there is no input video. The API says to bill output_duration, not the number you hoped for."
  - "Runway’s models page names gen4.5 and does not state a maximum length. The $1.20 figure assumes the request is accepted at 10 seconds and the 12-credit rate applies for every second. The pricing row does not list a minimum for gen4.5. Other models on that page do."
  - "FreeGenVideo’s homepage and sitemap, fetched November 12, 2026, contain no API path and the homepage text contains no “api”. That is not a survey of every listing in the video category."
  - "Luma’s Agents API pricing page says video rates are subject to change ahead of general availability. The $0.90 figure multiplies 300 credits by the usage guide’s default list rate of $0.003. Use that rate only when the account’s overage_rate is null and no contract sets another rate. A contract can differ."
references:
  - title: "Pika public catalog, November 12, 2026"
    url: "https://api.dev.pika.art/catalog/apis"
    note: "GET with no API key. pika/pika-h3-flex/text-to-video sell_usd per output second: 480p 0.01, 768p 0.02, 1080p 0.035, 2k 0.04, 4k 0.08. Description: 3 to 15 seconds, billed per output second. pika/pika-2.5/text-to-video: 480p 0.02, 720p 0.04, and a separate 1080p tier at 0.06 plus a 1080p duration_s 5 tier at 0.09."
  - title: "Pika API llms.txt, no free generation tier"
    url: "https://dev.pika.art/llms.txt"
    note: "Read November 12, 2026. The catalog is the runtime source of truth for price. There is no free generation tier and no separate test environment. Quotes and balance reads are not charged. A paid balance is required before the first submit."
  - title: "Gemini API pricing, Omni Flash"
    url: "https://ai.google.dev/gemini-api/docs/pricing"
    note: "Read November 12, 2026. The page contains no Veo row. gemini-omni-1.2-flash: free tier Not available, video output $12.00 per 1M tokens, 5,792 tokens per second of 720p, about $0.07 a second, about $0.70 for 10 seconds and about $1.04 for 15 seconds. gemini-omni-1.1-flash: video output $17.50 per 1M tokens, about $0.10 a second at 720p. Effective December 3, 2026, 1.1 requests route to 1.2 and bill at 1.2 rates."
  - title: "Gemini Omni Flash model page"
    url: "https://ai.google.dev/gemini-api/docs/models/gemini-omni-flash"
    note: "Read November 12, 2026. gemini-omni-1.2-flash output video is 3 to 15 seconds at 360p, 720p, 1080p, or 4K, 24 fps. Input token limit 131,072. Latest update November 2026. gemini-omni-1.1-flash output is 3 to 10 seconds and routes to 1.2 on December 3, 2026."
  - title: "Generate videos with Veo 3.1 in the Gemini API"
    url: "https://ai.google.dev/gemini-api/docs/video"
    note: "Read November 12, 2026. The guide still describes Veo 3.1, Veo 3.1 Fast, and Veo 3.1 Lite, with durations of 4, 6, or 8 seconds, and 8 seconds only at 1080p or 4k. The Gemini API pricing page fetched the same day does not list a Veo price."
  - title: "Vertex AI generative AI pricing, Veo section"
    url: "https://cloud.google.com/vertex-ai/generative-ai/pricing#veo"
    note: "Read November 12, 2026. Veo 3.1 video plus audio: $0.40 per count at 720p and 1080p, $0.60 per count at 4k. Video without audio: $0.20 and $0.40 per count. Veo 3.1 Fast video plus audio: $0.10, $0.12, and $0.30 per count at 720p, 1080p, and 4k. Veo 3.1 Lite video plus audio: $0.05 at 720p and $0.08 at 1080p. The Veo section does not contain the words per second."
  - title: "Veo 3.1 on Gemini Enterprise Agent Platform"
    url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate"
    note: "Read November 12, 2026. Model id veo-3.1-generate-001. Video lengths: 4, 6, or 8 seconds. Reference image to video supports 8 seconds. GA, release date November 17, 2025, retirement May 4, 2027 or later."
  - title: "OpenAI deprecations, Sora 2 and the Videos API"
    url: "https://developers.openai.com/api/docs/deprecations"
    note: "Read November 12, 2026. Shutdown date 2026-09-24 for the Videos API, sora-2, sora-2-pro, sora-2-2025-10-06, sora-2-2025-12-08, and sora-2-pro-2025-10-06. Recommended replacement is empty."
  - title: "OpenAI, video generation with Sora"
    url: "https://developers.openai.com/api/docs/guides/video-generation"
    note: "Read November 12, 2026. The guide says the Sora 2 models and Videos API were shut down on September 24, 2026, no one-to-one replacement API is available, and the page is retained for historical reference."
  - title: "Runway Dev, API pricing"
    url: "https://docs.dev.runwayml.com/guides/pricing"
    note: "Read November 12, 2026. Credits can be purchased for $0.01 per credit. gen4.5 is 12 credits per second. gen4_turbo is 5 credits per second. The gen4.5 row does not list a resolution or a minimum. The page says credit costs are documented only there."
  - title: "Runway Dev, models"
    url: "https://docs.dev.runwayml.com/guides/models"
    note: "Read November 12, 2026. gen4.5 is listed as a video model. The page does not state a maximum duration. It also lists Veo 3.1, Kling, and MiniMax H3 as Runway model ids. Those rows are Runway’s resale, not the maker’s price."
  - title: "Runway MCP"
    url: "https://runway.com/mcp"
    note: "Read November 12, 2026. The page says to paste https://mcp.runwayml.com/mcp and sign in with a Runway app account. No API key. MCP uses your Runway credits, just like the Runway app. The cost depends on the model and the resolution. The linked help-center article returned HTTP 403 on this read, so this note does not quote it."
  - title: "Kling video pricing"
    url: "https://klingai.com/document-api/pricing/base/video"
    note: "Read November 12, 2026. Kling 4.0 with no input video is 1.0 credit (¥1.0) per second at 720p and 1.5 credits (¥1.5) per second at 1080p. Kling 4.0 Flash with no input video is ¥0.6 per second at 720p. The page prices in yuan."
  - title: "Kling 4.0 text to video"
    url: "https://klingai.com/document-api/api/video/4-0/text-to-video"
    note: "Read November 12, 2026. settings.duration accepts integers from 3 through 30. If duration is omitted and the prompt names no length, the default is 10 seconds. Bill output_duration from the task response."
  - title: "Kling concurrency rules"
    url: "https://klingai.com/document-api/api/get-started/concurrency-rules"
    note: "Read November 12, 2026. The limit is parallel tasks, tied to the account, model version, and resource pack. The page says the system sets no QPS limit. Over the cap, code 1303, parallel task over resource pack limit. A video task occupies 1 concurrency slot."
  - title: "MiniMax pricing overview, video"
    url: "https://platform.minimax.io/docs/pricing/overview"
    note: "Read November 12, 2026. MiniMax-H3 output: $0.13 a second at 2K and $0.08 a second at 768P. MiniMax-H3-Highspeed: $0.06 at 768P and $0.04 at 480P. MiniMax-H3-Lite: $0.04 at 768P and $0.025 at 480P. The first 5 images on H3 are free. Input video is billed per second at the output resolution. Audio input is free. Legacy Hailuo 2.3 is priced per clip, including $0.28 for a 768P 6-second video and $0.56 for a 768P 10-second video."
  - title: "MiniMax, create video generation task"
    url: "https://platform.minimax.io/docs/api-reference/video-generation-v2-create"
    note: "Read November 12, 2026. MiniMax-H3 supports 768P and 2K, duration 4 to 15 seconds. H3-Highspeed and H3-Lite support 480P and 768P, 4 to 15 seconds, and do not support 2K."
  - title: "MiniMax rate limits"
    url: "https://platform.minimax.io/docs/guides/rate-limits"
    note: "Read November 12, 2026. Video Generation V2, model MiniMax-H3: 300 requests per minute and 30 tasks in flight. Video Generation, Hailuo series: 20 requests per minute, and the in-flight cell is a dash."
  - title: "Luma Agents API, Ray 3.2 pricing"
    url: "https://docs.agents.lumalabs.ai/guides/pricing"
    note: "Read November 12, 2026. Standard dynamic range, type video, 720p: 100 credits per 5 seconds and 300 credits per 10 seconds. 540p is 50 and 150. 1080p is 400 and 1,200. The page says video rates are subject to change ahead of general availability. The dollar value of a credit depends on the account plan or contract."
  - title: "Luma Agents API, usage and credits"
    url: "https://docs.agents.lumalabs.ai/guides/usage"
    note: "Read November 12, 2026. The default list rate is $0.003 per credit, and the page says to use it only when overage_rate is null and no contract sets a rate. Spend in the Luma app or over MCP is not included in GET /v1/usage. The page does not publish an MCP server URL."
  - title: "Luma Agents API, video generation"
    url: "https://docs.agents.lumalabs.ai/guides/videos/generation"
    note: "Read November 12, 2026. Model ray-3.2. video.duration is 5s, 10s, or omitted, and the default is 5s. 10s is rejected with HDR, a start frame, or an end frame."
  - title: "Luma Agents API, rate limits"
    url: "https://docs.agents.lumalabs.ai/guides/rate-limits"
    note: "Read November 12, 2026. RPM and concurrent jobs depend on the plan and are shown in the dashboard and on X-RateLimit-Limit. The 30 RPM timeline on the page is labeled as an illustration, not an allowance."
  - title: "Luma Dream Machine, video generation"
    url: "https://docs.lumalabs.ai/docs/video-generation"
    note: "Read November 12, 2026. The page still documents POST https://api.lumalabs.ai/dream-machine/v1/generations for ray-2 and ray-flash-2, with an example duration of 5s. A banner on the page points current guides at the Luma Agents API. This page states no dollar price."
  - title: "Luma Dream Machine, rate limits"
    url: "https://docs.lumalabs.ai/docs/rate-limits"
    note: "Read November 12, 2026. Build tier: Ray (Video) is 10 concurrent generations and 20 create requests per minute. The Build usage cap is $5,000 a month. The page says it was updated 4 months ago. It does not name ray-3.2."
  - title: "FreeGenVideo homepage and sitemap"
    url: "https://freegen.video/"
    note: "Fetched November 12, 2026. The homepage says the free daily allowance is 1 free video per day and that it resets at 00:00 UTC, with no sign-up or login, in the browser. The fetched homepage text contains no “api”. The sitemap lists the homepage, the terms, and the privacy policy, plus the Chinese alternates. It lists no API path."
citation:
  apa: "AI Agents Info. (2026, November 12). Which AI video generators can an AI agent call in November 2026? A 10-second Pika clip is $0.20. https://www.aiagentsinfo.com/research/ai-video-generators-agents-can-call-november-2026"
  bibtex: |
    @misc{aiagentsinfo2026videoApis,
      title={Which AI video generators can an AI agent call in November 2026? A 10-second Pika clip is \$0.20},
      author={{AI Agents Info}},
      year={2026},
      month={November},
      url={https://www.aiagentsinfo.com/research/ai-video-generators-agents-can-call-november-2026},
      note={Prices read November 12, 2026 from vendor docs and Pika's public catalog. Ten-second costs marked computed are the published per-second rate times 10.}
    }
ledeQuestion: "What does a finished 10-second clip cost an agent?"
ledeAnswer: "On the pages read November 12, 2026, Pika’s catalog is $0.02 a second for H3 Flex at 768p, which is $0.20 for 10 seconds. Google prints about $0.70 for 10 seconds of Gemini Omni Flash at 720p. Luma Ray 3.2 is 300 credits for 10 seconds at 720p, $0.90 only at the default list rate. Runway’s Gen-4.5 computes to $1.20. Sora’s API has been off since September 24, 2026."
faq:
  - question: "Which AI video generators can an AI agent call in November 2026?"
    answer: "Pika, MiniMax, Runway, Kling, Luma’s Agents API, and Google’s Gemini Omni Flash publish an API and a price an agent can put in a tool description. Luma’s Ray 3.2 price is in credits, and the dollar figure depends on the account rate. Vertex AI still lists Veo, priced per count, with lengths of 4, 6, or 8 seconds. Sora’s Videos API shut down on September 24, 2026. FreeGenVideo’s homepage shows no API."
  - question: "How much does a 10-second AI video cost through an API?"
    answer: "Computed from the rates read November 12, 2026, a 10-second text-to-video clip is $0.20 for Pika H3 Flex at 768p, about $0.70 for Gemini Omni Flash 1.2 at 720p on Google’s own example, $0.80 for MiniMax-H3 at 768P, and $1.20 for Runway Gen-4.5. Luma Ray 3.2 standard 720p is 300 credits, which is $0.90 at the default list rate of $0.003 a credit, and only when the account has no other rate. Kling 4.0 with no input video is ¥1.0 a second at 720p, so 10 seconds is ¥10 if the returned duration is 10. Those are not bundle prices the vendors printed, except Google’s about $0.70 and Luma’s 300-credit total."
  - question: "Can an agent still call Sora?"
    answer: "No. OpenAI’s deprecations page, read November 12, 2026, lists September 24, 2026 as the shutdown date for the Videos API and the sora-2 snapshots, and the replacement column is empty. The retained guide says there is no one-to-one replacement API."
  - question: "Does FreeGenVideo have an API an agent can call?"
    answer: "Not on the pages fetched November 12, 2026. The homepage offers 1 free video per day, resetting at 00:00 UTC, in the browser, with no sign-up. The homepage text contains no API, and the sitemap has no API path. A harness cannot tool-call that allowance."
  - question: "Which video generator has an official MCP server?"
    answer: "Runway’s MCP page, read November 12, 2026, says to paste https://mcp.runwayml.com/mcp and sign in with a Runway app account. No API key. It says MCP uses your Runway credits, just like the Runway app. Luma’s usage guide says app spend and MCP spend are outside GET /v1/usage, and it does not publish an MCP URL. This note did not find an official video MCP URL on the Google, OpenAI, Kling, Pika, MiniMax, or FreeGenVideo pages it read."
---

**$0.20.** That is 10 seconds of Pika H3 Flex at 768p, from the per-second price in Pika’s public catalog on November 12, 2026.

Google’s own pricing page prints the next number a harness can paste into an eval without doing the multiplication: about **$0.70** for 10 seconds of `gemini-omni-1.2-flash` at 720p. Runway Dev’s Gen-4.5 row is 12 credits a second at $0.01 a credit, which is **$1.20** for 10 seconds once you multiply. Sora is not a fourth column. The Videos API shut down on September 24, 2026.

[FreeGenVideo](/directory/freegenvideo) is the browser generator people are already opening. It is not in the price table, because the homepage fetched the same day publishes no API. The rest of the [video category](/directory/category/video) is the same kind of question: a listing is a product page until its own docs publish a tool an agent can call. [Runway](/directory/runway) is the one in this set that prints an MCP URL. How a model calls a tool is [tool use](/glossary/tool-use). The wire it plugs into is the [Model Context Protocol](/glossary/model-context-protocol). The six-month MCP calendar is [MCP, the next 6 months](/reports/mcp-next-6-months).

## Which generators publish an API an agent can call?

Pika, MiniMax, Runway, Kling, Luma’s Agents API, and Gemini Omni Flash do. Sora does not. Veo’s Gemini API price is not on the pricing page. FreeGenVideo’s API is not on the homepage.

| Generator | What you call | Price an agent can budget | Length on the same page | Rate limit | Official MCP |
| --- | --- | --- | --- | --- | --- |
| Pika H3 Flex | `pika/pika-h3-flex/text-to-video` | $0.02/s at 768p. 10s computes to $0.20 | 3–15 seconds | Not in the public catalog | Not on the pages read |
| Pika 2.5 | `pika/pika-2.5/text-to-video` | $0.04/s at 720p. 10s computes to $0.40 | 1080p has two catalog rates, so no 10s figure here | Not in the public catalog | Not on the pages read |
| MiniMax-H3 | `MiniMax-H3` | $0.08/s at 768P. 10s computes to $0.80 | 4–15 seconds | 300 RPM, 30 in flight | Not on the pages read |
| MiniMax-H3-Lite | `MiniMax-H3-Lite` | $0.04/s at 768P. 10s computes to $0.40 | 4–15 seconds. No 2K | Not named on the rate page | Not on the pages read |
| Gemini Omni 1.2 | `gemini-omni-1.2-flash` | About $0.07/s at 720p. Google prints about $0.70 for 10s | 3–15 seconds | Not on the model page | Not on the pages read |
| Gemini Omni 1.1 | `gemini-omni-1.1-flash` | About $0.10/s at 720p until December 3, 2026 | 3–10 seconds | Not on the model page | Not on the pages read |
| Runway Gen-4.5 | `gen4.5` on Runway Dev | 12 credits/s at $0.01. 10s computes to $1.20 | Max length not on the models page | Not on the pricing page | Yes. `https://mcp.runwayml.com/mcp` spends app credits |
| Kling 4.0 | Kling’s own API, no input video | ¥1.0/s at 720p. 10s computes to ¥10 | 3–30 seconds. Default 10 | No QPS cap. Concurrency is the resource pack | Not on the pages read |
| Vertex Veo 3.1 | `veo-3.1-generate-001` | $0.40 per count, video plus audio, 720p or 1080p | 4, 6, or 8 seconds | The count is not a rate limit | Not on the pages read |
| Gemini API Veo | The Veo 3.1 guide | No Veo row on the Gemini pricing page | 4, 6, or 8 seconds in the guide | Not priced, so not budgeted | Not on the pages read |
| Sora | Videos API | Removed September 24, 2026 | Not callable | Not callable | Not a current server |
| Luma Ray 3.2 | `ray-3.2` on the Agents API | 300 credits for 10s at 720p standard. $0.90 only at the $0.003 list rate | 5s or 10s. Default 5s | Plan-specific. The 30 RPM example is an illustration | Usage guide mentions MCP and prints no URL |
| Luma Ray 2 | `ray-2` on the Dream Machine API | No dollar price on that page. A banner points at the Agents API | Examples use 5s | Build tier, on the older rate page: 10 concurrent, 20 creates/min | Not on that page |
| FreeGenVideo | The browser | No per-second price | 1 free video a day in the browser | A guest allowance, not RPM | No |

Pika’s docs say the catalog is the price, and that there is no free generation tier. The catalog above was fetched with no API key. MiniMax’s legacy Hailuo 2.3 row is a different unit: $0.56 for a 768P clip of 10 seconds, printed as a clip price, not as a rate this note multiplied. The H3 series is the per-second table.

Kling stays in yuan. Runway Dev also sells Kling under its own credit rates. The `kling_4` row at 720p, with no input video, prints 12.56 credits a second through November 30, 2026 UTC, and a list price of 15.7 credits a second. Runway’s worked example of the rounding is a 5-second 720p clip with no input video at 64 credits during the promotion: round the list charge up, take 20 percent off, and round up again. List prices apply from December 1, 2026 UTC. That 64-credit clip is Runway’s price, not Kling’s ¥1.0. Do not add the two bills.

## What does the 10-second bill assume?

It assumes a text prompt, no input video, and a duration the same page allows. Change any of those and the invoice moves.

Pika H3 Flex at 480p is $0.01 a second, so 10 seconds computes to $0.10. At 768p the catalog says $0.02. The operation text says the clip can run from 3 to 15 seconds and is billed per output second. There is no minimum in that price object. Pika 2.5 at 720p is $0.04 a second both on the plain 720p tier and on the tier marked `duration_s` 5. The 1080p object has $0.06 and, when `duration_s` is 5, $0.09. This note does not pick a 10-second 1080p price out of those two.

MiniMax-H3 at 768P is $0.08 a second of output. Ten seconds computes to $0.80. At 2K the rate is $0.13, and 10 seconds computes to $1.30. The first five images on a task are free, and a text-only call has no image line. Input video is billed again, per second, at the output resolution. Audio input is free. H3-Lite at 768P is $0.04 a second, $0.40 for 10 seconds, and it does not offer 2K. The rate-limit page puts Video Generation V2, model MiniMax-H3, at 300 requests a minute and 30 tasks in flight. The older Hailuo series row is 20 requests a minute.

Gemini Omni 1.2 Flash is the model to name in the tool schema if you want Google’s 10-second example. Video output is $12.00 per million tokens. The footnote says 5,792 tokens per second of 720p video, about $0.07 a second, about $0.70 for 10 seconds, about $1.04 for 15 seconds. Free tier is “Not available.” Output runs from 3 to 15 seconds, at 24 fps, up to 4K. The input token limit is 131,072. That limit is for the prompt and the reference, not a place to paste the mp4 back into the next turn.

`gemini-omni-1.1-flash` is still a separate price on November 12. Video output is $17.50 per million tokens, about $0.10 a second at the same 5,792 tokens. The page says that on December 3, 2026 those requests route to 1.2 and bill at 1.2 rates. A harness that hard-codes 1.1 is buying the dearer second until that date, and then it is buying 1.2 under the old name.

Vertex Veo does not join this 10-second column. The model page lists 4, 6, or 8 seconds. Reference-image video is 8 seconds only. The price table says $0.40 per count for Veo 3.1 video plus audio at 720p or 1080p, and the Veo section never says “per second.” Eight times $0.40 would be a guess. This note does not print it. The Gemini API’s Veo 3.1 guide still describes those 4, 6, and 8 second lengths. The Gemini API pricing page, fetched the same hour, has no Veo row. A tool description that invents a Veo dollar rate is ahead of the page Google is billing from.

Luma’s current call is not the Ray 2 snippet. The Agents API video guide, read November 12, 2026, generates with `ray-3.2`. Duration is `5s`, `10s`, or omitted, and omitted means 5 seconds. A 10-second request is rejected if you also set HDR, a start frame, or an end frame. Standard 720p text-to-video is 100 credits for 5 seconds and 300 credits for 10 seconds. That 10-second total is three times the 5-second total, not two. The pricing page says the dollar value of a credit depends on the plan or contract, and that video rates can change ahead of general availability. The usage guide’s default list rate is $0.003 a credit, and it says to use that rate only when `overage_rate` is null and no contract sets another one. 300 × $0.003 = $0.90, computed here, and labeled as the list rate. A contract can make the same 300 credits a different dollar bill. The rate-limit page does not print a universal RPM. It says the allowance is on the dashboard and in `X-RateLimit-Limit`. The 30 RPM timeline on that page is an illustration.

The older Dream Machine page still shows `POST https://api.lumalabs.ai/dream-machine/v1/generations` for `ray-2` and `ray-flash-2`, with a 5-second example, and a banner that points current guides at the Agents API. That page has no dollar price. Its rate-limit sibling, for the Build tier, lists Ray (Video) at 10 concurrent generations and 20 create requests a minute, and a $5,000 monthly usage cap. The page says it was updated 4 months ago. It does not name `ray-3.2`.

## Which of these can the harness reach through MCP?

Runway’s, with a URL. The page is [runway.com/mcp](https://runway.com/mcp). It says to paste `https://mcp.runwayml.com/mcp` and sign in with a Runway app account. No API key. MCP uses your Runway credits, just like the Runway app, and the cost depends on the model and the resolution.

The Dev API is a different document. There, a credit is $0.01 and Gen-4.5 is 12 credits a second. The MCP page does not say those credits are the Dev API credits, and it does not say an app plan with unlimited generations makes an MCP call free. The help-center article linked from the page returned HTTP 403 on November 12, 2026, so this note does not quote it. A harness that adds the MCP server and also calls `api.dev.runwayml.com` should log which balance moved. Guessing that they are one pool, or two, is ahead of the pages.

Luma’s usage guide says spend in the Luma app, or over MCP, is not in `GET /v1/usage`. It does not print an MCP server URL. No official video MCP URL turned up on the Google, OpenAI, Kling, Pika, MiniMax, or FreeGenVideo pages read for this note. A docs site that offers “copy as MCP” for its own documentation is a documentation tool. It does not generate the video.

## What should a harness wire?

Wire one REST call whose duration you set and whose price you can assert. Put the per-second rate in the tool description. Keep the mp4 out of the context window. Return a URL, the duration, and the cost.

For a 10-second clip with a published dollar rate, the cheapest row in this set at a 720p-class resolution is Pika H3 Flex at 768p, $0.20 computed. MiniMax-H3-Lite at 768P is $0.40 computed. The rate-limit page names MiniMax-H3 at 300 requests a minute and 30 tasks in flight. It does not name H3-Lite or H3-Highspeed, so those two do not inherit that cap on the evidence of this page. Luma Ray 3.2 at standard 720p is $0.90 only if you are allowed to use the $0.003 list rate, and the pricing page says those video rates can change before general availability. Gemini Omni 1.2 is the row to pick when you want Google’s own 10-second example, about $0.70, and you can live with no free tier. Runway Gen-4.5 is $1.20 computed on the Dev API. Use the MCP URL when the team already pays for Runway app credits, and log that balance separately from the Dev API until Runway says they are the same.

Call `gemini-omni-1.2-flash`, not `gemini-omni-1.1-flash`, if the budget is the $0.70 clip. The 1.1 id is about $0.10 a second until December 3. After that date the old id bills as 1.2, so a tool list that mentions both is one model with two names and, until December 3, two prices.

Do not leave `sora-2` in the tool list. The deprecations page names September 24, 2026, and leaves the replacement blank. A retry loop on a removed model is a failed eval that looks like a timeout.

Do not budget a 10-second Vertex Veo clip. Ask for 4, 6, or 8 seconds, and do not multiply $0.40 until Google says what a count is. Do not point a tool call at [FreeGenVideo](/directory/freegenvideo). One video a day, resetting at 00:00 UTC, with no sign-up, is a guest allowance. The homepage fetched November 12 has no API in the text, and the [sitemap](https://freegen.video/sitemap.xml) has no API path.

Kling belongs in the tool list when the invoice can be in yuan. Kling 4.0 with no input video is ¥1.0 a second at 720p, the duration field accepts 3 through 30, and the default when you omit it is 10 seconds. The eval has to read `output_duration`. A prompt that says “make it longer” and returns 15 seconds is a ¥15 charge on that rate, not the ¥10 you wrote in the tool description. Kling sets no QPS limit. The cap is parallel tasks on the resource pack, and the error is code 1303. That is a queueing problem, not a price problem.

The eval is three assertions. The returned duration equals the duration you sent. The billed amount equals that duration times the rate in the tool description, plus any input-video seconds the price page adds. The run stops when the provider returns a shutdown, a missing price, or a count whose unit you cannot name. A pretty clip at the wrong length is a failed task. The token bill for the model that decided to call the tool is a separate meter. That one is the [agent cost calculator](/agent-cost-calculator). It does not include these per-second video rates.

## What is still not a number?

A Luma contract rate, a universal Agents API RPM, a maximum length for Runway Gen-4.5, a Pika request cap, the meaning of a Vertex count, a dollar price for Dream Machine `ray-2`, and a per-second price for FreeGenVideo. Those seven are blank on the pages read November 12, 2026. The priced rows above are the ones a tool description can assert.

The [video category](/directory/category/video) has more browser products than this table. This note did not promote any of them to a tool call. [Submit a listing](/submit) if the product is missing, or claim the page that is already there. A listing with an API still needs the price page linked. A slogan that says “API access” is not a rate.
