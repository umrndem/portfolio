# SEO and metadata maintenance

Metadata is generated from the same public content used by the interface. There
is no separate SEO CMS or duplicated route catalogue.

## Global versus route-specific ownership

| Concern | Source |
|---|---|
| Site title and title template | `src/content/site-settings.ts` |
| Global/site description | `src/content/site-settings.ts` |
| Author/creator name | `src/content/profile.ts` |
| Metadata composition and homepage canonical | `src/app/layout.tsx` |
| Project title/description/canonical/Open Graph | `src/app/work/[slug]/page.tsx`, using `projects.ts` |
| Acknowledgement metadata/canonical | `src/app/acknowledgements/page.tsx` |
| Default social image | `src/app/opengraph-image.tsx` |
| Social-image alt text | `src/content/site-settings.ts` |
| Favicon | `src/app/icon.svg` |
| Person structured data | `src/lib/structured-data.ts`, rendered on `page.tsx` |
| Sitemap | `src/app/sitemap.ts` |
| Robots | `src/app/robots.ts` |
| Public origin | `NEXT_PUBLIC_SITE_URL` |

## Production origin

The origin defaults to the canonical custom domain,
`https://umrndem.com`, hardcoded in `getSiteUrl()`
(`src/content/site-settings.ts`). To override it (local audits, temporary
workers.dev checks), set:

```env
NEXT_PUBLIC_SITE_URL=https://example.com
```

Use the final origin only: scheme + host, no path. Validation rejects an origin
with a path.

This variable is public by design. Never place an API key, secret, credential, or
private endpoint in a `NEXT_PUBLIC_*` variable.

The origin drives absolute canonical, sitemap, robots, Open Graph, and structured
data URLs through Next.js `metadataBase`/URL resolution.

## Update the global page title

Edit:

```ts
siteSettings.title
siteSettings.titleTemplate
```

in `src/content/site-settings.ts`.

The title template formats project pages as:

```text
Project title · Muhammad Umar Nadeem
```

`/acknowledgements` opts out of that template with an absolute document title of
`Acknowledgements` only (no name suffix).

Keep titles factual, concise, and human-readable. Do not pack keyword lists into
the title.

## Update descriptions

- `siteSettings.description` supplies the ordinary global description and Person
  structured-data description.
- `siteSettings.socialDescription` supplies the default Open Graph and Twitter
  description.
- Each project uses `project.summary` for route description and social metadata.

Changing a project summary changes visible card copy and metadata together. That
is intentional: do not create a more impressive hidden SEO claim.

## Canonical URLs

- Homepage: `/`
- Acknowledgements: `/acknowledgements`
- Project page: `/work/<project.slug>`

`metadataBase` resolves these against `NEXT_PUBLIC_SITE_URL`.

If a project slug changes, the canonical changes. Search for external/in-repo
links and decide whether a redirect is required. The repository currently has no
redirect map.

## Open Graph and Twitter

Global metadata in `layout.tsx` declares:

- website title/description/URL;
- Open Graph website type;
- Twitter `summary_large_image`.

Project routes override title, description, URL, and use Open Graph `article`
type. They inherit the generated default social image.

The generated image is:

```text
/opengraph-image
```

Edit `src/app/opengraph-image.tsx` for composition. It must use only public-safe
profile/site content. Because `ImageResponse` does not consume page CSS
variables, manually synchronize palette values with `globals.css`.

Route-specific social images are not currently implemented. Add them only when
approved project media and a maintainable route-level design exist.

## Favicons

The active favicon is the App Router metadata asset:

```text
src/app/icon.svg
```

Edit that file to change the mark. Keep it simple and legible at small sizes.
`public/icons/` is for optional component assets, not the active favicon.

## Structured data

The homepage renders public Person JSON-LD built by
`src/lib/structured-data.ts`. It currently includes:

- name;
- canonical site URL;
- global description;
- public location;
- social-profile `sameAs` URLs.

`StructuredData` escapes `<` before injecting serialized JSON-LD. Keep structured
data derived from typed content; do not add skills, job titles, awards, employer
relationships, or education properties unless wording and schema semantics are
verified.

Project structured data is not currently emitted. Route metadata exists, but do
not claim `SoftwareApplication`, ratings, offers, or organization authorship
without sufficient public evidence.

## Sitemap

`src/app/sitemap.ts` produces:

```text
/sitemap.xml
```

It includes the homepage, the public acknowledgement route, and every project in
the publication-safe `projects` export. Featured projects receive a slightly
higher priority hint. Hidden and confidential projects are excluded
automatically.

Do not maintain a second manual project URL list.

If a new non-project route is added, update `sitemap.ts` and this guide.

## Robots

`src/app/robots.ts` produces:

```text
/robots.txt
```

It currently allows the public site and points to `/sitemap.xml`.

Robots directives are crawler hints, not privacy controls. Confidential content
must be absent from generated routes and public assets.

## Project metadata

`generateMetadata()` in `src/app/work/[slug]/page.tsx`:

1. resolves the slug against published projects;
2. returns a neutral not-found title if absent;
3. uses `project.title` and `project.summary`;
4. declares the route canonical;
5. supplies route-specific Open Graph title, description, type, and URL.

Do not query `allProjects` here; that could expose hidden/confidential entries.

## Verify metadata locally

Build and serve:

```bash
npm run build
npm run start
```

Check:

```text
http://localhost:3000/
http://localhost:3000/acknowledgements
http://localhost:3000/work/snakinesis
http://localhost:3000/opengraph-image
http://localhost:3000/icon.svg
http://localhost:3000/sitemap.xml
http://localhost:3000/robots.txt
```

Inspect page source or browser developer tools for:

- one correct title and description;
- canonical URL;
- Open Graph and Twitter fields;
- valid JSON-LD;
- no localhost URLs when built with the production origin;
- no hidden/confidential slugs in sitemap or metadata;
- social-image alt and image response;
- correct browser icon.

External social-card validators require a deployed public preview. Do not submit a
private preview containing unapproved professional material.

## Metadata update checklist

- [ ] Copy matches visible evidence-backed content.
- [ ] `NEXT_PUBLIC_SITE_URL` is the intended origin.
- [ ] Canonical paths match routes.
- [ ] Project slug changes were assessed for redirects.
- [ ] Social image contains no confidential material.
- [ ] Acknowledgement metadata contains no names or context beyond the approved
      visible page.
- [ ] Structured data contains no unsupported claims.
- [ ] Sitemap includes all and only public routes.
- [ ] Robots points to the correct sitemap.
- [ ] Favicon/social preview render.
- [ ] `npm run check` passes.
