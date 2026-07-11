import { ImageResponse } from "next/og";

export const alt =
  "Muhammad Umar Nadeem — software and data systems portfolio";
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
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F2F5F1",
          color: "#11261F",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          <span>U / N</span>
          <span>Islamabad · Pakistan</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, maxWidth: 940 }}>
            Muhammad Umar Nadeem
          </div>
          <div style={{ fontSize: 31, color: "#2448FF" }}>
            Systems → Data → Databases → Product → People
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
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
                    background: index === 4 ? "#F25B35" : "#2448FF",
                  }}
                />
                <span>{point}</span>
                {index < 4 ? (
                  <span
                    style={{
                      display: "block",
                      height: 2,
                      flex: 1,
                      background: "#C7D1CB",
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
