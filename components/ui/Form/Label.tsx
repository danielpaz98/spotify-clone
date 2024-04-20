import { forwardRef } from "react";
// UTILS
import { cn } from "@/utils";
// COMPONENTS
import { Label } from "@/components/ui";
// HOOKS
import { useFormField } from "./useFormField";

const FormLabel = forwardRef<React.ElementRef<typeof Label>, React.ComponentPropsWithoutRef<typeof Label>>(
  ({ className, ...restProps }, ref) => {
    const { error, formItemId } = useFormField();
    const classNames = cn(error && "text-red-500", className);

    return <Label ref={ref} className={classNames} htmlFor={formItemId} {...restProps} />;
  },
);

FormLabel.displayName = "FormLabel";

export default FormLabel;
