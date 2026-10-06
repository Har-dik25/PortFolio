"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Sparkles } from "lucide-react";

/**
 * CodeTerminal — a unique animated "AI engineer console".
 * NOT a photo or 3D orb. A stylized terminal window that types out
 * a live coding session with syntax highlighting + floating skill orbs
 * orbiting around it. Pure CSS/SVG + Framer Motion.
 */

type Token = { text: string; color: string };

const CODE_LINES: Token[][] = [
  [
    { text: "import ", color: "var(--primary)" },
    { text: "torch", color: "#98c379" },
    { text: " from ", color: "var(--primary)" },
    { text: "transformers", color: "#98c379" },
  ],
  [
    { text: "model ", color: "#e5c07b" },
    { text: "= ", color: "#56b6c2" },
    { text: "AutoModel.from_pretrained(", color: "#61afef" },
    { text: '"bert-base"', color: "#98c379" },
    { text: ")", color: "#61afef" },
  ],
  [
    { text: "with ", color: "var(--primary)" },
    { text: "torch.inference_mode():", color: "#61afef" },
  ],
  [
    { text: "  out ", color: "#e5c07b" },
    { text: "= ", color: "#56b6c2" },
    { text: "model(**inputs)", color: "#61afef" },
  ],
  [
    { text: "  logits ", color: "#e5c07b" },
    { text: "= ", color: "#56b6c2" },
    { text: "out.logits", color: "#61afef" },
  ],
  [
    { text: "# ", color: "#5c6370" },
    { text: "✓ inference complete · 12ms", color: "#5c6370" },
  ],
];

function useTyper() {
  const [lineIdx, setLineIdx] = React.useState(0);
  const [charIdx, setCharIdx] = React.useState(0);

  React.useEffect(() => {
    if (lineIdx >= CODE_LINES.length) {
      const t = setTimeout(() => {
        setLineIdx(0);
        setCharIdx(0);
      }, 2500);
      return () => clearTimeout(t);
    }
    const line = CODE_LINES[lineIdx];
    const totalChars = line.reduce((a, t) => a + t.text.length, 0);
    if (charIdx <= totalChars) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 28);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, 350);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx]);

  // build rendered lines
  const rendered: { tokens: Token[]; done: boolean }[] = [];
  for (let i = 0; i < lineIdx && i < CODE_LINES.length; i++) {
    rendered.push({ tokens: CODE_LINES[i], done: true });
  }
  if (lineIdx < CODE_LINES.length) {
    // current line: slice tokens to charIdx
    let remaining = charIdx;
    const sliced: Token[] = [];
    for (const tok of CODE_LINES[lineIdx]) {
      if (remaining <= 0) break;
      if (tok.text.length <= remaining) {
        sliced.push(tok);
        remaining -= tok.text.length;
      } else {
        sliced.push({ ...tok, text: tok.text.slice(0, remaining) });
        remaining = 0;
      }
    }
    rendered.push({ tokens: sliced, done: false });
  }
  return rendered;
}

const SKILL_ORBS = [
  { label: "Python", icon: "code", angle: 0, radius: 150, duration: 20 },
  { label: "PyTorch", icon: "flame", angle: 90, radius: 150, duration: 20 },
  { label: "RAG", icon: "network", angle: 180, radius: 150, duration: 20 },
  { label: "FastAPI", icon: "bolt", angle: 270, radius: 150, duration: 20 },
];

export function CodeTerminal() {
  const lines = useTyper();

  return (
    <div className="relative grid place-items-center py-8" style={{ perspective: 1000 }}>
      {/* floating skill orbs orbiting the terminal */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {SKILL_ORBS.map((orb, i) => (
          <div
            key={orb.label}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `rotate(${orb.angle}deg) translateX(${orb.radius}px)`,
            }}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="-translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
                className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-card/90 px-3 py-1.5 shadow-lg backdrop-blur"
              >
                <span className="size-1.5 rounded-full bg-primary" />
                <span className="font-mono text-[11px] font-medium text-foreground">
                  {orb.label}
                </span>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* the terminal window */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative w-full max-w-md"
      >
        {/* glow behind terminal */}
        <div
          className="pointer-events-none absolute -inset-4 rounded-3xl blur-2xl"
          style={{
            background:
              "radial-gradient(circle, oklch(from var(--primary) l c h / 0.2), transparent 70%)",
          }}
        />
        <div className="glass-card glow-border overflow-hidden rounded-2xl">
          {/* title bar */}
          <div className="flex items-center gap-2 border-b border-border/60 bg-background/40 px-4 py-2.5">
            <span className="size-3 rounded-full bg-red-400/80" />
            <span className="size-3 rounded-full bg-yellow-400/80" />
            <span className="size-3 rounded-full bg-green-400/80" />
            <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <Terminal className="size-3 text-primary" />
              hardik@ai-engineer: ~
            </span>
            <span className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] text-primary">
              <Sparkles className="size-2.5" />
              live
            </span>
          </div>

          {/* code body */}
          <div className="min-h-[200px] p-4 font-mono text-[13px] leading-relaxed">
            {/* line numbers */}
            <div className="flex gap-3">
              <div className="select-none text-right text-muted-foreground/40">
                {CODE_LINES.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div className="flex-1">
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-pre"
                  >
                    {line.tokens.map((tok, ti) => (
                      <span key={ti} style={{ color: tok.color }}>
                        {tok.text}
                      </span>
                    ))}
                    {!line.done && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="ml-0.5 inline-block w-1.5 bg-primary"
                      >
                        &nbsp;
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* status footer */}
          <div className="flex items-center gap-3 border-t border-border/60 bg-background/40 px-4 py-2 font-mono text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Cpu className="size-3 text-primary" />
              python 3.11
            </span>
            <span className="text-border">|</span>
            <span>gpu: cuda:0</span>
            <span className="ml-auto inline-flex items-center gap-1 text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              running
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
