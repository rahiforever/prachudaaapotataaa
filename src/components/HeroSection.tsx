"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 420], [0, reduce ? 0 : 90]);
  const opacity = useTransform(scrollY, [0, 260], [1, reduce ? 1 : 0.35]);

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pt-16">
      <div className="hero-gradient absolute inset-0" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.5)_0%,_transparent_55%)]"
        aria-hidden
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-4xl text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-rose-600 via-fuchsia-600 to-violet-700 drop-shadow-[0_0_40px_rgba(244,114,182,0.45)]"
        >
          <motion.span
            className="inline-block"
            animate={
              reduce
                ? undefined
                : {
                    scale: [1, 1.025, 1],
                    filter: [
                      "drop-shadow(0 0 28px rgba(244,114,182,0.55))",
                      "drop-shadow(0 0 42px rgba(167,139,250,0.65))",
                      "drop-shadow(0 0 28px rgba(244,114,182,0.55))",
                    ],
                  }
            }
            transition={{
              duration: 5.5,
              repeat: reduce ? 0 : Infinity,
              ease: "easeInOut",
            }}
          >
            Happy Birthday My ❤️
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 sm:text-3xl text-xl font-extrabold uppercase tracking-[0.35em] text-rose-500/90 md:text-base"
        >
          Happy Birthday - 21
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2 text-rose-400/80">
          <span className="text-xs tracking-widest">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-lg"
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
