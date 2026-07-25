# Architectural decisions

This is a concise record of decisions that materially affect future maintenance.
Add an entry when a change alters content ownership, routing, privacy enforcement,
deployment, or a major technical boundary. Visual rationale belongs in the
design documents instead.

## 001 — The repository is the content-management system

**Status:** accepted
**Date:** 24 July 2026

Portfolio content is maintained through reviewed repository changes. The site
does not use a database, CMS, admin panel, authentication, or remote content API.
Typed TypeScript remains readable for a developer and integrates directly with
the build.

## 002 — Content is split by editing responsibility

**Status:** accepted
**Date:** 24 July 2026

Profile/socials, navigation, homepage narrative, projects, and global site
settings use separate modules under `src/content/`. Shared types and validation
remain adjacent. This removes common duplicate sources while avoiding one file
per sentence or a generic content framework.

## 003 — Publication safety is part of the project model

**Status:** accepted
**Date:** 24 July 2026

Projects declare both display prominence and visibility. Hidden and confidential
entries are excluded from cards, generated routes, sitemap entries, and
next-project navigation. Confidential entries must also be hidden, and validation
rejects unsafe combinations.

## 004 — Validation is lightweight and build-adjacent

**Status:** accepted
**Date:** 24 July 2026

A small TypeScript validator checks content invariants, URL safety, alt text,
asset paths, and file existence. It runs through `npm test` and `npm run check`.
The project uses `tsx` only to execute this maintenance script; a schema framework
would add more indirection than value at the current scale.

## 005 — Search metadata derives from the same public model

**Status:** accepted
**Date:** 24 July 2026

Global metadata comes from `site-settings.ts`, project metadata comes from the
project model, and sitemap routes come from the filtered published-project
export. This prevents hidden or confidential work from leaking through a
separate route list.

## 006 — Project stack is split into core, deployment, and integrations

**Status:** accepted
**Date:** 24 July 2026

Projects keep a required `technologies` core-stack list and may optionally
declare `deployment` (managed platforms / hosted databases / object storage)
and `integrations` (for example Turnstile). Homepage cards keep the core row
primary and render quieter secondary rows when present. Case studies label the
three categories and may include a concise `infrastructureNote`. This keeps
managed-service facts visible without merging them into the application stack
or inventing DevOps expertise.

## 007 — Selected Work card surfaces are positional

**Status:** accepted
**Date:** 24 July 2026

Homepage project-card backgrounds use a six-stop true-red scale driven by each
card’s index and the published project count (`src/content/project-surfaces.ts`,
`data-surface` / `data-ink`). Colors are not keyed to project names. The first
card is the strongest red; only the final visible card uses the near-white
(light) or deepest near-black (dark) stop. Intermediate cards must remain
visibly red-tinted and mutually distinguishable. Do not allow salmon, peach,
beige, brown, mauve, or purple drift.

## 008 — Contact form lives in the footer with a stub mail API

**Status:** accepted
**Date:** 25 July 2026

The Contact navigation target remains `#contact` on the deep-maroon footer. A
client form posts to `/api/contact`, which validates input and currently returns
stub success without sending mail. A honeypot field discourages trivial bots.
When a custom domain is live, wire a server-only mail provider through
non-public environment variables. Keep the direct `mailto:` fallback.

## 009 — Scroll motion stays one-shot and explanatory

**Status:** accepted
**Date:** 25 July 2026

Homepage motion uses IntersectionObserver for range-line fills and restrained
section/approach reveals. Prefer final-state-first behavior under
`prefers-reduced-motion`. Do not port ETS Website scroll engines (sticky SVG
morph, Three.js scrub, coverflow, deck flip, 3D marquee, snap sections, peel
hero, or evidence count-ups).
