import type {
  ImageAsset,
  NavigationItem,
  Profile,
  Project,
  RangePoint,
  SocialLink,
} from "./types";

type PortfolioContent = {
  allProjects: readonly Project[];
  profile: Profile;
  socialLinks: readonly SocialLink[];
  primaryNavigation: readonly NavigationItem[];
  sectionIds: Readonly<Record<string, string>>;
  rangePoints: readonly RangePoint[];
  siteUrl: URL;
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const imagePattern = /\.(?:avif|jpe?g|png|webp)$/i;

function requireText(
  value: string,
  field: string,
  errors: string[],
) {
  if (!value.trim()) {
    errors.push(`${field} must not be empty.`);
  }
}

function requireHttpsUrl(
  value: string,
  field: string,
  errors: string[],
) {
  try {
    const url = new URL(value);

    if (url.protocol !== "https:") {
      errors.push(`${field} must use https.`);
    }
  } catch {
    errors.push(`${field} must be a valid absolute URL.`);
  }
}

function validateImage(
  image: ImageAsset,
  field: string,
  requiredDirectory: string,
  errors: string[],
) {
  if (!image.src.startsWith(requiredDirectory) || !imagePattern.test(image.src)) {
    errors.push(
      `${field}.src must be a supported image inside ${requiredDirectory}.`,
    );
  }

  requireText(image.alt, `${field}.alt`, errors);

  if (!Number.isInteger(image.width) || image.width <= 0) {
    errors.push(`${field}.width must be a positive integer.`);
  }

  if (!Number.isInteger(image.height) || image.height <= 0) {
    errors.push(`${field}.height must be a positive integer.`);
  }
}

function validateProject(
  project: Project,
  index: number,
  rangePoints: readonly RangePoint[],
  errors: string[],
) {
  const field = `projects[${index}] (${project.slug || "missing slug"})`;

  if (!slugPattern.test(project.slug)) {
    errors.push(`${field}.slug must use lowercase kebab-case.`);
  }

  for (const [key, value] of [
    ["title", project.title],
    ["eyebrow", project.eyebrow],
    ["summary", project.summary],
    ["context", project.context],
    ["stage", project.stage],
    ["proof", project.proof],
    ["limitation", project.limitation],
  ] as const) {
    requireText(value, `${field}.${key}`, errors);
  }

  if (
    project.visibility === "confidential" &&
    project.display !== "hidden"
  ) {
    errors.push(
      `${field} is confidential and must use display: "hidden".`,
    );
  }

  if (project.visibility === "confidential" && project.repositoryUrl) {
    errors.push(`${field} is confidential and cannot expose a repository URL.`);
  }

  if (project.repositoryUrl) {
    requireHttpsUrl(project.repositoryUrl, `${field}.repositoryUrl`, errors);
  }

  const rangeStart = rangePoints.indexOf(project.range[0]);
  const rangeEnd = rangePoints.indexOf(project.range[1]);

  if (rangeStart === -1 || rangeEnd === -1 || rangeStart > rangeEnd) {
    errors.push(`${field}.range must follow the declared range-point order.`);
  }

  if (project.technologies.length === 0) {
    errors.push(`${field}.technologies must include at least one item.`);
  }

  if (new Set(project.technologies).size !== project.technologies.length) {
    errors.push(`${field}.technologies contains duplicates.`);
  }

  if (project.sections.length === 0) {
    errors.push(`${field}.sections must include at least one section.`);
  }

  const sectionTitles = new Set<string>();
  project.sections.forEach((section, sectionIndex) => {
    requireText(section.title, `${field}.sections[${sectionIndex}].title`, errors);
    requireText(section.body, `${field}.sections[${sectionIndex}].body`, errors);

    if (sectionTitles.has(section.title)) {
      errors.push(`${field}.sections contains duplicate title "${section.title}".`);
    }
    sectionTitles.add(section.title);
  });

  if (project.coverImage) {
    validateImage(
      project.coverImage,
      `${field}.coverImage`,
      "/images/projects/",
      errors,
    );
  }

  project.gallery?.forEach((image, imageIndex) => {
    validateImage(
      image,
      `${field}.gallery[${imageIndex}]`,
      "/images/projects/",
      errors,
    );
  });
}

export function validatePortfolioContent(content: PortfolioContent) {
  const errors: string[] = [];
  const slugs = new Set<string>();

  content.allProjects.forEach((project, index) => {
    validateProject(project, index, content.rangePoints, errors);

    if (slugs.has(project.slug)) {
      errors.push(`Duplicate project slug "${project.slug}".`);
    }
    slugs.add(project.slug);
  });

  const publishedProjects = content.allProjects.filter(
    (project) =>
      project.display !== "hidden" && project.visibility !== "confidential",
  );

  if (!publishedProjects.some((project) => project.display === "featured")) {
    errors.push("At least one published project must be featured.");
  }

  requireText(content.profile.name, "profile.name", errors);
  requireText(content.profile.shortName, "profile.shortName", errors);
  requireText(content.profile.location, "profile.location", errors);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.profile.email)) {
    errors.push("profile.email must be a valid email address.");
  }

  if (content.profile.portrait) {
    validateImage(
      content.profile.portrait,
      "profile.portrait",
      "/images/profile/",
      errors,
    );
  }

  if (
    content.profile.resumePath &&
    !/^\/documents\/[a-z0-9][a-z0-9-]*\.pdf$/i.test(
      content.profile.resumePath,
    )
  ) {
    errors.push(
      "profile.resumePath must be a kebab-case PDF path inside /documents/.",
    );
  }

  const socialLabels = new Set<string>();
  content.socialLinks.forEach((link, index) => {
    requireText(link.label, `socialLinks[${index}].label`, errors);
    requireHttpsUrl(link.href, `socialLinks[${index}].href`, errors);

    if (socialLabels.has(link.label)) {
      errors.push(`Duplicate social-link label "${link.label}".`);
    }
    socialLabels.add(link.label);
  });

  const sectionIds = new Set(Object.values(content.sectionIds));
  const navigationHrefs = new Set<string>();
  content.primaryNavigation.forEach((item, index) => {
    requireText(item.label, `primaryNavigation[${index}].label`, errors);
    const target = item.href.replace("/#", "");

    if (!sectionIds.has(target)) {
      errors.push(
        `primaryNavigation[${index}].href targets unknown section "${target}".`,
      );
    }

    if (navigationHrefs.has(item.href)) {
      errors.push(`Duplicate navigation href "${item.href}".`);
    }
    navigationHrefs.add(item.href);
  });

  if (!["http:", "https:"].includes(content.siteUrl.protocol)) {
    errors.push("NEXT_PUBLIC_SITE_URL must use http or https.");
  }

  if (content.siteUrl.pathname !== "/") {
    errors.push("NEXT_PUBLIC_SITE_URL must be an origin without a path.");
  }

  if (errors.length > 0) {
    throw new Error(
      `Portfolio content validation failed:\n- ${errors.join("\n- ")}`,
    );
  }
}

export function collectReferencedPublicAssets(
  profile: Profile,
  projects: readonly Project[],
) {
  const assets = new Set<string>();

  if (profile.portrait) {
    assets.add(profile.portrait.src);
  }
  if (profile.resumePath) {
    assets.add(profile.resumePath);
  }

  projects.forEach((project) => {
    if (project.coverImage) {
      assets.add(project.coverImage.src);
    }
    project.gallery?.forEach((image) => assets.add(image.src));
  });

  return [...assets];
}
