import { forwardRef } from "react";
// PLUGINS
import { Close } from "@radix-ui/react-popover";
// UTILS
import { cn } from "@/utils";
// ICONS
import Cross2Icon from "@/icons/xmark.svg";

const PopoverClose = forwardRef<React.ElementRef<typeof Close>, React.ComponentPropsWithoutRef<typeof Close>>(
  ({ className, children, ...restProps }, ref) => {
    const classNames = cn(
      "text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none disabled:pointer-events-none",
      className,
    );

    return (
      <Close ref={ref} className={classNames} {...restProps}>
        {children ? children : <Cross2Icon className="h-4 w-4" fill="currentColor" />}
        <span className="sr-only">Close</span>
      </Close>
    );
  },
);

PopoverClose.displayName = Close.displayName;

export default PopoverClose;
