import {
  brandLogoCanvasHeight,
  brandLogoColors,
  brandLogoRevealPaths,
  brandLogoRevealWidths,
} from "./brand-logo-paths";

type BrandLogoRevealProps = {
  segment: "mr" | "dem";
  className?: string;
};

export function BrandLogoReveal({ segment, className }: BrandLogoRevealProps) {
  const themed = segment === "dem";

  return (
    <svg
      className={className}
      viewBox={`-1 -1 ${brandLogoRevealWidths[segment] + 2} ${brandLogoCanvasHeight + 2}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      overflow="visible"
    >
      <path
        className={themed ? "brand-logo__n" : undefined}
        d={brandLogoRevealPaths[segment]}
        fill={themed ? undefined : brandLogoColors.reveal}
      />
    </svg>
  );
}
