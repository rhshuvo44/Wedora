import { weddingData } from "@/data/wedding";
import Reveal from "./Reveal";

export default function GreetingSection() {
  const { greeting, families, invite } = weddingData;

  return (
    <section className="jm-section" style={{ marginBottom: 8 }}>
      <Reveal variant="zoom">
        <div style={{ margin: "0 0 16px" }}>
          <p>
            <span className="block" style={{ fontSize: 23, lineHeight: 1.6 }}>
              {greeting.bismillah}
            </span>
          </p>
          <p>
            <span className="block" style={{ fontSize: 12 }}>
              {greeting.gratitude}
            </span>
          </p>
          <p>
            <span className="block" style={{ fontSize: 12 }}>
              {greeting.rule}
            </span>
          </p>
        </div>
      </Reveal>

      <Reveal variant="zoom" delay={200}>
        <section>
          <p className="jm-fh-blackmango jm-center" style={{ fontSize: 16, lineHeight: 1.6, color: weddingData.theme.bodyText }}>
            {families.brideParents[0]}
          </p>
          <p className="jm-fh-blackmango jm-center" style={{ fontSize: 16, lineHeight: 1.6, color: weddingData.theme.bodyText }}>
            &amp;
          </p>
          <p className="jm-fh-blackmango jm-center" style={{ fontSize: 16, lineHeight: 1.6, color: weddingData.theme.bodyText }}>
            {families.brideParents[1]}
          </p>
          <p className="jm-center" style={{ margin: "1rem 0" }}>
            {families.joiner}
          </p>
          <p className="jm-fh-blackmango jm-center" style={{ fontSize: 16, lineHeight: 1.6, color: weddingData.theme.bodyText }}>
            {families.groomParents[0]}
          </p>
          <p className="jm-fh-blackmango jm-center" style={{ fontSize: 16, lineHeight: 1.6, color: weddingData.theme.bodyText }}>
            &amp;
          </p>
          <p className="jm-fh-blackmango jm-center" style={{ fontSize: 16, lineHeight: 1.6, color: weddingData.theme.bodyText }}>
            {families.groomParents[1]}
          </p>
        </section>
      </Reveal>

      <Reveal>
        <div style={{ margin: "1rem 0" }}>
          <p className="jm-center">
            <span className="jm-fh-beautique block" style={{ fontSize: 14, color: weddingData.theme.inviteText }}>
              {invite.lines[0]}
            </span>
          </p>
          <p className="jm-center">
            <span className="jm-fh-beautique block" style={{ fontSize: 14, color: weddingData.theme.inviteText }}>
              {invite.lines[1]}
            </span>
          </p>
          <p className="jm-center">
            <br />
          </p>
        </div>
      </Reveal>
    </section>
  );
}
