import { weddingData } from "@/data/wedding";
import { Reveal } from "./Reveal";
import { Flourish } from "./SectionDivider";

export function ClosingSection() {
  const { closing, footer, bride, groom } = weddingData;

  return (
    <section className="relative overflow-hidden bg-cream px-5 pt-14 pb-10 text-center sm:px-6 sm:pt-20">
      <div aria-hidden="true" className="sparkle-layer pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-lg">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-luxe text-mauve sm:text-[11px]">
            {closing.eyebrow}
          </p>
          <p className="mt-3 font-serif text-lg leading-relaxed text-ink sm:text-xl">
            {closing.line}
          </p>
          <Flourish className="my-5" />
          <p className="script-name text-4xl text-ink sm:text-5xl">{closing.signature}</p>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-soft text-ink-soft">
            {bride.fullName} &amp; {groom.fullName}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <p className="text-xs text-ink-soft">{footer.line}</p>
          <a
            href="#top"
            className="mt-3 inline-flex min-h-11 items-center text-[9px] font-semibold uppercase tracking-luxe text-mauve transition-colors hover:text-ink"
          >
            {footer.backToTop}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
