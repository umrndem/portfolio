export type TechnologyIcon = {
  iconLight: string;
  iconDark?: string;
};

export const technologyIcons: Record<string, TechnologyIcon> = {
  "Next.js": { iconLight: "/icons/technologies/nextjs.svg", iconDark: "/icons/technologies/nextjs-dark.svg" },
  React: { iconLight: "/icons/technologies/react.svg" },
  "Payload CMS": { iconLight: "/icons/technologies/payloadcms.svg", iconDark: "/icons/technologies/payloadcms-dark.svg" },
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
};
