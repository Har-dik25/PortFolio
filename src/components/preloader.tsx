"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader — a cinematic full-screen brand reveal.
 * Features a 3D rotating wireframe icosahedron built from CSS 3D transforms
 * (no WebGL), surrounded by orbiting rings, an animated "H" monogram at the
 * center, a neural-network node background, and a progress bar.
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
            {/* 3D wireframe icosahedron + monogram */}
            <div
              className="relative grid place-items-center size-56"
              style={{ perspective: 800 }}
            >
              {/* outer rotating dashed ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-primary/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              {/* progress ring */}
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="oklch(from var(--primary) l c h / 0.12)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 92}
                  initial={{ strokeDashoffset: 2 * Math.PI * 92 }}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 92 * (1 - progress / 100),
                  }}
                  transition={{ ease: "easeOut", duration: 0.25 }}
                  style={{ filter: "drop-shadow(0 0 6px var(--primary))" }}
                />
              </svg>

              {/* 3D wireframe icosahedron — 12 vertices as a rotating 3D shape */}
              <motion.div
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateX: 360, rotateY: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              >
                <IcosahedronWire />
              </motion.div>

              {/* center "H" monogram (stays on top, not rotating) */}
              <div className="absolute grid place-items-center">
                <motion.svg viewBox="0 0 100 100" className="size-16">
                  <motion.path
                    d="M 25 15 L 25 85 M 25 50 L 75 50 M 75 15 L 75 85"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.4, ease: "easeInOut" }}
                    style={{ filter: "drop-shadow(0 0 8px var(--primary))" }}
                  />
                </motion.svg>
              </div>

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
 * A CSS-3D wireframe icosahedron — 12 vertices connected by edges.
 * Built from positioned dots + lines using transform-style: preserve-3d.
 */
function IcosahedronWire() {
  // 12 vertices of a regular icosahedron (normalized to size ~70px radius)
  const phi = (1 + Math.sqrt(5)) / 2;
  const r = 56;
  const norm = Math.sqrt(1 + phi * phi);
  const verts = [
    [-1, phi, 0],
    [1, phi, 0],
    [-1, -phi, 0],
    [1, -phi, 0],
    [0, -1, phi],
    [0, 1, phi],
    [0, -1, -phi],
    [0, 1, -phi],
    [phi, 0, -1],
    [phi, 0, 1],
    [-phi, 0, -1],
    [-phi, 0, 1],
  ].map(([x, y, z]) => [
    Math.round((x / norm) * r * 100) / 100,
    Math.round((y / norm) * r * 100) / 100,
    Math.round((z / norm) * r * 100) / 100,
  ]);

  // edges (pairs of vertex indices that form the 30 edges)
  const edges: [number, number][] = [
    [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
    [1, 5], [1, 7], [1, 8], [1, 9],
    [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
    [3, 4], [3, 6], [3, 8], [3, 9],
    [4, 5], [4, 9], [4, 11],
    [5, 9], [5, 11],
    [6, 7], [6, 8], [6, 10],
    [7, 8], [7, 10],
    [8, 9],
    [10, 11],
  ];

  return (
    <div className="relative size-0" style={{ transformStyle: "preserve-3d" }}>
      {/* vertices */}
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
      {/* edges (rendered as thin rotated divs) */}
      {edges.map(([a, b], i) => {
        const va = verts[a];
        const vb = verts[b];
        const dx = vb[0] - va[0];
        const dy = vb[1] - va[1];
        const dz = vb[2] - va[2];
        const len = Math.round(Math.sqrt(dx * dx + dy * dy + dz * dz) * 100) / 100;
        // midpoint (rounded)
        const mx = Math.round(((va[0] + vb[0]) / 2) * 100) / 100;
        const my = Math.round(((va[1] + vb[1]) / 2) * 100) / 100;
        const mz = Math.round(((va[2] + vb[2]) / 2) * 100) / 100;
        // angles (rounded)
        const rotZ = Math.round(Math.atan2(dy, dx) * (180 / Math.PI) * 100) / 100;
        const rotY = Math.round(Math.atan2(dz, Math.sqrt(dx * dx + dy * dy)) * (180 / Math.PI) * 100) / 100;
        return (
          <div
            key={`e-${i}`}
            className="absolute top-1/2 left-1/2"
            style={{
              width: `${len}px`,
              height: "1px",
              background: "oklch(from var(--primary) l c h / 0.4)",
              transformOrigin: "0 0",
              transform: `translate3d(${mx - len / 2}px, ${my}px, ${mz}px) rotateZ(${rotZ}deg) rotateY(${rotY}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}

/** Subtle animated neural-network node background. */
function NeuralBackground() {
  // Deterministic positions (no Math.random — avoids SSR hydration mismatch)
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
