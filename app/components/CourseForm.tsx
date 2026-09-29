"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { SALE_END, startNote, tiers, type Format } from "../data";
import { FORMAT_EVENT } from "./TierButton";
import { useNow } from "./useNow";

type Field = "name" | "phone";
type Errors = Partial<Record<Field, string>>;

// Uzbek numbers are grouped as +998 XX XXX XX XX. Local habits are normalised: a trunk "0" or "8"
// typed before the operator code is dropped ("8 90…" and "090…" both mean +998 90…), except "88",
// which is itself an operator code. Anything starting with "+" and another country code is kept as typed.
function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (!d) return raw.trim().startsWith("+") ? "+" : "";
  if (raw.trim().startsWith("+") && !d.startsWith("998")) {
    // "+", "+9", "+99" are on the way to +998 — leave them so the field can be edited freely.
    return "+" + d.slice(0, 15);
  }
  let local = d.startsWith("998") ? d.slice(3) : d;
  if (local.startsWith("0") || (local.startsWith("8") && local.length > 1 && local[1] !== "8")) local = local.slice(1);
  d = ("998" + local).slice(0, 12);
  let out = "+" + d.slice(0, 3);
  if (d.length > 3) out += " " + d.slice(3, 5);
  if (d.length > 5) out += " " + d.slice(5, 8);
  if (d.length > 8) out += " " + d.slice(8, 10);
  if (d.length > 10) out += " " + d.slice(10, 12);
  return out;
}

function validate(field: Field, value: string): string | undefined {
  if (field === "name") {
    const letters = value.match(/\p{L}/gu) ?? [];
    return letters.length < 2 ? "Ismingizni kiriting — kamida 2 ta harf." : undefined;
  }
  const d = value.replace(/\D/g, "");
  if (d.startsWith("998")) {
    return d.length === 12 ? undefined : "Raqam toʻliq emas: +998 dan keyin 9 ta raqam boʻlishi kerak.";
  }
  return d.length >= 8 && d.length <= 15 ? undefined : "Raqamni toʻliq kiriting, masalan +998 90 123 45 67.";
}

export function StartNote({ serverNow }: { serverNow: number }) {
  return <>{startNote(useNow(serverNow, 60_000))}</>;
}

export default function CourseForm({ telegramUrl, serverNow }: { telegramUrl: string; serverNow: number }) {
  const now = useNow(serverNow, 30_000);
  const onSale = now < SALE_END;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [format, setFormat] = useState<Format>("oflayn"); // recommended tier
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [done, setDone] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onPick = (e: Event) => setFormat((e as CustomEvent<Format>).detail);
    window.addEventListener(FORMAT_EVENT, onPick);
    return () => window.removeEventListener(FORMAT_EVENT, onPick);
  }, []);

  // While typing, only clear a field's error once it is fixed; new errors wait for blur or submit.
  function update(field: Field, value: string) {
    (field === "name" ? setName : setPhone)(value);
    if (errors[field] && !validate(field, value)) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function check(field: Field, value: string) {
    const digits = value.replace(/\D/g, "");
    if (field === "phone" && digits.length <= 3) return; // untouched "+998 " prefix
    if (field === "name" && !value.trim()) return;
    setErrors((e) => ({ ...e, [field]: validate(field, value) }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = { name: validate("name", name), phone: validate("phone", phone) };
    setErrors(next);
    if (next.name) return nameRef.current?.focus();
    if (next.phone) return phoneRef.current?.focus();

    setSending(true);
    setFailed(false);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone, format }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setDone(true);
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="success" role="status">
        <span className="script">Rahmat, {name.trim()}!</span>
        <p>Arizangiz qabul qilindi. Administrator tez orada siz bilan bogʻlanadi.</p>
        <a href={telegramUrl} className="btn btn-outline btn-plain" target="_blank" rel="noopener noreferrer">
          Menejerga Telegramda yozish
        </a>
      </div>
    );
  }

  return (
    <form className="apply-form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="ism">Ismingiz</label>
        <input
          id="ism"
          ref={nameRef}
          type="text"
          placeholder="Ism"
          autoComplete="name"
          maxLength={100}
          value={name}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "ism-err" : undefined}
          onChange={(e) => update("name", e.target.value)}
          onBlur={(e) => check("name", e.target.value)}
        />
        {errors.name && (
          <span className="field-error" id="ism-err">
            {errors.name}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="tel">Telefon raqamingiz</label>
        <input
          id="tel"
          ref={phoneRef}
          type="tel"
          inputMode="tel"
          placeholder="+998 __ ___ __ __"
          autoComplete="tel"
          value={phone}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "tel-err" : undefined}
          onFocus={() => !phone && setPhone("+998 ")}
          onChange={(e) => update("phone", formatPhone(e.target.value))}
          onBlur={(e) => check("phone", e.target.value)}
        />
        {errors.phone && (
          <span className="field-error" id="tel-err">
            {errors.phone}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="tarif">Qatnashish formati</label>
        <select id="tarif" value={format} onChange={(e) => setFormat(e.target.value as Format)}>
          {tiers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label.split(" · ")[0]} — {onSale ? t.price : t.fullPrice} soʻm
            </option>
          ))}
        </select>
      </div>
      {failed && (
        <div className="form-alert" role="alert">
          <strong>Arizani yuborib boʻlmadi.</strong> Maʼlumotlaringiz saqlanib turibdi — internet aloqasini tekshirib,
          qayta yuboring yoki menejerga Telegramda yozing.
        </div>
      )}
      <button type="submit" className="btn btn-gold" disabled={sending}>
        {sending ? "Yuborilmoqda…" : failed ? "Qayta yuborish" : "Arizani yuborish"}
      </button>
      <a href={telegramUrl} className="btn btn-outline btn-plain" target="_blank" rel="noopener noreferrer">
        Menejerga Telegramda yozish
      </a>
      <p className="consent">Tugmani bosib, maʼlumotlaringiz qayta ishlanishiga va siz bilan bogʻlanishimizga rozilik bildirasiz.</p>
    </form>
  );
}
