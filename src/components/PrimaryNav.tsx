"use client";

import Link from "next/link";
import { primaryNavigation } from "@/content/navigation";
import { handleNavAnchorClick } from "@/lib/nav-scroll";

export function PrimaryNav() {
  return (
    <nav className="site-header__nav" aria-label="Primary navigation">
      {primaryNavigation.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          onClick={(event) => handleNavAnchorClick(event, item.href)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
