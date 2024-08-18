import { forwardRef } from "react";
// PLUGINS
import { Portal, Content, Close } from "@radix-ui/react-dialog";
// UTILS
import { cn } from "@/utils";
// COMPONENTS
import ModalOverlay from "./Overlay";
// ICONS
import Cross2Icon from "@/icons/xmark.svg";

const ModalContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...restProps }, ref) => {
  const classNames = cn(
    "fixed z-50 drop-shadow-md border border-neutral-700 top-[50%] left-[50%] w-full h-auto max-w-[95vw] xs:max-w-[450px] max-h-[95vh] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-6 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
    className,
  );

  return (
    <Portal>
      <ModalOverlay />

      <Content ref={ref} className={classNames} {...restProps}>
        {children}
        <Close className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-neutral-400 hover:text-white focus:outline-none disabled:pointer-events-none">
          <Cross2Icon className="h-4 w-4" fill="currentColor" />
          <span className="sr-only">Close</span>
        </Close>
      </Content>
    </Portal>
  );
});

ModalContent.displayName = Content.displayName;

export default ModalContent;
