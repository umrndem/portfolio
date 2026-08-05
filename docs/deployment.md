# Deployment

This document covers **hosting this portfolio site**. It does not define the
managed platforms used by individual projects (Vercel/Neon/R2 for ETS and
Sentinel, Streamlit Community Cloud/Supabase for DataPulse, Railway/Aiven for
RideFlow). Those project facts live in `portfolio-source-of-truth.md`,
`src/content/projects.ts`, and `docs/project-evidence-notes.md`.

## Current portfolio deployment state

As updated on 6 August 2026, the site is **live on Cloudflare Workers**:

- production origin: `https://umrndem.com` (custom domain on Worker `umrfolio`;
  `https://umrfolio.umrndem.workers.dev` remains available as a secondary URL);
- Worker name: `umrfolio`, deployed through the OpenNext adapter
  (`@opennextjs/cloudflare`) with `wrangler.jsonc`, `open-next.config.ts`, and
  `public/_headers` committed;
- CI: **Workers Builds** is connected to the GitHub repository
  (`umrndem/umrfolio`). Pushes to `main` build with
  `npx opennextjs-cloudflare build` and deploy with `npx wrangler deploy`. The
  build command lives in the Cloudflare dashboard
  (Workers & Pages → umrfolio → Settings → Build), not in the repository;
- the canonical origin is baked into `getSiteUrl()` in
  `src/content/site-settings.ts` as the default, so no dashboard build
  variable is required. `NEXT_PUBLIC_SITE_URL` overrides it.

The user owns the Cloudflare account and authorizes deployments. Do not run
`npm run deploy` or change dashboard build settings without explicit
permission.

## Project managed-platform facts (not this site)

User-verified project deployment practice may be described on project cards and
case studies. Keep that wording practical and restrained. Do not claim DevOps /
SRE / cloud-architect expertise, production scale, or that a project deployment
remains live unless separately verified. Never commit secrets, private URLs,
bucket identifiers, or service tokens.

## Runtime and build contract

The current verified environment is Node 22 with npm 10.

Install:

```bash
npm install
```

Validate:

```bash
npm run check
npm audit --omit=dev
```

Build:

```bash
npm run build
```

Serve the build:

```bash
npm run start
```

The expected output is a `.next/` application with a statically generated
homepage, public project routes, metadata image/icon, sitemap, and robots file.
`.next/` is generated and must not be committed.

## Environment variables

None are required for a read-only deploy. The canonical origin defaults to
`https://umrndem.com` inside `getSiteUrl()`
(`src/content/site-settings.ts`). To point the build at a different origin
(for example localhost audits), set:

```env
NEXT_PUBLIC_SITE_URL=https://your-final-origin.example
```

Rules:

- use the canonical public origin with no trailing path;
- use HTTPS in production;
- configure separately for preview and production if their origins differ;
- never put a secret in a `NEXT_PUBLIC_*` variable;
- never commit `.env.local` or provider-exported secrets.

### Contact form / Turnstile secrets (Worker only)

Live mail delivery and bot checks use Worker secrets, not `NEXT_PUBLIC_*`:

| Secret | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend delivery |
| `TURNSTILE_SITE_KEY` | Public widget key (served by `/api/contact/config`) |
| `TURNSTILE_SECRET_KEY` | Server-side `/siteverify` — required whenever the site key is set |
| `CONTACT_INBOX` / `CONTACT_FROM` | Optional Resend routing overrides |

Sync keys from the Turnstile widget with Wrangler (do not paste secrets into git):

```bash
npx wrangler turnstile widget list
npx wrangler turnstile widget get <sitekey>
printf '%s' '<sitekey>' | npx wrangler secret put TURNSTILE_SITE_KEY
printf '%s' '<secret>' | npx wrangler secret put TURNSTILE_SECRET_KEY
```

Allowed widget hostnames must include every origin that embeds the form
(`umrndem.com`, `www.umrndem.com`, and `umrfolio.umrndem.workers.dev` if that
URL stays public). Update with:

```bash
npx wrangler turnstile widget update <sitekey> \
  --domain umrndem.com \
  --domain www.umrndem.com \
  --domain umrfolio.umrndem.workers.dev \
  --domain localhost
```

Local development uses Cloudflare test keys in `.dev.vars` (gitignored).

## Cloudflare Workers configuration

The repository targets Cloudflare Workers through the OpenNext adapter.

Committed configuration:

| File | Purpose |
|---|---|
| `wrangler.jsonc` | Worker definition: name, `nodejs_compat` flag, compatibility date, `.open-next/worker.js` entry, static assets binding, observability |
| `open-next.config.ts` | OpenNext adapter config: read-only static-assets incremental cache plus cache interception (required so prerendered `/work/<slug>` pages resolve on Workers) |
| `public/_headers` | Immutable `Cache-Control` for `/_next/static/*` hashed build assets |

Commands:

| Command | Effect |
|---|---|
| `npm run preview` | Build the Worker bundle and serve it locally in `workerd` via `wrangler dev` |
| `npm run deploy` | Build and deploy to Cloudflare — **requires explicit user authorization** |
| `npm run cf-typegen` | Generate `cloudflare-env.d.ts` binding types (untracked) |

Generated outputs `.open-next/`, `.wrangler/`, and `cloudflare-env.d.ts` are
gitignored and must not be committed.

`@opennextjs/cloudflare` and `wrangler` are devDependencies: they run at build
and deploy time only and never ship in the Worker, keeping
`npm audit --omit=dev` scoped to real runtime code.

Caching note: every route is prerendered, so the read-only static-assets cache
is sufficient. If ISR/revalidation is ever introduced, switch to a writable
incremental cache (R2/KV) with a Durable Object queue per the
[OpenNext caching guide](https://opennext.js.org/cloudflare/caching), and
record that in `docs/decisions.md`.

## Production deployment process

Production deploys are driven by Git:

1. Confirm clean checks (`npm run check`) and the privacy checklist on the
   diff.
2. Push to `main` **only with explicit user permission**.
3. Workers Builds runs `npx opennextjs-cloudflare build` and deploys with
   `npx wrangler deploy` automatically.
4. Watch the build in the dashboard (Workers & Pages → umrfolio →
   Deployments) or via the builds tooling.
5. Run the post-deployment checks below against the live origin.

`npm run deploy` performs the same build + deploy directly from the local
machine and also requires explicit user authorization.

Do not manually upload `.next/` to generic static hosting. The application uses
Next.js image optimization and generated metadata routes; the Worker bundle in
`.open-next/` is the deployable artifact.

## Domain configuration

The canonical origin is `https://umrndem.com` on Worker `umrfolio`. The
`workers.dev` URL remains reachable as a secondary host. Keep sitemap,
robots, canonical, Open Graph, and structured-data URLs on the apex domain
via `getSiteUrl()`.

If DNS or the custom domain binding changes:

1. Confirm the hostname on the `umrfolio` Worker custom domains list.
2. Confirm DNS at the registrar points at Cloudflare as required.
3. Wait for HTTPS issuance.
4. Keep the default origin in `getSiteUrl()` (or production
   `NEXT_PUBLIC_SITE_URL`) aligned with the chosen canonical HTTPS origin.
5. Rebuild/redeploy.
6. Keep `www` vs apex consistent — prefer apex `umrndem.com` and redirect
   `www` if both are served.
7. Verify canonical, sitemap, robots, Open Graph, and structured-data URLs.

Never place DNS credentials or registrar exports in this repository.

## Rollback

Workers keeps immutable versions of every deployment. To roll back:

1. `npx wrangler rollback` (or dashboard → umrfolio → Deployments → roll back
   to a previous version); then
2. revert the faulty Git commit with a new commit so the next push does not
   redeploy the problem.

Do not force-push/reset the shared production branch.

For a content/privacy incident, remove public access immediately through the
provider if available, then remove the asset/content, rebuild, and verify that
stale URLs/caches no longer expose it.

## Common deployment failures

### Build fails on content validation

Run:

```bash
npm run validate:content
```

Fix the exact slug, URL, visibility, alt-text, or missing-file error.

### Build cannot fetch fonts

`next/font/google` may need network access during an uncached build. Confirm the
provider allows the build-time request, or deliberately move approved font files
to local `next/font/local` assets.

### Canonical URLs contain the wrong origin

The origin is baked in at build time from `getSiteUrl()` — either the default
in `src/content/site-settings.ts` or a `NEXT_PUBLIC_SITE_URL` override present
during the build. Fix the source and redeploy.

### Images are missing only in production

Check case-sensitive filename/path matches and confirm the asset is tracked in
Git. Run `npm run validate:content` from a clean checkout.

### Project route returns 404

Confirm the entry is not hidden/confidential, the slug matches, and the build
generated that route.

### Sitemap/robots use the wrong origin

Same cause as above: these routes are generated from `getSiteUrl()` at build
time. Correct the origin source and rebuild.

### Old assets remain reachable

Provider/CDN caching may persist after a file is removed. Invalidate the exact
asset path using provider controls, or replace versioned filenames and confirm
the old public material is no longer sensitive.

## Post-deployment verification

Check the final HTTPS origin:

- `/`;
- all published `/work/<slug>` routes;
- an unknown and a hidden project URL returns neutral 404;
- `/opengraph-image`;
- `/icon.svg`;
- `/sitemap.xml`;
- `/robots.txt`;
- résumé download, if enabled;
- project repository/social links.

Also verify:

- mobile/tablet/desktop;
- light/dark system preference and persisted toggle;
- keyboard/skip link/focus;
- no console or network errors;
- no horizontal overflow;
- correct canonical and social metadata;
- structured data uses the final origin;
- no confidential slugs/assets;
- reasonable performance and image delivery.

Keep the "Current portfolio deployment state" section above accurate whenever
the origin, domain, build command, or rollback procedure changes.
