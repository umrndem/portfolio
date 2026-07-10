# GitHub repository inventory

Snapshot date: 24 July 2026. Inventory covers seven repositories owned by `umrndem` returned by GitHub CLI/API. Visibility and activity are snapshots.

## Account-level observations

- Authenticated account: `umrndem`; display name: Muhammad Umar Nadeem.
- Seven owned repositories were returned: three private and four public.
- No forks or archived repositories appeared in the returned owned-repository list.
- All listed repositories show `umrndem` as the only GitHub contributor in the contributor endpoint. This does not prove that no outside code, templates, coursework collaboration, or generated scaffold was used.
- Primary language distribution spans TypeScript/JavaScript, Python, C++, HTML/CSS, SQL/PLpgSQL, and shell/PowerShell.

## Inventory

| Repository | Visibility | State / type | Languages | Classification | Evidence confidence |
|---|---|---|---|---|---|
| `sentinel` | Private | Active database-backed HSEQ application; local checkout is `/home/umrndem/nexus` | TypeScript, CSS, JavaScript | Flagship portfolio candidate, private/confidential | High for code structure; medium for deployed use |
| `ets-website` | Private | Active Next.js + Payload CMS corporate website | JavaScript, TypeScript, CSS, SCSS, PLpgSQL, shell | Flagship portfolio candidate, private/confidential | High for implementation; medium for public ownership context |
| `the-matootoo-project` | Private | Private relationship monument and Memory Archive maker tooling | JavaScript, Python, TypeScript, HTML/CSS, shell | Technically interesting but not presentation-ready; fully private | High for technical architecture; not a normal employment portfolio item |
| `snakinesis` | Public | Versioned Python webcam-controlled game | Python, PowerShell | Strong supporting project / interactive systems experiment | High |
| `financial-tick-data-pipeline` | Public | Small C++ OS/concurrency coursework-style pipeline | C++, shell, Makefile | Coursework worth mentioning / technically interesting | Moderate to high |
| `rideflow` | Public | Express/MySQL/vanilla-JS ride-hailing simulation | JavaScript, HTML, CSS, SQL | Strong supporting project or academic case study | Moderate; verify authorship split |
| `DataPulse` | Public | Streamlit business analytics dashboard with ingestion, KPIs, and forecasting | Python | Flagship or strong supporting data-science project | Moderate; README claims need runtime verification |

## Detailed entries

### `sentinel`

- URL: [github.com/umrndem/sentinel](https://github.com/umrndem/sentinel)
- Created 16 July 2026; latest observed push 23 July 2026; default branch `main`.
- Apparent purpose: an internal Eastern Testing Services HSEQ application for Risk Identification Reports and employee medical-record tracking.
- Architecture evidence: Next.js App Router, React/TypeScript, PostgreSQL through Drizzle, Zod validation, database-backed sessions, scrypt password hashing, Cloudflare Turnstile, Cloudflare R2 media proxy, role-scoped portal features, and transactional workflow actions.
- Strongest technical qualities: explicit domain boundaries, transactional report workflow, server-side authorization, security headers, scoped medical access, audit events, and detailed engineering documentation.
- Weakest areas / uncertainty: no committed automated tests according to the project’s own known-unknowns; production scale and real usage are not independently verified; the repository is private and contains potentially sensitive HSEQ/employee context.
- Recommendation: private-work case study only after owner/employer approval and substantial redaction. Do not publish internal names, operational workflows, employee details, credentials, screenshots, or database structure beyond an approved abstraction.

### `ets-website`

- URL: [github.com/umrndem/ets-website](https://github.com/umrndem/ets-website)
- Created 22 June 2026; latest observed push 15 July 2026; default branch `main`.
- Apparent purpose: a CMS-backed Eastern Testing Services public website with Payload admin and structured content.
- Architecture evidence: Next.js 16, React 19, Payload CMS 3, PostgreSQL adapter, S3-compatible storage, structured collections for services, people, media, documents, FAQs, news, policies, track record, careers, and contact submissions; Turnstile and deployment-oriented setup are present.
- Strongest technical qualities: breadth of CMS modelling, route/content separation, public and admin surfaces, responsive media/content components, and an unusually detailed maintainer manual.
- Weakest areas / uncertainty: private repository; business ownership, employment relationship, client permission, deployment responsibility, and production metrics require confirmation; local working tree contained an uncommitted context document not used as committed evidence.
- Recommendation: likely strongest professional case study if permission is confirmed. Present architectural responsibility and concrete shipped features without exposing internal content or claiming sole ownership of organizational decisions.

### `the-matootoo-project`

- URL: [github.com/umrndem/the-matootoo-project](https://github.com/umrndem/the-matootoo-project)
- Created 1 July 2026; latest observed push 19 July 2026; default branch `master`.
- Apparent purpose: a private relationship monument plus a local Memory Archive authoring studio for organizing WhatsApp-derived media.
- Architecture evidence: Next.js/React scenes and systems, Framer Motion/GSAP/Lenis-related motion infrastructure, a Python archive package, SQLite-oriented authoring workflows, date-grouped media browsing, local image feature measurement, identity enrollment/cleanup, app-owned trash, and tests for archive behavior.
- Strongest technical qualities: bespoke interaction systems, privacy-aware local media handling, substantial domain modelling, and explicit traceability of design/engineering decisions.
- Weakest areas / uncertainty: it is deeply personal and not a public employment project; source corpus, media, relationship analysis, and archive database are sensitive; many product/design claims are specific to the relationship and not transferable.
- Recommendation: exclude from the public portfolio by default. If ever discussed, use a high-level private-work note about local-first media tooling and human-in-the-loop classification, with no personal content.

### `snakinesis`

- URL: [github.com/umrndem/snakinesis](https://github.com/umrndem/snakinesis)
- Created 12 May 2026; latest observed push 26 May 2026; tags include `v1.0`, `v1.1`, and `v1.1.1`.
- Apparent purpose: a hands-free Snake game controlled by deliberate head movement through an ordinary webcam.
- Architecture evidence: OpenCV frame capture, MediaPipe FaceMesh landmarks, NumPy/Pillow, smoothed face-centre ratios, calibration, one-shot gesture gating with neutral re-arm, Snake game state, menus, audio, fallback keyboard controls, and unit tests.
- Strongest technical qualities: a clear interaction problem, an explicit rejected approach (jittery eye-gaze control), calibration and hysteresis-like release/re-arm behavior, versioned releases, and focused tests.
- Weakest areas / uncertainty: runtime usability across cameras and platforms is not independently tested; public README authorship lists a collaborator, but GitHub contributor data shows only `umrndem`, so contribution split needs clarification.
- Recommendation: strong supporting project and potentially the most visually demonstrable public project. Show the computer-vision interaction and control design, not merely the retro styling.

### `financial-tick-data-pipeline`

- URL: [github.com/umrndem/financial-tick-data-pipeline](https://github.com/umrndem/financial-tick-data-pipeline)
- Created 9 May 2026; latest observed push 9 May 2026; one observed commit.
- Apparent purpose: Linux-oriented C++ pipeline that parses financial tick CSV data and computes per-symbol summaries.
- Architecture evidence: dispatcher, ingester, processor, and reporter processes; `fork`/`exec`, FIFO, shared memory, named semaphores, a bounded queue, worker threads, signal handling, cleanup, VWAP/high/low/volume/count aggregation, Makefile, and sample data.
- Strongest technical qualities: concrete operating-systems concepts in a compact project, explicit IPC topology, concurrency primitives, resource cleanup, and reproducible command-line execution.
- Weakest areas / uncertainty: one commit and a small repository limit evidence of iteration, testing, performance measurement, and production readiness; likely academic/coursework context is not explicitly verified.
- Recommendation: supporting academic/technical note for systems breadth, not a flagship case study. Verify course, collaborators, and evaluation context first.

### `rideflow`

- URL: [github.com/umrndem/rideflow](https://github.com/umrndem/rideflow)
- Created 8 May 2026; latest observed push 8 May 2026; two observed commits.
- Apparent purpose: full-stack ride-hailing simulation with rider, driver, and admin dashboards.
- Architecture evidence: Express 5 API, MySQL 8 schema and logic, vanilla JavaScript/HTML/CSS frontend, role-specific surfaces, fare rules, surge/promo logic, wallets/payments, ratings, complaints, refunds, driver payouts, database procedures/triggers/views, bootstrap/check/query SQL, and a Railway demo URL documented in the README.
- Strongest technical qualities: broad relational domain model, role-oriented workflow, database-side integrity/business logic, and an end-to-end simulation rather than a static UI.
- Weakest areas / uncertainty: two commits; README claims such as live deployment and complete flows need manual verification; schema header identifies two students, while GitHub contributor data lists only `umrndem`, so individual contribution is unclear.
- Recommendation: supporting academic case study if the flow can be demonstrated and contribution boundaries are clarified. Avoid calling it production-grade or claiming real ride-hailing impact.

### `DataPulse`

- URL: [github.com/umrndem/DataPulse](https://github.com/umrndem/DataPulse)
- Created 2 May 2026; latest observed push 5 May 2026; two observed commits.
- Apparent purpose: Streamlit business analytics dashboard with CSV/data-warehouse ingestion, KPI reporting, role-based pages, export, and Prophet forecasting.
- Architecture evidence: Python package split into ingestion, transformation, prediction, services, pages, UI, configuration mapping, and tests; Pandas/Plotly/SQLAlchemy/PostgreSQL/Prophet dependencies; KPI unit test; Supabase-oriented data access; assistant service and authentication modules.
- Strongest technical qualities: end-to-end analytics product shape, configurable column mapping, separation between pages/services/pipeline, basic KPI testing, and a clear attempt to connect analysis with user workflows.
- Weakest areas / uncertainty: short history and two commits; forecast quality, data provenance, deployed use, security, and role enforcement need verification; README calls it “AI Forecast” but the concrete forecasting method is Prophet, while the generative-AI dependency and assistant implementation need separate inspection before making AI claims.
- Recommendation: data-science supporting project or possible featured project after runtime and forecast validation. Describe it as an analytics dashboard with forecasting, not as an ML research system.
