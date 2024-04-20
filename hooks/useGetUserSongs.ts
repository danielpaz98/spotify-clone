"use client";

import { useCallback, useEffect, useState } from "react";
// UTILS
import { supabaseClient } from "@/utils/supabase/client";
// MODELS
import type { Song } from "@/models";
// TYPES
import type { QueryError, Session } from "@supabase/supabase-js";

interface HookParams {
  userId: Session["user"]["id"];
}

export default function useGetUserSongs({ userId }: HookParams) {
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<QueryError | null>(null);

  const getSongsByUserId = useCallback(async () => {
    try {
      if (!userId) return setSongs([]);

      const { data, error: queryError } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .returns<Song[]>();

      setSongs(data);

      if (queryError) {
        setError(queryError);
        throw new Error(queryError.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setError(null);
    }
  }, [userId]);

  useEffect(() => {
    void getSongsByUserId();
  }, [getSongsByUserId]);

  return { songs, error, isLoading };
}
