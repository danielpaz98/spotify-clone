// UTILS
import { supabaseClient } from "@/utils/supabase/client";
// MODELS
import type { Song } from "@/models";

interface HookParams {
  imagePath: Song["image_path"];
}

export default function useLoadImageSong({ imagePath }: HookParams) {
  if (!imagePath) return;

  const { data } = supabaseClient.storage.from("images").getPublicUrl(imagePath);

  return data.publicUrl;
}
