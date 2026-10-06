"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  ExternalLink,
  CheckCircle2,
  Github,
} from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { experiences } from "@/lib/portfolio-data";

export function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Experience"
          title="Where I've built and shipped"
          description="Internships and applied ML work — focused on real systems, not just demos."
        />

        <div className="mt-10 relative">
          {/* vertical line */}
          <div
            className="absolute left-[18px] sm:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent"
            aria-hidden
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pl-12 sm:pl-16"
              >
                {/* node */}
                <div className="absolute left-0 top-1 grid size-9 sm:size-10 place-items-center rounded-full border border-border bg-card text-primary shadow-sm">
                  <Briefcase className="size-4" />
                </div>

                <div className="card-lift rounded-2xl border border-border/70 bg-card/60 backdrop-blur p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {exp.role}
                      </h3>
                      <div className="text-sm text-primary font-medium">
                        {exp.company}
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2.5">
                    {exp.highlights.map((h, hi) => (
                      <li
                        key={hi}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary/80" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {(exp.certificate || exp.project) && (
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      {exp.certificate && (
                        <a
                          href={exp.certificate.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                        >
                          {exp.certificate.label}
                          <ExternalLink className="size-3.5" />
                        </a>
                      )}
                      {exp.project && (
                        <a
                          href={exp.project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                        >
                          <Github className="size-3.5" />
                          {exp.project.label}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
