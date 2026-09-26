import Image from "next/image";
import { weddingData } from "@/data/wedding";
import Reveal from "./Reveal";

export default function GallerySection() {
  const { images, monochromeCount } = weddingData.gallery;
  const monochrome = images.slice(0, monochromeCount);
  const colour = images.slice(monochromeCount);

  return (
    <Reveal>
      <section id="gallery" className="jm-gallery">
        {monochrome.length > 0 && (
          <div className="jm-gallery-row">
            {monochrome.map((src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={412}
                height={412}
                sizes="(max-width: 430px) 48vw, 205px"
                className="jm-gallery-photo jm-gallery-mono"
              />
            ))}
          </div>
        )}
        {colour.map((src) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={412}
            height={412}
            sizes="(max-width: 430px) 100vw, 430px"
            className="jm-gallery-photo"
          />
        ))}
      </section>
    </Reveal>
  );
}
