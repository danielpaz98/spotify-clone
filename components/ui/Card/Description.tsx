// UTILS
import { cn } from "@/utils";

type Props = React.ComponentProps<"p">;

export default function CardDescription({ className, children }: Props) {
  const classNames = cn("text-white font-normal text-sm", className);

  return <p className={classNames}>{children}</p>;
}
