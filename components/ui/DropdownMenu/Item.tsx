import { forwardRef } from "react";
// PLUGINS
import { Item } from "@radix-ui/react-dropdown-menu";
// UTILS
import { cn } from "@/utils";

interface Props extends React.ComponentPropsWithoutRef<typeof Item> {
  inset?: boolean;
}

const DropdownMenuItem = forwardRef<React.ElementRef<typeof Item>, Props>(
  ({ className, inset, ...restProps }, ref) => {
    const classNames = cn(
      "relative cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-zinc-800 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    );

    return <Item ref={ref} className={classNames} {...restProps} />;
  },
);

DropdownMenuItem.displayName = Item.displayName;

export default DropdownMenuItem;
