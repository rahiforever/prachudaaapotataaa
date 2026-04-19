"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

/** File must live under `public/audio/`. Update this if you rename the file. */
const AUDIO_SRC = "/audio/romance-placeholder.mp3";
const TARGET_VOLUME = 0.35;
const FADE_MS = 2800;

type MusicPlayerProps = {
  className?: string;
};

export function MusicPlayer({ className = "" }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const clearFade = () => {
    if (fadeFrameRef.current != null) {
      cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = null;
    }
  };

  const fadeVolumeTo = useCallback(
    (target: number, from: number, durationMs: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      clearFade();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - (1 - t) ** 2;
        audio.volume = from + (target - from) * eased;
        if (t < 1) {
          fadeFrameRef.current = requestAnimationFrame(step);
        } else {
          fadeFrameRef.current = null;
        }
      };
      fadeFrameRef.current = requestAnimationFrame(step);
    },
    [],
  );

  const startPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        setEnabled(true);
        setUnlocked(true);
        fadeVolumeTo(TARGET_VOLUME, 0, FADE_MS);
      })
      .catch(() => {
        /* autoplay blocked — wait for user */
      });
  }, [fadeVolumeTo]);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.preload = "auto";
    audio.loop = true;
    audioRef.current = audio;

    startPlayback();

    const onInteract = () => {
      if (!audioRef.current) return;
      if (audioRef.current.paused) startPlayback();
    };

    window.addEventListener("pointerdown", onInteract, { passive: true });
    window.addEventListener("keydown", onInteract);

    return () => {
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      clearFade();
      audio.pause();
      audioRef.current = null;
    };
  }, [startPlayback]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!unlocked) {
      startPlayback();
      return;
    }
    if (audio.paused) {
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          setEnabled(true);
          fadeVolumeTo(TARGET_VOLUME, 0, FADE_MS);
        })
        .catch(() => {});
    } else {
      clearFade();
      fadeVolumeTo(0, audio.volume, 600);
      window.setTimeout(() => {
        audio.pause();
        setEnabled(false);
      }, 620);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className={`fixed right-4 top-4 z-[100] flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/15 text-xl shadow-lg shadow-rose-500/20 backdrop-blur-md transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 md:right-6 md:top-6 ${className}`}
      aria-label={enabled ? "Mute background music" : "Play background music"}
      title={enabled ? "Mute" : "Play"}
    >
      {enabled ? "🔊" : "🔇"}
    </motion.button>
  );
}
