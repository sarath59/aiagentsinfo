import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { SponsorSlot } from "@/components/SponsorSlot";
import { defaultMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = defaultMetadata(
  "Advertise",
  "Media kit placeholder for AI Agents Info. Inventory of labeled sponsor slots. No invented audience numbers or CPMs.",
  "/advertise",
);

const inventory = [
  {
    name: "Homepage newsletter sponsor",
    where: "Landing page digest block",
    note: "One labeled slot next to signup. Not sold as “to X million readers.”",
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
        summary="Placeholder kit for a future rate card. We will not invent traffic, open rates, or CPMs. Slots are labeled. Editorial pages are not for sale."
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
        <div className="mt-8">
          <SponsorSlot
            placement="Media kit"
            title="Example of the label we will use everywhere"
            body="Dashed border, the word Sponsored, and a link back to this page. No fake logos in the sample."
          />
        </div>
        <h2 className="mt-12 font-semibold tracking-tight text-3xl">Rate card</h2>
        <p className="mt-3 text-[var(--muted)]">
          Not published. There is no audience-size claim on this site yet. Email {site.email} when you want a real quote after traffic exists. Do not scrape this page for invented metrics.
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
