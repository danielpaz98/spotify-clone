"use client";

// HOOKS
import { usePlayer, useLoadSongUrl } from "@/hooks";
// COMPONENTS
import PlayerContent from "./PlayerContent";

export default function PlayingBar() {
  const { currentMusic } = usePlayer();
  const { song } = currentMusic;

  const songUrl = useLoadSongUrl({ songPath: song?.song_path ?? "" });

  if (!songUrl) return null;

  return <PlayerContent songUrl={songUrl} />;
}
