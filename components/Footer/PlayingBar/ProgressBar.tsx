import { forwardRef } from "react";
// UTILS
import { cn } from "@/utils";
// COMPONENTS
import { Slider } from "@/components/ui";

const ProgressBar = forwardRef<
  React.ElementRef<typeof Slider>,
  React.ComponentPropsWithoutRef<typeof Slider>
>(({ className, ...restProps }, ref) => {
  const classNames = cn("h-3 group select-none touch-none", className);

  return (
    <Slider ref={ref} className={classNames} {...restProps}>
      <Slider.Track className="h-1 rounded-sm bg-white/30">
        <Slider.Range className="group-hover:bg-brand/80" />
      </Slider.Track>

      <Slider.Thumb className="cursor-pointer h-3 w-3 bg-white shadow-[0_2px_4px_0_rgba(0,0,0,.5)] invisible group-hover:visible border-none focus-visible:ring-0" />
    </Slider>
  );
});

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
