"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { InvitationCover } from "./InvitationCover";
import { useInvitation } from "./InvitationProvider";

export function InvitationShell({ children }: { children: ReactNode }) {
  const { opened } = useInvitation();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const revealed = !mounted || opened;

  return (
    <>
      <AnimatePresence>{opened ? null : <InvitationCover />}</AnimatePresence>

      <motion.div
        initial={false}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : 28 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.8, delay: opened ? 0.12 : 0, ease: [0.22, 1, 0.36, 1] }
        }
        inert={!revealed}
        aria-hidden={!revealed}
        className={revealed ? undefined : "pointer-events-none"}
      >
        {children}
      </motion.div>
    </>
  );
}
