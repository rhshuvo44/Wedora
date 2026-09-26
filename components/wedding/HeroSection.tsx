import { BISMILLAH, weddingData } from "@/data/wedding";
import { Reveal } from "./Reveal";
import { Flourish } from "./SectionDivider";
import { ScrollCue } from "./ScrollCue";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream px-5 pt-14 pb-16 text-center sm:px-6 sm:pt-20 sm:pb-24"
    >
      <div aria-hidden="true" className="sparkle-layer pointer-events-none absolute inset-0" />

      <Reveal className="relative">
        <p lang="ar" dir="rtl" className="arabic text-2xl leading-loose text-ink sm:text-3xl">
          {BISMILLAH}
        </p>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-luxe text-mauve sm:text-[11px]">
          {weddingData.copy.hero.gratitude}
        </p>
      </Reveal>

      <Flourish className="relative my-4" />

      <Reveal delay={0.1} className="relative">
        <p className="text-[10px] font-medium uppercase tracking-luxe text-rose-deep sm:text-[11px]">
          {weddingData.copy.hero.eyebrow}
        </p>
        <h2 className="mt-3 flex flex-col items-center">
          <span className="script-name text-5xl text-ink text-shadow-soft sm:text-7xl">
            {weddingData.bride.name}
          </span>
          <span className="my-1 font-serif text-xl text-rose-deep italic">
            {weddingData.joiner}
          </span>
          <span className="script-name text-5xl text-ink text-shadow-soft sm:text-7xl">
            {weddingData.groom.name}
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-md font-serif text-base leading-relaxed text-ink-soft sm:text-lg">
          {weddingData.copy.hero.request}
        </p>
      </Reveal>

      <Reveal delay={0.18} className="relative mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-soft text-ink sm:text-xs">
          {weddingData.wedding.date}
        </p>
        <p className="mt-1 font-serif text-sm text-ink-soft italic sm:text-base">
          {weddingData.wedding.time}
        </p>
        <p className="mt-1 font-serif text-sm text-ink-soft sm:text-base">{weddingData.venue.name}</p>
      </Reveal>

      <ScrollCue
        target="couple"
        label={weddingData.copy.hero.scrollCue}
        className="relative mt-10 sm:mt-14"
      />
    </section>
  );
}
