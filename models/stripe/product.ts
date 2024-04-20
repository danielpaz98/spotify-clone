// TYPES
import type Stripe from "stripe";
import type { Price } from "./price";

export interface Product {
  id: string;
  active?: boolean;
  name?: string | null;
  description?: string | null;
  image?: string | null;
  metadata?: Stripe.Metadata;
}

export interface ProductWithPrice extends Product {
  prices?: Price[];
}
