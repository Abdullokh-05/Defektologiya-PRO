"use client";

import { useEffect, useState } from "react";

const PlayIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default function VideoButton({ videoUrl }: { videoUrl: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isFile = /\.(mp4|webm|mov)(\?|$)/i.test(videoUrl);

  return (
    <>
      <button type="button" className="play" aria-label="Taqdimot videosini koʻrish" onClick={() => setOpen(true)}>
        <PlayIcon />
      </button>
      {open && (
        <div className="modal" role="dialog" aria-modal="true" aria-label="Taqdimot videosi" onClick={() => setOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" aria-label="Yopish" onClick={() => setOpen(false)}>
              ×
            </button>
            {isFile ? (
              <video src={videoUrl} controls autoPlay playsInline />
            ) : (
              <iframe src={videoUrl} title="Taqdimot videosi" allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
            )}
          </div>
        </div>
      )}
    </>
  );
}
