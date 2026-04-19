"use client";

import { useEffect, useRef, useState } from "react";

type TypingTextProps = {
  text: string;
  speedMs?: number;
  skip?: boolean;
  onSkip?: () => void;
  onComplete?: () => void;
  className?: string;
};

export function TypingText({
  text,
  speedMs = 38,
  skip = false,
  onSkip,
  onComplete,
  className = "",
}: TypingTextProps) {
  const [count, setCount] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);
  const completedRef = useRef(false);

  useEffect(() => {
    completedRef.current = false;
    setCount(0);
  }, [text]);

  useEffect(() => {
    const id = window.setInterval(() => setCursorOn((c) => !c), 520);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (skip) {
      setCount(text.length);
    }
  }, [skip, text]);

  useEffect(() => {
    if (skip) return;
    if (count >= text.length) return;
    const id = window.setTimeout(() => setCount((c) => c + 1), speedMs);
    return () => window.clearTimeout(id);
  }, [count, skip, text, speedMs]);

  useEffect(() => {
    if (count < text.length) return;
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  }, [count, text.length, onComplete]);

  const visible = skip ? text : text.slice(0, count);
  const done = skip || count >= text.length;

  return (
    <button
      type="button"
      onClick={() => {
        if (!done) {
          onSkip?.();
        }
      }}
      className={`w-full cursor-pointer text-left ${className}`}
    >
      <span className="whitespace-pre-wrap">{visible}</span>
      <span
        className={`ml-0.5 inline-block w-2 translate-y-px font-light text-rose-400 ${
          cursorOn ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      >
        |
      </span>
      {!done && (
        <span className="mt-2 block text-xs font-normal text-rose-300/80">
          Tap to skip
        </span>
      )}
    </button>
  );
}
