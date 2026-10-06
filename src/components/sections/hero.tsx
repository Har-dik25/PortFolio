"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, stats } from "@/lib/portfolio-data";
import { DynamicIcon } from "@/components/dynamic-icon";
import { TiltCard } from "@/components/tilt-card";
import { Hero3DCube } from "@/components/hero-3d-cube";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-grid" aria-hidden />
      <div
        className="absolute inset-0 -z-10 glow-amber"
        aria-hidden
        style={{
          maskImage:
            "radial-gradient(circle at 50% 35%, black 0%, transparent 60%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 35%, black 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute top-1/4 -left-24 -z-10 size-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 -right-24 -z-10 size-80 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl w-full px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-center">
          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
            >
              <span className="relative flex size-2">
                <span className="pulse-dot absolute inline-flex size-2 rounded-full bg-primary" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {profile.availability}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">{profile.name}</span>
              <br />
              <span className="text-foreground/80 text-3xl sm:text-4xl lg:text-5xl font-semibold">
                {profile.title}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              {profile.tagline} I specialize in{" "}
              <span className="text-foreground font-medium">
                LLMs, NLP, RAG pipelines, and Computer Vision
              </span>{" "}
              — shipping applied intelligence end-to-end.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg" className="rounded-full">
                <a href="#projects">
                  View my work
                  <ArrowDown className="size-4 ml-1" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full"
              >
                <a href="#contact">Let&apos;s talk</a>
              </Button>

              <div className="ml-1 flex items-center gap-1">
                {[
                  { icon: Github, url: profile.github, label: "GitHub" },
                  { icon: Linkedin, url: profile.linkedin, label: "LinkedIn" },
                  { icon: Mail, url: `mailto:${profile.email}`, label: "Email" },
                ].map((s) => (
                  <Button
                    key={s.label}
                    asChild
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label={s.label}
                  >
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      <s.icon className="size-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 flex items-center gap-1.5 text-sm text-muted-foreground"
            >
              <MapPin className="size-4" />
              {profile.location}
            </motion.div>
          </div>

          {/* Right: 3D cube + tilt stat cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <Hero3DCube />

            <div className="grid grid-cols-2 gap-4 w-full">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                >
                  <TiltCard
                    max={12}
                    className="h-full rounded-2xl border border-border/70 bg-card/70 backdrop-blur shadow-sm"
                  >
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                          <DynamicIcon
                            name={stat.icon}
                            className="size-[1.1rem]"
                          />
                        </div>
                      </div>
                      <div className="mt-4 text-3xl font-bold tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                        {"sub" in stat && stat.sub ? (
                          <span className="block text-[11px] text-primary/80">
                            {stat.sub}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-muted-foreground/70">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.div>
      </div>
    </section>
  );
}
