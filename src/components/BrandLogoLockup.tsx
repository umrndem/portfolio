import {
  brandLogoColors,
  brandLogoPaths,
  brandLogoViewBoxPadded,
} from "./brand-logo-paths";

type BrandLogoLockupProps = {
  className?: string;
};

export function BrandLogoLockup({ className }: BrandLogoLockupProps) {
  return (
    <svg
      className={className}
      viewBox={brandLogoViewBoxPadded}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={brandLogoPaths.u} fill={brandLogoColors.u} />
      <path d={brandLogoPaths.slash} fill={brandLogoColors.slash} />
      <path className="brand-logo__n" d={brandLogoPaths.n} />
    </svg>
  );
}
