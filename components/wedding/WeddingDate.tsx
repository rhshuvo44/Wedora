import { weddingData } from "@/data/wedding";
import { Reveal } from "./Reveal";
import { Flourish } from "./SectionDivider";

export function WeddingDate() {
  const { labels } = weddingData.copy.saveTheDate;

  const rows = [
    { label: labels.date, value: weddingData.wedding.date },
    { label: labels.time, value: weddingData.wedding.time },
    { label: labels.venue, value: weddingData.venue.name },
  ];

  return (
    <section className="relative overflow-hidden bg-mauve px-5 py-14 text-center text-cream-light sm:px-6 sm:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/patterns/lace-pattern.svg')] bg-[length:240px_240px] opacity-[0.12]"
      />

      <Reveal className="relative">
        <p className="text-[10px] font-semibold uppercase tracking-luxe text-cream/80 sm:text-[11px]">
          {weddingData.copy.saveTheDate.eyebrow}
        </p>
        <h2 className="mt-2 font-serif text-2xl sm:text-3xl">{weddingData.copy.saveTheDate.title}</h2>
        <Flourish className="my-4 [&_span]:bg-cream/40 [&_svg]:text-cream/70" />
      </Reveal>

      <Reveal delay={0.1} className="relative">
        <dl className="mx-auto flex max-w-md flex-col gap-4">
          {rows.map((row) => (
            <div key={row.label} className="flex flex-col gap-1">
              <dt className="text-[9px] font-semibold uppercase tracking-luxe text-cream/70">
                {row.label}
              </dt>
              <dd className="font-serif text-lg text-cream-light sm:text-xl">{row.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
