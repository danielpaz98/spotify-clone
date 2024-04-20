import { cookies } from "next/headers";
// PLUGINS
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// MODELS
import type { Database, Song } from "@/models";

export default async function getLikedSongs(): Promise<Song[] | null> {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (!session) return null;

  if (sessionError) {
    // eslint-disable-next-line no-console
    console.log(sessionError.message);
    return [];
  }

  const { data: dataQuery, error } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  const data = dataQuery?.map(({ songs, ...liked_song }) => ({
    ...songs,
    liked: Boolean(liked_song),
  })) as unknown as Song[] | null;

  if (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }

  return data;
}
