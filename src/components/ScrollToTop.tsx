"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Soft navigations share the root layout and can leave the viewport scrolled.
 * Reset to the top on each path change, or honor an in-page hash target when
 * present (for example `/#work` from the acknowledgements return link).
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
