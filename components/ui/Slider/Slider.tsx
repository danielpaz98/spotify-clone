import { forwardRef } from "react";
// PLUGINS
import { Root } from "@radix-ui/react-slider";
// UTILS
import { cn } from "@/utils";

type Props = React.ComponentPropsWithoutRef<typeof Root>;

const Slider = forwardRef<React.ElementRef<typeof Root>, Props>(
  ({ className, children, ...restProps }, ref) => {
    const classNames = cn("relative flex w-full touch-none select-none items-center", className);

    return (
      <Root ref={ref} className={classNames} {...restProps}>
        {children}
      </Root>
    );
  },
);

Slider.displayName = Root.displayName;

export default Slider;
