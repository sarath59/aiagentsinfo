export type ShoppingMonth = { month: string; announced: string; likely: string; watch: string };

export const path = "/reports/ai-shopping-agents-next-6-months";
export const title = "AI shopping agents in the next 6 months (Nov 2026 to May 2027)";
export const description =
  "What Google, OpenAI, Amazon, Microsoft, Shopify, and Adobe have dated for shopping agents from November 2026 through May 2027. Checked November 5, 2026.";
export const readOn = "2026-11-05";

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
      "OpenAI’s merchant page still says a self-serve portal “later this year.” If that sentence still means 2026, December is the last month it can land. Adobe’s holiday chart runs through December.",
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
