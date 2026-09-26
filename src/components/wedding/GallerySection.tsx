"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { weddingData } from "@/data/wedding";
import Reveal from "./Reveal";

export default function GallerySection() {
  const images = weddingData.gallery.images;
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      setIndex(((next % images.length) + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    if (images.length < 2) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % images.length), 5200);
    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <Reveal>
      <div id="gallery" style={{ padding: "24px 0", position: "relative" }}>
        <div
          className="jm-center"
          style={{ position: "relative", touchAction: "pan-y" }}
          onTouchStart={(e) => {
            touchX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const end = e.changedTouches[0]?.clientX ?? touchX.current;
            const delta = end - touchX.current;
            touchX.current = null;
            if (Math.abs(delta) > 40) go(index + (delta < 0 ? 1 : -1));
          }}
        >
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              aria-hidden={i !== index}
              width={412}
              height={412}
              sizes="(max-width: 430px) 100vw, 430px"
              style={{
                display: i === index ? "block" : "none",
                width: "100%",
                height: "auto",
                aspectRatio: "1 / 1",
                objectFit: "cover",
                margin: 0,
              }}
            />
          ))}
        </div>

        {images.length > 1 && (
          <div
            className="jm-center"
            style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 15 }}
          >
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index}
                style={{
                  border: 0,
                  cursor: "pointer",
                  height: 8,
                  width: 8,
                  borderRadius: "100%",
                  padding: 0,
                  opacity: i === index ? 1 : 0.4,
                  background: i === index ? weddingData.theme.footerBg : "#d2d4d4",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}
