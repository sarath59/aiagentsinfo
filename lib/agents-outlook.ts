export type OutlookMonth = { month: string; announced: string; likely: string; watch: string };

export const path = "/reports/ai-agents-next-6-months";
export const title = "AI agents in the next 6 months (Nov 2026 to May 2027)";
export const description =
  "What is already dated for AI agents from November 2026 through May 2027: coding agents, computer use, harnesses, and regulation. Checked November 5, 2026.";
export const readOn = "2026-11-05";
export const readingMinutes = 12;

export const months: OutlookMonth[] = [
  {
    month: "November 2026",
    announced:
      "Nov 2: Anthropic’s amended S-1. Nov 3: Apple’s Form 10-K and AWS WorkSpaces for AI agents on Linux and Windows 11. Nov 4: Sysdig AI Defense general availability, DeepSeek Harness v0.2.2-rc.1, and Tencent Hy4’s API with computer use. WorkBuddy and CodeBuddy are free from Nov 4 through Nov 15. OpenAI’s computer-use page, read Nov 5, already covers macOS and Windows.",
    likely:
      "Tencent’s Nov 4 post still says weights and system cards in the coming days, and Hy4 Flash soon. Neither sentence names a day. Anthropic’s filing expects short-term compute to keep rising in the near term and does not name a month.",
    watch:
      "Citrix’s Nov 4 release uses “will be able” and “will become” for two SecurAccess controls and does not name a day. OpenAI’s computer-use page does not mention Linux. Whether Hy4 weights are public before December.",
  },
  {
    month: "December 2026",
    announced:
      "Dec 2: EU AI Act timeline. New prohibitions on non-consensual sexual deepfakes and child sexual abuse material apply, and some providers already on the market before Aug 2, 2026 reach the Article 50(2) deadline. Tencent’s 50 percent TokenHub discount on Hy4 runs through Dec 31.",
    likely:
      "No source names a December product day. Tencent’s “coming days” and “soon” are not pinned to December. Anthropic’s “near term” sentence still has no month.",
    watch:
      "Annex III high-risk rules are not a December event. The same EU timeline dates them Dec 2, 2027.",
  },
  {
    month: "January 2027",
    announced: "No page in this set names a launch day in January.",
    likely:
      "January sits inside the 12 months after Sept 30, 2026, when Anthropic says about $69.8 billion of commitments come due. That span runs through Sept 30, 2027, so January is not a deadline by itself.",
    watch: "A revised Anthropic filing that names a month for the short-term compute increase. The Nov 2 prospectus does not.",
  },
  {
    month: "February 2027",
    announced: "No dated agent launch was found for February.",
    likely: "Nothing in the source set is written to February.",
    watch: "Whether DeepSeek Harness has left developer preview. The README, read with the Nov 4 release, still warns of compatibility-breaking changes and does not give a stable date.",
  },
  {
    month: "March 2027",
    announced: "No dated agent launch was found for March.",
    likely: "Nothing in the source set is written to March.",
    watch: "Whether an official Harmony Harness code release appears. The Oct 10 paper does not schedule one.",
  },
  {
    month: "April 2027",
    announced: "No dated agent launch was found for April.",
    likely: "Nothing in the source set is written to April.",
    watch: "The Model Context Protocol’s July 28, 2026 deprecation window is a minimum of 12 months, so it still covers April. It is not a removal date.",
  },
  {
    month: "May 2027",
    announced: "No source names May. May is the end of this report’s window.",
    likely: "Nothing in the source set is written to May.",
    watch:
      "The next dated EU milestones are Aug 2, 2027, for national AI sandboxes, and Dec 2, 2027, for Annex III high-risk rules. Both fall after this window.",
  },
];
