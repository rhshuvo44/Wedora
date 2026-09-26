"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { weddingData } from "@/data/wedding";
import { useInvitation } from "./InvitationProvider";

export function StickyHeader() {
  const { opened } = useInvitation();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!opened) {
      setVisible(false);
      return;
    }
    const onScroll = () => setVisible(window.scrollY > 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [opened]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.header
          key="sticky-header"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: "-100%" }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: "-100%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-40 bg-cream/95 backdrop-blur-sm"
        >
          <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
            <p className="script-name truncate text-xl text-ink sm:text-2xl">
              {weddingData.bride.name}
              <span className="px-1.5 font-serif text-sm text-rose-deep italic">
                {weddingData.joiner}
              </span>
              {weddingData.groom.name}
            </p>
            <p className="shrink-0 text-[10px] font-medium uppercase tracking-soft text-mauve sm:text-[11px]">
              {weddingData.wedding.dateShort}
            </p>
          </div>
          <div aria-hidden="true" className="h-[3px] w-full lace-divider lace-divider--ink" />
        </motion.header>
      ) : null}
    </AnimatePresence>
  );
}
