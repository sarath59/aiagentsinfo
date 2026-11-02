import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { SampleBanner } from "@/components/SampleBanner";
import { getGlossaryTerms, glossaryByLetter } from "@/lib/glossary";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  "Glossary",
  "A–Z terms for AI agents, harnesses, tools, and evaluation — written to be replaced as the desk grows.",
  "/glossary",
);

export default async function GlossaryPage() {
  const terms = await getGlossaryTerms();
  const groups = glossaryByLetter(terms);

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Glossary", path: "/glossary" }]} />
      <PageHeader
        kicker="Glossary A–Z"
        title="Define the word before you argue about the system"
        summary="About ten sample terms ship with v1. Add a Markdown file in content/glossary to publish a new entry."
      />
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <div className="flex flex-wrap gap-2">
          {groups.map(([letter]) => (
            <a key={letter} href={`#${letter}`} className="grid h-10 w-10 place-items-center rounded-full border border-[var(--stroke)]">
              {letter}
            </a>
          ))}
        </div>
        <div className="mt-12 grid gap-12">
          {groups.map(([letter, list]) => (
            <section key={letter} id={letter}>
              <h2 className="font-serif text-4xl">{letter}</h2>
              <ul className="mt-4 grid gap-3">
                {list.map((term) => (
                  <li key={term.slug} className="glass rounded-2xl p-5">
                    {term.sample ? <SampleBanner /> : null}
                    <h3 className="text-xl">
                      <Link href={`/glossary/${term.slug}`}>{term.term}</Link>
                    </h3>
                    <p className="mt-2 text-[var(--muted)]">{term.shortDefinition}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
