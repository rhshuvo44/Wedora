"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { weddingData } from "@/data/wedding";
import { Reveal } from "./Reveal";

export function GallerySection() {
  const images = weddingData.gallery.images;
  const copy = weddingData.copy.gallery;
  const reduceMotion = useReducedMotion();

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null ? current : (current + delta + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close, openIndex, step]);

  return (
    <section id="gallery" className="relative bg-cream-light px-5 py-14 sm:px-6 sm:py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-luxe text-mauve sm:text-[11px]">
          {copy.eyebrow}
        </p>
        <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">{copy.title}</h2>
        <p className="mt-2 font-serif text-sm text-ink-soft italic sm:text-base">
          {weddingData.gallery.caption}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-8 max-w-4xl">
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {images.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`${copy.openImage}: ${weddingData.gallery.caption} ${index + 1}`}
                className="group relative block aspect-square w-full overflow-hidden border border-mauve/25 bg-blush"
              >
                <Image
                  src={src}
                  alt={`${weddingData.gallery.caption} — ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-mauve/0 transition-colors duration-500 group-hover:bg-mauve/15"
                />
              </button>
            </li>
          ))}
        </ul>
      </Reveal>

      <AnimatePresence>
        {openIndex !== null ? (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-sm"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={copy.title}
            onClick={close}
          >
            <div className="flex items-center justify-between gap-3 px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6">
              <p className="text-[10px] font-medium uppercase tracking-luxe text-cream/80">
                {copy.counter} {openIndex + 1} / {images.length}
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                aria-label={copy.close}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-ink"
              >
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>

            <div
              className="relative mx-auto flex w-full max-w-4xl flex-1 items-center justify-center px-3 py-4 sm:px-16"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={copy.previous}
                className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-ink sm:left-4"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.4} />
              </button>

              <motion.div
                key={images[openIndex]}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                <Image
                  src={images[openIndex]}
                  alt={`${weddingData.gallery.caption} — ${openIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label={copy.next}
                className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-ink sm:right-4"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>

            <p className="px-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-center font-serif text-sm text-cream/75">
              {weddingData.gallery.caption}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
