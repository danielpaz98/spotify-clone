// PLUGINS
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// MODELS
import type { Database } from "@/models";

export const supabaseClient = createClientComponentClient<Database>({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});
