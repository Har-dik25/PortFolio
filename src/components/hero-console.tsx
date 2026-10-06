"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/tilt-card";

/**
 * HeroConsole — a 3D glassmorphic "engineer status console".
 * Unique + functional: live IST clock, a looping typewriter that runs
 * a few shell-style commands revealing the engineer's identity, and a
 * 3D mouse-tracking tilt with glare. Replaces the old 3D cube + stat cards.
 */

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; accent?: boolean };

const SCRIPT: Line[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "hardik — ai/ml engineer", accent: true },
  { kind: "cmd", text: "cat focus.txt" },
  { kind: "out", text: "LLMs · RAG · NLP · Computer Vision" },
  { kind: "cmd", text: "status --now" },
  { kind: "out", text: "● available for new opportunities", accent: true },
  { kind: "cmd", text: "location" },
  { kind: "out", text: "punjab, india (ist)" },
];

function useIstClock() {
  const [time, setTime] = React.useState("");
  React.useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useTyper() {
  // Flatten script into a sequence of (lineIndex, typedChars)
  const [step, setStep] = React.useState(0);
  const [chars, setChars] = React.useState(0);

  React.useEffect(() => {
    const line = SCRIPT[step % SCRIPT.length];
    const isCmd = line.kind === "cmd";
    const fullLen = line.text.length;

    if (chars <= fullLen) {
      // typing this line
      const delay = isCmd ? 55 : 24;
      const id = setTimeout(() => setChars((c) => c + 1), delay);
      return () => clearTimeout(id);
    }

    // line finished — pause then advance
    const pause = isCmd ? 260 : 1100;
    const id = setTimeout(() => {
      setStep((s) => s + 1);
      setChars(0);
    }, pause);
    return () => clearTimeout(id);
  }, [step, chars]);

  // Build the visible lines: fully-typed previous lines + current typing line
  const currentIdx = step % SCRIPT.length;
  const rendered: { line: Line; text: string; typing: boolean }[] = [];
  // Show last few completed lines for context (the ones before current)
  const historyCount = 3;
  for (let i = 0; i < historyCount; i++) {
    const idx = (currentIdx - historyCount + i + SCRIPT.length) % SCRIPT.length;
    if (idx === currentIdx) continue;
    rendered.push({ line: SCRIPT[idx], text: SCRIPT[idx].text, typing: false });
  }
  const currentLine = SCRIPT[currentIdx];
  rendered.push({
    line: currentLine,
    text: currentLine.text.slice(0, chars),
    typing: true,
  });

  return rendered;
}

export function HeroConsole() {
  const time = useIstClock();
  const lines = useTyper();

  return (
    <TiltCard
      max={14}
      className="w-full max-w-md rounded-2xl glass-card glow-border shadow-2xl"
    >
      <div className="overflow-hidden rounded-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border/60 bg-background/40 px-4 py-2.5">
          <span className="size-3 rounded-full bg-red-400/80" />
          <span className="size-3 rounded-full bg-yellow-400/80" />
          <span className="size-3 rounded-full bg-green-400/80" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            hardik@ai-engineer: ~
          </span>
          <span className="ml-auto font-mono text-xs tabular-nums text-primary">
            {time} IST
          </span>
        </div>

        {/* Console body */}
        <div className="min-h-[220px] p-4 font-mono text-[13px] leading-relaxed">
          {lines.map((row, i) => {
            const isCmd = row.line.kind === "cmd";
            return (
              <motion.div
                key={`${i}-${row.text}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2"
              >
                {isCmd ? (
                  <>
                    <span className="select-none text-primary">$</span>
                    <span className="text-foreground/90">{row.text}</span>
                    {row.typing && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          duration: 0.7,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="inline-block w-2 bg-primary"
                      >
                        &nbsp;
                      </motion.span>
                    )}
                  </>
                ) : (
                  <span
                    className={
                      "accent" in row.line && row.line.accent
                        ? "pl-4 text-primary"
                        : "pl-4 text-muted-foreground"
                    }
                  >
                    {row.text}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Status footer bar */}
        <div className="flex items-center gap-3 border-t border-border/60 bg-background/40 px-4 py-2 font-mono text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex size-2">
              <span className="pulse-dot absolute inline-flex size-2 rounded-full bg-green-400" />
              <span className="relative inline-flex size-2 rounded-full bg-green-400" />
            </span>
            online
          </span>
          <span className="text-border">|</span>
          <span>uptime: 4+ yrs</span>
          <span className="ml-auto inline-flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-primary" />
            open to work
          </span>
        </div>
      </div>
    </TiltCard>
  );
}
