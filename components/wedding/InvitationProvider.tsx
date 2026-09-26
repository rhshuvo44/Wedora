"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { weddingData } from "@/data/wedding";

interface InvitationContextValue {
  opened: boolean;
  open: () => void;
  musicSupported: boolean;
  musicPlaying: boolean;
  musicUnavailable: boolean;
  toggleMusic: () => void;
}

const InvitationContext = createContext<InvitationContextValue | null>(null);

export function InvitationProvider({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicUnavailable, setMusicUnavailable] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldResumeRef = useRef(false);

  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    const audio = new Audio();
    audio.src = weddingData.music.src;
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "none";
    audio.addEventListener("error", () => setMusicUnavailable(true));
    audioRef.current = audio;
    return audio;
  }, []);

  const play = useCallback(() => {
    if (!weddingData.music.enabled) return;
    const audio = ensureAudio();
    audio
      .play()
      .then(() => {
        setMusicPlaying(true);
        setMusicUnavailable(false);
      })
      .catch(() => {
        setMusicPlaying(false);
        setMusicUnavailable(true);
      });
  }, [ensureAudio]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setMusicPlaying(false);
  }, []);

  const toggleMusic = useCallback(() => {
    if (!opened || !weddingData.music.enabled) return;
    if (audioRef.current && !audioRef.current.paused) {
      pause();
      return;
    }
    play();
  }, [opened, pause, play]);

  const open = useCallback(() => {
    setOpened(true);
    if (weddingData.music.enabled) play();
  }, [play]);

  useEffect(() => {
    if (opened) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    const onVisibilityChange = () => {
      if (document.hidden) {
        shouldResumeRef.current = Boolean(audioRef.current && !audioRef.current.paused);
        audioRef.current?.pause();
      } else if (shouldResumeRef.current) {
        shouldResumeRef.current = false;
        play();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [opened, play]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const value = useMemo<InvitationContextValue>(
    () => ({
      opened,
      open,
      musicSupported: weddingData.music.enabled,
      musicPlaying,
      musicUnavailable,
      toggleMusic,
    }),
    [opened, open, musicPlaying, musicUnavailable, toggleMusic],
  );

  return <InvitationContext.Provider value={value}>{children}</InvitationContext.Provider>;
}

export function useInvitation(): InvitationContextValue {
  const context = useContext(InvitationContext);
  if (!context) {
    throw new Error("useInvitation must be used inside <InvitationProvider>");
  }
  return context;
}
