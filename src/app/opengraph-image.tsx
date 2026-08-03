import { ImageResponse } from "next/og";
import {
  brandLogoColors,
  brandLogoPaths,
  brandLogoViewBoxPadded,
} from "@/components/brand-logo-paths";
import { profile } from "@/content/profile";
import { siteSettings } from "@/content/site-settings";

export const alt = siteSettings.openGraphAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Palette mirrors globals.css: dark ground (#111111), lead project red
   (#c90f16 / --project-surface-1), on-brand white. ImageResponse cannot
   read document CSS variables. */
const palette = {
  black: "#111111",
  leadRed: "#c90f16",
  white: "#ffffff",
  whiteSoft: "rgba(255, 255, 255, 0.82)",
} as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "space-between",
          background: palette.black,
          color: palette.white,
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: 0,
            right: 0,
            width: "40%",
            height: "100%",
            background: palette.leadRed,
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
          }}
        >
          <svg
            width="86"
            height="82"
            viewBox={brandLogoViewBoxPadded}
            aria-label="U/N"
          >
            <path d={brandLogoPaths.u} fill={brandLogoColors.u} />
            <path d={brandLogoPaths.slash} fill={palette.whiteSoft} />
            <path d={brandLogoPaths.n} fill={palette.white} />
          </svg>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            fontSize: 76,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: palette.white,
          }}
        >
          {profile.name}
        </div>
        {/* Spacer keeps name off the bottom edge while logo stays top-left. */}
        <div style={{ display: "flex", height: 82 }} />
      </div>
    ),
    size,
  );
}
