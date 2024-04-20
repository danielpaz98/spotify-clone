"use client";

import { forwardRef } from "react";
// PLUGINS
import { Tooltip as ReactTooltip } from "react-tooltip";
// UTILS
import { cn } from "@/utils";

const Tooltip = forwardRef<
  React.ElementRef<typeof ReactTooltip>,
  React.ComponentPropsWithoutRef<typeof ReactTooltip>
>(({ className, delayShow = 250, ...restProps }, ref) => {
  const classNames = cn(
    "z-[9999] line-clamp-4 max-w-[50ch] !text-white !truncate !py-1 !px-2 !text-sm !rounded-[4px] !shadow-[0_16px_24px_rgb(0,0,0,0.3),0_6px_8px_rgb(0,0,0,0.2)] !bg-dire-wolf font-normal",
    className,
  );

  return <ReactTooltip ref={ref} className={classNames} delayShow={delayShow} {...restProps} />;
});

Tooltip.displayName = "Tooltip";

export default Tooltip;
