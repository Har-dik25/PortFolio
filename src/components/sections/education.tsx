"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Award, CalendarDays, GraduationCap } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { DynamicIcon } from "@/components/dynamic-icon";
import { TiltCard } from "@/components/tilt-card";
import { education, achievements } from "@/lib/portfolio-data";

export function Education() {
  return (
    <section id="education" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Education & Achievements"
          title="Learning, always"
          description="Formal education across school and university, plus the wins that keep me sharp."
        />

        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          {/* Education timeline */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="size-4 text-primary" />
              Education
            </h3>
            <div className="relative">
              <div
                className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-border to-transparent"
                aria-hidden
              />
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="relative pl-12"
                  >
                    <div className="absolute left-0 top-1 grid size-9 place-items-center rounded-full border border-border bg-card text-primary shadow-sm">
                      <DynamicIcon name={edu.icon} className="size-4" />
                    </div>
                    <TiltCard
                      max={6}
                      className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur"
                    >
                      <div className="p-5">
                        <h4 className="font-semibold leading-snug">
                          {edu.degree}
                        </h4>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {edu.school}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays className="size-3.5" />
                            {edu.period}
                          </span>
                          <span className="inline-flex items-center gap-1 font-medium text-primary">
                            {edu.grade}
                          </span>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
              <Award className="size-4 text-primary" />
              Achievements
            </h3>
            <div className="space-y-4">
              {achievements.map((a, i) => {
                const Inner = (
                  <div className="flex items-start gap-4 p-5">
                    <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <DynamicIcon name={a.icon} className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold leading-snug">
                          {a.title}
                        </h4>
                        {a.url && (
                          <ExternalLink className="size-4 shrink-0 text-muted-foreground/60 transition-colors group-hover:text-primary" />
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {a.context}
                      </p>
                      <div className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <CalendarDays className="size-3" />
                        {a.date}
                      </div>
                    </div>
                  </div>
                );
                return (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                  >
                    {a.url ? (
                      <TiltCard
                        max={6}
                        className="group h-full rounded-2xl border border-border/70 bg-card/60 backdrop-blur"
                      >
                        <a
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          {Inner}
                        </a>
                      </TiltCard>
                    ) : (
                      <TiltCard
                        max={6}
                        className="h-full rounded-2xl border border-border/70 bg-card/60 backdrop-blur"
                      >
                        {Inner}
                      </TiltCard>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
