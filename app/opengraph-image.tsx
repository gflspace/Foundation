import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Syndy Emade Foundation — A Beacon of Hope. An Icon of Action.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#0F172A 0%,#0F172A 55%,#047857 100%)", color: "white" }}>
        <div style={{ fontSize: 24, letterSpacing: 8, color: "#FBBF24", textTransform: "uppercase" }}>Syndy Emade Foundation</div>
        <div style={{ fontSize: 76, marginTop: 24, lineHeight: 1.05, fontWeight: 700 }}>A Beacon of Hope.</div>
        <div style={{ fontSize: 76, lineHeight: 1.05, fontWeight: 700, color: "#FBBF24" }}>An Icon of Action.</div>
        <div style={{ fontSize: 28, marginTop: 36, color: "rgba(255,255,255,0.75)" }}>Youth welfare · Crisis relief · Scholarships · Women’s empowerment</div>
      </div>
    ),
    size,
  );
}
