"use client";

import { weddingData, type NavItem } from "@/data/wedding";
import type { PopupId } from "./Popups";
import { Icon } from "./Icons";

type NavPopupId = Exclude<NavItem["id"], "song">;

function NavIcon({ id }: { id: NavPopupId }) {
  const common = { width: 19, height: 19, viewBox: "0 0 24 24", fill: "currentColor" } as const;
  const paths: Record<NavPopupId, React.ReactNode> = {
    contact: <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.4 11.4 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02z" />,
    location: <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7m0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5" />,
    rsvp: <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8l-5 4V6a2 2 0 0 1 2-2m2.5 4.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5m6 0a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5" />,
  };
  return <svg {...common}>{paths[id]}</svg>;
}

export default function BottomNavBar({
  shown,
  onOpen,
  musicPlaying,
  onToggleMusic,
}: {
  shown: boolean;
  onOpen: (id: PopupId) => void;
  musicPlaying: boolean;
  onToggleMusic: () => void;
}) {
  const items = weddingData.nav;

  return (
    <nav
      id="footer"
      className="jm-nav"
      aria-label="Invitation actions"
      data-shown={shown ? "true" : "false"}
      inert={!shown}
    >
      <div className="jm-nav__row">
        {items.map((item) => {
          if (item.id === "song") {
            return (
              <button
                key={item.id}
                type="button"
                className="jm-nav__btn"
                onClick={onToggleMusic}
                aria-pressed={musicPlaying}
                aria-label={musicPlaying ? weddingData.song.pauseLabel : weddingData.song.playLabel}
              >
                <span>
                  <Icon kind={musicPlaying ? "volume" : "muted"} size={19} />
                </span>
                <small>{item.label}</small>
              </button>
            );
          }
          const id: NavPopupId = item.id;
          return (
            <button
              key={id}
              type="button"
              className="jm-nav__btn"
              onClick={() => onOpen(id)}
              aria-label={item.ariaLabel}
            >
              <span>
                <NavIcon id={id} />
              </span>
              <small>{item.label}</small>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
