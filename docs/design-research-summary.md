# Design research summary

## Scope

- 125 actual sites opened in a rendered Chromium browser.
- 11 categories: engineer portfolios, creative technology, data visualization, editorial, museums, architecture, studios, products, documentation, art/photography, and academic/idea-led sites.
- 30 references retained for systematic evaluation.
- Focused screenshots reviewed for quiet engineering, visual essays, data publishing, dense editorial, systems-led studios, product sites, and authored academic/personal work.

The complete breadth index is in `research/design/reference-index.md`; retained evaluations are in `research/design/reference-data.json`.

## Strongest findings

- A specific thesis plus visible proof is more credible than a large personal slogan.
- Selected projects need problem, status, role, and evidence before a technology list.
- One authored visual idea is more memorable than many fashionable effects.
- Technical depth belongs one layer down; the homepage must still work in 30 seconds.
- Motion is strongest when it explains causality or scope.
- Server-rendered content and an immediate first frame are design requirements, not only performance work.
- Honest limits and confidentiality boundaries can increase trust.

## Research limitations

- The study is a design-direction exercise, not a formal accessibility conformance audit of 125 sites.
- Some sites produced bot checks, unsupported-browser screens, DNS failures, 404s, or under-construction states; these were retained as failure evidence.
- Copyrighted reference screenshots were inspected from `/tmp` and are not committed.
- Responsive behavior was sampled rather than exhaustively tested for every external reference.

## Tooling

Installed after source and reputation review:

- `frontend-design` from Anthropic — distinctive, subject-led visual direction.
- `vercel-react-best-practices` from Vercel — React/Next.js performance guidance.
- `web-design-guidelines` from Vercel — current local UI review rules.

Existing `agent-browser` handled live rendering, accessibility-tree inspection, viewport control, screenshots, and later local QA. A redundant Playwright skill and broader third-party “taste” bundles were not installed.
