import { NextResponse } from "next/server";
import {
  validateContactPayload,
  type ContactPayload,
} from "@/lib/contact";

export const runtime = "nodejs";

/**
 * Stub contact endpoint.
 *
 * Validates the payload and returns success without sending mail.
 * When deploying on a custom domain, replace the stub branch with a provider
 * such as Resend, Postmark, or Amazon SES using server-only env vars.
 *
 * Never put mail API keys in NEXT_PUBLIC_* variables.
 */
export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Send a JSON body with name, email, and message." },
      { status: 400 },
    );
  }

  // Quietly accept honeypot traffic without revealing the trap.
  if (body.company?.trim()) {
    return NextResponse.json({ ok: true, mode: "stub" });
  }

  const validation = validateContactPayload(body);

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: validation.error },
      { status: 400 },
    );
  }

  // --- Provider hook ---
  // const apiKey = process.env.CONTACT_EMAIL_API_KEY;
  // if (apiKey) {
  //   await sendWithProvider({ ...validation.data, to: process.env.CONTACT_INBOX });
  //   return NextResponse.json({ ok: true, mode: "live" });
  // }

  return NextResponse.json({
    ok: true,
    mode: "stub",
    message:
      "Accepted locally. Wire CONTACT_EMAIL_API_KEY (and related vars) to enable delivery.",
  });
}
