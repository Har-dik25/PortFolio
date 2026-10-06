"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Award,
  BadgeCheck,
  CalendarDays,
  ShieldCheck,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { DynamicIcon } from "@/components/dynamic-icon";
import { TiltCard } from "@/components/tilt-card";
import { certificates, certifications } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "certificate" | "certification" | "simulation";

type Item = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  icon: string;
  url: string;
  description: string;
  type: "certificate" | "certification" | "simulation";
};

// Merge both lists and tag each item with a type.
const allItems: Item[] = [
  ...certificates.map((c) => ({ ...c, type: "certificate" as const })),
  ...certifications.map((c) => {
    // Forage / job-simulation items → "simulation", the rest → "certification"
    const isSimulation =
      c.issuer.includes("Forage") ||
      c.title.toLowerCase().includes("job simulation");
    return { ...c, type: isSimulation ? ("simulation" as const) : ("certification" as const) };
  }),
];

const tabs: { id: FilterTab; label: string; icon: typeof Award }[] = [
  { id: "all", label: "All", icon: Award },
  { id: "certificate", label: "Certificates", icon: GraduationCap },
  { id: "certification", label: "Certifications", icon: BadgeCheck },
  { id: "simulation", label: "Job Simulations", icon: Briefcase },
];

function useAnimatedCounter(end: number, duration = 1200, start = 0): [number, React.RefObject<HTMLDivElement | null>] {
  const [value, setValue] = React.useState(start);
  const ref = React.useRef<HTMLDivElement>(null);
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
              setValue(Math.round(start + (end - start) * eased));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration, start]);
  return [value, ref];
}

export function Certifications() {
  const [active, setActive] = React.useState<FilterTab>("all");

  const filtered = React.useMemo(() => {
    if (active === "all") return allItems;
    return allItems.filter((i) => i.type === active);
  }, [active]);

  const totalCerts = allItems.length;
  const totalIssuers = new Set(allItems.map((i) => i.issuer.split(" (")[0])).size;
  const totalSims = allItems.filter((i) => i.type === "simulation").length;

  const [certsVal, certsRef] = useAnimatedCounter(totalCerts);
  const [issuersVal, issuersRef] = useAnimatedCounter(totalIssuers);
  const [simsVal, simsRef] = useAnimatedCounter(totalSims);

  return (
    <section id="certifications" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden />
      <div className="mesh-blob mesh-blob-purple float-slow" style={{ width: 300, height: 300, top: "8%", right: "-6%" }} />
      <div className="mesh-blob mesh-blob-cyan float-slow" style={{ width: 280, height: 280, bottom: "8%", left: "-5%", animationDelay: "2.5s" }} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Credentials"
          title="Certificates & continuous learning"
          description="Course certificates, professional certifications, and industry virtual job simulations — each verified and summarized."
        />

        {/* Stats row */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
          <StatCard
            ref={certsRef}
            icon={<Award className="size-5" />}
            value={certsVal}
            label="Total Credentials"
          />
          <StatCard
            ref={issuersRef}
            icon={<ShieldCheck className="size-5" />}
            value={issuersVal}
            label="Unique Issuers"
          />
          <StatCard
            ref={simsRef}
            icon={<Briefcase className="size-5" />}
            value={simsVal}
            label="Job Simulations"
          />
        </div>

        {/* Filter tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                active === t.id
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              <t.icon className="size-3.5" />
              {t.label}
              <span
                className={cn(
                  "ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
                  active === t.id
                    ? "bg-primary-foreground/20"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {t.id === "all"
                  ? allItems.length
                  : allItems.filter((i) => i.type === t.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <motion.div layout className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -16 }}
                transition={{ duration: 0.35, delay: (i % 6) * 0.04 }}
              >
                <CertCard item={c} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

const StatCard = React.forwardRef<
  HTMLDivElement,
  { icon: React.ReactNode; value: number; label: string }
>(function StatCard({ icon, value, label }, ref) {
  return (
    <div
      ref={ref}
      className="glass-card glow-border rounded-2xl p-4 sm:p-5 text-center"
    >
      <div className="mx-auto grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="mt-3 text-2xl sm:text-3xl font-bold tabular-nums">
        {value}
      </div>
      <div className="text-[11px] sm:text-xs text-muted-foreground">{label}</div>
    </div>
  );
});

function CertCard({ item }: { item: Item }) {
  const typeBadge = {
    certificate: { label: "Course", color: "text-amber-500", bg: "bg-amber-500/10", icon: GraduationCap },
    certification: { label: "Professional", color: "text-primary", bg: "bg-primary/10", icon: BadgeCheck },
    simulation: { label: "Job Sim", color: "text-cyan-500", bg: "bg-cyan-500/10", icon: Briefcase },
  }[item.type];

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <TiltCard
        max={8}
        glare={false}
        className="group h-full rounded-2xl glass-card glow-border"
      >
        <div className="flex h-full flex-col p-5">
          {/* top: icon + type badge */}
          <div className="flex items-start justify-between">
            <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
              <DynamicIcon name={item.icon} className="size-5" />
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                typeBadge.bg,
                typeBadge.color
              )}
            >
              <typeBadge.icon className="size-2.5" />
              {typeBadge.label}
            </span>
          </div>

          {/* title */}
          <h4 className="mt-4 font-semibold leading-snug">{item.title}</h4>

          {/* description */}
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {item.description}
          </p>

          {/* issuer + date */}
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="font-medium text-foreground/80">{item.issuer}</span>
          </div>
          <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <CalendarDays className="size-3" />
            {item.date}
          </div>

          {/* footer: view link */}
          <div className="mt-auto flex items-center justify-between pt-4">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
              View credential
              <ExternalLink className="size-3 transition-transform group-hover:translate-x-0.5" />
            </span>
            {item.type === "certification" && (
              <ShieldCheck className="size-4 text-primary/60" />
            )}
          </div>
        </div>
      </TiltCard>
    </a>
  );
}
