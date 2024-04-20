import { forwardRef } from "react";
// UTILS
import { cn } from "@/utils";
// HOOKS
import { useFormField } from "./useFormField";

const FormMessage = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...restProps }, ref) => {
    const classNames = cn("text-[0.8rem] font-medium text-red-500", className);
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) return null;

    return (
      <p ref={ref} className={classNames} id={formMessageId} {...restProps}>
        {body}
      </p>
    );
  },
);

FormMessage.displayName = "FormMessage";

export default FormMessage;
