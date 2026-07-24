import type {
  Project,
  ProjectVisibility,
  RangePoint,
} from "./types";

export type { Project, RangePoint } from "./types";

export const rangePoints = [
  "systems",
  "data",
  "databases",
  "product",
  "people",
] satisfies readonly RangePoint[];

export const allProjects: readonly Project[] = [
  {
    slug: "ets-website",
    title: "ETS Website",
    eyebrow: "Professional work",
    summary:
      "A structured public website and CMS system designed around the people who publish, maintain, and find organizational information.",
    context: "Eastern Testing Services · IT internship",
    stage: "Under development · partially deployed",
    display: "featured",
    visibility: "private-case-study",
    range: ["databases", "people"],
    technologies: ["Next.js", "React", "Payload CMS", "PostgreSQL"],
    proof:
      "Repository evidence supports substantial work across content models, public routes, media, forms, admin surfaces, and responsive refinement.",
    limitation:
      "No private source, internal content, confidential records, or unverified business impact is shown.",
    sections: [
      {
        title: "The problem",
        body:
          "Public information and internal publishing needed a clearer structure than a collection of disconnected pages. The work involved translating stakeholder requirements into a system that could serve visitors and the people maintaining content.",
      },
      {
        title: "The system",
        body:
          "The implementation separates structured CMS collections from public routes and reusable content components. It includes media and document handling, forms, editorial relationships, and an administration surface.",
      },
      {
        title: "My responsibility",
        body:
          "I gathered requirements through relevant stakeholders, shaped the architecture and constraints, directed AI-assisted implementation, tested the working system, reviewed changes, and iterated on weak behavior. I do not claim that I manually wrote every line.",
      },
      {
        title: "What I can show",
        body:
          "This case study stays deliberately abstract until approved screenshots and diagrams are prepared. Project name, technology choices, architecture at a safe level, and anonymized workflows are permitted; private source and operational data are not.",
      },
    ],
  },
  {
    slug: "sentinel",
    title: "Sentinel",
    eyebrow: "Professional work",
    summary:
      "An internal system for managing HSEQ reports and medical-record workflows with role-based access, audit history, and transactional updates.",
    context: "Eastern Testing Services · IT internship",
    stage: "Under development · partially deployed",
    display: "featured",
    visibility: "private-case-study",
    range: ["databases", "people"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle", "Zod"],
    proof:
      "Repository evidence supports explicit domain boundaries, authorization, database-backed sessions, transactional workflow actions, private media delivery, and audit events.",
    limitation:
      "No production scale, quantified impact, automated-test coverage, employee data, or security-sensitive implementation is claimed.",
    sections: [
      {
        title: "The problem",
        body:
          "Operational reporting and medical-record workflows require different access boundaries, clear states, and an audit trail. The challenge was not a dashboard; it was preserving rules while making the system usable.",
      },
      {
        title: "The system",
        body:
          "Feature boundaries separate reporting, medical, organization, and administration concerns. Role-derived authority and transactional mutations keep workflow changes and audit events together.",
      },
      {
        title: "The tradeoff",
        body:
          "The strongest engineering evidence is backend and domain behavior, while the safest public presentation must remain abstract. A truthful portfolio page should prefer a sanitized flow diagram over realistic fake company screens.",
      },
      {
        title: "Known gap",
        body:
          "The inspected project documentation says committed automated tests are not yet present. That gap remains visible instead of being disguised by a polished case-study surface.",
      },
    ],
  },
  {
    slug: "snakinesis",
    title: "Snakinesis",
    eyebrow: "Computer vision",
    summary:
      "A hands-free Snake game controlled by deliberate head movement through an ordinary webcam.",
    context: "Public project · collaborator credited",
    stage: "Public release available",
    display: "supporting",
    visibility: "public",
    range: ["data", "people"],
    technologies: ["Python", "OpenCV", "MediaPipe", "NumPy", "Pillow"],
    proof:
      "Calibration, smoothed face-center ratios, neutral re-arm behavior, fallback controls, release tags, and focused tests are present in the public repository.",
    limitation:
      "The exact contribution split with Shifa Zeeshan still requires confirmation; no sole-authorship claim is made.",
    repositoryUrl: "https://github.com/umrndem/snakinesis",
    sections: [
      {
        title: "The interaction problem",
        body:
          "Early eye-gaze control was too jittery for reliable play. The useful shift was to treat control as a deliberate gesture system with calibration, thresholds, and a return to neutral before another command.",
      },
      {
        title: "The control loop",
        body:
          "OpenCV captures frames, MediaPipe provides face landmarks, and the controller converts smoothed relative movement into one-shot directions. Keyboard input remains available as an accessible fallback.",
      },
      {
        title: "Evidence",
        body:
          "The repository includes tests around face-loss prompts, direction selection, gesture gating, timing, and game behavior, plus tagged releases from the initial version through later fixes.",
      },
      {
        title: "Before final copy",
        body:
          "A safe demo video and a confirmed collaborator contribution split are needed. The portfolio should present the control decision—not merely the retro game surface.",
      },
    ],
  },
  {
    slug: "datapulse",
    title: "DataPulse",
    eyebrow: "Analytics",
    summary:
      "An end-to-end Streamlit analytics dashboard spanning ingestion, transformation, business KPIs, visualization, export, and a forecasting path.",
    context: "Public project",
    stage: "Public prototype",
    display: "supporting",
    visibility: "public",
    range: ["data", "product"],
    technologies: ["Python", "Pandas", "Streamlit", "Plotly", "Prophet"],
    proof:
      "The public source separates pages, services, pipeline steps, configuration, and tests, including a direct KPI test.",
    limitation:
      "Forecast quality, model comparison, data provenance, deployment, and role enforcement are not verified.",
    repositoryUrl: "https://github.com/umrndem/DataPulse",
    sections: [
      {
        title: "The product shape",
        body:
          "DataPulse is more useful as evidence of an analytics workflow than as an ML claim: configured ingestion, transformation, KPIs, charts, export, targets, and forecasting are connected in one application.",
      },
      {
        title: "What is demonstrated",
        body:
          "Pandas-based transformation, configurable column mappings, service boundaries, visual reporting, and a small known-data KPI test have concrete repository support.",
      },
      {
        title: "What is not demonstrated",
        body:
          "There is no verified forecast evaluation, model comparison, messy external dataset study, or production usage. The portfolio therefore calls this analytics with forecasting—not AI research.",
      },
      {
        title: "Next proof",
        body:
          "A reproducible public-safe dataset, runtime validation, baseline comparison, and explicit error metrics would make this a substantially stronger data-science case study.",
      },
    ],
  },
  {
    slug: "financial-tick-pipeline",
    title: "Financial Tick Data Pipeline",
    eyebrow: "C++ and operating systems",
    summary:
      "A compact Linux pipeline that coordinates processes, IPC, worker threads, and aggregation to turn tick CSV records into per-symbol summaries.",
    context: "Public technical project",
    stage: "Completed academic project",
    display: "supporting",
    visibility: "public",
    range: ["systems", "data"],
    technologies: ["C++17", "POSIX IPC", "pthreads", "CMake"],
    proof:
      "The implementation contains fork/exec orchestration, FIFO and shared memory, named semaphores, a bounded queue, worker threads, signal handling, cleanup, and VWAP aggregation.",
    limitation:
      "Course context, benchmarks, large-data behavior, and automated tests remain unverified.",
    repositoryUrl: "https://github.com/umrndem/financial-tick-data-pipeline",
    sections: [
      {
        title: "The topology",
        body:
          "A dispatcher prepares IPC resources and launches ingester, processor, and reporter processes. The processor combines a bounded producer-consumer queue with worker threads before publishing shared-memory output.",
      },
      {
        title: "Why it matters",
        body:
          "The project is small, but it provides concrete evidence that my strongest language is grounded in processes, memory, concurrency primitives, cleanup, and data aggregation—not only syntax exercises.",
      },
      {
        title: "Aggregation",
        body:
          "Records are summarized per symbol with volume, count, high, low, and volume-weighted average price. This is systems-oriented data processing, not machine learning.",
      },
      {
        title: "Known limits",
        body:
          "One observed commit and no documented benchmark make production or performance claims inappropriate. The next useful step is a reproducible run and an honest throughput experiment.",
      },
    ],
  },
];

export const visibilityLabels: Record<ProjectVisibility, string> = {
  public: "Public project",
  "private-case-study": "Private repository · confidential details omitted",
  confidential: "Confidential / not published",
};

// Hidden and confidential entries remain editable without generating public routes.
export const projects = allProjects.filter(
  (project) =>
    project.display !== "hidden" && project.visibility !== "confidential",
);
