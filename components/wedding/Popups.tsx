"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { weddingData } from "@/data/wedding";
import { buildGoogleUrl, buildIcs } from "./CalendarSection";

export type PopupId = "calendar" | "contact" | "location" | "song" | "rsvp";

function Shell({ id, title, onClose, children }: { id: PopupId; title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div id={`popup-${id}`} role="dialog" aria-modal="true" aria-label={title} className="jm-popup-layer">
      <div className="jm-popup-bg" aria-hidden="true" onClick={onClose} />
      <div className="jm-popup" style={{ background: weddingData.theme.surface }}>
        <p className="jm-popup-title">{title}</p>
        {children}
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: 8 }}>
          <button
            type="button"
            className="jm-chip"
            onClick={onClose}
            style={{ background: "transparent", color: "#fff", cursor: "pointer" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Icon({ kind }: { kind: "whatsapp" | "phone" | "map" | "calendar" | "apple" | "google" }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor" } as const;
  const paths: Record<string, ReactNode> = {
    whatsapp: <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24m-2.6 4.2c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.7 2.7 4.2 3.68 2.08.82 2.5.66 2.95.62.45-.04 1.45-.59 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.11-.22-.17-.46-.29-.24-.12-1.45-.71-1.67-.8-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.43h-.47" />,
    phone: <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.4 11.4 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02z" />,
    map: <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7m0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5" />,
    calendar: <path d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2zm12 8v9H5v-9z" />,
    apple: <path d="M16.36 12.9c.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.42-.14-2.77.83-3.49.83-.72 0-1.83-.81-3-.79-1.55.02-2.98.9-3.77 2.28-1.6 2.79-.41 6.92 1.15 9.19.76 1.11 1.67 2.36 2.86 2.31 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2-1.13 2.75-2.24.87-1.29 1.23-2.54 1.25-2.6-.03-.01-2.4-.92-2.42-3.66zM14.2 5.9c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.67 1.37-.58.68-1.1 1.77-.96 2.81 1.02.08 2.06-.52 2.69-1.28" />,
    google: <path d="M21.35 11.1H12v3.9h5.35c-.24 1.4-1.7 4.1-5.35 4.1a6.1 6.1 0 0 1 0-12.2c1.75 0 2.92.75 3.6 1.4l2.4-2.32A9.6 9.6 0 0 0 12 3a9 9 0 1 0 0 18c5.2 0 8.64-3.65 8.64-8.8 0-.59-.06-1.04-.29-2.1" />,
  };
  return <svg {...common}>{paths[kind]}</svg>;
}

function RsvpForm({ onDone, autoFocusNote }: { onDone: (entry: { name: string; message: string }) => void; autoFocusNote?: boolean }) {
  const { rsvp } = weddingData;
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const noteRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!autoFocusNote) return;
    const id = window.requestAnimationFrame(() => noteRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [autoFocusNote]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please tell us your name.");
      return;
    }
    setError("");
    setSent(true);
    onDone({ name: name.trim(), message: note.trim() || "Sent their regards." });
  };

  return (
    <form onSubmit={submit} style={{ padding: "0 12px 8px" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          type="button"
          className="jm-chip"
          onClick={() => setAttending("yes")}
          style={{
            flex: 1,
            cursor: "pointer",
            background: attending === "yes" ? "rgba(255,255,255,0.92)" : "transparent",
            color: attending === "yes" ? "#947e7a" : "#fff",
          }}
        >
          {rsvp.attendingLabel}
        </button>
        <button
          type="button"
          className="jm-chip"
          onClick={() => setAttending("no")}
          style={{
            flex: 1,
            cursor: "pointer",
            background: attending === "no" ? "rgba(255,255,255,0.92)" : "transparent",
            color: attending === "no" ? "#947e7a" : "#fff",
          }}
        >
          {rsvp.decliningLabel}
        </button>
      </div>

      <label htmlFor="jm-rsvp-name" style={{ display: "block", fontSize: 12, marginBottom: 4 }}>
        {rsvp.nameLabel}
      </label>
      <input
        id="jm-rsvp-name"
        className="jm-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 12 }}
      />

      {attending === "yes" && (
        <>
          <label htmlFor="jm-rsvp-guests" style={{ display: "block", fontSize: 12, marginBottom: 4 }}>
            {rsvp.guestsLabel}
          </label>
          <input
            id="jm-rsvp-guests"
            className="jm-input"
            type="number"
            min={1}
            max={rsvp.maxGuests}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            style={{ marginBottom: 12 }}
          />
        </>
      )}

      <label htmlFor="jm-rsvp-note" style={{ display: "block", fontSize: 12, marginBottom: 4 }}>
        {rsvp.noteLabel}
      </label>
      <textarea
        id="jm-rsvp-note"
        ref={noteRef}
        className="jm-input"
        rows={3}
        placeholder={rsvp.notePlaceholder}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      {error && (
        <p role="alert" style={{ fontSize: 12, marginTop: 8 }}>
          {error}
        </p>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          type="submit"
          className="jm-chip"
          style={{ flex: 1, cursor: "pointer", background: "rgba(255,255,255,0.92)", color: "#947e7a" }}
        >
          {sent ? "Sent" : rsvp.submitLabel}
        </button>
      </div>
      {sent && (
        <p style={{ fontSize: 12, marginTop: 8, textAlign: "center" }}>{rsvp.successMessage}</p>
      )}
    </form>
  );
}

export default function Popups({
  open,
  onClose,
  onWish,
  focusTarget,
}: {
  open: PopupId | null;
  onClose: () => void;
  onWish: (entry: { name: string; message: string }) => void;
  focusTarget?: "note";
}) {
  const { calendar, contacts, venue, song, rsvp, details } = weddingData;

  if (!open) return null;

  if (open === "calendar") {
    return (
      <Shell id="calendar" title="Calendar" onClose={onClose}>
        <div className="jm-center">
          <p style={{ fontSize: 16 }}>{calendar.date}</p>
          <p style={{ fontSize: 12.8, marginBottom: 24 }}>{calendar.time}</p>
        </div>
        <div style={{ display: "flex", gap: 8, padding: "0 12px 12px" }}>
          <a className="jm-chip" href={buildIcs()} download="tasnia-rajib-nikkah.ics" style={{ flex: 1, textDecoration: "none" }}>
            <Icon kind="apple" />
            <span>{calendar.appleLabel}</span>
          </a>
          <a
            className="jm-chip"
            href={buildGoogleUrl()}
            target="_blank"
            rel="noreferrer"
            style={{ flex: 1, textDecoration: "none" }}
          >
            <Icon kind="google" />
            <span>{calendar.googleLabel}</span>
          </a>
        </div>
      </Shell>
    );
  }

  if (open === "contact") {
    return (
      <Shell id="contact" title="Contact" onClose={onClose}>
        <div style={{ padding: "0 12px" }}>
          {contacts.map((c) => (
            <div key={c.phone} style={{ display: "flex", alignItems: "center", marginBottom: 16, gap: 8 }}>
              <div style={{ flex: 1, paddingLeft: 8 }}>
                <p>{c.name}</p>
                <small style={{ opacity: 0.7 }}>
                  <i>{c.role}</i>
                </small>
              </div>
              <a
                href={`https://wa.me/${c.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`WhatsApp ${c.name}`}
                style={{ color: "#fff", display: "inline-flex", padding: 4 }}
              >
                <Icon kind="whatsapp" />
              </a>
              <a
                href={`tel:${c.phone}`}
                aria-label={`Call ${c.name}`}
                style={{ color: "#fff", display: "inline-flex", padding: 4 }}
              >
                <Icon kind="phone" />
              </a>
            </div>
          ))}
        </div>
      </Shell>
    );
  }

  if (open === "location") {
    return (
      <Shell id="location" title="Location" onClose={onClose}>
        <div className="jm-center" style={{ padding: "0 12px" }}>
          <p id="address" style={{ fontSize: 15, color: weddingData.theme.venueText }}>
            {details.venue.value}
          </p>
          <p style={{ fontSize: 13, opacity: 0.85 }}>{venue.address}</p>
          <a
            className="jm-chip"
            href={venue.mapUrl}
            target="_blank"
            rel="noreferrer"
            style={{ margin: "12px auto 0", width: "fit-content", textDecoration: "none" }}
          >
            <Icon kind="map" />
            <span>Maps</span>
          </a>
        </div>
      </Shell>
    );
  }

  if (open === "song") {
    return (
      <Shell id="song" title={song.title} onClose={onClose}>
        <div style={{ padding: "0 12px 4px" }}>
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              title={song.title}
              src={`https://www.youtube-nocookie.com/embed/${song.youtubeId}?rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, borderRadius: 10 }}
            />
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell id="rsvp" title={rsvp.title} onClose={onClose}>
      <RsvpForm onDone={onWish} autoFocusNote={focusTarget === "note"} />
    </Shell>
  );
}
