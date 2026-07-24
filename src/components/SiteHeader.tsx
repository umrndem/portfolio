import Link from "next/link";
import { primaryNavigation } from "@/content/navigation";
import { profile } from "@/content/profile";
import { LogoMark } from "./LogoMark";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <LogoMark label={`${profile.shortName} home`} />
      <nav aria-label="Primary navigation">
        {primaryNavigation.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="site-header__actions">
        <ThemeToggle />
      </div>
    </header>
  );
}
