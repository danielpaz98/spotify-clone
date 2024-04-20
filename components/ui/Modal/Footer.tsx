// UTILS
import { cn } from "@/utils";

const ModalFooter = ({ className, ...restProps }: React.HTMLAttributes<HTMLDivElement>) => {
  const classNames = cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className);

  return <div className={classNames} {...restProps} />;
};

ModalFooter.displayName = "ModalFooter";

export default ModalFooter;
