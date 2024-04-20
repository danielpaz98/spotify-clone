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
    <div className="flex justify-between items-center h-[72px]">
      <div className="flex w-[45%] sm:w-[30%] min-w-[180px] justify-start">
        <div className="flex gap-4 items-center">
          <MediaItem className="p-0 pl-2 cursor-text hover:bg-transparent">
            <MediaItem.Image
              alt={song?.title}
              className="z-[2] w-14 h-14 rounded-[4px] cursor-default shadow-[0_0_10px_rgba(0,0,0,.3)]"
              imagePath={song?.image_path}
              imagePlaceholder={null}
            >
              <span className="absolute top-[35%] bottom-[35%] left-[35%] right-[35%]">
                <MusicIcon className="fill-white w-full h-full" />
              </span>
            </MediaItem.Image>

            <div className="flex flex-col flex-1 mx-1 max-md:gap-y-1 overflow-hidden">
              <MediaItem.Title className="text-[13px] md:text-sm">{song?.title}</MediaItem.Title>
              <MediaItem.Author className="text-[11px] md:text-xs">{song?.author}</MediaItem.Author>
            </div>
          </MediaItem>

          <LikeButton
            key={song?.liked as unknown as string}
            className="inline-flex items-center translate-x-[-8px]"
            isLiked={song?.liked}
            songId={song?.id as string}
          />
        </div>
      </div>

      <div className="max-w-[722px] flex-1 sm:w-[40%]">
        <div aria-label="Player controls" className="flex flex-col justify-center items-center">
          <div className="flex gap-4 mb-2 w-full">
            <div className="flex flex-1 gap-4 xs:gap-2 justify-end">
              <Button
                aria-label="Enable shuffle"
                className={cn(btnClassNames, "max-xs:w-auto", shuffled && statusClassNames)}
                role="switch"
                size="sm"
                type="button"
                onClick={() => shuffle(!shuffled)}
              >
                <ShuffleIcon className="w-4 h-4" fill="currentColor" />
              </Button>

              <Button
                aria-label="Previous"
                className={cn(btnClassNames, "max-xs:w-auto")}
                size="sm"
                type="button"
                onClick={playPrevious}
              >
                <BackWardStepIcon className="w-4 h-4" fill="currentColor" />
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
                <PauseIcon className="w-4 h-4" fill="currentColor" />
              ) : (
                <PlayIcon className="w-4 h-4" fill="currentColor" />
              )}
            </Button>

            <div className="flex flex-1 gap-4 xs:gap-2 justify-start">
              <Button
                aria-label="Next"
                className={cn(btnClassNames, "max-xs:w-auto")}
                size="sm"
                type="button"
                onClick={playNext}
              >
                <ForwardStepIcon className="w-4 h-4" fill="currentColor" />
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
                  <Repeat1Icon className="w-4 h-4" fill="currentColor" />
                ) : (
                  <RepeatIcon className="w-4 h-4" fill="currentColor" />
                )}
              </Button>
            </div>
          </div>

          <PlayBackBar onEnd={handleOnEnd} />
        </div>
      </div>

      <div className="hidden min-[180px] w-1/5 md:w-[30%] justify-center sm:flex">
        <VolumeControl className="md:w-[50%] px-2" />
      </div>
    </div>
  );
}
