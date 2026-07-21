import Image from "next/image";
import type { ImageAsset } from "@/content/types";

type ContentImageProps = {
  asset: ImageAsset;
  className: string;
  sizes: string;
};

export function ContentImage({
  asset,
  className,
  sizes,
}: ContentImageProps) {
  return (
    <figure className={className}>
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
      />
      {asset.caption ? <figcaption>{asset.caption}</figcaption> : null}
    </figure>
  );
}
