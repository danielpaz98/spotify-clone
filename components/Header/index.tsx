"use client";

import { forwardRef } from "react";
// PLUGINS
import { usePathname } from "next/navigation";
// UTILS
import { cn } from "@/utils";
// MODELS
import type { User } from "@/models";
// COMPONENTS
import { SearchBar } from "@/components";
import { Button, Tooltip } from "@/components/ui";
import TopBarNavigation from "./TopBarNavigation";
import DropdownAccountMenu from "./DropdownAccountMenu";
// ICONS
import CircleDownIcon from "@/icons/circle-down.svg";
import BellIcon from "@/icons/bell.svg";
// STORES
import { useAuthModal } from "@/store";
// HOOKS
import { useAuth } from "@/contexts/AuthContext/hooks";
// DATA
import { accountMenu } from "./data";

interface Props extends React.ComponentPropsWithoutRef<"header"> {
  user: User | null | undefined;
}

const Header = forwardRef<React.ElementRef<"header">, Props>(({ className, user, ...restProps }, ref) => {
  const classNames = cn(
    "absolute z-[1] flex justify-between items-center gap-2 py-4 px-6 h-[var(--header-height)] w-full",
    "before:absolute before:z-[-1] before:top-0 before:bottom-0 before:right-2 before:left-2 before:backdrop-blur-[1px]",
    className,
  );

  const pathname = usePathname();
  const authModal = useAuthModal();
  const searchPageIsActive = pathname.includes("search");

  const { session } = useAuth();
  const subscription = session?.user?.subscription;

  return (
    <header ref={ref} className={classNames} {...restProps}>
      <TopBarNavigation />

      <>
        {searchPageIsActive && (
          <SearchBar
            autoFocus
            autoCapitalize="off"
            autoCorrect="off"
            className="mr-auto hidden xs:flex"
            maxLength={800}
            placeholder="What do you want to play?"
          />
        )}

        {user ? (
          <div className="flex items-center gap-2">
            {!searchPageIsActive && !subscription && (
              <Button rounded className="hidden lg:block" size="sm" type="button" variant="primary">
                Explore premium
              </Button>
            )}

            <Button
              rounded
              className="hidden items-center gap-[6px] sm:flex"
              size="sm"
              type="button"
              variant="dark"
            >
              <CircleDownIcon className="w-4 h-4" fill="currentColor" />
              <span>Install App</span>
            </Button>

            <Button
              rounded
              className="flex-shrink-0 relative w-8 h-8 text-neutral-400 hover:text-white hover:scale-110"
              data-tooltip-id="notifications-tooltip"
              size="sm"
              type="button"
              variant="dark"
            >
              <BellIcon className="flex-shrink-0 w-4 h-4" fill="currentColor" />

              <Tooltip noArrow id="notifications-tooltip" place="bottom">
                <span>What&#39;s New</span>
              </Tooltip>
            </Button>

            <DropdownAccountMenu menu={accountMenu} user={user} />
          </div>
        ) : (
          <div className="flex items-center">
            <div className="flex gap-4">
              <Button type="button" onClick={() => authModal.onOpen({ view: "sign_up" })}>
                Sign up
              </Button>

              <Button
                rounded
                size="lg"
                type="button"
                variant="primary"
                onClick={() => authModal.onOpen({ view: "sign_in" })}
              >
                Log in
              </Button>
            </div>
          </div>
        )}
      </>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
