import { forwardRef } from "react";
// UTILS
import { cn } from "@/utils";
// COMPONENTS
import { Button } from "@/components/ui";
// ICONS
import PlayIcon from "@/icons/play.svg";
import PauseIcon from "@/icons/pause.svg";

interface Props extends React.ComponentPropsWithoutRef<typeof Button> {
  isPlaying?: boolean;
}

const PlayButton = forwardRef<React.ElementRef<typeof Button>, Props>(
  ({ className, rounded = true, isPlaying, variant = "brand", children, ...restProps }, ref) => {
    const classNames = cn("min-h-[auto] p-3 enabled:active:bg-brand/80", className);
    const Icon = isPlaying ? PauseIcon : PlayIcon;

    return (
      <Button
        {...restProps}
        ref={ref}
        className={classNames}
        rounded={rounded}
        type="button"
        variant={variant}
      >
        {children ? children : <Icon className="w-6 h-6" fill="black" />}
      </Button>
    );
  },
);

PlayButton.displayName = "PlayButton";

export default PlayButton;
