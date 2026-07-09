"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}

export function Typewriter({
  words,
  className,
  typingSpeed = 90,
  deletingSpeed = 45,
  pause = 1600,
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    if (!deleting && subIndex === words[index].length) {
      const timeout = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timeout);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (deleting ? -1 : 1)),
      deleting ? deletingSpeed : typingSpeed,
    );
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className}>
      {words[index]?.substring(0, subIndex)}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-primary align-middle" />
    </span>
  );
}
