import { forwardRef } from "react";
// UTILS
import { cn } from "@/utils";
// HOOKS
import { useFormField } from "./useFormField";

const FormDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...restProps }, ref) => {
    const classNames = cn("text-[0.8rem] text-zinc-400", className);
    const { formDescriptionId } = useFormField();

    return <p ref={ref} className={classNames} id={formDescriptionId} {...restProps} />;
  },
);

FormDescription.displayName = "FormDescription";

export default FormDescription;
