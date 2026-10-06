"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader — a clean, professional amber-themed brand reveal.
 * An animated "H" monogram draws itself inside a ring, with orbiting
 * dots, a sweeping shimmer, and a progress counter. Fades out once the
 * window has loaded (or after a fallback timeout).
 */
export function Preloader() {
  const [done, setDone] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 16 + 5);
      setProgress(Math.round(p));
      if (p >= 100) clearInterval(id);
    }, 130);

    const finish = () => {
      setProgress(100);
      setTimeout(() => setDone(true), 300);
    };

    if (document.readyState === "complete") {
      const t = setTimeout(finish, 600);
      return () => {
        clearTimeout(t);
        clearInterval(id);
      };
    }
    const onLoad = () => finish();
    const fallback = setTimeout(finish, 2400);
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
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {/* ambient backdrop glow */}
          <div
            className="pointer-events-none absolute inset-0 glow-amber opacity-70"
            aria-hidden
          />

          <div className="relative flex flex-col items-center gap-7">
            {/* monogram + ring + orbiting dots */}
            <div className="relative grid place-items-center size-28">
              {/* outer dashed ring (rotating) */}
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-primary/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              {/* progress ring (draws as progress increases) */}
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="oklch(from var(--primary) l c h / 0.12)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 46}
                  initial={{ strokeDashoffset: 2 * Math.PI * 46 }}
                  animate={{
                    strokeDashoffset:
                      2 * Math.PI * 46 * (1 - progress / 100),
                  }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                />
              </svg>

              {/* orbiting dot */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
              </motion.div>

              {/* animated "H" monogram (draws itself) */}
              <svg viewBox="0 0 100 100" className="size-12">
                <motion.path
                  d="M 25 15 L 25 85 M 25 50 L 75 50 M 75 15 L 75 85"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </svg>

              {/* shimmer sweep across the monogram */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-full"
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, oklch(from var(--primary) l c h / 0.3), transparent 60%)",
                }}
              />
            </div>

            {/* name + role */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-lg font-semibold tracking-tight">
                Hardik<span className="text-primary">.</span>
              </div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                AI / ML Engineer
              </div>
            </motion.div>

            {/* progress bar + counter */}
            <div className="w-52">
              <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.25 }}
                />
              </div>
              <div className="mt-2 text-center font-mono text-[10px] tabular-nums text-muted-foreground">
                {progress}% · loading
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
