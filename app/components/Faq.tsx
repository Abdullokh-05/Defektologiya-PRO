"use client";

import { useState, type ReactNode } from "react";

// Answers are plain text, or rich content such as the abbreviations list.
export default function Faq({ items }: { items: [string, ReactNode][] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-list">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div className="faq-item" key={q}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              aria-controls={`faq-a-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{q}</span>
              <span className="faq-sign" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {/* Kept mounted so the answer can animate open and closed */}
            <div className="faq-panel" data-open={isOpen} inert={!isOpen}>
              <div className="faq-panel-inner">
                {typeof a === "string" ? (
                  <p className="faq-a" id={`faq-a-${i}`}>
                    {a}
                  </p>
                ) : (
                  <div className="faq-a" id={`faq-a-${i}`}>
                    {a}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
