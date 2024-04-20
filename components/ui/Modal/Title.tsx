import { forwardRef } from "react";
// PLUGINS
import { Title } from "@radix-ui/react-dialog";
// UTILS
import { cn } from "@/utils";

const ModalTitle = forwardRef<React.ElementRef<typeof Title>, React.ComponentPropsWithoutRef<typeof Title>>(
  ({ className, ...restProps }, ref) => {
    const classNames = cn("text-xl mb-4 text-white font-bold leading-none tracking-tight", className);

    return <Title ref={ref} className={classNames} {...restProps} />;
  },
);

ModalTitle.displayName = Title.displayName;

export default ModalTitle;
