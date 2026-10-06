"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { profile, navLinks } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-card/40 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
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
            <ul className="mt-3 space-y-2">
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

          {/* Socials */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Connect
            </h4>
            <div className="mt-3 flex items-center gap-2">
              {[
                { icon: Github, url: profile.github, label: "GitHub" },
                { icon: Linkedin, url: profile.linkedin, label: "LinkedIn" },
                { icon: Mail, url: `mailto:${profile.email}`, label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-full border border-border/60 bg-background/40 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
            <a
              href={profile.email.replace(/^mailto:/, "")}
              className="mt-3 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {profile.email}
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-border/60 pt-6">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js,
            Tailwind CSS & shadcn/ui.
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
