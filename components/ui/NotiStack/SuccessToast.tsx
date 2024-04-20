import { forwardRef } from "react";
// PLUGINS
import { closeSnackbar, SnackbarContent, type VariantType, type CustomContentProps } from "notistack";
// UTILS
import { cn } from "@/utils";

const iconClassNames = /* tw */ cn(
  "relative w-5 h-5 bg-[#26b26c] rotate-45 rounded-[10px]",
  "after:absolute after:bottom-[6px] after:left-[6px] after:w-[6px] after:h-[10px]",
  "after:border-r-2 after:border-b-2 after:border-white",
);

interface Props extends Omit<CustomContentProps, "iconVariant"> {
  iconVariant: Partial<Record<VariantType, React.ReactElement>>;
}

const ariaDescribedby = "notistack-snackbar";

const SuccessToast = forwardRef<HTMLDivElement, Props>(
  (
    {
      className,
      message,
      action: componentOrFunctionAction,
      id,
      style,
      hideIconVariant,
      variant,
      iconVariant,
    },
    ref,
  ) => {
    const classNames = cn(
      "flex items-center gap-2 rounded-lg bg-white text-neutral-700 font-normal max-w-[350px] p-3",
      "shadow-[0_3px_10px_rgba(0,0,0,0.1),0_3px_3px_rgba(0,0,0,0.05)]",
      className,
    );

    const customIcon = iconVariant[variant];
    const icon = typeof customIcon?.type !== "function" ? customIcon : <span className={iconClassNames} />;

    let action = componentOrFunctionAction;
    if (typeof action === "function") action = action(id);

    return (
      <SnackbarContent
        ref={ref}
        aria-describedby={ariaDescribedby}
        className={classNames}
        id={id as string}
        role="alert"
        style={style}
        onClick={() => closeSnackbar(id)}
      >
        {!hideIconVariant ? icon : null}
        <p className="flex-1">{message}</p>
        {action}
      </SnackbarContent>
    );
  },
);

SuccessToast.displayName = "SuccessToast";

export default SuccessToast;
