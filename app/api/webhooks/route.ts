import { NextResponse } from "next/server";
import { headers } from "next/headers";
// PLUGINS
import Stripe from "stripe";
// UTILS
import { stripe } from "@/utils/stripe/config";
import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange,
  deleteProductRecord,
  deletePriceRecord,
} from "@/utils/supabase/admin";

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "product.deleted",
  "price.created",
  "price.updated",
  "price.deleted",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("Stripe-Signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_LIVE ?? process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return new NextResponse("Webhook secret not found.", { status: 400 });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    // eslint-disable-next-line no-console
    console.log(`🔔 Webhook received: ${event.type}`);
  } catch (err) {
    const error = err as Error;
    // eslint-disable-next-line no-console
    console.log(`❌ Error message: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "product.created":
        case "product.updated":
          await upsertProductRecord(event.data.object);
          break;
        case "price.created":
        case "price.updated":
          await upsertPriceRecord(event.data.object);
          break;
        case "price.deleted":
          await deletePriceRecord(event.data.object);
          break;
        case "product.deleted":
          await deleteProductRecord(event.data.object);
          break;
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted": {
          const subscription = event.data.object;

          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string,
            event.type === "customer.subscription.created",
          );

          break;
        }
        case "checkout.session.completed": {
          const checkoutSession = event.data.object;
          if (checkoutSession.mode === "subscription") {
            const subscriptionId = checkoutSession.subscription;
            await manageSubscriptionStatusChange(
              subscriptionId as string,
              checkoutSession.customer as string,
              true,
            );
          }
          break;
        }
        default:
          throw new Error("Unhandled relevant event!");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      return new NextResponse("Webhook handler failed. View your Next.js function logs.", { status: 400 });
    }
  }

  return new NextResponse(JSON.stringify({ received: true }));
}
