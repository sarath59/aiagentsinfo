import { NextResponse } from "next/server";
import { LIST_TOOL_STRIPE_URL } from "@/lib/paid-listings/offer";
import { insertPaidListingLead } from "@/lib/paid-listings/store";
import { takeRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY = 8_000;
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Save tool details before Stripe. Desk matches the payment in Stripe by hand
 * and sends confirmation manually for now. No webhooks.
 */
export async function POST(request: Request) {
  const limit = takeRateLimit(`paid-lead:${clientIp(request)}`);
  if (!limit.ok) {
    return NextResponse.json({ message: "Too many requests." }, { status: 429 });
  }

  const text = await request.text();
  if (text.length > MAX_BODY) {
    return NextResponse.json({ message: "Payload too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ message: "Invalid JSON." }, { status: 400 });
  }

  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const email = typeof record.email === "string" ? record.email.trim().toLowerCase() : "";
  const toolName = typeof record.tool_name === "string" ? record.tool_name.trim() : "";
  const toolUrl = typeof record.tool_url === "string" ? record.tool_url.trim() : "";
  const toolNotes = typeof record.tool_notes === "string" ? record.tool_notes.trim() : "";

  if (!EMAIL_OK.test(email) || email.length > 200) {
    return NextResponse.json({ message: "Enter a valid email." }, { status: 400 });
  }
  if (toolName.length < 2 || toolName.length > 120) {
    return NextResponse.json({ message: "Enter the product name." }, { status: 400 });
  }
  if (!isHttpUrl(toolUrl)) {
    return NextResponse.json({ message: "Enter a valid https website." }, { status: 400 });
  }

  const lead_token = crypto.randomUUID();
  const saved = await insertPaidListingLead({
    lead_token,
    email,
    tool_name: toolName,
    tool_url: toolUrl,
    tool_notes: toolNotes.slice(0, 2000),
  });

  if (!saved.ok) {
    return NextResponse.json(
      { message: "Could not save details. Email the desk, then pay on Stripe." },
      { status: 502 },
    );
  }


  return NextResponse.json({
    ok: true,
    lead_token,
    stripe_url: LIST_TOOL_STRIPE_URL,
    message: "Details saved. Continue to Stripe to pay.",
  });
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && value.length <= 500;
  } catch {
    return false;
  }
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
