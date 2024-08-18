"use client";

import { createContext, useState } from "react";
// UTILS
import { cn } from "@/utils";
// MODELS
import type { LibraryData } from "@/models";
// COMPONENTS
import { Box } from "@/components";
import SideMenu from "./SideMenu";
import Library from "./Library";
// HOOKS
import { useMainLayoutContext } from "@/layouts/MainLayout/hooks";
// DATA
import { sidebarMenu } from "./data";

interface Props {
  className?: string;
  isOpen?: boolean;
  libraryData: LibraryData | null;
}

const useValueContext = () => {
  const [expanded, setExpaded] = useState(true);

  return { expanded, setExpaded };
};

export const SidebarContext = createContext({} as ReturnType<typeof useValueContext>);

export default function Sidebar({ className, libraryData }: Props) {
  const value = useValueContext();
  const { sidebarIsOpen } = useMainLayoutContext();

  const classNames = cn(
    "min-h-0 h-full w-[--left-sidebar-width] max-md:fixed max-md:z-50 max-md:transition-transform",
    { "-translate-x-[100vw] md:translate-x-0": !sidebarIsOpen },
    { "w-[72px]": !value.expanded },
    className,
  );

  const navClassNames = /* tw */ cn(
    "flex flex-col min-h-0 h-full divide-y divide-nero md:divide-y-0 md:gap-2",
  );

  return (
    <SidebarContext.Provider value={value}>
      <div className={classNames}>
        <nav className={navClassNames}>
          <Box className="rounded-none md:rounded-lg">
            <SideMenu>
              {sidebarMenu.map(({ text, href, icon, icon2 }) => (
                <SideMenu.Item key={href} activeIcon={icon2} aria-label={text} href={href} icon={icon}>
                  {value.expanded && <span>{text}</span>}
                </SideMenu.Item>
              ))}
            </SideMenu>
          </Box>

          <Box className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-none md:rounded-lg">
            <Library libraryData={libraryData} tabIndex={-1} />
          </Box>
        </nav>
      </div>
    </SidebarContext.Provider>
  );
}
