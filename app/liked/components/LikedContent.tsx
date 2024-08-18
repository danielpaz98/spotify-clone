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
    return <div className="flex w-full flex-col gap-y-2 text-neutral-400">No liked songs.</div>;
  }

  return (
    <ul className="flex w-full flex-col gap-y-2 px-6">
      {songs?.map((song) => (
        <li key={song.id} className="flex w-full items-center gap-x-4">
          <div className="flex-1">
            <MediaItem className="hover:bg-white/10 active:bg-white/30" onClick={() => onPlay({ song })}>
              <MediaItem.Image alt={song.title} imagePath={song.image_path} />

              <div className="flex flex-1 flex-col gap-y-1 overflow-hidden">
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
