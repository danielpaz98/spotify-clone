import { cookies } from "next/headers";
// PLUGINS
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// TYPES
import type { Session as SessionSupabase } from "@supabase/supabase-js";
// MODELS
import type { Database, User } from "@/models";

interface Session extends Omit<SessionSupabase, "user"> {
  user: User | null;
}

export default async function getUserSession(): Promise<Session | null> {
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

  const { data: user, error } = await supabase.from("users").select("*").returns<User[]>().maybeSingle();

  if (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }

  return { ...session, user };
}
