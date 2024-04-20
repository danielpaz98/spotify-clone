"use client";

// PLUGINS
import { Root, Trigger, Group, Portal, Sub } from "@radix-ui/react-dropdown-menu";
// COMPONENTS
import Content from "./Content";
import SubContent from "./SubContent";
import SubTrigger from "./SubTrigger";
import Item from "./Item";
import Label from "./Label";
import Separator from "./Separator";

const DropdownMenu = Object.assign(Root, {
  Trigger,
  Content,
  Item,
  Label,
  Separator,
  Group,
  Portal,
  Sub,
  SubContent,
  SubTrigger,
});

export default DropdownMenu;
