import { profile } from "@/content/profile";

type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

export type SendResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Delivers a contact submission via Resend's HTTP API.
 *
 * Runs on the Cloudflare Workers runtime (plain fetch, no Node SDK). Secrets
 * come from the Worker environment — never from NEXT_PUBLIC_* vars.
 */
export async function sendContactEmail(
  env: CloudflareEnv,
  data: ContactMessage,
): Promise<SendResult> {
  const apiKey = env.RESEND_API_KEY;

  if (!apiKey) {
    return { ok: false, error: "not-configured" };
  }

  const to = env.CONTACT_INBOX?.trim() || profile.email;
  const from = env.CONTACT_FROM?.trim() || "Portfolio <onboarding@resend.dev>";

  const subject = `Portfolio contact from ${data.name}`;
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    "",
    data.message,
  ].join("\n");

  let response: Response;

  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        reply_to: data.email,
      }),
    });
  } catch {
    return { ok: false, error: "network" };
  }

  if (!response.ok) {
    return { ok: false, error: `provider-${response.status}` };
  }

  return { ok: true };
}
