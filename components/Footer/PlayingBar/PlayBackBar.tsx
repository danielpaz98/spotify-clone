import { useEffect, useRef, useState } from "react";
// UTILS
import { cn, formatTime } from "@/utils";
// COMPONENTS
import ProgressBar from "./ProgressBar";
// HOOKS
import { usePlayer } from "@/hooks";

interface Props {
  className?: string;
  onEnd?: () => void;
}

export default function PlayBackBar({ className, onEnd }: Props) {
  const classNames = cn("flex justify-between items-center gap-2 w-full", className);
  const textClassNames = /* tw */ "min-w-[40px] text-[#a7a7a7] mb-[-2px] text-xs font-light";

  const { isReady, getPosition, seek, duration } = usePlayer();
  const frameRef = useRef<number>();
  const [position, setPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const formatDuration = formatTime(duration);
  const formatPosition = formatTime(position);

  const handleSeekStart = ([newValue]: number[]) => {
    setIsSeeking(true);
    setPosition(newValue);
  };

  const handleSeekEnd = ([newValue]: number[]) => {
    setIsSeeking(false);
    seek(newValue);
  };

  useEffect(() => {
    const animate = () => {
      if (isSeeking) return;

      setPosition(getPosition());
      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [getPosition, isSeeking]);

  useEffect(() => {
    if (isReady && Math.ceil(position) === Math.ceil(duration)) onEnd?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, position, duration]);

  return (
    <div className={classNames}>
      <span className={cn(textClassNames, "text-right")}>{formatPosition}</span>

      <ProgressBar
        max={duration}
        min={0}
        step={1}
        value={[position]}
        onValueChange={handleSeekStart}
        onValueCommit={handleSeekEnd}
      />

      <span className={cn(textClassNames, "text-left")}>{formatDuration}</span>
    </div>
  );
}
