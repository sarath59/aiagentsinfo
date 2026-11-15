import { NextResponse } from "next/server";
import { createAltchaChallenge } from "@/lib/altcha";
import { SUBMISSION_UNAVAILABLE_MESSAGE } from "@/lib/submissions";

export const runtime = "nodejs";

export async function GET() {
  try {
    const challenge = await createAltchaChallenge();
    if (!challenge) return unavailable();
    return NextResponse.json(challenge, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    console.error("[altcha] challenge failed");
    return NextResponse.json(
      { message: "The human check could not be started." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}

function unavailable() {
  return NextResponse.json(
    { ok: false, code: "unconfigured", message: SUBMISSION_UNAVAILABLE_MESSAGE },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}
