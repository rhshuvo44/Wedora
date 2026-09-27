"use client";

import { useState } from "react";
import { weddingData } from "@/data/wedding";

interface OpeningGateProps {
  /** Called on the same gesture that starts playback. */
  onEngage?: () => void;
  /** Called the moment the card is asked to open. */
  onBegin: () => void;
}

export default function OpeningGate({ onEngage, onBegin }: OpeningGateProps) {
  const [pending, setPending] = useState(false);
  const { cover } = weddingData;
  const name = `${cover.brideNick} & ${cover.groomNick}`;

  return (
    <button
      type="button"
      className="jm-cover__open"
      data-pending={pending ? "true" : "false"}
      disabled={pending}
      onClick={() => {
        onEngage?.();
        setPending(true);
        onBegin();
      }}
      aria-label={`Open the invitation for ${name}`}
    >
      Open
    </button>
  );
}
