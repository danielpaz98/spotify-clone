import { cookies } from "next/headers";
// PLUGINS
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// MODELS
import type { Database, LibraryData } from "@/models";

export default async function getLibraryData(): Promise<LibraryData | null> {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (!session) return null;

  if (sessionError) {
    // eslint-disable-next-line no-console
    console.log(sessionError.message);
    return null;
  }

  const { data, error } = await supabase
    .rpc("get_library_data", { user_id: session.user.id })
    .returns<LibraryData[]>()
    .maybeSingle();

  if (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }

  return data;
}
