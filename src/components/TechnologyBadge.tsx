import Image from "next/image";
import { technologyIcons } from "@/content/technology-icons";

type TechnologyBadgeProps = {
  name: string;
  vertical?: boolean;
  /** Quieter treatment for deployment and integration rows. */
  secondary?: boolean;
};

export function TechnologyBadge({
  name,
  vertical = false,
  secondary = false,
}: TechnologyBadgeProps) {
  const icon = technologyIcons[name];
  const classes = [
    "technology-badge",
    vertical ? "technology-badge--vertical" : "",
    secondary ? "technology-badge--secondary" : "",
    icon ? "technology-badge--with-icon" : "technology-badge--text",
    icon?.logoSafeSurface ? "technology-badge--logo-safe" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!icon) {
    return <span className={classes}>{name}</span>;
  }

  return (
    <span className={classes}>
      <span className="technology-badge__mark">
        {icon.iconDark ? (
          <>
            <Image
              src={icon.iconLight}
              alt=""
              className="technology-badge__icon technology-badge__icon--light"
              width={vertical ? 36 : 18}
              height={vertical ? 36 : 18}
            />
            <Image
              src={icon.iconDark}
              alt=""
              className="technology-badge__icon technology-badge__icon--dark"
              width={vertical ? 36 : 18}
              height={vertical ? 36 : 18}
            />
          </>
        ) : (
          <Image
            src={icon.iconLight}
            alt=""
            className="technology-badge__icon"
            width={vertical ? 36 : 18}
            height={vertical ? 36 : 18}
          />
        )}
      </span>
      <span className="technology-badge__label">{name}</span>
    </span>
  );
}
