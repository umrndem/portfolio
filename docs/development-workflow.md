# Development workflow

Use this sequence for normal code or content maintenance. Keep changes focused,
reversible, and supported by evidence.

## 1. Inspect the repository

```bash
git status --short
git branch --show-current
git log -5 --oneline
```

Do not overwrite uncommitted work you did not create. Read:

- `portfolio-source-of-truth.md`;
- `docs/handoff.md`;
- `docs/privacy-and-publication.md`;
- the task-specific guide listed in `AGENTS.md`.

## 2. Create a focused branch

When a remote/team workflow exists:

```bash
git switch -c content/add-example-project
```

Use a short purpose-based branch such as:

- `content/update-profile`;
- `content/add-snakinesis-media`;
- `fix/theme-bootstrap`;
- `docs/update-deployment`.

The repository currently has no configured remote, so branch/push conventions
must be confirmed before publication work.

## 3. Install dependencies

```bash
npm install
```

Use the committed `package-lock.json`. Do not switch package managers during an
unrelated change.

The current repository is verified with Node 22 and npm 10.

## 4. Configure local environment

No environment file is required — the canonical origin defaults to
`https://umrndem.com` inside `getSiteUrl()`. To override it locally (for
example to audit metadata against localhost):

```bash
cp .env.example .env.local
```

and set:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Never add secrets to `NEXT_PUBLIC_*`. Keep real environment files untracked.

## 5. Make one focused change

- Edit normal portfolio content under `src/content/`.
- Add only approved assets under `public/`.
- Keep design roles in `globals.css`.
- Change presentation components only when structure/behavior changes.
- Update the relevant documentation when a path, schema, command, or workflow
  changes.
- Record material architectural decisions in `docs/decisions.md`.

Do not reformat or “clean up” unrelated files.

## 6. Validate content while editing

```bash
npm run validate:content
```

This checks the real content model, publication states, slugs, URLs, ranges, alt
text, and referenced asset files.

## 7. Preview locally

```bash
npm run dev
```

Check the affected route and linked routes. For a project:

- homepage card;
- `/work/<slug>`;
- next-project sequence;
- optional repository/download link;
- `/sitemap.xml`.

## 8. Inspect mobile and desktop

Use at least:

- 390 × 844;
- 768 × 1024;
- 1440 × 1000.

Check horizontal overflow, reading order, image crops, long labels, captions,
header navigation, and touch targets.

## 9. Test both themes

- Follow system light with no saved choice.
- Follow system dark with no saved choice.
- Toggle manually and reload.
- Check affected surfaces, focus rings, borders, images, and text contrast.

For theme/motion changes, also emulate reduced motion. Use
`docs/theme-maintenance.md`.

## 10. Run linting

```bash
npm run lint
```

Fix the cause. Do not broadly disable a lint rule to silence one component.

## 11. Run type checking

```bash
npm run typecheck
```

Content-model errors usually indicate a missing/renamed field or an invalid
literal state. Keep `strict` TypeScript enabled.

## 12. Run tests

```bash
npm test
```

The current automated test suite runs content/asset validation plus maintenance
documentation link/path/command validation. There is no unit, integration, or
end-to-end framework yet. Do not claim broader automated coverage.

If future behavior warrants real automated tests, add the smallest suitable
runner and update this guide, `README.md`, `package.json`, and the handoff.

## 13. Run the production build

```bash
npm run build
```

Confirm generation of:

- homepage;
- five currently published project routes (or the new expected count);
- icon and Open Graph image;
- robots and sitemap;
- not-found route.

The combined command is:

```bash
npm run check
```

It runs lint, typecheck, tests, and build in order.

For dependency changes:

```bash
npm audit --omit=dev
```

For changes that affect server behavior or deployment, also verify the app in
the Cloudflare Workers runtime (`workerd`), which is what production would run:

```bash
npm run preview
```

This builds the Worker bundle with the OpenNext adapter and serves it through
`wrangler dev`. Check the same routes you checked with `npm run dev`.

## 14. Inspect the diff and privacy boundary

```bash
git diff --check
git status --short
git diff
```

Look specifically for:

- credentials and `.env` values;
- internal/private URLs;
- employee, company, customer, or medical records;
- unapproved professional screenshots;
- private source or copied internal documentation;
- unsupported claims or metrics;
- unexpected generated files;
- unrelated edits.

Use `docs/privacy-and-publication.md` as the mandatory release gate.

## 15. Update documentation

Update documentation in the same focused change when:

- a content field/path changes;
- a command changes;
- an asset convention changes;
- routing/metadata/theme behavior changes;
- deployment state changes;
- a known risk is resolved or introduced.

Do not leave two active guides that disagree. Update or clearly archive the old
instruction.

## 16. Commit

Stage only the intended files:

```bash
git add path/to/file
git diff --cached --check
git diff --cached
git commit -m "content: update verified profile details"
```

Prefer small subjects such as:

- `content: add approved project media`;
- `fix: preserve theme before paint`;
- `docs: update deployment verification`;
- `refactor: centralize project metadata`.

Do not mix visual redesign, dependency upgrades, and unrelated content updates in
one commit.

## 17. Push or deploy only with permission

This repository’s standing rule is no remote push or deployment without explicit
user permission. If permission is granted, follow the chosen remote/hosting
workflow in `docs/deployment.md`, then verify the deployed origin.

## Quick command set

```bash
npm run validate:content
npm run check
npm audit --omit=dev
git diff --check
git status --short
```
