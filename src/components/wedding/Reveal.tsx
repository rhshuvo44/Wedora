"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  variant?: "up" | "zoom";
  delay?: number;
  className?: string;
}

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * A section settles in once, gently, as it comes into view. Transforms are
 * skipped automatically for visitors who ask for reduced motion.
 */
export default function Reveal({ children, variant = "up", delay = 0, className = "" }: RevealProps) {
  const from = variant === "zoom" ? { opacity: 0, scale: 0.975 } : { opacity: 0, y: 24 };

  return (
    <motion.div
      className={className}
      initial={from}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 0.85, delay: delay / 1000, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
