# Skills-to-evidence map

Only skills with concrete evidence are included. Dependency-only presence is not treated as proof of use.

| Skill | Evidence | Repository | Evidence strength | Publicly demonstrable | Notes |
|---|---|---|---|---|---|
| Next.js / React / TypeScript application architecture | App Router routes, feature modules, shared components, server actions | Sentinel; ETS | Strong | Conditional | Sentinel and ETS are private |
| PostgreSQL data modelling | Drizzle schema, typed rows, explicit SQL, relationship docs | Sentinel | Strong | Conditional | Sanitize HSEQ/employee details |
| Transactional workflow design | Locked report mutation plus audit event in one transaction | Sentinel | Strong | Conditional | Good architecture case study |
| Authentication and authorization | Sessions, password hashing, roles, scoped queries, media authorization | Sentinel | Strong | Conditional | Do not expose security-sensitive implementation details |
| Payload CMS architecture | Collections, relationships, public routes, admin customizations | ETS | Strong | Conditional | Requires business/client permission |
| Content/media systems | Media room, documents, storage adapter, content components | ETS | Strong | Conditional | Use generic screenshots only |
| Python computer vision | MediaPipe FaceMesh landmarks and OpenCV frame loop | Snakinesis | Strong | Yes | Runtime demo recommended |
| Gesture calibration and control logic | Baseline calibration, thresholds, neutral re-arm, direction selection | Snakinesis | Strong | Yes | Supported by tests |
| Python game systems | Modes, menus, timing, collision, food, score, audio | Snakinesis | Moderate | Yes | Collaborator split needs confirmation |
| Data ingestion and transformation | Configurable column mapping, Pandas merge/clean/load pipeline | DataPulse | Moderate | Yes | Validate with a safe sample dataset |
| KPI calculation | Revenue, order count, AOV implementation and unit test | DataPulse | Moderate | Yes | Small but direct evidence |
| Time-series forecasting | Prophet service/path | DataPulse | Limited | Yes, carefully | No verified accuracy or experiment record |
| Business dashboard/UI | Streamlit pages, Plotly-oriented analytics flow, export/targets | DataPulse | Moderate | Yes | Deployment and role enforcement need verification |
| Relational business modelling | Users, rides, wallets, payments, ratings, complaints, payouts | RideFlow | Moderate | Yes | Academic/collaborative context needs clarification |
| Database-side business rules | MySQL constraints, procedures, triggers, views | RideFlow | Moderate | Yes | Do not call production-grade |
| C++ process orchestration | fork/exec, child reaping, signal handling | Financial pipeline | Strong | Yes | Small one-commit project |
| IPC and concurrency | FIFO, shared memory, named semaphores, bounded queue, worker threads | Financial pipeline | Strong | Yes | Good technical note |
| Data aggregation | VWAP, high, low, volume, record count per symbol | Financial pipeline | Moderate | Yes | Not ML |
| Local-first media tooling | Archive UI, local feature measurement, trash/restore, identity cleanup | Matootoo | Strong technically | No by default | Highly private and relationship-specific |
| Documentation / architecture communication | Maintainer manuals, architecture docs, decision records | ETS; Sentinel; Matootoo | Strong | Conditional | Extract general methods only |
| AI-assisted development | Explicit authorship/process disclosure in private project documentation | Matootoo | Present | No by default | Ask how Umar wants this represented publicly |

## Technologies not promoted as skills yet

Prophet, Supabase, Google Generative AI, Cloudflare services, Railway, R2, Three.js, and deployment tooling appear in manifests or documentation, but their operational depth and ownership vary. They should be described only when a concrete implementation path and user-confirmed responsibility are documented.
