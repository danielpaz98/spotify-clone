import { forwardRef } from "react";
// PLUGINS
import { SubContent } from "@radix-ui/react-dropdown-menu";
// UTILS
import { cn } from "@/utils";

interface Props extends React.ComponentPropsWithoutRef<typeof SubContent> {
  inset?: boolean;
}

const DropdownMenuSubContent = forwardRef<React.ElementRef<typeof SubContent>, Props>(
  ({ className, ...restProps }, ref) => {
    const classNames = cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-800 bg-zinc-950 p-1 text-zinc-50 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    );

    return <SubContent ref={ref} className={classNames} {...restProps} />;
  },
);

DropdownMenuSubContent.displayName = SubContent.displayName;

export default DropdownMenuSubContent;
