"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/tilt-card";
import { Activity, Cpu, TrendingUp, Zap } from "lucide-react";

/**
 * TrainingDashboard — a 3D animated "model training" dashboard card.
 * Replaces the old terminal console. Shows a live-updating ML training
 * session: animated loss curve, accuracy counter, epoch ticker, GPU
 * utilization, and floating tech badges. 3D tilt + glare on hover.
 */
function useAnimatedCounter(start: number, end: number, duration = 4000) {
  const [value, setValue] = React.useState(start);
  React.useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(start + (end - start) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, end, duration]);
  return value;
}

function useLoopingCounter(start: number, end: number, step: number, interval = 1200) {
  const [value, setValue] = React.useState(start);
  React.useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => {
        const next = v + step;
        return next >= end ? start : next;
      });
    }, interval);
    return () => clearInterval(id);
  }, [start, end, step, interval]);
  return value;
}

function LossChart() {
  // generate a downward-trending loss curve with deterministic noise
  // (no Math.random — avoids SSR hydration mismatch)
  const points = React.useMemo(() => {
    const n = 40;
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < n; i++) {
      const x = Math.round(((i / (n - 1)) * 100) * 100) / 100;
      const base = 0.95 * Math.exp(-i / 12) + 0.05;
      // deterministic pseudo-noise from sine functions
      const noise = (Math.sin(i * 1.7) + Math.cos(i * 0.9) + Math.sin(i * 2.3)) * 0.012;
      const y = Math.round((1 - Math.max(0.02, Math.min(1, base + noise))) * 100 * 100) / 100;
      pts.push({ x, y });
    }
    return pts;
  }, []);

  const path = React.useMemo(() => {
    // round to 2 decimals to avoid SSR/client float-precision hydration mismatch
    return points
      .map((p, i) =>
        i === 0
          ? `M ${p.x.toFixed(2)} ${p.y.toFixed(2)}`
          : `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`
      )
      .join(" ");
  }, [points]);

  const areaPath = `${path} L 100 100 L 0 100 Z`;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
      <defs>
        <linearGradient id="loss-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* grid lines */}
      {[20, 40, 60, 80].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="100"
          y2={y}
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth="0.5"
        />
      ))}
      <motion.path
        d={areaPath}
        fill="url(#loss-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      {/* moving dot at the end */}
      <motion.circle
        r="1.5"
        fill="var(--primary)"
        initial={{ cx: 0, cy: 100 }}
        animate={{
          cx: points.map((p) => p.x),
          cy: points.map((p) => p.y),
        }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
      />
    </svg>
  );
}

export function TrainingDashboard() {
  const accuracy = useAnimatedCounter(0, 94.2, 4000);
  const epoch = useLoopingCounter(1, 50, 1, 900);
  const gpu = useLoopingCounter(62, 98, 7, 1100);
  const loss = useLoopingCounter(1.2, 8, 0.3, 800);

  return (
    <TiltCard
      max={12}
      className="w-full max-w-md rounded-2xl glass-card glow-border shadow-2xl"
    >
      <div className="overflow-hidden rounded-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border/60 bg-background/40 px-4 py-2.5">
          <span className="size-3 rounded-full bg-red-400/80" />
          <span className="size-3 rounded-full bg-yellow-400/80" />
          <span className="size-3 rounded-full bg-green-400/80" />
          <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Activity className="size-3 text-primary" />
            training — bert-fake-news.pt
          </span>
          <span className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] text-primary">
            <span className="relative flex size-1.5">
              <span className="pulse-dot absolute inline-flex size-1.5 rounded-full bg-primary" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            live
          </span>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {/* Stat row */}
          <div className="grid grid-cols-3 gap-3">
            <Stat
              icon={<TrendingUp className="size-3.5" />}
              label="accuracy"
              value={accuracy.toFixed(1)}
              suffix="%"
              trend="up"
            />
            <Stat
              icon={<Cpu className="size-3.5" />}
              label="epoch"
              value={String(epoch)}
              suffix={`/50`}
              trend="up"
            />
            <Stat
              icon={<Zap className="size-3.5" />}
              label="gpu"
              value={String(gpu)}
              suffix="%"
              trend="up"
            />
          </div>

          {/* Loss chart */}
          <div className="rounded-xl border border-border/50 bg-background/30 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                loss curve
              </span>
              <span className="font-mono text-[10px] tabular-nums text-primary">
                {loss.toFixed(3)}
              </span>
            </div>
            <div className="h-20 text-muted-foreground">
              <LossChart />
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
              <span>training progress</span>
              <span className="tabular-nums">{((epoch / 50) * 100).toFixed(0)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                animate={{ width: `${(epoch / 50) * 100}%` }}
                transition={{ ease: "easeOut", duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Footer status bar */}
        <div className="flex items-center gap-3 border-t border-border/60 bg-background/40 px-4 py-2 font-mono text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Cpu className="size-3 text-primary" />
            cuda:0
          </span>
          <span className="text-border">|</span>
          <span>batch: 32</span>
          <span className="text-border">|</span>
          <span>lr: 2e-5</span>
          <span className="ml-auto inline-flex items-center gap-1 text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            converging
          </span>
        </div>
      </div>
    </TiltCard>
  );
}

function Stat({
  icon,
  label,
  value,
  suffix,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix: string;
  trend: "up" | "down";
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/30 p-2.5">
      <div className="flex items-center gap-1 text-muted-foreground">
        {icon}
        <span className="font-mono text-[9px] uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-1 font-mono text-lg font-bold tabular-nums text-foreground">
        {value}
        <span className="text-xs font-normal text-muted-foreground">{suffix}</span>
      </div>
    </div>
  );
}
