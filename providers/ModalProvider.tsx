"use client";

import { useEffect, useState } from "react";
// MODELS
import type { ProductWithPrice } from "@/models/stripe";
// COMPONENTS
import { AuthModal, SubscribeModal, UploadModal } from "@/components/Modals";
// STORES
import { useAuthModal, useSubscribeModal, useUploadModal } from "@/store";

interface Props {
  products: ProductWithPrice[] | null;
}

export default function ModalProvider({ products }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();
  const uploadModal = useUploadModal();

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal
        description="Login to your account"
        open={authModal.state.open}
        providers={["github"]}
        theme="dark"
        title="Welcome back"
        view={authModal.state.view}
        onClose={authModal.onClose}
      />

      <SubscribeModal
        description="Listen to music with Spotify Premium"
        open={subscribeModal.isOpen}
        products={products}
        title="Only for premium users"
        onClose={subscribeModal.onClose}
      />

      <UploadModal
        description="Upload an mp3 file"
        open={uploadModal.isOpen}
        title="Add a song"
        onClose={uploadModal.onClose}
      />
    </>
  );
}
