import { forwardRef } from "react";
// UTILS
import { cn } from "@/utils";
// COMPONENTS
import PlayingBar from "./PlayingBar";

type Props = React.ComponentPropsWithoutRef<"footer">;

const Footer = forwardRef<HTMLElement, Props>(({ className, ...restProps }, ref) => {
  const classNames = cn(
    "bg-black flex flex-col max-md:fixed max-md:bottom-0 max-md:z-10 max-md:w-full",
    className,
  );

  return (
    <footer ref={ref} className={classNames} {...restProps}>
      <PlayingBar />
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
