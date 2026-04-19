"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId } from "react";
import { TypingText } from "@/components/TypingText";

type MessageDialogProps = {
  open: boolean;
  message: string;
  typingKey: number;
  skipTyping: boolean;
  onClose: () => void;
  onSkipTyping: () => void;
};

export function MessageDialog({
  open,
  message,
  typingKey,
  skipTyping,
  onClose,
  onSkipTyping,
}: MessageDialogProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(28);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="presentation"
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-violet-950/55 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 grid w-full max-w-lg grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br from-rose-100/95 via-fuchsia-50/95 to-violet-100/95 shadow-2xl shadow-rose-500/25 backdrop-blur-xl [max-height:min(90dvh,calc(100dvh-2rem))]"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <div className="px-6 pt-6 md:px-10 md:pt-10">
              <h2
                id={titleId}
                className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-violet-950 md:text-3xl"
              >
                For you 💌
              </h2>
            </div>
            <div className="min-h-0 overflow-y-auto overscroll-contain px-6 py-5 text-base leading-relaxed text-violet-900/90 [scrollbar-gutter:stable] md:px-10 md:text-lg">
              <TypingText
                key={typingKey}
                text={message}
                skip={skipTyping}
                onSkip={onSkipTyping}
                speedMs={34}
                className="font-[family-name:var(--font-sans)]"
              />
            </div>
            <div className="flex justify-end border-t border-violet-200/50 px-6 py-5 md:px-10 md:pb-10">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose-500/30 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
