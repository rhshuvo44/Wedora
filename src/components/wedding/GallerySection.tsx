import Image from "next/image";
import { weddingData } from "@/data/wedding";
import { Divider } from "./Ornaments";
import Reveal from "./Reveal";

export default function GallerySection() {
  const { images, monochromeCount } = weddingData.gallery;
  const monochrome = images.slice(0, monochromeCount);
  const colour = images.slice(monochromeCount);
  const all = [...monochrome, ...colour];

  return (
    <section className="jm-block" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Reveal>
        <div style={{ padding: "0 1.5rem" }}>
          <Divider variant="dots" tight />
        </div>
      </Reveal>

      <Reveal>
        <div id="gallery" className="jm-album">
          {all.map((src, i) => (
            <Reveal key={src} delay={i < monochromeCount ? 0 : (i - monochromeCount + 1) * 90}>
              <figure className={`jm-photo${i < monochromeCount ? " jm-photo--mono" : ""}`}>
                <Image
                  src={src}
                  alt=""
                  width={412}
                  height={412}
                  sizes="(max-width: 460px) 48vw, 200px"
                  loading="lazy"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
