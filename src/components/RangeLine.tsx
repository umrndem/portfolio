import { rangePoints, type RangePoint } from "@/content/portfolio";

type RangeLineProps = {
  active?: [RangePoint, RangePoint];
  compact?: boolean;
};

export function RangeLine({ active, compact = false }: RangeLineProps) {
  const start = active ? rangePoints.indexOf(active[0]) : 0;
  const end = active ? rangePoints.indexOf(active[1]) : rangePoints.length - 1;

  return (
    <div
      className={`range-line${compact ? " range-line--compact" : ""}`}
      style={
        {
          "--range-start": start,
          "--range-end": end,
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
              aria-current={isActive ? "step" : undefined}
            >
              <span aria-hidden="true" />
              {point}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
