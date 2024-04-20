import { forwardRef } from "react";
// PLUGINS
import { Description } from "@radix-ui/react-dialog";
// UTILS
import { cn } from "@/utils";

const ModalDescription = forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({ className, ...restProps }, ref) => {
  const classNames = cn("text-sm leading-normal !mb-5 text-neutral-400", className);

  return <Description ref={ref} className={classNames} {...restProps} />;
});

ModalDescription.displayName = Description.displayName;

export default ModalDescription;
