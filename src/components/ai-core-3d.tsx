"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Brain, Cpu, Network, Sparkles } from "lucide-react";

/**
 * AICore3D — a unique, CSS-based 3D animated "AI Core" for the hero.
 * Multiple counter-rotating rings on different 3D axes, a pulsing central
 * gradient orb, orbiting tech-icon nodes, a shimmer sweep, and mouse
 * parallax tilt. Pure CSS 3D (no WebGL) — performant + striking.
 */
export function AICore3D() {
  // mouse parallax
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.5 });
  const rotateY = useTransform(sx, [0, 1], [-18, 18]);
  const rotateX = useTransform(sy, [0, 1], [14, -14]);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div
      className="relative grid place-items-center py-10"
      style={{ perspective: 900 }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* idle float */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ambient glow behind core */}
          <motion.div
            className="pointer-events-none absolute -inset-16 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(from var(--primary) l c h / 0.35), transparent 65%)",
            }}
            animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ===== Rotating rings (different 3D axes) ===== */}
          {/* Ring 1 — horizontal (rotateX 75) */}
          <motion.div
            className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/40"
            style={{ transform: "rotateX(75deg)" }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          />
          {/* Ring 2 — vertical (rotateY 75) */}
          <motion.div
            className="absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30"
            style={{ transform: "rotateY(75deg)" }}
            animate={{ rotateZ: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          {/* Ring 3 — tilted (rotateX 60 rotateZ 30) */}
          <motion.div
            className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/20"
            style={{ transform: "rotateX(60deg) rotateZ(30deg)" }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />

          {/* ===== Central pulsing orb ===== */}
          <motion.div
            className="relative grid size-40 place-items-center rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, oklch(from var(--primary) l c h / 0.9), oklch(from var(--primary) l c h / 0.3) 60%, transparent 80%)",
              boxShadow:
                "0 0 60px oklch(from var(--primary) l c h / 0.5), inset 0 0 30px oklch(from var(--primary) l c h / 0.3)",
            }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* core icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="size-12 text-primary-foreground" strokeWidth={1.5} />
            </motion.div>
            {/* shimmer sweep */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full overflow-hidden"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="absolute -inset-1/2"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, oklch(1 0 0 / 0.25) 12%, transparent 25%)",
                }}
              />
            </motion.div>
          </motion.div>

          {/* ===== Orbiting tech nodes ===== */}
          <OrbitNode
            icon={<Cpu className="size-4" />}
            label="PyTorch"
            radius={120}
            duration={14}
            delay={0}
            axis={0}
          />
          <OrbitNode
            icon={<Network className="size-4" />}
            label="RAG"
            radius={120}
            duration={14}
            delay={-3.5}
            axis={0}
          />
          <OrbitNode
            icon={<Sparkles className="size-4" />}
            label="LLM"
            radius={120}
            duration={14}
            delay={-7}
            axis={0}
          />
          <OrbitNode
            icon={<Cpu className="size-4" />}
            label="BERT"
            radius={120}
            duration={14}
            delay={-10.5}
            axis={0}
          />

          {/* floating data particles */}
          {[
            { x: -90, y: -70, d: 0 },
            { x: 95, y: -60, d: 1 },
            { x: -80, y: 80, d: 2 },
            { x: 85, y: 75, d: 1.5 },
          ].map((p, i) => (
            <motion.span
              key={i}
              className="absolute size-1.5 rounded-full bg-primary"
              style={{ left: "50%", top: "50%", x: p.x, y: p.y }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: p.d,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function OrbitNode({
  icon,
  label,
  radius,
  duration,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  radius: number;
  duration: number;
  delay: number;
  axis: number;
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ x: -16, y: -16 }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    >
      <div
        className="relative"
        style={{ transform: `translateX(${radius}px)` }}
      >
        {/* counter-rotate so the badge stays upright */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration, repeat: Infinity, ease: "linear", delay }}
          className="flex items-center gap-1 rounded-full border border-primary/40 bg-card/90 px-2.5 py-1 shadow-lg backdrop-blur"
        >
          <span className="text-primary">{icon}</span>
          <span className="font-mono text-[10px] font-medium text-foreground">
            {label}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
