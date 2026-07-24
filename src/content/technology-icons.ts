export type TechnologyIcon = {
  iconLight: string;
  iconDark?: string;
  /** When true, wrap the icon in a neutral surface for contrast on brand cards. */
  logoSafeSurface?: boolean;
};

/**
 * Exact display-name → local SVG map for technology badges.
 * Sources are documented in docs/assets-guide.md (technology logos).
 */
export const technologyIcons: Record<string, TechnologyIcon> = {
  "Next.js": {
    iconLight: "/icons/technologies/nextjs.svg",
    iconDark: "/icons/technologies/nextjs-dark.svg",
  },
  React: { iconLight: "/icons/technologies/react.svg" },
  "Payload CMS": {
    iconLight: "/icons/technologies/payloadcms.svg",
    iconDark: "/icons/technologies/payloadcms-dark.svg",
  },
  PostgreSQL: { iconLight: "/icons/technologies/postgresql.svg" },
  TypeScript: { iconLight: "/icons/technologies/typescript.svg" },
  Drizzle: { iconLight: "/icons/technologies/drizzle.svg" },
  Zod: { iconLight: "/icons/technologies/zod.svg" },
  Python: { iconLight: "/icons/technologies/python.svg" },
  OpenCV: { iconLight: "/icons/technologies/opencv.svg" },
  MediaPipe: { iconLight: "/icons/technologies/mediapipe.svg" },
  NumPy: { iconLight: "/icons/technologies/numpy.svg" },
  Pandas: { iconLight: "/icons/technologies/pandas.svg" },
  Streamlit: { iconLight: "/icons/technologies/streamlit.svg" },
  Plotly: { iconLight: "/icons/technologies/plotly.svg" },
  "C++17": { iconLight: "/icons/technologies/cplusplus.svg" },
  CMake: { iconLight: "/icons/technologies/cmake.svg" },
  Express: {
    iconLight: "/icons/technologies/express.svg",
    iconDark: "/icons/technologies/express-dark.svg",
  },
  JavaScript: { iconLight: "/icons/technologies/javascript.svg" },
  MySQL: { iconLight: "/icons/technologies/mysql.svg" },
  Vercel: {
    iconLight: "/icons/technologies/vercel.svg",
    iconDark: "/icons/technologies/vercel-dark.svg",
  },
  Neon: {
    iconLight: "/icons/technologies/neon.svg",
    iconDark: "/icons/technologies/neon-dark.svg",
  },
  "Cloudflare R2": {
    iconLight: "/icons/technologies/cloudflare-r2.svg",
    logoSafeSurface: true,
  },
  Turnstile: {
    iconLight: "/icons/technologies/turnstile.svg",
    logoSafeSurface: true,
  },
  "Streamlit Community Cloud": {
    iconLight: "/icons/technologies/streamlit-community-cloud.svg",
  },
  Supabase: { iconLight: "/icons/technologies/supabase.svg" },
  Railway: {
    iconLight: "/icons/technologies/railway.svg",
    iconDark: "/icons/technologies/railway-dark.svg",
  },
  Aiven: {
    iconLight: "/icons/technologies/aiven.svg",
    iconDark: "/icons/technologies/aiven-dark.svg",
    logoSafeSurface: true,
  },
};
