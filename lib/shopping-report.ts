export type ShoppingMonth = { month: string; announced: string; likely: string; watch: string };

export const path = "/reports/ai-shopping-agents-next-6-months";
export const title = "AI shopping agents: Google checks out in Canada. ChatGPT still sends you to the store.";
export const description =
  "AI shopping agents through May 2027: Google checkout is live for named Canadian retailers. ChatGPT, re-read November 13, 2026, still finishes on the store’s site. Undated months stay empty.";
export const readOn = "2026-11-05";
export const updatedOn = "2026-11-13";

export const months: ShoppingMonth[] = [
  {
    month: "November 2026",
    announced:
      "November 4: Google said direct checkout was rolling out to Canadian shoppers in AI Mode and the Gemini app, for lululemon, select Shopify merchants, Shoppers Drug Mart, and Simons.",
    likely:
      "Adobe’s forecasts for Thanksgiving (November 26), Black Friday (November 27), and Cyber Monday (November 30). The holiday page also labels a GenAI traffic chart November through December, with 130 percent growth for the season.",
    watch:
      "Which Thanksgiving growth rate Adobe is standing behind: 141 percent on the holiday page, or 159 percent in the October 29 report. Whether Google names Canadian retailers beyond the November 4 list.",
  },
  {
    month: "December 2026",
    announced: "No company in this set named a launch day in December.",
    likely:
      "OpenAI’s merchant page, re-read November 13, 2026, still says a self-serve portal “later this year.” If that sentence still means 2026, December is the last month it can land. Adobe’s holiday chart, re-read the same day, still runs through December.",
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
      "Whether the Australia and Canada hub, loyalty rewards, and identity linking have shipped. Whether OpenAI’s portal shipped in 2026. Whether Microsoft has named another country.",
  },
];

export const readingMinutes = 10;

export const shoppingFaq = [
  {
    question: "Can AI shopping agents buy for you between November 2026 and May 2027?",
    answer:
      "On some products, they already can, inside rules a company has published. Google’s November 4, 2026 post says Canadian shoppers can buy from eligible retailers in AI Mode and the Gemini app with Google Pay, and the retailer stays the seller. OpenAI’s merchant page, re-read November 13, 2026, says ChatGPT shoppers finish the purchase on the merchant’s website or app. Amazon’s guide, updated October 29, says a U.S. customer can set a target price and have Alexa for Shopping buy with the default payment method. Microsoft’s page, re-read November 13, says Copilot Checkout can finish a purchase inside Copilot for eligible U.S. sales. No page in this set schedules a new country, or a new checkout button, for a named day through May 2027.",
  },
  {
    question: "What is already announced for this six-month stretch?",
    answer:
      "Google’s Canada post says simplified protocol tools in Merchant Center start next year, and loyalty rewards are work for the coming months. The developer guide, last updated 2026-11-06 UTC and re-read November 13, says Australia and Canada get the Merchant Center hub early next year, and identity linking is coming soon. OpenAI’s merchant page, re-read November 13, says it is building a self-serve merchant platform later this year and plans to add regions over time. The U.S. cart, the Canada rollout, U.S. ChatGPT discovery, and U.S. Copilot Checkout are already in market.",
  },
  {
    question: "What counts as likely, and what is only something to watch?",
    answer:
      "Likely, on this page, means a linked source points at November 2026 through May 2027 and does not name a day. That covers Google’s next-year Merchant Center access, Google’s coming-months loyalty work, OpenAI’s later-this-year portal, and Adobe’s November and December traffic forecasts. Watch for means the source refused a date, two sources disagree, or a promised follow-up was not on the pages re-read November 13, 2026. Identity linking is still marked coming soon on the developer guide. Microsoft still gives no timeline for a country besides the United States. PayPal on Google checkout, and Walmart’s phone apps inside ChatGPT, were not restated on a page re-read that day.",
  },
  {
    question: "Will ChatGPT check out inside the chat?",
    answer:
      "The merchant page re-read on November 13, 2026 says OpenAI is moving away from a standalone Instant Checkout experience. Shoppers discover and compare in ChatGPT. Purchases are completed on merchant-owned websites or apps. The March 24, 2026 post said the first Instant Checkout was not flexible enough for what OpenAI wanted. The same post said Walmart’s in-ChatGPT app was available in web browsers, with iOS and Android to follow. This report did not find a later OpenAI page confirming those phone apps.",
  },
  {
    question: "When does Google say Canada and Australia can onboard in Merchant Center?",
    answer:
      "The developer guide, last updated 2026-11-06 UTC and re-read November 13, says the hub is rolling out in the United States, with Australia and Canada early next year. The Merchant Center help page, re-read November 13, says Australia and Canada follow next year, and it does not say early. The November 4 Canada post says simplified integration in Merchant Center starts next year. None of the three pages names a month.",
  },
  {
    question: "Did Amazon schedule a new shopping-agent launch?",
    answer:
      "The October 29, 2026 earnings release says Alexa for Shopping was used by 400 million or more customers in the last 12 months, with interactions up 570 percent year over year, and that more than 100 capabilities had been added. Fourth-quarter guidance in that release is for company net sales and operating income. It does not give an Alexa for Shopping date between November 2026 and May 2027.",
  },
  {
    question: "What did Adobe actually measure?",
    answer:
      "In the October 29, 2026 report, September AI traffic to U.S. retail sites grew 71 percent year over year. Adobe defines that traffic as users clicking a link. The same month, that traffic converted 90 percent better than other traffic, and revenue per visit was 83 percent higher. The report expects the revenue-per-visit advantage to double in the holiday season, and it gives Thanksgiving, Black Friday, and Cyber Monday growth rates of 159, 95, and 88 percent. The holiday forecast page, re-read November 13, 2026, instead says August traffic grew 127 percent, the season is projected at 130 percent, and Thanksgiving at 141 percent.",
  },
];
