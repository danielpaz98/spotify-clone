import { forwardRef } from "react";
// PLUGINS
import { Overlay } from "@radix-ui/react-dialog";
// UTILS
import { cn } from "@/utils";

const ModalOverlay = forwardRef<
  React.ElementRef<typeof Overlay>,
  React.ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...restProps }, ref) => {
  const classNames = cn(
    "fixed inset-0 z-50 bg-neutral-900/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    className,
  );

  return <Overlay ref={ref} className={classNames} {...restProps} />;
});

ModalOverlay.displayName = Overlay.displayName;

export default ModalOverlay;
