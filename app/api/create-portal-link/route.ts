import { NextResponse } from "next/server";
import { cookies } from "next/headers";
// PLUGINS
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// UTILS
import { stripe } from "@/utils/stripe/config";
import { getURL } from "@/utils";
import { createOrRetrieveCustomer } from "@/utils/supabase/admin";

export async function POST() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    const {
      error,
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      if (error) {
        console.error(error);
      }

      throw new Error("Could not get user session.");
    }

    let customer: string;

    try {
      customer = await createOrRetrieveCustomer({ uuid: user.id || "", email: user.email || "" });
    } catch (err) {
      console.error(err);

      throw new Error("Unable to access customer record.");
    }

    if (!customer) throw new Error("Could not get customer.");

    try {
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: getURL("/account"),
      });

      if (!url) throw new Error("Could not create billing portal");

      return NextResponse.json({ url });
    } catch (err) {
      console.error(err);

      throw new Error("Could not create billing portal");
    }
  } catch (err) {
    console.error(err);

    return new NextResponse((err as Error).message, { status: 500 });
  }
}
