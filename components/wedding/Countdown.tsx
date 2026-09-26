"use client";

import { useEffect, useState } from "react";
import { weddingData } from "@/data/wedding";
import { cn } from "@/lib/cn";
import { pad } from "@/lib/format";
import { Reveal } from "./Reveal";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  complete: boolean;
}

function timeLeft(target: number): Remaining {
  const total = Math.max(0, target - Date.now());
  const seconds = Math.floor(total / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    complete: total <= 0,
  };
}

export function Countdown() {
  const target = new Date(weddingData.wedding.countdownDate).getTime();
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(timeLeft(target));
    const interval = window.setInterval(() => setRemaining(timeLeft(target)), 1000);
    return () => window.clearInterval(interval);
  }, [target]);

  const units = [
    { value: remaining?.days ?? null, label: weddingData.copy.countdown.units.days },
    { value: remaining?.hours ?? null, label: weddingData.copy.countdown.units.hours },
    { value: remaining?.minutes ?? null, label: weddingData.copy.countdown.units.minutes },
    { value: remaining?.seconds ?? null, label: weddingData.copy.countdown.units.seconds },
  ];

  return (
    <section id="countdown" className="relative bg-cream px-5 py-14 sm:px-6 sm:py-20">
      <div aria-hidden="true" className="sparkle-layer pointer-events-none absolute inset-0" />

      <Reveal className="relative text-center">
        <p className="text-[10px] font-semibold uppercase tracking-luxe text-mauve sm:text-[11px]">
          {weddingData.copy.countdown.eyebrow}
        </p>
        <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
          {weddingData.copy.countdown.title}
        </h2>
      </Reveal>

      {remaining?.complete ? (
        <Reveal delay={0.1} className="relative mt-8 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-luxe text-rose-deep">
            {weddingData.copy.countdown.completeLabel}
          </p>
          <p className="mx-auto mt-2 max-w-sm font-serif text-lg leading-relaxed text-ink sm:text-xl">
            {weddingData.wedding.countdownCompleteMessage}
          </p>
        </Reveal>
      ) : (
        <Reveal delay={0.1} className="relative mt-8">
          <div
            role="timer"
            aria-label={`${weddingData.copy.countdown.title} — ${weddingData.wedding.date}`}
            className="mx-auto grid max-w-lg grid-cols-4 gap-2 sm:gap-4"
          >
            {units.map((unit) => (
              <div
                key={unit.label}
                className="lace-frame flex flex-col items-center bg-cream-light px-1 py-4 sm:py-5"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-serif text-2xl leading-none font-medium tabular-nums text-ink sm:text-4xl",
                    unit.label === weddingData.copy.countdown.units.days && "text-3xl sm:text-5xl",
                  )}
                >
                  {unit.value === null ? "--" : pad(unit.value)}
                </span>
                <span className="mt-2 text-[8px] font-semibold uppercase tracking-soft text-mauve sm:text-[10px]">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </section>
  );
}
