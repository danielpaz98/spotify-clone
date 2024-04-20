// UTILS
import { cn } from "@/utils";
// HOOKS
import { usePlayer } from "@/hooks";
// COMPONENTS
import ProgressBar from "./ProgressBar";
import { Button, Tooltip } from "@/components/ui";
// ICONS
import VolumeLowIcon from "@/icons/player/volume-low.svg";
import VolumeHighIcon from "@/icons/player/volume-high.svg";
import VolumeMediumIcon from "@/icons/player/volume-medium.svg";
import VolumeXMarkIcon from "@/icons/player/volume-xmark.svg";

interface Props {
  className?: string;
}

const VolumeIcon: React.FC<React.SVGProps<SVGElement> & { volume: number }> = ({
  volume: volumeProp,
  ...restProps
}) => {
  let Icon = VolumeXMarkIcon;
  let ariaLabel = "Volume off";
  const volume = volumeProp * 100;

  if (volume >= 1) {
    Icon = VolumeLowIcon;
    ariaLabel = "Volume low";
  }

  if (volume >= 35) {
    Icon = VolumeMediumIcon;
    ariaLabel = "Volume medium";
  }

  if (volume >= 65) {
    Icon = VolumeHighIcon;
    ariaLabel = "Volume high";
  }

  return <Icon aria-label={ariaLabel} {...restProps} />;
};

export default function VolumeControl({ className }: Props) {
  const classNames = cn("relative flex items-center min-w-[125px]", className);

  const { volume, toggleMute, setVolume } = usePlayer();

  const ariaLabel = volume === 0 ? "Unmute" : "Mute";

  const handleChange = (value: number[]) => {
    const [newValue] = value;
    setVolume(newValue / 100);
  };

  return (
    <div className={classNames}>
      <Button
        aria-describedby="volume-icon"
        aria-label={ariaLabel}
        className="relative flex-shrink-0 p-0 w-8 h-8 text-neutral-400 hover:text-white"
        data-tooltip-id="btn-volume-icon"
        size="sm"
        type="button"
        onClick={toggleMute}
      >
        <VolumeIcon
          className="cursor-pointer flex-shrink-0 w-4 h-4"
          fill="currentColor"
          id="volume-icon"
          volume={volume}
        />
      </Button>

      <Tooltip noArrow delayHide={0} id="btn-volume-icon" place="top">
        <span>{ariaLabel}</span>
      </Tooltip>

      <ProgressBar max={100} min={0} step={1} value={[volume * 100]} onValueChange={handleChange} />
    </div>
  );
}
