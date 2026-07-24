import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { primaryNavigation, sectionIds } from "../src/content/navigation";
import { profile, socialLinks } from "../src/content/profile";
import {
  allProjects,
  rangePoints,
} from "../src/content/projects";
import { getSiteUrl } from "../src/content/site-settings";
import { technologyIcons } from "../src/content/technology-icons";
import {
  collectProjectStackLabels,
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

const missingTechnologyIcons = collectProjectStackLabels(allProjects).flatMap(
  (label) => {
    const icon = technologyIcons[label];

    if (!icon) {
      return [];
    }

    return [icon.iconLight, icon.iconDark]
      .filter((path): path is string => Boolean(path))
      .filter(
        (assetPath) =>
          !existsSync(
            resolve(process.cwd(), "public", assetPath.replace(/^\//, "")),
          ),
      )
      .map((assetPath) => `${label}: ${assetPath}`);
  },
);

if (missingTechnologyIcons.length > 0) {
  throw new Error(
    `Mapped technology icon files are missing:\n- ${missingTechnologyIcons.join("\n- ")}`,
  );
}

console.log(
  `Validated ${allProjects.length} projects, ${socialLinks.length} social links, and all referenced public assets.`,
);
