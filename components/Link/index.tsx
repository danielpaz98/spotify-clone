// PLUGINS
import NextLink from "next/link";
import { usePathname } from "next/navigation";
// STORES
import { useSidebarNavigation } from "@/store";

type Props = React.ComponentPropsWithRef<typeof NextLink>;

export default function Link({ children, href, onClick, ...restProps }: Props) {
  const pathname = usePathname();

  const { setCanGoBackLength, setCanGoBackForward } = useSidebarNavigation();

  const handleChangeRoute = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { hash } = e.currentTarget;

    if (!href || pathname === href) return;

    onClick?.(e);

    if (hash) return;

    setCanGoBackLength((curr) => curr + 1);
    setCanGoBackForward(1);
  };

  return (
    <NextLink href={href} onClick={handleChangeRoute} {...restProps}>
      {children}
    </NextLink>
  );
}
