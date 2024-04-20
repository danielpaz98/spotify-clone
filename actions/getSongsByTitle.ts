import { cookies } from "next/headers";
// PLUGINS
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// MODELS
import type { Database, Song } from "@/models";
// ACTIONS
import getSongs from "./getSongs";

interface ActionParams {
  title: string;
}

export default async function getSongsByTitle({ title }: ActionParams): Promise<Song[] | null> {
  const supabase = createServerComponentClient<Database>({ cookies });

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data: dataQuery, error } = await supabase
    .from("songs")
    .select("*, liked_songs(*)")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  const data = dataQuery?.map(({ liked_songs: [liked_song], ...song }) => ({
    ...song,
    liked: Boolean(liked_song),
  })) as unknown as Song[] | null;

  if (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }

  return data;
}
