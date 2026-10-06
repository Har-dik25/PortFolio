"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { profile, navLinks } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-card/40 backdrop-blur relative overflow-hidden">
      <div className="mesh-blob mesh-blob-purple" style={{ width: 300, height: 300, top: "-30%", left: "10%", opacity: 0.2 }} />
      <div className="mesh-blob mesh-blob-cyan" style={{ width: 260, height: 260, top: "-40%", right: "15%", opacity: 0.2 }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="#top"
              className="group inline-flex items-center gap-2 font-semibold tracking-tight"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground font-mono text-sm">
                H
              </span>
              {profile.name}
              <span className="text-primary">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
              {profile.title} — building applied intelligence systems that solve
              real-world problems.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Navigate
            </h4>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick info (no social icons — those live in the navbar + contact section) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Based in
            </h4>
            <p className="mt-3 text-sm text-muted-foreground">
              {profile.location}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {profile.availability}
            </p>
            <Link
              href="#contact"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Start a conversation →
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-border/60 pt-6">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} {profile.name}. Designed & built with
            Next.js, Tailwind CSS & shadcn/ui.
          </p>
          <Link
            href="#top"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to top
            <span className="grid size-6 place-items-center rounded-full border border-border/60">
              <ArrowUp className="size-3" />
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
