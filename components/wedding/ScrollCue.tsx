"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export function ScrollCue({ target, label, className }: { target: string; label: string; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={`#${target}`}
      aria-label={label}
      className={cn(
        "group mx-auto inline-flex flex-col items-center gap-1.5 text-mauve transition-colors hover:text-ink",
        className,
      )}
      animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-[9px] font-medium uppercase tracking-luxe sm:text-[10px]">{label}</span>
      <ChevronDown className="h-4 w-4" strokeWidth={1.25} />
    </motion.a>
  );
}
