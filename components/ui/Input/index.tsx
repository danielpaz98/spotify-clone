import { forwardRef } from "react";
// UTILS
import { cn } from "@/utils";

type Props = React.ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, Props>(({ className, type, ...restProps }, ref) => {
  const classNames = cn(
    "flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:text-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:opacity-50 focus:outline-none disabled:cursor-not-allowed",
    className,
  );

  return <input ref={ref} className={classNames} type={type} {...restProps} />;
});

Input.displayName = "Input";

export default Input;
