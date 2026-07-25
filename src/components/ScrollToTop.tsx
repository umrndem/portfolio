"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Soft navigations between /work/[slug] pages share a layout and can leave
 * the viewport at the previous bottom. Reset to the top on each path change.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
