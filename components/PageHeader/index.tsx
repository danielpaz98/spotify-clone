"use client";

import { forwardRef, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
// UTILS
import { cn } from "@/utils";
// HOOKS
import { useMainLayoutContext } from "@/layouts/MainLayout/hooks";

export interface Props {
  className?: string;
  children?: React.ReactNode;
  opacity?: number;
}

const PageHeader = forwardRef<HTMLDivElement, Props>(({ className, children, opacity: opacityProp }, ref) => {
  const { headerRef } = useMainLayoutContext();
  const [isMounted, setIsMounted] = useState(false);
  const [opacityState, setOpacityState] = useState<number>(0);
  const opacity = opacityProp ?? opacityState;
  const classNames = cn(
    "bg-cod-gray absolute z-[-1] top-0 bottom-0 right-0 left-0 rounded-tl-lg rounded-tr-lg",
    "pointer-events-none [transition:background-color_.25s,opacity_.4s,ease-out]",
    className,
  );

  const opacityHandler = useCallback(
    (e: Event) => {
      const headerRect = headerRef.current?.getBoundingClientRect() as DOMRect;
      const headerBottom = headerRect?.bottom;
      const scrollY = (e.target as HTMLElement).scrollTop;
      const offset = 1.5;

      const opacityPercentage = Math.min(scrollY / (headerBottom / offset), 1);

      setOpacityState(opacityPercentage);
    },
    [headerRef],
  );

  useEffect(() => {
    const mainContainer = headerRef.current?.nextElementSibling?.querySelector(
      "[data-overlayscrollbars-contents]",
    );

    if (!mainContainer || opacityProp !== undefined) return;

    mainContainer?.addEventListener("scroll", opacityHandler);

    return () => {
      mainContainer?.removeEventListener("scroll", opacityHandler);
    };
  }, [headerRef, opacityProp, opacityHandler]);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return createPortal(
    <div ref={ref} className={classNames} style={{ opacity }}>
      {children}
    </div>,
    headerRef.current as HTMLDivElement,
  );
});

PageHeader.displayName = "PageHeader";

export default PageHeader;
