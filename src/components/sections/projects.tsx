"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Star, Users2 } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { DynamicIcon } from "@/components/dynamic-icon";
import { projects } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -z-10 size-[36rem] rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Projects"
          title="Selected work"
          description="A mix of applied AI systems and full-stack builds. Each one shipped with a real problem, a real pipeline, and a real outcome."
        />

        {/* Featured */}
        <div className="mt-10 grid lg:grid-cols-2 gap-5 sm:gap-6">
          {featured.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-lift group relative flex flex-col rounded-3xl border border-border/70 bg-card/70 backdrop-blur p-6 sm:p-7 shadow-sm overflow-hidden"
            >
              {/* glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between gap-3">
                <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <DynamicIcon name={p.icon} className="size-6" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    <Star className="size-3 fill-current" />
                    Featured
                  </span>
                </div>
              </div>

              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-1 text-sm text-primary font-medium">
                {p.tagline}
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {p.description}
              </p>

              {p.highlights && p.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {p.highlights.map((h, hi) => (
                    <li
                      key={hi}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="font-mono text-[11px] font-normal"
                  >
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 pt-1">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                >
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="size-4" />
                    Code
                  </a>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Others grid */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {others.map((p, i) => (
            <motion.a
              key={p.slug}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              className="card-lift group relative flex flex-col rounded-2xl border border-border/70 bg-card/60 backdrop-blur p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <DynamicIcon name={p.icon} className="size-5" />
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground/60 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              <h3 className="mt-4 font-semibold tracking-tight leading-snug">
                {p.title}
              </h3>
              <p className="mt-1 text-xs text-primary font-medium">
                {p.tagline}
              </p>
              <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {p.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.slice(0, 4).map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="font-mono text-[10px] font-normal"
                  >
                    {t}
                  </Badge>
                ))}
                {p.tech.length > 4 && (
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] font-normal"
                  >
                    +{p.tech.length - 4}
                  </Badge>
                )}
              </div>

              {p.collaboration && (
                <div className="mt-3 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Users2 className="size-3" />
                  Collaboration project
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
