"use client";

// PLUGINS
import { Root, Trigger, Anchor } from "@radix-ui/react-popover";
// COMPONENTS
import Content from "./Content";
import Arrow from "./Arrow";
import Close from "./Close";

const Popover = Object.assign(Root, {
  Trigger,
  Content,
  Arrow,
  Close,
  Anchor,
});

export default Popover;
