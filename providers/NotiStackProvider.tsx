"use client";

import { SnackbarProvider } from "notistack";
// COMPONENTS
import { InfoToast, SuccessToast, WarningToast, ErrorToast } from "@/components/ui/NotiStack";
import { Fade } from "@/components/ui/NotiStack/Transitions";
import { useRef } from "react";

export default function NotiStackProvider() {
  const notistackRef = useRef<SnackbarProvider>(null);

  return (
    <SnackbarProvider
      ref={notistackRef}
      preventDuplicate
      Components={{ info: InfoToast, success: SuccessToast, warning: WarningToast, error: ErrorToast }}
      TransitionComponent={Fade}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      autoHideDuration={2000}
      transitionDuration={{ enter: 0, exit: 225 }}
    />
  );
}
