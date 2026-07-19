# Design system — Working Proof

## Typography

- **Primary:** Manrope, self-hosted by `next/font` at build time; open font license.
- **Utility:** IBM Plex Mono, self-hosted by `next/font`; SIL Open Font License.
- **Scale:** fluid `clamp()` values from compact labels through a restrained 64–88px desktop display.
- **Measure:** 62–72 characters for long-form text.

## Color

The identity uses two complete semantic palettes:

- **Paper:** clean off-white, white, ink, leather maroon, and pale maroon surfaces.
- **Ink:** neutral near-black, warm white, accessible maroon text, rich maroon fills, and blackened maroon surfaces.

Maroon is a major compositional layer: the hero book-spine panel, range and about climates, lead project, primary actions, footer, labels, dividers, and active states make the identity immediately visible. Neutral surfaces continue to carry long-form reading, while near-black, white, and grey provide structure. The full token table, ratios, usage rules, and prohibitions live in `docs/brand-identity.md`.

Color never encodes a claim without text or structure.

## Grid and spacing

- Desktop: 12 columns, `minmax(0, 1fr)`, max width 1440px.
- Tablet: 8 columns.
- Mobile: 4 columns with a 20px edge.
- Spacing uses an 8px base with fluid section gaps.
- Borders are 1px and structural; radii remain small (0–18px) and content-dependent.

## Interaction

- Default duration: 180ms.
- Deliberate reveal: 560ms.
- Easing: `cubic-bezier(.22, 1, .36, 1)`.
- Links retain underlines or an equally visible non-color affordance.
- Theme transition: 240ms, limited to color and surface properties.
- Focus ring: 3px maroon-derived focus color with 3px offset.
- Reduced motion removes transforms and sequencing, not content.

## Components

- `SiteHeader`
- `SectionHeading`
- `RangeLine`
- `ProjectCard`
- `EvidenceTag`
- `PortraitPlaceholder`
- `ExperienceEntry`
- `CaseStudyLayout`
- `SiteFooter`

Components encode content roles, not arbitrary visual variants.
