"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Award, CalendarDays } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { DynamicIcon } from "@/components/dynamic-icon";
import { education, certifications } from "@/lib/portfolio-data";

export function Education() {
  return (
    <section id="education" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Education & Certifications"
          title="Learning, always"
          description="Formal foundations and the certifications that keep the edge sharp."
        />

        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          {/* Education */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="card-lift rounded-2xl border border-border/70 bg-card/60 backdrop-blur p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <DynamicIcon name={edu.icon} className="size-5" />
                    </div>
                    <div className="min-w-0">
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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <motion.a
                  key={cert.id}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="card-lift group flex items-start gap-4 rounded-2xl border border-border/70 bg-card/60 backdrop-blur p-5 sm:p-6"
                >
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <DynamicIcon name={cert.icon} className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold leading-snug">
                        {cert.title}
                      </h4>
                      <ExternalLink className="size-4 shrink-0 text-muted-foreground/60 transition-colors group-hover:text-primary" />
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1 font-medium text-foreground">
                        <Award className="size-3.5 text-primary" />
                        {cert.issuer}
                      </span>
                      <span className="text-xs">· {cert.date}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
