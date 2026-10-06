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
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary"
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-28">
      {/* subtle bg */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Skills"
          title="The stack I build with"
          description="A blend of ML engineering, backend services, and full-stack glue — organized by domain, leveled by proficiency."
        />

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
                className="h-full rounded-2xl border border-border/70 bg-card/70 backdrop-blur shadow-sm"
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
    </section>
  );
}
