import type { MouseEvent } from "react";

/**
 * Handles clicks on primary-navigation anchors. When the link points at an
 * on-page section that exists in the current document, it scrolls there
 * explicitly (so a repeat click still works even when the hash is already set)
 * and returns true. Otherwise it leaves the event untouched for Next.js to
 * route normally and returns false. scrollIntoView honors the CSS
 * scroll-padding-top and each section's scroll-margin-top.
 */
export function handleNavAnchorClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
): boolean {
  // Let modified clicks (new tab, download, etc.) behave natively.
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return false;
  }

  const hashIndex = href.indexOf("#");

  if (hashIndex === -1) {
    return false;
  }

  const id = href.slice(hashIndex + 1);
  const target = document.getElementById(id);

  // Target is on another route: let Next.js navigate normally.
  if (!target) {
    return false;
  }

  event.preventDefault();
  target.scrollIntoView();

  if (window.location.hash !== `#${id}`) {
    window.history.pushState(null, "", `#${id}`);
  }

  return true;
}
