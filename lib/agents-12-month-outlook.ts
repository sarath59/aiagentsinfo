export type OutlookMonth = { month: string; announced: string; likely: string; watch: string };

export const path = "/reports/ai-agents-next-12-months";
export const title = "AI agents in the next 12 months (Nov 2026 to Nov 2027)";
export const description =
  "What is already dated for AI agents from November 2026 through November 2027: coding agents, computer use, harnesses, and regulation, including the August 2027 EU sandbox date and the MCP deprecation window through July 2027. Checked November 7, 2026.";
export const readOn = "2026-11-07";
export const readingMinutes = 16;

export const sources: { title: string; url: string; note: string }[] = [
  {
    title: "Anthropic amended Form S-1",
    url: "https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm",
    note: "Filed with the SEC on November 2, 2026",
  },
  {
    title: "Apple Form 10-K for the year ended September 26, 2026",
    url: "https://www.sec.gov/Archives/edgar/data/320193/000032019326000026/aapl-20260926.htm",
    note: "Auditor’s report dated November 3, 2026",
  },
  {
    title: "EU AI Act implementation timeline",
    url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act",
    note: "European Commission AI Act Service Desk, including the Digital Omnibus",
  },
  {
    title: "OpenAI computer-use guide",
    url: "https://developers.openai.com/codex/computer-use",
    note: "Read November 7, 2026",
  },
  {
    title: "Anthropic computer-use tool",
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool",
    note: "Read November 7, 2026",
  },
  {
    title: "Tencent Hy4 announcement",
    url: "https://www.tencent.com/tencent-launches-hy4-joining-the-ranks-of-the-worlds-leading-open-source-ai-models/",
    note: "November 4, 2026",
  },
  {
    title: "Amazon WorkSpaces for AI agents",
    url: "https://aws.amazon.com/about-aws/whats-new/2026/11/workspaces-ai-agents-linux-windows-11/",
    note: "Posted November 3, 2026",
  },
  {
    title: "Sysdig AI Defense",
    url: "https://www.sysdig.com/press-releases/sysdig-launches-sysdig-ai-defense-bringing-runtime-security-to-every-action-ai-agents-take",
    note: "General availability, November 4, 2026",
  },
  {
    title: "DeepSeek Harness",
    url: "https://github.com/deepseek-ai/DeepSeek-Harness",
    note: "README and release v0.2.2-rc.1, November 4, 2026",
  },
  {
    title: "Harmony Harness",
    url: "https://arxiv.org/abs/2610.15150",
    note: "arXiv 2610.15150, submitted October 10, 2026",
  },
  {
    title: "Model Context Protocol changelog, July 28, 2026",
    url: "https://modelcontextprotocol.io/specification/2026-07-28/changelog",
    note: "Current specification revision read November 7, 2026",
  },
  {
    title: "MCP deprecated-features registry",
    url: "https://modelcontextprotocol.io/specification/2026-07-28/deprecated",
    note: "Earliest removal dates, read November 7, 2026",
  },
  {
    title: "MCP feature lifecycle and deprecation policy",
    url: "https://modelcontextprotocol.io/community/feature-lifecycle",
    note: "Minimum twelve-month window and the expedited-removal exception",
  },
  {
    title: "UK DRCF joint statement",
    url: "https://www.gov.uk/government/publications/agentic-ai-and-consumers",
    note: "Published October 30, 2026. PDF linked from the DRCF page",
  },
  {
    title: "UK agentic AI resilience factsheet",
    url: "https://www.gov.uk/government/publications/cyber-security-and-resilience-network-and-information-systems-bill-factsheets/agentic-ai-resilience-measures",
    note: "Updated November 3, 2026",
  },
  {
    title: "Cyber Security and Resilience Bill, UK Parliament",
    url: "https://bills.parliament.uk/bills/4035/news",
    note: "Carry-over to the end of April 29, 2027, recorded November 4, 2026",
  },
  {
    title: "Opening address, GovTech STACK 2026",
    url: "https://www.mddi.gov.sg/newsroom/opening-address-by-sms-mr-tan-kiat-how-at-govtech-stack-conference-2026-on-5-nov/",
    note: "Singapore Ministry of Digital Development and Information, November 5, 2026",
  },
  {
    title: "Citrix secure AI adoption announcement",
    url: "https://www.citrix.com/news/announcements/nov-2026/citrix-advances-secure-ai-adoption.html",
    note: "November 4, 2026",
  },
];

export const months: OutlookMonth[] = [
  {
    month: "November 2026",
    announced:
      "Nov 2: Anthropic’s amended S-1. The same day, the House of Lords finished third reading of the Cyber Security and Resilience Bill. Parliament’s news page describes language and definition amendments, not a start date for agent rules. Nov 3: Apple’s Form 10-K, AWS WorkSpaces for AI agents on Linux and Windows 11, and a GOV.UK factsheet update on agentic-AI measures that names no start day. Nov 4: Sysdig AI Defense general availability, DeepSeek Harness v0.2.2-rc.1, Tencent Hy4’s API, Citrix SecurSpaces updates generally available, and a Commons carry-over motion that moves the bill’s lapse date to the end of April 29, 2027. Nov 5: Singapore’s MDDI speech says GovTech is developing GovHarness and describes an ARC framework. Neither has a launch day. OpenAI’s computer-use page, read Nov 7, covers macOS and Windows.",
    likely:
      "Tencent’s Nov 4 post still says weights and system cards in the coming days, and Hy4 Flash soon. The heading says Hy4 Flash was recently released; the body says it is scheduled for release soon, and this report follows the body. Neither sentence names a day. Citrix says the SecurAccess updates will be available by the end of November and does not name a day. Anthropic’s filing expects short-term compute to keep rising in the near term and does not name a month.",
    watch:
      "Citrix still uses “will be able” and “will become” for two SecurAccess controls. OpenAI’s computer-use page does not mention Linux. Whether Hy4 weights are public before December. GovHarness has no ship date. A later check should confirm the SecurAccess updates by November 30 or drop them.",
  },
  {
    month: "December 2026",
    announced:
      "Dec 2: EU AI Act timeline. New prohibitions on non-consensual sexual deepfakes and child sexual abuse material apply, and some providers already on the market before Aug 2, 2026 reach the Article 50(2) deadline. Tencent’s 50 percent TokenHub discount on Hy4 runs through Dec 31. The WorkBuddy and CodeBuddy free window ended Nov 15, so it is not a December offer.",
    likely:
      "No source names a December product day. Tencent’s “coming days” and “soon” are not pinned to December. Anthropic’s “near term” sentence still has no month. December sits inside the 12 months after Sept 30, 2026, when about $69.8 billion of commitments come due. That span is not a December deadline.",
    watch: "Annex III high-risk rules are not a December 2026 event. The same EU timeline dates them Dec 2, 2027.",
  },
  {
    month: "January 2027",
    announced: "No page in this set names a launch day in January.",
    likely:
      "January sits inside the 12 months after Sept 30, 2026, when Anthropic says about $69.8 billion of commitments come due. That span runs through Sept 30, 2027, so January is not a deadline by itself. “Near term” is still not pinned to January.",
    watch: "A revised Anthropic filing that names a month for the short-term compute increase. The Nov 2 prospectus does not.",
  },
  {
    month: "February 2027",
    announced: "No dated agent launch was found for February.",
    likely: "February is inside the same commitment span and is not named as its own deadline.",
    watch:
      "Whether DeepSeek Harness has left developer preview. The README, read November 7 with the November 4 release still the newest, warns of compatibility-breaking changes and does not give a stable date.",
  },
  {
    month: "March 2027",
    announced: "No dated agent launch was found for March.",
    likely: "March is inside the commitment span and is not named as its own deadline.",
    watch: "Whether an official Harmony Harness code release appears. The October 10 paper does not schedule one.",
  },
  {
    month: "April 2027",
    announced:
      "The House of Commons carry-over motion of November 4, 2026 says proceedings on the Cyber Security and Resilience (Network and Information Systems) Bill lapse at the end of April 29, 2027, rather than at the end of November 11, 2026. That is a procedural expiry for the bill, not Royal Assent and not a start date for agent rules.",
    likely:
      "April is inside Anthropic’s commitment span. The GOV.UK agentic-AI factsheet, updated November 3, still does not name April for the four measures it says will follow consultation.",
    watch:
      "The MCP registry’s ordinary earliest removal is a revision released on or after July 28, 2027, so April is still inside that window. It is not a removal date.",
  },
  {
    month: "May 2027",
    announced: "No source names a May launch. The separate six-month report ends with May. This page does not.",
    likely: "May is inside the commitment span and is not a named deadline.",
    watch: "The next dated marks after May are July 28, 2027, for MCP eligibility, and August 2, 2027, for EU national AI sandboxes.",
  },
  {
    month: "June 2027",
    announced: "No source names a June launch.",
    likely:
      "June is inside the commitment span, which runs through September 30, 2027, and is not a named deadline. “Near term” is still not pinned to June.",
    watch: "Nothing in the source set is scheduled for June. The next dated marks are July 28 and August 2.",
  },
  {
    month: "July 2027",
    announced:
      "The MCP deprecated-features registry for the July 28, 2026 specification says Roots, Sampling, Logging, and Dynamic Client Registration become eligible for removal in the first revision released on or after July 28, 2027. That date is eligibility. Removal is a later maintainer decision. The registry, read November 7, says no feature has been removed under the policy yet.",
    likely: "July is inside the span through September 30, 2027, when about $69.8 billion of Anthropic’s commitments are due. July 28 is not a payment date.",
    watch:
      "The lifecycle policy allows a shorter window, still at least 90 days, if maintainers approve an expedited removal for an active security risk. No such shortening was on the registry read November 7.",
  },
  {
    month: "August 2027",
    announced:
      "August 2: the EU AI Act Service Desk timeline says member states should have at least one AI regulatory sandbox operational. The timeline includes the Digital Omnibus amendments.",
    likely:
      "August is inside the commitment span through September 30, 2027. The sandbox date is a duty on member states, not a product launch.",
    watch: "Annex III high-risk rules remain December 2, 2027. They do not move into August.",
  },
  {
    month: "September 2027",
    announced:
      "No product launch is dated in September. September 30, 2027 is the last day of the 12 months following September 30, 2026, the span in which Anthropic’s November 2 filing says about $69.8 billion of commitments are due. The filing does not say that sum is payable on September 30.",
    likely: "September is the last month inside that span. “Near term” is still not pinned to September.",
    watch: "A filing that breaks the $69.8 billion figure into named months. The November 2 prospectus does not.",
  },
  {
    month: "October 2027",
    announced: "No source names an October launch.",
    likely:
      "October is after the 12 months following September 30, 2026. The $69.8 billion sentence does not cover it. No undated phrase in this set is written to October.",
    watch: "Annex III high-risk rules are still December 2, 2027, after this report’s window.",
  },
  {
    month: "November 2027",
    announced: "No source names a November 2027 launch. November 2027 is the end of this report’s window.",
    likely: "Nothing in the source set is written to November 2027. The commitment span ended September 30, 2027.",
    watch:
      "The next EU date on the Service Desk timeline is December 2, 2027, for Annex III high-risk rules, which is after this window. Rules for high-risk AI embedded in Annex I products are dated August 2, 2028.",
  },
];
