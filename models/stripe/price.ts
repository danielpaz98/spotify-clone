// TYPES
import type Stripe from "stripe";
import type { Product } from "./product";

export interface Price {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number | null;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval | null;
  interval_count?: number | null;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
  products?: Product;
}
