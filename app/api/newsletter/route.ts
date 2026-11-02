import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; audience?: string }
    | null;
  const email = body?.email?.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ message: "A valid email is required." }, { status: 400 });
  }

  // TODO: wire a newsletter provider (Buttondown, Loops, Resend audience, etc.).
  // Do not add API keys to this repository. Use Vercel env vars when you connect one.
  console.info("[newsletter stub]", { email, audience: body?.audience ?? "everyone" });

  return NextResponse.json({
    ok: true,
    message:
      "Thanks. No mailing list is connected yet, so this address was not added to one.",
  });
}
