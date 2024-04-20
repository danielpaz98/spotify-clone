import { forwardRef } from "react";
// UTILS
import { cn } from "@/utils";
// PLUGINS
import { Thumb } from "@radix-ui/react-slider";

const SliderThumb = forwardRef<React.ElementRef<typeof Thumb>, React.ComponentPropsWithoutRef<typeof Thumb>>(
  ({ className, ...restProps }, ref) => {
    const classNames = cn(
      "block h-4 w-4 rounded-full border border-zinc-50/50 bg-zinc-950 shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50",
      className,
    );

    return <Thumb ref={ref} className={classNames} {...restProps} />;
  },
);

SliderThumb.displayName = Thumb.displayName;

export default SliderThumb;
