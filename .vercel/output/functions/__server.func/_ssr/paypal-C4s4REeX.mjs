//#region node_modules/.nitro/vite/services/ssr/assets/paypal-C4s4REeX.js
function normalizePaypalMe(raw) {
	let value = raw.trim();
	value = value.replace(/^https?:\/\/(www\.)?paypal\.me\//i, "");
	value = value.replace(/^https?:\/\/(www\.)?paypal\.com\/paypalme\//i, "");
	value = value.replace(/^@/, "");
	return (value.split(/[/?#]/)[0] ?? "").replace(/[^a-zA-Z0-9._-]/g, "");
}
function isPaypalHttps(url) {
	try {
		const parsed = new URL(url);
		return parsed.protocol === "https:" && (parsed.hostname === "www.paypal.com" || parsed.hostname === "paypal.com" || parsed.hostname === "www.paypal.me" || parsed.hostname === "paypal.me");
	} catch {
		return false;
	}
}
function buildPaypalUrl(settings, order) {
	const me = normalizePaypalMe(settings.paypalMe);
	if (me) return `https://www.paypal.com/paypalme/${encodeURIComponent(me)}/${order.amount}USD`;
	const email = settings.paypalEmail.trim();
	if (email.includes("@")) return `https://www.paypal.com/cgi-bin/webscr?${new URLSearchParams({
		cmd: "_xclick",
		business: email,
		item_name: `Virellion — ${order.title}`.slice(0, 120),
		amount: String(order.amount),
		currency_code: "USD",
		invoice: order.id,
		custom: order.id,
		no_shipping: "1",
		no_note: "0"
	}).toString()}`;
	const link = settings.paypalLink.trim();
	if (link && isPaypalHttps(link)) return link;
	return null;
}
var PAYMENT_METHOD_LABEL = {
	paypal: "PayPal",
	invoice: "Invoice",
	card_link: "Card link"
};
//#endregion
export { buildPaypalUrl as n, normalizePaypalMe as r, PAYMENT_METHOD_LABEL as t };
