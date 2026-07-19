# Implementation notes

## Stack decision

- Next.js App Router
- React
- TypeScript
- Plain CSS with design tokens

The dependency set is intentionally small. The initial site does not need a state library, animation package, CMS, analytics, 3D library, or component framework.

`NEXT_PUBLIC_SITE_URL` should be set to the final production origin before deployment. The local fallback is `http://localhost:3000` so metadata generation remains deterministic without inventing a domain.

## Content architecture

All portfolio claims and project metadata live in `src/content/portfolio.ts`. Components render the model rather than embedding project copy across page files.

## Asset status

- No approved profile photograph is present in this repository.
- The initial build uses a clearly labelled portrait placeholder and must not be treated as launch-ready.
- No private-project screenshots are included.
- Social preview uses a generated route built from public-safe text rather than an external image.
- Light and dark themes share the clean leather-maroon identity through semantic design tokens and mode-specific accessible text values.

## Privacy and authorship

The implementation includes concise AI-assisted practice language and explicit private-work boundaries. It does not expose raw repository evidence or confidential implementation.

## Verification — local production build

- `npm run lint` — pass.
- `npm run typecheck` — pass.
- `npm run build` — pass; homepage, generated icon/social image, and five static case-study routes produced.
- `npm audit --omit=dev` — zero known vulnerabilities after narrow patched overrides for transitive PostCSS and Sharp releases.
- Browser route check — homepage, five case studies, 404, icon, and Open Graph image resolve.
- Viewports — 1440 × 1000, 768 × 1024, and 390 × 844 checked; no horizontal overflow.
- Keyboard — skip link is first in tab order and moves focus to `main`.
- Reduced motion — media query verified; smooth scrolling and animation durations collapse.
- Theme behavior — system light/dark preference, persistent manual override, and matching native `color-scheme` verified.
- Contrast — tested intended text pairs range from 4.72:1 to 16.80:1; selected maroon surfaces tested from 5.78:1 to 13.33:1. The complete core-token table is in `docs/brand-identity.md`.
- Accessibility tree — headings, landmarks, navigation labels, theme state, and interactive controls exposed as expected.
- Touch targets — the icon-only mobile theme control retains a 44 × 44px target.
- Lighthouse on the local production build — Performance 0.97, Accessibility 1.00, Best Practices 1.00.
- Browser vitals diagnostic — CLS 0 in desktop and mobile samples; the text `h1` is the LCP element.
- The current build has no forms, chart library, overlays, code blocks, or approved photography; those theme states are not applicable yet. The range diagram and generated portrait placeholder were checked in both modes.

Local scores are diagnostic evidence, not a promise about a future deployed origin, network, or device.
