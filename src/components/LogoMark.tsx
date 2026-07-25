"use client";

import Link from "next/link";
import { BrandLogoGlyph } from "./BrandLogoGlyph";
import { BrandLogoReveal } from "./BrandLogoReveal";

type LogoMarkProps = {
  label: string;
};

// The mark reveals "UMRNDEM" purely on hover/focus (see globals.css). It
// collapses as soon as the pointer leaves — no persisted expanded state.
export function LogoMark({ label }: LogoMarkProps) {
  return (
    <Link
      className="site-header__mark"
      href="/"
      aria-label={label}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span
        className="site-header__mark-layer site-header__mark-layer--u"
        aria-hidden="true"
      >
        <BrandLogoGlyph glyph="u" />
      </span>
      <span
        className="site-header__mark-layer site-header__mark-layer--mr"
        aria-hidden="true"
      >
        <BrandLogoReveal segment="mr" />
      </span>
      <span
        className="site-header__mark-layer site-header__mark-layer--slash"
        aria-hidden="true"
      >
        <BrandLogoGlyph glyph="slash" />
      </span>
      <span
        className="site-header__mark-layer site-header__mark-layer--n"
        aria-hidden="true"
      >
        <BrandLogoGlyph glyph="n" />
      </span>
      <span
        className="site-header__mark-layer site-header__mark-layer--dem"
        aria-hidden="true"
      >
        <BrandLogoReveal segment="dem" />
      </span>
    </Link>
  );
}
