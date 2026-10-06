"use client";

import * as React from "react";
import { Brain, Cpu, Database, Code2, Sparkles, Network } from "lucide-react";

/**
 * A pure-CSS 3D rotating cube with an orbiting ring.
 * Each face shows an AI/ML icon to reinforce the "AI/ML Engineer" theme.
 */
export function Hero3DCube() {
  return (
    <div className="scene-3d grid place-items-center py-8" aria-hidden>
      <div className="cube-float relative">
        {/* orbiting ring */}
        <div className="orbit-3d" />
        <div className="cube-3d">
          <div className="face front">
            <Brain />
          </div>
          <div className="face back">
            <Network />
          </div>
          <div className="face right">
            <Cpu />
          </div>
          <div className="face left">
            <Database />
          </div>
          <div className="face top">
            <Sparkles />
          </div>
          <div className="face bottom">
            <Code2 />
          </div>
        </div>
      </div>
    </div>
  );
}
