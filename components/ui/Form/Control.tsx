import { forwardRef } from "react";
// PLUGINS
import { Slot } from "@radix-ui/react-slot";
// HOOKS
import { useFormField } from "./useFormField";

const FormControl = forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  (props, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      <Slot
        ref={ref}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        id={formItemId}
        {...props}
      />
    );
  },
);

FormControl.displayName = "FormControl";

export default FormControl;
