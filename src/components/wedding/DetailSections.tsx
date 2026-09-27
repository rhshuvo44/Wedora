import type { ReactNode } from "react";
import { weddingData } from "@/data/wedding";
import CalendarSection from "./CalendarSection";
import { Divider } from "./Ornaments";
import Reveal from "./Reveal";

function InfoField({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="jm-field">
      <h3 className="jm-label">{label}</h3>
      <p className="jm-field__value">{value}</p>
    </div>
  );
}

export function DetailsInfoBlock() {
  const { details, dressCode } = weddingData;
  const { lead, day, ordinal, tail } = details.date;

  return (
    <Reveal>
      <section className="jm-block jm-block--air">
        <InfoField label={details.venue.label} value={details.venue.value} />

        <div className="jm-dash" aria-hidden="true" />

        <InfoField
          label={details.date.label}
          value={
            <>
              {lead} {day}
              <sup className="jm-field__ordinal">{ordinal}</sup> {tail}
            </>
          }
        />

        <div className="jm-dash" aria-hidden="true" />

        <InfoField label={details.time.label} value={details.time.value} />

        <div className="jm-dash" aria-hidden="true" />

        <InfoField label={dressCode.label} value={dressCode.value} />

        <div className="jm-btn-row">
          <CalendarSection />
        </div>
      </section>
    </Reveal>
  );
}

export function VenueAddressDetail() {
  const { venue } = weddingData;

  return (
    <Reveal>
      <section className="jm-block jm-block--air">
        <Divider variant="flower" />

        <h3 className="jm-eyebrow">{venue.label}</h3>

        <p className="jm-lede" style={{ marginTop: "0.9rem" }}>
          {venue.address}
        </p>

        <Divider variant="diamond" tight />

        <p className="jm-body" style={{ fontStyle: "italic" }}>
          {venue.note}
        </p>
      </section>
    </Reveal>
  );
}
