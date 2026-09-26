"use client";

import { useEffect, useState } from "react";
import { weddingData } from "@/data/wedding";
import type { PopupId } from "./Popups";

function NavIcon({ id }: { id: PopupId }) {
  const common = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "currentColor" } as const;
  const paths: Record<PopupId, React.ReactNode> = {
    calendar: <path d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2zm12 8v9H5v-9z" />,
    contact: <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.4 11.4 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02z" />,
    location: <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7m0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5" />,
    rsvp: <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8l-5 4V6a2 2 0 0 1 2-2m2.5 4.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5m6 0a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5" />,
    song: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-1.5 4.5v6a3.25 3.25 0 1 1-1.5-2.8V5.6l5-1.4v7.3a3.25 3.25 0 1 1-1.5-2.8V6.9z" />,
  };
  return <svg {...common}>{paths[id]}</svg>;
}

export default function BottomNavBar({
  shown,
  onOpen,
}: {
  shown: boolean;
  onOpen: (id: PopupId) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const items = weddingData.nav;

  return (
    <nav
      id="footer"
      aria-label="Invitation actions"
      style={{
        position: "fixed",
        bottom: shown ? 0 : "-20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        height: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: weddingData.theme.footerBg,
        backdropFilter: "blur(10px)",
        boxShadow: "0 -10px 10px -12px rgba(0,0,0,0.5)",
        zIndex: 10,
        opacity: mounted && shown ? 1 : 0,
        visibility: mounted && shown ? "visible" : "hidden",
        pointerEvents: shown ? "auto" : "none",
        transition: "bottom .5s, opacity .5s, visibility .5s",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpen(item.id)}
            aria-label={item.ariaLabel}
            className="jm-footer-btn"
            style={{ background: "transparent", border: 0, font: "inherit" }}
          >
            <span style={{ display: "inline-flex", color: "#fff" }}>
              <NavIcon id={item.id} />
            </span>
            <small>{item.label}</small>
          </button>
        ))}
      </div>
    </nav>
  );
}
