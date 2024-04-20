"use client";

import { useCallback, useEffect, useState } from "react";
// UTILS
import { supabaseClient } from "@/utils/supabase/client";
// MODELS
import type { Song } from "@/models";
// TYPES
import type { QueryError } from "@supabase/supabase-js";

interface HookParams {
  songId: Song["id"] | undefined;
}

export default function useGetsong({ songId }: HookParams) {
  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<QueryError | null>(null);

  const getSongById = useCallback(async () => {
    try {
      if (!songId) return setSong(null);

      const { data, error: queryError } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", songId)
        .returns<Song[]>()
        .maybeSingle();

      setSong(data);

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
  }, [songId]);

  useEffect(() => {
    void getSongById();
  }, [getSongById]);

  return { song, error, isLoading };
}
