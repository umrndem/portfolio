export type RangePoint =
  | "systems"
  | "data"
  | "databases"
  | "product"
  | "people";

export type ProjectDisplay = "featured" | "supporting" | "hidden";

export type ProjectVisibility =
  | "public"
  | "private-case-study"
  | "confidential";

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type ProjectSection = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  context: string;
  stage: string;
  display: ProjectDisplay;
  visibility: ProjectVisibility;
  range: readonly [RangePoint, RangePoint];
  technologies: readonly string[];
  proof: string;
  limitation: string;
  repositoryUrl?: string;
  coverImage?: ImageAsset;
  gallery?: readonly ImageAsset[];
  sections: readonly ProjectSection[];
};

export type SocialLink = {
  label: string;
  href: string;
};

export type NavigationItem = {
  label: string;
  href: `/#${string}`;
};

export type Profile = {
  name: string;
  shortName: string;
  location: string;
  email: string;
  degree: string;
  graduation: string;
  cgpa: string;
  portrait?: ImageAsset;
  resumePath?: `/documents/${string}`;
};
