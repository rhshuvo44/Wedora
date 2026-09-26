import { MapPin } from "lucide-react";
import { weddingData } from "@/data/wedding";
import { Reveal } from "./Reveal";

export function VenueSection() {
  const { venue, copy } = weddingData;

  return (
    <section id="venue" className="relative bg-cream px-5 py-14 sm:px-6 sm:py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-luxe text-mauve sm:text-[11px]">
          {copy.venue.eyebrow}
        </p>
        <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">{copy.venue.title}</h2>
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-8 max-w-2xl">
        <div className="lace-frame overflow-hidden bg-cream-light">
          <div
            aria-hidden="true"
            className="relative flex h-36 items-center justify-center border-b border-mauve/20 bg-blush sm:h-44"
          >
            <div className="absolute inset-0 bg-[url('/patterns/lace-pattern.svg)] bg-[length:200px_200px] opacity-25" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-[50%] border border-mauve/40 bg-cream-light text-mauve">
              <MapPin className="h-6 w-6" strokeWidth={1.25} />
            </div>
          </div>

          <div className="px-5 py-6 text-center sm:px-8 sm:py-8">
            <p className="text-[9px] font-semibold uppercase tracking-luxe text-mauve">
              {copy.venue.labels.venue}
            </p>
            <p className="mt-1 font-serif text-xl text-ink sm:text-2xl">{venue.name}</p>

            <p className="mt-4 text-[9px] font-semibold uppercase tracking-luxe text-mauve">
              {copy.venue.labels.address}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft sm:text-base">
              {venue.address}
            </p>

            <a
              href={venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-mauve px-7 py-2.5 text-[10px] font-semibold uppercase tracking-luxe text-cream-light transition-colors duration-300 hover:bg-mauve-deep"
            >
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              {venue.directionsLabel}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
