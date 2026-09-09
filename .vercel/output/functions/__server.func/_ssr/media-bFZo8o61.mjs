//#region node_modules/.nitro/vite/services/ssr/assets/media-bFZo8o61.js
function sanitizeImage(raw) {
	const value = raw.trim();
	if (!value) return "";
	if (value.startsWith("/media/") && !value.includes("..") && value.length < 200) return value;
	if (/^https:\/\//i.test(value) && value.length < 2e3) return value;
	if (/^data:image\/(png|jpeg|jpg|webp);base64,/i.test(value) && value.length <= 14e5) return value;
	throw new Error("Use a studio photo, an https image link, or a small image file (JPG, PNG, or WebP).");
}
function lines(value) {
	return value.split("\n").map((line) => line.replace(/^[\s•\-]+/, "").trim()).filter(Boolean);
}
//#endregion
export { sanitizeImage as n, lines as t };
