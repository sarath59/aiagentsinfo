import { AgentPicker } from "@/components/AgentPicker";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { UpdatedLine } from "@/components/UpdatedLine";
import { toPickerListings } from "@/lib/agent-picker";
import { getDirectoryListings } from "@/lib/directory";
import { JsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";

const path = "/tools/agent-picker";
const title = "Which AI agent fits me?";
const description =
  "Answer four questions: use case, budget, open source, and coding or no-code. The page links three directory listings that match. No login and no rating.";
const updated = "2026-11-09";

const faqs = [
  {
    question: "Which AI agent fits me?",
    answer:
      "The page recommends three listings already in the directory. It matches the use case, budget, open-source tag, and coding or no-code choice you enter. It does not score the catalog.",
  },
  {
    question: "Do I need an account?",
    answer: "No. The answers stay in the browser. Nothing is saved.",
  },
  {
    question: "What if nothing matches every answer?",
    answer:
      "The page says so, then shows the closest listings and names the answer each one misses.",
  },
];

export const metadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export default async function AgentPickerPage() {
  const listings = toPickerListings(await getDirectoryListings());

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ title, description, path, datePublished: updated, dateModified: updated }),
          faqPageJsonLd(faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Which AI agent fits me?", path },
        ]}
      />
      <PageHeader kicker="Directory" title={title} summary={description} />
      <div className="mx-auto max-w-3xl px-4 pb-20">
        <UpdatedLine date={updated} />
        <p className="mt-4 text-sm leading-relaxed">
          It recommends three listings already in this directory. It does not rank the whole catalog.
        </p>
        <div className="mt-6">
          <AgentPicker listings={listings} />
        </div>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">What else do people ask?</h2>
          {faqs.map((item) => (
            <div key={item.question} className="mt-6">
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.answer}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
