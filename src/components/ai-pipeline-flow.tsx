"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Database, Box, Brain, Sparkles } from "lucide-react";

/**
 * AIPipelineFlow — a unique animated "AI pipeline" diagram for the hero.
 * NOT a terminal, NOT a photo. A visual flow showing data moving through
 * an ML pipeline: Data → Embed → Model → Output, with animated particles
 * traveling along the connection paths and pulsing nodes. Pure SVG/CSS.
 */

type Node = {
  id: string;
  label: string;
  icon: React.ReactNode;
  x: number;
  y: number;
};

const NODES: Node[] = [
  { id: "data", label: "Data", icon: <Database className="size-5" />, x: 50, y: 80 },
  { id: "embed", label: "Embed", icon: <Box className="size-5" />, x: 180, y: 50 },
  { id: "model", label: "Model", icon: <Brain className="size-5" />, x: 310, y: 80 },
  { id: "output", label: "Output", icon: <Sparkles className="size-5" />, x: 440, y: 50 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
];

export function AIPipelineFlow() {
  return (
    <div className="relative grid place-items-center py-10">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(from var(--primary) l c h / 0.18), transparent 65%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-lg"
      >
        <div className="glass-card glow-border rounded-3xl p-6 sm:p-8">
          {/* title */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                AI Pipeline
              </div>
              <div className="text-sm text-muted-foreground">
                how I ship intelligence
              </div>
            </div>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[10px] font-medium text-primary"
            >
              <span className="size-1.5 rounded-full bg-primary" />
              live flow
            </motion.div>
          </div>

          {/* SVG pipeline diagram */}
          <svg viewBox="0 0 490 140" className="w-full">
            {/* edges (connection paths) */}
            {EDGES.map(([a, b], i) => {
              const na = NODES[a];
              const nb = NODES[b];
              // curved path
              const midX = (na.x + nb.x) / 2;
              const d = `M ${na.x + 24} ${na.y} C ${midX} ${na.y}, ${midX} ${nb.y}, ${nb.x - 24} ${nb.y}`;
              return (
                <g key={`edge-${i}`}>
                  {/* base path */}
                  <path
                    d={d}
                    fill="none"
                    stroke="oklch(from var(--primary) l c h / 0.25)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  {/* animated particle traveling along the path */}
                  <motion.circle
                    r="3"
                    fill="var(--primary)"
                    style={{ filter: "drop-shadow(0 0 4px var(--primary))" }}
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: ["0%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.6,
                    }}
                  >
                    <mpath href={`#path-${i}`} />
                  </motion.circle>
                  <path id={`path-${i}`} d={d} fill="none" stroke="none" />
                </g>
              );
            })}

            {/* nodes */}
            {NODES.map((node, i) => (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.15, type: "spring" }}
              >
                {/* pulsing ring */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="22"
                  fill="none"
                  stroke="var(--primary)"
                  strokeOpacity="0.3"
                  strokeWidth="1.5"
                  animate={{ r: [22, 30], opacity: [0.4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 0.4,
                  }}
                />
                {/* node circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill="oklch(from var(--card) l c h / 0.9)"
                  stroke="var(--primary)"
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                />
                {/* node icon (foreignObject for lucide icon) */}
                <foreignObject
                  x={node.x - 10}
                  y={node.y - 10}
                  width="20"
                  height="20"
                >
                  <div className="grid h-full w-full place-items-center text-primary">
                    {node.icon}
                  </div>
                </foreignObject>
                {/* label */}
                <text
                  x={node.x}
                  y={node.y + 38}
                  textAnchor="middle"
                  className="fill-current text-[10px] font-medium"
                  style={{ fill: "var(--muted-foreground)" }}
                >
                  {node.label}
                </text>
              </motion.g>
            ))}
          </svg>

          {/* footer stats */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border/60 pt-4">
            <PipelineStat label="latency" value="<20ms" />
            <PipelineStat label="accuracy" value="94.2%" />
            <PipelineStat label="uptime" value="99.9%" />
          </div>
        </div>

        {/* floating accent dots around the card */}
        {[
          { x: -12, y: 20, d: 0 },
          { x: -8, y: 70, d: 0.8 },
          { x: 105, y: -10, d: 1.5 },
          { x: 100, y: 90, d: 2.2 },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="absolute size-1.5 rounded-full bg-primary"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
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
    </div>
  );
}

function PipelineStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="font-mono text-sm font-bold tabular-nums text-foreground">
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
