"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader — a cinematic full-screen brand reveal.
 * NO "H" monogram. Uses a unique 3D animated hexagonal core that
 * morphs + pulses, surrounded by orbiting rings, a neural-network
 * node background, and a progress bar.
 */
export function Preloader() {
  const [done, setDone] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 14 + 4);
      setProgress(Math.round(p));
      if (p >= 100) clearInterval(id);
    }, 110);

    const finish = () => {
      setProgress(100);
      setTimeout(() => setDone(true), 280);
    };

    if (document.readyState === "complete") {
      const t = setTimeout(finish, 500);
      return () => {
        clearTimeout(t);
        clearInterval(id);
      };
    }
    const onLoad = () => finish();
    const fallback = setTimeout(finish, 2200);
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(fallback);
      clearInterval(id);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* animated neural network node background */}
          <NeuralBackground />

          {/* ambient glow */}
          <div
            className="pointer-events-none absolute inset-0 glow-amber opacity-80"
            aria-hidden
          />

          <div className="relative flex flex-col items-center gap-8">
            {/* 3D morphing hexagonal core + orbiting rings */}
            <div
              className="relative grid place-items-center size-56"
              style={{ perspective: 900 }}
            >
              {/* outer rotating dashed ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-primary/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              {/* counter-rotating mid ring */}
              <motion.div
                className="absolute inset-4 rounded-full border border-primary/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              />
              {/* progress ring */}
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="oklch(from var(--primary) l c h / 0.12)"
                  strokeWidth="2.5"
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 92}
                  initial={{ strokeDashoffset: 2 * Math.PI * 92 }}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 92 * (1 - progress / 100),
                  }}
                  transition={{ ease: "easeOut", duration: 0.25 }}
                  style={{ filter: "drop-shadow(0 0 8px var(--primary))" }}
                />
              </svg>

              {/* 3D morphing hexagonal core — rotating + scaling */}
              <motion.div
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateX: 360, rotateY: 360, scale: [1, 1.08, 1] }}
                transition={{
                  rotateX: { duration: 12, repeat: Infinity, ease: "linear" },
                  rotateY: { duration: 9, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <HexCore />
              </motion.div>

              {/* pulsing center glow (no monogram) */}
              <motion.div
                className="pointer-events-none absolute grid place-items-center"
                animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, oklch(from var(--primary) l c h / 0.8), transparent 70%)",
                }}
              />

              {/* orbiting dot */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
              </motion.div>

              {/* shimmer sweep */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-full"
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, oklch(from var(--primary) l c h / 0.2), transparent 60%)",
                }}
              />
            </div>

            {/* name + role */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-center"
            >
              <div className="text-2xl font-bold tracking-tight">
                Hardik<span className="text-primary">.</span>
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                AI / ML Engineer
              </div>
            </motion.div>

            {/* progress bar + counter */}
            <div className="w-64">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                  style={{ boxShadow: "0 0 8px var(--primary)" }}
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] tabular-nums text-muted-foreground">
                <span>initializing workspace</span>
                <span className="text-primary">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * A 3D wireframe hexagonal core — 2 nested hexagons with connecting
 * vertices, built from CSS 3D transforms. Morphs via parent rotation.
 */
function HexCore() {
  // 6 vertices of a hexagon (radius 48)
  const r = 48;
  const verts = Array.from({ length: 6 }).map((_, i) => {
    const angle = (i * 60 * Math.PI) / 180;
    return [
      Math.round((Math.cos(angle) * r) * 100) / 100,
      Math.round((Math.sin(angle) * r) * 100) / 100,
      0,
    ] as [number, number, number];
  });
  // inner hexagon (radius 24)
  const r2 = 24;
  const inner = verts.map(() => [0, 0, 0] as [number, number, number]);
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 * Math.PI) / 180;
    inner[i] = [
      Math.round((Math.cos(angle) * r2) * 100) / 100,
      Math.round((Math.sin(angle) * r2) * 100) / 100,
      0,
    ];
  }

  return (
    <div className="relative size-0" style={{ transformStyle: "preserve-3d" }}>
      {/* outer hexagon edges */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = verts[i];
        const b = verts[(i + 1) % 6];
        return <Edge key={`o-${i}`} a={a} b={b} opacity={0.6} />;
      })}
      {/* inner hexagon edges */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = inner[i];
        const b = inner[(i + 1) % 6];
        return <Edge key={`i-${i}`} a={a} b={b} opacity={0.35} />;
      })}
      {/* spokes connecting outer to inner */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Edge key={`s-${i}`} a={verts[i]} b={inner[i]} opacity={0.25} />
      ))}
      {/* vertex dots */}
      {verts.map((v, i) => (
        <div
          key={`v-${i}`}
          className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
          style={{
            transform: `translate3d(${v[0]}px, ${v[1]}px, ${v[2]}px)`,
            boxShadow: "0 0 6px var(--primary)",
          }}
        />
      ))}
      {inner.map((v, i) => (
        <div
          key={`iv-${i}`}
          className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/70"
          style={{
            transform: `translate3d(${v[0]}px, ${v[1]}px, ${v[2]}px)`,
          }}
        />
      ))}
    </div>
  );
}

function Edge({
  a,
  b,
  opacity,
}: {
  a: [number, number, number];
  b: [number, number, number];
  opacity: number;
}) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dz = b[2] - a[2];
  const len = Math.round(Math.sqrt(dx * dx + dy * dy + dz * dz) * 100) / 100;
  const mx = Math.round(((a[0] + b[0]) / 2) * 100) / 100;
  const my = Math.round(((a[1] + b[1]) / 2) * 100) / 100;
  const mz = Math.round(((a[2] + b[2]) / 2) * 100) / 100;
  const rotZ = Math.round(Math.atan2(dy, dx) * (180 / Math.PI) * 100) / 100;
  const rotY = Math.round(Math.atan2(dz, Math.sqrt(dx * dx + dy * dy)) * (180 / Math.PI) * 100) / 100;
  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        width: `${len}px`,
        height: "1.5px",
        background: `oklch(from var(--primary) l c h / ${opacity})`,
        transformOrigin: "0 0",
        transform: `translate3d(${mx - len / 2}px, ${my}px, ${mz}px) rotateZ(${rotZ}deg) rotateY(${rotY}deg)`,
      }}
    />
  );
}

/** Subtle animated neural-network node background. */
function NeuralBackground() {
  const nodes = React.useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        x: Math.round((Math.sin(i * 2.4) * 0.5 + 0.5) * 100 * 100) / 100,
        y: Math.round((Math.cos(i * 1.7) * 0.5 + 0.5) * 100 * 100) / 100,
        delay: Math.round(((i * 0.37) % 3) * 100) / 100,
        duration: Math.round((3 + ((i * 0.53) % 3)) * 100) / 100,
      })),
    []
  );

  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
      <defs>
        <radialGradient id="node-glow">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="2"
          fill="url(#node-glow)"
          animate={{ opacity: [0.1, 0.6, 0.1], r: [2, 4, 2] }}
          transition={{
            duration: n.duration,
            repeat: Infinity,
            delay: n.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      {nodes.slice(0, 10).map((n, i) => {
        const next = nodes[(i + 1) % 10];
        return (
          <line
            key={`l-${i}`}
            x1={n.x}
            y1={n.y}
            x2={next.x}
            y2={next.y}
            stroke="var(--primary)"
            strokeOpacity="0.05"
            strokeWidth="0.5"
          />
        );
      })}
    </svg>
  );
}
