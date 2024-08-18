import { usePathname, useSelectedLayoutSegment } from "next/navigation";
// UTILS
import { cn } from "@/utils";
// COMPONENTS
import { Link } from "@/components";

export interface Props extends Omit<React.ComponentPropsWithoutRef<"a">, "href"> {
  href: string;
  icon?: React.FC<React.SVGProps<SVGElement>>;
  activeIcon?: React.FC<React.SVGProps<SVGElement>>;
}

export default function SideMenuItem({
  children,
  className,
  href,
  icon: Icon1,
  activeIcon: Icon2,
  ...restProps
}: Props) {
  const pathname = usePathname();
  const activeSegment = useSelectedLayoutSegment();
  const isActive = href.includes(activeSegment as string) || pathname === href;
  const classNames = cn("w-full h-10 flex items-center gap-5", isActive && "text-white", className);

  const Icon = isActive ? (Icon2 ? Icon2 : Icon1) : Icon1;

  return (
    <li className="px-3 py-1 font-bold text-gray-70 transition-colors duration-2s hover:text-white">
      <Link className={classNames} href={href} {...restProps}>
        {Icon1 !== undefined && Icon !== undefined && <Icon className="h-6 w-6" fill="currentColor" />}
        {children}
      </Link>
    </li>
  );
}
