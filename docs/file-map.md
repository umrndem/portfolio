# Maintainer file map

This map prioritizes files a maintainer is likely to change. Generated output,
dependencies, screenshots used only as historical evidence, and trivial
framework files are intentionally not documented line by line.

## Repository entry points

| Path | What it controls | Edit when | Do not place here |
|---|---|---|---|
| `README.md` | Repository entry, commands, editing map, privacy summary | Normal workflow or entry paths change | Detailed procedures that belong in `docs/` |
| `AGENTS.md` | Rules and routing for coding agents | Agent constraints or required verification changes | Portfolio copy |
| `portfolio-source-of-truth.md` | Canonical human-provided profile and factual boundaries | Umar explicitly corrects or approves facts | Inferred claims or implementation notes |
| `.env.example` | Safe example for public deployment origin | A documented non-secret environment variable is added | Secret values or real credentials |
| `package.json` | Runtime dependencies and developer commands | A command or justified dependency changes | Content or deployment secrets |
| `next.config.ts` | Small global Next.js configuration | Framework behavior genuinely requires it | Page-specific behavior |
| `tsconfig.json` | Strict TypeScript and `@/*` import alias | Compiler/module rules change | Content |
| `eslint.config.mjs` | Next.js and TypeScript lint rules | Project-wide lint policy changes | One-off exceptions without explanation |

## Editable content

| Path | Visible effect | Edit when | Relationships and cautions |
|---|---|---|---|
| `src/content/profile.ts` | Name, location, email, education, socials, portrait, résumé | Updating identity, contact, education, public profile media | Must agree with source of truth; referenced assets must exist in `public/` |
| `src/content/acknowledgements.ts` | Approved public names/labels, acknowledgements, privacy states, order, and closing copy | Adding, editing, anonymizing, reordering, or removing an acknowledgement | Follow `docs/acknowledgements.md`; never infer entries from private notes |
| `src/content/navigation.ts` | Header links and canonical homepage section IDs | Adding/removing a top-level homepage section | Page/footer IDs consume `sectionIds`; validation rejects unknown targets |
| `src/content/home.ts` | Hero, range explanation, work heading, experience, approach, about, footer copy | Normal homepage copy updates | Keep factual claims evidence-backed; acknowledgements have their own module |
| `src/content/projects.ts` | Project order, prominence, visibility, cards, case studies, core/deployment/integration tags, repository links, media | Any project update | `projects` is the publication-safe filtered export; never bypass it in routes. Homepage order also drives next-project links and positional card surfaces. |
| `src/content/project-surfaces.ts` | Positional lead-red opacity scale and ink | Changing the Selected Work surface scale or ink rules | Surfaces are positional; never key colors to project names |
| `src/content/technology-icons.ts` | Local SVG mapping for stack badges | Adding/changing a technology logo | Prefer exact display-name keys; validate files exist |
| `src/content/site-settings.ts` | Global title, descriptions, availability label, site origin | Branding/metadata copy or deployment origin behavior changes | `NEXT_PUBLIC_SITE_URL` remains the environment-specific origin |
| `src/content/types.ts` | Shared content model | A real rendering/content requirement needs a new field | Update validation and both content guides at the same time |
| `src/content/validation.ts` | Runtime rules protecting content and publication | The content model or privacy rules change | Keep errors specific; avoid weakening a rule just to pass invalid content |

## Routes and layout

| Path | Visible effect | Edit when | Relationships and cautions |
|---|---|---|---|
| `src/app/layout.tsx` | HTML shell, fonts, global metadata, pre-paint browser-state bootstraps, header, skip link, soft-nav scroll reset | Site-wide shell or metadata changes | Theme and logo bootstraps must remain before paint |
| `src/app/page.tsx` | Homepage section composition | Adding/removing/reordering major sections | Normal copy belongs in `src/content/home.ts` |
| `src/app/acknowledgements/page.tsx` | Dedicated editorial acknowledgement page and metadata | Changing acknowledgement presentation or route metadata | Render only approved fields from `src/content/acknowledgements.ts` |
| `src/app/work/[slug]/page.tsx` | Every project case-study route and route metadata | Case-study presentation or route-level metadata changes | Routes derive only from filtered `projects` |
| `src/app/opengraph-image.tsx` | Default generated social preview | Social-image composition changes | Values must stay public-safe; palette hex values mirror the CSS identity |
| `src/app/sitemap.ts` | `/sitemap.xml` | Public route rules change | Must continue excluding hidden/confidential work |
| `src/app/robots.ts` | `/robots.txt` | Crawler policy or sitemap location changes | Do not treat robots as access control |
| `src/app/icon.svg` | Browser favicon | Identity mark changes | This is an App Router metadata asset, not a `public/icons/` file |
| `src/app/error.tsx` | Runtime error fallback | Recovery interaction changes | Never reveal stack traces or private details |
| `src/app/loading.tsx` | Route loading fallback | Loading language changes | Keep content available under reduced motion |
| `src/app/not-found.tsx` | Unknown/hidden route response | 404 behavior changes | Do not reveal whether a confidential slug exists |
| `src/app/globals.css` | All tokens, layout, components, responsive rules, motion | Any visual-system change | Use semantic variables; test both themes and responsive widths |

## Components

| Path | Responsibility | Edit when | Keep out |
|---|---|---|---|
| `src/components/SiteHeader.tsx` | Shared mark, navigation, theme toggle, availability | Header structure changes | Duplicate navigation/contact data |
| `src/components/PrimaryNav.tsx` | Client header nav; re-scrolls same-page anchors on repeat clicks | Primary-navigation behavior changes | Navigation labels/targets (`src/content/navigation.ts`) |
| `src/components/ScrollToTop.tsx` | Resets viewport to top on soft route changes; honors hash targets | Global soft-navigation scroll behavior | Homepage same-page hash clicks via `PrimaryNav` |
| `src/components/ScrollTopLink.tsx` | Link that also scrolls to top when the destination is already the current path | Same-path utility/footer links | Ordinary cross-route Links |
| `src/components/LogoMark.tsx` | Interactive expandable logo and outside-tap collapse | Logo interaction changes | Brand colors and pre-paint persistence logic |
| `src/components/TypingHeadline.tsx` | Accessible character reveal for the homepage headline | Hero typing behavior changes | Homepage copy |
| `src/components/Reveal.tsx` | One-shot scroll entrance for headings and approach steps | Reveal timing or host element changes | Project-card choreography or ETS-style scrub scenes |
| `src/components/SiteFooter.tsx` | Shared contact form shell, socials, optional résumé, acknowledgement utility link | Footer structure changes | Duplicate profile/social/acknowledgement content |
| `src/components/ContactForm.tsx` | Client contact form posting to `/api/contact` | Form fields, status copy, or submission UX | Mail provider secrets or inbox logic |
| `src/components/ThemeToggle.tsx` | Client-side theme switching and state accessibility | Theme interaction changes | Palette values |
| `src/components/ProfilePortrait.tsx` | Approved portrait or fallback placeholder | Rendering/crop behavior changes | Profile asset path or public copy |
| `src/components/ProjectCard.tsx` | Homepage project summaries and cover media | Card presentation changes | Project facts |
| `src/components/ContentImage.tsx` | Optimized project image and caption rendering | Shared image rendering changes | Asset-specific facts |
| `src/components/RangeLine.tsx` | Technical-range diagram with scroll-gated fill and span caption | Range interaction/presentation changes | A second range-point source |
| `src/components/SectionHeading.tsx` | Homepage section heading layout | Shared heading markup changes | Section-specific copy |
| `src/components/StructuredData.tsx` | Safe JSON-LD serialization | Serialization requirements change | Person/project facts |

## Systems, helpers, and scripts

| Path | Responsibility | Edit when | Relationships |
|---|---|---|---|
| `src/systems/theme.ts` | Theme type, storage key, pre-paint bootstrap | Persistence or initial-theme logic changes | Used by layout and `ThemeToggle` |
| `src/systems/logo-mark.ts` | Logo storage key and pre-paint expanded-state bootstrap | Logo persistence changes | Used by layout and `LogoMark` |
| `src/lib/structured-data.ts` | Builds public Person JSON-LD | Structured-data fields change | Inputs come from profile/social/site settings |
| `scripts/validate-content.ts` | CLI entry for content and asset checks | Validation inputs or file checks change | Runs through `npm run validate:content` and `npm test` |

## Public assets

| Path | Purpose | Edit when | Restrictions |
|---|---|---|---|
| `public/images/profile/` | Approved portrait files | Replacing/adding profile imagery | No private or unapproved photos |
| `public/images/projects/` | Sanitized covers and case-study galleries | Adding approved project media | Never store internal/private screenshots |
| `public/images/social/` | Optional static social previews | Replacing generated previews with files | Must be public-safe |
| `public/documents/` | Approved downloadable PDFs | Adding/replacing résumé | Remove old versions; no private records |
| `public/icons/` | Optional standalone public icons and technology logos | A component references a public icon | Active favicon remains in `src/app/icon.svg`; technology marks live under `public/icons/technologies/` |
| `public/README.md` | Asset-boundary reminder | Directory conventions change | No actual content references |

## Maintenance documentation

| Path | Use |
|---|---|
| `docs/handoff.md` | Current takeover summary and first reading order |
| `docs/architecture.md` | System relationships and data flows |
| `docs/content-management.md` | Routine portfolio update procedures |
| `docs/project-content-guide.md` | Project schema, examples, routes, confidentiality |
| `docs/assets-guide.md` | Asset formats, dimensions, naming, optimization, alt text |
| `docs/design-system.md` | Current visual rules and component variants |
| `docs/theme-maintenance.md` | Light/dark theme implementation and contrast checks |
| `docs/seo-and-metadata.md` | Titles, canonical URLs, social images, JSON-LD, sitemap |
| `docs/development-workflow.md` | Branch-to-commit workflow and commands |
| `docs/deployment.md` | Current deployment readiness and provider-neutral release steps |
| `docs/privacy-and-publication.md` | Mandatory privacy and approval checklist |
| `docs/acknowledgements.md` | Approved acknowledgement display forms, privacy states, and safe editing |
| `docs/troubleshooting.md` | Stack-specific failure diagnosis |
| `docs/decisions.md` | Architectural decision record |
| `docs/checklists/` | Reusable content and new-project checklists |

## Evidence and historical research

`docs/github-inventory.md`, `docs/developer-profile.md`,
`docs/skills-evidence-map.md`, `docs/project-catalogue.md`,
`docs/project-selection.md`, `docs/project-evidence-notes.md`,
`docs/portfolio-content-map.md`, and `docs/uncertainties-and-questions.md`
support factual claims. Consult them when changing project positioning, but do
not treat them as current code instructions. Prefer
`portfolio-source-of-truth.md` for user-approved facts and the evidence labels
repository-verified / user-verified / inferred / unresolved.

`research/design/`, `docs/design-research-summary.md`,
`docs/design-directions.md`, and `docs/design-decision.md` record how the current
direction was selected. `docs/screenshots/` records past visual checkpoints.
Preserve them as history unless a deliberate archive cleanup is approved.
