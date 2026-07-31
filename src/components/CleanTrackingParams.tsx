"use client";

import { useEffect } from "react";

const trackingClickIds = new Set([
  "fbclid",
  "gclid",
  "igshid",
  "igsh",
  "ttclid",
  "twclid",
  "mc_cid",
  "mc_eid",
]);

function isTrackingParam(key: string): boolean {
  return key.startsWith("utm_") || trackingClickIds.has(key.toLowerCase());
}

/**
 * Link-in-bio and ad platforms (Instagram, Facebook, Google) append tracking
 * query parameters such as `utm_*` and `fbclid` to inbound links. Strip them
 * from the address bar after load so visitors see the clean site URL. Uses
 * `history.replaceState`, so nothing reloads and non-tracking parameters,
 * path, and hash are preserved.
 */
export function CleanTrackingParams() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const trackedKeys = [...url.searchParams.keys()].filter(isTrackingParam);
    if (trackedKeys.length === 0) {
      return;
    }
    for (const key of trackedKeys) {
      url.searchParams.delete(key);
    }
    window.history.replaceState(window.history.state, "", url.toString());
  }, []);

  return null;
}
