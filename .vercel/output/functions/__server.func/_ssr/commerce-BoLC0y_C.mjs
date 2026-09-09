import { E as packageImage, T as packageById, w as offerBySlug } from "./catalog-CyGgm22L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/commerce-BoLC0y_C.js
function parseItemParam(raw) {
	if (!raw) return null;
	const idx = raw.indexOf(":");
	if (idx <= 0) return null;
	const kind = raw.slice(0, idx);
	const id = raw.slice(idx + 1).trim();
	if (kind !== "package" && kind !== "offer" || !id) return null;
	return {
		kind,
		id
	};
}
function itemParam(kind, id) {
	return `${kind}:${id}`;
}
function getPurchasable(kind, id) {
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
			instant: p.kind === "launch"
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
		instant: true
	};
}
function safeRedirect(value, fallback = "/account") {
	if (typeof value !== "string") return fallback;
	if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
	if (value.includes("://")) return fallback;
	return value;
}
var ORDER_STATUS_LABEL = {
	pending_payment: "Awaiting payment",
	payment_submitted: "Payment submitted",
	paid: "Paid",
	in_progress: "In production",
	complete: "Complete",
	cancelled: "Cancelled"
};
var INQUIRY_STATUS_LABEL = {
	new: "Received",
	open: "Open",
	review: "In review",
	proposed: "Proposal sent",
	won: "In production",
	closed: "Closed"
};
//#endregion
export { parseItemParam as a, itemParam as i, ORDER_STATUS_LABEL as n, safeRedirect as o, getPurchasable as r, INQUIRY_STATUS_LABEL as t };
