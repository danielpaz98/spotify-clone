// UTILS
import { cn } from "@/utils";

interface Props extends React.ComponentProps<"article"> {
  active?: boolean;
}

export default function MediaItem({ className, children, active, onClick, ...restProps }: Props) {
  const classNames = cn(
    "flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md",
    { "bg-white/[0.07] hover:bg-white/10": active },
    className,
  );

  return (
    <article className={classNames} onClick={onClick} {...restProps}>
      {children}
    </article>
  );
}
