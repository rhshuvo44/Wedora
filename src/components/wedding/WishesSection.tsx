"use client";

import { useEffect, useState } from "react";
import { weddingData, type WishEntry } from "@/data/wedding";
import { Icon } from "./Icons";
import { Divider } from "./Ornaments";
import Reveal from "./Reveal";

export default function WishesSection() {
  const { wishes } = weddingData;
  const [local, setLocal] = useState<WishEntry[]>([]);
  const entries = [...local, ...wishes.entries].slice(0, wishes.visibleCount);
  const hiddenCount = local.length + wishes.entries.length - entries.length;

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
      <section className="jm-block jm-block--air">
        <Divider variant="flower" />

        <h3 className="jm-eyebrow">{wishes.title}</h3>

        <div id="timeline" style={{ marginTop: "1.25rem" }}>
          {entries.map((entry, i) => (
            <div key={`${entry.name}-${i}`} className="jm-wish">
              <p className="jm-wish-quote">
                {`\u201C${entry.message}\u201D`}
                <Icon kind="heart" size={13} />
              </p>
              <p className="jm-wish-by">{entry.name}</p>
            </div>
          ))}

          {hiddenCount > 0 && <p className="jm-wish-more">{wishes.moreLabel}</p>}

          {local.length > 0 && (
            <button type="button" className="jm-wish-reset" onClick={() => setLocal([])}>
              Reset
            </button>
          )}
        </div>

        <div className="jm-btn-row">
          <button type="button" className="jm-btn" onClick={() => openPopup("rsvp")}>
            {wishes.rsvpLabel}
          </button>
          <button type="button" className="jm-btn" onClick={() => openPopup("message")}>
            {wishes.messageLabel}
          </button>
        </div>
      </section>
    </Reveal>
  );
}
