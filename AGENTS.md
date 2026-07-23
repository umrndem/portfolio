# AGENTS.md — portfolio operating rules

These instructions apply to coding agents and automated maintainers working in
this repository.

## Read before changing anything

1. `portfolio-source-of-truth.md` — canonical human-provided identity and facts.
2. `docs/handoff.md` — current implementation state, risks, and unfinished work.
3. `docs/architecture.md` and `docs/file-map.md` — code and content relationships.
4. `docs/privacy-and-publication.md` — mandatory publication boundary.
5. The task-specific guide from the map below.

Inspect the current working tree before editing. Existing uncommitted changes
belong to the user unless proven otherwise.

## Non-negotiable content rules

1. Preserve the evidence-based nature of every portfolio claim.
2. Never invent metrics, users, impact, responsibilities, dates, job titles,
   technologies, outcomes, contribution splits, or deployment status.
3. Use `portfolio-source-of-truth.md` and the evidence documents before rewriting
   profile or project claims. Record uncertainty instead of resolving it by
   assumption.
4. ETS Website and Sentinel are private professional work. Keep their treatment
   abstract, approved, and sanitized.
5. Never expose private source, credentials, `.env` values, internal URLs,
   employee/company/customer data, security-sensitive details, private media, or
   Matootoo relationship material.
6. Describe AI assistance accurately. Do not imply that every line was written
   manually when the approved copy says otherwise.

## Implementation rules

1. Use the existing files in `src/content/` instead of hardcoding a second copy
   of frequently edited content in components.
2. Keep project models aligned with `src/content/types.ts` and the rules enforced
   by `src/content/validation.ts`.
3. Treat `display: "hidden"` and `visibility: "confidential"` deliberately.
   Confidential projects must never generate public routes.
4. Keep design-token usage centralized in `src/app/globals.css`. Do not scatter
   arbitrary color hex values through components.
5. Preserve the clean leather-maroon visual system unless the user explicitly
   requests a design change.
6. Do not add a CMS, database, admin panel, authentication, remote content API,
   state library, or schema framework without a concrete requirement.
7. Do not modify unrelated sections or historical research while completing a
   focused maintenance task.
8. Prefer clear naming and documentation over comments that restate obvious code.
9. Update the relevant maintenance document whenever a path, command, content
   model, deployment workflow, or architecture boundary changes.
10. Record significant architectural decisions in `docs/decisions.md`.

## Task documentation map

| Task | Read first |
|---|---|
| Normal copy/profile/contact update | `docs/content-management.md` |
| Add, edit, reorder, feature, or hide a project | `docs/project-content-guide.md` and `docs/checklists/new-project.md` |
| Add a photo, screenshot, icon, or résumé | `docs/assets-guide.md` |
| Change colors, spacing, components, or responsive behavior | `docs/design-system.md` |
| Change theme behavior or tokens | `docs/theme-maintenance.md` |
| Change titles, social previews, sitemap, robots, or structured data | `docs/seo-and-metadata.md` |
| Change routes, layout, content flow, or utilities | `docs/architecture.md` and `docs/file-map.md` |
| Change scripts or normal engineering workflow | `docs/development-workflow.md` |
| Prepare or alter deployment | `docs/deployment.md` |
| Diagnose a known failure | `docs/troubleshooting.md` |
| Publish any professional/private content | `docs/privacy-and-publication.md` |

## Required verification

For content or code changes, run:

```bash
npm run check
```

For dependency changes, also run:

```bash
npm audit --omit=dev
```

For any visible change, inspect:

- mobile and desktop;
- light and dark themes;
- keyboard focus;
- reduced-motion behavior when motion changed;
- every affected project route;
- the diff for privacy and unrelated edits.

Use `npm run validate:content` while editing structured content. It checks slugs,
visibility rules, URLs, required text, ranges, alt text, and referenced assets.

## Git and handoff

- Make small, focused commits with accurate subjects.
- Stage only files belonging to the current change.
- Never commit secrets or unapproved private assets.
- Do not push, force-push, deploy, or open a remote pull request without explicit
  user permission.
- Leave the worktree understandable: update documentation, state any remaining
  risk, and do not claim checks that were not run.
