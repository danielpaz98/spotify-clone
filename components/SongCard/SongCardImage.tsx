// PLUGINS
import Image from "next/image";
// UTILS
import { cn } from "@/utils";
// HOOKS
import { useLoadImageSong } from "@/hooks";
// IMAGES
import PlaceHolderImage from "@/images/music-placeholder.png";

interface Props extends React.ComponentProps<"picture"> {
  imagePath: string;
  alt?: string;
}

export default function SongCardImage({ className, children, imagePath, alt, ...restProps }: Props) {
  const classNames = cn(
    "block relative aspect-square w-full h-full rounded-md shadow-[0_8px_24px_rgb(0,0,0,0.5)] overflow-hidden",
    className,
  );
  const imageUrl = useLoadImageSong({ imagePath });

  return (
    <picture className={classNames} {...restProps}>
      <Image
        fill
        priority
        alt={alt || "Image"}
        className="object-cover object-center"
        sizes="(min-width: 1540px) calc(12.47vw - 96px), (min-width: 1280px) calc(20vw - 122px), (min-width: 1040px) calc(25vw - 138px), (min-width: 820px) calc(33.5vw - 167px), (min-width: 640px) 101px, 180px"
        src={imageUrl || PlaceHolderImage}
      />
      {children}
    </picture>
  );
}
