"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { TopoWaves } from "@/components/topo-waves";

// Lazy-load the heavy 3D scene (Three.js bundle) so it never blocks first paint.
const DeskScene3D = dynamic(
  () => import("@/components/desk-scene-3d").then((m) => m.DeskScene3D),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  }
);

function SceneFallback() {
  return (
    <div className="grid h-full w-full place-items-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="size-10 rounded-full border-2 border-primary/30 border-t-primary"
      />
    </div>
  );
}

/**
 * HeroScene3D — the full hero visual: animated topographic waves background
 * + the 3D desk scene (monitor, RGB PC, keyboard, mouse, particles, bloom).
 */
export function HeroScene3D() {
  return (
    <div className="relative h-[420px] sm:h-[480px] lg:h-[560px] w-full overflow-hidden rounded-3xl border border-border/60 bg-[oklch(0.16_0.02_280)]">
      {/* topographic wave background */}
      <div className="absolute inset-0">
        <TopoWaves className="h-full w-full" opacity={0.55} />
      </div>
      {/* radial color glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, oklch(0.5 0.2 300 / 0.25), transparent 55%), radial-gradient(circle at 75% 70%, oklch(0.6 0.18 200 / 0.2), transparent 55%)",
        }}
      />
      {/* the 3D canvas */}
      <div className="absolute inset-0">
        <DeskScene3D />
      </div>
      {/* corner UI chrome — gives the "window into 3D" feel */}
      <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[10px] text-white/70 backdrop-blur">
        <span className="size-1.5 rounded-full bg-green-400" />
        scene.live
      </div>
      <div className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[10px] text-white/50 backdrop-blur">
        webgl · r3f
      </div>
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] text-white/50 backdrop-blur">
        move cursor to orbit · hover scene for parallax
      </div>
    </div>
  );
}
