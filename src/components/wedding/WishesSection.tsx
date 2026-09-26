"use client";

import { useEffect, useState } from "react";
import { weddingData, type WishEntry } from "@/data/wedding";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

export default function WishesSection() {
  const { wishes } = weddingData;
  const [local, setLocal] = useState<WishEntry[]>([]);
  const entries = [...local, ...wishes.entries];

  useEffect(() => {
    const onWish = (event: Event) => {
      const detail = (event as CustomEvent<WishEntry>).detail;
      if (!detail?.name || !detail?.message) return;
      setLocal((prev) => [{ message: detail.message, name: detail.name }, ...prev]);
    };
    window.addEventListener("jm:wish", onWish);
    return () => window.removeEventListener("jm:wish", onWish);
  }, []);

  const openPopup = (id: "rsvp" | "message") => {
    window.dispatchEvent(new CustomEvent("jm:open", { detail: id }));
  };

  return (
    <Reveal>
      <div className="jm-section">
        <section className="jm-center">
          <div style={{ marginTop: "24px" }}>
            <h5 className="jm-section-title" style={{ marginBottom: "1rem" }}>
              {wishes.title}
            </h5>
            <div
              id="timeline"
              style={{
                fontSize: "0.8em",
                maxHeight: 336,
                overflowY: "auto",
                padding: "0 15px",
                scrollbarWidth: "thin",
              }}
            >
              {entries.map((entry, i) => (
                <div key={`${entry.name}-${i}`} className="jm-wish">
                  <p className="jm-center jm-wish-quote">
                    <i>{`\u201C${entry.message}\u201D`}</i>
                    <Icon kind="heart" size={15} />
                  </p>
                  <b className="jm-center">{entry.name}</b>
                </div>
              ))}
              {local.length > 0 && (
                <button
                  type="button"
                  onClick={() => setLocal([])}
                  style={{
                    background: "transparent",
                    border: 0,
                    color: weddingData.theme.bodyText,
                    cursor: "pointer",
                    font: "inherit",
                    textDecoration: "underline",
                  }}
                >
                  Reset
                </button>
              )}
            </div>
            <div className="jm-wish-actions">
              <button type="button" className="jm-outline-btn" onClick={() => openPopup("rsvp")}>
                {wishes.rsvpLabel}
              </button>
              <button type="button" className="jm-outline-btn" onClick={() => openPopup("message")}>
                {wishes.messageLabel}
              </button>
            </div>
          </div>
        </section>
      </div>
    </Reveal>
  );
}
