import Link from "next/link";
import { BadgeSnippets } from "@/components/BadgeSnippets";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { genericBadgeEmbed, renderBadge } from "@/lib/badge";
import { JsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";

const title = "Show visitors your tool is listed";
const description =
  "Put a badge on your site or GitHub README. Visitors see that your tool is listed in this directory, and the image links to the listing. No rating and no rank.";

export const metadata = defaultMetadata(title, description, "/badge");

export default function BadgePage() {
  const light = renderBadge({ variant: "light" });
  const dark = renderBadge({ variant: "dark" });
  const compact = renderBadge({ variant: "compact" });
  const embed = genericBadgeEmbed();

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title,
          description,
          path: "/badge",
          datePublished: "2026-11-16",
          dateModified: "2026-11-16",
        })}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Badge", path: "/badge" }]} />
      <PageHeader
        kicker="Directory"
        title={title}
        summary="Put it on your site or GitHub README. Visitors see that the product is listed in this directory of AI tools and agents, and the image links to the listing."
      />
      <div className="mx-auto grid max-w-3xl gap-8 px-4 pb-20">
        <div className="flex flex-wrap items-center gap-4">
          <BadgePreview src="/badge/listed.svg" width={light.width} height={light.height} href={embed.href} alt="Listed on AI Agents Info" />
          <span className="rounded-xl bg-[#0F2A2C] p-3">
            <BadgePreview
              src="/badge/listed/dark.svg"
              width={dark.width}
              height={dark.height}
              href={embed.href}
              alt="Listed on AI Agents Info, for a dark background"
            />
          </span>
          <BadgePreview
            src="/badge/listed/compact.svg"
            width={compact.width}
            height={compact.height}
            href={embed.href}
            alt="Listed on AI Agents Info, compact"
          />
        </div>
        <div className="grid gap-4 text-sm leading-relaxed text-[var(--muted)]">
          <p>
            The badge is for a product that already has a page here. It does not print a score, a rank, or a review.
            This directory does not publish those, so the badge does not invent them.
          </p>
          <p>
            On your listing, copy the snippet next to Claim this listing. That one names your tool and links to your
            page. The generic snippet below does not name a tool. It links to the{" "}
            <Link href="/directory">directory</Link>. A dark file is{" "}
            <span className="font-mono text-xs text-[var(--fg)]">/badge/listed/dark.svg</span> and a compact file is{" "}
            <span className="font-mono text-xs text-[var(--fg)]">/badge/listed/compact.svg</span>. A listing uses its
            own slug in those same places.
          </p>
          <p>
            Not listed yet? <Link href="/submit">Submit your tool</Link>. A valid submission is published to the
            directory.
          </p>
        </div>
        <BadgeSnippets html={embed.html} markdown={embed.markdown} />
      </div>
    </>
  );
}

function BadgePreview({
  src,
  width,
  height,
  href,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  href: string;
  alt: string;
}) {
  return (
    <a href={href}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} width={width} height={height} alt={alt} />
    </a>
  );
}
