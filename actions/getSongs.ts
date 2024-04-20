import { cookies } from "next/headers";
// PLUGINS
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// MODELS
import type { Database, Song } from "@/models";

export default async function getSongs(): Promise<Song[] | null> {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let query = supabase.from("songs").select("*, liked_songs(*)").order("created_at", { ascending: false });

  if (session?.user.id) query = query.eq("user_id", session?.user.id);

  const { data: dataQuery, error } = await query;

  const data = dataQuery?.map(({ liked_songs: [liked_song], ...song }) => ({
    ...song,
    liked: session?.user?.id && Boolean(liked_song),
  })) as unknown as Song[] | null;

  if (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }

  return data;
}
