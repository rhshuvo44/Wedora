import { weddingData } from "@/data/wedding";
import Reveal from "./Reveal";

export default function CoupleNamesSection() {
  const { couple } = weddingData;

  return (
    <Reveal>
      <section className="jm-fh-ranget jm-center" style={{ fontSize: 29, lineHeight: 1.6 }}>
        <p>{couple.bride}</p>
        <p>&amp;</p>
        <p>{couple.groom}</p>
      </section>
    </Reveal>
  );
}
