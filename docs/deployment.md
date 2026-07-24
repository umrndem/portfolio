# Deployment

This document covers **hosting this portfolio site**. It does not define the
managed platforms used by individual projects (Vercel/Neon/R2 for ETS and
Sentinel, Streamlit Community Cloud/Supabase for DataPulse, Railway/Aiven for
RideFlow). Those project facts live in `portfolio-source-of-truth.md`,
`src/content/projects.ts`, and `docs/project-evidence-notes.md`.

## Current portfolio deployment state

As audited on 24 July 2026:

- no hosting provider is configured in the repository;
- no `vercel.json`, Netlify configuration, container, or CI workflow is
  committed;
- no production domain is recorded;
- no Git remote is configured;
- no preview-deployment workflow exists;
- the application produces a standard Next.js production build in `.next/`.

Do not describe the portfolio site as deployed until a live origin is explicitly
confirmed. Do not invent provider or domain instructions.

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

Required for a real deployment:

```env
NEXT_PUBLIC_SITE_URL=https://your-final-origin.example
```

Rules:

- use the canonical public origin with no trailing path;
- use HTTPS in production;
- configure separately for preview and production if their origins differ;
- never put a secret in a `NEXT_PUBLIC_*` variable;
- never commit `.env.local` or provider-exported secrets.

The application has no database, analytics key, CMS secret, or server credential.

## Choose a hosting provider

The site can run on a provider that supports Next.js 16 App Router and Node 22.
The maintainer/user must explicitly choose and authorize the provider.

Before connecting a provider, confirm:

- account/organization owner;
- source repository and production branch;
- preview access policy;
- build command and Node version;
- environment-variable ownership;
- canonical domain;
- who may trigger production deployments;
- rollback mechanism;
- whether private professional material is approved for public preview.

Vercel is a natural Next.js option but is not currently configured or assumed.
Self-hosting is possible but would add server/process/reverse-proxy operations
that this repository does not presently document.

## Provider configuration

For a conventional managed Next.js deployment:

| Setting | Value |
|---|---|
| Install command | `npm install` |
| Build command | `npm run build` |
| Output | Provider’s native Next.js output (`.next/`) |
| Node runtime | 22 |
| Production environment | `NEXT_PUBLIC_SITE_URL` set to final HTTPS origin |
| Preview environment | Set to stable preview origin only if canonical behavior is deliberately desired there |

Prefer provider-native zero-configuration support. Add a provider config file
only when a real setting cannot be expressed in the provider UI/defaults. Record
that decision in `docs/decisions.md`.

## Preview deployment process

Preview deployment is not configured. Once a provider/remote is approved:

1. Create a focused branch.
2. Run `npm run check` locally.
3. Inspect the diff/privacy checklist.
4. Push only with permission.
5. Let the provider build the branch/PR preview.
6. Restrict preview access if it contains not-yet-approved professional content.
7. Verify routes, themes, assets, metadata, and downloads on the preview origin.
8. Obtain content approval before production merge.

A secret/unlisted preview URL is not a substitute for sanitization.

## Production deployment process

Once configured:

1. Confirm the target commit and clean checks.
2. Confirm the production `NEXT_PUBLIC_SITE_URL`.
3. Confirm public approval for all assets and professional material.
4. Merge/promote through the approved production branch/workflow.
5. Wait for a successful immutable deployment.
6. Run the post-deployment checks below.
7. Record the provider, domain, production branch, and rollback steps in this
   document.

Do not manually upload `.next/` to generic static hosting. The application uses
Next.js image optimization and generated metadata routes; choose a compatible
Next.js runtime or deliberately configure a static-export architecture first.

## Domain configuration

No domain is configured. When one is approved:

1. Add it to the hosting provider.
2. Configure DNS through the actual domain registrar.
3. Wait for HTTPS issuance.
4. Set production `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS origin.
5. Rebuild/redeploy.
6. Choose whether `www` or apex is canonical and redirect the other.
7. Verify canonical, sitemap, robots, Open Graph, and structured-data URLs.

Never place DNS credentials or registrar exports in this repository.

## Rollback

Because no provider is configured, there is no current one-click rollback.

After choosing a provider, prefer:

1. re-promoting the last known-good immutable deployment; or
2. reverting the faulty Git commit with a new commit and redeploying.

Do not force-push/reset the shared production branch. Document the exact
provider-specific rollback controls after setup.

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

### Canonical URLs contain localhost

`NEXT_PUBLIC_SITE_URL` was missing or set only after build. Configure it in the
build environment and redeploy.

### Images are missing only in production

Check case-sensitive filename/path matches and confirm the asset is tracked in
Git. Run `npm run validate:content` from a clean checkout.

### Project route returns 404

Confirm the entry is not hidden/confidential, the slug matches, and the build
generated that route.

### Sitemap/robots use the wrong origin

Correct `NEXT_PUBLIC_SITE_URL` and rebuild; these routes are generated from that
origin.

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

After the first real deployment, replace the “not configured” section with the
actual provider, project identifier (non-secret), production branch, domain,
preview policy, and rollback procedure.
