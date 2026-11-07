---
title: "Why Tool JSON Costs More Than Your System Prompt (and How to Check It)"
description: "On November 7, 2026 the prompt checker counted a 23-token weather prompt and a 94-token get_weather tool in OpenAI's Responses shape. For gpt-5, with 200 output tokens entered and 20 turns a day, the 30-day figure was $1.28775. The tool text was $0.0705 of that. The page rounds both this result and a 101-token Chat Completions paste to $1.29, so the token split is the number to read."
takeaways:
  - "One get_weather tool in OpenAI's Responses shape was 94 tokens. The system prompt beside it was 23. Both are tiktoken o200k_base counts of the pasted text for gpt-5, from the live checker on November 7, 2026."
  - "At the checker's gpt-5 standard prices, those 94 tokens add $0.0705 over 30 days at 20 turns a day. The 200 output tokens entered for the example are most of the $1.28775."
  - "Claude Sonnet 5.5 has a published tool-use system prompt of 286 tokens for tool_choice auto or none. On the checker's estimate, that published count is larger than the prompt and the schema combined."
date: "2026-11-07"
updated: "2026-11-07"
category: guide
topics:
  - how-agents-work
  - tools-saas
  - harnesses
  - task-performance
audience:
  - everyone
  - builders
companies:
  - openai
  - anthropic
  - claude
byline: "AI Agents Info Editorial"
sources:
  - title: "OpenAI, Function calling (read November 7, 2026)"
    url: "https://developers.openai.com/api/docs/guides/function-calling"
  - title: "OpenAI, API pricing (the price table on this site was read November 5, 2026)"
    url: "https://developers.openai.com/api/docs/pricing"
  - title: "Anthropic, Tool use overview (read November 7, 2026)"
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview"
  - title: "Anthropic, Define tools (schema notes on the checker were read November 6, 2026)"
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools"
  - title: "Anthropic, Claude API pricing (the price table on this site was read November 5, 2026)"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
  - title: "Model Context Protocol, Tools, specification 2025-06-18 (read November 7, 2026)"
    url: "https://modelcontextprotocol.io/specification/2025-06-18/server/tools"
  - title: "OpenAI, tiktoken"
    url: "https://github.com/openai/tiktoken"
  - title: "AI Agents Info, Free agent prompt and tool checker (called November 7, 2026)"
    url: "https://www.aiagentsinfo.com/agent-prompt-checker"
  - title: "AI Agents Info, OpenAI Agents SDK directory page (last verified November 3, 2026)"
    url: "https://www.aiagentsinfo.com/directory/openai-agents-sdk"
faq:
  - question: "Why can tool JSON cost more than the system prompt?"
    answer: "On November 7, 2026 the checker counted the sample weather prompt at 23 tokens and one Responses-shaped get_weather tool at 94 tokens. OpenAI's function-calling guide says callable function definitions are billed as input tokens. The dollar gap depends on the model price. For gpt-5 in this site's price table, those 94 tokens were $0.0705 over 30 days at 20 turns a day."
  - question: "Does the prompt checker store what I paste?"
    answer: "No. The checker page says the server reads the prompt and the tool JSON to count tokens and check the shape, then drops them. Nothing is written to a database, a file, or a log."
  - question: "Is the gpt-5 token count the same number OpenAI will bill?"
    answer: "It is tiktoken's count of the pasted text, using o200k_base, which is the encoding that library assigns to gpt-5. The checker does not add message framing. OpenAI's guide says functions are injected into the system message, so the billed input can differ from the pasted JSON."
  - question: "How is this different from the agent cost calculator?"
    answer: "The cost calculator stays in the browser. You type token counts and it multiplies them by the official prices. The prompt checker sends the text to the server, splits prompt tokens from tool tokens, and checks OpenAI, Anthropic, and MCP shapes."
---

Updated November 7, 2026.

A short system prompt is the paragraph you rewrite. The tool list is the JSON you send again on the next turn. On November 7, 2026 I posted both to the live [prompt and tool checker](https://www.aiagentsinfo.com/agent-prompt-checker). The system prompt was 23 tokens. One `get_weather` tool, in OpenAI's Responses shape, was 94 tokens.

The tool text is a little over four times the prompt. The 30-day dollar gap is smaller than that ratio, and the rounded headline on the page can hide it. The numbers below are the checker's response, with the output length and the daily volume I typed in.

## What was pasted?

The prompt is the sample already on the checker:

> You are a weather assistant. Use get_weather when the user asks about the weather. Do not invent a temperature.

The tool is the page's valid example. [OpenAI's function-calling guide](https://developers.openai.com/api/docs/guides/function-calling), read November 7, 2026, uses this shape for `get_weather`: `type`, `name`, `description`, `parameters`, and `strict` sit on the tool. The guide's own example asks for a location and a units enum. This one asks for a city, which is the example the checker loads.

```json
[
  {
    "type": "function",
    "name": "get_weather",
    "description": "Get the current weather for a city.",
    "parameters": {
      "type": "object",
      "properties": {
        "city": { "type": "string", "description": "City name" }
      },
      "required": ["city"],
      "additionalProperties": false
    },
    "strict": true
  }
]
```

[Tool use](/glossary/tool-use) is the step this JSON buys: the model can call `get_weather`, and the harness sends the result back. One place that ships that step is the [OpenAI Agents SDK](/directory/openai-agents-sdk). The directory page, last verified November 3, 2026, says the SDK uses the Responses API by default when you call OpenAI models, and that those calls are billed at API rates. The SDK docs, read November 7, 2026, describe function tools, handoffs, guardrails, tracing, and sandbox agents as parts of that runtime. They do not print a token price for the tool list. The checker is the page that prices the list you are about to send.

The request was `POST /api/agent-prompt-checker` with `format` set to `auto`, `modelId` set to `gpt-5`, `outputTokens` set to 200, and `tasksPerDay` set to 20. The server returned no schema errors and detected "OpenAI Responses function". The prompt is not stored.

## What did gpt-5 cost for 30 days?

The count used tiktoken `o200k_base`, the encoding that library assigns to gpt-5. The checker says this is a count of the pasted text. It does not add the few tokens of message framing an API request adds.

gpt-5's row in the price table, read November 5, 2026, is $1.25 per million input tokens and $10 per million output tokens on the standard band. The table cites [OpenAI's API pricing](https://developers.openai.com/api/docs/pricing). Cached, batch, flex, and fast prices are not used. I did not re-read that pricing page on November 7. The rates below are the rates the checker applied.

The API returned:

- Prompt tokens: 23
- Tool tokens in the cost: 94
- Input tokens priced: 117
- Per turn: $0.00214625
- 30 days at 20 turns a day: $1.28775

The same prompt with the tool box empty came back as 23 input tokens, $0.00202875 per turn, and $1.21725 over 30 days. The tool JSON is the difference, $0.0705.

The 200 output tokens are the number I entered. The checker does not write a reply. At $10 per million, those 200 tokens are $1.20 of the $1.28775. The tool text is the larger share of the input. The output I entered is the larger share of the money.

The page rounds a 30-day total of $1 or more to the cent, and it rounds a per-turn price under $1 to four decimal places. This result displays as $1.29 and $0.0021 per turn. A Chat Completions paste of the same tool, counted in the next section at 124 input tokens, returned $1.293 and displays as $1.29 as well. Read the token split before you read the rounded headline.

OpenAI's guide says callable function definitions count against the context limit and are billed as input tokens, because the functions are injected into the system message in a syntax the model was trained on. The 94 is the JSON in the box. It is not that injected message. A Responses request can bill a different input count. Use the checker to see the paste, then use the usage object on the real response for the billed count.

Once you already have 117 and 200, the [agent cost calculator](/agent-cost-calculator) is the shorter tool. It stays in the browser and multiplies the counts you type. It does not read a prompt, and it does not validate tool JSON.

## How do the four shapes change the count?

The same city field can be written four ways. The checker looks at the field names. I kept the prompt, the description "Get the current weather for a city.", and the settings: 200 output tokens, 20 turns a day, format auto. gpt-5 rows are tiktoken counts of the paste. The Claude row is an estimate plus a published add-on.

| Paste | Prompt | Tool text | Added input | Input priced | 30-day from the API |
| --- | --- | --- | --- | --- | --- |
| Responses `get_weather`, gpt-5 | 23 | 94 | none | 117 | $1.28775 |
| Prompt only, gpt-5 | 23 | 0 | none | 23 | $1.21725 |
| Chat Completions `get_weather`, gpt-5 | 23 | 101 | none | 124 | $1.293 |
| MCP `get_weather` text, priced as gpt-5 | 23 | 75 | none | 98 | $1.2735 |
| Anthropic `get_weather`, Claude Sonnet 5.5 | 23, estimate | 75, estimate | 286 published | 384 | $1.6608 |
| Three Responses functions, gpt-5 | 23 | 308 | none | 331 | $1.44825 |

### Chat Completions

The older wrapper puts the function under `function`. The checker called it "OpenAI Chat Completions function", counted 101 tool tokens, and included them in the cost. It also returned a warning: the current function-calling guide puts `name`, `description`, and `parameters` on the tool itself for the Responses API.

```json
[
  {
    "type": "function",
    "function": {
      "name": "get_weather",
      "description": "Get the current weather for a city.",
      "parameters": {
        "type": "object",
        "properties": {
          "city": { "type": "string", "description": "City name" }
        },
        "required": ["city"],
        "additionalProperties": false
      },
      "strict": true
    }
  }
]
```

The warning is not a schema error, so the check still succeeded. The guide, read November 7, 2026, says a Responses request tries to rewrite the schema into strict mode when `strict` is omitted, and a Chat Completions request stays non-strict unless `strict` is set. Set `strict` to true or false on purpose. The 7 extra tokens against the Responses paste disappear once the page rounds $1.293 and $1.28775 both to $1.29.

### Anthropic `input_schema`

[Anthropic's tool-use overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview), read November 7, 2026, defines a user tool with `name`, `description`, and `input_schema`. There is no `type: "function"` wrapper. The overview prices a tool-use request as the input tokens sent to the model, including the `tools` parameter, plus output tokens. Server-side tools can add a separate usage fee. This paste is a client tool.

```json
[
  {
    "name": "get_weather",
    "description": "Get the current weather for a city.",
    "input_schema": {
      "type": "object",
      "properties": {
        "city": { "type": "string", "description": "City name" }
      },
      "required": ["city"]
    }
  }
]
```

I priced it as Claude Sonnet 5.5. The checker counted the prompt as 23 and the schema as 75 with tiktoken `o200k_base`, and it labeled both an estimate. Anthropic does not bill with that encoding, so the billed count of the paste can differ.

It then added 286 input tokens. Anthropic's overview lists 286 for Claude Sonnet 5.5 when `tool_choice` is auto or none and at least one tool is sent. The any/tool cell on that row is blank. The checker did not invent a second number. The 286 is Anthropic's published count, not a tiktoken count. I read that table on November 7, 2026. The checker's copy of the table is dated November 6, 2026. Both show 286 for this cell.

The price table, read November 5, 2026, lists Claude Sonnet 5.5 at $2 per million input tokens and $10 per million output tokens. The API returned $0.002768 per turn and $1.6608 over 30 days. The page displays $1.66. Input tokens priced were 384, which is 23 + 75 + 286.

On this row the published tool-use prompt is larger than the system prompt I wrote and larger than the schema. That is the Claude case of the title. The schema's own 75 is the estimate. The 286 is the published figure.

### MCP `inputSchema`

The [MCP tools page](https://modelcontextprotocol.io/specification/2025-06-18/server/tools) for the 2025-06-18 specification, read November 7, 2026, names the argument schema `inputSchema`. The spec's example is also `get_weather`. This paste uses `city` so the words match the other rows. The field name is the part that makes it MCP.

```json
[
  {
    "name": "get_weather",
    "description": "Get the current weather for a city.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "city": { "type": "string", "description": "City name" }
      },
      "required": ["city"]
    }
  }
]
```

On gpt-5 the checker counted 75 tool tokens and priced 98 input tokens. The 30-day figure was $1.2735, which the page displays as $1.27. That is gpt-5's rate applied to the pasted text, so the row can sit next to the OpenAI rows on one encoding. MCP lists tools for a client. The specification does not bill those tools at gpt-5 rates.

## What happens with three short functions?

The single tool already outweighs the prompt. A second paste, still on gpt-5 with 200 output tokens and 20 turns a day, used three Responses functions: current weather, a daily forecast with a `days` integer, and a city geocode. The checker returned no schema errors, 308 tool tokens, 331 input tokens priced, and $1.44825 over 30 days. The page displays $1.45. Against the prompt-only figure of $1.21725, the three functions add $0.231.

```json
[
  {
    "type": "function",
    "name": "get_weather",
    "description": "Get the current weather for a city.",
    "parameters": {
      "type": "object",
      "properties": { "city": { "type": "string", "description": "City name" } },
      "required": ["city"],
      "additionalProperties": false
    },
    "strict": true
  },
  {
    "type": "function",
    "name": "get_forecast",
    "description": "Get a daily forecast for a city.",
    "parameters": {
      "type": "object",
      "properties": {
        "city": { "type": "string", "description": "City name" },
        "days": { "type": "integer", "description": "Number of days, from 1 to 7." }
      },
      "required": ["city", "days"],
      "additionalProperties": false
    },
    "strict": true
  },
  {
    "type": "function",
    "name": "geocode_city",
    "description": "Look up latitude and longitude for a city name.",
    "parameters": {
      "type": "object",
      "properties": { "city": { "type": "string", "description": "City name" } },
      "required": ["city"],
      "additionalProperties": false
    },
    "strict": true
  }
]
```

OpenAI's guide says to keep the number of functions available at the start of a turn small, and to shorten descriptions if you hit a token limit. It offers fewer than 20 functions as a soft suggestion. These three are short, and the tool text is already 308 tokens against a 23-token prompt. A production list with long descriptions is a different paste. Put that paste in the checker. The $0.0705 from the one-tool example does not scale itself.

## What does the checker reject?

I took the valid Responses tool, added an optional `country` string, and left `country` out of `required`. `strict` stayed true. The checker returned an error at `tools[0].parameters.required`: in strict mode every property has to be listed in `required`, and an optional field can use `"null"` as one of its types and still be required. The function-calling guide says the same thing. Strict mode needs `additionalProperties` set to false for each object, and every field in `properties` marked required. The tool text counted as 193 tokens. The cost still included it, with the note that a provider can reject the request before it bills the turn.

The checker's invalid example fails for different reasons. Posted as written, it came back as a Chat Completions tool whose name is `bad name`, whose `parameters` type is `string`, and which omits `description` and `strict`. The checker reported the name pattern, the object-type requirement, the missing description, the missing `strict`, and the Chat Completions warning. The token count still ran. A clean schema and a token count answer different questions. The page shows both.

gpt-5, gpt-5-mini, and gpt-5-nano are the models for which the checker says tiktoken has an encoding. Newer OpenAI ids in the price list, and every Claude, Gemini, and Grok id, are labeled estimates made with `o200k_base`.

## Where does the Agents SDK fit?

The [OpenAI Agents SDK](/directory/openai-agents-sdk) page is the directory entry to read next to this check. Last verified November 3, 2026, it says the Python package `openai-agents` and the TypeScript package `@openai/agents` are MIT licensed, and that OpenAI does not list a separate subscription for the SDK. Model calls go through your API account at API rates. The $1.28775 in the first row is that kind of charge for one pasted tool, an entered reply of 200 tokens, and 20 turns a day. It is not an SDK fee.

The same listing says the SDK runs the loop: tool calls, handoffs, guardrails, sessions, and tracing, including sandbox agents that work inside an isolated workspace. The SDK guide, read November 7, 2026, points function tools and MCP at the platform's tools docs and keeps tracing on the SDK. This checker does not price a handoff, a trace, or a sandbox. It prices the system prompt and the tool JSON on one turn, then multiplies by the turns per day you type.

On the checker, Load a valid example fills this prompt and this Responses tool. It leaves output tokens at 800 and turns per day at 10. The page says those defaults are there so the price is visible, and that they are not a measured workload. To match the table, set output tokens to 200 and turns per day to 20, then run the check. If you already know the token counts, skip the paste and use the [cost calculator](/agent-cost-calculator).

## What the figure leaves out

The 30-day numbers are the checker's multiplication. They leave out the items the checker prints under the price, and two limits that matter for this paste.

- Message framing is not in the count. OpenAI's injected tool syntax is not in the 94.
- No per-call tool fee is added. The OpenAI and Anthropic rows in the price table do not publish one.
- No computer-use fee, search-grounding fee, or code-execution fee is added. Anthropic's overview says some server tools charge on top of tokens. Those rates are not in this table.
- The Claude counts of the pasted prompt and schema are tiktoken estimates. The 286 is the published tool-use system prompt for auto or none.
- Output tokens are the number entered. This check did not call gpt-5 or Claude and did not count a reply.
- The prompt and the tool JSON are not stored.
