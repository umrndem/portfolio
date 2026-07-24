"use client";
import Link from "next/link";

type LogoMarkProps = {
  label: string;
};

// The mark reveals "UMRNDEM" purely on hover/focus (see globals.css). It
// collapses as soon as the pointer leaves — no persisted expanded state.
export function LogoMark({ label }: LogoMarkProps) {
  return (
    <Link className="site-header__mark" href="/" aria-label={label} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <span
        className="site-header__mark-fixed site-header__mark-fixed--red"
        aria-hidden="true"
      >
        U
      </span>
      <span
        className="site-header__mark-reveal site-header__mark-reveal--red"
        aria-hidden="true"
      >
        MR
      </span>
      <span className="site-header__mark-slash" aria-hidden="true">
        <svg
          className="site-header__mark-slash-svg"
          viewBox="0 0 9 28"
          fill="none"
          aria-hidden="true"
        >
          <path d="M0 28 4.5 0 9 0 4.5 28Z" fill="currentColor" />
        </svg>
      </span>
      <span className="site-header__mark-fixed" aria-hidden="true">
        N
      </span>
      <span className="site-header__mark-reveal" aria-hidden="true">
        DEM
      </span>
    </Link>
  );
}
