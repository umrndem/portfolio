import { profile } from "@/content/profile";
import { LogoMark } from "./LogoMark";
import { PrimaryNav } from "./PrimaryNav";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <LogoMark label={`${profile.shortName} home`} />
      <PrimaryNav />
      <div className="site-header__actions">
        <ThemeToggle />
      </div>
    </header>
  );
}
