// UTILS
import { cn } from "@/utils";

type Props = React.ComponentProps<"h3">;

export default function CardTitle({ className, children }: Props) {
  const classNames = cn("text-white font-bold", className);

  return <h3 className={classNames}>{children}</h3>;
}
