"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { weddingData } from "@/data/wedding";

const FADE_STEPS = 20;
const FADE_MS = 40;

export function useBackgroundMusic() {
  const { song } = weddingData;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const resumeRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const stopFade = useCallback(() => {
    if (fadeRef.current !== null) {
      window.clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    stopFade();
    el.volume = 0;
    const result = el.play();
    if (result) {
      result
        .then(() => {
          setPlaying(true);
          setBlocked(false);
        })
        .catch(() => {
          setPlaying(false);
          setBlocked(true);
        });
    } else {
      setPlaying(true);
    }
    let step = 0;
    fadeRef.current = window.setInterval(() => {
      step += 1;
      el.volume = Math.min(song.volume, (song.volume * step) / FADE_STEPS);
      if (step >= FADE_STEPS) stopFade();
    }, FADE_MS);
  }, [song.volume, stopFade]);

  const pause = useCallback(() => {
    stopFade();
    audioRef.current?.pause();
    setPlaying(false);
  }, [stopFade]);

  const toggle = useCallback(() => {
    if (playing) pause();
    else play();
  }, [pause, play, playing]);

  useEffect(() => {
    const onVisibility = () => {
      const el = audioRef.current;
      if (!el) return;
      if (document.hidden) {
        resumeRef.current = !el.paused;
        el.pause();
      } else if (resumeRef.current) {
        resumeRef.current = false;
        void el.play().catch(() => undefined);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stopFade();
    };
  }, [stopFade]);

  return { audioRef, playing, blocked, play, pause, toggle };
}

export default function BackgroundMusic({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
  const { song } = weddingData;

  return <audio ref={audioRef} src={song.src} loop preload="auto" />;
}
