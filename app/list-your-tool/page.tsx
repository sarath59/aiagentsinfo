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
import { formatTraffic, getLiveAiTraffic } from "@/lib/paid-listings/live-traffic";
import { FEATURED_DAYS, FEATURED_PRICE_LABEL } from "@/lib/paid-listings/offer";
import { JsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, operator, site } from "@/lib/site";

const title = "Put your tool in AI answers";
const description = `Featured ${FEATURED_DAYS}-day listing on AI Agents Info for ${FEATURED_PRICE_LABEL}. Answer-bot traffic from our first-party tracker. Details first, then Stripe.`;

export const metadata = defaultMetadata(title, description, LIST_TOOL_PATH);

/** Bot counts; refresh often. Avoids pinning a cold Supabase wait into every deploy. */
export const revalidate = 300;

const objections = [
  {
    q: "Does payment buy a fake rank?",
    a: "No. Featured is labeled. Organic tables stay unpaid.",
  },
  {
    q: "Guarantee ChatGPT names us?",
    a: "No. We put you on a host answer bots already crawl — counts below.",
  },
  {
    q: `What is ${FEATURED_PRICE_LABEL}?`,
    a: `${FEATURED_PRICE_LABEL} for ${FEATURED_DAYS} days featured. One Stripe payment. We match it by hand and go live fast.`,
  },
  {
    q: "Free option?",
    a: "Yes — /submit for a basic listing.",
  },
] as const;

export default async function ListYourToolPage() {
  const [listings, traffic] = await Promise.all([
    getDirectoryListings(),
    getLiveAiTraffic(FEATURED_DAYS),
  ]);
  const toolCount = listings.length.toLocaleString("en-US");
  const windowLabel = `Last ${traffic.days} days`;

  const stats = [
    { value: formatTraffic(traffic.answer), label: "AI answer hits", note: windowLabel },
    { value: formatTraffic(traffic.chatgpt), label: "ChatGPT-User", note: windowLabel },
    { value: formatTraffic(traffic.training), label: "Training crawls", note: windowLabel },
    { value: formatTraffic(traffic.search), label: "Search crawls", note: windowLabel },
  ];

  return (
    <div className="buy-page">
      <JsonLd
        data={webPageJsonLd({
          title,
          description,
          path: LIST_TOOL_PATH,
          datePublished: "2026-11-23",
          dateModified: "2026-11-23",
        })}
      />
      <JsonLd
        data={faqPageJsonLd(objections.map((item) => ({ question: item.q, answer: item.a })))}
      />
      <ListToolPageTracker />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "List your tool", path: LIST_TOOL_PATH },
        ]}
      />

      <header className="buy-hero" data-track-section="hero">
        <div className="buy-hero-inner">
          <p className="buy-eyebrow">
            {FEATURED_PRICE_LABEL} · {FEATURED_DAYS}-day featured · {toolCount} tools live
          </p>
          <h1 className="buy-title">
            Put your tool in <em>AI answers</em>
          </h1>
          <p className="buy-lede">
            Answer bots, training crawlers, and search agents hit this directory every day.{" "}
            <strong>{formatTraffic(traffic.answer)} AI answer hits</strong> in the last {traffic.days}{" "}
            days — from our own tracker.
          </p>
          <div className="buy-hero-actions">
            <ListToolBuyButton label={`Get featured · ${FEATURED_PRICE_LABEL}`} />
            <a className="buy-link" href={`mailto:${operator.email}`}>
              Contact if needed · {operator.email}
            </a>
          </div>
        </div>
      </header>

      <section className="buy-proof" data-track-section="proof" aria-label="AI traffic last 30 days">
        <div className="buy-proof-head">
          <p className="buy-proof-live">
            <span aria-hidden="true" />
            First-party bot tracker · {windowLabel}
          </p>
          <p className="buy-proof-total">
            <strong>{formatTraffic(traffic.total)}</strong> total AI/bot hits · {windowLabel}
          </p>
        </div>
        <div className="buy-proof-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="buy-proof-cell">
              <p className="buy-proof-value">{stat.value}</p>
              <p className="buy-proof-label">{stat.label}</p>
              <p className="buy-proof-note">{stat.note}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="buy-body">
        <section className="buy-checkout" data-track-section="offer" aria-labelledby="offer">
          <div className="buy-checkout-copy">
            <p className="buy-eyebrow buy-eyebrow-on-dark">
              {FEATURED_PRICE_LABEL} · featured month
            </p>
            <h2 id="offer" className="buy-h2 buy-h2-on-dark">
              Be on the pages these bots already open
            </h2>
            <p className="buy-checkout-lede">
              One Stripe payment of {FEATURED_PRICE_LABEL}. {FEATURED_DAYS} days featured. Structured
              listing + IndexNow. We match your payment by hand and go live fast.
            </p>
            <ul className="buy-checkout-bullets">
              <li>
                <strong>{FEATURED_PRICE_LABEL}</strong> for {FEATURED_DAYS} days
              </li>
              <li>
                <strong>{formatTraffic(traffic.answer)}</strong> AI answer hits in {traffic.days} days
              </li>
              <li>
                <strong>{formatTraffic(traffic.chatgpt)}</strong> ChatGPT-User ·{" "}
                <strong>{formatTraffic(traffic.training)}</strong> training ·{" "}
                <strong>{formatTraffic(traffic.search)}</strong> search
              </li>
              <li>
                Contact: <a href={`mailto:${operator.email}`}>{operator.email}</a>
              </li>
            </ul>
          </div>
          <div className="buy-checkout-form-wrap">
            <ListToolCheckoutForm />
          </div>
        </section>

        <section className="buy-band buy-band-tight" data-track-section="faq" aria-labelledby="faq">
          <h2 id="faq" className="buy-h2">
            Quick answers
          </h2>
          <dl className="buy-faq">
            {objections.map((item) => (
              <div key={item.q} className="buy-faq-item">
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="buy-close" data-track-section="close">
          <div className="buy-hero-actions">
            <ListToolBuyButton placement="footer" label={`Get featured · ${FEATURED_PRICE_LABEL}`} />
            <TrackLink
              href="/submit"
              goal={LIST_TOOL_FREE_CLICK}
              metadata={listToolMeta({ placement: "footer", cta: "free_submit" })}
              className="buy-link"
            >
              Or submit free
            </TrackLink>
          </div>
          <p className="buy-fine">
            {FEATURED_PRICE_LABEL} USD · {operator.line} · {site.name} · {absoluteUrl(LIST_TOOL_PATH)}
          </p>
        </section>
      </div>
    </div>
  );
}
