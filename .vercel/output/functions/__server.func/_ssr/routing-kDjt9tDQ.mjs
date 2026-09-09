import { b as SPECIALISTS, f as PACKAGES, s as DEPARTMENT_MAP } from "./catalog-CyGgm22L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routing-kDjt9tDQ.js
var REGULATED_SET = new Set([
	"legal",
	"tax",
	"financial",
	"medical",
	"immigration",
	"employment",
	"licensing",
	"other regulated matter"
].map((s) => s.toLowerCase()));
function textOf(intake, extra = "") {
	return [
		intake.desiredOutcome,
		intake.projectType,
		intake.currentStage,
		...intake.services ?? [],
		intake.marketplace,
		intake.productCategory,
		extra
	].filter(Boolean).join(" ").toLowerCase();
}
function addDept(set, id) {
	set.add(id);
}
function classifyIntake(intake, extraText = "") {
	const t = textOf(intake, extraText);
	const depts = /* @__PURE__ */ new Set();
	const risks = /* @__PURE__ */ new Set();
	const services = (intake.services ?? []).map((s) => s.toLowerCase());
	if (/cover|logo|brand|identity|packaging|graphic|style guide/.test(t) || services.some((s) => s.includes("brand"))) addDept(depts, "creative");
	if (/book|manuscript|ghostwrit|edit|publish|blurb|chapter/.test(t) || services.some((s) => s.includes("book"))) addDept(depts, "publishing");
	if (/video|trailer|film|animation|reel|cinematic/.test(t) || services.some((s) => s.includes("video"))) addDept(depts, "video");
	if (/music|podcast|voiceover|audiobook|mix|master/.test(t) || services.some((s) => s.includes("audio"))) addDept(depts, "audio");
	if (/website|landing|shopify|domain|web |ui\/ux/.test(t) || services.some((s) => s.includes("website"))) addDept(depts, "web");
	if (/chatbot|automat|ai |agent|software|app |integrat/.test(t) || services.some((s) => s.includes("ai"))) addDept(depts, "technology");
	if (/llc|ein|license|permit|registered agent|formation|start a business|dba|bank account/.test(t) || services.some((s) => s.includes("formation"))) {
		addDept(depts, "formation");
		risks.add("identity-verification");
		risks.add("human-review");
	}
	if (/sell products|reseller|tiktok shop|amazon|walmart|marketplace|shopify|fulfillment|supplier/.test(t) || services.some((s) => s.includes("reseller") || s.includes("marketplace"))) {
		addDept(depts, "ecommerce");
		risks.add("marketplace-approval");
	}
	if (/customer|marketing|seo|ads|campaign|lead/.test(t) || services.some((s) => s.includes("marketing"))) addDept(depts, "marketing");
	if (/business plan|consult|growth|strategy|turn an idea into/.test(t) || services.some((s) => s.includes("consult"))) addDept(depts, "consulting");
	if (/fashion|apparel|merch|jewelry/.test(t)) addDept(depts, "fashion");
	if (/interior|floor plan|3d|architect|staging/.test(t)) addDept(depts, "architecture");
	if (/resume|linkedin|career|interview/.test(t) || services.some((s) => s.includes("career"))) addDept(depts, "career");
	if (/streamer|game art|vtuber|overlay|thumbnail/.test(t)) addDept(depts, "creator");
	if (/data entry|research|admin|scheduling|spreadsheet/.test(t)) addDept(depts, "data");
	if (depts.size === 0) addDept(depts, "consulting");
	if ((intake.regulated ?? []).filter((r) => r && r !== "None").length > 0 || [...REGULATED_SET].some((r) => t.includes(r))) {
		risks.add("regulated-industry");
		risks.add("professional-referral");
		risks.add("human-review");
	}
	if (/\bssn\b|passport|\bpassword\b|\bein\b|tax id|identity document|driver.?s license|bank account/.test(t)) {
		risks.add("sensitive-data");
		risks.add("human-review");
	}
	if ((intake.budget === "8k-20k" || intake.budget === "20k-plus") && depts.size >= 3) risks.add("human-review");
	const deptList = [...depts];
	const engagement = inferEngagement(deptList, t, intake);
	const suggestedPackageId = inferPackage(deptList, engagement, t);
	const suggestedOfferSlug = inferOffer(deptList, t);
	const specialists = SPECIALISTS.filter((s) => deptList.includes(s.department)).slice(0, 4).map((s) => s.role);
	if (specialists.length === 0) specialists.push("Front Desk and Client Services");
	const needsHumanReview = risks.has("human-review") || risks.has("professional-referral") || risks.has("regulated-industry");
	const summary = `Route to ${deptList.map((id) => DEPARTMENT_MAP[id].short).join(" → ")} as ${labelEngagement(engagement)}.${needsHumanReview ? " Human review required before a proposal is sent." : " A fixed-price scope or consultation can be prepared."}`;
	return {
		departments: deptList,
		engagement,
		risks: [...risks],
		suggestedPackageId,
		suggestedOfferSlug,
		specialists,
		summary,
		needsHumanReview
	};
}
function inferEngagement(depts, t, intake) {
	if (/retainer|monthly|ongoing|maintenance/.test(t)) return "retainer";
	if (/not sure|advice|should i|consult/.test(t) && depts.length <= 2) return "consultation";
	if (depts.includes("formation") && (depts.includes("ecommerce") || depts.includes("web") || /complete|end.to.end|everything|full launch/.test(t))) return "end-to-end";
	if (depts.length >= 3 || /package|launch|complete brand|book launch/.test(t)) return "package";
	if ((intake.services?.length ?? 0) <= 1 && depts.length === 1) return "individual";
	if (depts.length >= 2) return "package";
	return "consultation";
}
function inferPackage(depts, engagement, t) {
	if (engagement === "retainer") return "monthly-desk";
	if (depts.includes("formation") && depts.includes("ecommerce")) return "reseller-launch";
	if (depts.includes("formation") && /roadmap|plan|where to start/.test(t)) return "roadmap";
	if (depts.includes("formation")) return "formation-admin";
	if (depts.includes("publishing")) return "book-custom";
	if (depts.includes("creative") && depts.includes("web")) return "brand-web";
	if (depts.includes("ecommerce")) return "reseller-launch";
	if (depts.includes("technology")) return "ai-ops-custom";
	return PACKAGES.find((p) => p.kind === "launch" && p.departments.some((d) => depts.includes(d)))?.id;
}
function inferOffer(depts, t) {
	if (depts.includes("publishing") || /book/.test(t)) return "book-launch";
	if (depts.includes("formation") || depts.includes("ecommerce")) return "formation-reseller";
	if (depts.includes("creative") || depts.includes("web")) return "brand-website";
}
function labelEngagement(id) {
	switch (id) {
		case "individual": return "an individual service";
		case "package": return "a project package";
		case "end-to-end": return "an end-to-end solution";
		case "consultation": return "a consultation";
		case "retainer": return "an ongoing retainer";
	}
}
function emptyIntake() {
	return {
		name: "",
		email: "",
		phone: "",
		desiredOutcome: "",
		projectType: "",
		location: "",
		audience: "",
		currentStage: "",
		services: [],
		deadline: "",
		budget: "",
		assets: "",
		channel: "",
		regulated: [],
		businessName: "",
		businessStatus: "",
		entityType: "",
		addressSituation: "",
		marketplace: "",
		productCategory: "",
		supplierStatus: "",
		inventoryStatus: "",
		salesChannels: "",
		hasBank: "",
		hasEin: "",
		hasInsurance: "",
		hasLicenses: "",
		hasComplianceDocs: ""
	};
}
function needsFormationExtras(intake) {
	const t = textOf(intake);
	return /llc|ein|formation|reseller|marketplace|amazon|tiktok|walmart|shopify|start a business/.test(t) || (intake.services ?? []).some((s) => /formation|reseller|marketplace/i.test(s));
}
//#endregion
export { emptyIntake as n, needsFormationExtras as r, classifyIntake as t };
