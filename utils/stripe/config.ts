// PLUGINS
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  typescript: true,
  apiVersion: "2023-10-16",
  appInfo: {
    name: "Spotify Clone",
    version: "0.1.0",
  },
});
