"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function BackgroundDecor() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  const ySlow = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 140]);
  const yFast = useTransform(scrollY, [0, 900], [0, reduce ? 0 : -90]);
  const rotate = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 18]);
//for deployement
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <motion.div
        style={{ y: ySlow }}
        className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-fuchsia-400/35 blur-3xl"
      />
      <motion.div
        style={{ y: yFast, rotate }}
        className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-rose-400/30 blur-3xl"
      />
      <motion.div
        style={{ y: ySlow }}
        className="absolute bottom-20 left-1/4 h-72 w-72 rounded-full bg-violet-400/25 blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.5),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(253,186,223,0.35),transparent_40%)]" />
    </div>
  );
}
