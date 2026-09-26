"use client";

import { useEffect, useState } from "react";
import { weddingData } from "@/data/wedding";

interface CoverProps {
  revealed: boolean;
}

const STEPS = [
  ".invtype",
  ".name1",
  ".and",
  ".name2",
  ".cover-date",
];

export default function Cover({ revealed }: CoverProps) {
  const [step, setStep] = useState(0);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setInstant(reduced);
    if (!revealed) return;
    if (reduced) {
      setStep(STEPS.length);
      return;
    }
    const timers = STEPS.map((sel, i) => {
      const node = document.querySelector(`#cover ${sel}`);
      const delay = i * 320;
      const t = window.setTimeout(() => {
        if (node instanceof HTMLElement) {
          node.style.opacity = "1";
          node.style.transform = "none";
        }
      }, delay);
      const raf = window.setTimeout(() => setStep(i + 1), delay);
      return () => {
        window.clearTimeout(t);
        window.clearTimeout(raf);
      };
    });
    return () => timers.forEach((fn) => fn());
  }, [revealed]);

  const { cover, theme } = weddingData;
  const fade = instant ? "none" : "opacity .8s ease";
  const rise = instant ? "none" : "opacity .8s ease, transform .8s ease";

  return (
    <div
      id="cover"
      className="jm-center"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
        backgroundImage: `url(${cover.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }}>
        <h6
          className="invtype"
          style={{
            fontSize: 11,
            lineHeight: 1.2,
            color: theme.coverSubText,
            opacity: revealed && step >= 1 ? 1 : 0,
            transition: fade,
            whiteSpace: "pre-wrap",
          }}
        >
          {cover.invitationType}
        </h6>

        <h1
          className="name1 jm-fh-imperial"
          style={{
            fontSize: 39,
            lineHeight: 0.9,
            color: theme.coverText,
            marginTop: "2rem",
            opacity: revealed && step >= 2 ? 1 : 0,
            transform: revealed && step >= 2 ? "none" : "translateY(10px)",
            transition: rise,
          }}
        >
          {cover.brideNick}
        </h1>

        <h2
          className="and jm-fh-imperial"
          style={{
            fontSize: 19.5,
            lineHeight: 0.9,
            color: theme.coverText,
            margin: "1rem 0",
            opacity: revealed && step >= 3 ? 1 : 0,
            transition: fade,
          }}
        >
          {cover.joiner}
        </h2>

        <h1
          className="name2 jm-fh-imperial"
          style={{
            fontSize: 39,
            lineHeight: 0.9,
            color: theme.coverText,
            opacity: revealed && step >= 4 ? 1 : 0,
            transform: revealed && step >= 4 ? "none" : "translateY(10px)",
            transition: rise,
          }}
        >
          {cover.groomNick}
        </h1>

        <h6
          className="cover-date jm-fh-abhaya"
          style={{
            fontSize: 18,
            lineHeight: 1.2,
            color: theme.coverSubText,
            marginTop: "2rem",
            marginBottom: "0.5rem",
            opacity: revealed && step >= 5 ? 1 : 0,
            transition: fade,
            whiteSpace: "pre-wrap",
          }}
        >
          {cover.dateShort}
        </h6>
      </div>
    </div>
  );
}
