import { forwardRef } from "react";
// PLUGINS
import { SubTrigger } from "@radix-ui/react-dropdown-menu";
// UTILS
import { cn } from "@/utils";
// ICONS
import ChevronRightIcon from "@/icons/chevron-right.svg";

interface Props extends React.ComponentPropsWithoutRef<typeof SubTrigger> {
  inset?: boolean;
}

const DropdownMenuSubTrigger = forwardRef<React.ElementRef<typeof SubTrigger>, Props>(
  ({ className, inset, children, ...restProps }, ref) => {
    const classNames = cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-zinc-800 data-[state=open]:bg-zinc-800",
      inset && "pl-8",
      className,
    );

    return (
      <SubTrigger ref={ref} className={classNames} {...restProps}>
        {children}
        <ChevronRightIcon className="ml-auto h-4 w-4" />
      </SubTrigger>
    );
  },
);

DropdownMenuSubTrigger.displayName = SubTrigger.displayName;

export default DropdownMenuSubTrigger;
