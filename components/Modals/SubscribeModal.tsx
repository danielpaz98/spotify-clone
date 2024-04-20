"use client";

import { useState } from "react";
// PLUGINS
import { enqueueSnackbar } from "notistack";
// UTILS
import { postData, formatPrice } from "@/utils";
import { getStripe } from "@/utils/stripe/client";
// MODELS
import type { ProductWithPrice, Price } from "@/models/stripe";
// COMPONENTS
import { Modal, Button } from "@/components/ui";
import { OverlayScrollbars } from "@/components";
// HOOKS
import { useAuth } from "@/contexts/AuthContext/hooks";

interface Props {
  open: boolean;
  title?: string;
  description?: string;
  products: ProductWithPrice[] | null;
  onClose?: () => void;
}

export default function SubscribeModal({ open, title, description, products, onClose }: Props) {
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const { session, isLoading } = useAuth();
  const subscription = session?.user?.subscription;

  const handleOnOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose?.();
    }
  };

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!session) {
      setPriceIdLoading(undefined);

      return enqueueSnackbar("Must be logged in", { variant: "error" });
    }

    if (subscription) {
      setPriceIdLoading(undefined);

      enqueueSnackbar("Already subscribed", { variant: "success" });
    }

    try {
      const { sessionId } = await postData<{ sessionId: string }>({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      void stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return enqueueSnackbar((error as Error)?.message, { variant: "error" });
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content = <div className="text-center">No products available.</div>;

  if (products?.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) return <div key={product.id}>No prices available</div>;

          return product.prices.map((price) => (
            <Button
              key={price.id}
              block
              rounded
              className="enabled:hover:scale-[1.02]"
              disabled={isLoading || price.id === priceIdLoading}
              type="button"
              variant="brand"
              onClick={() => handleCheckout(price)}
            >
              {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
            </Button>
          ));
        })}
      </div>
    );
  }

  if (subscription) {
    content = <div className="text-center">Already subscribed.</div>;
  }

  return (
    <Modal open={open} onOpenChange={handleOnOpenChange}>
      <Modal.Content className="p-0 max-h-full">
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
          {content}
        </OverlayScrollbars>
      </Modal.Content>
    </Modal>
  );
}
