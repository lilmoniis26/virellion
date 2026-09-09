import { r as createServerFn } from "./ssr.mjs";
import { A as boolean, D as _enum, F as object, P as number, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-C4156sa6.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-data-B7lznpoV.js
var saveSchema = object({
	kind: _enum([
		"offer",
		"package",
		"department"
	]),
	id: string().min(1).max(80),
	published: boolean(),
	name: string().min(1).max(160),
	shortName: string().max(80).optional(),
	eyebrow: string().max(80).optional(),
	summary: string().max(1200).optional(),
	outcome: string().max(1200).optional(),
	timeline: string().max(200).optional(),
	nextStep: string().max(400).optional(),
	typicalClients: string().max(240).optional(),
	price: number().int().min(0).max(1e6).optional(),
	priceSuffix: string().max(20).optional(),
	image: string().max(14e5).optional(),
	imageAlt: string().max(240).optional(),
	deliverablesText: string().max(8e3).optional(),
	exclusionsText: string().max(4e3).optional(),
	capabilitiesText: string().max(4e3).optional(),
	departmentsText: string().max(400).optional(),
	packageKind: _enum([
		"launch",
		"custom",
		""
	]).optional()
});
/** Public marketing catalog. Intentionally unauthenticated. */
var getPublicCatalog_createServerFn_handler = createServerRpc({
	id: "d0531da818240ee65083ba771b328d16376976a05cefad4c54a056bf41d1812b",
	name: "getPublicCatalog",
	filename: "src/lib/catalog-data.ts"
}, (opts) => getPublicCatalog.__executeServer(opts));
var getPublicCatalog = createServerFn({ method: "GET" }).handler(getPublicCatalog_createServerFn_handler, async () => {
	const { readMerged } = await import("./catalog-data.server-Da4YoVsA.mjs");
	return readMerged(false);
});
var getStudioCatalog_createServerFn_handler = createServerRpc({
	id: "1825bf0fc589f34780dc837f48bd709520ae78d6d8bd1c112e2dd9a895b80654",
	name: "getStudioCatalog",
	filename: "src/lib/catalog-data.ts"
}, (opts) => getStudioCatalog.__executeServer(opts));
var getStudioCatalog = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getStudioCatalog_createServerFn_handler, async ({ context }) => {
	const { getStudioCatalogFor } = await import("./catalog-data.server-Da4YoVsA.mjs");
	return getStudioCatalogFor(context.userId);
});
var saveCatalogItem_createServerFn_handler = createServerRpc({
	id: "5588f47961001911601054bc44da1351c554795a007025e1c1a33871862e85f4",
	name: "saveCatalogItem",
	filename: "src/lib/catalog-data.ts"
}, (opts) => saveCatalogItem.__executeServer(opts));
var saveCatalogItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(saveSchema).handler(saveCatalogItem_createServerFn_handler, async ({ context, data }) => {
	const { saveCatalogItemFor } = await import("./catalog-data.server-Da4YoVsA.mjs");
	return saveCatalogItemFor(context.userId, data);
});
var resetCatalogItem_createServerFn_handler = createServerRpc({
	id: "ceaf993021958896da8c03690429cc962b73ec4ef1b41b11def5e0749fa14275",
	name: "resetCatalogItem",
	filename: "src/lib/catalog-data.ts"
}, (opts) => resetCatalogItem.__executeServer(opts));
var resetCatalogItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	kind: _enum([
		"offer",
		"package",
		"department"
	]),
	id: string().min(1).max(80)
})).handler(resetCatalogItem_createServerFn_handler, async ({ context, data }) => {
	const { resetCatalogItemFor } = await import("./catalog-data.server-Da4YoVsA.mjs");
	return resetCatalogItemFor(context.userId, data.kind, data.id);
});
var createCatalogItem_createServerFn_handler = createServerRpc({
	id: "447c8e8f2dee5d69b404b3955668e903eae8a1e1c98e410656605708dda45c5a",
	name: "createCatalogItem",
	filename: "src/lib/catalog-data.ts"
}, (opts) => createCatalogItem.__executeServer(opts));
var createCatalogItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	kind: _enum([
		"offer",
		"package",
		"department"
	]),
	name: string().min(2).max(160),
	packageKind: _enum(["launch", "custom"]).optional()
})).handler(createCatalogItem_createServerFn_handler, async ({ context, data }) => {
	const { createCatalogItemFor } = await import("./catalog-data.server-Da4YoVsA.mjs");
	return createCatalogItemFor(context.userId, data);
});
//#endregion
export { createCatalogItem_createServerFn_handler, getPublicCatalog_createServerFn_handler, getStudioCatalog_createServerFn_handler, resetCatalogItem_createServerFn_handler, saveCatalogItem_createServerFn_handler };
