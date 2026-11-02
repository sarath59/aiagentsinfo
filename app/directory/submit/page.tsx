import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { SubmitToolForm } from "@/components/SubmitToolForm";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  "Submit a tool",
  "Suggest an AI tool, app, SaaS product, or agent for the directory. Listings are reviewed; nothing auto-publishes.",
  "/directory/submit",
);

export default function SubmitToolPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Directory", path: "/directory" },
          { name: "Submit", path: "/directory/submit" },
        ]}
      />
      <PageHeader
        kicker="Directory"
        title="Submit a tool"
        summary="Suggest a product. Nothing is published automatically, and payment does not buy a ranking."
      />
      <div className="mx-auto max-w-xl px-4 pb-20">
        <SubmitToolForm />
      </div>
    </>
  );
}
