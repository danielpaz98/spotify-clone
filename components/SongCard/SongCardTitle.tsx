// UTILS
import { cn } from "@/utils";

type Props = React.ComponentProps<"h2">;

export default function SongCardTitle({ className, children, ...restProps }: Props) {
  const classNames = cn("text-white line-clamp-1", className);

  return (
    <h2 className={classNames} {...restProps}>
      {children}
    </h2>
  );
}
