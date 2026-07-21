import type { NavigationItem } from "./types";

export const sectionIds = {
  work: "work",
  approach: "approach",
  about: "about",
  contact: "contact",
} as const;

export const primaryNavigation = [
  { label: "Work", href: `/#${sectionIds.work}` },
  { label: "Approach", href: `/#${sectionIds.approach}` },
  { label: "About", href: `/#${sectionIds.about}` },
  { label: "Contact", href: `/#${sectionIds.contact}` },
] satisfies readonly NavigationItem[];
