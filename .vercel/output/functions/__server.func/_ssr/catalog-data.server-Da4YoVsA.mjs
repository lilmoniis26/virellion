import { a as uid } from "./utils-BTLGo2_i.mjs";
import { r as getSql } from "./db-Dx6HJ51b.mjs";
import { a as seedLiveCatalog, i as purchasableFromLive, n as mergeCatalog, r as publicCatalog } from "./catalog-live-DrcRqM9_.mjs";
import { n as sanitizeImage, t as lines } from "./media-bFZo8o61.mjs";
import { requireStaff } from "./staff.server-CL-6ZGxS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-data.server-Da4YoVsA.js
async function readOverrideRows() {
	return (await getSql())`
    select kind, id, published, name, short_name, eyebrow, summary, outcome, timeline, next_step,
      typical_clients, price, price_suffix, image, image_alt, deliverables, exclusions, capabilities,
      departments, package_kind
    from catalog_items
  `;
}
async function readMerged(includeHidden) {
	const merged = mergeCatalog(seedLiveCatalog(), await readOverrideRows());
	return includeHidden ? merged : publicCatalog(merged);
}
async function livePurchasable(kind, id) {
	const catalog = await readMerged(false);
	return purchasableFromLive(catalog, kind, id);
}
async function getStudioCatalogFor(userId) {
	await requireStaff(userId);
	return readMerged(true);
}
function slugify(name) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48) || "item";
}
async function createCatalogItemFor(userId, input) {
	await requireStaff(userId);
	const seed = seedLiveCatalog();
	const rows = await readOverrideRows();
	let id = slugify(input.name);
	if ((input.kind === "offer" ? new Set(seed.offers.map((item) => item.slug).concat(rows.filter((r) => r.kind === "offer").map((r) => r.id))) : input.kind === "package" ? new Set(seed.packages.map((item) => item.id).concat(rows.filter((r) => r.kind === "package").map((r) => r.id))) : new Set(seed.departments.map((item) => item.id).concat(rows.filter((r) => r.kind === "department").map((r) => r.id)))).has(id)) id = `${id}-${uid("n").slice(-5)}`;
	const sql = await getSql();
	const eyebrow = input.kind === "offer" ? "Offer" : input.kind === "package" ? input.packageKind === "custom" ? "Custom" : "Launch package" : "Practice";
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
      ${input.kind === "package" ? input.packageKind ?? "launch" : ""},
      ${"/media/atelier.jpg"},
      ${"Empty atelier with a long oak work table."},
      now()
    )
  `;
	return readMerged(true);
}
async function saveCatalogItemFor(userId, data) {
	await requireStaff(userId);
	const image = sanitizeImage(data.image ?? "");
	const departments = lines(data.departmentsText ?? "");
	await (await getSql())`
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
async function resetCatalogItemFor(userId, kind, id) {
	await requireStaff(userId);
	await (await getSql())`delete from catalog_items where kind = ${kind} and id = ${id}`;
	return readMerged(true);
}
//#endregion
export { createCatalogItemFor, getStudioCatalogFor, livePurchasable, readMerged, resetCatalogItemFor, saveCatalogItemFor };
