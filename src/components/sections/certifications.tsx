"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Award, BadgeCheck, CalendarDays } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { DynamicIcon } from "@/components/dynamic-icon";
import { TiltCard } from "@/components/tilt-card";
import { certificates, certifications } from "@/lib/portfolio-data";

function CertList({
  items,
  title,
  icon,
  accentLabel,
}: {
  items: typeof certificates;
  title: string;
  icon: "Award" | "BadgeCheck";
  accentLabel: string;
}) {
  const Icon = icon === "Award" ? Award : BadgeCheck;
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
            {title}
          </h3>
          <p className="text-[11px] text-muted-foreground">{accentLabel}</p>
        </div>
      </div>
      <div className="max-h-[640px] overflow-y-auto pr-1 sm:pr-2 space-y-3">
        {items.map((c, i) => (
          <motion.a
            key={c.id}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <TiltCard
              max={6}
              glare={false}
              className="group block rounded-xl border border-border/70 bg-card/60 backdrop-blur"
            >
              <div className="flex items-start gap-3 p-4">
                <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <DynamicIcon name={c.icon} className="size-[1.05rem]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold leading-snug">
                      {c.title}
                    </h4>
                    <ExternalLink className="size-3.5 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-primary" />
                  </div>
                  {/* one-line description of what it covers */}
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {c.description}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground/80">
                      {c.issuer}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="size-3" />
                      {c.date}
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Certificates & Certifications"
          title="Credentials & continuous learning"
          description="Two parallel tracks: course/workshop completion certificates, and professional certifications plus industry virtual job simulations. Each with a one-line summary of what it covers."
        />

        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          <CertList
            items={certificates}
            title="Certificates"
            icon="Award"
            accentLabel="Courses · workshops · participation"
          />
          <CertList
            items={certifications}
            title="Certifications"
            icon="BadgeCheck"
            accentLabel="Industry certs · virtual job simulations"
          />
        </div>
      </div>
    </section>
  );
}
