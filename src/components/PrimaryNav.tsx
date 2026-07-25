"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { primaryNavigation } from "@/content/navigation";

export function PrimaryNav() {
  function handleClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    // Let modified clicks (new tab, download, etc.) behave natively.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const hashIndex = href.indexOf("#");

    if (hashIndex === -1) {
      return;
    }

    const id = href.slice(hashIndex + 1);
    const target = document.getElementById(id);

    // Target is on another route: let Next.js navigate normally.
    if (!target) {
      return;
    }

    // Same-page anchor: scroll explicitly so a repeat click still works even
    // when the URL hash is already set. scrollIntoView honors the CSS
    // scroll-padding-top and each section's scroll-margin-top.
    event.preventDefault();
    target.scrollIntoView();

    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`);
    }
  }

  return (
    <nav aria-label="Primary navigation">
      {primaryNavigation.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          onClick={(event) => handleClick(event, item.href)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
