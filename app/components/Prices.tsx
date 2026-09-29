"use client";

import { ENROL_END, SALE_END, tiers } from "../data";
import TierButton from "./TierButton";
import { useNow } from "./useNow";

const pad = (n: number) => String(n).padStart(2, "0");

export function Tiers({ serverNow }: { serverNow: number }) {
  const onSale = useNow(serverNow, 30_000) < SALE_END;

  return (
    <div className="tiers">
      {tiers.map((t) => (
        <div className={`tier${t.featured ? " featured" : ""}`} key={t.id}>
          {t.featured && <span className="tier-badge">Tavsiya etiladi</span>}
          <span className="tier-label">{t.label}</span>
          {onSale && (
            <s className="tier-old" aria-label={`Oldingi narx ${t.fullPrice} soʻm`}>
              {t.fullPrice} soʻm
            </s>
          )}
          <span className="tier-price">{onSale ? t.price : t.fullPrice} SOʻM</span>
          <span className="tier-note">{t.note}</span>
          <TierButton format={t.id} label={t.cta} featured={t.featured} />
        </div>
      ))}
    </div>
  );
}

// Same two phases as the previous site: sale countdown until 01.10, then enrolment countdown until 05.10.
export function Countdown({ serverNow }: { serverNow: number }) {
  const now = useNow(serverNow);
  if (now >= ENROL_END) return null;

  const onSale = now < SALE_END;
  const left = Math.max(0, Math.floor(((onSale ? SALE_END : ENROL_END) - now) / 1000));
  const units = [
    [Math.floor(left / 86400), "Kun"],
    [Math.floor((left % 86400) / 3600), "Soat"],
    [Math.floor((left % 3600) / 60), "Daqiqa"],
    [left % 60, "Soniya"],
  ] as const;

  return (
    <div className="countdown" role="timer" aria-live="off">
      <p className="countdown-heading">
        {onSale ? "Chegirmali narxda roʻyxatdan oʻtishga qoldi" : "Qabul yopilishiga qoldi:"}
      </p>
      <div className="countdown-digits">
        {units.map(([value, label], i) => (
          <div className="countdown-cell" key={label}>
            {i > 0 && (
              <span className="countdown-sep" aria-hidden="true">
                :
              </span>
            )}
            <div className="countdown-unit">
              <span className="countdown-number">{pad(value)}</span>
              <span className="countdown-label">{label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
