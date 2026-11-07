import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = { title: "Administration · Syndy Emade Foundation", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-mist text-plum antialiased">{children}</body>
    </html>
  );
}
