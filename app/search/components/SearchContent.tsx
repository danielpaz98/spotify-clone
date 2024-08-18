"use client";

// UTILS
import { cn } from "@/utils";
// MODELS
import type { Song } from "@/models";
// HOOKS
import { usePlayer, useOnPlay } from "@/hooks";
import { useAuth } from "@/contexts/AuthContext/hooks";
// COMPONENTS
import { SongCard, LikeButton } from "@/components";

interface PageContentProps {
  songs: Song[] | null;
}

export default function SearchContent({ songs }: PageContentProps) {
  const { currentMusic, playing, togglePlayPause } = usePlayer();
  const { session } = useAuth();
  const onPlay = useOnPlay({ songs });

  if (songs?.length === 0) {
    return <div className="flex w-full flex-col gap-y-2 text-neutral-400">No songs found.</div>;
  }

  const handleOnPlay = ({ song }: { song: Song }) => {
    if (currentMusic?.song?.id !== song.id) return onPlay({ song });

    togglePlayPause();
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(19.5rem,1fr))] 2xl:grid-cols-4">
      {songs?.map((song) => {
        const isPlaying = playing && currentMusic?.song?.id === song.id;

        return (
          <SongCard key={song.id} className="items-start gap-5 p-5">
            <div className="flex w-full justify-between">
              <SongCard.Image className="w-[92px] rounded-full" imagePath={song.image_path} />
              {session && (
                <LikeButton
                  key={song?.liked as unknown as string}
                  className="h-6 w-6 self-start"
                  isLiked={song.liked}
                  songId={song.id}
                />
              )}
            </div>

            <div className="space-y-1">
              <SongCard.Title className="text-[2rem] font-bold">{song.title}</SongCard.Title>
              <SongCard.Author>{song.author}</SongCard.Author>
            </div>

            <div
              className={cn(
                "absolute bottom-5 right-5 z-[2] translate-y-2 rounded-full opacity-0 shadow-[0_8px_8px_rgb(0,0,0,0.3)] transition duration-3s group-hover:translate-y-0 group-hover:opacity-100",
                { "translate-y-100 opacity-100": isPlaying },
              )}
            >
              <SongCard.PlayButton isPlaying={isPlaying} onClick={() => handleOnPlay({ song })} />
            </div>
          </SongCard>
        );
      })}
    </div>
  );
}
