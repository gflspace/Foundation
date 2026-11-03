import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import en from "@/lib/i18n/dictionaries/en";
import fr from "@/lib/i18n/dictionaries/fr";

export const runtime = "nodejs";
export const alt = "Syndy Emade Foundation — Together we can";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }: { params: { locale: string } }) {
  const t = params.locale === "fr" ? fr : en;
  const logo = await readFile(path.join(process.cwd(), "public/brand/logo-sm.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#FFFFFF", position: "relative", padding: "0 80px" }}>
        <div style={{ position: "absolute", right: -120, top: -120, width: 520, height: 520, borderRadius: 9999, background: "#ECF8F7", display: "flex" }} />
        <div style={{ position: "absolute", left: -80, bottom: -100, width: 280, height: 280, borderRadius: 9999, background: "#F4EEF8", display: "flex" }} />
        <div style={{ position: "absolute", right: 120, bottom: 70, width: 36, height: 36, borderRadius: 9999, background: "#703890", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#00756F", textTransform: "uppercase", fontWeight: 700 }}>{t.og.eyebrow}</div>
          <div style={{ fontSize: 84, marginTop: 20, lineHeight: 1, fontWeight: 700, color: "#00756F" }}>{t.hero.line1}</div>
          <div style={{ fontSize: 84, lineHeight: 1.05, fontWeight: 700, color: "#703890" }}>{t.hero.line2}</div>
          <div style={{ fontSize: 28, marginTop: 36, color: "#2A1238" }}>{t.og.footer}</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={380} height={347} alt="" style={{ marginLeft: 40 }} />
      </div>
    ),
    size,
  );
}
