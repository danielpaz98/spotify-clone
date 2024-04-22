"use client";

import { useContext } from "react";
// UTILS
import { cn } from "@/utils";
// CONTEXTS
import { PageBannerContext } from "./PageBanner";
// COMPONENTS
import { PageHeader } from "@/components";

type Props = React.ComponentPropsWithRef<typeof PageHeader>;

export default function PageBannerHeader({ className, children, ...restProps }: Props) {
  const classNames = cn("[transition:background-color_.25s,ease-out]", className);
  const { opacity } = useContext(PageBannerContext);

  return (
    <PageHeader className={classNames} opacity={opacity} {...restProps}>
      {children}
    </PageHeader>
  );
}
