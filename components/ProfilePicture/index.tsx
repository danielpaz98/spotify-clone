// PLUGINS
import Image from "next/image";
import uniqolor from "uniqolor";
// UTILS
import { cn } from "@/utils";
// MODELS
import type { User } from "@/models";

interface Props extends React.ComponentProps<"span"> {
  user: User | null;
}

export default function ProfilePicture({ className, style, user, ...restProps }: Props) {
  const { id: userId, full_name: username, avatar_url: image } = user || {};

  if (image) {
    return (
      <figure className="h-6 w-6" title={username}>
        <picture className="relative block h-full w-full overflow-hidden rounded-full">
          <Image
            fill
            priority
            alt={username || ""}
            className="object-cover object-center"
            sizes="32px"
            src={image}
          />
        </picture>
      </figure>
    );
  }

  const firstLetter = username?.charAt(0);
  const usernameColor = userId ? uniqolor(userId, { format: "hex", lightness: 50 }).color : "";
  const classNames = cn("text-center text-black text-sm w-6 h-6 leading-6 rounded-full font-bold", className);

  return (
    <span
      className={classNames}
      style={{ ...style, backgroundColor: usernameColor }}
      title={username}
      {...restProps}
    >
      {firstLetter?.toUpperCase()}
    </span>
  );
}
