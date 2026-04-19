"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { BirthdayCard } from "@/lib/cards-data";

type CardItemProps = {
  card: BirthdayCard;
  index: number;
  lightMotion: boolean;
};

export function CardItem({ card, index, lightMotion }: CardItemProps) {
  const reduce = useReducedMotion();
  const prefersReduced = reduce === true;

  const tiltX = prefersReduced ? 0 : lightMotion ? 11 : 16;
  const tiltY = prefersReduced
    ? 0
    : lightMotion
      ? (index % 2 === 0 ? -6 : 6)
      : index % 2 === 0
        ? -12
        : 12;
  const liftZ = prefersReduced ? 0 : lightMotion ? -48 : -72;

  return (
    <div
      className="group relative max-w-full [perspective:1100px] [transform-style:preserve-3d]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.article
        initial={
          prefersReduced
            ? { opacity: 0, y: 28 }
            : {
                opacity: 0,
                y: 42,
                rotateX: tiltX,
                rotateY: tiltY,
                z: liftZ,
                scale: 0.94,
              }
        }
        whileInView={
          prefersReduced
            ? { opacity: 1, y: 0 }
            : {
                opacity: 1,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                z: 0,
                scale: 1,
              }
        }
        viewport={{
          once: true,
          amount: lightMotion ? 0.22 : 0.28,
          margin: "0px 0px -8% 0px",
        }}
        transition={{
          duration: prefersReduced ? 0.5 : 0.78,
          delay: prefersReduced ? 0 : index * 0.09,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformStyle: "preserve-3d" }}
        whileHover={
          prefersReduced || lightMotion
            ? undefined
            : {
                rotateX: -4,
                rotateY: index % 2 === 0 ? 5 : -5,
                z: 16,
                scale: 1.03,
                y: -6,
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              }
        }
        className="relative will-change-transform"
      >
        <div
          className={`relative overflow-hidden rounded-3xl border border-white/55 bg-gradient-to-br from-white/75 via-rose-50/85 to-violet-100/75 p-2.5 shadow-xl shadow-rose-500/18 backdrop-blur-xl transition-[box-shadow] duration-300 sm:p-3 ${
            lightMotion ? "" : "hover:shadow-2xl hover:shadow-fuchsia-500/22"
          }`}
        >
          <div
            className={`pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 ${
              lightMotion ? "" : "bg-gradient-to-br from-rose-400/18 via-transparent to-violet-500/22"
            }`}
          />
          <div
            className={`relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-inner shadow-black/10 ring-1 ring-white/40 ${
              lightMotion ? "" : "animate-card-float"
            }`}
            style={{ animationDelay: `${index * 0.35}s` }}
          >
            <Image
              src={card.imageSrc}
              alt={card.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="rounded-2xl object-cover transition duration-500 group-hover:scale-[1.04]"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              draggable={false}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-violet-950/55 via-transparent to-transparent" />
            <p className="absolute bottom-3 left-3 right-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-white drop-shadow-md md:text-3xl">
              {card.adjective}
            </p>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
