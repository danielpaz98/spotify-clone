import { forwardRef } from "react";
// PLUGINS
import { Separator } from "@radix-ui/react-dropdown-menu";
// UTILS
import { cn } from "@/utils";

interface Props extends React.ComponentPropsWithoutRef<typeof Separator> {
  inset?: boolean;
}

const DropdownMenuSeparator = forwardRef<React.ElementRef<typeof Separator>, Props>(
  ({ className, ...restProps }, ref) => {
    const classNames = cn("h-px bg-zinc-800", className);

    return <Separator ref={ref} className={classNames} {...restProps} />;
  },
);

DropdownMenuSeparator.displayName = Separator.displayName;

export default DropdownMenuSeparator;
