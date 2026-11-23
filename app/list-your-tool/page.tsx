import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ListToolBuyButton } from "@/components/ListToolBuyButton";
import { ListToolCheckoutForm } from "@/components/ListToolCheckoutForm";
import { ListToolPageTracker } from "@/components/ListToolPageTracker";
import { TrackLink } from "@/components/TrackLink";
import {
  LIST_TOOL_FREE_CLICK,
  LIST_TOOL_PATH,
  listToolMeta,
} from "@/lib/analytics/list-tool-goals";
import { getDirectoryListings } from "@/lib/directory";
import { JsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

const title = "Get your AI tool into answers people already trust";
const description =
  "Featured 30-day listing on AI Agents Info: a structured, crawlable directory page so ChatGPT, Perplexity, Gemini, and Claude can find your product the same way buyers already browse this lab.";

export const metadata = defaultMetadata(title, description, LIST_TOOL_PATH);

const pillars = [
  {
    id: "availability",
    eyebrow: "Availability heuristic",
    title: "What answer engines can name, they prefer",
    body: "People and models alike lean on what comes to mind first. A clean entity page — name, category, pricing, official URL — raises the odds your product is available when someone asks for “best AI coding agents” or “voice agents for support.”",
  },
  {
    id: "structure",
    eyebrow: "Machine-readable structure",
    title: "Crawlers reward pages built for retrieval",
    body: "Answer bots do not skim marketing fluff the way humans do. They fetch directories, compare fields, and cite sources with stable URLs. Your featured month includes a listing shaped for that job: short summary, category, pricing signal, and a working official site.",
  },
  {
    id: "trust",
    eyebrow: "Source prominence",
    title: "Sit next to research buyers already cite",
    body: "This site is a research lab plus directory. Reports, trackers, and comparisons share the same host. A featured listing puts your tool in that neighborhood — the one answer crawlers already visit when they study AI agents.",
  },
] as const;

const included = [
  "A curated directory page for 30 days, with category, pricing, and maker fields filled for retrieval",
  "IndexNow ping so search and answer systems hear about the new URL quickly",
  "Homepage and directory visibility during the featured window (labeled, never sold as an unpaid rank)",
  "AI-facing copy: one crisp summary a model can quote without inventing features",
  "Listed badge you can put on your site or README",
  "Desk review against a working official site — we do not publish dead links",
] as const;

const steps = [
  { n: "01", title: "Tell us the tool", body: "Name, website, email, and a one-line pitch. We save that before you pay." },
  { n: "02", title: "Pay for the month", body: "Checkout on Stripe. One payment covers thirty days of featured listing work." },
  { n: "03", title: "Go live", body: "We publish the page, ping IndexNow, and keep the listing curated for the month." },
] as const;

const objections = [
  {
    q: "Does payment buy a higher rank?",
    a: "No. Editorial comparisons and organic sort stay unpaid. Featured means a curated, labeled placement and a retrieval-ready page — not a fake #1.",
  },
  {
    q: "Can you guarantee ChatGPT will name us?",
    a: "No honest directory can. Models choose sources per prompt. What we control is putting a durable, structured page where answer crawlers already fetch AI-agent tools.",
  },
  {
    q: "Is there a free option?",
    a: "Yes. Anyone can submit a basic listing at /submit with no fee. The 30-day package is for founders who want curated copy, faster IndexNow, and featured visibility.",
  },
] as const;

export default async function ListYourToolPage() {
  const listings = await getDirectoryListings();
  const toolCount = listings.length.toLocaleString("en-US");
  const published = "2026-11-23";

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title,
          description,
          path: LIST_TOOL_PATH,
          datePublished: published,
          dateModified: published,
        })}
      />
      <JsonLd
        data={faqPageJsonLd(
          objections.map((item) => ({ question: item.q, answer: item.a })),
        )}
      />
      <ListToolPageTracker />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "List your tool", path: LIST_TOOL_PATH },
        ]}
      />

      <header className="list-tool-hero mx-auto max-w-4xl px-4 pb-12 pt-14">
        <p className="kicker kicker-lead">30-day featured listing</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          Buyers ask AI for tools. Those systems fetch directories before they invent names. For one month, we put your
          product on {site.name} as a structured, crawlable listing — so when someone asks an answer engine for agents
          like yours, there is a real page to retrieve.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ListToolBuyButton />
          <TrackLink
            href="/submit"
            goal={LIST_TOOL_FREE_CLICK}
            metadata={listToolMeta({ placement: "hero", cta: "free_submit" })}
            className="lab-link lab-link-muted focus-ring"
          >
            Or submit free (basic listing)
          </TrackLink>
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">
          {toolCount} tools already listed. Featured placements are labeled. Payment does not buy an unpaid rank.
        </p>
      </header>

      <div className="mx-auto max-w-4xl px-4 pb-24">
        <section className="list-tool-band" data-track-section="why-ai" aria-labelledby="why-ai">
          <p className="kicker">Why this works</p>
          <h2 id="why-ai" className="display mt-2 text-3xl">
            Answer engines cite what they can fetch
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-[var(--muted)]">
            Classic search rewarded links. Generative answers reward <em>entities they can ground</em>: a name, a
            category, a price signal, an official site. Psychology calls the bias for the familiar the availability
            heuristic. Information retrieval calls the same pattern source prominence. Either way, a missing page is a
            missing candidate.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.id} className="list-tool-pillar" data-track-section={pillar.id}>
                <p className="kicker">{pillar.eyebrow}</p>
                <h3 className="display mt-2 text-xl tracking-tight text-[var(--ink)]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{pillar.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="list-tool-band" data-track-section="what-you-get" aria-labelledby="what-you-get">
          <p className="kicker">What you get</p>
          <h2 id="what-you-get" className="display mt-2 text-3xl">
            One month. One retrieval-ready page.
          </h2>
          <ul className="mt-6 grid gap-3">
            {included.map((line) => (
              <li key={line} className="list-tool-check">
                <span aria-hidden="true" />
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className="list-tool-band" data-track-section="how-it-works" aria-labelledby="how-it-works">
          <p className="kicker">How it works</p>
          <h2 id="how-it-works" className="display mt-2 text-3xl">
            Three steps, then your page is live
          </h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.n} className="list-tool-step">
                <span className="list-tool-step-n" aria-hidden="true">
                  {step.n}
                </span>
                <h3 className="display mt-3 text-xl text-[var(--ink)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="list-tool-offer" data-track-section="offer" aria-labelledby="offer">
          <div>
            <p className="kicker">Featured month</p>
            <h2 id="offer" className="display mt-2 text-3xl sm:text-4xl">
              Put your tool where AI already looks
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-[var(--muted)]">
              Founders who wait for “organic discovery” lose the first month of answer traffic to whoever published a
              clear page first. Commitment bias is real: once your URL is in the crawl graph, every later prompt has
              something concrete to retrieve.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">
              Questions:{" "}
              <a className="underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </div>
          <div className="list-tool-offer-cta">
            <ListToolCheckoutForm />
          </div>
        </section>

        <section className="list-tool-band" data-track-section="faq" aria-labelledby="faq">
          <p className="kicker">Straight answers</p>
          <h2 id="faq" className="display mt-2 text-3xl">
            What we will not overclaim
          </h2>
          <dl className="mt-8 grid gap-6">
            {objections.map((item) => (
              <div key={item.q} className="list-tool-faq">
                <dt className="font-semibold text-[var(--ink)]">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="list-tool-close" data-track-section="close" aria-labelledby="close">
          <h2 id="close" className="display text-3xl sm:text-4xl">
            If your tool is not listed, answer engines have nothing to cite
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-[var(--muted)]">
            Loss aversion cuts both ways: every week without a page is a week competitors occupy the retrieval set. Send
            the details, pay for the month, and give the next buyer prompt a source that names you.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ListToolBuyButton placement="footer" label="Start my 30-day listing" />
            <Link href="/directory" className="lab-link focus-ring">
              See the directory first
            </Link>
          </div>
          <p className="mt-6 text-sm text-[var(--muted)]">
            Prefer DIY?{" "}
            <TrackLink
              href="/submit"
              goal={LIST_TOOL_FREE_CLICK}
              metadata={listToolMeta({ placement: "footer", cta: "free_submit" })}
              className="underline"
            >
              Submit a free basic listing
            </TrackLink>
            . Read how we verify at{" "}
            <Link href="/editorial-policy" className="underline">
              editorial policy
            </Link>
            . Canonical page: {absoluteUrl(LIST_TOOL_PATH)}.
          </p>
        </section>
      </div>
    </>
  );
}
