import { Phone } from "lucide-react";
import { weddingData } from "@/data/wedding";
import { Reveal } from "./Reveal";

export function ContactSection() {
  const { contact, copy } = weddingData;

  return (
    <section id="contact" className="relative bg-cream-light px-5 py-14 sm:px-6 sm:py-20">
      <div aria-hidden="true" className="sparkle-layer pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-luxe text-mauve sm:text-[11px]">
            {copy.contact.eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">{copy.contact.title}</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <ul className="grid gap-3 sm:grid-cols-2">
            {contact.lines.map((line) => (
              <li key={line.href}>
                <a
                  href={line.href}
                  className="lace-frame flex min-h-11 items-center justify-center gap-3 bg-cream px-4 py-4 transition-colors duration-300 hover:bg-blush"
                >
                  <Phone className="h-4 w-4 shrink-0 text-mauve" strokeWidth={1.4} aria-hidden="true" />
                  <span className="flex flex-col text-left">
                    <span className="font-serif text-base text-ink">{line.label}</span>
                    <span className="text-xs tracking-soft text-ink-soft">{line.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={contact.phoneHref}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-mauve/50 px-6 py-2.5 text-[10px] font-semibold uppercase tracking-luxe text-mauve transition-colors duration-300 hover:border-mauve hover:bg-mauve hover:text-cream-light"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            {copy.contact.call} {contact.phone}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
