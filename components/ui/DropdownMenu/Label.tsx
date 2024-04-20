import { forwardRef } from "react";
// PLUGINS
import { Label } from "@radix-ui/react-dropdown-menu";
// UTILS
import { cn } from "@/utils";

interface Props extends React.ComponentPropsWithoutRef<typeof Label> {
  inset?: boolean;
}

const DropdownMenuLabel = forwardRef<React.ElementRef<typeof Label>, Props>(
  ({ className, inset, ...restProps }, ref) => {
    const classNames = cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className);

    return <Label ref={ref} className={classNames} {...restProps} />;
  },
);

DropdownMenuLabel.displayName = Label.displayName;

export default DropdownMenuLabel;
