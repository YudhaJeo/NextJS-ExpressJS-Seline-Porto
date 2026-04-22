// components/SnowOverlay.tsx
"use client";
import { useEffect, useRef } from "react";

interface Flake {
  x: number;
  y: number;
  r: number;        // radius
  speed: number;
  drift: number;
  opacity: number;
  twinkle: number;
  twinkleSpeed: number;
  pixel: boolean;   // pixel square vs round
}

export default function SnowOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;

    canvas.width  = W;
    canvas.height = H;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener("resize", resize);

    const FLAKES = 120;
    const flakes: Flake[] = Array.from({ length: FLAKES }, () => ({
      x:           Math.random() * W,
      y:           Math.random() * H,
      r:           Math.random() * 2.5 + 0.5,
      speed:       Math.random() * 0.8 + 0.2,
      drift:       (Math.random() - 0.5) * 0.4,
      opacity:     Math.random() * 0.6 + 0.2,
      twinkle:     Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.04 + 0.01,
      pixel:       Math.random() > 0.6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const f of flakes) {
        f.twinkle += f.twinkleSpeed;
        const alpha = f.opacity * (0.7 + 0.3 * Math.sin(f.twinkle));

        if (f.pixel) {
          // Pixel-square snowflake
          const size = Math.round(f.r) * 2;
          ctx.fillStyle = `rgba(200, 160, 255, ${alpha})`;
          ctx.fillRect(Math.round(f.x), Math.round(f.y), size, size);
        } else {
          // Soft round snowflake with glow
          const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 2);
          grad.addColorStop(0, `rgba(230, 200, 255, ${alpha})`);
          grad.addColorStop(0.5, `rgba(180, 100, 255, ${alpha * 0.5})`);
          grad.addColorStop(1, `rgba(157, 78, 221, 0)`);
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r * 2, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        f.y += f.speed;
        f.x += f.drift + Math.sin(f.twinkle * 0.5) * 0.2;

        if (f.y > H + 10) {
          f.y = -10;
          f.x = Math.random() * W;
        }
        if (f.x < -10) f.x = W + 10;
        if (f.x > W + 10) f.x = -10;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2, opacity: 0.85 }}
    />
  );
}