import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "nodejs";

/**
 * Exposes the public Turnstile site key to the client form.
 *
 * The site key is safe to expose (it renders in the widget markup); serving it
 * from the Worker env keeps prod (real key) and local dev (test key) in sync
 * without a rebuild. Returns null when Turnstile is not configured.
 */
export async function GET() {
  const { env } = getCloudflareContext();
  return NextResponse.json({ siteKey: env.TURNSTILE_SITE_KEY ?? null });
}
