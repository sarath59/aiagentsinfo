import { AnalyticsView } from "@/app/admin/analytics/view";
import { ADMIN_COOKIE, adminAuthorized, adminKey } from "@/lib/analytics/auth";
import { loadSummary } from "@/lib/analytics/summary";
import { defaultMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...defaultMetadata("Analytics", "Private analytics for this site.", "/admin/analytics", { index: false }),
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; error?: string }>;
}) {
  const params = await searchParams;
  if (params.key) redirect(`/api/analytics/session?key=${encodeURIComponent(params.key)}`);

  const jar = await cookies();
  if (!adminAuthorized(jar.get(ADMIN_COOKIE)?.value)) {
    return <Gate error={params.error} />;
  }

  try {
    const summary = await loadSummary(14);
    return <AnalyticsView summary={summary} />;
  } catch (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="display text-4xl">Analytics</h1>
        <p className="mt-4 text-[var(--muted)]">The store could not be read. {error instanceof Error ? error.message : "Try again in a moment."}</p>
      </div>
    );
  }
}

async function unlock(formData: FormData) {
  "use server";
  const key = String(formData.get("key") || "");
  if (!adminKey()) redirect("/admin/analytics?error=config");
  if (!adminAuthorized(key)) redirect("/admin/analytics?error=1");
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, key, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/admin/analytics");
}

function Gate({ error }: { error?: string }) {
  const configured = Boolean(adminKey());
  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <p className="kicker kicker-lead">Private</p>
      <h1 className="display mt-3 text-4xl">Analytics</h1>
      <p className="mt-4 text-[var(--muted)]">
        {configured
          ? "Enter the admin key. It is stored in an httpOnly cookie for 30 days."
          : "Add ANALYTICS_ADMIN_KEY in the Vercel project environment, then redeploy."}
      </p>
      {error === "1" ? <p className="mt-3 text-sm text-red-700">That key did not match.</p> : null}
      {error === "config" || !configured ? (
        <p className="mt-3 text-sm text-[var(--muted)]">The dashboard stays closed until ANALYTICS_ADMIN_KEY is set.</p>
      ) : null}
      <form action={unlock} className="glass mt-6 grid gap-3 rounded-3xl p-5">
        <label className="grid gap-2 text-sm font-medium" htmlFor="analytics-key">
          Admin key
          <input
            id="analytics-key"
            name="key"
            type="password"
            required
            autoComplete="current-password"
            className="focus-ring w-full rounded-full border border-[var(--stroke)] bg-transparent px-4 py-3 font-normal"
          />
        </label>
        <button type="submit" className="btn-primary px-5 py-3 text-sm">
          Open dashboard
        </button>
      </form>
    </div>
  );
}
