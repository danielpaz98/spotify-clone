// UTILS
import { cn } from "@/utils";

type Props = React.ComponentProps<"div">;

export default function Skeleton({ className, ...restProps }: Props) {
  const classNames = cn("animate-pulse rounded-md bg-zinc-50/10", className);

  return <div className={classNames} {...restProps} />;
}
