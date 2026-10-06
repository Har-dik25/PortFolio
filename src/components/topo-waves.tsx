"use client";

import * as React from "react";

/**
 * TopoWaves — animated topographic/contour-line background.
 * Pure SVG with animated stroke-dashoffset + drifting paths.
 * Sits behind the 3D canvas to give the "flow field" depth.
 */
export function TopoWaves({
  className = "",
  opacity = 0.5,
}: {
  className?: string;
  opacity?: number;
}) {
  // generate a set of flowing contour paths
  const paths = React.useMemo(() => {
    const rows = 14;
    const out: string[] = [];
    for (let i = 0; i < rows; i++) {
      const y = 40 + i * 32;
      const amp = 14 + (i % 4) * 6;
      const phase = i * 0.7;
      // build a smooth wavy path across the viewBox
      const segs: string[] = [`M -50 ${y}`];
      for (let x = -50; x <= 1050; x += 50) {
        const y1 = y + Math.sin((x / 120) + phase) * amp;
        const y2 = y + Math.sin(((x + 50) / 120) + phase) * amp;
        segs.push(`Q ${x + 25} ${(y1 + y2) / 2 - amp * 0.4} ${x + 50} ${y2}`);
      }
      out.push(segs.join(" "));
    }
    return out;
  }, []);

  return (
    <svg
      className={className}
      viewBox="0 0 1000 560"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <linearGradient id="topo-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.7 0.18 300)" />
          <stop offset="50%" stopColor="oklch(0.7 0.15 200)" />
          <stop offset="100%" stopColor="oklch(0.75 0.18 70)" />
        </linearGradient>
        <radialGradient id="topo-vignette" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="oklch(0.16 0.01 60)" />
        </radialGradient>
      </defs>
      <g
        stroke="url(#topo-stroke)"
        strokeWidth="1"
        fill="none"
        style={{ animation: "topo-drift 24s linear infinite" }}
      >
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            strokeOpacity={0.18 + (i % 3) * 0.08}
            strokeDasharray="6 10"
            style={{
              animation: `topo-flow ${8 + (i % 5) * 2}s linear infinite`,
              animationDelay: `${i * 0.25}s`,
            }}
          />
        ))}
      </g>
      <rect width="1000" height="560" fill="url(#topo-vignette)" />
      <style>{`
        @keyframes topo-flow {
          to { stroke-dashoffset: -160; }
        }
        @keyframes topo-drift {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </svg>
  );
}
