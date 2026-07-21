import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { primaryNavigation, sectionIds } from "../src/content/navigation";
import { profile, socialLinks } from "../src/content/profile";
import {
  allProjects,
  rangePoints,
} from "../src/content/projects";
import { getSiteUrl } from "../src/content/site-settings";
import {
  collectReferencedPublicAssets,
  validatePortfolioContent,
} from "../src/content/validation";

validatePortfolioContent({
  allProjects,
  profile,
  socialLinks,
  primaryNavigation,
  sectionIds,
  rangePoints,
  siteUrl: getSiteUrl(),
});

const missingAssets = collectReferencedPublicAssets(profile, allProjects).filter(
  (assetPath) =>
    !existsSync(resolve(process.cwd(), "public", assetPath.replace(/^\//, ""))),
);

if (missingAssets.length > 0) {
  throw new Error(
    `Referenced public assets are missing:\n- ${missingAssets.join("\n- ")}`,
  );
}

console.log(
  `Validated ${allProjects.length} projects, ${socialLinks.length} social links, and all referenced public assets.`,
);
