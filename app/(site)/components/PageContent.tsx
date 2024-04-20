"use client";

// UTILS
import { cn } from "@/utils";
// MODELS
import type { Song } from "@/models";
// HOOKS
import { usePlayer, useOnPlay } from "@/hooks";
// COMPONENTS
import { SongCard } from "@/components";

interface Props {
  songs: Song[] | null;
}

export default function PageContent({ songs }: Props) {
  const { currentMusic, playing, togglePlayPause } = usePlayer();
  const onPlay = useOnPlay({ songs });

  if (songs?.length === 0) return <div className="mt-4 text-neutral-400">No songs available.</div>;

  const handleOnPlay = ({ song }: { song: Song }) => {
    if (currentMusic?.song?.id !== song.id) return onPlay({ song });

    togglePlayPause();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-6">
      {songs?.map((song) => {
        const isPlaying = playing && currentMusic?.song?.id === song.id;

        return (
          <SongCard key={song.id}>
            <SongCard.Image imagePath={song.image_path}>
              <div
                className={cn(
                  "absolute bottom-2 right-2 opacity-0 z-[2] rounded-full transition duration-3s translate-y-2 shadow-[0_8px_8px_rgb(0,0,0,0.3)] group-hover:opacity-100 group-hover:translate-y-0",
                  { "opacity-100 translate-y-100": isPlaying },
                )}
              >
                <SongCard.PlayButton isPlaying={isPlaying} onClick={() => handleOnPlay({ song })} />
              </div>
            </SongCard.Image>

            <div className="pt-4 space-y-1">
              <SongCard.Title>{song.title}</SongCard.Title>
              <SongCard.Author>{song.author}</SongCard.Author>
            </div>
          </SongCard>
        );
      })}
    </div>
  );
}
