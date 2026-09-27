"use client";

import { useCallback, useEffect, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import BackgroundMusic, { useBackgroundMusic } from "./BackgroundMusic";
import BottomNavBar from "./BottomNavBar";
import Cover from "./Cover";
import { DetailsInfoBlock, VenueAddressDetail } from "./DetailSections";
import GallerySection from "./GallerySection";
import GreetingSection from "./GreetingSection";
import CoupleNamesSection from "./CoupleNamesSection";
import { SprigMark } from "./Ornaments";
import Popups, { type PopupId } from "./Popups";
import ProgrammeSection from "./ProgrammeSection";
import Reveal from "./Reveal";
import SnowCanvas from "./SnowCanvas";
import StickyHeader from "./StickyHeader";
import WishesSection from "./WishesSection";

type Phase = "closed" | "opening" | "opened";

const EASE = [0.4, 0, 0.2, 1] as const;

export default function InvitationShell() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [popup, setPopup] = useState<PopupId | null>(null);
  const [chromeShown, setChromeShown] = useState(false);
  const opened = phase === "opened";
  const music = useBackgroundMusic();

  const beginOpening = useCallback(() => setPhase("opening"), []);
  const finishOpening = useCallback(() => setPhase("opened"), []);

  const open = useCallback((id: PopupId) => {
    setPopup(id);
  }, []);

  const close = useCallback(() => {
    setPopup(null);
  }, []);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<PopupId>).detail;
      if (!detail) return;
      setPopup(detail);
    };
    window.addEventListener("jm:open", onOpen);
    return () => window.removeEventListener("jm:open", onOpen);
  }, []);

  useEffect(() => {
    if (!opened) return;
    const onScroll = () => setChromeShown(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [opened]);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  const onWish = useCallback((entry: { name: string; message: string }) => {
    window.dispatchEvent(new CustomEvent("jm:wish", { detail: entry }));
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="jm-shell" data-state={phase}>
        <div className="jm-card">
          <SnowCanvas active={opened} />

          <motion.main
            id="page-invite"
            className="jm-card__body"
            initial={{ opacity: 0, y: 16 }}
            animate={phase === "closed" ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <GreetingSection />
            <CoupleNamesSection />
            <DetailsInfoBlock />
            <ProgrammeSection />
            <VenueAddressDetail />
            <GallerySection />
            <WishesSection />

            <Reveal>
              <footer className="jm-closing">
                <SprigMark />
                <p className="jm-label" style={{ marginTop: "0.9rem" }}>
                  {weddingData.cover.invitationType}
                </p>
              </footer>
            </Reveal>
          </motion.main>

          <StickyHeader
            shown={opened && chromeShown}
            musicPlaying={music.playing}
            musicBlocked={music.blocked}
            onToggleMusic={music.toggle}
          />

          <BottomNavBar
            shown={opened && chromeShown}
            onOpen={open}
            musicPlaying={music.playing}
            onToggleMusic={music.toggle}
          />

          <BackgroundMusic audioRef={music.audioRef} />

          {opened && popup && <Popups open={popup} onClose={close} onWish={onWish} />}
        </div>

        {phase !== "opened" && (
          <motion.div
            className="jm-cover-layer"
            initial={{ opacity: 1, scale: 1 }}
            animate={phase === "opening" ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE }}
            onAnimationComplete={() => {
              if (phase === "opening") finishOpening();
            }}
          >
            <Cover onEngage={music.play} onBegin={beginOpening} />
          </motion.div>
        )}
      </div>
    </MotionConfig>
  );
}
