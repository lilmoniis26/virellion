import { C as departmentImage, E as packageImage, d as OFFERS, f as PACKAGES, o as DEPARTMENTS } from "./catalog-CyGgm22L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-live-DrcRqM9_.js
function asBool(value) {
	return value === true || value === "t" || value === "true" || value === 1 || value === "1";
}
function asInt(value) {
	if (value == null || value === "") return null;
	const n = typeof value === "number" ? value : Number(value);
	return Number.isFinite(n) ? Math.round(n) : null;
}
function asStringArray(value) {
	if (value == null) return void 0;
	let parsed = value;
	if (typeof value === "string") try {
		parsed = JSON.parse(value);
	} catch {
		return;
	}
	if (!Array.isArray(parsed)) return void 0;
	return parsed.map((item) => String(item).trim()).filter(Boolean);
}
function asDepartments(value) {
	const arr = asStringArray(value);
	if (!arr) return void 0;
	return arr.map((id) => id.toLowerCase().replace(/[^a-z0-9-]/g, "")).filter(Boolean);
}
function pick(override, fallback) {
	const v = override.trim();
	return v ? v : fallback;
}
function seedDepartments() {
	return DEPARTMENTS.map((d) => {
		const img = departmentImage(d.id);
		return {
			...d,
			image: img.src,
			imageAlt: img.alt,
			published: true
		};
	});
}
function seedLiveCatalog() {
	return {
		offers: OFFERS.map((o) => ({
			...o,
			published: true
		})),
		packages: PACKAGES.map((p) => {
			const img = packageImage(p.id);
			return {
				...p,
				image: img.src,
				imageAlt: img.alt,
				published: true
			};
		}),
		departments: seedDepartments()
	};
}
function applyOffer(base, row) {
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
		departments: departments ?? base.departments
	};
}
function applyPackage(base, row) {
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
		kind
	};
}
function applyDepartment(base, row) {
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
		capabilities: capabilities ?? base.capabilities
	};
}
function rowToOffer(row) {
	const img = departmentImage("creative");
	return applyOffer({
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
		custom: true
	}, row);
}
function rowToPackage(row) {
	const img = packageImage("brand-web");
	return applyPackage({
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
		custom: true
	}, row);
}
function rowToDepartment(row) {
	const img = departmentImage("creative");
	return applyDepartment({
		id: row.id,
		label: row.name || "New practice",
		short: row.short_name || row.name || "Practice",
		capabilities: [],
		typicalClients: "",
		image: img.src,
		imageAlt: img.alt,
		published: false,
		custom: true
	}, row);
}
function mergeCatalog(seed, rows) {
	const byKey = new Map(rows.map((row) => [`${row.kind}:${row.id}`, row]));
	const offers = seed.offers.map((item) => applyOffer(item, byKey.get(`offer:${item.slug}`)));
	const packages = seed.packages.map((item) => applyPackage(item, byKey.get(`package:${item.id}`)));
	const departments = seed.departments.map((item) => applyDepartment(item, byKey.get(`department:${item.id}`)));
	const seedOffers = new Set(seed.offers.map((item) => item.slug));
	const seedPackages = new Set(seed.packages.map((item) => item.id));
	const seedDepts = new Set(seed.departments.map((item) => item.id));
	for (const row of rows) {
		if (row.kind === "offer" && !seedOffers.has(row.id)) offers.push({
			...rowToOffer(row),
			custom: true
		});
		if (row.kind === "package" && !seedPackages.has(row.id)) packages.push({
			...rowToPackage(row),
			custom: true
		});
		if (row.kind === "department" && !seedDepts.has(row.id)) departments.push({
			...rowToDepartment(row),
			custom: true
		});
	}
	return {
		offers,
		packages,
		departments
	};
}
function publicCatalog(catalog) {
	return {
		offers: catalog.offers.filter((item) => item.published),
		packages: catalog.packages.filter((item) => item.published),
		departments: catalog.departments.filter((item) => item.published)
	};
}
function purchasableFromLive(catalog, kind, id) {
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
			instant: pack.kind === "launch"
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
		instant: true
	};
}
function isSeedCatalogId(kind, id) {
	if (kind === "offer") return OFFERS.some((item) => item.slug === id);
	if (kind === "package") return PACKAGES.some((item) => item.id === id);
	return DEPARTMENTS.some((item) => item.id === id);
}
//#endregion
export { seedLiveCatalog as a, purchasableFromLive as i, mergeCatalog as n, publicCatalog as r, isSeedCatalogId as t };
