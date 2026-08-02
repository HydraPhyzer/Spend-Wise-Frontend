import { ImageResponse } from "next/og";

export const alt =
  "Spend-Wise — free expense tracker and personal finance dashboard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered at build time; uses system fonts only so there is no network
// dependency during the build.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F6F6F4",
          color: "#16171A",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 34,
              height: 34,
              background: "#3B5BDB",
              border: "1px solid #16171A",
            }}
          />
          <div style={{ fontSize: 34, letterSpacing: "-0.01em" }}>
            Spend-Wise
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 74,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              maxWidth: 900,
            }}
          >
            Take control of your money with clarity
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "#5B5E65",
              maxWidth: 860,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Track income, expenses, and spending categories in one calm ledger.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #E4E4DF",
            paddingTop: 26,
            fontSize: 22,
            color: "#8B8E95",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div>Personal finance dashboard</div>
          <div>Free to start</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
