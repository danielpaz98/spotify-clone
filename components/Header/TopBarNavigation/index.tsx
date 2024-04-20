"use client";

// PLUGINS
import { useRouter } from "next/navigation";
// UTILS
import { cn } from "@/utils";
// COMPONENTS
import { Button, Tooltip } from "@/components/ui";
// ICONS
import AngleLeftIcon from "@/icons/angle-left.svg";
import AngleRightIcon from "@/icons/angle-right.svg";
// STORES
import { useSidebarNavigation } from "@/store";

interface Props {
  className?: string;
}

export default function TopBarNavigation({ className }: Props) {
  const { setCanGoBackLength, setCanGoBackForward, canGoBackLength, canGoForwardLength } =
    useSidebarNavigation();

  const router = useRouter();
  const canGoBack = canGoBackLength > 1;
  const canGoForward = canGoForwardLength > 1;

  const classNames = cn("flex gap-2", className);
  const btnClassNames = cn("flex-shrink-0 relative w-8 h-8 enabled:hover:transform-none");

  const handleGoBack = () => {
    if (canGoBack) {
      router.back();
      setCanGoBackLength((curr) => curr - 1);
      setCanGoBackForward((curr) => curr + 1);
    }
  };

  const handleGoForward = () => {
    if (canGoForward) {
      router.forward();
      setCanGoBackLength((curr) => curr + 1);
      setCanGoBackForward((curr) => curr - 1);
    }
  };

  return (
    <div className={classNames}>
      <Button
        rounded
        aria-label="Go back"
        className={btnClassNames}
        data-tooltip-id="go-back"
        disabled={!canGoBack}
        size="sm"
        type="button"
        variant="dark"
        onClick={handleGoBack}
      >
        <AngleLeftIcon className="flex-shrink-0 w-4 h-4" fill="currentColor" />

        {canGoBack && (
          <Tooltip noArrow id="go-back" place="bottom">
            <span>Go back</span>
          </Tooltip>
        )}
      </Button>

      <Button
        rounded
        aria-label="Go forward"
        className={cn(btnClassNames, "md:hidden lg:flex")}
        data-tooltip-id="go-forward"
        disabled={!canGoForward}
        size="sm"
        type="button"
        variant="dark"
        onClick={handleGoForward}
      >
        <AngleRightIcon className="flex-shrink-0 w-4 h-4" fill="currentColor" />

        {canGoForward && (
          <Tooltip noArrow id="go-forward" place="bottom">
            <span>Go forward</span>
          </Tooltip>
        )}
      </Button>
    </div>
  );
}
