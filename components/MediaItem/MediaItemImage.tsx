// PLUGINS
import Image, { type StaticImageData } from "next/image";
// UTILS
import { cn } from "@/utils";
// HOOKS
import { useLoadImageSong } from "@/hooks";
// IMAGES
import PlaceHolderImage from "@/images/music-placeholder.png";

interface Props extends React.ComponentProps<"picture"> {
  image?: StaticImageData;
  imagePath?: string;
  imagePlaceholder?: StaticImageData | null;
  alt?: string;
}

export default function MediaItemImage({
  className,
  children,
  image,
  imagePath,
  imagePlaceholder = PlaceHolderImage,
  alt,
  ...restProps
}: Props) {
  const classNames = cn(
    "relative block rounded-md h-12 w-12 bg-dire-wolf shadow-[0_4px_60px_rgba(0,0,0,.5)] overflow-hidden",
    className,
  );
  const imageUrl = useLoadImageSong({ imagePath: imagePath! });
  const imageSrc = imageUrl ?? (image || imagePlaceholder);

  return (
    <picture className={classNames} {...restProps}>
      {imageSrc && (
        <Image
          fill
          priority
          alt={alt || "Image"}
          className="z-[1] object-cover object-center"
          sizes="64px"
          src={imageSrc}
        />
      )}
      {children}
    </picture>
  );
}
