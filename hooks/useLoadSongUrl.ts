// UTILS
import { supabaseClient } from "@/utils/supabase/client";
// MODELS
import type { Song } from "@/models";

interface HookParams {
  songPath: Song["song_path"];
}

export default function useLoadSongUrl({ songPath }: HookParams) {
  if (!songPath) return;

  const { data } = supabaseClient.storage.from("songs").getPublicUrl(songPath);

  return data.publicUrl;
}
