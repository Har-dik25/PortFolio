"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { profile } from "@/lib/portfolio-data";

/**
 * Avatar3D — a 3D animated photo card.
 * - Mouse-tracking perspective tilt (X/Y axes)
 * - Parallax depth: the photo, the ring, the glow, and the floating
 *   tech-orbit badges all sit on different Z-layers and shift independently
 *   as the cursor moves, giving a real "lifted from the page" feel.
 * - Continuous idle float + slow spin on the orbit ring.
 * - Glare highlight follows the cursor.
 */
export function Avatar3D() {
  const ref = React.useRef<HTMLDivElement>(null);

  // pointer position 0..1
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const sx = useSpring(px, { stiffness: 180, damping: 18, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 180, damping: 18, mass: 0.5 });

  // card tilt
  const rotateX = useTransform(sy, [0, 1], [12, -12]);
  const rotateY = useTransform(sx, [0, 1], [-12, 12]);

  // parallax offsets per layer (further layers move more)
  const photoX = useTransform(sx, [0, 1], [-6, 6]);
  const photoY = useTransform(sy, [0, 1], [-6, 6]);
  const ringX = useTransform(sx, [0, 1], [10, -10]);
  const ringY = useTransform(sy, [0, 1], [10, -10]);
  const glowX = useTransform(sx, [0, 1], ["20%", "80%"]);
  const glowY = useTransform(sy, [0, 1], ["20%", "80%"]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.22), transparent 50%)`;
  const glareOpacity = useMotionValue(0);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)));
    py.set(Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)));
  }
  function handleEnter() {
    glareOpacity.set(1);
  }
  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  }

  return (
    <div className="scene-3d grid place-items-center py-6" style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* idle float wrapper */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ambient glow behind the photo */}
          <motion.div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/20 blur-3xl"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* rotating dashed orbit ring (back layer) */}
          <motion.div
            aria-hidden
            className="absolute -inset-5 rounded-full border border-dashed border-primary/30"
            style={{
              transform: "translateZ(-40px)",
              rotateX: 72,
            }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />

          {/* main photo card */}
          <motion.div
            style={{ x: photoX, y: photoY, transform: "translateZ(60px)" }}
            className="relative size-56 sm:size-64 rounded-[2rem] overflow-hidden border border-border/70 shadow-2xl bg-card"
          >
            <img
              src="/hardik-avatar.jpg"
              alt={`${profile.name} — ${profile.title}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
            {/* color grade overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-transparent mix-blend-overlay" />
            {/* glare */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ opacity: glareOpacity, background: glareBg }}
            />
            {/* bottom name bar inside the card */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
              <div className="font-semibold text-white tracking-tight">
                {profile.name}
              </div>
              <div className="text-xs text-white/80">{profile.title}</div>
            </div>
          </motion.div>

          {/* floating tech badges on the orbit (front layer) */}
          <FloatingBadge
            label="Python"
            className="-left-8 top-6"
            style={{ x: ringX, y: ringY, transform: "translateZ(90px)" }}
            delay={0}
          />
          <FloatingBadge
            label="LLM"
            className="-right-6 top-10"
            style={{ x: ringX, y: ringY, transform: "translateZ(110px)" }}
            delay={0.4}
          />
          <FloatingBadge
            label="RAG"
            className="-right-8 -bottom-2"
            style={{ x: ringX, y: ringY, transform: "translateZ(90px)" }}
            delay={0.8}
          />
          <FloatingBadge
            label="NLP"
            className="-left-6 -bottom-4"
            style={{ x: ringX, y: ringY, transform: "translateZ(110px)" }}
            delay={1.2}
          />

          {/* status pill (front-top) */}
          <motion.div
            style={{ transform: "translateZ(120px)" }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium shadow-lg"
          >
            <span className="relative flex size-2">
              <span className="pulse-dot absolute inline-flex size-2 rounded-full bg-green-400" />
              <span className="relative inline-flex size-2 rounded-full bg-green-400" />
            </span>
            available
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FloatingBadge({
  label,
  className,
  style,
  delay,
}: {
  label: string;
  className: string;
  style: React.CSSProperties;
  delay: number;
}) {
  return (
    <motion.div
      style={style as never}
      className={`absolute ${className}`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div className="rounded-full border border-primary/30 bg-card/90 px-2.5 py-1 font-mono text-[10px] font-medium text-primary shadow-lg backdrop-blur">
        {label}
      </div>
    </motion.div>
  );
}
