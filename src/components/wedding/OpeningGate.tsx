"use client";

import { useEffect, useState } from "react";
import { weddingData } from "@/data/wedding";

const DOOR_DELAY = 300;
const DOOR_DURATION = 2000;
const DOORS_DONE = DOOR_DELAY + DOOR_DURATION;

const prefersReducedMotion = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function OpeningGate({
  onOpened,
  onEngage,
}: {
  onOpened: () => void;
  onEngage?: () => void;
}) {
  const [clicked, setClicked] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!clicked || gone) return;
    if (prefersReducedMotion()) {
      onOpened();
      setGone(true);
      return;
    }
    const doors = window.setTimeout(() => setDoorsOpen(true), DOOR_DELAY);
    const done = window.setTimeout(() => {
      onOpened();
      setGone(true);
    }, DOORS_DONE);
    return () => {
      window.clearTimeout(doors);
      window.clearTimeout(done);
    };
  }, [clicked, gone, onOpened]);

  if (gone) return null;

  const { cover, theme } = weddingData;
  const name = `${cover.brideNick} ${cover.groomNick}`;

  return (
    <div id="gateb" aria-hidden={clicked}>
      <div className={`jm-gate jm-gate-right${doorsOpen ? " open" : ""}`}>
        <div className="jm-gate-door" />
      </div>

      <div className={`jm-gate jm-gate-left${doorsOpen ? " open" : ""}`}>
        <div className="jm-gate-door" />
        <button
          type="button"
          className={`jm-seal${clicked ? " open" : ""}`}
          onClick={() => {
            onEngage?.();
            setClicked(true);
          }}
          disabled={clicked}
          aria-label={`Open the invitation for ${name}`}
          style={{ color: theme.coverText }}
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false" className="jm-seal-shape">
            <path d="M0 50A50 50 0 0 1 100 50A50 50 0 0 1 0 50Z" fill="#cfc4c0" />
          </svg>
          <span className="jm-seal-inner">
            <span className="jm-seal-names">
              <span className="jm-seal-and jm-fh-imperial" aria-hidden="true">
                {cover.joiner}
              </span>
              <span className="jm-seal-name jm-fh-imperial">{name}</span>
            </span>
            <span className="jm-seal-open jm-fh-abhaya">Open</span>
          </span>
        </button>
      </div>
    </div>
  );
}
