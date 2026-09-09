import type { CatalogKind, Purchasable } from "@/lib/commerce";
import { getSql } from "@/lib/db";
import { lines, sanitizeImage } from "@/lib/media";
import {
  isSeedCatalogId,
  mergeCatalog,
  publicCatalog,
  purchasableFromLive,
  seedLiveCatalog,
  type LiveCatalog,
  type OverrideRow,
} from "@/lib/catalog-live";
import { requireStaff } from "@/lib/staff.server";
import { uid } from "@/lib/utils";

export type CatalogSaveInput = {
  kind: "offer" | "package" | "department";
  id: string;
  published: boolean;
  name: string;
  shortName?: string;
  eyebrow?: string;
  summary?: string;
  outcome?: string;
  timeline?: string;
  nextStep?: string;
  typicalClients?: string;
  price?: number;
  priceSuffix?: string;
  image?: string;
  imageAlt?: string;
  deliverablesText?: string;
  exclusionsText?: string;
  capabilitiesText?: string;
  departmentsText?: string;
  packageKind?: "launch" | "custom" | "";
};

async function readOverrideRows(): Promise<OverrideRow[]> {
  const sql = await getSql();
  return sql<OverrideRow>`
    select kind, id, published, name, short_name, eyebrow, summary, outcome, timeline, next_step,
      typical_clients, price, price_suffix, image, image_alt, deliverables, exclusions, capabilities,
      departments, package_kind
    from catalog_items
  `;
}

export async function readMerged(includeHidden: boolean): Promise<LiveCatalog> {
  const merged = mergeCatalog(seedLiveCatalog(), await readOverrideRows());
  return includeHidden ? merged : publicCatalog(merged);
}

export async function livePurchasable(kind: CatalogKind, id: string): Promise<Purchasable | null> {
  const catalog = await readMerged(false);
  return purchasableFromLive(catalog, kind, id);
}

export async function getStudioCatalogFor(userId: string): Promise<LiveCatalog> {
  await requireStaff(userId);
  return readMerged(true);
}

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "item"
  );
}

export async function createCatalogItemFor(
  userId: string,
  input: { kind: "offer" | "package" | "department"; name: string; packageKind?: "launch" | "custom" },
): Promise<LiveCatalog> {
  await requireStaff(userId);
  const seed = seedLiveCatalog();
  const rows = await readOverrideRows();
  let id = slugify(input.name);
  const taken =
    input.kind === "offer"
      ? new Set(seed.offers.map((item) => item.slug).concat(rows.filter((r) => r.kind === "offer").map((r) => r.id)))
      : input.kind === "package"
        ? new Set(seed.packages.map((item) => item.id).concat(rows.filter((r) => r.kind === "package").map((r) => r.id)))
        : new Set(seed.departments.map((item) => item.id).concat(rows.filter((r) => r.kind === "department").map((r) => r.id)));
  if (taken.has(id)) id = `${id}-${uid("n").slice(-5)}`;
  const sql = await getSql();
  const eyebrow =
    input.kind === "offer" ? "Offer" : input.kind === "package" ? (input.packageKind === "custom" ? "Custom" : "Launch package") : "Practice";
  await sql`
    insert into catalog_items (
      kind, id, published, name, short_name, eyebrow, package_kind, image, image_alt, updated_at
    ) values (
      ${input.kind},
      ${id},
      ${false},
      ${input.name.trim()},
      ${input.kind === "department" ? input.name.trim() : ""},
      ${eyebrow},
      ${input.kind === "package" ? (input.packageKind ?? "launch") : ""},
      ${"/media/atelier.jpg"},
      ${"Empty atelier with a long oak work table."},
      now()
    )
  `;
  return readMerged(true);
}

export async function saveCatalogItemFor(userId: string, data: CatalogSaveInput): Promise<LiveCatalog> {
  await requireStaff(userId);
  const image = sanitizeImage(data.image ?? "");
  const departments = lines(data.departmentsText ?? "");
  const sql = await getSql();
  await sql`
    insert into catalog_items (
      kind, id, published, name, short_name, eyebrow, summary, outcome, timeline, next_step,
      typical_clients, price, price_suffix, image, image_alt, deliverables, exclusions, capabilities,
      departments, package_kind, updated_at
    ) values (
      ${data.kind},
      ${data.id},
      ${data.published},
      ${data.name.trim()},
      ${(data.shortName ?? "").trim()},
      ${(data.eyebrow ?? "").trim()},
      ${(data.summary ?? "").trim()},
      ${(data.outcome ?? "").trim()},
      ${(data.timeline ?? "").trim()},
      ${(data.nextStep ?? "").trim()},
      ${(data.typicalClients ?? "").trim()},
      ${data.price ?? null},
      ${(data.priceSuffix ?? "").trim()},
      ${image},
      ${(data.imageAlt ?? "").trim()},
      ${JSON.stringify(lines(data.deliverablesText ?? ""))},
      ${JSON.stringify(lines(data.exclusionsText ?? ""))},
      ${JSON.stringify(lines(data.capabilitiesText ?? ""))},
      ${JSON.stringify(departments)},
      ${(data.packageKind ?? "").trim()},
      now()
    )
    on conflict (kind, id) do update set
      published = excluded.published,
      name = excluded.name,
      short_name = excluded.short_name,
      eyebrow = excluded.eyebrow,
      summary = excluded.summary,
      outcome = excluded.outcome,
      timeline = excluded.timeline,
      next_step = excluded.next_step,
      typical_clients = excluded.typical_clients,
      price = excluded.price,
      price_suffix = excluded.price_suffix,
      image = excluded.image,
      image_alt = excluded.image_alt,
      deliverables = excluded.deliverables,
      exclusions = excluded.exclusions,
      capabilities = excluded.capabilities,
      departments = excluded.departments,
      package_kind = excluded.package_kind,
      updated_at = now()
  `;
  return readMerged(true);
}

export async function resetCatalogItemFor(
  userId: string,
  kind: CatalogSaveInput["kind"],
  id: string,
): Promise<LiveCatalog> {
  await requireStaff(userId);
  const sql = await getSql();
  await sql`delete from catalog_items where kind = ${kind} and id = ${id}`;
  return readMerged(true);
}

export { isSeedCatalogId };
