import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { getSiteUrl } from "@/content/site-settings";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return [
    {
      url: new URL("/", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/acknowledgements", siteUrl).toString(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...projects.map((project) => ({
      url: new URL(`/work/${project.slug}`, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: project.display === "featured" ? 0.8 : 0.6,
    })),
  ];
}
