import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { SubmitToolForm } from "@/components/SubmitToolForm";
import { defaultMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = defaultMetadata(
  "Submit your tool",
  "Submit an AI tool, SaaS product, app, or agent to the directory. No login and no fee. A valid submission goes live in about two minutes.",
  "/submit",
);

export default function SubmitPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Submit your tool", path: "/submit" },
        ]}
      />
      <PageHeader
        kicker="Directory"
        title="Submit your tool"
        summary="No account and no fee. A valid submission is published automatically. Payment does not buy a listing or a rank."
      />
      <div className="mx-auto grid max-w-2xl gap-12 px-4 pb-20">
        <SubmitToolForm />
        <section className="text-sm leading-relaxed text-[var(--muted)]">
          <h2 className="font-semibold tracking-tight text-2xl text-[var(--fg)]">What happens next</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5">
            <li>We check that the site responds, the domain is new, and the text can be published. Keyboard-mash is rejected. A one-line slogan can go live for visitors and stay out of search. Read the <Link href="/editorial-policy">editorial policy</Link>.</li>
            <li>We commit the listing to the directory. Your email is not part of that public file.</li>
            <li>Your tool will be live in about 2 minutes.</li>
          </ol>
          <p className="mt-4">
            If the form cannot save, it gives you an email draft to {site.email}. Do not send passwords, private metrics, or other secrets.
          </p>
        </section>
      </div>
    </>
  );
}
