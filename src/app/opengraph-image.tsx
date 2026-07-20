import { ImageResponse } from "next/og";
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
          background: "#111113",
          color: "#F4F1F2",
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
            width: "32%",
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
          <span>
            U <span style={{ color: "#F0A8BD" }}>/</span> N
          </span>
          <span>{profile.location.replace(",", " ·")}</span>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div style={{ fontSize: 76, lineHeight: 1.05, maxWidth: 940 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 31, color: "#F0A8BD" }}>
            Systems → Data → Databases → Product → People
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
          {["systems", "data", "databases", "product", "people"].map(
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
                    background: index === 4 ? "#C94D72" : "#E18AA5",
                  }}
                />
                <span>{point}</span>
                {index < 4 ? (
                  <span
                    style={{
                      display: "block",
                      height: 2,
                      flex: 1,
                      background: "#65404B",
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
