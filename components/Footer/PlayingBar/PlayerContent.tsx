"use client";

import { useEffect, useRef } from "react";
// UTILS
import { cn } from "@/utils";
// HOOKS
import { usePlayer } from "@/hooks";
// COMPONENTS
import { Button } from "@/components/ui";
import { MediaItem, LikeButton } from "@/components";
import VolumeControl from "./VolumeControl";
import PlayBackBar from "./PlayBackBar";
// ICONS
import PlayIcon from "@/icons/player/play.svg";
import PauseIcon from "@/icons/player/pause.svg";
import MusicIcon from "@/icons/player/music.svg";
import BackWardStepIcon from "@/icons/player/backward-step.svg";
import ForwardStepIcon from "@/icons/player/forward-step.svg";
import ShuffleIcon from "@/icons/player/shuffle.svg";
import RepeatIcon from "@/icons/player/repeat.svg";
import Repeat1Icon from "@/icons/player/repeat-1.svg";

interface Props {
  songUrl: string;
}

const btnClassNames /* tw */ = "relative flex-shrink-0 p-0 w-8 h-8 enabled:hover:scale-100";
const statusClassNames /* tw */ = cn(
  "text-brand/80 enabled:hover:text-brand",
  "after:w-1 after:h-1 after:bg-[currentColor] after:rounded-full after:absolute after:bottom-0",
);

export default function PlayerContent({ songUrl }: Props) {
  const previousTitle = useRef<string>(document.title);
  const {
    currentMusic,
    load,
    stop,
    loop,
    looping,
    paused,
    playing,
    shuffle,
    shuffled,
    playNext,
    playPrevious,
    togglePlayPause,
  } = usePlayer();

  const { song } = currentMusic;

  const handleOnEnd = () => {
    if (!looping) playNext();
  };

  useEffect(() => {
    if (!songUrl) return;

    load(songUrl, {
      autoplay: true,
      format: "mp3",
      html5: true,
      initialVolume: 1,
    });

    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songUrl]);

  useEffect(() => {
    if (song) {
      if (!paused) document.title = `${song.title} • ${song.author}`;
      else document.title = previousTitle.current;
    }
  }, [song, paused]);

  return (
    <div className="flex h-[72px] items-center justify-between">
      <div className="flex w-[45%] min-w-[180px] justify-start sm:w-[30%]">
        <div className="flex items-center gap-4">
          <MediaItem className="cursor-text p-0 pl-2 hover:bg-transparent">
            <MediaItem.Image
              alt={song?.title}
              className="z-[2] h-14 w-14 cursor-default rounded-[4px] shadow-[0_0_10px_rgba(0,0,0,.3)]"
              imagePath={song?.image_path}
              imagePlaceholder={null}
            >
              <span className="absolute bottom-[35%] left-[35%] right-[35%] top-[35%]">
                <MusicIcon className="h-full w-full fill-white" />
              </span>
            </MediaItem.Image>

            <div className="mx-1 flex flex-1 flex-col overflow-hidden max-md:gap-y-1">
              <MediaItem.Title className="text-[13px] md:text-sm">{song?.title}</MediaItem.Title>
              <MediaItem.Author className="text-[11px] md:text-xs">{song?.author}</MediaItem.Author>
            </div>
          </MediaItem>

          <LikeButton
            key={song?.liked as unknown as string}
            className="inline-flex translate-x-[-8px] items-center"
            isLiked={song?.liked}
            songId={song?.id as string}
          />
        </div>
      </div>

      <div className="max-w-[722px] flex-1 sm:w-[40%]">
        <div aria-label="Player controls" className="flex flex-col items-center justify-center">
          <div className="mb-2 flex w-full gap-4">
            <div className="flex flex-1 justify-end gap-4 xs:gap-2">
              <Button
                aria-label="Enable shuffle"
                className={cn(btnClassNames, "max-xs:w-auto", shuffled && statusClassNames)}
                role="switch"
                size="sm"
                type="button"
                onClick={() => shuffle(!shuffled)}
              >
                <ShuffleIcon className="h-4 w-4" fill="currentColor" />
              </Button>

              <Button
                aria-label="Previous"
                className={cn(btnClassNames, "max-xs:w-auto")}
                size="sm"
                type="button"
                onClick={playPrevious}
              >
                <BackWardStepIcon className="h-4 w-4" fill="currentColor" />
              </Button>
            </div>

            <Button
              rounded
              aria-label={playing ? "Pause" : "Play"}
              className={cn(btnClassNames, "enabled:hover:scale-[1.06] enabled:focus:scale-[1.06]")}
              size="sm"
              type="button"
              variant="primary"
              onClick={togglePlayPause}
            >
              {playing ? (
                <PauseIcon className="h-4 w-4" fill="currentColor" />
              ) : (
                <PlayIcon className="h-4 w-4" fill="currentColor" />
              )}
            </Button>

            <div className="flex flex-1 justify-start gap-4 xs:gap-2">
              <Button
                aria-label="Next"
                className={cn(btnClassNames, "max-xs:w-auto")}
                size="sm"
                type="button"
                onClick={playNext}
              >
                <ForwardStepIcon className="h-4 w-4" fill="currentColor" />
              </Button>

              <Button
                aria-label={looping ? "Disable repeat" : "Enable repeat one"}
                className={cn(btnClassNames, "max-xs:w-auto", looping && statusClassNames)}
                role="switch"
                size="sm"
                type="button"
                onClick={() => loop(!looping)}
              >
                {looping ? (
                  <Repeat1Icon className="h-4 w-4" fill="currentColor" />
                ) : (
                  <RepeatIcon className="h-4 w-4" fill="currentColor" />
                )}
              </Button>
            </div>
          </div>

          <PlayBackBar onEnd={handleOnEnd} />
        </div>
      </div>

      <div className="min-[180px] hidden w-1/5 justify-center sm:flex md:w-[30%]">
        <VolumeControl className="px-2 md:w-[50%]" />
      </div>
    </div>
  );
}
