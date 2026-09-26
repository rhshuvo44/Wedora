import { weddingData } from "@/data/wedding";
import { CoupleCard } from "./CoupleCard";
import { Reveal } from "./Reveal";

export function CoupleSection() {
  const mainEvent =
    weddingData.events.find((event) => event.id === "wedding") ?? weddingData.events[0];

  return (
    <section id="couple" className="relative bg-cream-light px-5 py-14 sm:px-6 sm:py-20">
      <div aria-hidden="true" className="sparkle-layer pointer-events-none absolute inset-0" />

      <Reveal className="relative text-center">
        <p className="text-[10px] font-semibold uppercase tracking-luxe text-mauve sm:text-[11px]">
          {weddingData.copy.couple.eyebrow}
        </p>
        <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
          {weddingData.copy.couple.title}
        </h2>
      </Reveal>

      <div className="relative mt-8 flex flex-col items-stretch gap-5 sm:mt-10 sm:flex-row sm:gap-6">
        <CoupleCard
          roleLabel={weddingData.copy.couple.brideRole}
          person={weddingData.bride}
          parents={mainEvent.parents.sideB}
        />
        <CoupleCard
          roleLabel={weddingData.copy.couple.groomRole}
          person={weddingData.groom}
          parents={mainEvent.parents.sideA}
          delay={0.12}
        />
      </div>
    </section>
  );
}
