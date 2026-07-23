# Muhammad Umar Nadeem — portfolio

A repository-managed personal portfolio for Muhammad Umar Nadeem. The current
site presents selected software and data work as evidence-backed case studies,
with explicit limits around private professional material and AI-assisted
authorship.

The repository is the content-management system. There is no database, CMS,
admin panel, or remote content API.

## Stack

- Next.js App Router
- React
- TypeScript
- Plain CSS with semantic design tokens
- Repository-native typed content

## Start locally

The current build is verified with Node 22 and npm 10.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Commands

```bash
npm run dev               # local development server
npm run lint              # ESLint and Next.js rules
npm run typecheck         # TypeScript without emitting files
npm run validate:content  # content, URL, visibility, and asset checks
npm test                  # current content-integrity test suite
npm run build             # production build and static route generation
npm run start             # serve the production build
npm run check             # lint + types + tests + production build
```

## Where to edit

| Change | Primary file |
|---|---|
| Name, email, education, portrait, résumé | `src/content/profile.ts` |
| Social links | `src/content/profile.ts` |
| Navigation and homepage anchors | `src/content/navigation.ts` |
| Homepage introduction, experience, approach, about, footer copy | `src/content/home.ts` |
| Projects, ordering, visibility, technologies, case studies, media | `src/content/projects.ts` |
| Global title, descriptions, availability label | `src/content/site-settings.ts` |
| Light/dark colors, spacing, component styling | `src/app/globals.css` |
| Theme persistence and pre-paint initialization | `src/systems/theme.ts` |
| Public images and downloadable files | `public/` |

Start normal updates with [`docs/content-management.md`](docs/content-management.md).
Project changes also require
[`docs/project-content-guide.md`](docs/project-content-guide.md) and the
[`new-project checklist`](docs/checklists/new-project.md).

## Maintainer documentation

1. [`docs/handoff.md`](docs/handoff.md) — current state and takeover summary.
2. [`docs/architecture.md`](docs/architecture.md) — how content, routes, themes,
   assets, and metadata connect.
3. [`docs/file-map.md`](docs/file-map.md) — practical editing map.
4. [`docs/development-workflow.md`](docs/development-workflow.md) — safe change
   and verification sequence.
5. [`docs/privacy-and-publication.md`](docs/privacy-and-publication.md) —
   mandatory publication boundaries.

The full maintenance set is linked from
[`docs/handoff.md`](docs/handoff.md). Historical discovery and design research
remain in `research/` and the older evidence documents under `docs/`; they are
inputs, not current implementation instructions.

## Source of truth and privacy

[`portfolio-source-of-truth.md`](portfolio-source-of-truth.md) is the canonical
human-provided profile. Public copy must also stay within repository evidence and
[`docs/content-boundaries.md`](docs/content-boundaries.md).

Never publish private source code, credentials, `.env` values, employee or
company records, internal URLs, unapproved professional screenshots, customer
data, or private Matootoo material. ETS Website and Sentinel may appear only as
approved, sanitized case studies.

## Build and deployment

Set `NEXT_PUBLIC_SITE_URL` to the final public origin before a production build.
The repository currently has no committed hosting-provider configuration and no
configured production domain. See [`docs/deployment.md`](docs/deployment.md)
before introducing a deployment workflow.

Before any release:

```bash
npm run check
npm audit --omit=dev
```

Then inspect the site in light and dark themes at mobile and desktop widths and
complete [`docs/checklists/content-update.md`](docs/checklists/content-update.md).

Do not push or deploy without explicit permission.
