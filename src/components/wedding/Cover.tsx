import { weddingData } from "@/data/wedding";
import OpeningGate from "./OpeningGate";
import { Divider, OvalFrame } from "./Ornaments";

interface CoverProps {
  onEngage?: () => void;
  onBegin: () => void;
}

const tidyDate = (value: string) => value.replace(/\s*•\s*/, " • ");

export default function Cover({ onEngage, onBegin }: CoverProps) {
  const { cover } = weddingData;

  return (
    <section
      id="cover"
      className="jm-cover"
      style={{ backgroundImage: `url(${cover.image})` }}
    >
      <OvalFrame />

      <div className="jm-cover__inner">
        <p className="jm-cover__type jm-in jm-in--1">{cover.invitationType}</p>

        <h1 className="jm-cover__names jm-in jm-in--2">
          <span className="jm-cover__name">{cover.brideNick}</span>
          <span className="jm-cover__amp">{cover.joiner}</span>
          <span className="jm-cover__name">{cover.groomNick}</span>
        </h1>

        <div className="jm-in jm-in--3">
          <Divider variant="flower" />
        </div>

        <p className="jm-cover__date jm-in jm-in--4">{tidyDate(cover.dateShort)}</p>
      </div>

      <div className="jm-in jm-in--5">
        <OpeningGate onBegin={onBegin} onEngage={onEngage} />
      </div>
    </section>
  );
}
