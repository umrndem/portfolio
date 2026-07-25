"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: ElementType;
};

/**
 * One-shot scroll entrance: opacity + slight rise.
 * Final state is shown immediately under prefers-reduced-motion.
 */
export function Reveal({
  children,
  className = "",
  delayMs = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    // Final state comes from CSS under prefers-reduced-motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style =
    delayMs > 0
      ? ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties)
      : undefined;

  return (
    <Tag
      // Polymorphic host; IntersectionObserver only needs an HTMLElement.
      ref={ref as never}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
