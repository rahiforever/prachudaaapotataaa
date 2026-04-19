"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type ParallaxWrapperProps = {
  children: ReactNode;
  className?: string;
  /** Vertical parallax range in px (reduced when reduced motion). */
  range?: number;
};

export function ParallaxWrapper({
  children,
  className = "",
  range = 80,
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduce ? 0 : range],
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`relative min-w-0 overflow-x-clip ${className}`}
    >
      {children}
    </motion.div>
  );
}
