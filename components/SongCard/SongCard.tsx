// UTILS
import { cn } from "@/utils";

type Props = React.ComponentProps<"article">;

export default function SongCard({ className, children, onClick, ...restProps }: Props) {
  const classNames = cn(
    "relative group flex flex-col justify-center rounded-md overflow-hidden gap-x-4 bg-eerie-black cursor-pointer hover:bg-dire-wolf transition-[background-color] duration-3s p-4",
    className,
  );

  return (
    <article className={classNames} onClick={onClick} {...restProps}>
      {children}
    </article>
  );
}
