import { forwardRef } from "react";
// UTILS
import { cn } from "@/utils";
// PLUGINS
import { Range } from "@radix-ui/react-slider";

const SliderRange = forwardRef<React.ElementRef<typeof Range>, React.ComponentPropsWithoutRef<typeof Range>>(
  ({ className, ...restProps }, ref) => {
    const classNames = cn("absolute h-full bg-zinc-50", className);

    return <Range ref={ref} className={classNames} {...restProps} />;
  },
);

SliderRange.displayName = Range.displayName;

export default SliderRange;
