import {
  existsSync,
  readFileSync,
  readdirSync,
} from "node:fs";
import {
  dirname,
  extname,
  join,
  resolve,
} from "node:path";

const repositoryRoot = process.cwd();

function collectMarkdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return collectMarkdownFiles(path);
    }

    return extname(entry.name) === ".md" ? [path] : [];
  });
}

const markdownFiles = [
  resolve(repositoryRoot, "README.md"),
  resolve(repositoryRoot, "AGENTS.md"),
  ...collectMarkdownFiles(resolve(repositoryRoot, "docs")),
];

const errors = [];
let checkedLinks = 0;

for (const markdownFile of markdownFiles) {
  const source = readFileSync(markdownFile, "utf8");
  const markdownLinks = source.matchAll(/\[[^\]]*]\(([^)]+)\)/g);

  for (const match of markdownLinks) {
    const target = match[1].trim();

    if (
      /^(?:https?:|mailto:|tel:|#)/.test(target) ||
      target.startsWith("data:")
    ) {
      continue;
    }

    const withoutAnchor = target.split("#", 1)[0];
    const withoutTitle = withoutAnchor.replace(/\s+["'][^"']*["']$/, "");
    const normalized = decodeURIComponent(
      withoutTitle.replace(/^<|>$/g, ""),
    );
    const resolved = resolve(dirname(markdownFile), normalized);
    checkedLinks += 1;

    if (!existsSync(resolved)) {
      errors.push(
        `${markdownFile.replace(`${repositoryRoot}/`, "")}: missing link target ${target}`,
      );
    }
  }
}

const requiredPaths = [
  ".env.example",
  "portfolio-source-of-truth.md",
  "src/app/globals.css",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/work/[slug]/page.tsx",
  "src/app/opengraph-image.tsx",
  "src/app/icon.svg",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "src/components/ContentImage.tsx",
  "src/components/ProfilePortrait.tsx",
  "src/components/ProjectCard.tsx",
  "src/components/SiteFooter.tsx",
  "src/components/SiteHeader.tsx",
  "src/components/StructuredData.tsx",
  "src/components/ThemeToggle.tsx",
  "src/content/home.ts",
  "src/content/navigation.ts",
  "src/content/profile.ts",
  "src/content/projects.ts",
  "src/content/site-settings.ts",
  "src/content/types.ts",
  "src/content/validation.ts",
  "src/lib/structured-data.ts",
  "src/systems/theme.ts",
  "scripts/validate-content.ts",
  "scripts/validate-docs.mjs",
  "public/images/profile",
  "public/images/projects",
  "public/images/social",
  "public/documents",
  "public/icons",
  "docs/architecture.md",
  "docs/assets-guide.md",
  "docs/content-management.md",
  "docs/deployment.md",
  "docs/design-system.md",
  "docs/development-workflow.md",
  "docs/file-map.md",
  "docs/handoff.md",
  "docs/privacy-and-publication.md",
  "docs/project-content-guide.md",
  "docs/seo-and-metadata.md",
  "docs/theme-maintenance.md",
  "docs/troubleshooting.md",
  "docs/checklists/content-update.md",
  "docs/checklists/new-project.md",
];

for (const requiredPath of requiredPaths) {
  if (!existsSync(resolve(repositoryRoot, requiredPath))) {
    errors.push(`Required documented path is missing: ${requiredPath}`);
  }
}

const packageJson = JSON.parse(
  readFileSync(resolve(repositoryRoot, "package.json"), "utf8"),
);
const requiredScripts = [
  "dev",
  "build",
  "start",
  "lint",
  "typecheck",
  "validate:content",
  "validate:docs",
  "test",
  "check",
];

for (const script of requiredScripts) {
  if (!packageJson.scripts?.[script]) {
    errors.push(`Required documented npm script is missing: ${script}`);
  }
}

if (errors.length > 0) {
  throw new Error(`Documentation validation failed:\n- ${errors.join("\n- ")}`);
}

console.log(
  `Validated ${markdownFiles.length} Markdown files, ${checkedLinks} local links, ${requiredPaths.length} required paths, and ${requiredScripts.length} npm scripts.`,
);
