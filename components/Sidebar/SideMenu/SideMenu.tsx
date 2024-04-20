// UTILS
import { cn } from "@/utils";

export type Props = React.ComponentProps<"ul">;

export default function SideMenu({ children, className }: Props) {
  const classNames = cn("py-2 px-3", className);

  return <ul className={classNames}>{children}</ul>;
}
