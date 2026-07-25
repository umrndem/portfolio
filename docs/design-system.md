# Design system — Working Proof

The current visual identity is a clean leather-maroon editorial system. It is
visibly maroon-led while preserving neutral reading space, high contrast, and a
clear distinction between evidence, structure, and interaction.

All implementation tokens and component styles live in `src/app/globals.css`.
`docs/brand-identity.md` records the full palette values, ratios, rationale, and
color prohibitions.

## Design-token ownership

The light palette is declared on `:root`. Dark overrides are declared on
`:root[data-theme="dark"]`.

Components consume semantic custom properties:

```css
.example {
  border-color: var(--color-border);
  background: var(--color-surface-maroon);
  color: var(--color-text-primary);
}
```

Do not place arbitrary raw hex values in React components. The generated Open
Graph image and App Router favicon are the current exceptions because those
render outside normal document CSS; keep their palette values synchronized with
the canonical tokens when branding changes.

## Color roles

| Role | Representative tokens | Use |
|---|---|---|
| Page grounds | `--color-bg-primary`, `--color-bg-secondary` | Reading canvas and lifted neutral regions |
| Surfaces | `--color-surface`, `--color-surface-hover`, `--color-surface-maroon` | Cards, metadata, galleries, selected section climates |
| Text | `--color-text-primary`, `--color-text-secondary`, `--color-text-muted` | Hierarchical readable copy |
| Maroon identity | `--color-brand-primary`, `--color-brand-emphasis`, `--color-brand-deep`, `--color-brand-bright` | Major composition, labels, rules, progression, emphasis |
| Filled interaction | `--color-brand-fill`, `--color-brand-fill-hover`, `--color-on-brand` | Buttons, lead project, active chips |
| Structure | `--color-border`, `--color-border-emphasis`, `--color-structure` | Rules and near-black framework |
| Accessibility | `--color-focus`, `--color-selection`, status tokens | Focus, selection, non-brand availability state |
| Footer | `--color-footer-*` | Text and controls on deep maroon |

The main light values are clean off-white `#F8F5F6`, white, ink, primary maroon
`#7B1E3A`, rich maroon `#8C2344`, deep maroon `#5B1428`, bright maroon
`#A12D50`, and soft maroon `#F2E3E8`.

Dark mode uses neutral `#111113` / `#19191D` grounds, blackened maroon
`#241319`, rich fill `#8C2344`, and lighter maroon text values for accessible
contrast.

Color never communicates project publication, focus, or hierarchy by itself.
Labels, geometry, links, and heading structure carry the same meaning.

## Maroon composition

Strong maroon is concentrated in:

- the desktop hero book-spine panel;
- the lead project;
- primary actions;
- the footer;
- selected labels and progression marks.

Soft/blackened maroon supports:

- the range section;
- the about section;
- featured/hovered project cards;
- case-study metadata and evidence boundaries.

Neutral space carries longer reading and prevents the brand color from becoming
harsh. Do not make every heading, border, or card red.

## Typography

- **Primary:** Manrope through `next/font/google`, emitted as a self-hosted font
  asset by the production build.
- **Utility:** IBM Plex Mono through `next/font/google`, weights 400 and 500.
- **CSS variables:** `--font-sans` and `--font-mono` are attached to `<html>` in
  `src/app/layout.tsx`.
- **Fallbacks:** semantic fallback stacks are tokens in `globals.css`.
- **Display scale:** fluid `clamp()` values, reaching roughly 64–160px depending
  on the hero/case-study context.
- **Body measure:** long text is constrained to approximately 62–72 characters.
- **Wrapping:** headings use balanced wrapping; paragraphs and lists use pretty
  wrapping and safe overflow behavior.

Do not introduce a third typeface without a clear new content role. Monospace is
for metadata, labels, and technical structure—not every paragraph.

## Spacing and page geometry

Core layout variables:

```css
--page-edge: clamp(1.25rem, 4vw, 4.5rem);
--page-width: 90rem;
--section-space: clamp(6rem, 12vw, 11rem);
```

- Desktop sections use a 12-column grid.
- The content maximum is 1440px (`90rem`).
- The homepage hero occupies at least the viewport below the sticky header and
  ends before the separately bordered “Currently” strip.
- Section spacing is intentionally generous and fluid.
- Common gaps are based on roughly 8px increments but may use fluid values.
- At 960px, major grids simplify while retaining multi-column hierarchy.
- At 700px, pages switch to four columns or a single content column with a
  20px edge.

Use existing variables and nearby spacing patterns before adding a one-off
number.

## Surfaces

- **Neutral page:** `--color-bg-primary`.
- **Lifted neutral:** `--color-bg-secondary` or `--color-surface`.
- **Selected maroon climate:** `--color-surface-maroon`.
- **Strong identity fill:** `--color-brand-fill`.
- **Deep closing surface:** `--color-brand-deep`.

### Selected Work project-card scale

Homepage project cards use a **positional** true-red scale, not project-name
colors. Levels come from `getProjectSurfaceAssignment(index, count)` in
`src/content/project-surfaces.ts` and are applied as `data-surface` /
`data-ink` on each card.

Light-theme canonical stops (1 → strongest red, 6 → near-white):

| Level | Token | Value |
|---:|---|---|
| 1 | `--project-surface-1` | `#c90f16` |
| 2 | `--project-surface-2` | `#d94349` |
| 3 | `--project-surface-3` | `#e66e73` |
| 4 | `--project-surface-4` | `#ee989c` |
| 5 | `--project-surface-5` | `#f6c8ca` |
| 6 | `--project-surface-6` | `#fff8f8` |

Rules:

- Card 1 is always the strongest red; only the final visible card uses stop 6.
- With six published projects the mapping is 1…6 in order. With fewer or more
  cards, indices spread across the same stops so intermediates stay distinct and
  only the last card is near-white (light) or deepest near-black (dark).
- Do not hardcode `nth-child` colors or project-name → color maps.
- Keep the sequence in the true-red family. Do not drift into salmon, peach,
  beige, brown, mauve, or purple.
- White / on-brand ink (`data-ink="on-brand"`) is reserved for stop 1 in light
  theme; mid and pale reds use dark near-black text for contrast.

Cards are editorial planes, not floating dashboard tiles. Shadows are avoided
except the full-bleed `100vmax` surface technique and small ring constructions.
Radii remain square for buttons/cards and circular only for points or status
indicators.

## Borders and dividers

- Ordinary dividers: 1px `--color-border`.
- Meaningful section/active boundaries: 1px `--color-brand-primary` or
  `--color-border-emphasis`.
- Case metadata uses a 3px maroon top rule.
- Evidence boundaries use a 3px inline-start maroon rule.

Do not use borders as decorative noise around every container.

## Buttons and links

### `.button-link`

Primary filled action using action tokens. It has a visible border, uppercase
mono label, minimum 48px height, and a restrained 1px hover lift.

### `.button-link--light`

High-contrast footer action for deep maroon. Its hover stays within the maroon
family.

### `.text-link`

Underlined or clearly text-linked secondary action. Hover changes semantic link
color without removing the non-color affordance.

Ordinary navigation links receive a maroon underline/active response. Do not
remove link distinction solely for visual cleanliness.

## Focus and accessibility states

- Global `:focus-visible`: 3px `--color-focus`, 3px offset.
- The main landmark uses an inset focus boundary after skip navigation.
- The theme control retains a minimum 44 × 44px target.
- Lead-card focus adapts to white against the maroon fill.
- Selection colors are mode-specific semantic tokens.
- Forced-colors adjustments preserve the few identity/status shapes that require
  explicit treatment.

Never use `outline: none` without an equally visible replacement. Test keyboard
focus in both themes.

## Motion

```css
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
```

- Common hover transitions: 180ms.
- Theme/surface transitions: 240ms.
- Theme-disc rotation: 320ms.
- Range reveal: 560ms, gated by IntersectionObserver so lines animate when
  scrolled into view rather than on initial page load.
- Section headings and approach steps use a one-shot `Reveal` entrance
  (opacity + slight rise). Approach steps may stagger lightly; project cards
  do not.
- Project-card hover may nudge the case-study arrow and scale cover media
  slightly (about 2%). No card entrance choreography.
- The multiline hero headline types on once, character by character, without
  changing its final layout. Supporting labels remain static.

Motion is limited to opacity/color/transform-like feedback and the range
progression. There is no animation library. The
`prefers-reduced-motion: reduce` block disables smooth scrolling, collapses
animation/transition durations, removes the button lift, and forces reveal /
  range / card-hover transforms into their final resting state.

Do not add bounce, red flashes, glowing sweeps, parallax, sticky scrub
scenes, 3D marquees, or decorative motion that competes with reading.

## Responsive behavior

### Above 960px

- 12-column homepage/case-study composition.
- Desktop hero includes the strong maroon right panel.
- Header uses mark, centered navigation, and right actions.
- Case-study title and metadata sit side by side.

### 701–960px

- Major grids reduce span complexity.
- Availability label hides before navigation becomes crowded.
- Project bodies stack internally.

### 700px and below

- Four-column/mobile composition and 20px edges.
- Theme control becomes icon-only but retains its touch target.
- Hero portrait becomes full-width with a maroon frame.
- Range labels and section layouts stack.
- Project facts/actions, footer, case metadata, gallery, and narrative become
  single-column.

Test at 390 × 844, 768 × 1024, and 1440 × 1000 after visible changes.

## Component variants

| Component | Variants |
|---|---|
| `ProjectCard` | featured/supporting from content; first published card is the strong lead treatment; optional cover |
| `RangeLine` | full and compact; optional active start/end |
| `ProfilePortrait` | approved image or designed placeholder |
| `ContentImage` | project cover/gallery class and optional caption |
| `button-link` | default and light-on-footer |
| `ThemeToggle` | root light/dark state |

Do not create generic variant systems for one use. Add a typed variant only when
multiple real content instances need it.

## Change branding safely

1. Change semantic values in both token blocks in `globals.css`.
2. Preserve token names where the role is unchanged.
3. Update matching raw palette values in:
   - `src/app/icon.svg`;
   - `src/app/opengraph-image.tsx`;
   - light/dark `themeColor` metadata in `src/app/layout.tsx`.
4. Update `docs/brand-identity.md`.
5. Check contrast for text, focus, actions, lead card, range section, and footer.
6. Inspect the full homepage and one case study in both themes and all three
   target widths.
7. Run `npm run check`.

## Prohibited use

- muddy brown-red, rust, brick, dried-blood, or brown burgundy;
- arbitrary raw hex values inside components;
- neon/scarlet red, red glow, light sweeps, or harsh saturated fields;
- metallic, carbon-fibre, automotive, racing, or gaming treatment;
- red filters over every image;
- all-red headings/cards/borders without hierarchy;
- color-only state or evidence;
- generic dashboard cards, pill overload, or ornamental gradients unrelated to
  the current identity.
