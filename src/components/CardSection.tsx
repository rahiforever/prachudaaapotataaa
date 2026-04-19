"use client";

import { motion } from "framer-motion";
import { CardItem } from "@/components/CardItem";
import { BIRTHDAY_CARDS } from "@/lib/cards-data";

type CardSectionProps = {
  lightMotion: boolean;
};

export function CardSection({ lightMotion }: CardSectionProps) {
  return (
    <section className="relative z-10 min-w-0 overflow-x-clip px-4 py-20 md:py-28">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-display)] text-3xl font-semibold text-violet-950 md:text-4xl"
        >
          Happppiestttt Birthdayyy
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.65 }}
          className="mt-3 text-base text-violet-800/80 md:text-lg"
        >
          my one and onlyyy..............
        </motion.p>
      </div>

      <div className="mx-auto grid min-w-0 max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {BIRTHDAY_CARDS.map((card, index) => (
          <div key={card.id} className="min-w-0">
            <CardItem
              card={card}
              index={index}
              lightMotion={lightMotion}
            />
          </div>
        ))}
      </div>
      <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-display)] mx-auto text-center mt-19 text-3xl font-semibold text-violet-950 md:text-4xl"
        >
          Prachudaaaaaaaa
        </motion.h2>
    </section>
  );
}
