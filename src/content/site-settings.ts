export const siteSettings = {
  title: "Muhammad Umar Nadeem",
  titleTemplate: "%s · Muhammad Umar Nadeem",
  description:
    "Data Science student and software builder working across C++, data, databases, product systems, and agentic AI.",
  socialDescription:
    "Selected work across C++, data, databases, product systems, and agentic AI.",
  openGraphAlt: "Muhammad Umar Nadeem — software and data systems portfolio",
  availabilityLabel: "Open to opportunities",
} as const;

export function getSiteUrl() {
  return new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  );
}
