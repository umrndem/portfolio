import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-header__mark" href="/">
        <span className="sr-only">Umar home</span>
        <span aria-hidden="true">U</span>
        <span aria-hidden="true">/</span>
        <span aria-hidden="true">N</span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#approach">Approach</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
      <a className="site-header__availability" href="mailto:umrndem@gmail.com">
        Open to opportunities
      </a>
    </header>
  );
}
