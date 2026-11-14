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

The longer guide is [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you). What a merchant puts in the file is [How to make your store readable by AI shopping agents](/blog/how-to-make-your-store-readable-by-ai-shopping-agents). Which protocol version that file belongs to, read November 10, 2026, is [OpenAI’s checkout example is still API version 2025-09-12](/blog/ucp-vs-acp-spec-versions-november-2026). The sourced table is [Best AI agent for shopping](/best/ai-agents-for-shopping). Which of those feeds can actually take a payment through May 2027 is [which AI shopping agents can check out through May 2027](/reports/ai-shopping-agents-next-6-months).
