"use client";

import { useEffect, useRef } from "react";
import { ESG } from "../data/esg";

export function EsgFilm({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.pause();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={ESG.videoSrc}
      poster={ESG.posterSrc}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={ESG.filmLabel}
    />
  );
}
