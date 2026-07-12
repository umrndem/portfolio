# Design system — Working Proof

## Typography

- **Primary:** Manrope, self-hosted by `next/font` at build time; open font license.
- **Utility:** IBM Plex Mono, self-hosted by `next/font`; SIL Open Font License.
- **Scale:** fluid `clamp()` values from compact labels through a restrained 64–88px desktop display.
- **Measure:** 62–72 characters for long-form text.

## Color

| Token | Value | Role |
|---|---|---|
| `paper` | `#F2F5F1` | mineral page ground |
| `ink` | `#11261F` | primary text |
| `muted` | `#5E6F68` | secondary text |
| `line` | `#C7D1CB` | structure |
| `signal` | `#2448FF` | links, active evidence |
| `heat` | `#F25B35` | selected warm annotation |
| `wash` | `#DDE5FF` | quiet technical surface |
| `night` | `#10241E` | deep project/footer surface |

Color never encodes a claim without text.

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
- Focus ring: 3px signal blue with 3px offset.
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
