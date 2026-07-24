import Image from "next/image";
import type { ImageAsset } from "@/content/types";

type ProfilePortraitProps = {
  asset?: ImageAsset;
  name: string;
  location: string;
  placeholder: {
    title: string;
    note: string;
  };
};

export function ProfilePortrait({
  asset,
  name,
  location,
  placeholder,
}: ProfilePortraitProps) {
  return (
    <figure className="portrait-placeholder">
      <div
        className={`portrait-placeholder__field${
          asset ? " portrait-placeholder__field--image" : ""
        }`}
      >
        {asset ? (
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            priority
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 960px) 42vw, 24rem"
          />
        ) : (
          <>
            <span aria-hidden="true">UN</span>
            <i aria-hidden="true" />
            <b aria-hidden="true" />
          </>
        )}
      </div>
      <figcaption>
        {asset ? (
          <>
            <span>{name}</span>
            {location}
          </>
        ) : (
          <>
            <span>{placeholder.title}</span>
            {placeholder.note}
          </>
        )}
      </figcaption>
    </figure>
  );
}
