import { weddingData } from "@/data/wedding";
import { Reveal } from "./Reveal";

export function StorySection() {
  const { story } = weddingData;

  return (
    <section className="relative overflow-hidden bg-mauve px-5 py-14 text-cream-light sm:px-6 sm:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/patterns/lace-pattern.svg')] bg-[length:240px_240px] opacity-[0.12]"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-luxe text-cream/80 sm:text-[11px]">
            {story.eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl">{story.title}</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-5">
          <p className="font-serif text-base leading-relaxed text-cream/90 sm:text-lg">
            {story.description}
          </p>
        </Reveal>

        <ol className="mt-9 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {story.highlights.map((highlight, index) => (
            <li key={highlight.year} className="h-full">
              <Reveal delay={0.12 * index} className="h-full">
                <div className="lace-frame h-full bg-cream/10 px-4 py-5 backdrop-blur-[1px]">
                  <p className="font-serif text-xl text-cream-light sm:text-2xl">
                    {highlight.year}
                  </p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-luxe text-cream/75">
                    {highlight.title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-cream/80">
                    {highlight.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
