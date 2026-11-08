import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { BestOfLinks } from "@/components/BestOfLinks";
import { getGlossaryTerms, glossaryByLetter } from "@/lib/glossary";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  "Glossary of AI agent terms",
  "A–Z definitions for AI agents, harnesses, tools, and evaluation.",
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
        summary="Plain definitions of real terms. A word is listed when the definition is accurate."
      />
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <BestOfLinks intro="Sourced comparisons of harnesses, computer use agents, and evaluation tools. Last verified November 2026." />
        {groups.length === 0 ? (
          <EmptyState title="Glossary entries publishing soon" body="Definitions of real terms will appear here as they are written." />
        ) : null}
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
              <h2 className="font-semibold tracking-tight text-4xl">{letter}</h2>
              <ul className="mt-4 grid gap-3">
                {list.map((term) => (
                  <li key={term.slug} className="glass rounded-2xl p-5">
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
