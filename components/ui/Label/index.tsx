import { forwardRef } from "react";
// PLUGINS
import { Root } from "@radix-ui/react-label";
// UTILS
import { cn } from "@/utils";

const Label = forwardRef<React.ElementRef<typeof Root>, React.ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...restProps }, ref) => {
    const classNames = cn(
      "text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    );

    return <Root ref={ref} className={classNames} {...restProps} />;
  },
);

Label.displayName = Root.displayName;

export default Label;
