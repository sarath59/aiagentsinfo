import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { defaultMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = defaultMetadata(
  "A publication and a directory, not a personality cult",
  "What AI Agents Info is, who the byline belongs to, and what we will not invent.",
  "/about",
);

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <PageHeader
        kicker="About"
        title="A publication and a directory, not a personality cult"
        summary={`${site.name} is an independent learning and research site about AI and AI agents. There is no fake staff page.`}
      />
      <div className="mx-auto max-w-3xl px-4 pb-20 text-[var(--muted)]">
        <p>
          The byline on learning pieces is <strong className="text-[var(--fg)]">{site.bylines.editorial}</strong>.
          The byline on research pages is <strong className="text-[var(--fg)]">{site.bylines.research}</strong>.
          Those are desk names, not invented biographies.
        </p>
        <p className="mt-4">
          Coverage runs from first questions to frontier papers: news, tools and SaaS, research, shopping, task performance, harnesses, education, and how agents work. The directory is meant to become a serious catalog over time — listings are files, not a mystery CMS.
        </p>
        <p className="mt-4">
          We will not invent people, credentials, testimonials, user counts, or citations. A page is published when its sources check out. The{" "}
          <Link href="/editorial-policy">editorial policy</Link> says how dates, sources, and directory submissions are handled.
        </p>
        <ul className="mt-4 grid gap-2">
          <li>
            <Link href="/authors/editorial">{site.bylines.editorial}</Link>
          </li>
          <li>
            <Link href="/authors/research">{site.bylines.research}</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
