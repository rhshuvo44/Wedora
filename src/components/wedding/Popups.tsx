"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { weddingData } from "@/data/wedding";
import { buildGoogleUrl, buildIcs } from "./CalendarSection";
import { Icon } from "./Icons";

export type PopupId = "calendar" | "contact" | "location" | "message" | "rsvp";

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


function RsvpForm({
  onDone,
  onCancel,
}: {
  onDone: (entry: { name: string; message: string }) => void;
  onCancel: () => void;
}) {
  const { rsvp } = weddingData;
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (attending === "yes" && !name.trim()) {
      setError(rsvp.nameRequiredMessage);
      return;
    }
    setError("");
    setSent(true);
    onDone({
      name: name.trim() || rsvp.decliningLabel,
      message: note.trim() || (attending === "yes" ? "Sent their regards." : rsvp.declineMessage),
    });
  };

  return (
    <form onSubmit={submit} style={{ padding: "0 12px 8px" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          type="button"
          className="jm-chip jm-pill"
          aria-pressed={attending === "yes"}
          onClick={() => setAttending("yes")}
          style={{
            flex: 1,
            cursor: "pointer",
            background: attending === "yes" ? "rgba(255,255,255,0.92)" : "transparent",
            color: attending === "yes" ? "#947e7a" : "#fff",
          }}
        >
          <Icon kind="check" size={16} />
          <span>{rsvp.attendingLabel}</span>
        </button>
        <button
          type="button"
          className="jm-chip jm-pill"
          aria-pressed={attending === "no"}
          onClick={() => setAttending("no")}
          style={{
            flex: 1,
            cursor: "pointer",
            background: attending === "no" ? "rgba(255,255,255,0.92)" : "transparent",
            color: attending === "no" ? "#947e7a" : "#fff",
          }}
        >
          <Icon kind="close" size={16} />
          <span>{rsvp.decliningLabel}</span>
        </button>
      </div>

      {attending === "yes" && (
        <>
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

          <label htmlFor="jm-rsvp-guests" style={{ display: "block", fontSize: 12, marginBottom: 4 }}>
            {rsvp.guestsLabel}
          </label>
          <span className="jm-select-wrap" style={{ marginBottom: 12 }}>
            <select
              id="jm-rsvp-guests"
              className="jm-input jm-select"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              {Array.from({ length: rsvp.maxGuests }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n} className="jm-select-option">
                  {n}
                </option>
              ))}
            </select>
            <Icon kind="chevron" size={18} />
          </span>

          <label htmlFor="jm-rsvp-note" style={{ display: "block", fontSize: 12, marginBottom: 4 }}>
            {rsvp.noteLabel}
          </label>
          <textarea
            id="jm-rsvp-note"
            className="jm-input"
            rows={3}
            placeholder={rsvp.notePlaceholder}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </>
      )}

      {error && (
        <p role="alert" style={{ fontSize: 12, marginTop: 8 }}>
          {error}
        </p>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          type="button"
          className="jm-chip"
          onClick={onCancel}
          style={{ flex: 1, cursor: "pointer", background: "transparent", color: "#fff" }}
        >
          {rsvp.cancelLabel}
        </button>
        <button
          type="submit"
          className="jm-chip"
          style={{ flex: 1, cursor: "pointer", background: "rgba(255,255,255,0.92)", color: "#947e7a" }}
        >
          {sent ? "Sent" : rsvp.submitLabel}
        </button>
      </div>
      {sent && (
        <p style={{ fontSize: 12, marginTop: 8, textAlign: "center" }}>
          {attending === "yes" ? rsvp.successMessage : rsvp.declineMessage}
        </p>
      )}
    </form>
  );
}

function MessageForm({
  onDone,
  onCancel,
}: {
  onDone: (entry: { name: string; message: string }) => void;
  onCancel: () => void;
}) {
  const { message } = weddingData;
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => nameRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(message.nameRequiredMessage);
      return;
    }
    if (!note.trim()) {
      setError(message.messageRequiredMessage);
      return;
    }
    setError("");
    setSent(true);
    onDone({ name: name.trim(), message: note.trim() });
  };

  return (
    <form onSubmit={submit} style={{ padding: "0 12px 8px" }}>
      <label htmlFor="jm-message-name" style={{ display: "block", fontSize: 12, marginBottom: 4 }}>
        {message.nameLabel}
      </label>
      <input
        id="jm-message-name"
        ref={nameRef}
        className="jm-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 12 }}
      />

      <label htmlFor="jm-message-body" style={{ display: "block", fontSize: 12, marginBottom: 4 }}>
        {message.messageLabel}
      </label>
      <textarea
        id="jm-message-body"
        className="jm-input"
        rows={4}
        placeholder={message.messagePlaceholder}
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
          type="button"
          className="jm-chip"
          onClick={onCancel}
          style={{ flex: 1, cursor: "pointer", background: "transparent", color: "#fff" }}
        >
          {"Cancel"}
        </button>
        <button
          type="submit"
          className="jm-chip"
          style={{ flex: 1, cursor: "pointer", background: "rgba(255,255,255,0.92)", color: "#947e7a" }}
        >
          {sent ? "Sent" : message.submitLabel}
        </button>
      </div>
      {sent && (
        <p style={{ fontSize: 12, marginTop: 8, textAlign: "center" }}>{message.successMessage}</p>
      )}
    </form>
  );
}

export default function Popups({
  open,
  onClose,
  onWish,
}: {
  open: PopupId | null;
  onClose: () => void;
  onWish: (entry: { name: string; message: string }) => void;
}) {
  const { calendar, contacts, venue, rsvp, message, details } = weddingData;

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
                <p>
                  <strong>{c.name}</strong>
                </p>
                <small style={{ opacity: 0.7, fontSize: 11.5 }}>
                  <i>{c.role}</i>
                </small>
              </div>
              <a href={`tel:${c.phone}`} aria-label={`Call ${c.name}`} className="jm-contact-btn">
                <Icon kind="phone" />
              </a>
              <a
                href={`https://wa.me/${c.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Message ${c.name}`}
                className="jm-contact-btn"
              >
                <Icon kind="whatsapp" />
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

  if (open === "message") {
    return (
      <Shell id="message" title={message.title} onClose={onClose}>
        <MessageForm onDone={onWish} onCancel={onClose} />
      </Shell>
    );
  }

  return (
    <Shell id="rsvp" title={rsvp.title} onClose={onClose}>
      <RsvpForm onDone={onWish} onCancel={onClose} />
    </Shell>
  );
}
