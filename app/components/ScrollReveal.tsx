"use client";

import { useEffect } from "react";

// What fades up as it scrolls into view. The hero is left alone.
const TARGETS = [
  ".display",
  ".kicker",
  ".included-lead",
  ".certs-title",
  ".certs-lead",
  ".grads-q",
  ".grads-claim",
  ".apply-lead",
  ".inner-voice",
  ".modules-close",
  ".fact",
  ".letter-card",
  ".num-card",
  ".about-card",
  ".about-list li",
  ".intro-module",
  ".module",
  ".format",
  ".cert",
  ".path",
  ".tier",
  ".countdown",
  ".marquees",
  ".faq-list",
  ".apply-form",
]
  .map((s) => `main > section:not(.hero) ${s}`)
  .join(",");

const STAGGER = 60; // ms between items that enter together
const MAX_STAGGER = 5; // later items share the last delay, so nothing waits long

// Plays once per element. Uses element.animate() so it layers over the cards'
// own `animation` (card light) and `transition` (hover) instead of replacing them.
export default function ScrollReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Only hide what is still below the fold, so nothing on screen blinks out at load
    // and skip anything inside another target, so opacity never compounds.
    const pending = [...document.querySelectorAll<HTMLElement>(TARGETS)].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight && !el.parentElement?.closest(TARGETS),
    );
    pending.forEach((el) => el.setAttribute("data-reveal", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => {
            const ra = a.getBoundingClientRect();
            const rb = b.getBoundingClientRect();
            return ra.top - rb.top || ra.left - rb.left; // reading order: rows, then columns
          });

        entering.forEach((el, i) => {
          observer.unobserve(el);
          el.animate(
            reduce
              ? [{ opacity: 0 }, { opacity: 1 }]
              : [
                  { opacity: 0, translate: "0 16px" },
                  { opacity: 1, translate: "0 0" },
                ],
            {
              duration: reduce ? 400 : 600,
              delay: Math.min(i, MAX_STAGGER) * STAGGER,
              easing: reduce ? "ease" : "cubic-bezier(0.23, 1, 0.32, 1)", // --ease-out
              fill: "backwards",
            },
          );
          el.removeAttribute("data-reveal");
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
