import { r as getSql } from "./db-Dx6HJ51b.mjs";
import { a as isStaff, i as isOperator, o as normalizeRole } from "./access-Ty0QsjcV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff.server-CL-6ZGxS.js
async function readRole(userId) {
	const rows = await (await getSql())`select role from profiles where user_id = ${userId} limit 1`;
	if (!rows[0]) return null;
	return normalizeRole(rows[0].role);
}
async function requireStaff(userId) {
	const role = await readRole(userId);
	if (!role || !isStaff(role)) throw new Error("Forbidden");
	return role;
}
async function requireOperator(userId) {
	const role = await readRole(userId);
	if (!role || !isOperator(role)) throw new Error("Forbidden");
	return role;
}
//#endregion
export { requireOperator, requireStaff };
