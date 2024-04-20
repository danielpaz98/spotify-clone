"use client";

// PLUGINS
import { Root, Portal, Trigger, Close } from "@radix-ui/react-dialog";
// COMPONENTS
import Content from "./Content";
import Overlay from "./Overlay";
import Header from "./Header";
import Footer from "./Footer";
import Title from "./Title";
import Description from "./Description";

const Modal = Object.assign(Root, {
  Portal,
  Overlay,
  Trigger,
  Close,
  Content,
  Header,
  Footer,
  Title,
  Description,
});

export default Modal;
