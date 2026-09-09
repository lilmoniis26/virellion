//#region node_modules/.nitro/vite/services/ssr/assets/access-Ty0QsjcV.js
function normalizeRole(role) {
	if (role === "operator" || role === "partner") return role;
	return "client";
}
function isStaff(role) {
	return role === "operator" || role === "partner";
}
function isOperator(role) {
	return role === "operator";
}
var OPERATOR_ONLY = [
	"PayPal and payout details",
	"Marking orders paid and issuing receipts",
	"Inviting or removing studio partners",
	"Downloading the marketing list",
	"Editing Terms of Engagement and the Privacy Notice"
];
var OPERATOR_NEVER_IN_DESK = [
	"Domain, DNS, and hosting records",
	"Bank accounts, tax IDs, and card numbers",
	"Resetting anyone’s password or recovery methods"
];
var PARTNER_MAY = [
	"Edit public pages, photographs, headlines, and closing copy",
	"Edit catalog names, prices, services, practices, and images",
	"Add new offers, packages, and practices to the public site",
	"Help with inquiries, projects, and the studio inbox",
	"See the client roster (not export it)"
];
//#endregion
export { isStaff as a, isOperator as i, OPERATOR_ONLY as n, normalizeRole as o, PARTNER_MAY as r, OPERATOR_NEVER_IN_DESK as t };
