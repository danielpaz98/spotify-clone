import { forwardRef } from "react";
// PLUGINS
import { closeSnackbar, SnackbarContent, type CustomContentProps } from "notistack";
// UTILS
import { cn } from "@/utils";

interface Props extends CustomContentProps {
  imageUrl?: string;
}

const InfoToast = forwardRef<HTMLDivElement, Props>(({ className, message, imageUrl, id, style }, ref) => {
  const classNames = cn(
    "flex items-center gap-2 rounded-md bg-white p-3 shadow-[rgba(0,_0,_0,_0.2)_0px_4px_12px_0px]",
    className,
  );

  return (
    <SnackbarContent
      ref={ref}
      className={classNames}
      id={id as string}
      role="status"
      style={style}
      onClick={() => closeSnackbar(id)}
    >
      {imageUrl && (
        <picture className="block w-6 h-6 rounded-[2px] bg-dire-wolf flex-shrink-0 overflow-hidden">
          <img
            aria-hidden
            alt={(typeof message === "string" && message) || ""}
            className="w-full h-full object-cover object-center"
            loading="lazy"
            src={imageUrl}
          />
        </picture>
      )}
      <span className="text-black">{message}</span>
    </SnackbarContent>
  );
});

InfoToast.displayName = "InfoToast";

export default InfoToast;
