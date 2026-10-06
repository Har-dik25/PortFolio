"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Award,
  CalendarDays,
  GraduationCap,
  Trophy,
  Sparkles,
} from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { DynamicIcon } from "@/components/dynamic-icon";
import { TiltCard } from "@/components/tilt-card";
import { education, achievements } from "@/lib/portfolio-data";

/* Animated counter that triggers on scroll into view */
function useCountUp(end: number, duration = 1400): [number, React.RefObject<HTMLSpanElement | null>] {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const started = React.useRef(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const t0 = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - t0) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setVal(end * eased);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return [val, ref];
}

/* Parse a grade string into a number for counting, e.g. "CGPA: 7.00" → 7, "Percentage: 83.80%" → 83.8 */
function parseGradeValue(grade: string): { value: number; suffix: string } | null {
  const cgpa = grade.match(/CGPA:\s*([\d.]+)/);
  if (cgpa) return { value: parseFloat(cgpa[1]), suffix: " CGPA" };
  const pct = grade.match(/Percentage:\s*([\d.]+)/);
  if (pct) return { value: parseFloat(pct[1]), suffix: "%" };
  return null;
}

function EducationTimelineItem({
  edu,
  index,
}: {
  edu: typeof education[number];
  index: number;
}) {
  const gradeParsed = parseGradeValue(edu.grade);
  const [gradeVal, gradeRef] = useCountUp(gradeParsed?.value ?? 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative pl-12"
    >
      {/* node */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, delay: index * 0.12 + 0.2, type: "spring" }}
        className="absolute left-0 top-1 grid size-9 place-items-center rounded-full border border-border bg-card text-primary shadow-sm"
      >
        <DynamicIcon name={edu.icon} className="size-4" />
        {/* pulsing ring */}
        <motion.span
          className="absolute inset-0 rounded-full border border-primary/40"
          animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: index * 0.3,
          }}
        />
      </motion.div>

      <TiltCard max={6} className="rounded-2xl glass-card glow-border">
        <div className="p-5">
          <h4 className="font-semibold leading-snug">{edu.degree}</h4>
          <p className="mt-0.5 text-sm text-muted-foreground">{edu.school}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="size-3.5" />
              {edu.period}
            </span>
            {gradeParsed ? (
              <span className="inline-flex items-center gap-1 font-medium text-primary">
                <motion.span
                  ref={gradeRef}
                  className="tabular-nums"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {gradeParsed.value % 1 === 0
                    ? Math.round(gradeVal)
                    : gradeVal.toFixed(2)}
                </motion.span>
                {gradeParsed.suffix}
              </span>
            ) : (
              <span className="font-medium text-primary">{edu.grade}</span>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

function AchievementCard({
  a,
  index,
}: {
  a: typeof achievements[number];
  index: number;
}) {
  const Inner = (
    <div className="flex items-start gap-4 p-5">
      <motion.div
        initial={{ rotate: -20, scale: 0 }}
        whileInView={{ rotate: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.5,
          delay: index * 0.1 + 0.2,
          type: "spring",
        }}
        className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"
      >
        <DynamicIcon name={a.icon} className="size-5" />
      </motion.div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold leading-snug">{a.title}</h4>
          {a.url && (
            <ExternalLink className="size-4 shrink-0 text-muted-foreground/60 transition-colors group-hover:text-primary" />
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          {a.context}
        </p>
        <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[11px] text-primary">
          <CalendarDays className="size-3" />
          {a.date}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
    >
      {a.url ? (
        <TiltCard max={6} className="group h-full rounded-2xl glass-card glow-border">
          <a href={a.url} target="_blank" rel="noopener noreferrer" className="block">
            {Inner}
          </a>
        </TiltCard>
      ) : (
        <TiltCard max={6} className="h-full rounded-2xl glass-card glow-border">
          {Inner}
        </TiltCard>
      )}
    </motion.div>
  );
}

export function Education() {
  return (
    <section id="education" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="mesh-blob mesh-blob-cyan float-slow" style={{ width: 300, height: 300, top: "10%", left: "-7%" }} />
      <div className="mesh-blob mesh-blob-pink float-slow" style={{ width: 260, height: 260, bottom: "5%", right: "-5%", animationDelay: "2s" }} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Education & Achievements"
          title="Learning, always"
          description="Formal education across school and university, plus the wins that keep me sharp."
        />

        {/* Section summary stats with animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-8 grid grid-cols-3 gap-3"
        >
          <SummaryStat icon={<GraduationCap className="size-5" />} value={3} label="Institutions" />
          <SummaryStat icon={<Trophy className="size-5" />} value={4} label="Achievements" />
          <SummaryStat icon={<Sparkles className="size-5" />} value={3} label="Hackathons" />
        </motion.div>

        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          {/* Education timeline */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="size-4 text-primary" />
              Education
            </h3>
            <div className="relative">
              <div
                className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent"
                aria-hidden
              />
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <EducationTimelineItem key={edu.id} edu={edu} index={i} />
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
              {achievements.map((a, i) => (
                <AchievementCard key={a.id} a={a} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  const [val, ref] = useCountUp(value, 1000);
  return (
    <div className="glass-card glow-border rounded-2xl p-4 text-center">
      <div className="mx-auto grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <motion.span
        ref={ref}
        className="mt-3 block text-2xl font-bold tabular-nums"
      >
        {Math.round(val)}
      </motion.span>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}
