"use client";

import type { Format } from "../data";

export const FORMAT_EVENT = "pro:format";

// Preselects the tier in the lead form, then lets the #ariza anchor scroll there.
export default function TierButton({ format, label, featured }: { format: Format; label: string; featured?: boolean }) {
  return (
    <a
      href="#ariza"
      className={`btn ${featured ? "btn-gold" : "btn-outline"}`}
      onClick={() => window.dispatchEvent(new CustomEvent<Format>(FORMAT_EVENT, { detail: format }))}
    >
      {label}
    </a>
  );
}
