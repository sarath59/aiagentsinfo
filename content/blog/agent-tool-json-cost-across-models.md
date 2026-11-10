---
title: "MCP Tool JSON Cost Across Models: Counts vs Estimates"
description: "On November 9, 2026 the prompt checker priced one three-tool support list at 200 output tokens and 40 turns a day. gpt-5, a tiktoken count, was $3.042 over 30 days. The same paste was $2.4672 on grok-4.7 and $17.136 on gpt-6-astra, both estimates."
takeaways:
  - "The same three strict tools and a 51-token prompt were 428 input tokens. At 200 output tokens and 40 turns a day, gpt-5 was $0.002535 a turn and $3.042 over 30 days. That row is a tiktoken o200k_base count."
  - "Priced with that same token count, grok-4.7 was $2.4672 over 30 days and gpt-6-astra was $17.136. Those two rows are estimates. tiktoken does not list those models."
  - "orders.lookup was a warning on a top-level OpenAI function and an error inside a namespace. admin.tools.list fit the MCP tools page for revision 2026-07-28 and still will not match Anthropic's name pattern."
date: "2026-11-09"
updated: "2026-11-09"
category: guide
topics:
  - how-agents-work
  - tools-saas
  - task-performance
audience:
  - everyone
  - builders
companies:
  - openai
  - anthropic
  - google
  - xai
  - pydantic-ai
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Order-support tool JSON counts from the prompt checker, November 9, 2026"
  description: "tiktoken o200k_base counts and 30-day prices for one order-support prompt and three tool definitions. Output tokens were entered as 200 and turns per day as 40. gpt-5 is the encoding that library assigns to that model. gpt-6-astra, Claude, Gemini 4 Argon, and grok-4.7 reuse the count as an estimate. Claude rows in Anthropic's shape also add the published tool-use system prompt."
  isBasedOn: "https://www.aiagentsinfo.com/agent-prompt-checker"
sources:
  - title: "OpenAI, Function calling (read November 9, 2026)"
    url: "https://developers.openai.com/api/docs/guides/function-calling"
  - title: "OpenAI, Responses streaming events, function and namespace name patterns (read November 9, 2026)"
    url: "https://developers.openai.com/api/reference/resources/responses/streaming-events"
  - title: "OpenAI, API pricing (read November 9, 2026)"
    url: "https://developers.openai.com/api/docs/pricing"
  - title: "Anthropic, Define tools (read November 9, 2026)"
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools"
  - title: "Anthropic, Tool use overview (read November 9, 2026)"
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview"
  - title: "Anthropic, Claude API pricing (read November 9, 2026)"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
  - title: "Google, Gemini API pricing (read November 9, 2026)"
    url: "https://aistudio.google.com/docs/pricing"
  - title: "xAI, Models (read November 9, 2026)"
    url: "https://docs.x.ai/docs/models"
  - title: "Model Context Protocol, Tools, specification revision 2026-07-28 (read November 9, 2026)"
    url: "https://modelcontextprotocol.io/specification/2026-07-28/server/tools"
  - title: "OpenAI, tiktoken"
    url: "https://github.com/openai/tiktoken"
  - title: "AI Agents Info, Free agent prompt and tool checker"
    url: "https://www.aiagentsinfo.com/agent-prompt-checker"
  - title: "AI Agents Info, Pydantic AI directory page (last verified November 3, 2026)"
    url: "https://www.aiagentsinfo.com/directory/pydantic-ai"
faq:
  - question: "What does one agent tool list cost over 30 days?"
    answer: "On November 9, 2026 the checker priced this three-tool support list at $3.042 over 30 days on gpt-5, with 200 output tokens and 40 turns a day entered. The prompt was 51 tokens and the tool JSON was 377. Both are tiktoken o200k_base counts of the pasted text."
  - question: "How does agent tool JSON cost change across models?"
    answer: "The same 428 input tokens were $2.4672 over 30 days on grok-4.7 and $17.136 on gpt-6-astra. Only the gpt-5 count is the encoding tiktoken assigns to that model. The other rows are estimates made with that same count, times the standard price read November 9, 2026."
  - question: "Does a dotted tool name fail?"
    answer: "orders.lookup was a warning on a top-level OpenAI function and an error inside a namespace. admin.tools.list matched the character set on the MCP tools page for revision 2026-07-28. Anthropic's define-tools page requires ^[a-zA-Z0-9_-]{1,128}$, which rejects a dot."
  - question: "Does a longer tool description change the bill?"
    answer: "Replacing the one-sentence lookup_order description with four sentences raised the tool text from 377 tokens to 408. On gpt-5, at these settings, the 30-day figure moved from $3.042 to $3.0885. The 200 output tokens are $2.40 of the smaller total."
---

Updated November 9, 2026.

## What does one agent tool list cost over 30 days?

On November 9, 2026 the [prompt and tool checker](https://www.aiagentsinfo.com/agent-prompt-checker) priced this support list at $0.002535 a turn and $3.042 over 30 days on gpt-5.

The prompt was 51 tokens. The three tools were 377. Input tokens priced were 428, which is 51 plus 377. Output tokens were the 200 I entered. Turns per day were the 40 I entered. The encoding was tiktoken `o200k_base`, the encoding that library assigns to gpt-5. The checker does not add message framing, and it does not store the paste.

The November 7 walkthrough, [Why tool JSON costs more than your system prompt](/blog/why-tool-json-costs-more-than-your-system-prompt), used one weather tool. This paste is a different job: look up an order, refund it, or open a ticket. The paired page is the [Pydantic AI](/directory/pydantic-ai) listing, a typed agent framework whose summary says it checks answers against a schema. The check below is the tool definition, which is the JSON you send before any answer comes back.

The prompt:

> You are an order-support agent for a store. Look up an order before you change it. Issue a refund only when the order is paid and unshipped. Open a ticket when the shopper asks for a person. Do not invent an order status.

The tools, in OpenAI's Responses shape. [The function-calling guide](https://developers.openai.com/api/docs/guides/function-calling), read November 9, 2026, puts `type`, `name`, `description`, `parameters`, and `strict` on the tool, and it says strict mode needs `additionalProperties: false` on each object and every property listed in `required`.

```json
[
  {
    "type": "function",
    "name": "lookup_order",
    "description": "Look up an order by its id.",
    "strict": true,
    "parameters": {
      "type": "object",
      "properties": {
        "order_id": { "type": "string", "description": "The order id." }
      },
      "required": ["order_id"],
      "additionalProperties": false
    }
  },
  {
    "type": "function",
    "name": "refund_order",
    "description": "Refund a paid order that has not shipped.",
    "strict": true,
    "parameters": {
      "type": "object",
      "properties": {
        "order_id": { "type": "string", "description": "The order id." },
        "amount_cents": { "type": "integer", "description": "Refund amount in cents." },
        "reason": { "type": "string", "description": "Why the refund was issued." }
      },
      "required": ["order_id", "amount_cents", "reason"],
      "additionalProperties": false
    }
  },
  {
    "type": "function",
    "name": "open_ticket",
    "description": "Open a ticket when the shopper asks for a person.",
    "strict": true,
    "parameters": {
      "type": "object",
      "properties": {
        "order_id": { "type": "string", "description": "The order id, when there is one." },
        "summary": { "type": "string", "description": "What the shopper needs a person to do." }
      },
      "required": ["order_id", "summary"],
      "additionalProperties": false
    }
  }
]
```

The checker returned no schema errors and detected "OpenAI Responses function". gpt-5 standard prices, read the same day from [OpenAI's pricing page](https://developers.openai.com/api/docs/pricing), are $1.25 per million input tokens and $10 per million output tokens. The arithmetic is `(428 × 1.25 + 200 × 10) / 1,000,000 = $0.002535` a turn, times 40, times 30, which is $3.042.

The 200 output tokens are $2.40 of that $3.042. The tool JSON is $0.5655. The prompt is $0.0765. A longer reply swamps a careful schema. The schema is still the part a provider can reject before it bills the turn.

## How does agent tool JSON cost change across models?

The same 428 input tokens run from $2.4672 on grok-4.7 to $17.136 on gpt-6-astra over 30 days, at 200 output tokens and 40 turns a day.

Only the gpt-5 row is a count tiktoken assigns to that model. gpt-6-astra, Claude Sonnet 5.5, Gemini 4 Argon, and grok-4.7 are estimates: the checker counted the same paste with `o200k_base` and said so. Those providers do not bill with that encoding. The prices are the standard rates read November 9, 2026. Cached, batch, flex, and fast rates are left out. Gemini 4 Argon's row is the paid standard price through November 30, 2026, $2 input and $10 output per million tokens. The page says those rates become $4 and $20 on December 1. This table does not apply that later rate.

| Model | Paste | Input priced | Per turn | 30 days |
| --- | --- | --- | --- | --- |
| gpt-5 | Responses tools | 428, exact | $0.002535 | $3.042 |
| grok-4.7 | same Responses paste | 428, estimate | $0.002056 | $2.4672 |
| Claude Sonnet 5.5 | same Responses paste | 428, estimate | $0.002856 | $3.4272 |
| Gemini 4 Argon | same Responses paste | 428, estimate | $0.002856 | $3.4272 |
| gpt-6-astra | same Responses paste | 428, estimate | $0.01428 | $17.136 |
| Claude Sonnet 5.5 | Anthropic shape of the same three tools | 657, estimate | $0.003314 | $3.9768 |
| Claude Haiku 5.5 | Anthropic shape of the same three tools | 657, estimate | $0.0001657 | $0.19884 |

grok-4.7 uses the under-200,000-token band, $2 input and $6 output per million, from [xAI's models page](https://docs.x.ai/docs/models). gpt-6-astra uses the short-context band, at or under 272,000 input tokens, $10 and $50, from the OpenAI page. Claude Sonnet 5.5 is $2 and $10. The Responses-shaped paste did not add Anthropic's tool-use system prompt. The checker said that published count applies when the tools are Anthropic's shape.

The Anthropic paste uses `name`, `description`, and `input_schema`, which is the shape on the [define-tools page](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools). `type`, `strict`, and `additionalProperties` are left off. That paste was 51 prompt tokens and 320 tool tokens, both estimates, plus 286 published input tokens.

```json
[
  {
    "name": "lookup_order",
    "description": "Look up an order by its id.",
    "input_schema": {
      "type": "object",
      "properties": {
        "order_id": { "type": "string", "description": "The order id." }
      },
      "required": ["order_id"]
    }
  },
  {
    "name": "refund_order",
    "description": "Refund a paid order that has not shipped.",
    "input_schema": {
      "type": "object",
      "properties": {
        "order_id": { "type": "string", "description": "The order id." },
        "amount_cents": { "type": "integer", "description": "Refund amount in cents." },
        "reason": { "type": "string", "description": "Why the refund was issued." }
      },
      "required": ["order_id", "amount_cents", "reason"]
    }
  },
  {
    "name": "open_ticket",
    "description": "Open a ticket when the shopper asks for a person.",
    "input_schema": {
      "type": "object",
      "properties": {
        "order_id": { "type": "string", "description": "The order id, when there is one." },
        "summary": { "type": "string", "description": "What the shopper needs a person to do." }
      },
      "required": ["order_id", "summary"]
    }
  }
]
``` The [tool-use overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview), read November 9, 2026, lists 286 for Claude Sonnet 5.5 when `tool_choice` is auto or none and at least one tool is sent. The any/tool cell on that row is blank, so the checker added no second figure. Input tokens priced were 657, which is 51 + 320 + 286. The 30-day figure was $3.9768.

Claude Haiku 5.5 used the same 657 and the band for a prompt up to 100,000 tokens, $0.10 input and $0.50 output per million. The 30-day figure was $0.19884. The same row lists 406 tokens when `tool_choice` is any or a named tool. The checker used the auto/none count of 286 and left 406 out.

What you can do today: paste the list once, read the token split, then change only the model. The spread here is the price, on one shared estimate of the paste. gpt-6-astra's 30-day figure is $17.136 against gpt-5's $3.042. Output is most of both bills, at $50 per million tokens against $10.

## Does a longer tool description change the bill?

Four sentences on `lookup_order` added 31 tokens and $0.0465 over 30 days on gpt-5.

Anthropic's define-tools page says to aim for at least three or four sentences when the tool needs them. I replaced "Look up an order by its id." with this and left the other two tools as they are:

> Retrieves one order for a shopper by order id. Use it before a refund or a ticket. It returns the payment state and whether the order has shipped. It does not change the order.

The tool text moved from 377 tokens to 408. Input tokens priced moved from 428 to 459. Per turn moved from $0.002535 to $0.00257375. The 30-day figure moved from $3.042 to $3.0885. The gap is $0.0465.

Keep the four sentences if the model picks the wrong tool without them. Cut them when the list is long enough that the descriptions, not one lookup line, are the bill. On this list the output box is still the large number.

## Does a dotted tool name fail?

`orders.lookup` was a warning on a top-level OpenAI function, an error inside a namespace, and `admin.tools.list` was a warning that the MCP page allows the dot.

On November 9 the name check was updated from the pages read that day. A top-level OpenAI function name with a dot had been reported as an error, using a pattern the Responses reference prints for a function inside a namespace. The MCP example `admin.tools.list` had been described as if the tools page published no character set. The [2026-07-28 tools page](https://modelcontextprotocol.io/specification/2026-07-28/server/tools) says a name should be 1 to 128 characters and should use only letters, digits, underscore, hyphen, and dot, and it lists `admin.tools.list` as a valid example. Anthropic's define-tools page still requires `^[a-zA-Z0-9_-]{1,128}$`.

This top-level tool returned ok, with one warning, 97 tool tokens, and a 30-day figure of $2.622 on gpt-5 at the same 200 and 40:

```json
[
  {
    "type": "function",
    "name": "orders.lookup",
    "description": "Look up an order by its id.",
    "strict": true,
    "parameters": {
      "type": "object",
      "properties": {
        "order_id": { "type": "string", "description": "The order id." }
      },
      "required": ["order_id"],
      "additionalProperties": false
    }
  }
]
```

The warning was: "orders.lookup" contains a dot. The Responses reference allows a dot in `^(?![\s\S]*[\r\n])[a-zA-Z0-9_.-]+$` for a function loaded inside a tool-search namespace, and it does not print a pattern on a top-level function name. A function name inside a namespace tool must match `^[a-zA-Z0-9_-]{1,128}$`, which rejects a dot. Anthropic's define-tools page requires that same no-dot pattern.

The same name inside a namespace was an error. Tool text was 130 tokens. The 30-day figure was $2.6715, and the note said a provider can reject the request before it bills the turn.

```json
[
  {
    "type": "namespace",
    "name": "orders",
    "description": "Order tools.",
    "tools": [
      {
        "type": "function",
        "name": "orders.lookup",
        "description": "Look up an order by its id.",
        "strict": true,
        "parameters": {
          "type": "object",
          "properties": {
            "order_id": { "type": "string", "description": "The order id." }
          },
          "required": ["order_id"],
          "additionalProperties": false
        }
      }
    ]
  }
]
```

The error was: "orders.lookup" does not match `^[a-zA-Z0-9_-]{1,128}$`. The Responses reference publishes that pattern for a function name inside a namespace, up to 128 characters.

The MCP paste returned ok, with a warning, 57 tool tokens, and $2.562 over 30 days on the gpt-5 price:

```json
{
  "tools": [
    {
      "name": "admin.tools.list",
      "description": "List the admin tools on this server.",
      "inputSchema": {
        "type": "object",
        "additionalProperties": false
      }
    }
  ]
}
```

The warning was: "admin.tools.list" fits the tool-name guidance on the MCP tools page for revision 2026-07-28: 1 to 128 characters from letters, digits, underscore, hyphen, and dot. The page's own example is admin.tools.list. Anthropic's define-tools page requires `^[a-zA-Z0-9_-]{1,128}$`, which rejects a dot. OpenAI publishes that no-dot pattern for a function name inside a namespace.

What you can do today: use a dot when the server is MCP and the spec's own example is the pattern you want. Rename to `orders_lookup` before you put that tool inside an OpenAI namespace or send it to Claude.

## What strict-mode errors did refund_order return?

Two errors. `additionalProperties` was missing, and `reason` was a property that `required` did not list.

I took the first list, removed `additionalProperties` from `refund_order`, and removed `reason` from that tool's `required` array. `strict` stayed true. The checker returned:

- `tools[1].parameters.additionalProperties`: OpenAI strict mode requires additionalProperties: false on each object in the parameters.
- `tools[1].parameters.required`: OpenAI strict mode requires every property to be listed in required. "reason" is missing. The guide says an optional field can use "null" as one of its types and still be required.

The tool text was 367 tokens. Input tokens priced were 418. Per turn was $0.0025225. The 30-day figure was $3.027. The note said the cost includes this tool text, and a provider can reject the request before it bills the turn. Fix the two fields, then read the price. The November 7 article shows the same class of error on a weather tool.

## Where does Pydantic AI fit?

[Pydantic AI](/directory/pydantic-ai) checks an answer against a schema. This checker checks the tool JSON before that answer exists.

The directory page, last verified November 3, 2026, calls it a Python framework for typed agents: you name a model, add tools, and get answers checked against a schema. The library has no fee of its own and is MIT licensed. The release tag read on November 9, 2026 is on [Best AI agent frameworks](/best/ai-agent-frameworks). That page compares licences. It does not price a tool list.

Run the JSON through the [prompt checker](https://www.aiagentsinfo.com/agent-prompt-checker) before you trust the typed answer. A request rejected for `additionalProperties` or a dotted name inside a namespace never returns an object for the framework to validate. If you already know the token counts, the [cost calculator](/agent-cost-calculator) multiplies them in the browser.

## What does the 30-day figure leave out?

The figures above are the checker's multiplication of the pasted text, the published Claude add-on when it applied, and the output tokens and turns I entered.

- Message framing is not in the count. OpenAI's guide says functions are injected into the system message, so the billed input can differ from the pasted JSON.
- gpt-6-astra, Claude, Gemini, and grok counts of the paste are tiktoken estimates. The 286 and the unused 406 are Anthropic's published counts.
- No per-call tool fee, computer-use fee, search-grounding fee, or code-execution fee is added. The price pages read on November 9 do not put a single per-call fee on these rows.
- Output tokens are the number entered. This check did not call a model and did not count a reply.
- Gemini 4 Argon's $2 and $10 rate is the price through November 30, 2026. The calculator does not switch itself on December 1.
- The prompt and the tools are not written to a file, a database, or a log.

## FAQ

### What does one agent tool list cost over 30 days?

On November 9, 2026 this three-tool support list was $3.042 over 30 days on gpt-5, with 200 output tokens and 40 turns a day. The prompt was 51 tokens and the tools were 377.

### How does agent tool JSON cost change across models?

The same 428 input tokens were $2.4672 on grok-4.7 and $17.136 on gpt-6-astra. The gpt-5 count is tiktoken's. The other rows estimate with that count and the standard prices read November 9, 2026.

### Does a dotted tool name fail?

`orders.lookup` was a warning at the top level and an error inside a namespace. `admin.tools.list` fit the MCP tools page for revision 2026-07-28. Anthropic's required pattern rejects a dot.

### Does a longer tool description change the bill?

Four sentences on `lookup_order` added 31 tokens and $0.0465 over 30 days on gpt-5. The 200 output tokens remained $2.40 of the $3.042.
