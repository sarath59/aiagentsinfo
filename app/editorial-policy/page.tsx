import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { PublishedDates } from "@/components/PublishedDates";
import { trustDates } from "@/lib/authors";
import { JsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = defaultMetadata(
  "Editorial policy",
  "Who writes AI Agents Info for adult readers, how pages are sourced and dated, and which directory submissions stay out of search.",
  "/editorial-policy",
);

export default function EditorialPolicyPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title: "Editorial policy",
          description:
            "Who writes AI Agents Info for adult readers, how pages are sourced and dated, and which directory submissions stay out of search.",
          path: "/editorial-policy",
          datePublished: trustDates.published,
          dateModified: trustDates.updated,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Editorial policy", path: "/editorial-policy" },
        ]}
      />
      <PageHeader
        kicker="Trust"
        title="Editorial policy"
        summary="Who writes, how a page is made, and why it exists. Trust is the point of the byline."
      />
      <div className="mx-auto max-w-3xl px-4 pb-20 text-[var(--muted)]">
        <PublishedDates published={trustDates.published} updated={trustDates.updated} />

        <section className="mt-10">
          <h2 className="font-semibold tracking-tight text-2xl text-[var(--fg)]">Who</h2>
          <p className="mt-3">
            Learning pieces are signed <Link href="/authors/editorial">{site.bylines.editorial}</Link>. Research notes are
            signed <Link href="/authors/research">{site.bylines.research}</Link>. Those are desk names for this
            publication, not invented biographies. A named person gets a byline and a profile only when that person
            actually wrote the page. We do not publish fictional staff, generated headshots, or borrowed credentials.
          </p>
          <p className="mt-3">
            The publisher is {site.name}. The <Link href="/about">about page</Link> says what the site is. Corrections
            go to <Link href="/contact">contact</Link> or {site.email}.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-semibold tracking-tight text-2xl text-[var(--fg)]">Readers</h2>
          <p className="mt-3">
            {site.name} is clear, plain-English AI news and research for adult readers. It does not publish a
            children&apos;s section, an elders&apos; edition, or an age-tiered box inside an article. Education coverage
            is news and product reporting for adults. Jargon is linked to the glossary instead of being rewritten for a
            younger reader.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-semibold tracking-tight text-2xl text-[var(--fg)]">How</h2>
          <p className="mt-3">
            Articles and research notes are written as files in this repository. A research note names the paper, links
            the source, and lists the paper&apos;s authors as the paper&apos;s authors. It does not claim those people
            wrote our summary. Numbers, user counts, and rankings are left out unless a source is linked on the page.
          </p>
          <p className="mt-3">
            Published and updated dates on an article are the dates in the file. The updated date changes when the
            page&apos;s meaning changes, not when the site chrome changes. Both dates are visible on the page and in
            the article markup.
          </p>
          <p className="mt-3">
            Directory pages for products the desk wrote up use the vendor&apos;s public site for price and features,
            and they show the day that information was last checked. Community submissions are the maker&apos;s own
            text. The page says so. A community page needs a real explanation of the product before it is included in
            the sitemap. A slogan, a sentence that repeats the tagline, or text that is not readable English is not
            that explanation. Unreadable submissions are not published. Readable but thin ones stay available on the
            site and are marked noindex so they are not offered as search results.
          </p>
          <p className="mt-3">
            Tag pages and empty category or collection pages are filters. They stay linked for people using the
            directory and are left out of search. Filtered and paginated copies of the blog, research desk, directory,
            and search point their canonical URL at the unfiltered page and use noindex.
          </p>
          <p className="mt-3">
            We do not mark frequently asked questions up for a FAQ rich result. Google no longer shows that feature,
            and the questions on a page are ordinary headings. We do not invent star ratings to qualify for an app
            rich result.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-semibold tracking-tight text-2xl text-[var(--fg)]">Why</h2>
          <p className="mt-3">
            The site exists to explain AI agents and to keep a catalog of real products with an official URL. Pages
            are not created to fill a keyword grid. Sponsored placements, if any are sold, are labeled on the page.
            Payment does not buy a rank. The <Link href="/advertise">advertise</Link> page says that in the same words.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-semibold tracking-tight text-2xl text-[var(--fg)]">Corrections</h2>
          <p className="mt-3">
            Email {site.email} with the URL and the source for the correction. A material fix updates the visible
            updated date. Taking a page down, when the source fails, is preferred to leaving a wrong date or a wrong
            citation in place.
          </p>
        </section>
      </div>
    </>
  );
}
