"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/sections/section-header";
import { DynamicIcon } from "@/components/dynamic-icon";
import { TiltCard } from "@/components/tilt-card";
import { skillCategories } from "@/lib/portfolio-data";

function SkillBar({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {level}%
        </span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
        >
          {/* shimmer overlay */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.3), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* Radial skill graph — shows top skills as a circular graph */
function RadialSkillGraph() {
  const topSkills = [
    { name: "Python", level: 92 },
    { name: "NLP", level: 90 },
    { name: "REST APIs", level: 90 },
    { name: "Git/GitHub", level: 90 },
    { name: "FastAPI", level: 88 },
    { name: "HTML/CSS", level: 88 },
    { name: "LLMs", level: 88 },
    { name: "RAG", level: 85 },
  ];

  return (
    <div className="relative grid place-items-center">
      {/* accent image behind */}
      <img
        src="/skills-accent.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15 rounded-3xl"
        aria-hidden
      />
      <svg viewBox="0 0 300 300" className="relative size-72">
        {/* concentric guide rings */}
        {[40, 80, 120].map((r) => (
          <circle
            key={r}
            cx="150"
            cy="150"
            r={r}
            fill="none"
            stroke="oklch(from var(--foreground) l c h / 0.08)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        ))}
        {/* skill bars radiating from center */}
        {topSkills.map((skill, i) => {
          const angle = (i * 360) / topSkills.length - 90;
          const rad = (angle * Math.PI) / 180;
          const len = (skill.level / 100) * 120;
          const x2 = 150 + Math.cos(rad) * len;
          const y2 = 150 + Math.sin(rad) * len;
          const labelX = 150 + Math.cos(rad) * 138;
          const labelY = 150 + Math.sin(rad) * 138;
          return (
            <g key={skill.name}>
              <motion.line
                x1="150"
                y1="150"
                x2={x2}
                y2={y2}
                stroke="var(--primary)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              />
              <motion.circle
                cx={x2}
                cy={y2}
                r="4"
                fill="var(--primary)"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 + 0.4 }}
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-current text-[8px] font-medium"
                style={{ fill: "var(--muted-foreground)" }}
              >
                {skill.name}
              </text>
            </g>
          );
        })}
        {/* center dot */}
        <motion.circle
          cx="150"
          cy="150"
          r="6"
          fill="var(--primary)"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
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
          description="A blend of ML engineering, backend services, and full-stack glue — visualized as a radial graph and organized by domain."
        />

        {/* Radial graph + category cards */}
        <div className="mt-10 grid lg:grid-cols-[1fr_1.5fr] gap-8 items-start">
          {/* Radial skill graph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <RadialSkillGraph />
          </motion.div>

          {/* Category cards */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {skillCategories.map((cat, ci) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: ci * 0.06 }}
              >
                <TiltCard
                  max={7}
                  className="h-full rounded-2xl glass-card glow-border"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                        <DynamicIcon name={cat.icon} className="size-5" />
                      </div>
                      <h3 className="font-semibold tracking-tight">
                        {cat.title}
                      </h3>
                    </div>

                    <div className="mt-5 space-y-3.5">
                      {cat.skills.map((s, si) => (
                        <SkillBar
                          key={s.name}
                          name={s.name}
                          level={s.level}
                          delay={ci * 0.06 + si * 0.04}
                        />
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
