import { r as createServerFn } from "./ssr.mjs";
import { F as object, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-C4156sa6.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/team-data-BDNOcbPh.js
var listStudioTeam_createServerFn_handler = createServerRpc({
	id: "eb3a1824c8d6676e5b1122ff305c1ff8feef78225ce9c379e724f42d9e5b4490",
	name: "listStudioTeam",
	filename: "src/lib/team-data.ts"
}, (opts) => listStudioTeam.__executeServer(opts));
var listStudioTeam = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listStudioTeam_createServerFn_handler, async ({ context }) => {
	const { listTeamFor } = await import("./team-data.server-DlI_R6M8.mjs");
	return listTeamFor(context.userId);
});
var inviteStudioPartner_createServerFn_handler = createServerRpc({
	id: "3fb502029419ef9bd99da5e825095981c04e56b21e2775d838e790da8ec60a1e",
	name: "inviteStudioPartner",
	filename: "src/lib/team-data.ts"
}, (opts) => inviteStudioPartner.__executeServer(opts));
var inviteStudioPartner = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ email: string().min(3).max(160) })).handler(inviteStudioPartner_createServerFn_handler, async ({ context, data }) => {
	const { invitePartnerFor } = await import("./team-data.server-DlI_R6M8.mjs");
	return invitePartnerFor(context.userId, data.email);
});
var revokeStudioPartner_createServerFn_handler = createServerRpc({
	id: "3df9ab653a1c89ceb9706cc78d4ec8bfdb8e6009ed7cd69183c8c690feb16f78",
	name: "revokeStudioPartner",
	filename: "src/lib/team-data.ts"
}, (opts) => revokeStudioPartner.__executeServer(opts));
var revokeStudioPartner = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	userId: string().max(80).optional(),
	inviteId: string().max(80).optional()
})).handler(revokeStudioPartner_createServerFn_handler, async ({ context, data }) => {
	const { revokePartnerFor } = await import("./team-data.server-DlI_R6M8.mjs");
	return revokePartnerFor(context.userId, data);
});
var acceptStudioInvite_createServerFn_handler = createServerRpc({
	id: "8d00a160d7c7987f5a6847c44ae963ebee628e9309cfa6158d2491ee67ea6124",
	name: "acceptStudioInvite",
	filename: "src/lib/team-data.ts"
}, (opts) => acceptStudioInvite.__executeServer(opts));
var acceptStudioInvite = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ token: string().min(8).max(80) })).handler(acceptStudioInvite_createServerFn_handler, async ({ context, data }) => {
	const { acceptInviteFor } = await import("./team-data.server-DlI_R6M8.mjs");
	return acceptInviteFor(context.userId, data.token);
});
//#endregion
export { acceptStudioInvite_createServerFn_handler, inviteStudioPartner_createServerFn_handler, listStudioTeam_createServerFn_handler, revokeStudioPartner_createServerFn_handler };
