export type ShoppingMonth = { month: string; announced: string; likely: string; watch: string };

export const path = "/reports/ai-shopping-agents-next-6-months";
export const title = "AI shopping agents: Google checks out in Canada. ChatGPT still sends you to the store.";
export const description =
  "Can AI buy things online for you? Sometimes. Google can check out for named Canadian retailers. ChatGPT, re-read November 13, 2026, still sends you to the store.";
/** Search snippet only. The thesis, JSON-LD, and embeds keep `description`. */
export const metaDescription =
  "Can AI buy things online for me? Google can for named Canadian retailers as of November 4, 2026. OpenAI still sends you to the store. See months to May 2027.";
if (metaDescription.length < 140 || metaDescription.length > 158) {
  throw new Error(`shopping report metaDescription is ${metaDescription.length} characters`);
}
export const readOn = "2026-11-05";
export const updatedOn = "2026-11-14";

export const months: ShoppingMonth[] = [
  {
    month: "November 2026",
    announced:
      "November 4: Google said direct checkout was rolling out to Canadian shoppers in AI Mode and the Gemini app, for lululemon, select Shopify merchants, Shoppers Drug Mart, and Simons. November 11: United said it is restricting unauthorized third-party personal AI agents from booking, ticketing, and distribution. November 13: OpenAI introduced ChatGPT Wallet for some U.S. Pro users inside a dot, and Amazon updated its text-shopping post to say texting is widely available to all Alexa for Shopping customers.",
    likely:
      "Adobe’s forecasts for Thanksgiving (November 26), Black Friday (November 27), and Cyber Monday (November 30). The holiday page also labels a GenAI traffic chart November through December, with 130 percent growth for the season.",
    watch:
      "Which Thanksgiving growth rate Adobe is standing behind: 141 percent on the holiday page, or 159 percent in the October 29 report. Whether Google names Canadian retailers beyond the November 4 list. Whether a given ChatGPT Pro account in the United States has Wallet yet. The help article read November 14 says the rollout is gradual.",
  },
  {
    month: "December 2026",
    announced: "No company in this set named a launch day in December.",
    likely:
      "OpenAI’s merchant page, re-read November 14, 2026, still says a self-serve portal “later this year.” If that sentence still means 2026, December is the last month it can land. Adobe’s holiday chart, re-read November 13, still runs through December.",
    watch:
      "Google’s “coming months” work on loyalty rewards, which is not pinned to December. PayPal inside Google checkout, described as soon in January and not confirmed in the October or November posts.",
  },
  {
    month: "January 2027",
    announced: "No page names a day in January.",
    likely:
      "January is the first month inside “starting next year” from Google’s November 4 post, and it sits inside “early next year” from the October 19 developer guide, for Merchant Center access in Australia and Canada.",
    watch:
      "Merchant Center help says Australia and Canada follow “next year,” without the word early. A January opening would fit the developer guide. The help page does not require it.",
  },
  {
    month: "February 2027",
    announced: "No dated shopping-agent launch was found.",
    likely: "Still inside “next year,” and on one reading inside “early next year,” if the Merchant Center hub has not opened.",
    watch: "Any new Amazon page. The October 29 earnings release does not schedule one.",
  },
  {
    month: "March 2027",
    announced: "No dated shopping-agent launch was found.",
    likely:
      "The same undated Google phrases, if the work has not shipped. OpenAI’s line on other regions is “over time,” which does not prefer March.",
    watch: "Whether OpenAI has named a country besides the United States. The merchant page does not.",
  },
  {
    month: "April 2027",
    announced: "No dated shopping-agent launch was found.",
    likely:
      "This report does not place the hub in April. “Early next year” is the developer guide’s phrase, and April needs a new sentence from Google before it counts as that phrase.",
    watch: "A revised Google page that either dates the hub or replaces “early next year.”",
  },
  {
    month: "May 2027",
    announced: "No source names May. May is the end of this report’s window.",
    likely: "Nothing in the source set is written to May.",
    watch:
      "Whether the Australia and Canada hub, loyalty rewards, and identity linking have shipped. Whether OpenAI’s portal shipped in 2026. Whether Microsoft has named another country. Whether a Google product page has put AP2 on a live checkout, after the May 19, 2026 post said that would start with Gemini Spark. Whether Australia or U.K. shopper checkout has a dated post. Canada’s shopper checkout was the November 4 post.",
  },
];

export const readingMinutes = 12;

export const shoppingFaq = [
  {
    question: "Can AI buy things online for me?",
    answer:
      "Sometimes, on a named product. Google Pay can check out for named Canadian retailers as of November 4, 2026, and inside the U.S. Universal Cart that launched October 15. Amazon’s guide, updated October 29, 2026, says Alexa for Shopping can auto-buy with the default payment method when a U.S. customer’s price is reached. Microsoft’s Agentic Commerce page, re-read November 14, says Copilot Checkout can finish a purchase inside Copilot for English-language merchants selling to U.S. buyers in U.S. dollars. OpenAI’s merchant page, re-read the same day, still completes ordinary ChatGPT shopping on the merchant’s site. ChatGPT Wallet, announced November 13, is a separate path for some U.S. Pro users: you approve each purchase with Face ID or Touch ID, and the network issues a payment token. No source in this report names a new checkout day through May 2027.",
  },
  {
    question: "Which AI shopping agents can check out on Amazon?",
    answer:
      "Alexa for Shopping can. Amazon’s guide, updated October 29, 2026, says a U.S. customer can set a target price and Alexa for Shopping buys with the default payment method. Buy for Me, on that same guide, uses Amazon payment and shipping details for an eligible product on another store, after you tap the button. That charge is on the brand’s site. Amazon’s text post, updated November 13, 2026, says a reorder is bought with your approval, and that texting is widely available to all Alexa for Shopping customers. This report did not find an OpenAI, Google, Microsoft, or Perplexity page that says their assistant can complete checkout on Amazon.com.",
  },
  {
    question: "What is agentic checkout?",
    answer:
      "A purchase an assistant can finish. The person has chosen the item, or has already set a rule such as a target price. The assistant sends the cart and a payment instruction. On the Google, OpenAI, Microsoft, and PayPal pages cited here, the store remains the seller of record. OpenAI’s Agentic Commerce Protocol lets a merchant run checkout while the merchant’s own systems charge the payment. Google’s Universal Commerce Protocol is the checkout layer on its cart. They are not the same specification.",
  },
  {
    question: "Is it safe to let an AI agent pay?",
    answer:
      "Only inside a gate you can see. ChatGPT Wallet’s help article, read November 14, 2026, requires you to review the merchant, the items, the total, and the card, then approve with Face ID or Touch ID. That approval does not mean the merchant has placed the order. OpenAI’s November 13 announcement says the network token is a substitute for the real card details, and that the business and the agent do not receive those details. Debit cards are not supported. A recurring plan you accept can be charged again by the merchant. Amazon’s Buy for Me article says you confirm address, tax, shipping, and payment on an Amazon page before encrypted details go to the brand. Auto-buy is a rule you set earlier: the October 29 guide says the default payment method is used when the price is reached. United Airlines, on November 11, 2026, said sharing account credentials with a third-party personal AI assistant can lead to unintended purchases, and it is restricting those agents from booking.",
  },
  {
    question: "How soon will AI agents handle most B2B purchasing decisions?",
    answer:
      "Not on a day this report can date. Forrester’s October 28, 2026 prediction for 2027 says agentic buying will play a role in 75 percent of B2B purchases, for tasks such as spend analysis, contract-renewal analysis, supplier discovery, and RFI and RFP work. The same post says fully autonomous purchasing will stay concentrated in high-volume, low-risk, repeatable scenarios, often stopping short of the transaction. Mastercard’s April 29, 2025 Agent Pay release says it will partner with IBM’s watsonx Orchestrate to accelerate B2B use cases. That release describes a future purchase. It does not count purchase orders, and it does not say agents will handle most B2B purchasing decisions by May 2027.",
  },
  {
    question: "Will ChatGPT check out inside the chat?",
    answer:
      "On two different paths. The merchant page re-read November 14, 2026 says OpenAI is moving away from standalone Instant Checkout. Shoppers discover products in ChatGPT and complete the purchase on the merchant’s website or app. Shopping is live for users in the United States. The March 24, 2026 post said the first Instant Checkout was not flexible enough. ChatGPT Wallet, announced November 13, is not that merchant checkout. It rolls out inside a dot for ChatGPT Pro subscribers 18 or older in the United States, on an eligible U.S.-issued American Express, Chase, Mastercard, or Visa credit card. You approve every purchase. The help article says Wallet is not available in Chat, Work, or a standalone Codex thread, and that it may not complete checkout at every store. Spending limits you set in advance are later work. The page does not name November or December for that step.",
  },
  {
    question: "What is already dated between November 2026 and May 2027?",
    answer:
      "Rollouts already underway, plus phrases with no day. Google’s November 4, 2026 Canada post says simplified protocol tools in Merchant Center start next year, and loyalty rewards are work for the coming months. The developer guide, last updated 2026-11-06 UTC, says the Merchant Center hub reaches Australia and Canada early next year. OpenAI’s merchant page still says a self-serve portal later this year. If that sentence is current, it means the rest of 2026. Microsoft says it cannot give a timeline for a country besides the United States. Google’s May 19, 2026 post said it would begin bringing the Agent Payments Protocol to Google products in the coming months, starting with Gemini Spark. The October 15 and November 4 checkout posts describe Google Pay. They do not name an AP2 mandate on the charge.",
  },
];
