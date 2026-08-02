/**
 * Verifies a Cloudflare Turnstile token against the siteverify endpoint.
 *
 * Runs on the Workers runtime with plain fetch. The secret comes from the
 * Worker environment — never from NEXT_PUBLIC_* vars.
 */
export async function verifyTurnstile(
  secret: string,
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  if (!token) {
    return false;
  }

  const form = new URLSearchParams();
  form.append("secret", secret);
  form.append("response", token);
  if (remoteIp) {
    form.append("remoteip", remoteIp);
  }

  let response: Response;

  try {
    response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: form },
    );
  } catch {
    return false;
  }

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}
