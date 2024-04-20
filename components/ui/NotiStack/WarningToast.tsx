import { forwardRef } from "react";
// PLUGINS
import { closeSnackbar, SnackbarContent, type VariantType, type CustomContentProps } from "notistack";
// UTILS
import { cn } from "@/utils";

const iconClassNames = /* tw */ cn(
  "relative w-5 h-5 bg-[#ffa41d] rounded-full",
  "before:h-[2px] before:w-[8.5px] before:bg-white before:rotate-90",
  "before:absolute before:top-[6px] before:left-1/2 before:-translate-x-1/2",
  "after:h-[3px] after:w-[3px] after:rounded-full after:bg-white",
  "after:absolute after:top-[14px] after:left-1/2 after:-translate-x-1/2",
);

interface Props extends Omit<CustomContentProps, "iconVariant"> {
  iconVariant: Partial<Record<VariantType, React.ReactElement>>;
}

const ariaDescribedby = "notistack-snackbar";

const WarningToast = forwardRef<HTMLDivElement, Props>(
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

WarningToast.displayName = "WarningToast";

export default WarningToast;
