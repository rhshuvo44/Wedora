import type { ReactNode } from "react";
import { weddingData } from "@/data/wedding";
import CalendarSection from "./CalendarSection";
import Reveal from "./Reveal";

function InfoField({ label, value, color }: { label: string; value: ReactNode; color?: string }) {
  return (
    <div className="jm-info-field">
      <h5 className="jm-info-label" style={color ? { color } : undefined}>
        {label}
      </h5>
      <p className="jm-center jm-info-value">{value}</p>
    </div>
  );
}

export function DetailsInfoBlock() {
  const { details, dressCode, theme } = weddingData;
  const { lead, day, ordinal, tail } = details.date;

  return (
    <Reveal>
      <section className="jm-section jm-center" style={{ paddingTop: 40, paddingBottom: 8 }}>
        <InfoField label={details.venue.label} value={details.venue.value} color={theme.venueText} />
        <InfoField
          label={details.date.label}
          value={
            <>
              {lead} {day}
              <sup className="jm-ordinal">{ordinal}</sup> {tail}
            </>
          }
        />
        <InfoField label={details.time.label} value={details.time.value} />
        <InfoField label={dressCode.label} value={dressCode.value} color={theme.dressText} />
        <div className="jm-info-cta">
          <CalendarSection />
        </div>
      </section>
    </Reveal>
  );
}

export function VenueAddressDetail() {
  const { venue, theme } = weddingData;
  return (
    <Reveal>
      <section className="jm-section jm-center" style={{ paddingTop: 40, paddingBottom: 40, margin: "24px 0" }}>
        <h5 className="jm-section-title" style={{ color: theme.titleText }}>
          {venue.label}
        </h5>
        <hr className="jm-divider" style={{ margin: "18px 0" }} />
        <p className="jm-value" style={{ color: theme.venueText }}>
          {venue.address}
        </p>
        <hr className="jm-divider" style={{ margin: "18px 0" }} />
        <p className="jm-center" style={{ marginTop: "28px" }}>
          <strong>{venue.note}</strong>
        </p>
      </section>
    </Reveal>
  );
}
