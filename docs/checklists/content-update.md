# Content update checklist

Use for profile, homepage, project, résumé, link, metadata, or asset changes.

## Evidence and accuracy

- [ ] The change agrees with `portfolio-source-of-truth.md`.
- [ ] Project/professional claims have repository evidence or explicit approval.
- [ ] No metric, user count, outcome, responsibility, date, technology, role, or
      deployment status was invented.
- [ ] Uncertainty is qualified or omitted.
- [ ] Collaboration and AI assistance are represented accurately.
- [ ] Academic dates, GPA, employer, and project stage are current and confirmed.

## Writing

- [ ] Spelling, grammar, capitalization, punctuation, and name spelling checked.
- [ ] Copy remains first-person where intended and avoids generic portfolio
      language.
- [ ] Title, summary, proof, and limitation do not contradict each other.
- [ ] Dates/timelines use a consistent format.
- [ ] Visible labels remain concise at mobile width.

## Links and routes

- [ ] Email, social, repository, and download links open the intended destination.
- [ ] External URLs use HTTPS.
- [ ] Changed slug is lowercase kebab-case and migration impact was reviewed.
- [ ] Homepage anchors still match navigation.
- [ ] Hidden/confidential projects do not render or appear in sitemap.
- [ ] Next-project navigation is correct.

## Images and documents

- [ ] Asset is approved for public use.
- [ ] No confidential, employee, company, customer, medical, or internal data.
- [ ] Metadata/EXIF/GPS/hidden document comments removed.
- [ ] Filename is lowercase kebab-case and non-sensitive.
- [ ] Image uses an appropriate optimized format and reasonable file size.
- [ ] Intrinsic width/height values are correct.
- [ ] Alt text describes meaningful visible content.
- [ ] Caption adds context without duplicating alt text or leaking details.
- [ ] Replaced/stale public asset was removed when safe.
- [ ] Résumé claims, links, personal data, and PDF metadata were reviewed.

## Privacy and approval

- [ ] `docs/privacy-and-publication.md` completed.
- [ ] ETS/Sentinel content or media has explicit approval.
- [ ] No private source, internal URL, credential, environment value, identifier,
      log, export, or copied internal documentation appears.
- [ ] No Matootoo relationship/private archive material appears.
- [ ] `public/` contains only publication-safe files.
- [ ] Professional material has final Umar approval.

## Visual review

- [ ] Light theme checked.
- [ ] Dark theme checked.
- [ ] 390 × 844 checked.
- [ ] 768 × 1024 checked.
- [ ] 1440 × 1000 checked.
- [ ] No horizontal overflow.
- [ ] Image crop, caption, line length, and hierarchy remain intentional.
- [ ] Keyboard focus and skip link work on changed routes.
- [ ] Touch targets remain usable.
- [ ] Reduced motion checked if motion changed.
- [ ] Contrast checked for every new text/surface/focus pair.

## Metadata

- [ ] Global/project title and description match visible copy.
- [ ] Canonical uses the intended route and production origin.
- [ ] Open Graph image and alt text are public-safe.
- [ ] Structured data contains no unsupported facts.
- [ ] Sitemap/robots reflect public routes.
- [ ] Favicon/social preview still render if identity changed.

## Verification and Git

- [ ] `npm run validate:content` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm test` passes.
- [ ] `npm run build` passes.
- [ ] `npm audit --omit=dev` passes when dependencies changed/release is planned.
- [ ] `git diff --check` passes.
- [ ] Final diff contains only intended files and no secrets/private assets.
- [ ] Documentation was updated if a path, model, command, or workflow changed.
- [ ] Commit is focused and accurately named.
- [ ] No push/deployment occurs without explicit permission.
