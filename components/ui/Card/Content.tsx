type Props = React.ComponentProps<"div">;

export default function CardContent({ className, children, ...restProps }: Props) {
  return (
    <div className={className} {...restProps}>
      {children}
    </div>
  );
}
