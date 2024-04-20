import { forwardRef } from "react";
// PLUGINS
import { Portal, Content } from "@radix-ui/react-dropdown-menu";
// UTILS
import { cn } from "@/utils";

export interface Props extends React.ComponentPropsWithoutRef<typeof Content> {
  inset?: boolean;
}

const DropdownMenuContent = forwardRef<React.ElementRef<typeof Content>, Props>(
  ({ className, sideOffset = 4, ...restProps }, ref) => {
    const classNames = cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-800 bg-zinc-950 p-1 text-zinc-50 shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    );

    return (
      <Portal>
        <Content ref={ref} className={classNames} sideOffset={sideOffset} {...restProps} />
      </Portal>
    );
  },
);

DropdownMenuContent.displayName = Content.displayName;

export default DropdownMenuContent;
