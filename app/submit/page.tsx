import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { SubmitToolForm } from "@/components/SubmitToolForm";
import { defaultMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = defaultMetadata(
  "Submit your tool",
  "Submit an AI tool, SaaS product, app, or agent to the directory. No login and no fee. A listing goes live only after a fact-check.",
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
        summary="No account and no fee. We fact-check every submission before it appears in the directory. Payment does not buy a listing or a rank."
      />
      <div className="mx-auto grid max-w-2xl gap-12 px-4 pb-20">
        <SubmitToolForm />
        <section className="text-sm leading-relaxed text-[var(--muted)]">
          <h2 className="font-semibold tracking-tight text-2xl text-[var(--fg)]">What happens next</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5">
            <li>Your submission is saved as pending and is not published.</li>
            <li>An editor checks the official site and the details you sent.</li>
            <li>Approved tools are listed after that fact-check. Nothing is published automatically.</li>
          </ol>
          <p className="mt-4">
            If the form cannot save, it gives you an email draft to {site.email}. Do not send passwords, private metrics, or other secrets.
          </p>
        </section>
      </div>
    </>
  );
}
