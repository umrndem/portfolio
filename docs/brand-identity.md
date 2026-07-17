# Brand identity — Oxblood register

## Rationale

Oxblood is a user-selected signature color that connects the portfolio’s technical seriousness with a more personal editorial character. It carries the material associations of book cloth, ink, leather, and wine-toned textiles without borrowing the speed, glow, or saturation cues of automotive and gaming identities.

The interface remains professional because neutrals do most of the work. Oxblood identifies authorship, active evidence, selected states, and a few narrative boundaries; it does not color every link, heading, card, or border. Black is structural rather than theatrical: it anchors typography, primary actions, and the footer, while the dark canvas uses a softened brown-black instead of pure black.

Light and dark modes use the same hierarchy rather than simple inversion:

- warm neutral ground;
- neutral primary typography;
- oxblood register marks and active evidence;
- wine-toned selected surfaces;
- one quiet brass endpoint;
- restrained structural rules.

The existing technical range line is the signature device. Its oxblood span shows genuine project coverage, while the brass terminal introduces one material accent without creating a broader multicolor palette.

## Semantic palette

### Light — paper

| Token | Value | Intended use |
|---|---:|---|
| `--color-bg-primary` | `#F4F0EC` | warm page ground |
| `--color-bg-secondary` | `#FBF8F4` | lifted neutral ground |
| `--color-surface` | `#EEE8E4` | lead project and quiet material surfaces |
| `--color-surface-hover` | `#E6DDDA` | selected surface response |
| `--color-text-primary` | `#1B1718` | headlines and body text |
| `--color-text-secondary` | `#5F5658` | supporting prose |
| `--color-text-muted` | `#756A6D` | metadata and annotations |
| `--color-brand-primary` | `#711F30` | oxblood identity and evidence marks |
| `--color-brand-emphasis` | `#5B1524` | deeper editorial emphasis |
| `--color-brand-subtle` | `#EAD9DC` | blush-wine selected surface |
| `--color-brand-deep` | `#4B1721` | deep oxblood material reference |
| `--color-brand-fill` | `#711F30` | meaningful interactive fills |
| `--color-on-brand` | `#FDF9F6` | text on oxblood fills |
| `--color-support-accent` | `#8A7351` | one restrained brass terminal |
| `--color-structure` | `#191516` | footer and structural black |
| `--color-border` | `#D4C8C5` | ordinary rules |
| `--color-border-emphasis` | `#A99A98` | section boundaries |
| `--color-focus` | `#8B2F42` | keyboard focus |

### Dark — ink

| Token | Value | Intended use |
|---|---:|---|
| `--color-bg-primary` | `#0F0D0E` | softened near-black canvas |
| `--color-bg-secondary` | `#171315` | lifted ink ground |
| `--color-surface` | `#1E181B` | lead project surfaces |
| `--color-surface-hover` | `#271E22` | quiet selected surface |
| `--color-text-primary` | `#F1ECE9` | warm primary text |
| `--color-text-secondary` | `#C5BBBA` | supporting prose |
| `--color-text-muted` | `#A79B9D` | readable metadata |
| `--color-brand-primary` | `#D693A0` | accessible oxblood-derived marks |
| `--color-brand-emphasis` | `#E0A5B0` | high-contrast editorial emphasis |
| `--color-brand-subtle` | `#32171D` | blackened wine surface |
| `--color-brand-deep` | `#6F1D2C` | core oxblood material tone |
| `--color-brand-fill` | `#812638` | meaningful interactive fills |
| `--color-on-brand` | `#F7F0ED` | text on oxblood fills |
| `--color-support-accent` | `#B39A70` | restrained brass terminal |
| `--color-structure` | `#090708` | deep footer structure |
| `--color-border` | `#3B3034` | ordinary rules |
| `--color-border-emphasis` | `#5A454B` | section boundaries |
| `--color-focus` | `#E0A5B0` | keyboard focus |

Additional semantic tokens cover action text, links, selection, header translucency, availability status, and footer-specific contrast. Components consume these roles rather than raw color names.

## Contrast and state rules

Verified contrast ratios against the primary ground:

| Pair | Light | Dark |
|---|---:|---:|
| Primary text | `15.67:1` | `16.52:1` |
| Secondary text | `6.26:1` | `10.32:1` |
| Muted text | `4.59:1` | `7.21:1` |
| Brand text | `9.54:1` | `7.88:1` |
| Text on brand fill | `10.33:1` | `8.22:1` |
| Focus against ground | `7.17:1` | `9.39:1` |

Oxblood never communicates a project state by itself; labels, hierarchy, and geometry carry the same information. Neutral hover states handle ordinary interaction. Oxblood is reserved for authorship, selection, progression, focus, and evidence boundaries.

## Prohibited use

- bright scarlet, racing red, neon red, or red glow;
- pure-red surfaces against pure black;
- metallic, carbon-fibre, glossy, or speed-line effects;
- red treatment on every heading, link, card, icon, and border;
- heavy red image filters;
- multiple chart series distinguished only by nearby red values;
- red motion flashes or light sweeps;
- adding more accent colors that compete with oxblood.

## Theme behavior

- The first visit follows `prefers-color-scheme`.
- A manual light/dark choice persists in local storage.
- A pre-paint bootstrap applies the saved or system theme before the interface renders.
- Native `color-scheme`, focus, selection, reduced motion, and scrollbar behavior follow the active mode; metadata provides matching system light/dark theme colors.
- The switch exposes dark-mode state with `aria-pressed`.

## Remaining personal decisions

1. Whether the core oxblood should stay slightly wine/plum or move browner toward aged leather.
2. Whether the single muted-brass endpoint feels personal enough to retain or should become neutral.
3. Whether a future real portrait should remain neutrally graded or receive a very light warm-shadow treatment.
4. Whether the compact `U / N` register mark should remain the identity lockup once the final portrait and résumé are present.
