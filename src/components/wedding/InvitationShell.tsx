"use client";

import { useCallback, useEffect, useState } from "react";
import { weddingData } from "@/data/wedding";
import BottomNavBar from "./BottomNavBar";
import CalendarSection from "./CalendarSection";
import Cover from "./Cover";
import GallerySection from "./GallerySection";
import GreetingSection from "./GreetingSection";
import CoupleNamesSection from "./CoupleNamesSection";
import {
  DateDetail,
  DressDetail,
  TimeDetail,
  VenueAddressDetail,
  VenueDetail,
} from "./DetailSections";
import Popups, { type PopupId } from "./Popups";
import OpeningGate from "./OpeningGate";
import ProgrammeSection from "./ProgrammeSection";
import Reveal from "./Reveal";
import SnowCanvas from "./SnowCanvas";
import WishesSection from "./WishesSection";

type Phase = "closed" | "opening" | "opened";

export default function InvitationShell() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [popup, setPopup] = useState<PopupId | null>(null);
  const [navShown, setNavShown] = useState(false);
  const opened = phase === "opened";

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
    const onScroll = () => setNavShown(window.scrollY > 220);
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
    <div className="jm-shell" data-state={phase}>
      <SnowCanvas active={opened} />

      <div
        className="jm-cover-gate"
        style={{
          position: opened ? "absolute" : "relative",
          inset: 0,
          zIndex: 30,
          pointerEvents: opened ? "none" : "auto",
        }}
        aria-hidden={opened}
      >
        <Cover revealed={opened} />
        <OpeningGate onOpened={finishOpening} />
      </div>

      <main
        id="page-invite"
        style={{
          color: weddingData.theme.bodyText,
          marginBottom: 80,
          paddingTop: opened ? 24 : 0,
        }}
      >
        <div className="jm-center" style={{ paddingTop: 48 }}>
          <GreetingSection />
          <CoupleNamesSection />
          <br />
          <VenueDetail />
          <br />
          <DateDetail />
          <br />
          <TimeDetail />
          <br />
          <DressDetail />
          <br />
          <CalendarSection />
          <ProgrammeSection />
          <VenueAddressDetail />
        </div>

        <GallerySection />
        <WishesSection />

        <Reveal>
          <div className="jm-center" style={{ margin: "16px 0", padding: "16px 0" }} />
        </Reveal>
      </main>

      <BottomNavBar shown={opened && navShown} onOpen={open} />

      {opened && popup && <Popups open={popup} onClose={close} onWish={onWish} />}
    </div>
  );
}
