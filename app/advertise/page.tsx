import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { defaultMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = defaultMetadata(
  "Advertise",
  "How sponsorship would be labeled on AI Agents Info. No audience numbers or prices are published.",
  "/advertise",
);

const inventory = [
  {
    name: "Homepage newsletter sponsor",
    where: "Landing page digest block",
    note: "One labeled slot next to signup, if a sponsor is booked. Audience size is not part of the offer.",
  },
  {
    name: "Directory featured listing",
    where: "/directory and listing pages",
    note: "Always marked Sponsored. Never mixed into organic sort without a label.",
  },
  {
    name: "Blog in-feed",
    where: "/blog",
    note: "One labeled unit in the index. Not native advertising disguised as a post.",
  },
  {
    name: "Research desk",
    where: "/research",
    note: "A labeled partner slot. Research pages themselves stay editorial.",
  },
];

export default function AdvertisePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Advertise", path: "/advertise" }]} />
      <PageHeader
        kicker="Media kit"
        title="Sponsor the desk, not the ranking"
        summary="No rate card, traffic figure, open rate, or price is published. If a placement is sold, it is labeled. Editorial pages are not for sale."
      />
      <div className="mx-auto max-w-3xl px-4 pb-20">
        <p className="text-[var(--muted)]">
          {site.name} is a publication plus a directory. When sponsorship exists, it will be marked. Featured listings do not look like editor&apos;s picks unless they are both — and sponsored still says sponsored.
        </p>
        <h2 className="mt-10 font-semibold tracking-tight text-3xl">Inventory</h2>
        <ul className="mt-4 grid gap-4">
          {inventory.map((item) => (
            <li key={item.name} className="glass rounded-3xl p-5">
              <p className="kicker">{item.where}</p>
              <h3 className="mt-2 text-xl">{item.name}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.note}</p>
            </li>
          ))}
        </ul>
        <h2 className="mt-12 font-semibold tracking-tight text-3xl">Rate card</h2>
        <p className="mt-3 text-[var(--muted)]">
          Not published. This page does not state an audience size. Email {site.email} to ask about a placement.
        </p>
        <p className="mt-6 text-sm">
          <Link href="/directory/submit" className="underline">
            Submit a tool
          </Link>
          {" · "}
          <Link href="/contact" className="underline">
            Contact
          </Link>
        </p>
      </div>
    </>
  );
}
