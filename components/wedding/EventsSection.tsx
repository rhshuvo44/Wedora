import { weddingData } from "@/data/wedding";
import { EventSection } from "./EventSection";
import { Reveal } from "./Reveal";

export function EventsSection() {
  const events = weddingData.events;

  return (
    <section id="events" className="relative bg-cream-light">
      <div className="px-5 pt-14 text-center sm:px-6 sm:pt-20">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-luxe text-mauve sm:text-[11px]">
            {weddingData.copy.events.eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
            {weddingData.copy.events.title}
          </h2>
        </Reveal>
      </div>

      {events.map((event, index) => (
        <EventSection key={event.id} event={event} index={index} total={events.length} />
      ))}
    </section>
  );
}
