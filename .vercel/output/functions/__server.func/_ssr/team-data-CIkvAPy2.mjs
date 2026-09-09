import { r as createServerFn } from "./ssr.mjs";
import { F as object, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-C4156sa6.mjs";
import { R as createSsrRpc } from "./router-DxJdDo-e.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/team-data-CIkvAPy2.js
var listStudioTeam = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("eb3a1824c8d6676e5b1122ff305c1ff8feef78225ce9c379e724f42d9e5b4490"));
var inviteStudioPartner = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ email: string().min(3).max(160) })).handler(createSsrRpc("3fb502029419ef9bd99da5e825095981c04e56b21e2775d838e790da8ec60a1e"));
var revokeStudioPartner = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	userId: string().max(80).optional(),
	inviteId: string().max(80).optional()
})).handler(createSsrRpc("3df9ab653a1c89ceb9706cc78d4ec8bfdb8e6009ed7cd69183c8c690feb16f78"));
var acceptStudioInvite = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ token: string().min(8).max(80) })).handler(createSsrRpc("8d00a160d7c7987f5a6847c44ae963ebee628e9309cfa6158d2491ee67ea6124"));
//#endregion
export { revokeStudioPartner as i, inviteStudioPartner as n, listStudioTeam as r, acceptStudioInvite as t };
