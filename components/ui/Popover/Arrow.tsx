import { forwardRef } from "react";
// PLUGINS
import { Arrow } from "@radix-ui/react-popover";
// UTILS
import { cn } from "@/utils";

const PopoverArrow = forwardRef<React.ElementRef<typeof Arrow>, React.ComponentPropsWithoutRef<typeof Arrow>>(
  ({ className, ...restProps }, ref) => {
    const classNames = cn("fill-zinc-950", className);

    return <Arrow ref={ref} className={classNames} {...restProps} />;
  },
);

PopoverArrow.displayName = Arrow.displayName;

export default PopoverArrow;
