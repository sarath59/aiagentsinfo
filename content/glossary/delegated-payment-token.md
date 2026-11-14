---
term: Delegated payment token
shortDefinition: A single-use payment token a processor returns for one approved purchase, capped by amount, merchant, and expiry.
related:
  - payment-token
  - agentic-checkout
  - agentic-commerce
  - shopping-agent
  - guardrail
topics:
  - shopping
  - tools-saas
---

## What is a delegated payment token?

A delegated payment token is a single-use payment token a processor returns for one approved purchase, capped by amount, merchant, and expiry.

OpenAI’s Delegated Payment Spec, Last-Modified 11:17 GMT on November 12, 2026, says OpenAI sends card details to the merchant’s payment provider. The provider returns a token. OpenAI forwards it on the complete-checkout call. The allowance requires `one_time`, a max amount, a currency, a merchant id, a checkout session, and an expiry. The only payment method type in that spec is `card`. OpenAI is not the merchant of record. Direct integration is for payment providers or PCI DSS level 1 merchants. Stripe’s Shared Payment Token is the first implementation the spec names. Stripe marks that token a public preview, available in the US, Canada, and select European countries, and its examples use API version `2026-09-30.preview`.

The token is a [guardrail](/glossary/guardrail) on an [agentic checkout](/glossary/agentic-checkout). It is not the same object as an AP2 Checkout Mandate, and it is not the network [payment token](/glossary/payment-token) ChatGPT Wallet issues after a biometric. ChatGPT’s merchant page, read November 12, 2026, still sends the shopper to the store to pay. A feed does not create this token. Wallet, announced the next day, is a separate path: [How does ChatGPT Wallet work?](/blog/how-does-chatgpt-wallet-work).

The longer guide is [How do AI shopping agents pay?](/blog/how-do-ai-shopping-agents-pay). The category is [agentic commerce](/glossary/agentic-commerce). The assistant is a [shopping agent](/glossary/shopping-agent).
