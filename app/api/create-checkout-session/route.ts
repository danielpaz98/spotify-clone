import { NextResponse } from "next/server";
import { cookies } from "next/headers";
// PLUGINS
import Stripe from "stripe";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// UTILS
import { stripe } from "@/utils/stripe/config";
import { getURL, calculateTrialEndUnixTimestamp } from "@/utils";
import { createOrRetrieveCustomer } from "@/utils/supabase/admin";
// MODELS
import type { TablesInsert } from "@/models";

type Price = TablesInsert<"prices">;

export async function POST(request: Request) {
  const { price }: { price: Price } = await request.json();

  try {
    // Get the user from Supabase auth
    const supabase = createRouteHandlerClient({ cookies });

    const {
      error,
      data: { user },
    } = await supabase.auth.getUser();

    if (error || !user) {
      console.error(error);

      throw new Error("Could not get user session.");
    }

    // Retrieve or create the customer in Stripe
    let customer: string;

    try {
      customer = await createOrRetrieveCustomer({ uuid: user?.id || "", email: user?.email || "" });
    } catch (err) {
      console.error(err);

      throw new Error("Unable to access customer record.");
    }

    let params: Stripe.Checkout.SessionCreateParams = {
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer,
      customer_update: { address: "auto" },
      line_items: [{ price: price.id, quantity: 1 }],
      cancel_url: getURL(),
      success_url: getURL("/account"),
    };

    // eslint-disable-next-line no-console
    console.log("Trial end:", calculateTrialEndUnixTimestamp(price.trial_period_days));

    if (price.type === "recurring") {
      params = {
        ...params,
        mode: "subscription",
        subscription_data: {
          trial_end: calculateTrialEndUnixTimestamp(price.trial_period_days),
        },
      };
    } else if (price.type === "one_time") {
      params = {
        ...params,
        mode: "payment",
      };
    }

    // Create a checkout session in Stripe
    try {
      const session = await stripe.checkout.sessions.create(params);

      return NextResponse.json({ sessionId: session.id });
    } catch (err) {
      console.error(err);

      throw new Error("Unable to create checkout session.");
    }
  } catch (err) {
    console.error(err);

    return new NextResponse((err as Error).message, { status: 500 });
  }
}
