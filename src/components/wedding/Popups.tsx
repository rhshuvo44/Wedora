"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { buildGoogleUrl, buildIcs } from "./CalendarSection";
import { Icon } from "./Icons";
import { Divider } from "./Ornaments";

export type PopupId = "calendar" | "contact" | "location" | "message" | "rsvp";

const EASE = [0.22, 0.61, 0.36, 1] as const;

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
      <div className="jm-popup-scrim" aria-hidden="true" onClick={onClose} />
      <motion.div
        className="jm-popup"
        initial={{ opacity: 0, scale: 0.985, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <p className="jm-popup-title">{title}</p>
        {children}
        <div className="jm-popup-foot">
          <button type="button" className="jm-btn jm-btn--ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </motion.div>
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
    <form onSubmit={submit}>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.15rem" }}>
        <button
          type="button"
          className="jm-chip"
          aria-pressed={attending === "yes"}
          onClick={() => setAttending("yes")}
          style={{ flex: 1 }}
        >
          <Icon kind="check" size={15} />
          <span>{rsvp.attendingLabel}</span>
        </button>
        <button
          type="button"
          className="jm-chip"
          aria-pressed={attending === "no"}
          onClick={() => setAttending("no")}
          style={{ flex: 1 }}
        >
          <Icon kind="close" size={15} />
          <span>{rsvp.decliningLabel}</span>
        </button>
      </div>

      {attending === "yes" && (
        <>
          <label className="jm-form-label" htmlFor="jm-rsvp-name">
            {rsvp.nameLabel}
          </label>
          <input
            id="jm-rsvp-name"
            className="jm-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "0.85rem" }}
          />

          <label className="jm-form-label" htmlFor="jm-rsvp-guests">
            {rsvp.guestsLabel}
          </label>
          <span className="jm-select-wrap" style={{ display: "block", marginBottom: "0.85rem" }}>
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
            <Icon kind="chevron" size={16} />
          </span>

          <label className="jm-form-label" htmlFor="jm-rsvp-note">
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
        <p role="alert" className="jm-form-note" style={{ color: "#8a4a44", fontStyle: "normal" }}>
          {error}
        </p>
      )}

      <div className="jm-form-actions">
        <button type="button" className="jm-chip" onClick={onCancel} style={{ flex: 1 }}>
          {rsvp.cancelLabel}
        </button>
        <button type="submit" className="jm-chip" data-on="true" style={{ flex: 1 }}>
          {sent ? "Sent" : rsvp.submitLabel}
        </button>
      </div>
      {sent && (
        <p className="jm-form-note">
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
    <form onSubmit={submit}>
      <label className="jm-form-label" htmlFor="jm-message-name">
        {message.nameLabel}
      </label>
      <input
        id="jm-message-name"
        ref={nameRef}
        className="jm-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: "0.85rem" }}
      />

      <label className="jm-form-label" htmlFor="jm-message-body">
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
        <p role="alert" className="jm-form-note" style={{ color: "#8a4a44", fontStyle: "normal" }}>
          {error}
        </p>
      )}

      <div className="jm-form-actions">
        <button type="button" className="jm-chip" onClick={onCancel} style={{ flex: 1 }}>
          {"Cancel"}
        </button>
        <button type="submit" className="jm-chip" data-on="true" style={{ flex: 1 }}>
          {sent ? "Sent" : message.submitLabel}
        </button>
      </div>
      {sent && <p className="jm-form-note">{message.successMessage}</p>}
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
          <p className="jm-lede">{calendar.date}</p>
          <p className="jm-body jm-quiet">{calendar.time}</p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.1rem" }}>
          <a className="jm-chip" href={buildIcs()} download="tasnia-rajib-nikkah.ics" style={{ flex: 1 }}>
            <Icon kind="apple" />
            <span>{calendar.appleLabel}</span>
          </a>
          <a
            className="jm-chip"
            href={buildGoogleUrl()}
            target="_blank"
            rel="noreferrer"
            style={{ flex: 1 }}
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
        <div>
          {contacts.map((c) => (
            <div key={c.phone} className="jm-contact-row">
              <div>
                <p style={{ fontSize: "15.5px", lineHeight: 1.4 }}>{c.name}</p>
                <p className="jm-label" style={{ marginTop: "0.2rem", opacity: 0.8 }}>
                  {c.role}
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.45rem" }}>
                <a href={`tel:${c.phone}`} aria-label={`Call ${c.name}`} className="jm-contact-btn">
                  <Icon kind="phone" size={16} />
                </a>
                <a
                  href={`https://wa.me/${c.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Message ${c.name}`}
                  className="jm-contact-btn"
                >
                  <Icon kind="whatsapp" size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Shell>
    );
  }

  if (open === "location") {
    return (
      <Shell id="location" title="Location" onClose={onClose}>
        <div className="jm-center">
          <p id="address" className="jm-lede">
            {details.venue.value}
          </p>
          <p className="jm-body jm-quiet" style={{ marginTop: "0.4rem" }}>
            {venue.address}
          </p>
          <Divider variant="diamond" tight />
          <a
            className="jm-btn"
            href={venue.mapUrl}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <span style={{ alignItems: "center", display: "inline-flex", gap: "0.5rem" }}>
              <Icon kind="map" size={15} />
              <span>Maps</span>
            </span>
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
