"use client";

import { motion, useReducedMotion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { fill } from "@/lib/format";
import { useInvitation } from "./InvitationProvider";

function VineOrnament({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 16"
      className="h-4 w-28 text-rose/80 sm:w-36"
      fill="none"
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path
        d="M2 8h34M84 8h34"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M60 1.5c2.6 3.9 2.6 7.1 0 11-2.6-3.9-2.6-7.1 0-11Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M52 4.4c3.4.7 5.6 2.4 7 5.2-3.4-.7-5.6-2.4-7-5.2ZM68 4.4c-3.4.7-5.6 2.4-7 5.2 3.4-.7 5.6-2.4 7-5.2Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="60" cy="8" r="1.4" fill="currentColor" />
      <circle cx="44" cy="8" r="1.1" fill="currentColor" opacity="0.7" />
      <circle cx="76" cy="8" r="1.1" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function InvitationCover() {
  const { open } = useInvitation();
  const reduceMotion = useReducedMotion();

  const springish = { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div
      key="cover"
      className="invitation-cover fixed inset-0 z-50 overflow-hidden bg-cream"
      initial={false}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      role="dialog"
      aria-modal="true"
      aria-label={fill(weddingData.copy.cover.dialogLabel, {
        bride: weddingData.bride.name,
        groom: weddingData.groom.name,
      })}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/patterns/lace-pattern.svg')] bg-[length:240px_240px] opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_35%,rgba(247,241,238,0.92)_0%,rgba(239,230,226,0.72)_45%,rgba(232,220,216,0.6)_100%)]"
      />

      <div aria-hidden="true" className="absolute inset-2.5 border border-mauve/35 sm:inset-3.5" />
      <div aria-hidden="true" className="absolute inset-5 border border-rose/45 sm:inset-7" />

      <div className="relative flex h-dvh flex-col items-center justify-center gap-3 px-6 pb-28 sm:pb-32">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springish, delay: 0.1 }}
          className="text-[10px] font-medium uppercase tracking-luxe text-mauve sm:text-[11px]"
        >
          {weddingData.copy.cover.eyebrow}
        </motion.p>

        <VineOrnament />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springish, delay: 0.18 }}
          className="relative aspect-[4/5] w-[min(82vw,20.5rem)]"
        >
          <div aria-hidden="true" className="absolute inset-0 rounded-[50%] border border-mauve/50" />
          <div
            aria-hidden="true"
            className="absolute inset-2.5 rounded-[50%] border border-dotted border-rose"
          />
          <div
            aria-hidden="true"
            className="absolute inset-5 rounded-[50%] border border-rose/35"
          />

          <div className="relative flex h-full flex-col items-center justify-center gap-2 px-9 text-center">
            <p className="text-[9px] font-medium uppercase tracking-luxe text-rose-deep/90 sm:text-[10px]">
              {weddingData.copy.cover.heading}
            </p>

            <h1 className="flex flex-col items-center">
              <span className="script-name text-[2.75rem] text-ink text-shadow-soft sm:text-6xl">
                {weddingData.bride.name}
              </span>
              <span className="my-0.5 font-serif text-base text-rose-deep italic">
                {weddingData.joiner}
              </span>
              <span className="script-name text-[2.75rem] text-ink text-shadow-soft sm:text-6xl">
                {weddingData.groom.name}
              </span>
            </h1>

            <div aria-hidden="true" className="my-1 h-px w-16 bg-rose/60" />
            <div aria-hidden="true" className="dotted-rule h-[2px] w-24" />

            <p className="text-[10px] font-medium uppercase tracking-soft text-ink-soft sm:text-[11px]">
              {weddingData.wedding.dateShort}
            </p>
            <p className="font-serif text-sm text-ink-soft italic">{weddingData.venue.name}</p>
          </div>
        </motion.div>

        <VineOrnament flip />

        <motion.button
          type="button"
          onClick={open}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springish, delay: 0.42 }}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          className="group mt-2 inline-flex min-h-11 items-center gap-3 rounded-full border border-mauve/60 bg-cream-light/70 px-8 py-2.5 text-[11px] font-semibold uppercase tracking-luxe text-mauve transition-colors duration-300 hover:border-mauve hover:bg-mauve hover:text-cream-light focus-visible:outline-mauve"
        >
          {weddingData.copy.cover.open}
          <span
            aria-hidden="true"
            className="h-px w-6 bg-current opacity-60 transition-all duration-300 group-hover:w-9"
          />
        </motion.button>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-20 bg-mauve sm:h-24"
        exit={reduceMotion ? undefined : { y: "100%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-x-0 top-0 h-[26px] lace-divider opacity-90" />
        <div className="flex h-full items-center justify-center">
          <p className="text-[9px] font-medium uppercase tracking-luxe text-cream/85 sm:text-[10px]">
            {fill(weddingData.copy.cover.namesLine, {
              bride: weddingData.bride.fullName,
              groom: weddingData.groom.fullName,
            })}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
