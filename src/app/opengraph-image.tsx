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
          background: "#F8F5F6",
          color: "#1C191B",
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
            background: "#7B1E3A",
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
            <path d={brandLogoPaths.slash} fill={brandLogoColors.slash} />
            <path d={brandLogoPaths.n} fill="#1C191B" />
          </svg>
          <span style={{ color: "#FFFFFF", paddingTop: 14 }}>
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
            }}
          >
            <span>Muhammad Umar&nbsp;</span>
            <span style={{ color: "#FFFFFF" }}>Nadeem</span>
          </div>
          <div style={{ display: "flex", fontSize: 31, color: "#8C2344" }}>
            <span>
              Systems Programming → Data → Databases → 
            </span>
            <span style={{ color: "#FFFFFF" }}>Product → People</span>
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
          {["systems programming", "data", "databases", "product", "people"].map(
            (point, index) => (
              <div
                key={point}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flex: index === 4 ? "0 0 auto" : 1,
                  fontSize: 18,
                }}
              >
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    background: index >= 3 ? "#FFFFFF" : "#A12D50",
                  }}
                />
                <span style={{ color: index >= 3 ? "#FFFFFF" : "#1C191B" }}>
                  {point}
                </span>
                {index < 4 ? (
                  <span
                    style={{
                      display: "block",
                      height: 2,
                      flex: 1,
                      background: "#B79CA5",
                    }}
                  />
                ) : null}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
