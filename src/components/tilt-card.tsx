"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * TiltCard — a 3D mouse-tracking tilt card with a glare highlight.
 * Pointer movement over the card rotates it on X/Y axes (perspective),
 * and a radial glare follows the cursor for a glossy, tactile feel.
 */
export function TiltCard({
  children,
  className,
  max = 10,
  glare = true,
  scale = 1.0,
}: {
  children: React.ReactNode;
  className?: string;
  /** max tilt in degrees */
  max?: number;
  glare?: boolean;
  /** hover scale (1 = none) */
  scale?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  // raw motion values (0..1 pointer position within card)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // springy smoothed values for buttery motion
  const sx = useSpring(px, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 200, damping: 18, mass: 0.4 });

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);

  // glare position (percent)
  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);

  // build the radial-gradient string from motion values (hooks called at top level)
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.18), transparent 45%)`;

  const glareOpacity = useMotionValue(0);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    px.set(Math.min(1, Math.max(0, x)));
    py.set(Math.min(1, Math.max(0, y)));
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
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
      }}
      whileHover={{ scale }}
      className={cn("relative will-change-transform", className)}
    >
      {/* glare overlay */}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] overflow-hidden"
          style={{ opacity: glareOpacity }}
        >
          <motion.div className="absolute -inset-1" style={{ background: glareBg }} />
        </motion.div>
      )}
      {/* content lifted toward viewer for depth */}
      <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}
