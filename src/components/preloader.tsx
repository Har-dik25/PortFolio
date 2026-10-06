"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader — a full-screen, professional brand reveal.
 * Large animated "H" monogram that draws itself, surrounded by a
 * rotating dashed ring + progress ring + orbiting dot, a pulsing
 * neural-network node background, and a progress bar. Bigger and
 * more cinematic than the previous version. Fades out on window load.
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

  const circumference = 2 * Math.PI * 70;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
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
            {/* monogram + rings (bigger now) */}
            <div className="relative grid place-items-center size-48">
              {/* outer dashed ring (rotating) */}
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-primary/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              {/* mid dashed ring (counter-rotating) */}
              <motion.div
                className="absolute inset-4 rounded-full border border-dashed border-primary/25"
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              />
              {/* progress ring */}
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="oklch(from var(--primary) l c h / 0.12)"
                  strokeWidth="2.5"
                />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{
                    strokeDashoffset: circumference * (1 - progress / 100),
                  }}
                  transition={{ ease: "easeOut", duration: 0.25 }}
                  style={{ filter: "drop-shadow(0 0 6px var(--primary))" }}
                />
              </svg>

              {/* orbiting dot */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
              </motion.div>

              {/* animated "H" monogram (draws itself) */}
              <svg viewBox="0 0 100 100" className="size-20">
                <motion.path
                  d="M 25 15 L 25 85 M 25 50 L 75 50 M 75 15 L 75 85"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
              </svg>

              {/* shimmer sweep */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-full"
                animate={{ opacity: [0, 0.7, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, oklch(from var(--primary) l c h / 0.25), transparent 60%)",
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

/** Subtle animated neural-network node background. */
function NeuralBackground() {
  // Deterministic positions (no Math.random — avoids SSR hydration mismatch)
  // Rounded to 2 decimals to avoid float-precision differences between server/client
  const nodes = React.useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
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
      {/* faint connecting lines */}
      {nodes.slice(0, 8).map((n, i) => {
        const next = nodes[(i + 1) % 8];
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
