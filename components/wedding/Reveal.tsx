"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInvitation } from "./InvitationProvider";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  amount?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 22,
  amount = 0.2,
}: RevealProps) {
  const { opened } = useInvitation();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const ready = !mounted || (opened && inView);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
