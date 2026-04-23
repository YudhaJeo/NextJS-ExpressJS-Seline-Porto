// components/SnowOverlay.tsx
"use client";
import { useEffect, useRef } from "react";

type FlakeKind = "pixel" | "circle" | "star" | "cross";

interface Flake {
  x: number; y: number; r: number;
  speed: number; drift: number;
  driftFreq: number; driftAmp: number;
  opacity: number; twinkle: number; twinkleSpeed: number;
  kind: FlakeKind;
  color: [number, number, number];
  rotation: number; rotSpeed: number;
}

function drawPixelStar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const s = Math.max(1, Math.round(size));
  ctx.fillRect(x - s, y - s, s * 2, s * 2);
  ctx.fillRect(x - s * 3, y - s / 2, s * 2, s);
  ctx.fillRect(x + s, y - s / 2, s * 2, s);
  ctx.fillRect(x - s / 2, y - s * 3, s, s * 2);
  ctx.fillRect(x - s / 2, y + s, s, s * 2);
}

function drawPixelCross(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const s = Math.max(1, Math.round(size));
  ctx.fillRect(x - s / 2, y - s * 3, s, s * 6);
  ctx.fillRect(x - s * 3, y - s / 2, s * 6, s);
  ctx.fillRect(x - s * 2, y - s * 2, s, s);
  ctx.fillRect(x + s, y - s * 2, s, s);
  ctx.fillRect(x - s * 2, y + s, s, s);
  ctx.fillRect(x + s, y + s, s, s);
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

    const PALETTES: [number, number, number][] = [
      [200, 160, 255],
      [157,  78, 221],
      [199, 125, 255],
      [255, 110, 247],
      [126, 255, 245],
      [230, 200, 255],
      [255, 220, 255],
    ];

    const kinds: FlakeKind[] = ["pixel", "pixel", "circle", "circle", "star", "cross", "pixel"];

    const FLAKES = 200;
    const makeFlake = (): Flake => ({
      x:            Math.random() * W,
      y:            Math.random() * H,
      r:            Math.random() * 3 + 0.5,
      speed:        Math.random() * 1.0 + 0.15,
      drift:        (Math.random() - 0.5) * 0.5,
      driftFreq:    Math.random() * 0.02 + 0.005,
      driftAmp:     Math.random() * 1.5 + 0.3,
      opacity:      Math.random() * 0.7 + 0.15,
      twinkle:      Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.05 + 0.01,
      kind:         kinds[Math.floor(Math.random() * kinds.length)],
      color:        PALETTES[Math.floor(Math.random() * PALETTES.length)],
      rotation:     Math.random() * Math.PI * 2,
      rotSpeed:     (Math.random() - 0.5) * 0.04,
    });

    const flakes: Flake[] = Array.from({ length: FLAKES }, makeFlake);
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t++;

      for (const f of flakes) {
        f.twinkle  += f.twinkleSpeed;
        f.rotation += f.rotSpeed;
        const alpha    = f.opacity * (0.6 + 0.4 * Math.sin(f.twinkle));
        const [r, g, b] = f.color;

        ctx.save();
        ctx.globalAlpha = alpha;

        const px = Math.round(f.x);
        const py = Math.round(f.y);

        switch (f.kind) {
          case "pixel": {
            const size = Math.max(1, Math.round(f.r)) * 2;
            ctx.shadowBlur  = f.r > 1.5 ? 6 : 0;
            ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
            ctx.fillStyle   = `rgb(${r},${g},${b})`;
            ctx.fillRect(px, py, size, size);
            break;
          }
          case "circle": {
            const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 3);
            grad.addColorStop(0,   `rgba(${r},${g},${b},1)`);
            grad.addColorStop(0.4, `rgba(${r},${g},${b},0.5)`);
            grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r * 3, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
            break;
          }
          case "star": {
            ctx.fillStyle   = `rgb(${r},${g},${b})`;
            ctx.shadowBlur  = 8;
            ctx.shadowColor = `rgba(${r},${g},${b},0.9)`;
            drawPixelStar(ctx, px, py, f.r * 0.7);
            break;
          }
          case "cross": {
            ctx.fillStyle   = `rgb(${r},${g},${b})`;
            ctx.shadowBlur  = 6;
            ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
            drawPixelCross(ctx, px, py, f.r * 0.5);
            break;
          }
        }

        ctx.restore();

        f.y += f.speed;
        f.x += f.drift + Math.sin(t * f.driftFreq) * f.driftAmp;

        if (f.y > H + 20) { f.y = -10; f.x = Math.random() * W; }
        if (f.x < -20)    f.x = W + 20;
        if (f.x > W + 20) f.x = -20;
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
      style={{
        // ✅ FIX: z-index 1 — di bawah konten (z-index 3) tapi di atas background
        zIndex: 1,
        opacity: 0.9,
      }}
    />
  );
}