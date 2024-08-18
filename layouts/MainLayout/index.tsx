"use client";

import { createContext, useRef, useState } from "react";
// PLUGINS
import { useSwipeable } from "react-swipeable";
// UTILS
import { cn } from "@/utils";
// MODELS
import type { LibraryData } from "@/models";
// COMPONENTS
import { OverlayScrollbars, Sidebar, Header, Footer } from "@/components";
// PROVIDERS
import { NotiStackProvider } from "@/providers";
// HOOKS
import { useAuth } from "@/contexts/AuthContext/hooks";

interface Props {
  children: React.ReactNode;
  className?: string;
  libraryData: LibraryData | null;
}

const useValueContext = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return { headerRef, sidebarIsOpen, setSidebarIsOpen };
};

export const MainLayoutContext = createContext({} as ReturnType<typeof useValueContext>);

export default function MainLayout({ children, className, libraryData }: Props) {
  const classNames = cn("main-layout", className);
  const value = useValueContext();
  const { session, isLoading } = useAuth();

  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedRight: () => value.setSidebarIsOpen(true),
    onSwipedLeft: () => value.setSidebarIsOpen(false),
  });

  if (isLoading) return null;

  return (
    <MainLayoutContext.Provider value={value}>
      <div className={classNames}>
        <div className="layout-container" {...handlers}>
          <Sidebar libraryData={libraryData} />

          <div className="relative flex min-h-0 w-full flex-col overflow-hidden bg-cod-gray md:rounded-lg">
            <Header ref={value.headerRef} aria-label="Top bar and user menu" user={session?.user} />

            <OverlayScrollbars
              defer
              className="flex-1"
              options={{ scrollbars: { autoHide: "leave", autoHideDelay: 1000 } }}
              style={{ paddingTop: "var(--header-height)" }}
            >
              {children}
            </OverlayScrollbars>
          </div>

          <NotiStackProvider />
        </div>

        <Footer />
      </div>
    </MainLayoutContext.Provider>
  );
}
