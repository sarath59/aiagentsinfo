import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = ((await request.json().catch(() => null)) ?? {}) as Record<string, string>;
  const name = body.name?.trim();
  const website = body.website?.trim();
  const email = body.email?.trim();
  if (!name || !website || !email) {
    return NextResponse.json(
      { message: "Name, website, and email are required." },
      { status: 400 },
    );
  }

  // TODO: persist submissions (email inbox, Airtable, database). No provider keys in the repo.
  console.info("[submit-tool stub]", {
    name,
    website,
    email,
    category: body.category,
    description: body.description,
  });

  return NextResponse.json({
    ok: true,
    message:
      "Received by the stub API. A human still has to review listings — nothing is auto-published.",
  });
}
