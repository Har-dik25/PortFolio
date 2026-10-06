"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, Target, Rocket } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { TiltCard } from "@/components/tilt-card";
import { profile } from "@/lib/portfolio-data";

const pillars = [
  {
    icon: Sparkles,
    title: "Applied AI",
    body: "From hybrid RAG to explainable deep-learning classifiers — I build systems that work in production, not just notebooks.",
  },
  {
    icon: Target,
    title: "Outcome-focused",
    body: "I care about precision, latency, and the real-world metric. If it doesn't move the needle, it doesn't ship.",
  },
  {
    icon: Rocket,
    title: "End-to-end ownership",
    body: "Data pipeline to API surface to UI. I take features from idea to deployed, observable, and documented.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="About"
          title="Engineer who turns research into shipped products"
          description="I'm an AI/ML Engineer based in Punjab, India, focused on building applied intelligence systems — from retrieval pipelines to multimodal models — that solve real, messy problems."
        />

        <div className="mt-10 grid lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
          {/* 3D glass-framed photo with rim light */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* rim-light glow behind the frame */}
              <div
                className="pointer-events-none absolute -inset-4 rounded-[2rem] blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, oklch(0.6 0.2 300 / 0.45), transparent 60%), radial-gradient(circle at 75% 75%, oklch(0.6 0.18 200 / 0.35), transparent 60%)",
                }}
              />
              <TiltCard
                max={14}
                className="rounded-[1.75rem] border border-white/10 bg-card/60 backdrop-blur-xl shadow-2xl"
              >
                <div className="relative w-[240px] sm:w-[280px] overflow-hidden rounded-[1.75rem]">
                  <img
                    src="/hardik-avatar.jpg"
                    alt={`${profile.name} — ${profile.title}`}
                    className="aspect-square w-full object-cover"
                    draggable={false}
                  />
                  {/* color grade + rim light overlay */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.6 0.2 300 / 0.18), transparent 40%, oklch(0.6 0.18 200 / 0.18))",
                      mixBlendMode: "screen",
                    }}
                  />
                  {/* bottom info bar */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5">
                    <div className="font-semibold text-white tracking-tight">
                      {profile.name}
                    </div>
                    <div className="text-sm text-white/80">{profile.title}</div>
                    <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur">
                      <span className="relative flex size-1.5">
                        <span className="pulse-dot absolute inline-flex size-1.5 rounded-full bg-green-400" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-green-400" />
                      </span>
                      {profile.availability}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </motion.div>

          {/* text + pillars */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground"
            >
              <p>{profile.bio}</p>
              <p>
                My recent work spans a{" "}
                <span className="text-foreground font-medium">
                  hybrid RAG legal assistant
                </span>{" "}
                for the Indian Constitution, an{" "}
                <span className="text-foreground font-medium">
                  explainable fake-news detector
                </span>{" "}
                trained on 72k+ articles, and an{" "}
                <span className="text-foreground font-medium">
                  autonomous e-commerce support agent
                </span>{" "}
                with a full audit trail. I'm equally comfortable wiring up
                FastAPI services, tuning retrieval pipelines, or shipping a
                clean React UI.
              </p>
              <p>
                Currently open to{" "}
                <span className="text-foreground font-medium">
                  AI/ML Engineer roles
                </span>{" "}
                (remote / hybrid). I learn fast, document everything, and ship.
              </p>
            </motion.div>

            <div className="grid gap-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card-lift rounded-2xl border border-border/70 bg-card/60 p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <p.icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{p.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
