import { forwardRef, createContext, useId } from "react";
// UTILS
import { cn } from "@/utils";

type FormItemContextValue = {
  id: string;
};

export const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...restProps }, ref) => {
    const classNames = cn("space-y-2", className);
    const id = useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={classNames} {...restProps} />
      </FormItemContext.Provider>
    );
  },
);

FormItem.displayName = "FormItem";

export default FormItem;
