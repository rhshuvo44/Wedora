import { weddingData } from "@/data/wedding";
import { Divider } from "./Ornaments";
import Reveal from "./Reveal";

function FamilyColumn({ parents }: { parents: [string, string] }) {
  return (
    <div>
      <p className="jm-families__name">{parents[0]}</p>
      <p className="jm-families__amp">&amp;</p>
      <p className="jm-families__name">{parents[1]}</p>
    </div>
  );
}

export default function GreetingSection() {
  const { greeting, families, invite } = weddingData;

  return (
    <section className="jm-block jm-block--air">
      <Divider variant="dots" tight />

      <Reveal variant="zoom">
        <p className="jm-arabic" style={{ fontSize: "clamp(20px, 6vw, 26px)", lineHeight: 1.9 }}>
          {greeting.bismillah}
        </p>
        <p
          className="jm-label"
          style={{ marginTop: "0.9rem", letterSpacing: "0.22em" }}
        >
          {greeting.gratitude}
        </p>
      </Reveal>

      <Reveal variant="zoom" delay={160}>
        <Divider variant="flower" />

        <div className="jm-families">
          <FamilyColumn parents={families.brideParents} />
          <div className="jm-families__rule" aria-hidden="true" />
          <FamilyColumn parents={families.groomParents} />
        </div>

        <p className="jm-families__joiner">{families.joiner}</p>
      </Reveal>

      <Reveal>
        <Divider variant="diamond" tight />

        <p className="jm-body" style={{ fontStyle: "italic" }}>
          {invite.lines[0]}
        </p>
        <p className="jm-body jm-quiet" style={{ fontStyle: "italic" }}>
          {invite.lines[1]}
        </p>
      </Reveal>
    </section>
  );
}
