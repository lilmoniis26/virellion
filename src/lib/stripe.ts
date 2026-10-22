import { STRIPE_CONFIG } from "@/config/payments";

/** Server-side Stripe secret availability check. Never expose the secret key. */
export function stripeEnabled(): boolean {
  return STRIPE_CONFIG.enabled && Boolean(STRIPE_CONFIG.secretKey);
}

export function stripeMode(): "test" | "live" {
  return STRIPE_CONFIG.mode;
}

/**
 * Map of Virellion package IDs to Stripe Price IDs (test / sandbox account).
 * Created via Stripe API for Lil'Monii's Enterprise LLC sandbox.
 * Live mode prices should be created when the operator switches STRIPE_MODE to live
 * and adds STRIPE_SECRET_KEY for the live account.
 */
export const STRIPE_PRICE_MAP_TEST: Record<string, string> = {
  roadmap: "price_1UTBoV8UuLe5CcFuJet5X5mD",
  "consult-30": "price_1UTBom8UuLe5CcFu5FeK7aok",
  "brand-web": "price_1UTBon8UuLe5CcFu4Ug8LrtX",
  "formation-admin": "price_1UTBq08UuLe5CcFu8obDJ4Tj",
  "reseller-launch": "price_1UTBq18UuLe5CcFu1eVIbnKZ",
  "monthly-desk": "price_1UTBq38UuLe5CcFurwTcZbtG",
};

export function stripePriceIdForPackage(packageId: string): string | null {
  return STRIPE_PRICE_MAP_TEST[packageId] || null;
}

/** True when Stripe is configured and this package has a mapped price. */
export function stripeCheckoutReady(packageId: string): boolean {
  if (!stripeEnabled()) return false;
  return Boolean(stripePriceIdForPackage(packageId));
}
