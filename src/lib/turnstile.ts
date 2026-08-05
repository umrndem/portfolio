/**
 * Verifies a Cloudflare Turnstile token via the canonical siteverify endpoint.
 *
 * Always POSTs to siteverify when invoked — including empty tokens — so
 * Cloudflare can attribute validation attempts to the widget. The secret comes
 * from the Worker environment as TURNSTILE_SECRET — never from NEXT_PUBLIC_*.
 */
export async function verifyTurnstile(
  secret: string,
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteIp) {
    body.append("remoteip", remoteIp);
  }

  let response: Response;

  try {
    response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      },
    );
    if (!response.ok) {
      return false;
    }
  } catch {
    return false;
  }

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}
