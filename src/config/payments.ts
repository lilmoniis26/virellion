// Payment configuration for Virellion
// Credentials come from environment variables only — never hardcode secrets.

export const PAYPAL_CONFIG = {
  clientId: process.env.PAYPAL_CLIENT_ID || "",
  secret: process.env.PAYPAL_SECRET || "",
  mode: (process.env.PAYPAL_MODE as "sandbox" | "live") || "sandbox",
  enabled: Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_SECRET),
};

export const STRIPE_CONFIG = {
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || process.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
  secretKey: process.env.STRIPE_SECRET_KEY || "",
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
  accountId: process.env.STRIPE_ACCOUNT_ID || "",
  mode: (process.env.STRIPE_MODE as "test" | "live") || "test",
  enabled: Boolean(process.env.STRIPE_SECRET_KEY),
};

export const PAYMENT_METHODS = {
  paypal: PAYPAL_CONFIG.enabled,
  stripe: STRIPE_CONFIG.enabled,
  invoice: true,
} as const;

export const PAYMENT_METHOD_LABEL: Record<string, string> = {
  paypal: "PayPal",
  stripe: "Card (Stripe)",
  invoice: "Invoice",
  card_link: "Secure card link",
};
