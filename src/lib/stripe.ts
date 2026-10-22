import { STRIPE_CONFIG } from "@/config/payments";

/** Server-side Stripe secret availability check. Never expose the secret key. */
export function stripeEnabled(): boolean {
  return STRIPE_CONFIG.enabled && Boolean(STRIPE_CONFIG.secretKey);
}

export function stripeMode(): "test" | "live" {
  return STRIPE_CONFIG.mode;
}

/**
 * Map of Virellion package IDs to Stripe Price IDs (test mode).
 * Operator can expand this list as more products are created in Stripe.
 * Live mode prices should be set via environment or studio settings.
 */
export const STRIPE_PRICE_MAP_TEST: Record<string, string> = {
  roadmap: "price_1UTBoV8UuLe5CcFuJet5X5mD",
  "consult-30": "price_1UTBom8UuLe5CcFu5FeK7aok",
  "brand-web": "price_1UTBon8UuLe5CcFu4Ug8LrtX",
};

/** Build a Stripe Checkout Session URL once server credentials and price IDs are configured. */
export function stripeCheckoutReady(packageId: string): boolean {
  if (!stripeEnabled()) return false;
  const priceId = STRIPE_PRICE_MAP_TEST[packageId];
  return Boolean(priceId);
}
