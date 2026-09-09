import {
  DEPARTMENTS,
  OFFERS,
  PACKAGES,
  departmentImage,
  packageImage,
} from "@/lib/catalog";
import type { CatalogKind, Purchasable } from "@/lib/commerce";
import type { Offer, ServicePackage } from "@/lib/types";

export type CatalogItemKind = "offer" | "package" | "department";

export type LiveOffer = Offer & { published: boolean; custom?: boolean };
export type LivePackage = ServicePackage & { image: string; imageAlt: string; published: boolean; custom?: boolean };
export type LiveDepartment = {
  id: string;
  label: string;
  short: string;
  capabilities: string[];
  typicalClients: string;
  image: string;
  imageAlt: string;
  published: boolean;
  custom?: boolean;
};

export type LiveCatalog = {
  offers: LiveOffer[];
  packages: LivePackage[];
  departments: LiveDepartment[];
};

export type OverrideRow = {
  kind: string;
  id: string;
  published: unknown;
  name: string;
  short_name: string;
  eyebrow: string;
  summary: string;
  outcome: string;
  timeline: string;
  next_step: string;
  typical_clients: string;
  price: unknown;
  price_suffix: string;
  image: string;
  imageAlt?: string;
  image_alt: string;
  deliverables: unknown;
  exclusions: unknown;
  capabilities: unknown;
  departments?: unknown;
  package_kind?: string;
};

function asBool(value: unknown): boolean {
  return value === true || value === "t" || value === "true" || value === 1 || value === "1";
}

function asInt(value: unknown): number | null {
  if (value == null || value === "") return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? Math.round(n) : null;
}

function asStringArray(value: unknown): string[] | undefined {
  if (value == null) return undefined;
  let parsed: unknown = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      return undefined;
    }
  }
  if (!Array.isArray(parsed)) return undefined;
  return parsed.map((item) => String(item).trim()).filter(Boolean);
}

function asDepartments(value: unknown): string[] | undefined {
  const arr = asStringArray(value);
  if (!arr) return undefined;
  return arr.map((id) => id.toLowerCase().replace(/[^a-z0-9-]/g, "")).filter(Boolean);
}

function pick(override: string, fallback: string): string {
  const v = override.trim();
  return v ? v : fallback;
}

function seedDepartments(): LiveDepartment[] {
  return DEPARTMENTS.map((d) => {
    const img = departmentImage(d.id);
    return { ...d, image: img.src, imageAlt: img.alt, published: true };
  });
}

export function seedLiveCatalog(): LiveCatalog {
  return {
    offers: OFFERS.map((o) => ({ ...o, published: true })),
    packages: PACKAGES.map((p) => {
      const img = packageImage(p.id);
      return { ...p, image: img.src, imageAlt: img.alt, published: true };
    }),
    departments: seedDepartments(),
  };
}

function applyOffer(base: LiveOffer, row?: OverrideRow): LiveOffer {
  if (!row) return base;
  const deliverables = asStringArray(row.deliverables);
  const exclusions = asStringArray(row.exclusions);
  const price = asInt(row.price);
  const departments = asDepartments(row.departments);
  return {
    ...base,
    published: asBool(row.published),
    name: pick(row.name, base.name),
    eyebrow: pick(row.eyebrow, base.eyebrow),
    outcome: pick(row.outcome, base.outcome),
    summary: pick(row.summary, base.summary),
    timeline: pick(row.timeline, base.timeline),
    nextStep: pick(row.next_step, base.nextStep),
    startingPrice: price ?? base.startingPrice,
    image: pick(row.image, base.image),
    imageAlt: pick(row.image_alt, base.imageAlt),
    deliverables: deliverables ?? base.deliverables,
    exclusions: exclusions ?? base.exclusions,
    departments: departments ?? base.departments,
  };
}

function applyPackage(base: LivePackage, row?: OverrideRow): LivePackage {
  if (!row) return base;
  const deliverables = asStringArray(row.deliverables);
  const price = asInt(row.price);
  const departments = asDepartments(row.departments);
  const kind = row.package_kind === "custom" || row.package_kind === "launch" ? row.package_kind : base.kind;
  return {
    ...base,
    published: asBool(row.published),
    name: pick(row.name, base.name),
    summary: pick(row.summary, base.summary),
    timeline: pick(row.timeline, base.timeline),
    price: price ?? base.price,
    priceSuffix: row.price_suffix.trim() ? row.price_suffix.trim() : base.priceSuffix,
    image: pick(row.image, base.image),
    imageAlt: pick(row.image_alt, base.imageAlt),
    deliverables: deliverables ?? base.deliverables,
    departments: departments ?? base.departments,
    kind,
  };
}

function applyDepartment(base: LiveDepartment, row?: OverrideRow): LiveDepartment {
  if (!row) return base;
  const capabilities = asStringArray(row.capabilities);
  return {
    ...base,
    published: asBool(row.published),
    label: pick(row.name, base.label),
    short: pick(row.short_name, base.short),
    typicalClients: pick(row.typical_clients, base.typicalClients),
    image: pick(row.image, base.image),
    imageAlt: pick(row.image_alt, base.imageAlt),
    capabilities: capabilities ?? base.capabilities,
  };
}

function rowToOffer(row: OverrideRow): LiveOffer {
  const img = departmentImage("creative");
  return applyOffer(
    {
      slug: row.id,
      name: row.name || "New offer",
      eyebrow: "Offer",
      outcome: "",
      summary: "",
      deliverables: [],
      exclusions: [],
      timeline: "",
      startingPrice: 0,
      nextStep: "Start a project",
      departments: [],
      image: img.src,
      imageAlt: img.alt,
      published: false,
      custom: true,
    },
    row,
  );
}

function rowToPackage(row: OverrideRow): LivePackage {
  const img = packageImage("brand-web");
  return applyPackage(
    {
      id: row.id,
      name: row.name || "New package",
      kind: "launch",
      summary: "",
      deliverables: [],
      timeline: "",
      price: 0,
      departments: [],
      image: img.src,
      imageAlt: img.alt,
      published: false,
      custom: true,
    },
    row,
  );
}

function rowToDepartment(row: OverrideRow): LiveDepartment {
  const img = departmentImage("creative");
  return applyDepartment(
    {
      id: row.id,
      label: row.name || "New practice",
      short: row.short_name || row.name || "Practice",
      capabilities: [],
      typicalClients: "",
      image: img.src,
      imageAlt: img.alt,
      published: false,
      custom: true,
    },
    row,
  );
}

export function mergeCatalog(seed: LiveCatalog, rows: OverrideRow[]): LiveCatalog {
  const byKey = new Map(rows.map((row) => [`${row.kind}:${row.id}`, row]));
  const offers = seed.offers.map((item) => applyOffer(item, byKey.get(`offer:${item.slug}`)));
  const packages = seed.packages.map((item) => applyPackage(item, byKey.get(`package:${item.id}`)));
  const departments = seed.departments.map((item) => applyDepartment(item, byKey.get(`department:${item.id}`)));
  const seedOffers = new Set(seed.offers.map((item) => item.slug));
  const seedPackages = new Set(seed.packages.map((item) => item.id));
  const seedDepts = new Set(seed.departments.map((item) => item.id));
  for (const row of rows) {
    if (row.kind === "offer" && !seedOffers.has(row.id)) offers.push({ ...rowToOffer(row), custom: true });
    if (row.kind === "package" && !seedPackages.has(row.id)) packages.push({ ...rowToPackage(row), custom: true });
    if (row.kind === "department" && !seedDepts.has(row.id)) departments.push({ ...rowToDepartment(row), custom: true });
  }
  return { offers, packages, departments };
}

export function publicCatalog(catalog: LiveCatalog): LiveCatalog {
  return {
    offers: catalog.offers.filter((item) => item.published),
    packages: catalog.packages.filter((item) => item.published),
    departments: catalog.departments.filter((item) => item.published),
  };
}

export function purchasableFromLive(catalog: LiveCatalog, kind: CatalogKind, id: string): Purchasable | null {
  if (kind === "package") {
    const pack = catalog.packages.find((item) => item.id === id && item.published);
    if (!pack) return null;
    return {
      kind,
      id: pack.id,
      title: pack.name,
      summary: pack.summary,
      amount: pack.price,
      priceSuffix: pack.priceSuffix ?? "",
      timeline: pack.timeline,
      image: pack.image,
      imageAlt: pack.imageAlt,
      instant: pack.kind === "launch",
    };
  }
  const offer = catalog.offers.find((item) => item.slug === id && item.published);
  if (!offer) return null;
  return {
    kind,
    id: offer.slug,
    title: offer.name,
    summary: offer.outcome,
    amount: offer.startingPrice,
    priceSuffix: "",
    timeline: offer.timeline,
    image: offer.image,
    imageAlt: offer.imageAlt,
    instant: true,
  };
}

export function isSeedCatalogId(kind: CatalogItemKind, id: string): boolean {
  if (kind === "offer") return OFFERS.some((item) => item.slug === id);
  if (kind === "package") return PACKAGES.some((item) => item.id === id);
  return DEPARTMENTS.some((item) => item.id === id);
}
