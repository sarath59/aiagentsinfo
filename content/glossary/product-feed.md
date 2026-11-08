---
term: Product feed
shortDefinition: A structured catalog a store sends so an assistant can show a real price, a real image, and a product page.
related:
  - shopping-agent
  - agentic-checkout
  - tool-use
topics:
  - shopping
  - tools-saas
---

A **product feed** is a file of product rows that a merchant maintains. [OpenAI's feed spec](https://developers.openai.com/commerce/specs/file-upload/products) requires nine fields for a discovery row: an item id, a title, a description, a product URL, a brand, a seller name, an image URL, availability, and a price. Checkout is a separate integration. Marking a row as eligible does not, by itself, turn on payment.

A [shopping agent](/glossary/shopping-agent) that quotes a price should be reading a feed like this, or a merchant catalog with the same job, rather than inventing a number. Google's Shopping Graph and Merchant Center are the feed path behind its cart. The payment step that may follow is [agentic checkout](/glossary/agentic-checkout). Fetching the row is [tool use](/glossary/tool-use).

The longer guide is [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you). The sourced table is [Best AI agent for shopping](/best/ai-agents-for-shopping).
