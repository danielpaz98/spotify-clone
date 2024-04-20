"use client";

import { useEffect, useId, useRef, useState } from "react";
// PLUGINS
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
// UTILS
import { cn } from "@/utils";
import { supabaseClient } from "@/utils/supabase/client";
// COMPONENTS
import { Tooltip } from "@/components/ui";
// HOOKS
import { useAuth } from "@/contexts/AuthContext/hooks";
import { usePlayer } from "@/hooks";
// STORES
import { useAuthModal, useLastLikedSong } from "@/store";
// MODELS
import type { Song } from "@/models";
// IMAGES
import LikedSongsImage from "@/images/liked-songs.png";
// LOTTIE
import LikeAnimation from "@/lottie/like-animation.json";

interface Props extends Omit<React.ComponentProps<"button">, "children"> {
  isLiked?: boolean;
  songId: string;
}

const animationSegments = {
  liked: [14, 56] as [number, number],
  notLiked: [82, 118] as [number, number],
};

export default function LikeButton({ className, isLiked: isLikedProp, songId, ...restProps }: Props) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const tooltipId = useId();
  const ariaLabel = isLiked ? "Remove from Your Library" : "Save to Your Library";
  const classNames = cn(
    "w-4 h-4 scale-[3] translate-x-[5px] active:opacity-70 hover:scale-[3.15] transition-[opacity] disabled:cursor-pointer",
    className,
  );

  const { session } = useAuth();
  const { setLastLikedSong } = useLastLikedSong();
  const { currentMusic, setCurrentMusic } = usePlayer();
  const authModal = useAuthModal();
  const router = useRouter();
  const user = session?.user;

  const handleLike = async () => {
    if (!songId) return;

    if (!user) return authModal.onOpen({ view: "sign_in" });

    setIsLiked((currIsLiked) => !currIsLiked);

    if (currentMusic.song?.id === songId) {
      const song = { ...currentMusic.song, liked: !isLiked };
      setCurrentMusic({ song });
    }

    if (isLiked) {
      setIsLoading(true);
      setLastLikedSong(null);

      lottieRef.current?.playSegments(animationSegments.notLiked);

      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      } else {
        enqueueSnackbar("Removed from Liked Songs.", {
          variant: "info",
          autoHideDuration: 5000,
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
          imageUrl: LikedSongsImage.src,
        });
      }

      setIsLoading(false);
    } else {
      setIsLoading(true);

      lottieRef.current?.playSegments(animationSegments.liked);

      const { data, error } = await supabaseClient
        .from("liked_songs")
        .insert({
          song_id: Number(songId),
          user_id: user.id,
        })
        .select("*, songs(*)")
        .maybeSingle();

      setLastLikedSong(data?.songs as unknown as Song);

      if (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      } else {
        enqueueSnackbar("Added to Liked Songs.", {
          variant: "info",
          autoHideDuration: 5000,
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
          imageUrl: LikedSongsImage.src,
        });
      }

      setIsLoading(false);
    }

    router.refresh();
  };

  useEffect(() => {
    setIsLiked(isLikedProp!);
  }, [isLikedProp]);

  return (
    <>
      <button
        aria-label={ariaLabel}
        className={classNames}
        data-tooltip-id={tooltipId}
        disabled={isLoading}
        onClick={handleLike}
        {...restProps}
      >
        <Lottie
          animationData={LikeAnimation}
          autoplay={false}
          initialSegment={isLiked ? animationSegments.liked : animationSegments.notLiked}
          loop={false}
          lottieRef={lottieRef}
        />
      </button>

      <Tooltip noArrow delayHide={0} id={tooltipId} offset={-5} place="top">
        <span>{ariaLabel}</span>
      </Tooltip>
    </>
  );
}
