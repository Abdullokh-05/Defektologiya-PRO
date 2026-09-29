import type { CSSProperties } from "react";
import { graduates } from "../data";

type Review = (typeof graduates)[number];

// "Dilnoza Karimova" → "DK"; works with Uzbek letters like Oʻ and Gʻ.
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => Array.from(w)[0].toUpperCase())
    .join("");
}

// Every card shows the same fields (quote, initials, name) so all cards are the same
// shape. The role line is kept in data.ts but not shown until every review has one.
function Card({ g, hidden }: { g: Review & { name: string }; hidden?: boolean }) {
  return (
    <figure className="grad" aria-hidden={hidden || undefined}>
      <span className="grad-mark" aria-hidden="true">
        “
      </span>
      <blockquote className="grad-text">{g.text}</blockquote>
      <figcaption className="grad-author">
        <span className="grad-avatar" aria-hidden="true">
          {initials(g.name)}
        </span>
        <span className="grad-who">
          <span className="grad-name">{g.name}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/*
 * Endless marquee row: the list is rendered twice side by side and the track slides left
 * by exactly one copy (-50%), so the loop point is invisible. Speed scales with the
 * number of cards per copy (see --count in CSS).
 */
function Row({
  items,
  unique,
  offset,
  hidden,
}: {
  items: (Review & { name: string })[];
  unique: number;
  offset?: boolean;
  hidden?: boolean;
}) {
  return (
    <div className={`marquee${offset ? " marquee--offset" : ""}`} aria-hidden={hidden || undefined}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy} aria-hidden={copy === 1 || undefined}>
            {items.map((g, i) => (
              // repeats beyond the first pass are hidden from screen readers
              <Card g={g} key={i} hidden={i >= unique} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Each copy needs enough cards to be wider than a large screen, otherwise a gap shows
// at the loop point. Short lists are repeated until they reach this many cards.
const MIN_CARDS = 8;

// Two rows in a brick pattern: the second row runs half a card behind the first and
// starts from the middle of the list, so the review below a card is a different one.
export default function Graduates() {
  // Only reviews with a name are shown; the rest stay in data.ts until names arrive.
  const shown = graduates.filter((g): g is Review & { name: string } => Boolean(g.name));
  if (shown.length === 0) return null;

  const repeats = Math.ceil(MIN_CARDS / shown.length);
  const first = Array.from({ length: repeats }, () => shown).flat();
  const half = Math.ceil(shown.length / 2);
  const second = Array.from({ length: repeats }, () => [...shown.slice(half), ...shown.slice(0, half)]).flat();

  return (
    <div
      className="marquees"
      role="region"
      aria-label="Bitiruvchilar fikrlari"
      style={{ "--count": first.length } as CSSProperties}
    >
      <Row items={first} unique={shown.length} />
      <Row items={second} unique={shown.length} offset hidden />
    </div>
  );
}
