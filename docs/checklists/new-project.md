# New project checklist

Use this entire checklist before publishing a new project.

## 1. Evidence and selection

- [ ] The project adds distinct evidence rather than inflating the project count.
- [ ] Relevant repository/source material was reviewed.
- [ ] Public/private ownership and publication rights are known.
- [ ] Project name is approved for public use.
- [ ] Umar’s responsibilities are supportable.
- [ ] Collaboration/contribution split is confirmed or explicitly qualified.
- [ ] Current stage/deployment status is verified.
- [ ] Technologies reflect demonstrated use, not dependency-file presence.
- [ ] No metrics/outcomes are included without evidence.

## 2. Privacy classification

- [ ] `visibility` chosen deliberately:
      `public`, `private-case-study`, or `confidential`.
- [ ] `display` chosen deliberately:
      `featured`, `supporting`, or `hidden`.
- [ ] Confidential entry uses `display: "hidden"`.
- [ ] Private repository URL is omitted.
- [ ] ETS/Sentinel-specific approval and restrictions were applied if relevant.
- [ ] No employee/company/customer/medical/internal data or source appears.
- [ ] Professional publication material has explicit Umar approval.

## 3. Project entry

- [ ] Added to `allProjects` in `src/content/projects.ts`.
- [ ] Unique lowercase kebab-case `slug`.
- [ ] Factual `title`, `eyebrow`, `summary`, `context`, `period`, and `stage`.
- [ ] `range` lists only exact evidence-backed areas, uniquely and in axis order.
- [ ] Unique non-empty `technologies` (core stack).
- [ ] Optional `deployment` / `integrations` lists are accurate, unique, and
      non-overlapping with each other and `technologies`.
- [ ] Turnstile (if present) is under `integrations`, not `deployment`.
- [ ] Optional `infrastructureNote` is concise, factual, and secret-free.
- [ ] Specific `proof` statement.
- [ ] Honest `limitation` statement (including unresolved live-deployment status
      when relevant).
- [ ] Technology logo mappings exist for intended badge labels.
- [ ] Three-to-five coherent `sections` with unique titles.
- [ ] Public HTTPS `repositoryUrl` only if approved.
- [ ] Object placed at intentional homepage/next-project position.
- [ ] Positional card surface still progresses correctly for the new published
      count (only the final card near-white; see `project-surfaces.ts`).
- [ ] First published/featured treatment reviewed.

## 4. Media

- [ ] Every asset is approved, sanitized, flattened, and metadata-cleaned.
- [ ] Files use project-slug lowercase kebab-case names.
- [ ] Stored under `public/images/projects/`.
- [ ] Format/size/dimensions follow `docs/assets-guide.md`.
- [ ] Cover proves the project and works at mobile crop.
- [ ] Gallery order tells a useful sequence.
- [ ] Every image has meaningful privacy-safe alt text.
- [ ] Captions are optional, useful, and privacy-safe.
- [ ] No realistic fake records were created for private professional work.

## 5. Local validation

- [ ] `npm run validate:content` passes.
- [ ] Homepage card renders and links correctly.
- [ ] `/work/<slug>` renders.
- [ ] Case-study navigation/sections render.
- [ ] Repository action or private note is correct.
- [ ] Cover/gallery render without distortion.
- [ ] Next-project link and sequence are correct.
- [ ] `/sitemap.xml` includes the project only when publishable.
- [ ] Unknown/hidden/confidential route returns neutral 404.

## 6. Visual and accessibility review

- [ ] Light and dark themes.
- [ ] 390 × 844, 768 × 1024, 1440 × 1000.
- [ ] No overflow or broken long text.
- [ ] Heading hierarchy and reading order are correct.
- [ ] Link/focus states are visible.
- [ ] Images/captions are accessible.
- [ ] Technology labels wrap cleanly across core and secondary rows.
- [ ] Secondary deployment/integration rows remain quieter than the core stack.
- [ ] Logos remain readable on light, dark, and maroon card surfaces.
- [ ] Maroon hierarchy remains balanced.
- [ ] Reduced motion still preserves content.

## 7. Metadata and publication

- [ ] Project title/summary work as metadata.
- [ ] Canonical `/work/<slug>` is correct.
- [ ] Open Graph output contains no private detail.
- [ ] Sitemap and structured public route set are correct.
- [ ] Existing external/inbound links assessed if replacing a project/slug.
- [ ] Final public copy and assets approved by Umar.

## 8. Final verification and commit

- [ ] `npm run check` passes.
- [ ] `npm audit --omit=dev` reviewed for release/dependency change.
- [ ] `git diff --check` passes.
- [ ] Diff inspected for credentials, private data/source/media, internal URLs,
      unsupported claims, and unrelated changes.
- [ ] `docs/project-content-guide.md` updated if the model/workflow changed.
- [ ] `docs/handoff.md` updated if project count, major status, or remaining work
      changed.
- [ ] Focused commit created.
- [ ] No push/deployment without explicit permission.
