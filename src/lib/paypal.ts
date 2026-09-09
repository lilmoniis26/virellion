export type PayPalSettings = {
  paypalMe: string;
  paypalEmail: string;
  paypalLink: string;
};

export function normalizePaypalMe(raw: string): string {
  let value = raw.trim();
  value = value.replace(/^https?:\/\/(www\.)?paypal\.me\//i, "");
  value = value.replace(/^https?:\/\/(www\.)?paypal\.com\/paypalme\//i, "");
  value = value.replace(/^@/, "");
  const handle = value.split(/[/?#]/)[0] ?? "";
  return handle.replace(/[^a-zA-Z0-9._-]/g, "");
}

export function isPaypalHttps(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && (parsed.hostname === "www.paypal.com" || parsed.hostname === "paypal.com" || parsed.hostname === "www.paypal.me" || parsed.hostname === "paypal.me");
  } catch {
    return false;
  }
}

export function buildPaypalUrl(
  settings: PayPalSettings,
  order: { id: string; title: string; amount: number },
): string | null {
  const me = normalizePaypalMe(settings.paypalMe);
  if (me) {
    return `https://www.paypal.com/paypalme/${encodeURIComponent(me)}/${order.amount}USD`;
  }
  const email = settings.paypalEmail.trim();
  if (email.includes("@")) {
    const params = new URLSearchParams({
      cmd: "_xclick",
      business: email,
      item_name: `Virellion — ${order.title}`.slice(0, 120),
      amount: String(order.amount),
      currency_code: "USD",
      invoice: order.id,
      custom: order.id,
      no_shipping: "1",
      no_note: "0",
    });
    return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`;
  }
  const link = settings.paypalLink.trim();
  if (link && isPaypalHttps(link)) return link;
  return null;
}

export const PAYMENT_METHOD_LABEL: Record<string, string> = {
  paypal: "PayPal",
  invoice: "Invoice",
  card_link: "Card link",
};
