import type { SortableColumn, SortableRow } from "@/lib/sortable";

export const path = "/reports/browser-and-computer-use-agents-next-6-months";
export const title =
  "Browser and computer-use agents next 6 months: 10 products, one date (Nov 2026–May 2027)";
export const description =
  "Browser agents and computer-use agents from November 9, 2026 through May 9, 2027. Ten products that are live, the one day a vendor has named, and the OSWorld 2.0 scores printed on the benchmark page. Checked November 9, 2026.";
export const readOn = "2026-11-09";
export const readingMinutes = 14;

export type OutlookMonth = { month: string; announced: string; likely: string; watch: string };

export const months: OutlookMonth[] = [
  {
    month: "November 2026",
    announced:
      "November 18, 2026: OpenAI’s dot help page says Enterprise billing starts, and that dots become available by default unless a workspace admin opts out. The free admin preview runs from November 4 through November 18.",
    likely:
      "Pro and Business Premium dots are still described as a gradual rollout, with no end date. Texting a dot is a limited U.S. Pro beta, also with no date.",
    watch:
      "Whether November 18 lands for a given workspace. UAE data or inference residency is excluded. Pro dots exclude the EEA, Switzerland, and the UK. The page does not print the Enterprise dollar rate.",
  },
  {
    month: "December 2026",
    announced: "No page in this set names a computer-use or browser-agent launch day in December.",
    likely:
      "The same undated rollouts, if they have not finished: Pro dots, Business Premium dots, and U.S. texting.",
    watch: "A revised OpenAI page that either prints a dot price or drops the rollout language.",
  },
  {
    month: "January 2027",
    announced: "No page in this set names a day in January.",
    likely: "Nothing in the source set is written to January.",
    watch:
      "Whether Claude’s help page still says Team and Enterprise do not have desktop computer use. Whether Chrome auto browse is still limited to the United States and India.",
  },
  {
    month: "February 2027",
    announced: "No dated computer-use or browser-agent launch was found.",
    likely: "Nothing in the source set is written to February.",
    watch: "Whether the OSWorld 2.0 page still prints 20.6 percent as its best 500-step completion.",
  },
  {
    month: "March 2027",
    announced: "No dated computer-use or browser-agent launch was found.",
    likely: "Nothing in the source set is written to March.",
    watch: "Any OpenAI page that names Linux for desktop Computer Use. The guide read on November 9 does not.",
  },
  {
    month: "April 2027",
    announced: "No dated computer-use or browser-agent launch was found.",
    likely: "Nothing in the source set is written to April.",
    watch: "A Browser Use page that states the free-tier concurrency in a sentence. The pricing FAQ does not.",
  },
  {
    month: "May 2027",
    announced: "No source names May. May 9, 2027 is the end of this report’s window.",
    likely: "Nothing in the source set is written to May.",
    watch:
      "Whether Team and Enterprise Claude computer use has shipped, whether Chrome auto browse has another country, and whether the 20.6 percent OSWorld 2.0 figure is still the sentence on the page.",
  },
];

export type CitedSource = { title: string; url: string; note: string };

export const sources: CitedSource[] = [
  {
    title: "OpenAI, Computer Use in the ChatGPT desktop app",
    url: "https://developers.openai.com/codex/computer-use",
    note: "Read November 9, 2026. macOS and Windows with ChatGPT Work and Codex. Linux is not named.",
  },
  {
    title: "OpenAI Help, ChatGPT agent",
    url: "https://help.openai.com/en/articles/11752874-chatgpt-agent",
    note: "Read November 9, 2026. Says ChatGPT agent is no longer available, and that the Operator website is no longer accessible.",
  },
  {
    title: "OpenAI Help, Getting started with your dot",
    url: "https://help.openai.com/en/articles/20001530-getting-started-with-your-dot",
    note: "Read November 9, 2026. Names November 18, 2026 for Enterprise billing and default availability.",
  },
  {
    title: "OpenAI Help, Using cloud browser in ChatGPT",
    url: "https://help.openai.com/en/articles/20001280-using-cloud-browser-in-chatgpt",
    note: "Read November 9, 2026. Paid plans except Free and Go.",
  },
  {
    title: "OpenAI Help, What is ChatGPT Plus?",
    url: "https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus",
    note: "Read November 9, 2026. Plus is $20 a month.",
  },
  {
    title: "OpenAI Help, About ChatGPT Pro tiers",
    url: "https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers",
    note: "Read November 9, 2026. Pro is $100, $200, or $500 a month.",
  },
  {
    title: "Anthropic, Computer use tool",
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool",
    note: "Read November 9, 2026. computer_toolset_20260801. Not available in Claude Managed Agents.",
  },
  {
    title: "Claude Help, Let Claude use your computer in Cowork",
    url: "https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork",
    note: "Read November 9, 2026. Beta for Pro, Max, and Ultra on macOS and Windows. Not Team or Enterprise.",
  },
  {
    title: "Google Cloud, Computer use",
    url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/computer-use",
    note: "Last updated 2026-11-07 UTC. Browser, mobile, and desktop. The client runs each action.",
  },
  {
    title: "Google AI Studio, Computer use",
    url: "https://aistudio.google.com/docs/computer-use",
    note: "Read November 9, 2026. Same loop: screenshot in, action out, your code runs it.",
  },
  {
    title: "Google, Chrome auto browse announcement",
    url: "https://blog.google/products-and-platforms/products/chrome/gemini-3-auto-browse/",
    note: "January 28, 2026. Introduced as a U.S. preview for Google AI Pro and Ultra.",
  },
  {
    title: "Google One, AI plans",
    url: "https://one.google.com/about/google-ai-plans/",
    note: "Read November 9, 2026. Pro $19.99, Ultra 5x $99.99, Ultra 20x $199.99. Auto browse for Pro and Ultra in the US and India.",
  },
  {
    title: "Google One Help, benefit restrictions",
    url: "https://support.google.com/googleone/answer/16105039?hl=en",
    note: "Read November 9, 2026. Auto browse: India and the US, age 18 or older, Chrome 144 or newer, signed in.",
  },
  {
    title: "Perplexity Help, Perplexity Max",
    url: "https://www.perplexity.ai/help-center/en/articles/11680686-perplexity-max",
    note: "Last modified September 14, 2026. Max is $200 a month or $2,000 a year. Highest weekly browser-agent limit, number not printed.",
  },
  {
    title: "Perplexity, Comet",
    url: "https://www.perplexity.ai/comet",
    note: "Read November 9, 2026. Lists Mac, Windows, iOS, and Android. No price on the page.",
  },
  {
    title: "Perplexity pricing",
    url: "https://www.perplexity.ai/hub/pricing",
    note: "Read November 9, 2026. The page displayed US$0 a month and US$17 a month. It did not place the word Pro next to $17 in the text retrieved.",
  },
  {
    title: "Browserbase pricing",
    url: "https://www.browserbase.com/pricing",
    note: "Read November 9, 2026. Free, $20, $99, and custom.",
  },
  {
    title: "Browser Use pricing",
    url: "https://browser-use.com/pricing",
    note: "Read November 9, 2026. $0.02 per browser hour. MIT harness. No subscription.",
  },
  {
    title: "Browser Use, WebVoyager write-up",
    url: "https://browser-use.com/posts/sota-technical-report",
    note: "Published December 15, 2024. 89.1 percent on 586 tasks with gpt-4o, after removing 55 tasks, with manual review.",
  },
  {
    title: "OSWorld 2.0",
    url: "https://osworld-v2.xlang.ai/",
    note: "Read November 9, 2026. 108 tasks. The page text prints 20.6 percent binary and 54.8 percent partial for Claude Opus 4.8 at 500 steps.",
  },
  {
    title: "OSWorld project page",
    url: "https://os-world.github.io/",
    note: "Read November 9, 2026. Points to OSWorld 2.0 as of June 26, 2026. The verified score table did not come through in the text.",
  },
];

const products: {
  id: string;
  vendor: string;
  product: string;
  operates: string;
  availability: string;
  price: string;
  score: string;
  href: string;
}[] = [
  {
    id: "openai-desktop",
    vendor: "OpenAI",
    product: "Computer Use in the ChatGPT desktop app",
    operates: "macOS or Windows apps, including a browser",
    availability: "With ChatGPT Work and Codex, in supported regions. Linux is not named. Windows takes the foreground.",
    price: "No separate computer-use fee on the guide. Plus is $20/month. Pro is $100, $200, or $500/month.",
    score: "None on the guide",
    href: "https://developers.openai.com/codex/computer-use",
  },
  {
    id: "openai-cloud-browser",
    vendor: "OpenAI",
    product: "Cloud browser in ChatGPT Work",
    operates: "Its own browser on a cloud computer",
    availability: "Paid ChatGPT plans except Free and Go. It can keep going after you close the app, and it pauses for sign-in or a payment.",
    price: "No separate browser fee on the help page. Plan prices are the Plus and Pro prices above.",
    score: "None on the help page",
    href: "https://help.openai.com/en/articles/20001280-using-cloud-browser-in-chatgpt",
  },
  {
    id: "openai-dot",
    vendor: "OpenAI",
    product: "Dot",
    operates: "Its own cloud computer. A local computer is optional and starts off.",
    availability:
      "Rolling out to Pro, age 18+, outside the EEA, Switzerland, and the UK, and to Business Premium. Enterprise, Edu, and Healthcare: preview through November 18, 2026, then on unless an admin opts out.",
    price: "Enterprise preview is free November 4 through November 18, 2026. Billing starts November 18. Dollar rates are not printed.",
    score: "None on the help page",
    href: "https://help.openai.com/en/articles/20001530-getting-started-with-your-dot",
  },
  {
    id: "anthropic-desktop",
    vendor: "Anthropic",
    product: "Computer use in Cowork and Claude Code",
    operates: "The person’s Mac or Windows screen, after connectors and the browser",
    availability: "Beta. Pro, Max, and Ultra, in the Claude Desktop app. Team and Enterprise do not have it. The computer has to be awake and the app open.",
    price: "No separate computer-use price on the help page.",
    score: "None on the help page",
    href: "https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork",
  },
  {
    id: "anthropic-api",
    vendor: "Anthropic",
    product: "Claude API computer toolset",
    operates: "A screen in an environment you run. 17 member tools, including screenshot, click, type, and zoom.",
    availability:
      "computer_toolset_20260801 is available on the Claude API, Google Cloud, AWS, Amazon Bedrock, and Microsoft Foundry for the current models on the page. Not in Claude Managed Agents.",
    price: "Standard token rates. Declaring the toolset adds about 4,500 input tokens.",
    score: "None on the tool page",
    href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool",
  },
  {
    id: "google-api",
    vendor: "Google",
    product: "Gemini computer use API",
    operates: "Browser by default. Mobile and desktop are also listed. Your code runs the click.",
    availability:
      "Cloud page updated November 7, 2026. Named models include Gemini 4 Argon, Gemini 3.8 Flash, 3.7 Flash, 3.6 Flash, 3.5 Flash, 3.5 Flash-Lite, Gemini 3 Flash preview, and Gemini Robotics ER 2 preview.",
    price: "No separate computer-use price on the pages read.",
    score: "None on the pages read",
    href: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/computer-use",
  },
  {
    id: "chrome-auto-browse",
    vendor: "Google",
    product: "Chrome auto browse",
    operates: "The person’s Chrome, on multi-step web tasks",
    availability: "Google AI Pro and Ultra, in the US and India, age 18 or older, Chrome 144 or newer, signed in. Announced January 28, 2026 as a U.S. preview.",
    price: "Pro $19.99/month (Expanded). Ultra 5x $99.99/month (Higher). Ultra 20x $199.99/month (Highest). Plus is not marked as including it.",
    score: "None on these pages",
    href: "https://one.google.com/about/google-ai-plans/",
  },
  {
    id: "comet",
    vendor: "Perplexity",
    product: "Comet",
    operates: "An agentic browser. Max help calls the acting feature browser-agent queries.",
    availability: "The Comet page lists Mac, Windows, iOS, and Android. It does not print a price or a country limit.",
    price: "Pricing page showed US$0/month and US$17/month, without the word Pro beside $17. Max is $200/month or $2,000/year. Weekly query cap not printed.",
    score: "None on these pages",
    href: "https://www.perplexity.ai/comet",
  },
  {
    id: "browserbase",
    vendor: "Browserbase",
    product: "Browserbase, with Stagehand",
    operates: "Cloud browsers your own agent drives. Stagehand is Browserbase’s agent SDK.",
    availability: "On sale. Regions named: US East, US West, EU Central, and the UK. Asia Pacific on request for enterprise.",
    price: "Free $0: 1 browser hour, 3 concurrent, 3 agent runs. Developer $20: 100 hours then $0.12/hour. Startup $99: 500 hours then $0.10/hour. Scale: custom.",
    score: "None on the pricing page",
    href: "https://www.browserbase.com/pricing",
  },
  {
    id: "browser-use",
    vendor: "Browser Use",
    product: "Browser Use library and cloud browsers",
    operates: "A browser. The library is MIT. Cloud browsers are hosted Chromium.",
    availability: "On sale, pay as you go. No subscription. The pricing FAQ does not state a free-tier concurrency in a sentence.",
    price: "$0.02 per browser hour, by the minute, 1-minute minimum. Home-IP proxy $5/GB. One-time $1 signup credit. FAQ: $100 paid unlocks 50 at once.",
    score: "89.1% WebVoyager, self-reported December 15, 2024, gpt-4o, 586 tasks. Not a 2026 re-run.",
    href: "https://browser-use.com/pricing",
  },
];

export const productColumns: SortableColumn[] = [
  { key: "vendor", label: "Vendor" },
  { key: "product", label: "Product" },
  { key: "operates", label: "What it operates" },
  { key: "availability", label: "Availability on 9 Nov 2026" },
  { key: "price", label: "Price" },
  { key: "score", label: "Public score" },
];

export function productRows(): SortableRow[] {
  return products.map((item) => ({
    id: item.id,
    sort: {
      vendor: item.vendor,
      product: item.product,
      operates: item.operates,
      availability: item.availability,
      price: item.price,
      score: item.score,
    },
    display: {
      vendor: item.vendor,
      product: item.product,
      operates: item.operates,
      availability: item.availability,
      price: item.price,
      score: item.score,
    },
    href: { product: item.href },
  }));
}

export const osworldColumns: SortableColumn[] = [
  { key: "model", label: "Model" },
  { key: "setting", label: "Setting, as printed" },
  { key: "binary", label: "Binary completion" },
  { key: "partial", label: "Partial score" },
  { key: "tokens", label: "Output tokens" },
];

export const osworldScores = [
  {
    id: "opus-48",
    model: "Claude Opus 4.8",
    setting: "Maximum thinking, batched tool calls, 500-step primary metric",
    binary: "20.6%",
    partial: "54.8%",
    tokens: "244K",
  },
  {
    id: "opus-47",
    model: "Claude Opus 4.7",
    setting: "Maximum thinking, batched tool calls",
    binary: "18.2%",
    partial: "Not printed next to this figure",
    tokens: "150K",
  },
  {
    id: "gpt-55",
    model: "GPT-5.5",
    setting: "The page says it plateaus and is the more token-efficient run",
    binary: "about 14%",
    partial: "Not printed",
    tokens: "39K",
  },
];

export function osworldRows(): SortableRow[] {
  return osworldScores.map((item) => ({
    id: item.id,
    sort: {
      model: item.model,
      setting: item.setting,
      binary: item.binary,
      partial: item.partial,
      tokens: item.tokens,
    },
    display: {
      model: item.model,
      setting: item.setting,
      binary: item.binary,
      partial: item.partial,
      tokens: item.tokens,
    },
  }));
}

export const faq = [
  {
    question: "What is a computer-use agent, and what is a browser agent?",
    answer:
      "A computer-use agent looks at a screen and asks for a click, a keystroke, or a scroll. The app around it runs that action. A browser agent is the narrower case: the work stays in a browser. On the pages read November 9, 2026, Chrome auto browse, ChatGPT Work’s cloud browser, Perplexity Comet, Browserbase, and Browser Use are browser agents. ChatGPT’s desktop Computer Use and Claude’s desktop computer use also drive other apps.",
  },
  {
    question: "Is OpenAI Operator still a product?",
    answer:
      "No. OpenAI’s ChatGPT agent help page, read November 9, 2026, says ChatGPT agent is no longer available and points readers to ChatGPT Work and to the cloud browser. The same page says Operator was folded into agent mode and that the Operator website is no longer accessible. The body of that page still prints older agent message limits. This report does not treat those limits as the allowance for Work.",
  },
  {
    question: "What is already dated between November 9, 2026 and May 9, 2027?",
    answer:
      "November 18, 2026. OpenAI’s dot help page says the Enterprise admin preview runs from November 4 through November 18, that billing starts November 18, and that dots then become available by default unless an admin opts out. No other page in this set names a computer-use or browser-agent launch day through May 9, 2027.",
  },
  {
    question: "Can Claude use my computer on a Team or Enterprise plan?",
    answer:
      "Not on the help page read November 9, 2026. Desktop computer use in Cowork and Claude Code is in beta for Pro, Max, and Ultra, on macOS and Windows. The same article says Team and Enterprise plans do not have computer use. The API toolset is a separate surface. It is available on the Claude API and the cloud platforms listed on Anthropic’s tool page, and it is not available in Claude Managed Agents.",
  },
  {
    question: "What did OSWorld 2.0 and WebVoyager actually print?",
    answer:
      "OSWorld 2.0’s page, read November 9, 2026, says Claude Opus 4.8 with maximum thinking and batched tool calls completes 20.6 percent of 108 long tasks at the 500-step binary metric, with a 54.8 percent partial score. GPT-5.5 plateaus near 14 percent. Above 163 minutes, binary completion falls to zero for every model kept in that plot. Browser Use’s 89.1 percent WebVoyager figure is from its own post dated December 15, 2024, on 586 tasks with gpt-4o, after 55 tasks were removed and uncertain results were reviewed by hand. It is not a 2026 score.",
  },
  {
    question: "Who can use Chrome auto browse today?",
    answer:
      "Google’s AI plans page, read November 9, 2026, says Chrome auto browse is for Google AI Pro and Ultra subscribers in the United States and India. Google One’s restrictions page says it is for people 18 or older, on Chrome 144 or newer, signed in to Chrome. Pro is $19.99 a month, Ultra 5x is $99.99 a month, and Ultra 20x is $199.99 a month. The plans table does not mark Google AI Plus as including auto browse.",
  },
];
