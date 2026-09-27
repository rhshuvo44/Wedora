"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { Icon } from "./Icons";

interface StickyHeaderProps {
  shown: boolean;
  musicPlaying: boolean;
  musicBlocked: boolean;
  onToggleMusic: () => void;
}

const tidyDate = (value: string) => value.replace(/\s*•\s*/, " • ");

export default function StickyHeader({
  shown,
  musicPlaying,
  musicBlocked,
  onToggleMusic,
}: StickyHeaderProps) {
  const { cover, song } = weddingData;
  const label = musicPlaying ? song.pauseLabel : song.playLabel;

  return (
    <motion.header
      id="jm-sticky-head"
      className="jm-head"
      initial={false}
      animate={shown ? { y: 0, opacity: 1 } : { y: -64, opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      inert={!shown}
    >
      <div className="jm-head__inner">
        <p className="jm-head__names">
          {cover.brideNick}
          <span>{cover.joiner}</span>
          {cover.groomNick}
        </p>

        <div className="jm-head__right">
          <p className="jm-head__date">{tidyDate(cover.dateShort)}</p>
          <button
            type="button"
            className="jm-head__music"
            onClick={onToggleMusic}
            aria-pressed={musicPlaying}
            aria-label={label}
            title={label}
            data-blocked={musicBlocked ? "true" : "false"}
          >
            <Icon kind={musicPlaying ? "volume" : "muted"} size={16} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
