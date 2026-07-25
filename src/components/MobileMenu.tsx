"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNavigation } from "@/content/navigation";
import { handleNavAnchorClick } from "@/lib/nav-scroll";

// Compact primary navigation for viewports too tight to place the links inline
// beside the expanding logo lockup. Hidden above the mobile breakpoint via CSS.
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [seenPathname, setSeenPathname] = useState(pathname);

  // Close whenever the route changes (covers links that navigate away). Done
  // during render per React's "adjusting state on prop change" guidance.
  if (pathname !== seenPathname) {
    setSeenPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="site-header__menu">
      <button
        aria-controls="site-menu"
        aria-expanded={open}
        className="site-header__menu-toggle"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span
          aria-hidden="true"
          className="site-header__menu-icon"
          data-open={open}
        />
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      {open ? (
        <button
          aria-label="Close menu"
          className="site-header__menu-backdrop"
          onClick={() => setOpen(false)}
          type="button"
        />
      ) : null}

      <nav
        aria-label="Primary navigation"
        className="site-header__menu-panel"
        data-open={open}
        id="site-menu"
      >
        {primaryNavigation.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            onClick={(event) => {
              handleNavAnchorClick(event, item.href);
              setOpen(false);
            }}
            tabIndex={open ? undefined : -1}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
