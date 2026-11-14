import Link from "next/link";
import { ReportLayout } from "@/components/ReportLayout";
import { DataSourceLine } from "@/components/DataSourceLine";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { NextRead } from "@/components/NextRead";
import { ToolCtas } from "@/components/ToolCtas";
import { FaqList } from "@/components/FaqList";
import { categoryTitle, getBlogPost } from "@/lib/blog";
import { categorySummaries } from "@/lib/directory-meta";
import { getGlossaryTerm } from "@/lib/glossary";
import {
  description,
  metaDescription,
  months,
  path,
  readOn,
  readingMinutes,
  shoppingFaq,
  title,
  updatedOn,
} from "@/lib/shopping-report";
import { JsonLd, datasetJsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site, topics } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata = defaultMetadata(title, metaDescription, path, { absoluteTitle: true });

export default async function ShoppingAgentsReportPage() {
  const [guide, readable, harness, shoppingAgent, checkout, feed] = await Promise.all([
    getBlogPost("can-an-ai-shopping-agent-check-out-for-you"),
    getBlogPost("how-to-make-your-store-readable-by-ai-shopping-agents"),
    getBlogPost("what-is-an-ai-agent-harness"),
    getGlossaryTerm("shopping-agent"),
    getGlossaryTerm("agentic-checkout"),
    getGlossaryTerm("product-feed"),
  ]);
  const related = [
    {
      href: "/blog/can-ai-agents-book-flights",
      title: "Can AI agents book flights? United can cancel the reservation",
      description:
        "United's November 11, 2026 contract bars an agent from booking or buying a seat. Shopify and ChatGPT Wallet opened a sanctioned door on November 13.",
      kicker: "News",
      date: "2026-11-14",
    },
    {
      href: "/blog/can-an-ai-agent-buy-things-online",
      title: "Can an AI agent buy things online for me? Navoka gives it a separate card",
      description:
        "Wirex’s Navoka, launched November 12, 2026, pays from the agent’s own IBAN and debit card. Limits are checked at authorisation.",
      kicker: "News",
      date: "2026-11-13",
    },
    {
      href: "/blog/how-do-ai-shopping-agents-pay",
      title: "How do AI shopping agents pay?",
      description:
        "Delegated tokens, AP2 mandates, Visa, Mastercard, Shop Pay, and Amazon Buy for Me. Read November 12, 2026.",
      kicker: "Guide",
      date: "2026-11-12",
    },
    {
      href: "/blog/ai-shopping-agents-compared-november-2026",
      title: "4 of 5 shopping agents can finish checkout. ChatGPT’s page says the store does.",
      description:
        "Who can complete a purchase on November 11, 2026, which protocol the page names, and which merchant fee is published.",
      kicker: "Guide",
      date: "2026-11-11",
    },
    {
      href: "/research/agentic-commerce-protocol-adoption-november-2026",
      title: "AP2 has 3,270 stars and no package. @x402/core had 1,940,555 downloads",
      description:
        "GitHub, npm, and PyPI for ACP, UCP, AP2, and x402, read November 11, 2026. Checkout behavior stays on this page.",
      kicker: "Research",
      date: "2026-11-11",
    },
    {
      href: "/research/ai-agents-next-12-months-scorecard-november-2026",
      title: "AI agents next 12 months: the $69.8 billion line is now $70.7 billion",
      description:
        "A November 11 re-read of the 12-month calendar. Checkout stays on this page.",
      kicker: "Research",
      date: "2026-11-11",
    },
    {
      href: "/reports/ai-agents-next-12-months",
      title: "AI agents, Nov 2026 to Nov 2027",
      description:
        "The 12-month flagship for coding agents, computer use, harnesses, and regulation. Shopping checkout stays on this page.",
      kicker: "Report",
      date: "2026-11-07",
    },
    {
      href: "/reports/ai-agents-next-6-months",
      title: "AI agents, Nov 2026 to May 2027",
      description:
        "What filings and company pages have dated for coding agents, computer use, harnesses, and regulation from November 2026 through May 2027.",
      kicker: "Report",
      date: "2026-11-05",
    },
    guide
      ? {
          href: `/blog/${guide.slug}`,
          title: guide.title,
          description: guide.description,
          kicker: categoryTitle(guide.category),
          date: guide.date,
          readingMinutes: guide.readingMinutes,
        }
      : undefined,
    readable
      ? {
          href: `/blog/${readable.slug}`,
          title: readable.title,
          description: readable.description,
          kicker: categoryTitle(readable.category),
          date: readable.date,
          readingMinutes: readable.readingMinutes,
        }
      : undefined,
    harness
      ? {
          href: `/blog/${harness.slug}`,
          title: harness.title,
          description: harness.description,
          kicker: categoryTitle(harness.category),
          date: harness.date,
          readingMinutes: harness.readingMinutes,
        }
      : undefined,
    shoppingAgent
      ? {
          href: "/glossary/shopping-agent",
          title: shoppingAgent.term,
          description: shoppingAgent.shortDefinition,
          kicker: "Glossary",
        }
      : undefined,
    checkout
      ? {
          href: "/glossary/agentic-checkout",
          title: checkout.term,
          description: checkout.shortDefinition,
          kicker: "Glossary",
        }
      : undefined,
    feed
      ? {
          href: "/glossary/product-feed",
          title: feed.term,
          description: feed.shortDefinition,
          kicker: "Glossary",
        }
      : undefined,
    {
      href: "/directory/amazon-rufus",
      title: "Amazon Rufus latest features (Nov 2026)",
      description:
        "Alexa for Shopping, including the November 6, 2026 text rollout for some U.S. customers.",
      kicker: "Directory",
    },
    {
      href: "/directory/category/shopping-agents",
      title: "Shopping agents in the directory",
      description: categorySummaries["shopping-agents"],
      kicker: "Directory",
    },
    {
      href: "/topics/shopping",
      title: "Shopping topic",
      description: topics.find((topic) => topic.slug === "shopping")?.summary ?? "",
      kicker: "Topic",
    },
  ].filter((item) => item !== undefined);
  const updatedLabel = formatDate(updatedOn);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." Last updated ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${description}</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info, last updated ${updatedLabel}.</footer>
</blockquote>`;

  return (
    <>
      <JsonLd data={webPageJsonLd({ title, description, path, datePublished: readOn, dateModified: updatedOn })} />
      <JsonLd
        data={datasetJsonLd({
          title,
          description,
          path,
          datePublished: readOn,
          dateModified: updatedOn,
        })}
      />
      <JsonLd data={faqPageJsonLd(shoppingFaq)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reports", path: "/reports" },
          { name: title, path },
        ]}
      />
      <ReportLayout
        category="Report"
        title={title}
        thesis="Google can check out in Canada. ChatGPT, re-read November 13, 2026, still sends the shopper to the store. A month with no date stays empty."
        description={description}
        published={readOn}
        updated={updatedOn}
        readingMinutes={readingMinutes}
        byline={site.bylines.research}
        wide
        takeaways={[
          "From November 2026 through May 2027, the public record is a short list of rollouts already underway and a handful of phrases with no day attached.",
          "Google has direct checkout running for named Canadian retailers as of November 4, and a U.S. cart that launched October 15.",
          "OpenAI's merchant page, re-read November 13, 2026, still sends the ChatGPT purchase to the store's own site or app.",
          "A month with no dated launch is left empty on purpose.",
        ]}
        toc={[
          { id: "can-ai-buy-things-online", text: "Can AI buy things online for you?", level: 2 },
          { id: "how-a-claim-is-sorted", text: "How a claim is sorted", level: 2 },
          { id: "announced", text: "Announced", level: 2 },
          { id: "likely", text: "Likely", level: 2 },
          { id: "watch-for", text: "Watch for", level: 2 },
          { id: "month-by-month", text: "Month by month", level: 2 },
          { id: "what-a-shopping-agent-is", text: "What is an AI shopping agent?", level: 2 },
          { id: "how-to-use-one-today", text: "How do you use an AI shopping agent today?", level: 2 },
          { id: "where-the-harness-draws-the-line", text: "Where the harness draws the line", level: 2 },
          { id: "left-out", text: "Left out", level: 2 },
          { id: "faq", text: "FAQ", level: 2 },
          { id: "citation", text: "Cite or embed", level: 2 },
        ]}
        citation={<CiteOrEmbed citation={citation} embed={embed} />}
        related={related}
      >
        <div className="article-prose">
          <h2 id="can-ai-buy-things-online">Can AI buy things online for you?</h2>
          <p>
            Sometimes. Google can check out for named Canadian retailers with Google Pay, and the retailer stays the
            seller, while ChatGPT, re-read November 13, 2026, still sends the shopper to the store. Amazon can buy at a
            price a U.S. customer sets, and Copilot Checkout can finish inside Copilot for eligible U.S. sales. No
            source in this report names a new checkout day through May 2027.
          </p>
          <p>
            Flight booking is outside this retail calendar. On November 11, 2026,{" "}
            <a
              className="text-[var(--link)] underline"
              href="https://united.mediaroom.com/news-releases?item=125496"
            >
              United Airlines said
            </a>{" "}
            it is taking steps to prohibit unauthorized third-party personal AI agents from its booking, ticketing, and
            distribution channels.
          </p>
          <p>
            Who can pay today, product by product, is{" "}
            <Link href="/blog/can-an-ai-shopping-agent-check-out-for-you">
              Can an AI shopping agent check out for you?
            </Link>
            . The November 11 comparison of who can finish checkout is{" "}
            <Link href="/blog/ai-shopping-agents-compared-november-2026">AI shopping agents compared</Link>.
          </p>
          <p>
            Google has direct checkout running for named Canadian retailers as of November 4, 2026, and a U.S. cart
            that launched October 15. OpenAI&apos;s merchant page, re-read November 13, 2026, still sends the ChatGPT purchase to
            the store&apos;s own site or app. From November 2026 through May 2027, the public record is that short list
            of rollouts already underway and a handful of phrases with no day attached. Amazon&apos;s October 29
            earnings release counts users of Alexa for Shopping and does not name the next launch. Microsoft&apos;s
            Copilot Checkout page says it cannot give a timeline for other countries.
          </p>
          <p>
            The dated work inside the window is Google&apos;s: simplified Universal Commerce Protocol tools in Merchant
            Center “starting next year,” loyalty rewards “in the coming months,” and Australia and Canada “early next
            year” on the developer guide. OpenAI aims at a self-serve merchant platform “later this year,” and more
            regions “over time.” Adobe has published holiday traffic forecasts for November and December. Those figures
            are clicks from an AI source onto a retail site. They are not a count of agents paying on their own.
          </p>
          <p>
            A month with no dated launch is left empty on purpose. Who can pay today is covered in{" "}
            <Link href="/blog/can-an-ai-shopping-agent-check-out-for-you">
              Can an AI shopping agent check out for you?
            </Link>
            . Which credential moves is{" "}
            <Link href="/blog/how-do-ai-shopping-agents-pay">How do AI shopping agents pay?</Link>
            . Amazon Rufus, now shown in the store as Alexa for Shopping, added text shopping for some U.S. customers
            on November 6, 2026. That note is{" "}
            <Link href="/directory/amazon-rufus#what-are-the-latest-amazon-rufus-features-and-expansion-in-november-2026">
              Amazon Rufus latest features and expansion in November 2026
            </Link>
            . What a merchant publishes so an agent can quote a real row is{" "}
            <Link href="/blog/how-to-make-your-store-readable-by-ai-shopping-agents">
              how to make your store readable by AI shopping agents
            </Link>
            . The November 11 comparison of who can complete checkout, which protocol the page names,
            and which merchant fee is published is{" "}
            <Link href="/blog/ai-shopping-agents-compared-november-2026">
              4 of 5 shopping agents can finish checkout. ChatGPT’s page says the store does.
            </Link>
            .
          </p>
          <p>
            A store can score the same job in the browser. The{" "}
            <Link href="/tools/shopping-agent-readiness-checker">shopping agent readiness checker</Link> is 18 weighted
            checks for find, read, and checkout. The score and the gap list stay on the page.
          </p>
        </div>
        <NextRead
          reads={[
            {
              href: "/blog/how-to-make-your-store-readable-by-ai-shopping-agents",
              title: "How to make your store readable by AI shopping agents",
              note: "Nine OpenAI feed fields, Google’s checkout flag, and Shopify’s catalog sync.",
            },
            {
              href: "/blog/how-do-ai-shopping-agents-pay",
              title: "How do AI shopping agents pay?",
              note: "The token, the mandate, or Amazon’s encrypted card handoff.",
            },
            {
              href: "/blog/can-an-ai-shopping-agent-check-out-for-you",
              title: "Can an AI shopping agent check out for you?",
              note: "Who can pay today, and who still sends the shopper to the store.",
            },
            {
              href: "/blog/how-do-you-evaluate-an-ai-agent-harness",
              title: "How to evaluate an AI agent harness",
              note: "The checks for the software that calls a catalog.",
            },
            {
              href: "/reports/agent-harness-benchmark-november-2026",
              title: "November 2026 harness benchmark",
              note: "Public coding scores, a different job from a product feed.",
            },
            {
              href: "/tools/shopping-agent-readiness-checker",
              title: "Shopping agent readiness checker",
              note: "18 checks for find, read, and checkout. The score stays in the browser.",
            },
          ]}
          tool={{
            href: "/tools/ai-agent-harness-evaluation-checklist",
            title: "harness evaluation checklist",
            note: "twelve sourced checks, counted in the browser",
          }}
        />
        <section className="glass article-callout mt-10 rounded-3xl p-6 sm:p-8">
          <h2 id="how-a-claim-is-sorted" className="text-2xl font-semibold tracking-tight">How a claim is sorted</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Announced</strong> means a linked company page or an
            Adobe page says it.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Likely</strong> means that page aims the work at this
            six-month stretch and does not name a day. The word means “their phrase covers these months.” It is not a
            new odds estimate from this desk.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            <strong className="font-semibold text-[var(--fg)]">Watch for</strong> means a later check should confirm
            the item or drop it: the page withholds a date, two pages disagree, or a follow-up named earlier was not
            on the pages re-read November 13, 2026.
          </p>
        </section>

        <section className="mt-12">
          <h2 id="announced" className="text-2xl font-semibold tracking-tight">Announced</h2>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              <a className="text-[var(--link)] underline" href="https://blog.google/products-and-platforms/products/shopping/universal-cart-launch/">
                Google&apos;s Universal Cart
              </a>{" "}
              rolled out in the United States on October 15, 2026, in Search and in the{" "}
              <Link className="text-[var(--link)] underline" href="/directory/gemini">Gemini</Link> app. The cart holds
              items from more than one store. Google says it sits on the Shopping Graph, “60+ billion continually
              refreshed product listings,” and can notify a shopper about a price drop or a restock. Checkout can use
              Google Pay in the cart, or the items can move to the merchant&apos;s cart. The post names Nike, Sephora,
              Target, Ulta Beauty, Walmart, Wayfair, and many Shopify merchants. The merchant remains the seller of
              record.
            </p>
            <p>
              <a
                className="text-[var(--link)] underline"
                href="https://blog.google/intl/en-ca/products/explore-get-answers/a-new-way-to-shop-introducing-a-more-intuitive-agentic-shopping-experience-for-consumers-and-retailers-in-canada/"
              >
                On November 4, 2026
              </a>
              , Google Canada said direct checkout powered by the Universal Commerce Protocol was rolling out to
              Canadian shoppers on AI Mode in Search and in the Gemini app. The named participants are lululemon,
              select Shopify merchants, Shoppers Drug Mart, and Simons. Payment uses Google Pay and shipping details
              saved in Google Wallet. Retailers remain the seller of record. The post says Google&apos;s research found
              that 59 percent of holiday shoppers in Canada plan to use an AI tool to help them shop this season. The
              post does not print the sample size, the question wording, or the fieldwork dates.
            </p>
            <p>
              <a className="text-[var(--link)] underline" href="https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/">
                On January 11, 2026
              </a>
              , Google said it was launching that protocol with Shopify, Etsy, Wayfair, Target, and Walmart, and that
              more than 20 other companies endorsed it, including Adyen, American Express, Best Buy, Flipkart,
              Macy&apos;s Inc., Mastercard, Stripe, The Home Depot, Visa, and Zalando. The same post said U.S. checkout
              would use Google Pay, and that shoppers would soon be able to pay with PayPal. The October 15 and
              November 4 posts describe Google Pay. They do not say PayPal checkout is live.
            </p>
            <p>
              <a className="text-[var(--link)] underline" href="https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/google">
                Shopify&apos;s help page
              </a>
              , read November 5, describes its own direct checkout inside Google AI Mode and Gemini. The same URL
              returned HTTP 403 on November 13, so this paragraph is not a new reading. A store has to
              sell to customers in the United States, Canada, or Australia. Direct checkout is on by default for an
              eligible store, and it is rolling out gradually to customers in those three countries. The shopper pays
              with a credit or debit card in a Shopify-powered checkout. Shopify says there is no extra fee beyond
              ordinary payment processing. The page lists loyalty or rewards blocks among the checkout blocks that
              might not load there.
            </p>
            <p>
              <a className="text-[var(--link)] underline" href="https://openai.com/chatgpt/search-product-discovery/">
                OpenAI&apos;s merchant page
              </a>
              , re-read November 13, 2026, says shopping in{" "}
              <Link className="text-[var(--link)] underline" href="/directory/chatgpt">ChatGPT</Link> is live for users
              in the United States. Shoppers discover and compare in the chat. They complete the purchase on the
              merchant&apos;s website or app. The page says there are no fees on purchases that start in ChatGPT.
              Shopify and Etsy catalogs are already integrated.{" "}
              <a className="text-[var(--link)] underline" href="https://openai.com/index/powering-product-discovery-in-chatgpt/">
                The March 24, 2026 post
              </a>{" "}
              is the course change: the first Instant Checkout “did not offer the level of flexibility that we aspire
              to provide,” so merchants would use their own checkout while OpenAI focused on discovery. That post
              names Target, Sephora, Nordstrom, Lowe&apos;s, Best Buy, The Home Depot, and Wayfair as retailers already
              on the Agentic Commerce Protocol for discovery. It also says a Walmart app inside ChatGPT was available
              in web browsers, with iOS and Android to follow shortly.
            </p>
            <p>
              <a className="text-[var(--link)] underline" href="https://press.aboutamazon.com/2026/10/amazon-com-announces-third-quarter-results">
                Amazon&apos;s October 29 earnings release
              </a>{" "}
              says Alexa for Shopping was used by 400 million or more customers in the last 12 months, with customer
              interactions up 570 percent year over year. It also says Amazon added more than 100 capabilities,
              including gift lists, Subscribe &amp; Save changes, payments and memberships, and new delivery addresses.
              The{" "}
              <a className="text-[var(--link)] underline" href="https://www.aboutamazon.com/news/retail/how-to-use-amazon-shopping-ai-assistant">
                guide updated the same day
              </a>{" "}
              says all U.S. customers can use{" "}
              <Link className="text-[var(--link)] underline" href="/directory/amazon-rufus">Alexa for Shopping</Link> on
              the Shopping app and on Amazon.com. Fourth-quarter guidance in the release is net sales of $240.0 billion
              to $247.0 billion and operating income of $28.5 billion to $33.5 billion. Those ranges are for the
              company. They do not split out the shopping assistant.
            </p>
            <p>
              <a className="text-[var(--link)] underline" href="https://about.ads.microsoft.com/en/solutions/technology/agentic-commerce">
                Microsoft&apos;s Agentic Commerce page
              </a>
              , re-read November 13, 2026, says Copilot Checkout is on Copilot.com and the Copilot mobile app, with
              plans to expand to more surfaces soon. Eligible merchants are English-language merchants who sell to U.S.
              buyers, in U.S. dollars. The merchant stays the merchant of record. Shopify merchants are described as
              automatically enrolled, with controls in Shopify admin. Stripe&apos;s Agentic Commerce Suite is named as
              another path. The text retrieved that day does not state a commission or an affiliate fee, and it does
              not mention PayPal. A single payment-service partner is supported per merchant. Microsoft says it cannot
              give a timeline for other countries.
            </p>
            <p>
              <a className="text-[var(--link)] underline" href="https://newsroom.paypal-corp.com/2025-11-PayPal-and-Perplexity-Launch-Instant-Buy">
                PayPal&apos;s November 25, 2025 release
              </a>{" "}
              says U.S. users could check out inside{" "}
              <Link className="text-[var(--link)] underline" href="/directory/perplexity">Perplexity</Link> with PayPal,
              and that the retailer remained the merchant of record. The launch examples are Abercrombie &amp; Fitch,
              Ashley Furniture, Fabletics, Adorama, and Newegg. That is the launch list.
            </p>
            <p>
              <a className="text-[var(--link)] underline" href="https://business.adobe.com/blog/ai-traffic-higher-revenue-per-visit-retail-holiday">
                Adobe&apos;s October 29 report
              </a>
              , by Vivek Pandya, measures AI traffic as a click from an AI source onto a U.S. retail site. In September
              2026 that traffic grew 71 percent year over year. It converted 90 percent better than other traffic.
              Visitors spent 73 percent more time, viewed 25 percent more pages, and added to the cart at a 53 percent
              higher rate. Revenue per visit was 83 percent higher. Adobe says the underlying set is more than 1
              trillion visits, 100 million SKUs, and 18 product categories. A separate September survey of more than
              5,000 U.S. respondents is described as extra context, and it is not the source of those traffic rates.
              The{" "}
              <a className="text-[var(--link)] underline" href="https://business.adobe.com/resources/holiday-shopping-report.html">
                holiday forecast page
              </a>
              , re-read November 13, 2026, says AI-driven traffic grew 127 percent year over year in August 2026, and that
              holiday traffic is expected to grow 130 percent overall and 141 percent on Thanksgiving.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="likely" className="text-2xl font-semibold tracking-tight">Likely</h2>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              Google Canada, November 4: “Starting next year, we&apos;ll begin broadening access by making simplified
              UCP integration available directly within Merchant Center.” The same post: “In the coming months,
              we&apos;ll work with retailers to add more capabilities, like applying loyalty rewards.”
            </p>
            <p>
              The{" "}
              <a className="text-[var(--link)] underline" href="https://developers.google.com/merchant/ucp/guides/merchant-center/integration">
                developer guide
              </a>
              , last updated 2026-11-06 UTC and re-read November 13, says the UCP hub “is gradually rolling out in the United States, with
              Australia and Canada to follow early next year.” Identity linking is labeled coming soon. The
              capabilities named for a live integration are transfer to the merchant&apos;s cart and native checkout on
              Google.{" "}
              <a className="text-[var(--link)] underline" href="https://support.google.com/merchants/answer/16992327?hl=en">
                Merchant Center help
              </a>
              , re-read November 13, uses “next year” for Australia and Canada and does not add “early.” It also lists
              identity linking among capabilities a merchant can select. The developer guide still marks that
              capability coming soon.
            </p>
            <p>
              OpenAI&apos;s merchant page says, “We&apos;re building a merchant platform for self-serve data
              integration later this year, and plan to expand to more merchants and regions over time.” A second line
              says OpenAI aims to have a self-service merchant portal later this year. Re-read on November 13, “later this
              year” still means the rest of 2026, if the sentence is current. The page does not say November or
              December. The page, as retrieved, has no visible updated date.
            </p>
            <p>
              Adobe&apos;s October 29 report expects AI traffic to rise 159 percent year over year on Thanksgiving, 95
              percent on Black Friday, and 88 percent on Cyber Monday, and it expects the revenue-per-visit advantage
              to double this holiday season. The holiday page&apos;s Thanksgiving figure is 141 percent. The October 29
              report&apos;s figure is 159 percent. Both numbers are Adobe&apos;s. The likely event is a holiday surge
              in AI-referred visits. The size of the Thanksgiving jump is the gap between those two pages.
            </p>
            <p>
              Microsoft says Copilot Checkout has “plans to expand to additional surfaces soon.” That is the forward
              phrase on the page with a short horizon. The country question, on the same page, has no timeline, so it
              sits under Watch for.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="watch-for" className="text-2xl font-semibold tracking-tight">Watch for</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-[var(--muted)]">
            <li>
              PayPal on Google checkout. The January 11 post said it would arrive soon. The October 15 and November 4
              posts describe Google Pay.
            </li>
            <li>
              Identity linking, marked “coming soon” on the developer guide re-read November 13 (the page says it was
              last updated 2026-11-06 UTC). Google&apos;s November 4 post
              talks about loyalty rewards in the coming months and does not say that API has shipped. Shopify&apos;s
              help page, separately, says loyalty or rewards blocks might not load in the Shopify-powered checkout
              inside Google. Those are two surfaces.
            </li>
            <li>
              Walmart&apos;s phone apps inside ChatGPT. The March 24 post said iOS and Android would follow the web
              app. This report did not find a later OpenAI page that says they shipped.
            </li>
            <li>
              Any Copilot Checkout country besides the United States. Microsoft&apos;s page says it cannot provide a
              timeline.
            </li>
            <li>
              A dated next step for Alexa for Shopping. The October 29 release describes current use and does not name
              a launch through May 2027.
            </li>
            <li>
              Adobe&apos;s post-holiday recap, which should show whether the Thanksgiving figure Adobe stands behind is
              141 percent or 159 percent.
            </li>
            <li>
              Perplexity&apos;s current Instant Buy rules. The help article did not load on November 5, so this report
              uses the November 25, 2025 PayPal release and does not describe today&apos;s plan exclusions. The{" "}
              <Link className="text-[var(--link)] underline" href="/directory/perplexity">directory listing</Link> and
              the{" "}
              <Link className="text-[var(--link)] underline" href="/blog/can-an-ai-shopping-agent-check-out-for-you">
                checkout guide
              </Link>{" "}
              are the on-site pages. The guide&apos;s Instant Buy paragraph was checked November 4.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 id="month-by-month" className="text-2xl font-semibold tracking-tight">Month by month, November 2026 to May 2027</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            An empty announcement means no linked source named that month. It is not a prediction that the month will
            be quiet, and it is not a prediction that a product will ship.
          </p>
          <div className="mt-5 grid gap-4">
            {months.map((item) => (
              <article key={item.month} className="glass rounded-3xl p-6">
                <h3 className="text-xl font-semibold tracking-tight">{item.month}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  <strong className="font-semibold text-[var(--fg)]">Announced. </strong>
                  {item.announced}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  <strong className="font-semibold text-[var(--fg)]">Likely. </strong>
                  {item.likely}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  <strong className="font-semibold text-[var(--fg)]">Watch for. </strong>
                  {item.watch}
                </p>
              </article>
            ))}
          </div>
          <DataSourceLine title={title} updated={updatedOn} path={path} />
        </section>

        <section className="mt-12">
          <h2 id="what-a-shopping-agent-is" className="text-2xl font-semibold tracking-tight">What is an AI shopping agent?</h2>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              <Link className="text-[var(--link)] underline" href="/glossary/agent">
                What are AI agents and how do they work?
              </Link>{" "}
              A shopping agent is one of the{" "}
              <Link className="text-[var(--link)] underline" href="/glossary/agent">
                types of AI agents
              </Link>{" "}
              on this site: a job, not a textbook species. The model reads the request. The{" "}
              <Link className="text-[var(--link)] underline" href="/glossary/harness">harness</Link> calls a catalog, a
              price check, a cart, and, when the product allows it, a payment. Comparing three toasters in a chat is
              advice. Quoting a live price from a{" "}
              <Link className="text-[var(--link)] underline" href="/glossary/product-feed">product feed</Link>, or
              paying under a rule the person already set, is the{" "}
              <Link className="text-[var(--link)] underline" href="/glossary/shopping-agent">shopping agent</Link>.
            </p>
            <p>
              The payment step is{" "}
              <Link className="text-[var(--link)] underline" href="/glossary/agentic-checkout">agentic checkout</Link>.
              On the Google, OpenAI, and Microsoft pages checked for this report, the store remains the seller.
            </p>
            <p>
              <a className="text-[var(--link)] underline" href="https://developers.openai.com/commerce/specs/file-upload/products">
                OpenAI&apos;s feed spec
              </a>
              , read November 5, requires nine fields for a discovery row: an item id, a title, a description, a
              product URL, a brand, a seller name, an image URL, availability, and a price. Availability has to be one
              of in stock, out of stock, pre-order, backorder, or unknown. Checkout is a separate integration. A flag
              opts a row in only when checkout is already enabled. The{" "}
              <a className="text-[var(--link)] underline" href="https://github.com/agentic-commerce-protocol/agentic-commerce-protocol">
                Agentic Commerce Protocol repository
              </a>
              , also read November 5, lists a stable OpenAPI folder dated 2026-04-17 and says OpenAI and Stripe
              maintain the specification.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="how-to-use-one-today" className="text-2xl font-semibold tracking-tight">How do you use an AI shopping agent today?</h2>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              How to use AI agents, for a purchase, is the permission on the screen in front of you. On Google, a U.S.
              shopper can save items from more than one store into the Universal Cart and pay with Google Pay at
              participating stores, or hand the cart to the store. A Canadian shopper on the November 4 rollout can
              buy from an eligible retailer while still in AI Mode or the Gemini app. Shopify&apos;s page says a
              customer who does not yet have direct checkout is sent to the store to pay.
            </p>
            <p>
              In ChatGPT, the merchant page says you discover and compare in the chat, then buy on the store&apos;s
              site or app. On Amazon, the October 29 guide separates three grants. A question, a comparison, or a 30-,
              90-, or 365-day price history buys nothing. A Scheduled Action can add items to the cart for you to
              review. Auto-buy at a target price uses the default payment method when the price is reached. The
              guide&apos;s examples are headphones at 30 percent off, or a shirt at $15 or less. Buy for Me, for an
              eligible product from another store, uses Amazon payment and shipping details after you tap the button.
              Copilot Checkout, on Microsoft&apos;s page, finishes inside Copilot for an eligible U.S. purchase.
            </p>
            <p>
              The plain-English shelf for the rest of how to use AI agents is{" "}
              <Link className="text-[var(--link)] underline" href="/for/everyone">Plain English</Link>. The shopping
              shelf is the <Link className="text-[var(--link)] underline" href="/topics/shopping">shopping topic</Link>.
              Product pages in the directory are{" "}
              <Link className="text-[var(--link)] underline" href="/directory/amazon-rufus">Alexa for Shopping</Link>,{" "}
              <Link className="text-[var(--link)] underline" href="/directory/chatgpt">ChatGPT</Link>,{" "}
              <Link className="text-[var(--link)] underline" href="/directory/gemini">Gemini</Link>, and{" "}
              <Link className="text-[var(--link)] underline" href="/directory/perplexity">Perplexity</Link>, plus the{" "}
              <Link className="text-[var(--link)] underline" href="/directory/category/shopping-agents">
                shopping agents
              </Link>{" "}
              category.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 id="where-the-harness-draws-the-line" className="text-2xl font-semibold tracking-tight">Where the harness draws the line</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            An <Link className="text-[var(--link)] underline" href="/blog/what-is-an-ai-agent-harness">agent harness</Link>{" "}
            is the software around the model: which tools it can call, what it is allowed to spend, and when it must
            stop.{" "}
            <Link className="text-[var(--link)] underline" href="/blog/what-is-an-ai-agent-harness">
              What is an AI agent harness?
            </Link>{" "}
            is the longer explainer. Google&apos;s cart post lets the person pay in the cart or move the items to the
            store. Amazon&apos;s auto-buy moves the confirmation earlier, into a price the person set. OpenAI&apos;s
            current merchant page leaves the charge on the merchant&apos;s site. Microsoft&apos;s page says a feed gets
            products into answers, and the commerce protocol is what lets checkout happen inside Copilot. A prompt
            that says “buy the best headphones” is not one of those gates.
          </p>
        </section>

        <section className="mt-12">
          <h2 id="left-out" className="text-2xl font-semibold tracking-tight">Left out</h2>
          <ul className="mt-3 grid gap-3 text-sm leading-relaxed text-[var(--muted)]">
            <li>
              A November 5 reading of Microsoft&apos;s page said Microsoft does not take a commission or an affiliate
              fee, and that PayPal and Stripe are opt-in. The text retrieved November 13 does not include the
              commission sentence or PayPal. Stripe&apos;s Agentic Commerce Suite is named. This report no longer
              states the fee claim.
            </li>
            <li>
              Wirex&apos;s Navoka, launched November 12, 2026, gives an agent its own card. It is not a checkout button
              from the six companies on this calendar. The note is{" "}
              <Link className="text-[var(--link)] underline" href="/blog/can-an-ai-agent-buy-things-online">
                Can an AI agent buy things online?
              </Link>
            </li>
            <li>
              Third-party transcripts of Amazon&apos;s October 29 call include a line that U.S. customers using Alexa
              for Shopping spend 50 percent more per order, and a sentence that it will be the primary shopping agent
              for Amazon. Those lines are not in the earnings release. They are not used here.
            </li>
            <li>
              A Fortune report of that call says Andy Jassy described some other companies&apos; shopping agents as
              not great. That wording is not in the earnings release, so it is left out.
            </li>
            <li>
              Microsoft&apos;s page shows three large percentages, with footnotes dated August 2025, September 2025,
              and November 2025. The “next 12 months” line in that set is not a forecast for November 2026 through May
              2027, so the three figures are left out.
            </li>
            <li>
              Adobe&apos;s holiday page states that 69 percent of people are less likely to return an item bought with
              help from an assistant. The text retrieved on November 5 does not print a sample or a method next to
              that sentence, so the figure is left out. A $275.1 billion holiday-sales total appears in an Adobe
              Experience League guide and was not in the holiday forecast page text retrieved the same day, so it is
              left out too.
            </li>
            <li>
              A December 2025 EMARKETER sales-share figure and a McKinsey 2030 range were not opened from those
              publishers&apos; own reports on November 5, so they are not cited.
            </li>
          </ul>
        </section>

        <ToolCtas tools={["picker"]} />
        <FaqList
          items={shoppingFaq.map((item) => ({
            question: item.question,
            answer: <p>{item.answer}</p>,
          }))}
        />
      </ReportLayout>
    </>
  );
}
