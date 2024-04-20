"use client";

import { createContext, useCallback, useEffect, useRef, useState } from "react";
// UTILS
import { cn } from "@/utils";
// HOOKS
import { useMainLayoutContext } from "@/layouts/MainLayout/hooks";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const useValueContext = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState<number>(0);
  const { headerRef } = useMainLayoutContext();

  return { headerRef, bannerRef, opacity, setOpacity };
};

export const PageBannerContext = createContext({} as ReturnType<typeof useValueContext>);

export default function PageBanner({ children, className }: Props) {
  const value = useValueContext();
  const classNames = cn("absolute w-full h-full top-0 left-0", className);

  const { headerRef, bannerRef, setOpacity } = value;

  const opacityHandler = useCallback(() => {
    const bannerRect = bannerRef.current?.getBoundingClientRect() as DOMRect;
    const headerRect = headerRef.current?.getBoundingClientRect() as DOMRect;
    const opacitiyPercent =
      1 -
      ((bannerRect?.bottom - headerRect?.height) * 100) / ((bannerRect?.height - headerRect?.height) * 100);

    const opacity = bannerRect?.bottom - headerRect?.height <= headerRect?.bottom ? opacitiyPercent : 0;

    setOpacity(opacity);
  }, [bannerRef, headerRef, setOpacity]);

  useEffect(() => {
    const mainContainer = headerRef.current?.nextElementSibling?.querySelector(
      "[data-overlayscrollbars-contents]",
    );

    if (!mainContainer) return;

    mainContainer?.addEventListener("scroll", opacityHandler);

    return () => {
      mainContainer?.removeEventListener("scroll", opacityHandler);
    };
  }, [headerRef, opacityHandler]);

  return (
    <PageBannerContext.Provider value={value}>
      <div ref={bannerRef} className={classNames}>
        {children}
      </div>
    </PageBannerContext.Provider>
  );
}
