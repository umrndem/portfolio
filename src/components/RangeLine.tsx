"use client";

import { useEffect, useRef, useState } from "react";
import { rangePoints, type RangePoint } from "@/content/projects";

type RangeLineProps = {
  active?: readonly [RangePoint, RangePoint];
  compact?: boolean;
};

export function RangeLine({ active, compact = false }: RangeLineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const start = active ? rangePoints.indexOf(active[0]) : 0;
  const end = active ? rangePoints.indexOf(active[1]) : rangePoints.length - 1;

  useEffect(() => {
    const node = rootRef.current;

    if (!node) {
      return;
    }

    // Final fill state comes from CSS under prefers-reduced-motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={[
        "range-line",
        compact ? "range-line--compact" : "",
        inView ? "is-in-view" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--range-start": start,
          "--range-end": end,
          "--segments": rangePoints.length - 1,
        } as React.CSSProperties
      }
      aria-label={
        active
          ? `Technical range from ${active[0]} to ${active[1]}`
          : "Technical range from systems through data, databases, product, and people"
      }
    >
      <div className="range-line__track" aria-hidden="true">
        <span className="range-line__active" />
      </div>
      <ol className="range-line__points">
        {rangePoints.map((point, index) => {
          const isActive = index >= start && index <= end;
          return (
            <li
              className={isActive ? "is-active" : undefined}
              key={point}
              style={{ "--point-index": index } as React.CSSProperties}
            >
              <span className="range-line__dot" aria-hidden="true" />
              <span className="range-line__label">{point}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
