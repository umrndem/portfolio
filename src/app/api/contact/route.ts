import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  validateContactPayload,
  type ContactPayload,
} from "@/lib/contact";
import { sendContactEmail } from "@/lib/email";

export const runtime = "nodejs";

/**
 * Contact endpoint.
 *
 * Validates the payload, drops honeypot traffic, then delivers via Resend when
 * RESEND_API_KEY is configured on the Worker. Without a key it falls back to a
 * stub success so local development works without secrets.
 *
 * Secrets live in the Worker environment (getCloudflareContext), never in
 * NEXT_PUBLIC_* variables.
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

  const { env } = getCloudflareContext();

  if (!env.RESEND_API_KEY) {
    return NextResponse.json({
      ok: true,
      mode: "stub",
      message:
        "Accepted locally. Set the RESEND_API_KEY secret to enable delivery.",
    });
  }

  const result = await sendContactEmail(env, validation.data);

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Message could not be sent right now. Please email directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, mode: "live" });
}
