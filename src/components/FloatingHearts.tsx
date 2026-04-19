"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

type Heart = {
  id: number;
  left: string;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function buildHearts(count: number): Heart[] {
  const list: Heart[] = [];
  for (let i = 0; i < count; i++) {
    list.push({
      id: i,
      left: `${randomBetween(2, 96)}%`,
      delay: randomBetween(0, 14),
      duration: randomBetween(12, 22),
      size: randomBetween(10, 22),
      opacity: randomBetween(0.08, 0.22),
    });
  }
  return list;
}

export function FloatingHearts() {
  const isMobile = useIsMobile();
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const count = isMobile ? 8 : 18;
    setHearts(buildHearts(count));
  }, [isMobile]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart-float absolute bottom-[-10%] text-rose-400/90 will-change-transform"
          style={
            {
              left: h.left,
              fontSize: `${h.size}px`,
              opacity: h.opacity,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
            } as CSSProperties
          }
        >
          ♥
        </span>
      ))}
    </div>
  );
}
