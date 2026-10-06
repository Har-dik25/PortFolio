"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/sections/section-header";
import { profile } from "@/lib/portfolio-data";
import { toast } from "sonner";

export function Contact() {
  const [copied, setCopied] = React.useState<string | null>(null);

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      toast.success(`${label} copied to clipboard`);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      toast.error("Couldn't copy — please copy manually");
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div
        className="absolute inset-0 -z-10 glow-amber"
        aria-hidden
        style={{
          maskImage:
            "radial-gradient(circle at 50% 60%, black 0%, transparent 55%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 60%, black 0%, transparent 55%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something intelligent"
          description="Open to AI/ML Engineer roles, collaborations, and interesting problems. The fastest way to reach me is email — I usually reply within a day."
        />

        <div className="mt-10 grid lg:grid-cols-[1fr_1.1fr] gap-6">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-border/70 bg-card/60 backdrop-blur p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <span className="relative flex size-2">
                <span className="pulse-dot absolute inline-flex size-2 rounded-full bg-primary" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Available for new opportunities
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight">
              {profile.name}
            </h3>
            <p className="text-muted-foreground">{profile.title}</p>

            <div className="mt-6 space-y-2.5">
              <button
                onClick={() => copy(profile.email, "Email")}
                className="group flex w-full items-center gap-3 rounded-xl border border-border/60 bg-background/40 px-4 py-3 text-left transition-colors hover:bg-accent/50"
              >
                <Mail className="size-4 shrink-0 text-primary" />
                <span className="min-w-0 flex-1 truncate text-sm">
                  {profile.email}
                </span>
                {copied === "Email" ? (
                  <Check className="size-4 text-primary" />
                ) : (
                  <Copy className="size-4 text-muted-foreground/60 opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </button>

              <button
                onClick={() => copy(profile.phone, "Phone")}
                className="group flex w-full items-center gap-3 rounded-xl border border-border/60 bg-background/40 px-4 py-3 text-left transition-colors hover:bg-accent/50"
              >
                <Phone className="size-4 shrink-0 text-primary" />
                <span className="min-w-0 flex-1 truncate text-sm">
                  {profile.phone}
                </span>
                {copied === "Phone" ? (
                  <Check className="size-4 text-primary" />
                ) : (
                  <Copy className="size-4 text-muted-foreground/60 opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </button>

              <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 px-4 py-3">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span className="text-sm">{profile.location}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="size-4" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="size-4" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Quick message form (opens mail client) */}
          <motion.form
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-border/70 bg-card/60 backdrop-blur p-6 sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              const name = String(data.get("name") || "");
              const from = String(data.get("email") || "");
              const message = String(data.get("message") || "");
              const subject = encodeURIComponent(
                `Portfolio enquiry from ${name || "someone"}`
              );
              const body = encodeURIComponent(
                `${message}\n\n— ${name}${from ? `\n${from}` : ""}`
              );
              window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
              toast.success("Opening your email client…");
              form.reset();
            }}
          >
            <h3 className="text-lg font-semibold tracking-tight">
              Send a quick message
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Opens your email client pre-filled. No data stored.
            </p>

            <div className="mt-5 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about the role or project…"
                  required
                  rows={5}
                  className="rounded-xl resize-none"
                />
              </div>

              <Button type="submit" className="w-full rounded-xl">
                <Send className="size-4" />
                Send message
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
