import { weddingData } from "@/data/wedding";
import { Divider } from "./Ornaments";
import Reveal from "./Reveal";

export default function CoupleNamesSection() {
  const { couple } = weddingData;

  return (
    <Reveal>
      <section className="jm-block">
        <p className="jm-names">{couple.bride}</p>
        <p className="jm-names__amp">{couple.joiner}</p>
        <p className="jm-names">{couple.groom}</p>
        <Divider variant="flower" />
      </section>
    </Reveal>
  );
}
