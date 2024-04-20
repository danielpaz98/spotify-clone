import { forwardRef } from "react";
// UTILS
import { cn } from "@/utils";

type Props = React.ComponentProps<"div">;

const Card = forwardRef<HTMLDivElement, Props>(({ className, children, ...restProps }, ref) => {
  const classNames = cn("rounded-lg bg-shark py-4 px-5", className);

  return (
    <div ref={ref} className={classNames} {...restProps}>
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;
