import { weddingData, type WeddingEvent } from "@/data/wedding";
import { cn } from "@/lib/cn";
import { fill } from "@/lib/format";
import { FamilyInviteBlock } from "./FamilyInviteBlock";
import { MapPinned } from "lucide-react";
import { Reveal } from "./Reveal";
import { Flourish } from "./SectionDivider";

interface EventSectionProps {
  event: WeddingEvent;
  index: number;
  total: number;
}

export function EventSection({ event, index, total }: EventSectionProps) {
  const { labels, directions, progress } = weddingData.copy.events;
  const isLast = index === total - 1;

  const rows = [
    { label: labels.date, value: event.date, chip: event.dateShort },
    { label: labels.time, value: event.time },
    { label: labels.venue, value: event.venue },
    { label: labels.address, value: event.address },
  ];

  return (
    <section
      id={event.id}
      className={cn(
        "relative px-5 py-14 sm:px-6 sm:py-20",
        isLast ? "bg-cream" : index % 2 === 0 ? "bg-cream-light" : "bg-cream",
      )}
    >
      <div aria-hidden="true" className="sparkle-layer pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-2xl">
        <Reveal className="text-center">
          <p className="text-[9px] font-semibold uppercase tracking-luxe text-rose-deep sm:text-[10px]">
            {fill(progress, { current: String(index + 1), total: String(total) })}
          </p>
          <h2 className="script-name mt-2 text-4xl text-ink sm:text-5xl">{event.title}</h2>
          {event.subtitle ? (
            <p className="mt-1 font-serif text-sm text-ink-soft italic sm:text-base">
              {event.subtitle}
            </p>
          ) : null}
        </Reveal>

        <Reveal delay={0.08} className="mt-6">
          <FamilyInviteBlock
            parents={event.parents}
            bismillah={event.bismillah ?? true}
            bismillahText={event.bismillahText}
            gratitudeLine={event.gratitudeLine ?? weddingData.copy.hero.gratitude}
          />
        </Reveal>

        <Reveal delay={0.14} className="mt-8">
          <div className="lace-frame bg-cream-light px-5 py-6 sm:px-8 sm:py-8">
            <dl className="grid gap-5 sm:grid-cols-2">
              {rows.map((row) => (
                <div key={row.label} className="flex flex-col gap-1">
                  <dt className="text-[9px] font-semibold uppercase tracking-luxe text-mauve">
                    {row.label}
                  </dt>
                  <dd className="font-serif text-base leading-snug text-ink sm:text-lg">
                    {row.value}
                    {row.chip ? (
                      <span className="ml-2 align-middle text-[10px] tracking-soft text-rose-deep">
                        {row.chip}
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>

            {event.note ? (
              <>
                <Flourish className="my-5" />
                <p className="text-center font-serif text-sm text-ink-soft italic">
                  {event.note}
                </p>
              </>
            ) : null}
          </div>

          <div className="mt-5 flex justify-center">
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-mauve/50 px-6 py-2.5 text-[10px] font-semibold uppercase tracking-luxe text-mauve transition-colors duration-300 hover:border-mauve hover:bg-mauve hover:text-cream-light"
            >
              <MapPinned className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              {directions}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
