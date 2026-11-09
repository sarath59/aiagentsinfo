import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentCard } from "@/components/ContentCard";
import { PageHeader } from "@/components/PageHeader";
import { TrackerNav } from "@/components/trackers/TrackerNav";
import { JsonLd, defaultMetadata, faqPageJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/seo";
import { livingPointers, liveTrackers } from "@/lib/trackers";
import { TRACKER_PATHS } from "@/lib/trackers/catalog";

export const revalidate = 86400;

const path = TRACKER_PATHS.index;
const title = "Live data trackers for AI agents";
const description =
  "Public download, AGENTS.md, and GitHub star counts that refresh daily from pypistats, npm, and GitHub. Each page names its source and how to cite it.";

const faq = [
  {
    question: "What is a live data tracker on this site?",
    answer:
      "A page whose figures are fetched from a named public API and revalidated about once a day. If a source is down, the page keeps the last successful snapshot and says so. It does not invent a number.",
  },
  {
    question: "Which live trackers does AI Agents Info publish?",
    answer:
      "Three refresh daily: AI agent framework downloads from PyPI and npm, AGENTS.md adoption from GitHub search plus a dated census, and GitHub stars for the same frameworks.",
  },
  {
    question: "How often do the numbers update?",
    answer:
      "The pages are set to revalidate every 24 hours. The underlying registries can lag by a day. Each table prints the date of the fetch that produced it.",
  },
];

export const metadata = defaultMetadata(title, description, path);

export default function TrackersIndexPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ title, description, path })} />
      <JsonLd
        data={itemListJsonLd({
          name: title,
          description,
          path,
          items: liveTrackers.map((item) => ({
            name: item.title,
            url: item.href,
            description: item.summary,
          })),
        })}
      />
      <JsonLd data={faqPageJsonLd(faq)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Trackers", path },
        ]}
      />
      <PageHeader
        kicker="Live data"
        title={title}
        summary="Counts that journalists and newsletters can cite, pulled from public registries. A download is a file request. A star is a bookmark. AGENTS.md presence is not proof an agent followed the file."
      />
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <TrackerNav current={path} />
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">Which trackers refresh from public APIs?</h2>
          <p className="mt-2 max-w-3xl text-[var(--muted)]">
            Downloads, AGENTS.md adoption, and GitHub stars. Each one names the source, the method, and a copyable citation.
          </p>
          <div className="content-grid mt-6">
            {liveTrackers.map((item) => (
              <ContentCard
                key={item.href}
                href={item.href}
                kicker={item.kicker}
                title={item.title}
                description={item.summary}
              />
            ))}
          </div>
        </section>
        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">What else lives under /trackers?</h2>
          <p className="mt-2 max-w-3xl text-[var(--muted)]">
            Sourced comparison pointers. Those pages do not scrape a second set of numbers.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {livingPointers.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="glass block h-full rounded-3xl p-5">
                  <span className="font-semibold">{item.title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-[var(--muted)]">{item.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="article-prose mt-14" id="faq">
          <h2>FAQ</h2>
          {faq.map((item) => (
            <div key={item.question} className="mt-6">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
