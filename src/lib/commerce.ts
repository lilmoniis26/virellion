import { offerBySlug, packageById, packageImage } from "./catalog";

export type CatalogKind = "package" | "offer";

export type Purchasable = {
  kind: CatalogKind;
  id: string;
  title: string;
  summary: string;
  amount: number;
  priceSuffix: string;
  timeline: string;
  image: string;
  imageAlt: string;
  instant: boolean;
};

export function parseItemParam(raw: string | undefined): { kind: CatalogKind; id: string } | null {
  if (!raw) return null;
  const idx = raw.indexOf(":");
  if (idx <= 0) return null;
  const kind = raw.slice(0, idx);
  const id = raw.slice(idx + 1).trim();
  if ((kind !== "package" && kind !== "offer") || !id) return null;
  return { kind, id };
}

export function itemParam(kind: CatalogKind, id: string): string {
  return `${kind}:${id}`;
}

export function getPurchasable(kind: CatalogKind, id: string): Purchasable | null {
  if (kind === "package") {
    const p = packageById(id);
    if (!p) return null;
    const img = packageImage(p.id);
    return {
      kind,
      id: p.id,
      title: p.name,
      summary: p.summary,
      amount: p.price,
      priceSuffix: p.priceSuffix ?? "",
      timeline: p.timeline,
      image: img.src,
      imageAlt: img.alt,
      instant: p.kind === "launch",
    };
  }
  const o = offerBySlug(id);
  if (!o) return null;
  return {
    kind,
    id: o.slug,
    title: o.name,
    summary: o.outcome,
    amount: o.startingPrice,
    priceSuffix: "",
    timeline: o.timeline,
    image: o.image,
    imageAlt: o.imageAlt,
    instant: true,
  };
}

export function safeRedirect(value: unknown, fallback = "/account"): string {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  if (value.includes("://")) return fallback;
  return value;
}

export const ORDER_STATUS_LABEL: Record<string, string> = {
  pending_payment: "Awaiting payment",
  payment_submitted: "Payment submitted",
  paid: "Paid",
  in_progress: "In production",
  complete: "Complete",
  cancelled: "Cancelled",
};

export const INQUIRY_STATUS_LABEL: Record<string, string> = {
  new: "Received",
  open: "Open",
  review: "In review",
  proposed: "Proposal sent",
  won: "In production",
  closed: "Closed",
};
