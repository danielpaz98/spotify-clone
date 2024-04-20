// UTILS
import { cn } from "@/utils";

const ModalHeader = ({ className, ...restProps }: React.HTMLAttributes<HTMLDivElement>) => {
  const classNames = cn("flex flex-col space-y-1.5 text-center sm:text-left", className);

  return <div className={classNames} {...restProps} />;
};

ModalHeader.displayName = "ModalHeader";

export default ModalHeader;
