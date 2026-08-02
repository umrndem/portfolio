import { profile } from "@/content/profile";

type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

export type SendResult =
  | { ok: true }
  | { ok: false; error: string };

// Brand palette pulled from the site tokens (globals.css).
const brand = {
  ink: "#1b1817",
  muted: "#7a716c",
  page: "#f7f5f3",
  card: "#ffffff",
  border: "#dad2cc",
  red: "#c71616",
  redBright: "#e5120e",
  slate: "#8f8783",
  quoteBg: "#f6efec",
} as const;

/** Escapes user-supplied text for safe interpolation into the HTML email. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strips characters that could break an email header display name. */
function headerSafeName(value: string): string {
  return value.replace(/["\r\n]+/g, " ").trim();
}

/**
 * The exact U/N logo (logo.svg rasterized to public/logo-email.png).
 *
 * A single static image with the light background baked in, so it renders
 * identically in every inbox — no mode-dependent swapping.
 */
function logoMarkup(): string {
  return (
    `<img src="https://umrndem.com/logo-email.png" width="66" height="60" ` +
    `alt="U/N — ${escapeHtml(profile.name)}" ` +
    `style="display:block;border:0;outline:none;height:60px;width:66px;" />`
  );
}

function buildHtml(data: ContactMessage): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const message = escapeHtml(data.message).replace(/\n/g, "<br />");

  const sans = "Arial,Helvetica,sans-serif";
  const mono = "'Courier New',Courier,monospace";
  const cell = `font-family:${sans};font-size:14px;color:${brand.ink};line-height:1.55;`;
  const label =
    `font-family:${mono};font-size:11px;letter-spacing:0.1em;` +
    `text-transform:uppercase;color:${brand.muted};padding:0 0 5px;`;

  return `<!doctype html>
<html>
  <head>
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <style>:root{color-scheme:light only;supported-color-schemes:light}</style>
  </head>
  <body style="margin:0;padding:0;background:${brand.page};color-scheme:light only;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.page};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${brand.card};border:1px solid ${brand.border};">
            <tr>
              <td style="height:5px;background:${brand.redBright};font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:28px 32px 10px;">
                ${logoMarkup()}
                <div style="font-family:${mono};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${brand.muted};padding-top:18px;">
                  New contact message
                </div>
                <h1 style="margin:8px 0 0;font-family:${sans};font-size:21px;line-height:1.25;color:${brand.ink};font-weight:700;letter-spacing:-0.01em;">
                  ${name} reached out via your portfolio
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px 6px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="${label}">From</td></tr>
                  <tr><td style="${cell}padding:0 0 16px;font-weight:700;">${name}</td></tr>
                  <tr><td style="${label}">Email</td></tr>
                  <tr>
                    <td style="${cell}padding:0 0 16px;">
                      <a href="mailto:${email}" style="color:${brand.red};text-decoration:none;font-weight:700;">${email}</a>
                    </td>
                  </tr>
                  <tr><td style="${label}">Message</td></tr>
                  <tr>
                    <td style="padding:0 0 8px;">
                      <div style="${cell}background:${brand.quoteBg};border-left:4px solid ${brand.redBright};padding:16px 18px;">
                        ${message}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 28px;">
                <a href="mailto:${email}?subject=Re:%20your%20message" style="display:inline-block;background:${brand.red};border:1px solid ${brand.red};color:#ffffff;font-family:${mono};font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;padding:13px 20px;">
                  Reply to ${name}&nbsp;&nbsp;&rarr;
                </a>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid ${brand.border};padding:18px 32px;font-family:${mono};font-size:11px;letter-spacing:0.02em;color:${brand.muted};line-height:1.7;">
                Sent from the contact form at
                <a href="https://umrndem.com" style="color:${brand.muted};">umrndem.com</a>.
                Reply directly to reach ${name}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

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
  const fromAddress = env.CONTACT_FROM?.trim() || "noreply@umrndem.com";
  const from = `${headerSafeName(data.name)} <${fromAddress}>`;

  const subject = `New portfolio message from ${data.name}`;
  const text = [
    `New contact message from ${profile.name}'s portfolio.`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    "",
    data.message,
    "",
    "— Sent from the contact form at umrndem.com",
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
        cc: data.email,
        subject,
        html: buildHtml(data),
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
