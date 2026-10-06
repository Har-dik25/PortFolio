"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader — a full-screen 3D animated loading overlay shown on first paint.
 * A spinning 3D cube + orbiting ring + monogram + progress bar. Fades out
 * once the window has loaded (or after a max fallback timeout).
 */
export function Preloader() {
  const [done, setDone] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // Animate a progress bar for tactile feedback.
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 18 + 6);
      setProgress(Math.round(p));
      if (p >= 100) clearInterval(id);
    }, 140);

    const finish = () => {
      setProgress(100);
      // small delay so the bar visibly fills before fade
      setTimeout(() => setDone(true), 320);
    };

    // Finish when window load fires, or fallback after 2.6s.
    if (document.readyState === "complete") {
      const t = setTimeout(finish, 700);
      return () => {
        clearTimeout(t);
        clearInterval(id);
      };
    }
    const onLoad = () => finish();
    const fallback = setTimeout(finish, 2600);
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
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* subtle backdrop glow */}
          <div
            className="pointer-events-none absolute inset-0 glow-amber opacity-60"
            aria-hidden
          />

          <div className="relative flex flex-col items-center gap-6">
            {/* 3D cube + orbit */}
            <div className="scene-3d grid place-items-center">
              <div className="relative">
                <div className="orbit-3d" />
                <div
                  className="cube-3d"
                  style={{ width: 96, height: 96, animationDuration: "6s" }}
                >
                  <div
                    className="face front"
                    style={{ fontSize: "1.4rem", transform: "translateZ(48px)" }}
                  >
                    H
                  </div>
                  <div
                    className="face back"
                    style={{
                      fontSize: "1.4rem",
                      transform: "rotateY(180deg) translateZ(48px)",
                    }}
                  >
                    AI
                  </div>
                  <div
                    className="face right"
                    style={{
                      fontSize: "1.4rem",
                      transform: "rotateY(90deg) translateZ(48px)",
                    }}
                  >
                    ML
                  </div>
                  <div
                    className="face left"
                    style={{
                      fontSize: "1.4rem",
                      transform: "rotateY(-90deg) translateZ(48px)",
                    }}
                  >
                    &lt;/&gt;
                  </div>
                  <div
                    className="face top"
                    style={{
                      fontSize: "1.4rem",
                      transform: "rotateX(90deg) translateZ(48px)",
                    }}
                  >
                    ★
                  </div>
                  <div
                    className="face bottom"
                    style={{
                      fontSize: "1.4rem",
                      transform: "rotateX(-90deg) translateZ(48px)",
                    }}
                  >
                    ◆
                  </div>
                </div>
              </div>
            </div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-center"
            >
              <div className="font-semibold tracking-tight">
                Hardik<span className="text-primary">.</span>
              </div>
              <div className="mt-0.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                AI / ML Engineer
              </div>
            </motion.div>

            {/* Progress */}
            <div className="w-48">
              <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                />
              </div>
              <div className="mt-2 text-center font-mono text-[10px] tabular-nums text-muted-foreground">
                {progress}% · loading workspace
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
