"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { rangePoints, type RangePoint } from "@/content/projects";

type RangeLineProps = {
  active?: readonly RangePoint[];
  compact?: boolean;
};

function formatRangeTopics(topics: readonly RangePoint[]) {
  if (topics.length === 0) {
    return "";
  }

  if (topics.length === 1) {
    return topics[0];
  }

  if (topics.length === 2) {
    return `${topics[0]} and ${topics[1]}`;
  }

  return `${topics.slice(0, -1).join(", ")}, and ${topics[topics.length - 1]}`;
}

function connectedSegments(selected: readonly RangePoint[]) {
  const selectedIndexes = new Set(
    selected.map((point) => rangePoints.indexOf(point)),
  );

  return rangePoints.slice(0, -1).flatMap((_, index) =>
    selectedIndexes.has(index) && selectedIndexes.has(index + 1)
      ? [[index, index + 1] as const]
      : [],
  );
}

export function RangeLine({ active, compact = false }: RangeLineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const selected = active ?? [];
  const displayedPoints = active ?? rangePoints;
  const segments = connectedSegments(displayedPoints);

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
          "--segments": rangePoints.length - 1,
        } as React.CSSProperties
      }
      aria-label={
        selected.length > 0
          ? `Technical areas covered: ${formatRangeTopics(selected)}`
          : "Technical range from systems programming through data, databases, product, and people"
      }
    >
      {selected.length > 0 ? (
        <p className="range-line__span" aria-hidden="true">
          <span className="range-line__span-prefix">Covers</span>
          {selected.map((point, index) => (
            <Fragment key={point}>
              {index > 0 ? (
                <span className="range-line__span-sep"> · </span>
              ) : (
                " "
              )}
              <span className="range-line__span-topic">{point}</span>
            </Fragment>
          ))}
        </p>
      ) : null}
      {/* Positioning context for the track so the mobile vertical line spans
          exactly the dot column, not the caption above it. */}
      <div className="range-line__body">
        <div className="range-line__track" aria-hidden="true">
          {segments.map(([start, end]) => (
            <span
              className="range-line__active"
              key={`${start}-${end}`}
              style={
                {
                  "--range-start": start,
                  "--range-end": end,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <ol className="range-line__points">
          {rangePoints.map((point, index) => {
            const isActive = displayedPoints.includes(point);
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
    </div>
  );
}
