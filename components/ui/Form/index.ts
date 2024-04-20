"use client";

// PLUGINS
import { FormProvider } from "react-hook-form";
// COMPONENTS
import Item from "./Item";
import Label from "./Label";
import Control from "./Control";
import Description from "./Description";
import Message from "./Message";
import Field from "./Field";

const Form = Object.assign(FormProvider, {
  Item,
  Label,
  Control,
  Description,
  Message,
  Field,
});

export * from "./useFormField";

export default Form;
