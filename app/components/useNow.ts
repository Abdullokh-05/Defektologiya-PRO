"use client";

import { useEffect, useState } from "react";

// Starts from the server's render time (so hydration matches), then follows the browser clock.
export function useNow(serverNow: number, intervalMs = 1000) {
  const [now, setNow] = useState(serverNow);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}
