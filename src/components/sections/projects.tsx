"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Star,
  Users2,
  ExternalLink,
  FolderGit2,
  Layers,
} from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { DynamicIcon } from "@/components/dynamic-icon";
import { projects } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "solo" | "group";

const tabs: { id: FilterTab; label: string; icon: typeof FolderGit2 }[] = [
  { id: "all", label: "All Projects", icon: Layers },
  { id: "solo", label: "Solo", icon: FolderGit2 },
  { id: "group", label: "Group", icon: Users2 },
];

export function Projects() {
  const [active, setActive] = React.useState<FilterTab>("all");

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  const filteredOthers = React.useMemo(() => {
    if (active === "all") return others;
    if (active === "solo") return others.filter((p) => !p.collaboration);
    return others.filter((p) => p.collaboration);
  }, [active, others]);

  return (
    <section id="projects" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -z-10 size-[36rem] rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />
      <div className="mesh-blob mesh-blob-purple float-slow" style={{ width: 300, height: 300, top: "5%", left: "-6%" }} />
      <div className="mesh-blob mesh-blob-cyan float-slow" style={{ width: 280, height: 280, bottom: "10%", right: "-5%", animationDelay: "2.5s" }} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Projects"
          title="Selected work"
          description="A mix of applied AI systems and full-stack builds. Hover any card to flip it and see the technical details. Group collaborations are marked with a badge."
        />

        {/* Featured showcase — large cards with images */}
        <div className="mt-10 grid lg:grid-cols-2 gap-5 sm:gap-6">
          {featured.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <FeaturedCard project={p} />
            </motion.div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="mt-12 flex flex-wrap items-center gap-2">
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
                  ? others.length
                  : t.id === "solo"
                  ? others.filter((p) => !p.collaboration).length
                  : others.filter((p) => p.collaboration).length}
              </span>
            </button>
          ))}
        </div>

        {/* 3D flip cards grid */}
        <motion.div layout className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filteredOthers.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -16 }}
                transition={{ duration: 0.35, delay: (i % 3) * 0.05 }}
              >
                <FlipCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Featured card (large, with image + 3D tilt) ---------- */
function FeaturedCard({ project: p }: { project: typeof projects[number] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [glare, setGlare] = React.useState({ x: 50, y: 50, o: 0 });

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
    if (ref.current) {
      ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    }
    setGlare({ x, y, o: 1 });
  }
  function handleLeave() {
    if (ref.current) {
      ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    }
    setGlare((g) => ({ ...g, o: 0 }));
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="group relative rounded-3xl glass-card glow-border overflow-hidden transition-transform duration-200 will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-3xl transition-opacity duration-300"
        style={{
          opacity: glare.o,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, oklch(1 0 0 / 0.18), transparent 45%)`,
        }}
      />

      {/* project image */}
      {p.image && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={p.image}
            alt={p.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          <div className="absolute left-4 top-4 grid size-12 place-items-center rounded-2xl bg-primary/15 text-primary backdrop-blur border border-primary/20">
            <DynamicIcon name={p.icon} className="size-6" />
          </div>
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground shadow-lg">
            <Star className="size-3 fill-current" />
            Featured
          </span>
        </div>
      )}

      <div className="relative p-6">
        <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
        <p className="mt-1 text-sm text-primary font-medium">{p.tagline}</p>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {p.description}
        </p>

        {p.highlights && p.highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {p.highlights.slice(0, 3).map((h, hi) => (
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
          <Button asChild size="sm" variant="outline" className="rounded-full">
            <a href={p.url} target="_blank" rel="noopener noreferrer">
              <Github className="size-4" />
              View Code
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Flip card (3D flip on hover, with image on front) ---------- */
function FlipCard({ project: p }: { project: typeof projects[number] }) {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div
      className="relative h-80 cursor-pointer"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="relative size-full rounded-2xl"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Front */}
        <div
          className="glass-card glow-border absolute inset-0 flex flex-col rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* image header (if available) */}
          {p.image ? (
            <div className="relative h-24 overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              <div className="absolute left-3 top-3 grid size-8 place-items-center rounded-lg bg-primary/15 text-primary backdrop-blur border border-primary/20">
                <DynamicIcon name={p.icon} className="size-4" />
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between p-5 pb-0">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <DynamicIcon name={p.icon} className="size-5" />
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground/60" />
            </div>
          )}

          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-start justify-between gap-2">
              {!p.image && <div />}
              {p.collaboration && (
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary">
                  <Users2 className="size-2.5" />
                  Group
                </span>
              )}
            </div>

            <h3 className="mt-1 font-semibold tracking-tight leading-snug">
              {p.title}
            </h3>
            <p className="mt-0.5 text-xs text-primary font-medium">{p.tagline}</p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {p.description}
            </p>

            <div className="mt-auto pt-2 flex flex-wrap gap-1.5">
              {p.tech.slice(0, 3).map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="font-mono text-[10px] font-normal"
                >
                  {t}
                </Badge>
              ))}
              {p.tech.length > 3 && (
                <Badge variant="outline" className="font-mono text-[10px] font-normal">
                  +{p.tech.length - 3}
                </Badge>
              )}
            </div>

            <div className="mt-2 text-right font-mono text-[9px] text-muted-foreground/50 uppercase tracking-wider">
              hover · flip
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="glass-card glow-border absolute inset-0 flex flex-col rounded-2xl p-5"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex items-start justify-between">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <DynamicIcon name={p.icon} className="size-5" />
            </div>
            <Github className="size-4 text-muted-foreground/60" />
          </div>

          <h3 className="mt-4 font-semibold tracking-tight leading-snug">
            {p.title}
          </h3>

          {p.highlights && p.highlights.length > 0 ? (
            <ul className="mt-3 space-y-1.5">
              {p.highlights.map((h, hi) => (
                <li
                  key={hi}
                  className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                >
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  {h}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-6">
              {p.description}
            </p>
          )}

          <div className="mt-auto pt-3 flex items-center justify-between">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              <Github className="size-3.5" />
              View Code
              <ExternalLink className="size-3" />
            </a>
            {p.extraLinks && (
              <span className="text-[10px] text-muted-foreground">
                {p.extraLinks.length} repos
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
