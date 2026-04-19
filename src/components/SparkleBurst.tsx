"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type SparkleBurstProps = {
  burstKey: number;
};

export function SparkleBurst({ burstKey }: SparkleBurstProps) {
  const particles = useMemo(() => {
    const count = 16;
    return Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const dist = 36 + Math.random() * 56;
      return {
        id: `${burstKey}-${i}`,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        size: 4 + Math.random() * 5,
        delay: Math.random() * 0.06,
      };
    });
  }, [burstKey]);

  if (burstKey === 0) return null;

  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gradient-to-br from-amber-100 via-rose-200 to-fuchsia-300 shadow-sm shadow-amber-200/80"
          style={{ width: p.size, height: p.size }}
          initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], x: p.x, y: p.y, scale: [0.2, 1, 0.3] }}
          transition={{
            duration: 0.75,
            delay: p.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </span>
  );
}
