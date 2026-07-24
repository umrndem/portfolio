import Image from "next/image";
import { technologyIcons } from "@/content/technology-icons";

type TechnologyBadgeProps = {
  name: string;
  vertical?: boolean;
};

export function TechnologyBadge({ name, vertical = false }: TechnologyBadgeProps) {
  const icon = technologyIcons[name];

  if (!icon) {
    return (
      <span className={`technology-badge ${vertical ? "technology-badge--vertical" : ""} technology-badge--text`}>
        {name}
      </span>
    );
  }

  return (
    <span className={`technology-badge technology-badge--with-icon${vertical ? " technology-badge--vertical" : ""}`}>
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
      <span className="technology-badge__label">{name}</span>
    </span>
  );
}
