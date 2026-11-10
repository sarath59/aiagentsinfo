import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { toCsv } from "@/lib/csv";
import type { ReportLead } from "@/lib/report-lead-fields";
import { leadStore, leadStoreEnvHint } from "@/lib/report-lead-store";

export const runtime = "nodejs";

const COLUMNS: { key: keyof ReportLead; label: string }[] = [
  { key: "id", label: "id" },
  { key: "submittedAt", label: "submittedAt" },
  { key: "reportSlug", label: "reportSlug" },
  { key: "fullName", label: "fullName" },
  { key: "email", label: "email" },
  { key: "company", label: "company" },
  { key: "jobTitle", label: "jobTitle" },
  { key: "companySize", label: "companySize" },
  { key: "industry", label: "industry" },
  { key: "country", label: "country" },
  { key: "useFor", label: "useFor" },
  { key: "useForDetail", label: "useForDetail" },
  { key: "heardAbout", label: "heardAbout" },
  { key: "phone", label: "phone" },
  { key: "linkedinUrl", label: "linkedinUrl" },
  { key: "reportsOptIn", label: "reportsOptIn" },
  { key: "referrer", label: "referrer" },
  { key: "utmSource", label: "utmSource" },
  { key: "utmMedium", label: "utmMedium" },
  { key: "utmCampaign", label: "utmCampaign" },
  { key: "utmTerm", label: "utmTerm" },
  { key: "utmContent", label: "utmContent" },
  { key: "userAgent", label: "userAgent" },
  { key: "countryHeader", label: "countryHeader" },
];

export async function GET(request: Request) {
  const auth = authorize(request);
  if (auth) return auth;
  const store = leadStore();
  if (!store) {
    return new Response(leadStoreEnvHint(), {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "private, no-store" },
    });
  }
  if (!store.list) {
    return new Response(
      "This lead store is a webhook. It can receive new rows, and it cannot list them from this site. Export from the system that receives LEADS_WEBHOOK_URL.",
      { status: 501, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "private, no-store" } },
    );
  }
  try {
    const leads = await store.list();
    const csv = toCsv(
      COLUMNS.map((column) => column.label),
      leads.map((lead) => COLUMNS.map((column) => cell(lead[column.key]))),
    );
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="report-leads.csv"',
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch (error) {
    console.error("[report-lead] export failed", error instanceof Error ? error.name : "error");
    return new Response("The lead store could not be read.", {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "private, no-store" },
    });
  }
}

export async function DELETE(request: Request) {
  const auth = authorize(request);
  if (auth) return auth;
  const store = leadStore();
  if (!store?.delete) {
    return NextResponse.json(
      { ok: false, message: "This store cannot delete a row from the site." },
      { status: 501 },
    );
  }
  const id = new URL(request.url).searchParams.get("id")?.trim() || "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ ok: false, message: "Pass the lead id." }, { status: 400 });
  }
  const removed = await store.delete(id);
  return NextResponse.json({ ok: removed }, { status: removed ? 200 : 404 });
}

function authorize(request: Request) {
  const expected = process.env.ADMIN_TOKEN?.trim() ?? "";
  if (expected.length < 16) {
    return new Response("Not found", { status: 404, headers: { "Cache-Control": "private, no-store" } });
  }
  const header = request.headers.get("authorization") || "";
  const provided = header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : "";
  if (!safeEqual(provided, expected)) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "Cache-Control": "private, no-store", "WWW-Authenticate": "Bearer" },
    });
  }
  return null;
}

function safeEqual(provided: string, expected: string) {
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function cell(value: ReportLead[keyof ReportLead]) {
  if (typeof value === "boolean") return value ? "yes" : "no";
  return value ?? "";
}
