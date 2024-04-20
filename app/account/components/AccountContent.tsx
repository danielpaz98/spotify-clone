"use client";

import { useEffect, useState } from "react";
// PLUGINS
import { useRouter } from "next/navigation";
// UTILS
import { postData } from "@/utils";
// COMPONENTS
import { Button } from "@/components/ui";
// STORES
import { useSubscribeModal } from "@/store";
// HOOKS
import { useAuth } from "@/contexts/AuthContext/hooks";

export default function AccountContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { session } = useAuth();
  const subscription = session?.user?.subscription;

  const subscribeModal = useSubscribeModal();

  useEffect(() => {
    if (!isLoading && !session) router.replace("/");
  }, [isLoading, session, router]);

  const redirectToCustomerPortal = async () => {
    setIsLoading(true);

    try {
      const { url } = await postData<{ url: string }>({ url: "/api/create-portal-link" });
      window.location.assign(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }

    setIsLoading(false);
  };

  return (
    <>
      {!subscription && (
        <div className="grid gap-4">
          <p>No active plan.</p>

          <Button
            block
            rounded
            className="w-[300px] enabled:hover:scale-[1.02]"
            disabled={isLoading}
            type="button"
            variant="brand"
            onClick={subscribeModal.onOpen}
          >
            Subscribe
          </Button>
        </div>
      )}

      {subscription && (
        <div className="grid gap-4">
          <p>
            <span>You are currently on the</span>
            <b className="text-white"> {subscription?.prices?.products?.name}</b> plan.
          </p>

          <Button
            block
            rounded
            className="w-[300px] enabled:hover:scale-[1.02]"
            disabled={isLoading}
            type="button"
            variant="brand"
            onClick={redirectToCustomerPortal}
          >
            Open customer portal
          </Button>
        </div>
      )}
    </>
  );
}
