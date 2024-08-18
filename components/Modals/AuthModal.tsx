"use client";

import { useEffect } from "react";
// PLUGINS
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, type BaseAuth } from "@supabase/auth-ui-shared";
import { useRouter, useSearchParams } from "next/navigation";
// UTILS
import { supabaseClient } from "@/utils/supabase/client";
// COMPONENTS
import { Modal } from "@/components/ui";
import { OverlayScrollbars } from "@/components";
// HOOKS
import { useAuth } from "@/contexts/AuthContext/hooks";

export interface Props {
  open: boolean;
  title?: string;
  description?: string;
  providers?: BaseAuth["providers"];
  view?: BaseAuth["view"];
  theme?: BaseAuth["theme"];
  onClose?: () => void;
}

export default function AuthModal({ open, title, description, providers, view, theme, onClose }: Props) {
  const { status } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOnOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose?.();
    }
  };

  useEffect(() => {
    if (status === "SIGNED_IN") {
      if (searchParams.get("code")) router.push("/");

      router.refresh();
      onClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, router, onClose]);

  return (
    <Modal open={open} onOpenChange={handleOnOpenChange}>
      <Modal.Content className="max-h-full p-0">
        <OverlayScrollbars
          defer
          className="p-6 md:max-h-[95vh]"
          options={{ scrollbars: { autoHide: "leave", autoHideDelay: 1000 } }}
        >
          {title !== null && description !== null && (
            <Modal.Header>
              {title && <Modal.Title className="text-center">{title}</Modal.Title>}
              {description && <Modal.Description className="text-center">{description}</Modal.Description>}
            </Modal.Header>
          )}

          <Auth
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#404040",
                    brandAccent: "#1ed760",
                  },
                },
              },
            }}
            magicLink={true}
            providers={providers}
            supabaseClient={supabaseClient}
            theme={theme}
            view={view}
          />
        </OverlayScrollbars>
      </Modal.Content>
    </Modal>
  );
}
