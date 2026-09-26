"use client";

import { useEffect, useRef } from "react";

interface Flake {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  a: number;
}

export default function SnowCanvas({ active = true }: { active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];
    let frame = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      width = Math.min(parent?.clientWidth ?? window.innerWidth, 430);
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(18, Math.round((width * height) / 26000));
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.7 + Math.random() * 1.7,
        vy: 0.12 + Math.random() * 0.34,
        vx: (Math.random() - 0.5) * 0.16,
        a: 0.12 + Math.random() * 0.3,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const f of flakes) {
        f.y += f.vy;
        f.x += f.vx;
        if (f.y > height + 4) {
          f.y = -4;
          f.x = Math.random() * width;
        }
        if (f.x < -4) f.x = width + 4;
        if (f.x > width + 4) f.x = -4;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${f.a})`;
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (active) frame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    if (!active) return;
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
    };
  }, [active]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
