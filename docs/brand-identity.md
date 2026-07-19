# Brand identity — Clean leather maroon

## Rationale

Clean leather maroon is the portfolio’s major signature color. It connects the work’s technical seriousness with a confident editorial character and carries the material association of polished book leather without borrowing the speed, glow, saturation, or metallic cues of automotive and gaming identities.

Maroon is visible at first glance rather than reserved for tiny accents. The hero’s book-spine panel, selected section climates, lead project, primary actions, footer, labels, dividers, and active states establish a substantial maroon rhythm. Clean neutral surfaces continue to protect reading comfort and hierarchy. Near-black and grey remain structural rather than theatrical.

Light and dark modes use the same hierarchy rather than simple inversion:

- clean neutral ground;
- neutral primary typography;
- strong maroon composition and active evidence;
- pale or blackened maroon selected surfaces;
- bright maroon endpoints;
- restrained structural rules.

The visual balance targets approximately 35–45% maroon/red presence, 30–35% neutral surfaces, and 10–20% black, white, and grey structure. It is achieved compositionally rather than by painting every component red: strong maroon is concentrated in the hero, lead project, actions, and footer; soft maroon holds the range, about, selected cards, and case metadata; neutral space carries longer reading.

The existing technical range line remains the signature device. Its maroon span shows genuine project coverage, while its brighter maroon endpoint adds emphasis without introducing another accent family.

## Semantic palette

### Light — paper

| Token | Value | Intended use |
|---|---:|---|
| `--color-bg-primary` | `#F8F5F6` | clean page ground |
| `--color-bg-secondary` | `#FFFFFF` | lifted neutral ground |
| `--color-surface` | `#F1ECEE` | quiet neutral material surfaces |
| `--color-surface-hover` | `#F7EFF2` | quiet interactive response |
| `--color-surface-maroon` | `#F2E3E8` | selected section and card climate |
| `--color-text-primary` | `#1C191B` | headlines and body text |
| `--color-text-secondary` | `#5F5559` | supporting prose |
| `--color-text-muted` | `#766B70` | metadata and annotations |
| `--color-brand-primary` | `#7B1E3A` | maroon identity and evidence marks |
| `--color-brand-emphasis` | `#8C2344` | rich editorial emphasis |
| `--color-brand-subtle` | `#F2E3E8` | pale maroon selected surface |
| `--color-brand-deep` | `#5B1428` | deep leather-maroon structure |
| `--color-brand-bright` | `#A12D50` | brighter maroon detail |
| `--color-brand-fill` | `#7B1E3A` | major panels and interactive fills |
| `--color-on-brand` | `#FFFFFF` | text on maroon fills |
| `--color-support-accent` | `#A12D50` | range endpoint in the same color family |
| `--color-structure` | `#1C191B` | structural near-black |
| `--color-border` | `#D8CCD0` | ordinary rules |
| `--color-border-emphasis` | `#B79CA5` | section boundaries |
| `--color-focus` | `#A12D50` | keyboard focus |

### Dark — ink

| Token | Value | Intended use |
|---|---:|---|
| `--color-bg-primary` | `#111113` | clean near-black canvas |
| `--color-bg-secondary` | `#19191D` | lifted neutral ground |
| `--color-surface` | `#1F1F23` | quiet neutral material surfaces |
| `--color-surface-hover` | `#292329` | quiet interactive response |
| `--color-surface-maroon` | `#241319` | blackened maroon section climate |
| `--color-text-primary` | `#F4F1F2` | primary text |
| `--color-text-secondary` | `#CEC5C8` | supporting prose |
| `--color-text-muted` | `#A89DA1` | readable metadata |
| `--color-brand-primary` | `#E18AA5` | accessible maroon text and marks |
| `--color-brand-emphasis` | `#F0A8BD` | high-contrast editorial emphasis |
| `--color-brand-subtle` | `#241319` | blackened maroon selected surface |
| `--color-brand-deep` | `#5B1428` | deep leather-maroon structure |
| `--color-brand-bright` | `#C94D72` | brighter maroon detail |
| `--color-brand-fill` | `#8C2344` | major panels and interactive fills |
| `--color-on-brand` | `#FFFFFF` | text on maroon fills |
| `--color-support-accent` | `#C94D72` | range endpoint in the same color family |
| `--color-structure` | `#0B0B0E` | structural near-black |
| `--color-border` | `#3A3034` | ordinary rules |
| `--color-border-emphasis` | `#65404B` | section boundaries |
| `--color-focus` | `#F0A8BD` | keyboard focus |

Additional semantic tokens cover action text, links, selection, header translucency, availability status, and footer-specific contrast. Components consume these roles rather than raw color names.

## Contrast and state rules

Verified contrast ratios against the primary ground:

| Pair | Light | Dark |
|---|---:|---:|
| Primary text | `16.10:1` | `16.80:1` |
| Secondary text | `6.61:1` | `11.18:1` |
| Muted text | `4.72:1` | `7.19:1` |
| Brand text | `9.28:1` | `7.53:1` |
| Text on brand fill | `10.05:1` | `8.61:1` |
| Focus against ground | `6.45:1` | `9.92:1` |

Maroon never communicates a project state by itself; labels, hierarchy, and geometry carry the same information. Neutral hover states handle ordinary interaction. Maroon carries authorship, selection, progression, focus, meaningful action, and evidence boundaries.

## Prohibited use

- bright scarlet, racing red, neon red, or red glow;
- pure-red surfaces against pure black;
- metallic, carbon-fibre, glossy, or speed-line effects;
- red treatment on every heading, link, card, icon, and border;
- heavy red image filters;
- multiple chart series distinguished only by nearby red values;
- red motion flashes or light sweeps;
- muddy burgundy, brown, rust, brick, or dried-blood tones;
- adding accent colors that compete with maroon.

## Theme behavior

- The first visit follows `prefers-color-scheme`.
- A manual light/dark choice persists in local storage.
- A pre-paint bootstrap applies the saved or system theme before the interface renders.
- Native `color-scheme`, focus, selection, reduced motion, and scrollbar behavior follow the active mode; metadata provides matching system light/dark theme colors.
- The switch exposes dark-mode state with `aria-pressed`.

## Remaining personal decisions

1. Whether a future real portrait should remain neutrally graded or receive a very light maroon-shadow treatment.
2. Whether the compact `U / N` register mark should remain the identity lockup once the final portrait and résumé are present.
3. Whether the strong first-project treatment should remain positional or be assigned explicitly to the most representative project.
