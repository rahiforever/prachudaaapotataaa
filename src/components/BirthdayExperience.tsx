"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { BackgroundDecor } from "@/components/BackgroundDecor";
import { CardSection } from "@/components/CardSection";
import { FloatingHearts } from "@/components/FloatingHearts";
import { HeroSection } from "@/components/HeroSection";
import { MessageDialog } from "@/components/MessageDialog";
import { MusicPlayer } from "@/components/MusicPlayer";
import { ParallaxWrapper } from "@/components/ParallaxWrapper";
import { SparkleBurst } from "@/components/SparkleBurst";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SURPRISE_MESSAGE } from "@/lib/cards-data";

export function BirthdayExperience() {
  const isMobile = useIsMobile();
  const lightMotion = isMobile;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [skipTyping, setSkipTyping] = useState(false);
  const [typingKey, setTypingKey] = useState(0);
  const [burstKey, setBurstKey] = useState(0);

  const openSurprise = useCallback(() => {
    setBurstKey((k) => k + 1);
    setSkipTyping(false);
    setTypingKey((k) => k + 1);
    setDialogOpen(true);
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full min-w-0 overflow-x-clip bg-[radial-gradient(ellipse_at_top,_#fdf2f8_0%,_#ede9fe_45%,_#fae8ff_100%)]">
      <FloatingHearts />
      <BackgroundDecor />
      <MusicPlayer />

      <main className="relative z-10 min-w-0 overflow-x-clip">
        <HeroSection />

        <CardSection lightMotion={lightMotion} />

        <ParallaxWrapper range={lightMotion ? 28 : 48}>
          <section className="relative z-10 min-w-0 overflow-x-clip px-4 pb-28 pt-4 md:pb-36">
            <div className="mx-auto flex min-w-0 max-w-3xl flex-col items-center text-center">
              <div className="relative inline-flex min-w-0 items-center justify-center">
                <SparkleBurst burstKey={burstKey} />
                <motion.button
                  type="button"
                  onClick={openSurprise}
                  whileHover={lightMotion ? undefined : { scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  className="relative overflow-hidden rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-600 px-10 py-4 text-base font-semibold text-white shadow-xl shadow-fuchsia-500/35 ring-2 ring-white/40 transition hover:brightness-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300 md:px-14 md:py-5 md:text-lg"
                >
                  <span className="relative z-10">A Small Note for You 💌</span>
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 opacity-60 mix-blend-overlay" />
                </motion.button>
              </div>
              <p className="mt-6 max-w-md break-words text-sm text-violet-800/75 md:text-base">
                For my potaatuuuuu kucchuu pucchu pyaarudduu bachaaaaa🥹🥹🥹🥰...
              </p>
            </div>
          </section>
        </ParallaxWrapper>
      </main>

      <MessageDialog
        open={dialogOpen}
        message={SURPRISE_MESSAGE}
        typingKey={typingKey}
        skipTyping={skipTyping}
        onClose={() => setDialogOpen(false)}
        onSkipTyping={() => setSkipTyping(true)}
      />
    </div>
  );
}
