import { ImageResponse } from "next/og";
import en from "@/lib/i18n/dictionaries/en";
import fr from "@/lib/i18n/dictionaries/fr";

export const runtime = "edge";
export const alt = "Syndy Emade Foundation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage({ params }: { params: { locale: string } }) {
  const t = params.locale === "fr" ? fr : en;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#0F172A 0%,#0F172A 55%,#047857 100%)", color: "white" }}>
        <div style={{ fontSize: 24, letterSpacing: 8, color: "#FBBF24", textTransform: "uppercase" }}>{t.og.eyebrow}</div>
        <div style={{ fontSize: 72, marginTop: 24, lineHeight: 1.05, fontWeight: 700 }}>{t.hero.line1}</div>
        <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 700, color: "#FBBF24" }}>{t.hero.line2}</div>
        <div style={{ fontSize: 28, marginTop: 36, color: "rgba(255,255,255,0.75)" }}>{t.og.footer}</div>
      </div>
    ),
    size,
  );
}
