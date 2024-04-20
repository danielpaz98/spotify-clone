"use client";

// MODELS
import type { Song } from "@/models";
// HOOKS
import { useOnPlay } from "@/hooks";
// COMPONENTS
import { MediaItem, LikeButton } from "@/components";

interface Props {
  songs: Song[] | null;
}

export default function LikedContent({ songs }: Props) {
  const onPlay = useOnPlay({ songs });

  if (songs?.length === 0) {
    return <div className="flex flex-col gap-y-2 w-full text-neutral-400">No liked songs.</div>;
  }

  return (
    <ul className="flex flex-col gap-y-2 w-full px-6">
      {songs?.map((song) => (
        <li key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem className="hover:bg-white/10 active:bg-white/30" onClick={() => onPlay({ song })}>
              <MediaItem.Image alt={song.title} imagePath={song.image_path} />

              <div className="flex flex-col flex-1 gap-y-1 overflow-hidden">
                <MediaItem.Title>{song.title}</MediaItem.Title>
                <MediaItem.Author>{song.author}</MediaItem.Author>
              </div>
            </MediaItem>
          </div>

          <LikeButton isLiked={song?.liked} songId={song.id} />
        </li>
      ))}
    </ul>
  );
}
