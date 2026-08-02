// Worker bindings available at runtime via getCloudflareContext().env.
// Merges with the cf-typegen-generated CloudflareEnv (gitignored). Secrets are
// set with `wrangler secret put <NAME>` in prod and `.dev.vars` locally.
interface CloudflareEnv {
  /** Resend API key. Secret only — never expose via NEXT_PUBLIC_*. */
  RESEND_API_KEY?: string;
  /** Where contact submissions are delivered. Defaults to the profile email. */
  CONTACT_INBOX?: string;
  /** Verified Resend sender, e.g. "Portfolio <contact@umrndem.dev>". */
  CONTACT_FROM?: string;
}
