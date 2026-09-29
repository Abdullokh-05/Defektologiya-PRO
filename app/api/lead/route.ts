import { tiers, type Format } from "../../data";

// Lead intake for the course form. Destinations are read from the environment (see .env.example);
// nothing is sent anywhere until they are filled in at launch.
const SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL ?? "";
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? "";
const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.SUPABASE_KEY ?? "";

// The existing Supabase table and Google Sheet (from the previous site) know the tiers as
// onlayn / oflayn / mentorlik; the new site calls the third one "individual".
const legacyTrack = (f: Format) => (f === "individual" ? "mentorlik" : f);

// Values left as the .env.example placeholders count as not configured.
const isSet = (v: string) => v !== "" && !v.startsWith("REPLACE_");

type Lead = { name: string; phone: string; format: Format };

function parse(body: unknown): Lead | null {
  if (!body || typeof body !== "object") return null;
  const { name, phone, format } = body as Record<string, unknown>;
  if (typeof name !== "string" || typeof phone !== "string" || typeof format !== "string") return null;
  const cleanName = name.trim().slice(0, 100);
  const digits = phone.replace(/\D/g, "");
  if ((cleanName.match(/\p{L}/gu) ?? []).length < 2) return null;
  if (digits.length < 8 || digits.length > 15) return null;
  if (!tiers.some((t) => t.id === format)) return null;
  return { name: cleanName, phone: "+" + digits, format: format as Format };
}

async function toSheets(lead: Lead) {
  // Same payload shape as the previous site's Apps Script: { name, phone, track }.
  const res = await fetch(SHEETS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: lead.name, phone: lead.phone, track: legacyTrack(lead.format) }),
  });
  if (!res.ok) throw new Error(`Sheets ${res.status}`);
}

// Inserts into the previous site's `registrations` table (name, phone, track) through the
// Supabase REST API. Its row-level-security policy allows anonymous inserts, so the same
// publishable key the old site used is enough.
async function toSupabase(lead: Lead) {
  const res = await fetch(`${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/registrations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ name: lead.name, phone: lead.phone, track: legacyTrack(lead.format) }),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text().catch(() => "")}`);
}

async function toTelegram(lead: Lead) {
  const tier = tiers.find((t) => t.id === lead.format)?.label ?? lead.format;
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: `Yangi ariza\n${lead.name}\n${lead.phone}\n${tier}` }),
  });
  if (!res.ok) throw new Error(`Telegram ${res.status}`);
}

export async function POST(req: Request) {
  const lead = parse(await req.json().catch(() => null));
  if (!lead) return Response.json({ ok: false, error: "invalid" }, { status: 400 });

  const jobs: Promise<void>[] = [];
  if (isSet(SUPABASE_URL) && isSet(SUPABASE_KEY)) jobs.push(toSupabase(lead));
  if (isSet(SHEETS_URL)) jobs.push(toSheets(lead));
  if (isSet(BOT_TOKEN) && isSet(CHAT_ID)) jobs.push(toTelegram(lead));

  if (jobs.length === 0) {
    // Local mode: accept in development so the form can be tested; refuse in production so a
    // deploy without destinations shows the visitor an error instead of a false "received".
    if (process.env.NODE_ENV !== "production") {
      console.info("[local] Ariza:", lead);
      return Response.json({ ok: true, local: true });
    }
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  // One working destination is enough to keep the lead.
  const results = await Promise.allSettled(jobs);
  results.forEach((r) => r.status === "rejected" && console.error("[lead]", r.reason));
  if (results.some((r) => r.status === "fulfilled")) return Response.json({ ok: true });
  return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
}
