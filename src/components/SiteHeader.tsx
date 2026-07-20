import Link from "next/link";
import { primaryNavigation } from "@/content/navigation";
import { profile } from "@/content/profile";
import { siteSettings } from "@/content/site-settings";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-header__mark" href="/">
        <span className="sr-only">{profile.shortName} home</span>
        <span aria-hidden="true">U</span>
        <span aria-hidden="true">/</span>
        <span aria-hidden="true">N</span>
      </Link>
      <nav aria-label="Primary navigation">
        {primaryNavigation.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="site-header__actions">
        <ThemeToggle />
        <a
          className="site-header__availability"
          href={`mailto:${profile.email}`}
        >
          {siteSettings.availabilityLabel}
        </a>
      </div>
    </header>
  );
}
