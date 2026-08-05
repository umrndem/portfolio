# Troubleshooting

This guide covers the current Next.js, typed-content, plain-CSS stack. It does not
include CMS, database, authentication, or analytics failures because those
systems do not exist here.

## Development server does not start

### Dependencies are missing

```bash
npm install
npm run dev
```

Use Node 22 and the committed npm lockfile.

### Port 3000 is already in use

Stop the existing process or run:

```bash
npm run dev -- --port 3001
```

Update the local URL you open; do not change production metadata for a temporary
port.

### Cached build state is stale

Stop the server, remove only the generated Next directory, and restart:

```bash
rm -r .next
npm run dev
```

Do not delete the repository, `public/`, or source directories.

## Content validation fails

Run the focused command:

```bash
npm run validate:content
```

Read every bullet in the thrown error. Common causes:

- duplicate/malformed project slug;
- confidential project not hidden;
- invalid range order;
- empty required project field/section;
- duplicate technology or section title;
- non-HTTPS external URL;
- invalid email;
- unsupported asset path/extension;
- empty alt text or invalid dimensions;
- referenced public file missing;
- unknown navigation anchor;
- deployment origin includes a path.

Fix the content rather than weakening validation.

## Missing profile or project image

Check:

1. The file is under the expected `public/images/...` directory.
2. The content path begins with `/images/...`, not `public/images/...`.
3. Filename case matches exactly.
4. Extension is AVIF, WebP, JPEG/JPG, or PNG.
5. Width/height are real positive pixel dimensions.
6. The file is tracked by Git.

Then run:

```bash
npm run validate:content
```

If validation passes but the browser is stale, hard reload or restart the dev
server.

## Broken project route or unexpected 404

Find the entry in `src/content/projects.ts` and check:

- URL slug matches exactly;
- `display` is not `"hidden"`;
- `visibility` is not `"confidential"`;
- `npm run build` lists the route.

Hidden/confidential routes intentionally return the neutral not-found page.

If the slug changed, the old URL has no redirect. Decide whether to restore the
slug or add an explicit redirect plan.

## Project appears publicly when it should not

Immediately set:

```ts
display: "hidden",
visibility: "confidential",
```

Remove any public assets and links, validate, rebuild, and redeploy. If already
deployed, use provider controls to remove access/invalidate caches. Review
`docs/privacy-and-publication.md` and treat the event as a privacy incident.

## Theme flashes on load

Check:

- `themeBootstrapScript` is still injected in the `<head>` of `layout.tsx`;
- the script is inline and not deferred;
- `suppressHydrationWarning` remains on `<html>`;
- storage access errors are caught;
- no server component reads `window` or `localStorage`;
- CSS light fallback exists on `:root`.

Clear the saved key and test system dark:

```js
localStorage.removeItem("umrfolio-theme");
```

See `docs/theme-maintenance.md`.

## Theme toggle state is wrong

Inspect:

- `<html data-theme="...">`;
- `document.documentElement.style.colorScheme`;
- `localStorage.getItem("umrfolio-theme")`;
- toggle `aria-pressed`.

Do not render different server markup based on browser-only theme state.

## Hydration warning

Typical causes:

- reading theme/local storage during render;
- locale/time/random values in server/client markup;
- injecting non-deterministic content;
- nesting invalid HTML.

The current theme keeps markup stable and changes appearance through the root
attribute/CSS. Preserve that boundary.

## Metadata is incorrect

### Global title/description

Check `src/content/site-settings.ts` and `src/app/layout.tsx`.

### Project title/description

Check the project’s `title` and `summary`, then `generateMetadata()` in the
project route.

### Canonical/social/sitemap URLs show the wrong origin

The origin comes from `getSiteUrl()` at build time — the baked-in
`https://umrndem.com` default or a `NEXT_PUBLIC_SITE_URL` override present
during the build. Environment changes made after build do not rewrite
generated metadata; fix the source and rebuild.

### Social image is stale

Rebuild and open `/opengraph-image` directly. A remote platform may cache older
cards; use its official refresh/debug tool only after the public deployment is
approved.

## Sitemap or robots is broken

Open:

```text
/sitemap.xml
/robots.txt
```

Check `src/app/sitemap.ts`, `src/app/robots.ts`, and `getSiteUrl()`.
Sitemap projects must come from the filtered `projects` export, not
`allProjects`.

## Lint errors

```bash
npm run lint
```

Fix the reported source. Common maintenance errors are unused imports after a
content move or unsafe image/link patterns. Do not disable core web-vitals or
TypeScript rules globally for one warning.

## Type errors

```bash
npm run typecheck
```

If a content object no longer satisfies `Project`/`Profile`, compare it with
`src/content/types.ts`. When a type changes deliberately, update validation,
rendering, examples, and documentation together.

## Build fails

Run individual stages to isolate:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Other causes:

- unavailable network during an uncached `next/font/google` build;
- unsupported Node version;
- malformed metadata URL;
- missing public asset;
- syntax introduced in a route;
- stale `.next` output.

Do not treat a successful dev server as proof that production static generation
passes.

## Responsive layout is incorrect

Check at 390px, 768px, and 1440px.

Look for:

- long unbroken URL/technology text;
- wrong intrinsic image ratio;
- new grid spans that ignore the 960px/700px breakpoints;
- header link overflow;
- fixed widths wider than the viewport;
- absolute elements escaping full-bleed sections.

Use existing grid/page variables. Avoid adding a one-device patch before finding
the structural cause.

## Horizontal overflow

In browser developer tools:

```js
document.documentElement.scrollWidth - document.documentElement.clientWidth
```

The result should be `0`. Inspect newly added fixed widths, transforms, long
tokens, and full-bleed box shadows.

## Stale or unused assets

Search the filename:

```bash
rg -n "asset-name\\.webp" src docs public
```

- Referenced but missing assets fail validation.
- Unreferenced files are not automatically deleted.
- Remove only confirmed unused public files.
- CDN/browser caches may persist after deployment.

## Deployment fails

The repository has no configured provider. Read `docs/deployment.md`.

Verify:

- Node 22;
- `npm install`;
- `npm run check`;
- the intended origin resolved by `getSiteUrl()` during build;
- provider supports Next.js App Router/image optimization;
- public assets are committed;
- no secret was placed in a public variable.

Record provider-specific errors only after a real provider is selected.

## A documented path or command is stale

Treat that as a maintenance bug:

1. Verify the live code/package script.
2. Update or remove the contradictory instruction.
3. Search other maintenance docs for the old path:

   ```bash
   rg -n "old/path|old-command" README.md AGENTS.md docs
   ```

4. Commit the documentation correction with the structural change.
