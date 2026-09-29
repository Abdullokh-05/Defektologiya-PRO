import type { Metadata, Viewport } from "next";
import "./globals.css";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Antonio:wght@200;300;400;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Manrope:wght@400;500;600;700&display=swap";

export const metadata: Metadata = {
  title: "Defektologiya PRO — Nilufar Abdumajitovna",
  description:
    "Mutaxassislar va onalar uchun 8 haftalik amaliy dastur: bolani toʻgʻri tashxislash va natijali korreksion ish olib borishni oʻrganing.",
  openGraph: {
    title: "Defektologiya PRO — Nilufar Abdumajitovna",
    description: "Mutaxassislar va onalar uchun 8 haftalik amaliy dastur.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    locale: "uz_UZ",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0D1410" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>{children}</body>
    </html>
  );
}
