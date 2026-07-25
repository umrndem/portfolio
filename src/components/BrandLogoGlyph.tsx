import {
  brandLogoCanvasHeight,
  brandLogoColors,
  brandLogoPaths,
} from "./brand-logo-paths";

type BrandLogoGlyphProps = {
  glyph: "u" | "slash" | "n";
  className?: string;
};

const glyphConfig = {
  u: {
    viewBox: `-1 -1 77 ${brandLogoCanvasHeight + 2}`,
    path: brandLogoPaths.u,
    fill: brandLogoColors.u,
    themed: false,
  },
  slash: {
    viewBox: `51 -1 65 ${brandLogoCanvasHeight + 2}`,
    path: brandLogoPaths.slash,
    fill: brandLogoColors.slash,
    themed: false,
  },
  n: {
    viewBox: `98 -1 81 ${brandLogoCanvasHeight + 2}`,
    path: brandLogoPaths.n,
    fill: undefined,
    themed: true,
  },
} as const;

export function BrandLogoGlyph({ glyph, className }: BrandLogoGlyphProps) {
  const config = glyphConfig[glyph];

  return (
    <svg
      className={className}
      viewBox={config.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      overflow="visible"
    >
      <path
        className={config.themed ? "brand-logo__n" : undefined}
        d={config.path}
        fill={config.fill}
      />
    </svg>
  );
}
