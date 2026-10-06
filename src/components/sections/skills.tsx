"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/sections/section-header";
import { DynamicIcon } from "@/components/dynamic-icon";
import { TiltCard } from "@/components/tilt-card";
import { skillCategories } from "@/lib/portfolio-data";

/* Mini circular progress ring */
function ProgressRing({ value, size = 44 }: { value: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="oklch(from var(--foreground) l c h / 0.1)"
          strokeWidth="3"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ * (1 - value / 100) }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: "drop-shadow(0 0 3px oklch(from var(--primary) l c h / 0.5))" }}
        />
      </svg>
      <span className="absolute font-mono text-[10px] font-bold tabular-nums text-foreground">
        {value}
      </span>
    </div>
  );
}

/* Bento card — one skill category */
function BentoCard({
  cat,
  index,
}: {
  cat: typeof skillCategories[number];
  index: number;
}) {
  // first card spans 2 cols on lg for bento variety
  const isWide = index === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={isWide ? "sm:col-span-2 lg:col-span-2" : ""}
    >
      <TiltCard max={7} className="h-full rounded-2xl glass-card glow-border">
        <div className="p-5 sm:p-6">
          {/* header */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <DynamicIcon name={cat.icon} className="size-5" />
              </div>
              <h3 className="font-semibold tracking-tight">{cat.title}</h3>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">
              {cat.skills.length} skills
            </span>
          </div>

          {/* skill chips with mini progress rings */}
          <div className={`mt-5 ${isWide ? "grid sm:grid-cols-2 gap-x-6 gap-y-3" : "space-y-3"}`}>
            {cat.skills.map((s, si) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: index * 0.06 + si * 0.04 }}
                className="group/skill flex items-center justify-between gap-3 rounded-xl border border-transparent px-2 py-1.5 transition-colors hover:border-border/60 hover:bg-background/40"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <ProgressRing value={s.level} />
                  <span className="truncate text-sm font-medium">{s.name}</span>
                </div>
                {/* hover shimmer bar */}
                <div className="hidden h-1 w-12 overflow-hidden rounded-full bg-muted sm:block">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.9, delay: index * 0.06 + si * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden />
      <div className="mesh-blob mesh-blob-purple float-slow" style={{ width: 300, height: 300, top: "15%", right: "-8%" }} />
      <div className="mesh-blob mesh-blob-cyan float-slow" style={{ width: 260, height: 260, bottom: "10%", left: "-6%", animationDelay: "3s" }} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Skills"
          title="The stack I build with"
          description="A blend of ML engineering, backend services, and full-stack glue — organized by domain in a bento grid, each skill with a proficiency ring."
        />

        {/* Bento grid */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {skillCategories.map((cat, ci) => (
            <BentoCard key={cat.id} cat={cat} index={ci} />
          ))}
        </div>
      </div>
    </section>
  );
}
