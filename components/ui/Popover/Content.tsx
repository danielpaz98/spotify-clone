import { forwardRef } from "react";
// PLUGINS
import { Portal, Content } from "@radix-ui/react-popover";
// UTILS
import { cn } from "@/utils";

const PopoverContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, align = "center", sideOffset = 4, ...restProps }, ref) => {
  const classNames = cn(
    "w-72 rounded-md bg-zinc-950 p-4 text-zinc-50 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    className,
  );

  return (
    <Portal>
      <Content ref={ref} align={align} className={classNames} sideOffset={sideOffset} {...restProps} />
    </Portal>
  );
});

PopoverContent.displayName = Content.displayName;

export default PopoverContent;
