import { forwardRef } from "react";
// UTILS
import { cn } from "@/utils";

type Props = React.ComponentProps<"div">;

const Box = forwardRef<HTMLDivElement, Props>(({ children, className, ...restProps }, ref) => {
  const classNames = cn("rounded-lg bg-cod-gray", className);

  return (
    <div ref={ref} className={classNames} {...restProps}>
      {children}
    </div>
  );
});

Box.displayName = "Box";

export default Box;
