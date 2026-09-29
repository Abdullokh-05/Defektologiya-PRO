import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Link-preview image (Telegram, WhatsApp, Facebook…), generated at build time from the
// site's own fonts and hero photos so it always matches the page. No URL is printed on
// it, so it stays correct when the domain changes.

export const alt = "Defektologiya PRO — Nilufar Abdumajitovna";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0D1410";
const CREAM = "#F3E6D3";
const GOLD = "#C9A063";
const MUTED = "#A89D8C";

const asset = (file: string) => readFile(join(process.cwd(), "app/og", file));
const dataUri = async (file: string, mime: string) => `data:${mime};base64,${(await asset(file)).toString("base64")}`;

export default async function Image() {
  const [antonio600, antonio300, cormorant, manrope, heroBg, heroCutout] = await Promise.all([
    asset("antonio-600.woff"),
    asset("antonio-300.woff"),
    asset("cormorant-italic-500.woff"),
    asset("manrope-600.woff"),
    dataUri("hero-bg.jpg", "image/jpeg"),
    dataUri("hero-cutout.png", "image/png"),
  ]);

  // Hero composition on the right, same geometry as the site scaled to a 300px arch:
  // the photo layers are 428×642 and sit at (-99, -151) inside the arch.
  // The arch starts below the top of the letters so the R's leg stays readable.
  const archLeft = 775;
  const archTop = 200;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: BG,
          fontFamily: "Manrope",
          overflow: "hidden",
        }}
      >
        {/* Thin gold frame, behind everything else */}
        <div
          style={{
            position: "absolute",
            left: 22,
            top: 22,
            width: 1156,
            height: 586,
            border: "1px solid rgba(201,160,99,0.35)",
            borderRadius: 18,
          }}
        />

        {/* PRO letters, behind the photo. At 280px Antonio's capitals are 244px tall and
            start 37px below the line box, so top: 3 puts their top edge at 40px. */}
        <div
          style={{
            position: "absolute",
            left: 692,
            top: 3,
            width: 466,
            display: "flex",
            justifyContent: "center",
            fontFamily: "Antonio",
            fontWeight: 600,
            fontSize: 280,
            lineHeight: 1,
            color: CREAM,
          }}
        >
          PRO
        </div>

        {/* Arch with the background photo */}
        <div
          style={{
            position: "absolute",
            left: archLeft,
            top: archTop,
            width: 300,
            height: 630 - archTop,
            borderRadius: "150px 150px 0 0",
            overflow: "hidden",
            display: "flex",
          }}
        >
          <img src={heroBg} width={428} height={642} style={{ position: "absolute", left: -99, top: -151 }} />
        </div>

        {/* Cut-out in front of the letters; clipped to the arch's sides, free at the top */}
        <div
          style={{
            position: "absolute",
            left: archLeft,
            top: 0,
            width: 300,
            height: 630,
            overflow: "hidden",
            display: "flex",
          }}
        >
          <img src={heroCutout} width={428} height={642} style={{ position: "absolute", left: -99, top: archTop - 151 }} />
        </div>

        {/* Fade the bottom of the photo into the (flat) background */}
        <div
          style={{
            position: "absolute",
            left: archLeft,
            top: 400,
            width: 300,
            height: 230,
            background: `linear-gradient(to bottom, rgba(13,20,16,0) 0%, rgba(13,20,16,0.8) 55%, ${BG} 88%)`,
          }}
        />

        {/* Text column */}
        <div
          style={{
            position: "absolute",
            left: 72,
            top: 0,
            width: 580,
            height: 630,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 18, letterSpacing: 4, color: GOLD, textTransform: "uppercase" }}>
            Mutaxassislar va onalar uchun
          </div>
          <div
            style={{
              marginTop: 14,
              fontFamily: "Antonio",
              fontWeight: 300,
              fontSize: 74,
              lineHeight: 1,
              letterSpacing: 9,
              color: CREAM,
            }}
          >
            DEFEKTOLOGIYA
          </div>
          <div
            style={{
              marginTop: 26,
              fontFamily: "Cormorant",
              fontStyle: "italic",
              fontSize: 38,
              lineHeight: 1.22,
              color: CREAM,
            }}
          >
            8 haftada bolani toʻgʻri tashxislash va natijali korreksion ish olib borishni oʻrganing
          </div>
          <div style={{ marginTop: 30, width: 72, height: 2, background: GOLD }} />
          <div style={{ marginTop: 24, fontSize: 21, color: MUTED }}>8 modul · 16 yillik tajriba · Sertifikat</div>
          <div style={{ marginTop: 10, fontSize: 24, color: GOLD }}>Nilufar Abdumajitovna</div>
        </div>

      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Antonio", data: antonio600, weight: 600, style: "normal" },
        { name: "Antonio", data: antonio300, weight: 300, style: "normal" },
        { name: "Cormorant", data: cormorant, weight: 500, style: "italic" },
        { name: "Manrope", data: manrope, weight: 600, style: "normal" },
      ],
    },
  );
}
