"use client";

import * as React from "react";
import { motion } from "framer-motion";

/**
 * SectionTransition — wraps a section to add a scroll-reveal animation
 * + an animated gradient divider at the top. Used between every section
 * for cohesive motion throughout the portfolio.
 */
export function SectionTransition({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={className}>
      {/* animated gradient divider */}
      <div className="section-divider mx-auto max-w-6xl" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
