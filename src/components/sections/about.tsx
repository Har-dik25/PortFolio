"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, Target, Rocket } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
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

        <div className="mt-10 grid lg:grid-cols-[1.3fr_1fr] gap-8">
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
              FastAPI services, tuning retrieval pipelines, or shipping a clean
              React UI.
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
    </section>
  );
}
