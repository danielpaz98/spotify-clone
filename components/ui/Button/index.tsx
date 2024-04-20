import { forwardRef } from "react";
// UTILS
import { cn } from "@/utils";

type Variant = "default" | "primary" | "secondary" | "dark" | "brand";
type Size = "default" | "sm" | "lg";

interface Props extends React.ComponentProps<"button"> {
  variant?: Variant;
  size?: Size;
  rounded?: boolean;
  block?: boolean;
}

const buttonVariants = /* tw */ {
  default: "bg-transparent text-neutral-400 enabled:hover:text-white",
  primary: "bg-white text-black enabled:hover:bg-highlight",
  secondary: "bg-shark text-white enabled:hover:bg-shark/90",
  dark: "bg-neutral-950 text-white enabled:hover:bg-neutral-950",
  brand: "bg-brand/90 text-black enabled:hover:bg-brand",
};

const buttonSizes = /* tw */ {
  default: "min-h-[48px] px-4 py-2",
  sm: "min-h-[32px] rounded-md py-1 px-4 text-sm",
  lg: "min-h-[48px] rounded-md px-8 py-2",
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "default", size = "default", children, className, rounded, block, ...restProps }, ref) => {
    const classNames = cn(
      "inline-flex items-center justify-center whitespace-nowrap normal-case rounded-md text-base font-bold ring-offset-black",
      "transition-[background-color,border-color,color,box-shadow,filter] duration-33ms",
      "focus-visible:outline-none focus-visible:ring-[1.6px] focus-visible:ring-offset-[1.6px] focus-visible:ring-zinc-300",
      "disabled:cursor-not-allowed disabled:opacity-60 enabled:hover:scale-105",
      buttonVariants[variant],
      buttonSizes[size],
      rounded && "rounded-full",
      block && "w-full",
      className,
    );

    return (
      <button ref={ref} className={classNames} {...restProps}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
