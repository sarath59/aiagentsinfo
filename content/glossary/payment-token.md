---
term: Payment token
shortDefinition: A substitute card credential a network or a processor issues for a purchase, so the real card number stays out of the agent.
related:
  - delegated-payment-token
  - agentic-checkout
  - agentic-commerce
  - approval-gate
  - harness
  - shopping-agent
topics:
  - shopping
  - harnesses
  - tools-saas
---

## What is a payment token?

A payment token is a substitute card credential a network or a processor issues for a purchase, so the real card number stays out of the agent.

ChatGPT Wallet, announced November 13, 2026, uses the network kind. After you approve with Face ID or Touch ID, the network provides a token with its own card number, security code, and expiration. The help article calls the number entered at checkout a virtual card number linked to the selected card. The merchant guide says the business receives a network token, not the full card number, and should use the Payment Account Reference to associate it with the account. The real card stays in the wallet. The [harness](/glossary/harness) is not supposed to put either number in the model’s context.

That is a different object from a [delegated payment token](/glossary/delegated-payment-token). OpenAI’s Delegated Payment Spec, Last-Modified November 12, 2026, describes a single-use token a processor returns, capped by amount, merchant, and expiry. Stripe’s Shared Payment Token is the implementation that spec names. A Wallet network token and a delegated payment token can both be called a payment token. They are not interchangeable, and a product feed creates neither one.

The purchase step is [agentic checkout](/glossary/agentic-checkout). The stop before the token is issued is an [approval gate](/glossary/approval-gate). The category is [agentic commerce](/glossary/agentic-commerce). The assistant is a [shopping agent](/glossary/shopping-agent). How Wallet and Poppy split the job on November 13 is [How does ChatGPT Wallet work?](/blog/how-does-chatgpt-wallet-work). The older credential map is [How do AI shopping agents pay?](/blog/how-do-ai-shopping-agents-pay).
