"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Music4 } from "lucide-react";
import { weddingData } from "@/data/wedding";
import { useInvitation } from "./InvitationProvider";

export function MusicButton() {
  const { opened, musicSupported, musicPlaying, musicUnavailable, toggleMusic } = useInvitation();
  const reduceMotion = useReducedMotion();

  if (!opened || !musicSupported) return null;

  const label = musicUnavailable
    ? `${weddingData.music.label} — unavailable`
    : `${weddingData.music.label} — ${musicPlaying ? "pause" : "play"}`;

  return (
    <motion.div
      id="music"
      className="fixed right-3 z-50 sm:right-5"
      style={{ bottom: "calc(4.75rem + env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={toggleMusic}
        aria-pressed={musicPlaying}
        aria-label={label}
        title={label}
        disabled={musicUnavailable}
        className="group relative flex h-12 w-12 items-center justify-center rounded-[50%] border border-cream/40 bg-mauve text-cream-light shadow-[0_6px_18px_-8px_rgba(46,37,35,0.6)] transition-colors duration-300 hover:bg-mauve-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Music4 className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />

        <AnimatePresence>
          {musicPlaying ? (
            <motion.span
              key="bars"
              aria-hidden="true"
              className="absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-end justify-center gap-[2px] rounded-[50%] bg-cream-light p-[3px]"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              {[0, 1, 2].map((bar) => (
                <motion.span
                  key={bar}
                  className="w-[2px] rounded-full bg-mauve"
                  animate={reduceMotion ? undefined : { height: ["4px", "9px", "4px"] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: bar * 0.18,
                    ease: "easeInOut",
                  }}
                  style={{ height: "4px" }}
                />
              ))}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
