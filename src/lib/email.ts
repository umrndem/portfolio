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
  border: "#e4ddd6",
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

  const cell =
    `font-family:Arial,Helvetica,sans-serif;font-size:14px;` +
    `color:${brand.ink};line-height:1.55;`;
  const labelStyle =
    `font-family:Arial,Helvetica,sans-serif;font-size:11px;` +
    `letter-spacing:0.12em;text-transform:uppercase;color:${brand.muted};` +
    `padding:0 0 4px;`;

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:${brand.page};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.page};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${brand.card};border:1px solid ${brand.border};border-radius:14px;overflow:hidden;">
            <tr>
              <td style="height:4px;background:${brand.redBright};font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:26px 30px 8px;">
                ${logoMarkup()}
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${brand.muted};padding-top:14px;">
                  New contact message
                </div>
                <h1 style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:1.3;color:${brand.ink};font-weight:700;">
                  ${name} reached out via your portfolio
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 30px 4px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="${labelStyle}">From</td>
                  </tr>
                  <tr>
                    <td style="${cell}padding:0 0 16px;font-weight:600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="${labelStyle}">Email</td>
                  </tr>
                  <tr>
                    <td style="${cell}padding:0 0 16px;">
                      <a href="mailto:${email}" style="color:${brand.red};text-decoration:none;font-weight:600;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="${labelStyle}">Message</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 8px;">
                      <div style="${cell}background:${brand.quoteBg};border-left:3px solid ${brand.redBright};border-radius:0 8px 8px 0;padding:14px 16px;">
                        ${message}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 30px 26px;">
                <a href="mailto:${email}?subject=Re:%20your%20message" style="display:inline-block;background:${brand.red};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;text-decoration:none;padding:11px 20px;border-radius:8px;">
                  Reply to ${name}
                </a>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid ${brand.border};padding:16px 30px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${brand.muted};line-height:1.6;">
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
  const from = `${headerSafeName(data.name)} via Portfolio <${fromAddress}>`;

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
