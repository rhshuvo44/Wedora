import type { ReactNode } from "react";
import { weddingData } from "@/data/wedding";
import Reveal from "./Reveal";

interface DetailSectionProps {
  label: string;
  children: ReactNode;
}

export function DetailSection({ label, children }: DetailSectionProps) {
  return (
    <Reveal>
      <section>
        <h5 className="jm-section-title" style={{ color: weddingData.theme.titleText }}>
          {label}
        </h5>
        {children}
      </section>
    </Reveal>
  );
}

export function VenueDetail() {
  return (
    <DetailSection label={weddingData.details.venue.label}>
      <p className="jm-value jm-center" style={{ color: weddingData.theme.venueText }}>
        {weddingData.details.venue.value}
      </p>
    </DetailSection>
  );
}

export function DateDetail() {
  const { lead, day, ordinal, tail } = weddingData.details.date;
  return (
    <DetailSection label={weddingData.details.date.label}>
      <p className="jm-center">
        {lead} {day}
        <sup style={{ fontSize: "0.75em" }}>{ordinal}</sup> {tail}
      </p>
    </DetailSection>
  );
}

export function TimeDetail() {
  return (
    <DetailSection label={weddingData.details.time.label}>
      <p className="jm-center">{weddingData.details.time.value}</p>
    </DetailSection>
  );
}

export function DressDetail() {
  return (
    <Reveal>
      <section>
        <p className="jm-center">
          <strong style={{ fontSize: 15, color: weddingData.theme.dressText, fontWeight: 600 }}>
            {weddingData.dressCode.label}
          </strong>
        </p>
        <p className="jm-center">
          <span className="jm-value" style={{ color: weddingData.theme.dressText }}>
            {weddingData.dressCode.value}
          </span>
        </p>
      </section>
    </Reveal>
  );
}

export function VenueAddressDetail() {
  const { venue } = weddingData;
  return (
    <Reveal>
      <div style={{ padding: "24px 20px", margin: "24px 0" }}>
        <p className="jm-center">{venue.label}</p>
        <p className="jm-center">________________________________</p>
        <p className="jm-center">{venue.address}</p>
        <p className="jm-center">_________________________________</p>
        <p className="jm-center">
          <br />
        </p>
        <p className="jm-center">
          <strong>{venue.note}</strong>
        </p>
      </div>
    </Reveal>
  );
}
