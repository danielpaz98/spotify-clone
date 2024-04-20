import { useMemo } from "react";
// PLUGINS
import { usePathname, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
// UTILS
import { cn } from "@/utils";
import { supabaseClient } from "@/utils/supabase/client";
// MODELS
import type { User } from "@/models";
// TYPES
import type { Props as DropdownContentProps } from "@/components/ui/DropdownMenu/Content";
// COMPONENTS
import { ProfilePicture, Link } from "@/components";
import { Button, DropdownMenu, Tooltip } from "@/components/ui";
import { DropdownAccountMenuSkeleton } from "@/components/Skeletons";
// ICONS
import ExternalLinkIcon from "@/icons/external-link.svg";
// HOOKS
import { useAuth } from "@/contexts/AuthContext/hooks";
import { usePlayer } from "@/hooks";

type Menu = {
  href: string;
  text: string;
  externalLink?: boolean;
};

interface Props extends DropdownContentProps {
  user: User | null;
  menu: Menu[];
}

export default function DropdownAccountMenu({ user, menu: menuProp, className, ...restProps }: Props) {
  const classNames = cn("max-w-[350px] min-w-[196px] overflow-y-auto bg-dire-wolf", className);
  const linkClassNames = cn(
    "cursor-default p-3 pr-2 flex items-center justify-between text-start h-10 w-full gap-3 text-white/90",
    "hover:bg-dark-gray hover:text-white",
  );

  const router = useRouter();
  const player = usePlayer();
  const pathname = usePathname();
  const { session } = useAuth();

  const subscription = session?.user?.subscription;

  const menu = useMemo(
    () => menuProp.filter((item) => !subscription || item.href !== "#upgrade-premium"),
    [menuProp, subscription],
  );

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    } else {
      router.push("/");
      router.refresh();
      player.reset();

      enqueueSnackbar("Logged out", { variant: "success" });
    }
  };

  return user ? (
    <DropdownMenu key={pathname} modal={false}>
      <DropdownMenu.Trigger asChild>
        <Button
          rounded
          className="relative flex-shrink-0 p-0 w-8 h-8"
          data-tooltip-id="account-username"
          size="sm"
          type="button"
          variant="dark"
        >
          <ProfilePicture user={user} />

          <Tooltip noArrow id="account-username" place="bottom-start">
            <span>{user?.full_name}</span>
          </Tooltip>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align="end"
        role="menu"
        side="bottom"
        sideOffset={8}
        tabIndex={0}
        {...restProps}
        asChild
        className={classNames}
      >
        <ul>
          {menu?.map((item) => (
            <DropdownMenu.Item key={item.href} asChild className="!p-0" role="menuitem">
              <li>
                <Link
                  className={linkClassNames}
                  href={item.href}
                  {...(item.externalLink && { target: "_blank" })}
                >
                  <span className="flex-1 text-ellipsis">{item.text}</span>
                  {item.externalLink && <ExternalLinkIcon className="w-4 h-4" fill="currentColor" />}
                </Link>
              </li>
            </DropdownMenu.Item>
          ))}

          <DropdownMenu.Separator className="bg-neutral-300/10" />

          <DropdownMenu.Item asChild className="!p-0" role="menuitem">
            <li>
              <button className={linkClassNames} type="button" onClick={handleLogout}>
                <span className="flex-1 text-ellipsis">Log out</span>
              </button>
            </li>
          </DropdownMenu.Item>
        </ul>
      </DropdownMenu.Content>
    </DropdownMenu>
  ) : (
    <DropdownAccountMenuSkeleton />
  );
}
