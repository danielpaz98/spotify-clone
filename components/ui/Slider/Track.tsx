import { forwardRef } from "react";
// UTILS
import { cn } from "@/utils";
// PLUGINS
import { Track } from "@radix-ui/react-slider";

const SliderTrack = forwardRef<React.ElementRef<typeof Track>, React.ComponentPropsWithoutRef<typeof Track>>(
  ({ className, children, ...restProps }, ref) => {
    const classNames = cn("relative h-1.5 w-full grow overflow-hidden rounded-full bg-zinc-50/20", className);

    return (
      <Track ref={ref} className={classNames} {...restProps}>
        {children}
      </Track>
    );
  },
);

SliderTrack.displayName = Track.displayName;

export default SliderTrack;
