// UTILS
import { cn } from "@/utils";

type Props = React.ComponentProps<"p">;

export default function MediaItemAuthor({ className, children, ...restProps }: Props) {
  const classNames = cn("text-neutral-400 text-sm line-clamp-1", className);

  return (
    <p className={classNames} {...restProps}>
      {children}
    </p>
  );
}
