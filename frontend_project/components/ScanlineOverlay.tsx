// components/ScanlineOverlay.tsx
"use client";
import { useEffect, useRef } from "react";

export default function ScanlineOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf: number;
    let offset = 0;

    const tick = () => {
      offset = (offset + 0.4) % 4; // kecepatan scanline
      el.style.backgroundPositionY = `${offset}px`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex:  3,
        opacity: 0.018, // sangat subtle, tidak mengganggu konten
        backgroundImage: `repeating-linear-gradient(
          to bottom,
          transparent         0px,
          transparent         3px,
          rgba(0, 0, 0, 1)    3px,
          rgba(0, 0, 0, 1)    4px
        )`,
        backgroundSize: "100% 4px",
      }}
    />
  );
}