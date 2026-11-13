---
title: "Can one tool JSON serve OpenAI, Claude, and MCP?"
description: "On November 13, 2026 the prompt checker took six official tool examples. 0 passed a second API. The Agents SDK schema the docs print also fails OpenAI strict mode, at 199 tokens. MCP's get_weather was 90."
takeaways:
  - "0 of 6 official tool objects passed more than one target. OpenAI's strict get_weather passed OpenAI and failed Anthropic and MCP. Anthropic's get_weather and the MCP spec example did the reverse."
  - "The fetch_weather schema printed on the OpenAI Agents SDK tools page, sent with strict true, failed OpenAI strict mode. The checker asked for additionalProperties: false and warned on a $ref. That paste was 199 tokens."
  - "CrewAI's custom-tool page sets the sample name to \"Name of my tool\". The checker rejected the space. LangChain's weather_schema omits strict. Adding strict true, which that page does not print, produced the same additionalProperties error."
date: "2026-11-13"
updated: "2026-11-13"
category: guide
topics:
  - how-agents-work
  - tools-saas
  - harnesses
audience:
  - builders
companies:
  - openai
  - anthropic
  - langchain
  - crewai
byline: "AI Agents Info Editorial"
contentLicense: true
dataset:
  title: "Prompt checker results for six official tool definitions, November 13, 2026"
  description: "tiktoken o200k_base counts and pass or fail for six tool objects posted to the live prompt checker on November 13, 2026, model gpt-5, output tokens entered as 0. OpenAI function-calling get_weather 153 tokens. Anthropic define-tools get_weather 140. MCP tools spec get_weather 90. OpenAI Agents SDK fetch_weather printout, wrapped with strict true, 199. LangChain weather_schema on a Responses function 115. CrewAI placeholder name on a Responses function 91. The prompt was 19 tokens on every response."
  isBasedOn: "https://www.aiagentsinfo.com/agent-prompt-checker"
sources:
  - title: "OpenAI, Function calling (read November 13, 2026)"
    url: "https://developers.openai.com/api/docs/guides/function-calling"
  - title: "OpenAI Agents SDK, Tools (read November 13, 2026)"
    url: "https://openai.github.io/openai-agents-python/tools/"
  - title: "OpenAI Agents SDK, function_tool decorator, strict_mode default True (read November 13, 2026)"
    url: "https://openai.github.io/openai-agents-python/ref/decorators/"
  - title: "OpenAI Agents SDK, function schema, ensure_strict_json_schema (read November 13, 2026)"
    url: "https://openai.github.io/openai-agents-python/ref/function_schema/"
  - title: "LangChain, Tools, weather_schema (read November 13, 2026)"
    url: "https://docs.langchain.com/oss/python/langchain/tools"
  - title: "CrewAI, Tools, subclassing BaseTool (read November 13, 2026)"
    url: "https://docs.crewai.com/en/concepts/tools"
  - title: "Anthropic, Define tools (read November 13, 2026)"
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools"
  - title: "Model Context Protocol, Tools, revision 2026-07-28 (read November 13, 2026)"
    url: "https://modelcontextprotocol.io/specification/2026-07-28/server/tools"
  - title: "AI Agents Info, prompt and tool checker API (called November 13, 2026)"
    url: "https://www.aiagentsinfo.com/agent-prompt-checker"
  - title: "AI Agents Info, AI agent framework GitHub stats, November 5, 2026 snapshot"
    url: "https://www.aiagentsinfo.com/reports/ai-agent-framework-github-stats-november-2026"
faq:
  - question: "Can one tool JSON serve OpenAI, Claude, and MCP?"
    answer: "Not these six. On November 13, 2026 the live prompt checker accepted 0 of 6 official tool objects on more than one target. OpenAI reads parameters. Anthropic reads input_schema. MCP reads inputSchema. A paste that uses the wrong field fails before the argument types are compared."
  - question: "Does the OpenAI Agents SDK example pass strict mode?"
    answer: "The schema printed on the tools page does not, once strict is true. The checker returned an error at parameters.additionalProperties and a warning on a $ref. The decorator reference says strict_mode defaults to True, and the function-schema reference says a strict schema is passed through ensure_strict_json_schema. This run did not execute that rewriter. It checked the printed object."
  - question: "How many tokens did the checker count?"
    answer: "With gpt-5 and tiktoken o200k_base, the prompt was 19 tokens on every call. The tool pastes were 153 for OpenAI's strict get_weather, 140 for Anthropic's, 90 for the MCP spec example, 199 for the Agents SDK printout with strict true, 115 for LangChain's weather_schema on a Responses function, and 91 for the CrewAI placeholder. Output tokens were entered as 0."
  - question: "What should you fix before you ship the tool to a second API?"
    answer: "Rename the argument schema to the field that API reads. If strict is true, set additionalProperties to false on every object and list every property in required. Set strict to true or false on an OpenAI function instead of leaving it out. Inline a $ref. Keep the tool name to letters, digits, underscore, and hyphen."
---

Updated November 13, 2026.

No. On November 13, 2026 the live [prompt and tool checker](/agent-prompt-checker) accepted 0 of 6 official tool objects on more than one target. Three of those objects are the JSON a vendor page prints. Three are built from fields a page prints, because the page prints a schema or a Python class rather than a request body. Two of the six failed the OpenAI target as well.

The [November 5 framework snapshot](/reports/ai-agent-framework-github-stats-november-2026) counts stars and one release tag for 19 repositories, including LangChain, LangGraph, CrewAI, and the OpenAI Agents SDK. It does not say whether a tool definition from one of those projects can be sent to a second API. This page is that check. It is not a cost ranking. The [earlier token-cost note](/blog/why-tool-json-costs-more-than-your-system-prompt) priced one weather tool. The field name is the problem here.

## What the server received

Every call was a POST to `/api/agent-prompt-checker` on the live site. The prompt was the same sentence: "Use the tool when the user asks for the thing it describes. Do not invent a result." The model was `gpt-5`. Output tokens were entered as 0. Turns per day were entered as 1. Those two numbers are not a workload. They stop the checker from inventing a reply.

Each tool object was sent four times, with the format set to Auto, OpenAI, Anthropic, and MCP. The two bare schemas were sent once, on Auto. The token counts below are tiktoken `o200k_base` of the pasted text. The checker says that is the encoding the library assigns to gpt-5, that the count is exact for that model, and that message framing is not included. The prompt was 19 tokens on every response. `anthropicToolPrompt` was null on every response, because the priced model was gpt-5, not Claude.

The JSON below is the paste. Enum values sit on their own lines because that is how the request serialized them. The strings match the pages cited above.

## The score

| Paste | Tool tokens | OpenAI | Anthropic | MCP |
| --- | --- | --- | --- | --- |
| OpenAI function-calling `get_weather`, as printed | 153 | Pass | Fail | Fail |
| Anthropic define-tools `get_weather`, as printed | 140 | Fail | Pass | Fail |
| MCP tools spec `get_weather`, the tool object | 90 | Fail | Fail | Pass |
| Agents SDK `fetch_weather` printout, `strict: true` | 199 | Fail | Fail | Fail |
| LangChain `weather_schema` on a Responses function | 115 | Pass, strict omitted | Fail | Fail |
| CrewAI sample name on a Responses function | 91 | Fail | Fail | Fail |

A pass means `ok: true`. A warning does not flip that flag. The LangChain row passed OpenAI and still carried the omitted-strict warning.

## OpenAI's example is already strict

The function-calling guide prints a Responses function named `get_weather`, with `strict: true`, `additionalProperties: false`, and both `location` and `units` required. That object passed Auto and OpenAI. It failed the other two targets on the first check, before the argument types mattered.

```json
{
  "type": "function",
  "name": "get_weather",
  "description": "Retrieves current weather for the given location.",
  "parameters": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "City and country e.g. Bogotá, Colombia"
      },
      "units": {
        "type": "string",
        "enum": [
          "celsius",
          "fahrenheit"
        ],
        "description": "Units the temperature will be returned in."
      }
    },
    "required": [
      "location",
      "units"
    ],
    "additionalProperties": false
  },
  "strict": true
}
```

Anthropic target, `tools[0]`, error: "This matches OpenAI Responses function. An Anthropic user-defined tool puts name, description, and input_schema on the tool, with no type "function" wrapper."

MCP target, `tools[0]`, error: "This matches OpenAI Responses function. An MCP tool puts name and inputSchema on the tool. The schema field is inputSchema, not input_schema or parameters."

The tool text was 153 tokens. This is the only paste in the set that was already a strict OpenAI function.

## Anthropic's get_weather is a different object

The define-tools page prints `name`, `description`, and `input_schema`. There is no `type: "function"`. `unit` is optional. That object passed Auto and Anthropic. It was 140 tokens.

```json
{
  "name": "get_weather",
  "description": "Get the current weather in a given location",
  "input_schema": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "The city and state, e.g. San Francisco, CA"
      },
      "unit": {
        "type": "string",
        "enum": [
          "celsius",
          "fahrenheit"
        ],
        "description": "The unit of temperature, either 'celsius' or 'fahrenheit'"
      }
    },
    "required": [
      "location"
    ]
  }
}
```

OpenAI target, error: "This matches Anthropic tool. An OpenAI function tool uses type "function" and a parameters schema. The Responses API puts name and parameters on the tool. Chat Completions nests them under function."

MCP target, error: "This matches Anthropic tool. An MCP tool puts name and inputSchema on the tool. The schema field is inputSchema, not input_schema or parameters."

The fix is a rename of the schema field, plus a `type` when the destination is OpenAI. It is not a tweak to the city string.

## MCP's copy is the short one

The tools page in revision 2026-07-28, the same revision the checker cites, prints `get_weather` inside a `tools/list` result. The paste was that tool object, not the JSON-RPC envelope around it. The checker accepts one tool object. It passed Auto and MCP. It was 90 tokens, the smallest weather tool in the set.

```json
{
  "name": "get_weather",
  "title": "Weather Information Provider",
  "description": "Get current weather information for a location",
  "inputSchema": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "City name or zip code"
      }
    },
    "required": [
      "location"
    ]
  }
}
```

OpenAI and Anthropic each returned the shape error for an MCP tool. `inputSchema` is the wrong key for both of them. `title` did not save it.

## The Agents SDK printout fails strict mode

The Python tools page shows the output of printing `tool.name`, `tool.description`, and `tool.params_json_schema` for `fetch_weather`. The printed schema is a JSON Schema with `$defs`, a `$ref` to `Location`, and no `additionalProperties`. It is not a tool object. Sent alone, on Auto, the checker rejected it. Tool tokens: 158. The error named the fields it saw: `$defs`, `properties`, `required`, `title`, `type`.

The decorator reference says `strict_mode` defaults to `True`. The function-schema reference says that when `strict_json_schema` is true, the schema is passed through `ensure_strict_json_schema` before it is stored. The tools page's printed output does not show `additionalProperties: false`. This run did not execute the SDK, so it does not show whether today's rewriter would change that object before an API call. It shows what happens if you copy the printout.

The paste below puts the printed name, description, and schema on a Responses function and sets `strict` to true because that is the decorator default. The tools page does not print this wrapper.

```json
{
  "type": "function",
  "name": "fetch_weather",
  "description": "Fetch the weather for a given location.",
  "parameters": {
    "$defs": {
      "Location": {
        "properties": {
          "lat": {
            "title": "Lat",
            "type": "number"
          },
          "long": {
            "title": "Long",
            "type": "number"
          }
        },
        "required": [
          "lat",
          "long"
        ],
        "title": "Location",
        "type": "object"
      }
    },
    "properties": {
      "location": {
        "$ref": "#/$defs/Location",
        "description": "The location to fetch the weather for."
      }
    },
    "required": [
      "location"
    ],
    "title": "fetch_weather_args",
    "type": "object"
  },
  "strict": true
}
```

OpenAI target, `ok: false`, 199 tokens. Warning at `parameters.properties.location.$ref`: "This schema uses $ref. The OpenAI, Anthropic, and MCP examples inline the schema, and this checker does not resolve references." Error at `parameters.additionalProperties`: "OpenAI strict mode requires additionalProperties: false on each object in the parameters."

The printed `Location` object also has no `additionalProperties: false`. The checker did not flag that nested object. It does not follow `$ref`, and it does not walk `$defs`. Anthropic and MCP failed this paste on shape as well as on the strict-mode error, because the wrapper is an OpenAI function.

If you ship the printed schema with strict mode on, fix the missing `additionalProperties` and inline the `$ref` before you leave the SDK. Do not assume the other two APIs will run `ensure_strict_json_schema` for you.

## LangChain omits strict

The LangChain tools page prints `weather_schema` as the `args_schema` of `get_weather`. The docstring is "Get current weather and optional forecast." The page does not print `type: "function"` or `strict`. The bare schema, sent on Auto, was rejected as not a tool. Tool tokens: 81. Fields seen: `type`, `properties`, `required`.

The row in the table is that schema placed on a Responses function, using the function name and the docstring. That wrapper is not on the page.

```json
{
  "type": "function",
  "name": "get_weather",
  "description": "Get current weather and optional forecast.",
  "parameters": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string"
      },
      "units": {
        "type": "string"
      },
      "include_forecast": {
        "type": "boolean"
      }
    },
    "required": [
      "location",
      "units",
      "include_forecast"
    ]
  }
}
```

OpenAI target, `ok: true`, 115 tokens, plus this warning: "At least one OpenAI function omits strict. The function-calling guide says a Responses request tries to rewrite the schema into strict mode, and a Chat Completions request stays non-strict unless strict is set. Set strict to true or false so the request does the thing you expect."

Anthropic and MCP failed it as an OpenAI function.

A follow-up paste added `"strict": true`, which the LangChain page does not print. Tool tokens moved from 115 to 121. `ok` flipped to false. The only error was `parameters.additionalProperties`: "OpenAI strict mode requires additionalProperties: false on each object in the parameters." The schema already lists every property in `required`. The missing flag is `additionalProperties: false`.

LangGraph is in the November 5 table. This JSON is the LangChain tools page. LangGraph does not print a second schema on that page.

## CrewAI's sample name has a space

The custom-tool section prints a class, not JSON. The strings on the page are `name: str = "Name of my tool"`, the description "What this tool does. It's vital for effective utilization.", and one field, `argument: str`. The paste below is those strings on a Responses function. The parameters object is that one field written as JSON Schema, because the page does not print a schema.

```json
{
  "type": "function",
  "name": "Name of my tool",
  "description": "What this tool does. It's vital for effective utilization.",
  "parameters": {
    "type": "object",
    "properties": {
      "argument": {
        "type": "string",
        "description": "Description of the argument."
      }
    },
    "required": [
      "argument"
    ]
  }
}
```

OpenAI target, `ok: false`, 91 tokens. Error at `name`: `"Name of my tool" does not match ^(?![\s\S]*[\r\n])[a-zA-Z0-9_.-]+$ with a length of 1 to 128.` The same error says Anthropic's define-tools page requires `^[a-zA-Z0-9_-]{1,128}$`. A space fails both. The omitted-strict warning was there too. Anthropic and MCP also rejected the OpenAI shape.

The placeholder is not a tool you should ship. The name pattern still applies to the name you type in its place. `inventory_check` fits. `Name of my tool` does not.

## What to fix before you ship

1. Pick the schema field for the API you call. OpenAI reads `parameters`. Anthropic reads `input_schema`. MCP reads `inputSchema`. One request gets one of those. The three printed weather tools fail the other APIs on that mismatch alone.
2. If `strict` is true, set `additionalProperties` to false on every object, and list every property in `required`. The Agents SDK printout fails the first rule. LangChain's `weather_schema` fails it as soon as you set `strict` to true.
3. Set `strict` to true or false on an OpenAI function. Leaving it out is a warning. The function-calling guide says a Responses request may rewrite the schema, and a Chat Completions request stays non-strict unless you set the flag.
4. Inline a `$ref`. This checker does not resolve one, and it does not walk `$defs`. The nested `Location` object in the Agents SDK printout has no `additionalProperties: false` either. The checker did not report that nested gap.
5. Keep the tool name to letters, digits, underscore, and hyphen. A space is an error. Dots are a separate warning on the way to Anthropic, whose pattern rejects them. The CrewAI sample name fails before any of that nuance.
6. Paste a tool, not a bare JSON Schema. The Agents SDK schema alone was 158 tokens and not a tool. LangChain's schema alone was 81 tokens and not a tool.

Do this before the first request. A provider can reject the call before it bills the turn. The checker still counted the tool text. That count is the size of the paste, not a quote for a production request with message framing.

The star table stays the [November 5 snapshot](/reports/ai-agent-framework-github-stats-november-2026). The place to rerun a paste is the [prompt and tool checker](/agent-prompt-checker). Nothing in these requests was stored.
