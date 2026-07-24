# Project evidence notes

Concise evidence notes for portfolio claims. Prefer
`portfolio-source-of-truth.md` for approved facts and
`docs/github-inventory.md` for repository inspection detail.

Evidence labels: **repository-verified**, **user-verified**, **inferred**,
**unresolved**.

## ETS Website

- Core stack (Next.js, React, Payload CMS, PostgreSQL): repository-verified;
  confirmed for portfolio wording as user-verified.
- Deployment through Vercel with Neon PostgreSQL and Cloudflare R2: user-verified.
- Cloudflare Turnstile on public forms: user-verified.
- Live URL, dashboard screenshots, and business outcomes: unresolved.
- Public treatment remains a sanitized private case study.

## Sentinel

- Core stack (Next.js, TypeScript, PostgreSQL, Drizzle, Zod): repository-verified;
  confirmed for portfolio wording as user-verified.
- Deployment configuration through Vercel, Neon PostgreSQL, and Cloudflare R2:
  user-verified.
- Turnstile on public-facing request paths: user-verified / repository-supported.
- Production scale, live URL publication, and quantified impact: unresolved.
- Automated tests: repository documentation reports they are not yet committed.

## DataPulse

- Analytics workflow and core Python stack: repository-verified.
- Streamlit Community Cloud deployment and Supabase-backed services: user-verified.
- Forecast evaluation quality and role-enforcement depth: unresolved.
- Whether the deployed app remains live / which URL may be published: unresolved.

## RideFlow

- Express, JavaScript, and MySQL simulation surface: repository-verified.
- Railway deployment with Aiven-managed MySQL: user-verified.
- Hosted demo not currently active: user-verified.
- Fresh-start path remains in the public repo (schema / logic / bootstrap SQL and
  `npm run db:init` against a configured MySQL database, then run the Express
  app locally or on a new host): repository-verified.
- Contribution split and course/assessment context: unresolved.
- Whether any specific public demo URL may be republished: unresolved.

## Snakinesis

- Gesture-control implementation and tests: repository-verified.
- Collaborator credit exists; exact contribution split: unresolved.

## Financial Tick Data Pipeline

- Process/IPC/concurrency implementation: repository-verified.
- Course context and benchmarks: unresolved.

## Secrets and identifiers

Do not record or commit credentials, `.env` values, database URLs, Turnstile
secrets, R2 keys, bucket names, private deployment URLs, or service tokens in
this file or in live content.
