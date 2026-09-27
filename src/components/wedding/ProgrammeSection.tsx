import { weddingData } from "@/data/wedding";
import { Divider } from "./Ornaments";
import Reveal from "./Reveal";

export default function ProgrammeSection() {
  const { programme } = weddingData;

  return (
    <Reveal>
      <section className="jm-block jm-block--air">
        <Divider variant="flower" />

        <h3 className="jm-eyebrow">Programme</h3>

        <div className="jm-programme" style={{ marginTop: "1.5rem" }}>
          {programme.items.map((item) => (
            <div key={item.title} className="jm-programme__item">
              <p className="jm-programme__title">{item.title}</p>
              <p className="jm-programme__time">{item.time}</p>
            </div>
          ))}
        </div>

        <Divider variant="dots" tight />
      </section>
    </Reveal>
  );
}
