import { ImageResponse } from "next/og";
import {
  brandLogoColors,
  brandLogoPaths,
  brandLogoViewBoxPadded,
} from "@/components/brand-logo-paths";
import { profile } from "@/content/profile";
import { rangePoints } from "@/content/projects";
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
  rule: "rgba(255, 255, 255, 0.28)",
} as const;

const nameParts = profile.name.split(" ");
const givenNames = nameParts.slice(0, -1).join(" ");
const familyName = nameParts.at(-1) ?? "";

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
            justifyContent: "space-between",
            fontSize: 24,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
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
          <span style={{ color: palette.white, paddingTop: 14 }}>
            {profile.location.replace(",", " ·")}
          </span>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: palette.white,
            }}
          >
            <span>
              {givenNames}&nbsp;{familyName}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 31,
              color: palette.white,
            }}
          >
            <span>
              Systems Programming → Data → Databases → Product → People
            </span>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          {rangePoints.map((point, index) => (
            <div
              key={point}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flex: index === rangePoints.length - 1 ? "0 0 auto" : 1,
                fontSize: 18,
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: index >= 3 ? palette.white : palette.leadRed,
                }}
              />
              <span style={{ color: palette.white }}>{point}</span>
              {index < rangePoints.length - 1 ? (
                <span
                  style={{
                    display: "block",
                    height: 2,
                    flex: 1,
                    background: palette.rule,
                  }}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
