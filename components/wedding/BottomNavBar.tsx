"use client";

import { motion } from "framer-motion";
import { Disc3, Mail, MapPin, Phone } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { weddingData } from "@/data/wedding";
import { cn } from "@/lib/cn";
import { useInvitation } from "./InvitationProvider";

interface NavItem {
  key: string;
  label: string;
  ariaLabel: string;
  target: string;
  Icon: typeof Phone;
}

const navItems: NavItem[] = [
  {
    key: "contact",
    label: weddingData.nav.contact.label,
    ariaLabel: weddingData.nav.contact.ariaLabel,
    target: weddingData.nav.contact.target,
    Icon: Phone,
  },
  {
    key: "music",
    label: weddingData.nav.music.label,
    ariaLabel: weddingData.nav.music.ariaLabel,
    target: weddingData.nav.music.target,
    Icon: Disc3,
  },
  {
    key: "location",
    label: weddingData.nav.location.label,
    ariaLabel: weddingData.nav.location.ariaLabel,
    target: weddingData.nav.location.target,
    Icon: MapPin,
  },
  {
    key: "rsvp",
    label: weddingData.nav.rsvp.label,
    ariaLabel: weddingData.nav.rsvp.ariaLabel,
    target: weddingData.nav.rsvp.target,
    Icon: Mail,
  },
];

export function BottomNavBar() {
  const { opened, musicSupported, musicPlaying, toggleMusic } = useInvitation();
  const [activeTarget, setActiveTarget] = useState<string | null>(null);

  useEffect(() => {
    if (!opened) return;
    const sections = navItems
      .map((item) => document.getElementById(item.target))
      .filter((element): element is HTMLElement => Boolean(element));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveTarget(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [opened]);

  const goTo = useCallback((target: string) => {
    if (!target) return;
    const element = document.getElementById(target);
    if (!element) return;
    element.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }, []);

  if (!opened) return null;

  return (
    <motion.nav
      aria-label="Invitation sections"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      className="fixed inset-x-0 bottom-0 z-50 bg-mauve"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-1 pt-1.5 pb-1.5">
        {navItems.map(({ key, label, ariaLabel, target, Icon }) => {
          const isMusic = key === "music";
          const isActive = !isMusic && activeTarget === target;
          const musicOn = isMusic && musicPlaying;

          return (
            <li key={key} className="flex-1">
              <button
                type="button"
                onClick={() => (isMusic ? toggleMusic() : goTo(target))}
                aria-label={ariaLabel}
                aria-pressed={isMusic ? musicPlaying : undefined}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex min-h-14 w-full flex-col items-center justify-center gap-1 rounded-[2px] px-1 py-1.5 transition-colors duration-300",
                  isActive ? "text-cream-light" : "text-cream/70 hover:text-cream-light",
                  isMusic && !musicSupported && "opacity-50",
                )}
              >
                <span className="relative flex h-6 w-9 items-center justify-center">
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-transform duration-300",
                      musicOn && "scale-110",
                    )}
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      className="absolute -bottom-1 h-[2px] w-5 rounded-full bg-cream-light"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : null}
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-soft">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div aria-hidden="true" className="h-[3px] w-full lace-divider opacity-70" />
    </motion.nav>
  );
}
