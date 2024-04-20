// PLUGINS
import { type OverlayScrollbarsComponentProps, OverlayScrollbarsComponent } from "overlayscrollbars-react";

interface Props extends OverlayScrollbarsComponentProps {
  onScroll?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
}

export default function OverlayScrollbars(props: Props) {
  const { onScroll, events, ...restProps } = props;
  const { scroll: scrollEvent, ...restEvents } = events || {};

  return (
    <OverlayScrollbarsComponent
      events={{
        scroll: (i, e) => {
          onScroll?.(e as unknown as React.SyntheticEvent<HTMLDivElement>);

          if (events && typeof scrollEvent === "function") scrollEvent(i, e);
        },
        ...restEvents,
      }}
      {...restProps}
    />
  );
}
